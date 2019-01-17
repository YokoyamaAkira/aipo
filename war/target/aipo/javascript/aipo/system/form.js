dojo.provide("aipo.system");
aipo.system.onLoadNetworkInfoDialog=function(C){var D=dojo.byId("ipaddress");
if(D){D.focus()
}var A=document.forms;
for(var B=0;
B<A.length;
B++){aimluck.io.disableForm(A[B],false)
}};
aipo.system.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("system")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.system.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("system")
};
aipo.system.switchAuthSendAdmin=function(A){if(A.value==2){dojo.byId("smtp_auth_field").style.display="";
dojo.byId("pop_auth_field").style.display="none"
}else{if(A.value==1){dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display=""
}else{dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display="none"
}}};