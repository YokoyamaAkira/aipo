if(!dojo._hasResource["dijit.form._Spinner"]){dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.require("dijit.form.ValidationTextBox");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(B,A){return B
},_handleUpArrowEvent:function(A){this._onMouse(A,this.upArrowNode)
},_handleDownArrowEvent:function(A){this._onMouse(A,this.downArrowNode)
},_arrowPressed:function(B,A){if(this.disabled){return 
}dojo.addClass(B,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),A*this.smallDelta),false)
},_arrowReleased:function(A){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
dojo.removeClass(A,"dijitSpinnerButtonActive")
},_typematicCallback:function(B,A,C){if(A==this.textbox){A=(C.keyCode==dojo.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(B==-1){this._arrowReleased(A)
}else{this._arrowPressed(A,(A==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(E){dojo.stopEvent(E);
var C=0;
if(typeof E.wheelDelta=="number"){C=E.wheelDelta
}else{if(typeof E.detail=="number"){C=-E.detail
}}if(C>0){var B=this.upArrowNode;
var A=+1
}else{if(C<0){var B=this.downArrowNode;
var A=-1
}else{return 
}}this._arrowPressed(B,A);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var D=this;
this._wheelTimer=setTimeout(function(){D._arrowReleased(B)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
};