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
}},_setText:function(A,B){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(B))
},_populateGrid:function(){var F=this.displayMonth;
F.setDate(1);
var A=F.getDay();
var B=dojo.date.getDaysInMonth(F);
var I=dojo.date.getDaysInMonth(dojo.date.add(F,"month",-1));
var G=new Date();
var C=this.value;
var K=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(K>A){K-=7
}dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(Q,P){P+=K;
var O=new Date(F);
var R,N="dijitCalendar",L=0;
if(P<A){R=I-A+P+1;
L=-1;
N+="Previous"
}else{if(P>=(A+B)){R=P-A-B+1;
L=1;
N+="Next"
}else{R=P-A+1;
N+="Current"
}}if(L){O=dojo.date.add(O,"month",L)
}O.setDate(R);
if(!dojo.date.compare(O,G,"date")){N="dijitCalendarCurrentDate "+N
}if(!dojo.date.compare(O,C,"date")){N="dijitCalendarSelectedDate "+N
}if(this.isDisabledDate(O,this.lang)){N="dijitCalendarDisabledDate "+N
}Q.className=N+"Month dijitCalendarDateTemplate";
Q.dijitDateValue=O.valueOf();
var M=dojo.query(".dijitCalendarDateLabel",Q)[0];
this._setText(M,O.getDate())
},this);
var D=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,D[F.getMonth()]);
var H=F.getFullYear()-1;
dojo.forEach(["previous","current","next"],function(L){this._setText(this[L+"YearLabelNode"],dojo.date.locale.format(new Date(H++,0),{selector:"year",locale:this.lang}))
},this);
var E=this;
var J=function(M,N,L){dijit.typematic.addMouseListener(E[M],E,function(O){if(O>=0){E._adjustDisplay(N,L)
}},0.8,500)
};
J("incrementMonth","month",1);
J("decrementMonth","month",-1);
J("nextYearLabelNode","year",1);
J("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var B=dojo.hitch(this,function(E,H){var G=dojo.query(E,this.domNode)[0];
for(var F=0;
F<H;
F++){G.parentNode.appendChild(G.cloneNode(true))
}});
B(".dijitCalendarDayLabelTemplate",6);
B(".dijitCalendarDateTemplate",6);
B(".dijitCalendarWeekTemplate",5);
var D=dojo.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var A=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(E,F){this._setText(E,D[(F+A)%7])
},this);
var C=dojo.date.locale.getNames("months","wide","standAlone",this.lang);
dojo.forEach(C,function(F){var E=dojo.doc.createElement("div");
this._setText(E,F);
this.monthLabelSpacer.appendChild(E)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(A,B){this.displayMonth=dojo.date.add(this.displayMonth,A,B);
this._populateGrid()
},_onDayClick:function(A){var B=A.target;
dojo.stopEvent(A);
while(!B.dijitDateValue){B=B.parentNode
}if(!dojo.hasClass(B,"dijitCalendarDisabledDate")){this.setValue(B.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(A){},onChange:function(A){},isDisabledDate:function(B,A){return false
}})
};