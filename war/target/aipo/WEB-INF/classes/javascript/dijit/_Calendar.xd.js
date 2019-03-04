dojo._xdResourceLoaded({depends:[["provide","dijit._Calendar"],["require","dojo.cldr.supplemental"],["require","dojo.date"],["require","dojo.date.locale"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit._Calendar"]){A._hasResource["dijit._Calendar"]=true;
A.provide("dijit._Calendar");
A.require("dojo.cldr.supplemental");
A.require("dojo.date");
A.require("dojo.date.locale");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit._Calendar",[dijit._Widget,dijit._Templated],{templateString:'<table cellspacing="0" cellpadding="0" class="dijitCalendarContainer">\r\n\t<thead>\r\n\t\t<tr class="dijitReset dijitCalendarMonthContainer" valign="top">\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="decrementMonth">\r\n\t\t\t\t<span class="dijitInline dijitCalendarIncrementControl dijitCalendarDecrease"><span dojoAttachPoint="decreaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarDecreaseInner">-</span></span>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' colspan="5">\r\n\t\t\t\t<div dojoAttachPoint="monthLabelSpacer" class="dijitCalendarMonthLabelSpacer"></div>\r\n\t\t\t\t<div dojoAttachPoint="monthLabelNode" class="dijitCalendarMonth"></div>\r\n\t\t\t</th>\r\n\t\t\t<th class=\'dijitReset\' dojoAttachPoint="incrementMonth">\r\n\t\t\t\t<div class="dijitInline dijitCalendarIncrementControl dijitCalendarIncrease"><span dojoAttachPoint="increaseArrowNode" class="dijitA11ySideArrow dijitCalendarIncrementControl dijitCalendarIncreaseInner">+</span></div>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class="dijitReset dijitCalendarDayLabelTemplate"><span class="dijitCalendarDayLabel"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent="onclick: _onDayClick" class="dijitReset dijitCalendarBodyContainer">\r\n\t\t<tr class="dijitReset dijitCalendarWeekTemplate">\r\n\t\t\t<td class="dijitReset dijitCalendarDateTemplate"><span class="dijitCalendarDateLabel"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<tfoot class="dijitReset dijitCalendarYearContainer">\r\n\t\t<tr>\r\n\t\t\t<td class=\'dijitReset\' valign="top" colspan="7">\r\n\t\t\t\t<h3 class="dijitCalendarYearLabel">\r\n\t\t\t\t\t<span dojoAttachPoint="previousYearLabelNode" class="dijitInline dijitCalendarPreviousYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="currentYearLabelNode" class="dijitInline dijitCalendarSelectedYear"></span>\r\n\t\t\t\t\t<span dojoAttachPoint="nextYearLabelNode" class="dijitInline dijitCalendarNextYear"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\t\r\n',value:new Date(),dayWidth:"narrow",setValue:function(B){if(!this.value||A.date.compare(B,this.value)){B=new Date(B);
this.displayMonth=new Date(B);
if(!this.isDisabledDate(B,this.lang)){this.value=B;
this.value.setHours(0,0,0,0);
this.onChange(this.value)
}this._populateGrid()
}},_setText:function(B,C){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(C))
},_populateGrid:function(){var G=this.displayMonth;
G.setDate(1);
var B=G.getDay();
var C=A.date.getDaysInMonth(G);
var J=A.date.getDaysInMonth(A.date.add(G,"month",-1));
var H=new Date();
var D=this.value;
var L=A.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(L>B){L-=7
}A.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(R,Q){Q+=L;
var P=new Date(G);
var S,O="dijitCalendar",M=0;
if(Q<B){S=J-B+Q+1;
M=-1;
O+="Previous"
}else{if(Q>=(B+C)){S=Q-B-C+1;
M=1;
O+="Next"
}else{S=Q-B+1;
O+="Current"
}}if(M){P=A.date.add(P,"month",M)
}P.setDate(S);
if(!A.date.compare(P,H,"date")){O="dijitCalendarCurrentDate "+O
}if(!A.date.compare(P,D,"date")){O="dijitCalendarSelectedDate "+O
}if(this.isDisabledDate(P,this.lang)){O="dijitCalendarDisabledDate "+O
}R.className=O+"Month dijitCalendarDateTemplate";
R.dijitDateValue=P.valueOf();
var N=A.query(".dijitCalendarDateLabel",R)[0];
this._setText(N,P.getDate())
},this);
var E=A.date.locale.getNames("months","wide","standAlone",this.lang);
this._setText(this.monthLabelNode,E[G.getMonth()]);
var I=G.getFullYear()-1;
A.forEach(["previous","current","next"],function(M){this._setText(this[M+"YearLabelNode"],A.date.locale.format(new Date(I++,0),{selector:"year",locale:this.lang}))
},this);
var F=this;
var K=function(N,O,M){dijit.typematic.addMouseListener(F[N],F,function(P){if(P>=0){F._adjustDisplay(O,M)
}},0.8,500)
};
K("incrementMonth","month",1);
K("decrementMonth","month",-1);
K("nextYearLabelNode","year",1);
K("previousYearLabelNode","year",-1)
},postCreate:function(){dijit._Calendar.superclass.postCreate.apply(this);
var C=A.hitch(this,function(F,I){var H=A.query(F,this.domNode)[0];
for(var G=0;
G<I;
G++){H.parentNode.appendChild(H.cloneNode(true))
}});
C(".dijitCalendarDayLabelTemplate",6);
C(".dijitCalendarDateTemplate",6);
C(".dijitCalendarWeekTemplate",5);
var E=A.date.locale.getNames("days",this.dayWidth,"standAlone",this.lang);
var B=A.cldr.supplemental.getFirstDayOfWeek(this.lang);
A.query(".dijitCalendarDayLabel",this.domNode).forEach(function(F,G){this._setText(F,E[(G+B)%7])
},this);
var D=A.date.locale.getNames("months","wide","standAlone",this.lang);
A.forEach(D,function(G){var F=A.doc.createElement("div");
this._setText(F,G);
this.monthLabelSpacer.appendChild(F)
},this);
this.value=null;
this.setValue(new Date())
},_adjustDisplay:function(B,C){this.displayMonth=A.date.add(this.displayMonth,B,C);
this._populateGrid()
},_onDayClick:function(B){var C=B.target;
A.stopEvent(B);
while(!C.dijitDateValue){C=C.parentNode
}if(!A.hasClass(C,"dijitCalendarDisabledDate")){this.setValue(C.dijitDateValue);
this.onValueSelected(this.value)
}},onValueSelected:function(B){},onChange:function(B){},isDisabledDate:function(C,B){return false
}})
}}});