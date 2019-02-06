dojo.provide("aipo.userlist");
aipo.userlist.onSubmitSearchButton=function(M,I,K,N,O){var J=dojo.byId(O+K);
if(J){dojo.style(J,"display","")
}var L=I;
if(N==""){if(M.tab!=undefined){if(M.tab[0].checked){N=M.tab[0].value
}else{N=M.tab[1].value
}}}var P=[["sword",M.sword.value],["tab",N],["mode",M.mode.value]];
aipo.viewPage(L,K,P)
};
aipo.userlist.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.userlist.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};