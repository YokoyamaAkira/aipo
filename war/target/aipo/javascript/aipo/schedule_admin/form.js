dojo.provide("aipo.schedule_admin");
aipo.schedule_admin.onLoadScheduleAdminAclList=function(A){aipo.portletReload("schedule_admin")
};
aipo.schedule_admin.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("schedule_admin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};