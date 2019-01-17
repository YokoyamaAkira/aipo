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
}},_makeButton:function(D){dojo.style(D.domNode,"position","absolute");
var B=document.createElement("td");
this.buttonNode.appendChild(B);
var C=B.appendChild(document.createElement("div"));
var A=new dojox.layout._RadioButton({label:D.title,page:D},C);
A.startup()
},_transition:function(B,A){this._showChild(B);
if(A){this._hideChild(A)
}if(this.doLayout&&B.resize){B.resize(this._containerContentBox||this._contentBox)
}},_showChild:function(B){var A=this.getChildren();
B.isFirstChild=(B==A[0]);
B.isLastChild=(B==A[A.length-1]);
B.selected=true;
B.domNode.style.display="";
if(B._loadCheck){B._loadCheck()
}if(B.onShow){B.onShow()
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
},_positionChild:function(B){var C=Math.round(Math.random());
var A=Math.round(Math.random());
dojo.style(B.domNode,C?"top":"left",(A?"-":"")+this._size[C?"h":"w"]+"px")
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