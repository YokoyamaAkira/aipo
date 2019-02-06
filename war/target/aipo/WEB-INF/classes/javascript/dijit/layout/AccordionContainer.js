if(!dojo._hasResource["dijit.layout.AccordionContainer"]){dojo._hasResource["dijit.layout.AccordionContainer"]=true;
dojo.provide("dijit.layout.AccordionContainer");
dojo.require("dojo.fx");
dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.StackContainer");
dojo.require("dijit.layout.ContentPane");
dojo.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
dojo.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var A=this.selectedChildWidget.containerNode.style;
A.display="";
A.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var B=0;
var A=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(D){B+=D.getTitleHeight()
});
var C=this._contentBox;
this._verticalSpace=(C.h-B);
if(A){A.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(A){return A
},_transition:function(D,C){if(this._inTransition){return 
}this._inTransition=true;
var E=[];
var B=this._verticalSpace;
if(D){D.setSelected(true);
var A=D.containerNode;
A.style.display="";
E.push(dojo.animateProperty({node:A,duration:this.duration,properties:{height:{start:"1",end:B}},onEnd:function(){A.style.overflow="auto"
}}))
}if(C){C.setSelected(false);
var F=C.containerNode;
F.style.overflow="hidden";
E.push(dojo.animateProperty({node:F,duration:this.duration,properties:{height:{start:B,end:"1"}},onEnd:function(){F.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(E).play()
},_onKeyPress:function(A){if(this.disabled||A.altKey){return 
}var B=dojo.keys;
switch(A.keyCode){case B.LEFT_ARROW:case B.UP_ARROW:case B.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(A);
break;
case B.RIGHT_ARROW:case B.DOWN_ARROW:case B.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(A);
break;
default:if(A.ctrlKey&&A.keyCode==B.TAB){this._adjacent(A._dijitWidget,!A.shiftKey)._onTitleClick();
dojo.stopEvent(A)
}}}});
dojo.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
dojo.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return dojo.marginBox(this.titleNode).h
},_onTitleClick:function(){var A=this.getParent();
if(!A._inTransition){A.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(A){A._dijitWidget=this;
return this.getParent()._onKeyPress(A)
},_setSelectedState:function(A){this.selected=A;
dojo[(A?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",A?"0":"-1")
},_handleFocus:function(A){dojo[(A.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(A){this._setSelectedState(A);
if(A){this.onSelected()
}},onSelected:function(){}})
};