if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit.form.Button");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var A=this.getChildren();
dojo.forEach(A,this._setupChild,this);
dojo.some(A,function(C){if(C.selected){this.selectedChildWidget=C
}return C.selected
},this);
var B=this.selectedChildWidget;
if(!B&&A[0]){B=this.selectedChildWidget=A[0];
B.selected=true
}if(B){this._showChild(B)
}dojo.publish(this.id+"-startup",[{children:A,selected:B}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(A){A.domNode.style.display="none";
A.domNode.style.position="relative";
return A
},addChild:function(B,A){dijit._Container.prototype.addChild.apply(this,arguments);
B=this._setupChild(B);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[B,A]);
if(!this.selectedChildWidget){this.selectChild(B)
}}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[B]);
this.layout()
}if(this.selectedChildWidget===B){this.selectedChildWidget=undefined;
if(this._started){var A=this.getChildren();
if(A.length){this.selectChild(A[0])
}}}},selectChild:function(A){A=dijit.byId(A);
if(this.selectedChildWidget!=A){this._transition(A,this.selectedChildWidget);
this.selectedChildWidget=A;
dojo.publish(this.id+"-selectChild",[A])
}},_transition:function(B,A){if(A){this._hideChild(A)
}this._showChild(B);
if(this.doLayout&&B.resize){B.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(B){var C=this.getChildren();
var A=dojo.indexOf(C,this.selectedChildWidget);
A+=B?1:C.length-1;
return C[A%C.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(A){dojo.publish(this.id+"-containerKeyPress",[{e:A,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
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
}},closeChild:function(B){var A=B.onClose(this,B);
if(A){this.removeChild(B);
B.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
dojo.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[dojo.subscribe(this.containerId+"-startup",this,"onStartup"),dojo.subscribe(this.containerId+"-addChild",this,"onAddChild"),dojo.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),dojo.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),dojo.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(A){dojo.forEach(A.children,this.onAddChild,this);
this.onSelectChild(A.selected)
},destroy:function(){dojo.forEach(this._subscriptions,dojo.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(E,A){var C=document.createElement("span");
this.domNode.appendChild(C);
var B=dojo.getObject(this.buttonWidget);
var D=new B({label:E.title,closeButton:E.closable},C);
this.addChild(D,A);
this.pane2button[E]=D;
E.controlButton=D;
dojo.connect(D,"onClick",dojo.hitch(this,"onButtonClick",E));
dojo.connect(D,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",E));
if(!this._currentChild){D.focusNode.setAttribute("tabIndex","0");
this._currentChild=E
}},onRemoveChild:function(B){if(this._currentChild===B){this._currentChild=null
}var A=this.pane2button[B];
if(A){A.destroy()
}this.pane2button[B]=null
},onSelectChild:function(C){if(!C){return 
}if(this._currentChild){var A=this.pane2button[this._currentChild];
A.setChecked(false);
A.focusNode.setAttribute("tabIndex","-1")
}var B=this.pane2button[C];
B.setChecked(true);
this._currentChild=C;
B.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(B){var A=dijit.byId(this.containerId);
A.selectChild(B)
},onCloseButtonClick:function(C){var B=dijit.byId(this.containerId);
B.closeChild(C);
var A=this.pane2button[this._currentChild];
if(A){dijit.focus(A.focusNode||A.domNode)
}},adjacent:function(A){var B=this.getChildren();
var C=dojo.indexOf(B,this.pane2button[this._currentChild]);
var D=A?1:B.length-1;
return B[(C+D)%B.length]
},onkeypress:function(C){if(this.disabled||C.altKey){return 
}var B=true;
if(C.ctrlKey||!C._djpage){var A=dojo.keys;
switch(C.keyCode){case A.LEFT_ARROW:case A.UP_ARROW:case A.PAGE_UP:B=false;
case A.RIGHT_ARROW:case A.DOWN_ARROW:case A.PAGE_DOWN:this.adjacent(B).onClick();
dojo.stopEvent(C);
break;
case A.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(C);
break;
default:if(C.ctrlKey){if(C.keyCode==A.TAB){this.adjacent(!C.shiftKey).onClick();
dojo.stopEvent(C)
}else{if(C.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(C)
}}}}}},onContainerKeyPress:function(A){A.e._djpage=A.page;
this.onkeypress(A.e)
}});
dojo.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(A){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(A){dijit.focus(this.focusNode)
},onClickCloseButton:function(A){A.stopPropagation()
}});
dojo.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
};