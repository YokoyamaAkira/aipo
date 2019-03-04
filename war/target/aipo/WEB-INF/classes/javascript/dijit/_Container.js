if(!dojo._hasResource["dijit._Container"]){dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Contained",null,{getParent:function(){for(var B=this.domNode.parentNode;
B;
B=B.parentNode){var C=B.getAttribute&&B.getAttribute("widgetId");
if(C){var A=dijit.byId(C);
return A.isContainer?A:null
}}return null
},_getSibling:function(B){var A=this.domNode;
do{A=A[B+"Sibling"]
}while(A&&A.nodeType!=1);
if(!A){return null
}var C=A.getAttribute("widgetId");
return dijit.byId(C)
},getPreviousSibling:function(){return this._getSibling("previous")
},getNextSibling:function(){return this._getSibling("next")
}});
dojo.declare("dijit._Container",null,{isContainer:true,addChild:function(D,A){if(A===undefined){A="last"
}var B=this.containerNode||this.domNode;
if(A&&typeof A=="number"){var C=dojo.query("> [widgetid]",B);
if(C&&C.length>=A){B=C[A-1];
A="after"
}}dojo.place(D.domNode,B,A);
if(this._started&&!D._started){D.startup()
}},removeChild:function(B){var A=B.domNode;
A.parentNode.removeChild(A)
},_nextElement:function(A){do{A=A.nextSibling
}while(A&&A.nodeType!=1);
return A
},_firstElement:function(A){A=A.firstChild;
if(A&&A.nodeType!=1){A=this._nextElement(A)
}return A
},getChildren:function(){return dojo.query("> [widgetId]",this.containerNode||this.domNode).map(dijit.byNode)
},hasChildren:function(){var A=this.containerNode||this.domNode;
return !!this._firstElement(A)
},_getSiblingOfChild:function(D,A){var B=D.domNode;
var C=(A>0?"nextSibling":"previousSibling");
do{B=B[C]
}while(B&&(B.nodeType!=1||!dijit.byNode(B)));
return B?dijit.byNode(B):null
}});
dojo.declare("dijit._KeyNavContainer",[dijit._Container],{_keyNavCodes:{},connectKeyNavHandlers:function(A,E){var B=this._keyNavCodes={};
var D=dojo.hitch(this,this.focusPrev);
var C=dojo.hitch(this,this.focusNext);
dojo.forEach(A,function(F){B[F]=D
});
dojo.forEach(E,function(F){B[F]=C
});
this.connect(this.domNode,"onkeypress","_onContainerKeypress");
if(dojo.isIE){this.connect(this.domNode,"onactivate","_onContainerFocus");
this.connect(this.domNode,"ondeactivate","_onContainerBlur")
}else{this.connect(this.domNode,"onfocus","_onContainerFocus");
this.connect(this.domNode,"onblur","_onContainerBlur")
}},startupKeyNavChildren:function(){dojo.forEach(this.getChildren(),dojo.hitch(this,"_setTabIndexMinusOne"))
},addChild:function(B,A){dijit._KeyNavContainer.superclass.addChild.apply(this,arguments);
this._setTabIndexMinusOne(B)
},focus:function(){this.focusFirstChild()
},focusFirstChild:function(){this.focusChild(this._getFirstFocusableChild())
},focusNext:function(){if(this.focusedChild&&this.focusedChild.hasNextFocalNode&&this.focusedChild.hasNextFocalNode()){this.focusedChild.focusNext();
return 
}var A=this._getNextFocusableChild(this.focusedChild,1);
if(A.getFocalNodes){this.focusChild(A,A.getFocalNodes()[0])
}else{this.focusChild(A)
}},focusPrev:function(){if(this.focusedChild&&this.focusedChild.hasPrevFocalNode&&this.focusedChild.hasPrevFocalNode()){this.focusedChild.focusPrev();
return 
}var B=this._getNextFocusableChild(this.focusedChild,-1);
if(B.getFocalNodes){var A=B.getFocalNodes();
this.focusChild(B,A[A.length-1])
}else{this.focusChild(B)
}},focusChild:function(B,A){if(B){if(this.focusedChild&&B!==this.focusedChild){this._onChildBlur(this.focusedChild)
}this.focusedChild=B;
if(A&&B.focusFocalNode){B.focusFocalNode(A)
}else{B.focus()
}}},_setTabIndexMinusOne:function(A){if(A.getFocalNodes){dojo.forEach(A.getFocalNodes(),function(B){B.setAttribute("tabIndex",-1)
})
}else{(A.focusNode||A.domNode).setAttribute("tabIndex",-1)
}},_onContainerFocus:function(A){this.domNode.setAttribute("tabIndex",-1);
if(A.target===this.domNode){this.focusFirstChild()
}else{var B=dijit.getEnclosingWidget(A.target);
if(B&&B.isFocusable()){this.focusedChild=B
}}},_onContainerBlur:function(A){if(this.tabIndex){this.domNode.setAttribute("tabIndex",this.tabIndex)
}},_onContainerKeypress:function(A){if(A.ctrlKey||A.altKey){return 
}var B=this._keyNavCodes[A.keyCode];
if(B){B();
dojo.stopEvent(A)
}},_onChildBlur:function(A){},_getFirstFocusableChild:function(){return this._getNextFocusableChild(null,1)
},_getNextFocusableChild:function(D,A){if(D){D=this._getSiblingOfChild(D,A)
}var C=this.getChildren();
for(var B=0;
B<C.length;
B++){if(!D){D=C[(A>0)?0:(C.length-1)]
}if(D.isFocusable()){return D
}D=this._getSiblingOfChild(D,A)
}}})
};