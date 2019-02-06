if(!dojo._hasResource["dojox.layout.RadioGroup"]){dojo._hasResource["dojox.layout.RadioGroup"]=true;
dojo.provide("dojox.layout.RadioGroup");
dojo.experimental("dojox.layout.RadioGroup");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dijit.layout.StackContainer");
dojo.require("dojox.fx.easing");
dojo.declare("dojox.layout.RadioGroup",[dijit.layout.StackContainer,dijit._Templated],{duration:750,hasButtons:true,templateString:'<div class="dojoxRadioGroup"> 	<div dojoAttachPoint="buttonHolder" style="display:none;">		<table class="dojoxRadioButtons"><tbody><tr class="dojoxRadioButtonRow" dojoAttachPoint="buttonNode"></tr></tbody></table>	</div>	<div class="dojoxRadioView" dojoAttachPoint="containerNode"></div></div>',startup:function(){this.inherited("startup",arguments);
this._children=this.getChildren();
this._buttons=this._children.length;
this._size=dojo.coords(this.containerNode);
if(this.hasButtons){dojo.style(this.buttonHolder,"display","block");
dojo.forEach(this._children,this._makeButton,this)
}},_makeButton:function(C){dojo.style(C.domNode,"position","absolute");
var A=document.createElement("td");
this.buttonNode.appendChild(A);
var B=A.appendChild(document.createElement("div"));
var D=new dojox.layout._RadioButton({label:C.title,page:C},B);
D.startup()
},_transition:function(A,B){this._showChild(A);
if(B){this._hideChild(B)
}if(this.doLayout&&A.resize){A.resize(this._containerContentBox||this._contentBox)
}},_showChild:function(A){var B=this.getChildren();
A.isFirstChild=(A==B[0]);
A.isLastChild=(A==B[B.length-1]);
A.selected=true;
A.domNode.style.display="";
if(A._loadCheck){A._loadCheck()
}if(A.onShow){A.onShow()
}},_hideChild:function(A){A.selected=false;
A.domNode.style.display="none";
if(A.onHide){A.onHide()
}}});
dojo.declare("dojox.layout.RadioGroupFade",dojox.layout.RadioGroup,{_hideChild:function(A){dojo.fadeOut({node:A.domNode,duration:this.duration,onEnd:this.inherited("_hideChild",arguments)}).play()
},_showChild:function(A){this.inherited("_showChild",arguments);
dojo.style(A.domNode,"opacity",0);
dojo.fadeIn({node:A.domNode,duration:this.duration}).play()
}});
dojo.declare("dojox.layout.RadioGroupSlide",dojox.layout.RadioGroup,{easing:dojox.fx.easing.easeOut,startup:function(){this.inherited("startup",arguments);
dojo.forEach(this._children,this._positionChild,this)
},_positionChild:function(A){var B=Math.round(Math.random());
var C=Math.round(Math.random());
dojo.style(A.domNode,B?"top":"left",(C?"-":"")+this._size[B?"h":"w"]+"px")
},_showChild:function(A){this.inherited("_showChild",arguments);
if(this._anim&&this._anim.status()=="playing"){this._anim.gotoPercent(100,true)
}this._anim=dojo.animateProperty({node:A.domNode,properties:{left:{end:0,unit:"px"},top:{end:0,unit:"px"}},duration:this.duration,easing:this.easing});
this._anim.play()
},_hideChild:function(A){this.inherited("_hideChild",arguments);
this._positionChild(A)
}});
dojo.declare("dojox.layout._RadioButton",[dijit._Widget,dijit._Templated,dijit._Contained],{label:"",page:null,templateString:'<div dojoAttachPoint="focusNode" class="dojoxRadioButton"><span dojoAttachPoint="titleNode" class="dojoxRadioButtonLabel">${label}</span></div>',startup:function(){this.connect(this.domNode,"onmouseover","_onMouse")
},_onMouse:function(A){this.getParent().selectChild(this.page);
this._clearSelected();
dojo.addClass(this.domNode,"dojoxRadioButtonSelected")
},_clearSelected:function(){dojo.query(".dojoxRadioButtonSelected",this.domNode.parentNode.parentNode).forEach(function(A){dojo.removeClass(A,"dojoxRadioButtonSelected")
})
}})
};