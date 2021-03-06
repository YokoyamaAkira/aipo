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

package com.aimluck.eip.report;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.jar.Attributes;

import org.apache.cayenne.exp.Expression;
import org.apache.cayenne.exp.ExpressionFactory;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.services.TurbineServices;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.commons.field.ALStringField;
import com.aimluck.eip.cayenne.om.portlet.EipTReport;
import com.aimluck.eip.cayenne.om.portlet.EipTReportFile;
import com.aimluck.eip.cayenne.om.portlet.EipTReportMap;
import com.aimluck.eip.cayenne.om.portlet.EipTReportMemberMap;
import com.aimluck.eip.cayenne.om.security.TurbineUser;
import com.aimluck.eip.common.ALAbstractSelectData;
import com.aimluck.eip.common.ALDBErrorException;
import com.aimluck.eip.common.ALData;
import com.aimluck.eip.common.ALEipConstants;
import com.aimluck.eip.common.ALEipUser;
import com.aimluck.eip.common.ALPageNotFoundException;
import com.aimluck.eip.common.ALPermissionException;
import com.aimluck.eip.fileupload.beans.FileuploadBean;
import com.aimluck.eip.fileupload.util.FileuploadUtils;
import com.aimluck.eip.modules.actions.common.ALAction;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.orm.query.ResultList;
import com.aimluck.eip.orm.query.SelectQuery;
import com.aimluck.eip.report.util.ReportUtils;
import com.aimluck.eip.services.accessctl.ALAccessControlConstants;
import com.aimluck.eip.services.accessctl.ALAccessControlFactoryService;
import com.aimluck.eip.services.accessctl.ALAccessControlHandler;
import com.aimluck.eip.util.ALEipUtils;

/**
 * 報告書検索データを管理するクラスです。 <BR>
 * 
 */
