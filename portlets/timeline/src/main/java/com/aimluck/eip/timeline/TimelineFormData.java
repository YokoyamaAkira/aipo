/*
 * Aipo is a groupware program developed by Aimluck,Inc.
 * Copyright (C) 2004-2011 Aimluck,Inc.
 * http://www.aipo.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.aimluck.eip.timeline;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.services.TurbineServices;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.commons.field.ALStringField;
import com.aimluck.eip.cayenne.om.portlet.EipTTimeline;
import com.aimluck.eip.cayenne.om.portlet.EipTTimelineFile;
import com.aimluck.eip.cayenne.om.portlet.EipTTimelineUrl;
import com.aimluck.eip.common.ALAbstractFormData;
import com.aimluck.eip.common.ALDBErrorException;
import com.aimluck.eip.common.ALEipConstants;
import com.aimluck.eip.common.ALPageNotFoundException;
import com.aimluck.eip.fileupload.beans.FileuploadLiteBean;
import com.aimluck.eip.fileupload.util.FileuploadUtils;
import com.aimluck.eip.modules.actions.common.ALAction;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.services.eventlog.ALEventlogConstants;
import com.aimluck.eip.services.eventlog.ALEventlogFactoryService;
import com.aimluck.eip.services.storage.ALStorageService;
import com.aimluck.eip.services.timeline.ALTimelineFactoryService;
import com.aimluck.eip.services.timeline.ALTimelineHandler;
import com.aimluck.eip.timeline.util.TimelineUtils;
import com.aimluck.eip.util.ALEipUtils;
import com.aimluck.eip.util.ALLocalizationUtils;

/**
 * タイムライントピックのフォームデータを管理するクラスです。 <BR>
 * 
 */
public class TimelineFormData extends ALAbstractFormData {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(TimelineFormData.class.getName());

  /** メモ */
  private ALStringField note;

  private int parentId;

  private int uid;

  private String orgId;

  private String aclPortletFeature = null;

  /** 閲覧権限の有無 */
  @SuppressWarnings("unused")
  private boolean hasAclCategoryList;

  /** 他ユーザーの作成したトピックの編集権限 */
  private boolean hasAclUpdateTopicOthers;

  /** 他ユーザーの作成したトピックの削除権限 */
  private boolean hasAclDeleteTopicOthers;

  /** 顔写真の有無 */
  private boolean has_photo;

  /** ファイルアップロードリスト */
  private List<FileuploadLiteBean> fileuploadList;

  /** 添付フォルダ名 */
  private String folderName = null;

  /**
   * 
   * @param action
   * @param rundata
   * @param context
   * 
   * 
   */
  @Override
  public void init(ALAction action, RunData rundata, Context context)
      throws ALPageNotFoundException, ALDBErrorException {
    super.init(action, rundata, context);

    uid = ALEipUtils.getUserId(rundata);
    orgId = Database.getDomainName();
    has_photo = false;
    folderName = rundata.getParameters().getString("folderName");

  }

  /**
   * 各フィールドを初期化します。 <BR>
   * 
   * 
   */
  @Override
  public void initField() {
    // メモ
    note = new ALStringField();
    note.setFieldName(ALLocalizationUtils
      .getl10n("TIMELINE_SETFIELDNAME_CONTENT"));
    note.setTrim(false);
    // ファイルリスト
    fileuploadList = new ArrayList<FileuploadLiteBean>();
  }

  /**
   * タイムラインの各フィールドに対する制約条件を設定します。 <BR>
   * 
   * 
   */
  @Override
  protected void setValidator() {
    // メモ必須項目
    note.setNotNull(true);
    // メモの文字数制限
    note.limitMaxLength(10000);
  }

  /**
   * トピックのフォームに入力されたデータの妥当性検証を行います。 <BR>
   * 
   * @param msgList
   * @return TRUE 成功 FALSE 失敗
   * 
   */
  @Override
  protected boolean validate(List<String> msgList) {
    return note.validate(msgList) || fileuploadList != null;
  }

  /**
   * トピックをデータベースから削除します。 <BR>
   * 
   * @param rundata
   * @param context
   * @param msgList
   * @return TRUE 成功 FALSE 失敗
   */
  @Override
  protected boolean deleteFormData(RunData rundata, Context context,
      List<String> msgList) throws ALPageNotFoundException, ALDBErrorException {
    try {

      // FIX_ME イベントログのために一度IDと名前を取得
      int parentid =
        Integer.parseInt(ALEipUtils.getTemp(
          rundata,
          context,
          ALEipConstants.ENTITY_ID));

      EipTTimeline parent = Database.get(EipTTimeline.class, (long) parentid);

      return TimelineUtils.deleteTimelineFromParent(rundata, context, parent);

    } catch (Exception e) {
      Database.rollback();
      logger.error("[TimelineSelectData]", e);
      throw new ALDBErrorException();
    }
  }

