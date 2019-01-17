dojo._xdResourceLoaded({depends:[["provide","aipo.calendar.weekly"],["require","aimluck.dnd.Draggable"],["require","aipo.widget.ToolTip"],["require","aipo.widget.MemberNormalSelectList"],["require","aipo.widget.GroupNormalSelectList"]],defineResource:function(B){if(!B._hasResource["aipo.calendar.weekly"]){B._hasResource["aipo.calendar.weekly"]=true;
B.provide("aipo.calendar.weekly");
B.require("aimluck.dnd.Draggable");
B.require("aipo.widget.ToolTip");
B.require("aipo.widget.MemberNormalSelectList");
B.require("aipo.widget.GroupNormalSelectList");
aipo.calendar.objectlist=Array();
aipo.calendar.maximum_to=30;
function A(F,E){return F.className.match(new RegExp("(\\s|^)"+E+"(\\s|$)"))
}function C(F,E){if(!this.hasClass(F,E)){F.className+=" "+E
}}function D(G,E){if(A(G,E)){var F=new RegExp("(\\s|^)"+E+"(\\s|$)");
G.className=G.className.replace(F," ")
}}aipo.calendar.changeDisypayPeriod=function(N,K){var G=B.byId("weeklyHeadRights-"+K).children;
var I=B.byId("weeklyTermRights-"+K).children;
var L=B.byId("weeklyRights-"+K).children;
B.byId("view_type_"+K).value=N;
var M=B.byId("indicateDate_"+K);
if(M==null){return 
}for(var J=0;
J<7;
J++){var F=G[J];
var H=L[J];
var E=I[J];
var O=B.byId("scheduleDivAdd0"+J+"_"+K);
switch(N){case"1":M.innerHTML="<span>1日</span>";
H.className="weeklyRight";
if(J==0){F.className="weeklyHeadRightR weeklyHeadRightborder"+J+"_"+K;
F.style.width="100%";
H.style.width="100%";
E.style.width="100%";
C(E,"weeklyTermRightR");
O.style.width="100%"
}else{F.className="weeklyHeadRight weeklyHeadRightborder"+J+"_"+K;
F.style.width="0%";
F.style.display="none";
H.style.width="0%";
H.style.display="none";
E.style.width="0%";
E.style.display="none";
D(E,"weeklyTermRightR");
O.style.width="0%";
O.style.display="none"
}break;
case"4":M.innerHTML="<span>4日</span>";
if(J==0){D(E,"weeklyTermRightR")
}if(J<=3){F.style.width="25%";
F.style.left=J*25+"%";
F.style.display="";
H.style.width="25%";
H.style.left=J*25+"%";
H.style.display="";
E.style.width="25%";
E.style.left=J*25+"%";
E.style.display="";
O.style.width="25%";
O.style.left=J*25+"%";
O.style.display="";
if(J<3){F.className="weeklyHeadRight weeklyHeadRightborder"+J+"_"+K
}else{if(J==3){F.className="weeklyHeadRightR weeklyHeadRightborder"+J+"_"+K;
H.className="weeklyRightR";
C(E,"weeklyTermRightR")
}}}else{F.className="weeklyHeadRight weeklyHeadRightborder"+J+"_"+K;
F.style.width="0%";
F.style.display="none";
H.style.width="0%";
H.style.display="none";
E.style.width="0%";
E.style.display="none";
D(E,"weeklyTermRightR");
O.style.width="0%";
O.style.display="none"
}break;
case"7":M.innerHTML="<span>7日</span>";
F.style.left=J*(100/7)+"%";
F.style.display="";
F.style.width="14.2857%";
H.style.left=J*(100/7)+"%";
H.style.display="";
H.style.width="14.2857%";
E.style.left=J*(100/7)+"%";
E.style.display="";
E.style.width="14.2857%";
O.style.left=J*(100/7)+"%";
O.style.display="";
O.style.width="14.2857%";
if(J==0){D(E,"weeklyTermRightR")
}if(J<6){F.className="weeklyHeadRight weeklyHeadRightborder"+J+"_"+K;
H.className="weeklyRight";
D(E,"weeklyTermRightR")
}else{F.className="weeklyHeadRightR weeklyHeadRightborder"+J+"_"+K;
H.className="weeklyRightR";
C(E,"weeklyTermRightR")
}}}};
aipo.calendar.populateWeeklySchedule=function(I,J){var G;
var H=B.byId("member_to-"+I);
if(typeof J=="undefined"||typeof ptConfig[I].jsonData=="undefined"){G=""
}else{G=J
}var F=B.byId("secid-"+I);
if(F){G+="&secid="+F.value
}if(G.match(/ign_dup_f/)==null){if(H){var K=H.options;
to_size=K.length;
if(to_size==0){G+="&m_id="+aipo.schedule.login_id;
G+="&m_empty=empty";
B.byId("calender_m_empty_"+I).style.display=""
}else{G+="&m_empty=";
B.byId("calender_m_empty_"+I).style.display="none"
}for(i=0;
i<to_size;
i++){K[i].selected=true;
G+="&m_id="+K[i].value
}}var E=B.byId("showAll-"+I);
if(E){G+="&s_all="+E.value
}}djConfig.usePlainJson=true;
ptConfig[I].reloadFunction=aipo.calendar.populateWeeklySchedule;
ptConfig[I].isTooltipEnable=false;
if(aipo.calendar.dummyDivObj){aipo.calendar.dummyDivObj.destroy();
aipo.calendar.dummyDivObj=null
}if(B.byId("groupselect-"+I).value.indexOf("pickup")!=-1){G+="&pickup=true"
}B.xhrGet({portletId:I,url:ptConfig[I].jsonUrl+G,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(v,n){if(aipo.calendar.reloadMonthlyCalendar!=null){aipo.calendar.reloadMonthlyCalendar()
}obj_error=B.byId("error-"+I);
B.style(obj_error,"display","none");
if("PermissionError"==v[0]){B.style(obj_error,"display","block");
obj_error.innerHTML=v[1];
obj_content=B.byId("content-"+I);
B.style(obj_content,"display","none");
obj_indicator=B.byId("indicator-"+I);
B.style(obj_indicator,"display","none");
return 
}else{if(v.errList){if("duplicate_facility"==v.errList[0]){if(confirm("既に同じ時間帯に設備が予約されています。スケジュールを登録しますか？")){var M=G+"&ign_dup_f=true";
aipo.calendar.populateWeeklySchedule(I,M);
aipo.portletReload("schedule",I);
return 
}}if("UpdateError"==v.errList[0]){B.style(obj_error,"display","block");
obj_error.innerHTML='<ul><li><span class="caution">'+v.errList[1]+"</span></li></ul>";
obj_content=B.byId("content-"+I);
B.style(obj_content,"visibility","visible");
obj_indicator=B.byId("indicator-"+I);
B.style(obj_indicator,"display","none")
}}}var o;
if(!!aipo.calendar.objectlist){var q=aipo.calendar.objectlist.length;
for(o=0;
o<q;
o++){var e=aipo.calendar.objectlist[o];
if(e.portletId==I){e.destroy()
}}}if(!aipo.errorTreatment(v,ptConfig[I].thisUrl)){return 
}ptConfig[I].jsonData=v;
var t=Array(ptConfig[I].scheduleDivDaySum);
for(var o=0;
o<ptConfig[I].scheduleDivDaySum;
o++){t[o]=Array()
}var U=0;
var u=0;
var V=0;
var b="";
var W="";
var l="";
var S="";
var d=[];
var c,a,Z,Y;
var r=v.startDate.substring(0,4)+"年"+parseInt(v.startDate.substring(5,7),10)+"月"+parseInt(v.startDate.substring(8,10),10)+"日"+v.dayOfWeek[0];
B.byId("viewWeekly-"+I).innerHTML=r;
var L="";
var m="";
var Q=B.byId("top_form_"+this.portletId).value=="simple";
var g=B.byId("view_type_"+this.portletId).value=="1";
var T=B.byId("view_type_"+this.portletId).value=="4";
var p=window.navigator.userAgent.toLowerCase().indexOf("ipad")>=0;
if(Q&&g){L="width: 100%;";
m="width: 0%;display: none;"
}l+='<table id="termTable_'+this.portletId+'" style="width:100%;" cellspacing="0" cellpadding="0" border="0"><tbody>';
var h=B.byId("weeklyScrollPane_"+this.portletId);
B.forEach(v.termSchedule,function(w){var x="";
var AB="";
if(Q&&(g||T)){x=' style="display: none;"';
V++;
for(k=0;
k<w.length;
k++){z=w[k];
if(z.index==0||(Q&&T&&z.index<4)){x="";
AB=" weeklyTermRightR";
V--;
break
}}}var z=null;
var y=scheduleTooltipEnable!==true&&Q&&g?"border-right:0":"";
if(scheduleTooltipEnable!==true&&Q&&g){l+="<tr"+x+'><td colspan="2" nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}else{l+="<tr"+x+'><td nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}if(Q&&T){l+='<div class="_weeklyHeadRightborder0_'+I+" weeklyTermRight weeklyTermRightL"+AB+'" id="termDay0-'+u+"-"+I+'" style="width: 25%;left: 0%;'+L+y+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder1_'+I+' weeklyTermRight" id="termDay1-'+u+"-"+I+'" style="width: 25%;left: 25%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder2_'+I+' weeklyTermRight" id="termDay2-'+u+"-"+I+'" style="width: 25%;left: 50%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder3_'+I+' weeklyTermRight weeklyTermRightR" id="termDay3-'+u+"-"+I+'" style="width: 25%;left: 75%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder4_'+I+' weeklyTermRight" id="termDay4-'+u+"-"+I+'" style="left: 57.1429%;display:none;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder5_'+I+' weeklyTermRight" id="termDay5-'+u+"-"+I+'" style="left: 71.4286%;display:none;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder6_'+I+' weeklyTermRight weeklyTermRightR" id="termDay6-'+u+"-"+I+'" style="left: 85.7143%;display:none;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
S+='<div id="termScheduleItemGarage-'+u+"-"+I+'" class="weeklyTermRights" style="top:'+(-(17*(u-V+1)))+'px"> </div>'
}else{l+='<div class="_weeklyHeadRightborder0_'+I+" weeklyTermRight weeklyTermRightL"+AB+'" id="termDay0-'+u+"-"+I+'" style="left: 0%;'+L+y+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder1_'+I+' weeklyTermRight" id="termDay1-'+u+"-"+I+'" style="left: 14.2857%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder2_'+I+' weeklyTermRight" id="termDay2-'+u+"-"+I+'" style="left: 28.5714%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder3_'+I+' weeklyTermRight" id="termDay3-'+u+"-"+I+'" style="left: 42.8571%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder4_'+I+' weeklyTermRight" id="termDay4-'+u+"-"+I+'" style="left: 57.1429%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder5_'+I+' weeklyTermRight" id="termDay5-'+u+"-"+I+'" style="left: 71.4286%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
l+='<div class="_weeklyHeadRightborder6_'+I+' weeklyTermRight weeklyTermRightR" id="termDay6-'+u+"-"+I+'" style="left: 85.7143%;'+m+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
S+='<div id="termScheduleItemGarage-'+u+"-"+I+'" class="weeklyTermRights" style="top:'+(-(17*(u-V+1)))+'px"> </div>'
}var AA;
l+="</div></td></tr>";
u++
});
l+="</tbody></table>";
B.byId("termScheduleGarage-"+I).innerHTML=l;
B.byId("termScheduleDivAdd_"+I).style.height=(17*(u-V+1))+"px";
B.byId("termScheduleDivAdd_"+I).style.top=(-(17*(u-V+1)))+"px";
B.byId("termScheduleContainer-"+I).innerHTML=S;
B.byId("weeklyTermLeftTopTall-"+I).style.height=(17*(u-V))+"px";
for(var o=0;
o<ptConfig[I].scheduleDivDaySum;
o++){c=B.byId("weeklyDay"+o+"-"+I);
a=B.byId("weeklyHoliday"+o+"-"+I);
Z=B.byId("weeklyRight"+o+"-"+I);
Y=B.byId("termDay"+o+"-"+I);
c.innerHTML=parseInt(v.date[o].substring(8,10),10)+v.dayOfWeek[o];
a.innerHTML=v.holiday[o];
if(v.dayOfWeek[o]=="（土）"){B.addClass(c,"saturday");
B.addClass(a,"saturday");
B.addClass(Z,"saturday");
B.addClass(Y,"saturday")
}else{B.removeClass(c,"saturday");
B.removeClass(a,"saturday");
B.removeClass(Z,"saturday");
B.removeClass(Y,"saturday")
}if(v.dayOfWeek[o]=="（日）"){B.addClass(c,"sunday");
B.addClass(a,"sunday");
B.addClass(Z,"sunday");
B.addClass(Y,"sunday")
}else{B.removeClass(c,"sunday");
B.removeClass(a,"sunday");
B.removeClass(Z,"sunday");
B.removeClass(Y,"sunday")
}if(v.holiday[o]){B.addClass(c,"holiday");
B.addClass(a,"holiday");
B.addClass(Z,"holiday");
B.addClass(Y,"holiday")
}else{B.removeClass(c,"holiday");
B.removeClass(a,"holiday");
B.removeClass(Z,"holiday");
B.removeClass(Y,"holiday")
}}B.forEach(v.schedule,function(AM){var w=ptConfig[I].rowHeight;
var AI=AM.startDateHour*w*2+AM.startDateMinute*w/30;
var AL=AM.endDateHour*w*2+AM.endDateMinute*w/30-AI;
if(AL<=w){d[U]=AL;
AL=w
}else{d[U]=-1
}var AB=100/ptConfig[I].scheduleDivDaySum*AM.index;
var z=100/ptConfig[I].scheduleDivDaySum*0.99;
var x=AM.name;
var AA=d[U]==-1?((AM.startDateHour>9)?AM.startDate:"0"+AM.startDate):AM.name;
var AG=d[U]==-1?((AM.endDateHour>9)?AM.endDate:"0"+AM.endDate):"";
var AF=d[U]==-1?"-":"";
var AH=AM.scheduleId;
var AJ="0";
var AC="";
var y=B.byId("member_to-"+I);
if(y){var AD=y.options;
for(o=0;
o<AD.length;
o++){if(((AM.type=="U")&&(AM.ownerId==AD[o].value))||((AM.type=="F")&&(AM.ownerId==AD[o].value))){AJ=o%aipo.calendar.maximum_to
}if(AM.memberList){var AE=0;
var AK=0;
for(j=0;
j<AM.memberList.length;
j++){if(AM.memberList[j].charAt(0)=="f"){AK++
}else{AE++
}}}}var AC;
if(AM.userCount>1){AC="[共有]"
}if(AM.facilityCount>0){AC+="[設備]"
}}if(!AM["public"]){x+='<img src="images/schedule/schedule_secret.gif" border="0" width="16" height="16" alt="非公開" title="非公開" align="top" class="icon" />'
}if(AM.duplicate){x+='<img src="images/schedule/schedule_duplicate.gif" border="0" width="16" height="16" alt="重複スケジュール" title="重複スケジュール" align="top" class="icon" />'
}if(AM.repeat){x+='<img src="images/schedule/schedule_repeat.gif" border="0" width="16" height="16" alt="繰り返し" title="繰り返し" align="top" class="icon" />'
}if(AM.tmpreserve){x+='<img src="images/schedule/schedule_tmpreserve.gif" border="0" width="16" height="16" alt="仮スケジュール" title="仮スケジュール" align="top" class="icon" />'
}b+='<div id="schedule-'+U+"-"+I+'" class="scheduleDiv color'+AJ+'" style="top: '+AI+"px; left: "+AB+"%; height: "+(AL-1)+"px; width: "+z+'%; z-index: 0; visibility: hidden;"><div class="scheduleDivFirstLine color'+AJ+'"><span id="scheduleDivStartTime-'+U+"-"+I+'" class="scheduleDivTime color'+AJ+'">'+AC+AA+'</span><span id="scheduleDivSepalater-'+U+"-"+I+'"  class="scheduleDivSepalater color'+AJ+'">'+AF+'</span><span id="scheduleDivEndTime-'+U+"-"+I+'" class="scheduleDivTime color'+AJ+'">'+AG+'</span></div><div class="scheduleDivName color'+AJ+'">'+x+'</div><div class="scheduleDivLastLine color'+AJ+'"><center><div class="handleDiv color'+AJ+'" align="center">&nbsp;</div></center></div></div>';
U++
});
b+='<div id="dummy_div_'+I+'" class="scheduleDivAdd dummy_div" style=" position:absolute; width: 0px; height : 0px; left: 0px; top: -10000px; Filter: Alpha(Opacity=10);opacity:.10; background-color:#FFFFFF; ">&nbsp;</div>';
B.byId("scheduleGarage-"+I).innerHTML=b;
var s=null;
var R,P;
var X=[];
U=0;
B.forEach(v.schedule,function(x){R=B.byId("schedule-"+U+"-"+I);
var w=x.scheduleId;
s=new aipo.calendar.WeeklyScheduleDraggable(R,{pid:I,sid:'"schedule-'+U+"-"+I+'"',handle:'"dummy_div_-'+I+'"'});
aipo.calendar.objectlist.push(s);
if(x.member||x.loginuser||x.owner||x["public"]){s.setDraggable(true)
}else{s.setDraggable(false)
}s.schedule=x;
s.tmpIndex=x.index;
s.count=U;
s.tmpHeight=d[U];
s.position=0;
s.division=1;
s.portletId=I;
t[x.index].push(R);
if(x["public"]||x.member){B.connect(R,"onclick",s,"onScheduleClick")
}B.connect(R,"onmouseover",s,"onScheduleOver");
U++
});
for(var o=0;
o<ptConfig[I].scheduleDivDaySum;
o++){aipo.calendar.relocation(I,t[o].length,t[o],100/ptConfig[I].scheduleDivDaySum*o);
t[o]=Array()
}U=0;
u=0;
B.forEach(v.termSchedule,function(AF){var AK=null;
W="";
for(var AE=0;
AE<ptConfig[I].scheduleDivDaySum;
AE++){tmpNode5=B.byId("termDay"+AE+"-"+u+"-"+I);
if(v.dayOfWeek[AE]=="（土）"){B.addClass(tmpNode5,"saturday")
}else{B.removeClass(tmpNode5,"saturday")
}if(v.dayOfWeek[AE]=="（日）"){B.addClass(tmpNode5,"sunday")
}else{B.removeClass(tmpNode5,"sunday")
}if(v.holiday[AE]){B.addClass(tmpNode5,"holiday")
}else{B.removeClass(tmpNode5,"holiday")
}}for(k=0;
k<AF.length;
k++){AK=AF[k];
if(Q&&T){var AH=AK.rowspan;
if(AK.rowspan+AK.index>4){AH=AH-(AK.rowspan+AK.index-4)
}var y=25*AH;
var AA=25*AK.index;
if(AK.index>4){y=0
}}else{var y=100/ptConfig[I].scheduleDivDaySum*AK.rowspan;
var AA=100/ptConfig[I].scheduleDivDaySum*AK.index
}var z="";
if(Q&&g){y=100;
z=((AK.index==0)?"":"display: none;")
}var w=AK.name;
var AG=AK.scheduleId;
var AI="0";
var AB="";
var x=B.byId("member_to-"+I);
if(x){var AC=x.options;
for(AE=0;
AE<AC.length;
AE++){if(((AK.type=="U")&&(AK.ownerId==AC[AE].value))||((AK.type=="F")&&(AK.ownerId==AC[AE].value))){AI=AE%aipo.calendar.maximum_to
}if(AK.memberList){var AD=0;
var AJ=0;
for(j=0;
j<AK.memberList.length;
j++){if(AK.memberList[j].charAt(0)=="f"){AJ++
}else{AD++
}}}}var AB;
if(AD>1){AB="[共有]"
}if(AJ>0){AB+="[設備]"
}}if(!AK["public"]){w+='<img src="images/schedule/schedule_secret.gif" border="0" width="16" height="16" alt="非公開" title="非公開" align="top" class="icon" />'
}if(AK.duplicate){w+='<img src="images/schedule/schedule_duplicate.gif" border="0" width="16" height="16" alt="重複スケジュール" title="重複スケジュール" align="top" class="icon" />'
}if(AK.repeat){w+='<img src="images/schedule/schedule_repeat.gif" border="0" width="16" height="16" alt="繰り返し" title="繰り返し" align="top" class="icon" />'
}if(AK.tmpreserve){w+='<img src="images/schedule/schedule_tmpreserve.gif" border="0" width="16" height="16" alt="仮スケジュール" title="仮スケジュール" align="top" class="icon" />'
}if(y==100){y="99.99999"
}W+='<div id="termSchedule-'+U+"-"+I+'" class="termScheduleDiv termColor'+AI+'" style="left: '+AA+"%; width: "+y+"%;"+z+'"><div class="termScheduleDivHandleLeft" id="termScheduleDivHandleLeft-'+U+"-"+I+'">&nbsp;</div><div class="termScheduleDivNameDiv">'+AB+w+'</div><div class="termScheduleDivHandleRight" id="termScheduleDivHandleRight-'+U+"-"+I+'">&nbsp;</div></div>';
U++
}B.byId("termScheduleItemGarage-"+u+"-"+I).innerHTML=W;
u++
});
tableLeft=B.byId("weeklyTermLeft_"+I);
s=null;
U=0;
u=0;
B.forEach(v.termSchedule,function(w){var y=null;
for(k=0;
k<w.length;
k++){y=w[k];
var x=y.scheduleId;
R=B.byId("termSchedule-"+U+"-"+I);
P=B.byId("termScheduleDivHandleLeft-"+U+"-"+I);
draggable3=B.byId("termScheduleDivHandleRight-"+U+"-"+I);
s=new aipo.calendar.WeeklyTermScheduleDraggable(R,{pid:I,sid:"termSchedule-"+U+"-"+I});
aipo.calendar.objectlist.push(s);
s.schedule=y;
s.scheduleNode=R;
s.portletId=I;
s.termType="center";
B.connect(R,"onclick",s,"onScheduleClick");
R.style.zIndex=1;
if(y.indexReal>=0){tmpDraggable2=new aipo.calendar.WeeklyTermScheduleDraggable(P,{pid:I,sid:"termScheduleDivHandleLeft-"+U+"-"+I});
aipo.calendar.objectlist.push(tmpDraggable2);
tmpDraggable2.schedule=y;
tmpDraggable2.scheduleNode=R;
tmpDraggable2.portletId=I;
tmpDraggable2.termType="left";
if(y.member||y.loginuser||y.owner||y["public"]){tmpDraggable2.setDraggable(true)
}else{tmpDraggable2.setDraggable(false)
}}else{B.style(P,"cursor","pointer");
P.style.zIndex=1
}B.connect(P,"onclick",s,"onScheduleClick");
if(y.indexReal+y.colspanReal<=ptConfig[I].scheduleDivDaySum){tmpDraggable3=new aipo.calendar.WeeklyTermScheduleDraggable(draggable3,{pid:I,sid:"termScheduleDivHandleRight-"+U+"-"+I});
aipo.calendar.objectlist.push(tmpDraggable3);
tmpDraggable3.schedule=y;
tmpDraggable3.scheduleNode=R;
tmpDraggable3.portletId=I;
tmpDraggable3.termType="right";
if(y.member||y.loginuser||y.owner||y["public"]){tmpDraggable3.setDraggable(true)
}else{tmpDraggable3.setDraggable(false)
}}else{B.style(draggable3,"cursor","pointer");
draggable3.style.zIndex=1
}B.connect(draggable3,"onclick",s,"onScheduleClick");
B.connect(R,"onmouseover",s,"onScheduleOver");
if(y.member||y.loginuser||y.owner||y["public"]){s.setDraggable(true)
}else{s.setDraggable(false)
}U++
}u++
});
obj_content=B.byId("content-"+I);
B.style(obj_content,"visibility","visible");
obj_indicator=B.byId("indicator-"+I);
B.style(obj_indicator,"display","none");
B.removeClass(B.byId("tableWrapper_"+I),"hide");
var h=B.byId("weeklyScrollPane_"+I);
if((h.clientWidth==h.offsetWidth)&&!(p&&!Q)){if(B.byId("weeklySpan-"+I)!=null){B.byId("weeklySpan-"+I).style.display="none"
}B.query(".weeklyTermTailTd_"+I).style("display","none");
if(B.byId("termTable_"+I)!=null){B.query("termTable_"+I).style("width","99.9999%")
}if(Q&&g){B.query(".weeklyHeadRightborder0_"+I).style("border-right-style","none");
B.query("._weeklyHeadRightborder0_"+I).style("border-right-style","none");
B.byId("weeklyRight0-"+I).style.borderRightStyle="";
if(p){if(B.byId("weeklyRight0-"+I).className.indexOf("sunday")>=0||B.byId("weeklyRight0-"+I).className.indexOf("saturday")>=0){B.query(".scroll_width").style("padding-right","1px")
}else{B.query(".scroll_width").style("padding-right","0px")
}B.query(".weeklyTableHead").style("padding-right","1px")
}else{B.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(Q&&T){if(p){B.query(".weeklyTableHead").style("padding-right","0px");
B.query(".scroll_width").style("padding-right","0px")
}else{B.byId("weeklyRight3-"+I).style.borderRightStyle="none";
B.query(".weeklyHeadRightborder3_"+I).style("border-right-style","none");
B.query("._weeklyHeadRightborder3_"+I).style("border-right-style","none");
B.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(p){B.query(".scroll_width").style("padding-right","0px");
B.query(".weeklyTableHead").style("padding-right","0px")
}else{if(window.navigator.userAgent.toLowerCase().indexOf("chrome")>=0&&(B.byId("weeklyRight6-"+I).className.indexOf("sunday")>=0||B.byId("weeklyRight6-"+I).className.indexOf("saturday"))>=0){B.query(".scroll_width").style("padding-right","1px");
B.query(".weeklyTableHead").style("padding-right","1px")
}else{B.query(".scroll_width").style("padding-right","0px");
B.query(".weeklyTableHead").style("padding-right","0px")
}B.byId("weeklyRight6-"+I).style.borderRightStyle="none";
B.query(".weeklyHeadRightborder6_"+I).style("border-right-style","none");
B.query("._weeklyHeadRightborder6_"+I).style("border-right-style","none")
}}}}else{if(h.clientWidth!=h.offsetWidth&&h.offsetWidth-h.clientWidth!=18){if(B.byId("weeklySpan-"+I)!=null){B.byId("weeklySpan-"+I).width=(h.offsetWidth-h.clientWidth+1)+"px"
}B.query(".weeklyTermTailTd_"+I).width=(h.offsetWidth-h.clientWidth+1)+"px";
B.query(".weeklyTermTail").style("width",((h.offsetWidth-h.clientWidth+1)+"px"))
}}if(u==0){B.byId("termScheduleContainer-"+I).style.height="0px"
}else{}B.byId("weeklyTableHead_"+I).style.marginTop="5px";
var O=B.byId("weeklyTableHead_"+I).offsetHeight;
var f=B.byId("weeklyTermTr_"+I).offsetHeight;
O+=5;
O-=f;
f-=f%17;
O+=f;
B.byId("weeklyTableHeadWrapper_"+I).style.overflow="hidden";
B.byId("weeklyTableHeadWrapper_"+I).style.height=O+"px";
if(u>0){var N=0;
for(N=0;
N<7;
N++){if(B.byId("termDay"+N+"-"+(u-1)+"-"+I).className.indexOf("sunday")>=0||B.byId("termDay"+N+"-"+(u-1)+"-"+I).className.indexOf("saturday")>=0){B.byId("termDay"+N+"-"+(u-1)+"-"+I).style.height="95%"
}}}if(!ptConfig[I].isScroll){B.byId("weeklyScrollPane_"+I).scrollTop=ptConfig[I].contentScrollTop;
ptConfig[I].isScroll=true
}ptConfig[I].isTooltipEnable=true
}})
};
aipo.calendar.relocation=function(F,E,W,X){var S,R;
var V=0.99;
var N=100/7;
var U=0;
var M=0;
var K=0;
var J=0;
var L=new Array(E);
var G=new Array(E);
var T=new Array(E);
var O=1;
var P=0;
if(B.byId("view_type_"+F).value=="1"&&B.byId("top_form_"+F).value=="simple"){O=7.2
}else{if(B.byId("view_type_"+F).value=="4"){O=1.75;
if(X>57){X=100
}}}W.sort(aipo.calendar.sortByRegion);
for(S=0;
S<E;
S++){W[S].style.zIndex=S+1
}for(S=0;
S<E;
S=U){U=aipo.calendar.overlapSchedule(W,S,S,++U,E);
if(K<parseInt(B.getComputedStyle(W[S]).top)){J=S;
K=parseInt(B.getComputedStyle(W[J]).top);
M=0
}for(R=J;
R<U;
R++){var I=parseInt(B.getComputedStyle(W[R]).top)+parseInt(B.getComputedStyle(W[R]).height)
}if(K<I){K=I
}for(R=J;
R<U;
R++){G[R]=aipo.calendar.positionLeft(W,G,J,R,0);
if(G[R]>M){M=G[R]
}}for(R=J;
R<U;
R++){T[R]=aipo.calendar.positionRight(W,G,M,J,R)
}for(R=J;
R<U;
R++){L[R]=M
}}for(S=0;
S<E;
S++){var Q;
var H;
if(L[S]!=0){if(G[S]<G[S+1]){Q=(N*2/(L[S]+1))*0.8*V*O
}else{if(T[S]==0){Q=(N-(N/(L[S]+1))*G[S])*V*O
}else{Q=(N-(N/(L[S]+1))*G[S]-(N*2/(L[S]+1))*0.2-(N/(L[S]+1))*(T[S]-1))*V*O
}}}else{Q=N*V*O
}H=(X+((N/(L[S]+1))*G[S]))*O;
if(H+Q>100){Q=100
}B.style(W[S],"width",Q+"%");
B.style(W[S],"left",H+"%");
B.style(W[S],"visibility","visible")
}};
aipo.calendar.overlapSchedule=function(H,F,L,K,G){var J=parseInt(B.getComputedStyle(H[F]).top)+parseInt(B.getComputedStyle(H[F]).height);
var I=parseInt(B.getComputedStyle(H[L]).top)+parseInt(B.getComputedStyle(H[L]).height);
var E;
if(H[K]){E=parseInt(B.getComputedStyle(H[K]).top)
}else{E="NaN"
}if((K>G-1)||(J<E)||(I<E)){return K
}else{K=aipo.calendar.overlapSchedule(H,F,K,++K,G)
}K=aipo.calendar.overlapSchedule(H,F,L,K,G);
return K
};
aipo.calendar.positionLeft=function(J,I,L,K,F){var E=parseInt(B.getComputedStyle(J[K]).top);
for(i=L;
i<K;
i++){var H=parseInt(B.getComputedStyle(J[i]).top);
var G=H+parseInt(B.getComputedStyle(J[i]).height);
if((H<=E)&&(G>E)&&(I[i]==F)){F=aipo.calendar.positionLeft(J,I,L,K,++F)
}}return F
};
aipo.calendar.positionRight=function(E,I,K,H,L){var J=0;
var G=parseInt(B.getComputedStyle(E[L]).top);
for(i=H;
i<L;
i++){var F=parseInt(B.getComputedStyle(E[i]).top);
var M=F+parseInt(B.getComputedStyle(E[i]).height);
if((F<=G)&&(M>G)&&(I[i]>I[L])&&((K-I[i]+1)>J)){J=K-I[i]+1
}}return J
};
aipo.calendar.sortByRegion=function(G,F){var J=parseInt(B.getComputedStyle(G).top);
var I=parseInt(B.getComputedStyle(F).top);
var E=J+parseInt(B.getComputedStyle(G).height);
var H=E+parseInt(B.getComputedStyle(F).height);
if(J==I){return H-E
}else{return J-I
}};
aipo.calendar.getDate=function(E,F){tmpYear=parseInt(E.substring(0,4),10);
tmpMonth=parseInt(E.substring(5,7),10);
tmpDay=parseInt(E.substring(8,10),10);
if(F>0){do{tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
if(tmpDay+F<=tmpMonthDays){tmpDay=tmpDay+F;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}F=-1
}else{F=F-(tmpMonthDays-tmpDay)-1;
if(tmpMonth==12){tmpYear++;
tmpMonth=1
}else{tmpMonth++
}tmpDay=1
}}while(F>=0)
}else{if(F<0){do{if(tmpDay+F>0){tmpDay=tmpDay+F;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}F=1
}else{if(tmpMonth==1){tmpYear--;
tmpMonth=12
}else{tmpMonth--
}tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
F=F+tmpDay;
tmpDay=tmpMonthDays
}}while(F<=0)
}else{date=E
}}return date
};
aipo.calendar.getDay=function(E,F){if(F==2){if(!(E%4)&&((E%100)||!(E%400))){return 29
}else{return 28
}}else{if(F==4||F==6||F==9||F==11){return 30
}else{return 31
}}};
aipo.calendar.setGridArray=function(G,F){var E=0;
if(aipo.calendar.gridArray){delete (aipo.calendar.gridArray)
}aipo.calendar.gridArray=new Array(F);
for(i=0;
i<F;
i++){E=B._abs(B.byId("weeklyDay"+i+"-"+G),true).x;
aipo.calendar.gridArray[i]=E
}};
aipo.calendar.getCurrentMouseX=function(H,I){if(aipo.calendar.gridArray==null){return{index:-1,x:0}
}var F=aipo.calendar.gridArray[0];
var K=0;
var G;
if(I.pageX>F){var E=parseInt(aipo.calendar.gridArray.length)-1;
if(B.byId("view_type_"+H)&&B.byId("top_form_"+H).value=="simple"){E=parseInt(B.byId("view_type_"+H).value)-1
}for(G=E;
G>-1;
G--){if(I.pageX>aipo.calendar.gridArray[G]){K=G;
break
}}}else{K=0
}var J=aipo.calendar.gridArray[K]-F;
return{index:K,x:J}
};
aipo.calendar.onCloseMemberpicker=function(E){aipo.calendar.populateWeeklySchedule(E)
};
aipo.calendar.showTooltip=function(H,J,E){var I="";
var F="";
var G="";
var L="";
var K=function(N){var M=function(O){switch(O){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(N).replace(/[<>&"']/g,M)
};
B.style(E,"display","block");
B.xhrGet({portletId:J,url:H,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(R,P){if(!R.id){B.style(E,"display","none");
return 
}if(!R.isSpan){I='<span style="font-size: 0.90em;">'+R.date+"</span><br/>"
}if(R.memberList){var O=R.memberList.length;
for(var M=0;
M<O;
M++){F+="<li>"+K(R.memberList[M].aliasName.value)+"</li>"
}}if(R.facilityList){var N=R.facilityList.length;
for(var M=0;
M<N;
M++){G+="<li>"+K(R.facilityList[M].facilityName.value)+"</li>"
}}if(R.place!=""){L='<span style="font-size: 0.90em;">場所</span><br/><ul><li>'+R.place+"</li></ul>"
}if(F!=""){F='<span style="font-size: 0.90em;">参加者</span><br/><ul>'+F+"</ul>"
}if(G!=""){G='<span style="font-size: 0.90em;">設備</span><br/><ul>'+G+"</ul>"
}var Q="<h4>"+R.name+"</h4>"+I+F+G+L;
E.innerHTML=Q
}})
};
B.declare("aipo.calendar.DummyDivObject",null,{portletId:null,parentnode:null,draggable:null,TooltipObject:null,constructor:function(E,F){this.portletId=F.pid;
this.parentnode=F.node;
this.node=B.byId(E);
this.events=[B.connect(this.node,"onmousedown",this,"onMouseDown"),B.connect(this.node,"onmouseover",this,"onMouseOver")]
},onMouseDown:function(E){this.hide();
if(this.parentnode==null||this.parentnode=="undefined"){return 
}if(this.draggable){this.draggable.onMouseDown(E)
}},onMouseOver:function(E){if(this.parentnode==null||this.parentnode=="undefined"){return 
}},destroy:function(){B.forEach(this.events,B.disconnect);
this.events=this.node=this.handle=null
},hide:function(){B.marginBox(this.node,{l:0,t:-10000,w:0,h:0})
}});
B.declare("aipo.calendar.WeeklyScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,isResize:false,distance:3,lastScroll:0,onFirstMove:function(F){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}var H=B.clone(this.node);
H.id="schedule-dummy-"+this.portletId;
H.style.zIndex=998;
B.style(H,"opacity",0);
var G=B.byId("scheduleGarage-"+this.portletId);
G.appendChild(H);
this.tmpDraggable=H;
B.connect(this.node,"onmousedown",this,"onMouseDown");
if(B.isIE){document.onkeydown=function(I){B.style(H,"opacity",0.3)
};
document.onkeyup=function(I){B.style(H,"opacity",0)
}
}else{B.connect(null,"onkeydown",this,"onKeyPress");
B.connect(null,"onkeyup",this,"onKeyPress")
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
B.style(this.node,"opacity",0.5);
this.node.style.zIndex=999;
this.startY=this._pageY;
this.startAbsoluteY=B._abs(B.byId(this.node),true).y;
var E=window.navigator.userAgent.toLowerCase();
if(E.indexOf("chrome")>-1||(B.isFF&&(B.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(E.indexOf("safari")>-1){this.startAbsoluteY-=B.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}this.startHeight=parseInt(B.getComputedStyle(this.node).height);
this.startTop=parseInt(B.getComputedStyle(this.node).top);
if(this.startHeight-6<this.startY-this.startAbsoluteY){this.isResize=true
}aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
lastScroll=B.byId("weeklyScrollPane_"+this.portletId).scrollTop
},onKeyPress:function(E){if(E.ctrlKey){B.style(this.tmpDraggable,"opacity",0.3)
}else{B.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(L){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
if(this.dragSource.tmpHeight>3){B.style(this.node,"height",this.dragSource.tmpHeight+"px");
this.dragSource.tmpHeight=3
}var E=ptConfig[this.portletId].distance;
var G=B.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
this.leftTop.t=Math.floor((this.leftTop.t+G)/E)*E;
if(this.isResize){if(-this.startTop+this.leftTop.t+this.startHeight<0){B.style(this.node,"height","0px");
this.leftTop.t+=this.startHeight
}else{var N;
if(this.leftTop.t+this.startHeight>864){N=864-this.startTop-3
}else{N=-this.startTop+this.leftTop.t+this.startHeight
}this.leftTop.t=this.startTop;
this.leftTop.h=parseInt(N)-1
}}else{if(!this.disableY){if(this.leftTop.t<0){this.leftTop.t=0
}if(this.leftTop.t+this.startHeight>864){this.leftTop.t=864-this.startHeight-6
}}}if(!this.disableX){mouseX=aipo.calendar.getCurrentMouseX(this.portletId,L);
this.leftTop.l=mouseX.x;
this.dragSource.schedule.index=mouseX.index
}B.marginBox(this.node,this.leftTop);
var M=parseInt(B.getComputedStyle(this.node).top);
var K=parseInt(B.getComputedStyle(this.node).height)+1;
var J=M/E;
var I=Math.floor(J/12);
var H=Math.floor(J%12);
I=(I>9)?I:"0"+I;
H=(H>1)?H*(60/12):"0"+H*(60/12);
var F=this.dragSource.count;
B.byId("scheduleDivStartTime-"+F+"-"+this.portletId).innerHTML=I+":"+H;
this.dragSource.schedule.startDateHour=I;
this.dragSource.schedule.startDateMinute=H;
this.dragSource.schedule.startDate=I+":"+H;
J+=K/E;
I=Math.floor(J/12);
H=Math.floor(J%12);
I=(I>9)?I:"0"+I;
H=(H>1)?H*(60/12):"0"+H*(60/12);
B.byId("scheduleDivEndTime-"+F+"-"+this.portletId).innerHTML=I+":"+H;
this.dragSource.schedule.endDateHour=I;
this.dragSource.schedule.endDateMinute=H;
this.dragSource.schedule.endDate=I+":"+H;
B.byId("scheduleDivSepalater-"+F+"-"+this.portletId).innerHTML="-";
return 
},onMouseUp:function(F){ptConfig[this.portletId].isTooltipEnable=true;
if(B.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){B.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var E=parseInt(B.getComputedStyle(this.node).height);
if(E<ptConfig[this.portletId].rowHeight){B.style(this.node,"height",ptConfig[this.portletId].rowHeight+"px");
this.dragSource.tmpHeight=E
}else{this.dragSource.tmpHeight=-1
}var G="";
if(F.ctrlKey){G+="&mode=insert"
}else{G+="&mode=update"
}G+="&entityid="+this.dragSource.schedule.scheduleId;
G+="&view_start="+ptConfig[this.portletId].jsonData.date[0].substring(0,10);
if(this.dragSource.schedule.repeat){G+="&edit_repeat_flag=1";
G+="&view_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.tmpIndex].substring(0,10)
}G+="&start_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.startDateHour+"-"+this.dragSource.schedule.startDateMinute;
G+="&end_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.endDateHour+"-"+this.dragSource.schedule.endDateMinute;
aipo.calendar.populateWeeklySchedule(this.portletId,G);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this.dragSource.destroy()
}});
B.declare("aipo.calendar.WeeklyScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleDragMoveObject,isDraggable:false,scheduleObjId:null,constructor:function(E,F){this.scheduleObjId=F.sid
},onMouseDown:function(E){ptConfig[this.portletId].isTooltipEnable=false;
if(!!aipo.calendar.dummyDivObj&&!!aipo.calendar.dummyDivObj.TooltipObject){aipo.calendar.dummyDivObj.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(F){if(this.schedule.isDrag||!this.isDraggable){return 
}var E=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+E,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(B.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(E){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(E)
}},setupTooltip:function(G){var E=this.schedule.scheduleId;
var F=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(H,J){var I=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+F+"&scheduleid="+E;
aipo.calendar.showTooltip(I,this.portletId,H)
});
this.TooltipObject._onHover(G)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(E){this.isDraggable=E
}});
B.declare("aipo.calendar.WeeklyTermScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{positionFrom:-1,positionTo:-1,moveIndex:0,onFirstMove:function(E){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
B.style(this.node,"opacity",0.5);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
var G=B.clone(this.node);
G.id="schedule-dummy-"+this.portletId;
G.style.zIndex=998;
B.style(G,"opacity",0);
var F=B.byId(this.node.parentNode.id);
F.appendChild(G);
this.tmpDraggable=G;
if(B.isIE){document.onkeydown=function(H){B.style(G,"opacity",0.3)
};
document.onkeyup=function(H){B.style(G,"opacity",0)
}
}else{B.connect(null,"onkeydown",this,"onKeyPress");
B.connect(null,"onkeyup",this,"onKeyPress")
}},onKeyPress:function(E){if(E.ctrlKey){B.style(this.tmpDraggable,"opacity",0.3)
}else{B.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(K){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
var E=ptConfig[this.portletId].distance;
var P=(B.byId("view_type_"+this.portletId)&&B.byId("top_form_"+this.portletId)&&B.byId("top_form_"+this.portletId).value=="simple")?B.byId("view_type_"+this.portletId).value:ptConfig[this.portletId].scheduleDivDaySum;
var J=aipo.calendar.getCurrentMouseX(this.portletId,K);
_tmpIndex=J.index;
if(!this.disableX){var H=this.dragSource.schedule;
var L=this.dragSource.termType;
var N=this.dragSource.scheduleNode;
var M,G;
if(L=="center"){if(this.positionFrom==-1&&_tmpIndex!=-1){this.positionFrom=_tmpIndex;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
G=H.indexReal+this.moveIndex;
M=H.colspanReal;
var O=P;
if(M+G>O){if(G<0){M=O
}else{M=O-G
}}else{if(G<0){M=M+G
}}if(G<0){G=0
}}else{if(L=="left"){if(this.positionFrom==-1){this.positionFrom=H.index;
this.positionTo=H.index
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
if(this.positionTo>=this.positionFrom+H.colspanReal){G=H.indexReal+H.rowspan-1;
M=this.positionTo-this.positionFrom-H.colspanReal+2
}else{G=this.positionTo;
M=H.rowspan+this.positionFrom-this.positionTo
}}else{if(this.positionFrom==-1){this.positionFrom=H.index;
this.positionTo=H.index
}if(this.positionTo!=-1&&_tmpIndex!=-1&&this._tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-H.index-H.rowspan+this.positionTo+1;
if(this.positionTo<=this.positionFrom){G=this.positionTo;
M=this.positionFrom-this.positionTo+1
}else{G=H.index;
M=this.positionTo-H.index+1
}}}var F=100/P*M;
var I=100/P*G;
B.style(N,"left",I+"%");
B.style(N,"width",F+"%")
}},onMouseUp:function(I){ptConfig[this.portletId].isTooltipEnable=true;
if(B.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){B.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var F=this.dragSource.schedule;
var L=ptConfig[this.portletId].jsonData.date[0].substring(0,10);
var G=this.dragSource.termType;
var K=this.dragSource.scheduleNode;
var E,H;
if(B.byId("top_form_"+this.portletId).value=="simple"){E=ptConfig[this.portletId].jsonData.date[0];
H=ptConfig[this.portletId].jsonData.date[0]
}if(G=="center"){E=aipo.calendar.getDate(L,F.indexReal+this.moveIndex)+"-00-00";
H=aipo.calendar.getDate(L,F.indexReal+this.moveIndex+F.colspanReal-1)+"-00-00"
}else{if(G=="left"){if(F.colspanReal-this.moveIndex>0){E=aipo.calendar.getDate(L,F.indexReal+this.moveIndex)+"-00-00";
H=aipo.calendar.getDate(L,F.indexReal+F.colspanReal-1)+"-00-00"
}else{E=aipo.calendar.getDate(L,F.indexReal+F.colspanReal-1)+"-00-00";
H=aipo.calendar.getDate(L,F.indexReal+this.moveIndex)+"-00-00"
}}else{if(F.colspanReal+this.moveIndex>0){E=aipo.calendar.getDate(L,F.indexReal)+"-00-00";
H=aipo.calendar.getDate(L,F.indexReal+F.colspanReal+this.moveIndex-1)+"-00-00"
}else{E=aipo.calendar.getDate(L,F.indexReal+F.colspanReal+this.moveIndex-1)+"-00-00";
H=aipo.calendar.getDate(L,F.indexReal)+"-00-00"
}}}this.positionFrom=-1;
this.positionTo=-1;
this.moveIndex=0;
this.tmpIndex=0;
var J="";
if(I.ctrlKey){J+="&mode=insert"
}else{J+="&mode=update"
}J+="&is_span=TRUE";
J+="&entityid="+this.dragSource.schedule.scheduleId;
J+="&view_start="+L;
J+="&start_date="+E;
J+="&end_date="+H;
aipo.calendar.populateWeeklySchedule(this.portletId,J);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
B.declare("aipo.calendar.WeeklyTermScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleDragMoveObject,isDraggable:false,TooltipObject:null,scheduleObjId:null,isDraggable:false,constructor:function(E,F){this.scheduleObjId=F.sid
},onMouseDown:function(E){ptConfig[this.portletId].isTooltipEnable=false;
if(this.TooltipObject){this.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(F){if(this.schedule.isDrag||!this.isDraggable){return 
}var E=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+E,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(B.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(E){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(E)
}},setupTooltip:function(G){var E=this.schedule.scheduleId;
var F=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(H,J){var I=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+F+"&scheduleid="+E;
aipo.calendar.showTooltip(I,this.portletId,H)
});
this.TooltipObject._onHover(G)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(E){this.isDraggable=E
}});
B.declare("aipo.calendar.WeeklyScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:0,positionTo:0,_isDragging:false,lastScroll:0,_isLocked:false,onMouseDown:function(E){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(F){this.startY=this.dragSource._lastY;
this.startAbsoluteY=B._abs(B.byId(this.node),true).y;
this.startX=B.getComputedStyle(this.node).left;
var E=window.navigator.userAgent.toLowerCase();
if(E.indexOf("chrome")>-1||(B.isFF&&(B.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(E.indexOf("safari")>-1){this.startAbsoluteY-=B.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}lastScroll=B.byId("weeklyScrollPane_"+this.portletId).scrollTop;
aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments)
},onMouseMove:function(J){if(this._isLocked){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
var I=B.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
var H=Math.floor((this.startY-this.startAbsoluteY)/this._rowHeight_);
var E=Math.floor((this.startY+this.leftTop.t-this.startAbsoluteY+I)/this._rowHeight_);
var F=0;
var G=0;
if(E<H){F=E*this._rowHeight_+1;
G=(H-E+1)*this._rowHeight_;
this.positionFrom=E;
this.positionTo=H+1
}else{F=H*this._rowHeight_+1;
G=(E-H+1)*this._rowHeight_;
this.positionTo=E+1;
this.positionFrom=H
}if(F+G>864){G=864-F-this._rowHeight_;
this.positionTo=47
}this.leftTop.t=F;
this.leftTop.l=this.startX;
this.leftTop.h=G;
B.marginBox(this.node,this.leftTop);
B.style(this.node,"opacity",0.5)
},onMouseUp:function(I){if(!this._isDragging){this.onFirstMove(I);
this.onMouseMove(I)
}var E=Math.floor(this.positionFrom/2);
E=(E>9)?E:"0"+E;
var J=Math.floor(this.positionFrom%2)*30;
var G=ptConfig[this.portletId].jsonData.date[this.dragSource.index].substring(0,10);
var H=G+"-"+E+"-"+J;
E=Math.floor(this.positionTo/2);
E=(E>9)?E:"0"+E;
J=Math.floor(this.positionTo%2)*30;
var F=G+"-"+E+"-"+J;
this.node.style.top="0px";
this.node.style.height="864px";
B.style(this.node,"opacity",0);
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&form_start="+H+"&form_end="+F,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(B.byId("weeklyScrollPane_"+this.portletId)["scrollTop"]);
this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this._isLocked=true;
setTimeout(function(){this._isLocked=false
},5000)
}});
B.declare("aipo.calendar.WeeklyScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleAddDragMoveObject,constructor:function(E,F){this.index=F.idx
}});
B.declare("aipo.calendar.WeeklyTermScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:-1,positionTo:-1,_isDragging:false,scheduleObjId:null,onMouseDown:function(E){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(E){aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum))
},onMouseMove:function(K){aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
B.style(this.node,"opacity",0.5);
var G=aipo.calendar.getCurrentMouseX(this.portletId,K);
var L=G.index;
if(this.positionFrom==-1&&L!=-1){this.positionFrom=L;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&L!=-1){this.positionTo=L
}if(this.positionTo!=-1&&this.positionFrom!=-1){var F,E;
if(this.positionTo>this.positionFrom){E=this.positionFrom;
F=this.positionTo-this.positionFrom+1
}else{E=this.positionTo;
F=this.positionFrom-this.positionTo+1
}var I;
var J;
if(B.byId("view_type_"+this.portletId)&&B.byId("top_form_"+this.portletId).value=="simple"){var H=parseInt(B.byId("view_type_"+this.portletId).value);
I=100/H*F;
J=100/H*E
}else{I=100/ptConfig[this.portletId].scheduleDivDaySum*F;
J=100/ptConfig[this.portletId].scheduleDivDaySum*E
}B.style(this.node,"left",J+"%");
B.style(this.node,"width",I+"%")
}else{B.style(this.node,"left",0+"%");
B.style(this.node,"width",0+"%")
}},onMouseUp:function(H){if(!this._isDragging){this.onFirstMove(H);
this.onMouseMove(H)
}var I,G;
if(this.positionTo!=-1&&this.positionFrom!=-1){if(this.positionTo>this.positionFrom){I=this.positionFrom;
G=this.positionTo
}else{G=this.positionFrom;
I=this.positionTo
}var F=ptConfig[this.portletId].jsonData.date[I];
var E=ptConfig[this.portletId].jsonData.date[G];
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&is_span=TRUE&form_start="+F+"&form_end="+E,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(B.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
}this.positionFrom=-1;
this.positionTo=-1;
B.style(this.node,"left",0+"%");
B.style(this.node,"width",100+"%");
B.style(this.node,"opacity",0);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
B.declare("aipo.calendar.WeeklyTermScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleAddDragMoveObject,constructor:function(E,F){this.index=F.idx
}});
aipo.schedule.initCalendar=function(F){for(var E=0;
E<ptConfig[F].scheduleDivDaySum;
E++){tmpDraggable=new aipo.calendar.WeeklyScheduleAddDraggable("scheduleDivAdd0"+E+"_"+F,{idx:E});
tmpDraggable.portletId=F;
tmpDraggable.index=E
}tmpDraggable=new aipo.calendar.WeeklyTermScheduleAddDraggable("termScheduleDivAdd_"+F,{idx:0});
tmpDraggable.portletId=F;
aipo.calendar.populateWeeklySchedule(F)
};
aipo.schedule.groupSelectOnchange=function(H,J,K,E){var M=function(R,Q){var P="";
E.dropDown.removeMember(B.byId("member_to-"+K));
for(var O=0;
O<R.length;
O++){var N=R[O].aliasName.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
if(O!=0){P+=" "
}F+="&m_id="+R[O].name;
P+='<span class="dispUser color'+O+'">'+N+"</span>";
aimluck.io.addOption(B.byId("member_to-"+K),R[O].name,N,true)
}B.byId("member_to_input-"+K).innerHTML=P
};
var I=B.query("#adduser-"+K);
switch(H.value.indexOf("pickup")){case -1:I.addClass("hide");
var F="";
B.xhrGet({portletId:K,url:H.value,encoding:"utf-8",handleAs:"json-comment-filtered",load:M,handle:function(){aipo.calendar.populateWeeklySchedule(K,F)
}});
break;
default:I.removeClass("hide");
E.dropDown.removeMember(B.byId("member_to-"+K));
E.dropDown.removeMember(B.byId("tmp_member_to-"+K));
var L=B.byId("picked_memberlist-"+K).options;
for(var G=0;
G<L.length;
G++){(function(O,N){O.selected=true
})(L[G],G)
}E.dropDown.addMember(B.byId("picked_memberlist-"+K),B.byId("tmp_member_to-"+K));
E.dropDown.addMember(B.byId("picked_memberlist-"+K),B.byId("member_to-"+K));
E.inputMemberSync();
aipo.calendar.populateWeeklySchedule(K);
B.xhrGet({portletId:K,url:B.byId("groupselect-defaulturl-"+K).value,encoding:"utf-8",handleAs:"json-comment-filtered"});
break
}}
}}});