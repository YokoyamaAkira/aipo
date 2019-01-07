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

package com.aimluck.eip.facilities;

import java.util.List;

import org.apache.cayenne.exp.Expression;
import org.apache.cayenne.exp.ExpressionFactory;
import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;
import org.apache.turbine.util.RunData;
import org.apache.velocity.context.Context;

import com.aimluck.eip.cayenne.om.portlet.EipMFacilityGroup;
import com.aimluck.eip.cayenne.om.portlet.EipMFacilityGroupMap;
import com.aimluck.eip.common.ALAbstractCheckList;
import com.aimluck.eip.orm.Database;
import com.aimluck.eip.orm.query.SelectQuery;

/**
 * 設備の複数削除を行うためのクラスです。 <BR>
 * 
 */
public class FacilityGroupMultiDelete extends ALAbstractCheckList {

  /** logger */
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(FacilityGroupMultiDelete.class.getName());

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
      SelectQuery<EipMFacilityGroupMap> query1 =
        Database.query(EipMFacilityGroupMap.class);
      Expression exp1 =
        ExpressionFactory.inExp(EipMFacilityGroupMap.GROUP_ID_PROPERTY, values);
      query1.setQualifier(exp1);
      List<EipMFacilityGroupMap> maplist = query1.fetchList();
      if (maplist != null && maplist.size() > 0) {
        // マップの削除
        Database.deleteAll(maplist);
      }
      SelectQuery<EipMFacilityGroup> query =
        Database.query(EipMFacilityGroup.class);
      Expression exp =
        ExpressionFactory.inDbExp(EipMFacilityGroup.GROUP_ID_PK_COLUMN, values);
      query.setQualifier(exp);

      List<EipMFacilityGroup> flist = query.fetchList();
      if (flist == null || flist.size() == 0) {
        return false;
      }
      // 設備を削除
      Database.deleteAll(flist);
      Database.commit();
    } catch (Exception ex) {
      Database.rollback();
      logger.error("Exception", ex);
      return false;
    }
    return true;
  }

}
