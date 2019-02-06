dojo._xdResourceLoaded({depends:[["provide","dijit.Menu"],["require","dijit._Widget"],["require","dijit._Container"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.Menu"]){A._hasResource["dijit.Menu"]=true;
A.provide("dijit.Menu");
A.require("dijit._Widget");
A.require("dijit._Container");
A.require("dijit._Templated");
A.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(A.body())
}else{A.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([A.keys.UP_ARROW],[A.keys.DOWN_ARROW])
},startup:function(){A.forEach(this.getChildren(),function(B){B.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(B){},_moveToPopup:function(B){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(B)
}},_onKeyPress:function(B){if(B.ctrlKey||B.altKey){return 
}switch(B.keyCode){case A.keys.RIGHT_ARROW:this._moveToPopup(B);
A.stopEvent(B);
break;
case A.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{A.stopEvent(B)
}break
}},onItemHover:function(B){this.focusChild(B);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(A.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(B){dijit.popup.close(B.popup);
B._blur();
this._stopPopupTimer()
},onItemUnhover:function(B){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var B=this;
B.parentMenu;
B=B.parentMenu){}return B
},onItemClick:function(B){if(B.disabled){return false
}if(B.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
B.onClick()
}},_iframeContentWindow:function(C){var B=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(C))||dijit.Menu._iframeContentDocument(C)["__parent__"]||(C.name&&document.frames[C.name])||null;
return B
},_iframeContentDocument:function(C){var B=C.contentDocument||(C.contentWindow&&C.contentWindow.document)||(C.name&&document.frames[C.name]&&document.frames[C.name].document)||null;
return B
},bindDomNode:function(C){C=A.byId(C);
var D=dijit.getDocumentWindow(C.ownerDocument);
if(C.tagName.toLowerCase()=="iframe"){D=this._iframeContentWindow(C);
C=A.withGlobal(D,A.body)
}var B=(C==A.body()?A.doc:C);
C[this.id]=this._bindings.push([A.connect(B,"oncontextmenu",this,"_openMyself"),A.connect(B,"onkeydown",this,"_contextKey"),A.connect(B,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(B){var E=A.byId(B);
var D=E[this.id]-1,C=this._bindings[D];
A.forEach(C,A.disconnect);
delete this._bindings[D]
},_contextKey:function(B){this._contextMenuWithMouse=false;
if(B.keyCode==A.keys.F10){A.stopEvent(B);
if(B.shiftKey&&B.type=="keydown"){var C={target:B.target,pageX:B.pageX,pageY:B.pageY};
C.preventDefault=C.stopPropagation=function(){};
window.setTimeout(A.hitch(this,function(){this._openMyself(C)
}),1)
}}},_contextMouse:function(B){this._contextMenuWithMouse=true
},_openMyself:function(F){A.stopEvent(F);
var G,C;
if(A.isSafari||this._contextMenuWithMouse){G=F.pageX;
C=F.pageY
}else{var E=A.coords(F.target,true);
G=E.x+10;
C=E.y+10
}var B=this;
var H=dijit.getFocus(this);
function D(){dijit.focus(H);
dijit.popup.close(B)
}dijit.popup.open({popup:this,x:G,y:C,onExecute:D,onCancel:D,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(B){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var C=this.focusedChild;
var D=C.popup;
if(D.isShowingNow){return 
}D.parentMenu=this;
var B=this;
dijit.popup.open({parent:this,popup:D,around:C.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(D);
C.focus();
B.currentPopup=null
}});
this.currentPopup=D;
if(D.focus){D.focus()
}}});
A.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){A.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(B){this.getParent().onItemClick(this);
A.stopEvent(B)
},onClick:function(){},focus:function(){A.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(B){}},_blur:function(){A.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(B){this.disabled=B;
A[B?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",B?"true":"false")
}});
A.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var B=A.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,B[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var B=A.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(B)
}A.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
A.addClass(this.expand,"dijitMenuExpandEnabled");
A.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
A.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){A.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
}}});