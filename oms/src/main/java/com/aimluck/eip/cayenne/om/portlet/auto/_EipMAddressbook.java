package com.aimluck.eip.cayenne.om.portlet.auto;

import java.util.List;

/**
 * Class _EipMAddressbook was generated by Cayenne. It is probably a good idea
 * to avoid changing this class manually, since it may be overwritten next time
 * code is regenerated. If you need to make any customizations, please use
 * subclass.
 */
public class _EipMAddressbook extends org.apache.cayenne.CayenneDataObject {

  public static final String CELLULAR_MAIL_PROPERTY = "cellularMail";

  public static final String CELLULAR_PHONE_PROPERTY = "cellularPhone";

  public static final String CREATE_DATE_PROPERTY = "createDate";

  public static final String CREATE_USER_ID_PROPERTY = "createUserId";

  public static final String EMAIL_PROPERTY = "email";

  public static final String FIRST_NAME_PROPERTY = "firstName";

  public static final String FIRST_NAME_KANA_PROPERTY = "firstNameKana";

  public static final String LAST_NAME_PROPERTY = "lastName";

  public static final String LAST_NAME_KANA_PROPERTY = "lastNameKana";

  public static final String NOTE_PROPERTY = "note";

  public static final String OWNER_ID_PROPERTY = "ownerId";

  public static final String POSITION_NAME_PROPERTY = "positionName";

  public static final String PUBLIC_FLAG_PROPERTY = "publicFlag";

  public static final String TELEPHONE_PROPERTY = "telephone";

  public static final String UPDATE_DATE_PROPERTY = "updateDate";

  public static final String UPDATE_USER_ID_PROPERTY = "updateUserId";

  public static final String EIP_MADDRESSBOOK_COMPANY_PROPERTY =
    "eipMAddressbookCompany";

  public static final String EIP_TADDRESSBOOK_GROUP_MAP_PROPERTY =
    "eipTAddressbookGroupMap";

  public static final String ADDRESS_ID_PK_COLUMN = "ADDRESS_ID";

  public void setCellularMail(String cellularMail) {
    writeProperty("cellularMail", cellularMail);
  }

  public String getCellularMail() {
    return (String) readProperty("cellularMail");
  }

  public void setCellularPhone(String cellularPhone) {
    writeProperty("cellularPhone", cellularPhone);
  }

  public String getCellularPhone() {
    return (String) readProperty("cellularPhone");
  }

  public void setCreateDate(java.util.Date createDate) {
    writeProperty("createDate", createDate);
  }

  public java.util.Date getCreateDate() {
    return (java.util.Date) readProperty("createDate");
  }

  public void setCreateUserId(Integer createUserId) {
    writeProperty("createUserId", createUserId);
  }

  public Integer getCreateUserId() {
    return (Integer) readProperty("createUserId");
  }

  public void setEmail(String email) {
    writeProperty("email", email);
  }

  public String getEmail() {
    return (String) readProperty("email");
  }

  public void setFirstName(String firstName) {
    writeProperty("firstName", firstName);
  }

  public String getFirstName() {
    return (String) readProperty("firstName");
  }

  public void setFirstNameKana(String firstNameKana) {
    writeProperty("firstNameKana", firstNameKana);
  }

  public String getFirstNameKana() {
    return (String) readProperty("firstNameKana");
  }

  public void setLastName(String lastName) {
    writeProperty("lastName", lastName);
  }

  public String getLastName() {
    return (String) readProperty("lastName");
  }

  public void setLastNameKana(String lastNameKana) {
    writeProperty("lastNameKana", lastNameKana);
  }

  public String getLastNameKana() {
    return (String) readProperty("lastNameKana");
  }

  public void setNote(String note) {
    writeProperty("note", note);
  }

  public String getNote() {
    return (String) readProperty("note");
  }

  public void setOwnerId(Integer ownerId) {
    writeProperty("ownerId", ownerId);
  }

  public Integer getOwnerId() {
    return (Integer) readProperty("ownerId");
  }

  public void setPositionName(String positionName) {
    writeProperty("positionName", positionName);
  }

  public String getPositionName() {
    return (String) readProperty("positionName");
  }

  public void setPublicFlag(String publicFlag) {
    writeProperty("publicFlag", publicFlag);
  }

  public String getPublicFlag() {
    return (String) readProperty("publicFlag");
  }

  public void setTelephone(String telephone) {
    writeProperty("telephone", telephone);
  }

  public String getTelephone() {
    return (String) readProperty("telephone");
  }

  public void setUpdateDate(java.util.Date updateDate) {
    writeProperty("updateDate", updateDate);
  }

  public java.util.Date getUpdateDate() {
    return (java.util.Date) readProperty("updateDate");
  }

  public void setUpdateUserId(Integer updateUserId) {
    writeProperty("updateUserId", updateUserId);
  }

  public Integer getUpdateUserId() {
    return (Integer) readProperty("updateUserId");
  }

  public void setEipMAddressbookCompany(
      com.aimluck.eip.cayenne.om.portlet.EipMAddressbookCompany eipMAddressbookCompany) {
    setToOneTarget("eipMAddressbookCompany", eipMAddressbookCompany, true);
  }

  public com.aimluck.eip.cayenne.om.portlet.EipMAddressbookCompany getEipMAddressbookCompany() {
    return (com.aimluck.eip.cayenne.om.portlet.EipMAddressbookCompany) readProperty(
      "eipMAddressbookCompany");
  }

  public void addToEipTAddressbookGroupMap(
      com.aimluck.eip.cayenne.om.portlet.EipTAddressbookGroupMap obj) {
    addToManyTarget("eipTAddressbookGroupMap", obj, true);
  }

  public void removeFromEipTAddressbookGroupMap(
      com.aimluck.eip.cayenne.om.portlet.EipTAddressbookGroupMap obj) {
    removeToManyTarget("eipTAddressbookGroupMap", obj, true);
  }

  public List<?> getEipTAddressbookGroupMap() {
    return (List<?>) readProperty("eipTAddressbookGroupMap");
  }

}
