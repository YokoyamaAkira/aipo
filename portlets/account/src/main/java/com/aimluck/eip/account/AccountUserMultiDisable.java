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

package com.aimluck.eip.account;

import java.util.List;

import org.apache.cayenne.exp.Expression;
import org.apache.cayenne.exp.ExpressionFactory;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.eip.account.util.AccountUtils;
import com.aimluck.eip.cayenne.om.security.TurbineUser;
import com.aimluck.eip.common.ALAbstractCheckList;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.orm.query.SelectQuery;
import com.aimluck.eip.services.config.ALConfigHandler.Property;
import com.aimluck.eip.services.config.ALConfigService;
import com.aimluck.eip.services.datasync.ALDataSyncFactoryService;
import com.aimluck.eip.util.ALEipUtils;

/**
 * ユーザアカウントを複数無効化するためのクラス． <BR>
 *
 */
public class AccountUserMultiDisable extends ALAbstractCheckList {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(AccountUserMultiDelete.class.getName());

  /**
   *
   * @param rundata
   * @param context
   * @param values
   * @param msgList
   * @return
   */
  @Override
  protected boolean action(RunData rundata, Context context,
      List<String> values, List<String> msgList) {

    try {
      // WebAPIのDBへ接続できるか確認
      if (!ALDataSyncFactoryService
        .getInstance()
        .getDataSyncHandler()
        .checkConnect()) {
        msgList.add("コントロールパネルWebAPIのデータベースの接続に失敗したため、処理は実行されませんでした。");
        return false;
      }

      Expression exp =
        ExpressionFactory.inExp(TurbineUser.LOGIN_NAME_PROPERTY, values);
      SelectQuery<TurbineUser> query = Database.query(TurbineUser.class, exp);
      List<TurbineUser> ulist = query.fetchList();
      if (ulist == null || ulist.size() == 0) {
        return false;
      }

      int size = ulist.size();
      int admin_count = 0;
      String[] user_name_list = new String[size];

      // 予めバリデーション
      for (TurbineUser user : ulist) {
        if (user.getLoginName().equals(rundata.getUser().getUserName())) {
          msgList.add("ログイン中のユーザを無効にすることは出来ません。");
          return false;
        }
        if (ALEipUtils.isAdmin(user.getUserId())) {
          admin_count++;
        }
      }

      if (!AccountUtils.isAdminDeletable(admin_count)) {
        msgList.add("最低でも"
          + Integer.valueOf(ALConfigService
            .get(Property.MINIMUM_ADMINISTRATOR_USER_COUNT))
          + " 人の管理者権限を持ったログイン可能なユーザーが必要です。");
        return false;
      }

      for (int i = 0; i < size; i++) {
        TurbineUser record = ulist.get(i);
        String user_name = record.getLoginName();
        user_name_list[i] = user_name;
        if (user_name == null) {
          return false;
        }

        TurbineUser user =
          Database.get(
            TurbineUser.class,
            TurbineUser.LOGIN_NAME_COLUMN,
            user_name);

        if (ALEipUtils.isAdmin(user.getUserId())
          && !AccountUtils.isAdminDeletable()) {
          return false;
        }

        // ユーザーを無効化
        user.setPositionId(Integer.valueOf(0));
        user.setDisabled("N");

        // ワークフロー自動承認
        AccountUtils.acceptWorkflow(user.getUserId());
      }

      Database.commit();

      // WebAPIとのDB同期
      if (!ALDataSyncFactoryService
        .getInstance()
        .getDataSyncHandler()
        .multiDisableUser(user_name_list, size)) {
        return false;
      }

      return msgList.size() == 0;
    } catch (Exception e) {
      Database.rollback();
      logger.error("Exception", e);
      return false;
    }
  }
}
