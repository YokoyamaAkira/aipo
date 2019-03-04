dojo.provide("aipo.account_person");
aipo.account_person.onLoadPersonInfoDialog=function(A){var B=dojo.byId("lastname");
if(B){B.focus()
}};
aipo.account_person.onLoadPersonPasswdDialog=function(A){var B=dojo.byId("new_passwd");
if(B){B.focus()
}};
aipo.account_person.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}location.reload()
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.account_person.onChangePasswdReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.account_person.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("account_person")
};
aipo.account_person.setDeletePhotoValue=function(A){var B=dojo.byId("delete_photo_"+A);
B.value=true
};