dojo.provide("aipo.manhour");
aipo.manhour.onLoadManhourDialog=function(C){var D=dojo.byId("name");
if(D){D.focus()
}};
aipo.manhour.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(!!C){C.hide()
}aipo.portletReload("manhour")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.manhour.onReceiveMessageDiag=function(D){if(!D){var C=dijit.byId("modalDialog");
if(!!C){C.hide()
}aipo.portletReload("manhour")
}if(dojo.byId("messageDivDiag")){dojo.byId("messageDivDiag").innerHTML=D
}};
aipo.manhour.onChangeGroup=function(H,I){var F=dojo.byId("target_group_name");
var G=F.options[F.selectedIndex].value;
var J=H+"&target_group_name="+G+"&target_user_id=";
aipo.viewPage(J,I)
};
aipo.manhour.onChangeUser=function(J,K){var N=dojo.byId("target_group_name");
var M=dojo.byId("target_user_id");
var I=N.options[N.selectedIndex].value;
var H=M.options[M.selectedIndex].value;
var L=J+"&target_group_name="+I+"&target_user_id="+H;
aipo.viewPage(L,K)
};
aipo.manhour.onChangeCategory=function(G,H){var F=dojo.byId("commoncategory");
var J=F.options[F.selectedIndex].value;
var I=G+"&category_id="+J;
aipo.viewPage(I,H)
};
aipo.manhour.onChangeDate=function(I,J){var M=dojo.byId("view_date_year");
var H=dojo.byId("view_date_month");
var N=M.options[M.selectedIndex].value;
var K=H.options[H.selectedIndex].value;
var L=I+"&view_date_year="+N+"&view_date_month="+K;
aipo.viewPage(L,J)
};