dojo.provide("aipo.userlist");
aipo.userlist.onSubmitSearchButton=function(E,A,G,D,C){var H=dojo.byId(C+G);
if(H){dojo.style(H,"display","")
}var F=A;
if(D==""){if(E.tab!=undefined){if(E.tab[0].checked){D=E.tab[0].value
}else{D=E.tab[1].value
}}}var B=[["sword",E.sword.value],["tab",D],["mode",E.mode.value]];
aipo.viewPage(F,G,B)
};
aipo.userlist.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.userlist.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("addressbook")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};