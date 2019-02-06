dojo.provide("aipo.eventlog");
aipo.eventlog.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("eventlog")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.eventlog.downloadCvn=function(F,D,E){if(F){alert("一覧の総数が"+D+"件を超えています。\n日付の範囲を変更してください。")
}else{window.location.href=E
}};
aipo.eventlog.onChangeDate=function(R,W){var S=dojo.byId("start_date_year");
var M=dojo.byId("start_date_month");
var U=dojo.byId("start_date_day");
var T=S.options[S.selectedIndex].value;
var P=M.options[M.selectedIndex].value;
var Q=U.options[U.selectedIndex].value;
S=dojo.byId("end_date_year");
M=dojo.byId("end_date_month");
U=dojo.byId("end_date_day");
var N=S.options[S.selectedIndex].value;
var V=M.options[M.selectedIndex].value;
var O=U.options[U.selectedIndex].value;
var X=R+"&start_date_year="+T+"&start_date_month="+P+"&start_date_day="+Q+"&end_date_year="+N+"&end_date_month="+V+"&end_date_day="+O;
aipo.viewPage(X,W)
};