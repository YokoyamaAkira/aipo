dojo.provide("aipo.account_person");
aipo.account_person.onLoadPersonInfoDialog=function(C){var D=dojo.byId("lastname");
if(D){D.focus()
}};
aipo.account_person.onLoadPersonPasswdDialog=function(C){var D=dojo.byId("new_passwd");
if(D){D.focus()
}};
aipo.account_person.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}location.reload()
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.account_person.onChangePasswdReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.account_person.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("account_person")
};
aipo.account_person.setDeletePhotoValue=function(C){var D=dojo.byId("delete_photo_"+C);
D.value=true
};