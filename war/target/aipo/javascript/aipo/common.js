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
aipo.fileupload.getFolderName=function(){var B=dojo.byId("folderName")
};
aipo.fileupload.onAddFileInfo=function(F,G,I,J){var H=dojo.byId("attachments_"+J);
if(H.nodeName.toLowerCase()=="ul"){aimluck.io.addFileToList(H,G,I)
}else{aimluck.io.addOption(H,G,I,false)
}dojo.byId("folderName_"+J).value=F
};
aipo.fileupload.replaceFileInfo=function(F,G,I,J){var H=dojo.byId("attachments_"+J);
if(H.nodeName.toLowerCase()=="ul"){aimluck.io.replaceFileToList(H,G,I)
}else{aimluck.io.addOption(H,G,I,false)
}dojo.byId("folderName_"+J).value=F
};
aipo.fileupload.openAttachment=function(N,S){var T=430;
var K=130;
var P=(screen.width-T)/2;
var Q=(screen.height-K)/2;
var R=dojo.byId("attachments_"+S);
if(R.nodeName.toLowerCase()=="ul"){var O=R.children.length
}else{var O=R.options.length;
if(O==1&&R.options[0].value==""){O=0
}}var L=dojo.byId("folderName_"+S).value;
var M=window.open(N+"&nsize="+O+"&folderName="+L,"attachment_window","left="+P+",top="+Q+",width="+T+",height="+K+",resizable=yes,status=yes");
M.focus()
};
aipo.fileupload.ImageDialog;
aipo.fileupload.showImageDialog=function(E,G,F){var H=dojo.byId("imageDialog");
dojo.query("#imageDialog").addClass("preLoadImage");
aipo.fileupload.ImageDialog=dijit.byId("imageDialog");
dojo.query(".roundBlockContent").addClass("mb_dialoghide");
dojo.query("#imageDialog").addClass("mb_dialog");
if(!aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog=new aipo.fileupload.widget.FileuploadViewDialog({widgetId:"imageDialog",_portlet_id:G,_callback:F},"imageDialog")
}else{aipo.fileupload.ImageDialog.setCallback(G,F)
}if(aipo.fileupload.ImageDialog){aipo.fileupload.ImageDialog.setHref(E);
aipo.fileupload.ImageDialog.show()
}};
aipo.fileupload.hideImageDialog=function(){var B=dijit.byId("imageDialog");
if(B){B.hide()
}};
aipo.fileupload.onLoadImage=function(D){var C=dojo.byId("imageDialog");
C.style.width=D.width+"px";
C.style.height=D.height+"px";
aipo.fileupload.ImageDialog._position();
dojo.query("#imageDialog").removeClass("preLoadImage")
};
aipo.fileupload.removeFileFromList=function(E,D,F){dojo.style("facephoto_"+F,"display","none");
return E.removeChild(D)
};
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
dojo.provide("aipo.todo");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.todo.onLoadTodoDialog=function(J){var G=dojo.byId("urlUserlist"+J).value;
var I=dojo.byId("loginUser"+J).value;
var F=dojo.byId("todoUser"+J).value;
if(F==0){F=I
}if(G){aipo.todo.changeGroup(G,"LoginUser",F)
}var H=dojo.byId("todo_name");
if(H){H.focus()
}};
aipo.todo.onLoadCategoryDialog=function(C){var D=dojo.byId("category_name");
if(D){D.focus()
}};
aipo.todo.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value=aimluck.io.escapeText("todo_val_switch1");
aipo.todo.formCategoryInputOff(B.form)
}else{B.value=aimluck.io.escapeText("todo_val_switch2");
aipo.todo.formCategoryInputOn(B.form)
}};
aipo.todo.formCategoryInputOn=function(B){dojo.byId("todoCategorySelectField").style.display="none";
dojo.byId("todoCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.todo.formCategoryInputOff=function(B){dojo.byId("todoCategoryInputField").style.display="none";
dojo.byId("todoCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.todo.changeGroup=function(D,E,F){aimluck.utils.form.createSelect("user_id","destuserDiv",D+"?mode=group&groupname="+E+"&inc_luser=true","userId","aliasName",F,"",'class="w49"')
};
aipo.todo.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.todo.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("todo");
aipo.portletReload("schedule")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.todo.doKeywordSearch=function(D,F){var E=new Array(2);
E[0]=["template","ToDoListScreen"];
E[1]=["keyword",dojo.byId("q"+F).value];
aipo.viewPage(D,F,E)
};
dojo.provide("aipo.workflow");
var before=0;
aipo.workflow.onLoadWorkflowDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.workflow.onLoadWorkflowDialog=function(J){var L=dijit.byId("membernormalselect");
if(L){var N=L;
var H=dojo.byId("init_memberlist");
var K;
var M=H.options;
if(M.length==1&&M[0].value==""){return 
}for(K=0;
K<M.length;
K++){N.addOptionSync(M[K].value,M[K].text,true)
}}var I=dojo.byId("route_name");
if(I){I.focus()
}if(dojo.byId("mode_"+J).value=="insert"){dojo.byId("category_id").onchange()
}};
aipo.workflow.onChangeSelecter=function(J,K,L,G,H){dojo.byId(H).checked=false;
var I=new Array();
I.named="workflow_"+G;
aimluck.io.sendRawData(K+"&value="+L,L,aipo.workflow.setTemplate,I);
return false
};
aipo.workflow.setTemplate=function(J,O){var M=aipo.workflow.getJsonDataOne(O);
var I=M.route_h;
var P=M.route;
var K=P.split(",");
var L=(K.length-1)/2;
if(P==null||P==""){dojo.byId(J.named).style.display="none"
}else{dojo.byId(J.named).style.display=""
}if(P==null||P==""){dojo.byId(J.named).innerHTML=""
}else{dojo.byId(J.named).innerHTML=I
}memberFrom=dojo.byId("tmp_member_from");
memberFromOpts=memberFrom.options;
for(i=0;
i<memberFromOpts.length;
i++){memberFromOpts[i].selected=false
}memberTo=dojo.byId("positions");
while(memberTo.lastChild){memberTo.removeChild(memberTo.lastChild)
}var N;
for(i=0;
i<L;
i++){memberTo.options[i]=new Option(K[2*i+1],K[2*i])
}};
aipo.workflow.categoryOnChangeSelecter=function(L,M,N,O,J,P,I){if(aipo.workflow.NoteChangeConfirm(J)){before=dojo.byId("category_id").selectedIndex;
dojo.byId(J).checked=false;
var K=new Array();
K.named="workflow_"+O;
K.namedRoute="workflow_"+P;
K.selectRoute=I;
aimluck.io.sendRawData(M+"&value="+N,N,aipo.workflow.categorySetTemplate,K)
}else{dojo.byId("category_id").selectedIndex=before
}return false
};
aipo.workflow.categorySetTemplate=function(M,X){var V=aipo.workflow.getJsonDataOne(X);
var S=V.template;
var W=V.route_id.toString();
var U=V.route_h;
var T=V.route;
var O=T.split(",");
var N=(O.length-1)/2;
if(U==null||U==""){dojo.byId(M.namedRoute).style.display="none"
}else{dojo.byId(M.namedRoute).style.display=""
}if(null!=S){dojo.byId(M.named).value=S
}else{dojo.byId(M.named).value=""
}dojo.byId(M.namedRoute).value="";
var Q=dojo.byId(M.selectRoute);
var R=Q.options;
R[0].selected=true;
if(!(W.match(/[^0-9]/g)||parseInt(W,10)+""!=W)){for(i=0;
i<Q.length;
i++){if(R[i].value==W){R[i].selected=true
}}dojo.byId(M.namedRoute).value=U;
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
var P;
for(i=0;
i<N;
i++){memberTo.options[i]=new Option(O[2*i+1],O[2*i])
}}};
aipo.workflow.onFocusComment=function(B){};
aipo.workflow.onChangeNote=function(){dojo.byId("isChangedNote").checked=true
};
aipo.workflow.NoteChangeConfirm=function(B){if(dojo.byId(B).checked){if(!confirm(aimluck.io.escapeText("workflow_val_confirm1"))){return false
}}return true
};
aipo.workflow.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("workflow");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.workflow.onAccept=function(C){dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(A){dojo.removeClass(A,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(A){dojo.addClass(A,"auiButtonDisabled")
});
var D=dojo.byId("workflowForm"+C);
aipo.workflow._portletId=C;
D.mode.value="accept"
};
aipo.workflow.onDenial=function(C){dojo.query(".auiButtonAction").forEach(function(A){dojo.removeClass(A,"auiButtonAction")
});
dojo.query("input[name='eventSubmit_doWorkflow_accept']").forEach(function(A){dojo.addClass(A,"auiButtonDisabled")
});
var D=dojo.byId("workflowForm"+C);
aipo.workflow._portletId=C;
D.mode.value="denial"
};
aipo.workflow.onDelete=function(C){var D=dojo.byId("workflowForm"+C);
aipo.workflow._portletId=C;
D.mode.value="delete"
};
aipo.workflow.submit_list=function(E){var D=E.member_to.options;
var F="";
for(i=0;
i<D.length;
i++){D[i].selected=false
}if(D.length>0){for(i=0;
i<D.length-1;
i++){F=F+D[i].value+","
}F=F+D[D.length-1].value
}E.positions.value=F
};
aipo.workflow.formSwitchRouteSelect=function(B){if(B.form.is_saved_route.value=="TRUE"||B.form.is_saved_route.value=="true"){B.value=aimluck.io.escapeText("workflow_val_route2");
aipo.workflow.formRouteSelectOff(B.form)
}else{B.value=aimluck.io.escapeText("workflow_val_route1");
aipo.workflow.formRouteSelectOn(B.form)
}};
aipo.workflow.formRouteSelectOn=function(B){dojo.byId("workflowRouteSelectField").style.display="";
dojo.byId("workflowRouteInputField").style.display="none";
B.is_saved_route.value="TRUE"
};
aipo.workflow.formRouteSelectOff=function(B){dojo.byId("workflowRouteSelectField").style.display="none";
dojo.byId("workflowRouteInputField").style.display="";
B.is_saved_route.value="FALSE"
};
aipo.workflow.getJsonDataOne=function(rtnData){var cStartIdx=rtnData.type.indexOf("/*");
var cEndIdx=rtnData.type.lastIndexOf("*/");
var rawData=dojo.eval(rtnData.type.substring(cStartIdx+2,cEndIdx));
var jsonData="";
if(dojo.isArray(rawData)&&rawData.length>0){jsonData=rawData[0]
}return jsonData
};
aipo.workflow.onChangeFilter=aipo.workflow.onChangeSearch=function(D,E){var F=encodeURIComponent(dojo.byId("q").value);
D+="?template=WorkflowListScreen";
D+="&filter="+dojo.byId("topic").value;
D+="&filtertype=category";
D+="&search="+F;
aipo.viewPage(D,E)
};
dojo.provide("aipo.blog");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.blog.onLoadBlogDialog=function(C){var D=dojo.byId("title");
if(D){D.focus()
}};
aipo.blog.onLoadBlogThemaDialog=function(C){var D=dojo.byId("thema_name");
if(D){D.focus()
}};
aipo.blog.onLoadBlogDetailDialog=function(B){aipo.portletReload("whatsnew")
};
aipo.blog.onLoadBlogCommentDialog=function(C){var D=dojo.byId("comment");
if(D){D.focus()
}aipo.portletReload("whatsnew")
};
aipo.blog.expandImageWidth=function(C){var D=C.className;
if(!D.match(/width_auto/i)){C.className=C.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{C.className=C.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.blog.ExpandImage=function(L){var M=new Image();
M.src=L;
var J=M.width;
if(screen.width<M.width){J=screen.width
}var K=M.height;
if(screen.height<M.height){K=screen.height
}var H=(screen.width-J)/2;
var I=(screen.height-K)/2;
var N=window.open("image","_blank","left=+x+","top=+y+","width=+imwidth+","height=+imheight+","scrollbars=yes","resizable=yes");
N.window.document.open();
N.window.document.write("<html><head><title>"+M.alt+'</title></head><body style="margin:0;padding:0;border:0;"><img src="'+M.src+'" width="100%" alt="" /></body></html>');
N.window.document.close()
};
aipo.blog.formSwitchThemaInput=function(B){if(B.form.is_new_thema.value=="TRUE"||B.form.is_new_thema.value=="true"){B.value=aimluck.io.escapeText("blog_val_switch1");
aipo.blog.formThemaInputOff(B.form)
}else{B.value=aimluck.io.escapeText("blog_val_switch2");
aipo.blog.formThemaInputOn(B.form)
}};
aipo.blog.formThemaInputOn=function(B){dojo.byId("blogThemaSelectField").style.display="none";
dojo.byId("blogThemaInputField").style.display="";
B.is_new_thema.value="TRUE"
};
aipo.blog.formThemaInputOff=function(B){dojo.byId("blogThemaInputField").style.display="none";
dojo.byId("blogThemaSelectField").style.display="";
B.is_new_thema.value="FALSE"
};
aipo.blog.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("blog");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.blog.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("blog")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.blog.onSubmitSerchButton=function(I,F,G){var H=F;
var J=[["sword",I.sword.value]];
aipo.viewPage(H,G,J);
if(I.sword.value==""){return false
}aipo.viewPage(H,G)
};
aipo.blog.delCommentReply=function(L,H,K,I){var J=aimluck.io.escapeText("blog_val_confirm1");
if(confirm(J)){disableButton(L.form);
var G=L.form.action+"&mode=commentdel&"+L.name+"=1&comment_id="+H;
aimluck.io.disableForm(L.form,true);
aimluck.io.setHiddenValue(L);
L.form.action=G;
aimluck.io.submit(L.form,K,I,aipo.blog.onReceiveMessage)
}};
aipo.blog.delBlogEntry=function(J,I,G){var H=aimluck.io.escapeText("blog_val_confirm2");
if(confirm(H)){disableButton(J.form);
var F=J.form.action+"&mode=delete&"+J.name+"=1";
aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,G,aipo.blog.onReceiveMessage)
}};
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.msgboard");
aipo.msgboard.toggleMenu=function(H,I,J){var K=I.getBoundingClientRect();
var L=document.documentElement.getBoundingClientRect();
if(H.style.display=="none"){dojo.query("div.menubar").style("display","none");
var G={left:document.documentElement.scrollLeft||document.body.scrollLeft,top:document.documentElement.scrollTop||document.body.scrollTop};
H.style.opacity="0";
H.style.display="block";
if(L.right-H.clientWidth>K.left){H.style.left=K.left+G.left+"px"
}else{H.style.left=K.right-H.clientWidth+G.left+"px"
}if(L.bottom-H.clientHeight>K.bottom){H.style.top=K.bottom+G.top+"px"
}else{H.style.top=K.top-H.clientHeight+G.top+"px"
}H.style.opacity=""
}else{dojo.query("div.menubar").style("display","none")
}};
aipo.msgboard.initFilterSearch=function(F){var E=dojo.byId("q"+F);
var D=dojo.byId("filters_"+F);
if(D&&E){E.style.paddingLeft=D.offsetWidth+"px"
}};
aipo.msgboard.filteredSearch=function(J){var G=dojo.byId("baseuri_"+J).value;
var K=[];
var H=[];
dojo.query("ul.filtertype_"+J,dojo.byId("searchForm_"+J)).forEach(function(C){var B=C.getAttribute("data-type");
K.push(B);
var D=dojo.query("li.selected",C)[0];
if(D){var A=D.getAttribute("data-param");
H.push(A)
}else{H.push(C.getAttribute("data-defaultparam"))
}});
var I=dojo.byId("q"+J);
var L=I?encodeURIComponent(I.value):"";
G+="&filter="+H.join(",");
G+="&filtertype="+K.join(",");
G+="&keyword="+L;
aipo.viewPage(G,J)
};
aipo.msgboard.filterSetDefault=function(G,H){var I=dojo.query("ul.filtertype[data-type="+H+"]",dojo.byId("searchForm_"+G))[0];
var J=I.getAttribute("data-defaultparam");
var F=dojo.query("li[data-param="+J+"]",I);
aipo.msgboard.filterSelect(I,F);
aipo.msgboard.filteredSearch(G)
};
aipo.msgboard.filterSelect=function(D,C){dojo.query("li",D).removeClass("selected");
dojo.query(C).addClass("selected")
};
aipo.msgboard.filterClick=function(J,I,K){var G=I.parentNode;
var L=G.parentNode;
var H=G.getAttribute("data-param");
aipo.msgboard.filterSelect(L,G);
aipo.msgboard.filteredSearch(J)
};
aipo.msgboard.onLoadMsgboardDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.msgboard.onLoadMsgboardDialog=function(C){var D=dojo.byId("topic_name");
if(D){D.focus()
}};
aipo.msgboard.onChangeFilter=aipo.msgboard.onChangeSearch=function(D,E){var F=encodeURIComponent(dojo.byId("q").value);
D+="?template=MsgboardTopicListScreen";
D+="&filter="+dojo.byId("topic").value;
D+="&filtertype=category";
D+="&search="+F;
aipo.viewPage(D,E)
};
aipo.msgboard.onLoadCategoryDialog=function(I){var H=dojo.byId("category_name");
if(H){H.focus()
}var K=dijit.byId("membernormalselect");
if(K){var G=dojo.byId("init_memberlist");
var J;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(J=0;
J<L.length;
J++){K.addOptionSync(L[J].value,L[J].text,true)
}}};
aipo.msgboard.showMember=function(B){dojo.byId("Block-GroupMember-Show").style.display="";
dojo.byId("is_member").value="TRUE"
};
aipo.msgboard.hideMember=function(B){dojo.byId("Block-GroupMember-Show").style.display="none";
dojo.byId("member_to").options.length=0;
dojo.byId("is_member").value="FALSE"
};
aipo.msgboard.expandImageWidth=function(C){var D=C.className;
if(!D.match(/width_auto/i)){C.className=C.className.replace(/\bwidth_thumbs\b/g,"width_auto")
}else{C.className=C.className.replace(/\bwidth_auto\b/g,"width_thumbs")
}};
aipo.msgboard.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value=aimluck.io.escapeText("msgboard_val_switch1");
aipo.msgboard.formCategoryInputOff(B.form)
}else{B.value=aimluck.io.escapeText("msgboard_val_switch2");
aipo.msgboard.formCategoryInputOn(B.form)
}};
aipo.msgboard.formCategoryInputOn=function(B){dojo.byId("msgboardCategorySelectField").style.display="none";
dojo.byId("msgboardCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.msgboard.formCategoryInputOff=function(B){dojo.byId("msgboardCategoryInputField").style.display="none";
dojo.byId("msgboardCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.msgboard.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("msgboard");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.msgboard.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("msgboard")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.msgboard.ajaxCheckboxDeleteSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aipo.msgboard.ajaxMultiDeleteSubmit,J,F,I,H,G)
};
aipo.msgboard.ajaxMultiDeleteSubmit=function(J,F,I,H,G){if(confirm("選択した"+J.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.msgboard.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("この"+J.form._name.value+"を削除してよろしいですか？なお、カテゴリに含まれるトピックはすべて削除されます。")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
dojo.provide("aipo.note");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.note.afterFunction=function(B){aipo.note.onLoadNoteDialog(B)
};
aipo.note.onLoadDetail=function(B){aipo.portletReload("whatsnew")
};
aipo.note.onLoadNoteDialog=function(F){var E=dojo.byId("urlUserlist"+F).value;
var D=dojo.byId("urlDstUser"+F).value;
if(E){aipo.note.changeGroup(E,"LoginUser",D)
}};
aipo.note.formSwitchCategoryInput=function(B){if(B.form.is_new_category.value=="TRUE"||B.form.is_new_category.value=="true"){B.value="新しく入力する";
aipo.note.formCategoryInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.note.formCategoryInputOn(B.form)
}};
aipo.note.formCategoryInputOn=function(B){dojo.byId("noteCategorySelectField").style.display="none";
dojo.byId("noteCategoryInputField").style.display="";
B.is_new_category.value="TRUE"
};
aipo.note.formCategoryInputOff=function(B){dojo.byId("noteCategoryInputField").style.display="none";
dojo.byId("noteCategorySelectField").style.display="";
B.is_new_category.value="FALSE"
};
aipo.note.changeGroup=function(J,G,H){var I=aimluck.io.escapeText("note_val_destuser1");
var F=aimluck.io.escapeText("note_val_destuser2");
aimluck.utils.form.createSelect("dest_user_id","destuserDiv",J+"?mode=group&groupname="+G+"&inc_luser=false","userId","aliasName",H,'<option value="">'+I+'</option><option value="all">'+F+"</option>",'class="w49"')
};
aipo.note.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("note");
aipo.portletReload("whatsnew")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.note.oncheck0=function(B){chk=dojo.byId(B);
chk.checked=true;
return 
};
aipo.note.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("note")
};
aipo.note.onSubmitFilter=function(D,E){var F=encodeURIComponent(dojo.byId("q").value);
D+="?template=NoteListScreen";
D+="&search="+F;
aipo.viewPage(D,E)
};
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
dojo.provide("aipo.report");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("dijit.form.ComboBox");
dojo.require("aipo.widget.DropdownDatepicker");
aipo.report.onLoadReportDetail=function(B){aipo.portletReload("report");
aipo.portletReload("whatsnew")
};
aipo.report.onLoadReportDialog=function(J){var M=dijit.byId("membernormalselect");
if(M){var H=dojo.byId("init_memberlist");
var K;
var N=H.options;
if(N.length==1&&N[0].value==""){return 
}for(K=0;
K<N.length;
K++){M.addOptionSync(N[K].value,N[K].text,true)
}}var M=dijit.byId("mapnormalselect");
if(M){var H=dojo.byId("init_maplist");
var K;
var N=H.options;
if(N.length==1&&N[0].value==""){return 
}for(K=0;
K<N.length;
K++){M.addOptionSync(N[K].value,N[K].text,true)
}}var I=dojo.byId("button_member_add");
if(I){dojo.connect(I,"onclick",function(){aipo.report.expandMember()
})
}var I=dojo.byId("button_map_add");
if(I){dojo.connect(I,"onclick",function(){aipo.report.expandMap()
})
}var L=dojo.byId("button_member_remove");
if(L){dojo.connect(L,"onclick",function(){var B=dojo.byId("members");
if(B.options.length==0){if((M)&&(aipo.report.login_aliasname!="undefined")){var A=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
M.addOptionSync(aipo.report.login_name,A,true)
}}aipo.report.expandMember()
})
}var L=dojo.byId("button_map_remove");
if(L){dojo.connect(L,"onclick",function(){var B=dojo.byId("positions");
if(B.options.length==0){if((M)&&(aipo.report.login_aliasname!="undefined")){var A=aipo.report.login_aliasname.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
M.addOptionSync(aipo.report.login_name,A,true)
}}aipo.report.expandMap()
})
}aipo.report.shrinkMember();
aipo.report.expandMap()
};
aipo.report.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("report");
aipo.portletReload("whatsnew");
aipo.portletReload("timeline")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.report.shrinkMember=function(){var K=dojo.byId("memberFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var G=dojo.byId("members");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member1")+'" onclick="aipo.report.expandMember();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("memberField");
if(L){dojo.style(L,"display","none")
}};
aipo.report.shrinkMap=function(){var K=dojo.byId("mapFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none;">';
var G=dojo.byId("positions");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member2")+'" onclick="aipo.report.expandMap();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("mapField");
if(L){dojo.style(L,"display","none")
}};
aipo.report.expandMember=function(){var K=dojo.byId("memberFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var G=dojo.byId("members");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+='<input type="button" class="alignright" value="'+aimluck.io.escapeText("report_val_member3")+'" onclick="aipo.report.shrinkMember();" />';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("memberField");
if(L){dojo.style(L,"display","block")
}};
aipo.report.expandMap=function(){var K=dojo.byId("mapFieldButton");
if(K){var I="";
I+='<table style="width:98%;"><tbody><tr><td style="width:80%; border:none">';
var G=dojo.byId("positions");
if(G){var H=G.options;
to_size=H.length;
for(i=0;
i<to_size;
i++){var J=H[i].text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
I+="<span>"+J+"</span>";
if(i<to_size-1){I+=",<wbr/>"
}}}I+='</td><td style="border:none;">';
I+="</td></tr></tbody></table>";
K.innerHTML=I
}var L=dojo.byId("mapField");
if(L){dojo.style(L,"display","block")
}};
aipo.report.formatNum=function(D){var E=new String(D);
var F=2-E.length;
if(F<=0){return E
}while(F-->0){E="0"+E
}return E
};
aipo.report.delaySelectAllOptions=function(D,C){return function(A){aimluck.io.selectAllOptions(A.attachments)
}
};
dojo.provide("aipo.activity");
aipo.activity.setListSize=function(){if(dojo.isIE){dojo.query(".activityList li").forEach(function(B){B.style.width="394px"
})
}};
dojo.provide("aipo.account_user");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.account_user.onLoadUserDialog=function(I){var J=dijit.byId("groupnormalselect");
if(J){var G=dojo.byId("init_grouplist");
var K;
var L=G.options;
if(L.length==1&&L[0].value==""){return 
}for(K=0;
K<L.length;
K++){J.addOptionSync(L[K].value,L[K].text,true)
}}var H=dojo.byId("username");
if(H&&H.type=="text"){H.focus()
}};
aipo.account_user.formSwitchPostInput=function(B){if(B.form.is_new_post.value=="TRUE"||B.form.is_new_post.value=="true"){B.value="新しく入力する";
aipo.account_user.formPostInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.account_user.formPostInputOn(B.form)
}};
aipo.account_user.formPostInputOn=function(B){dojo.byId("postSelectField").style.display="none";
dojo.byId("postInputField").style.display="";
B.is_new_post.value="TRUE"
};
aipo.account_user.formPostInputOff=function(B){dojo.byId("postInputField").style.display="none";
dojo.byId("postSelectField").style.display="";
B.is_new_post.value="FALSE"
};
aipo.account_user.formSwitchPositionInput=function(B){if(B.form.is_new_position.value=="TRUE"||B.form.is_new_position.value=="true"){B.value="新しく入力する";
aipo.account_user.formPositionInputOff(B.form)
}else{B.value="一覧から選択する";
aipo.account_user.formPositionInputOn(B.form)
}};
aipo.account_user.formPositionInputOn=function(B){dojo.byId("positionSelectField").style.display="none";
dojo.byId("positionInputField").style.display="";
B.is_new_position.value="TRUE"
};
aipo.account_user.formPositionInputOff=function(B){dojo.byId("positionInputField").style.display="none";
dojo.byId("positionSelectField").style.display="";
B.is_new_position.value="FALSE"
};
aipo.account_user.formAdminToggle=function(B){dojo.byId("is_admin").value=B.checked?"true":"false"
};
aipo.account_user.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.account_user.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("account_user")
}if(dojo.byId("listMessageDiv")){dojo.byId("listMessageDiv").innerHTML=D
}};
aipo.account_user.submit2=function(E){var D=E.member_so.options;
var F="";
for(i=0;
i<D.length;
i++){D[i].selected=false
}if(D.length>0){for(i=0;
i<D.length-1;
i++){F=F+D[i].value+","
}F=F+D[D.length-1].value
}E.positions.value=F
};
dojo.provide("aipo.account_person");
aipo.account_person.onLoadPersonInfoDialog=function(C){var D=dojo.byId("lastname");
if(D){D.focus()
}};
aipo.account_person.onLoadPersonPasswdDialog=function(C){var D=dojo.byId("new_passwd");
if(D){D.focus()
}};
aipo.account_person.onReceiveMessage=function(E){var D=dojo.byId("attachments_select");
if(typeof D!="undefined"&&D!=null){D.parentNode.removeChild(D)
}if(!E){var F=dijit.byId("modalDialog");
if(F){F.hide()
}location.reload()
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=E
}};
aipo.account_person.onChangePasswdReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.account_person.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("account_person")
};
aipo.account_person.setDeletePhotoValue=function(C){var D=dojo.byId("delete_photo_"+C);
D.value=true
};
dojo.provide("aipo.gadgets_admin");
dojo.provide("aipo.gadgets_admin.form");
aipo.gadgets_admin.onLoadDialog=function(B){};
aipo.gadgets_admin.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("gadgets_admin")
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
}};
aipo.gadgets_admin.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("gadgets_admin")
};
aipo.gadgets_admin.ajaxCheckboxDeleteSubmit=function(J,F,I,H,G){aimluck.io.ajaxVerifyCheckbox(J.form,aipo.gadgets_admin.ajaxMultiDeleteSubmit,J,F,I,H,G)
};
aipo.gadgets_admin.ajaxMultiDeleteSubmit=function(J,F,I,H,G){if(confirm("選択したアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.gadgets_admin.ajaxDeleteSubmit=function(J,F,I,H,G){if(confirm("このアプリをアンインストールしてよろしいでしょうか？")){aimluck.io.disableForm(J.form,true);
aimluck.io.setHiddenValue(J);
J.form.action=F;
aimluck.io.submit(J.form,I,H,G)
}};
aipo.gadgets_admin.onReceiveMessageUpdate=function(G){var F=dojo.byId("caution_update");
if(F){F.innerHTML=""
}var E=dojo.byId("caution_default");
if(E){E.innerHTML=""
}var H=dojo.byId("caution_all_user");
if(H){H.innerHTML=""
}if(dojo.byId("caution_"+Mode)){dojo.byId("caution_"+Mode).innerHTML=!G?"更新が完了しました。":"設定に失敗しました。時間をおいてから再度試してください。";
aimluck.io.disableForm(form,false)
}};
var Mode="";
var form;
aipo.gadgets_admin.beforeSubmit=function(D,F,E){dojo.byId(F+"-mode").value=E;
form=D.form;
Mode=E
};
aipo.gadgets_admin.submit=function(G,E,H,F){if(Mode=="timeline"||Mode=="schedule"||Mode=="all_user"){aimluck.io.submit(G,E,H,F)
}};
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.provide("aipo.timeline");
aipo.timeline.addHiddenValue=function(H,E,F){if(H[E]&&document.getElementsByName(E).item(0)){H[E].value=F
}else{var G=document.createElement("input");
G.type="hidden";
G.name=E;
G.value=F;
H.appendChild(G)
}};
aipo.timeline.addLike=function(F,D,E){};
aipo.timeline.showCommentField=function(D,E){dojo.byId("comments_"+D+"_"+E).style.display="block";
dojo.byId("commentField_"+D+"_"+E).style.display="";
dojo.byId("note_"+D+"_"+E).focus();
dojo.byId("note_"+D+"_"+E).style.color="black";
var F=dojo.byId("commentInputDummy_"+D+"_"+E);
if(typeof F!="undefined"&&F!=null){dojo.byId("commentInputDummy_"+D+"_"+E).style.display="none"
}};
aipo.timeline.showCommentAll=function(C,D){dojo.byId("commentCaption_"+C+"_"+D).style.display="none";
dojo.query("#comments_"+C+"_"+D+" .message").forEach(function(A){A.style.display=""
})
};
aipo.timeline.onClick=function(I,J,H,F){try{dojo.xhrPost({portletId:J,url:I,encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,B){dojo.byId("content_"+J+"_"+H).removeChild(dojo.byId("content_"+J+"_"+H).children[0]);
dojo.byId("content_"+J+"_"+H).removeChild(dojo.byId("content_"+J+"_"+H).children[0]);
dojo.byId("content_"+J+"_"+H).removeChild(dojo.byId("content_"+J+"_"+H).children[0]);
H++;
dojo.byId("content_"+J+"_"+H).innerHTML=A;
if(H==F){dojo.byId("more_"+J).style.display="none"
}}})
}catch(G){alert(G)
}};
aipo.timeline.onScroll=function(N,O,L,I){var K=dojo.byId("timeline_"+O).scrollTop;
var P=dojo.byId("timeline_"+O).clientHeight;
var M=dojo.byId("timeline_"+O).scrollHeight;
var J=M-P-K;
if(dojo.byId("height_"+O)==0||J<5){aipo.timeline.onClick(N,O,L,I)
}};
aipo.timeline.nextThumbnail=function(J){var G=dojo.byId("TimelinePage_"+J);
var H=parseInt(G.value);
var F=dojo.byId("TimelinePage_"+J+"_imagesMaxCount").value;
var I=parseInt(F);
if(H<I){dojo.byId("tlClipImage_"+J+"_1").style.display="none";
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="none";
H++;
G.value=H;
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="";
dojo.byId("count_"+J).innerHTML=F+" 件中 "+G.value+" 件"
}};
aipo.timeline.prevThumbnail=function(J){var G=dojo.byId("TimelinePage_"+J);
var H=parseInt(G.value);
var F=dojo.byId("TimelinePage_"+J+"_imagesMaxCount").value;
var I=parseInt(F);
if(H>1){dojo.byId("tlClipImage_"+J+"_1").style.display="none";
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="none";
H--;
G.value=H;
dojo.byId("tlClipImage_"+J+"_"+G.value).style.display="";
dojo.byId("count_"+J).innerHTML=I+" 件中 "+G.value+" 件"
}};
if(!aipo.timeline.revmaxlist){aipo.timeline.revmaxlist=[]
}aipo.timeline.refreshImageList=function(Z,b){function P(C){var A=dojo.byId("TimelinePage_"+C);
var B=parseInt(A.value);
if(aipo.timeline.revmaxlist[C]>0){if(dojo.byId("auiSummaryMeta_"+C).style.display!="block"){document.getElementById("tlClipImage_"+C+"_1").style.display="";
dojo.byId("auiSummaryMeta_"+C).style.display="block";
dojo.byId("ViewThumbnail_"+C).style.display="block"
}if(!B){B=1
}dojo.byId("count_"+C).innerHTML=aipo.timeline.revmaxlist[C]+" 件中 "+B+" 件";
dojo.byId("TimelinePage_"+C+"_imagesMaxCount").value=aipo.timeline.revmaxlist[C]
}}var Y=dojo.byId("TimelinePage_"+Z);
var U=parseInt(Y.value);
var W=dojo.byId("TimelinePage_"+Z+"_imagesMaxCount").value;
var T=parseInt(W);
var R=0;
var V=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").naturalWidth;
var a=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").naturalHeight;
if((V>80)&&(a>80)||dojo.isIE){if(aipo.timeline.revmaxlist.hasOwnProperty(Z)){R=aipo.timeline.revmaxlist[Z]
}R++;
aipo.timeline.revmaxlist[Z]=R;
var Q=dojo.byId("tlClipImage_"+Z+"_1_untiview");
var X=document.createElement("div");
X.id="tlClipImage_"+Z+"_"+R;
X.className="tlClipImage";
X.style.display="none";
var S=document.createElement("img");
S.src=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").src;
S.name=dojo.byId("tlClipImage_"+Z+"_"+b+"_img").name;
X.appendChild(S);
Q.parentNode.insertBefore(X,Q);
var O=0;
if(dojo.isIE){O=200
}setTimeout(function(){P(Z)
},O)
}};
aipo.timeline.getUrl=function(F,D){try{dojo.xhrPost({portletId:D,url:dojo.byId("TimelineUrl_"+D).value,content:{url:F},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(A,B){if(A!="error"){dojo.byId("tlInputClip_"+D).innerHTML=A;
dojo.byId("flag_"+D).value="exist"
}else{dojo.byId("flag_"+D).value="forbidden"
}}})
}catch(E){alert(E)
}};
aipo.timeline.setScrollTop=function(C,D){dojo.byId("timeline_"+C).scrollTop=D
};
aipo.timeline.onKeyUp=function(V,M,U){var O;
if((typeof M!=="undefined")&&(M!=null)){O="note_"+V+"_"+M
}else{O="note_"+V;
var T;
if(window.event){T=window.event.keyCode
}else{if(U){T=U.which
}}if((T==13)|(T==32)){var X=dojo.byId(O).value;
if(dojo.byId("flag_"+V).value=="none"){var Q=X.split(/\r\n|\n/g);
for(i in Q){if(Q[i].match(/^https?:\/\/[^ 	]/i)){aipo.timeline.getUrl(Q[i],V);
aipo.timeline.revmaxlist[V]=0
}}}}}var N=dojo.byId(O).value;
var P=N.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(A){return times("&nbsp;",A.length)+" "
});
var S=document.createElement("div");
S.id="shadow";
S.style.position="absolute";
S.style.top="-1000";
S.style.left="-1000";
S.style.border="0";
S.style.outline="0";
S.style.lineHeight="normal";
S.style.height="auto";
S.style.resize="none";
S.cols="10";
S.innerHTML=P+"あ";
var R=document.getElementsByTagName("body").item(0);
R.appendChild(S);
dojo.byId("shadow").style.width=document.getElementById(O).offsetWidth+"px";
var W=document.getElementById("shadow").offsetHeight;
if(W<18){W=18
}dojo.byId(O).style.height=W+21+"px";
R.removeChild(S)
};
aipo.timeline.onReceiveMessage=function(E){var D=dojo.byId("getTimelinePortletId").innerHTML;
if(!E){var F=dijit.byId("modalDialog_"+D);
if(F){F.hide()
}aipo.portletReload("timeline")
}else{dojo.byId("getTimelineOnClick").innerHTML=""
}if(dojo.byId("messageDiv_"+D)){dojo.byId("messageDiv_"+D).innerHTML=E
}};
aipo.timeline.onReceiveLikeMessage=function(W,V,X,R){var Z=dojo.byId("getTimelinePortletId").innerHTML;
var S=dijit.byId("modalDialog_"+Z);
if(S){S.hide()
}var P=dojo.query("#likeForm_"+W+"_"+V)[0];
var U=dojo.query("#likeForm_"+W+"_"+V+" > a")[0];
var O=dojo.query("#likeForm_"+W+"_"+V+" > input")[1];
if(X=="like"){var Y=P.getAttribute("onsubmit");
if(typeof Y=="string"){Y=Y.replace("'like'","'dislike'");
P.setAttribute("onsubmit",Y)
}else{var Q=Y.toString().replace("'like'","'dislike'");
Q=Q.substring(Q.indexOf("{")+1,Q.indexOf("}")-1);
P.setAttribute("onsubmit",new Function(Q))
}var T=U.getAttribute("onclick");
if(typeof T=="string"){T=T.replace("'like'","'dislike'");
U.setAttribute("onclick",T)
}else{var N=T.toString().replace("'like'","'dislike'");
N=N.substring(N.indexOf("{")+1,N.indexOf("}")-1);
U.setAttribute("onclick",new Function(N))
}U.innerHTML="いいね！を取り消す";
if(R){aipo.timeline.increaseComLikeValue(V)
}else{aipo.timeline.increaseLikeValue(V)
}}else{if(X=="dislike"){var Y=P.getAttribute("onsubmit");
if(typeof Y=="string"){Y=Y.replace("'dislike'","'like'");
P.setAttribute("onsubmit",Y)
}else{var Q=Y.toString().replace("'dislike'","'like'");
Q=Q.substring(Q.indexOf("{")+1,Q.indexOf("}")-1);
P.setAttribute("onsubmit",new Function(Q))
}var T=U.getAttribute("onclick");
if(typeof T=="string"){T=T.replace("'dislike'","'like'");
U.setAttribute("onclick",T)
}else{var N=T.toString().replace("'dislike'","'like'");
N=N.substring(N.indexOf("{")+1,N.indexOf("}")-1);
U.setAttribute("onclick",new Function(N))
}U.innerHTML="いいね！";
if(R){aipo.timeline.decreaseComLikeValue(V)
}else{aipo.timeline.decreaseLikeValue(V)
}}}};
aipo.timeline.increaseLikeValue=function(H){var G=dojo.query("#like_"+H)[0];
var F=dojo.query("#like_"+H+" > a")[0];
if(dojo.isFF>0){var I=F.textContent
}else{var I=F.innerText
}var J=parseInt(I.substring(0,I.length-1))+1;
if(G.style.display=="none"){G.style.display=""
}if(dojo.isFF>0){F.textContent=J+I.charAt(I.length-1)
}else{F.innerText=J+I.charAt(I.length-1)
}};
aipo.timeline.increaseComLikeValue=function(F){var E=dojo.query("#likeCount_"+F)[0];
var G=E.innerText;
var H=parseInt(G)+1;
if(E.style.display=="none"){E.style.display="";
H=1
}E.innerHTML=E.innerHTML.replace(E.innerText,H)
};
aipo.timeline.decreaseLikeValue=function(F){var E=dojo.query("#like_"+F+" > a")[0];
if(dojo.isFF>0){var G=E.textContent
}else{var G=E.innerText
}var H=parseInt(G.substring(0,G.length-1))-1;
if(H<=0){E.parentElement.style.display="none"
}if(dojo.isFF>0){E.textContent=H+G.charAt(G.length-1)
}else{E.innerText=H+G.charAt(G.length-1)
}};
aipo.timeline.decreaseComLikeValue=function(F){var E=dojo.query("#likeCount_"+F)[0];
var G=E.innerText;
var H=parseInt(G)-1;
if(H<=0){E.style.display="none"
}E.innerHTML=E.innerHTML.replace(E.innerText,H)
};
aipo.timeline.onListReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}aipo.portletReload("timeline")
}if(dojo.byId("listmessageDiv")){dojo.byId("listmessageDiv").innerHTML=D
}};
aipo.timeline.hideDialog=function(){var B=dijit.byId("modalDialog");
if(B){B.hide()
}aipo.portletReload("timeline")
};
aipo.timeline.ellipse_message=function(E){var F=E.parentElement;
var D=F.parentElement;
dojo.query(F).addClass("opened");
dojo.query(".text_exposed_show",D).removeClass("ellipsis")
};
aipo.timeline.onFocus=function(B){dojo.byId("guide_"+B).style.display="none"
};
aipo.timeline.onBlur=function(C){var D=dojo.byId("note_"+C);
if(D.value==""){dojo.byId("guide_"+C).style.display=""
}};
aipo.timeline.onBlurCommentField=function(F,G){var J=dojo.byId("note_"+F+"_"+G);
var H=dojo.byId("commentInputDummy_"+F+"_"+G);
var I=dojo.byId("commentField_"+F+"_"+G);
if(J.value==""){J.value=dojo.byId("note_"+F+"_"+G).defaultValue;
H.style.display="";
I.style.display="none"
}};
aipo.timeline.addText=function(F,D){if(dojo.byId("tlInputClip_"+D).innerHTML.length>1){var E=dojo.byId("TimelinePage_"+D);
if(dojo.byId("tlClipImage_"+D+"_"+E.value)!=null&&dojo.byId("tlClipImage_"+D+"_"+E.value).style.display!="none"){aipo.timeline.addHiddenValue(F,"tlClipImage",dojo.byId("tlClipImage_"+D+"_"+E.value).children[0].name)
}aipo.timeline.addHiddenValue(F,"tlClipTitle",dojo.byId("tlClipTitle_"+D).children[0].innerHTML);
if(dojo.byId("tlClipUrl_"+D).children[0].innerHTML){aipo.timeline.addHiddenValue(F,"tlClipUrl",dojo.byId("tlClipUrl_"+D).children[0].getAttribute("href"))
}aipo.timeline.addHiddenValue(F,"tlClipBody",dojo.byId("tlClipBody_"+D).innerHTML)
}};
aipo.timeline.viewThumbnail=function(D){var E=dojo.byId("TimelinePage_"+D);
var F=parseInt(E.value);
if(dojo.byId("checkbox_"+D).checked){dojo.byId("tlClipImage_"+D+"_"+E.value).style.display="none";
dojo.byId("auiSummaryMeta_"+D).style.display="none"
}else{dojo.byId("tlClipImage_"+D+"_"+E.value).style.display="";
dojo.byId("auiSummaryMeta_"+D).style.display=""
}};
aipo.timeline.deleteClip=function(B){dojo.byId("tlInputClip_"+B).innerHTML="";
dojo.byId("flag_"+B).value="forbidden"
};
aipo.timeline.submit=function(I,J,G,H,L){var K=dojo.byId("note_"+G);
if(dojo.byId(J+G).style.display=="none"||L>=8){aimluck.io.createSelectFromFileList(I,G);
if(K.value!=K.defaultValue){aimluck.io.submit(I,J,G,H)
}}else{setTimeout(function(){aipo.timeline.submit(I,J,G,H,L+1)
},Math.pow(2,L)*1000)
}};
aipo.timeline.write=function(E,F,D){aipo.timeline.addText(dojo.byId("form"+D),D);
aipo.timeline.addHiddenValue(dojo.byId("form"+D),"mode","insert");
aimluck.io.setHiddenValue(E);
dojo.byId("getTimelineOnClick").innerHTML="true"
};
aipo.timeline.setMinHeight=function(C){var D=0;
if(document.all){D+=(document.documentElement.clientHeight-dojo.byId("message_"+C).getBoundingClientRect().top)
}else{D+=(innerHeight-dojo.byId("message_"+C).getBoundingClientRect().top)
}dojo.byId("message_"+C).style.minHeight=D+"px"
};
aipo.timeline.changeDisplayCallback=function(B){if(dojo.byId("menubar_tlDisplayChanger_"+B).style.display=="none"){dojo.byId("menubar_tlDisplayChanger_"+B).style.display="block"
}else{dojo.byId("menubar_tlDisplayChanger_"+B).style.display="none"
}};
aipo.timeline.changeDisplay=function(B){if(dojo.byId("menubar_tlDisplayChanger_"+B).style.display=="none"){setTimeout(function(){aipo.timeline.changeDisplayCallback(B)
},0)
}else{aipo.timeline.changeDisplayCallback(B)
}};
aipo.timeline.getNewMessage=function(H,E){var G=dojo.byId("newMessage_"+E);
if(G){dojo.style(G,"display","none")
}try{dojo.xhrPost({portletId:E,url:H,content:{lastTimelineId:dojo.byId("last_timelineId_"+E).value},encoding:"utf-8",handleAs:"text",headers:{X_REQUESTED_WITH:"XMLHttpRequest"},load:function(B,C){dojo.query(".message.first").removeClass("first");
if(B.length>0){var A=dojo.byId("timeline_"+E);
var D=document.createElement("div");
D.innerHTML=B;
A.insertBefore(D,A.childNodes[1])
}}})
}catch(F){alert(F)
}};
aipo.timeline.displayIndicator=function(F,H,I,J){dojo.byId("tlDisplayGroup_"+H).innerHTML=dojo.byId("PostName_"+H+"_"+J).innerHTML;
var G=dojo.byId(I+H);
if(G){dojo.style(G,"display","")
}aipo.viewPage(F,H);
G=dojo.byId(I+H)
};
dojo.provide("aipo.page");
aipo.page.onLoadPageDialog=function(C){var D=dojo.byId("page_title");
if(D){D.focus()
}};
aipo.page.onReceiveMessage=function(D){if(!D){var C=dijit.byId("modalDialog");
if(C){C.hide()
}location.href=location
}if(dojo.byId("messageDiv")){dojo.byId("messageDiv").innerHTML=D
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
