if(!dojo._hasResource["aimluck.widget.Dialog"]){dojo._hasResource["aimluck.widget.Dialog"]=true;
dojo.provide("aimluck.widget.Dialog");
dojo.provide("aimluck.widget.DialogSub");
dojo.provide("aimluck.widget.DialogUnderlay");
dojo.provide("aimluck.widget.Timeout");
dojo.require("dijit.Dialog");
dojo.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var C="";
var B="";
os="";
os.top="";
os.left="";
B.width="";
B.height="";
var A=""
}});
dojo.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
dojo.declare("aimluck.widget.DialogSub",[aimluck.widget.Dialog,dijit.Dialog],{templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"});
dojo.declare("aimluck.widget.Dialog",[dijit.Dialog],{loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar});
var B=this.domNode;
dojo.connect(this._moveable,"onMoving",function(C,G){var E=dijit.getViewport();
var F=parseInt(dojo.getComputedStyle(B).width);
var D=parseInt(E.w);
if(G.l<0){G.l=0
}if(G.l+F>D){G.l=D-F
}if(G.t<0){G.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var A=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:A,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:A,dialog:this,duration:this.duration,onEnd:function(){A.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var A=dojo.byId("weeklyScrollPane_"+this._portlet_id);
if(A){if(typeof aipo.schedule.tmpScroll=="undefined"){dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var B=window.navigator.userAgent.toLowerCase();
if(B.indexOf("iphone")>-1||B.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var A=dojo.byId(this.widgetId);
if(A){A.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(B,A){this._portlet_id=B;
this._callback=A
},setParam:function(B,A){this.params[B]=A
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(A){this.href=A;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var C=dijit.getViewport();
var B=dojo.marginBox(this.domNode);
var A=this.domNode.style;
A.left=Math.floor((C.l+(C.w-B.w)/2))+"px";
if(Math.floor((C.t+(C.h-B.h)/2))>0){A.top=Math.floor((C.t+(C.h-B.h)/2))+"px"
}else{A.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var A=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(dojo.isObject(this.ioArgs)){dojo.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||dojo.xhrPost)(B);
C.addCallback(function(E){A.clearParams();
A.clearReloadIds();
try{A.onDownloadEnd.call(A);
A._isDownloaded=true;
A.setContent.call(A,E)
}catch(D){A._onError.call(A,"Content",D)
}delete A._xhrDfd;
return E
});
C.addErrback(function(D){if(!C.cancelled){A._onError.call(A,"Download",D)
}delete A._xhrDfd;
return D
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
dojo.query(".mb_dialoghide").removeClass("mb_dialoghide");
dojo.query("#modalDialog").removeClass("mb_dialog")
}})
};