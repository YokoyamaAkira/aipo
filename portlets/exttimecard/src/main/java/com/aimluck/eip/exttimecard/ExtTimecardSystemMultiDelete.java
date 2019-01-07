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

package com.aimluck.eip.exttimecard;

import java.util.ArrayList;
import java.util.List;

import org.apache.cayenne.exp.Expression;
import org.apache.cayenne.exp.ExpressionFactory;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.eip.cayenne.om.portlet.EipTExtTimecardSystem;
import com.aimluck.eip.common.ALAbstractCheckList;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.orm.query.SelectQuery;
import com.aimluck.eip.services.eventlog.ALEventlogConstants;
import com.aimluck.eip.services.eventlog.ALEventlogFactoryService;

/**
 * ワークフローカテゴリの複数削除を行うためのクラスです。 <BR>
 * 
 */
public class ExtTimecardSystemMultiDelete extends ALAbstractCheckList {

  /** logger */
  private static final JetspeedLogger logger =
    JetspeedLogFactoryService.getLogger(ExtTimecardSystemMultiDelete.class
      .getName());

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

      List<Integer> intValues = new ArrayList<Integer>();
      for (String value : values) {
        if (!"1".equals(value)) {
          intValues.add(Integer.valueOf(value));
        }
      }

      SelectQuery<EipTExtTimecardSystem> query =
        Database.query(EipTExtTimecardSystem.class);
      Expression exp1 =
        ExpressionFactory.inDbExp(
          EipTExtTimecardSystem.SYSTEM_ID_PK_COLUMN,
          intValues);
      query.setQualifier(exp1);
      List<EipTExtTimecardSystem> list = query.fetchList();
      if (list == null || list.size() == 0) {
        return false;
      }

      for (EipTExtTimecardSystem record : list) {
        Database.delete(record);

        // イベントログに保存
        ALEventlogFactoryService.getInstance().getEventlogHandler().log(
          record.getSystemId(),
          ALEventlogConstants.PORTLET_TYPE_EXTTIMECARD_SYSTEM,
          record.getSystemName());
      }
      Database.commit();
    } catch (Exception ex) {
      Database.rollback();
      logger.error("Exception", ex);
      return false;
    }
    return true;
  }

}
