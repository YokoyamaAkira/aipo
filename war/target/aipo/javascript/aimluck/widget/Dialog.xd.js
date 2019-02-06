dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Dialog"],["provide","aimluck.widget.DialogUnderlay"],["provide","aimluck.widget.Timeout"],["require","dijit.Dialog"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Dialog"]){A._hasResource["aimluck.widget.Dialog"]=true;
A.provide("aimluck.widget.Dialog");
A.provide("aimluck.widget.DialogUnderlay");
A.provide("aimluck.widget.Timeout");
A.require("dijit.Dialog");
A.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var B="";
var D="";
os="";
os.top="";
os.left="";
D.width="";
D.height="";
var C=""
}});
A.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
A.declare("aimluck.widget.Dialog",[dijit.Dialog],{widgetId:null,loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new A.dnd.Moveable(this.domNode,{handle:this.titleBar});
var B=this.domNode;
A.connect(this._moveable,"onMoving",function(H,G){var E=dijit.getViewport();
var F=parseInt(A.getComputedStyle(B).width);
var D=parseInt(E.w);
if(G.l<0){G.l=0
}if(G.l+F>D){G.l=D-F
}if(G.t<0){G.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var C=this.domNode;
this._fadeIn=A.fx.combine([A.fadeIn({node:C,duration:this.duration}),A.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:A.hitch(this._underlay,"show")})]);
this._fadeOut=A.fx.combine([A.fadeOut({node:C,dialog:this,duration:this.duration,onEnd:function(){C.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),A.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:A.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var B=A.byId("weeklyScrollPane_"+this._portlet_id);
if(B){if(typeof aipo.schedule.tmpScroll=="undefined"){A.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{A.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var B=window.navigator.userAgent.toLowerCase();
if(B.indexOf("iphone")>-1||B.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var C=A.byId(this.widgetId);
if(C){C.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(B,C){this._portlet_id=B;
this._callback=C
},setParam:function(B,C){this.params[B]=C
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(B){this.href=B;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(A.hasClass(A.body(),"dojoMove")){return 
}var B=dijit.getViewport();
var D=A.marginBox(this.domNode);
var C=this.domNode.style;
C.left=Math.floor((B.l+(B.w-D.w)/2))+"px";
if(Math.floor((B.t+(B.h-D.h)/2))>0){C.top=Math.floor((B.t+(B.h-D.h)/2))+"px"
}else{C.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var C=this;
var D={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(A.isObject(this.ioArgs)){A.mixin(D,this.ioArgs)
}var B=this._xhrDfd=(this.ioMethod||A.xhrPost)(D);
B.addCallback(function(E){C.clearParams();
C.clearReloadIds();
try{C.onDownloadEnd.call(C);
C._isDownloaded=true;
C.setContent.call(C,E)
}catch(F){C._onError.call(C,"Content",F)
}delete C._xhrDfd;
return E
});
B.addErrback(function(E){if(!B.cancelled){C._onError.call(C,"Download",E)
}delete C._xhrDfd;
return E
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
A.query(".mb_dialoghide").removeClass("mb_dialoghide");
A.query("#modalDialog").removeClass("mb_dialog")
}})
}}});