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

import java.util.ArrayList;
import java.util.List;

import com.aimluck.commons.field.ALNumberField;
import com.aimluck.commons.field.ALStringField;
import com.aimluck.eip.common.ALData;

/**
 * ユーザーアカウントのResultDataです。 <BR>
 * 
 */
public class AccountResultData implements ALData {

  /** ユーザーID */
  private ALNumberField user_id;

  /** 有効/無効 */
  private ALStringField disabled;

  /** ユーザー名 */
  private ALStringField user_name;

  /** 名前 */
  private ALStringField name;

  /** フリガナ（名前） */
  private ALStringField name_kana;

  /** メールアドレス */
  private ALStringField email;

  /** 電話番号（外線） */
  private ALStringField out_telephone;

  /** 電話番号（内線） */
  private ALStringField in_telephone;

  /** 電話番号（携帯） */
  private ALStringField cellular_phone;

  /** 携帯メールアドレス */
  private ALStringField cellular_mail;

  /** 部署IDリスト */
  private List<Integer> post_id_list;

  /** 部署名リスト */
  private List<ALStringField> post_name_list;

  /** 役職名 */
  private ALStringField position_name;

  private boolean has_photo;

  private boolean is_admin;

  /** 会社ID */
  private ALNumberField company_id;

  /** 会社名 */
  private ALStringField company_name;

  /** 郵便番号 */
  private ALStringField company_zipcode;

  /** 住所 */
  private ALStringField company_address;

  /** 電話番号 */
  private ALStringField company_telephone;

  /** FAX 番号 */
  private ALStringField company_fax_number;

  /** 登録日 */
  private ALStringField create_date;

  /** 更新日 */
  private ALStringField update_date;

  /** グループ名 */
  private ALStringField group_name;

  private long photo_modified;

  /**
   *
   *
   */
  @Override
  public void initField() {
    user_id = new ALNumberField();
    user_name = new ALStringField();
    name = new ALStringField();
    name_kana = new ALStringField();
    email = new ALStringField();
    out_telephone = new ALStringField();
    in_telephone = new ALStringField();
    cellular_phone = new ALStringField();
    cellular_mail = new ALStringField();
    post_name_list = new ArrayList<ALStringField>();
    post_id_list = new ArrayList<Integer>();
    position_name = new ALStringField();
    disabled = new ALStringField();

    has_photo = false;
    is_admin = false;

    company_id = new ALNumberField();
    company_name = new ALStringField();
    company_zipcode = new ALStringField();
    company_address = new ALStringField();
    company_telephone = new ALStringField();
    company_fax_number = new ALStringField();
    create_date = new ALStringField();
    update_date = new ALStringField();
    group_name = new ALStringField();
    setPhotoModified(0L);
  }

  /**
   * @return
   */
  public ALStringField getName() {
    return name;
  }

  /**
   * @return
   */
  public ALStringField getUserName() {
    return user_name;
  }

  /**
   * @return
   */
  public ALNumberField getUserId() {
    return user_id;
  }

  /**
   * @return
   */
  public ALStringField getDisabled() {
    return disabled;
  }

  /**
   * @param string
   */
  public void setName(String string) {
    name.setValue(string);
  }

  /**
   * @param string
   */
  public void setUserName(String string) {
    user_name.setValue(string);
  }

  /**
   * @param i
   */
  public void setUserId(int i) {
    user_id.setValue(i);
  }

  /**
   * @param string
   */
  public void setDisabled(String string) {
    disabled.setValue(string);
  }

  /**
   * @return
   */
  public ALStringField getPositionName() {
    return position_name;
  }

  /**
   * @return
   */
  public List<ALStringField> getPostNameList() {
    return post_name_list;
  }

  /**
   * @param string
   */
  public void setPositionName(String string) {
    position_name.setValue(string);
  }

  /**
   * @param string
   */
  public void setPostNameList(List<ALStringField> list) {
    post_name_list.addAll(list);
  }

  /**
   * @return
   */
  public ALStringField getCellularMail() {
    return cellular_mail;
  }

  /**
   * @return
   */
  public ALStringField getCellularPhone() {
    return cellular_phone;
  }

  /**
   * @return
   */
  public ALStringField getEmail() {
    return email;
  }

