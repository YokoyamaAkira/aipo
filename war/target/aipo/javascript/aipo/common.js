dojo.provide("aipo.customize");
aipo.customize.positionInitialize=function(){dojo.query(".body-child").forEach(function(A){dojo.place(A,dojo.query("body")[0],"last")
})
};
aipo.customize.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(!!A){A.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.customize.showMenu=function(F){var D=dojo.query("#menubar_"+F);
var B=dojo.query("#menubar_button_"+F);
if(D.length==0||B.length==0){return 
}var E=B[0].getBoundingClientRect();
var C=document.documentElement.getBoundingClientRect();
if(D.style("display")=="none"){dojo.query("div.menubar").style("display","none");
var A={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
D.style("opacity","0");
D.style("display","block");
if(C.right-D[0].clientWidth>E.left){D.style("left",E.left+A.left+"px")
}else{D.style("left",E.right-D[0].clientWidth+A.left+"px")
}if(C.bottom-D[0].clientHeight>E.bottom){D.style("top",E.bottom+A.top+"px")
}else{D.style("top",E.top-D[0].clientHeight+A.top+"px")
}D.style("opacity","1");
if(dojo.byId("timeline_"+F)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+F).style("display","none")
}}else{aipo.customize.hideMenu(F)
}};
aipo.customize.showMenuSchedule=function(D){var C=dojo.query("#menubar_"+D+"_date");
if(C.style("display")=="none"){dojo.query("div.menubar").style("display","none");
C.style("display","block");
if(dojo.byId("timeline_"+D)&&(dojo.query("div.timeline").length==1)){dojo.query("#accessControlDelete_"+D).style("display","none")
}var B=dojo.byId("indicateDate_"+D);
if(dojo.isIE){var A=function(I){var H=0;
while(I){H+=I.offsetLeft;
I=I.offsetParent
}return H
};
var E=function(I){var H=0;
while(I){H+=I.offsetTop;
I=I.offsetParent
}return H
};
var G=A(B)-A(B.offsetParent.offsetParent);
var F=E(B)-E(B.offsetParent.offsetParent)
}else{var G=B.offsetLeft-B.clientLeft;
var F=B.offsetTop-B.clientTop
}C.style("left",G+"px");
C.style("top",F+24+"px")
}else{aipo.customize.hideMenu(D)
}};
aipo.customize.hideMenu=function(B){var A=dojo.query("div.menubar").style("display","none")
};
aipo.customize.setController=function(F,C){var A=C.parentNode.id;
dojo.query("form#form"+F+' input[name="controller"]')[0].value=A;
var D=dojo.query("form#form"+F+" table.controllerTable td");
var E=D.length;
for(var B=0;
B<E;
B++){dojo.removeClass(D[B],"selected")
}var G=dojo.query("form#form"+F+" td#"+A)[0];
dojo.addClass(G,"selected")
};
aipo.customize.deletesubmit=function(A,B,C){if(confirm("このアプリを削除してもよろしいですか？")){aipo.customize.submit(A,B,C)
}};
aipo.customize.submit=function(A,B,D){try{dojo.xhrPost({url:A,timeout:30000,content:{portlet_id:B},encoding:"utf-8",handleAs:"json-comment-filtered",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(F,E){var G="";
if(dojo.isArray(F)&&F.length>0){if(F[0]=="PermissionError"){G+="<ul>";
G+="<li><span class='caution'>"+F[1]+"</span></li>";
G+="</ul>"
}else{G+="<ul>";
dojo.forEach(F,function(H){G+="<li><span class='caution'>"+H+"</span></li>"
});
G+="</ul>"
}}D.call(D,G);
if(G!=""){aimluck.io.disableForm(form,false)
}},error:function(E){}})
}catch(C){}};
dojo.provide("aipo.fileupload");
aipo.fileupload.getFolderName=function(){var A=dojo.byId("folderName")
};
aipo.fileupload.onAddFileInfo=function(A,E,C,B){var D=dojo.byId("attachments_"+B);
if(D.nodeName.toLowerCase()=="ul"){aimluck.io.addFileToList(D,E,C)
}else{aimluck.io.addOption(D,E,C,false)
}dojo.byId("folderName_"+B).value=A
};
aipo.fileupload.replaceFileInfo=function(A,E,C,B){var D=dojo.byId("attachments_"+B);
if(D.nodeName.toLowerCase()=="ul"){aimluck.io.replaceFileToList(D,E,C)
}else{aimluck.io.addOption(D,E,C,false)
}dojo.byId("folderName_"+B).value=A
};
aipo.fileupload.openAttachment=function(A,F){var E=430;
var D=130;
var I=(screen.width-E)/2;
var H=(screen.height-D)/2;
var G=dojo.byId("attachments_"+F);
if(G.nodeName.toLowerCase()=="ul"){var J=G.children.length
}else{var J=G.options.length;
if(J==1&&G.options[0].value==""){J=0
}}var C=dojo.byId("folderName_"+F).value;
var B=window.open(A+"&nsize="+J+"&folderName="+C,"attachment_window","left="+I+",top="+H+",width="+E+",height="+D+",resizable=yes,status=yes");
B.focus()
};
aipo.fileupload.ImageDialog;
aipo.fileupload.showImageDialog=function(A,C,D){var B=dojo.byId("imageDialog");
dojo.query("#imageDialog").addClass("preLoadImage");
aipo.fileupload.ImageDialog=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog=new aipo.fileupload.widget.FileuploadViewDialog({widgetId:"imageDialog",_portlet_id:C,_callback:D},"imageDialog")
}else{aipo.fileupload.ImageDialog.setCallback(C,D)
}if(aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog.setHref(A);
aipo.fileupload.ImageDialog.show()
}};
aipo.fileupload.hideImageDialog=function(){var A=dijit.byId("imageDialog");
if(A){A.hide()
}};
aipo.fileupload.onLoadImage=function(B){var A=dojo.byId("imageDialog");
A.style.width=B.width+"px";
A.style.height=B.height+"px";
aipo.fileupload.ImageDialog._position();
dojo.query("#imageDialog").removeClass("preLoadImage")
};
aipo.fileupload.removeFileFromList=function(C,A,B){dojo.style("facephoto_"+B,"display","none");
return C.removeChild(A)
};
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
dojo.provide("aipo.todo");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.todo.onLoadTodoDialog=function(B){var E=dojo.byId("urlUserlist"+B).value;
var C=dojo.byId("loginUser"+B).value;
var A=dojo.byId("todoUser"+B).value;
if(A==0){A=C
}if(E){aipo.todo.changeGroup(E,"LoginUser",A)
}var D=dojo.byId("todo_name");
if(D){D.focus()
}};
aipo.todo.onLoadCategoryDialog=function(A){var B=dojo.byId("category_name");
if(B){B.focus()
}};
aipo.todo.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value=aimluck.io.escapeText("todo_val_switch1");
aipo.todo.formCategoryInputOff(A.form)
}else{A.value=aimluck.io.escapeText("todo_val_switch2");
aipo.todo.formCategoryInputOn(A.form)
}};
aipo.todo.formCategoryInputOn=function(A){dojo.byId("todoCategorySelectField").style.display="none";
dojo.byId("todoCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.todo.formCategoryInputOff=function(A){dojo.byId("todoCategoryInputField").style.display="none";
dojo.byId("todoCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.todo.changeGroup=function(A,C,B){aimluck.utils.form.createSelect("user_id","destuserDiv",A+"?mode=group&groupname="+C+"&inc_luser=true","userId","aliasName",B,"",'class="w49"')
};
aipo.todo.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.todo.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.todo.doKeywordSearch=function(A,B){var C=new Array(2);
C[0]=["template","ToDoListScreen"];
C[1]=["keyword",dojo.byId("q"+B).value];
aipo.viewPage(A,B,C)
};
dojo.provide("aipo.workflow");
var before=0;
aipo.workflow.onLoadWorkflowDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.workflow.onLoadWorkflowDialog=function(F){var D=dijit.byId("membernormalselect");
if(D){var B=D;
var A=dojo.byId("init_memberlist");
var E;
var C=A.options;
if(C.length==1&&C[0].value==""){return 
}for(E=0;
E<C.length;
E++){B.addOptionSync(C[E].value,C[E].text,true)
}}var G=dojo.byId("route_name");
if(G){G.focus()
}if(dojo.byId("mode_"+F).value=="insert"){dojo.byId("category_id").onchange()
}};
aipo.workflow.onChangeSelecter=function(D,C,B,A,F){dojo.byId(F).checked=false;
var E=new Array();
E.named="workflow_"+A;
aimluck.io.sendRawData(C+"&value="+B,B,aipo.workflow.setTemplate,E);
return false
};
aipo.workflow.setTemplate=function(H,C){var E=aipo.workflow.getJsonDataOne(C);
var A=E.route_h;
var B=E.route;
var G=B.split(",");
var F=(G.length-1)/2;
if(B==null||B==""){dojo.byId(H.named).style.display="none"
}else{dojo.byId(H.named).style.display=""
}if(B==null||B==""){dojo.byId(H.named).innerHTML=""
}else{dojo.byId(H.named).innerHTML=A
}memberFrom=dojo.byId("tmp_member_from");
memberFromOpts=memberFrom.options;
for(i=0;
i<memberFromOpts.length;
i++){memberFromOpts[i].selected=false
}memberTo=dojo.byId("positions");
while(memberTo.lastChild){memberTo.removeChild(memberTo.lastChild)
}var D;
for(i=0;
i<F;
i++){memberTo.options[i]=new Option(G[2*i+1],G[2*i])
}};
aipo.workflow.categoryOnChangeSelecter=function(F,E,D,C,H,B,A){if(aipo.workflow.NoteChangeConfirm(H)){before=dojo.byId("category_id").selectedIndex;
dojo.byId(H).checked=false;
var G=new Array();
G.named="workflow_"+C;
G.namedRoute="workflow_"+B;
G.selectRoute=A;
aimluck.io.sendRawData(E+"&value="+D,D,aipo.workflow.categorySetTemplate,G)
}else{dojo.byId("category_id").selectedIndex=before
}return false
};
aipo.workflow.categorySetTemplate=function(D,E){var G=aipo.workflow.getJsonDataOne(E);
var J=G.template;
var F=G.route_id.toString();
var H=G.route_h;
var I=G.route;
var B=I.split(",");
var C=(B.length-1)/2;
if(H==null||H==""){dojo.byId(D.namedRoute).style.display="none"
}else{dojo.byId(D.namedRoute).style.display=""
}if(null!=J){dojo.byId(D.named).value=J
}else{dojo.byId(D.named).value=""
}dojo.byId(D.namedRoute).value="";
var L=dojo.byId(D.selectRoute);
var K=L.options;
K[0].selected=true;
if(!(F.match(/[^0-9]/g)||parseInt(F,10)+""!=F)){for(i=0;
i<L.length;
i++){if(K[i].value==F){K[i].selected=true
}}dojo.byId(D.namedRoute).value=H;
dojo.byId("is_saved_route_button").value=aimluck.io.escapeText("workflow_val_route1");
dojo.byId("workflowRouteSelectField").style.display="";
dojo.byId("workflowRouteInputField").style.display="none";
dojo.byId("is_saved_route").value="TRUE";
memberTo=dojo.byId("positions");
while(memberTo.lastChild){memberTo.removeChild(memberTo.lastChild)
}memberFrom=dojo.byId("tmp_member_from");
memberFromOpts=memberFrom.options;
for(i=0;
i<memberFromOpts.length;
i++){memberFromOpts[i].selected=false
}memberTo=dojo.byId("positions");
var A;
for(i=0;
i<C;
i++){memberTo.options[i]=new Option(B[2*i+1],B[2*i])
}}};
aipo.workflow.onFocusComment=function(A){};
aipo.workflow.onChangeNote=function(){dojo.byId("isChangedNote").checked=true
};
aipo.workflow.NoteChangeConfirm=function(A){if(dojo.byId(A).checked){if(!confirm(aimluck.io.escapeText("workflow_val_confirm1"))){return false
}}return true
};
aipo.workflow.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("workflow");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.workflow.onAccept=function(A){dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(C){dojo.removeClass(C,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(C){dojo.addClass(C,"auiButtonDisabled")
});
var B=dojo.byId("workflowForm"+A);
aipo.workflow._portletId=A;
B.mode.value="accept"
};
aipo.workflow.onDenial=function(A){dojo.query(".auiButtonAction").forEach(function(C){dojo.removeClass(C,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(C){dojo.addClass(C,"auiButtonDisabled")
});
var B=dojo.byId("workflowForm"+A);
aipo.workflow._portletId=A;
B.mode.value="denial"
};
aipo.workflow.onDelete=function(A){var B=dojo.byId("workflowForm"+A);
aipo.workflow._portletId=A;
B.mode.value="delete"
};
aipo.workflow.submit_list=function(C){var A=C.member_to.options;
var B="";
for(i=0;
i<A.length;
i++){A[i].selected=false
}if(A.length>0){for(i=0;
i<A.length-1;
i++){B=B+A[i].value+","
}B=B+A[A.length-1].value
}C.positions.value=B
};
aipo.workflow.formSwitchRouteSelect=function(A){if(A.form.is_saved_route.value=="TRUE"||A.form.is_saved_route.value=="true"){A.value=aimluck.io.escapeText("workflow_val_route2");
aipo.workflow.formRouteSelectOff(A.form)
}else{A.value=aimluck.io.escapeText("workflow_val_route1");
aipo.workflow.formRouteSelectOn(A.form)
}};
aipo.workflow.formRouteSelectOn=function(A){dojo.byId("workflowRouteSelectField").style.display="";
dojo.byId("workflowRouteInputField").style.display="none";
A.is_saved_route.value="TRUE"
};
aipo.workflow.formRouteSelectOff=function(A){dojo.byId("workflowRouteSelectField").style.display="none";
dojo.byId("workflowRouteInputField").style.display="";
A.is_saved_route.value="FALSE"
};
aipo.workflow.getJsonDataOne=function(rtnData){var cStartIdx=rtnData.type.indexOf("/*");
var cEndIdx=rtnData.type.lastIndexOf("*/");
var rawData=dojo.eval(rtnData.type.substring(cStartIdx+2,cEndIdx));
var jsonData="";
if(dojo.isArray(rawData)&&rawData.length>0){jsonData=rawData[0]
}return jsonData
};
aipo.workflow.onChangeFilter=aipo.workflow.onChangeSearch=function(A,C){var B=encodeURIComponent(dojo.byId("q").value);
A+="?template=WorkflowListScreen";
A+="&filter="+dojo.byId("topic").value;
A+="&filtertype=category";
A+="&search="+B;
aipo.viewPage(A,C)
};
dojo.provide("aipo.blog");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.blog.onLoadBlogDialog=function(A){var B=dojo.byId("title");
if(B){B.focus()
}};
aipo.blog.onLoadBlogThemaDialog=function(A){var B=dojo.byId("thema_name");
if(B){B.focus()
}};
aipo.blog.onLoadBlogDetailDialog=function(A){aipo.portletReload("whatsnew")
};
aipo.blog.onLoadBlogCommentDialog=function(A){var B=dojo.byId("comment");
if(B){B.focus()
}aipo.portletReload("whatsnew")
};
aipo.blog.expandImageWidth=function(A){var B=A.className;
if(!B.match(/width_auto/i)){A.className=A.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{A.className=A.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.blog.ExpandImage=function(D){var C=new Image();
C.src=D;
var F=C.width;
if(screen.width<C.width){F=screen.width
}var E=C.height;
if(screen.height<C.height){E=screen.height
}var A=(screen.width-F)/2;
var G=(screen.height-E)/2;
var B=window.open("image","_blank","left=+x+","top=+y+","width=+imwidth+","height=+imheight+","scrollbars=yes","resizable=yes");
B.window.document.open();
B.window.document.write("<html><head><title>"+C.alt+'</title></head><body style="margin:0;padding:0;border:0;"><img src="'+C.src+'" width="100%" alt="" /></body></html>');
B.window.document.close()
};
aipo.blog.formSwitchThemaInput=function(A){if(A.form.is_new_thema.value=="TRUE"||A.form.is_new_thema.value=="true"){A.value=aimluck.io.escapeText("blog_val_switch1");
aipo.blog.formThemaInputOff(A.form)
}else{A.value=aimluck.io.escapeText("blog_val_switch2");
aipo.blog.formThemaInputOn(A.form)
}};
aipo.blog.formThemaInputOn=function(A){dojo.byId("blogThemaSelectField").style.display="none";
dojo.byId("blogThemaInputField").style.display="";
A.is_new_thema.value="TRUE"
};
aipo.blog.formThemaInputOff=function(A){dojo.byId("blogThemaInputField").style.display="none";
dojo.byId("blogThemaSelectField").style.display="";
A.is_new_thema.value="FALSE"
};
aipo.blog.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("blog");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.blog.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("blog")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.blog.onSubmitSerchButton=function(C,A,E){var D=A;
var B=[["sword",C.sword.value]];
aipo.viewPage(D,E,B);
if(C.sword.value==""){return false
}aipo.viewPage(D,E)
};
aipo.blog.delCommentReply=function(B,F,C,E){var D=aimluck.io.escapeText("blog_val_confirm1");
if(confirm(D)){disableButton(B.form);
var A=B.form.action+"&mode=commentdel&"+B.name+"=1&comment_id="+F;
aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,E,aipo.blog.onReceiveMessage)
}};
aipo.blog.delBlogEntry=function(B,C,E){var D=aimluck.io.escapeText("blog_val_confirm2");
if(confirm(D)){disableButton(B.form);
var A=B.form.action+"&mode=delete&"+B.name+"=1";
aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,E,aipo.blog.onReceiveMessage)
}};
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.msgboard");
aipo.msgboard.toggleMenu=function(F,E,D){var C=E.getBoundingClientRect();
var B=document.documentElement.getBoundingClientRect();
if(F.style.display=="none"){dojo.query("div.menubar").style("display","none");
var A={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
F.style.opacity="0";
F.style.display="block";
if(B.right-F.clientWidth>C.left){F.style.left=C.left+A.left+"px"
}else{F.style.left=C.right-F.clientWidth+A.left+"px"
}if(B.bottom-F.clientHeight>C.bottom){F.style.top=C.bottom+A.top+"px"
}else{F.style.top=C.top-F.clientHeight+A.top+"px"
}F.style.opacity=""
}else{dojo.query("div.menubar").style("display","none")
}};
aipo.msgboard.initFilterSearch=function(B){var C=dojo.byId("q"+B);
var A=dojo.byId("filters_"+B);
if(A&&C){C.style.paddingLeft=A.offsetWidth+"px"
}};
aipo.msgboard.filteredSearch=function(D){var A=dojo.byId("baseuri_"+D).value;
var C=[];
var F=[];
dojo.query("ul.filtertype_"+D,dojo.byId("searchForm_"+D)).forEach(function(H){var I=H.getAttribute("data-type");
C.push(I);
var G=dojo.query("li.selected",H)[0];
if(G){var J=G.getAttribute("data-param");
F.push(J)
}else{F.push(H.getAttribute("data-defaultparam"))
}});
var E=dojo.byId("q"+D);
var B=E?encodeURIComponent(E.value):"";
A+="&filter="+F.join(",");
A+="&filtertype="+C.join(",");
A+="&keyword="+B;
aipo.viewPage(A,D)
};
aipo.msgboard.filterSetDefault=function(E,D){var C=dojo.query("ul.filtertype[data-type="+D+"]",dojo.byId("searchForm_"+E))[0];
var B=C.getAttribute("data-defaultparam");
var A=dojo.query("li[data-param="+B+"]",C);
aipo.msgboard.filterSelect(C,A);
aipo.msgboard.filteredSearch(E)
};
aipo.msgboard.filterSelect=function(B,A){dojo.query("li",B).removeClass("selected");
dojo.query(A).addClass("selected")
};
aipo.msgboard.filterClick=function(D,E,C){var A=E.parentNode;
var B=A.parentNode;
var F=A.getAttribute("data-param");
aipo.msgboard.filterSelect(B,A);
aipo.msgboard.filteredSearch(D)
};
aipo.msgboard.onLoadMsgboardDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.msgboard.onLoadMsgboardDialog=function(A){var B=dojo.byId("topic_name");
if(B){B.focus()
}};
aipo.msgboard.onChangeFilter=aipo.msgboard.onChangeSearch=function(A,C){var B=encodeURIComponent(dojo.byId("q").value);
A+="?template=MsgboardTopicListScreen";
A+="&filter="+dojo.byId("topic").value;
A+="&filtertype=category";
A+="&search="+B;
aipo.viewPage(A,C)
};
aipo.msgboard.onLoadCategoryDialog=function(E){var F=dojo.byId("category_name");
if(F){F.focus()
}var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var D;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(D=0;
D<B.length;
D++){C.addOptionSync(B[D].value,B[D].text,true)
}}};
aipo.msgboard.showMember=function(A){dojo.byId("Block-GroupMember-Show").style.display="";
dojo.byId("is_member").value="TRUE"
};
aipo.msgboard.hideMember=function(A){dojo.byId("Block-GroupMember-Show").style.display="none";
dojo.byId("member_to").options.length=0;
dojo.byId("is_member").value="FALSE"
};
aipo.msgboard.expandImageWidth=function(A){var B=A.className;
if(!B.match(/width_auto/i)){A.className=A.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{A.className=A.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.msgboard.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value=aimluck.io.escapeText("msgboard_val_switch1");
aipo.msgboard.formCategoryInputOff(A.form)
}else{A.value=aimluck.io.escapeText("msgboard_val_switch2");
aipo.msgboard.formCategoryInputOn(A.form)
}};
aipo.msgboard.formCategoryInputOn=function(A){dojo.byId("msgboardCategorySelectField").style.display="none";
dojo.byId("msgboardCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.msgboard.formCategoryInputOff=function(A){dojo.byId("msgboardCategoryInputField").style.display="none";
dojo.byId("msgboardCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.msgboard.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("msgboard");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.msgboard.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("msgboard")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.msgboard.ajaxCheckboxDeleteSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aipo.msgboard.ajaxMultiDeleteSubmit,B,A,C,D,E)
};
aipo.msgboard.ajaxMultiDeleteSubmit=function(B,A,C,D,E){if(confirm("選択した"+B.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.msgboard.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("この"+B.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
dojo.provide("aipo.note");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.note.afterFunction=function(A){aipo.note.onLoadNoteDialog(A)
};
aipo.note.onLoadDetail=function(A){aipo.portletReload("whatsnew")
};
aipo.note.onLoadNoteDialog=function(B){var C=dojo.byId("urlUserlist"+B).value;
var A=dojo.byId("urlDstUser"+B).value;
if(C){aipo.note.changeGroup(C,"LoginUser",A)
}};
aipo.note.formSwitchCategoryInput=function(A){if(A.form.is_new_category.value=="TRUE"||A.form.is_new_category.value=="true"){A.value="新しく入力する";
aipo.note.formCategoryInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.note.formCategoryInputOn(A.form)
}};
aipo.note.formCategoryInputOn=function(A){dojo.byId("noteCategorySelectField").style.display="none";
dojo.byId("noteCategoryInputField").style.display="";
A.is_new_category.value="TRUE"
};
aipo.note.formCategoryInputOff=function(A){dojo.byId("noteCategoryInputField").style.display="none";
dojo.byId("noteCategorySelectField").style.display="";
A.is_new_category.value="FALSE"
};
aipo.note.changeGroup=function(B,E,D){var C=aimluck.io.escapeText("note_val_destuser1");
var A=aimluck.io.escapeText("note_val_destuser2");
aimluck.utils.form.createSelect("dest_user_id","destuserDiv",B+"?mode=group&groupname="+E+"&inc_luser=false","userId","aliasName",D,'<option value="">'+C+'</option><option value="all">'+A+"</option>",'class="w49"')
};
aipo.note.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("note");
aipo.portletReload("whatsnew")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.note.oncheck0=function(A){chk=dojo.byId(A);
chk.checked=true;
return 
};
aipo.note.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("note")
};
aipo.note.onSubmitFilter=function(A,C){var B=encodeURIComponent(dojo.byId("q").value);
A+="?template=NoteListScreen";
A+="&search="+B;
aipo.viewPage(A,C)
};
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
dojo.provide("aipo.report");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("dijit.form.ComboBox");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.report.onLoadReportDetail=function(A){aipo.portletReload("report");
aipo.portletReload("whatsnew")
};
aipo.report.onLoadReportDialog=function(F){var C=dijit.byId("membernormalselect");
if(C){var A=dojo.byId("init_memberlist");
var E;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(E=0;
E<B.length;
E++){C.addOptionSync(B[E].value,B[E].text,true)
}}var C=dijit.byId("mapnormalselect");
if(C){var A=dojo.byId("init_maplist");
var E;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(E=0;
E<B.length;
E++){C.addOptionSync(B[E].value,B[E].text,true)
}}var G=dojo.byId("button_member_add");
if(G){dojo.connect(G,"onclick",function(){aipo.report.expandMember()
})
}var G=dojo.byId("button_map_add");
if(G){dojo.connect(G,"onclick",function(){aipo.report.expandMap()
})
}var D=dojo.byId("button_member_remove");
if(D){dojo.connect(D,"onclick",function(){var H=dojo.byId("members");
if(H.options.length==0){if((C)&&(aipo.report.login_aliasname!="undefined")){var I=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
C.addOptionSync(aipo.report.login_name,I,true)
}}aipo.report.expandMember()
})
}var D=dojo.byId("button_map_remove");
if(D){dojo.connect(D,"onclick",function(){var H=dojo.byId("positions");
if(H.options.length==0){if((C)&&(aipo.report.login_aliasname!="undefined")){var I=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
C.addOptionSync(aipo.report.login_name,I,true)
}}aipo.report.expandMap()
})
}aipo.report.shrinkMember();
aipo.report.expandMap()
};
aipo.report.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("report");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.report.shrinkMember=function(){var C=dojo.byId("memberFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var A=dojo.byId("members");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member1")+'" onclick="aipo.report.expandMember();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("memberField");
if(B){dojo.style(B,"display","none")
}};
aipo.report.shrinkMap=function(){var C=dojo.byId("mapFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var A=dojo.byId("positions");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member2")+'" onclick="aipo.report.expandMap();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("mapField");
if(B){dojo.style(B,"display","none")
}};
aipo.report.expandMember=function(){var C=dojo.byId("memberFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var A=dojo.byId("members");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member3")+'" onclick="aipo.report.shrinkMember();" />';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("memberField");
if(B){dojo.style(B,"display","block")
}};
aipo.report.expandMap=function(){var C=dojo.byId("mapFieldButton");
if(C){var E="";
E+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var A=dojo.byId("positions");
if(A){var F=A.options;
to_size=F.length;
for(i=0;
i<to_size;
i++){var D=F[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
E+="<span>"+D+"</span>";
if(i<to_size-1){E+=",<wbr/>"
}}}E+='</td><td style="border:none;">';
E+="</td></tr></tbody></table>";
C.innerHTML=E
}var B=dojo.byId("mapField");
if(B){dojo.style(B,"display","block")
}};
aipo.report.formatNum=function(A){var C=new String(A);
var B=2-C.length;
if(B<=0){return C
}while(B-->0){C="0"+C
}return C
};
aipo.report.delaySelectAllOptions=function(B,A){return function(C){aimluck.io.selectAllOptions(C.attachments)
}
};
dojo.provide("aipo.activity");
aipo.activity.setListSize=function(){if(dojo.isIE){dojo.query(".activityList li").forEach(function(A){A.style.width="394px"
})
}};
dojo.provide("aipo.account_user");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.account_user.onLoadUserDialog=function(E){var D=dijit.byId("groupnormalselect");
if(D){var A=dojo.byId("init_grouplist");
var C;
var B=A.options;
if(B.length==1&&B[0].value==""){return 
}for(C=0;
C<B.length;
C++){D.addOptionSync(B[C].value,B[C].text,true)
}}var F=dojo.byId("username");
if(F&&F.type=="text"){F.focus()
}};
aipo.account_user.formSwitchPostInput=function(A){if(A.form.is_new_post.value=="TRUE"||A.form.is_new_post.value=="true"){A.value="新しく入力する";
aipo.account_user.formPostInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.account_user.formPostInputOn(A.form)
}};
aipo.account_user.formPostInputOn=function(A){dojo.byId("postSelectField").style.display="none";
dojo.byId("postInputField").style.display="";
A.is_new_post.value="TRUE"
};
aipo.account_user.formPostInputOff=function(A){dojo.byId("postInputField").style.display="none";
dojo.byId("postSelectField").style.display="";
A.is_new_post.value="FALSE"
};
aipo.account_user.formSwitchPositionInput=function(A){if(A.form.is_new_position.value=="TRUE"||A.form.is_new_position.value=="true"){A.value="新しく入力する";
aipo.account_user.formPositionInputOff(A.form)
}else{A.value="一覧から選択する";
aipo.account_user.formPositionInputOn(A.form)
}};
aipo.account_user.formPositionInputOn=function(A){dojo.byId("positionSelectField").style.display="none";
dojo.byId("positionInputField").style.display="";
A.is_new_position.value="TRUE"
};
aipo.account_user.formPositionInputOff=function(A){dojo.byId("positionInputField").style.display="none";
dojo.byId("positionSelectField").style.display="";
A.is_new_position.value="FALSE"
};
aipo.account_user.formAdminToggle=function(A){dojo.byId("is_admin").value=A.checked?"true":"false"
};
aipo.account_user.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.account_user.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("listMessageDiv")){dojo.byId("listMessageDiv").innerHTML=B
}};
aipo.account_user.submit2=function(C){var A=C.member_so.options;
var B="";
for(i=0;
i<A.length;
i++){A[i].selected=false
}if(A.length>0){for(i=0;
i<A.length-1;
i++){B=B+A[i].value+","
}B=B+A[A.length-1].value
}C.positions.value=B
};
dojo.provide("aipo.account_person");
aipo.account_person.onLoadPersonInfoDialog=function(A){var B=dojo.byId("lastname");
if(B){B.focus()
}};
aipo.account_person.onLoadPersonPasswdDialog=function(A){var B=dojo.byId("new_passwd");
if(B){B.focus()
}};
aipo.account_person.onReceiveMessage=function(C){var A=dojo.byId("attachments_select");
if(typeof A!="undefined"&&A!=null){A.parentNode.removeChild(A)
}if(!C){var B=dijit.byId("modalDialog");
if(B){B.hide()
}location.reload()
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=C
}};
aipo.account_person.onChangePasswdReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.account_person.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("account_person")
};
aipo.account_person.setDeletePhotoValue=function(A){var B=dojo.byId("delete_photo_"+A);
B.value=true
};
dojo.provide("aipo.gadgets_admin");
dojo.provide("aipo.gadgets_admin.form");
aipo.gadgets_admin.onLoadDialog=function(A){};
aipo.gadgets_admin.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("gadgets_admin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
aipo.gadgets_admin.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("gadgets_admin")
};
aipo.gadgets_admin.ajaxCheckboxDeleteSubmit=function(B,A,C,D,E){aimluck.io.ajaxVerifyCheckbox(B.form,aipo.gadgets_admin.ajaxMultiDeleteSubmit,B,A,C,D,E)
};
aipo.gadgets_admin.ajaxMultiDeleteSubmit=function(B,A,C,D,E){if(confirm("選択したアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.gadgets_admin.ajaxDeleteSubmit=function(B,A,C,D,E){if(confirm("このアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(B.form,true);
aimluck.io.setHiddenValue(B);
B.form.action=A;
aimluck.io.submit(B.form,C,D,E)
}};
aipo.gadgets_admin.onReceiveMessageUpdate=function(C){var D=dojo.byId("caution_update");
if(D){D.innerHTML=""
}var A=dojo.byId("caution_default");
if(A){A.innerHTML=""
}var B=dojo.byId("caution_all_user");
if(B){B.innerHTML=""
}if(dojo.byId("caution_"+Mode)){dojo.byId("caution_"+Mode).innerHTML=!C?"更新が完了しました。":"設定に失敗しました。時間をおいてから再度試してください。";
aimluck.io.disableForm(form,false)
}};
var Mode="";
var form;
aipo.gadgets_admin.beforeSubmit=function(A,B,C){dojo.byId(B+"-mode").value=C;
form=A.form;
Mode=C
};
aipo.gadgets_admin.submit=function(C,A,B,D){if(Mode=="timeline"||Mode=="schedule"||Mode=="all_user"){aimluck.io.submit(C,A,B,D)
}};
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.timeline");
aipo.timeline.addHiddenValue=function(B,A,D){if(B[A]&&document.getElementsByName(A).item(0)){B[A].value=D
}else{var C=document.createElement("input");
C.type="hidden";
C.name=A;
C.value=D;
B.appendChild(C)
}};
aipo.timeline.addLike=function(B,A,C){};
aipo.timeline.showCommentField=function(A,C){dojo.byId("comments_"+A+"_"+C).style.display="block";
dojo.byId("commentField_"+A+"_"+C).style.display="";
dojo.byId("note_"+A+"_"+C).focus();
dojo.byId("note_"+A+"_"+C).style.color="black";
var B=dojo.byId("commentInputDummy_"+A+"_"+C);
if(typeof B!="undefined"&&B!=null){dojo.byId("commentInputDummy_"+A+"_"+C).style.display="none"
}};
aipo.timeline.showCommentAll=function(A,B){dojo.byId("commentCaption_"+A+"_"+B).style.display="none";
dojo.query("#comments_"+A+"_"+B+" .message").forEach(function(C){C.style.display=""
})
};
aipo.timeline.onClick=function(C,B,D,A){try{dojo.xhrPost({portletId:B,url:C,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){dojo.byId("content_"+B+"_"+D).removeChild(dojo.byId("content_"+B+"_"+D).children[0]);
dojo.byId("content_"+B+"_"+D).removeChild(dojo.byId("content_"+B+"_"+D).children[0]);
dojo.byId("content_"+B+"_"+D).removeChild(dojo.byId("content_"+B+"_"+D).children[0]);
D++;
dojo.byId("content_"+B+"_"+D).innerHTML=G;
if(D==A){dojo.byId("more_"+B).style.display="none"
}}})
}catch(E){alert(E)
}};
aipo.timeline.onScroll=function(D,C,F,A){var G=dojo.byId("timeline_"+C).scrollTop;
var B=dojo.byId("timeline_"+C).clientHeight;
var E=dojo.byId("timeline_"+C).scrollHeight;
var H=E-B-G;
if(dojo.byId("height_"+C)==0||H<5){aipo.timeline.onClick(D,C,F,A)
}};
aipo.timeline.nextThumbnail=function(B){var E=dojo.byId("TimelinePage_"+B);
var D=parseInt(E.value);
var A=dojo.byId("TimelinePage_"+B+"_imagesMaxCount").value;
var C=parseInt(A);
if(D<C){dojo.byId("tlClipImage_"+B+"_1").style.display="none";
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="none";
D++;
E.value=D;
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="";
dojo.byId("count_"+B).innerHTML=A+" 件中 "+E.value+" 件"
}};
aipo.timeline.prevThumbnail=function(B){var E=dojo.byId("TimelinePage_"+B);
var D=parseInt(E.value);
var A=dojo.byId("TimelinePage_"+B+"_imagesMaxCount").value;
var C=parseInt(A);
if(D>1){dojo.byId("tlClipImage_"+B+"_1").style.display="none";
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="none";
D--;
E.value=D;
dojo.byId("tlClipImage_"+B+"_"+E.value).style.display="";
dojo.byId("count_"+B).innerHTML=C+" 件中 "+E.value+" 件"
}};
if(!aipo.timeline.revmaxlist){aipo.timeline.revmaxlist=[]
}aipo.timeline.refreshImageList=function(G,E){function C(O){var Q=dojo.byId("TimelinePage_"+O);
var P=parseInt(Q.value);
if(aipo.timeline.revmaxlist[O]>0){if(dojo.byId("auiSummaryMeta_"+O).style.display!="block"){document.getElementById("tlClipImage_"+O+"_1").style.display="";
dojo.byId("auiSummaryMeta_"+O).style.display="block";
dojo.byId("ViewThumbnail_"+O).style.display="block"
}if(!P){P=1
}dojo.byId("count_"+O).innerHTML=aipo.timeline.revmaxlist[O]+" 件中 "+P+" 件";
dojo.byId("TimelinePage_"+O+"_imagesMaxCount").value=aipo.timeline.revmaxlist[O]
}}var H=dojo.byId("TimelinePage_"+G);
var L=parseInt(H.value);
var J=dojo.byId("TimelinePage_"+G+"_imagesMaxCount").value;
var M=parseInt(J);
var A=0;
var K=dojo.byId("tlClipImage_"+G+"_"+E+"_img").naturalWidth;
var F=dojo.byId("tlClipImage_"+G+"_"+E+"_img").naturalHeight;
if((K>80)&&(F>80)||dojo.isIE){if(aipo.timeline.revmaxlist.hasOwnProperty(G)){A=aipo.timeline.revmaxlist[G]
}A++;
aipo.timeline.revmaxlist[G]=A;
var B=dojo.byId("tlClipImage_"+G+"_1_untiview");
var I=document.createElement("div");
I.id="tlClipImage_"+G+"_"+A;
I.className="tlClipImage";
I.style.display="none";
var N=document.createElement("img");
N.src=dojo.byId("tlClipImage_"+G+"_"+E+"_img").src;
N.name=dojo.byId("tlClipImage_"+G+"_"+E+"_img").name;
I.appendChild(N);
B.parentNode.insertBefore(I,B);
var D=0;
if(dojo.isIE){D=200
}setTimeout(function(){C(G)
},D)
}};
aipo.timeline.getUrl=function(B,A){try{dojo.xhrPost({portletId:A,url:dojo.byId("TimelineUrl_"+A).value,content:{url:B},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(E,D){if(E!="error"){dojo.byId("tlInputClip_"+A).innerHTML=E;
dojo.byId("flag_"+A).value="exist"
}else{dojo.byId("flag_"+A).value="forbidden"
}}})
}catch(C){alert(C)
}};
aipo.timeline.setScrollTop=function(A,B){dojo.byId("timeline_"+A).scrollTop=B
};
aipo.timeline.onKeyUp=function(G,D,H){var B;
if((typeof D!=="undefined")&&(D!=null)){B="note_"+G+"_"+D
}else{B="note_"+G;
var I;
if(window.event){I=window.event.keyCode
}else{if(H){I=H.which
}}if((I==13)|(I==32)){var E=dojo.byId(B).value;
if(dojo.byId("flag_"+G).value=="none"){var L=E.split(/\r\n|\n/g);
for(i in L){if(L[i].match(/^https?:\/\/[^ 	]/i)){aipo.timeline.getUrl(L[i],G);
aipo.timeline.revmaxlist[G]=0
}}}}}var C=dojo.byId(B).value;
var A=C.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(M){return times("&nbsp;",M.length)+" "
});
var J=document.createElement("div");
J.id="shadow";
J.style.position="absolute";
J.style.top="-1000";
J.style.left="-1000";
J.style.border="0";
J.style.outline="0";
J.style.lineHeight="normal";
J.style.height="auto";
J.style.resize="none";
J.cols="10";
J.innerHTML=A+"あ";
var K=document.getElementsByTagName("body").item(0);
K.appendChild(J);
dojo.byId("shadow").style.width=document.getElementById(B).offsetWidth+"px";
var F=document.getElementById("shadow").offsetHeight;
if(F<18){F=18
}dojo.byId(B).style.height=F+21+"px";
K.removeChild(J)
};
aipo.timeline.onReceiveMessage=function(C){var A=dojo.byId("getTimelinePortletId").innerHTML;
if(!C){var B=dijit.byId("modalDialog_"+A);
if(B){B.hide()
}aipo.portletReload("timeline")
}else{dojo.byId("getTimelineOnClick").innerHTML=""
}if(dojo.byId("messageDiv_"+A)){dojo.byId("messageDiv_"+A).innerHTML=C
}};
aipo.timeline.onReceiveLikeMessage=function(H,I,G,M){var E=dojo.byId("getTimelinePortletId").innerHTML;
var L=dijit.byId("modalDialog_"+E);
if(L){L.hide()
}var B=dojo.query("#likeForm_"+H+"_"+I)[0];
var J=dojo.query("#likeForm_"+H+"_"+I+" > a")[0];
var C=dojo.query("#likeForm_"+H+"_"+I+" > input")[1];
if(G=="like"){var F=B.getAttribute("onsubmit");
if(typeof F=="string"){F=F.replace("'like'","'dislike'");
B.setAttribute("onsubmit",F)
}else{var A=F.toString().replace("'like'","'dislike'");
A=A.substring(A.indexOf("{")+1,A.indexOf("}")-1);
B.setAttribute("onsubmit",new Function(A))
}var K=J.getAttribute("onclick");
if(typeof K=="string"){K=K.replace("'like'","'dislike'");
J.setAttribute("onclick",K)
}else{var D=K.toString().replace("'like'","'dislike'");
D=D.substring(D.indexOf("{")+1,D.indexOf("}")-1);
J.setAttribute("onclick",new Function(D))
}J.innerHTML="いいね！を取り消す";
if(M){aipo.timeline.increaseComLikeValue(I)
}else{aipo.timeline.increaseLikeValue(I)
}}else{if(G=="dislike"){var F=B.getAttribute("onsubmit");
if(typeof F=="string"){F=F.replace("'dislike'","'like'");
B.setAttribute("onsubmit",F)
}else{var A=F.toString().replace("'dislike'","'like'");
A=A.substring(A.indexOf("{")+1,A.indexOf("}")-1);
B.setAttribute("onsubmit",new Function(A))
}var K=J.getAttribute("onclick");
if(typeof K=="string"){K=K.replace("'dislike'","'like'");
J.setAttribute("onclick",K)
}else{var D=K.toString().replace("'dislike'","'like'");
D=D.substring(D.indexOf("{")+1,D.indexOf("}")-1);
J.setAttribute("onclick",new Function(D))
}J.innerHTML="いいね！";
if(M){aipo.timeline.decreaseComLikeValue(I)
}else{aipo.timeline.decreaseLikeValue(I)
}}}};
aipo.timeline.increaseLikeValue=function(D){var E=dojo.query("#like_"+D)[0];
var A=dojo.query("#like_"+D+" > a")[0];
if(dojo.isFF>0){var C=A.textContent
}else{var C=A.innerText
}var B=parseInt(C.substring(0,C.length-1))+1;
if(E.style.display=="none"){E.style.display=""
}if(dojo.isFF>0){A.textContent=B+C.charAt(C.length-1)
}else{A.innerText=B+C.charAt(C.length-1)
}};
aipo.timeline.increaseComLikeValue=function(D){var A=dojo.query("#likeCount_"+D)[0];
var C=A.innerText;
var B=parseInt(C)+1;
if(A.style.display=="none"){A.style.display="";
B=1
}A.innerHTML=A.innerHTML.replace(A.innerText,B)
};
aipo.timeline.decreaseLikeValue=function(D){var A=dojo.query("#like_"+D+" > a")[0];
if(dojo.isFF>0){var C=A.textContent
}else{var C=A.innerText
}var B=parseInt(C.substring(0,C.length-1))-1;
if(B<=0){A.parentElement.style.display="none"
}if(dojo.isFF>0){A.textContent=B+C.charAt(C.length-1)
}else{A.innerText=B+C.charAt(C.length-1)
}};
aipo.timeline.decreaseComLikeValue=function(D){var A=dojo.query("#likeCount_"+D)[0];
var C=A.innerText;
var B=parseInt(C)-1;
if(B<=0){A.style.display="none"
}A.innerHTML=A.innerHTML.replace(A.innerText,B)
};
aipo.timeline.onListReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("timeline")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=B
}};
aipo.timeline.hideDialog=function(){var A=dijit.byId("modalDialog");
if(A){A.hide()
}aipo.portletReload("timeline")
};
aipo.timeline.ellipse_message=function(C){var B=C.parentElement;
var A=B.parentElement;
dojo.query(B).addClass("opened");
dojo.query(".text_exposed_show",A).removeClass("ellipsis")
};
aipo.timeline.onFocus=function(A){dojo.byId("guide_"+A).style.display="none"
};
aipo.timeline.onBlur=function(A){var B=dojo.byId("note_"+A);
if(B.value==""){dojo.byId("guide_"+A).style.display=""
}};
aipo.timeline.onBlurCommentField=function(A,E){var B=dojo.byId("note_"+A+"_"+E);
var D=dojo.byId("commentInputDummy_"+A+"_"+E);
var C=dojo.byId("commentField_"+A+"_"+E);
if(B.value==""){B.value=dojo.byId("note_"+A+"_"+E).defaultValue;
D.style.display="";
C.style.display="none"
}};
aipo.timeline.addText=function(B,A){if(dojo.byId("tlInputClip_"+A).innerHTML.length>1){var C=dojo.byId("TimelinePage_"+A);
if(dojo.byId("tlClipImage_"+A+"_"+C.value)!=null&&dojo.byId("tlClipImage_"+A+"_"+C.value).style.display!="none"){aipo.timeline.addHiddenValue(B,"tlClipImage",dojo.byId("tlClipImage_"+A+"_"+C.value).children[0].name)
}aipo.timeline.addHiddenValue(B,"tlClipTitle",dojo.byId("tlClipTitle_"+A).children[0].innerHTML);
if(dojo.byId("tlClipUrl_"+A).children[0].innerHTML){aipo.timeline.addHiddenValue(B,"tlClipUrl",dojo.byId("tlClipUrl_"+A).children[0].getAttribute("href"))
}aipo.timeline.addHiddenValue(B,"tlClipBody",dojo.byId("tlClipBody_"+A).innerHTML)
}};
aipo.timeline.viewThumbnail=function(A){var C=dojo.byId("TimelinePage_"+A);
var B=parseInt(C.value);
if(dojo.byId("checkbox_"+A).checked){dojo.byId("tlClipImage_"+A+"_"+C.value).style.display="none";
dojo.byId("auiSummaryMeta_"+A).style.display="none"
}else{dojo.byId("tlClipImage_"+A+"_"+C.value).style.display="";
dojo.byId("auiSummaryMeta_"+A).style.display=""
}};
aipo.timeline.deleteClip=function(A){dojo.byId("tlInputClip_"+A).innerHTML="";
dojo.byId("flag_"+A).value="forbidden"
};
aipo.timeline.submit=function(E,D,A,F,B){var C=dojo.byId("note_"+A);
if(dojo.byId(D+A).style.display=="none"||B>=8){aimluck.io.createSelectFromFileList(E,A);
if(C.value!=C.defaultValue){aimluck.io.submit(E,D,A,F)
}}else{setTimeout(function(){aipo.timeline.submit(E,D,A,F,B+1)
},Math.pow(2,B)*1000)
}};
aipo.timeline.write=function(C,B,A){aipo.timeline.addText(dojo.byId("form"+A),A);
aipo.timeline.addHiddenValue(dojo.byId("form"+A),"mode","insert");
aimluck.io.setHiddenValue(C);
dojo.byId("getTimelineOnClick").innerHTML="true"
};
aipo.timeline.setMinHeight=function(A){var B=0;
if(document.all){B+=(document.documentElement.clientHeight-dojo.byId("message_"+A).getBoundingClientRect().top)
}else{B+=(innerHeight-dojo.byId("message_"+A).getBoundingClientRect().top)
}dojo.byId("message_"+A).style.minHeight=B+"px"
};
aipo.timeline.changeDisplayCallback=function(A){if(dojo.byId("menubar_tlDisplayChanger_"+A).style.display=="none"){dojo.byId("menubar_tlDisplayChanger_"+A).style.display="block"
}else{dojo.byId("menubar_tlDisplayChanger_"+A).style.display="none"
}};
aipo.timeline.changeDisplay=function(A){if(dojo.byId("menubar_tlDisplayChanger_"+A).style.display=="none"){setTimeout(function(){aipo.timeline.changeDisplayCallback(A)
},0)
}else{aipo.timeline.changeDisplayCallback(A)
}};
aipo.timeline.getNewMessage=function(B,A){var C=dojo.byId("newMessage_"+A);
if(C){dojo.style(C,"display","none")
}try{dojo.xhrPost({portletId:A,url:B,content:{lastTimelineId:dojo.byId("last_timelineId_"+A).value},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(G,F){dojo.query(".message.first").removeClass("first");
if(G.length>0){var H=dojo.byId("timeline_"+A);
var E=document.createElement("div");
E.innerHTML=G;
H.insertBefore(E,H.childNodes[1])
}}})
}catch(D){alert(D)
}};
aipo.timeline.displayIndicator=function(A,D,C,B){dojo.byId("tlDisplayGroup_"+D).innerHTML=dojo.byId("PostName_"+D+"_"+B).innerHTML;
var E=dojo.byId(C+D);
if(E){dojo.style(E,"display","")
}aipo.viewPage(A,D);
E=dojo.byId(C+D)
};
dojo.provide("aipo.page");
aipo.page.onLoadPageDialog=function(A){var B=dojo.byId("page_title");
if(B){B.focus()
}};
aipo.page.onReceiveMessage=function(B){if(!B){var A=dijit.byId("modalDialog");
if(A){A.hide()
}location.href=location
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=B
}};
dojo.provide("aipo.tutorial");
aipo.tutorial.showDialog=function(A,C,D){var B=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!B){B=new aipo.widget.TutorialDialog({widgetId:"imageDialog",_portlet_id:C,_callback:D},"imageDialog")
}else{B.setCallback(C,D)
}if(B){B.setHref(A);
B.show()
}};
aipo.tutorial.hideDialog=function(){var A=dijit.byId("imageDialog");
if(A){A.hide()
}};
aipo.tutorial.onLoadImage=function(B){var A=dojo.byId("imageDialog");
A.style.visibility="hidden";
A.style.width=1050+"px";
A.style.height=650+"px";
dijit.byId("imageDialog")._position();
A.style.visibility="visible"
};
aipo.tutorial.nextPage=function(){var A=dojo.byId("page_tutorial");
var B=A.value-0;
dojo.byId("popupImage"+B).style.display="none";
if(B==1){dojo.byId("tutorial_prev").style.display=""
}B++;
dojo.byId("popupImage"+B).style.display="";
if(B==3){dojo.byId("tutorial_next").style.display="none"
}A.value=B+""
};
aipo.tutorial.prevPage=function(){var A=dojo.byId("page_tutorial");
var B=A.value-0;
dojo.byId("popupImage"+B).style.display="none";
if(B==3){dojo.byId("tutorial_next").style.display=""
}B--;
dojo.byId("popupImage"+B).style.display="";
if(B==1){dojo.byId("tutorial_prev").style.display="none"
}A.value=B+""
};
dojo.provide("aipo.widget.TutorialDialog");
dojo.provide("aipo.widget.TutorialDialogUnderlay");
dojo.require("aimluck.widget.Dialog");
dojo.declare("aipo.widget.TutorialDialogUnderlay",[aimluck.widget.DialogUnderlay],{templateString:"<div class='tutorialDialogUnderlayWrapper modalDialogUnderlayWrapper' id='${id}_underlay'><div class='tutorialDialogUnderlay modalDialogUnderlay' dojoAttachPoint='node'></div></div>"});
dojo.declare("aipo.widget.TutorialDialog",[aimluck.widget.Dialog],{loadingMessage:"<div class='indicator'>読み込み中...</div>",templateCssString:"tutorialDialog",templateString:"<div id='tutorialDialog' class='${templateCssString}' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new aipo.widget.TutorialDialogUnderlay();
var A=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:A,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:A,duration:this.duration,onEnd:function(){A.style.display="none"
}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})]);
A.style.visibility="hidden"
},onLoad:function(){this._position();
aimluck.widget.Dialog.superclass.onLoad.call(this)
}});
