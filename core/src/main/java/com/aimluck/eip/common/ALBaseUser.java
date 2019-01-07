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

package com.aimluck.eip.common;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import org.apache.jetspeed.services.logging.JetspeedLogFactoryService;
import org.apache.jetspeed.services.logging.JetspeedLogger;

import com.aimluck.eip.util.ALEipUtils;
import com.aimluck.eip.util.ALLocalizationUtils;

/**
 * ユーザー情報を表すクラスです。 <br />
 * 
 */
public class ALBaseUser extends
    org.apache.jetspeed.om.security.BaseJetspeedUser {

  /**
   *
   */
  private static final long serialVersionUID = -5919528447748101476L;

  public static final String IN_TELEPHONE = "IN_TELEPHONE";

  public static final String OUT_TELEPHONE = "OUT_TELEPHONE";

  public static final String CELLULAR_PHONE = "CELLULAR_PHONE";

  public static final String CELLULAR_MAIL = "CELLULAR_MAIL";

  public static final String CELLULAR_UID = "CELLULAR_UID";

  public static final String COMPANY_ID = "COMPANY_ID";

  public static final String POST_ID = "POST_ID";

  public static final String POSITION_ID = "POSITION_ID";

  public static final String FIRST_NAME_KANA = "FIRST_NAME_KANA";

  public static final String LAST_NAME_KANA = "LAST_NAME_KANA";

  public static final String PHOTO = "PHOTO";

  public static final String PHOTO_SMARTPHONE = "PHOTO_SMARTPHONE";

  public static final String CREATED_USER_ID = "CREATED_USER_ID";

  public static final String UPDATED_USER_ID = "UPDATED_USER_ID";

  public static final String CREATED = "CREATED";

  public static final String MODIFIED = "MODIFIED";

  public static final String PHOTO_MODIFIED = "PHOTO_MODIFIED";

  public static final String PHOTO_MODIFIED_SMARTPHONE =
    "PHOTO_MODIFIED_SMARTPHONE";

  public static final String HAS_PHOTO = "HAS_PHOTO";

  public static final String HAS_PHOTO_SMARTPHONE = "HAS_PHOTO_SMARTPHONE";

  @SuppressWarnings("unused")
  private static final JetspeedLogger logger = JetspeedLogFactoryService
    .getLogger(ALBaseUser.class.getName());

  /**
   *
   *
   */
  public ALBaseUser() {
  }

  /**
   * 
   * @return
   */
  public String getInTelephone() {
    return (String) getPerm(IN_TELEPHONE);
  }

  /**
   * 
   * @param str
   */
  public void setInTelephone(String str) {
    setPerm(IN_TELEPHONE, str);
  }

  /**
   * 
   * @return
   */
  public String getOutTelephone() {
    return (String) getPerm(OUT_TELEPHONE);
  }

  /**
   * 
   * @param str
   */
  public void setOutTelephone(String str) {
    setPerm(OUT_TELEPHONE, str);
  }

  /**
   * 
   * @return
   */
  public String getCellularPhone() {
    return (String) getPerm(CELLULAR_PHONE);
  }

  /**
   * 
   * @param str
   */
  public void setCellularPhone(String str) {
    setPerm(CELLULAR_PHONE, str);
  }

  /**
   * 
   * @return
   */
  public String getCellularMail() {
    return (String) getPerm(CELLULAR_MAIL);
  }

  /**
   * 
   * @param str
   */
  public void setCellularMail(String str) {
    setPerm(CELLULAR_MAIL, str);
  }

  /**
   * 
   * @return
   */
  public int getCompanyId() {
    return ((Integer) (getPerm(COMPANY_ID))).intValue();
  }

  /**
   * 
   * @param str
   */
  public void setCompanyId(int id) {
    setPerm(COMPANY_ID, Integer.valueOf(id));
  }

  /**
   * 
   * @return
   */
  public int getPostId() {
    return ((Integer) (getPerm(POST_ID))).intValue();
  }

  /**
   * 
   * @param str
   */
  public void setPostId(int id) {
    setPerm(POST_ID, Integer.valueOf(id));
  }

  /**
   * 
   * @return
   */
  public int getPositionId() {
    return ((Integer) (getPerm(POSITION_ID))).intValue();
  }

  /**
   * 
   * @param str
   */
  public void setPositionId(int id) {
    setPerm(POSITION_ID, Integer.valueOf(id));
  }

  /**
   * 
   * @return
   */
  public String getFirstNameKana() {
    return (String) getPerm(FIRST_NAME_KANA);
  }

  /**
   * 
   * @param str
   */
  public void setFirstNameKana(String str) {
    setPerm(FIRST_NAME_KANA, str);
  }

  /**
   * 
   * @return
   */
  public String getLastNameKana() {
    return (String) getPerm(LAST_NAME_KANA);
  }

  /**
   * 
   * @param str
   */
  public void setLastNameKana(String str) {
    setPerm(LAST_NAME_KANA, str);
  }

  /**
   * 
   * @return byte[]
   */
  public byte[] getPhoto() {
    Object obj = getPerm(PHOTO);

    if (obj instanceof byte[]) {
      return (byte[]) obj;
    }

    if (obj == null || "".equals(obj)) {
      return null;
    }

    return ((String) obj).getBytes();
  }

  /**
   * 
   * @return byte[]
   */
  public byte[] getPhotoSmartphone() {
    Object obj = getPerm(PHOTO_SMARTPHONE);

    if (obj instanceof byte[]) {
      return (byte[]) obj;
    }

    if (obj == null || "".equals(obj)) {
      return null;
    }

    return ((String) obj).getBytes();
  }

  /**
   * 
   * @param v
   */
  public void setPhoto(byte[] v) {
    setPerm(PHOTO, v);
  }

  /**
   * 
   * @param b
   */
  public void setPhotoSmartphone(byte[] b) {
    setPerm(PHOTO_SMARTPHONE, b);
  }

  /**
   * @return
   */
  public int getCreatedUserId() {
    return ((Integer) (getPerm(CREATED_USER_ID))).intValue();
  }

  /**
   * @param id
   */
  public void setCreatedUserId(int id) {
    setPerm(CREATED_USER_ID, Integer.valueOf(id));
  }

  /**
   * @return
   */
  public int getUpdatedUserId() {
    return ((Integer) (getPerm(UPDATED_USER_ID))).intValue();
  }

  /**
   * @param id
   */
  public void setUpdatedUserId(int id) {
    setPerm(UPDATED_USER_ID, Integer.valueOf(id));
  }

  /**
   * @param d
   */
  public void setCreated(Date d) {
    setPerm(CREATED, d);
  }

  /**
   * @return
   */
  public Date getCreated() {
    return (Date) (getPerm(CREATED));
  }

  /**
   * @param d
   */
  public void setModified(Date d) {
    setPerm(MODIFIED, d);
  }

  /**
   * @return
   */
  public Date getModified() {
    return (Date) (getPerm(MODIFIED));
  }

  /**
   * 会社名を取得します。
   * 
   * @param id
   *          会社ID
   * @return 会社名
   */
  public String getCompanyName(int id) {
    Map<Integer, ALEipCompany> companyMap =
      ALEipManager.getInstance().getCompanyMap();
    ALEipCompany company = companyMap.get(Integer.valueOf(id));
    return company.getCompanyName().toString();
  }

  /**
   * 携帯電話の固有 ID を取得する．
   */
  public String getCelluarUId() {
    return (String) getPerm(CELLULAR_UID);
  }

  /**
   *
   */
  public void setCelluarUId(String str) {
    setPerm(CELLULAR_UID, str);
  }

  /**
   * 最終アクセス時間を取得します。
   * 
   * @return
   */
  public String getLastAccessTime() {
    StringBuffer str = new StringBuffer();
    Calendar cal = Calendar.getInstance();
    cal.setTime(super.getLastAccessDate());
    return str
      .append(cal.get(Calendar.YEAR))
      .append(ALLocalizationUtils.getl10n("COMMON_YEAR"))
      .append((cal.get(Calendar.MONTH) + 1))
      .append(ALLocalizationUtils.getl10n("COMMON_MONTH"))
      .append(cal.get(Calendar.DATE))
      .append(ALLocalizationUtils.getl10n("COMMON_DAY"))
      .append(cal.get(Calendar.HOUR_OF_DAY))
      .append(ALLocalizationUtils.getl10n("COMMON_HOUR"))
      .append(cal.get(Calendar.MINUTE))
      .append(ALLocalizationUtils.getl10n("COMMON_MINUTE"))
      .toString();
  }

  /**
   * 指定されたユーザが管理者権限を持っているかを返します。
   * 
   * @return
   */
  public boolean isAdmin() {
    return ALEipUtils.isAdmin(Integer.parseInt(this.getUserId()));
  }

  public boolean hasPhoto() {
    String hasPhoto = (String) getPerm(HAS_PHOTO);
    return "T".equals(hasPhoto);
  }

  public boolean hasPhotoSmartphone() {
    String hasPhotoSmartphone = (String) getPerm(HAS_PHOTO_SMARTPHONE);
    return "T".equals(hasPhotoSmartphone);
  }

  /**
   *
   */
  public void setHasPhoto(boolean hasPhoto) {
    setPerm(HAS_PHOTO, hasPhoto ? "T" : "F");
  }

  /**
  *
  */
  public void setHasPhotoSmartphone(boolean hasPhotoSmartphone) {
    setPerm(HAS_PHOTO_SMARTPHONE, hasPhotoSmartphone ? "T" : "F");
  }

  /**
   * @param d
   */
  public void setPhotoModified(Date d) {
    setPerm(PHOTO_MODIFIED, d);
  }

  /**
   * @param dd
   */
  public void setPhotoModifiedSmartphone(Date dd) {
    setPerm(PHOTO_MODIFIED_SMARTPHONE, dd);
  }

  /**
   * @return
   */
  public Date getPhotoModified() {
    return (Date) (getPerm(PHOTO_MODIFIED));
  }

  /**
   * @return
   */
  public Date getPhotoModifiedSmartphone() {
    if (getPerm(PHOTO_MODIFIED_SMARTPHONE) == null
      || "".equals(getPerm(PHOTO_MODIFIED_SMARTPHONE))) {
      return null;
    }
    return (Date) (getPerm(PHOTO_MODIFIED_SMARTPHONE));
  }
}
