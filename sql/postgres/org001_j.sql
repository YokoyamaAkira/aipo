--
-- Aipo is a groupware program developed by Aimluck,Inc.
-- Copyright (C) 2004-2011 Aimluck,Inc.
-- http://www.aipo.com
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU Affero General Public License as
-- published by the Free Software Foundation, either version 3 of the
-- License, or (at your option) any later version.
--
-- This program is distributed in the hope that it will be useful,
-- but WITHOUT ANY WARRANTY; without even the implied warranty of
-- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
-- GNU Affero General Public License for more details.
--
-- You should have received a copy of the GNU Affero General Public License
-- along with this program.  If not, see <http://www.gnu.org/licenses/>.
--

-----------------------------------------------------------------------------
-- AIPO_LICENSE
-----------------------------------------------------------------------------

CREATE TABLE AIPO_LICENSE
(
   LICENSE_ID INTEGER NOT NULL,
   LICENSE VARCHAR (99) NOT NULL,
   LIMIT_USERS INTEGER,
   PRIMARY KEY (LICENSE_ID)
);

-----------------------------------------------------------------------------
-- TURBINE_PERMISSION
-----------------------------------------------------------------------------

CREATE TABLE TURBINE_PERMISSION
(
    PERMISSION_ID INTEGER NOT NULL,
    PERMISSION_NAME VARCHAR (99) NOT NULL,
    OBJECTDATA bytea,
    PRIMARY KEY(PERMISSION_ID),
    UNIQUE (PERMISSION_NAME)
);

-----------------------------------------------------------------------------
-- TURBINE_ROLE
-----------------------------------------------------------------------------

CREATE TABLE TURBINE_ROLE
(
    ROLE_ID INTEGER NOT NULL,
    ROLE_NAME VARCHAR (99) NOT NULL,
    OBJECTDATA bytea,
    PRIMARY KEY(ROLE_ID),
    UNIQUE (ROLE_NAME)
);

-----------------------------------------------------------------------------
-- TURBINE_GROUP
-----------------------------------------------------------------------------

CREATE TABLE TURBINE_GROUP
(
    GROUP_ID INTEGER NOT NULL,
    GROUP_NAME VARCHAR (99) NOT NULL,
    OBJECTDATA bytea,
    OWNER_ID INTEGER,
    GROUP_ALIAS_NAME VARCHAR (99),
    PUBLIC_FLAG CHAR,
    PRIMARY KEY(GROUP_ID),
    UNIQUE (GROUP_NAME),
    UNIQUE (OWNER_ID, GROUP_ALIAS_NAME)
);

-----------------------------------------------------------------------------
-- TURBINE_ROLE_PERMISSION
-----------------------------------------------------------------------------

CREATE TABLE TURBINE_ROLE_PERMISSION
(
    ROLE_ID INTEGER NOT NULL,
    PERMISSION_ID INTEGER NOT NULL,
    PRIMARY KEY(ROLE_ID,PERMISSION_ID),
    FOREIGN KEY (ROLE_ID) REFERENCES TURBINE_ROLE (ROLE_ID),
    FOREIGN KEY (PERMISSION_ID) REFERENCES TURBINE_PERMISSION (PERMISSION_ID)
);

CREATE UNIQUE INDEX ROLE_PERMISSION_INDEX
  ON TURBINE_ROLE_PERMISSION(ROLE_ID,PERMISSION_ID);

-----------------------------------------------------------------------------
-- TURBINE_USER
-----------------------------------------------------------------------------

CREATE TABLE TURBINE_USER
(
    USER_ID INTEGER NOT NULL,
    LOGIN_NAME VARCHAR (32) NOT NULL,
    PASSWORD_VALUE VARCHAR (200) NOT NULL,
    FIRST_NAME VARCHAR (99) NOT NULL,
    LAST_NAME VARCHAR (99) NOT NULL,
    EMAIL VARCHAR (99),
    CONFIRM_VALUE VARCHAR (99),
    MODIFIED TIMESTAMP,
    CREATED TIMESTAMP,
    LAST_LOGIN TIMESTAMP,
    DISABLED CHAR,
    OBJECTDATA bytea,
    PASSWORD_CHANGED TIMESTAMP,
    COMPANY_ID INTEGER,
    POSITION_ID INTEGER,
    IN_TELEPHONE VARCHAR (15),
    OUT_TELEPHONE VARCHAR (15),
    CELLULAR_PHONE VARCHAR (15),
    CELLULAR_MAIL VARCHAR (99),
    CELLULAR_UID VARCHAR (99),
    FIRST_NAME_KANA VARCHAR (99),
    LAST_NAME_KANA VARCHAR(99),
    PHOTO bytea,
    HAS_PHOTO VARCHAR (1) DEFAULT 'F',
    PHOTO_MODIFIED TIMESTAMP,
    PHOTO_SMARTPHONE bytea,
    HAS_PHOTO_SMARTPHONE VARCHAR (1) DEFAULT 'F',
    PHOTO_MODIFIED_SMARTPHONE TIMESTAMP,
    TUTORIAL_FORBID VARCHAR (1) DEFAULT 'F',
    CREATED_USER_ID INTEGER,
    UPDATED_USER_ID INTEGER,
    PRIMARY KEY(USER_ID),
    UNIQUE (LOGIN_NAME)
);

-----------------------------------------------------------------------------
-- TURBINE_USER_GROUP_ROLE
-----------------------------------------------------------------------------

