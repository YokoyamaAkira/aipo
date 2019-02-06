if(!dojo._hasResource["aipo.widget.DateCalendar"]){dojo._hasResource["aipo.widget.DateCalendar"]=true;
dojo.provide("aipo.widget.DateCalendar");
dojo.require("dijit._Calendar");
dojo.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(A){this.onChangeNoCallback(A);
this.callback(A)
},onValueSelected:function(A){this.onChange(A)
},onChangeNoCallback:function(K){var F=K.getFullYear();
var J=1+K.getMonth();
var I=K.getDate();
var H=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var E=H[K.getDay()];
var B=dojo.byId(this.dateId+"_view");
B.innerHTML=F+"\u5e74"+J+"\u6708"+I+"\u65e5\uff08"+E+"\uff09";
var G=dojo.byId(this.dateId);
G.value=F+"/"+J+"/"+I;
var D=dojo.byId(this.dateId+"_year");
D.value=F;
var C=dojo.byId(this.dateId+"_month");
C.value=J;
var A=dojo.byId(this.dateId+"_day");
A.value=I;
dojo.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(J){if(J){var A=dojo.byId(this.dateId+"_view");
A.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var D=dojo.byId(this.dateId+"_year");
D.value="";
var B=dojo.byId(this.dateId+"_month");
B.value="";
var K=dojo.byId(this.dateId+"_day");
K.value="";
this.value="";
if(!dojo.byId(this.dateId+"_flag").checked){dojo.byId(this.dateId+"_flag").checked=true
}}else{var G=dojo.byId(this.dateId);
if((!G.value)||(G.value=="")){this.setValue(new Date())
}else{var F=G.value.split("/");
if(F.length==3){var E=F[0];
var I=F[1]-1;
var C=F[2];
var H=new Date(E,I,C);
this.setValue(H)
}}}},clearDate:function(){this.value=null
}})
};