  /**
   * トピックをデータベースに格納します。 <BR>
   * 
   * @param rundata
   * @param context
   * @param msgList
   * @return TRUE 成功 FALSE 失敗
   */
  @Override
  protected boolean insertFormData(RunData rundata, Context context,
      List<String> msgList) {
    try {
      Calendar tCal = Calendar.getInstance();
      // 新規オブジェクトモデル
      EipTTimeline topic = Database.create(EipTTimeline.class);
      // 親トピックID
      topic.setParentId(Integer.valueOf(parentId));
      // ユーザーID
      topic.setOwnerId(Integer.valueOf(uid));
      // メモ
      topic.setNote(note.getValue());
      // 登録
      topic.setTimelineType(EipTTimeline.TIMELINE_TYPE_TIMELINE);

      // 作成日
      topic.setCreateDate(tCal.getTime());
      // 更新日
      topic.setUpdateDate(tCal.getTime());
      if (Integer.valueOf(parentId) != 0) {
        EipTTimeline parent =
          Database.get(EipTTimeline.class, Integer.valueOf(parentId));

        if (parent
          .getTimelineType()
          .equals(EipTTimeline.TIMELINE_TYPE_TIMELINE)) {// 通常のコメント挿入時
          parent.setUpdateDate(tCal.getTime());
        } else if (parent.getTimelineType().equals(
          EipTTimeline.TIMELINE_TYPE_ACTIVITY)) {
          parent.setUpdateDate(tCal.getTime());
          if (parent.getParentId().intValue() != 0) {
            EipTTimeline grandpa =
              Database.get(EipTTimeline.class, parent.getParentId());
            grandpa.setUpdateDate(tCal.getTime());
          }
        }

      } else if (ALEipUtils.getParameter(rundata, context, "tlClipUrl") != null
        && !ALEipUtils.getParameter(rundata, context, "tlClipUrl").equals("")) {

        // 新規オブジェクトモデル
        EipTTimelineUrl url = Database.create(EipTTimelineUrl.class);

        if (ALEipUtils.getParameter(rundata, context, "tlClipImage") != null) {
          String str = ALEipUtils.getParameter(rundata, context, "tlClipImage");
          URL u = new URL(str);
          URLConnection uc = u.openConnection();
          uc.setRequestProperty("Referer", str); // Refererを記述
          InputStream is = uc.getInputStream();
          url.setThumbnail(FileuploadUtils.getBytesShrink(
            is,
            FileuploadUtils.DEF_THUMBNAIL_WIDTH,
            FileuploadUtils.DEF_THUMBNAIL_HEIGHT,
            msgList));
        }

        if (ALEipUtils.getParameter(rundata, context, "tlClipTitle") != null) {
          url
            .setTitle(ALEipUtils.getParameter(rundata, context, "tlClipTitle"));
        }

        url.setUrl(ALEipUtils.getParameter(rundata, context, "tlClipUrl"));

        if (ALEipUtils.getParameter(rundata, context, "tlClipBody") != null) {
          url.setBody(ALEipUtils.getParameter(rundata, context, "tlClipBody"));
        }
        url.setEipTTimeline(topic);
        clearTimelineSession(rundata, context);
      }

      // 添付ファイルを登録する．
      insertAttachmentFiles(fileuploadList, folderName, uid, topic, msgList);

      // submitUrl();
      Database.commit();

      if (topic.getParentId() != 0) {
        // オブジェクトモデルを取得
        EipTTimeline parententry =
          TimelineUtils.getEipTTimelineParentEntry(rundata, context);
        // アクティビティ
        String loginName = ALEipUtils.getALEipUser(uid).getName().getValue();
        String targetLoginName =
          ALEipUtils
            .getALEipUser(parententry.getOwnerId())
            .getName()
            .getValue();
        TimelineUtils.createNewCommentActivity(
          parententry,
          loginName,
          targetLoginName);
      }

      ALTimelineFactoryService tlservice =
        (ALTimelineFactoryService) ((TurbineServices) TurbineServices
          .getInstance()).getService(ALTimelineFactoryService.SERVICE_NAME);
      ALTimelineHandler timelinehandler = tlservice.getTimelineHandler();
      timelinehandler.pushToken(rundata, String.valueOf(uid));

      // イベントログに保存
      ALEventlogFactoryService.getInstance().getEventlogHandler().log(
        topic.getTimelineId(),
        ALEventlogConstants.PORTLET_TYPE_TIMELINE,
        topic.getCreateDate().toString());

    } catch (Exception ex) {
      logger.error("Exception", ex);
      return false;
    }
    return true;
  }

