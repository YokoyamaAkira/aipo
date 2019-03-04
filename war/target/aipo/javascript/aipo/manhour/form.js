dojo.provide("aipo.manhour");
aipo.manhour.onLoadManhourDialog=function(A){var B=dojo.byId("name");
if(B){B.focus()
}};
aipo.manhour.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}aipo.portletReload("manhour")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.manhour.onReceiveMessageDiag=function(B){if(!B){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}aipo.portletReload("manhour")
}if(dojo.byId("messageDivDiag")){dojo.byId("messageDivDiag").innerHTML=B
}};
aipo.manhour.onChangeGroup=function(D,C){var A=dojo.byId("target_group_name");
var E=A.options[A.selectedIndex].value;
var B=D+"&target_group_name="+E+"&target_user_id=";
aipo.viewPage(B,C)
};
aipo.manhour.onChangeUser=function(F,E){var B=dojo.byId("target_group_name");
var C=dojo.byId("target_user_id");
var G=B.options[B.selectedIndex].value;
var A=C.options[C.selectedIndex].value;
var D=F+"&target_group_name="+G+"&target_user_id="+A;
aipo.viewPage(D,E)
};
aipo.manhour.onChangeCategory=function(E,D){var A=dojo.byId("commoncategory");
var B=A.options[A.selectedIndex].value;
var C=E+"&category_id="+B;
aipo.viewPage(C,D)
};
aipo.manhour.onChangeDate=function(G,F){var C=dojo.byId("view_date_year");
var A=dojo.byId("view_date_month");
var B=C.options[C.selectedIndex].value;
var E=A.options[A.selectedIndex].value;
var D=G+"&view_date_year="+B+"&view_date_month="+E;
aipo.viewPage(D,F)
};