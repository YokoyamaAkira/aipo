dojo._xdResourceLoaded({depends:[["provide","dijit.layout.StackContainer"],["require","dijit._Templated"],["require","dijit.layout._LayoutWidget"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["dijit.layout.StackContainer"]){A._hasResource["dijit.layout.StackContainer"]=true;
A.provide("dijit.layout.StackContainer");
A.require("dijit._Templated");
A.require("dijit.layout._LayoutWidget");
A.require("dijit.form.Button");
A.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var B=this.getChildren();
A.forEach(B,this._setupChild,this);
A.some(B,function(D){if(D.selected){this.selectedChildWidget=D
}return D.selected
},this);
var C=this.selectedChildWidget;
if(!C&&B[0]){C=this.selectedChildWidget=B[0];
C.selected=true
}if(C){this._showChild(C)
}A.publish(this.id+"-startup",[{children:B,selected:C}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(B){B.domNode.style.display="none";
B.domNode.style.position="relative";
return B
},addChild:function(C,B){dijit._Container.prototype.addChild.apply(this,arguments);
C=this._setupChild(C);
if(this._started){this.layout();
A.publish(this.id+"-addChild",[C,B]);
if(!this.selectedChildWidget){this.selectChild(C)
}}},removeChild:function(C){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){A.publish(this.id+"-removeChild",[C]);
this.layout()
}if(this.selectedChildWidget===C){this.selectedChildWidget=undefined;
if(this._started){var B=this.getChildren();
if(B.length){this.selectChild(B[0])
}}}},selectChild:function(B){B=dijit.byId(B);
if(this.selectedChildWidget!=B){this._transition(B,this.selectedChildWidget);
this.selectedChildWidget=B;
A.publish(this.id+"-selectChild",[B])
}},_transition:function(C,B){if(B){this._hideChild(B)
}this._showChild(C);
if(this.doLayout&&C.resize){C.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(C){var D=this.getChildren();
var B=A.indexOf(D,this.selectedChildWidget);
B+=C?1:D.length-1;
return D[B%D.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(B){A.publish(this.id+"-containerKeyPress",[{e:B,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(C){var B=this.getChildren();
C.isFirstChild=(C==B[0]);
C.isLastChild=(C==B[B.length-1]);
C.selected=true;
C.domNode.style.display="";
if(C._loadCheck){C._loadCheck()
}if(C.onShow){C.onShow()
}},_hideChild:function(B){B.selected=false;
B.domNode.style.display="none";
if(B.onHide){B.onHide()
}},closeChild:function(C){var B=C.onClose(this,C);
if(B){this.removeChild(C);
C.destroy()
}},destroy:function(){this._beingDestroyed=true;
this.inherited("destroy",arguments)
}});
A.declare("dijit.layout.StackController",[dijit._Widget,dijit._Templated,dijit._Container],{templateString:"<span wairole='tablist' dojoAttachEvent='onkeypress' class='dijitStackController'></span>",containerId:"",buttonWidget:"dijit.layout._StackButton",postCreate:function(){dijit.setWaiRole(this.domNode,"tablist");
this.pane2button={};
this._subscriptions=[A.subscribe(this.containerId+"-startup",this,"onStartup"),A.subscribe(this.containerId+"-addChild",this,"onAddChild"),A.subscribe(this.containerId+"-removeChild",this,"onRemoveChild"),A.subscribe(this.containerId+"-selectChild",this,"onSelectChild"),A.subscribe(this.containerId+"-containerKeyPress",this,"onContainerKeyPress")]
},onStartup:function(B){A.forEach(B.children,this.onAddChild,this);
this.onSelectChild(B.selected)
},destroy:function(){A.forEach(this._subscriptions,A.unsubscribe);
this.inherited("destroy",arguments)
},onAddChild:function(F,B){var D=document.createElement("span");
this.domNode.appendChild(D);
var C=A.getObject(this.buttonWidget);
var E=new C({label:F.title,closeButton:F.closable},D);
this.addChild(E,B);
this.pane2button[F]=E;
F.controlButton=E;
A.connect(E,"onClick",A.hitch(this,"onButtonClick",F));
A.connect(E,"onClickCloseButton",A.hitch(this,"onCloseButtonClick",F));
if(!this._currentChild){E.focusNode.setAttribute("tabIndex","0");
this._currentChild=F
}},onRemoveChild:function(C){if(this._currentChild===C){this._currentChild=null
}var B=this.pane2button[C];
if(B){B.destroy()
}this.pane2button[C]=null
},onSelectChild:function(D){if(!D){return 
}if(this._currentChild){var B=this.pane2button[this._currentChild];
B.setChecked(false);
B.focusNode.setAttribute("tabIndex","-1")
}var C=this.pane2button[D];
C.setChecked(true);
this._currentChild=D;
C.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(C){var B=dijit.byId(this.containerId);
B.selectChild(C)
},onCloseButtonClick:function(D){var C=dijit.byId(this.containerId);
C.closeChild(D);
var B=this.pane2button[this._currentChild];
if(B){dijit.focus(B.focusNode||B.domNode)
}},adjacent:function(B){var C=this.getChildren();
var D=A.indexOf(C,this.pane2button[this._currentChild]);
var E=B?1:C.length-1;
return C[(D+E)%C.length]
},onkeypress:function(D){if(this.disabled||D.altKey){return 
}var C=true;
if(D.ctrlKey||!D._djpage){var B=A.keys;
switch(D.keyCode){case B.LEFT_ARROW:case B.UP_ARROW:case B.PAGE_UP:C=false;
case B.RIGHT_ARROW:case B.DOWN_ARROW:case B.PAGE_DOWN:this.adjacent(C).onClick();
A.stopEvent(D);
break;
case B.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}A.stopEvent(D);
break;
default:if(D.ctrlKey){if(D.keyCode==B.TAB){this.adjacent(!D.shiftKey).onClick();
A.stopEvent(D)
}else{if(D.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}A.stopEvent(D)
}}}}}},onContainerKeyPress:function(B){B.e._djpage=B.page;
this.onkeypress(B.e)
}});
A.declare("dijit.layout._StackButton",dijit.form.ToggleButton,{tabIndex:"-1",postCreate:function(B){dijit.setWaiRole((this.focusNode||this.domNode),"tab");
this.inherited("postCreate",arguments)
},onClick:function(B){dijit.focus(this.focusNode)
},onClickCloseButton:function(B){B.stopPropagation()
}});
A.extend(dijit._Widget,{title:"",selected:false,closable:false,onClose:function(){return true
}})
}}});