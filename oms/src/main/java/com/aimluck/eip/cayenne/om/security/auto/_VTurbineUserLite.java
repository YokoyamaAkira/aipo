package com.aimluck.eip.cayenne.om.security.auto;

/**
 * Class _VTurbineUserLite was generated by Cayenne. It is probably a good idea
 * to avoid changing this class manually, since it may be overwritten next time
 * code is regenerated. If you need to make any customizations, please use
 * subclass.
 */
public class _VTurbineUserLite extends org.apache.cayenne.CayenneDataObject {

  public static final String CELLULAR_MAIL_PROPERTY = "cellularMail";

  public static final String EMAIL_PROPERTY = "email";

  public static final String FIRST_NAME_PROPERTY = "firstName";

  public static final String HAS_PHOTO_PROPERTY = "hasPhoto";

  public static final String LAST_NAME_PROPERTY = "lastName";

  public static final String LOGIN_NAME_PROPERTY = "loginName";

  public static final String PHOTO_MODIFIED_PROPERTY = "photoModified";

  public static final String USER_ID_PK_COLUMN = "USER_ID";

  public void setCellularMail(String cellularMail) {
    writeProperty("cellularMail", cellularMail);
  }

  public String getCellularMail() {
    return (String) readProperty("cellularMail");
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

  public void setHasPhoto(String hasPhoto) {
    writeProperty("hasPhoto", hasPhoto);
  }

  public String getHasPhoto() {
    return (String) readProperty("hasPhoto");
  }

  public void setLastName(String lastName) {
    writeProperty("lastName", lastName);
  }

  public String getLastName() {
    return (String) readProperty("lastName");
  }

  public void setLoginName(String loginName) {
    writeProperty("loginName", loginName);
  }

  public String getLoginName() {
    return (String) readProperty("loginName");
  }

  public void setPhotoModified(java.util.Date photoModified) {
    writeProperty("photoModified", photoModified);
  }

  public void setPhotoModified_smartphone(
      java.util.Date photoModified_smartphone) {
    writeProperty("photoModified", photoModified_smartphone);
  }

  public java.util.Date getPhotoModified() {
    return (java.util.Date) readProperty("photoModified");
  }

  public java.util.Date getPhotoModified_smarthone() {
    return (java.util.Date) readProperty("photoModified_smartphone");
  }

}
