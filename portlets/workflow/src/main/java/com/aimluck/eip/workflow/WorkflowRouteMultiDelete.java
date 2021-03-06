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

package com.aimluck.eip.workflow;

import java.util.ArrayList;
import java.util.List;

import org.apache.cayenne.exp.Expression;
import org.apache.cayenne.exp.ExpressionFactory;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.eip.cayenne.om.portlet.EipTWorkflowCategory;
import com.aimluck.eip.cayenne.om.portlet.EipTWorkflowRequest;
import com.aimluck.eip.cayenne.om.portlet.EipTWorkflowRoute;
import com.aimluck.eip.common.ALAbstractCheckList;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.orm.query.SelectQuery;
import com.aimluck.eip.services.eventlog.ALEventlogConstants;
import com.aimluck.eip.services.eventlog.ALEventlogFactoryService;
import com.aimluck.eip.workflow.util.WorkflowUtils;

/**
 * ワークフローカテゴリの複数削除を行うためのクラスです。 <BR>
 * 
 */
public class WorkflowRouteMultiDelete extends ALAbstractCheckList {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(WorkflowRouteMultiDelete.class.getName());

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
      int valuesize = values.size();
      for (int i = 0; i < valuesize; i++) {
        intValues.add(Integer.valueOf(values.get(i)));
      }

      SelectQuery<EipTWorkflowRoute> query =
        Database.query(EipTWorkflowRoute.class);
      Expression exp1 =
        ExpressionFactory.inDbExp(
          EipTWorkflowRoute.ROUTE_ID_PK_COLUMN,
          intValues);
      query.setQualifier(exp1);
      List<EipTWorkflowRoute> routelist = query.fetchList();
      if (routelist == null || routelist.size() == 0) {
        return false;
      }

      for (EipTWorkflowRoute route : routelist) {

        List<EipTWorkflowRequest> requests =
          WorkflowUtils.getEipTWorkflowRequest(route);
        for (EipTWorkflowRequest request : requests) {
          request.setEipTWorkflowRoute(null);
        }

        List<EipTWorkflowCategory> categories =
          WorkflowUtils.getEipTworkflowCategory(route);
        for (EipTWorkflowCategory category : categories) {
          category.setEipTWorkflowRoute(null);
        }

      }

      // 申請経路を削除
      Database.deleteAll(routelist);
      Database.commit();

      // イベントログに保存
      for (EipTWorkflowRoute route : routelist) {
        ALEventlogFactoryService.getInstance().getEventlogHandler().log(
          route.getRouteId(),
          ALEventlogConstants.PORTLET_TYPE_WORKFLOW_ROUTE,
          route.getRouteName());
      }
    } catch (Exception ex) {
      Database.rollback();
      logger.error("Exception", ex);
      return false;
    }
    return true;
  }

}
