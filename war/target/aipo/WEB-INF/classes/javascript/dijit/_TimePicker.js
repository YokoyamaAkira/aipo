if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.date.locale");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(B,A){this.value=B;
this._showText()
},isDisabledDate:function(A,B){return false
},_showText:function(){this.timeMenu.innerHTML="";
var D=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=D(this.clickableIncrement);
this._visibleIncrementDate=D(this.visibleIncrement);
this._visibleRangeDate=D(this.visibleRange);
var H=function(I){return I.getHours()*60*60+I.getMinutes()*60+I.getSeconds()
};
var G=H(this._clickableIncrementDate);
var B=H(this._visibleIncrementDate);
var F=H(this._visibleRangeDate);
var A=this.value.getTime();
this._refDate=new Date(A-A%(B*1000));
this._clickableIncrement=1;
this._totalIncrements=F/G;
this._visibleIncrement=B/G;
for(var E=-this._totalIncrements/2;
E<=this._totalIncrements/2;
E+=this._clickableIncrement){var C=this._createOption(E);
this.timeMenu.appendChild(C)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(B){var D=document.createElement("div");
var A=(D.date=new Date(this._refDate));
D.index=B;
var E=this._clickableIncrementDate;
A.setHours(A.getHours()+E.getHours()*B,A.getMinutes()+E.getMinutes()*B,A.getSeconds()+E.getSeconds()*B);
var C=document.createElement("div");
dojo.addClass(D,this.baseClass+"Item");
dojo.addClass(C,this.baseClass+"ItemInner");
C.innerHTML=dojo.date.locale.format(A,this.constraints);
D.appendChild(C);
if(B%this._visibleIncrement<1&&B%this._visibleIncrement>-1){dojo.addClass(D,this.baseClass+"Marker")
}else{if(B%this._clickableIncrement==0){dojo.addClass(D,this.baseClass+"Tick")
}}if(this.isDisabledDate(A)){dojo.addClass(D,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,A,this.constraints.selector)==0){D.selected=true;
dojo.addClass(D,this.baseClass+"ItemSelected")
}return D
},_onOptionSelected:function(A){var B=A.target.date||A.target.parentNode.date;
if(!B||this.isDisabledDate(B)){return 
}this.setValue(B);
this.onValueSelected(B)
},onValueSelected:function(A){},onmouseover:function(A){var B=(A.target.parentNode===this.timeMenu)?A.target:A.target.parentNode;
this._highlighted_option=B;
dojo.addClass(B,this.baseClass+"ItemHover")
},onmouseout:function(A){var B=(A.target.parentNode===this.timeMenu)?A.target:A.target.parentNode;
if(this._highlighted_option===B){dojo.removeClass(B,this.baseClass+"ItemHover")
}},_mouseWheeled:function(B){dojo.stopEvent(B);
var A=(dojo.isIE?B.wheelDelta:-B.detail);
this[(A>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var B=this.timeMenu.childNodes[0].index-1;
var A=this._createOption(B);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(A,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var B=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var A=this._createOption(B);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(A)
}})
};