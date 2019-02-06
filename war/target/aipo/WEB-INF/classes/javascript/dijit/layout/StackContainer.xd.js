dojo._xdResourceLoaded({depends:[["provide","dijit.layout.StackContainer"],["require","dijit._Templated"],["require","dijit.layout._LayoutWidget"],["require","dijit.form.Button"]],defineResource:function(A){if(!A._hasResource["dijit.layout.StackContainer"]){A._hasResource["dijit.layout.StackContainer"]=true;
A.provide("dijit.layout.StackContainer");
A.require("dijit._Templated");
A.require("dijit.layout._LayoutWidget");
A.require("dijit.form.Button");
A.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var C=this.getChildren();
A.forEach(C,this._setupChild,this);
A.some(C,function(D){if(D.selected){this.selectedChildWidget=D
}return D.selected
},this);
var B=this.selectedChildWidget;
if(!B&&C[0]){B=this.selectedChildWidget=C[0];
B.selected=true
}if(B){this._showChild(B)
}A.publish(this.id+"-startup",[{children:C,selected:B}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(B){B.domNode.style.display="none";
B.domNode.style.position="relative";
return B
},addChild:function(B,C){dijit._Container.prototype.addChild.apply(this,arguments);
B=this._setupChild(B);
if(this._started){this.layout();
A.publish(this.id+"-addChild",[B,C]);
if(!this.selectedChildWidget){this.selectChild(B)
}}},removeChild:function(B){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){A.publish(this.id+"-removeChild",[B]);
this.layout()
}if(this.selectedChildWidget===B){this.selectedChildWidget=undefined;
if(this._started){var C=this.getChildren();
if(C.length){this.selectChild(C[0])
}}}},selectChild:function(B){B=dijit.byId(B);
if(this.selectedChildWidget!=B){this._transition(B,this.selectedChildWidget);
this.selectedChildWidget=B;
A.publish(this.id+"-selectChild",[B])
}},_transition:function(B,C){if(C){this._hideChild(C)
}this._showChild(B);
if(this.doLayout&&B.resize){B.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(D){var B=this.getChildren();
var C=A.indexOf(B,this.selectedChildWidget);
C+=D?1:B.length-1;
return B[C%B.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(B){A.publish(this.id+"-containerKeyPress",[{e:B,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(B){var C=this.getChildren();
B.isFirstChild=(B==C[0]);
B.isLastChild=(B==C[C.length-1]);
B.selected=true;
B.domNode.style.display="";
if(B._loadCheck){B._loadCheck()
}if(B.onShow){B.onShow()
}},_hideChild:function(B){B.selected=false;
B.domNode.style.display="none";
if(B.onHide){B.onHide()
}},closeChild:function(B){var C=B.onClose(this,B);
if(C){this.removeChild(B);
B.destroy()
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
},onAddChild:function(B,C){var E=document.createElement("span");
this.domNode.appendChild(E);
var D=A.getObject(this.buttonWidget);
var F=new D({label:B.title,closeButton:B.closable},E);
this.addChild(F,C);
this.pane2button[B]=F;
B.controlButton=F;
A.connect(F,"onClick",A.hitch(this,"onButtonClick",B));
A.connect(F,"onClickCloseButton",A.hitch(this,"onCloseButtonClick",B));
if(!this._currentChild){F.focusNode.setAttribute("tabIndex","0");
this._currentChild=B
}},onRemoveChild:function(B){if(this._currentChild===B){this._currentChild=null
}var C=this.pane2button[B];
if(C){C.destroy()
}this.pane2button[B]=null
},onSelectChild:function(B){if(!B){return 
}if(this._currentChild){var C=this.pane2button[this._currentChild];
C.setChecked(false);
C.focusNode.setAttribute("tabIndex","-1")
}var D=this.pane2button[B];
D.setChecked(true);
this._currentChild=B;
D.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(B){var C=dijit.byId(this.containerId);
C.selectChild(B)
},onCloseButtonClick:function(B){var D=dijit.byId(this.containerId);
D.closeChild(B);
var C=this.pane2button[this._currentChild];
if(C){dijit.focus(C.focusNode||C.domNode)
}},adjacent:function(C){var D=this.getChildren();
var E=A.indexOf(D,this.pane2button[this._currentChild]);
var B=C?1:D.length-1;
return D[(E+B)%D.length]
},onkeypress:function(B){if(this.disabled||B.altKey){return 
}var D=true;
if(B.ctrlKey||!B._djpage){var C=A.keys;
switch(B.keyCode){case C.LEFT_ARROW:case C.UP_ARROW:case C.PAGE_UP:D=false;
case C.RIGHT_ARROW:case C.DOWN_ARROW:case C.PAGE_DOWN:this.adjacent(D).onClick();
A.stopEvent(B);
break;
case C.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}A.stopEvent(B);
break;
default:if(B.ctrlKey){if(B.keyCode==C.TAB){this.adjacent(!B.shiftKey).onClick();
A.stopEvent(B)
}else{if(B.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}A.stopEvent(B)
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