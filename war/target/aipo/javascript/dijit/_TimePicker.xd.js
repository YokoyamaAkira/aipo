dojo._xdResourceLoaded({depends:[["provide","dijit._TimePicker"],["require","dijit.form._FormWidget"],["require","dojo.date.locale"]],defineResource:function(A){if(!A._hasResource["dijit._TimePicker"]){A._hasResource["dijit._TimePicker"]=true;
A.provide("dijit._TimePicker");
A.require("dijit.form._FormWidget");
A.require("dojo.date.locale");
A.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:A.date.stamp.toISOString,setValue:function(B,C){this.value=B;
this._showText()
},isDisabledDate:function(C,B){return false
},_showText:function(){this.timeMenu.innerHTML="";
var B=A.date.stamp.fromISOString;
this._clickableIncrementDate=B(this.clickableIncrement);
this._visibleIncrementDate=B(this.visibleIncrement);
this._visibleRangeDate=B(this.visibleRange);
var F=function(J){return J.getHours()*60*60+J.getMinutes()*60+J.getSeconds()
};
var E=F(this._clickableIncrementDate);
var H=F(this._visibleIncrementDate);
var D=F(this._visibleRangeDate);
var G=this.value.getTime();
this._refDate=new Date(G-G%(H*1000));
this._clickableIncrement=1;
this._totalIncrements=D/E;
this._visibleIncrement=H/E;
for(var C=-this._totalIncrements/2;
C<=this._totalIncrements/2;
C+=this._clickableIncrement){var I=this._createOption(C);
this.timeMenu.appendChild(I)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,A.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(D){var F=document.createElement("div");
var C=(F.date=new Date(this._refDate));
F.index=D;
var B=this._clickableIncrementDate;
C.setHours(C.getHours()+B.getHours()*D,C.getMinutes()+B.getMinutes()*D,C.getSeconds()+B.getSeconds()*D);
var E=document.createElement("div");
A.addClass(F,this.baseClass+"Item");
A.addClass(E,this.baseClass+"ItemInner");
E.innerHTML=A.date.locale.format(C,this.constraints);
F.appendChild(E);
if(D%this._visibleIncrement<1&&D%this._visibleIncrement>-1){A.addClass(F,this.baseClass+"Marker")
}else{if(D%this._clickableIncrement==0){A.addClass(F,this.baseClass+"Tick")
}}if(this.isDisabledDate(C)){A.addClass(F,this.baseClass+"ItemDisabled")
}if(A.date.compare(this.value,C,this.constraints.selector)==0){F.selected=true;
A.addClass(F,this.baseClass+"ItemSelected")
}return F
},_onOptionSelected:function(C){var B=C.target.date||C.target.parentNode.date;
if(!B||this.isDisabledDate(B)){return 
}this.setValue(B);
this.onValueSelected(B)
},onValueSelected:function(B){},onmouseover:function(C){var B=(C.target.parentNode===this.timeMenu)?C.target:C.target.parentNode;
this._highlighted_option=B;
A.addClass(B,this.baseClass+"ItemHover")
},onmouseout:function(C){var B=(C.target.parentNode===this.timeMenu)?C.target:C.target.parentNode;
if(this._highlighted_option===B){A.removeClass(B,this.baseClass+"ItemHover")
}},_mouseWheeled:function(B){A.stopEvent(B);
var C=(A.isIE?B.wheelDelta:-B.detail);
this[(C>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var B=this.timeMenu.childNodes[0].index-1;
var C=this._createOption(B);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(C,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var B=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var C=this._createOption(B);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(C)
}})
}}});