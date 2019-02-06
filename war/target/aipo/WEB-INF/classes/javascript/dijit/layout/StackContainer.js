if(!dojo._hasResource["dijit.layout.StackContainer"]){dojo._hasResource["dijit.layout.StackContainer"]=true;
dojo.provide("dijit.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit.form.Button");
dojo.declare("dijit.layout.StackContainer",dijit.layout._LayoutWidget,{doLayout:true,_started:false,postCreate:function(){dijit.setWaiRole((this.containerNode||this.domNode),"tabpanel");
this.connect(this.domNode,"onkeypress",this._onKeyPress)
},startup:function(){if(this._started){return 
}var B=this.getChildren();
dojo.forEach(B,this._setupChild,this);
dojo.some(B,function(C){if(C.selected){this.selectedChildWidget=C
}return C.selected
},this);
var A=this.selectedChildWidget;
if(!A&&B[0]){A=this.selectedChildWidget=B[0];
A.selected=true
}if(A){this._showChild(A)
}dojo.publish(this.id+"-startup",[{children:B,selected:A}]);
this.inherited("startup",arguments);
this._started=true
},_setupChild:function(A){A.domNode.style.display="none";
A.domNode.style.position="relative";
return A
},addChild:function(A,B){dijit._Container.prototype.addChild.apply(this,arguments);
A=this._setupChild(A);
if(this._started){this.layout();
dojo.publish(this.id+"-addChild",[A,B]);
if(!this.selectedChildWidget){this.selectChild(A)
}}},removeChild:function(A){dijit._Container.prototype.removeChild.apply(this,arguments);
if(this._beingDestroyed){return 
}if(this._started){dojo.publish(this.id+"-removeChild",[A]);
this.layout()
}if(this.selectedChildWidget===A){this.selectedChildWidget=undefined;
if(this._started){var B=this.getChildren();
if(B.length){this.selectChild(B[0])
}}}},selectChild:function(A){A=dijit.byId(A);
if(this.selectedChildWidget!=A){this._transition(A,this.selectedChildWidget);
this.selectedChildWidget=A;
dojo.publish(this.id+"-selectChild",[A])
}},_transition:function(A,B){if(B){this._hideChild(B)
}this._showChild(A);
if(this.doLayout&&A.resize){A.resize(this._containerContentBox||this._contentBox)
}},_adjacent:function(A){var B=this.getChildren();
var C=dojo.indexOf(B,this.selectedChildWidget);
C+=A?1:B.length-1;
return B[C%B.length]
},forward:function(){this.selectChild(this._adjacent(true))
},back:function(){this.selectChild(this._adjacent(false))
},_onKeyPress:function(A){dojo.publish(this.id+"-containerKeyPress",[{e:A,page:this}])
},layout:function(){if(this.doLayout&&this.selectedChildWidget&&this.selectedChildWidget.resize){this.selectedChildWidget.resize(this._contentBox)
}},_showChild:function(A){var B=this.getChildren();
A.isFirstChild=(A==B[0]);
A.isLastChild=(A==B[B.length-1]);
A.selected=true;
A.domNode.style.display="";
if(A._loadCheck){A._loadCheck()
}if(A.onShow){A.onShow()
}},_hideChild:function(A){A.selected=false;
A.domNode.style.display="none";
if(A.onHide){A.onHide()
}},closeChild:function(A){var B=A.onClose(this,A);
if(B){this.removeChild(A);
A.destroy()
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
},onAddChild:function(D,E){var B=document.createElement("span");
this.domNode.appendChild(B);
var A=dojo.getObject(this.buttonWidget);
var C=new A({label:D.title,closeButton:D.closable},B);
this.addChild(C,E);
this.pane2button[D]=C;
D.controlButton=C;
dojo.connect(C,"onClick",dojo.hitch(this,"onButtonClick",D));
dojo.connect(C,"onClickCloseButton",dojo.hitch(this,"onCloseButtonClick",D));
if(!this._currentChild){C.focusNode.setAttribute("tabIndex","0");
this._currentChild=D
}},onRemoveChild:function(A){if(this._currentChild===A){this._currentChild=null
}var B=this.pane2button[A];
if(B){B.destroy()
}this.pane2button[A]=null
},onSelectChild:function(B){if(!B){return 
}if(this._currentChild){var C=this.pane2button[this._currentChild];
C.setChecked(false);
C.focusNode.setAttribute("tabIndex","-1")
}var A=this.pane2button[B];
A.setChecked(true);
this._currentChild=B;
A.focusNode.setAttribute("tabIndex","0")
},onButtonClick:function(A){var B=dijit.byId(this.containerId);
B.selectChild(A)
},onCloseButtonClick:function(B){var A=dijit.byId(this.containerId);
A.closeChild(B);
var C=this.pane2button[this._currentChild];
if(C){dijit.focus(C.focusNode||C.domNode)
}},adjacent:function(D){var A=this.getChildren();
var B=dojo.indexOf(A,this.pane2button[this._currentChild]);
var C=D?1:A.length-1;
return A[(B+C)%A.length]
},onkeypress:function(B){if(this.disabled||B.altKey){return 
}var A=true;
if(B.ctrlKey||!B._djpage){var C=dojo.keys;
switch(B.keyCode){case C.LEFT_ARROW:case C.UP_ARROW:case C.PAGE_UP:A=false;
case C.RIGHT_ARROW:case C.DOWN_ARROW:case C.PAGE_DOWN:this.adjacent(A).onClick();
dojo.stopEvent(B);
break;
case C.DELETE:if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(B);
break;
default:if(B.ctrlKey){if(B.keyCode==C.TAB){this.adjacent(!B.shiftKey).onClick();
dojo.stopEvent(B)
}else{if(B.keyChar=="w"){if(this._currentChild.closable){this.onCloseButtonClick(this._currentChild)
}dojo.stopEvent(B)
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