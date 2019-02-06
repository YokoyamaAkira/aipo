if(!dojo._hasResource["dojox.layout.FloatingPane"]){dojo._hasResource["dojox.layout.FloatingPane"]=true;
dojo.provide("dojox.layout.FloatingPane");
dojo.experimental("dojox.layout.FloatingPane");
dojo.require("dojox.layout.ContentPane");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dojo.dnd.move");
dojo.require("dojox.layout.ResizeHandle");
dojo.declare("dojox.layout.FloatingPane",[dojox.layout.ContentPane,dijit._Templated],{closable:true,dockable:true,resizable:false,maxable:false,resizeAxis:"xy",title:"",dockTo:null,duration:400,_showAnim:null,_hideAnim:null,_dockNode:null,iconSrc:null,contentClass:"dojoxFloatingPaneContent",templateString:null,templateString:'<div class="dojoxFloatingPane" id="${id}">\r\n\t<div tabindex="0" waiRole="button" class="dojoxFloatingPaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<span dojoAttachPoint="closeNode" dojoAttachEvent="onclick: close" class="dojoxFloatingCloseIcon"></span>\r\n\t\t<span dojoAttachPoint="maxNode" dojoAttachEvent="onclick: maximize" class="dojoxFloatingMaximizeIcon"></span>\r\n\t\t<span dojoAttachPoint="restoreNode" dojoAttachEvent="onclick: _restore" class="dojoxFloatingRestoreIcon"></span>\t\r\n\t\t<span dojoAttachPoint="dockNode" dojoAttachEvent="onclick: minimize" class="dojoxFloatingMinimizeIcon"></span>\r\n\t\t<span dojoAttachPoint="titleNode" class="dijitInline dijitTitleNode"></span>\r\n\t</div>\r\n\t<div dojoAttachPoint="canvas" class="dojoxFloatingPaneCanvas">\r\n\t\t<div dojoAttachPoint="containerNode" waiRole="region" tabindex="-1" class="${contentClass}">\r\n\t\t</div>\r\n\t\t<span dojoAttachPoint="resizeHandle" class="dojoxFloatingResizeHandle"></span>\r\n\t</div>\r\n</div>\r\n',_restoreState:{},_allFPs:[],postCreate:function(){this.setTitle(this.title);
this.inherited("postCreate",arguments);
var A=new dojo.dnd.Moveable(this.domNode,{handle:this.focusNode});
if(!this.dockable){this.dockNode.style.display="none"
}if(!this.closable){this.closeNode.style.display="none"
}if(!this.maxable){this.maxNode.style.display="none";
this.restoreNode.style.display="none"
}if(!this.resizable){this.resizeHandle.style.display="none"
}else{var B=dojo.marginBox(this.domNode);
this.domNode.style.width=B.w+"px"
}this._allFPs.push(this)
},startup:function(){this.inherited("startup",arguments);
if(this.resizable){if(dojo.isIE){this.canvas.style.overflow="auto"
}else{this.containerNode.style.overflow="auto"
}var A=new dojox.layout.ResizeHandle({targetId:this.id,resizeAxis:this.resizeAxis},this.resizeHandle)
}if(this.dockable){tmpName=this.dockTo;
if(this.dockTo){this.dockTo=dijit.byId(this.dockTo)
}else{this.dockTo=dijit.byId("dojoxGlobalFloatingDock")
}if(!this.dockTo){if(tmpName){var C=tmpName;
var B=dojo.byId(tmpName)
}else{var B=document.createElement("div");
dojo.body().appendChild(B);
dojo.addClass(B,"dojoxFloatingDockDefault");
var C="dojoxGlobalFloatingDock"
}this.dockTo=new dojox.layout.Dock({id:C,autoPosition:"south"},B);
this.dockTo.startup()
}if((this.domNode.style.display=="none")||(this.domNode.style.visibility=="hidden")){this.minimize()
}}this.connect(this.focusNode,"onmousedown","bringToTop");
this.connect(this.domNode,"onmousedown","bringToTop")
},setTitle:function(A){this.titleNode.innerHTML=A
},close:function(){if(!this.closable){return 
}dojo.unsubscribe(this._listener);
this.hide(dojo.hitch(this,"destroy"))
},hide:function(A){dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,function(){this.domNode.style.display="none";
this.domNode.style.visibility="hidden";
if(this.dockTo){this.dockTo._positionDock(null)
}if(A){A()
}})}).play()
},show:function(B){var A=dojo.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:dojo.hitch(this,function(){this.domNode.style.display="";
this.domNode.style.visibility="visible";
this.dockTo._positionDock(null);
if(this.dockTo){this.dockTo._positionDock(null)
}if(typeof B=="function"){B()
}this._isDocked=false;
if(this._dockNode){this._dockNode.destroy();
this._dockNode=null
}})}).play();
this.resize(dojo.coords(this.domNode))
},minimize:function(){if(!this._isDocked){this.hide(dojo.hitch(this,"_dock"))
}},maximize:function(){if(this._maximized){return 
}this._naturalState=dojo.coords(this.domNode);
if(this._isDocked){this.show();
setTimeout(dojo.hitch(this,"maximize"),this.duration)
}dojo.addClass(this.focusNode,"floatingPaneMaximized");
this.resize(dijit.getViewport());
this._maximized=true
},_restore:function(){if(this._maximized){this.resize(this._naturalState);
dojo.removeClass(this.focusNode,"floatingPaneMaximized");
this._maximized=false
}},_dock:function(){if(!this._isDocked){this._dockNode=this.dockTo.addNode(this);
this._isDocked=true
}},resize:function(B){this._currentState=B;
var A=this.domNode.style;
A.top=B.t+"px";
A.left=B.l+"px";
A.width=B.w+"px";
this.canvas.style.width=B.w+"px";
A.height=B.h+"px";
this.canvas.style.height=(B.h-this.focusNode.offsetHeight)+"px"
},_startZ:100,bringToTop:function(){var A=dojo.filter(this._allFPs,function(B){return B!==this
},this);
A.sort(function(C,B){return C.domNode.style.zIndex-B.domNode.style.zIndex
});
A.push(this);
dojo.forEach(A,function(C,B){C.domNode.style.zIndex=(this._startZ+B*2);
dojo.removeClass(C.domNode,"dojoxFloatingPaneFg")
},this);
dojo.addClass(this.domNode,"dojoxFloatingPaneFg")
},destroy:function(){this._allFPs.splice(dojo.indexOf(this._allFPs,this),1);
this.inherited("destroy",arguments)
}});
dojo.declare("dojox.layout.Dock",[dijit._Widget,dijit._Templated],{templateString:'<div class="dojoxDock"><ul dojoAttachPoint="containerNode" class="dojoxDockList"></ul></div>',_docked:[],_inPositioning:false,autoPosition:false,addNode:function(A){var C=document.createElement("li");
this.containerNode.appendChild(C);
var B=new dojox.layout._DockNode({title:A.title,paneRef:A},C);
B.startup();
return B
},startup:function(){if(this.id=="dojoxGlobalFloatingDock"||this.isFixedDock){dojo.connect(window,"onresize",this,"_positionDock");
dojo.connect(window,"onscroll",this,"_positionDock");
if(dojo.isIE){dojo.connect(this.domNode,"onresize",this,"_positionDock")
}}this._positionDock(null);
this.inherited("startup",arguments)
},_positionDock:function(A){if(!this._inPositioning){if(this.autoPosition=="south"){setTimeout(dojo.hitch(this,function(){this._inPositiononing=true;
var B=dijit.getViewport();
var C=this.domNode.style;
C.left=B.l+"px";
C.width=(B.w-2)+"px";
C.top=(B.h+B.t)-this.domNode.offsetHeight+"px";
this._inPositioning=false
}),500)
}}}});
dojo.declare("dojox.layout._DockNode",[dijit._Widget,dijit._Templated],{title:"",paneRef:null,templateString:'<li dojoAttachEvent="onclick: restore" class="dojoxDockNode"><span dojoAttachPoint="restoreNode" class="dojoxDockRestoreButton" dojoAttachEvent="onclick: restore"></span><span class="dojoxDockTitleNode" dojoAttachPoint="titleNode">${title}</span></li>',restore:function(){this.paneRef.show();
this.paneRef.bringToTop();
this.destroy()
}})
};