public class ReportSelectData extends
    ALAbstractSelectData<EipTReport, EipTReport> implements ALData {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(ReportSelectData.class.getName());

  /** サブメニュー（送信） */
  public static final String SUBMENU_CREATED = "created";

  /** サブメニュー（受信） */
  public static final String SUBMENU_REQUESTED = "requested";

  /** サブメニュー（全て） */
  public static final String SUBMENU_ALL = "all";

  /** 親レポートオブジェクト */
  private Object parentReport;

  /** 子レポートオブジェクト */
  private List<ReportResultData> coReportList;

  /** 現在選択されているサブメニュー */
  private String currentSubMenu;

  /** 返信フォーム表示の有無（トピック詳細表示） */
  private boolean showReplyForm = false;

  private ALEipUser login_user;

  /** 他ユーザーの報告書の閲覧権限 */
  private boolean hasAuthorityOther;

  /** 検索ワード */
  private ALStringField target_keyword;

  /** 現在のユーザ **/
  private int uid;

  /** 報告書作成ユーザ **/
  private int view_uid;

  /** アクセス権限の機能名 */
  private String aclPortletFeature = null;

  private boolean isFileUploadable;

  /**
   * 
   * @param action
   * @param rundata
   * @param context
   */
  @Override
  public void init(ALAction action, RunData rundata, Context context)
      throws ALPageNotFoundException, ALDBErrorException {
    uid = ALEipUtils.getUserId(rundata);

    // if (ReportUtils.hasResetFlag(rundata, context)) {
    // ReportUtils.clearReportSession(rundata, context);
    // }
    login_user = ALEipUtils.getALEipUser(rundata);

    String subMenuParam = rundata.getParameters().getString("submenu");
    currentSubMenu = ALEipUtils.getTemp(rundata, context, "submenu");
    if (subMenuParam == null && currentSubMenu == null) {
      ALEipUtils.setTemp(rundata, context, "submenu", SUBMENU_REQUESTED);
      currentSubMenu = SUBMENU_REQUESTED;
    } else if (subMenuParam != null) {
      ALEipUtils.setTemp(rundata, context, "submenu", subMenuParam);
      currentSubMenu = subMenuParam;
    }

    String sort = ALEipUtils.getTemp(rundata, context, LIST_SORT_STR);
    String sorttype = ALEipUtils.getTemp(rundata, context, LIST_SORT_TYPE_STR);

    if (sort == null || sort.equals("")) {
      ALEipUtils.setTemp(rundata, context, LIST_SORT_STR, "create_date");
    }

    if ("create_date".equals(ALEipUtils
      .getTemp(rundata, context, LIST_SORT_STR))
      && (sorttype == null || "".equals(sorttype))) {
      ALEipUtils.setTemp(
        rundata,
        context,
        LIST_SORT_TYPE_STR,
        ALEipConstants.LIST_SORT_TYPE_DESC);
    }

    // 報告書作成ユーザ
    if (rundata.getParameters().getStringKey("clientid") != null) {
      view_uid =
        Integer.parseInt(rundata
          .getParameters()
          .getStringKey("clientid")
          .toString());
    }

    // 報告書通知先に入っているか
    boolean isSelf = ReportUtils.isSelf(rundata, context);

    // アクセス権限
    if ((!ALEipConstants.MODE_DETAIL.equals(action.getMode()) && (!SUBMENU_ALL
      .equals(currentSubMenu)))
      || isSelf
      || uid == view_uid) {
      aclPortletFeature = ALAccessControlConstants.POERTLET_FEATURE_REPORT_SELF;
    } else {
      aclPortletFeature =
        ALAccessControlConstants.POERTLET_FEATURE_REPORT_OTHER;
    }

    ALAccessControlFactoryService aclservice =
      (ALAccessControlFactoryService) ((TurbineServices) TurbineServices
        .getInstance()).getService(ALAccessControlFactoryService.SERVICE_NAME);
    ALAccessControlHandler aclhandler = aclservice.getAccessControlHandler();
    hasAuthorityOther =
      aclhandler.hasAuthority(
        ALEipUtils.getUserId(rundata),
        ALAccessControlConstants.POERTLET_FEATURE_REPORT_OTHER,
        ALAccessControlConstants.VALUE_ACL_LIST);

    // hasAuthorityOther = true;
    showReplyForm = true;
    target_keyword = new ALStringField();

    super.init(action, rundata, context);

    isFileUploadable = ALEipUtils.isFileUploadable(rundata);
  }

  /**
   * 一覧データを取得します。 <BR>
   * 
   * @param rundata
   * @param context
   * @return
   */
  @Override
  public ResultList<EipTReport> selectList(RunData rundata, Context context) {
    try {
      if (ReportUtils.hasResetFlag(rundata, context)) {
        ReportUtils.resetFilter(rundata, context, this.getClass().getName());
        target_keyword.setValue("");
      } else {
        target_keyword.setValue(ReportUtils.getTargetKeyword(rundata, context));
      }
      SelectQuery<EipTReport> query = getSelectQuery(rundata, context);
      buildSelectQueryForFilter(query, rundata, context);
      buildSelectQueryForListView(query);
      buildSelectQueryForListViewSort(query, rundata, context);

      ResultList<EipTReport> list = query.getResultList();
      return list;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * 検索条件を設定した SelectQuery を返します。 <BR>
   * 
   * @param rundata
   * @param context
   * @return
   */
  private SelectQuery<EipTReport> getSelectQuery(RunData rundata,
      Context context) {

    SelectQuery<EipTReport> query = Database.query(EipTReport.class);

    Integer login_user_id =
      Integer.valueOf((int) login_user.getUserId().getValue());
    if ((target_keyword != null) && (!target_keyword.getValue().equals(""))) {
      ALEipUtils.setTemp(rundata, context, LIST_SEARCH_STR, target_keyword
        .getValue());
    } else {
      ALEipUtils.removeTemp(rundata, context, LIST_SEARCH_STR);
    }

    if (ALEipUtils.getTemp(rundata, context, "Report_Maximize") == "false") {
      // 通常画面
      // 受信したもので未読
      SelectQuery<EipTReportMap> q = Database.query(EipTReportMap.class);
      Expression exp1 =
        ExpressionFactory.matchExp(
          EipTReportMap.USER_ID_PROPERTY,
          login_user_id);
      q.andQualifier(exp1);
      Expression exp2 =
        ExpressionFactory.matchExp(
          EipTReportMap.STATUS_PROPERTY,
          ReportUtils.DB_STATUS_UNREAD);
      q.andQualifier(exp2);
      List<EipTReportMap> queryList = q.fetchList();

      List<Integer> resultid = new ArrayList<Integer>();
      for (EipTReportMap item : queryList) {
        if (item.getReportId() != 0 && !resultid.contains(item.getReportId())) {
          resultid.add(item.getReportId());
        } else if (!resultid.contains(item.getReportId())) {
          resultid.add(item.getReportId());
        }
      }
      if (resultid.size() == 0) {
        // 検索結果がないことを示すために-1を代入
        resultid.add(-1);
      }
      Expression ex =
        ExpressionFactory.inDbExp(EipTReport.REPORT_ID_PK_COLUMN, resultid);
      query.andQualifier(ex);

    } else if (SUBMENU_CREATED.equals(currentSubMenu)) {
      // 送信
      Expression exp1 =
        ExpressionFactory.matchExp(EipTReport.USER_ID_PROPERTY, login_user_id);
      query.andQualifier(exp1);

    } else if (SUBMENU_REQUESTED.equals(currentSubMenu)) {
      // 受信
      SelectQuery<EipTReportMap> q = Database.query(EipTReportMap.class);
      Expression exp1 =
        ExpressionFactory.matchExp(
          EipTReportMap.USER_ID_PROPERTY,
          login_user_id);
      q.andQualifier(exp1);
      List<EipTReportMap> queryList = q.fetchList();

      List<Integer> resultid = new ArrayList<Integer>();
      for (EipTReportMap item : queryList) {
        if (item.getReportId() != 0 && !resultid.contains(item.getReportId())) {
          resultid.add(item.getReportId());
        } else if (!resultid.contains(item.getReportId())) {
          resultid.add(item.getReportId());
        }
      }
      if (resultid.size() == 0) {
        // 検索結果がないことを示すために-1を代入
        resultid.add(-1);
      }
      Expression exp3 =
        ExpressionFactory.inDbExp(EipTReport.REPORT_ID_PK_COLUMN, resultid);
      query.andQualifier(exp3);
    } else if (SUBMENU_ALL.equals(currentSubMenu)) {
      // 全て
    }

    // 検索

    String search = ALEipUtils.getTemp(rundata, context, LIST_SEARCH_STR);

    if (search != null && !search.equals("")) {
      current_search = search;
      Expression ex1 =
        ExpressionFactory.likeExp(EipTReport.REPORT_NAME_PROPERTY, "%"
          + search
          + "%");
      Expression ex2 =
        ExpressionFactory.likeExp(EipTReport.NOTE_PROPERTY, "%" + search + "%");
      SelectQuery<EipTReport> q = Database.query(EipTReport.class);
      q.andQualifier(ex1.orExp(ex2));
      List<EipTReport> queryList = q.fetchList();
      List<Integer> resultid = new ArrayList<Integer>();
      for (EipTReport item : queryList) {
        if (item.getParentId() != 0 && !resultid.contains(item.getParentId())) {
          resultid.add(item.getParentId());
        } else if (!resultid.contains(item.getReportId())) {
          resultid.add(item.getReportId());
        }
      }
      if (resultid.size() == 0) {
        // 検索結果がないことを示すために-1を代入
        resultid.add(-1);
      }
      Expression ex3 =
        ExpressionFactory.inDbExp(EipTReport.REPORT_ID_PK_COLUMN, resultid);
      query.andQualifier(ex3);
    }

    // replyを除く
    Expression ex =
      ExpressionFactory.noMatchExp(EipTReport.REPORT_NAME_PROPERTY, "");
    query.andQualifier(ex);
    return query;

  }

  /**
   * ResultData に値を格納して返します。（一覧データ） <BR>
   * 
   * @param obj
   * @return
   */
  @Override
  protected Object getResultData(EipTReport record) {
    try {
      ReportResultData rd = new ReportResultData();
      rd.initField();
      rd.setReportId(record.getReportId().intValue());
      rd.setReportName(record.getReportName());
      rd.setCreateDate(record.getCreateDate());
      rd.setStartDate(record.getStartDate());
      rd.setEndDate(record.getEndDate());
      ALEipUser client = ALEipUtils.getALEipUser(record.getUserId().intValue());
      rd.setClientName(client.getAliasName().getValue());
      rd.setClientId(client.getUserId().getValue());
      // 自身の報告書かを設定する
      Integer login_user_id =
        Integer.valueOf((int) login_user.getUserId().getValue());
      rd.setIsSelfReport(record.getUserId().intValue() == login_user_id
        .intValue());
      return rd;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * 詳細データを取得します。 <BR>
   * 
   * @param rundata
   * @param context
   * @return
   */
  @Override
  public EipTReport selectDetail(RunData rundata, Context context)
      throws ALPageNotFoundException, ALDBErrorException {
    EipTReport request = ReportUtils.getEipTReport(rundata, context);

    return request;
  }

  /**
   * 詳細表示します。
   * 
   * @param action
   * @param rundata
   * @param context
   * @return TRUE 成功 FASLE 失敗
   */
  @Override
  public boolean doViewDetail(ALAction action, RunData rundata, Context context) {
    try {
      init(action, rundata, context);
      doCheckAclPermission(
        rundata,
        context,
        ALAccessControlConstants.VALUE_ACL_DETAIL);
      action.setMode(ALEipConstants.MODE_DETAIL);
      List<EipTReport> aList = selectDetailList(rundata, context);
      if (aList != null) {
        coReportList = new ArrayList<ReportResultData>();
        int size = aList.size();
        for (int i = 0; i < size; i++) {
          coReportList
            .add((ReportResultData) getResultDataDetail(aList.get(i)));
        }
      }

      action.setResultData(this);
      action.putData(rundata, context);
      return true;
    } catch (ALPermissionException e) {
      ALEipUtils.redirectPermissionError(rundata);
      return false;
    } catch (ALPageNotFoundException e) {
      ALEipUtils.redirectPageNotFound(rundata);
      return false;
    } catch (ALDBErrorException e) {
      ALEipUtils.redirectDBError(rundata);
      return false;
    }
  }

  /**
   * 詳細データを取得します。 <BR>
   * 
   * @param rundata
   * @param context
   * @return
   */
  public List<EipTReport> selectDetailList(RunData rundata, Context context)
      throws ALPageNotFoundException, ALDBErrorException {
    String reportid =
      ALEipUtils.getTemp(rundata, context, ALEipConstants.ENTITY_ID);

    if (reportid == null || Integer.valueOf(reportid) == null) {
      // トピック ID が空の場合
      logger.debug("[ReportTopic] Empty ID...");
      throw new ALPageNotFoundException();
    }

    String coreportsort =
      ALEipUtils
        .getPortlet(rundata, context)
        .getPortletConfig()
        .getInitParameter("p2b-sort");

    try {
      parentReport =
        getResultDataDetail(ReportUtils.getEipTReportParentReply(
          rundata,
          context,
          false));

      SelectQuery<EipTReport> query =
        getSelectQueryForCoreport(rundata, context, reportid, coreportsort);
      /** 詳細画面は全件表示する */
      // buildSelectQueryForListView(query);
      if ("response_new".equals(coreportsort)) {
        query.orderDesending(EipTReport.CREATE_DATE_PROPERTY);
      } else {
        query.orderAscending(EipTReport.CREATE_DATE_PROPERTY);
      }

      List<EipTReport> resultList = query.fetchList();

      // 表示するカラムのみデータベースから取得する．
      return resultList;
    } catch (ALPageNotFoundException pageNotFound) {
      // logger.error("[ReportSelectData]", pageNotFound);
      throw pageNotFound;
    } catch (Exception ex) {
      logger.error("[ReportSelectData]", ex);
      throw new ALDBErrorException();
    }
  }

  private SelectQuery<EipTReport> getSelectQueryForCoreport(RunData rundata,
      Context context, String reportid, String coreportsort) {
    SelectQuery<EipTReport> query = Database.query(EipTReport.class);
    Expression exp =
      ExpressionFactory.matchExp(EipTReport.PARENT_ID_PROPERTY, Integer
        .valueOf(reportid));
    query.setQualifier(exp);
    query.distinct(true);
    return query;
  }

  /**
   * ResultData に値を格納して返します。（詳細データ） <BR>
   * 
   * @param obj
   * @return
   */
  @Override
  protected Object getResultDataDetail(EipTReport obj)
      throws ALPageNotFoundException, ALDBErrorException {

    try {

      EipTReport record = obj;
      ReportDetailResultData rd = new ReportDetailResultData();
      rd.initField();
      rd.setUserId(record.getUserId().longValue());
      rd.setStartDate(record.getStartDate());
      rd.setEndDate(record.getEndDate());
      rd.setReportName(record.getReportName());
      rd.setReportId(record.getReportId().longValue());
      rd.setNote(record.getNote());
      ALEipUser client = ALEipUtils.getALEipUser(record.getUserId().intValue());
      rd.setClientName(client.getAliasName().getValue());
      // 自身の報告書かを設定する
      Integer login_user_id =
        Integer.valueOf((int) login_user.getUserId().getValue());
      rd.setIsSelfReport(record.getUserId().intValue() == login_user_id);

      List<Integer> users = new ArrayList<Integer>();
      EipTReportMap map = null;
      List<EipTReportMap> tmp_maps = ReportUtils.getEipTReportMap(record);
      HashMap<Integer, String> statusList = new HashMap<Integer, String>();

      if (record.getParentId().intValue() == 0) {
        int size = tmp_maps.size();
        for (int i = 0; i < size; i++) {
          map = tmp_maps.get(i);
          users.add(map.getUserId());
          if (map.getUserId().intValue() == login_user_id) {
            // 既読に変更する
            map.setStatus(ReportUtils.DB_STATUS_READ);
            Database.commit();
          }
          statusList.put(map.getUserId(), map.getStatus());
        }
        rd.setStatusList(statusList);
        SelectQuery<TurbineUser> query = Database.query(TurbineUser.class);
        Expression exp =
          ExpressionFactory.inDbExp(TurbineUser.USER_ID_PK_COLUMN, users);
        query.setQualifier(exp);
        rd.setMapList(ALEipUtils.getUsersFromSelectQuery(query));

        List<Integer> users1 = new ArrayList<Integer>();
        EipTReportMemberMap map1 = null;
        List<EipTReportMemberMap> tmp_maps1 =
          ReportUtils.getEipTReportMemberMap(record);
        int size1 = tmp_maps1.size();
        for (int i = 0; i < size1; i++) {
          map1 = tmp_maps1.get(i);
          users1.add(map1.getUserId());
        }
        SelectQuery<TurbineUser> query1 = Database.query(TurbineUser.class);
        Expression exp1 =
          ExpressionFactory.inDbExp(TurbineUser.USER_ID_PK_COLUMN, users1);
        query1.setQualifier(exp1);
        rd.setMemberList(ALEipUtils.getUsersFromSelectQuery(query1));
      }

      // ファイルリスト
      List<EipTReportFile> list =
        ReportUtils
          .getSelectQueryForFiles(record.getReportId().intValue())
          .fetchList();
      if (list != null && list.size() > 0) {
        List<FileuploadBean> attachmentFileList =
          new ArrayList<FileuploadBean>();
        FileuploadBean filebean = null;
        for (EipTReportFile file : list) {
          String realname = file.getFileName();
          javax.activation.DataHandler hData =
            new javax.activation.DataHandler(
              new javax.activation.FileDataSource(realname));

          filebean = new FileuploadBean();
          filebean.setFileId(file.getFileId().intValue());
          filebean.setFileName(realname);
          if (hData != null) {
            filebean.setContentType(hData.getContentType());
          }
          filebean.setIsImage(FileuploadUtils.isImage(realname));
          attachmentFileList.add(filebean);
        }
        rd.setAttachmentFiles(attachmentFileList);
      }
      rd.setCreateDate(record.getCreateDate());
      rd.setUpdateDate(record.getUpdateDate());
      // rd.setCreateDate(ReportUtils.translateDate(
      // record.getCreateDate(),
      // "yyyy年M月d日H時m分"));
      // rd.setUpdateDate(ReportUtils.translateDate(
      // record.getUpdateDate(),
      // "yyyy年M月d日H時m分"));

      return rd;
    } catch (Exception ex) {
      logger.error("Exception", ex);
      return null;
    }
  }

  /**
   * @return
   * 
   */
  @Override
  protected Attributes getColumnMap() {
    Attributes map = new Attributes();
    map.putValue("report_name", EipTReport.REPORT_NAME_PROPERTY);
    map.putValue("create_date", EipTReport.CREATE_DATE_PROPERTY);
    map.putValue("user_id", EipTReport.USER_ID_PROPERTY);
    map.putValue("parent_id", EipTReport.PARENT_ID_PROPERTY);
    map.putValue("start_date", EipTReport.START_DATE_PROPERTY);
    return map;
  }

  /**
   * 現在選択されているサブメニューを取得します。 <BR>
   * 
   * @return
   */
  public String getCurrentSubMenu() {
    return this.currentSubMenu;
  }

  public ALEipUser getLoginUser() {
    return login_user;
  }

  public boolean showReplyForm() {
    return showReplyForm;
  }

  public List<ReportResultData> getCoReportList() {
    return coReportList;
  }

  public Object getParentReport() {
    return parentReport;
  }

  /**
   * アクセス権限チェック用メソッド。<br />
   * アクセス権限の機能名を返します。
   * 
   * @return
   */
  @Override
  public String getAclPortletFeature() {
    // return ALAccessControlConstants.POERTLET_FEATURE_REPORT_SELF;
    return aclPortletFeature;
  }

  public boolean hasAuthorityOther() {
    return hasAuthorityOther;
  }

  /**
   * @return target_keyword
   */
  public ALStringField getTargetKeyword() {
    return target_keyword;
  }

  public boolean isFileUploadable() {
    return isFileUploadable;
  }
}
