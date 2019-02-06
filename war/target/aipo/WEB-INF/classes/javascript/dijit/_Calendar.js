if(!dojo._hasResource["dijit._Calendar"]){dojo._hasResource["dijit._Calendar"]=true;
dojo.provide("dijit._Calendar");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(A){if(!this.value||dojo.date.compare(A,this.value)){A=new Date(A);
this.displayMonth=new Date(A);
if(!this.isDisabledDate(A,this.lang)){this.value=A;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(B,A){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(A))
},_populateGrid:function(){var B=this.displayMonth;
B.setDate(1);
var H=B.getDay();
var I=dojo.date.getDaysInMonth(B);
var E=dojo.date.getDaysInMonth(dojo.date.add(B,"month",-1));
var C=new Date();
var J=this.value;
var G=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(G>H){G-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=G;
var O=new Date(B);
var R,N="dijitCalendar",L=0;
if(P<H){R=E-H+P+1;
L=-1;
N+="Previous"
}else{if(P>=(H+I)){R=P-H-I+1;
L=1;
N+="Next"
}else{R=P-H+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,C,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,J,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var K=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,K[B.getMonth()]);
var D=B.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(D++,0),{selector:"year",locale:this.lang}))
},this);
var A=this;
var F=function(M,N,L){dijit.typematic.addMouseListener(A[M],A,function(O){if(O>=0){A._adjustDisplay(N,L)
}},0.8,500)
};
F("incrementMonth","month",1);
F("decrementMonth","month",-1);
F("nextYearLabelNode","year",1);
F("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var A=dojo.hitch(this,function(F,E){var H=dojo.query(F,this.domNode)[0];
for(var G=0;
G<E;
G++){H.parentNode.appendChild(H.cloneNode(true))
}});
A(".dijitCalendarDayLabelTemplate",6);
A(".dijitCalendarDateTemplate",6);
A(".dijitCalendarWeekTemplate",5);
var C=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var D=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(F,E){this._setText(F,C[(E+D)%7])
},this);
var B=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(B,function(E){var F=dojo.doc.createElement("div");
this._setText(F,E);
this.monthLabelSpacer.appendChild(F)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(B,A){this.displayMonth=dojo.date.add(this.displayMonth,B,A);
this._populateGrid()
},_onDayClick:function(B){var A=B.target;
dojo.stopEvent(B);
while(!A.dijitDateValue){A=A.parentNode
}if(!dojo.hasClass(A,"dijitCalendarDisabledDate")){this.setValue(A.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(A,B){return false
}})
};