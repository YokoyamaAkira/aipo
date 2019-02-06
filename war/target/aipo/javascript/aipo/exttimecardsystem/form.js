dojo.provide("aipo.exttimecardsystem");
aipo.exttimecardsystem.onLoadFormDialog=function(B){};
aipo.exttimecardsystem.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("exttimecardsystem")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.exttimecardsystem.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("exttimecardsystem")
};
aipo.exttimecardsystem.addHiddenValue=function(H,E,F){if(H[E]){H[E].value=F
}else{var G=document.createElement("input");
G.type="hidden";
G.name=E;
G.value=F;
H.appendChild(G)
}};
aipo.exttimecardsystem.onLoadExtTimecardSystemDialog=function(C){var D=dojo.byId("reason");
if(D){D.focus()
}};