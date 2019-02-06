dojo._xdResourceLoaded({depends:[["provide","dijit._TimePicker"],["require","dijit.form._FormWidget"],["require","dojo.date.locale"]],defineResource:function(A){if(!A._hasResource["dijit._TimePicker"]){A._hasResource["dijit._TimePicker"]=true;
A.provide("dijit._TimePicker");
A.require("dijit.form._FormWidget");
A.require("dojo.date.locale");
A.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:'<div id="widget_${id}" class="dijitMenu"\r\n    ><div dojoAttachPoint="upArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9650;</span></div\r\n    ><div dojoAttachPoint="timeMenu,focusNode" dojoAttachEvent="onclick:_onOptionSelected,onmouseover,onmouseout"></div\r\n    ><div dojoAttachPoint="downArrow" class="dijitButtonNode"><span class="dijitTimePickerA11yText">&#9660;</span></div\r\n></div>\r\n',baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:A.date.stamp.toISOString,setValue:function(C,B){this.value=C;
this._showText()
},isDisabledDate:function(B,C){return false
},_showText:function(){this.timeMenu.innerHTML="";
var F=A.date.stamp.fromISOString;
this._clickableIncrementDate=F(this.clickableIncrement);
this._visibleIncrementDate=F(this.visibleIncrement);
this._visibleRangeDate=F(this.visibleRange);
var C=function(J){return J.getHours()*60*60+J.getMinutes()*60+J.getSeconds()
};
var I=C(this._clickableIncrementDate);
var E=C(this._visibleIncrementDate);
var H=C(this._visibleRangeDate);
var D=this.value.getTime();
this._refDate=new Date(D-D%(E*1000));
this._clickableIncrement=1;
this._totalIncrements=H/I;
this._visibleIncrement=E/I;
for(var G=-this._totalIncrements/2;
G<=this._totalIncrements/2;
G+=this._clickableIncrement){var B=this._createOption(G);
this.timeMenu.appendChild(B)
}},postCreate:function(){if(this.constraints===dijit._TimePicker.prototype.constraints){this.constraints={}
}if(!this.constraints.locale){this.constraints.locale=this.lang
}this.connect(this.timeMenu,A.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addMouseListener(this.upArrow,this,this._onArrowUp,0.8,500);
dijit.typematic.addMouseListener(this.downArrow,this,this._onArrowDown,0.8,500);
this.inherited("postCreate",arguments);
this.setValue(this.value)
},_createOption:function(E){var B=document.createElement("div");
var D=(B.date=new Date(this._refDate));
B.index=E;
var C=this._clickableIncrementDate;
D.setHours(D.getHours()+C.getHours()*E,D.getMinutes()+C.getMinutes()*E,D.getSeconds()+C.getSeconds()*E);
var F=document.createElement("div");
A.addClass(B,this.baseClass+"Item");
A.addClass(F,this.baseClass+"ItemInner");
F.innerHTML=A.date.locale.format(D,this.constraints);
B.appendChild(F);
if(E%this._visibleIncrement<1&&E%this._visibleIncrement>-1){A.addClass(B,this.baseClass+"Marker")
}else{if(E%this._clickableIncrement==0){A.addClass(B,this.baseClass+"Tick")
}}if(this.isDisabledDate(D)){A.addClass(B,this.baseClass+"ItemDisabled")
}if(A.date.compare(this.value,D,this.constraints.selector)==0){B.selected=true;
A.addClass(B,this.baseClass+"ItemSelected")
}return B
},_onOptionSelected:function(B){var C=B.target.date||B.target.parentNode.date;
if(!C||this.isDisabledDate(C)){return 
}this.setValue(C);
this.onValueSelected(C)
},onValueSelected:function(B){},onmouseover:function(B){var C=(B.target.parentNode===this.timeMenu)?B.target:B.target.parentNode;
this._highlighted_option=C;
A.addClass(C,this.baseClass+"ItemHover")
},onmouseout:function(B){var C=(B.target.parentNode===this.timeMenu)?B.target:B.target.parentNode;
if(this._highlighted_option===C){A.removeClass(C,this.baseClass+"ItemHover")
}},_mouseWheeled:function(C){A.stopEvent(C);
var B=(A.isIE?C.wheelDelta:-C.detail);
this[(B>0?"_onArrowUp":"_onArrowDown")]()
},_onArrowUp:function(){var C=this.timeMenu.childNodes[0].index-1;
var B=this._createOption(C);
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(B,this.timeMenu.childNodes[0])
},_onArrowDown:function(){var C=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var B=this._createOption(C);
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(B)
}})
}}});