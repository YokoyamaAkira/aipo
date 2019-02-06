dojo.provide("aipo.exttimecard");
dojo.require("aimluck.widget.Contentpane");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.exttimecard.onLoadTimecardDialog=function(C){var D=dojo.byId("reason");
if(D){D.focus()
}};
aipo.exttimecard.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value="新しく入力する";
aipo.timecard.formCategoryInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.timecard.formCategoryInputOn(B.form)
}};
aipo.exttimecard.formCategoryInputOn=function(B){dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),true);
B.is_new_category.value="TRUE"
};
aipo.exttimecard.formCategoryInputOff=function(B){dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),true);
B.is_new_category.value="FALSE"
};
aipo.exttimecard.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("exttimecard")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.exttimecard.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("exttimecard")
}if(dojo.byId("exttimecardmessageDiv")){dojo.byId("exttimecardmessageDiv").innerHTML=D
}};
aipo.exttimecard.removeHiddenValue=function(D,C){if(D[C]&&document.getElementsByName(C).item(0)){D.removeChild(D[C])
}};
aipo.exttimecard.addHiddenValue=function(H,E,F){if(H[E]&&document.getElementsByName(E).item(0)){H[E].value=F
}else{var G=document.createElement("input");
G.type="hidden";
G.name=E;
G.value=F;
H.appendChild(G)
}};
aipo.exttimecard.addYearMonthDayHiddenValue=function(M,N){var K=N+"_hour";
var S=N+"_minute";
var O=N+"_year";
var T=N+"_month";
var L=N+"_day";
if(M[K].value!="-1"&&M[S].value!="-1"){var Q=M.punch_date_year.value;
var R=M.punch_date_month.value;
var P=M.punch_date_day.value;
aipo.exttimecard.addHiddenValue(M,O,Q);
aipo.exttimecard.addHiddenValue(M,T,R);
aipo.exttimecard.addHiddenValue(M,L,P)
}else{aipo.exttimecard.removeHiddenValue(M,O);
aipo.exttimecard.removeHiddenValue(M,T);
aipo.exttimecard.removeHiddenValue(M,L)
}};
aipo.exttimecard.onSubmit=function(B){aipo.exttimecard.addYearMonthDayHiddenValue(B,"clock_in_time");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"clock_out_time");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"outgoing_time1");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"outgoing_time2");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"outgoing_time3");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"outgoing_time4");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"outgoing_time5");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"comeback_time1");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"comeback_time2");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"comeback_time3");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"comeback_time4");
aipo.exttimecard.addYearMonthDayHiddenValue(B,"comeback_time5")
};
aipo.exttimecard.displayOutCome=function(H){var F="";
var G=null;
var E=1;
for(E=1;
E<=5;
E++){if(E==5){dojo.byId("plus").style.display="none"
}F="rest_num"+E;
G=dojo.byId(F);
if(G!=null&&G.style.display=="none"){G.style.display="block";
break
}}aipo.exttimecard.setRestNum()
};
aipo.exttimecard.displayBox=function(B){obj=dojo.byId(B);
if(obj!=null){obj.style.display=""
}};
aipo.exttimecard.hideOutCome=function(C){var D=C.id;
if(D=="minus1"){aipo.exttimecard.moveDataOutCome(1);
aipo.exttimecard.hideOutComeBox()
}else{if(D=="minus2"){aipo.exttimecard.moveDataOutCome(2);
aipo.exttimecard.hideOutComeBox()
}else{if(D=="minus3"){aipo.exttimecard.moveDataOutCome(3);
aipo.exttimecard.hideOutComeBox()
}else{if(D=="minus4"){aipo.exttimecard.moveDataOutCome(4);
aipo.exttimecard.hideOutComeBox()
}else{if(D=="minus5"){aipo.exttimecard.hideOutComeBox()
}}}}}dojo.byId("plus").style.display="block";
aipo.exttimecard.setRestNum()
};
aipo.exttimecard.moveDataOutCome=function(E){var H=E;
for(H;
H<=4;
H++){var F=H+1;
var G=H;
dojo.byId("outgoing_time"+G+"_hour").selectedIndex=dojo.byId("outgoing_time"+F+"_hour").selectedIndex;
dojo.byId("outgoing_time"+G+"_minute").selectedIndex=dojo.byId("outgoing_time"+F+"_minute").selectedIndex;
dojo.byId("comeback_time"+G+"_hour").selectedIndex=dojo.byId("comeback_time"+F+"_hour").selectedIndex;
dojo.byId("comeback_time"+G+"_minute").selectedIndex=dojo.byId("comeback_time"+F+"_minute").selectedIndex
}dojo.byId("outgoing_time"+5+"_hour").selectedIndex=0;
dojo.byId("outgoing_time"+5+"_minute").selectedIndex=0;
dojo.byId("comeback_time"+5+"_hour").selectedIndex=0;
dojo.byId("comeback_time"+5+"_minute").selectedIndex=0
};
aipo.exttimecard.hideOutComeBox=function(){var E="";
var F=null;
var D=5;
for(D;
D>=1;
D--){E="rest_num"+D;
F=dojo.byId(E);
if(F!=null&&F.style.display!="none"){F.style.display="none";
break
}}};
aipo.exttimecard.setRestNum=function(){var H=0;
for(var E=1;
E<=5;
E++){var F="rest_num"+E;
var G=dojo.byId(F);
if(G!=null&&G.style.display!="none"){H++
}}dojo.byId("rest_num").value=H
};
aipo.exttimecard.hideBox=function(B){obj=dojo.byId(B);
if(obj!=null){obj.style.display="none"
}};
aipo.exttimecard.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("exttimecard")
};
aipo.exttimecard.hideTimeBox=function(){aipo.exttimecard.hideBox("clock_time_box");
aipo.exttimecard.hideBox("outgoing_comeback_box")
};
aipo.exttimecard.displayTimeBox=function(){aipo.exttimecard.displayBox("clock_time_box");
aipo.exttimecard.displayBox("outgoing_comeback_box")
};