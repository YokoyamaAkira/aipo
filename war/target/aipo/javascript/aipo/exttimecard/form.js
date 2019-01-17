dojo.provide("aipo.exttimecard");
dojo.require("aimluck.widget.Contentpane");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.exttimecard.onLoadTimecardDialog=function(A){var B=dojo.byId("reason");
if(B){B.focus()
}};
aipo.exttimecard.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value="新しく入力する";
aipo.timecard.formCategoryInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.timecard.formCategoryInputOn(A.form)
}};
aipo.exttimecard.formCategoryInputOn=function(A){dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),true);
A.is_new_category.value="TRUE"
};
aipo.exttimecard.formCategoryInputOff=function(A){dojo.html.setDisplay(dojo.byId("timecardCategoryInputField"),false);
dojo.html.setDisplay(dojo.byId("timecardCategorySelectField"),true);
A.is_new_category.value="FALSE"
};
aipo.exttimecard.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("exttimecard")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.exttimecard.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("exttimecard")
}if(dojo.byId("exttimecardmessageDiv")){dojo.byId("exttimecardmessageDiv").innerHTML=B
}};
aipo.exttimecard.removeHiddenValue=function(B,A){if(B[A]&&document.getElementsByName(A).item(0)){B.removeChild(B[A])
}};
aipo.exttimecard.addHiddenValue=function(B,A,D){if(B[A]&&document.getElementsByName(A).item(0)){B[A].value=D
}else{var C=document.createElement("input");
C.type="hidden";
C.name=A;
C.value=D;
B.appendChild(C)
}};
aipo.exttimecard.addYearMonthDayHiddenValue=function(B,A){var D=A+"_hour";
var F=A+"_minute";
var J=A+"_year";
var E=A+"_month";
var C=A+"_day";
if(B[D].value!="-1"&&B[F].value!="-1"){var H=B.punch_date_year.value;
var G=B.punch_date_month.value;
var I=B.punch_date_day.value;
aipo.exttimecard.addHiddenValue(B,J,H);
aipo.exttimecard.addHiddenValue(B,E,G);
aipo.exttimecard.addHiddenValue(B,C,I)
}else{aipo.exttimecard.removeHiddenValue(B,J);
aipo.exttimecard.removeHiddenValue(B,E);
aipo.exttimecard.removeHiddenValue(B,C)
}};
aipo.exttimecard.onSubmit=function(A){aipo.exttimecard.addYearMonthDayHiddenValue(A,"clock_in_time");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"clock_out_time");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"outgoing_time1");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"outgoing_time2");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"outgoing_time3");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"outgoing_time4");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"outgoing_time5");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"comeback_time1");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"comeback_time2");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"comeback_time3");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"comeback_time4");
aipo.exttimecard.addYearMonthDayHiddenValue(A,"comeback_time5")
};
aipo.exttimecard.displayOutCome=function(B){var D="";
var C=null;
var A=1;
for(A=1;
A<=5;
A++){if(A==5){dojo.byId("plus").style.display="none"
}D="rest_num"+A;
C=dojo.byId(D);
if(C!=null&&C.style.display=="none"){C.style.display="block";
break
}}aipo.exttimecard.setRestNum()
};
aipo.exttimecard.displayBox=function(A){obj=dojo.byId(A);
if(obj!=null){obj.style.display=""
}};
aipo.exttimecard.hideOutCome=function(A){var B=A.id;
if(B=="minus1"){aipo.exttimecard.moveDataOutCome(1);
aipo.exttimecard.hideOutComeBox()
}else{if(B=="minus2"){aipo.exttimecard.moveDataOutCome(2);
aipo.exttimecard.hideOutComeBox()
}else{if(B=="minus3"){aipo.exttimecard.moveDataOutCome(3);
aipo.exttimecard.hideOutComeBox()
}else{if(B=="minus4"){aipo.exttimecard.moveDataOutCome(4);
aipo.exttimecard.hideOutComeBox()
}else{if(B=="minus5"){aipo.exttimecard.hideOutComeBox()
}}}}}dojo.byId("plus").style.display="block";
aipo.exttimecard.setRestNum()
};
aipo.exttimecard.moveDataOutCome=function(A){var B=A;
for(B;
B<=4;
B++){var D=B+1;
var C=B;
dojo.byId("outgoing_time"+C+"_hour").selectedIndex=dojo.byId("outgoing_time"+D+"_hour").selectedIndex;
dojo.byId("outgoing_time"+C+"_minute").selectedIndex=dojo.byId("outgoing_time"+D+"_minute").selectedIndex;
dojo.byId("comeback_time"+C+"_hour").selectedIndex=dojo.byId("comeback_time"+D+"_hour").selectedIndex;
dojo.byId("comeback_time"+C+"_minute").selectedIndex=dojo.byId("comeback_time"+D+"_minute").selectedIndex
}dojo.byId("outgoing_time"+5+"_hour").selectedIndex=0;
dojo.byId("outgoing_time"+5+"_minute").selectedIndex=0;
dojo.byId("comeback_time"+5+"_hour").selectedIndex=0;
dojo.byId("comeback_time"+5+"_minute").selectedIndex=0
};
aipo.exttimecard.hideOutComeBox=function(){var C="";
var B=null;
var A=5;
for(A;
A>=1;
A--){C="rest_num"+A;
B=dojo.byId(C);
if(B!=null&&B.style.display!="none"){B.style.display="none";
break
}}};
aipo.exttimecard.setRestNum=function(){var B=0;
for(var A=1;
A<=5;
A++){var D="rest_num"+A;
var C=dojo.byId(D);
if(C!=null&&C.style.display!="none"){B++
}}dojo.byId("rest_num").value=B
};
aipo.exttimecard.hideBox=function(A){obj=dojo.byId(A);
if(obj!=null){obj.style.display="none"
}};
aipo.exttimecard.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("exttimecard")
};
aipo.exttimecard.hideTimeBox=function(){aipo.exttimecard.hideBox("clock_time_box");
aipo.exttimecard.hideBox("outgoing_comeback_box")
};
aipo.exttimecard.displayTimeBox=function(){aipo.exttimecard.displayBox("clock_time_box");
aipo.exttimecard.displayBox("outgoing_comeback_box")
};