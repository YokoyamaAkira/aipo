dojo.provide("aipo.schedule_admin");
aipo.schedule_admin.onLoadScheduleAdminAclList=function(B){aipo.portletReload("schedule_admin")
};
aipo.schedule_admin.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("schedule_admin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};