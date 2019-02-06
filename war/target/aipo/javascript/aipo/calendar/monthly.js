dojo.provide("aipo.calendar.monthly");
aipo.calendar.monthly_calendar_data={selected_month:"",selected_day:"",next_month:"",prev_month:"",json_url:"",portlet_id:"",oneday_link:""};
aipo.calendar.showMonthlyCalendar=function(D){var C=aipo.calendar.monthly_calendar_data.json_url;
C+="&monthly_calendar_month="+D;
aipo.calendar.createMonthlyCalendar(C)
};
aipo.calendar.showNextMonthlyCalendar=function(){aipo.calendar.showMonthlyCalendar(aipo.calendar.monthly_calendar_data.next_month)
};
aipo.calendar.showPreviousMonthlyCalendar=function(){aipo.calendar.showMonthlyCalendar(aipo.calendar.monthly_calendar_data.prev_month)
};
aipo.calendar.initMonthlyCalendar=function(J,K,L,H,G){var I=aipo.calendar.monthly_calendar_data;
I.portlet_id=J;
I.json_url=K;
I.oneday_link=L;
I.selected_month=H;
I.selected_day=G;
dojo.xhrGet({portletId:I.portlet_id,url:K,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(A,B){var C=A;
I.next_month=C.next_month;
I.prev_month=C.prev_month
}})
};
aipo.calendar.reloadMonthlyCalendar=function(){aipo.calendar.createMonthlyCalendar(aipo.calendar.monthly_calendar_data.json_url)
};
aipo.calendar.createMonthlyCalendar=function(C){var D=aipo.calendar.monthly_calendar_data;
dojo.xhrGet({portletId:D.portlet_id,url:C,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(W,B){var P=W;
if(P.error==1){location.reload()
}if(dojo.byId("mc_year").innerText){dojo.byId("mc_year").innerText=P.year;
dojo.byId("mc_month").innerText=P.month
}else{dojo.byId("mc_year").innerHTML=P.year;
dojo.byId("mc_month").innerHTML=P.month
}D.next_month=P.next_month;
D.prev_month=P.prev_month;
var Q=dojo.byId("mc_table");
if(!aipo.calendar.monthly_calendar_data.is_first){var A=new Array();
for(var V=0;
V<Q.childNodes.length;
V++){var Y=Q.childNodes[V];
if(Y.className=="monthlyCalendarAutoTr"){A.push(Y)
}}for(var V=0;
V<A.length;
V++){Q.removeChild(A[V])
}for(var V=0;
V<P.monthly_container.length;
V++){var U=P.monthly_container[V];
var Z=document.createElement("tr");
Q.appendChild(Z);
Z.className="monthlyCalendarAutoTr";
for(var X=0;
X<U.length;
X++){var R=U[X];
var S=document.createElement("td");
Z.appendChild(S);
if(R.is_holiday){S.className=S.className+" holiday"
}else{if(X==0){S.className=S.className+" sunday"
}if(X==6){S.className=S.className+" saturday"
}}if(R.month!=P.month){S.className=S.className+" out"
}if(R.today==P.today){S.className+=" today"
}if(R.month==D.selected_month&&R.day==D.selected_day){S.className+=" selected"
}var T=document.createElement("a");
S.appendChild(T);
T.setAttribute("href","javascript:void(0);");
T.setAttribute("data-date",R.today);
T.setAttribute("data-link",D.oneday_link+"&view_date="+R.today);
dojo.query(T).onclick(function(){aipo.schedule.setIndicator(D.portlet_id);
aipo.viewPage(this.getAttribute("data-link"),D.portlet_id)
});
if(T.innerText){T.innerText=R.day
}else{T.innerHTML=R.day
}}}}aipo.calendar.monthly_calendar_data.is_first=false
}})
};