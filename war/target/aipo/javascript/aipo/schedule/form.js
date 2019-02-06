dojo.provide("aipo.schedule");
dojo.require("aipo.widget.ToolTip");
dojo.require("aipo.widget.DropdownDatepicker");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.schedule.setupTooltip=function(N,I,K){ptConfig[K].isTooltipEnable=true;
obj_content=dojo.byId("content-"+K);
dojo.style(obj_content,"visibility","visible");
obj_indicator=dojo.byId("indicator-"+K);
dojo.style(obj_indicator,"display","none");
if(I.length<=0){return 
}if(scheduleTooltipEnable!=true){return 
}var J=I.split(",");
var L=new Array();
J.pop();
for(var M in J){J[M]=dojo.trim(J[M]);
if(L[J[M]]){continue
}L[J[M]]=true;
var O=new Array();
dojo.query(".schedule-"+K+"-"+J[M]).forEach(function(A,B,C){O.push(A)
});
var P=new aipo.widget.ToolTip({label:"<div class='indicator'>"+aimluck.io.escapeText("schedule_val_tooltip1")+"</div>",connectId:O},K,function(D,E){var B=new RegExp("schedule-"+K+"-([0-9]+)");
var A=E.className.match(B);
if(A){var C=N+"&scheduleid="+A[1];
aipo.schedule.showTooltip(E,C,A[1],K,D)
}});
dojo.query(".schedule-"+K+"-"+J[M]).forEach(function(A,B,C){A.setAttribute("widget_id",P.id)
})
}};
aipo.schedule.showTooltip=function(V,O,N,U,M){var R;
var P="";
var L="";
var Q="";
var S="";
var T=dijit.byId(V.getAttribute("widget_id"));
if(T.processed){return 
}dojo.xhrGet({portletId:U,url:O,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(B,D){if(!B.id){T._onHover=function(){};
T.close();
T.processed=true;
return 
}if(!B.isSpan){P='<span style="font-size: 0.90em;">'+B.date+"</span><br/>"
}if(B.memberList){var E=B.memberList.length;
for(var A=0;
A<E;
A++){L+="<li>"+B.memberList[A].aliasName.value+"</li>"
}}if(B.facilityList){var F=B.facilityList.length;
for(var A=0;
A<F;
A++){Q+="<li>"+B.facilityList[A].facilityName.value+"</li>"
}}if(B.place!=""){S='<span style="font-size: 0.90em;">'+aimluck.io.escapeText("schedule_val_tooltip2")+"</span><br/><ul><li>"+B.place+"</li></ul>"
}if(L!=""){L='<span style="font-size: 0.90em;">'+aimluck.io.escapeText("schedule_val_tooltip3")+"</span><br/><ul>"+L+"</ul>"
}if(Q!=""){Q='<span style="font-size: 0.90em;">'+aimluck.io.escapeText("schedule_val_tooltip4")+"</span><br/><ul>"+Q+"</ul>"
}var C="<h4>"+B.name+"</h4>"+P+L+Q+S;
T.label=C;
T.processed=true;
M.innerHTML=C
}})
};
aipo.schedule.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("schedule")
};
aipo.schedule.onLoadScheduleDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.schedule.onLoadScheduleDialog=function(a){var Z=dojo.byId("commonUrl"+a);
if(Z){var h=dojo.byId("commonCategoryid"+a);
var U=aimluck.io.escapeText("schedule_val_category1");
params={url:Z.value,key:"categoryId",value:"categoryName",selectedId:h.value,preOptions:{key:"1",value:U}};
aimluck.io.createOptions("common_category_id",params);
var V=dijit.byId("membernormalselect");
if(V){var b=dojo.byId("init_memberlist");
var X;
var c=b.options;
if(c.length==1&&c[0].value==""){return 
}for(X=0;
X<c.length;
X++){V.addOptionSync(c[X].value,c[X].text,true)
}}var W=dijit.byId("facilityselect");
if(W){var b=dojo.byId("init_facilitylist");
var X;
var c=b.options;
if(c.length==1&&c[0].value==""){return 
}for(X=0;
X<c.length;
X++){W.addOptionSync(c[X].value,c[X].text,true)
}}var d=dojo.byId("name");
if(d){d.focus()
}var e=dojo.byId("button_member_add");
if(e){dojo.connect(e,"onclick",function(){aipo.schedule.expandMember()
})
}var k=dojo.byId("button_member_remove");
if(k){dojo.connect(k,"onclick",function(){var B=dojo.byId("member_to");
if(B.options.length==0){if((V)&&(aipo.schedule.login_aliasname!="undefined")){var A=aipo.schedule.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
V.addOptionSync(aipo.schedule.login_name,A,true)
}}aipo.schedule.expandMember()
})
}var l=dojo.byId("button_facility_add");
if(l){dojo.connect(l,"onclick",function(){aipo.schedule.expandFacility()
})
}var Y=dojo.byId("button_facility_remove");
if(Y){dojo.connect(Y,"onclick",function(){aipo.schedule.expandFacility()
})
}var m=dojo.byId("_scheduleForm");
if(m){m.ignore_duplicate_facility.value="false"
}aipo.schedule.shrinkMember();
aipo.schedule.shrinkFacility();
var f=dijit.byId("startDateSpan");
var o=dijit.byId("endDateSpan");
if(f!=null&&o!=null){var n=f.dropDown.value;
var g=o.dropDown.value;
aipo.schedule.spanLength=(g-n)/86400000
}else{aipo.schedule.spanLength=0
}}var j=function(B,A){if(dojo.byId(B+"_title_"+a)!=null){dojo.connect(dojo.byId(B+"_title_"+a),"onclick",function(){var C=A;
var D=function(){var E=dojo.byId(B+"_context_"+a);
E.style.display=(E.style.display!="none")?"none":C
};
D()
})
}};
j("edit_control","block");
j("change_tmpreserve","block");
j("mail","block")
};
aipo.schedule.formPreSubmit=function(H){var I=dojo.byId("member_to");
var J=dojo.byId("facility_to");
if(I){var G=I.options;
for(i=0;
i<G.length;
i++){G[i].selected=true
}}if(J){var F=J.options;
for(i=0;
i<F.length;
i++){F[i].selected=H.public_flag[0].checked
}}if(H.is_span.value=="TRUE"||H.is_span.value=="true"){H.start_date_hour.value=0;
H.start_date_minute.value=0;
H.end_date_hour.value=0;
H.end_date_minute.value=0
}else{H.end_date_year.value=H.start_date_year.value;
H.end_date_month.value=H.start_date_month.value;
H.end_date_day.value=H.start_date_day.value
}};
aipo.schedule.formSwitchRepeat=function(C){if(C.form.is_repeat.value=="TRUE"||C.form.is_repeat.value=="true"){var D=aimluck.io.escapeText("schedule_val_repeat1");
C.value=D;
aipo.schedule.formRepeatOff(C.form)
}else{var D=aimluck.io.escapeText("schedule_val_repeat2");
C.value=D;
aipo.schedule.formRepeatOn(C.form)
}};
aipo.schedule.isShowFacility=function(D){var E=D.public_flag;
for(var F=0;
F<E.length;
F++){if(E[F].checked&&(E[F].value=="O"||E[F].value=="C")){return true
}}return false
};
aipo.schedule.formSwitchAllDay=function(B){if(B.checked){aipo.schedule.formAllDayOn(B)
}else{aipo.schedule.formAllDayOff(B)
}};
aipo.schedule.formSwitchSpan=function(B){if(B.form.is_span.value=="TRUE"||B.form.is_span.value=="true"){B.value=aimluck.io.escapeText("schedule_val_span1");
if(B.form.is_repeat.value!="TRUE"&&B.form.is_repeat.value!="true"){B.form.repeat_button.value=aimluck.io.escapeText("schedule_val_repeat1");
aipo.schedule.formRepeatOff(B.form)
}else{B.form.repeat_button.value=aimluck.io.escapeText("schedule_val_repeat2");
aipo.schedule.formRepeatOn(B.form)
}aipo.schedule.formSpanOff(B.form)
}else{B.value=aimluck.io.escapeText("schedule_val_span2");
aipo.schedule.formSpanOn(B.form)
}};
aipo.schedule.formSpanOn=function(B){dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("timeField").style.display="none";
dojo.byId("repeatButtonField").style.display="none";
dojo.byId("normalField").style.display="";
dojo.byId("spanField").style.display="";
dojo.byId("allDayField").style.display="none";
dojo.byId("facilityField").style.display="none";
dojo.byId("facilityFieldButton").style.display="none";
B.is_span.value="TRUE"
};
aipo.schedule.formSpanOff=function(B){dojo.byId("spanField").style.display="none";
dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
dojo.byId("allDayField").style.display="";
if(aipo.schedule.isShowFacility(B)){dojo.byId("facilityFieldButton").style.display="block";
aipo.schedule.shrinkFacility()
}B.is_repeat.value="FALSE";
B.is_span.value="FALSE"
};
aipo.schedule.formRepeatOff=function(B){dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
dojo.byId("spanButtonField").style.display="";
B.is_repeat.value="FALSE";
B.is_span.value="FALSE"
};
aipo.schedule.formEditRepeatOne=function(B){dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("repeatButtonField").style.display="none";
dojo.byId("allDayField").style.display="none";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
B.is_repeat.value="FALSE";
B.is_span.value="FALSE"
};
aipo.schedule.formEditRepeatAll=function(B){dojo.byId("normalField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("repeatField").style.display="";
dojo.byId("repeatField").text=dojo.byId("schedule_val_repeat2").innerText;
dojo.byId("repeatButtonField").style.display="";
dojo.byId("allDayField").style.display="none";
dojo.byId("timeLabelField").style.display="";
dojo.byId("timeField").style.display="";
B.is_repeat.value="TRUE";
B.is_span.value="FALSE"
};
aipo.schedule.formRepeatOn=function(B){dojo.byId("normalField").style.display="none";
dojo.byId("spanField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("repeatField").style.display="";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("timeLabelField").style.display="";
dojo.byId("timeField").style.display="";
B.is_repeat.value="TRUE";
B.is_span.value="FALSE"
};
aipo.schedule.formAllDayOn=function(B){dojo.byId("spanField").style.display="none";
dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("repeatButtonField").style.display="none";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="none";
dojo.byId("spanButtonField").style.display="none";
dojo.byId("facilityFieldButton").style.display="none";
aipo.schedule.shrinkFacility();
B.form.is_repeat.value="FALSE";
B.form.is_span.value="TRUE";
B.form.all_day_flag.value="ON"
};
aipo.schedule.formAllDayOff=function(B){dojo.byId("spanField").style.display="none";
dojo.byId("repeatField").style.display="none";
dojo.byId("timeLabelField").style.display="none";
dojo.byId("repeatButtonField").style.display="";
dojo.byId("normalField").style.display="";
dojo.byId("timeField").style.display="";
dojo.byId("spanButtonField").style.display="";
if(aipo.schedule.isShowFacility(B.form)){dojo.byId("facilityFieldButton").style.display="block"
}B.form.is_repeat.value="FALSE";
B.form.is_span.value="FALSE";
B.form.all_day_flag.value="OFF"
};
aipo.schedule.formPublicOn=function(B){if(B.is_span.value!="TRUE"&&B.is_span.value!="true"){B.is_facility.value="TRUE"
}dojo.byId("facilityFieldButton").style.display="block";
aipo.schedule.shrinkFacility()
};
aipo.schedule.formPublicOff=function(B){if(B.is_span.value!="TRUE"&&B.is_span.value!="true"){B.is_facility.value="FALSE"
}dojo.byId("facilityField").style.display="none";
dojo.byId("facilityFieldButton").style.display="none"
};
aipo.schedule.enablePerWeek=function(B){B.repeat_type[1].checked=true
};
aipo.schedule.enableMonth=function(B){if(!B.repeat_type[2].checked){B.repeat_type[2].checked=true
}};
aipo.schedule.buttonEdit=function(D,C){aimluck.io.disableForm(D,true);
aipo.common.showDialog(C)
};
aipo.schedule.buttonChangeStatus=function(G,J,F,I,H){G.action=J+"&status="+F;
aimluck.io.submit(G,I,H,aipo.schedule.onReceiveMessage)
};
aipo.schedule.delFlag0=function(B){B.del_member_flag.value="0";
B.del_range_flag.value="0"
};
aipo.schedule.delFlag1=function(B){B.del_member_flag.value="0";
B.del_range_flag.value="1"
};
aipo.schedule.delFlag2=function(B){B.del_member_flag.value="1";
B.del_range_flag.value="0"
};
aipo.schedule.delFlag3=function(B){B.del_member_flag.value="1";
B.del_range_flag.value="1"
};
aipo.schedule.changeEnd=function(B){if(B.end_date_hour.value==24){B.end_date_minute.value=0
}};
aipo.schedule.onSubmit=function(B){if((B.is_span.value!="TRUE")&&(B.is_span.value!="true")&&(B.is_repeat.value!="TRUE")&&(B.is_repeat.value!="true")){B.end_date.value=B.start_date.value;
B.end_date_day.value=B.start_date_day.value;
B.end_date_month.value=B.start_date_month.value;
B.end_date_year.value=B.start_date_year.value;
B.limit_end_date.value=B.limit_start_date.value;
B.limit_end_date_day.value=B.limit_start_date_day.value;
B.limit_end_date_month.value=B.limit_start_date_month.value;
B.limit_end_date_year.value=B.limit_start_date_year.value
}};
aipo.schedule.onReceiveMessage=function(E){if(!E){var D=dijit.byId("modalDialog");
if(D){D.hide()
}aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(E!=null&&E.match(/duplicate_facility/)){if(confirm(aimluck.io.escapeText("schedule_val_confirm1"))){var F=dojo.byId("_scheduleForm");
if(F){F.ignore_duplicate_facility.value="true";
dojo.xhrPost({url:F.action,timeout:30000,form:F,encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,B){aipo.schedule.onReceiveMessage("")
},error:function(A){}})
}}}else{if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}}};
aipo.schedule.shrinkMember=function(){var K=dojo.byId("memberFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var G=dojo.byId("member_to");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_member1")+'" onclick="aipo.schedule.expandMember();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("memberField");
if(L){dojo.style(L,"display","none")
}};
aipo.schedule.expandMember=function(){var K=dojo.byId("memberFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var G=dojo.byId("member_to");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_member2")+'" onclick="aipo.schedule.shrinkMember();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("memberField");
if(L){dojo.style(L,"display","block")
}};
aipo.schedule.shrinkFacility=function(){var I=dojo.byId("facilityFieldButton");
if(I){var H="";
H+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var J=dojo.byId("facility_to");
if(J){var G=J.options;
to_size=G.length;
for(i=0;
i<to_size;
i++){H+="<span>"+aipo.escapeHTML(G[i].text)+"</span>";
if(i<to_size-1){H+=",<wbr/>"
}}}H+='</td><td style="border:none;">';
H+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_facility1")+'" onclick="aipo.schedule.expandFacility();" />';
H+="</td></tr></tbody></table>";
I.innerHTML=H
}var F=dojo.byId("facilityField");
if(F){dojo.style(F,"display","none")
}};
aipo.schedule.expandFacility=function(){var K=dojo.byId("facilityFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var L=dojo.byId("facility_to");
if(L){var H=L.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("schedule_val_member2")+'" onclick="aipo.schedule.shrinkFacility();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var G=dojo.byId("facilityField");
if(G){dojo.style(G,"display","block")
}};
aipo.schedule.onSpanStartChange=function(){var F=dijit.byId("startDateSpan");
var G=dijit.byId("endDateSpan");
if(F!=null&&G!=null){var H=F.dropDown.value.getTime()+86400000*aipo.schedule.spanLength;
var E=new Date();
E.setTime(H);
G.dropDown.onChangeNoCallback(E);
G.dropDown.setValue(E)
}};
aipo.schedule.onSpanEndChange=function(){var H=dijit.byId("startDateSpan");
var E=dijit.byId("endDateSpan");
if(H!=null&&E!=null&&H.dropDown!=null&&E.dropDown!=null){var G=H.dropDown.value;
var F=E.dropDown.value;
if(G>=F){aipo.schedule.spanLength=0;
H.dropDown.onChangeNoCallback(F);
H.dropDown.setValue(F)
}else{aipo.schedule.spanLength=(F-G)/86400000
}}};
aipo.schedule.setIndicator=function(H){obj_content=dojo.byId("content-"+H);
dojo.style(obj_content,"visibility","hidden");
var G=dojo.byId("scheduleGarage-"+H);
if(G){var I=G.childNodes.length;
for(var J=0;
J<I;
J++){var F=dojo.byId("schedule-"+J+"-"+H);
if(F){dojo.style(F,"visibility","hidden")
}}}obj_indicator=dojo.byId("indicator-"+H);
dojo.style(obj_indicator,"display","")
};
aipo.schedule.showScheduleAddDialog=function(I,L,N,M,J){if(!L){L=window.event
}var K={x:L.clientX,y:L.clientY};
var H=false;
dojo.query("a",I).forEach(function(A){if(!H){var B=A.getBoundingClientRect();
H=(B.left<=K.x&&K.x<=B.right&&B.top<=K.y&&K.y<=B.bottom)
}});
if(H){return true
}else{aipo.common.showDialog(N,M,J);
return false
}};