dojo.provide("aipo.system");
aipo.system.onLoadNetworkInfoDialog=function(G){var F=dojo.byId("ipaddress");
if(F){F.focus()
}var E=document.forms;
for(var H=0;
H<E.length;
H++){aimluck.io.disableForm(E[H],false)
}};
aipo.system.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("system")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.system.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("system")
};
aipo.system.switchAuthSendAdmin=function(B){if(B.value==2){dojo.byId("smtp_auth_field").style.display="";
dojo.byId("pop_auth_field").style.display="none"
}else{if(B.value==1){dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display=""
}else{dojo.byId("smtp_auth_field").style.display="none";
dojo.byId("pop_auth_field").style.display="none"
}}};