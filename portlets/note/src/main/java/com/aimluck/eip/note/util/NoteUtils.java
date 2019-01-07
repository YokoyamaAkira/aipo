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

package com.aimluck.eip.note.util;

import java.util.List;

import org.apache.cayenne.exp.Expression;
import org.apache.cayenne.exp.ExpressionFactory;
import org.apache.jetspeed.om.profile.Entry;
import org.apache.jetspeed.om.profile.Portlets;
import org.apache.jetspeed.services.JetspeedSecurity;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.jetspeed.services.resources.JetspeedResources;
import org.apache.jetspeed.services.rundata.JetspeedRunData;
import org.apache.jetspeed.util.template.JetspeedLink;
import org.apache.jetspeed.util.template.JetspeedLinkFactory;
import org.apache.turbine.util.DynamicURI;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.commons.field.ALDateTimeField;
import com.aimluck.eip.cayenne.om.portlet.EipTNote;
import com.aimluck.eip.cayenne.om.portlet.EipTNoteMap;
import com.aimluck.eip.cayenne.om.security.TurbineGroup;
import com.aimluck.eip.cayenne.om.security.TurbineUser;
import com.aimluck.eip.common.ALActivity;
import com.aimluck.eip.common.ALEipConstants;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.orm.query.SelectQuery;
import com.aimluck.eip.services.eventlog.ALEventlogConstants;
import com.aimluck.eip.services.eventlog.ALEventlogFactoryService;
import com.aimluck.eip.services.social.ALActivityService;
import com.aimluck.eip.services.social.model.ALActivityPutRequest;
import com.aimluck.eip.util.ALEipUtils;

/**
 * 伝言メモのユーティリティクラスです
 */
public class NoteUtils {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(NoteUtils.class.getName());

  public static final String DATE_TIME_FORMAT =
    ALDateTimeField.DEFAULT_DATE_TIME_FORMAT;

  public static final String CREATED_DATE_FORMAT =
    ALDateTimeField.DEFAULT_DATE_FORMAT;

  public static final String TARGET_GROUP_NAME = "target_group_name";

  public static final String TARGET_USER_ID = "target_user_id";

  public static final String NOTE_VIEW_TYPE = "note_view_type";

  public static final String NOTE_VIEW_TYPE_LIST = "note_view_list";

  public static final String NOTE_VIEW_TYPE_GROUP = "note_view_group";

  public static final String NOTE_STAT_NEW = "1";

  public static final String NOTE_STAT_UNREAD = "2";

  public static final String NOTE_STAT_READ = "3";

  public static final String NOTE_STAT_DELETED = "4";

  public static final String NOTE_PORTLET_NAME = "Note";

  public static final String NOTE_GROUP_PORTLET_NAME = "NoteGroup";

  /** 検索キーワード変数の識別子 */
  public static final String TARGET_KEYWORD = "keyword";

  /** パラメータリセットの識別子 */
  private static final String RESET_FLAG = "reset_params";

