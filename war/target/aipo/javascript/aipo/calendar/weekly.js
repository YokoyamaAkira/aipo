if(!dojo._hasResource["aipo.calendar.weekly"]){dojo._hasResource["aipo.calendar.weekly"]=true;
dojo.provide("aipo.calendar.weekly");
dojo.require("aimluck.dnd.Draggable");
dojo.require("aipo.widget.ToolTip");
dojo.require("aipo.widget.MemberNormalSelectList");
dojo.require("aipo.widget.GroupNormalSelectList");
aipo.calendar.objectlist=Array();
aipo.calendar.maximum_to=30;
function hasClass(B,A){return B.className.match(new RegExp("(\\s|^)"+A+"(\\s|$)"))
}function addClass(B,A){if(!this.hasClass(B,A)){B.className+=" "+A
}}function removeClass(C,A){if(hasClass(C,A)){var B=new RegExp("(\\s|^)"+A+"(\\s|$)");
C.className=C.className.replace(B," ")
}}aipo.calendar.changeDisypayPeriod=function(J,G){var C=dojo.byId("weeklyHeadRights-"+G).children;
var E=dojo.byId("weeklyTermRights-"+G).children;
var H=dojo.byId("weeklyRights-"+G).children;
dojo.byId("view_type_"+G).value=J;
var I=dojo.byId("indicateDate_"+G);
if(I==null){return 
}for(var F=0;
F<7;
F++){var B=C[F];
var D=H[F];
var A=E[F];
var K=dojo.byId("scheduleDivAdd0"+F+"_"+G);
switch(J){case"1":I.innerHTML="<span>1日</span>";
D.className="weeklyRight";
if(F==0){B.className="weeklyHeadRightR weeklyHeadRightborder"+F+"_"+G;
B.style.width="100%";
D.style.width="100%";
A.style.width="100%";
addClass(A,"weeklyTermRightR");
K.style.width="100%"
}else{B.className="weeklyHeadRight weeklyHeadRightborder"+F+"_"+G;
B.style.width="0%";
B.style.display="none";
D.style.width="0%";
D.style.display="none";
A.style.width="0%";
A.style.display="none";
removeClass(A,"weeklyTermRightR");
K.style.width="0%";
K.style.display="none"
}break;
case"4":I.innerHTML="<span>4日</span>";
if(F==0){removeClass(A,"weeklyTermRightR")
}if(F<=3){B.style.width="25%";
B.style.left=F*25+"%";
B.style.display="";
D.style.width="25%";
D.style.left=F*25+"%";
D.style.display="";
A.style.width="25%";
A.style.left=F*25+"%";
A.style.display="";
K.style.width="25%";
K.style.left=F*25+"%";
K.style.display="";
if(F<3){B.className="weeklyHeadRight weeklyHeadRightborder"+F+"_"+G
}else{if(F==3){B.className="weeklyHeadRightR weeklyHeadRightborder"+F+"_"+G;
D.className="weeklyRightR";
addClass(A,"weeklyTermRightR")
}}}else{B.className="weeklyHeadRight weeklyHeadRightborder"+F+"_"+G;
B.style.width="0%";
B.style.display="none";
D.style.width="0%";
D.style.display="none";
A.style.width="0%";
A.style.display="none";
removeClass(A,"weeklyTermRightR");
K.style.width="0%";
K.style.display="none"
}break;
case"7":I.innerHTML="<span>7日</span>";
B.style.left=F*(100/7)+"%";
B.style.display="";
B.style.width="14.2857%";
D.style.left=F*(100/7)+"%";
D.style.display="";
D.style.width="14.2857%";
A.style.left=F*(100/7)+"%";
A.style.display="";
A.style.width="14.2857%";
K.style.left=F*(100/7)+"%";
K.style.display="";
K.style.width="14.2857%";
if(F==0){removeClass(A,"weeklyTermRightR")
}if(F<6){B.className="weeklyHeadRight weeklyHeadRightborder"+F+"_"+G;
D.className="weeklyRight";
removeClass(A,"weeklyTermRightR")
}else{B.className="weeklyHeadRightR weeklyHeadRightborder"+F+"_"+G;
D.className="weeklyRightR";
addClass(A,"weeklyTermRightR")
}}}};
aipo.calendar.populateWeeklySchedule=function(E,F){var C;
var D=dojo.byId("member_to-"+E);
if(typeof F=="undefined"||typeof ptConfig[E].jsonData=="undefined"){C=""
}else{C=F
}var B=dojo.byId("secid-"+E);
if(B){C+="&secid="+B.value
}if(C.match(/ign_dup_f/)==null){if(D){var G=D.options;
to_size=G.length;
if(to_size==0){C+="&m_id="+aipo.schedule.login_id;
C+="&m_empty=empty";
dojo.byId("calender_m_empty_"+E).style.display=""
}else{C+="&m_empty=";
dojo.byId("calender_m_empty_"+E).style.display="none"
}for(i=0;
i<to_size;
i++){G[i].selected=true;
C+="&m_id="+G[i].value
}}var A=dojo.byId("showAll-"+E);
if(A){C+="&s_all="+A.value
}}djConfig.usePlainJson=true;
ptConfig[E].reloadFunction=aipo.calendar.populateWeeklySchedule;
ptConfig[E].isTooltipEnable=false;
if(aipo.calendar.dummyDivObj){aipo.calendar.dummyDivObj.destroy();
aipo.calendar.dummyDivObj=null
}if(dojo.byId("groupselect-"+E).value.indexOf("pickup")!=-1){C+="&pickup=true"
}dojo.xhrGet({portletId:E,url:ptConfig[E].jsonUrl+C,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(r,g){if(aipo.calendar.reloadMonthlyCalendar!=null){aipo.calendar.reloadMonthlyCalendar()
}obj_error=dojo.byId("error-"+E);
dojo.style(obj_error,"display","none");
if("PermissionError"==r[0]){dojo.style(obj_error,"display","block");
obj_error.innerHTML=r[1];
obj_content=dojo.byId("content-"+E);
dojo.style(obj_content,"display","none");
obj_indicator=dojo.byId("indicator-"+E);
dojo.style(obj_indicator,"display","none");
return 
}else{if(r.errList){if("duplicate_facility"==r.errList[0]){if(confirm("既に同じ時間帯に設備が予約されています。スケジュールを登録しますか？")){var I=C+"&ign_dup_f=true";
aipo.calendar.populateWeeklySchedule(E,I);
aipo.portletReload("schedule",E);
return 
}}if("UpdateError"==r.errList[0]){dojo.style(obj_error,"display","block");
obj_error.innerHTML='<ul><li><span class="caution">'+r.errList[1]+"</span></li></ul>";
obj_content=dojo.byId("content-"+E);
dojo.style(obj_content,"visibility","visible");
obj_indicator=dojo.byId("indicator-"+E);
dojo.style(obj_indicator,"display","none")
}}}var h;
if(!!aipo.calendar.objectlist){var m=aipo.calendar.objectlist.length;
for(h=0;
h<m;
h++){var a=aipo.calendar.objectlist[h];
if(a.portletId==E){a.destroy()
}}}if(!aipo.errorTreatment(r,ptConfig[E].thisUrl)){return 
}ptConfig[E].jsonData=r;
var p=Array(ptConfig[E].scheduleDivDaySum);
for(var h=0;
h<ptConfig[E].scheduleDivDaySum;
h++){p[h]=Array()
}var Q=0;
var q=0;
var R=0;
var X="";
var S="";
var e="";
var O="";
var Z=[];
var Y,W,V,U;
var n=r.startDate.substring(0,4)+"年"+parseInt(r.startDate.substring(5,7),10)+"月"+parseInt(r.startDate.substring(8,10),10)+"日"+r.dayOfWeek[0];
dojo.byId("viewWeekly-"+E).innerHTML=n;
var H="";
var f="";
var M=dojo.byId("top_form_"+this.portletId).value=="simple";
var c=dojo.byId("view_type_"+this.portletId).value=="1";
var P=dojo.byId("view_type_"+this.portletId).value=="4";
var l=window.navigator.userAgent.toLowerCase().indexOf("ipad")>=0;
if(M&&c){H="width: 100%;";
f="width: 0%;display: none;"
}e+='<table id="termTable_'+this.portletId+'" style="width:100%;" cellspacing="0" cellpadding="0" border="0"><tbody>';
var d=dojo.byId("weeklyScrollPane_"+this.portletId);
dojo.forEach(r.termSchedule,function(s){var t="";
var x="";
if(M&&(c||P)){t=' style="display: none;"';
R++;
for(k=0;
k<s.length;
k++){v=s[k];
if(v.index==0||(M&&P&&v.index<4)){t="";
x=" weeklyTermRightR";
R--;
break
}}}var v=null;
var u=scheduleTooltipEnable!==true&&M&&c?"border-right:0":"";
if(scheduleTooltipEnable!==true&&M&&c){e+="<tr"+t+'><td colspan="2" nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}else{e+="<tr"+t+'><td nowrap="nowrap" width="100%" height="17px" valign="top"><div class="weeklyTermRights">'
}if(M&&P){e+='<div class="_weeklyHeadRightborder0_'+E+" weeklyTermRight weeklyTermRightL"+x+'" id="termDay0-'+q+"-"+E+'" style="width: 25%;left: 0%;'+H+u+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder1_'+E+' weeklyTermRight" id="termDay1-'+q+"-"+E+'" style="width: 25%;left: 25%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder2_'+E+' weeklyTermRight" id="termDay2-'+q+"-"+E+'" style="width: 25%;left: 50%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder3_'+E+' weeklyTermRight weeklyTermRightR" id="termDay3-'+q+"-"+E+'" style="width: 25%;left: 75%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder4_'+E+' weeklyTermRight" id="termDay4-'+q+"-"+E+'" style="left: 57.1429%;display:none;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder5_'+E+' weeklyTermRight" id="termDay5-'+q+"-"+E+'" style="left: 71.4286%;display:none;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder6_'+E+' weeklyTermRight weeklyTermRightR" id="termDay6-'+q+"-"+E+'" style="left: 85.7143%;display:none;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
O+='<div id="termScheduleItemGarage-'+q+"-"+E+'" class="weeklyTermRights" style="top:'+(-(17*(q-R+1)))+'px"> </div>'
}else{e+='<div class="_weeklyHeadRightborder0_'+E+" weeklyTermRight weeklyTermRightL"+x+'" id="termDay0-'+q+"-"+E+'" style="left: 0%;'+H+u+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder1_'+E+' weeklyTermRight" id="termDay1-'+q+"-"+E+'" style="left: 14.2857%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder2_'+E+' weeklyTermRight" id="termDay2-'+q+"-"+E+'" style="left: 28.5714%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder3_'+E+' weeklyTermRight" id="termDay3-'+q+"-"+E+'" style="left: 42.8571%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder4_'+E+' weeklyTermRight" id="termDay4-'+q+"-"+E+'" style="left: 57.1429%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder5_'+E+' weeklyTermRight" id="termDay5-'+q+"-"+E+'" style="left: 71.4286%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
e+='<div class="_weeklyHeadRightborder6_'+E+' weeklyTermRight weeklyTermRightR" id="termDay6-'+q+"-"+E+'" style="left: 85.7143%;'+f+'"><div class="weeklyTermRightTop">&nbsp;</div></div>';
O+='<div id="termScheduleItemGarage-'+q+"-"+E+'" class="weeklyTermRights" style="top:'+(-(17*(q-R+1)))+'px"> </div>'
}var w;
e+="</div></td></tr>";
q++
});
e+="</tbody></table>";
dojo.byId("termScheduleGarage-"+E).innerHTML=e;
dojo.byId("termScheduleDivAdd_"+E).style.height=(17*(q-R+1))+"px";
dojo.byId("termScheduleDivAdd_"+E).style.top=(-(17*(q-R+1)))+"px";
dojo.byId("termScheduleContainer-"+E).innerHTML=O;
dojo.byId("weeklyTermLeftTopTall-"+E).style.height=(17*(q-R))+"px";
for(var h=0;
h<ptConfig[E].scheduleDivDaySum;
h++){Y=dojo.byId("weeklyDay"+h+"-"+E);
W=dojo.byId("weeklyHoliday"+h+"-"+E);
V=dojo.byId("weeklyRight"+h+"-"+E);
U=dojo.byId("termDay"+h+"-"+E);
Y.innerHTML=parseInt(r.date[h].substring(8,10),10)+r.dayOfWeek[h];
W.innerHTML=r.holiday[h];
if(r.dayOfWeek[h]=="（土）"){dojo.addClass(Y,"saturday");
dojo.addClass(W,"saturday");
dojo.addClass(V,"saturday");
dojo.addClass(U,"saturday")
}else{dojo.removeClass(Y,"saturday");
dojo.removeClass(W,"saturday");
dojo.removeClass(V,"saturday");
dojo.removeClass(U,"saturday")
}if(r.dayOfWeek[h]=="（日）"){dojo.addClass(Y,"sunday");
dojo.addClass(W,"sunday");
dojo.addClass(V,"sunday");
dojo.addClass(U,"sunday")
}else{dojo.removeClass(Y,"sunday");
dojo.removeClass(W,"sunday");
dojo.removeClass(V,"sunday");
dojo.removeClass(U,"sunday")
}if(r.holiday[h]){dojo.addClass(Y,"holiday");
dojo.addClass(W,"holiday");
dojo.addClass(V,"holiday");
dojo.addClass(U,"holiday")
}else{dojo.removeClass(Y,"holiday");
dojo.removeClass(W,"holiday");
dojo.removeClass(V,"holiday");
dojo.removeClass(U,"holiday")
}}dojo.forEach(r.schedule,function(AI){var s=ptConfig[E].rowHeight;
var AE=AI.startDateHour*s*2+AI.startDateMinute*s/30;
var AH=AI.endDateHour*s*2+AI.endDateMinute*s/30-AE;
if(AH<=s){Z[Q]=AH;
AH=s
}else{Z[Q]=-1
}var x=100/ptConfig[E].scheduleDivDaySum*AI.index;
var v=100/ptConfig[E].scheduleDivDaySum*0.99;
var t=AI.name;
var w=Z[Q]==-1?((AI.startDateHour>9)?AI.startDate:"0"+AI.startDate):AI.name;
var AC=Z[Q]==-1?((AI.endDateHour>9)?AI.endDate:"0"+AI.endDate):"";
var AB=Z[Q]==-1?"-":"";
var AD=AI.scheduleId;
var AF="0";
var y="";
var u=dojo.byId("member_to-"+E);
if(u){var z=u.options;
for(h=0;
h<z.length;
h++){if(((AI.type=="U")&&(AI.ownerId==z[h].value))||((AI.type=="F")&&(AI.ownerId==z[h].value))){AF=h%aipo.calendar.maximum_to
}if(AI.memberList){var AA=0;
var AG=0;
for(j=0;
j<AI.memberList.length;
j++){if(AI.memberList[j].charAt(0)=="f"){AG++
}else{AA++
}}}}var y;
if(AI.userCount>1){y="[共有]"
}if(AI.facilityCount>0){y+="[設備]"
}}if(!AI["public"]){t+='<img src="images/schedule/schedule_secret.gif" border="0" width="16" height="16" alt="非公開" title="非公開" align="top" class="icon" />'
}if(AI.duplicate){t+='<img src="images/schedule/schedule_duplicate.gif" border="0" width="16" height="16" alt="重複スケジュール" title="重複スケジュール" align="top" class="icon" />'
}if(AI.repeat){t+='<img src="images/schedule/schedule_repeat.gif" border="0" width="16" height="16" alt="繰り返し" title="繰り返し" align="top" class="icon" />'
}if(AI.tmpreserve){t+='<img src="images/schedule/schedule_tmpreserve.gif" border="0" width="16" height="16" alt="仮スケジュール" title="仮スケジュール" align="top" class="icon" />'
}X+='<div id="schedule-'+Q+"-"+E+'" class="scheduleDiv color'+AF+'" style="top: '+AE+"px; left: "+x+"%; height: "+(AH-1)+"px; width: "+v+'%; z-index: 0; visibility: hidden;"><div class="scheduleDivFirstLine color'+AF+'"><span id="scheduleDivStartTime-'+Q+"-"+E+'" class="scheduleDivTime color'+AF+'">'+y+w+'</span><span id="scheduleDivSepalater-'+Q+"-"+E+'"  class="scheduleDivSepalater color'+AF+'">'+AB+'</span><span id="scheduleDivEndTime-'+Q+"-"+E+'" class="scheduleDivTime color'+AF+'">'+AC+'</span></div><div class="scheduleDivName color'+AF+'">'+t+'</div><div class="scheduleDivLastLine color'+AF+'"><center><div class="handleDiv color'+AF+'" align="center">&nbsp;</div></center></div></div>';
Q++
});
X+='<div id="dummy_div_'+E+'" class="scheduleDivAdd dummy_div" style=" position:absolute; width: 0px; height : 0px; left: 0px; top: -10000px; Filter: Alpha(Opacity=10);opacity:.10; background-color:#FFFFFF; ">&nbsp;</div>';
dojo.byId("scheduleGarage-"+E).innerHTML=X;
var o=null;
var N,L;
var T=[];
Q=0;
dojo.forEach(r.schedule,function(t){N=dojo.byId("schedule-"+Q+"-"+E);
var s=t.scheduleId;
o=new aipo.calendar.WeeklyScheduleDraggable(N,{pid:E,sid:'"schedule-'+Q+"-"+E+'"',handle:'"dummy_div_-'+E+'"'});
aipo.calendar.objectlist.push(o);
if(t.member||t.loginuser||t.owner||t["public"]){o.setDraggable(true)
}else{o.setDraggable(false)
}o.schedule=t;
o.tmpIndex=t.index;
o.count=Q;
o.tmpHeight=Z[Q];
o.position=0;
o.division=1;
o.portletId=E;
p[t.index].push(N);
if(t["public"]||t.member){dojo.connect(N,"onclick",o,"onScheduleClick")
}dojo.connect(N,"onmouseover",o,"onScheduleOver");
Q++
});
for(var h=0;
h<ptConfig[E].scheduleDivDaySum;
h++){aipo.calendar.relocation(E,p[h].length,p[h],100/ptConfig[E].scheduleDivDaySum*h);
p[h]=Array()
}Q=0;
q=0;
dojo.forEach(r.termSchedule,function(AB){var AG=null;
S="";
for(var AA=0;
AA<ptConfig[E].scheduleDivDaySum;
AA++){tmpNode5=dojo.byId("termDay"+AA+"-"+q+"-"+E);
if(r.dayOfWeek[AA]=="（土）"){dojo.addClass(tmpNode5,"saturday")
}else{dojo.removeClass(tmpNode5,"saturday")
}if(r.dayOfWeek[AA]=="（日）"){dojo.addClass(tmpNode5,"sunday")
}else{dojo.removeClass(tmpNode5,"sunday")
}if(r.holiday[AA]){dojo.addClass(tmpNode5,"holiday")
}else{dojo.removeClass(tmpNode5,"holiday")
}}for(k=0;
k<AB.length;
k++){AG=AB[k];
if(M&&P){var AD=AG.rowspan;
if(AG.rowspan+AG.index>4){AD=AD-(AG.rowspan+AG.index-4)
}var u=25*AD;
var w=25*AG.index;
if(AG.index>4){u=0
}}else{var u=100/ptConfig[E].scheduleDivDaySum*AG.rowspan;
var w=100/ptConfig[E].scheduleDivDaySum*AG.index
}var v="";
if(M&&c){u=100;
v=((AG.index==0)?"":"display: none;")
}var s=AG.name;
var AC=AG.scheduleId;
var AE="0";
var x="";
var t=dojo.byId("member_to-"+E);
if(t){var y=t.options;
for(AA=0;
AA<y.length;
AA++){if(((AG.type=="U")&&(AG.ownerId==y[AA].value))||((AG.type=="F")&&(AG.ownerId==y[AA].value))){AE=AA%aipo.calendar.maximum_to
}if(AG.memberList){var z=0;
var AF=0;
for(j=0;
j<AG.memberList.length;
j++){if(AG.memberList[j].charAt(0)=="f"){AF++
}else{z++
}}}}var x;
if(z>1){x="[共有]"
}if(AF>0){x+="[設備]"
}}if(!AG["public"]){s+='<img src="images/schedule/schedule_secret.gif" border="0" width="16" height="16" alt="非公開" title="非公開" align="top" class="icon" />'
}if(AG.duplicate){s+='<img src="images/schedule/schedule_duplicate.gif" border="0" width="16" height="16" alt="重複スケジュール" title="重複スケジュール" align="top" class="icon" />'
}if(AG.repeat){s+='<img src="images/schedule/schedule_repeat.gif" border="0" width="16" height="16" alt="繰り返し" title="繰り返し" align="top" class="icon" />'
}if(AG.tmpreserve){s+='<img src="images/schedule/schedule_tmpreserve.gif" border="0" width="16" height="16" alt="仮スケジュール" title="仮スケジュール" align="top" class="icon" />'
}if(u==100){u="99.99999"
}S+='<div id="termSchedule-'+Q+"-"+E+'" class="termScheduleDiv termColor'+AE+'" style="left: '+w+"%; width: "+u+"%;"+v+'"><div class="termScheduleDivHandleLeft" id="termScheduleDivHandleLeft-'+Q+"-"+E+'">&nbsp;</div><div class="termScheduleDivNameDiv">'+x+s+'</div><div class="termScheduleDivHandleRight" id="termScheduleDivHandleRight-'+Q+"-"+E+'">&nbsp;</div></div>';
Q++
}dojo.byId("termScheduleItemGarage-"+q+"-"+E).innerHTML=S;
q++
});
tableLeft=dojo.byId("weeklyTermLeft_"+E);
o=null;
Q=0;
q=0;
dojo.forEach(r.termSchedule,function(s){var u=null;
for(k=0;
k<s.length;
k++){u=s[k];
var t=u.scheduleId;
N=dojo.byId("termSchedule-"+Q+"-"+E);
L=dojo.byId("termScheduleDivHandleLeft-"+Q+"-"+E);
draggable3=dojo.byId("termScheduleDivHandleRight-"+Q+"-"+E);
o=new aipo.calendar.WeeklyTermScheduleDraggable(N,{pid:E,sid:"termSchedule-"+Q+"-"+E});
aipo.calendar.objectlist.push(o);
o.schedule=u;
o.scheduleNode=N;
o.portletId=E;
o.termType="center";
dojo.connect(N,"onclick",o,"onScheduleClick");
N.style.zIndex=1;
if(u.indexReal>=0){tmpDraggable2=new aipo.calendar.WeeklyTermScheduleDraggable(L,{pid:E,sid:"termScheduleDivHandleLeft-"+Q+"-"+E});
aipo.calendar.objectlist.push(tmpDraggable2);
tmpDraggable2.schedule=u;
tmpDraggable2.scheduleNode=N;
tmpDraggable2.portletId=E;
tmpDraggable2.termType="left";
if(u.member||u.loginuser||u.owner||u["public"]){tmpDraggable2.setDraggable(true)
}else{tmpDraggable2.setDraggable(false)
}}else{dojo.style(L,"cursor","pointer");
L.style.zIndex=1
}dojo.connect(L,"onclick",o,"onScheduleClick");
if(u.indexReal+u.colspanReal<=ptConfig[E].scheduleDivDaySum){tmpDraggable3=new aipo.calendar.WeeklyTermScheduleDraggable(draggable3,{pid:E,sid:"termScheduleDivHandleRight-"+Q+"-"+E});
aipo.calendar.objectlist.push(tmpDraggable3);
tmpDraggable3.schedule=u;
tmpDraggable3.scheduleNode=N;
tmpDraggable3.portletId=E;
tmpDraggable3.termType="right";
if(u.member||u.loginuser||u.owner||u["public"]){tmpDraggable3.setDraggable(true)
}else{tmpDraggable3.setDraggable(false)
}}else{dojo.style(draggable3,"cursor","pointer");
draggable3.style.zIndex=1
}dojo.connect(draggable3,"onclick",o,"onScheduleClick");
dojo.connect(N,"onmouseover",o,"onScheduleOver");
if(u.member||u.loginuser||u.owner||u["public"]){o.setDraggable(true)
}else{o.setDraggable(false)
}Q++
}q++
});
obj_content=dojo.byId("content-"+E);
dojo.style(obj_content,"visibility","visible");
obj_indicator=dojo.byId("indicator-"+E);
dojo.style(obj_indicator,"display","none");
dojo.removeClass(dojo.byId("tableWrapper_"+E),"hide");
var d=dojo.byId("weeklyScrollPane_"+E);
if((d.clientWidth==d.offsetWidth)&&!(l&&!M)){if(dojo.byId("weeklySpan-"+E)!=null){dojo.byId("weeklySpan-"+E).style.display="none"
}dojo.query(".weeklyTermTailTd_"+E).style("display","none");
if(dojo.byId("termTable_"+E)!=null){dojo.query("termTable_"+E).style("width","99.9999%")
}if(M&&c){dojo.query(".weeklyHeadRightborder0_"+E).style("border-right-style","none");
dojo.query("._weeklyHeadRightborder0_"+E).style("border-right-style","none");
dojo.byId("weeklyRight0-"+E).style.borderRightStyle="";
if(l){if(dojo.byId("weeklyRight0-"+E).className.indexOf("sunday")>=0||dojo.byId("weeklyRight0-"+E).className.indexOf("saturday")>=0){dojo.query(".scroll_width").style("padding-right","1px")
}else{dojo.query(".scroll_width").style("padding-right","0px")
}dojo.query(".weeklyTableHead").style("padding-right","1px")
}else{dojo.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(M&&P){if(l){dojo.query(".weeklyTableHead").style("padding-right","0px");
dojo.query(".scroll_width").style("padding-right","0px")
}else{dojo.byId("weeklyRight3-"+E).style.borderRightStyle="none";
dojo.query(".weeklyHeadRightborder3_"+E).style("border-right-style","none");
dojo.query("._weeklyHeadRightborder3_"+E).style("border-right-style","none");
dojo.query(".weeklyTableHead").style("padding-right","1px")
}}else{if(l){dojo.query(".scroll_width").style("padding-right","0px");
dojo.query(".weeklyTableHead").style("padding-right","0px")
}else{if(window.navigator.userAgent.toLowerCase().indexOf("chrome")>=0&&(dojo.byId("weeklyRight6-"+E).className.indexOf("sunday")>=0||dojo.byId("weeklyRight6-"+E).className.indexOf("saturday"))>=0){dojo.query(".scroll_width").style("padding-right","1px");
dojo.query(".weeklyTableHead").style("padding-right","1px")
}else{dojo.query(".scroll_width").style("padding-right","0px");
dojo.query(".weeklyTableHead").style("padding-right","0px")
}dojo.byId("weeklyRight6-"+E).style.borderRightStyle="none";
dojo.query(".weeklyHeadRightborder6_"+E).style("border-right-style","none");
dojo.query("._weeklyHeadRightborder6_"+E).style("border-right-style","none")
}}}}else{if(d.clientWidth!=d.offsetWidth&&d.offsetWidth-d.clientWidth!=18){if(dojo.byId("weeklySpan-"+E)!=null){dojo.byId("weeklySpan-"+E).width=(d.offsetWidth-d.clientWidth+1)+"px"
}dojo.query(".weeklyTermTailTd_"+E).width=(d.offsetWidth-d.clientWidth+1)+"px";
dojo.query(".weeklyTermTail").style("width",((d.offsetWidth-d.clientWidth+1)+"px"))
}}if(q==0){dojo.byId("termScheduleContainer-"+E).style.height="0px"
}else{}dojo.byId("weeklyTableHead_"+E).style.marginTop="5px";
var K=dojo.byId("weeklyTableHead_"+E).offsetHeight;
var b=dojo.byId("weeklyTermTr_"+E).offsetHeight;
K+=5;
K-=b;
b-=b%17;
K+=b;
dojo.byId("weeklyTableHeadWrapper_"+E).style.overflow="hidden";
dojo.byId("weeklyTableHeadWrapper_"+E).style.height=K+"px";
if(q>0){var J=0;
for(J=0;
J<7;
J++){if(dojo.byId("termDay"+J+"-"+(q-1)+"-"+E).className.indexOf("sunday")>=0||dojo.byId("termDay"+J+"-"+(q-1)+"-"+E).className.indexOf("saturday")>=0){dojo.byId("termDay"+J+"-"+(q-1)+"-"+E).style.height="95%"
}}}if(!ptConfig[E].isScroll){dojo.byId("weeklyScrollPane_"+E).scrollTop=ptConfig[E].contentScrollTop;
ptConfig[E].isScroll=true
}ptConfig[E].isTooltipEnable=true
}})
};
aipo.calendar.relocation=function(B,A,S,T){var O,N;
var R=0.99;
var J=100/7;
var Q=0;
var I=0;
var G=0;
var F=0;
var H=new Array(A);
var C=new Array(A);
var P=new Array(A);
var K=1;
var L=0;
if(dojo.byId("view_type_"+B).value=="1"&&dojo.byId("top_form_"+B).value=="simple"){K=7.2
}else{if(dojo.byId("view_type_"+B).value=="4"){K=1.75;
if(T>57){T=100
}}}S.sort(aipo.calendar.sortByRegion);
for(O=0;
O<A;
O++){S[O].style.zIndex=O+1
}for(O=0;
O<A;
O=Q){Q=aipo.calendar.overlapSchedule(S,O,O,++Q,A);
if(G<parseInt(dojo.getComputedStyle(S[O]).top)){F=O;
G=parseInt(dojo.getComputedStyle(S[F]).top);
I=0
}for(N=F;
N<Q;
N++){var E=parseInt(dojo.getComputedStyle(S[N]).top)+parseInt(dojo.getComputedStyle(S[N]).height)
}if(G<E){G=E
}for(N=F;
N<Q;
N++){C[N]=aipo.calendar.positionLeft(S,C,F,N,0);
if(C[N]>I){I=C[N]
}}for(N=F;
N<Q;
N++){P[N]=aipo.calendar.positionRight(S,C,I,F,N)
}for(N=F;
N<Q;
N++){H[N]=I
}}for(O=0;
O<A;
O++){var M;
var D;
if(H[O]!=0){if(C[O]<C[O+1]){M=(J*2/(H[O]+1))*0.8*R*K
}else{if(P[O]==0){M=(J-(J/(H[O]+1))*C[O])*R*K
}else{M=(J-(J/(H[O]+1))*C[O]-(J*2/(H[O]+1))*0.2-(J/(H[O]+1))*(P[O]-1))*R*K
}}}else{M=J*R*K
}D=(T+((J/(H[O]+1))*C[O]))*K;
if(D+M>100){M=100
}dojo.style(S[O],"width",M+"%");
dojo.style(S[O],"left",D+"%");
dojo.style(S[O],"visibility","visible")
}};
aipo.calendar.overlapSchedule=function(D,B,H,G,C){var F=parseInt(dojo.getComputedStyle(D[B]).top)+parseInt(dojo.getComputedStyle(D[B]).height);
var E=parseInt(dojo.getComputedStyle(D[H]).top)+parseInt(dojo.getComputedStyle(D[H]).height);
var A;
if(D[G]){A=parseInt(dojo.getComputedStyle(D[G]).top)
}else{A="NaN"
}if((G>C-1)||(F<A)||(E<A)){return G
}else{G=aipo.calendar.overlapSchedule(D,B,G,++G,C)
}G=aipo.calendar.overlapSchedule(D,B,H,G,C);
return G
};
aipo.calendar.positionLeft=function(F,E,H,G,B){var A=parseInt(dojo.getComputedStyle(F[G]).top);
for(i=H;
i<G;
i++){var D=parseInt(dojo.getComputedStyle(F[i]).top);
var C=D+parseInt(dojo.getComputedStyle(F[i]).height);
if((D<=A)&&(C>A)&&(E[i]==B)){B=aipo.calendar.positionLeft(F,E,H,G,++B)
}}return B
};
aipo.calendar.positionRight=function(A,E,G,D,H){var F=0;
var C=parseInt(dojo.getComputedStyle(A[H]).top);
for(i=D;
i<H;
i++){var B=parseInt(dojo.getComputedStyle(A[i]).top);
var I=B+parseInt(dojo.getComputedStyle(A[i]).height);
if((B<=C)&&(I>C)&&(E[i]>E[H])&&((G-E[i]+1)>F)){F=G-E[i]+1
}}return F
};
aipo.calendar.sortByRegion=function(C,B){var F=parseInt(dojo.getComputedStyle(C).top);
var E=parseInt(dojo.getComputedStyle(B).top);
var A=F+parseInt(dojo.getComputedStyle(C).height);
var D=A+parseInt(dojo.getComputedStyle(B).height);
if(F==E){return D-A
}else{return F-E
}};
aipo.calendar.getDate=function(A,B){tmpYear=parseInt(A.substring(0,4),10);
tmpMonth=parseInt(A.substring(5,7),10);
tmpDay=parseInt(A.substring(8,10),10);
if(B>0){do{tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
if(tmpDay+B<=tmpMonthDays){tmpDay=tmpDay+B;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}B=-1
}else{B=B-(tmpMonthDays-tmpDay)-1;
if(tmpMonth==12){tmpYear++;
tmpMonth=1
}else{tmpMonth++
}tmpDay=1
}}while(B>=0)
}else{if(B<0){do{if(tmpDay+B>0){tmpDay=tmpDay+B;
if((tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-0"+tmpDay
}else{if((tmpMonth<10)&&!(tmpDay<10)){date=tmpYear+"-0"+tmpMonth+"-"+tmpDay
}else{if(!(tmpMonth<10)&&(tmpDay<10)){date=tmpYear+"-"+tmpMonth+"-0"+tmpDay
}else{date=tmpYear+"-"+tmpMonth+"-"+tmpDay
}}}B=1
}else{if(tmpMonth==1){tmpYear--;
tmpMonth=12
}else{tmpMonth--
}tmpMonthDays=aipo.calendar.getDay(tmpYear,tmpMonth);
B=B+tmpDay;
tmpDay=tmpMonthDays
}}while(B<=0)
}else{date=A
}}return date
};
aipo.calendar.getDay=function(A,B){if(B==2){if(!(A%4)&&((A%100)||!(A%400))){return 29
}else{return 28
}}else{if(B==4||B==6||B==9||B==11){return 30
}else{return 31
}}};
aipo.calendar.setGridArray=function(C,B){var A=0;
if(aipo.calendar.gridArray){delete (aipo.calendar.gridArray)
}aipo.calendar.gridArray=new Array(B);
for(i=0;
i<B;
i++){A=dojo._abs(dojo.byId("weeklyDay"+i+"-"+C),true).x;
aipo.calendar.gridArray[i]=A
}};
aipo.calendar.getCurrentMouseX=function(D,E){if(aipo.calendar.gridArray==null){return{index:-1,x:0}
}var B=aipo.calendar.gridArray[0];
var G=0;
var C;
if(E.pageX>B){var A=parseInt(aipo.calendar.gridArray.length)-1;
if(dojo.byId("view_type_"+D)&&dojo.byId("top_form_"+D).value=="simple"){A=parseInt(dojo.byId("view_type_"+D).value)-1
}for(C=A;
C>-1;
C--){if(E.pageX>aipo.calendar.gridArray[C]){G=C;
break
}}}else{G=0
}var F=aipo.calendar.gridArray[G]-B;
return{index:G,x:F}
};
aipo.calendar.onCloseMemberpicker=function(A){aipo.calendar.populateWeeklySchedule(A)
};
aipo.calendar.showTooltip=function(D,F,A){var E="";
var B="";
var C="";
var H="";
var G=function(J){var I=function(K){switch(K){case"<":return"&lt;";
case">":return"&gt;";
case"&":return"&amp;";
case"'":return"&#39;";
case'"':return"&quot;"
}return"?"
};
return String(J).replace(/[<>&"']/g,I)
};
dojo.style(A,"display","block");
dojo.xhrGet({portletId:F,url:D,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(N,L){if(!N.id){dojo.style(A,"display","none");
return 
}if(!N.isSpan){E='<span style="font-size: 0.90em;">'+N.date+"</span><br/>"
}if(N.memberList){var K=N.memberList.length;
for(var I=0;
I<K;
I++){B+="<li>"+G(N.memberList[I].aliasName.value)+"</li>"
}}if(N.facilityList){var J=N.facilityList.length;
for(var I=0;
I<J;
I++){C+="<li>"+G(N.facilityList[I].facilityName.value)+"</li>"
}}if(N.place!=""){H='<span style="font-size: 0.90em;">場所</span><br/><ul><li>'+N.place+"</li></ul>"
}if(B!=""){B='<span style="font-size: 0.90em;">参加者</span><br/><ul>'+B+"</ul>"
}if(C!=""){C='<span style="font-size: 0.90em;">設備</span><br/><ul>'+C+"</ul>"
}var M="<h4>"+N.name+"</h4>"+E+B+C+H;
A.innerHTML=M
}})
};
dojo.declare("aipo.calendar.DummyDivObject",null,{portletId:null,parentnode:null,draggable:null,TooltipObject:null,constructor:function(A,B){this.portletId=B.pid;
this.parentnode=B.node;
this.node=dojo.byId(A);
this.events=[dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseover",this,"onMouseOver")]
},onMouseDown:function(A){this.hide();
if(this.parentnode==null||this.parentnode=="undefined"){return 
}if(this.draggable){this.draggable.onMouseDown(A)
}},onMouseOver:function(A){if(this.parentnode==null||this.parentnode=="undefined"){return 
}},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},hide:function(){dojo.marginBox(this.node,{l:0,t:-10000,w:0,h:0})
}});
dojo.declare("aipo.calendar.WeeklyScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,isResize:false,distance:3,lastScroll:0,onFirstMove:function(B){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}var D=dojo.clone(this.node);
D.id="schedule-dummy-"+this.portletId;
D.style.zIndex=998;
dojo.style(D,"opacity",0);
var C=dojo.byId("scheduleGarage-"+this.portletId);
C.appendChild(D);
this.tmpDraggable=D;
dojo.connect(this.node,"onmousedown",this,"onMouseDown");
if(dojo.isIE){document.onkeydown=function(E){dojo.style(D,"opacity",0.3)
};
document.onkeyup=function(E){dojo.style(D,"opacity",0)
}
}else{dojo.connect(null,"onkeydown",this,"onKeyPress");
dojo.connect(null,"onkeyup",this,"onKeyPress")
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
dojo.style(this.node,"opacity",0.5);
this.node.style.zIndex=999;
this.startY=this._pageY;
this.startAbsoluteY=dojo._abs(dojo.byId(this.node),true).y;
var A=window.navigator.userAgent.toLowerCase();
if(A.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(A.indexOf("safari")>-1){this.startAbsoluteY-=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}this.startHeight=parseInt(dojo.getComputedStyle(this.node).height);
this.startTop=parseInt(dojo.getComputedStyle(this.node).top);
if(this.startHeight-6<this.startY-this.startAbsoluteY){this.isResize=true
}aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
lastScroll=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop
},onKeyPress:function(A){if(A.ctrlKey){dojo.style(this.tmpDraggable,"opacity",0.3)
}else{dojo.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(H){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
if(this.dragSource.tmpHeight>3){dojo.style(this.node,"height",this.dragSource.tmpHeight+"px");
this.dragSource.tmpHeight=3
}var A=ptConfig[this.portletId].distance;
var C=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
this.leftTop.t=Math.floor((this.leftTop.t+C)/A)*A;
if(this.isResize){if(-this.startTop+this.leftTop.t+this.startHeight<0){dojo.style(this.node,"height","0px");
this.leftTop.t+=this.startHeight
}else{var J;
if(this.leftTop.t+this.startHeight>864){J=864-this.startTop-3
}else{J=-this.startTop+this.leftTop.t+this.startHeight
}this.leftTop.t=this.startTop;
this.leftTop.h=parseInt(J)-1
}}else{if(!this.disableY){if(this.leftTop.t<0){this.leftTop.t=0
}if(this.leftTop.t+this.startHeight>864){this.leftTop.t=864-this.startHeight-6
}}}if(!this.disableX){mouseX=aipo.calendar.getCurrentMouseX(this.portletId,H);
this.leftTop.l=mouseX.x;
this.dragSource.schedule.index=mouseX.index
}dojo.marginBox(this.node,this.leftTop);
var I=parseInt(dojo.getComputedStyle(this.node).top);
var G=parseInt(dojo.getComputedStyle(this.node).height)+1;
var F=I/A;
var E=Math.floor(F/12);
var D=Math.floor(F%12);
E=(E>9)?E:"0"+E;
D=(D>1)?D*(60/12):"0"+D*(60/12);
var B=this.dragSource.count;
dojo.byId("scheduleDivStartTime-"+B+"-"+this.portletId).innerHTML=E+":"+D;
this.dragSource.schedule.startDateHour=E;
this.dragSource.schedule.startDateMinute=D;
this.dragSource.schedule.startDate=E+":"+D;
F+=G/A;
E=Math.floor(F/12);
D=Math.floor(F%12);
E=(E>9)?E:"0"+E;
D=(D>1)?D*(60/12):"0"+D*(60/12);
dojo.byId("scheduleDivEndTime-"+B+"-"+this.portletId).innerHTML=E+":"+D;
this.dragSource.schedule.endDateHour=E;
this.dragSource.schedule.endDateMinute=D;
this.dragSource.schedule.endDate=E+":"+D;
dojo.byId("scheduleDivSepalater-"+B+"-"+this.portletId).innerHTML="-";
return 
},onMouseUp:function(B){ptConfig[this.portletId].isTooltipEnable=true;
if(dojo.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){dojo.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var A=parseInt(dojo.getComputedStyle(this.node).height);
if(A<ptConfig[this.portletId].rowHeight){dojo.style(this.node,"height",ptConfig[this.portletId].rowHeight+"px");
this.dragSource.tmpHeight=A
}else{this.dragSource.tmpHeight=-1
}var C="";
if(B.ctrlKey){C+="&mode=insert"
}else{C+="&mode=update"
}C+="&entityid="+this.dragSource.schedule.scheduleId;
C+="&view_start="+ptConfig[this.portletId].jsonData.date[0].substring(0,10);
if(this.dragSource.schedule.repeat){C+="&edit_repeat_flag=1";
C+="&view_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.tmpIndex].substring(0,10)
}C+="&start_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.startDateHour+"-"+this.dragSource.schedule.startDateMinute;
C+="&end_date="+ptConfig[this.portletId].jsonData.date[this.dragSource.schedule.index].substring(0,11)+this.dragSource.schedule.endDateHour+"-"+this.dragSource.schedule.endDateMinute;
aipo.calendar.populateWeeklySchedule(this.portletId,C);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this.dragSource.destroy()
}});
dojo.declare("aipo.calendar.WeeklyScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleDragMoveObject,isDraggable:false,scheduleObjId:null,constructor:function(A,B){this.scheduleObjId=B.sid
},onMouseDown:function(A){ptConfig[this.portletId].isTooltipEnable=false;
if(!!aipo.calendar.dummyDivObj&&!!aipo.calendar.dummyDivObj.TooltipObject){aipo.calendar.dummyDivObj.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(B){if(this.schedule.isDrag||!this.isDraggable){return 
}var A=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+A,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(A){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(A)
}},setupTooltip:function(C){var A=this.schedule.scheduleId;
var B=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(D,F){var E=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+B+"&scheduleid="+A;
aipo.calendar.showTooltip(E,this.portletId,D)
});
this.TooltipObject._onHover(C)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(A){this.isDraggable=A
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleDragMoveObject",[aimluck.dnd.DragMoveObject],{positionFrom:-1,positionTo:-1,moveIndex:0,onFirstMove:function(A){if(this.dragSource.TooltipObject!=null){this.dragSource.TooltipObject.uninitialize()
}aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
dojo.style(this.node,"opacity",0.5);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum));
var C=dojo.clone(this.node);
C.id="schedule-dummy-"+this.portletId;
C.style.zIndex=998;
dojo.style(C,"opacity",0);
var B=dojo.byId(this.node.parentNode.id);
B.appendChild(C);
this.tmpDraggable=C;
if(dojo.isIE){document.onkeydown=function(D){dojo.style(C,"opacity",0.3)
};
document.onkeyup=function(D){dojo.style(C,"opacity",0)
}
}else{dojo.connect(null,"onkeydown",this,"onKeyPress");
dojo.connect(null,"onkeyup",this,"onKeyPress")
}},onKeyPress:function(A){if(A.ctrlKey){dojo.style(this.tmpDraggable,"opacity",0.3)
}else{dojo.style(this.tmpDraggable,"opacity",0)
}},onMouseMove:function(G){if(this.dragSource.isDraggable==false){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this.dragSource.schedule.isDrag=true;
var A=ptConfig[this.portletId].distance;
var L=(dojo.byId("view_type_"+this.portletId)&&dojo.byId("top_form_"+this.portletId)&&dojo.byId("top_form_"+this.portletId).value=="simple")?dojo.byId("view_type_"+this.portletId).value:ptConfig[this.portletId].scheduleDivDaySum;
var F=aipo.calendar.getCurrentMouseX(this.portletId,G);
_tmpIndex=F.index;
if(!this.disableX){var D=this.dragSource.schedule;
var H=this.dragSource.termType;
var J=this.dragSource.scheduleNode;
var I,C;
if(H=="center"){if(this.positionFrom==-1&&_tmpIndex!=-1){this.positionFrom=_tmpIndex;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
C=D.indexReal+this.moveIndex;
I=D.colspanReal;
var K=L;
if(I+C>K){if(C<0){I=K
}else{I=K-C
}}else{if(C<0){I=I+C
}}if(C<0){C=0
}}else{if(H=="left"){if(this.positionFrom==-1){this.positionFrom=D.index;
this.positionTo=D.index
}if(this.positionTo!=-1&&_tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-this.positionFrom+this.positionTo;
if(this.positionTo>=this.positionFrom+D.colspanReal){C=D.indexReal+D.rowspan-1;
I=this.positionTo-this.positionFrom-D.colspanReal+2
}else{C=this.positionTo;
I=D.rowspan+this.positionFrom-this.positionTo
}}else{if(this.positionFrom==-1){this.positionFrom=D.index;
this.positionTo=D.index
}if(this.positionTo!=-1&&_tmpIndex!=-1&&this._tmpIndex!=-1){this.positionTo=_tmpIndex
}this.moveIndex=-D.index-D.rowspan+this.positionTo+1;
if(this.positionTo<=this.positionFrom){C=this.positionTo;
I=this.positionFrom-this.positionTo+1
}else{C=D.index;
I=this.positionTo-D.index+1
}}}var B=100/L*I;
var E=100/L*C;
dojo.style(J,"left",E+"%");
dojo.style(J,"width",B+"%")
}},onMouseUp:function(E){ptConfig[this.portletId].isTooltipEnable=true;
if(dojo.isIE){document.onkeydown="";
document.onkeyup=""
}if(this.dragSource.schedule.isDrag!=true){dojo.style(this.node,"opacity",1);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
return 
}var B=this.dragSource.schedule;
var H=ptConfig[this.portletId].jsonData.date[0].substring(0,10);
var C=this.dragSource.termType;
var G=this.dragSource.scheduleNode;
var A,D;
if(dojo.byId("top_form_"+this.portletId).value=="simple"){A=ptConfig[this.portletId].jsonData.date[0];
D=ptConfig[this.portletId].jsonData.date[0]
}if(C=="center"){A=aipo.calendar.getDate(H,B.indexReal+this.moveIndex)+"-00-00";
D=aipo.calendar.getDate(H,B.indexReal+this.moveIndex+B.colspanReal-1)+"-00-00"
}else{if(C=="left"){if(B.colspanReal-this.moveIndex>0){A=aipo.calendar.getDate(H,B.indexReal+this.moveIndex)+"-00-00";
D=aipo.calendar.getDate(H,B.indexReal+B.colspanReal-1)+"-00-00"
}else{A=aipo.calendar.getDate(H,B.indexReal+B.colspanReal-1)+"-00-00";
D=aipo.calendar.getDate(H,B.indexReal+this.moveIndex)+"-00-00"
}}else{if(B.colspanReal+this.moveIndex>0){A=aipo.calendar.getDate(H,B.indexReal)+"-00-00";
D=aipo.calendar.getDate(H,B.indexReal+B.colspanReal+this.moveIndex-1)+"-00-00"
}else{A=aipo.calendar.getDate(H,B.indexReal+B.colspanReal+this.moveIndex-1)+"-00-00";
D=aipo.calendar.getDate(H,B.indexReal)+"-00-00"
}}}this.positionFrom=-1;
this.positionTo=-1;
this.moveIndex=0;
this.tmpIndex=0;
var F="";
if(E.ctrlKey){F+="&mode=insert"
}else{F+="&mode=update"
}F+="&is_span=TRUE";
F+="&entityid="+this.dragSource.schedule.scheduleId;
F+="&view_start="+H;
F+="&start_date="+A;
F+="&end_date="+D;
aipo.calendar.populateWeeklySchedule(this.portletId,F);
aipo.portletReload("schedule",this.portletId);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleDragMoveObject,isDraggable:false,TooltipObject:null,scheduleObjId:null,isDraggable:false,constructor:function(A,B){this.scheduleObjId=B.sid
},onMouseDown:function(A){ptConfig[this.portletId].isTooltipEnable=false;
if(this.TooltipObject){this.TooltipObject.close()
}aimluck.dnd.Draggable.prototype.onMouseDown.apply(this,arguments)
},onScheduleClick:function(B){if(this.schedule.isDrag||!this.isDraggable){return 
}var A=this.schedule.ownerId;
aipo.common.showDialog(ptConfig[this.portletId].detailUrl+"&entityId="+this.schedule.scheduleId+"&view_date="+ptConfig[this.portletId].jsonData.date[this.schedule.index]+"&userid="+A,this.portletId,aipo.schedule.onLoadScheduleDetail);
aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
},onScheduleOver:function(A){if(ptConfig[this.portletId].isTooltipEnable==false){return 
}if(scheduleTooltipEnable){this.setupTooltip(A)
}},setupTooltip:function(C){var A=this.schedule.scheduleId;
var B=ptConfig[this.portletId].jsonData.endDate;
if(!this.TooltipObject){this.TooltipObject=new aipo.widget.ToolTip({label:"<div class='indicator'>読み込み中...</div>",connectId:[this.node.id]},this.portletId,function(D,F){var E=ptConfig[this.portletId].jsonUrl.split("?")[0]+"?template=ScheduleDetailJSONScreen&view_date="+B+"&scheduleid="+A;
aipo.calendar.showTooltip(E,this.portletId,D)
});
this.TooltipObject._onHover(C)
}aipo.calendar.objectlist.push(this.TooltipObject)
},setDraggable:function(A){this.isDraggable=A
}});
dojo.declare("aipo.calendar.WeeklyScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:0,positionTo:0,_isDragging:false,lastScroll:0,_isLocked:false,onMouseDown:function(A){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(B){this.startY=this.dragSource._lastY;
this.startAbsoluteY=dojo._abs(dojo.byId(this.node),true).y;
this.startX=dojo.getComputedStyle(this.node).left;
var A=window.navigator.userAgent.toLowerCase();
if(A.indexOf("chrome")>-1||(dojo.isFF&&(dojo.isFF>=3.6))){this.startAbsoluteY+=window.scrollY
}else{if(A.indexOf("safari")>-1){this.startAbsoluteY-=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop
}}lastScroll=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop;
aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments)
},onMouseMove:function(F){if(this._isLocked){return 
}aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
var E=dojo.byId("weeklyScrollPane_"+this.portletId).scrollTop-lastScroll;
var D=Math.floor((this.startY-this.startAbsoluteY)/this._rowHeight_);
var A=Math.floor((this.startY+this.leftTop.t-this.startAbsoluteY+E)/this._rowHeight_);
var B=0;
var C=0;
if(A<D){B=A*this._rowHeight_+1;
C=(D-A+1)*this._rowHeight_;
this.positionFrom=A;
this.positionTo=D+1
}else{B=D*this._rowHeight_+1;
C=(A-D+1)*this._rowHeight_;
this.positionTo=A+1;
this.positionFrom=D
}if(B+C>864){C=864-B-this._rowHeight_;
this.positionTo=47
}this.leftTop.t=B;
this.leftTop.l=this.startX;
this.leftTop.h=C;
dojo.marginBox(this.node,this.leftTop);
dojo.style(this.node,"opacity",0.5)
},onMouseUp:function(E){if(!this._isDragging){this.onFirstMove(E);
this.onMouseMove(E)
}var A=Math.floor(this.positionFrom/2);
A=(A>9)?A:"0"+A;
var F=Math.floor(this.positionFrom%2)*30;
var C=ptConfig[this.portletId].jsonData.date[this.dragSource.index].substring(0,10);
var D=C+"-"+A+"-"+F;
A=Math.floor(this.positionTo/2);
A=(A>9)?A:"0"+A;
F=Math.floor(this.positionTo%2)*30;
var B=C+"-"+A+"-"+F;
this.node.style.top="0px";
this.node.style.height="864px";
dojo.style(this.node,"opacity",0);
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&form_start="+D+"&form_end="+B,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"]);
this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments);
this._isLocked=true;
setTimeout(function(){this._isLocked=false
},5000)
}});
dojo.declare("aipo.calendar.WeeklyScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyScheduleAddDragMoveObject,constructor:function(A,B){this.index=B.idx
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleAddDragMoveObject",[aimluck.dnd.DragMoveObject],{_rowHeight_:18,positionFrom:-1,positionTo:-1,_isDragging:false,scheduleObjId:null,onMouseDown:function(A){this._isDragging=false;
aimluck.dnd.DragMoveObject.prototype.onMouseDown.apply(this,arguments)
},onFirstMove:function(A){aimluck.dnd.DragMoveObject.prototype.onFirstMove.apply(this,arguments);
aipo.calendar.setGridArray(this.portletId,parseInt(ptConfig[this.portletId].scheduleDivDaySum))
},onMouseMove:function(G){aimluck.dnd.DragMoveObject.prototype.onMouseMove.apply(this,arguments);
this._isDragging=true;
dojo.style(this.node,"opacity",0.5);
var C=aipo.calendar.getCurrentMouseX(this.portletId,G);
var H=C.index;
if(this.positionFrom==-1&&H!=-1){this.positionFrom=H;
this.positionTo=this.positionFrom
}if(this.positionTo!=-1&&H!=-1){this.positionTo=H
}if(this.positionTo!=-1&&this.positionFrom!=-1){var B,A;
if(this.positionTo>this.positionFrom){A=this.positionFrom;
B=this.positionTo-this.positionFrom+1
}else{A=this.positionTo;
B=this.positionFrom-this.positionTo+1
}var E;
var F;
if(dojo.byId("view_type_"+this.portletId)&&dojo.byId("top_form_"+this.portletId).value=="simple"){var D=parseInt(dojo.byId("view_type_"+this.portletId).value);
E=100/D*B;
F=100/D*A
}else{E=100/ptConfig[this.portletId].scheduleDivDaySum*B;
F=100/ptConfig[this.portletId].scheduleDivDaySum*A
}dojo.style(this.node,"left",F+"%");
dojo.style(this.node,"width",E+"%")
}else{dojo.style(this.node,"left",0+"%");
dojo.style(this.node,"width",0+"%")
}},onMouseUp:function(D){if(!this._isDragging){this.onFirstMove(D);
this.onMouseMove(D)
}var E,C;
if(this.positionTo!=-1&&this.positionFrom!=-1){if(this.positionTo>this.positionFrom){E=this.positionFrom;
C=this.positionTo
}else{C=this.positionFrom;
E=this.positionTo
}var B=ptConfig[this.portletId].jsonData.date[E];
var A=ptConfig[this.portletId].jsonData.date[C];
if(this._isDragging==true){aipo.common.showDialog(ptConfig[this.portletId].formUrl+"&entityid=new&mode=form&is_span=TRUE&form_start="+B+"&form_end="+A,this.portletId,aipo.schedule.onLoadScheduleDialog)
}aipo.schedule.tmpScroll=parseInt(dojo.byId("weeklyScrollPane_"+this.portletId)["scrollTop"])
}this.positionFrom=-1;
this.positionTo=-1;
dojo.style(this.node,"left",0+"%");
dojo.style(this.node,"width",100+"%");
dojo.style(this.node,"opacity",0);
aimluck.dnd.DragMoveObject.prototype.onMouseUp.apply(this,arguments)
}});
dojo.declare("aipo.calendar.WeeklyTermScheduleAddDraggable",[aimluck.dnd.Draggable],{DragMoveObject:aipo.calendar.WeeklyTermScheduleAddDragMoveObject,constructor:function(A,B){this.index=B.idx
}});
aipo.schedule.initCalendar=function(B){for(var A=0;
A<ptConfig[B].scheduleDivDaySum;
A++){tmpDraggable=new aipo.calendar.WeeklyScheduleAddDraggable("scheduleDivAdd0"+A+"_"+B,{idx:A});
tmpDraggable.portletId=B;
tmpDraggable.index=A
}tmpDraggable=new aipo.calendar.WeeklyTermScheduleAddDraggable("termScheduleDivAdd_"+B,{idx:0});
tmpDraggable.portletId=B;
aipo.calendar.populateWeeklySchedule(B)
};
aipo.schedule.groupSelectOnchange=function(D,F,G,A){var I=function(N,M){var L="";
A.dropDown.removeMember(dojo.byId("member_to-"+G));
for(var K=0;
K<N.length;
K++){var J=N[K].aliasName.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
if(K!=0){L+=" "
}B+="&m_id="+N[K].name;
L+='<span class="dispUser color'+K+'">'+J+"</span>";
aimluck.io.addOption(dojo.byId("member_to-"+G),N[K].name,J,true)
}dojo.byId("member_to_input-"+G).innerHTML=L
};
var E=dojo.query("#adduser-"+G);
switch(D.value.indexOf("pickup")){case -1:E.addClass("hide");
var B="";
dojo.xhrGet({portletId:G,url:D.value,encoding:"utf-8",handleAs:"json-comment-filtered",load:I,handle:function(){aipo.calendar.populateWeeklySchedule(G,B)
}});
break;
default:E.removeClass("hide");
A.dropDown.removeMember(dojo.byId("member_to-"+G));
A.dropDown.removeMember(dojo.byId("tmp_member_to-"+G));
var H=dojo.byId("picked_memberlist-"+G).options;
for(var C=0;
C<H.length;
C++){(function(K,J){K.selected=true
})(H[C],C)
}A.dropDown.addMember(dojo.byId("picked_memberlist-"+G),dojo.byId("tmp_member_to-"+G));
A.dropDown.addMember(dojo.byId("picked_memberlist-"+G),dojo.byId("member_to-"+G));
A.inputMemberSync();
aipo.calendar.populateWeeklySchedule(G);
dojo.xhrGet({portletId:G,url:dojo.byId("groupselect-defaulturl-"+G).value,encoding:"utf-8",handleAs:"json-comment-filtered"});
break
}}
};