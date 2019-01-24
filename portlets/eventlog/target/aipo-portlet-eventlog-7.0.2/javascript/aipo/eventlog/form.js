dojo.provide("aipo.eventlog");
aipo.eventlog.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("eventlog")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.eventlog.downloadCvn=function(B,A,C){if(B){alert("一覧の総数が"+A+"件を超えています。\n日付の範囲を変更してください。")
}else{window.location.href=C
}};
aipo.eventlog.onChangeDate=function(K,F){var J=dojo.byId("start_date_year");
var D=dojo.byId("start_date_month");
var H=dojo.byId("start_date_day");
var I=J.options[J.selectedIndex].value;
var A=D.options[D.selectedIndex].value;
var L=H.options[H.selectedIndex].value;
J=dojo.byId("end_date_year");
D=dojo.byId("end_date_month");
H=dojo.byId("end_date_day");
var C=J.options[J.selectedIndex].value;
var G=D.options[D.selectedIndex].value;
var B=H.options[H.selectedIndex].value;
var E=K+"&start_date_year="+I+"&start_date_month="+A+"&start_date_day="+L+"&end_date_year="+C+"&end_date_month="+G+"&end_date_day="+B;
aipo.viewPage(E,F)
};