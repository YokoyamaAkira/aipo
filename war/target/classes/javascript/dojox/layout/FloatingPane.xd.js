dojo._xdResourceLoaded({depends:[["provide","dojox.layout.FloatingPane"],["require","dojox.layout.ContentPane"],["require","dijit._Templated"],["require","dijit._Widget"],["require","dojo.dnd.move"],["require","dojox.layout.ResizeHandle"]],defineResource:function(A){if(!A._hasResource["dojox.layout.FloatingPane"]){A._hasResource["dojox.layout.FloatingPane"]=true;
A.provide("dojox.layout.FloatingPane");
A.experimental("dojox.layout.FloatingPane");
A.require("dojox.layout.ContentPane");
A.require("dijit._Templated");
A.require("dijit._Widget");
A.require("dojo.dnd.move");
A.require("dojox.layout.ResizeHandle");
A.declare("dojox.layout.FloatingPane",[dojox.layout.ContentPane,dijit._Templated],{closable:true,dockable:true,resizable:false,maxable:false,resizeAxis:"xy",title:"",dockTo:null,duration:400,_showAnim:null,_hideAnim:null,_dockNode:null,iconSrc:null,contentClass:"dojoxFloatingPaneContent",templateString:null,templateString:'<div class="dojoxFloatingPane" id="${id}">\r\n\t<div tabindex="0" waiRole="button" class="dojoxFloatingPaneTitle" dojoAttachPoint="focusNode">\r\n\t\t<span dojoAttachPoint="closeNode" dojoAttachEvent="onclick: close" class="dojoxFloatingCloseIcon"></span>\r\n\t\t<span dojoAttachPoint="maxNode" dojoAttachEvent="onclick: maximize" class="dojoxFloatingMaximizeIcon"></span>\r\n\t\t<span dojoAttachPoint="restoreNode" dojoAttachEvent="onclick: _restore" class="dojoxFloatingRestoreIcon"></span>\t\r\n\t\t<span dojoAttachPoint="dockNode" dojoAttachEvent="onclick: minimize" class="dojoxFloatingMinimizeIcon"></span>\r\n\t\t<span dojoAttachPoint="titleNode" class="dijitInline dijitTitleNode"></span>\r\n\t</div>\r\n\t<div dojoAttachPoint="canvas" class="dojoxFloatingPaneCanvas">\r\n\t\t<div dojoAttachPoint="containerNode" waiRole="region" tabindex="-1" class="${contentClass}">\r\n\t\t</div>\r\n\t\t<span dojoAttachPoint="resizeHandle" class="dojoxFloatingResizeHandle"></span>\r\n\t</div>\r\n</div>\r\n',_restoreState:{},_allFPs:[],postCreate:function(){this.setTitle(this.title);
this.inherited("postCreate",arguments);
var B=new A.dnd.Moveable(this.domNode,{handle:this.focusNode});
if(!this.dockable){this.dockNode.style.display="none"
}if(!this.closable){this.closeNode.style.display="none"
}if(!this.maxable){this.maxNode.style.display="none";
this.restoreNode.style.display="none"
}if(!this.resizable){this.resizeHandle.style.display="none"
}else{var C=A.marginBox(this.domNode);
this.domNode.style.width=C.w+"px"
}this._allFPs.push(this)
},startup:function(){this.inherited("startup",arguments);
if(this.resizable){if(A.isIE){this.canvas.style.overflow="auto"
}else{this.containerNode.style.overflow="auto"
}var B=new dojox.layout.ResizeHandle({targetId:this.id,resizeAxis:this.resizeAxis},this.resizeHandle)
}if(this.dockable){tmpName=this.dockTo;
if(this.dockTo){this.dockTo=dijit.byId(this.dockTo)
}else{this.dockTo=dijit.byId("dojoxGlobalFloatingDock")
}if(!this.dockTo){if(tmpName){var D=tmpName;
var C=A.byId(tmpName)
}else{var C=document.createElement("div");
A.body().appendChild(C);
A.addClass(C,"dojoxFloatingDockDefault");
var D="dojoxGlobalFloatingDock"
}this.dockTo=new dojox.layout.Dock({id:D,autoPosition:"south"},C);
this.dockTo.startup()
}if((this.domNode.style.display=="none")||(this.domNode.style.visibility=="hidden")){this.minimize()
}}this.connect(this.focusNode,"onmousedown","bringToTop");
this.connect(this.domNode,"onmousedown","bringToTop")
},setTitle:function(B){this.titleNode.innerHTML=B
},close:function(){if(!this.closable){return 
}A.unsubscribe(this._listener);
this.hide(A.hitch(this,"destroy"))
},hide:function(B){A.fadeOut({node:this.domNode,duration:this.duration,onEnd:A.hitch(this,function(){this.domNode.style.display="none";
this.domNode.style.visibility="hidden";
if(this.dockTo){this.dockTo._positionDock(null)
}if(B){B()
}})}).play()
},show:function(C){var B=A.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:A.hitch(this,function(){this.domNode.style.display="";
this.domNode.style.visibility="visible";
this.dockTo._positionDock(null);
if(this.dockTo){this.dockTo._positionDock(null)
}if(typeof C=="function"){C()
}this._isDocked=false;
if(this._dockNode){this._dockNode.destroy();
this._dockNode=null
}})}).play();
this.resize(A.coords(this.domNode))
},minimize:function(){if(!this._isDocked){this.hide(A.hitch(this,"_dock"))
}},maximize:function(){if(this._maximized){return 
}this._naturalState=A.coords(this.domNode);
if(this._isDocked){this.show();
setTimeout(A.hitch(this,"maximize"),this.duration)
}A.addClass(this.focusNode,"floatingPaneMaximized");
this.resize(dijit.getViewport());
this._maximized=true
},_restore:function(){if(this._maximized){this.resize(this._naturalState);
A.removeClass(this.focusNode,"floatingPaneMaximized");
this._maximized=false
}},_dock:function(){if(!this._isDocked){this._dockNode=this.dockTo.addNode(this);
this._isDocked=true
}},resize:function(C){this._currentState=C;
var B=this.domNode.style;
B.top=C.t+"px";
B.left=C.l+"px";
B.width=C.w+"px";
this.canvas.style.width=C.w+"px";
B.height=C.h+"px";
this.canvas.style.height=(C.h-this.focusNode.offsetHeight)+"px"
},_startZ:100,bringToTop:function(){var B=A.filter(this._allFPs,function(C){return C!==this
},this);
B.sort(function(D,C){return D.domNode.style.zIndex-C.domNode.style.zIndex
});
B.push(this);
A.forEach(B,function(D,C){D.domNode.style.zIndex=(this._startZ+C*2);
A.removeClass(D.domNode,"dojoxFloatingPaneFg")
},this);
A.addClass(this.domNode,"dojoxFloatingPaneFg")
},destroy:function(){this._allFPs.splice(A.indexOf(this._allFPs,this),1);
this.inherited("destroy",arguments)
}});
A.declare("dojox.layout.Dock",[dijit._Widget,dijit._Templated],{templateString:'<div class="dojoxDock"><ul dojoAttachPoint="containerNode" class="dojoxDockList"></ul></div>',_docked:[],_inPositioning:false,autoPosition:false,addNode:function(B){var D=document.createElement("li");
this.containerNode.appendChild(D);
var C=new dojox.layout._DockNode({title:B.title,paneRef:B},D);
C.startup();
return C
},startup:function(){if(this.id=="dojoxGlobalFloatingDock"||this.isFixedDock){A.connect(window,"onresize",this,"_positionDock");
A.connect(window,"onscroll",this,"_positionDock");
if(A.isIE){A.connect(this.domNode,"onresize",this,"_positionDock")
}}this._positionDock(null);
this.inherited("startup",arguments)
},_positionDock:function(B){if(!this._inPositioning){if(this.autoPosition=="south"){setTimeout(A.hitch(this,function(){this._inPositiononing=true;
var C=dijit.getViewport();
var D=this.domNode.style;
D.left=C.l+"px";
D.width=(C.w-2)+"px";
D.top=(C.h+C.t)-this.domNode.offsetHeight+"px";
this._inPositioning=false
}),500)
}}}});
A.declare("dojox.layout._DockNode",[dijit._Widget,dijit._Templated],{title:"",paneRef:null,templateString:'<li dojoAttachEvent="onclick: restore" class="dojoxDockNode"><span dojoAttachPoint="restoreNode" class="dojoxDockRestoreButton" dojoAttachEvent="onclick: restore"></span><span class="dojoxDockTitleNode" dojoAttachPoint="titleNode">${title}</span></li>',restore:function(){this.paneRef.show();
this.paneRef.bringToTop();
this.destroy()
}})
}}});