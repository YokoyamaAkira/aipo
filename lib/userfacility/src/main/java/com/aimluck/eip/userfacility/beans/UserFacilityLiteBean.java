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

package com.aimluck.eip.userfacility.beans;

import com.aimluck.commons.field.ALNumberField;
import com.aimluck.commons.field.ALStringField;
import com.aimluck.eip.common.ALData;

/**
 * ユーザーのBeanです。 <br />
 * 
 */
public class UserFacilityLiteBean implements ALData, Cloneable {

  /** ID */
  private ALNumberField userfacility_id;

  /** 名前 */
  private ALStringField name;

  /** 名前（アプリケーション） */
  private ALStringField alias_name;

  /** 種類 */
  private ALStringField type;

  /**
   * 
   * 
   */
  public void initField() {
    userfacility_id = new ALNumberField();
    name = new ALStringField();
    type = new ALStringField();
    alias_name = new ALStringField();
  }

  /**
   * 
   * @param string
   */
  public void setName(String string) {
    name.setValue(string);
  }

  /**
   * 
   * @param firstName
   * @param lastName
   */
  public void setAliasName(String firstName, String lastName) {
    alias_name.setValue(new StringBuffer().append(lastName).append(" ").append(
      firstName).toString());
  }

  /**
   * 
   * @param firstName
   * @param lastName
   */
  public void setAliasName(String aliasName) {
    alias_name.setValue(aliasName);
  }

  /**
   * 
   * @return
   */
  public String getName() {
    return name.getValue();
  }

  /**
   * 
   * @return
   */
  public String getAliasName() {
    return alias_name.getValue();
  }

  /**
   * @return
   */
  public String getUserFacilityId() {
    return userfacility_id.toString();
  }

  /**
   * @param field
   */
  public void setUserFacilityId(int number) {
    userfacility_id.setValue(number);
  }

  /**
   * @return
   */
  public String getUserFacilityType() {
    return type.toString();
  }

  /**
   * @param field
   */
  public void setUserFacilityType(String str) {
    type.setValue(str);
  }

}
