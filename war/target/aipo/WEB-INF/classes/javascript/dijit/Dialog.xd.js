dojo._xdResourceLoaded({depends:[["provide","dijit.Dialog"],["require","dojo.dnd.move"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit.layout.ContentPane"],["require","dijit.form.Form"]],defineResource:function(A){if(!A._hasResource["dijit.Dialog"]){A._hasResource["dijit.Dialog"]=true;
A.provide("dijit.Dialog");
A.require("dojo.dnd.move");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.require("dijit.layout.ContentPane");
A.require("dijit.form.Form");
A.declare("dijit.DialogUnderlay",[dijit._Widget,dijit._Templated],{templateString:"<div class=dijitDialogUnderlayWrapper id='${id}_underlay'><div class=dijitDialogUnderlay dojoAttachPoint='node'></div></div>",postCreate:function(){A.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},layout:function(){var C=dijit.getViewport();
var E=this.node.style,B=this.domNode.style;
B.top=C.t+"px";
B.left=C.l+"px";
E.width=C.w+"px";
E.height=C.h+"px";
var D=dijit.getViewport();
if(C.w!=D.w){E.width=D.w+"px"
}if(C.h!=D.h){E.height=D.h+"px"
}},show:function(){this.domNode.style.display="block";
this.layout();
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="block"
}this._resizeHandler=this.connect(window,"onresize","layout")
},hide:function(){this.domNode.style.display="none";
if(this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.disconnect(this._resizeHandler)
},uninitialize:function(){if(this.bgIframe){this.bgIframe.destroy()
}}});
A.declare("dijit.Dialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{templateString:null,templateString:'<div class="dijitDialog">\r\n\t<div dojoAttachPoint="titleBar" class="dijitDialogTitleBar" tabindex="0" waiRole="dialog">\r\n\t<span dojoAttachPoint="titleNode" class="dijitDialogTitle">${title}</span>\r\n\t<span dojoAttachPoint="closeButtonNode" class="dijitDialogCloseIcon" dojoAttachEvent="onclick: hide">\r\n\t\t<span dojoAttachPoint="closeText" class="closeText">x</span>\r\n\t</span>\r\n\t</div>\r\n\t\t<div dojoAttachPoint="containerNode" class="dijitDialogPaneContent"></div>\r\n\t<span dojoAttachPoint="tabEnd" dojoAttachEvent="onfocus:_cycleFocus" tabindex="0"></span>\r\n</div>\r\n',open:false,duration:400,_lastFocusItem:null,attributeMap:A.mixin(A.clone(dijit._Widget.prototype.attributeMap),{title:"titleBar"}),postCreate:function(){A.body().appendChild(this.domNode);
this.inherited("postCreate",arguments);
this.domNode.style.display="none";
this.connect(this,"onExecute","hide");
this.connect(this,"onCancel","hide")
},onLoad:function(){this._position();
this.inherited("onLoad",arguments)
},_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new A.dnd.Moveable(this.domNode,{handle:this.titleBar})
}this._underlay=new dijit.DialogUnderlay();
var B=this.domNode;
this._fadeIn=A.fx.combine([A.fadeIn({node:B,duration:this.duration}),A.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:A.hitch(this._underlay,"show")})]);
this._fadeOut=A.fx.combine([A.fadeOut({node:B,duration:this.duration,onEnd:function(){B.style.display="none"
}}),A.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:A.hitch(this._underlay,"hide")})])
},uninitialize:function(){if(this._underlay){this._underlay.destroy()
}},_position:function(){if(A.hasClass(A.body(),"dojoMove")){return 
}var C=dijit.getViewport();
var B=A.marginBox(this.domNode);
var D=this.domNode.style;
D.left=Math.floor((C.l+(C.w-B.w)/2))+"px";
D.top=Math.floor((C.t+(C.h-B.h)/2))+"px"
},_findLastFocus:function(B){this._lastFocused=B.target
},_cycleFocus:function(B){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.titleBar.focus()
},_onKey:function(C){if(C.keyCode){var D=C.target;
if(D==this.titleBar&&C.shiftKey&&C.keyCode==A.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}A.stopEvent(C)
}else{while(D){if(D==this.domNode){if(C.keyCode==A.keys.ESCAPE){this.hide()
}else{return 
}}D=D.parentNode
}if(C.keyCode!=A.keys.TAB){A.stopEvent(C)
}else{if(!A.isOpera){try{this.titleBar.focus()
}catch(B){}}}}}},show:function(){if(!this._alreadyInitialized){this._setup();
this._alreadyInitialized=true
}if(this._fadeOut.status()=="playing"){this._fadeOut.stop()
}this._modalconnects.push(A.connect(window,"onscroll",this,"layout"));
this._modalconnects.push(A.connect(document.documentElement,"onkeypress",this,"_onKey"));
var B=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this._modalconnects.push(A.connect(this.containerNode,B,this,"_findLastFocus"));
A.style(this.domNode,"opacity",0);
this.domNode.style.display="block";
this.open=true;
this._loadCheck();
this._position();
this._fadeIn.play();
this._savedFocus=dijit.getFocus(this);
setTimeout(A.hitch(this,function(){dijit.focus(this.titleBar)
}),50)
},hide:function(){if(!this._alreadyInitialized){return 
}if(this._fadeIn.status()=="playing"){this._fadeIn.stop()
}this._fadeOut.play();
if(this._scrollConnected){this._scrollConnected=false
}A.forEach(this._modalconnects,A.disconnect);
this._modalconnects=[];
this.connect(this._fadeOut,"onEnd",A.hitch(this,function(){dijit.focus(this._savedFocus)
}));
this.open=false
},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout();
this._position()
}}});
A.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin],{title:"",_lastFocusItem:null,templateString:null,templateString:'<div class="dijitTooltipDialog" >\r\n\t<div class="dijitTooltipContainer">\r\n\t\t<div class ="dijitTooltipContents dijitTooltipFocusNode" dojoAttachPoint="containerNode" tabindex="0" waiRole="dialog"></div>\r\n\t</div>\r\n\t<span dojoAttachPoint="tabEnd" tabindex="0" dojoAttachEvent="focus:_cycleFocus"></span>\r\n\t<div class="dijitTooltipConnector" ></div>\r\n</div>\r\n',postCreate:function(){this.inherited("postCreate",arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
var B=typeof (document.ondeactivate)=="object"?"ondeactivate":"onblur";
this.connect(this.containerNode,B,"_findLastFocus");
this.containerNode.title=this.title
},orient:function(B){this.domNode.className="dijitTooltipDialog  dijitTooltipAB"+(B.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(B.charAt(0)=="T"?"Below":"Above")
},onOpen:function(B){this.orient(B.corner);
this._loadCheck();
this.containerNode.focus()
},_onKey:function(B){if(B.keyCode==A.keys.ESCAPE){this.onCancel()
}else{if(B.target==this.containerNode&&B.shiftKey&&B.keyCode==A.keys.TAB){if(this._lastFocusItem){this._lastFocusItem.focus()
}A.stopEvent(B)
}else{if(B.keyCode==A.keys.TAB){B.stopPropagation()
}}}},_findLastFocus:function(B){this._lastFocused=B.target
},_cycleFocus:function(B){if(!this._lastFocusItem){this._lastFocusItem=this._lastFocused
}this.containerNode.focus()
}})
}}});