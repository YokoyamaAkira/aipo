if(!dojo._hasResource["aipo.widget.DateCalendar"]){dojo._hasResource["aipo.widget.DateCalendar"]=true;
dojo.provide("aipo.widget.DateCalendar");
dojo.require("dijit._Calendar");
dojo.declare("aipo.widget.DateCalendar",[dijit._Calendar],{dateId:"",callback:function(){},templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\n\t<thead>\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' colspan="5">\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\n\t\t\t</th>\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\n\t\t</tr>\n\t</thead>\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\n\t\t</tr>\n\t</tbody>\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\n\t\t<tr>\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\n\t\t\t\t</h3>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\t\n',postCreate:function(){this.inherited(arguments)
},onChange:function(A){this.onChangeNoCallback(A);
this.callback(A)
},onValueSelected:function(A){this.onChange(A)
},onChangeNoCallback:function(D){var J=D.getFullYear();
var C=1+D.getMonth();
var B=D.getDate();
var A=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var I=A[D.getDay()];
var F=dojo.byId(this.dateId+"_view");
F.innerHTML=J+"\u5e74"+C+"\u6708"+B+"\u65e5\uff08"+I+"\uff09";
var K=dojo.byId(this.dateId);
K.value=J+"/"+C+"/"+B;
var H=dojo.byId(this.dateId+"_year");
H.value=J;
var G=dojo.byId(this.dateId+"_month");
G.value=C;
var E=dojo.byId(this.dateId+"_day");
E.value=B;
dojo.byId(this.dateId+"_flag").checked=false
},disabledCalendar:function(C){if(C){var E=dojo.byId(this.dateId+"_view");
E.innerHTML="---- \u5e74 -- \u6708 -- \u65e5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var H=dojo.byId(this.dateId+"_year");
H.value="";
var F=dojo.byId(this.dateId+"_month");
F.value="";
var D=dojo.byId(this.dateId+"_day");
D.value="";
this.value="";
if(!dojo.byId(this.dateId+"_flag").checked){dojo.byId(this.dateId+"_flag").checked=true
}}else{var K=dojo.byId(this.dateId);
if((!K.value)||(K.value=="")){this.setValue(new Date())
}else{var J=K.value.split("/");
if(J.length==3){var I=J[0];
var B=J[1]-1;
var G=J[2];
var A=new Date(I,B,G);
this.setValue(A)
}}}},clearDate:function(){this.value=null
}})
};