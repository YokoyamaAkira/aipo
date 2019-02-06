dojo._xdResourceLoaded({depends:[["provide","aipo.widget.DateCalendar"],["require","dijit._Calendar"]],defineResource:function(A){if(!A._hasResource["aipo.widget.DateCalendar"]){A._hasResource["aipo.widget.DateCalendar"]=true;
A.provide("aipo.widget.DateCalendar");
A.require("dijit._Calendar");
A.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(B){this.onChangeNoCallback(B);
this.callback(B)
},onValueSelected:function(B){this.onChange(B)
},onChangeNoCallback:function(C){var I=C.getFullYear();
var B=1+C.getMonth();
var L=C.getDate();
var K=A.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var H=K[C.getDay()];
var E=A.byId(this.dateId+"_view");
E.innerHTML=I+"\u5e74"+B+"\u6708"+L+"\u65e5\uff08"+H+"\uff09";
var J=A.byId(this.dateId);
J.value=I+"/"+B+"/"+L;
var G=A.byId(this.dateId+"_year");
G.value=I;
var F=A.byId(this.dateId+"_month");
F.value=B;
var D=A.byId(this.dateId+"_day");
D.value=L;
A.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(B){if(B){var D=A.byId(this.dateId+"_view");
D.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var G=A.byId(this.dateId+"_year");
G.value="";
var E=A.byId(this.dateId+"_month");
E.value="";
var C=A.byId(this.dateId+"_day");
C.value="";
this.value="";
if(!A.byId(this.dateId+"_flag").checked){A.byId(this.dateId+"_flag").checked=true
}}else{var J=A.byId(this.dateId);
if((!J.value)||(J.value=="")){this.setValue(new Date())
}else{var I=J.value.split("/");
if(I.length==3){var H=I[0];
var L=I[1]-1;
var F=I[2];
var K=new Date(H,L,F);
this.setValue(K)
}}}},clearDate:function(){this.value=null
}})
}}});