  /**
   * 詳細表示用の EipTNote オブジェクトモデルを取得する．
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static EipTNote getEipTNoteDetail(RunData rundata, Context context,
      SelectQuery<EipTNote> query) {
    String noteId =
      ALEipUtils.getTemp(rundata, context, ALEipConstants.ENTITY_ID);

    int uid = ALEipUtils.getUserId(rundata);

    // アクセス権の判定
    Expression exp1 =
      ExpressionFactory.matchExp(EipTNoteMap.NOTE_ID_PROPERTY, Integer
        .valueOf(noteId));
    Expression exp2 =
      ExpressionFactory.matchExp(EipTNoteMap.USER_ID_PROPERTY, uid);

    List<EipTNoteMap> maps =
      Database.query(EipTNoteMap.class, exp1.andExp(exp2)).fetchList();
    if (maps == null || maps.size() == 0) {
      // 指定したアカウントIDのレコードが見つからない場合
      logger.debug("[Note] Invalid user access...");
      return null;
    }

    try {
      if (noteId == null
        || noteId.equals("")
        || Integer.valueOf(noteId) == null) {
        // アカウントIDが空の場合
        logger.debug("[Note] Empty NoteID...");
        return null;
      }

      Expression exp =
        ExpressionFactory.matchDbExp(EipTNote.NOTE_ID_PK_COLUMN, Integer
          .valueOf(noteId));

      List<EipTNote> notes = query.andQualifier(exp).fetchList();
      if (notes == null || notes.size() == 0) {
        // 指定したアカウントIDのレコードが見つからない場合
        logger.debug("[Note] Not found NoteID...");
        return null;
      }
      return notes.get(0);
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * EipTNote オブジェクトモデルを取得する．
   * 
   * @param rundata
   * @param context
   * @param isJoin
   *          カテゴリテーブルをJOINするかどうか
   * @return
   */
  public static EipTNoteMap getEipTNoteMap(RunData rundata, Context context,
      SelectQuery<EipTNoteMap> query) {

    String noteId =
      ALEipUtils.getTemp(rundata, context, ALEipConstants.ENTITY_ID);

    try {
      if (noteId == null
        || noteId.equals("")
        || Integer.valueOf(noteId) == null) {
        // アカウントIDが空の場合
        logger.debug("[Note] Empty NoteID...");
        return null;
      }

      Expression exp1 =
        ExpressionFactory.matchDbExp(EipTNote.NOTE_ID_PK_COLUMN, noteId);
      Expression exp2 =
        ExpressionFactory.matchExp(EipTNoteMap.DEL_FLG_PROPERTY, "F");

      List<EipTNoteMap> maps =
        query.andQualifier(exp1).andQualifier(exp2).fetchList();
      if (maps == null || maps.size() == 0) {
        // 指定したアカウントIDのレコードが見つからない場合
        logger.debug("[Note] Not found NoteID...");
        return null;
      }
      return maps.get(0);
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * 
   * @param rundata
   * @param context
   * @param tabReceive
   * @param nodeIds
   * @return
   */
  public static List<EipTNoteMap> getEipTNoteMapList(RunData rundata,
      Context context, boolean tabReceive, String[] nodeIds) {

    if (nodeIds == null) {
      return null;
    }

    try {
      Integer userid = Integer.valueOf(ALEipUtils.getUserId(rundata));
      SelectQuery<EipTNoteMap> query = Database.query(EipTNoteMap.class);

      Expression exp1 =
        ExpressionFactory.inDbExp(EipTNote.NOTE_ID_PK_COLUMN, nodeIds);
      query.setQualifier(exp1);

      if (tabReceive) {
        Expression exp2 =
          ExpressionFactory.matchExp(EipTNoteMap.USER_ID_PROPERTY, userid);
        query.andQualifier(exp2);
        Expression exp3 =
          ExpressionFactory.noMatchExp(EipTNoteMap.EIP_TNOTE_PROPERTY
            + "."
            + EipTNote.OWNER_ID_PROPERTY, userid);
        query.andQualifier(exp3);
      } else {
        Expression exp2 =
          ExpressionFactory.matchExp(EipTNoteMap.USER_ID_PROPERTY, userid);
        query.andQualifier(exp2);
        Expression exp3 =
          ExpressionFactory.matchExp(EipTNoteMap.EIP_TNOTE_PROPERTY
            + "."
            + EipTNote.OWNER_ID_PROPERTY, userid);
        query.andQualifier(exp3);
      }

      List<EipTNoteMap> noteMaps = query.fetchList();
      if (noteMaps == null || noteMaps.size() == 0) {
        // 指定したアカウントIDのレコードが見つからない場合
        logger.debug("[Note] Not found NoteIDs...");
        return null;
      }

      return noteMaps;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * ユーザのログイン名をもとにユーザ ID を取得する．
   * 
   * @param userLoginName
   *          ユーザのログイン名
   * @return
   */
  public static String getUserId(String userLoginName) {
    if (userLoginName == null || userLoginName.equals("")) {
      return null;
    }
    String userId = null;

    try {
      Expression exp =
        ExpressionFactory.matchExp(
          TurbineUser.LOGIN_NAME_PROPERTY,
          userLoginName);

      List<TurbineUser> destUserList =
        Database.query(TurbineUser.class).setQualifier(exp).fetchList();
      if (destUserList == null || destUserList.size() <= 0) {
        return null;
      }
      userId = (destUserList.get(0)).getUserId().toString();
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
    return userId;
  }

  /**
   * 指定した ID に対するユーザのログイン名を取得する．
   * 
   * @param userId
   * @return
   */
  public static String getUserName(String userId) {
    if (userId == null || userId.equals("")) {
      return null;
    }

    String userName = null;

    try {
      Expression exp =
        ExpressionFactory.matchDbExp(TurbineUser.USER_ID_PK_COLUMN, Integer
          .valueOf(userId));

      List<TurbineUser> destUserList =
        Database.query(TurbineUser.class).setQualifier(exp).fetchList();
      if (destUserList == null || destUserList.size() <= 0) {
        return null;
      }
      userName = (destUserList.get(0)).getLoginName();
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
    return userName;
  }

  /**
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static TurbineGroup getGroup(RunData rundata, Context context) {

    String id = ALEipUtils.getTemp(rundata, context, ALEipConstants.ENTITY_ID);

    try {
      if (id == null) {
        logger.debug("Empty ID...");
        return null;
      }

      return (TurbineGroup) JetspeedSecurity.getGroup(id);
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * 
   * @param str
   * @return
   */
  public static Integer string2integer(String str) {
    Integer integ = null;
    try {
      integ = Integer.valueOf(str);
    } catch (NumberFormatException ex) {
      integ = null;
    }
    return integ;
  }

  /**
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static String getTargetGroupName(RunData rundata, Context context) {
    String target_group_name = null;
    String idParam = rundata.getParameters().getString(TARGET_GROUP_NAME);
    target_group_name = ALEipUtils.getTemp(rundata, context, TARGET_GROUP_NAME);
    if (idParam == null && target_group_name == null) {
      ALEipUtils.setTemp(rundata, context, TARGET_GROUP_NAME, "all");
      target_group_name = "all";
    } else if (idParam != null) {
      ALEipUtils.setTemp(rundata, context, TARGET_GROUP_NAME, idParam);
      target_group_name = idParam;
    }
    return target_group_name;
  }

  /**
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static String getTargetUserId(RunData rundata, Context context) {
    String target_user_id = null;
    String idParam = rundata.getParameters().getString(TARGET_USER_ID);
    target_user_id = ALEipUtils.getTemp(rundata, context, TARGET_USER_ID);

    if (idParam == null && (target_user_id == null)) {
      ALEipUtils.setTemp(rundata, context, TARGET_USER_ID, "all");
      target_user_id = "all";
    } else if (idParam != null) {
      ALEipUtils.setTemp(rundata, context, TARGET_USER_ID, idParam);
      target_user_id = idParam;
    }
    return target_user_id;
  }

  /**
   * 表示切り替えで指定した検索キーワードを取得する．
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static String getTargetKeyword(RunData rundata, Context context) {
    String target_keyword = null;
    String keywordParam = rundata.getParameters().getString(TARGET_KEYWORD);
    target_keyword = ALEipUtils.getTemp(rundata, context, TARGET_KEYWORD);

    if (keywordParam == null && (target_keyword == null)) {
      ALEipUtils.setTemp(rundata, context, TARGET_KEYWORD, "");
      target_keyword = "";
    } else if (keywordParam != null) {
      ALEipUtils.setTemp(rundata, context, TARGET_KEYWORD, keywordParam.trim());
      target_keyword = keywordParam;
    }
    return target_keyword;
  }

  /**
   * 表示切り替えのリセットフラグがあるかを返す．
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static boolean hasResetFlag(RunData rundata, Context context) {
    String resetflag = rundata.getParameters().getString(RESET_FLAG);
    return resetflag != null;
  }

  /**
   * フィルターを初期化する．
   * 
   * @param rundata
   * @param context
   * @param className
   */
  public static void resetFilter(RunData rundata, Context context,
      String className) {
    ALEipUtils.setTemp(rundata, context, TARGET_KEYWORD, "");
  }

  /**
   * 
   * @param rundata
   * @param context
   * @param values
   * @param msgList
   * @return
   */
  public static boolean deleteNotes(RunData rundata, Context context,
      List<String> values, List<String> msgList) {

    boolean tabReceive = true;
    String currentTab = NoteUtils.getCurrentTab(rundata, context);
    if ("received_notes".equals(currentTab)) {
      tabReceive = true;
    } else {
      tabReceive = false;
    }

    try {
      String user_id = Integer.toString(ALEipUtils.getUserId(rundata));
      if (user_id == null) {
        return false;
      }

      // オブジェクトモデルを取得
      String[] noteIds = new String[values.size()];
      noteIds = values.toArray(noteIds);

      List<EipTNoteMap> eipTNoteMaps =
        NoteUtils.getEipTNoteMapList(rundata, context, tabReceive, noteIds);

      if (eipTNoteMaps == null) {
        return false;
      }

      for (EipTNoteMap noteMap : eipTNoteMaps) {
        EipTNote tmpnote = noteMap.getEipTNote();

        Expression mapexp =
          ExpressionFactory.matchExp(EipTNoteMap.NOTE_ID_PROPERTY, tmpnote
            .getNoteId());

        List<EipTNoteMap> maplist =
          Database.query(EipTNoteMap.class, mapexp).fetchList();

        if (maplist != null && maplist.size() > 0) {
          int count = 0;
          int size = maplist.size();
          for (EipTNoteMap tmpmap : maplist) {
            if ("T".equals(tmpmap.getDelFlg())) {
              count++;
            }
          }
          if (count == size - 1) {
            // 伝言メモを削除する．
            Database.delete(noteMap.getEipTNote());
          } else {
            // 伝言メモのマップの削除フラグを立てる．
            noteMap.setDelFlg("T");
          }

          // イベントログに保存
          ALEventlogFactoryService.getInstance().getEventlogHandler().log(
            noteMap.getEipTNote().getNoteId(),
            ALEventlogConstants.PORTLET_TYPE_NOTE,
            getNoteSubject(noteMap.getEipTNote()));

        }
      }

      Database.commit();
    } catch (Exception ex) {
      Database.rollback();
      logger.error("Exception", ex);
      return false;
    }
    return true;
  }

  /**
   * 
   * @param note
   * @return
   */
  public static String getNoteSubject(EipTNote note) {
    String subject = "";
    if (note.getSubjectType().equals("0")) {
      subject = note.getCustomSubject();
    } else if (note.getSubjectType().equals("1")) {
      subject = "再度電話します";
    } else if (note.getSubjectType().equals("2")) {
      subject = "電話をしてください";
    } else if (note.getSubjectType().equals("3")) {
      subject = "電話がありました";
    } else if (note.getSubjectType().equals("4")) {
      subject = "伝言があります";
    }
    return subject + " (" + note.getClientName() + ")";
  }

  /**
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static String getCurrentTab(RunData rundata, Context context) {
    String tabParam = rundata.getParameters().getString("tab");
    String currentTab = ALEipUtils.getTemp(rundata, context, "tab");
    if (tabParam == null && currentTab == null) {
      ALEipUtils.setTemp(rundata, context, "tab", "received_notes");
      currentTab = "received_notes";
    } else if (tabParam != null) {
      ALEipUtils.setTemp(rundata, context, "tab", tabParam);
      currentTab = tabParam;
    }
    return currentTab;
  }

  /**
   * 
   * @param rundata
   * @param context
   * @return
   */
  public static SelectQuery<EipTNoteMap> getSelectQueryNoteList(
      RunData rundata, Context context) {
    String userId = Integer.toString(ALEipUtils.getUserId(rundata));

    SelectQuery<EipTNoteMap> query = Database.query(EipTNoteMap.class);
    Expression exp01 =
      ExpressionFactory.matchExp(
        EipTNoteMap.NOTE_STAT_PROPERTY,
        NoteUtils.NOTE_STAT_NEW);
    Expression exp02 =
      ExpressionFactory.matchExp(
        EipTNoteMap.NOTE_STAT_PROPERTY,
        NoteUtils.NOTE_STAT_UNREAD);
    query.setQualifier(exp01.orExp(exp02));

    Expression exp1 =
      ExpressionFactory.matchExp(EipTNoteMap.USER_ID_PROPERTY, Integer
        .valueOf(userId));
    query.andQualifier(exp1);
    Expression exp2 =
      ExpressionFactory.matchExp(EipTNoteMap.DEL_FLG_PROPERTY, "F");
    query.andQualifier(exp2);
    Expression exp3 =
      ExpressionFactory.noMatchExp(EipTNoteMap.EIP_TNOTE_PROPERTY
        + "."
        + EipTNote.OWNER_ID_PROPERTY, Integer.valueOf(userId));
    query.andQualifier(exp3);

    return query;
  }

  /**
   * 受信した新着メモの総数を取得する．
   * 
   * @param userid
   * @return
   */
  public static int getNewReceivedNoteAllSum(RunData rundata, String userId) {
    int newNoteAllSum = 0;
    try {
      SelectQuery<EipTNote> query =
        getSelectQueryForNewReceivedNoteCount(userId);
      List<EipTNote> list = query.fetchList();
      newNoteAllSum = (list != null && list.size() > 0) ? list.size() : 0;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return 0;
    }
    return newNoteAllSum;
  }

  /**
   * 
   * @param srcUserId
   * @return
   */
  private static SelectQuery<EipTNote> getSelectQueryForNewReceivedNoteCount(
      String srcUserId) {
    try {
      SelectQuery<EipTNote> query = Database.query(EipTNote.class);
      Expression exp1 =
        ExpressionFactory.noMatchExp(EipTNote.OWNER_ID_PROPERTY, Integer
          .valueOf(srcUserId));
      query.setQualifier(exp1);
      Expression exp2 =
        ExpressionFactory.matchExp(EipTNote.EIP_TNOTE_MAPS_PROPERTY
          + "."
          + EipTNoteMap.USER_ID_PROPERTY, Integer.valueOf(srcUserId));
      query.andQualifier(exp2);
      Expression exp3 =
        ExpressionFactory.matchExp(EipTNote.EIP_TNOTE_MAPS_PROPERTY
          + "."
          + EipTNoteMap.DEL_FLG_PROPERTY, "F");
      query.andQualifier(exp3);
      Expression exp4 =
        ExpressionFactory.matchExp(EipTNote.EIP_TNOTE_MAPS_PROPERTY
          + "."
          + EipTNoteMap.NOTE_STAT_PROPERTY, NoteUtils.NOTE_STAT_NEW);
      query.andQualifier(exp4);
      return query;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * 受信した未読メモの総数を取得する
   * 
   * @param userId
   * @return
   */
  public static int getUnreadReceivedNotesAllSum(RunData rundata, String userId) {
    int unreadNotesAllSum = 0;
    try {
      // 未読数をセットする．
      SelectQuery<EipTNote> query =
        getSelectQueryForUnreadReceivedNoteCount(userId);
      List<EipTNote> list = query.fetchList();
      unreadNotesAllSum = (list != null && list.size() > 0) ? list.size() : 0;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return 0;
    }
    return unreadNotesAllSum;
  }

  /**
   * 
   * @param srcUserId
   * @return
   */
  private static SelectQuery<EipTNote> getSelectQueryForUnreadReceivedNoteCount(
      String srcUserId) {
    try {
      SelectQuery<EipTNote> query = Database.query(EipTNote.class);
      Expression exp1 =
        ExpressionFactory.noMatchExp(EipTNote.OWNER_ID_PROPERTY, Integer
          .valueOf(srcUserId));
      query.setQualifier(exp1);
      Expression exp2 =
        ExpressionFactory.matchExp(EipTNote.EIP_TNOTE_MAPS_PROPERTY
          + "."
          + EipTNoteMap.USER_ID_PROPERTY, Integer.valueOf(srcUserId));
      query.andQualifier(exp2);
      Expression exp3 =
        ExpressionFactory.matchExp(EipTNote.EIP_TNOTE_MAPS_PROPERTY
          + "."
          + EipTNoteMap.DEL_FLG_PROPERTY, "F");
      query.andQualifier(exp3);
      Expression exp4 =
        ExpressionFactory.matchExp(EipTNote.EIP_TNOTE_MAPS_PROPERTY
          + "."
          + EipTNoteMap.NOTE_STAT_PROPERTY, NoteUtils.NOTE_STAT_UNREAD);
      query.andQualifier(exp4);
      return query;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * 指定したエントリー名を持つ個人設定ページに含まれるポートレットへの URI を取得する．
   * 
   * @param rundata
   * @param portletEntryName
   *          PSML ファイルに記述されているタグ entry の要素 parent
   * @return
   */
  public static String getPortletURIinPersonalConfigPane(RunData rundata,
      String portletEntryName) {
    try {
      Portlets portlets =
        ((JetspeedRunData) rundata).getProfile().getDocument().getPortlets();
      if (portlets == null) {
        return null;
      }

      Portlets[] portletList = portlets.getPortletsArray();
      if (portletList == null) {
        return null;
      }

      int length = portletList.length;
      for (int i = 0; i < length; i++) {
        Entry[] entries = portletList[i].getEntriesArray();
        if (entries == null || entries.length <= 0) {
          continue;
        }

        int ent_length = entries.length;
        for (int j = 0; j < ent_length; j++) {
          if (entries[j].getParent().equals(portletEntryName)) {
            JetspeedLink jsLink = JetspeedLinkFactory.getInstance(rundata);

            DynamicURI duri =
              jsLink.getLink(
                JetspeedLink.CURRENT,
                null,
                null,
                JetspeedLink.CURRENT,
                null);
            duri =
              duri
                .addPathInfo(
                  JetspeedResources.PATH_PANEID_KEY,
                  portletList[i].getId() + "," + entries[j].getId())
                .addQueryData(
                  JetspeedResources.PATH_ACTION_KEY,
                  "controls.Restore");
            return duri.toString();
          }
        }
      }
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
    return null;
  }

  public static void sendNoteActivity(EipTNote note, String loginName,
      List<String> recipients) {
    if (recipients != null && recipients.size() > 0) {
      ALActivity RecentActivity =
        ALActivity.getRecentActivity("Note", note.getNoteId(), 1f);
      boolean isDeletePrev =
        RecentActivity != null && RecentActivity.isReplace(loginName);

      String subjectType = note.getSubjectType();
      String subject = "";
      if ("0".equals(subjectType)) {
        subject = note.getCustomSubject();
      } else if ("1".equals(subjectType)) {
        subject = "再度電話します。";
      } else if ("2".equals(subjectType)) {
        subject = "折返しお電話ください。";
      } else if ("3".equals(subjectType)) {
        subject = "連絡があったことをお伝えください。";
      } else if ("4".equals(subjectType)) {
        subject = "伝言をお願いします。";
      }
      String title =
        new StringBuilder(note.getClientName())
          .append("様より伝言「")
          .append(subject)
          .append("」がありました。")
          .toString();
      String portletParams =
        new StringBuilder("?template=NoteDetailScreen")
          .append("&entityid=")
          .append(note.getNoteId())
          .toString();
      ALActivityService.create(new ALActivityPutRequest()
        .withAppId("Note")
        .withUserId(Integer.valueOf(note.getOwnerId()))
        .withLoginName(loginName)
        .withPortletParams(portletParams)
        .withRecipients(recipients)
        .withTitle(title)
        .withPriority(1f)
        .withExternalId(String.valueOf(note.getNoteId())));

      if (isDeletePrev) {
        RecentActivity.Delete();
      }
    }
  }

}
