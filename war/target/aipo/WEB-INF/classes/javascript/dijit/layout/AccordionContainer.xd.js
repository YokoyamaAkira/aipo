dojo._xdResourceLoaded({depends:[["provide","dijit.layout.AccordionContainer"],["require","dojo.fx"],["require","dijit._Container"],["require","dijit._Templated"],["require","dijit.layout.StackContainer"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["dijit.layout.AccordionContainer"]){A._hasResource["dijit.layout.AccordionContainer"]=true;
A.provide("dijit.layout.AccordionContainer");
A.require("dojo.fx");
A.require("dijit._Container");
A.require("dijit._Templated");
A.require("dijit.layout.StackContainer");
A.require("dijit.layout.ContentPane");
A.declare("dijit.layout.AccordionContainer",dijit.layout.StackContainer,{duration:250,_verticalSpace:0,postCreate:function(){this.domNode.style.overflow="hidden";
this.inherited("postCreate",arguments);
dijit.setWaiRole(this.domNode,"tablist");
A.addClass(this.domNode,"dijitAccordionContainer")
},startup:function(){if(this._started){return 
}this.inherited("startup",arguments);
if(this.selectedChildWidget){var B=this.selectedChildWidget.containerNode.style;
B.display="";
B.overflow="auto";
this.selectedChildWidget._setSelectedState(true)
}},layout:function(){var B=0;
var D=this.selectedChildWidget;
A.forEach(this.getChildren(),function(E){B+=E.getTitleHeight()
});
var C=this._contentBox;
this._verticalSpace=(C.h-B);
if(D){D.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(B){return B
},_transition:function(G,F){if(this._inTransition){return 
}this._inTransition=true;
var C=[];
var E=this._verticalSpace;
if(G){G.setSelected(true);
var D=G.containerNode;
D.style.display="";
C.push(A.animateProperty({node:D,duration:this.duration,properties:{height:{start:"1",end:E}},onEnd:function(){D.style.overflow="auto"
}}))
}if(F){F.setSelected(false);
var B=F.containerNode;
B.style.overflow="hidden";
C.push(A.animateProperty({node:B,duration:this.duration,properties:{height:{start:E,end:"1"}},onEnd:function(){B.style.display="none"
}}))
}this._inTransition=false;
A.fx.combine(C).play()
},_onKeyPress:function(B){if(this.disabled||B.altKey){return 
}var C=A.keys;
switch(B.keyCode){case C.LEFT_ARROW:case C.UP_ARROW:case C.PAGE_UP:this._adjacent(false)._onTitleClick();
A.stopEvent(B);
break;
case C.RIGHT_ARROW:case C.DOWN_ARROW:case C.PAGE_DOWN:this._adjacent(true)._onTitleClick();
A.stopEvent(B);
break;
default:if(B.ctrlKey&&B.keyCode==C.TAB){this._adjacent(B._dijitWidget,!B.shiftKey)._onTitleClick();
A.stopEvent(B)
}}}});
A.declare("dijit.layout.AccordionPane",[dijit.layout.ContentPane,dijit._Templated,dijit._Contained],{templateString:"<div class='dijitAccordionPane'\r\n\t><div dojoAttachPoint='titleNode,focusNode' dojoAttachEvent='ondijitclick:_onTitleClick,onkeypress:_onTitleKeyPress,onfocus:_handleFocus,onblur:_handleFocus'\r\n\t\tclass='dijitAccordionTitle' wairole=\"tab\"\r\n\t\t><div class='dijitAccordionArrow'></div\r\n\t\t><div class='arrowTextUp' waiRole=\"presentation\">&#9650;</div\r\n\t\t><div class='arrowTextDown' waiRole=\"presentation\">&#9660;</div\r\n\t\t><div dojoAttachPoint='titleTextNode' class='dijitAccordionText'>${title}</div></div\r\n\t><div><div dojoAttachPoint='containerNode' style='overflow: hidden; height: 1px; display: none'\r\n\t\tclass='dijitAccordionBody' wairole=\"tabpanel\"\r\n\t></div></div>\r\n</div>\r\n",postCreate:function(){this.inherited("postCreate",arguments);
A.setSelectable(this.titleNode,false);
this.setSelected(this.selected)
},getTitleHeight:function(){return A.marginBox(this.titleNode).h
},_onTitleClick:function(){var B=this.getParent();
if(!B._inTransition){B.selectChild(this);
dijit.focus(this.focusNode)
}},_onTitleKeyPress:function(B){B._dijitWidget=this;
return this.getParent()._onKeyPress(B)
},_setSelectedState:function(B){this.selected=B;
A[(B?"addClass":"removeClass")](this.domNode,"dijitAccordionPane-selected");
this.focusNode.setAttribute("tabIndex",B?"0":"-1")
},_handleFocus:function(B){A[(B.type=="focus"?"addClass":"removeClass")](this.focusNode,"dijitAccordionPaneFocused")
},setSelected:function(B){this._setSelectedState(B);
if(B){this.onSelected()
}},onSelected:function(){}})
}}});