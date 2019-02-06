if(!dojo._hasResource["dijit.Menu"]){dojo._hasResource["dijit.Menu"]=true;
dojo.provide("dijit.Menu");
dojo.require("dijit._Widget");
dojo.require("dijit._Container");
dojo.require("dijit._Templated");
dojo.declare("dijit.Menu",[dijit._Widget,dijit._Templated,dijit._KeyNavContainer],{constructor:function(){this._bindings=[]
},templateString:'<table class="dijit dijitMenu dijitReset dijitMenuTable" waiRole="menu" dojoAttachEvent="onkeypress:_onKeyPress"><tbody class="dijitReset" dojoAttachPoint="containerNode"></tbody></table>',targetNodeIds:[],contextMenuForWindow:false,parentMenu:null,popupDelay:500,_contextMenuWithMouse:false,postCreate:function(){if(this.contextMenuForWindow){this.bindDomNode(dojo.body())
}else{dojo.forEach(this.targetNodeIds,this.bindDomNode,this)
}this.connectKeyNavHandlers([dojo.keys.UP_ARROW],[dojo.keys.DOWN_ARROW])
},startup:function(){dojo.forEach(this.getChildren(),function(A){A.startup()
});
this.startupKeyNavChildren()
},onExecute:function(){},onCancel:function(A){},_moveToPopup:function(A){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){this.focusedChild._onClick(A)
}},_onKeyPress:function(A){if(A.ctrlKey||A.altKey){return 
}switch(A.keyCode){case dojo.keys.RIGHT_ARROW:this._moveToPopup(A);
dojo.stopEvent(A);
break;
case dojo.keys.LEFT_ARROW:if(this.parentMenu){this.onCancel(false)
}else{dojo.stopEvent(A)
}break
}},onItemHover:function(A){this.focusChild(A);
if(this.focusedChild.popup&&!this.focusedChild.disabled&&!this.hover_timer){this.hover_timer=setTimeout(dojo.hitch(this,"_openPopup"),this.popupDelay)
}},_onChildBlur:function(A){dijit.popup.close(A.popup);
A._blur();
this._stopPopupTimer()
},onItemUnhover:function(A){},_stopPopupTimer:function(){if(this.hover_timer){clearTimeout(this.hover_timer);
this.hover_timer=null
}},_getTopMenu:function(){for(var A=this;
A.parentMenu;
A=A.parentMenu){}return A
},onItemClick:function(A){if(A.disabled){return false
}if(A.popup){if(!this.is_open){this._openPopup()
}}else{this.onExecute();
A.onClick()
}},_iframeContentWindow:function(B){var A=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(B))||dijit.Menu._iframeContentDocument(B)["__parent__"]||(B.name&&document.frames[B.name])||null;
return A
},_iframeContentDocument:function(B){var A=B.contentDocument||(B.contentWindow&&B.contentWindow.document)||(B.name&&document.frames[B.name]&&document.frames[B.name].document)||null;
return A
},bindDomNode:function(C){C=dojo.byId(C);
var A=dijit.getDocumentWindow(C.ownerDocument);
if(C.tagName.toLowerCase()=="iframe"){A=this._iframeContentWindow(C);
C=dojo.withGlobal(A,dojo.body)
}var B=(C==dojo.body()?dojo.doc:C);
C[this.id]=this._bindings.push([dojo.connect(B,"oncontextmenu",this,"_openMyself"),dojo.connect(B,"onkeydown",this,"_contextKey"),dojo.connect(B,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(C){var B=dojo.byId(C);
var A=B[this.id]-1,D=this._bindings[A];
dojo.forEach(D,dojo.disconnect);
delete this._bindings[A]
},_contextKey:function(A){this._contextMenuWithMouse=false;
if(A.keyCode==dojo.keys.F10){dojo.stopEvent(A);
if(A.shiftKey&&A.type=="keydown"){var B={target:A.target,pageX:A.pageX,pageY:A.pageY};
B.preventDefault=B.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(B)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(C){dojo.stopEvent(C);
var E,D;
if(dojo.isSafari||this._contextMenuWithMouse){E=C.pageX;
D=C.pageY
}else{var B=dojo.coords(C.target,true);
E=B.x+10;
D=B.y+10
}var G=this;
var F=dijit.getFocus(this);
function A(){dijit.focus(F);
dijit.popup.close(G)
}dijit.popup.open({popup:this,x:E,y:D,onExecute:A,onCancel:A,orient:this.isLeftToRight()?"L":"R"});
this.focus();
this._onBlur=function(){dijit.popup.close(this)
}
},onOpen:function(A){this.isShowingNow=true
},onClose:function(){this._stopPopupTimer();
this.parentMenu=null;
this.isShowingNow=false;
this.currentPopup=null;
if(this.focusedChild){this._onChildBlur(this.focusedChild);
this.focusedChild=null
}},_openPopup:function(){this._stopPopupTimer();
var C=this.focusedChild;
var A=C.popup;
if(A.isShowingNow){return 
}A.parentMenu=this;
var B=this;
dijit.popup.open({parent:this,popup:A,around:C.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(A);
C.focus();
B.currentPopup=null
}});
this.currentPopup=A;
if(A.focus){A.focus()
}}});
dojo.declare("dijit.MenuItem",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitReset dijitMenuItem"dojoAttachEvent="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick"><td class="dijitReset"><div class="dijitMenuItemIcon ${iconClass}" dojoAttachPoint="iconNode" ></div></td><td tabIndex="-1" class="dijitReset dijitMenuItemLabel" dojoAttachPoint="containerNode" waiRole="menuitem"></td><td class="dijitReset" dojoAttachPoint="arrowCell"><div class="dijitMenuExpand" dojoAttachPoint="expand" style="display:none"><span class="dijitInline dijitArrowNode dijitMenuExpandInner">+</span></div></td></tr>',label:"",iconClass:"",disabled:false,postCreate:function(){dojo.setSelectable(this.domNode,false);
this.setDisabled(this.disabled);
if(this.label){this.containerNode.innerHTML=this.label
}},_onHover:function(){this.getParent().onItemHover(this)
},_onUnhover:function(){this.getParent().onItemUnhover(this)
},_onClick:function(A){this.getParent().onItemClick(this);
dojo.stopEvent(A)
},onClick:function(){},focus:function(){dojo.addClass(this.domNode,"dijitMenuItemHover");
try{dijit.focus(this.containerNode)
}catch(A){}},_blur:function(){dojo.removeClass(this.domNode,"dijitMenuItemHover")
},setDisabled:function(A){this.disabled=A;
dojo[A?"addClass":"removeClass"](this.domNode,"dijitMenuItemDisabled");
dijit.setWaiState(this.containerNode,"disabled",A?"true":"false")
}});
dojo.declare("dijit.PopupMenuItem",dijit.MenuItem,{_fillContent:function(){if(this.srcNodeRef){var A=dojo.query("*",this.srcNodeRef);
dijit.PopupMenuItem.superclass._fillContent.call(this,A[0]);
this.dropDownContainer=this.srcNodeRef
}},startup:function(){if(!this.popup){var A=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.popup=dijit.byNode(A)
}dojo.body().appendChild(this.popup.domNode);
this.popup.domNode.style.display="none";
dojo.addClass(this.expand,"dijitMenuExpandEnabled");
dojo.style(this.expand,"display","");
dijit.setWaiState(this.containerNode,"haspopup","true")
}});
dojo.declare("dijit.MenuSeparator",[dijit._Widget,dijit._Templated,dijit._Contained],{templateString:'<tr class="dijitMenuSeparator"><td colspan=3><div class="dijitMenuSeparatorTop"></div><div class="dijitMenuSeparatorBottom"></div></td></tr>',postCreate:function(){dojo.setSelectable(this.domNode,false)
},isFocusable:function(){return false
}})
};