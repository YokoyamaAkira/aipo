dojo.provide("aipo.exttimecardsystem");
aipo.exttimecardsystem.onLoadFormDialog=function(A){};
aipo.exttimecardsystem.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("exttimecardsystem")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.exttimecardsystem.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("exttimecardsystem")
};
aipo.exttimecardsystem.addHiddenValue=function(B,A,D){if(B[A]){B[A].value=D
}else{var C=document.createElement("input");
C.type="hidden";
C.name=A;
C.value=D;
B.appendChild(C)
}};
aipo.exttimecardsystem.onLoadExtTimecardSystemDialog=function(A){var B=dojo.byId("reason");
if(B){B.focus()
}};