dojo.provide("aipo.license");
aipo.license.onLoadLicenseInfoDialog=function(C){var D=dojo.byId("license_1");
if(D){D.focus()
}};
aipo.license.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("license")
};
aipo.license.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("license")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};