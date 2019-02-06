dojo._xdResourceLoaded({depends:[["provide","dojox.layout.RadioGroup"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require","dijit.layout.StackContainer"],["require","dojox.fx.easing"]],defineResource:function(A){if(!A._hasResource["dojox.layout.RadioGroup"]){A._hasResource["dojox.layout.RadioGroup"]=true;
A.provide("dojox.layout.RadioGroup");
A.experimental("dojox.layout.RadioGroup");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit._Container");
A.require("dijit.layout.StackContainer");
A.require("dojox.fx.easing");
A.declare("dojox.layout.RadioGroup",[dijit.layout.StackContainer,dijit._Templated],{duration:750,hasButtons:true,templateString:'<div class="dojoxRadioGroup"> 	<div dojoAttachPoint="buttonHolder" style="display:none;">		<table class="dojoxRadioButtons"><tbody><tr class="dojoxRadioButtonRow" dojoAttachPoint="buttonNode"></tr></tbody></table>	</div>	<div class="dojoxRadioView" dojoAttachPoint="containerNode"></div></div>',startup:function(){this.inherited("startup",arguments);
this._children=this.getChildren();
this._buttons=this._children.length;
this._size=A.coords(this.containerNode);
if(this.hasButtons){A.style(this.buttonHolder,"display","block");
A.forEach(this._children,this._makeButton,this)
}},_makeButton:function(B){A.style(B.domNode,"position","absolute");
var D=document.createElement("td");
this.buttonNode.appendChild(D);
var E=D.appendChild(document.createElement("div"));
var C=new dojox.layout._RadioButton({label:B.title,page:B},E);
C.startup()
},_transition:function(B,C){this._showChild(B);
if(C){this._hideChild(C)
}if(this.doLayout&&B.resize){B.resize(this._containerContentBox||this._contentBox)
}},_showChild:function(B){var C=this.getChildren();
B.isFirstChild=(B==C[0]);
B.isLastChild=(B==C[C.length-1]);
B.selected=true;
B.domNode.style.display="";
if(B._loadCheck){B._loadCheck()
}if(B.onShow){B.onShow()
}},_hideChild:function(B){B.selected=false;
B.domNode.style.display="none";
if(B.onHide){B.onHide()
}}});
A.declare("dojox.layout.RadioGroupFade",dojox.layout.RadioGroup,{_hideChild:function(B){A.fadeOut({node:B.domNode,duration:this.duration,onEnd:this.inherited("_hideChild",arguments)}).play()
},_showChild:function(B){this.inherited("_showChild",arguments);
A.style(B.domNode,"opacity",0);
A.fadeIn({node:B.domNode,duration:this.duration}).play()
}});
A.declare("dojox.layout.RadioGroupSlide",dojox.layout.RadioGroup,{easing:dojox.fx.easing.easeOut,startup:function(){this.inherited("startup",arguments);
A.forEach(this._children,this._positionChild,this)
},_positionChild:function(D){var B=Math.round(Math.random());
var C=Math.round(Math.random());
A.style(D.domNode,B?"top":"left",(C?"-":"")+this._size[B?"h":"w"]+"px")
},_showChild:function(B){this.inherited("_showChild",arguments);
if(this._anim&&this._anim.status()=="playing"){this._anim.gotoPercent(100,true)
}this._anim=A.animateProperty({node:B.domNode,properties:{left:{end:0,unit:"px"},top:{end:0,unit:"px"}},duration:this.duration,easing:this.easing});
this._anim.play()
},_hideChild:function(B){this.inherited("_hideChild",arguments);
this._positionChild(B)
}});
A.declare("dojox.layout._RadioButton",[dijit._Widget,dijit._Templated,dijit._Contained],{label:"",page:null,templateString:'<div dojoAttachPoint="focusNode" class="dojoxRadioButton"><span dojoAttachPoint="titleNode" class="dojoxRadioButtonLabel">${label}</span></div>',startup:function(){this.connect(this.domNode,"onmouseover","_onMouse")
},_onMouse:function(B){this.getParent().selectChild(this.page);
this._clearSelected();
A.addClass(this.domNode,"dojoxRadioButtonSelected")
},_clearSelected:function(){A.query(".dojoxRadioButtonSelected",this.domNode.parentNode.parentNode).forEach(function(B){A.removeClass(B,"dojoxRadioButtonSelected")
})
}})
}}});