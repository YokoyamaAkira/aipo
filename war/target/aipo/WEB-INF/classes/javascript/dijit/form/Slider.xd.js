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
},_onBarClick:function(B){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
A.stopEvent(B);
var D=A.coords(this.sliderBarContainer,true);
var C=B[this._mousePixelCoord]-D[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(D[this._pixelCount]-C):C,D[this._pixelCount],true)
},_setPixelValue:function(D,F,C){if(this.disabled){return 
}D=D<0?0:F<D?F:D;
var G=this.discreteValues;
if(G<=1||G==Infinity){G=F
}G--;
var B=F/G;
var E=Math.round(D/B);
this.setValue((this.maximum-this.minimum)*E/G+this.minimum,C)
},setValue:function(B,D){this.valueNode.value=this.value=B;
this.inherited("setValue",arguments);
var C=(B-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(C*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-C)*100)+"%"
},_bumpValue:function(F){if(this.disabled){return 
}var C=A.getComputedStyle(this.sliderBarContainer);
var B=A._getContentBox(this.sliderBarContainer,C);
var D=this.discreteValues;
if(D<=1||D==Infinity){D=B[this._pixelCount]
}D--;
var E=(this.value-this.minimum)*D/(this.maximum-this.minimum)+F;
if(E<0){E=0
}if(E>D){E=D
}E=E*(this.maximum-this.minimum)/D+this.minimum;
this.setValue(E,true)
},decrement:function(B){this._bumpValue(B.keyCode==A.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(B){this._bumpValue(B.keyCode==A.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(C){A.stopEvent(C);
var B=0;
if(typeof C.wheelDelta=="number"){B=C.wheelDelta
}else{if(typeof C.detail=="number"){B=-C.detail
}}if(B>0){this.increment(C)
}else{if(B<0){this.decrement(C)
}}},startup:function(){A.forEach(this.getChildren(),function(B){if(this[B.container]!=this.containerNode){this[B.container].appendChild(B.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,A.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var C=this;
var B=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=C
};
A.extend(B,dijit.form._SliderMover.prototype);
this._movable=new A.dnd.Moveable(this.sliderHandle,{mover:B});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
A.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
A.declare("dijit.form._SliderMover",A.dnd.Mover,{onMouseMove:function(F){var E=this.widget;
var C=this.constraintBox;
if(!C){var B=E.sliderBarContainer;
var D=A.getComputedStyle(B);
var C=A._getContentBox(B,D);
C[E._startingPixelCount]=0;
this.constraintBox=C
}var G=this.marginBox;
var H=E._isReversed()?F[E._mousePixelCoord]-A._abs(E.sliderBarContainer).x:G[E._startingPixelCount]+F[E._mousePixelCoord];
A.hitch(E,"_setPixelValue")(E._isReversed()||E._upsideDown?(C[E._pixelCount]-H):H,C[E._pixelCount])
},destroy:function(B){var C=this.widget;
C.setValue(C.value,true);
A.dnd.Mover.prototype.destroy.call(this)
}});
A.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(B,C){return this._positionPrefix+B+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var B=this._genHTML(50,0)
}else{var C=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var B=this._genHTML(0,0);
for(var D=1;
D<this.count-1;
D++){B+=this._genHTML(C*D,D)
}B+=this._genHTML(100,this.count-1)
}else{var B=this._genHTML(100,0);
for(var D=1;
D<this.count-1;
D++){B+=this._genHTML(100-C*D,D)
}B+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=B
}});
A.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
A.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(B){return B
},_genHTML:function(B,C){return this._positionPrefix+this._calcPosition(B)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[C]+this._suffix
},getLabels:function(){var B=this.labels;
if(!B.length){B=A.query("> li",this.srcNodeRef).map(function(F){return String(F.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!B.length&&this.count>1){var E=this.minimum;
var D=(this.maximum-E)/(this.count-1);
for(var C=0;
C<this.count;
C++){B.push((C<this.numericMargin||C>=(this.count-this.numericMargin))?"":A.number.format(E,this.constraints));
E+=D
}}return B
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
A.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(B){return 100-B
},_isHorizontal:false})
}}});