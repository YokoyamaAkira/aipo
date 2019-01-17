dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DateCalendar"],["require","dijit._Calendar"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DateCalendar"]){A._hasResource["aipo.widget.DateCalendar"]=true;
A.provide("aipo.widget.DateCalendar");
A.require("dijit._Calendar");
A.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(B){this.onChangeNoCallback(B);
this.callback(B)
},onValueSelected:function(B){this.onChange(B)
},onChangeNoCallback:function(E){var K=E.getFullYear();
var D=1+E.getMonth();
var C=E.getDate();
var B=A.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var J=B[E.getDay()];
var G=A.byId(this.dateId+"_view");
G.innerHTML=K+"\u5e74"+D+"\u6708"+C+"\u65e5\uff08"+J+"\uff09";
var L=A.byId(this.dateId);
L.value=K+"/"+D+"/"+C;
var I=A.byId(this.dateId+"_year");
I.value=K;
var H=A.byId(this.dateId+"_month");
H.value=D;
var F=A.byId(this.dateId+"_day");
F.value=C;
A.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(D){if(D){var F=A.byId(this.dateId+"_view");
F.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var I=A.byId(this.dateId+"_year");
I.value="";
var G=A.byId(this.dateId+"_month");
G.value="";
var E=A.byId(this.dateId+"_day");
E.value="";
this.value="";
if(!A.byId(this.dateId+"_flag").checked){A.byId(this.dateId+"_flag").checked=true
}}else{var L=A.byId(this.dateId);
if((!L.value)||(L.value=="")){this.setValue(new Date())
}else{var K=L.value.split("/");
if(K.length==3){var J=K[0];
var C=K[1]-1;
var H=K[2];
var B=new Date(J,C,H);
this.setValue(B)
}}}},clearDate:function(){this.value=null
}})
}}});