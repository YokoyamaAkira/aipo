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
}},_iframeContentWindow:function(A){var B=dijit.getDocumentWindow(dijit.Menu._iframeContentDocument(A))||dijit.Menu._iframeContentDocument(A)["__parent__"]||(A.name&&document.frames[A.name])||null;
return B
},_iframeContentDocument:function(A){var B=A.contentDocument||(A.contentWindow&&A.contentWindow.document)||(A.name&&document.frames[A.name]&&document.frames[A.name].document)||null;
return B
},bindDomNode:function(A){A=dojo.byId(A);
var B=dijit.getDocumentWindow(A.ownerDocument);
if(A.tagName.toLowerCase()=="iframe"){B=this._iframeContentWindow(A);
A=dojo.withGlobal(B,dojo.body)
}var C=(A==dojo.body()?dojo.doc:A);
A[this.id]=this._bindings.push([dojo.connect(C,"oncontextmenu",this,"_openMyself"),dojo.connect(C,"onkeydown",this,"_contextKey"),dojo.connect(C,"onmousedown",this,"_contextMouse")])
},unBindDomNode:function(D){var C=dojo.byId(D);
var B=C[this.id]-1,A=this._bindings[B];
dojo.forEach(A,dojo.disconnect);
delete this._bindings[B]
},_contextKey:function(B){this._contextMenuWithMouse=false;
if(B.keyCode==dojo.keys.F10){dojo.stopEvent(B);
if(B.shiftKey&&B.type=="keydown"){var A={target:B.target,pageX:B.pageX,pageY:B.pageY};
A.preventDefault=A.stopPropagation=function(){};
window.setTimeout(dojo.hitch(this,function(){this._openMyself(A)
}),1)
}}},_contextMouse:function(A){this._contextMenuWithMouse=true
},_openMyself:function(F){dojo.stopEvent(F);
var A,G;
if(dojo.isSafari||this._contextMenuWithMouse){A=F.pageX;
G=F.pageY
}else{var E=dojo.coords(F.target,true);
A=E.x+10;
G=E.y+10
}var C=this;
var B=dijit.getFocus(this);
function D(){dijit.focus(B);
dijit.popup.close(C)
}dijit.popup.open({popup:this,x:A,y:G,onExecute:D,onCancel:D,orient:this.isLeftToRight()?"L":"R"});
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
var A=this.focusedChild;
var B=A.popup;
if(B.isShowingNow){return 
}B.parentMenu=this;
var C=this;
dijit.popup.open({parent:this,popup:B,around:A.arrowCell,orient:this.isLeftToRight()?{TR:"TL",TL:"TR"}:{TL:"TR",TR:"TL"},onCancel:function(){dijit.popup.close(B);
A.focus();
C.currentPopup=null
}});
this.currentPopup=B;
if(B.focus){B.focus()
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