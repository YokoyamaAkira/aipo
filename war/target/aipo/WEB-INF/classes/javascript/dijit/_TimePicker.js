if(!dojo._hasResource["dijit._TimePicker"]){dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.require("dijit.form._FormWidget");
dojo.require("dojo.date.locale");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(A,B){this.value=A;
this._showText()
},isDisabledDate:function(B,A){return false
},_showText:function(){this.timeMenu.innerHTML="";
var A=dojo.date.stamp.fromISOString;
this._clickableIncrementDate=A(this.clickableIncrement);
this._visibleIncrementDate=A(this.visibleIncrement);
this._visibleRangeDate=A(this.visibleRange);
var E=function(I){return I.getHours()*60*60+I.getMinutes()*60+I.getSeconds()
};
var D=E(this._clickableIncrementDate);
var G=E(this._visibleIncrementDate);
var C=E(this._visibleRangeDate);
var F=this.value.getTime();
this._refDate=new Date(F-F%(G*1000));
this._clickableIncrement=1;
this._totalIncrements=C/D;
this._visibleIncrement=G/D;
for(var B=-this._totalIncrements/2;
B<=this._totalIncrements/2;
B+=this._clickableIncrement){var H=this._createOption(B);
this.timeMenu.appendChild(H)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(C){var E=document.createElement("div");
var B=(E.date=new Date(this._refDate));
E.index=C;
var A=this._clickableIncrementDate;
B.setHours(B.getHours()+A.getHours()*C,B.getMinutes()+A.getMinutes()*C,B.getSeconds()+A.getSeconds()*C);
var D=document.createElement("div");
dojo.addClass(E,this.baseClass+"Item");
dojo.addClass(D,this.baseClass+"ItemInner");
D.innerHTML=dojo.date.locale.format(B,this.constraints);
E.appendChild(D);
if(C%this._visibleIncrement<1&&C%this._visibleIncrement>-1){dojo.addClass(E,this.baseClass+"Marker")
}else{if(C%this._clickableIncrement==0){dojo.addClass(E,this.baseClass+"Tick")
}}if(this.isDisabledDate(B)){dojo.addClass(E,this.baseClass+"ItemDisabled")
}if(dojo.date.compare(this.value,B,this.constraints.selector)==0){E.selected=true;
dojo.addClass(E,this.baseClass+"ItemSelected")
}return E
},_onOptionSelected:function(B){var A=B.target.date||B.target.parentNode.date;
if(!A||this.isDisabledDate(A)){return 
}this.setValue(A);
this.onValueSelected(A)
},onValueSelected:function(A){},onmouseover:function(B){var A=(B.target.parentNode===this.timeMenu)?B.target:B.target.parentNode;
this._highlighted_option=A;
dojo.addClass(A,this.baseClass+"ItemHover")
},onmouseout:function(B){var A=(B.target.parentNode===this.timeMenu)?B.target:B.target.parentNode;
if(this._highlighted_option===A){dojo.removeClass(A,this.baseClass+"ItemHover")
}},_mouseWheeled:function(A){dojo.stopEvent(A);
var B=(dojo.isIE?A.wheelDelta:-A.detail);
this[(B>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var A=this.timeMenu.childNodes[0].index-1;
var B=this._createOption(A);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(B,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var A=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var B=this._createOption(A);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(B)
}})
};