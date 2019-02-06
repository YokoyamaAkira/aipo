dojo._xdResourceLoaded({depends:[["provide","dijit.form._Spinner"],["require","dijit.form.ValidationTextBox"]],defineResource:function(A){if(!A._hasResource["dijit.form._Spinner"]){A._hasResource["dijit.form._Spinner"]=true;
A.provide("dijit.form._Spinner");
A.require("dijit.form.ValidationTextBox");
A.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:'<table class="dijit dijitReset dijitInlineTable dijitLeft" cellspacing="0" cellpadding="0"\r\n\tid="widget_${id}" name="${name}"\r\n\tdojoAttachEvent="onmouseenter:_onMouse,onmouseleave:_onMouse,onkeypress:_onKeyPress"\r\n\twaiRole="presentation"\r\n\t><tr class="dijitReset"\r\n\t\t><td rowspan="2" class="dijitReset dijitStretch dijitInputField" width="100%"\r\n\t\t\t><input dojoAttachPoint="textbox,focusNode" type="${type}" dojoAttachEvent="onfocus,onkeyup"\r\n\t\t\t\twaiRole="spinbutton" autocomplete="off" name="${name}"\r\n\t\t></td\r\n\t\t><td rowspan="2" class="dijitReset dijitValidationIconField" width="0%" \r\n\t\t\t><div dojoAttachPoint=\'iconNode\' class=\'dijitValidationIcon\'></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitUpArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="upArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleUpArrowEvent,onmouseup:_handleUpArrowEvent,onmouseover:_handleUpArrowEvent,onmouseout:_handleUpArrowEvent"\r\n\t\t\t\tstateModifier="UpArrow"\r\n\t\t\t><div class="dijitA11yUpArrow">&#9650;</div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitRight dijitButtonNode dijitDownArrowButton" width="0%"\r\n\t\t\t\tdojoAttachPoint="downArrowNode"\r\n\t\t\t\tdojoAttachEvent="onmousedown:_handleDownArrowEvent,onmouseup:_handleDownArrowEvent,onmouseover:_handleDownArrowEvent,onmouseout:_handleDownArrowEvent"\r\n\t\t\t\tstateModifier="DownArrow"\r\n\t\t\t><div class="dijitA11yDownArrow">&#9660;</div\r\n\t\t></td\r\n\t></tr\r\n></table>\r\n\r\n',baseClass:"dijitSpinner",adjust:function(C,B){return C
},_handleUpArrowEvent:function(B){this._onMouse(B,this.upArrowNode)
},_handleDownArrowEvent:function(B){this._onMouse(B,this.downArrowNode)
},_arrowPressed:function(C,B){if(this.disabled){return 
}A.addClass(C,"dijitSpinnerButtonActive");
this.setValue(this.adjust(this.getValue(),B*this.smallDelta),false)
},_arrowReleased:function(B){if(this.disabled){return 
}this._wheelTimer=null;
dijit.focus(this.textbox);
A.removeClass(B,"dijitSpinnerButtonActive")
},_typematicCallback:function(B,D,C){if(D==this.textbox){D=(C.keyCode==A.keys.UP_ARROW)?this.upArrowNode:this.downArrowNode
}if(B==-1){this._arrowReleased(D)
}else{this._arrowPressed(D,(D==this.upArrowNode)?1:-1)
}},_wheelTimer:null,_mouseWheeled:function(C){A.stopEvent(C);
var F=0;
if(typeof C.wheelDelta=="number"){F=C.wheelDelta
}else{if(typeof C.detail=="number"){F=-C.detail
}}if(F>0){var E=this.upArrowNode;
var D=+1
}else{if(F<0){var E=this.downArrowNode;
var D=-1
}else{return 
}}this._arrowPressed(E,D);
if(this._wheelTimer!=null){clearTimeout(this._wheelTimer)
}var B=this;
this._wheelTimer=setTimeout(function(){B._arrowReleased(E)
},50)
},postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.textbox,A.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
dijit.typematic.addListener(this.upArrowNode,this.textbox,{keyCode:A.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout);
dijit.typematic.addListener(this.downArrowNode,this.textbox,{keyCode:A.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout)
}})
}}});