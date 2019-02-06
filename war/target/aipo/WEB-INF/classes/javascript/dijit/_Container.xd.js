dojo._xdResourceLoaded({depends:[["provide","dijit._Container"]],defineResource:function(A){if(!A._hasResource["dijit._Container"]){A._hasResource["dijit._Container"]=true;
A.provide("dijit._Container");
A.declare("dijit._Contained",null,{getParent:function(){for(var D=this.domNode.parentNode;
D;
D=D.parentNode){var B=D.getAttribute&&D.getAttribute("widgetId");
if(B){var C=dijit.byId(B);
return C.isContainer?C:null
}}return null
},_getSibling:function(D){var C=this.domNode;
do{C=C[D+"Sibling"]
}while(C&&C.nodeType!=1);
if(!C){return null
}var B=C.getAttribute("widgetId");
return dijit.byId(B)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
A.declare("dijit._Container",null,{isContainer:true,addChild:function(B,C){if(C===undefined){C="last"
}var D=this.containerNode||this.domNode;
if(C&&typeof C=="number"){var E=A.query("> [widgetid]",D);
if(E&&E.length>=C){D=E[C-1];
C="after"
}}A.place(B.domNode,D,C);
if(this._started&&!B._started){B.startup()
}},removeChild:function(B){var C=B.domNode;
C.parentNode.removeChild(C)
},_nextElement:function(B){do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
},_firstElement:function(B){B=B.firstChild;
if(B&&B.nodeType!=1){B=this._nextElement(B)
}return B
},getChildren:function(){return A.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var B=this.containerNode||this.domNode;
return !!this._firstElement(B)
},_getSiblingOfChild:function(B,C){var D=B.domNode;
var E=(C>0?"nextSibling":"previousSibling");
do{D=D[E]
}while(D&&(D.nodeType!=1||!dijit.byNode(D)));
return D?dijit.byNode(D):null
}});
A.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(C,B){var D=this._keyNavCodes={};
var F=A.hitch(this,this.focusPrev);
var E=A.hitch(this,this.focusNext);
A.forEach(C,function(G){D[G]=F
});
A.forEach(B,function(G){D[G]=E
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(A.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){A.forEach(this.getChildren(),A.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(B,C){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(B)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var B=this._getNextFocusableChild(this.focusedChild,1);
if(B.getFocalNodes){this.focusChild(B,B.getFocalNodes()[0])
}else{this.focusChild(B)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var B=this._getNextFocusableChild(this.focusedChild,-1);
if(B.getFocalNodes){var C=B.getFocalNodes();
this.focusChild(B,C[C.length-1])
}else{this.focusChild(B)
}},focusChild:function(B,C){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(C&&B.focusFocalNode){B.focusFocalNode(C)
}else{B.focus()
}}},_setTabIndexMinusOne:function(B){if(B.getFocalNodes){A.forEach(B.getFocalNodes(),function(C){C.setAttribute("tabIndex",-1)
})
}else{(B.focusNode||B.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(C){this.domNode.setAttribute("tabIndex",-1);
if(C.target===this.domNode){this.focusFirstChild()
}else{var B=dijit.getEnclosingWidget(C.target);
if(B&&B.isFocusable()){this.focusedChild=B
}}},_onContainerBlur:function(B){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(C){if(C.ctrlKey||C.altKey){return 
}var B=this._keyNavCodes[C.keyCode];
if(B){B();
A.stopEvent(C)
}},_onChildBlur:function(B){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(B,C){if(B){B=this._getSiblingOfChild(B,C)
}var E=this.getChildren();
for(var D=0;
D<E.length;
D++){if(!B){B=E[(C>0)?0:(E.length-1)]
}if(B.isFocusable()){return B
}B=this._getSiblingOfChild(B,C)
}}})
}}});