-- 20120706
UPDATE `eip_t_acl_portlet_feature` SET `acl_type` = 41 WHERE `feature_id` = 172 AND `feature_name` = 'timecard_timecard_other';
-- 20120706

-- 20120711
UPDATE `eip_t_acl_portlet_feature` SET `acl_type` = 45 WHERE `feature_id` = 172 AND `feature_name` = 'timecard_timecard_other';
-- 20120711

-- 20120724
ALTER TABLE activity CHANGE COLUMN title title varchar(255) NOT NULL;
-- 20120724

-- 20120807
ALTER TABLE `turbine_user`  ADD `PHOTO_SMARTPHONE` blob;
ALTER TABLE `turbine_user`  ADD `HAS_PHOTO_SMARTPHONE`  varchar(1) COLLATE utf8_unicode_ci DEFAULT 'F';
ALTER TABLE `turbine_user`  ADD `PHOTO_MODIFIED_SMARTPHONE`  datetime DEFAULT NULL;
-- 20120807