  /**
   * @return
   */
  public ALStringField getInTelephone() {
    return in_telephone;
  }

  /**
   * @return
   */
  public ALStringField getOutTelephone() {
    return out_telephone;
  }

  /**
   * @param string
   */
  public void setCellularMail(String string) {
    cellular_mail.setValue(string);
  }

  /**
   * @param string
   */
  public void setCellularPhone(String string) {
    cellular_phone.setValue(string);
  }

  /**
   * @param string
   */
  public void setEmail(String string) {
    email.setValue(string);
  }

  /**
   * @param string
   */
  public void setInTelephone(String string) {
    in_telephone.setValue(string);
  }

  /**
   * @param field
   */
  public void setOutTelephone(String string) {
    out_telephone.setValue(string);
  }

  /**
   * @return
   */
  public ALStringField getNameKana() {
    return name_kana;
  }

  /**
   * @param string
   */
  public void setNameKana(String string) {
    name_kana.setValue(string);
  }

  public boolean hasPhoto() {
    return has_photo;
  }

  public void setHasPhoto(boolean bool) {
    has_photo = bool;
  }

  /**
   * @return is_admin
   */
  public boolean isAdmin() {
    return is_admin;
  }

  /**
   * @param is_admin
   */
  public void setIsAdmin(boolean is_admin) {
    this.is_admin = is_admin;
  }

  /**
   * @return
   */
  public ALStringField getCompanyAddress() {
    return company_address;
  }

  /**
   * @return
   */
  public ALNumberField getCompany_id() {
    return company_id;
  }

  /**
   * @return
   */
  public ALStringField getCreate_date() {
    return create_date;
  }

  /**
   * @return
   */
  public ALStringField getCompanyFaxNumber() {
    return company_fax_number;
  }

  /**
   * @return
   */
  // public ALNumberField getPostId() {
  // return post_id;
  // }

  /**
   * @return
   */
  public ALStringField getCompanyName() {
    return company_name;
  }

  /**
   * 会社の電話番号を取得します。
   * 
   * @return
   */
  public ALStringField getCompanyTelephone() {
    return company_telephone;
  }

  /**
   * @return
   */
  public ALStringField getUpdateDate() {
    return update_date;
  }

  /**
   * @return
   */
  public ALStringField getCompanyZipcode() {
    return company_zipcode;
  }

  /**
   * @param string
   */
  public void setCompanyAddress(String string) {
    company_address.setValue(string);
  }

  /**
   * @param id
   */
  public void setCompanyId(int id) {
    company_id.setValue(id);
  }

  /**
   * @param string
   */
  public void setCreateDate(String string) {
    create_date.setValue(string);
  }

  /**
   * @param string
   */
  public void setCompanyFaxNumber(String string) {
    company_fax_number.setValue(string);
  }

  /**
   * @param string
   */
  public void setCompanyName(String string) {
    company_name.setValue(string);
  }

  /**
   * @param string
   */
  public void setCompanyTelephone(String string) {
    company_telephone.setValue(string);
  }

  /**
   * @param string
   */
  public void setUpdateDate(String string) {
    update_date.setValue(string);
  }

  /**
   * @param string
   */
  public void setCompanyZipcode(String string) {
    company_zipcode.setValue(string);
  }

  /**
   * グループ名を取得します
   * 
   * @return
   */
  public ALStringField getGroupName() {
    return group_name;
  }

  /**
   * グループ名をセットします
   * 
   * @param string
   */
  public void setGroupName(String string) {
    group_name.setValue(string);
  }

  /**
   * 部署IDを取得します。 <BR>
   * 
   * @return
   */
  public Object getPostID(int i) {
    return getPostIdList().get(i);
  }

  public void setPostIdList(List<Integer> post_id_list) {
    this.post_id_list.addAll(post_id_list);
  }

  public List<Integer> getPostIdList() {
    return post_id_list;
  }

  /**
   * @return photo_modified
   */
  public long getPhotoModified() {
    return photo_modified;
  }

  /**
   * @param photo_modified
   *          セットする photo_modified
   */
  public void setPhotoModified(long photo_modified) {
    this.photo_modified = photo_modified;
  }

}
