dojo.provide("aipo.psml");
aipo.psml.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("psml")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.psml.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("psml")
};
aipo.psml.beforeSubmit=function(C,D){dojo.byId(C+"-mode").value=D
};
aipo.psml.onReceiveMessageUpdate=function(D){if(!D){var C=dijit.byId("modalDialog");
if(!!C){C.hide()
}location.reload()
}};