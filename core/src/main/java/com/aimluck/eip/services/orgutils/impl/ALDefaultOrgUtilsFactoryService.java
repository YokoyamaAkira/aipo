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

package com.aimluck.eip.services.orgutils.impl;

import com.aimluck.eip.services.orgutils.ALOrgUtilsFactoryService;
import com.aimluck.eip.services.orgutils.ALOrgUtilsHandler;

/**
 * 同期サービス用ファクトリクラスです。 <BR>
 * 
 * 
 */
public class ALDefaultOrgUtilsFactoryService extends ALOrgUtilsFactoryService {

  private final ALOrgUtilsHandler handler = new ALDefaultOrgUtilsHandler();

  @Override
  public ALOrgUtilsHandler getOrgUtilsHandler() {
    return handler;
  }

}