  private boolean insertAttachmentFiles(
      List<FileuploadLiteBean> fileuploadList, String folderName, int uid,
      EipTTimeline entry, List<String> msgList) {

    if (fileuploadList == null || fileuploadList.size() <= 0) {
      return true;
    }

    try {
      int length = fileuploadList.size();
      ArrayList<FileuploadLiteBean> newfilebeans =
        new ArrayList<FileuploadLiteBean>();
      FileuploadLiteBean filebean = null;
      for (int i = 0; i < length; i++) {
        filebean = fileuploadList.get(i);
        if (filebean.isNewFile()) {
          newfilebeans.add(filebean);
        }
      }
      int newfilebeansSize = newfilebeans.size();
      if (newfilebeansSize > 0) {
        FileuploadLiteBean newfilebean = null;
        for (int j = 0; j < length; j++) {
          newfilebean = newfilebeans.get(j);
          // サムネイル処理
          String[] acceptExts = ImageIO.getWriterFormatNames();
          byte[] fileThumbnail =
            FileuploadUtils.getBytesShrinkFilebean(
              orgId,
              folderName,
              uid,
              newfilebean,
              acceptExts,
              FileuploadUtils.DEF_THUMBNAIL_WIDTH,
              FileuploadUtils.DEF_THUMBNAIL_HEIGHT,
              msgList);

          String filename = j + "_" + String.valueOf(System.nanoTime());

          // 新規オブジェクトモデル
          EipTTimelineFile file = Database.create(EipTTimelineFile.class);
          file.setOwnerId(Integer.valueOf(uid));
          file.setFileName(newfilebean.getFileName());
          file.setFilePath(TimelineUtils.getRelativePath(filename));
          if (fileThumbnail != null) {
            file.setFileThumbnail(fileThumbnail);
          }
          file.setEipTTimeline(entry);
          file.setCreateDate(Calendar.getInstance().getTime());
          file.setUpdateDate(Calendar.getInstance().getTime());

          // ファイルの移動
          ALStorageService.copyTmpFile(
            uid,
            folderName,
            String.valueOf(newfilebean.getFileId()),
            TimelineUtils.FOLDER_FILEDIR_TIMELIME,
            TimelineUtils.CATEGORY_KEY + ALStorageService.separator() + uid,
            filename);
        }

        // 添付ファイル保存先のフォルダを削除
        ALStorageService.deleteTmpFolder(uid, folderName);
      }

    } catch (Exception e) {
      logger.error(e);
    }
    return true;
  }

  /**
   * データベースに格納されているトピックを更新します。 <BR>
   * 
   * @param rundata
   * @param context
   * @param msgList
   * @return TRUE 成功 FALSE 失敗
   */
  @Override
  protected boolean updateFormData(RunData rundata, Context context,
      List<String> msgList) {
    return false;
  }

  /**
   * 
   * @param rundata
   * @param context
   * @param msgList
   * @return
   * @throws ALPageNotFoundException
   * @throws ALDBErrorException
   */
  @Override
  protected boolean setFormData(RunData rundata, Context context,
      List<String> msgList) throws ALPageNotFoundException, ALDBErrorException {

    boolean res = super.setFormData(rundata, context, msgList);
    if (res) {
      try {
        fileuploadList = TimelineUtils.getFileuploadList(rundata);
      } catch (Exception ex) {
        logger.error("Exception", ex);
      }
    }
    return res;
  }

  /**
   * @param rundata
   * @param context
   * @param msgList
   * @return
   * @throws ALPageNotFoundException
   * @throws ALDBErrorException
   */
  @Override
  protected boolean loadFormData(RunData rundata, Context context,
      List<String> msgList) throws ALPageNotFoundException, ALDBErrorException {
    return false;
  }

  /**
   * メモを取得します。 <BR>
   * 
   * @return
   */
  public ALStringField getNote() {
    return note;
  }

  /**
   * @return parentId
   */
  public int getParentId() {
    return parentId;
  }

  /**
   * @param parentId
   *          セットする parentId
   */
  public void setParentId(int parentId) {
    this.parentId = parentId;
  }

  /**
   * アクセス権限チェック用メソッド。 アクセス権限の機能名を返します。
   * 
   * @return
   */
  @Override
  public String getAclPortletFeature() {
    return aclPortletFeature;
  }

  public void setAclPortletFeature(String aclPortletFeature) {
    this.aclPortletFeature = aclPortletFeature;
  }

  /**
   * 他ユーザのトピックを編集する権限があるかどうかを返します。
   * 
   * @return
   */
  public boolean hasAclUpdateTopicOthers() {
    return hasAclUpdateTopicOthers;
  }

  /**
   * 他ユーザのトピックを削除する権限があるかどうかを返します。
   * 
   * @return
   */
  public boolean hasAclDeleteTopicOthers() {
    return hasAclDeleteTopicOthers;
  }

  /**
   * 
   * @param bool
   */
  public void setHasPhoto(boolean bool) {
    has_photo = bool;
  }

  public boolean hasPhoto() {
    return has_photo;
  }

  public List<FileuploadLiteBean> getAttachmentFileNameList() {
    return fileuploadList;
  }

  /**
   * タイムラインで使用したセッション情報を消去する．
   * 
   */
  public void clearTimelineSession(RunData rundata, Context context) {
    List<String> list = new ArrayList<String>();
    list.add("tlClipImage");
    list.add("tlClipTitle");
    list.add("tlClipUrl");
    list.add("tlClipBody");
    ALEipUtils.removeTemp(rundata, context, list);

  }
}
