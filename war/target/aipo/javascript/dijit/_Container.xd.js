dojo._xdResourceLoaded({depends:[["provide","dijit._Container"]],defineResource:function(A){if(!A._hasResource["dijit._Container"]){A._hasResource["dijit._Container"]=true;
A.provide("dijit._Container");
A.declare("dijit._Contained",null,{getParent:function(){for(var C=this.domNode.parentNode;
C;
C=C.parentNode){var D=C.getAttribute&&C.getAttribute("widgetId");
if(D){var B=dijit.byId(D);
return B.isContainer?B:null
}}return null
},_getSibling:function(C){var B=this.domNode;
do{B=B[C+"Sibling"]
}while(B&&B.nodeType!=1);
if(!B){return null
}var D=B.getAttribute("widgetId");
return dijit.byId(D)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
A.declare("dijit._Container",null,{isContainer:true,addChild:function(E,B){if(B===undefined){B="last"
}var C=this.containerNode||this.domNode;
if(B&&typeof B=="number"){var D=A.query("> [widgetid]",C);
if(D&&D.length>=B){C=D[B-1];
B="after"
}}A.place(E.domNode,C,B);
if(this._started&&!E._started){E.startup()
}},removeChild:function(C){var B=C.domNode;
B.parentNode.removeChild(B)
},_nextElement:function(B){do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
},_firstElement:function(B){B=B.firstChild;
if(B&&B.nodeType!=1){B=this._nextElement(B)
}return B
},getChildren:function(){return A.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var B=this.containerNode||this.domNode;
return !!this._firstElement(B)
},_getSiblingOfChild:function(E,B){var C=E.domNode;
var D=(B>0?"nextSibling":"previousSibling");
do{C=C[D]
}while(C&&(C.nodeType!=1||!dijit.byNode(C)));
return C?dijit.byNode(C):null
}});
A.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(B,F){var C=this._keyNavCodes={};
var E=A.hitch(this,this.focusPrev);
var D=A.hitch(this,this.focusNext);
A.forEach(B,function(G){C[G]=E
});
A.forEach(F,function(G){C[G]=D
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(A.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){A.forEach(this.getChildren(),A.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(C,B){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(C)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var B=this._getNextFocusableChild(this.focusedChild,1);
if(B.getFocalNodes){this.focusChild(B,B.getFocalNodes()[0])
}else{this.focusChild(B)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var C=this._getNextFocusableChild(this.focusedChild,-1);
if(C.getFocalNodes){var B=C.getFocalNodes();
this.focusChild(C,B[B.length-1])
}else{this.focusChild(C)
}},focusChild:function(C,B){if(C){if(this.focusedChild&&C!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=C;
if(B&&C.focusFocalNode){C.focusFocalNode(B)
}else{C.focus()
}}},_setTabIndexMinusOne:function(B){if(B.getFocalNodes){A.forEach(B.getFocalNodes(),function(C){C.setAttribute("tabIndex",-1)
})
}else{(B.focusNode||B.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(B){this.domNode.setAttribute("tabIndex",-1);
if(B.target===this.domNode){this.focusFirstChild()
}else{var C=dijit.getEnclosingWidget(B.target);
if(C&&C.isFocusable()){this.focusedChild=C
}}},_onContainerBlur:function(B){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(B){if(B.ctrlKey||B.altKey){return 
}var C=this._keyNavCodes[B.keyCode];
if(C){C();
A.stopEvent(B)
}},_onChildBlur:function(B){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(E,B){if(E){E=this._getSiblingOfChild(E,B)
}var D=this.getChildren();
for(var C=0;
C<D.length;
C++){if(!E){E=D[(B>0)?0:(D.length-1)]
}if(E.isFocusable()){return E
}E=this._getSiblingOfChild(E,B)
}}})
}}});