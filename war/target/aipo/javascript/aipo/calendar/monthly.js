dojo.provide("aipo.calendar.monthly");
aipo.calendar.monthly_calendar_data={selected_month:"",selected_day:"",next_month:"",prev_month:"",json_url:"",portlet_id:"",oneday_link:""};
aipo.calendar.showMonthlyCalendar=function(B){var A=aipo.calendar.monthly_calendar_data.json_url;
A+="&monthly_calendar_month="+B;
aipo.calendar.createMonthlyCalendar(A)
};
aipo.calendar.showNextMonthlyCalendar=function(){aipo.calendar.showMonthlyCalendar(aipo.calendar.monthly_calendar_data.next_month)
};
aipo.calendar.showPreviousMonthlyCalendar=function(){aipo.calendar.showMonthlyCalendar(aipo.calendar.monthly_calendar_data.prev_month)
};
aipo.calendar.initMonthlyCalendar=function(D,C,B,F,A){var E=aipo.calendar.monthly_calendar_data;
E.portlet_id=D;
E.json_url=C;
E.oneday_link=B;
E.selected_month=F;
E.selected_day=A;
dojo.xhrGet({portletId:E.portlet_id,url:C,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(I,H){var G=I;
E.next_month=G.next_month;
E.prev_month=G.prev_month
}})
};
aipo.calendar.reloadMonthlyCalendar=function(){aipo.calendar.createMonthlyCalendar(aipo.calendar.monthly_calendar_data.json_url)
};
aipo.calendar.createMonthlyCalendar=function(A){var B=aipo.calendar.monthly_calendar_data;
dojo.xhrGet({portletId:B.portlet_id,url:A,encoding:"utf-8",handleAs:"json-comment-filtered",load:function(H,C){var O=H;
if(O.error==1){location.reload()
}if(dojo.byId("mc_year").innerText){dojo.byId("mc_year").innerText=O.year;
dojo.byId("mc_month").innerText=O.month
}else{dojo.byId("mc_year").innerHTML=O.year;
dojo.byId("mc_month").innerHTML=O.month
}B.next_month=O.next_month;
B.prev_month=O.prev_month;
var N=dojo.byId("mc_table");
if(!aipo.calendar.monthly_calendar_data.is_first){var D=new Array();
for(var I=0;
I<N.childNodes.length;
I++){var F=N.childNodes[I];
if(F.className=="monthlyCalendarAutoTr"){D.push(F)
}}for(var I=0;
I<D.length;
I++){N.removeChild(D[I])
}for(var I=0;
I<O.monthly_container.length;
I++){var J=O.monthly_container[I];
var E=document.createElement("tr");
N.appendChild(E);
E.className="monthlyCalendarAutoTr";
for(var G=0;
G<J.length;
G++){var M=J[G];
var L=document.createElement("td");
E.appendChild(L);
if(M.is_holiday){L.className=L.className+" holiday"
}else{if(G==0){L.className=L.className+" sunday"
}if(G==6){L.className=L.className+" saturday"
}}if(M.month!=O.month){L.className=L.className+" out"
}if(M.today==O.today){L.className+=" today"
}if(M.month==B.selected_month&&M.day==B.selected_day){L.className+=" selected"
}var K=document.createElement("a");
L.appendChild(K);
K.setAttribute("href","javascript:void(0);");
K.setAttribute("data-date",M.today);
K.setAttribute("data-link",B.oneday_link+"&view_date="+M.today);
dojo.query(K).onclick(function(){aipo.schedule.setIndicator(B.portlet_id);
aipo.viewPage(this.getAttribute("data-link"),B.portlet_id)
});
if(K.innerText){K.innerText=M.day
}else{K.innerHTML=M.day
}}}}aipo.calendar.monthly_calendar_data.is_first=false
}})
};