CREATE TABLE TURBINE_USER_GROUP_ROLE
(
    ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    GROUP_ID INTEGER NOT NULL,
    ROLE_ID INTEGER NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY (USER_ID) REFERENCES TURBINE_USER (USER_ID),
    FOREIGN KEY (GROUP_ID) REFERENCES TURBINE_GROUP (GROUP_ID),
    FOREIGN KEY (ROLE_ID) REFERENCES TURBINE_ROLE (ROLE_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_COMPANY
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_COMPANY
(
    COMPANY_ID INTEGER NOT NULL,
    COMPANY_NAME VARCHAR (64) NOT NULL,
    COMPANY_NAME_KANA VARCHAR (64),
    ZIPCODE VARCHAR (8),
    ADDRESS VARCHAR (64),
    TELEPHONE VARCHAR (15),
    FAX_NUMBER VARCHAR (15),
    URL VARCHAR (99),
    IPADDRESS VARCHAR (99),
    PORT INTEGER,
    IPADDRESS_INTERNAL VARCHAR (99),
    PORT_INTERNAL INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(COMPANY_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_POST
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_POST
(
    POST_ID INTEGER NOT NULL,
    COMPANY_ID INTEGER NOT NULL,
    POST_NAME VARCHAR (64) NOT NULL,
    ZIPCODE VARCHAR (8) ,
    ADDRESS VARCHAR (64),
    IN_TELEPHONE VARCHAR (15),
    OUT_TELEPHONE VARCHAR (15),
    FAX_NUMBER VARCHAR (15),
    GROUP_NAME VARCHAR (99),
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(POST_ID),
    UNIQUE (GROUP_NAME)
);

-----------------------------------------------------------------------------
-- EIP_M_POSITION
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_POSITION
(
    POSITION_ID INTEGER NOT NULL,
    POSITION_NAME VARCHAR (64) NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(POSITION_ID)
);


-----------------------------------------------------------------------------
-- EIP_M_USER_POSITION
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_USER_POSITION
(
    ID INTEGER NOT NULL,
    USER_ID INTEGER,
    POSITION INTEGER,
    PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_COMMON_CATEGORY
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_COMMON_CATEGORY
(
  COMMON_CATEGORY_ID INTEGER NOT NULL,
  NAME VARCHAR (64) NOT NULL,
  NOTE TEXT,
  CREATE_USER_ID INTEGER NOT NULL,
  UPDATE_USER_ID INTEGER NOT NULL,
  CREATE_DATE DATE,
  UPDATE_DATE TIMESTAMP,
  PRIMARY KEY(COMMON_CATEGORY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_SCHEDULE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_SCHEDULE
(
    SCHEDULE_ID INTEGER NOT NULL,
    PARENT_ID INTEGER,
    OWNER_ID INTEGER,
    REPEAT_PATTERN VARCHAR (10),
    START_DATE TIMESTAMP,
    END_DATE TIMESTAMP,
    NAME VARCHAR (99),
    PLACE VARCHAR (99),
    NOTE TEXT,
    PUBLIC_FLAG VARCHAR (1),
    EDIT_FLAG VARCHAR (1),
    MAIL_FLAG CHAR (1),
    CREATE_USER_ID INTEGER,
    UPDATE_USER_ID INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(SCHEDULE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_SCHEDULE_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_SCHEDULE_MAP
(
   ID INTEGER NOT NULL,
   SCHEDULE_ID INTEGER NOT NULL,
   USER_ID INTEGER NOT NULL,
   STATUS VARCHAR (1),
   TYPE VARCHAR (1),
   COMMON_CATEGORY_ID INTEGER NOT NULL,
   FOREIGN KEY (SCHEDULE_ID) REFERENCES EIP_T_SCHEDULE (SCHEDULE_ID) ON DELETE CASCADE,
   FOREIGN KEY (COMMON_CATEGORY_ID) REFERENCES EIP_T_COMMON_CATEGORY (COMMON_CATEGORY_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

CREATE INDEX eip_t_schedule_map_schedule_id_index ON EIP_T_SCHEDULE_MAP (SCHEDULE_ID);
CREATE INDEX eip_t_schedule_map_schedule_id_user_id_index ON EIP_T_SCHEDULE_MAP (SCHEDULE_ID, USER_ID);

-----------------------------------------------------------------------------
-- EIP_T_TODO_CATEGORY
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TODO_CATEGORY
(
    CATEGORY_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    UPDATE_USER_ID INTEGER NOT NULL,
    CATEGORY_NAME VARCHAR (64) NOT NULL,
    NOTE TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(CATEGORY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_TODO
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TODO
(
    TODO_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    CREATE_USER_ID INTEGER NOT NULL,
    TODO_NAME VARCHAR (64) NOT NULL,
    CATEGORY_ID INTEGER,
    PRIORITY smallint,
    STATE smallint,
    NOTE TEXT,
    START_DATE DATE,
    END_DATE DATE,
    PUBLIC_FLAG VARCHAR (1) NOT NULL,
    ADDON_SCHEDULE_FLG VARCHAR (1) NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (CATEGORY_ID) REFERENCES EIP_T_TODO_CATEGORY (CATEGORY_ID) ON DELETE CASCADE,
    PRIMARY KEY(TODO_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_MAIL_ACCOUNT
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_MAIL_ACCOUNT
(
    ACCOUNT_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    ACCOUNT_NAME VARCHAR (200) NOT NULL,
    ACCOUNT_TYPE VARCHAR (1),
    SMTPSERVER_NAME VARCHAR (64) NOT NULL,
    POP3SERVER_NAME VARCHAR (64) NOT NULL,
    POP3USER_NAME VARCHAR (64) NOT NULL,
    POP3PASSWORD bytea NOT NULL,
    MAIL_USER_NAME VARCHAR (64),
    MAIL_ADDRESS VARCHAR (64) NOT NULL,
    SMTP_PORT VARCHAR (5) NOT NULL,
    SMTP_ENCRYPTION_FLG smallint,
    POP3_PORT VARCHAR (5) NOT NULL,
    POP3_ENCRYPTION_FLG smallint,
    AUTH_SEND_FLG smallint,
    AUTH_SEND_USER_ID VARCHAR (64),
    AUTH_SEND_USER_PASSWD bytea,
    AUTH_RECEIVE_FLG smallint,
    DEL_AT_POP3_FLG VARCHAR (1),
    DEL_AT_POP3_BEFORE_DAYS_FLG VARCHAR (1),
    DEL_AT_POP3_BEFORE_DAYS INTEGER,
    NON_RECEIVED_FLG VARCHAR (1),
    DEFAULT_FOLDER_ID INTEGER,
    LAST_RECEIVED_DATE TIMESTAMP,
    SIGNATURE TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(ACCOUNT_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_MAIL_NOTIFY_CONF
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_MAIL_NOTIFY_CONF
(
    NOTIFY_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    NOTIFY_TYPE INTEGER NOT NULL,
    NOTIFY_FLG INTEGER NOT NULL,
    NOTIFY_TIME TIME,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(NOTIFY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MAIL
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MAIL
(
    MAIL_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    ACCOUNT_ID INTEGER NOT NULL,
    FOLDER_ID INTEGER NOT NULL,
    TYPE char (1),
    READ_FLG char (1),
    SUBJECT TEXT,
    PERSON TEXT,
    EVENT_DATE TIMESTAMP,
    FILE_VOLUME INTEGER,
    HAS_FILES char (1),
    FILE_PATH TEXT,
    MAIL bytea,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY (MAIL_ID)
);

CREATE INDEX eip_t_mail_user_id_index ON EIP_T_MAIL (USER_ID);

-----------------------------------------------------------------------------
-- EIP_T_MAIL_FOLDER
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MAIL_FOLDER
(
    FOLDER_ID INTEGER NOT NULL,
    ACCOUNT_ID INTEGER,
    FOLDER_NAME VARCHAR(128),
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY (FOLDER_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MAIL_FILTER
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MAIL_FILTER
(
    FILTER_ID INTEGER NOT NULL,
    ACCOUNT_ID INTEGER,
    DST_FOLDER_ID INTEGER,
    FILTER_NAME VARCHAR(255),
    FILTER_STRING VARCHAR(255),
    FILTER_TYPE char(1),
    SORT_ORDER INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY (FILTER_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_ADDRESSBOOK
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_ADDRESSBOOK
(
    ADDRESS_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    FIRST_NAME VARCHAR(99),
    LAST_NAME VARCHAR(99),
    FIRST_NAME_KANA VARCHAR(99),
    LAST_NAME_KANA VARCHAR(99),
    EMAIL VARCHAR(99),
    TELEPHONE VARCHAR(15),
    CELLULAR_PHONE VARCHAR(15),
    CELLULAR_MAIL VARCHAR(99),
    COMPANY_ID INTEGER,
    POSITION_NAME VARCHAR(64),
    PUBLIC_FLAG VARCHAR(1),
    NOTE TEXT,
    CREATE_USER_ID INTEGER,
    UPDATE_USER_ID INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(ADDRESS_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_ADDRESS_GROUP
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_ADDRESS_GROUP
(
    GROUP_ID INTEGER NOT NULL,
    GROUP_NAME VARCHAR(99) NOT NULL,
    OWNER_ID INTEGER,
    PUBLIC_FLAG VARCHAR(1),
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(GROUP_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_ADDRESSBOOK_COMPANY
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_ADDRESSBOOK_COMPANY
(
    COMPANY_ID INTEGER NOT NULL,
    COMPANY_NAME VARCHAR(64) NOT NULL,
    COMPANY_NAME_KANA VARCHAR(64),
    POST_NAME VARCHAR(64),
    ZIPCODE VARCHAR(8),
    ADDRESS VARCHAR(64),
    TELEPHONE VARCHAR(15),
    FAX_NUMBER VARCHAR(15),
    URL VARCHAR(99),
    CREATE_USER_ID INTEGER,
    UPDATE_USER_ID INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(COMPANY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_ADDRESSBOOK_GROUP_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_ADDRESSBOOK_GROUP_MAP
(
    ID INTEGER NOT NULL,
    ADDRESS_ID INTEGER NOT NULL,
    GROUP_ID INTEGER NOT NULL,
    PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_NOTE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_NOTE
(
    NOTE_ID INTEGER NOT NULL,
    OWNER_ID VARCHAR (99),
    CLIENT_NAME VARCHAR (99),
    COMPANY_NAME VARCHAR (99),
    TELEPHONE VARCHAR (24),
    EMAIL_ADDRESS VARCHAR (99),
    ADD_DEST_TYPE VARCHAR (1),
    SUBJECT_TYPE VARCHAR (1),
    CUSTOM_SUBJECT VARCHAR (99),
    MESSAGE TEXT,
    ACCEPT_DATE TIMESTAMP,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(NOTE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_NOTE_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_NOTE_MAP
(
   ID INTEGER NOT NULL,
   NOTE_ID INTEGER NOT NULL,
   USER_ID VARCHAR (99) NOT NULL,
   DEL_FLG VARCHAR (1),
   NOTE_STAT VARCHAR (1),
   CONFIRM_DATE TIMESTAMP,
   FOREIGN KEY (NOTE_ID) REFERENCES EIP_T_NOTE (NOTE_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MSGBOARD_CATEGORY
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MSGBOARD_CATEGORY
(
    CATEGORY_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    CATEGORY_NAME VARCHAR (99),
    NOTE TEXT,
    PUBLIC_FLAG VARCHAR (1),
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(CATEGORY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MSGBOARD_CATEGORY_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MSGBOARD_CATEGORY_MAP
(
   ID INTEGER NOT NULL,
   CATEGORY_ID INTEGER,
   USER_ID INTEGER,
   STATUS VARCHAR (1),
   FOREIGN KEY (CATEGORY_ID) REFERENCES EIP_T_MSGBOARD_CATEGORY (CATEGORY_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MSGBOARD_TOPIC
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MSGBOARD_TOPIC
(
    TOPIC_ID INTEGER NOT NULL,
    PARENT_ID INTEGER,
    OWNER_ID INTEGER,
    TOPIC_NAME VARCHAR (64) NOT NULL,
    NOTE TEXT,
    CATEGORY_ID INTEGER,
    CREATE_USER_ID INTEGER,
    UPDATE_USER_ID INTEGER,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (CATEGORY_ID) REFERENCES EIP_T_MSGBOARD_CATEGORY (CATEGORY_ID) ON DELETE CASCADE,
    PRIMARY KEY(TOPIC_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MSGBOARD_FILE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MSGBOARD_FILE
(
    FILE_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    TOPIC_ID INTEGER,
    FILE_NAME VARCHAR (128) NOT NULL,
    FILE_PATH TEXT NOT NULL,
    FILE_THUMBNAIL bytea,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (TOPIC_ID) REFERENCES EIP_T_MSGBOARD_TOPIC (TOPIC_ID) ON DELETE CASCADE,
    PRIMARY KEY (FILE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_BLOG
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_BLOG
(
    BLOG_ID INTEGER NOT NULL,
    OWNER_ID INTEGER NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY (BLOG_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_BLOG_THEMA
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_BLOG_THEMA
(
    THEMA_ID INTEGER NOT NULL,
    THEMA_NAME varchar (64) NOT NULL,
    DESCRIPTION TEXT,
    CREATE_USER_ID INTEGER NOT NULL,
    UPDATE_USER_ID INTEGER NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY (THEMA_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_BLOG_ENTRY
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_BLOG_ENTRY
(
    ENTRY_ID INTEGER NOT NULL,
    OWNER_ID INTEGER NOT NULL,
    TITLE varchar (99) NOT NULL,
    NOTE TEXT,
    BLOG_ID INTEGER NOT NULL,
    THEMA_ID INTEGER,
    ALLOW_COMMENTS varchar (1),
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (BLOG_ID) REFERENCES EIP_T_BLOG (BLOG_ID) ON DELETE CASCADE,
    FOREIGN KEY (THEMA_ID) REFERENCES EIP_T_BLOG_THEMA (THEMA_ID),
    PRIMARY KEY (ENTRY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_BLOG_FILE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_BLOG_FILE
(
    FILE_ID INTEGER NOT NULL,
    OWNER_ID INTEGER NOT NULL,
    TITLE varchar (99) NOT NULL,
    FILE_PATH TEXT NOT NULL,
    FILE_THUMBNAIL bytea,
    ENTRY_ID INTEGER NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (ENTRY_ID) REFERENCES EIP_T_BLOG_ENTRY (ENTRY_ID) ON DELETE CASCADE,
    PRIMARY KEY (FILE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_BLOG_COMMENT
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_BLOG_COMMENT
(
    COMMENT_ID INTEGER NOT NULL,
    OWNER_ID INTEGER NOT NULL,
    COMMENT TEXT,
    ENTRY_ID INTEGER NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (ENTRY_ID) REFERENCES EIP_T_BLOG_ENTRY (ENTRY_ID) ON DELETE CASCADE,
    PRIMARY KEY (COMMENT_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_BLOG_FOOTMARK_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_BLOG_FOOTMARK_MAP
(
    ID INTEGER NOT NULL,
    BLOG_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    CREATE_DATE DATE NOT NULL,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (BLOG_ID) REFERENCES EIP_T_BLOG (BLOG_ID) ON DELETE CASCADE,
    PRIMARY KEY (ID)
);

-----------------------------------------------------------------------------
-- EIP_T_CABINET_FOLDER
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_CABINET_FOLDER
(
    FOLDER_ID INTEGER NOT NULL,
    PARENT_ID INTEGER NOT NULL,
    FOLDER_NAME VARCHAR (128) NOT NULL,
    NOTE TEXT,
    CREATE_USER_ID INTEGER,
    UPDATE_USER_ID INTEGER,
    PUBLIC_FLAG VARCHAR (1),
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY (FOLDER_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_CABINET_FOLDER_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_CABINET_FOLDER_MAP
(
   ID INTEGER NOT NULL,
   FOLDER_ID INTEGER,
   USER_ID INTEGER,
   STATUS VARCHAR (1),
   FOREIGN KEY (FOLDER_ID) REFERENCES EIP_T_CABINET_FOLDER (FOLDER_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_CABINET_FILE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_CABINET_FILE
(
    FILE_ID INTEGER NOT NULL,
    FOLDER_ID INTEGER NOT NULL,
    FILE_TITLE VARCHAR (128) NOT NULL,
    FILE_NAME VARCHAR (128) NOT NULL,
    FILE_SIZE BIGINT,
    FILE_PATH TEXT NOT NULL,
    NOTE TEXT,
    COUNTER INTEGER,
    CREATE_USER_ID INTEGER,
    UPDATE_USER_ID INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (FOLDER_ID) REFERENCES EIP_T_CABINET_FOLDER (FOLDER_ID) ON DELETE CASCADE,
    PRIMARY KEY (FILE_ID)
);

-----------------------------------------------------------------------------
-- EIP_M_FACILITY
-----------------------------------------------------------------------------

CREATE TABLE EIP_M_FACILITY
(
    FACILITY_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    FACILITY_NAME VARCHAR (64) NOT NULL,
    NOTE TEXT,
    SORT INTEGER,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(FACILITY_ID)
);

-----------------------------------------------------------------------------
-- EIP_FACILITY_GROUP
-----------------------------------------------------------------------------

CREATE TABLE EIP_FACILITY_GROUP
(
    ID INTEGER NOT NULL,
    FACILITY_ID INTEGER NOT NULL,
    GROUP_ID INTEGER NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY (FACILITY_ID) REFERENCES EIP_M_FACILITY (FACILITY_ID) ON DELETE CASCADE,
    FOREIGN KEY (GROUP_ID) REFERENCES TURBINE_GROUP (GROUP_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_TIMECARD
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMECARD
(
    TIMECARD_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    WORK_DATE TIMESTAMP,
    WORK_FLAG VARCHAR (1) NOT NULL,
    REASON TEXT,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(TIMECARD_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_TIMECARD_SETTINGS
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMECARD_SETTINGS
(
  TIMECARD_SETTINGS_ID INTEGER NOT NULL,
  USER_ID INTEGER NOT NULL,
  START_HOUR int4,
  START_MINUTE int4,
  END_HOUR int4,
  END_MINUTE int4,
  WORKTIME_IN int4,
  RESTTIME_IN int4,
  WORKTIME_OUT int4,
  RESTTIME_OUT int4,
  CREATE_DATE TIMESTAMP,
  UPDATE_DATE TIMESTAMP,
  PRIMARY KEY(TIMECARD_SETTINGS_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_EXT_TIMECARD
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_EXT_TIMECARD
(
    TIMECARD_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    PUNCH_DATE DATE,
    TYPE VARCHAR (1),
    CLOCK_IN_TIME TIMESTAMP,
    CLOCK_OUT_TIME TIMESTAMP,
    REASON TEXT,
    OUTGOING_TIME1 TIMESTAMP,
    COMEBACK_TIME1 TIMESTAMP,
    OUTGOING_TIME2 TIMESTAMP,
    COMEBACK_TIME2 TIMESTAMP,
    OUTGOING_TIME3 TIMESTAMP,
    COMEBACK_TIME3 TIMESTAMP,
    OUTGOING_TIME4 TIMESTAMP,
    COMEBACK_TIME4 TIMESTAMP,
    OUTGOING_TIME5 TIMESTAMP,
    COMEBACK_TIME5 TIMESTAMP,
    REMARKS TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(TIMECARD_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_EXT_TIMECARD_SYSTEM
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_EXT_TIMECARD_SYSTEM
(
    SYSTEM_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    SYSTEM_NAME VARCHAR (64),
    START_HOUR INTEGER,
    START_MINUTE INTEGER,
    END_HOUR INTEGER,
    END_MINUTE INTEGER,
    START_DAY SMALLINT,
    WORKTIME_IN INTEGER,
    RESTTIME_IN INTEGER,
    WORKTIME_OUT INTEGER,
    RESTTIME_OUT INTEGER,
    CHANGE_HOUR INTEGER,
    OUTGOING_ADD_FLAG VARCHAR (1),
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(SYSTEM_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_EXT_TIMECARD_SYSTEM_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_EXT_TIMECARD_SYSTEM_MAP
(
    SYSTEM_MAP_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    SYSTEM_ID INTEGER NOT NULL,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (SYSTEM_ID) REFERENCES EIP_T_EXT_TIMECARD_SYSTEM (SYSTEM_ID) ON DELETE CASCADE,
    PRIMARY KEY(SYSTEM_MAP_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_WORKFLOW_ROUTE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_WORKFLOW_ROUTE
(
    ROUTE_ID INTEGER NOT NULL,
    ROUTE_NAME VARCHAR (64) NOT NULL,
    NOTE TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    ROUTE TEXT,
    PRIMARY KEY(ROUTE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_WORKFLOW_CATEGORY
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_WORKFLOW_CATEGORY
(
    CATEGORY_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    CATEGORY_NAME VARCHAR (64) NOT NULL,
    NOTE TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    TEMPLATE TEXT,
    ROUTE_ID INTEGER,
    FOREIGN KEY (ROUTE_ID) REFERENCES EIP_T_WORKFLOW_ROUTE (ROUTE_ID),
    PRIMARY KEY(CATEGORY_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_WORKFLOW_REQUEST
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_WORKFLOW_REQUEST
(
    REQUEST_ID INTEGER NOT NULL,
    PARENT_ID INTEGER,
    USER_ID INTEGER NOT NULL,
    REQUEST_NAME VARCHAR (64),
    CATEGORY_ID INTEGER,
    PRIORITY smallint,
    PROGRESS VARCHAR (1),
    NOTE TEXT,
    PRICE bigint,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    ROUTE_ID INTEGER,
    FOREIGN KEY (CATEGORY_ID) REFERENCES EIP_T_WORKFLOW_CATEGORY (CATEGORY_ID) ON DELETE CASCADE,
    FOREIGN KEY (ROUTE_ID) REFERENCES EIP_T_WORKFLOW_ROUTE (ROUTE_ID),
    PRIMARY KEY(REQUEST_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_WORKFLOW_FILE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_WORKFLOW_FILE
(
    FILE_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    REQUEST_ID INTEGER,
    FILE_NAME VARCHAR (128) NOT NULL,
    FILE_PATH TEXT NOT NULL,
    FILE_THUMBNAIL bytea,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (REQUEST_ID) REFERENCES EIP_T_WORKFLOW_REQUEST (REQUEST_ID) ON DELETE CASCADE,
    PRIMARY KEY (FILE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_WORKFLOW_REQUEST_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_WORKFLOW_REQUEST_MAP
(
   ID INTEGER NOT NULL,
   REQUEST_ID INTEGER NOT NULL,
   USER_ID INTEGER NOT NULL,
   STATUS VARCHAR (1),
   ORDER_INDEX INTEGER NOT NULL,
   NOTE TEXT,
   CREATE_DATE DATE,
   UPDATE_DATE TIMESTAMP,
   FOREIGN KEY (REQUEST_ID) REFERENCES EIP_T_WORKFLOW_REQUEST (REQUEST_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_MEMO
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_MEMO
(
    MEMO_ID INTEGER NOT NULL,
    OWNER_ID INTEGER NOT NULL,
    MEMO_NAME VARCHAR (64) NOT NULL,
    NOTE TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(MEMO_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_WHATSNEW
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_WHATSNEW
(
    WHATSNEW_ID INTEGER NOT NULL,
    USER_ID INTEGER,
    PORTLET_TYPE INTEGER,
    PARENT_ID INTEGER,
    ENTITY_ID INTEGER,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(WHATSNEW_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_EVENTLOG
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_EVENTLOG
(
    EVENTLOG_ID INTEGER NOT NULL,
    USER_ID INTEGER,
    EVENT_DATE TIMESTAMP,
    EVENT_TYPE INTEGER,
    PORTLET_TYPE INTEGER,
    ENTITY_ID INTEGER,
    IP_ADDR TEXT,
    NOTE TEXT,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(EVENTLOG_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_ACL_ROLE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_ACL_ROLE
(
    ROLE_ID INTEGER NOT NULL,
    ROLE_NAME VARCHAR (99) NOT NULL,
    FEATURE_ID INTEGER NOT NULL,
    ACL_TYPE INTEGER,
    NOTE TEXT,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(ROLE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_ACL_PORTLET_FEATURE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_ACL_PORTLET_FEATURE
(
  FEATURE_ID INTEGER NOT NULL,
  FEATURE_NAME VARCHAR(99),
  FEATURE_ALIAS_NAME VARCHAR(99),
  ACL_TYPE INTEGER,
  PRIMARY KEY(FEATURE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_ACL_USER_ROLE_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_ACL_USER_ROLE_MAP
(
    ID INTEGER NOT NULL,
    USER_ID INT4 NOT NULL,
    ROLE_ID INT4 NOT NULL,
    PRIMARY KEY(ID)
);



CREATE TABLE jetspeed_group_profile (
    COUNTRY varchar(2) NULL,
    GROUP_NAME varchar(99) NULL,
    LANGUAGE varchar(2) NULL,
    MEDIA_TYPE varchar(99) NULL,
    PAGE varchar(99) NULL,
    PROFILE bytea NULL,
    PSML_ID INTEGER NOT NULL,
    PRIMARY KEY (PSML_ID)
)
;

CREATE TABLE jetspeed_user_profile (
    COUNTRY varchar(2) NULL,
    LANGUAGE varchar(2) NULL,
    MEDIA_TYPE varchar(99) NULL,
    PAGE varchar(99) NULL,
    PROFILE bytea NULL,
    PSML_ID INTEGER NOT NULL,
    USER_NAME varchar(32) NULL,
    PRIMARY KEY (PSML_ID)
)
;

CREATE TABLE jetspeed_role_profile (
    COUNTRY varchar(2) NULL,
    LANGUAGE varchar(2) NULL,
    MEDIA_TYPE varchar(99) NULL,
    PAGE varchar(99) NULL,
    PROFILE bytea NULL,
    PSML_ID INTEGER NOT NULL,
    ROLE_NAME varchar(99) NULL,
    PRIMARY KEY (PSML_ID)
)
;

CREATE TABLE eip_m_config (
    ID INTEGER NOT NULL,
    NAME varchar(64) NULL,
    VALUE varchar(255) NULL,
    PRIMARY KEY (ID)
)
;

CREATE INDEX eip_m_config_name ON eip_m_config (NAME);

CREATE TABLE application (
    APP_ID varchar(255) NOT NULL,
    CONSUMER_KEY varchar(99) NULL,
    CONSUMER_SECRET varchar(99) NULL,
    CREATE_DATE date NULL,
    DESCRIPTION text NULL,
    ICON varchar(255) NULL,
    ICON64 varchar(255) NULL,
    ID INTEGER NOT NULL,
    STATUS INTEGER NULL,
    SUMMARY varchar(255) NULL,
    TITLE varchar(99) NULL,
    UPDATE_DATE timestamp with time zone NULL,
    URL varchar(255) NOT NULL,
    PRIMARY KEY (ID)
)
;

CREATE TABLE activity (
    APP_ID varchar(255) NOT NULL,
    BODY text NULL,
    EXTERNAL_ID varchar(99) NULL,
    ICON varchar(255) NULL,
    ID INTEGER NOT NULL,
    LOGIN_NAME varchar(32) NOT NULL,
    MODULE_ID INTEGER NOT NULL,
    PORTLET_PARAMS varchar(99) NULL,
    PRIORITY float NULL,
    TITLE varchar(255) NOT NULL,
    UPDATE_DATE timestamp with time zone NULL,
    PRIMARY KEY (ID)
)
;

CREATE TABLE oauth_token (
    ACCESS_TOKEN varchar(255) NULL,
    ID INTEGER NOT NULL,
    SESSION_HANDLE varchar(255) NULL,
    TOKEN_EXPIRE_MILIS INTEGER NULL,
    TOKEN_SECRET varchar(255) NULL,
    PRIMARY KEY (ID)
)
;

CREATE TABLE oauth_entry (
    APP_ID varchar(255) NULL,
    AUTHORIZED INTEGER NULL,
    CALLBACK_TOKEN varchar(255) NULL,
    CALLBACK_TOKEN_ATTEMPTS INTEGER NULL,
    CALLBACK_URL varchar(255) NULL,
    CALLBACK_URL_SIGNED INTEGER NULL,
    CONSUMER_KEY varchar(255) NULL,
    CONTAINER varchar(32) NULL,
    DOMAIN varchar(255) NULL,
    ID INTEGER NOT NULL,
    ISSUE_TIME timestamp with time zone NULL,
    OAUTH_VERSION varchar(16) NULL,
    TOKEN varchar(255) NULL,
    TOKEN_SECRET varchar(255) NULL,
    TYPE varchar(32) NULL,
    USER_ID varchar(64) NULL,
    PRIMARY KEY (ID)
)
;



CREATE TABLE oauth_consumer (
    APP_ID INTEGER NULL,
    CONSUMER_KEY varchar(255) NULL,
    CONSUMER_SECRET varchar(255) NULL,
    CREATE_DATE date NULL,
    ID INTEGER NOT NULL,
    NAME varchar(99) NULL,
    TYPE varchar(99) NULL,
    UPDATE_DATE timestamp with time zone NULL,
    PRIMARY KEY (ID)
)
;

CREATE TABLE container_config (
    ID INTEGER NOT NULL,
    NAME varchar(64) NOT NULL,
    VALUE varchar(255) NULL,
    PRIMARY KEY (ID)
)
;

CREATE INDEX container_config_name ON container_config (NAME);

CREATE TABLE activity_map (
    ACTIVITY_ID INTEGER NULL,
    ID INTEGER NOT NULL,
    IS_READ INTEGER NULL,
    LOGIN_NAME varchar(32) NOT NULL,
    PRIMARY KEY (ID)
)
;

CREATE TABLE app_data (
    APP_ID varchar(255) NOT NULL,
    ID INTEGER NOT NULL,
    NAME varchar(99) NOT NULL,
    LOGIN_NAME varchar(32) NOT NULL,
    VALUE text NULL,
    PRIMARY KEY (ID)
)
;

CREATE TABLE module_id (
    ID INTEGER NOT NULL,
    PRIMARY KEY (ID)
)
;

ALTER TABLE oauth_consumer ADD FOREIGN KEY (APP_ID) REFERENCES application (ID) ON DELETE CASCADE;
ALTER TABLE activity_map ADD FOREIGN KEY (ACTIVITY_ID) REFERENCES activity (ID) ON DELETE CASCADE;

CREATE TABLE EIP_M_FACILITY_GROUP
(
    GROUP_ID INTEGER NOT NULL,
    GROUP_NAME VARCHAR (64),
    PRIMARY KEY(GROUP_ID)
);

CREATE TABLE EIP_M_FACILITY_GROUP_MAP
(
    ID INTEGER NOT NULL,
    FACILITY_ID INTEGER,
    GROUP_ID INTEGER,
    PRIMARY KEY(ID)
);

CREATE TABLE eip_m_inactive_application (
    ID INTEGER NOT NULL,
    NAME varchar(128) NULL,
    PRIMARY KEY (ID)
)
;

-----------------------------------------------------------------------------
-- EIP_T_REPORT
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_REPORT
(
    REPORT_ID INTEGER NOT NULL,
    PARENT_ID INTEGER NOT NULL,
    USER_ID INTEGER NOT NULL,
    START_DATE TIMESTAMP,
    END_DATE TIMESTAMP,
    REPORT_NAME VARCHAR (64),
    NOTE TEXT,
    CREATE_DATE TIMESTAMP,
    UPDATE_DATE TIMESTAMP,
    PRIMARY KEY(REPORT_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_REPORT_FILE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_REPORT_FILE
(
    FILE_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    REPORT_ID INTEGER,
    FILE_NAME VARCHAR (128) NOT NULL,
    FILE_PATH TEXT NOT NULL,
    FILE_THUMBNAIL bytea,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (REPORT_ID) REFERENCES EIP_T_REPORT (REPORT_ID) ON DELETE CASCADE,
    PRIMARY KEY (FILE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_REPORT_MEMBER_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_REPORT_MEMBER_MAP
(
   ID INTEGER NOT NULL,
   REPORT_ID INTEGER NOT NULL,
   USER_ID INTEGER NOT NULL,
   FOREIGN KEY (REPORT_ID) REFERENCES EIP_T_REPORT (REPORT_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_REPORT_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_REPORT_MAP
(
   ID INTEGER NOT NULL,
   REPORT_ID INTEGER NOT NULL,
   USER_ID INTEGER NOT NULL,
   STATUS VARCHAR (1),
   CREATE_DATE DATE,
   UPDATE_DATE TIMESTAMP,
   FOREIGN KEY (REPORT_ID) REFERENCES EIP_T_REPORT (REPORT_ID) ON DELETE CASCADE,
   PRIMARY KEY(ID)
);

-----------------------------------------------------------------------------
-- EIP_T_TIMELINE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMELINE
(
    TIMELINE_ID INTEGER NOT NULL,
    PARENT_ID INTEGER NOT NULL DEFAULT 0,
    OWNER_ID INTEGER,
    APP_ID VARCHAR(255),
    EXTERNAL_ID varchar(99),
    NOTE TEXT,
    TIMELINE_TYPE VARCHAR (2),
    NUM_ON_DAY INTEGER DEFAULT 0,
    PARAMS VARCHAR (99),
    CREATE_DATE TIMESTAMP DEFAULT now(),
    UPDATE_DATE TIMESTAMP DEFAULT now(),
    FOREIGN KEY (TIMELINE_ID) REFERENCES EIP_T_TIMELINE (TIMELINE_ID) ON DELETE CASCADE,
    PRIMARY KEY(TIMELINE_ID)
);

CREATE INDEX eip_t_timeline_parent_id_index ON EIP_T_TIMELINE (PARENT_ID);

-----------------------------------------------------------------------------
-- EIP_T_TIMELINE_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMELINE_MAP
(
    ID INTEGER NOT NULL,
    TIMELINE_ID INTEGER NULL,
    IS_READ INTEGER NULL,
    LOGIN_NAME varchar(32) NOT NULL,
    PRIMARY KEY(ID)
);
ALTER TABLE EIP_T_TIMELINE_MAP ADD FOREIGN KEY (TIMELINE_ID) REFERENCES EIP_T_TIMELINE (TIMELINE_ID) ON DELETE CASCADE;

-----------------------------------------------------------------------------
-- EIP_T_TIMELINE_LIKE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMELINE_LIKE
(
    TIMELINE_LIKE_ID INTEGER NOT NULL,
    TIMELINE_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    CREATE_DATE TIMESTAMP DEFAULT now(),
    FOREIGN KEY (TIMELINE_LIKE_ID) REFERENCES EIP_T_TIMELINE_LIKE (TIMELINE_LIKE_ID) ON DELETE CASCADE,
    PRIMARY KEY(TIMELINE_LIKE_ID),
    UNIQUE (TIMELINE_ID, OWNER_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_TIMELINE_FILE
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMELINE_FILE
(
    FILE_ID INTEGER NOT NULL,
    OWNER_ID INTEGER,
    TIMELINE_ID INTEGER,
    FILE_NAME VARCHAR (128) NOT NULL,
    FILE_PATH TEXT NOT NULL,
    FILE_THUMBNAIL bytea,
    CREATE_DATE DATE,
    UPDATE_DATE TIMESTAMP,
    FOREIGN KEY (TIMELINE_ID) REFERENCES EIP_T_TIMELINE (TIMELINE_ID) ON DELETE CASCADE,
    PRIMARY KEY (FILE_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_TIMELINE_URL
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_TIMELINE_URL
(
    URL_ID INTEGER NOT NULL,
    TIMELINE_ID INTEGER,
    THUMBNAIL bytea,
    TITLE VARCHAR (128),
    URL TEXT NOT NULL,
    BODY TEXT,
    FOREIGN KEY (TIMELINE_ID) REFERENCES EIP_T_TIMELINE (TIMELINE_ID) ON DELETE CASCADE,
    PRIMARY KEY (URL_ID)
);

-----------------------------------------------------------------------------
-- EIP_T_ACL_MAP
-----------------------------------------------------------------------------

CREATE TABLE EIP_T_ACL_MAP
(
  ACL_ID INTEGER NOT NULL,
  TARGET_ID INTEGER NOT NULL,
  TARGET_TYPE CHARACTER VARYING(8),
  ID INTEGER NOT NULL,
  TYPE VARCHAR(8),
  FEATURE VARCHAR(64),
  LEVEL INTEGER NOT NULL,
  PRIMARY KEY (ACL_ID)
);

-----------------------------------------------------------------------------
-- CREATE SEQUENCE
-----------------------------------------------------------------------------

CREATE SEQUENCE pk_aipo_license INCREMENT 20;
CREATE SEQUENCE pk_eip_facility_group INCREMENT 20;
CREATE SEQUENCE pk_eip_m_address_group INCREMENT 20;
CREATE SEQUENCE pk_eip_m_addressbook INCREMENT 20;
CREATE SEQUENCE pk_eip_m_addressbook_company INCREMENT 20;
CREATE SEQUENCE pk_eip_m_company INCREMENT 20;
CREATE SEQUENCE pk_eip_m_facility INCREMENT 20;
CREATE SEQUENCE pk_eip_m_mail_account INCREMENT 20;
CREATE SEQUENCE pk_eip_m_mail_notify_conf INCREMENT 20;
CREATE SEQUENCE pk_eip_m_position INCREMENT 20;
CREATE SEQUENCE pk_eip_m_post INCREMENT 20;
CREATE SEQUENCE pk_eip_m_user_position INCREMENT 20;
CREATE SEQUENCE pk_eip_t_acl_portlet_feature INCREMENT 20;
CREATE SEQUENCE pk_eip_t_acl_role INCREMENT 20;
CREATE SEQUENCE pk_eip_t_acl_user_role_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_addressbook_group_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_blog INCREMENT 20;
CREATE SEQUENCE pk_eip_t_blog_comment INCREMENT 20;
CREATE SEQUENCE pk_eip_t_blog_entry INCREMENT 20;
CREATE SEQUENCE pk_eip_t_blog_file INCREMENT 20;
CREATE SEQUENCE pk_eip_t_blog_footmark_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_blog_thema INCREMENT 20;
CREATE SEQUENCE pk_eip_t_cabinet_file INCREMENT 20;
CREATE SEQUENCE pk_eip_t_cabinet_folder INCREMENT 20;
CREATE SEQUENCE pk_eip_t_cabinet_folder_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_common_category INCREMENT 20;
CREATE SEQUENCE pk_eip_t_eventlog INCREMENT 20;
CREATE SEQUENCE pk_eip_t_ext_timecard INCREMENT 20;
CREATE SEQUENCE pk_eip_t_ext_timecard_system INCREMENT 20;
CREATE SEQUENCE pk_eip_t_ext_timecard_system_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_mail INCREMENT 20;
CREATE SEQUENCE pk_eip_t_mail_filter INCREMENT 20;
CREATE SEQUENCE pk_eip_t_mail_folder INCREMENT 20;
CREATE SEQUENCE pk_eip_t_memo INCREMENT 20;
CREATE SEQUENCE pk_eip_t_msgboard_category INCREMENT 20;
CREATE SEQUENCE pk_eip_t_msgboard_category_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_msgboard_file INCREMENT 20;
CREATE SEQUENCE pk_eip_t_msgboard_topic INCREMENT 20;
CREATE SEQUENCE pk_eip_t_note INCREMENT 20;
CREATE SEQUENCE pk_eip_t_note_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_schedule INCREMENT 20;
CREATE SEQUENCE pk_eip_t_schedule_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_timecard INCREMENT 20;
CREATE SEQUENCE pk_eip_t_timecard_settings INCREMENT 20;
CREATE SEQUENCE pk_eip_t_todo INCREMENT 20;
CREATE SEQUENCE pk_eip_t_todo_category INCREMENT 20;
CREATE SEQUENCE pk_eip_t_whatsnew INCREMENT 20;
CREATE SEQUENCE pk_eip_t_workflow_category INCREMENT 20;
CREATE SEQUENCE pk_eip_t_workflow_file INCREMENT 20;
CREATE SEQUENCE pk_eip_t_workflow_request INCREMENT 20;
CREATE SEQUENCE pk_eip_t_workflow_request_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_workflow_route INCREMENT 20;
CREATE SEQUENCE pk_turbine_group INCREMENT 20;
CREATE SEQUENCE pk_turbine_permission INCREMENT 20;
CREATE SEQUENCE pk_turbine_role INCREMENT 20;
CREATE SEQUENCE pk_turbine_user INCREMENT 20;
CREATE SEQUENCE pk_turbine_user_group_role INCREMENT 20;
CREATE SEQUENCE pk_eip_m_facility_group INCREMENT 20;
CREATE SEQUENCE pk_eip_m_facility_group_map INCREMENT 20;
CREATE SEQUENCE pk_eip_m_inactive_application INCREMENT 20 START 200;

CREATE SEQUENCE pk_eip_m_config INCREMENT 20 START 200;
CREATE SEQUENCE pk_jetspeed_group_profile INCREMENT 20 START 200;
CREATE SEQUENCE pk_jetspeed_role_profile INCREMENT 20 START 200;
CREATE SEQUENCE pk_jetspeed_user_profile INCREMENT 20 START 200;
CREATE SEQUENCE pk_activity INCREMENT 20 START 200;
CREATE SEQUENCE pk_activity_map INCREMENT 20 START 200;
CREATE SEQUENCE pk_app_data INCREMENT 20 START 200;
CREATE SEQUENCE pk_application INCREMENT 20 START 200;
CREATE SEQUENCE pk_container_config INCREMENT 20 START 200;
CREATE SEQUENCE pk_module_id INCREMENT 20 START 200;
CREATE SEQUENCE pk_oauth_consumer INCREMENT 20 START 200;
CREATE SEQUENCE pk_oauth_token INCREMENT 20 START 200;
CREATE SEQUENCE pk_oauth_entry INCREMENT 20 START 200;
CREATE SEQUENCE pk_eip_t_report INCREMENT 20;
CREATE SEQUENCE pk_eip_t_report_file INCREMENT 20;
CREATE SEQUENCE pk_eip_t_report_member_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_report_map INCREMENT 20;
CREATE SEQUENCE pk_eip_t_timeline INCREMENT 20;
CREATE SEQUENCE pk_eip_t_timeline_map INCREMENT 20 START 200;
CREATE SEQUENCE pk_eip_t_timeline_like INCREMENT 20;
CREATE SEQUENCE pk_eip_t_timeline_file INCREMENT 20;
CREATE SEQUENCE pk_eip_t_timeline_url INCREMENT 20;
CREATE SEQUENCE pk_eip_t_acl_map INCREMENT 20;

-----------------------------------------------------------------------------
-- ALTER SEQUENCE
-----------------------------------------------------------------------------

ALTER SEQUENCE pk_aipo_license OWNED BY AIPO_LICENSE.LICENSE_ID;
ALTER SEQUENCE pk_turbine_permission OWNED BY TURBINE_PERMISSION.PERMISSION_ID;
ALTER SEQUENCE pk_turbine_role OWNED BY TURBINE_ROLE.ROLE_ID;
ALTER SEQUENCE pk_turbine_group OWNED BY TURBINE_GROUP.GROUP_ID;
ALTER SEQUENCE pk_turbine_user OWNED BY TURBINE_USER.USER_ID;
ALTER SEQUENCE pk_turbine_user_group_role OWNED BY TURBINE_USER_GROUP_ROLE.ID;
ALTER SEQUENCE pk_eip_m_company OWNED BY EIP_M_COMPANY.COMPANY_ID;
ALTER SEQUENCE pk_eip_m_post OWNED BY EIP_M_POST.POST_ID;
ALTER SEQUENCE pk_eip_m_position OWNED BY EIP_M_POSITION.POSITION_ID;
ALTER SEQUENCE pk_eip_m_user_position OWNED BY EIP_M_USER_POSITION.ID;
ALTER SEQUENCE pk_eip_t_common_category OWNED BY EIP_T_COMMON_CATEGORY.COMMON_CATEGORY_ID;
ALTER SEQUENCE pk_eip_t_schedule OWNED BY EIP_T_SCHEDULE.SCHEDULE_ID;
ALTER SEQUENCE pk_eip_t_schedule_map OWNED BY EIP_T_SCHEDULE_MAP.ID;
ALTER SEQUENCE pk_eip_t_todo_category OWNED BY EIP_T_TODO_CATEGORY.CATEGORY_ID;
ALTER SEQUENCE pk_eip_t_todo OWNED BY EIP_T_TODO.TODO_ID;
ALTER SEQUENCE pk_eip_m_mail_account OWNED BY EIP_M_MAIL_ACCOUNT.ACCOUNT_ID;
ALTER SEQUENCE pk_eip_m_mail_notify_conf OWNED BY EIP_M_MAIL_NOTIFY_CONF.NOTIFY_ID;
ALTER SEQUENCE pk_eip_t_mail OWNED BY EIP_T_MAIL.MAIL_ID;
ALTER SEQUENCE pk_eip_t_mail_folder OWNED BY EIP_T_MAIL_FOLDER.FOLDER_ID;
ALTER SEQUENCE pk_eip_t_mail_filter OWNED BY EIP_T_MAIL_FILTER.FILTER_ID;
ALTER SEQUENCE pk_eip_m_addressbook OWNED BY EIP_M_ADDRESSBOOK.ADDRESS_ID;
ALTER SEQUENCE pk_eip_m_address_group OWNED BY EIP_M_ADDRESS_GROUP.GROUP_ID;
ALTER SEQUENCE pk_eip_m_addressbook_company OWNED BY EIP_M_ADDRESSBOOK_COMPANY.COMPANY_ID;
ALTER SEQUENCE pk_eip_t_addressbook_group_map OWNED BY EIP_T_ADDRESSBOOK_GROUP_MAP.ID;
ALTER SEQUENCE pk_eip_t_note OWNED BY EIP_T_NOTE.NOTE_ID;
ALTER SEQUENCE pk_eip_t_note_map OWNED BY EIP_T_NOTE_MAP.ID;
ALTER SEQUENCE pk_eip_t_msgboard_category OWNED BY EIP_T_MSGBOARD_CATEGORY.CATEGORY_ID;
ALTER SEQUENCE pk_eip_t_msgboard_category_map OWNED BY EIP_T_MSGBOARD_CATEGORY_MAP.ID;
ALTER SEQUENCE pk_eip_t_msgboard_topic OWNED BY EIP_T_MSGBOARD_TOPIC.TOPIC_ID;
ALTER SEQUENCE pk_eip_t_msgboard_file OWNED BY EIP_T_MSGBOARD_FILE.FILE_ID;
ALTER SEQUENCE pk_eip_t_blog OWNED BY EIP_T_BLOG.BLOG_ID;
ALTER SEQUENCE pk_eip_t_blog_thema OWNED BY EIP_T_BLOG_THEMA.THEMA_ID;
ALTER SEQUENCE pk_eip_t_blog_entry OWNED BY EIP_T_BLOG_ENTRY.ENTRY_ID;
ALTER SEQUENCE pk_eip_t_blog_file OWNED BY EIP_T_BLOG_FILE.FILE_ID;
ALTER SEQUENCE pk_eip_t_blog_comment OWNED BY EIP_T_BLOG_COMMENT.COMMENT_ID;
ALTER SEQUENCE pk_eip_t_blog_footmark_map OWNED BY EIP_T_BLOG_FOOTMARK_MAP.ID;
ALTER SEQUENCE pk_eip_t_cabinet_folder OWNED BY EIP_T_CABINET_FOLDER.FOLDER_ID;
ALTER SEQUENCE pk_eip_t_cabinet_folder_map OWNED BY EIP_T_CABINET_FOLDER_MAP.ID;
ALTER SEQUENCE pk_eip_t_cabinet_file OWNED BY EIP_T_CABINET_FILE.FILE_ID;
ALTER SEQUENCE pk_eip_m_facility OWNED BY EIP_M_FACILITY.FACILITY_ID;
ALTER SEQUENCE pk_eip_facility_group OWNED BY EIP_FACILITY_GROUP.ID;
ALTER SEQUENCE pk_eip_t_timecard OWNED BY EIP_T_TIMECARD.TIMECARD_ID;
ALTER SEQUENCE pk_eip_t_timecard_settings OWNED BY EIP_T_TIMECARD_SETTINGS.TIMECARD_SETTINGS_ID;
ALTER SEQUENCE pk_eip_t_ext_timecard OWNED BY EIP_T_EXT_TIMECARD.TIMECARD_ID;
ALTER SEQUENCE pk_eip_t_ext_timecard_system OWNED BY EIP_T_EXT_TIMECARD_SYSTEM.SYSTEM_ID;
ALTER SEQUENCE pk_eip_t_ext_timecard_system_map OWNED BY EIP_T_EXT_TIMECARD_SYSTEM_MAP.SYSTEM_MAP_ID;
ALTER SEQUENCE pk_eip_t_workflow_route OWNED BY EIP_T_WORKFLOW_ROUTE.ROUTE_ID;
ALTER SEQUENCE pk_eip_t_workflow_category OWNED BY EIP_T_WORKFLOW_CATEGORY.CATEGORY_ID;
ALTER SEQUENCE pk_eip_t_workflow_request OWNED BY EIP_T_WORKFLOW_REQUEST.REQUEST_ID;
ALTER SEQUENCE pk_eip_t_workflow_file OWNED BY EIP_T_WORKFLOW_FILE.FILE_ID;
ALTER SEQUENCE pk_eip_t_workflow_request_map OWNED BY EIP_T_WORKFLOW_REQUEST_MAP.ID;
ALTER SEQUENCE pk_eip_t_memo OWNED BY EIP_T_MEMO.MEMO_ID;
ALTER SEQUENCE pk_eip_t_whatsnew OWNED BY EIP_T_WHATSNEW.WHATSNEW_ID;
ALTER SEQUENCE pk_eip_t_whatsnew OWNED BY EIP_T_EVENTLOG.EVENTLOG_ID;
ALTER SEQUENCE pk_eip_t_acl_role OWNED BY EIP_T_ACL_ROLE.ROLE_ID;
ALTER SEQUENCE pk_eip_t_acl_portlet_feature OWNED BY EIP_T_ACL_PORTLET_FEATURE.FEATURE_ID;
ALTER SEQUENCE pk_eip_t_acl_user_role_map OWNED BY EIP_T_ACL_USER_ROLE_MAP.ID;
ALTER SEQUENCE pk_eip_m_facility_group OWNED BY EIP_M_FACILITY_GROUP.GROUP_ID;
ALTER SEQUENCE pk_eip_m_facility_group_map OWNED BY EIP_M_FACILITY_GROUP_MAP.ID;
ALTER SEQUENCE pk_eip_t_report OWNED BY EIP_T_REPORT.REPORT_ID;
ALTER SEQUENCE pk_eip_t_report_file OWNED BY EIP_T_REPORT_FILE.FILE_ID;
ALTER SEQUENCE pk_eip_t_report_member_map OWNED BY EIP_T_REPORT_MEMBER_MAP.ID;
ALTER SEQUENCE pk_eip_t_report_map OWNED BY EIP_T_REPORT_MAP.ID;
ALTER SEQUENCE pk_eip_t_timeline OWNED BY EIP_T_TIMELINE.TIMELINE_ID;
ALTER SEQUENCE pk_eip_t_timeline_like OWNED BY EIP_T_TIMELINE_LIKE.TIMELINE_LIKE_ID;
ALTER SEQUENCE pk_eip_t_timeline_file OWNED BY EIP_T_TIMELINE_FILE.FILE_ID;
ALTER SEQUENCE pk_eip_t_timeline_url OWNED BY EIP_T_TIMELINE_URL.URL_ID;
ALTER SEQUENCE pk_eip_t_acl_map OWNED BY EIP_T_ACL_MAP.ACL_ID;

-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
-- Default Data Insert
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
INSERT INTO TURBINE_PERMISSION VALUES(1,'view',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(2,'customize',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(3,'maximize',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(4,'minimize',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(5,'personalize',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(6,'info',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(7,'close',NULL);
INSERT INTO TURBINE_PERMISSION VALUES(8,'detach',NULL);
SELECT setval('pk_turbine_permission',8);

INSERT INTO TURBINE_ROLE VALUES(1,'user',NULL);
INSERT INTO TURBINE_ROLE VALUES(2,'admin',NULL);
INSERT INTO TURBINE_ROLE VALUES(3,'guest',NULL);
SELECT setval('pk_turbine_role',3);

INSERT INTO TURBINE_GROUP VALUES(1,'Jetspeed',NULL,NULL,NULL,NULL);
INSERT INTO TURBINE_GROUP VALUES(2,'LoginUser',NULL,NULL,NULL,NULL);
INSERT INTO TURBINE_GROUP VALUES(3,'Facility',NULL,NULL,NULL,NULL);
SELECT setval('pk_turbine_group',3);

INSERT INTO TURBINE_USER VALUES(1,'admin','0DPiKuNIrrVmD8IUCuw1hQxNqZc=',' ','Admin','','CONFIRMED',now(),now(),now(),'F',NULL,now(),0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'F',now(),NULL,'F',now(),'T',NULL);
INSERT INTO TURBINE_USER VALUES(2,'template','MibsvmUCE6Sc0DrmcUB1Dk80AIM=','Aimluck','Template','','CONFIRMED',now(),now(),now(),'T',NULL, now(),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'F',now(),NULL,'F',now(),NULL,NULL);
INSERT INTO TURBINE_USER VALUES(3,'anon','YVGPsXFatNaYrKMqeECsey5QfT4=','Anonymous','User','','CONFIRMED',now(),now(),now(),'F',NULL, now(),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'F',now(),NULL,'F',now(),NULL,NULL);
SELECT setval('pk_turbine_user',3);

INSERT INTO TURBINE_ROLE_PERMISSION VALUES(1,1);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(1,2);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(1,3);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(1,4);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(1,5);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(1,6);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,1);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,2);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,3);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,4);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,5);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,6);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(2,7);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(3,1);
INSERT INTO TURBINE_ROLE_PERMISSION VALUES(3,6);

INSERT INTO TURBINE_USER_GROUP_ROLE VALUES(1,2,1,1);
INSERT INTO TURBINE_USER_GROUP_ROLE VALUES(2,1,1,1);
INSERT INTO TURBINE_USER_GROUP_ROLE VALUES(3,1,1,2);
INSERT INTO TURBINE_USER_GROUP_ROLE VALUES(4,3,1,3);
SELECT setval('pk_turbine_user_group_role',4);

INSERT INTO EIP_T_COMMON_CATEGORY VALUES(1,'������','',0,0,NULL,NULL);
SELECT setval('pk_eip_t_common_category',1);

INSERT INTO EIP_T_TODO_CATEGORY VALUES(1,0,0,'������','',NULL ,NULL);
SELECT setval('pk_eip_t_todo_category',1);

INSERT INTO EIP_M_COMPANY VALUES (1, '', '', '', '', '', '', '', '', 80, '', 80, now(), now());
SELECT setval('pk_eip_m_company',1);

INSERT INTO EIP_T_MSGBOARD_CATEGORY VALUES(1,0,'���̑�','','T',NULL,NULL);
SELECT setval('pk_eip_t_msgboard_category',1);

INSERT INTO EIP_T_MSGBOARD_CATEGORY_MAP VALUES(1,1,0,'A');
SELECT setval('pk_eip_t_msgboard_category_map',1);

INSERT INTO EIP_M_ADDRESSBOOK_COMPANY VALUES ('1', '','','','','','','','',1,1,NULL,NULL);
SELECT setval('pk_eip_m_addressbook_company',1);

INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(1,1,1,3,'07:00',now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(2,1,21,3,NULL,now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(3,1,22,3,NULL,now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(4,1,23,3,NULL,now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(5,1,24,3,NULL,now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(6,1,25,3,NULL,now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(7,1,26,3,NULL,now(),now());
INSERT INTO EIP_M_MAIL_NOTIFY_CONF VALUES(8,1,27,3,NULL,now(),now());
SELECT setval('pk_eip_m_mail_notify_conf',7);

INSERT INTO EIP_T_TIMECARD_SETTINGS VALUES(1,1,9,0,18,0,360,60,360,60);
SELECT setval('pk_eip_t_timecard_settings',1);

INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(111,'schedule_self','�X�P�W���[���i�����̗\��j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(112,'schedule_other','�X�P�W���[���i�����[�U�[�̗\��j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(113,'schedule_facility','�X�P�W���[���i�ݔ��̗\��j����',12);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(121,'blog_entry_self','�u���O�i�����̋L���j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(122,'blog_entry_other','�u���O�i�����[�U�[�̋L���j����',27);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(123,'blog_entry_reply','�u���O�i�L���ւ̃R�����g�j����',20);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(124,'blog_theme','�u���O�i�e�[�}�j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(125,'blog_entry_other_reply','�u���O�i�����[�U�[�̋L���ւ̃R�����g�j����',16);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(131,'msgboard_topic','�f���i�g�s�b�N�j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(132,'msgboard_topic_reply','�f���i�g�s�b�N�ԐM�j����',20);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(133,'msgboard_category','�f���i�����̃J�e�S���j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(134,'msgboard_category_other','�f���i�����[�U�[�̃J�e�S���j����',27);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(135,'msgboard_topic_other','�f���i�����[�U�[�̃g�s�b�N�j����',24);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(141,'todo_todo_self','ToDo�i������ToDo�j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(142,'todo_todo_other','ToDo�i�����[�U�[��ToDo�j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(143,'todo_category_self','ToDo�i�J�e�S���j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(144,'todo_category_other','ToDo�i�����[�U�̃J�e�S���j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(151,'workflow_request_self','���[�N�t���[�i�����̈˗��j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(152,'workflow_request_other','���[�N�t���[�i�����[�U�[�̈˗��j����',3);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(161,'addressbook_address_inside','�A�h���X���i�Г��A�h���X�j����',3);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(162,'addressbook_address_outside','�A�h���X���i�ЊO�A�h���X�j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(163,'addressbook_company','�A�h���X���i��Џ��j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(164,'addressbook_company_group','�A�h���X���i�ЊO�O���[�v�j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(171,'timecard_timecard_self','�^�C���J�[�h�i�����̃^�C���J�[�h�j����',47);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(172,'timecard_timecard_other','�^�C���J�[�h�i���l�̃^�C���J�[�h�j����',45);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(181,'cabinet_file','���L�t�H���_�i�t�@�C���j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(182,'cabinet_folder','���L�t�H���_�i�t�H���_�j����',30);
-- INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(191,'manhour_summary_self','�v���W�F�N�g�Ǘ��i�����̍H���j����',1);
-- INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(192,'manhour_summary_other','�v���W�F�N�g�Ǘ��i�����[�U�[�̍H���j����',1);
-- INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(193,'manhour_common_category','�v���W�F�N�g�Ǘ��i�����̋��L�J�e�S���j����',31);
-- INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(194,'manhour_common_category_other','�v���W�F�N�g�Ǘ��i�����[�U�[�̋��L�J�e�S���j����',27);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(201,'portlet_customize','�A�v���z�u',29);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(211,'report_self','�񍐏��i�����̕񍐏��j����',31);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(212,'report_other','�񍐏��i�����[�U�[�̕񍐏��j����',3);
INSERT INTO EIP_T_ACL_PORTLET_FEATURE VALUES(213,'report_reply','�񍐏��i�񍐏��ւ̕ԐM�j����',20);


SELECT setval('pk_eip_t_acl_portlet_feature',300);

-- schedule
INSERT INTO EIP_T_ACL_ROLE VALUES(1,'�X�P�W���[���i�����̗\��j�Ǘ���',111,31,'���ǉ��A�ҏW�A�폜�͈ꗗ�\���Əڍו\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(2,'�X�P�W���[���i�����[�U�[�̗\��j',112,3,NULL);
INSERT INTO EIP_T_ACL_ROLE VALUES(3,'�X�P�W���[���i�ݔ��̗\��j�Ǘ���',113,12,NULL);

-- blog
INSERT INTO EIP_T_ACL_ROLE VALUES(4,'�u���O�i�����̋L���j�Ǘ���',121,31,'���ǉ��A�ҏW�A�폜�͈ꗗ�\���Əڍו\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(5,'�u���O�i�����[�U�[�̋L���j�Ǘ���',122,3,'���ڍו\���A�ҏW�A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(6,'�u���O�i�L���ւ̃R�����g�j�Ǘ���',123,20,NULL);
INSERT INTO EIP_T_ACL_ROLE VALUES(7,'�u���O�i�e�[�}�j�Ǘ���',124,31,'���ڍו\���A�ǉ��A�ҏW�A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- msgboard
INSERT INTO EIP_T_ACL_ROLE VALUES(8,'�f���i�g�s�b�N�j�Ǘ���',131,31,'���ڍו\���A�ǉ��A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(9,'�f���i�g�s�b�N�ԐM�j�Ǘ���',132,20,NULL);
INSERT INTO EIP_T_ACL_ROLE VALUES(10,'�f���i�����̃J�e�S���j�Ǘ���',133,31,'���ǉ��A�ҏW�A�폜�͈ꗗ�\���Əڍו\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- todo
INSERT INTO EIP_T_ACL_ROLE VALUES(12,'ToDo�i������ToDo�j�Ǘ���',141,31,'���ڍו\���A�ǉ��A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(13,'ToDo�i�����[�U�[��ToDo�j�Ǘ���',142,31,'���ڍו\���A�ǉ��A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(14,'ToDo�i�J�e�S���j�Ǘ���',143,31,'���ڍו\���A�ǉ��A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(30,'ToDo�i�����[�U�̃J�e�S���j�Ǘ���',144,31,'���ڍו\���A�ǉ��A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- workflow
INSERT INTO EIP_T_ACL_ROLE VALUES(15,'���[�N�t���[�i�����̈˗��j�Ǘ���',151,31,'���ڍו\���A�ǉ��A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂��� �����F�A�Đ\���⍷���߂��͕ҏW�̌������K�v�ł�');
INSERT INTO EIP_T_ACL_ROLE VALUES(16,'���[�N�t���[�i�����[�U�[�̈˗��j�Ǘ���',152,3,'���ڍו\���͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- addressbook
INSERT INTO EIP_T_ACL_ROLE VALUES(17,'�A�h���X���i�Г��A�h���X�j�Ǘ���',161,3,'���ڍו\���͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(18,'�A�h���X���i�ЊO�A�h���X�j�Ǘ���',162,31,'���ڍו\���A�ǉ��A�ҏW�A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(19,'�A�h���X���i��Џ��j�Ǘ���',163,31,'���ڍו\���A�ǉ��A�ҏW�A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(20,'�A�h���X���i�ЊO�O���[�v�j�Ǘ���',164,31,'���ڍו\���A�ǉ��A�ҏW�A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- timecard
INSERT INTO EIP_T_ACL_ROLE VALUES(21,'�^�C���J�[�h�i�����̃^�C���J�[�h�j�Ǘ���',171,47,'���ǉ��A�ҏW�A�O���o�͈͂ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(22,'�^�C���J�[�h�i���l�̃^�C���J�[�h�j�Ǘ���',172,33,'�������̃^�C���J�[�h�ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂��� ���O���o�͈͂ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- cabinet
INSERT INTO EIP_T_ACL_ROLE VALUES(23,'���L�t�H���_�i�t�@�C���j�Ǘ���',181,31,'���ڍו\���A�ǉ��A�ҏW�A�폜�͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(24,'���L�t�H���_�i�t�H���_�j�Ǘ���',182,30,'���ҏW�A�폜�͏ڍו\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');

-- manhour
-- INSERT INTO EIP_T_ACL_ROLE VALUES(25,'�v���W�F�N�g�Ǘ��i�����̍H���j�Ǘ���',191,1,NULL);
-- INSERT INTO EIP_T_ACL_ROLE VALUES(26,'�v���W�F�N�g�Ǘ��i�����[�U�[�̍H���j�Ǘ���',192,1,NULL);
-- INSERT INTO EIP_T_ACL_ROLE VALUES(27,'�v���W�F�N�g�Ǘ��i�����̋��L�J�e�S���j�Ǘ���',193,31,NULL);
-- INSERT INTO EIP_T_ACL_ROLE VALUES(28,'�v���W�F�N�g�Ǘ��i�����[�U�[�̋��L�J�e�S���j�Ǘ���',194,3,NULL);

--portlet
INSERT INTO EIP_T_ACL_ROLE VALUES(29,'�A�v���z�u�Ǘ���',201,29,NULL);

--report
INSERT INTO EIP_T_ACL_ROLE VALUES(31, '�񍐏��i�����̕񍐏��j�Ǘ���',211,31,'���ǉ��A�ҏW�A�폜�͈ꗗ�\���Əڍו\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(32,'�񍐏��i�����[�U�[�̕񍐏��j�Ǘ���',212,3,'���ڍו\���͈ꗗ�\���̌����������Ă��Ȃ��Ǝg�p�ł��܂���');
INSERT INTO EIP_T_ACL_ROLE VALUES(33,'�񍐏��i�񍐏��ւ̕ԐM�j�Ǘ���',213,20,NULL);

SELECT setval('pk_eip_t_acl_role',10000);

INSERT INTO EIP_T_BLOG_THEMA VALUES(1,'������','',0,0,NULL ,NULL);
SELECT setval('pk_eip_t_blog_thema',1);

INSERT INTO EIP_T_CABINET_FOLDER VALUES(1,0,'���[�g�t�H���_','',0,0,0,NULL,NULL);
SELECT setval('pk_eip_t_cabinet_folder',1);

INSERT INTO EIP_T_CABINET_FOLDER_MAP VALUES(1,1,0,null);
SELECT setval('pk_eip_t_cabinet_folder_map',1);

INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(1,0,'������','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(2,0,'�L���x�ɓ�','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(3,0,'�g�c��','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(4,0,'�����x�ɓ�','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(5,0,'�Y�O�Y��x�ɓ�','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(6,0,'�玙�x�ɓ�','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(7,0,'�玙���ԓ�','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(8,0,'���ʗL���x�ɓ́i�Ɩ��㕉�����j','',NULL,NULL);
INSERT INTO EIP_T_WORKFLOW_CATEGORY VALUES(9,0,'�������x�ɓ�','',NULL,NULL);
SELECT setval('pk_eip_t_workflow_category',9);

INSERT INTO EIP_T_EXT_TIMECARD_SYSTEM VALUES(1, 0, '�ʏ�', 9, 0, 18, 0, 1, 360, 60, 360, 60, 4, 'T',now(), now());
SELECT setval('pk_eip_t_ext_timecard_system',1);
