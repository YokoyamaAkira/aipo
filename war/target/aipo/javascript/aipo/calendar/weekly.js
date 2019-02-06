if(!dojo._hasResource["aipo.calendar.weekly"]){dojo._hasResource["aipo.calendar.weekly"]=true;
dojo.provide("aipo.calendar.weekly");
dojo.require("aimluck.dnd.Draggable");
dojo.require("aipo.widget.ToolTip");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.calendar.objectlist=Array();
aipo.calendar.maximum_to=30;
function hasClass(D,C){return D.className.match(new RegExp("(\\s|^)"+C+"(\\s|$)"))
}function addClass(D,C){if(!this.hasClass(D,C)){D.className+=" "+C
}}function removeClass(E,D){if(hasClass(E,D)){var F=new RegExp("(\\s|^)"+D+"(\\s|$)");
E.className=E.className.replace(F," ")
}}aipo.calendar.changeDisypayPeriod=function(Q,T){var M=dojo.byId("weeklyHeadRights-"+T).children;
var V=dojo.byId("weeklyTermRights-"+T).children;
var S=dojo.byId("weeklyRights-"+T).children;
dojo.byId("view_type_"+T).value=Q;
var R=dojo.byId("indicateDate_"+T);
if(R==null){return 
}for(var U=0;
U<7;
U++){var N=M[U];
var L=S[U];
var O=V[U];
var P=dojo.byId("scheduleDivAdd0"+U+"_"+T);
switch(Q){case"1":R.innerHTML="<span>1日</span>";
L.className="weeklyRight";
if(U==0){N.className="weeklyHeadRightR weeklyHeadRightborder"+U+"_"+T;
N.style.width="100%";
L.style.width="100%";
O.style.width="100%";
addClass(O,"weeklyTermRightR");
P.style.width="100%"
}else{N.className="weeklyHeadRight weeklyHeadRightborder"+U+"_"+T;
N.style.width="0%";
N.style.display="none";
L.style.width="0%";
L.style.display="none";
O.style.width="0%";
O.style.display="none";
removeClass(O,"weeklyTermRightR");
P.style.width="0%";
P.style.display="none"
}break;
case"4":R.innerHTML="<span>4日</span>";
if(U==0){removeClass(O,"weeklyTermRightR")
}if(U<=3){N.style.width="25%";
N.style.left=U*25+"%";
N.style.display="";
L.style.width="25%";
L.style.left=U*25+"%";
L.style.display="";
O.style.width="25%";
O.style.left=U*25+"%";
O.style.display="";
P.style.width="25%";
P.style.left=U*25+"%";
P.style.display="";
if(U<3){N.className="weeklyHeadRight weeklyHeadRightborder"+U+"_"+T
}else{if(U==3){N.className="weeklyHeadRightR weeklyHeadRightborder"+U+"_"+T;
L.className="weeklyRightR";
addClass(O,"weeklyTermRightR")
}}}else{N.className="weeklyHeadRight weeklyHeadRightborder"+U+"_"+T;
N.style.width="0%";
N.style.display="none";
L.style.width="0%";
L.style.display="none";
O.style.width="0%";
O.style.display="none";
removeClass(O,"weeklyTermRightR");
P.style.width="0%";
P.style.display="none"
}break;
case"7":R.innerHTML="<span>7日</span>";
N.style.left=U*(100/7)+"%";
N.style.display="";
N.style.width="14.2857%";
L.style.left=U*(100/7)+"%";
L.style.display="";
L.style.width="14.2857%";
O.style.left=U*(100/7)+"%";
O.style.display="";
O.style.width="14.2857%";
P.style.left=U*(100/7)+"%";
P.style.display="";
P.style.width="14.2857%";
if(U==0){removeClass(O,"weeklyTermRightR")
}if(U<6){N.className="weeklyHeadRight weeklyHeadRightborder"+U+"_"+T;
L.className="weeklyRight";
removeClass(O,"weeklyTermRightR")
}else{N.className="weeklyHeadRightR weeklyHeadRightborder"+U+"_"+T;
L.className="weeklyRightR";
addClass(O,"weeklyTermRightR")
}}}};
aipo.calendar.populateWeeklySchedule=function(K,J){var M;
var L=dojo.byId("member_to-"+K);
if(typeof J=="undefined"||typeof ptConfig[K].jsonData=="undefined"){M=""
}else{M=J
}var N=dojo.byId("secid-"+K);
if(N){M+="&secid="+N.value
}if(M.match(/ign_dup_f/)==null){if(L){var I=L.options;
to_size=I.length;
if(to_size==0){M+="&m_id="+aipo.schedule.login_id;
M+="&m_empty=empty";
dojo.byId("calender_m_empty_"+K).style.display=""
}else{M+="&m_empty=";
dojo.byId("calender_m_empty_"+K).style.display="none"
}for(i=0;
i<to_size;
i++){I[i].selected=true;
M+="&m_id="+I[i].value
}}var H=dojo.byId("showAll-"+K);
if(H){M+="&s_all="+H.value
}}djConfig.usePlainJson=true;
ptConfig[K].reloadFunction=aipo.calendar.populateWeeklySchedule;
ptConfig[K].isTooltipEnable=false;
if(aipo.calendar.dummyDivObj){aipo.calendar.dummyDivObj.destroy();
aipo.calendar.dummyDivObj=null
}if(dojo.byId("groupselect-"+K).value.indexOf("pickup")!=-1){M+="&pickup=true"
}dojo.xhrGet({portletId:K,url:ptConfig[K].jsonUrl+M,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(AE,AM){if(aipo.calendar.reloadMonthlyCalendar!=null){aipo.calendar.reloadMonthlyCalendar()
}obj_error=dojo.byId("error-"+K);
dojo.style(obj_error,"display","none");
if("PermissionError"==AE[0]){dojo.style(obj_error,"display","block");
obj_error.innerHTML=AE[1];
obj_content=dojo.byId("content-"+K);
dojo.style(obj_content,"display","none");
obj_indicator=dojo.byId("indicator-"+K);
dojo.style(obj_indicator,"display","none");
return 
}else{if(AE.errList){if("duplicate_facility"==AE.errList[0]){if(confirm("既に同じ時間帯に設備が予約されています。スケジュールを登録しますか？")){var AC=M+"&ign_dup_f=true";
aipo.calendar.populateWeeklySchedule(K,AC);
aipo.portletReload("schedule",K);
return 
}}if("UpdateError"==AE.errList[0]){dojo.style(obj_error,"display","block");
obj_error.innerHTML='<ul><li><span class="caution">'+AE.errList[1]+"</span></li></ul>";
obj_content=dojo.byId("content-"+K);
dojo.style(obj_content,"visibility","visible");
obj_indicator=dojo.byId("indicator-"+K);
dojo.style(obj_indicator,"display","none")
}}}var AL;
if(!!aipo.calendar.objectlist){var AJ=aipo.calendar.objectlist.length;
for(AL=0;
AL<AJ;
AL++){var AS=aipo.calendar.objectlist[AL];
if(AS.portletId==K){AS.destroy()
}}}if(!aipo.errorTreatment(AE,ptConfig[K].thisUrl)){return 
}ptConfig[K].jsonData=AE;
var AG=Array(ptConfig[K].scheduleDivDaySum);
for(var AL=0;
AL<ptConfig[K].scheduleDivDaySum;
AL++){AG[AL]=Array()
}var u=0;
var AF=0;
var t=0;
var C="";
var s="";
var AO="";
var w="";
var A=[];
var B,D,E,F;
var AI=AE.startDate.substring(0,4)+"年"+parseInt(AE.startDate.substring(5,7),10)+"月"+parseInt(AE.startDate.substring(8,10),10)+"日"+AE.dayOfWeek[0];
dojo.byId("viewWeekly-"+K).innerHTML=AI;
var AD="";
var AN="";
var y=dojo.byId("top_form_"+this.portletId).value=="simple";
var AQ=dojo.byId("view_type_"+this.portletId).value=="1";
var v=dojo.byId("view_type_"+this.portletId).value=="4";
var AK=window.navigator.userAgent.toLowerCase().indexOf("ipad")>=0;
if(y&&AQ){AD="width: 100%;";
AN="width: 0%;display: none;"
}AO+='<table id="termTable_'+this.portletId+'" style="width:100%;" cellspacing="0" cellpadding="0" border="0"><tbody>';
var AP=dojo.byId("weeklyScrollPane_"+this.portletId);
dojo.forEach(AE.termSchedule,function(T){var S="";
var O="";
if(y&&(AQ||v)){S=' style="display: none;"';
t++;
for(k=0;
k<T.length;
k++){Q=T[k];
if(Q.index==0||(y&&v&&Q.index<4)){S="";
O=" weeklyTermRightR";
t--;
break
}}}var Q=null;
var R=scheduleTooltipEnable!==true&&y&&AQ?"border-right:0":"";
if(scheduleTooltipEnable!==true&&y&&AQ){AO+="<tr"+S+'><td colspan="2" nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}else{AO+="<tr"+S+'><td nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}if(y&&v){AO+='<div class="_weeklyHeadRightborder0_'+K+" weeklyTermRight weeklyTermRightL"+O+'" id="termDay0-'+AF+"-"+K+'" style="width: 25%;left: 0%;'+AD+R+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder1_'+K+' weeklyTermRight" id="termDay1-'+AF+"-"+K+'" style="width: 25%;left: 25%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder2_'+K+' weeklyTermRight" id="termDay2-'+AF+"-"+K+'" style="width: 25%;left: 50%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder3_'+K+' weeklyTermRight weeklyTermRightR" id="termDay3-'+AF+"-"+K+'" style="width: 25%;left: 75%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder4_'+K+' weeklyTermRight" id="termDay4-'+AF+"-"+K+'" style="left: 57.1429%;display:none;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder5_'+K+' weeklyTermRight" id="termDay5-'+AF+"-"+K+'" style="left: 71.4286%;display:none;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder6_'+K+' weeklyTermRight weeklyTermRightR" id="termDay6-'+AF+"-"+K+'" style="left: 85.7143%;display:none;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
w+='<div id="termScheduleItemGarage-'+AF+"-"+K+'" class="weeklyTermRights" style="top:'+(-(17*(AF-t+1)))+'px"> </div>'
}else{AO+='<div class="_weeklyHeadRightborder0_'+K+" weeklyTermRight weeklyTermRightL"+O+'" id="termDay0-'+AF+"-"+K+'" style="left: 0%;'+AD+R+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder1_'+K+' weeklyTermRight" id="termDay1-'+AF+"-"+K+'" style="left: 14.2857%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder2_'+K+' weeklyTermRight" id="termDay2-'+AF+"-"+K+'" style="left: 28.5714%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder3_'+K+' weeklyTermRight" id="termDay3-'+AF+"-"+K+'" style="left: 42.8571%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder4_'+K+' weeklyTermRight" id="termDay4-'+AF+"-"+K+'" style="left: 57.1429%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder5_'+K+' weeklyTermRight" id="termDay5-'+AF+"-"+K+'" style="left: 71.4286%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
AO+='<div class="_weeklyHeadRightborder6_'+K+' weeklyTermRight weeklyTermRightR" id="termDay6-'+AF+"-"+K+'" style="left: 85.7143%;'+AN+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
w+='<div id="termScheduleItemGarage-'+AF+"-"+K+'" class="weeklyTermRights" style="top:'+(-(17*(AF-t+1)))+'px"> </div>'
}var P;
AO+="</div></td></tr>";
AF++
});
AO+="</tbody></table>";
dojo.byId("termScheduleGarage-"+K).innerHTML=AO;
dojo.byId("termScheduleDivAdd_"+K).style.height=(17*(AF-t+1))+"px";
dojo.byId("termScheduleDivAdd_"+K).style.top=(-(17*(AF-t+1)))+"px";
dojo.byId("termScheduleContainer-"+K).innerHTML=w;
dojo.byId("weeklyTermLeftTopTall-"+K).style.height=(17*(AF-t))+"px";
for(var AL=0;
AL<ptConfig[K].scheduleDivDaySum;
AL++){B=dojo.byId("weeklyDay"+AL+"-"+K);
D=dojo.byId("weeklyHoliday"+AL+"-"+K);
E=dojo.byId("weeklyRight"+AL+"-"+K);
F=dojo.byId("termDay"+AL+"-"+K);
B.innerHTML=parseInt(AE.date[AL].substring(8,10),10)+AE.dayOfWeek[AL];
D.innerHTML=AE.holiday[AL];
if(AE.dayOfWeek[AL]=="（土）"){dojo.addClass(B,"saturday");
dojo.addClass(D,"saturday");
dojo.addClass(E,"saturday");
dojo.addClass(F,"saturday")
}else{dojo.removeClass(B,"saturday");
dojo.removeClass(D,"saturday");
dojo.removeClass(E,"saturday");
dojo.removeClass(F,"saturday")
}if(AE.dayOfWeek[AL]=="（日）"){dojo.addClass(B,"sunday");
dojo.addClass(D,"sunday");
dojo.addClass(E,"sunday");
dojo.addClass(F,"sunday")
}else{dojo.removeClass(B,"sunday");
dojo.removeClass(D,"sunday");
dojo.removeClass(E,"sunday");
dojo.removeClass(F,"sunday")
}if(AE.holiday[AL]){dojo.addClass(B,"holiday");
dojo.addClass(D,"holiday");
dojo.addClass(E,"holiday");
dojo.addClass(F,"holiday")
}else{dojo.removeClass(B,"holiday");
dojo.removeClass(D,"holiday");
dojo.removeClass(E,"holiday");
dojo.removeClass(F,"holiday")
}}dojo.forEach(AE.schedule,function(O){var e=ptConfig[K].rowHeight;
var S=O.startDateHour*e*2+O.startDateMinute*e/30;
var P=O.endDateHour*e*2+O.endDateMinute*e/30-S;
if(P<=e){A[u]=P;
P=e
}else{A[u]=-1
}var Z=100/ptConfig[K].scheduleDivDaySum*O.index;
var b=100/ptConfig[K].scheduleDivDaySum*0.99;
var d=O.name;
var a=A[u]==-1?((O.startDateHour>9)?O.startDate:"0"+O.startDate):O.name;
var U=A[u]==-1?((O.endDateHour>9)?O.endDate:"0"+O.endDate):"";
var V=A[u]==-1?"-":"";
var T=O.scheduleId;
var R="0";
var Y="";
var c=dojo.byId("member_to-"+K);
if(c){var X=c.options;
for(AL=0;
AL<X.length;
AL++){if(((O.type=="U")&&(O.ownerId==X[AL].value))||((O.type=="F")&&(O.ownerId==X[AL].value))){R=AL%aipo.calendar.maximum_to
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
}C+='<div id="schedule-'+u+"-"+K+'" class="scheduleDiv color'+R+'" style="top: '+S+"px; left: "+Z+"%; height: "+(P-1)+"px; width: "+b+'%; z-index: 0; visibility: hidden;"><div class="scheduleDivFirstLine color'+R+'"><span id="scheduleDivStartTime-'+u+"-"+K+'" class="scheduleDivTime color'+R+'">'+Y+a+'</span><span id="scheduleDivSepalater-'+u+"-"+K+'"  class="scheduleDivSepalater color'+R+'">'+V+'</span><span id="scheduleDivEndTime-'+u+"-"+K+'" class="scheduleDivTime color'+R+'">'+U+'</span></div><div class="scheduleDivName color'+R+'">'+d+'</div><div class="scheduleDivLastLine color'+R+'"><center><div class="handleDiv color'+R+'" align="center">&nbsp;</div></center></div></div>';
u++
});
C+='<div id="dummy_div_'+K+'" class="scheduleDivAdd dummy_div" style=" position:absolute; width: 0px; height : 0px; left: 0px; top: -10000px; Filter: Alpha(Opacity=10);opacity:.10; background-color:#FFFFFF; ">&nbsp;</div>';
dojo.byId("scheduleGarage-"+K).innerHTML=C;
var AH=null;
var x,z;
var G=[];
u=0;
dojo.forEach(AE.schedule,function(O){x=dojo.byId("schedule-"+u+"-"+K);
var P=O.scheduleId;
AH=new aipo.calendar.WeeklyScheduleDraggable(x,{pid:K,sid:'"schedule-'+u+"-"+K+'"',handle:'"dummy_div_-'+K+'"'});
aipo.calendar.objectlist.push(AH);
if(O.member||O.loginuser||O.owner||O["public"]){AH.setDraggable(true)
}else{AH.setDraggable(false)
}AH.schedule=O;
AH.tmpIndex=O.index;
AH.count=u;
AH.tmpHeight=A[u];
AH.position=0;
AH.division=1;
AH.portletId=K;
AG[O.index].push(x);
if(O["public"]||O.member){dojo.connect(x,"onclick",AH,"onScheduleClick")
}dojo.connect(x,"onmouseover",AH,"onScheduleOver");
u++
});
for(var AL=0;
AL<ptConfig[K].scheduleDivDaySum;
AL++){aipo.calendar.relocation(K,AG[AL].length,AG[AL],100/ptConfig[K].scheduleDivDaySum*AL);
AG[AL]=Array()
}u=0;
AF=0;
dojo.forEach(AE.termSchedule,function(T){var O=null;
s="";
for(var U=0;
U<ptConfig[K].scheduleDivDaySum;
U++){tmpNode5=dojo.byId("termDay"+U+"-"+AF+"-"+K);
if(AE.dayOfWeek[U]=="（土）"){dojo.addClass(tmpNode5,"saturday")
}else{dojo.removeClass(tmpNode5,"saturday")
}if(AE.dayOfWeek[U]=="（日）"){dojo.addClass(tmpNode5,"sunday")
}else{dojo.removeClass(tmpNode5,"sunday")
}if(AE.holiday[U]){dojo.addClass(tmpNode5,"holiday")
}else{dojo.removeClass(tmpNode5,"holiday")
}}for(k=0;
k<T.length;
k++){O=T[k];
if(y&&v){var R=O.rowspan;
if(O.rowspan+O.index>4){R=R-(O.rowspan+O.index-4)
}var a=25*R;
var Y=25*O.index;
if(O.index>4){a=0
}}else{var a=100/ptConfig[K].scheduleDivDaySum*O.rowspan;
var Y=100/ptConfig[K].scheduleDivDaySum*O.index
}var Z="";
if(y&&AQ){a=100;
Z=((O.index==0)?"":"display: none;")
}var c=O.name;
var S=O.scheduleId;
var Q="0";
var X="";
var b=dojo.byId("member_to-"+K);
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
}s+='<div id="termSchedule-'+u+"-"+K+'" class="termScheduleDiv termColor'+Q+'" style="left: '+Y+"%; width: "+a+"%;"+Z+'"><div class="termScheduleDivHandleLeft" id="termScheduleDivHandleLeft-'+u+"-"+K+'">&nbsp;</div><div class="termScheduleDivNameDiv">'+X+c+'</div><div class="termScheduleDivHandleRight" id="termScheduleDivHandleRight-'+u+"-"+K+'">&nbsp;</div></div>';
u++
}dojo.byId("termScheduleItemGarage-"+AF+"-"+K).innerHTML=s;
AF++
});
tableLeft=dojo.byId("weeklyTermLeft_"+K);
AH=null;
u=0;
AF=0;
dojo.forEach(AE.termSchedule,function(Q){var O=null;
for(k=0;
k<Q.length;
k++){O=Q[k];
var P=O.scheduleId;
x=dojo.byId("termSchedule-"+u+"-"+K);
z=dojo.byId("termScheduleDivHandleLeft-"+u+"-"+K);
draggable3=dojo.byId("termScheduleDivHandleRight-"+u+"-"+K);
AH=new aipo.calendar.WeeklyTermScheduleDraggable(x,{pid:K,sid:"termSchedule-"+u+"-"+K});
aipo.calendar.objectlist.push(AH);
AH.schedule=O;
AH.scheduleNode=x;
AH.portletId=K;
AH.termType="center";
dojo.connect(x,"onclick",AH,"onScheduleClick");
x.style.zIndex=1;
if(O.indexReal>=0){tmpDraggable2=new aipo.calendar.WeeklyTermScheduleDraggable(z,{pid:K,sid:"termScheduleDivHandleLeft-"+u+"-"+K});
aipo.calendar.objectlist.push(tmpDraggable2);
tmpDraggable2.schedule=O;
tmpDraggable2.scheduleNode=x;
tmpDraggable2.portletId=K;
tmpDraggable2.termType="left";
if(O.member||O.loginuser||O.owner||O["public"]){tmpDraggable2.setDraggable(true)
}else{tmpDraggable2.setDraggable(false)
}}else{dojo.style(z,"cursor","pointer");
z.style.zIndex=1
}dojo.connect(z,"onclick",AH,"onScheduleClick");
if(O.indexReal+O.colspanReal<=ptConfig[K].scheduleDivDaySum){tmpDraggable3=new aipo.calendar.WeeklyTermScheduleDraggable(draggable3,{pid:K,sid:"termScheduleDivHandleRight-"+u+"-"+K});
aipo.calendar.objectlist.push(tmpDraggable3);
tmpDraggable3.schedule=O;
tmpDraggable3.scheduleNode=x;
tmpDraggable3.portletId=K;
tmpDraggable3.termType="right";
if(O.member||O.loginuser||O.owner||O["public"]){tmpDraggable3.setDraggable(true)
}else{tmpDraggable3.setDraggable(false)
}}else{dojo.style(draggable3,"cursor","pointer");
draggable3.style.zIndex=1
}dojo.connect(draggable3,"onclick",AH,"onScheduleClick");
dojo.connect(x,"onmouseover",AH,"onScheduleOver");
if(O.member||O.loginuser||O.owner||O["public"]){AH.setDraggable(true)
}else{AH.setDraggable(false)
}u++
}AF++
});
obj_content=dojo.byId("content-"+K);
dojo.style(obj_content,"visibility","visible");
obj_indicator=dojo.byId("indicator-"+K);
dojo.style(obj_indicator,"display","none");
dojo.removeClass(dojo.byId("tableWrapper_"+K),"hide");
var AP=dojo.byId("weeklyScrollPane_"+K);
if((AP.clientWidth==AP.offsetWidth)&&!(AK&&!y)){if(dojo.byId("weeklySpan-"+K)!=null){dojo.byId("weeklySpan-"+K).style.display="none"
}dojo.query(".weeklyTermTailTd_"+K).style("display","none");
if(dojo.byId("termTable_"+K)!=null){dojo.query("termTable_"+K).style("width","99.9999%")
}if(y&&AQ){dojo.query(".weeklyHeadRightborder0_"+K).style("border-right-style","none");
dojo.query("._weeklyHeadRightborder0_"+K).style("border-right-style","none");
dojo.byId("weeklyRight0-"+K).style.borderRightStyle="";
if(AK){if(dojo.byId("weeklyRight0-"+K).className.indexOf("sunday")>=0||dojo.byId("weeklyRight0-"+K).className.indexOf("saturday")>=0){dojo.query(".scroll_width").style("padding-right","1px")
}else{dojo.query(".scroll_width").style("padding-right","0px")
}dojo.query(".weeklyTableHead").style("padding-right","1px")
}else{dojo.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(y&&v){if(AK){dojo.query(".weeklyTableHead").style("padding-right","0px");
dojo.query(".scroll_width").style("padding-right","0px")
}else{dojo.byId("weeklyRight3-"+K).style.borderRightStyle="none";
dojo.query(".weeklyHeadRightborder3_"+K).style("border-right-style","none");
dojo.query("._weeklyHeadRightborder3_"+K).style("border-right-style","none");
dojo.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(AK){dojo.query(".scroll_width").style("padding-right","0px");
dojo.query(".weeklyTableHead").style("padding-right","0px")
}else{if(window.navigator.userAgent.toLowerCase().indexOf("chrome")>=0&&(dojo.byId("weeklyRight6-"+K).className.indexOf("sunday")>=0||dojo.byId("weeklyRight6-"+K).className.indexOf("saturday"))>=0){dojo.query(".scroll_width").style("padding-right","1px");
dojo.query(".weeklyTableHead").style("padding-right","1px")
}else{dojo.query(".scroll_width").style("padding-right","0px");
dojo.query(".weeklyTableHead").style("padding-right","0px")
}dojo.byId("weeklyRight6-"+K).style.borderRightStyle="none";
dojo.query(".weeklyHeadRightborder6_"+K).style("border-right-style","none");
dojo.query("._weeklyHeadRightborder6_"+K).style("border-right-style","none")
}}}}else{if(AP.clientWidth!=AP.offsetWidth&&AP.offsetWidth-AP.clientWidth!=18){if(dojo.byId("weeklySpan-"+K)!=null){dojo.byId("weeklySpan-"+K).width=(AP.offsetWidth-AP.clientWidth+1)+"px"
}dojo.query(".weeklyTermTailTd_"+K).width=(AP.offsetWidth-AP.clientWidth+1)+"px";
dojo.query(".weeklyTermTail").style("width",((AP.offsetWidth-AP.clientWidth+1)+"px"))
}}if(AF==0){dojo.byId("termScheduleContainer-"+K).style.height="0px"
}else{}dojo.byId("weeklyTableHead_"+K).style.marginTop="5px";
var AA=dojo.byId("weeklyTableHead_"+K).offsetHeight;
var AR=dojo.byId("weeklyTermTr_"+K).offsetHeight;
AA+=5;
AA-=AR;
AR-=AR%17;
AA+=AR;
dojo.byId("weeklyTableHeadWrapper_"+K).style.overflow="hidden";
dojo.byId("weeklyTableHeadWrapper_"+K).style.height=AA+"px";
if(AF>0){var AB=0;
for(AB=0;
AB<7;
AB++){if(dojo.byId("termDay"+AB+"-"+(AF-1)+"-"+K).className.indexOf("sunday")>=0||dojo.byId("termDay"+AB+"-"+(AF-1)+"-"+K).className.indexOf("saturday")>=0){dojo.byId("termDay"+AB+"-"+(AF-1)+"-"+K).style.height="95%"
}}}if(!ptConfig[K].isScroll){dojo.byId("weeklyScrollPane_"+K).scrollTop=ptConfig[K].contentScrollTop;
ptConfig[K].isScroll=true
}ptConfig[K].isTooltipEnable=true
}})
};
aipo.calendar.relocation=function(p,q,V,U){var Z,a;
var W=0.99;
var e=100/7;
var X=0;
var f=0;
var h=0;
var l=0;
var g=new Array(q);
var o=new Array(q);
var Y=new Array(q);
var d=1;
var c=0;
if(dojo.byId("view_type_"+p).value=="1"&&dojo.byId("top_form_"+p).value=="simple"){d=7.2
}else{if(dojo.byId("view_type_"+p).value=="4"){d=1.75;
if(U>57){U=100
}}}V.sort(aipo.calendar.sortByRegion);
for(Z=0;
Z<q;
Z++){V[Z].style.zIndex=Z+1
}for(Z=0;
Z<q;
Z=X){X=aipo.calendar.overlapSchedule(V,Z,Z,++X,q);
if(h<parseInt(dojo.getComputedStyle(V[Z]).top)){l=Z;
h=parseInt(dojo.getComputedStyle(V[l]).top);
f=0
}for(a=l;
a<X;
a++){var m=parseInt(dojo.getComputedStyle(V[a]).top)+parseInt(dojo.getComputedStyle(V[a]).height)
}if(h<m){h=m
}for(a=l;
a<X;
a++){o[a]=aipo.calendar.positionLeft(V,o,l,a,0);
if(o[a]>f){f=o[a]
}}for(a=l;
a<X;
a++){Y[a]=aipo.calendar.positionRight(V,o,f,l,a)
}for(a=l;
a<X;
a++){g[a]=f
}}for(Z=0;
Z<q;
Z++){var b;
var n;
if(g[Z]!=0){if(o[Z]<o[Z+1]){b=(e*2/(g[Z]+1))*0.8*W*d
}else{if(Y[Z]==0){b=(e-(e/(g[Z]+1))*o[Z])*W*d
}else{b=(e-(e/(g[Z]+1))*o[Z]-(e*2/(g[Z]+1))*0.2-(e/(g[Z]+1))*(Y[Z]-1))*W*d
}}}else{b=e*W*d
}n=(U+((e/(g[Z]+1))*o[Z]))*d;
if(n+b>100){b=100
}dojo.style(V[Z],"width",b+"%");
dojo.style(V[Z],"left",n+"%");
dojo.style(V[Z],"visibility","visible")
}};
aipo.calendar.overlapSchedule=function(N,P,J,K,O){var L=parseInt(dojo.getComputedStyle(N[P]).top)+parseInt(dojo.getComputedStyle(N[P]).height);
var M=parseInt(dojo.getComputedStyle(N[J]).top)+parseInt(dojo.getComputedStyle(N[J]).height);
var I;
if(N[K]){I=parseInt(dojo.getComputedStyle(N[K]).top)
}else{I="NaN"
}if((K>O-1)||(L<I)||(M<I)){return K
}else{K=aipo.calendar.overlapSchedule(N,P,K,++K,O)
}K=aipo.calendar.overlapSchedule(N,P,J,K,O);
return K
};
aipo.calendar.positionLeft=function(L,M,J,K,P){var I=parseInt(dojo.getComputedStyle(L[K]).top);
for(i=J;
i<K;
i++){var N=parseInt(dojo.getComputedStyle(L[i]).top);
var O=N+parseInt(dojo.getComputedStyle(L[i]).height);
if((N<=I)&&(O>I)&&(M[i]==P)){P=aipo.calendar.positionLeft(L,M,J,K,++P)
}}return P
};
aipo.calendar.positionRight=function(M,R,P,J,O){var Q=0;
var K=parseInt(dojo.getComputedStyle(M[O]).top);
for(i=J;
i<O;
i++){var L=parseInt(dojo.getComputedStyle(M[i]).top);
var N=L+parseInt(dojo.getComputedStyle(M[i]).height);
if((L<=K)&&(N>K)&&(R[i]>R[O])&&((P-R[i]+1)>Q)){Q=P-R[i]+1
}}return Q
};
aipo.calendar.sortByRegion=function(K,L){var H=parseInt(dojo.getComputedStyle(K).top);
var I=parseInt(dojo.getComputedStyle(L).top);
var G=H+parseInt(dojo.getComputedStyle(K).height);
var J=G+parseInt(dojo.getComputedStyle(L).height);
if(H==I){return J-G
}else{return H-I
}};
aipo.calendar.getDate=function(C,D){tmpYear=parseInt(C.substring(0,4),10);
tmpMonth=parseInt(C.substring(5,7),10);
tmpDay=parseInt(C.substring(8,10),10);
if(D>0){do{tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
if(tmpDay+D<=tmpMonthDays){tmpDay=tmpDay+D;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}D=-1
}else{D=D-(tmpMonthDays-tmpDay)-1;
if(tmpMonth==12){tmpYear++;
tmpMonth=1
}else{tmpMonth++
}tmpDay=1
}}while(D>=0)
}else{if(D<0){do{if(tmpDay+D>0){tmpDay=tmpDay+D;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}D=1
}else{if(tmpMonth==1){tmpYear--;
tmpMonth=12
}else{tmpMonth--
}tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
D=D+tmpDay;
tmpDay=tmpMonthDays
}}while(D<=0)
}else{date=C
}}return date
};
aipo.calendar.getDay=function(C,D){if(D==2){if(!(C%4)&&((C%100)||!(C%400))){return 29
}else{return 28
}}else{if(D==4||D==6||D==9||D==11){return 30
}else{return 31
}}};
aipo.calendar.setGridArray=function(E,F){var D=0;
if(aipo.calendar.gridArray){delete (aipo.calendar.gridArray)
}aipo.calendar.gridArray=new Array(F);
for(i=0;
i<F;
i++){D=dojo._abs(dojo.byId("weeklyDay"+i+"-"+E),true).x;
aipo.calendar.gridArray[i]=D
}};
aipo.calendar.getCurrentMouseX=function(L,K){if(aipo.calendar.gridArray==null){return{index:-1,x:0}
}var N=aipo.calendar.gridArray[0];
var I=0;
var M;
if(K.pageX>N){var H=parseInt(aipo.calendar.gridArray.length)-1;
if(dojo.byId("view_type_"+L)&&dojo.byId("top_form_"+L).value=="simple"){H=parseInt(dojo.byId("view_type_"+L).value)-1
}for(M=H;
M>-1;
M--){if(K.pageX>aipo.calendar.gridArray[M]){I=M;
break
}}}else{I=0
}var J=aipo.calendar.gridArray[I]-N;
return{index:I,x:J}
};
aipo.calendar.onCloseMemberpicker=function(B){aipo.calendar.populateWeeklySchedule(B)
};
aipo.calendar.showTooltip=function(N,L,I){var M="";
var P="";
var O="";
var J="";
var K=function(A){var B=function(C){switch(C){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(A).replace(/[<>&"']/g,B)
};
dojo.style(I,"display","block");
dojo.xhrGet({portletId:L,url:N,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(E,A){if(!E.id){dojo.style(I,"display","none");
return 
}if(!E.isSpan){M='<span style="font-size: 0.90em;">'+E.date+"</span><br/>"
}if(E.memberList){var B=E.memberList.length;
for(var D=0;
D<B;
D++){P+="<li>"+K(E.memberList[D].aliasName.value)+"</li>"
}}if(E.facilityList){var C=E.facilityList.length;
for(var D=0;
D<C;
D++){O+="<li>"+K(E.facilityList[D].facilityName.value)+"</li>"
}}if(E.place!=""){J='<span style="font-size: 0.90em;">場所</span><br/><ul><li>'+E.place+"</li></ul>"
}if(P!=""){P='<span style="font-size: 0.90em;">参加者</span><br/><ul>'+P+"</ul>"
}if(O!=""){O='<span style="font-size: 0.90em;">設備</span><br/><ul>'+O+"</ul>"
}var F="<h4>"+E.name+"</h4>"+M+P+O+J;
I.innerHTML=F
}})
};
dojo.declare("aipo.calendar.DummyDivObject",null,{portletId:null,parentnode:null,draggable:null,TooltipObject:null,constructor:function(C,D){this.portletId=D.pid;
this.parentnode=D.node;
this.node=dojo.byId(C);
this.events=[dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseover",this,"onMouseOver")]
},onMouseDown:function(B){this.hide();
if(this.parentnode==null||this.parentnode=="undefined"){return 
}if(this.draggable){this.draggable.onMouseDown(B)
}},onMouseOver:function(B){if(this.parentnode==null||this.parentnode=="undefined"){return 
}},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},hide:function(){dojo.marginBox(this.node,{l:0,t:-10000,w:0,h:0})
}});
dojo.declare("aipo.calendar.WeeklyScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,isResize:false,distance:3,lastScroll:0,onFirstMove:function(H){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}var F=dojo.clone(this.node);
F.id="schedule-dummy-"+this.portletId;
F.style.zIndex=998;
dojo.style(F,"opacity",0);
var G=dojo.byId("scheduleGarage-"+this.portletId);
G.appendChild(F);
this.tmpDraggable=F;
dojo.connect(this.node,"onmousedown",this,"onMouseDown");
if(dojo.isIE){document.onkeydown=function(A){dojo.style(F,"opacity",0.3)
};
document.onkeyup=function(A){dojo.style(F,"opacity",0)
}
}else{dojo.connect(null,"onkeydown",this,"onKeyPress");
dojo.connect(null,"onkeyup",this,"onKeyPress")
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
dojo.style(this.node,"opacity",0.5);
this.node.style.zIndex=999;
this.startY=this._pageY;
this.startAbsoluteY=dojo._abs(dojo.byId(this.node),true).y;
var E=window.navigator.userAgent.toLowerCase();
if(E.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(E.indexOf("safari")>-1){this.startAbsoluteY-=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}this.startHeight=parseInt(dojo.getComputedStyle(this.node).height);
this.startTop=parseInt(dojo.getComputedStyle(this.node).top);
if(this.startHeight-6<this.startY-this.startAbsoluteY){this.isResize=true
}aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
lastScroll=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop
},onKeyPress:function(B){if(B.ctrlKey){dojo.style(this.tmpDraggable,"opacity",0.3)
}else{dojo.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(Q){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
if(this.dragSource.tmpHeight>3){dojo.style(this.node,"height",this.dragSource.tmpHeight+"px");
this.dragSource.tmpHeight=3
}var N=ptConfig[this.portletId].distance;
var L=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
this.leftTop.t=Math.floor((this.leftTop.t+L)/N)*N;
if(this.isResize){if(-this.startTop+this.leftTop.t+this.startHeight<0){dojo.style(this.node,"height","0px");
this.leftTop.t+=this.startHeight
}else{var O;
if(this.leftTop.t+this.startHeight>864){O=864-this.startTop-3
}else{O=-this.startTop+this.leftTop.t+this.startHeight
}this.leftTop.t=this.startTop;
this.leftTop.h=parseInt(O)-1
}}else{if(!this.disableY){if(this.leftTop.t<0){this.leftTop.t=0
}if(this.leftTop.t+this.startHeight>864){this.leftTop.t=864-this.startHeight-6
}}}if(!this.disableX){mouseX=aipo.calendar.getCurrentMouseX(this.portletId,Q);
this.leftTop.l=mouseX.x;
this.dragSource.schedule.index=mouseX.index
}dojo.marginBox(this.node,this.leftTop);
var P=parseInt(dojo.getComputedStyle(this.node).top);
var R=parseInt(dojo.getComputedStyle(this.node).height)+1;
var S=P/N;
var T=Math.floor(S/12);
var K=Math.floor(S%12);
T=(T>9)?T:"0"+T;
K=(K>1)?K*(60/12):"0"+K*(60/12);
var M=this.dragSource.count;
dojo.byId("scheduleDivStartTime-"+M+"-"+this.portletId).innerHTML=T+":"+K;
this.dragSource.schedule.startDateHour=T;
this.dragSource.schedule.startDateMinute=K;
this.dragSource.schedule.startDate=T+":"+K;
S+=R/N;
T=Math.floor(S/12);
K=Math.floor(S%12);
T=(T>9)?T:"0"+T;
K=(K>1)?K*(60/12):"0"+K*(60/12);
dojo.byId("scheduleDivEndTime-"+M+"-"+this.portletId).innerHTML=T+":"+K;
this.dragSource.schedule.endDateHour=T;
this.dragSource.schedule.endDateMinute=K;
this.dragSource.schedule.endDate=T+":"+K;
dojo.byId("scheduleDivSepalater-"+M+"-"+this.portletId).innerHTML="-";
return 
},onMouseUp:function(F){ptConfig[this.portletId].isTooltipEnable=true;
if(dojo.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){dojo.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var D=parseInt(dojo.getComputedStyle(this.node).height);
if(D<ptConfig[this.portletId].rowHeight){dojo.style(this.node,"height",ptConfig[this.portletId].rowHeight+"px");
this.dragSource.tmpHeight=D
}else{this.dragSource.tmpHeight=-1
}var E="";
if(F.ctrlKey){E+="&mode=insert"
}else{E+="&mode=update"
}E+="&entityid="+this.dragSource.schedule.scheduleId;
E+="&view_start="+ptConfig[this.portletId].jsonData.date[0].substring(0,10);
if(this.dragSource.schedule.repeat){E+="&edit_repeat_flag=1";
E+="&view_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.tmpIndex].substring(0,10)
}E+="&start_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.startDateHour+"-"+this.dragSource.schedule.startDateMinute;
E+="&end_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.endDateHour+"-"+this.dragSource.schedule.endDateMinute;
aipo.calendar.populateWeeklySchedule(this.portletId,E);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this.dragSource.destroy()
}});
dojo.declare("aipo.calendar.WeeklyScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleDragMoveObject,isDraggable:false,scheduleObjId:null,constructor:function(C,D){this.scheduleObjId=D.sid
},onMouseDown:function(B){ptConfig[this.portletId].isTooltipEnable=false;
if(!!aipo.calendar.dummyDivObj&&!!aipo.calendar.dummyDivObj.TooltipObject){aipo.calendar.dummyDivObj.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(D){if(this.schedule.isDrag||!this.isDraggable){return 
}var C=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+C,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(B){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(B)
}},setupTooltip:function(E){var D=this.schedule.scheduleId;
var F=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(C,A){var B=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+F+"&scheduleid="+D;
aipo.calendar.showTooltip(B,this.portletId,C)
});
this.TooltipObject._onHover(E)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(B){this.isDraggable=B
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{positionFrom:-1,positionTo:-1,moveIndex:0,onFirstMove:function(D){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
dojo.style(this.node,"opacity",0.5);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
var E=dojo.clone(this.node);
E.id="schedule-dummy-"+this.portletId;
E.style.zIndex=998;
dojo.style(E,"opacity",0);
var F=dojo.byId(this.node.parentNode.id);
F.appendChild(E);
this.tmpDraggable=E;
if(dojo.isIE){document.onkeydown=function(A){dojo.style(E,"opacity",0.3)
};
document.onkeyup=function(A){dojo.style(E,"opacity",0)
}
}else{dojo.connect(null,"onkeydown",this,"onKeyPress");
dojo.connect(null,"onkeyup",this,"onKeyPress")
}},onKeyPress:function(B){if(B.ctrlKey){dojo.style(this.tmpDraggable,"opacity",0.3)
}else{dojo.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(V){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
var P=ptConfig[this.portletId].distance;
var Q=(dojo.byId("view_type_"+this.portletId)&&dojo.byId("top_form_"+this.portletId)&&dojo.byId("top_form_"+this.portletId).value=="simple")?dojo.byId("view_type_"+this.portletId).value:ptConfig[this.portletId].scheduleDivDaySum;
var W=aipo.calendar.getCurrentMouseX(this.portletId,V);
_tmpIndex=W.index;
if(!this.disableX){var M=this.dragSource.schedule;
var U=this.dragSource.termType;
var S=this.dragSource.scheduleNode;
var T,N;
if(U=="center"){if(this.positionFrom==-1&&_tmpIndex!=-1){this.positionFrom=_tmpIndex;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
N=M.indexReal+this.moveIndex;
T=M.colspanReal;
var R=Q;
if(T+N>R){if(N<0){T=R
}else{T=R-N
}}else{if(N<0){T=T+N
}}if(N<0){N=0
}}else{if(U=="left"){if(this.positionFrom==-1){this.positionFrom=M.index;
this.positionTo=M.index
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
if(this.positionTo>=this.positionFrom+M.colspanReal){N=M.indexReal+M.rowspan-1;
T=this.positionTo-this.positionFrom-M.colspanReal+2
}else{N=this.positionTo;
T=M.rowspan+this.positionFrom-this.positionTo
}}else{if(this.positionFrom==-1){this.positionFrom=M.index;
this.positionTo=M.index
}if(this.positionTo!=-1&&_tmpIndex!=-1&&this._tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-M.index-M.rowspan+this.positionTo+1;
if(this.positionTo<=this.positionFrom){N=this.positionTo;
T=this.positionFrom-this.positionTo+1
}else{N=M.index;
T=this.positionTo-M.index+1
}}}var O=100/Q*T;
var X=100/Q*N;
dojo.style(S,"left",X+"%");
dojo.style(S,"width",O+"%")
}},onMouseUp:function(M){ptConfig[this.portletId].isTooltipEnable=true;
if(dojo.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){dojo.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var P=this.dragSource.schedule;
var J=ptConfig[this.portletId].jsonData.date[0].substring(0,10);
var O=this.dragSource.termType;
var K=this.dragSource.scheduleNode;
var I,N;
if(dojo.byId("top_form_"+this.portletId).value=="simple"){I=ptConfig[this.portletId].jsonData.date[0];
N=ptConfig[this.portletId].jsonData.date[0]
}if(O=="center"){I=aipo.calendar.getDate(J,P.indexReal+this.moveIndex)+"-00-00";
N=aipo.calendar.getDate(J,P.indexReal+this.moveIndex+P.colspanReal-1)+"-00-00"
}else{if(O=="left"){if(P.colspanReal-this.moveIndex>0){I=aipo.calendar.getDate(J,P.indexReal+this.moveIndex)+"-00-00";
N=aipo.calendar.getDate(J,P.indexReal+P.colspanReal-1)+"-00-00"
}else{I=aipo.calendar.getDate(J,P.indexReal+P.colspanReal-1)+"-00-00";
N=aipo.calendar.getDate(J,P.indexReal+this.moveIndex)+"-00-00"
}}else{if(P.colspanReal+this.moveIndex>0){I=aipo.calendar.getDate(J,P.indexReal)+"-00-00";
N=aipo.calendar.getDate(J,P.indexReal+P.colspanReal+this.moveIndex-1)+"-00-00"
}else{I=aipo.calendar.getDate(J,P.indexReal+P.colspanReal+this.moveIndex-1)+"-00-00";
N=aipo.calendar.getDate(J,P.indexReal)+"-00-00"
}}}this.positionFrom=-1;
this.positionTo=-1;
this.moveIndex=0;
this.tmpIndex=0;
var L="";
if(M.ctrlKey){L+="&mode=insert"
}else{L+="&mode=update"
}L+="&is_span=TRUE";
L+="&entityid="+this.dragSource.schedule.scheduleId;
L+="&view_start="+J;
L+="&start_date="+I;
L+="&end_date="+N;
aipo.calendar.populateWeeklySchedule(this.portletId,L);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleDragMoveObject,isDraggable:false,TooltipObject:null,scheduleObjId:null,isDraggable:false,constructor:function(C,D){this.scheduleObjId=D.sid
},onMouseDown:function(B){ptConfig[this.portletId].isTooltipEnable=false;
if(this.TooltipObject){this.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(D){if(this.schedule.isDrag||!this.isDraggable){return 
}var C=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+C,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(B){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(B)
}},setupTooltip:function(E){var D=this.schedule.scheduleId;
var F=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(C,A){var B=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+F+"&scheduleid="+D;
aipo.calendar.showTooltip(B,this.portletId,C)
});
this.TooltipObject._onHover(E)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(B){this.isDraggable=B
}});
dojo.declare("aipo.calendar.WeeklyScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:0,positionTo:0,_isDragging:false,lastScroll:0,_isLocked:false,onMouseDown:function(B){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(D){this.startY=this.dragSource._lastY;
this.startAbsoluteY=dojo._abs(dojo.byId(this.node),true).y;
this.startX=dojo.getComputedStyle(this.node).left;
var C=window.navigator.userAgent.toLowerCase();
if(C.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(C.indexOf("safari")>-1){this.startAbsoluteY-=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}lastScroll=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop;
aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments)
},onMouseMove:function(H){if(this._isLocked){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
var I=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
var J=Math.floor((this.startY-this.startAbsoluteY)/this._rowHeight_);
var G=Math.floor((this.startY+this.leftTop.t-this.startAbsoluteY+I)/this._rowHeight_);
var L=0;
var K=0;
if(G<J){L=G*this._rowHeight_+1;
K=(J-G+1)*this._rowHeight_;
this.positionFrom=G;
this.positionTo=J+1
}else{L=J*this._rowHeight_+1;
K=(G-J+1)*this._rowHeight_;
this.positionTo=G+1;
this.positionFrom=J
}if(L+K>864){K=864-L-this._rowHeight_;
this.positionTo=47
}this.leftTop.t=L;
this.leftTop.l=this.startX;
this.leftTop.h=K;
dojo.marginBox(this.node,this.leftTop);
dojo.style(this.node,"opacity",0.5)
},onMouseUp:function(I){if(!this._isDragging){this.onFirstMove(I);
this.onMouseMove(I)
}var G=Math.floor(this.positionFrom/2);
G=(G>9)?G:"0"+G;
var H=Math.floor(this.positionFrom%2)*30;
var K=ptConfig[this.portletId].jsonData.date[this.dragSource.index].substring(0,10);
var J=K+"-"+G+"-"+H;
G=Math.floor(this.positionTo/2);
G=(G>9)?G:"0"+G;
H=Math.floor(this.positionTo%2)*30;
var L=K+"-"+G+"-"+H;
this.node.style.top="0px";
this.node.style.height="864px";
dojo.style(this.node,"opacity",0);
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&form_start="+J+"&form_end="+L,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"]);
this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this._isLocked=true;
setTimeout(function(){this._isLocked=false
},5000)
}});
dojo.declare("aipo.calendar.WeeklyScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleAddDragMoveObject,constructor:function(C,D){this.index=D.idx
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:-1,positionTo:-1,_isDragging:false,scheduleObjId:null,onMouseDown:function(B){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(B){aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum))
},onMouseMove:function(K){aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
dojo.style(this.node,"opacity",0.5);
var O=aipo.calendar.getCurrentMouseX(this.portletId,K);
var J=O.index;
if(this.positionFrom==-1&&J!=-1){this.positionFrom=J;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&J!=-1){this.positionTo=J
}if(this.positionTo!=-1&&this.positionFrom!=-1){var P,I;
if(this.positionTo>this.positionFrom){I=this.positionFrom;
P=this.positionTo-this.positionFrom+1
}else{I=this.positionTo;
P=this.positionFrom-this.positionTo+1
}var M;
var L;
if(dojo.byId("view_type_"+this.portletId)&&dojo.byId("top_form_"+this.portletId).value=="simple"){var N=parseInt(dojo.byId("view_type_"+this.portletId).value);
M=100/N*P;
L=100/N*I
}else{M=100/ptConfig[this.portletId].scheduleDivDaySum*P;
L=100/ptConfig[this.portletId].scheduleDivDaySum*I
}dojo.style(this.node,"left",L+"%");
dojo.style(this.node,"width",M+"%")
}else{dojo.style(this.node,"left",0+"%");
dojo.style(this.node,"width",0+"%")
}},onMouseUp:function(H){if(!this._isDragging){this.onFirstMove(H);
this.onMouseMove(H)
}var G,I;
if(this.positionTo!=-1&&this.positionFrom!=-1){if(this.positionTo>this.positionFrom){G=this.positionFrom;
I=this.positionTo
}else{I=this.positionFrom;
G=this.positionTo
}var J=ptConfig[this.portletId].jsonData.date[G];
var F=ptConfig[this.portletId].jsonData.date[I];
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&is_span=TRUE&form_start="+J+"&form_end="+F,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
}this.positionFrom=-1;
this.positionTo=-1;
dojo.style(this.node,"left",0+"%");
dojo.style(this.node,"width",100+"%");
dojo.style(this.node,"opacity",0);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleAddDragMoveObject,constructor:function(C,D){this.index=D.idx
}});
aipo.schedule.initCalendar=function(D){for(var C=0;
C<ptConfig[D].scheduleDivDaySum;
C++){tmpDraggable=new aipo.calendar.WeeklyScheduleAddDraggable("scheduleDivAdd0"+C+"_"+D,{idx:C});
tmpDraggable.portletId=D;
tmpDraggable.index=C
}tmpDraggable=new aipo.calendar.WeeklyTermScheduleAddDraggable("termScheduleDivAdd_"+D,{idx:0});
tmpDraggable.portletId=D;
aipo.calendar.populateWeeklySchedule(D)
};
aipo.schedule.groupSelectOnchange=function(J,Q,P,M){var N=function(D,E){var A="";
M.dropDown.removeMember(dojo.byId("member_to-"+P));
for(var B=0;
B<D.length;
B++){var C=D[B].aliasName.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
if(B!=0){A+=" "
}L+="&m_id="+D[B].name;
A+='<span class="dispUser color'+B+'">'+C+"</span>";
aimluck.io.addOption(dojo.byId("member_to-"+P),D[B].name,C,true)
}dojo.byId("member_to_input-"+P).innerHTML=A
};
var R=dojo.query("#adduser-"+P);
switch(J.value.indexOf("pickup")){case -1:R.addClass("hide");
var L="";
dojo.xhrGet({portletId:P,url:J.value,encoding:"utf-8",handleAs:"json-comment-filtered",load:N,handle:function(){aipo.calendar.populateWeeklySchedule(P,L)
}});
break;
default:R.removeClass("hide");
M.dropDown.removeMember(dojo.byId("member_to-"+P));
M.dropDown.removeMember(dojo.byId("tmp_member_to-"+P));
var O=dojo.byId("picked_memberlist-"+P).options;
for(var K=0;
K<O.length;
K++){(function(A,B){A.selected=true
})(O[K],K)
}M.dropDown.addMember(dojo.byId("picked_memberlist-"+P),dojo.byId("tmp_member_to-"+P));
M.dropDown.addMember(dojo.byId("picked_memberlist-"+P),dojo.byId("member_to-"+P));
M.inputMemberSync();
aipo.calendar.populateWeeklySchedule(P);
dojo.xhrGet({portletId:P,url:dojo.byId("groupselect-defaulturl-"+P).value,encoding:"utf-8",handleAs:"json-comment-filtered"});
break
}}
};