package com.aimluck.eip.cayenne.om.social.auto;

import java.util.List;

/**
 * Class _Application was generated by Cayenne. It is probably a good idea to
 * avoid changing this class manually, since it may be overwritten next time
 * code is regenerated. If you need to make any customizations, please use
 * subclass.
 */
public class _Application extends org.apache.cayenne.CayenneDataObject {

  public static final String APP_ID_PROPERTY = "appId";

  public static final String CONSUMER_KEY_PROPERTY = "consumerKey";

  public static final String CONSUMER_SECRET_PROPERTY = "consumerSecret";

  public static final String CREATE_DATE_PROPERTY = "createDate";

  public static final String DESCRIPTION_PROPERTY = "description";

  public static final String ICON_PROPERTY = "icon";

  public static final String ICON64_PROPERTY = "icon64";

  public static final String STATUS_PROPERTY = "status";

  public static final String SUMMARY_PROPERTY = "summary";

  public static final String TITLE_PROPERTY = "title";

  public static final String UPDATE_DATE_PROPERTY = "updateDate";

  public static final String URL_PROPERTY = "url";

  public static final String OAUTH_CONSUMER_PROPERTY = "oauthConsumer";

  public static final String ID_PK_COLUMN = "ID";

  public void setAppId(String appId) {
    writeProperty("appId", appId);
  }

  public String getAppId() {
    return (String) readProperty("appId");
  }

  public void setConsumerKey(String consumerKey) {
    writeProperty("consumerKey", consumerKey);
  }

  public String getConsumerKey() {
    return (String) readProperty("consumerKey");
  }

  public void setConsumerSecret(String consumerSecret) {
    writeProperty("consumerSecret", consumerSecret);
  }

  public String getConsumerSecret() {
    return (String) readProperty("consumerSecret");
  }

  public void setCreateDate(java.util.Date createDate) {
    writeProperty("createDate", createDate);
  }

  public java.util.Date getCreateDate() {
    return (java.util.Date) readProperty("createDate");
  }

  public void setDescription(String description) {
    writeProperty("description", description);
  }

  public String getDescription() {
    return (String) readProperty("description");
  }

  public void setIcon(String icon) {
    writeProperty("icon", icon);
  }

  public String getIcon() {
    return (String) readProperty("icon");
  }

  public void setIcon64(String icon64) {
    writeProperty("icon64", icon64);
  }

  public String getIcon64() {
    return (String) readProperty("icon64");
  }

  public void setStatus(Integer status) {
    writeProperty("status", status);
  }

  public Integer getStatus() {
    return (Integer) readProperty("status");
  }

  public void setSummary(String summary) {
    writeProperty("summary", summary);
  }

  public String getSummary() {
    return (String) readProperty("summary");
  }

  public void setTitle(String title) {
    writeProperty("title", title);
  }

  public String getTitle() {
    return (String) readProperty("title");
  }

  public void setUpdateDate(java.util.Date updateDate) {
    writeProperty("updateDate", updateDate);
  }

  public java.util.Date getUpdateDate() {
    return (java.util.Date) readProperty("updateDate");
  }

  public void setUrl(String url) {
    writeProperty("url", url);
  }

  public String getUrl() {
    return (String) readProperty("url");
  }

  public void addToOauthConsumer(
      com.aimluck.eip.cayenne.om.social.OAuthConsumer obj) {
    addToManyTarget("oauthConsumer", obj, true);
  }

  public void removeFromOauthConsumer(
      com.aimluck.eip.cayenne.om.social.OAuthConsumer obj) {
    removeToManyTarget("oauthConsumer", obj, true);
  }

  public List<?> getOauthConsumer() {
    return (List<?>) readProperty("oauthConsumer");
  }

}
