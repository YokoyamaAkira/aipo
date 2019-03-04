dojo._xdResourceLoaded({depends:[["provide","dijit.form.Slider"],["require","dijit.form._FormWidget"],["require","dijit._Container"],["require","dojo.dnd.move"],["require","dijit.form.Button"],["require","dojo.number"]],defineResource:function(A){if(!A._hasResource["dijit.form.Slider"]){A._hasResource["dijit.form.Slider"]=true;
A.provide("dijit.form.Slider");
A.require("dijit.form._FormWidget");
A.require("dijit._Container");
A.require("dojo.dnd.move");
A.require("dijit.form.Button");
A.require("dojo.number");
A.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:A.mixin(A.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(B){if(this.disabled||B.altKey||B.ctrlKey){return 
}switch(B.keyCode){case A.keys.HOME:this.setValue(this.minimum,false);
break;
case A.keys.END:this.setValue(this.maximum,false);
break;
case A.keys.UP_ARROW:case (this._isReversed()?A.keys.LEFT_ARROW:A.keys.RIGHT_ARROW):case A.keys.PAGE_UP:this.increment(B);
break;
case A.keys.DOWN_ARROW:case (this._isReversed()?A.keys.RIGHT_ARROW:A.keys.LEFT_ARROW):case A.keys.PAGE_DOWN:this.decrement(B);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}A.stopEvent(B)
},_onHandleClick:function(B){if(this.disabled){return 
}if(!A.isIE){dijit.focus(this.sliderHandle)
}A.stopEvent(B)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(D){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
A.stopEvent(D);
var C=A.coords(this.sliderBarContainer,true);
var B=D[this._mousePixelCoord]-C[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(C[this._pixelCount]-B):B,C[this._pixelCount],true)
},_setPixelValue:function(C,E,G){if(this.disabled){return 
}C=C<0?0:E<C?E:C;
var F=this.discreteValues;
if(F<=1||F==Infinity){F=E
}F--;
var B=E/F;
var D=Math.round(C/B);
this.setValue((this.maximum-this.minimum)*D/F+this.minimum,G)
},setValue:function(D,C){this.valueNode.value=this.value=D;
this.inherited("setValue",arguments);
var B=(D-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(B*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-B)*100)+"%"
},_bumpValue:function(E){if(this.disabled){return 
}var B=A.getComputedStyle(this.sliderBarContainer);
var F=A._getContentBox(this.sliderBarContainer,B);
var C=this.discreteValues;
if(C<=1||C==Infinity){C=F[this._pixelCount]
}C--;
var D=(this.value-this.minimum)*C/(this.maximum-this.minimum)+E;
if(D<0){D=0
}if(D>C){D=C
}D=D*(this.maximum-this.minimum)/C+this.minimum;
this.setValue(D,true)
},decrement:function(B){this._bumpValue(B.keyCode==A.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(B){this._bumpValue(B.keyCode==A.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(B){A.stopEvent(B);
var C=0;
if(typeof B.wheelDelta=="number"){C=B.wheelDelta
}else{if(typeof B.detail=="number"){C=-B.detail
}}if(C>0){this.increment(B)
}else{if(C<0){this.decrement(B)
}}},startup:function(){A.forEach(this.getChildren(),function(B){if(this[B.container]!=this.containerNode){this[B.container].appendChild(B.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,A.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var B=this;
var C=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=B
};
A.extend(C,dijit.form._SliderMover.prototype);
this._movable=new A.dnd.Moveable(this.sliderHandle,{mover:C});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
A.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
A.declare("dijit.form._SliderMover",A.dnd.Mover,{onMouseMove:function(G){var F=this.widget;
var H=this.constraintBox;
if(!H){var D=F.sliderBarContainer;
var E=A.getComputedStyle(D);
var H=A._getContentBox(D,E);
H[F._startingPixelCount]=0;
this.constraintBox=H
}var B=this.marginBox;
var C=F._isReversed()?G[F._mousePixelCoord]-A._abs(F.sliderBarContainer).x:B[F._startingPixelCount]+G[F._mousePixelCoord];
A.hitch(F,"_setPixelValue")(F._isReversed()||F._upsideDown?(H[F._pixelCount]-C):C,H[F._pixelCount])
},destroy:function(C){var B=this.widget;
B.setValue(B.value,true);
A.dnd.Mover.prototype.destroy.call(this)
}});
A.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(C,B){return this._positionPrefix+C+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var D=this._genHTML(50,0)
}else{var B=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var D=this._genHTML(0,0);
for(var C=1;
C<this.count-1;
C++){D+=this._genHTML(B*C,C)
}D+=this._genHTML(100,this.count-1)
}else{var D=this._genHTML(100,0);
for(var C=1;
C<this.count-1;
C++){D+=this._genHTML(100-B*C,C)
}D+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=D
}});
A.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
A.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(B){return B
},_genHTML:function(C,B){return this._positionPrefix+this._calcPosition(C)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[B]+this._suffix
},getLabels:function(){var E=this.labels;
if(!E.length){E=A.query("> li",this.srcNodeRef).map(function(F){return String(F.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!E.length&&this.count>1){var D=this.minimum;
var C=(this.maximum-D)/(this.count-1);
for(var B=0;
B<this.count;
B++){E.push((B<this.numericMargin||B>=(this.count-this.numericMargin))?"":A.number.format(D,this.constraints));
D+=C
}}return E
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
A.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(B){return 100-B
},_isHorizontal:false})
}}});