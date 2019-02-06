if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var A=this.domNode.parentNode;
A;
A=A.parentNode){var B=A.getAttribute&&A.getAttribute("widgetId");
if(B){var C=dijit.byId(B);
return C.isContainer?C:null
}}return null
},_getSibling:function(A){var C=this.domNode;
do{C=C[A+"Sibling"]
}while(C&&C.nodeType!=1);
if(!C){return null
}var B=C.getAttribute("widgetId");
return dijit.byId(B)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(C,D){if(D===undefined){D="last"
}var A=this.containerNode||this.domNode;
if(D&&typeof D=="number"){var B=dojo.query("> [widgetid]",A);
if(B&&B.length>=D){A=B[D-1];
D="after"
}}dojo.place(C.domNode,A,D);
if(this._started&&!C._started){C.startup()
}},removeChild:function(A){var B=A.domNode;
B.parentNode.removeChild(B)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(C,D){var A=C.domNode;
var B=(D>0?"nextSibling":"previousSibling");
do{A=A[B]
}while(A&&(A.nodeType!=1||!dijit.byNode(A)));
return A?dijit.byNode(A):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(E,D){var A=this._keyNavCodes={};
var C=dojo.hitch(this,this.focusPrev);
var B=dojo.hitch(this,this.focusNext);
dojo.forEach(E,function(F){A[F]=C
});
dojo.forEach(D,function(F){A[F]=B
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(A,B){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(A)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var A=this._getNextFocusableChild(this.focusedChild,-1);
if(A.getFocalNodes){var B=A.getFocalNodes();
this.focusChild(A,B[B.length-1])
}else{this.focusChild(A)
}},focusChild:function(A,B){if(A){if(this.focusedChild&&A!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=A;
if(B&&A.focusFocalNode){A.focusFocalNode(B)
}else{A.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){dojo.forEach(A.getFocalNodes(),function(B){B.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(B){this.domNode.setAttribute("tabIndex",-1);
if(B.target===this.domNode){this.focusFirstChild()
}else{var A=dijit.getEnclosingWidget(B.target);
if(A&&A.isFocusable()){this.focusedChild=A
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(B){if(B.ctrlKey||B.altKey){return 
}var A=this._keyNavCodes[B.keyCode];
if(A){A();
dojo.stopEvent(B)
}},_onChildBlur:function(A){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(C,D){if(C){C=this._getSiblingOfChild(C,D)
}var B=this.getChildren();
for(var A=0;
A<B.length;
A++){if(!C){C=B[(D>0)?0:(B.length-1)]
}if(C.isFocusable()){return C
}C=this._getSiblingOfChild(C,D)
}}})
};