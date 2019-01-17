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
}},layout:function(){var C=0;
var B=this.selectedChildWidget;
dojo.forEach(this.getChildren(),function(D){C+=D.getTitleHeight()
});
var A=this._contentBox;
this._verticalSpace=(A.h-C);
if(B){B.containerNode.style.height=this._verticalSpace+"px"
}},_setupChild:function(A){return A
},_transition:function(E,D){if(this._inTransition){return 
}this._inTransition=true;
var F=[];
var C=this._verticalSpace;
if(E){E.setSelected(true);
var B=E.containerNode;
B.style.display="";
F.push(dojo.animateProperty({node:B,duration:this.duration,properties:{height:{start:"1",end:C}},onEnd:function(){B.style.overflow="auto"
}}))
}if(D){D.setSelected(false);
var A=D.containerNode;
A.style.overflow="hidden";
F.push(dojo.animateProperty({node:A,duration:this.duration,properties:{height:{start:C,end:"1"}},onEnd:function(){A.style.display="none"
}}))
}this._inTransition=false;
dojo.fx.combine(F).play()
},_onKeyPress:function(B){if(this.disabled||B.altKey){return 
}var A=dojo.keys;
switch(B.keyCode){case A.LEFT_ARROW:case A.UP_ARROW:case A.PAGE_UP:this._adjacent(false)._onTitleClick();
dojo.stopEvent(B);
break;
case A.RIGHT_ARROW:case A.DOWN_ARROW:case A.PAGE_DOWN:this._adjacent(true)._onTitleClick();
dojo.stopEvent(B);
break;
default:if(B.ctrlKey&&B.keyCode==A.TAB){this._adjacent(B._dijitWidget,!B.shiftKey)._onTitleClick();
dojo.stopEvent(B)
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