dojo._xdResourceLoaded({depends:[["provide","aipo.calendar.weekly"],["require","aimluck.dnd.Draggable"],["require","aipo.widget.ToolTip"],["require","aipo.widget.MemberNormalSelectList"],["require","aipo.widget.GroupNormalSelectList"]],defineResource:function(H){if(!H._hasResource["aipo.calendar.weekly"]){H._hasResource["aipo.calendar.weekly"]=true;
H.provide("aipo.calendar.weekly");
H.require("aimluck.dnd.Draggable");
H.require("aipo.widget.ToolTip");
H.require("aipo.widget.MemberNormalSelectList");
H.require("aipo.widget.GroupNormalSelectList");
aipo.calendar.objectlist=Array();
aipo.calendar.maximum_to=30;
function E(A,B){return A.className.match(new RegExp("(\\s|^)"+B+"(\\s|$)"))
}function G(A,B){if(!this.hasClass(A,B)){A.className+=" "+B
}}function F(A,C){if(E(A,C)){var B=new RegExp("(\\s|^)"+C+"(\\s|$)");
A.className=A.className.replace(B," ")
}}aipo.calendar.changeDisypayPeriod=function(B,P){var T=H.byId("weeklyHeadRights-"+P).children;
var R=H.byId("weeklyTermRights-"+P).children;
var D=H.byId("weeklyRights-"+P).children;
H.byId("view_type_"+P).value=B;
var C=H.byId("indicateDate_"+P);
if(C==null){return 
}for(var Q=0;
Q<7;
Q++){var U=T[Q];
var S=D[Q];
var V=R[Q];
var A=H.byId("scheduleDivAdd0"+Q+"_"+P);
switch(B){case"1":C.innerHTML="<span>1日</span>";
S.className="weeklyRight";
if(Q==0){U.className="weeklyHeadRightR weeklyHeadRightborder"+Q+"_"+P;
U.style.width="100%";
S.style.width="100%";
V.style.width="100%";
G(V,"weeklyTermRightR");
A.style.width="100%"
}else{U.className="weeklyHeadRight weeklyHeadRightborder"+Q+"_"+P;
U.style.width="0%";
U.style.display="none";
S.style.width="0%";
S.style.display="none";
V.style.width="0%";
V.style.display="none";
F(V,"weeklyTermRightR");
A.style.width="0%";
A.style.display="none"
}break;
case"4":C.innerHTML="<span>4日</span>";
if(Q==0){F(V,"weeklyTermRightR")
}if(Q<=3){U.style.width="25%";
U.style.left=Q*25+"%";
U.style.display="";
S.style.width="25%";
S.style.left=Q*25+"%";
S.style.display="";
V.style.width="25%";
V.style.left=Q*25+"%";
V.style.display="";
A.style.width="25%";
A.style.left=Q*25+"%";
A.style.display="";
if(Q<3){U.className="weeklyHeadRight weeklyHeadRightborder"+Q+"_"+P
}else{if(Q==3){U.className="weeklyHeadRightR weeklyHeadRightborder"+Q+"_"+P;
S.className="weeklyRightR";
G(V,"weeklyTermRightR")
}}}else{U.className="weeklyHeadRight weeklyHeadRightborder"+Q+"_"+P;
U.style.width="0%";
U.style.display="none";
S.style.width="0%";
S.style.display="none";
V.style.width="0%";
V.style.display="none";
F(V,"weeklyTermRightR");
A.style.width="0%";
A.style.display="none"
}break;
case"7":C.innerHTML="<span>7日</span>";
U.style.left=Q*(100/7)+"%";
U.style.display="";
U.style.width="14.2857%";
S.style.left=Q*(100/7)+"%";
S.style.display="";
S.style.width="14.2857%";
V.style.left=Q*(100/7)+"%";
V.style.display="";
V.style.width="14.2857%";
A.style.left=Q*(100/7)+"%";
A.style.display="";
A.style.width="14.2857%";
if(Q==0){F(V,"weeklyTermRightR")
}if(Q<6){U.className="weeklyHeadRight weeklyHeadRightborder"+Q+"_"+P;
S.className="weeklyRight";
F(V,"weeklyTermRightR")
}else{U.className="weeklyHeadRightR weeklyHeadRightborder"+Q+"_"+P;
S.className="weeklyRightR";
G(V,"weeklyTermRightR")
}}}};
aipo.calendar.populateWeeklySchedule=function(C,B){var L;
var D=H.byId("member_to-"+C);
if(typeof B=="undefined"||typeof ptConfig[C].jsonData=="undefined"){L=""
}else{L=B
}var M=H.byId("secid-"+C);
if(M){L+="&secid="+M.value
}if(L.match(/ign_dup_f/)==null){if(D){var A=D.options;
to_size=A.length;
if(to_size==0){L+="&m_id="+aipo.schedule.login_id;
L+="&m_empty=empty";
H.byId("calender_m_empty_"+C).style.display=""
}else{L+="&m_empty=";
H.byId("calender_m_empty_"+C).style.display="none"
}for(i=0;
i<to_size;
i++){A[i].selected=true;
L+="&m_id="+A[i].value
}}var N=H.byId("showAll-"+C);
if(N){L+="&s_all="+N.value
}}djConfig.usePlainJson=true;
ptConfig[C].reloadFunction=aipo.calendar.populateWeeklySchedule;
ptConfig[C].isTooltipEnable=false;
if(aipo.calendar.dummyDivObj){aipo.calendar.dummyDivObj.destroy();
aipo.calendar.dummyDivObj=null
}if(H.byId("groupselect-"+C).value.indexOf("pickup")!=-1){L+="&pickup=true"
}H.xhrGet({portletId:C,url:ptConfig[C].jsonUrl+L,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(AI,AQ){if(aipo.calendar.reloadMonthlyCalendar!=null){aipo.calendar.reloadMonthlyCalendar()
}obj_error=H.byId("error-"+C);
H.style(obj_error,"display","none");
if("PermissionError"==AI[0]){H.style(obj_error,"display","block");
obj_error.innerHTML=AI[1];
obj_content=H.byId("content-"+C);
H.style(obj_content,"display","none");
obj_indicator=H.byId("indicator-"+C);
H.style(obj_indicator,"display","none");
return 
}else{if(AI.errList){if("duplicate_facility"==AI.errList[0]){if(confirm("既に同じ時間帯に設備が予約されています。スケジュールを登録しますか？")){var AG=L+"&ign_dup_f=true";
aipo.calendar.populateWeeklySchedule(C,AG);
aipo.portletReload("schedule",C);
return 
}}if("UpdateError"==AI.errList[0]){H.style(obj_error,"display","block");
obj_error.innerHTML='<ul><li><span class="caution">'+AI.errList[1]+"</span></li></ul>";
obj_content=H.byId("content-"+C);
H.style(obj_content,"visibility","visible");
obj_indicator=H.byId("indicator-"+C);
H.style(obj_indicator,"display","none")
}}}var AP;
if(!!aipo.calendar.objectlist){var AN=aipo.calendar.objectlist.length;
for(AP=0;
AP<AN;
AP++){var AW=aipo.calendar.objectlist[AP];
if(AW.portletId==C){AW.destroy()
}}}if(!aipo.errorTreatment(AI,ptConfig[C].thisUrl)){return 
}ptConfig[C].jsonData=AI;
var AK=Array(ptConfig[C].scheduleDivDaySum);
for(var AP=0;
AP<ptConfig[C].scheduleDivDaySum;
AP++){AK[AP]=Array()
}var y=0;
var AJ=0;
var x=0;
var AZ="";
var w="";
var AS="";
var AA="";
var AX=[];
var AY,Aa,I,J;
var AM=AI.startDate.substring(0,4)+"年"+parseInt(AI.startDate.substring(5,7),10)+"月"+parseInt(AI.startDate.substring(8,10),10)+"日"+AI.dayOfWeek[0];
H.byId("viewWeekly-"+C).innerHTML=AM;
var AH="";
var AR="";
var AC=H.byId("top_form_"+this.portletId).value=="simple";
var AU=H.byId("view_type_"+this.portletId).value=="1";
var z=H.byId("view_type_"+this.portletId).value=="4";
var AO=window.navigator.userAgent.toLowerCase().indexOf("ipad")>=0;
if(AC&&AU){AH="width: 100%;";
AR="width: 0%;display: none;"
}AS+='<table id="termTable_'+this.portletId+'" style="width:100%;" cellspacing="0" cellpadding="0" border="0"><tbody>';
var AT=H.byId("weeklyScrollPane_"+this.portletId);
H.forEach(AI.termSchedule,function(P){var O="";
var Q="";
if(AC&&(AU||z)){O=' style="display: none;"';
x++;
for(k=0;
k<P.length;
k++){S=P[k];
if(S.index==0||(AC&&z&&S.index<4)){O="";
Q=" weeklyTermRightR";
x--;
break
}}}var S=null;
var T=scheduleTooltipEnable!==true&&AC&&AU?"border-right:0":"";
if(scheduleTooltipEnable!==true&&AC&&AU){AS+="<tr"+O+'><td colspan="2" nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}else{AS+="<tr"+O+'><td nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}if(AC&&z){AS+='<div class="_weeklyHeadRightborder0_'+C+" weeklyTermRight weeklyTermRightL"+Q+'" id="termDay0-'+AJ+"-"+C+'" style="width: 25%;left: 0%;'+AH+T+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder1_'+C+' weeklyTermRight" id="termDay1-'+AJ+"-"+C+'" style="width: 25%;left: 25%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder2_'+C+' weeklyTermRight" id="termDay2-'+AJ+"-"+C+'" style="width: 25%;left: 50%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder3_'+C+' weeklyTermRight weeklyTermRightR" id="termDay3-'+AJ+"-"+C+'" style="width: 25%;left: 75%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder4_'+C+' weeklyTermRight" id="termDay4-'+AJ+"-"+C+'" style="left: 57.1429%;display:none;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder5_'+C+' weeklyTermRight" id="termDay5-'+AJ+"-"+C+'" style="left: 71.4286%;display:none;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder6_'+C+' weeklyTermRight weeklyTermRightR" id="termDay6-'+AJ+"-"+C+'" style="left: 85.7143%;display:none;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AA+='<div id="termScheduleItemGarage-'+AJ+"-"+C+'" class="weeklyTermRights" style="top:'+(-(17*(AJ-x+1)))+'px"> </div>'
}else{AS+='<div class="_weeklyHeadRightborder0_'+C+" weeklyTermRight weeklyTermRightL"+Q+'" id="termDay0-'+AJ+"-"+C+'" style="left: 0%;'+AH+T+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder1_'+C+' weeklyTermRight" id="termDay1-'+AJ+"-"+C+'" style="left: 14.2857%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder2_'+C+' weeklyTermRight" id="termDay2-'+AJ+"-"+C+'" style="left: 28.5714%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder3_'+C+' weeklyTermRight" id="termDay3-'+AJ+"-"+C+'" style="left: 42.8571%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder4_'+C+' weeklyTermRight" id="termDay4-'+AJ+"-"+C+'" style="left: 57.1429%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder5_'+C+' weeklyTermRight" id="termDay5-'+AJ+"-"+C+'" style="left: 71.4286%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AS+='<div class="_weeklyHeadRightborder6_'+C+' weeklyTermRight weeklyTermRightR" id="termDay6-'+AJ+"-"+C+'" style="left: 85.7143%;'+AR+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AA+='<div id="termScheduleItemGarage-'+AJ+"-"+C+'" class="weeklyTermRights" style="top:'+(-(17*(AJ-x+1)))+'px"> </div>'
}var R;
AS+="</div></td></tr>";
AJ++
});
AS+="</tbody></table>";
H.byId("termScheduleGarage-"+C).innerHTML=AS;
H.byId("termScheduleDivAdd_"+C).style.height=(17*(AJ-x+1))+"px";
H.byId("termScheduleDivAdd_"+C).style.top=(-(17*(AJ-x+1)))+"px";
H.byId("termScheduleContainer-"+C).innerHTML=AA;
H.byId("weeklyTermLeftTopTall-"+C).style.height=(17*(AJ-x))+"px";
for(var AP=0;
AP<ptConfig[C].scheduleDivDaySum;
AP++){AY=H.byId("weeklyDay"+AP+"-"+C);
Aa=H.byId("weeklyHoliday"+AP+"-"+C);
I=H.byId("weeklyRight"+AP+"-"+C);
J=H.byId("termDay"+AP+"-"+C);
AY.innerHTML=parseInt(AI.date[AP].substring(8,10),10)+AI.dayOfWeek[AP];
Aa.innerHTML=AI.holiday[AP];
if(AI.dayOfWeek[AP]=="（土）"){H.addClass(AY,"saturday");
H.addClass(Aa,"saturday");
H.addClass(I,"saturday");
H.addClass(J,"saturday")
}else{H.removeClass(AY,"saturday");
H.removeClass(Aa,"saturday");
H.removeClass(I,"saturday");
H.removeClass(J,"saturday")
}if(AI.dayOfWeek[AP]=="（日）"){H.addClass(AY,"sunday");
H.addClass(Aa,"sunday");
H.addClass(I,"sunday");
H.addClass(J,"sunday")
}else{H.removeClass(AY,"sunday");
H.removeClass(Aa,"sunday");
H.removeClass(I,"sunday");
H.removeClass(J,"sunday")
}if(AI.holiday[AP]){H.addClass(AY,"holiday");
H.addClass(Aa,"holiday");
H.addClass(I,"holiday");
H.addClass(J,"holiday")
}else{H.removeClass(AY,"holiday");
H.removeClass(Aa,"holiday");
H.removeClass(I,"holiday");
H.removeClass(J,"holiday")
}}H.forEach(AI.schedule,function(O){var e=ptConfig[C].rowHeight;
var S=O.startDateHour*e*2+O.startDateMinute*e/30;
var P=O.endDateHour*e*2+O.endDateMinute*e/30-S;
if(P<=e){AX[y]=P;
P=e
}else{AX[y]=-1
}var Z=100/ptConfig[C].scheduleDivDaySum*O.index;
var b=100/ptConfig[C].scheduleDivDaySum*0.99;
var d=O.name;
var a=AX[y]==-1?((O.startDateHour>9)?O.startDate:"0"+O.startDate):O.name;
var U=AX[y]==-1?((O.endDateHour>9)?O.endDate:"0"+O.endDate):"";
var V=AX[y]==-1?"-":"";
var T=O.scheduleId;
var R="0";
var Y="";
var c=H.byId("member_to-"+C);
if(c){var X=c.options;
for(AP=0;
AP<X.length;
AP++){if(((O.type=="U")&&(O.ownerId==X[AP].value))||((O.type=="F")&&(O.ownerId==X[AP].value))){R=AP%aipo.calendar.maximum_to
}if(O.memberList){var W=0;
var Q=0;
for(j=0;
j<O.memberList.length;
j++){if(O.memberList[j].charAt(0)=="f"){Q++
}else{W++
}}}}var Y;
if(O.userCount>1){Y="[共有]"
}if(O.facilityCount>0){Y+="[設備]"
}}if(!O["public"]){d+='<img src="images/schedule/schedule_secret.gif" border="0" width="16" height="16" alt="非公開" title="非公開" align="top" class="icon" />'
}if(O.duplicate){d+='<img src="images/schedule/schedule_duplicate.gif" border="0" width="16" height="16" alt="重複スケジュール" title="重複スケジュール" align="top" class="icon" />'
}if(O.repeat){d+='<img src="images/schedule/schedule_repeat.gif" border="0" width="16" height="16" alt="繰り返し" title="繰り返し" align="top" class="icon" />'
}if(O.tmpreserve){d+='<img src="images/schedule/schedule_tmpreserve.gif" border="0" width="16" height="16" alt="仮スケジュール" title="仮スケジュール" align="top" class="icon" />'
}AZ+='<div id="schedule-'+y+"-"+C+'" class="scheduleDiv color'+R+'" style="top: '+S+"px; left: "+Z+"%; height: "+(P-1)+"px; width: "+b+'%; z-index: 0; visibility: hidden;"><div class="scheduleDivFirstLine color'+R+'"><span id="scheduleDivStartTime-'+y+"-"+C+'" class="scheduleDivTime color'+R+'">'+Y+a+'</span><span id="scheduleDivSepalater-'+y+"-"+C+'"  class="scheduleDivSepalater color'+R+'">'+V+'</span><span id="scheduleDivEndTime-'+y+"-"+C+'" class="scheduleDivTime color'+R+'">'+U+'</span></div><div class="scheduleDivName color'+R+'">'+d+'</div><div class="scheduleDivLastLine color'+R+'"><center><div class="handleDiv color'+R+'" align="center">&nbsp;</div></center></div></div>';
y++
});
AZ+='<div id="dummy_div_'+C+'" class="scheduleDivAdd dummy_div" style=" position:absolute; width: 0px; height : 0px; left: 0px; top: -10000px; Filter: Alpha(Opacity=10);opacity:.10; background-color:#FFFFFF; ">&nbsp;</div>';
H.byId("scheduleGarage-"+C).innerHTML=AZ;
var AL=null;
var AB,AD;
var K=[];
y=0;
H.forEach(AI.schedule,function(O){AB=H.byId("schedule-"+y+"-"+C);
var P=O.scheduleId;
AL=new aipo.calendar.WeeklyScheduleDraggable(AB,{pid:C,sid:'"schedule-'+y+"-"+C+'"',handle:'"dummy_div_-'+C+'"'});
aipo.calendar.objectlist.push(AL);
if(O.member||O.loginuser||O.owner||O["public"]){AL.setDraggable(true)
}else{AL.setDraggable(false)
}AL.schedule=O;
AL.tmpIndex=O.index;
AL.count=y;
AL.tmpHeight=AX[y];
AL.position=0;
AL.division=1;
AL.portletId=C;
AK[O.index].push(AB);
if(O["public"]||O.member){H.connect(AB,"onclick",AL,"onScheduleClick")
}H.connect(AB,"onmouseover",AL,"onScheduleOver");
y++
});
for(var AP=0;
AP<ptConfig[C].scheduleDivDaySum;
AP++){aipo.calendar.relocation(C,AK[AP].length,AK[AP],100/ptConfig[C].scheduleDivDaySum*AP);
AK[AP]=Array()
}y=0;
AJ=0;
H.forEach(AI.termSchedule,function(T){var O=null;
w="";
for(var U=0;
U<ptConfig[C].scheduleDivDaySum;
U++){tmpNode5=H.byId("termDay"+U+"-"+AJ+"-"+C);
if(AI.dayOfWeek[U]=="（土）"){H.addClass(tmpNode5,"saturday")
}else{H.removeClass(tmpNode5,"saturday")
}if(AI.dayOfWeek[U]=="（日）"){H.addClass(tmpNode5,"sunday")
}else{H.removeClass(tmpNode5,"sunday")
}if(AI.holiday[U]){H.addClass(tmpNode5,"holiday")
}else{H.removeClass(tmpNode5,"holiday")
}}for(k=0;
k<T.length;
k++){O=T[k];
if(AC&&z){var R=O.rowspan;
if(O.rowspan+O.index>4){R=R-(O.rowspan+O.index-4)
}var a=25*R;
var Y=25*O.index;
if(O.index>4){a=0
}}else{var a=100/ptConfig[C].scheduleDivDaySum*O.rowspan;
var Y=100/ptConfig[C].scheduleDivDaySum*O.index
}var Z="";
if(AC&&AU){a=100;
Z=((O.index==0)?"":"display: none;")
}var c=O.name;
var S=O.scheduleId;
var Q="0";
var X="";
var b=H.byId("member_to-"+C);
if(b){var W=b.options;
for(U=0;
U<W.length;
U++){if(((O.type=="U")&&(O.ownerId==W[U].value))||((O.type=="F")&&(O.ownerId==W[U].value))){Q=U%aipo.calendar.maximum_to
}if(O.memberList){var V=0;
var P=0;
for(j=0;
j<O.memberList.length;
j++){if(O.memberList[j].charAt(0)=="f"){P++
}else{V++
}}}}var X;
if(V>1){X="[共有]"
}if(P>0){X+="[設備]"
}}if(!O["public"]){c+='<img src="images/schedule/schedule_secret.gif" border="0" width="16" height="16" alt="非公開" title="非公開" align="top" class="icon" />'
}if(O.duplicate){c+='<img src="images/schedule/schedule_duplicate.gif" border="0" width="16" height="16" alt="重複スケジュール" title="重複スケジュール" align="top" class="icon" />'
}if(O.repeat){c+='<img src="images/schedule/schedule_repeat.gif" border="0" width="16" height="16" alt="繰り返し" title="繰り返し" align="top" class="icon" />'
}if(O.tmpreserve){c+='<img src="images/schedule/schedule_tmpreserve.gif" border="0" width="16" height="16" alt="仮スケジュール" title="仮スケジュール" align="top" class="icon" />'
}if(a==100){a="99.99999"
}w+='<div id="termSchedule-'+y+"-"+C+'" class="termScheduleDiv termColor'+Q+'" style="left: '+Y+"%; width: "+a+"%;"+Z+'"><div class="termScheduleDivHandleLeft" id="termScheduleDivHandleLeft-'+y+"-"+C+'">&nbsp;</div><div class="termScheduleDivNameDiv">'+X+c+'</div><div class="termScheduleDivHandleRight" id="termScheduleDivHandleRight-'+y+"-"+C+'">&nbsp;</div></div>';
y++
}H.byId("termScheduleItemGarage-"+AJ+"-"+C).innerHTML=w;
AJ++
});
tableLeft=H.byId("weeklyTermLeft_"+C);
AL=null;
y=0;
AJ=0;
H.forEach(AI.termSchedule,function(P){var Q=null;
for(k=0;
k<P.length;
k++){Q=P[k];
var O=Q.scheduleId;
AB=H.byId("termSchedule-"+y+"-"+C);
AD=H.byId("termScheduleDivHandleLeft-"+y+"-"+C);
draggable3=H.byId("termScheduleDivHandleRight-"+y+"-"+C);
AL=new aipo.calendar.WeeklyTermScheduleDraggable(AB,{pid:C,sid:"termSchedule-"+y+"-"+C});
aipo.calendar.objectlist.push(AL);
AL.schedule=Q;
AL.scheduleNode=AB;
AL.portletId=C;
AL.termType="center";
H.connect(AB,"onclick",AL,"onScheduleClick");
AB.style.zIndex=1;
if(Q.indexReal>=0){tmpDraggable2=new aipo.calendar.WeeklyTermScheduleDraggable(AD,{pid:C,sid:"termScheduleDivHandleLeft-"+y+"-"+C});
aipo.calendar.objectlist.push(tmpDraggable2);
tmpDraggable2.schedule=Q;
tmpDraggable2.scheduleNode=AB;
tmpDraggable2.portletId=C;
tmpDraggable2.termType="left";
if(Q.member||Q.loginuser||Q.owner||Q["public"]){tmpDraggable2.setDraggable(true)
}else{tmpDraggable2.setDraggable(false)
}}else{H.style(AD,"cursor","pointer");
AD.style.zIndex=1
}H.connect(AD,"onclick",AL,"onScheduleClick");
if(Q.indexReal+Q.colspanReal<=ptConfig[C].scheduleDivDaySum){tmpDraggable3=new aipo.calendar.WeeklyTermScheduleDraggable(draggable3,{pid:C,sid:"termScheduleDivHandleRight-"+y+"-"+C});
aipo.calendar.objectlist.push(tmpDraggable3);
tmpDraggable3.schedule=Q;
tmpDraggable3.scheduleNode=AB;
tmpDraggable3.portletId=C;
tmpDraggable3.termType="right";
if(Q.member||Q.loginuser||Q.owner||Q["public"]){tmpDraggable3.setDraggable(true)
}else{tmpDraggable3.setDraggable(false)
}}else{H.style(draggable3,"cursor","pointer");
draggable3.style.zIndex=1
}H.connect(draggable3,"onclick",AL,"onScheduleClick");
H.connect(AB,"onmouseover",AL,"onScheduleOver");
if(Q.member||Q.loginuser||Q.owner||Q["public"]){AL.setDraggable(true)
}else{AL.setDraggable(false)
}y++
}AJ++
});
obj_content=H.byId("content-"+C);
H.style(obj_content,"visibility","visible");
obj_indicator=H.byId("indicator-"+C);
H.style(obj_indicator,"display","none");
H.removeClass(H.byId("tableWrapper_"+C),"hide");
var AT=H.byId("weeklyScrollPane_"+C);
if((AT.clientWidth==AT.offsetWidth)&&!(AO&&!AC)){if(H.byId("weeklySpan-"+C)!=null){H.byId("weeklySpan-"+C).style.display="none"
}H.query(".weeklyTermTailTd_"+C).style("display","none");
if(H.byId("termTable_"+C)!=null){H.query("termTable_"+C).style("width","99.9999%")
}if(AC&&AU){H.query(".weeklyHeadRightborder0_"+C).style("border-right-style","none");
H.query("._weeklyHeadRightborder0_"+C).style("border-right-style","none");
H.byId("weeklyRight0-"+C).style.borderRightStyle="";
if(AO){if(H.byId("weeklyRight0-"+C).className.indexOf("sunday")>=0||H.byId("weeklyRight0-"+C).className.indexOf("saturday")>=0){H.query(".scroll_width").style("padding-right","1px")
}else{H.query(".scroll_width").style("padding-right","0px")
}H.query(".weeklyTableHead").style("padding-right","1px")
}else{H.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(AC&&z){if(AO){H.query(".weeklyTableHead").style("padding-right","0px");
H.query(".scroll_width").style("padding-right","0px")
}else{H.byId("weeklyRight3-"+C).style.borderRightStyle="none";
H.query(".weeklyHeadRightborder3_"+C).style("border-right-style","none");
H.query("._weeklyHeadRightborder3_"+C).style("border-right-style","none");
H.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(AO){H.query(".scroll_width").style("padding-right","0px");
H.query(".weeklyTableHead").style("padding-right","0px")
}else{if(window.navigator.userAgent.toLowerCase().indexOf("chrome")>=0&&(H.byId("weeklyRight6-"+C).className.indexOf("sunday")>=0||H.byId("weeklyRight6-"+C).className.indexOf("saturday"))>=0){H.query(".scroll_width").style("padding-right","1px");
H.query(".weeklyTableHead").style("padding-right","1px")
}else{H.query(".scroll_width").style("padding-right","0px");
H.query(".weeklyTableHead").style("padding-right","0px")
}H.byId("weeklyRight6-"+C).style.borderRightStyle="none";
H.query(".weeklyHeadRightborder6_"+C).style("border-right-style","none");
H.query("._weeklyHeadRightborder6_"+C).style("border-right-style","none")
}}}}else{if(AT.clientWidth!=AT.offsetWidth&&AT.offsetWidth-AT.clientWidth!=18){if(H.byId("weeklySpan-"+C)!=null){H.byId("weeklySpan-"+C).width=(AT.offsetWidth-AT.clientWidth+1)+"px"
}H.query(".weeklyTermTailTd_"+C).width=(AT.offsetWidth-AT.clientWidth+1)+"px";
H.query(".weeklyTermTail").style("width",((AT.offsetWidth-AT.clientWidth+1)+"px"))
}}if(AJ==0){H.byId("termScheduleContainer-"+C).style.height="0px"
}else{}H.byId("weeklyTableHead_"+C).style.marginTop="5px";
var AE=H.byId("weeklyTableHead_"+C).offsetHeight;
var AV=H.byId("weeklyTermTr_"+C).offsetHeight;
AE+=5;
AE-=AV;
AV-=AV%17;
AE+=AV;
H.byId("weeklyTableHeadWrapper_"+C).style.overflow="hidden";
H.byId("weeklyTableHeadWrapper_"+C).style.height=AE+"px";
if(AJ>0){var AF=0;
for(AF=0;
AF<7;
AF++){if(H.byId("termDay"+AF+"-"+(AJ-1)+"-"+C).className.indexOf("sunday")>=0||H.byId("termDay"+AF+"-"+(AJ-1)+"-"+C).className.indexOf("saturday")>=0){H.byId("termDay"+AF+"-"+(AJ-1)+"-"+C).style.height="95%"
}}}if(!ptConfig[C].isScroll){H.byId("weeklyScrollPane_"+C).scrollTop=ptConfig[C].contentScrollTop;
ptConfig[C].isScroll=true
}ptConfig[C].isTooltipEnable=true
}})
};
aipo.calendar.relocation=function(p,q,B,A){var Z,a;
var C=0.99;
var e=100/7;
var D=0;
var f=0;
var h=0;
var l=0;
var g=new Array(q);
var o=new Array(q);
var Y=new Array(q);
var d=1;
var c=0;
if(H.byId("view_type_"+p).value=="1"&&H.byId("top_form_"+p).value=="simple"){d=7.2
}else{if(H.byId("view_type_"+p).value=="4"){d=1.75;
if(A>57){A=100
}}}B.sort(aipo.calendar.sortByRegion);
for(Z=0;
Z<q;
Z++){B[Z].style.zIndex=Z+1
}for(Z=0;
Z<q;
Z=D){D=aipo.calendar.overlapSchedule(B,Z,Z,++D,q);
if(h<parseInt(H.getComputedStyle(B[Z]).top)){l=Z;
h=parseInt(H.getComputedStyle(B[l]).top);
f=0
}for(a=l;
a<D;
a++){var m=parseInt(H.getComputedStyle(B[a]).top)+parseInt(H.getComputedStyle(B[a]).height)
}if(h<m){h=m
}for(a=l;
a<D;
a++){o[a]=aipo.calendar.positionLeft(B,o,l,a,0);
if(o[a]>f){f=o[a]
}}for(a=l;
a<D;
a++){Y[a]=aipo.calendar.positionRight(B,o,f,l,a)
}for(a=l;
a<D;
a++){g[a]=f
}}for(Z=0;
Z<q;
Z++){var b;
var n;
if(g[Z]!=0){if(o[Z]<o[Z+1]){b=(e*2/(g[Z]+1))*0.8*C*d
}else{if(Y[Z]==0){b=(e-(e/(g[Z]+1))*o[Z])*C*d
}else{b=(e-(e/(g[Z]+1))*o[Z]-(e*2/(g[Z]+1))*0.2-(e/(g[Z]+1))*(Y[Z]-1))*C*d
}}}else{b=e*C*d
}n=(A+((e/(g[Z]+1))*o[Z]))*d;
if(n+b>100){b=100
}H.style(B[Z],"width",b+"%");
H.style(B[Z],"left",n+"%");
H.style(B[Z],"visibility","visible")
}};
aipo.calendar.overlapSchedule=function(M,O,A,B,N){var C=parseInt(H.getComputedStyle(M[O]).top)+parseInt(H.getComputedStyle(M[O]).height);
var D=parseInt(H.getComputedStyle(M[A]).top)+parseInt(H.getComputedStyle(M[A]).height);
var P;
if(M[B]){P=parseInt(H.getComputedStyle(M[B]).top)
}else{P="NaN"
}if((B>N-1)||(C<P)||(D<P)){return B
}else{B=aipo.calendar.overlapSchedule(M,O,B,++B,N)
}B=aipo.calendar.overlapSchedule(M,O,A,B,N);
return B
};
aipo.calendar.positionLeft=function(C,D,A,B,O){var P=parseInt(H.getComputedStyle(C[B]).top);
for(i=A;
i<B;
i++){var M=parseInt(H.getComputedStyle(C[i]).top);
var N=M+parseInt(H.getComputedStyle(C[i]).height);
if((M<=P)&&(N>P)&&(D[i]==O)){O=aipo.calendar.positionLeft(C,D,A,B,++O)
}}return O
};
aipo.calendar.positionRight=function(R,N,C,O,B){var D=0;
var P=parseInt(H.getComputedStyle(R[B]).top);
for(i=O;
i<B;
i++){var Q=parseInt(H.getComputedStyle(R[i]).top);
var A=Q+parseInt(H.getComputedStyle(R[i]).height);
if((Q<=P)&&(A>P)&&(N[i]>N[B])&&((C-N[i]+1)>D)){D=C-N[i]+1
}}return D
};
aipo.calendar.sortByRegion=function(D,K){var A=parseInt(H.getComputedStyle(D).top);
var B=parseInt(H.getComputedStyle(K).top);
var L=A+parseInt(H.getComputedStyle(D).height);
var C=L+parseInt(H.getComputedStyle(K).height);
if(A==B){return C-L
}else{return A-B
}};
aipo.calendar.getDate=function(B,A){tmpYear=parseInt(B.substring(0,4),10);
tmpMonth=parseInt(B.substring(5,7),10);
tmpDay=parseInt(B.substring(8,10),10);
if(A>0){do{tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
if(tmpDay+A<=tmpMonthDays){tmpDay=tmpDay+A;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}A=-1
}else{A=A-(tmpMonthDays-tmpDay)-1;
if(tmpMonth==12){tmpYear++;
tmpMonth=1
}else{tmpMonth++
}tmpDay=1
}}while(A>=0)
}else{if(A<0){do{if(tmpDay+A>0){tmpDay=tmpDay+A;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}A=1
}else{if(tmpMonth==1){tmpYear--;
tmpMonth=12
}else{tmpMonth--
}tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
A=A+tmpDay;
tmpDay=tmpMonthDays
}}while(A<=0)
}else{date=B
}}return date
};
aipo.calendar.getDay=function(B,A){if(A==2){if(!(B%4)&&((B%100)||!(B%400))){return 29
}else{return 28
}}else{if(A==4||A==6||A==9||A==11){return 30
}else{return 31
}}};
aipo.calendar.setGridArray=function(A,B){var C=0;
if(aipo.calendar.gridArray){delete (aipo.calendar.gridArray)
}aipo.calendar.gridArray=new Array(B);
for(i=0;
i<B;
i++){C=H._abs(H.byId("weeklyDay"+i+"-"+A),true).x;
aipo.calendar.gridArray[i]=C
}};
aipo.calendar.getCurrentMouseX=function(D,C){if(aipo.calendar.gridArray==null){return{index:-1,x:0}
}var M=aipo.calendar.gridArray[0];
var A=0;
var L;
if(C.pageX>M){var N=parseInt(aipo.calendar.gridArray.length)-1;
if(H.byId("view_type_"+D)&&H.byId("top_form_"+D).value=="simple"){N=parseInt(H.byId("view_type_"+D).value)-1
}for(L=N;
L>-1;
L--){if(C.pageX>aipo.calendar.gridArray[L]){A=L;
break
}}}else{A=0
}var B=aipo.calendar.gridArray[A]-M;
return{index:A,x:B}
};
aipo.calendar.onCloseMemberpicker=function(A){aipo.calendar.populateWeeklySchedule(A)
};
aipo.calendar.showTooltip=function(M,C,P){var D="";
var O="";
var N="";
var A="";
var B=function(I){var J=function(K){switch(K){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(I).replace(/[<>&"']/g,J)
};
H.style(P,"display","block");
H.xhrGet({portletId:C,url:M,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(I,K){if(!I.id){H.style(P,"display","none");
return 
}if(!I.isSpan){D='<span style="font-size: 0.90em;">'+I.date+"</span><br/>"
}if(I.memberList){var L=I.memberList.length;
for(var T=0;
T<L;
T++){O+="<li>"+B(I.memberList[T].aliasName.value)+"</li>"
}}if(I.facilityList){var S=I.facilityList.length;
for(var T=0;
T<S;
T++){N+="<li>"+B(I.facilityList[T].facilityName.value)+"</li>"
}}if(I.place!=""){A='<span style="font-size: 0.90em;">場所</span><br/><ul><li>'+I.place+"</li></ul>"
}if(O!=""){O='<span style="font-size: 0.90em;">参加者</span><br/><ul>'+O+"</ul>"
}if(N!=""){N='<span style="font-size: 0.90em;">設備</span><br/><ul>'+N+"</ul>"
}var J="<h4>"+I.name+"</h4>"+D+O+N+A;
P.innerHTML=J
}})
};
H.declare("aipo.calendar.DummyDivObject",null,{portletId:null,parentnode:null,draggable:null,TooltipObject:null,constructor:function(B,A){this.portletId=A.pid;
this.parentnode=A.node;
this.node=H.byId(B);
this.events=[H.connect(this.node,"onmousedown",this,"onMouseDown"),H.connect(this.node,"onmouseover",this,"onMouseOver")]
},onMouseDown:function(A){this.hide();
if(this.parentnode==null||this.parentnode=="undefined"){return 
}if(this.draggable){this.draggable.onMouseDown(A)
}},onMouseOver:function(A){if(this.parentnode==null||this.parentnode=="undefined"){return 
}},destroy:function(){H.forEach(this.events,H.disconnect);
this.events=this.node=this.handle=null
},hide:function(){H.marginBox(this.node,{l:0,t:-10000,w:0,h:0})
}});
H.declare("aipo.calendar.WeeklyScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,isResize:false,distance:3,lastScroll:0,onFirstMove:function(C){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}var A=H.clone(this.node);
A.id="schedule-dummy-"+this.portletId;
A.style.zIndex=998;
H.style(A,"opacity",0);
var B=H.byId("scheduleGarage-"+this.portletId);
B.appendChild(A);
this.tmpDraggable=A;
H.connect(this.node,"onmousedown",this,"onMouseDown");
if(H.isIE){document.onkeydown=function(J){H.style(A,"opacity",0.3)
};
document.onkeyup=function(J){H.style(A,"opacity",0)
}
}else{H.connect(null,"onkeydown",this,"onKeyPress");
H.connect(null,"onkeyup",this,"onKeyPress")
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
H.style(this.node,"opacity",0.5);
this.node.style.zIndex=999;
this.startY=this._pageY;
this.startAbsoluteY=H._abs(H.byId(this.node),true).y;
var D=window.navigator.userAgent.toLowerCase();
if(D.indexOf("chrome")>-1||(H.isFF&&(H.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(D.indexOf("safari")>-1){this.startAbsoluteY-=H.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}this.startHeight=parseInt(H.getComputedStyle(this.node).height);
this.startTop=parseInt(H.getComputedStyle(this.node).top);
if(this.startHeight-6<this.startY-this.startAbsoluteY){this.isResize=true
}aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
lastScroll=H.byId("weeklyScrollPane_"+this.portletId).scrollTop
},onKeyPress:function(A){if(A.ctrlKey){H.style(this.tmpDraggable,"opacity",0.3)
}else{H.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(C){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
if(this.dragSource.tmpHeight>3){H.style(this.node,"height",this.dragSource.tmpHeight+"px");
this.dragSource.tmpHeight=3
}var T=ptConfig[this.portletId].distance;
var R=H.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
this.leftTop.t=Math.floor((this.leftTop.t+R)/T)*T;
if(this.isResize){if(-this.startTop+this.leftTop.t+this.startHeight<0){H.style(this.node,"height","0px");
this.leftTop.t+=this.startHeight
}else{var A;
if(this.leftTop.t+this.startHeight>864){A=864-this.startTop-3
}else{A=-this.startTop+this.leftTop.t+this.startHeight
}this.leftTop.t=this.startTop;
this.leftTop.h=parseInt(A)-1
}}else{if(!this.disableY){if(this.leftTop.t<0){this.leftTop.t=0
}if(this.leftTop.t+this.startHeight>864){this.leftTop.t=864-this.startHeight-6
}}}if(!this.disableX){mouseX=aipo.calendar.getCurrentMouseX(this.portletId,C);
this.leftTop.l=mouseX.x;
this.dragSource.schedule.index=mouseX.index
}H.marginBox(this.node,this.leftTop);
var B=parseInt(H.getComputedStyle(this.node).top);
var D=parseInt(H.getComputedStyle(this.node).height)+1;
var O=B/T;
var P=Math.floor(O/12);
var Q=Math.floor(O%12);
P=(P>9)?P:"0"+P;
Q=(Q>1)?Q*(60/12):"0"+Q*(60/12);
var S=this.dragSource.count;
H.byId("scheduleDivStartTime-"+S+"-"+this.portletId).innerHTML=P+":"+Q;
this.dragSource.schedule.startDateHour=P;
this.dragSource.schedule.startDateMinute=Q;
this.dragSource.schedule.startDate=P+":"+Q;
O+=D/T;
P=Math.floor(O/12);
Q=Math.floor(O%12);
P=(P>9)?P:"0"+P;
Q=(Q>1)?Q*(60/12):"0"+Q*(60/12);
H.byId("scheduleDivEndTime-"+S+"-"+this.portletId).innerHTML=P+":"+Q;
this.dragSource.schedule.endDateHour=P;
this.dragSource.schedule.endDateMinute=Q;
this.dragSource.schedule.endDate=P+":"+Q;
H.byId("scheduleDivSepalater-"+S+"-"+this.portletId).innerHTML="-";
return 
},onMouseUp:function(B){ptConfig[this.portletId].isTooltipEnable=true;
if(H.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){H.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var C=parseInt(H.getComputedStyle(this.node).height);
if(C<ptConfig[this.portletId].rowHeight){H.style(this.node,"height",ptConfig[this.portletId].rowHeight+"px");
this.dragSource.tmpHeight=C
}else{this.dragSource.tmpHeight=-1
}var A="";
if(B.ctrlKey){A+="&mode=insert"
}else{A+="&mode=update"
}A+="&entityid="+this.dragSource.schedule.scheduleId;
A+="&view_start="+ptConfig[this.portletId].jsonData.date[0].substring(0,10);
if(this.dragSource.schedule.repeat){A+="&edit_repeat_flag=1";
A+="&view_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.tmpIndex].substring(0,10)
}A+="&start_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.startDateHour+"-"+this.dragSource.schedule.startDateMinute;
A+="&end_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.endDateHour+"-"+this.dragSource.schedule.endDateMinute;
aipo.calendar.populateWeeklySchedule(this.portletId,A);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this.dragSource.destroy()
}});
H.declare("aipo.calendar.WeeklyScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleDragMoveObject,isDraggable:false,scheduleObjId:null,constructor:function(B,A){this.scheduleObjId=A.sid
},onMouseDown:function(A){ptConfig[this.portletId].isTooltipEnable=false;
if(!!aipo.calendar.dummyDivObj&&!!aipo.calendar.dummyDivObj.TooltipObject){aipo.calendar.dummyDivObj.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(A){if(this.schedule.isDrag||!this.isDraggable){return 
}var B=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+B,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(H.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(A){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(A)
}},setupTooltip:function(A){var C=this.schedule.scheduleId;
var B=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(L,D){var K=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+B+"&scheduleid="+C;
aipo.calendar.showTooltip(K,this.portletId,L)
});
this.TooltipObject._onHover(A)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(A){this.isDraggable=A
}});
H.declare("aipo.calendar.WeeklyTermScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{positionFrom:-1,positionTo:-1,moveIndex:0,onFirstMove:function(C){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
H.style(this.node,"opacity",0.5);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
var A=H.clone(this.node);
A.id="schedule-dummy-"+this.portletId;
A.style.zIndex=998;
H.style(A,"opacity",0);
var B=H.byId(this.node.parentNode.id);
B.appendChild(A);
this.tmpDraggable=A;
if(H.isIE){document.onkeydown=function(D){H.style(A,"opacity",0.3)
};
document.onkeyup=function(D){H.style(A,"opacity",0)
}
}else{H.connect(null,"onkeydown",this,"onKeyPress");
H.connect(null,"onkeyup",this,"onKeyPress")
}},onKeyPress:function(A){if(A.ctrlKey){H.style(this.tmpDraggable,"opacity",0.3)
}else{H.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(R){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
var X=ptConfig[this.portletId].distance;
var A=(H.byId("view_type_"+this.portletId)&&H.byId("top_form_"+this.portletId)&&H.byId("top_form_"+this.portletId).value=="simple")?H.byId("view_type_"+this.portletId).value:ptConfig[this.portletId].scheduleDivDaySum;
var S=aipo.calendar.getCurrentMouseX(this.portletId,R);
_tmpIndex=S.index;
if(!this.disableX){var U=this.dragSource.schedule;
var Q=this.dragSource.termType;
var C=this.dragSource.scheduleNode;
var D,V;
if(Q=="center"){if(this.positionFrom==-1&&_tmpIndex!=-1){this.positionFrom=_tmpIndex;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
V=U.indexReal+this.moveIndex;
D=U.colspanReal;
var B=A;
if(D+V>B){if(V<0){D=B
}else{D=B-V
}}else{if(V<0){D=D+V
}}if(V<0){V=0
}}else{if(Q=="left"){if(this.positionFrom==-1){this.positionFrom=U.index;
this.positionTo=U.index
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
if(this.positionTo>=this.positionFrom+U.colspanReal){V=U.indexReal+U.rowspan-1;
D=this.positionTo-this.positionFrom-U.colspanReal+2
}else{V=this.positionTo;
D=U.rowspan+this.positionFrom-this.positionTo
}}else{if(this.positionFrom==-1){this.positionFrom=U.index;
this.positionTo=U.index
}if(this.positionTo!=-1&&_tmpIndex!=-1&&this._tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-U.index-U.rowspan+this.positionTo+1;
if(this.positionTo<=this.positionFrom){V=this.positionTo;
D=this.positionFrom-this.positionTo+1
}else{V=U.index;
D=this.positionTo-U.index+1
}}}var W=100/A*D;
var T=100/A*V;
H.style(C,"left",T+"%");
H.style(C,"width",W+"%")
}},onMouseUp:function(D){ptConfig[this.portletId].isTooltipEnable=true;
if(H.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){H.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var O=this.dragSource.schedule;
var A=ptConfig[this.portletId].jsonData.date[0].substring(0,10);
var N=this.dragSource.termType;
var B=this.dragSource.scheduleNode;
var P,M;
if(H.byId("top_form_"+this.portletId).value=="simple"){P=ptConfig[this.portletId].jsonData.date[0];
M=ptConfig[this.portletId].jsonData.date[0]
}if(N=="center"){P=aipo.calendar.getDate(A,O.indexReal+this.moveIndex)+"-00-00";
M=aipo.calendar.getDate(A,O.indexReal+this.moveIndex+O.colspanReal-1)+"-00-00"
}else{if(N=="left"){if(O.colspanReal-this.moveIndex>0){P=aipo.calendar.getDate(A,O.indexReal+this.moveIndex)+"-00-00";
M=aipo.calendar.getDate(A,O.indexReal+O.colspanReal-1)+"-00-00"
}else{P=aipo.calendar.getDate(A,O.indexReal+O.colspanReal-1)+"-00-00";
M=aipo.calendar.getDate(A,O.indexReal+this.moveIndex)+"-00-00"
}}else{if(O.colspanReal+this.moveIndex>0){P=aipo.calendar.getDate(A,O.indexReal)+"-00-00";
M=aipo.calendar.getDate(A,O.indexReal+O.colspanReal+this.moveIndex-1)+"-00-00"
}else{P=aipo.calendar.getDate(A,O.indexReal+O.colspanReal+this.moveIndex-1)+"-00-00";
M=aipo.calendar.getDate(A,O.indexReal)+"-00-00"
}}}this.positionFrom=-1;
this.positionTo=-1;
this.moveIndex=0;
this.tmpIndex=0;
var C="";
if(D.ctrlKey){C+="&mode=insert"
}else{C+="&mode=update"
}C+="&is_span=TRUE";
C+="&entityid="+this.dragSource.schedule.scheduleId;
C+="&view_start="+A;
C+="&start_date="+P;
C+="&end_date="+M;
aipo.calendar.populateWeeklySchedule(this.portletId,C);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
H.declare("aipo.calendar.WeeklyTermScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleDragMoveObject,isDraggable:false,TooltipObject:null,scheduleObjId:null,isDraggable:false,constructor:function(B,A){this.scheduleObjId=A.sid
},onMouseDown:function(A){ptConfig[this.portletId].isTooltipEnable=false;
if(this.TooltipObject){this.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(A){if(this.schedule.isDrag||!this.isDraggable){return 
}var B=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+B,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(H.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(A){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(A)
}},setupTooltip:function(A){var C=this.schedule.scheduleId;
var B=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(L,D){var K=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+B+"&scheduleid="+C;
aipo.calendar.showTooltip(K,this.portletId,L)
});
this.TooltipObject._onHover(A)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(A){this.isDraggable=A
}});
H.declare("aipo.calendar.WeeklyScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:0,positionTo:0,_isDragging:false,lastScroll:0,_isLocked:false,onMouseDown:function(A){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(A){this.startY=this.dragSource._lastY;
this.startAbsoluteY=H._abs(H.byId(this.node),true).y;
this.startX=H.getComputedStyle(this.node).left;
var B=window.navigator.userAgent.toLowerCase();
if(B.indexOf("chrome")>-1||(H.isFF&&(H.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(B.indexOf("safari")>-1){this.startAbsoluteY-=H.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}lastScroll=H.byId("weeklyScrollPane_"+this.portletId).scrollTop;
aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments)
},onMouseMove:function(A){if(this._isLocked){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
var B=H.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
var C=Math.floor((this.startY-this.startAbsoluteY)/this._rowHeight_);
var L=Math.floor((this.startY+this.leftTop.t-this.startAbsoluteY+B)/this._rowHeight_);
var K=0;
var D=0;
if(L<C){K=L*this._rowHeight_+1;
D=(C-L+1)*this._rowHeight_;
this.positionFrom=L;
this.positionTo=C+1
}else{K=C*this._rowHeight_+1;
D=(L-C+1)*this._rowHeight_;
this.positionTo=L+1;
this.positionFrom=C
}if(K+D>864){D=864-K-this._rowHeight_;
this.positionTo=47
}this.leftTop.t=K;
this.leftTop.l=this.startX;
this.leftTop.h=D;
H.marginBox(this.node,this.leftTop);
H.style(this.node,"opacity",0.5)
},onMouseUp:function(B){if(!this._isDragging){this.onFirstMove(B);
this.onMouseMove(B)
}var L=Math.floor(this.positionFrom/2);
L=(L>9)?L:"0"+L;
var A=Math.floor(this.positionFrom%2)*30;
var D=ptConfig[this.portletId].jsonData.date[this.dragSource.index].substring(0,10);
var C=D+"-"+L+"-"+A;
L=Math.floor(this.positionTo/2);
L=(L>9)?L:"0"+L;
A=Math.floor(this.positionTo%2)*30;
var K=D+"-"+L+"-"+A;
this.node.style.top="0px";
this.node.style.height="864px";
H.style(this.node,"opacity",0);
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&form_start="+C+"&form_end="+K,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(H.byId("weeklyScrollPane_"+this.portletId)["scrollTop"]);
this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this._isLocked=true;
setTimeout(function(){this._isLocked=false
},5000)
}});
H.declare("aipo.calendar.WeeklyScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleAddDragMoveObject,constructor:function(B,A){this.index=A.idx
}});
H.declare("aipo.calendar.WeeklyTermScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:-1,positionTo:-1,_isDragging:false,scheduleObjId:null,onMouseDown:function(A){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(A){aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum))
},onMouseMove:function(B){aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
H.style(this.node,"opacity",0.5);
var N=aipo.calendar.getCurrentMouseX(this.portletId,B);
var A=N.index;
if(this.positionFrom==-1&&A!=-1){this.positionFrom=A;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&A!=-1){this.positionTo=A
}if(this.positionTo!=-1&&this.positionFrom!=-1){var O,P;
if(this.positionTo>this.positionFrom){P=this.positionFrom;
O=this.positionTo-this.positionFrom+1
}else{P=this.positionTo;
O=this.positionFrom-this.positionTo+1
}var D;
var C;
if(H.byId("view_type_"+this.portletId)&&H.byId("top_form_"+this.portletId).value=="simple"){var M=parseInt(H.byId("view_type_"+this.portletId).value);
D=100/M*O;
C=100/M*P
}else{D=100/ptConfig[this.portletId].scheduleDivDaySum*O;
C=100/ptConfig[this.portletId].scheduleDivDaySum*P
}H.style(this.node,"left",C+"%");
H.style(this.node,"width",D+"%")
}else{H.style(this.node,"left",0+"%");
H.style(this.node,"width",0+"%")
}},onMouseUp:function(B){if(!this._isDragging){this.onFirstMove(B);
this.onMouseMove(B)
}var A,C;
if(this.positionTo!=-1&&this.positionFrom!=-1){if(this.positionTo>this.positionFrom){A=this.positionFrom;
C=this.positionTo
}else{C=this.positionFrom;
A=this.positionTo
}var D=ptConfig[this.portletId].jsonData.date[A];
var J=ptConfig[this.portletId].jsonData.date[C];
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&is_span=TRUE&form_start="+D+"&form_end="+J,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(H.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
}this.positionFrom=-1;
this.positionTo=-1;
H.style(this.node,"left",0+"%");
H.style(this.node,"width",100+"%");
H.style(this.node,"opacity",0);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
H.declare("aipo.calendar.WeeklyTermScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleAddDragMoveObject,constructor:function(B,A){this.index=A.idx
}});
aipo.schedule.initCalendar=function(A){for(var B=0;
B<ptConfig[A].scheduleDivDaySum;
B++){tmpDraggable=new aipo.calendar.WeeklyScheduleAddDraggable("scheduleDivAdd0"+B+"_"+A,{idx:B});
tmpDraggable.portletId=A;
tmpDraggable.index=B
}tmpDraggable=new aipo.calendar.WeeklyTermScheduleAddDraggable("termScheduleDivAdd_"+A,{idx:0});
tmpDraggable.portletId=A;
aipo.calendar.populateWeeklySchedule(A)
};
aipo.schedule.groupSelectOnchange=function(O,D,C,R){var A=function(I,J){var K="";
R.dropDown.removeMember(H.byId("member_to-"+C));
for(var L=0;
L<I.length;
L++){var M=I[L].aliasName.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
if(L!=0){K+=" "
}Q+="&m_id="+I[L].name;
K+='<span class="dispUser color'+L+'">'+M+"</span>";
aimluck.io.addOption(H.byId("member_to-"+C),I[L].name,M,true)
}H.byId("member_to_input-"+C).innerHTML=K
};
var N=H.query("#adduser-"+C);
switch(O.value.indexOf("pickup")){case -1:N.addClass("hide");
var Q="";
H.xhrGet({portletId:C,url:O.value,encoding:"utf-8",handleAs:"json-comment-filtered",load:A,handle:function(){aipo.calendar.populateWeeklySchedule(C,Q)
}});
break;
default:N.removeClass("hide");
R.dropDown.removeMember(H.byId("member_to-"+C));
R.dropDown.removeMember(H.byId("tmp_member_to-"+C));
var B=H.byId("picked_memberlist-"+C).options;
for(var P=0;
P<B.length;
P++){(function(I,J){I.selected=true
})(B[P],P)
}R.dropDown.addMember(H.byId("picked_memberlist-"+C),H.byId("tmp_member_to-"+C));
R.dropDown.addMember(H.byId("picked_memberlist-"+C),H.byId("member_to-"+C));
R.inputMemberSync();
aipo.calendar.populateWeeklySchedule(C);
H.xhrGet({portletId:C,url:H.byId("groupselect-defaulturl-"+C).value,encoding:"utf-8",handleAs:"json-comment-filtered"});
break
}}
}}});