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
}},layout:function(){var D=0;
var C=this.selectedChildWidget;
A.forEach(this.getChildren(),function(E){D+=E.getTitleHeight()
});
var B=this._contentBox;
this._verticalSpace=(B.h-D);
if(C){C.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(B){return B
},_transition:function(F,E){if(this._inTransition){return 
}this._inTransition=true;
var G=[];
var D=this._verticalSpace;
if(F){F.setSelected(true);
var C=F.containerNode;
C.style.display="";
G.push(A.animateProperty({node:C,duration:this.duration,properties:{height:{start:"1",end:D}},onEnd:function(){C.style.overflow="auto"
}}))
}if(E){E.setSelected(false);
var B=E.containerNode;
B.style.overflow="hidden";
G.push(A.animateProperty({node:B,duration:this.duration,properties:{height:{start:D,end:"1"}},onEnd:function(){B.style.display="none"
}}))
}this._inTransition=false;
A.fx.combine(G).play()
},_onKeyPress:function(C){if(this.disabled||C.altKey){return 
}var B=A.keys;
switch(C.keyCode){case B.LEFT_ARROW:case B.UP_ARROW:case B.PAGE_UP:this._adjacent(false)._onTitleClick();
A.stopEvent(C);
break;
case B.RIGHT_ARROW:case B.DOWN_ARROW:case B.PAGE_DOWN:this._adjacent(true)._onTitleClick();
A.stopEvent(C);
break;
default:if(C.ctrlKey&&C.keyCode==B.TAB){this._adjacent(C._dijitWidget,!C.shiftKey)._onTitleClick();
A.stopEvent(C)
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