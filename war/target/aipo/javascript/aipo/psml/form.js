dojo.provide("aipo.psml");
aipo.psml.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("psml")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.psml.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("psml")
};
aipo.psml.beforeSubmit=function(A,B){dojo.byId(A+"-mode").value=B
};
aipo.psml.onReceiveMessageUpdate=function(B){if(!B){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}location.reload()
}};