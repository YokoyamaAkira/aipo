dojo.provide("aipo.schedule");
dojo.require("aipo.widget.ToolTip");
dojo.require("aipo.widget.DropdownDatepicker");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.schedule.setupTooltip=function(D,A,G){ptConfig[G].isTooltipEnable=true;
obj_content=dojo.byId("content-"+G);
dojo.style(obj_content,"visibility","visible");
obj_indicator=dojo.byId("indicator-"+G);
dojo.style(obj_indicator,"display","none");
if(A.length<=0){return 
}if(scheduleTooltipEnable!=true){return 
}var H=A.split(",");
var F=new Array();
H.pop();
for(var E in H){H[E]=dojo.trim(H[E]);
if(F[H[E]]){continue
}F[H[E]]=true;
var C=new Array();
dojo.query(".schedule-"+G+"-"+H[E]).forEach(function(K,J,I){C.push(K)
});
var B=new aipo.widget.ToolTip({label:"<div class='indicator'>"+aimluck.io.escapeText("schedule_val_tooltip1")+"</div>",connectId:C},G,function(I,M){var K=new RegExp("schedule-"+G+"-([0-9]+)");
var L=M.className.match(K);
if(L){var J=D+"&scheduleid="+L[1];
aipo.schedule.showTooltip(M,J,L[1],G,I)
}});
dojo.query(".schedule-"+G+"-"+H[E]).forEach(function(K,J,I){K.setAttribute("widget_id",B.id)
})
}};
aipo.schedule.showTooltip=function(E,A,B,F,C){var I;
var K="";
var D="";
var J="";
var H="";
var G=dijit.byId(E.getAttribute("widget_id"));
if(G.processed){return 
}dojo.xhrGet({portletId:F,url:A,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(Q,O){if(!Q.id){G._onHover=function(){};
G.close();
G.processed=true;
return 
}if(!Q.isSpan){K='<span style="font-size: 0.90em;">'+Q.date+"</span><br/>"
}if(Q.memberList){var N=Q.memberList.length;
for(var L=0;
L<N;
L++){D+="<li>"+Q.memberList[L].aliasName.value+"</li>"
}}if(Q.facilityList){var M=Q.facilityList.length;
for(var L=0;
L<M;
L++){J+="<li>"+Q.facilityList[L].facilityName.value+"</li>"
}}if(Q.place!=""){H='<span style="font-size: 0.90em;">'+aimluck.io.escapeText("schedule_val_tooltip2")+"</span><br/><ul><li>"+Q.place+"</li></ul>"
}if(D!=""){D='<span style="font-size: 0.90em;">'+aimluck.io.escapeText("schedule_val_tooltip3")+"</span><br/><ul>"+D+"</ul>"
}if(J!=""){J='<span style="font-size: 0.90em;">'+aimluck.io.escapeText("schedule_val_tooltip4")+"</span><br/><ul>"+J+"</ul>"
}var P="<h4>"+Q.name+"</h4>"+K+D+J+H;
G.label=P;
G.processed=true;
C.innerHTML=P
}})
};
aipo.schedule.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("schedule")
};
aipo.schedule.onLoadScheduleDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.schedule.onLoadScheduleDialog=function(N){var O=dojo.byId("commonUrl"+N);
if(O){var G=dojo.byId("commonCategoryid"+N);
var T=aimluck.io.escapeText("schedule_val_category1");
params={url:O.value,key:"categoryId",value:"categoryName",selectedId:G.value,preOptions:{key:"1",value:T}};
aimluck.io.createOptions("common_category_id",params);
var S=dijit.byId("membernormalselect");
if(S){var M=dojo.byId("init_memberlist");
var Q;
var L=M.options;
if(L.length==1&&L[0].value==""){return 
}for(Q=0;
Q<L.length;
Q++){S.addOptionSync(L[Q].value,L[Q].text,true)
}}var R=dijit.byId("facilityselect");
if(R){var M=dojo.byId("init_facilitylist");
var Q;
var L=M.options;
if(L.length==1&&L[0].value==""){return 
}for(Q=0;
Q<L.length;
Q++){R.addOptionSync(L[Q].value,L[Q].text,true)
}}var K=dojo.byId("name");
if(K){K.focus()
}var J=dojo.byId("button_member_add");
if(J){dojo.connect(J,"onclick",function(){aipo.schedule.expandMember()
})
}var E=dojo.byId("button_member_remove");
if(E){dojo.connect(E,"onclick",function(){var U=dojo.byId("member_to");
if(U.options.length==0){if((S)&&(aipo.schedule.login_aliasname!="undefined")){var V=aipo.schedule.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
S.addOptionSync(aipo.schedule.login_name,V,true)
}}aipo.schedule.expandMember()
})
}var D=dojo.byId("button_facility_add");
if(D){dojo.connect(D,"onclick",function(){aipo.schedule.expandFacility()
})
}var P=dojo.byId("button_facility_remove");
if(P){dojo.connect(P,"onclick",function(){aipo.schedule.expandFacility()
})
}var C=dojo.byId("_scheduleForm");
if(C){C.ignore_duplicate_facility.value="false"
}aipo.schedule.shrinkMember();
aipo.schedule.shrinkFacility();
var I=dijit.byId("startDateSpan");
var A=dijit.byId("endDateSpan");
if(I!=null&&A!=null){var B=I.dropDown.value;
var H=A.dropDown.value;
aipo.schedule.spanLength=(H-B)/86400000
}else{aipo.schedule.spanLength=0
}}var F=function(U,V){if(dojo.byId(U+"_title_"+N)!=null){dojo.connect(dojo.byId(U+"_title_"+N),"onclick",function(){var W=V;
var X=function(){var Y=dojo.byId(U+"_context_"+N);
Y.style.display=(Y.style.display!="none")?"none":W
};
X()
})
}};
F("edit_control","block");
F("change_tmpreserve","block");
F("mail","block")
};
aipo.schedule.formPreSubmit=function(D){var C=dojo.byId("member_to");
var B=dojo.byId("facility_to");
if(C){var E=C.options;
for(i=0;
i<E.length;
i++){E[i].selected=true
}}if(B){var A=B.options;
for(i=0;
i<A.length;
i++){A[i].selected=D.public_flag[0].checked
}}if(D.is_span.value=="TRUE"||D.is_span.value=="true"){D.start_date_hour.value=0;
D.start_date_minute.value=0;
D.end_date_hour.value=0;
D.end_date_minute.value=0
}else{D.end_date_year.value=D.start_date_year.value;
D.end_date_month.value=D.start_date_month.value;
D.end_date_day.value=D.start_date_day.value
}};
aipo.schedule.formSwitchRepeat=function(A){if(A.form.is_repeat.value=="TRUE"||A.form.is_repeat.value=="true"){var B=aimluck.io.escapeText("schedule_val_repeat1");
A.value=B;
aipo.schedule.formRepeatOff(A.form)
}else{var B=aimluck.io.escapeText("schedule_val_repeat2");
A.value=B;
aipo.schedule.formRepeatOn(A.form)
}};
aipo.schedule.isShowFacility=function(A){var C=A.public_flag;
for(var B=0;
B<C.length;
B++){if(C[B].checked&&(C[B].value=="O"||C[B].value=="C")){return true
}}return false
};
aipo.schedule.formSwitchAllDay=function(A){if(A.checked){aipo.schedule.formAllDayOn(A)
}else{aipo.schedule.formAllDayOff(A)
}};
aipo.schedule.formSwitchSpan=function(A){if(A.form.is_span.value=="TRUE"||A.form.is_span.value=="true"){A.value=aimluck.io.escapeText("schedule_val_span1");
if(A.form.is_repeat.value!="TRUE"&&A.form.is_repeat.value!="true"){A.form.repeat_button.value=aimluck.io.escapeText("schedule_val_repeat1");
aipo.schedule.formRepeatOff(A.form)
}else{A.form.repeat_button.value=aimluck.io.escapeText("schedule_val_repeat2");
aipo.schedule.formRepeatOn(A.form)
}aipo.schedule.formSpanOff(A.form)
}else{A.value=aimluck.io.escapeText("schedule_val_span2");
aipo.schedule.formSpanOn(A.form)
}};
aipo.schedule.formSpanOn=function(A){dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("timeField").style.display="none";
dojo.byId("repeatButtonField").style.display="none";
dojo.byId("normalField").style.display="";
dojo.byId("spanField").style.display="";
dojo.byId("allDayField").style.display="none";
dojo.byId("facilityField").style.display="none";
dojo.byId("facilityFieldButton").style.display="none";
A.is_span.value="TRUE"
};
aipo.schedule.formSpanOff=function(A){dojo.byId("spanField").style.display="none";
dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
dojo.byId("allDayField").style.display="";
if(aipo.schedule.isShowFacility(A)){dojo.byId("facilityFieldButton").style.display="block";
aipo.schedule.shrinkFacility()
}A.is_repeat.value="FALSE";
A.is_span.value="FALSE"
};
aipo.schedule.formRepeatOff=function(A){dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
dojo.byId("spanButtonField").style.display="";
A.is_repeat.value="FALSE";
A.is_span.value="FALSE"
};
aipo.schedule.formEditRepeatOne=function(A){dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("repeatButtonField").style.display="none";
dojo.byId("allDayField").style.display="none";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
A.is_repeat.value="FALSE";
A.is_span.value="FALSE"
};
aipo.schedule.formEditRepeatAll=function(A){dojo.byId("normalField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("repeatField").style.display="";
dojo.byId("repeatField").text=dojo.byId("schedule_val_repeat2").innerText;
dojo.byId("repeatButtonField").style.display="";
dojo.byId("allDayField").style.display="none";
dojo.byId("timeLabelField").style.display="";
dojo.byId("timeField").style.display="";
A.is_repeat.value="TRUE";
A.is_span.value="FALSE"
};
aipo.schedule.formRepeatOn=function(A){dojo.byId("normalField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("repeatField").style.display="";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("timeLabelField").style.display="";
dojo.byId("timeField").style.display="";
A.is_repeat.value="TRUE";
A.is_span.value="FALSE"
};
aipo.schedule.formAllDayOn=function(A){dojo.byId("spanField").style.display="none";
dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("repeatButtonField").style.display="none";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("facilityFieldButton").style.display="none";
aipo.schedule.shrinkFacility();
A.form.is_repeat.value="FALSE";
A.form.is_span.value="TRUE";
A.form.all_day_flag.value="ON"
};
aipo.schedule.formAllDayOff=function(A){dojo.byId("spanField").style.display="none";
dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
dojo.byId("spanButtonField").style.display="";
if(aipo.schedule.isShowFacility(A.form)){dojo.byId("facilityFieldButton").style.display="block"
}A.form.is_repeat.value="FALSE";
A.form.is_span.value="FALSE";
A.form.all_day_flag.value="OFF"
};
aipo.schedule.formPublicOn=function(A){if(A.is_span.value!="TRUE"&&A.is_span.value!="true"){A.is_facility.value="TRUE"
}dojo.byId("facilityFieldButton").style.display="block";
aipo.schedule.shrinkFacility()
};
aipo.schedule.formPublicOff=function(A){if(A.is_span.value!="TRUE"&&A.is_span.value!="true"){A.is_facility.value="FALSE"
}dojo.byId("facilityField").style.display="none";
dojo.byId("facilityFieldButton").style.display="none"
};
aipo.schedule.enablePerWeek=function(A){A.repeat_type[1].checked=true
};
aipo.schedule.enableMonth=function(A){if(!A.repeat_type[2].checked){A.repeat_type[2].checked=true
}};
aipo.schedule.buttonEdit=function(B,A){aimluck.io.disableForm(B,true);
aipo.common.showDialog(A)
};
aipo.schedule.buttonChangeStatus=function(E,B,A,C,D){E.action=B+"&status="+A;
aimluck.io.submit(E,C,D,aipo.schedule.onReceiveMessage)
};
aipo.schedule.delFlag0=function(A){A.del_member_flag.value="0";
A.del_range_flag.value="0"
};
aipo.schedule.delFlag1=function(A){A.del_member_flag.value="0";
A.del_range_flag.value="1"
};
aipo.schedule.delFlag2=function(A){A.del_member_flag.value="1";
A.del_range_flag.value="0"
};
aipo.schedule.delFlag3=function(A){A.del_member_flag.value="1";
A.del_range_flag.value="1"
};
aipo.schedule.changeEnd=function(A){if(A.end_date_hour.value==24){A.end_date_minute.value=0
}};
aipo.schedule.onSubmit=function(A){if((A.is_span.value!="TRUE")&&(A.is_span.value!="true")&&(A.is_repeat.value!="TRUE")&&(A.is_repeat.value!="true")){A.end_date.value=A.start_date.value;
A.end_date_day.value=A.start_date_day.value;
A.end_date_month.value=A.start_date_month.value;
A.end_date_year.value=A.start_date_year.value;
A.limit_end_date.value=A.limit_start_date.value;
A.limit_end_date_day.value=A.limit_start_date_day.value;
A.limit_end_date_month.value=A.limit_start_date_month.value;
A.limit_end_date_year.value=A.limit_start_date_year.value
}};
aipo.schedule.onReceiveMessage=function(C){if(!C){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(C!=null&&C.match(/duplicate_facility/)){if(confirm(aimluck.io.escapeText("schedule_val_confirm1"))){var B=dojo.byId("_scheduleForm");
if(B){B.ignore_duplicate_facility.value="true";
dojo.xhrPost({url:B.action,timeout:30000,form:B,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(E,D){aipo.schedule.onReceiveMessage("")
},error:function(D){}})
}}}else{if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}}};
aipo.schedule.shrinkMember=function(){var C=dojo.byId("memberFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var A=dojo.byId("member_to");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_member1")+'" onclick="aipo.schedule.expandMember();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("memberField");
if(B){dojo.style(B,"display","none")
}};
aipo.schedule.expandMember=function(){var C=dojo.byId("memberFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var A=dojo.byId("member_to");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_member2")+'" onclick="aipo.schedule.shrinkMember();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("memberField");
if(B){dojo.style(B,"display","block")
}};
aipo.schedule.shrinkFacility=function(){var C=dojo.byId("facilityFieldButton");
if(C){var D="";
D+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var B=dojo.byId("facility_to");
if(B){var E=B.options;
to_size=E.length;
for(i=0;
i<to_size;
i++){D+="<span>"+aipo.escapeHTML(E[i].text)+"</span>";
if(i<to_size-1){D+=",<wbr/>"
}}}D+='</td><td style="border:none;">';
D+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_facility1")+'" onclick="aipo.schedule.expandFacility();" />';
D+="</td></tr></tbody></table>";
C.innerHTML=D
}var A=dojo.byId("facilityField");
if(A){dojo.style(A,"display","none")
}};
aipo.schedule.expandFacility=function(){var C=dojo.byId("facilityFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var B=dojo.byId("facility_to");
if(B){var F=B.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_member2")+'" onclick="aipo.schedule.shrinkFacility();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var A=dojo.byId("facilityField");
if(A){dojo.style(A,"display","block")
}};
aipo.schedule.onSpanStartChange=function(){var D=dijit.byId("startDateSpan");
var C=dijit.byId("endDateSpan");
if(D!=null&&C!=null){var B=D.dropDown.value.getTime()+86400000*aipo.schedule.spanLength;
var A=new Date();
A.setTime(B);
C.dropDown.onChangeNoCallback(A);
C.dropDown.setValue(A)
}};
aipo.schedule.onSpanEndChange=function(){var B=dijit.byId("startDateSpan");
var A=dijit.byId("endDateSpan");
if(B!=null&&A!=null&&B.dropDown!=null&&A.dropDown!=null){var C=B.dropDown.value;
var D=A.dropDown.value;
if(C>=D){aipo.schedule.spanLength=0;
B.dropDown.onChangeNoCallback(D);
B.dropDown.setValue(D)
}else{aipo.schedule.spanLength=(D-C)/86400000
}}};
aipo.schedule.setIndicator=function(D){obj_content=dojo.byId("content-"+D);
dojo.style(obj_content,"visibility","hidden");
var E=dojo.byId("scheduleGarage-"+D);
if(E){var C=E.childNodes.length;
for(var B=0;
B<C;
B++){var A=dojo.byId("schedule-"+B+"-"+D);
if(A){dojo.style(A,"visibility","hidden")
}}}obj_indicator=dojo.byId("indicator-"+D);
dojo.style(obj_indicator,"display","")
};
aipo.schedule.showScheduleAddDialog=function(G,D,B,C,F){if(!D){D=window.event
}var E={x:D.clientX,y:D.clientY};
var A=false;
dojo.query("a",G).forEach(function(I){if(!A){var H=I.getBoundingClientRect();
A=(H.left<=E.x&&E.x<=H.right&&H.top<=E.y&&E.y<=H.bottom)
}});
if(A){return true
}else{aipo.common.showDialog(B,C,F);
return false
}};