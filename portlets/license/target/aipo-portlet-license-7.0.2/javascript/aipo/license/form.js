dojo.provide("aipo.license");
aipo.license.onLoadLicenseInfoDialog=function(A){var B=dojo.byId("license_1");
if(B){B.focus()
}};
aipo.license.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("license")
};
aipo.license.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("license")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};