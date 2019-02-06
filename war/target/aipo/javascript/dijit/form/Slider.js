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
},_onBarClick:function(C){if(this.disabled||!this.clickSelect){return 
}dijit.focus(this.sliderHandle);
dojo.stopEvent(C);
var B=dojo.coords(this.sliderBarContainer,true);
var A=C[this._mousePixelCoord]-B[this._startingPixelCoord];
this._setPixelValue(this._isReversed()||this._upsideDown?(B[this._pixelCount]-A):A,B[this._pixelCount],true)
},_setPixelValue:function(B,D,F){if(this.disabled){return 
}B=B<0?0:D<B?D:B;
var E=this.discreteValues;
if(E<=1||E==Infinity){E=D
}E--;
var A=D/E;
var C=Math.round(B/A);
this.setValue((this.maximum-this.minimum)*C/E+this.minimum,F)
},setValue:function(C,B){this.valueNode.value=this.value=C;
this.inherited("setValue",arguments);
var A=(C-this.minimum)/(this.maximum-this.minimum);
this.progressBar.style[this._progressPixelSize]=(A*100)+"%";
this.remainingBar.style[this._progressPixelSize]=((1-A)*100)+"%"
},_bumpValue:function(D){if(this.disabled){return 
}var A=dojo.getComputedStyle(this.sliderBarContainer);
var E=dojo._getContentBox(this.sliderBarContainer,A);
var B=this.discreteValues;
if(B<=1||B==Infinity){B=E[this._pixelCount]
}B--;
var C=(this.value-this.minimum)*B/(this.maximum-this.minimum)+D;
if(C<0){C=0
}if(C>B){C=B
}C=C*(this.maximum-this.minimum)/B+this.minimum;
this.setValue(C,true)
},decrement:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1)
},increment:function(A){this._bumpValue(A.keyCode==dojo.keys.PAGE_UP?this.pageIncrement:1)
},_mouseWheeled:function(A){dojo.stopEvent(A);
var B=0;
if(typeof A.wheelDelta=="number"){B=A.wheelDelta
}else{if(typeof A.detail=="number"){B=-A.detail
}}if(B>0){this.increment(A)
}else{if(B<0){this.decrement(A)
}}},startup:function(){dojo.forEach(this.getChildren(),function(A){if(this[A.container]!=this.containerNode){this[A.container].appendChild(A.domNode)
}},this)
},_onBlur:function(){dijit.form.HorizontalSlider.superclass.setValue.call(this,this.value,true)
},postCreate:function(){if(this.showButtons){this.incrementButton.style.display="";
this.decrementButton.style.display=""
}this.connect(this.domNode,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var A=this;
var B=function(){dijit.form._SliderMover.apply(this,arguments);
this.widget=A
};
dojo.extend(B,dijit.form._SliderMover.prototype);
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:B});
this.inherited("postCreate",arguments)
},destroy:function(){this._movable.destroy();
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:'<table class="dijitReset dijitSlider" cellspacing="0" cellpadding="0" border="0" rules="none"\r\n><tbody class="dijitReset"\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderIncrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="incrementButton" dojoAttachEvent="onclick: increment"><span class="dijitSliderButtonInner">+</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderTopBumper dijitVerticalSliderTopBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td dojoAttachPoint="leftDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t\t><td class="dijitReset" style="height:100%;"\r\n\t\t\t><input dojoAttachPoint="valueNode" type="hidden" name="${name}"\r\n\t\t\t/><center style="position:relative;height:100%;" dojoAttachPoint="sliderBarContainer"\r\n\t\t\t\t><div dojoAttachPoint="remainingBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderRemainingBar dijitVerticalSliderRemainingBar" dojoAttachEvent="onclick:_onBarClick"></div\r\n\t\t\t\t><div dojoAttachPoint="progressBar" class="dijitSliderBar dijitVerticalSliderBar dijitSliderProgressBar dijitVerticalSliderProgressBar" dojoAttachEvent="onclick:_onBarClick"\r\n\t\t\t\t\t><div dojoAttachPoint="sliderHandle,focusNode" class="dijitSliderMoveable" dojoAttachEvent="onkeypress:_onKeyPress,onclick:_onHandleClick" style="vertical-align:top;" waiRole="slider" valuemin="${minimum}" valuemax="${maximum}"\r\n\t\t\t\t\t\t><div class="dijitSliderImageHandle dijitVerticalSliderImageHandle"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint="containerNode,rightDecoration" class="dijitReset" style="text-align:center;height:100%;"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset"\r\n\t\t\t><center><div class="dijitSliderBar dijitSliderBumper dijitVerticalSliderBumper dijitSliderBottomBumper dijitVerticalSliderBottomBumper"></div></center\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n\t><tr class="dijitReset"\r\n\t\t><td class="dijitReset"></td\r\n\t\t><td class="dijitReset dijitSliderButtonContainer dijitVerticalSliderButtonContainer"\r\n\t\t\t><div class="dijitVerticalSliderDecrementIcon" tabIndex="-1" style="display:none" dojoAttachPoint="decrementButton" dojoAttachEvent="onclick: decrement"><span class="dijitSliderButtonInner">-</span></div\r\n\t\t></td\r\n\t\t><td class="dijitReset"></td\r\n\t></tr\r\n></tbody></table>\r\n',_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_upsideDown:true});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(F){var E=this.widget;
var G=this.constraintBox;
if(!G){var C=E.sliderBarContainer;
var D=dojo.getComputedStyle(C);
var G=dojo._getContentBox(C,D);
G[E._startingPixelCount]=0;
this.constraintBox=G
}var A=this.marginBox;
var B=E._isReversed()?F[E._mousePixelCoord]-dojo._abs(E.sliderBarContainer).x:A[E._startingPixelCount]+F[E._mousePixelCoord];
dojo.hitch(E,"_setPixelValue")(E._isReversed()||E._upsideDown?(G[E._pixelCount]-B):B,G[E._pixelCount])
},destroy:function(B){var A=this.widget;
A.setValue(A.value,true);
dojo.dnd.Mover.prototype.destroy.call(this)
}});
dojo.declare("dijit.form.HorizontalRule",[dijit._Widget,dijit._Templated],{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',count:3,container:"containerNode",ruleStyle:"",_positionPrefix:'<div class="RuleMark HorizontalRuleMark" style="left:',_positionSuffix:"%;",_suffix:'"></div>',_genHTML:function(B,A){return this._positionPrefix+B+this._positionSuffix+this.ruleStyle+this._suffix
},_isHorizontal:true,postCreate:function(){if(this.count==1){var C=this._genHTML(50,0)
}else{var A=100/(this.count-1);
if(!this._isHorizontal||this.isLeftToRight()){var C=this._genHTML(0,0);
for(var B=1;
B<this.count-1;
B++){C+=this._genHTML(A*B,B)
}C+=this._genHTML(100,this.count-1)
}else{var C=this._genHTML(100,0);
for(var B=1;
B<this.count-1;
B++){C+=this._genHTML(100-A*B,B)
}C+=this._genHTML(0,this.count-1)
}}this.domNode.innerHTML=C
}});
dojo.declare("dijit.form.VerticalRule",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleMark VerticalRuleMark" style="top:',_isHorizontal:false});
dojo.declare("dijit.form.HorizontalRuleLabels",dijit.form.HorizontalRule,{templateString:'<div class="RuleContainer HorizontalRuleContainer"></div>',labelStyle:"",labels:[],numericMargin:0,minimum:0,maximum:1,constraints:{pattern:"#%"},_positionPrefix:'<div class="RuleLabelContainer HorizontalRuleLabelContainer" style="left:',_labelPrefix:'"><span class="RuleLabel HorizontalRuleLabel">',_suffix:"</span></div>",_calcPosition:function(A){return A
},_genHTML:function(B,A){return this._positionPrefix+this._calcPosition(B)+this._positionSuffix+this.labelStyle+this._labelPrefix+this.labels[A]+this._suffix
},getLabels:function(){var D=this.labels;
if(!D.length){D=dojo.query("> li",this.srcNodeRef).map(function(E){return String(E.innerHTML)
})
}this.srcNodeRef.innerHTML="";
if(!D.length&&this.count>1){var C=this.minimum;
var B=(this.maximum-C)/(this.count-1);
for(var A=0;
A<this.count;
A++){D.push((A<this.numericMargin||A>=(this.count-this.numericMargin))?"":dojo.number.format(C,this.constraints));
C+=B
}}return D
},postMixInProperties:function(){this.inherited("postMixInProperties",arguments);
this.labels=this.getLabels();
this.count=this.labels.length
}});
dojo.declare("dijit.form.VerticalRuleLabels",dijit.form.HorizontalRuleLabels,{templateString:'<div class="RuleContainer VerticalRuleContainer"></div>',_positionPrefix:'<div class="RuleLabelContainer VerticalRuleLabelContainer" style="top:',_labelPrefix:'"><span class="RuleLabel VerticalRuleLabel">',_calcPosition:function(A){return 100-A
},_isHorizontal:false})
};