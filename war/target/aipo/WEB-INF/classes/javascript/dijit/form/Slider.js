if(!dojo._hasResource["dijit.form.Slider"]){dojo._hasResource["dijit.form.Slider"]=true;
dojo.provide("dijit.form.Slider");
dojo.require("dijit.form._FormWidget");
dojo.require("dijit._Container");
dojo.require("dojo.dnd.move");
dojo.require("dijit.form.Button");
dojo.require("dojo.number");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormWidget,dijit._Container],{templateString:'<table class="dijit dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,topDecoration" class="dijitReset" style="text-align:center;width:100%;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer"\r\n\t\t\t><div class="dijitHorizontalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderLeftBumper dijitHorizontalSliderLeftBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><div style="position:relative;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderProgressBar dijitHorizontalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable dijitHorizontalSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitHorizontalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitHorizontalSliderBar dijitSliderRemainingBar dijitHorizontalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><div class="dijitSliderBar dijitSliderBumper dijitHorizontalSliderBumper dijitSliderRightBumper dijitHorizontalSliderRightBumper"></div\r\n\t\t></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitHorizontalSliderButtonContainer" style="right:0px;"\r\n\t\t\t><div class="dijitHorizontalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t\t><td dojoAttachPoint="containerNode,bottomDecoration" class="dijitReset" style="text-align:center;"></td\r\n\t\t><td class="dijitReset" colspan="2"></td\r\n\t></tr\r\n></table>\r\n',value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,widgetsInTemplate:true,attributeMap:dojo.mixin(dojo.clone(dijit.form._FormWidget.prototype.attributeMap),{id:"",name:"valueNode"}),baseClass:"dijitSlider",_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",_upsideDown:false,_onKeyPress:function(A){if(this.disabled||A.altKey||A.ctrlKey){return 
}switch(A.keyCode){case dojo.keys.HOME:this.setValue(this.minimum,false);
break;
case dojo.keys.END:this.setValue(this.maximum,false);
break;
case dojo.keys.UP_ARROW:case (this._isReversed()?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):case dojo.keys.PAGE_UP:this.increment(A);
break;
case dojo.keys.DOWN_ARROW:case (this._isReversed()?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):case dojo.keys.PAGE_DOWN:this.decrement(A);
break;
default:this.inherited("_onKeyPress",arguments);
return 
}dojo.stopEvent(A)
},_onHandleClick:function(A){if(this.disabled){return 
}if(!dojo.isIE){dijit.focus(this.sliderHandle)
}dojo.stopEvent(A)
},_isReversed:function(){return !(this._upsideDown||this.isLeftToRight())
},_onBarClick:function(B){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
dojo.stopEvent(B);
var A=dojo.coords(this.sliderBarContainer,true);
var C=B[this._mousePixelCoord]-A[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(A[this._pixelCount]-C):C,A[this._pixelCount],true)
},_setPixelValue:function(A,C,E){if(this.disabled){return 
}A=A<0?0:C<A?C:A;
var D=this.discreteValues;
if(D<=1||D==Infinity){D=C
}D--;
var F=C/D;
var B=Math.round(A/F);
this.setValue((this.maximum-this.minimum)*B/D+this.minimum,E)
},setValue:function(B,A){this.valueNode.value=this.value=B;
this.inherited("setValue",arguments);
var C=(B-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(C*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-C)*100)+"%"
},_bumpValue:function(C){if(this.disabled){return 
}var E=dojo.getComputedStyle(this.sliderBarContainer);
var D=dojo._getContentBox(this.sliderBarContainer,E);
var A=this.discreteValues;
if(A<=1||A==Infinity){A=D[this._pixelCount]
}A--;
var B=(this.value-this.minimum)*A/(this.maximum-this.minimum)+C;
if(B<0){B=0
}if(B>A){B=A
}B=B*(this.maximum-this.minimum)/A+this.minimum;
this.setValue(B,true)
},decrement:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(B){dojo.stopEvent(B);
var A=0;
if(typeof B.wheelDelta=="number"){A=B.wheelDelta
}else{if(typeof B.detail=="number"){A=-B.detail
}}if(A>0){this.increment(B)
}else{if(A<0){this.decrement(B)
}}},startup:function(){dojo.forEach(this.getChildren(),function(A){if(this[A.container]!=this.containerNode){this[A.container].appendChild(A.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var B=this;
var A=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=B
};
dojo.extend(A,dijit.form._SliderMover.prototype);
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:A});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(C){var B=this.widget;
var D=this.constraintBox;
if(!D){var G=B.sliderBarContainer;
var A=dojo.getComputedStyle(G);
var D=dojo._getContentBox(G,A);
D[B._startingPixelCount]=0;
this.constraintBox=D
}var E=this.marginBox;
var F=B._isReversed()?C[B._mousePixelCoord]-dojo._abs(B.sliderBarContainer).x:E[B._startingPixelCount]+C[B._mousePixelCoord];
dojo.hitch(B,"_setPixelValue")(B._isReversed()||B._upsideDown?(D[B._pixelCount]-F):F,D[B._pixelCount])
},destroy:function(A){var B=this.widget;
B.setValue(B.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(A,B){return this._positionPrefix+A+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var B=this._genHTML(50,0)
}else{var C=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var B=this._genHTML(0,0);
for(var A=1;
A<this.count-1;
A++){B+=this._genHTML(C*A,A)
}B+=this._genHTML(100,this.count-1)
}else{var B=this._genHTML(100,0);
for(var A=1;
A<this.count-1;
A++){B+=this._genHTML(100-C*A,A)
}B+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=B
}});
dojo.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
dojo.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(A){return A
},_genHTML:function(A,B){return this._positionPrefix+this._calcPosition(A)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[B]+this._suffix
},getLabels:function(){var C=this.labels;
if(!C.length){C=dojo.query("> li",this.srcNodeRef).map(function(E){return String(E.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!C.length&&this.count>1){var B=this.minimum;
var A=(this.maximum-B)/(this.count-1);
for(var D=0;
D<this.count;
D++){C.push((D<this.numericMargin||D>=(this.count-this.numericMargin))?"":dojo.number.format(B,this.constraints));
B+=A
}}return C
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
dojo.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(A){return 100-A
},_isHorizontal:false})
};