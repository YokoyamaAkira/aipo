if(!dojo._hasResource["aimluck.widget.Dialog"]){dojo._hasResource["aimluck.widget.Dialog"]=true;
dojo.provide("aimluck.widget.Dialog");
dojo.provide("aimluck.widget.DialogSub");
dojo.provide("aimluck.widget.DialogUnderlay");
dojo.provide("aimluck.widget.Timeout");
dojo.require("dijit.Dialog");
dojo.declare("aimluck.widget.DialogUnderlay",[dijit.DialogUnderlay],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node'></div></div>",layout:function(){var A="";
var C="";
os="";
os.top="";
os.left="";
C.width="";
C.height="";
var B=""
}});
dojo.declare("aimluck.widget.Timeout",[dijit._Widget,dijit._Templated],{templateString:"<div class=modalDialogUnderlayWrapper id='${id}_underlay'><div class=modalDialogUnderlay dojoAttachPoint='node' redirecturl=\"${redirectUrl}\"></div></div>",redirectUrl:"about:blank",postCreate:function(){window.location.href=this.redirectUrl
}});
dojo.declare("aimluck.widget.DialogSub",[aimluck.widget.Dialog,dijit.Dialog],{templateString:"<div id='modalDialogSub' class='modalDialogSub' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>"});
dojo.declare("aimluck.widget.Dialog",[dijit.Dialog],{loadingMessage:"<div class='indicatorDialog'><div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div></div>",templateString:null,templateString:"<div id='modalDialog' class='modalDialog' dojoattachpoint='wrapper'><span dojoattachpoint='tabStartOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap'tabindex='0'></span><span dojoattachpoint='tabStart' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><div dojoattachpoint='containerNode' style='position: relative; z-index: 2;'></div><span dojoattachpoint='tabEnd' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span><span dojoattachpoint='tabEndOuter' dojoonfocus='trapTabs' dojoonblur='clearTrap' tabindex='0'></span></div>",duration:10,extractContent:false,parseOnLoad:true,refreshOnShow:true,isPositionLock:false,params:new Array(),reloadIds:new Array(),_portlet_id:null,_callback:null,_setup:function(){this._modalconnects=[];
if(this.titleBar){this._moveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleBar});
var A=this.domNode;
dojo.connect(this._moveable,"onMoving",function(G,F){var D=dijit.getViewport();
var E=parseInt(dojo.getComputedStyle(A).width);
var C=parseInt(D.w);
if(F.l<0){F.l=0
}if(F.l+E>C){F.l=C-E
}if(F.t<0){F.t=0
}})
}this._underlay=new aimluck.widget.DialogUnderlay();
var B=this.domNode;
this._fadeIn=dojo.fx.combine([dojo.fadeIn({node:B,duration:this.duration}),dojo.fadeIn({node:this._underlay.domNode,duration:this.duration,onBegin:dojo.hitch(this._underlay,"show")})]);
this._fadeOut=dojo.fx.combine([dojo.fadeOut({node:B,dialog:this,duration:this.duration,onEnd:function(){B.style.display="none";
if(document.all){this.dialog.fixTmpScroll()
}}}),dojo.fadeOut({node:this._underlay.domNode,duration:this.duration,onEnd:dojo.hitch(this._underlay,"hide")})])
},fixTmpScroll:function(){var A=dojo.byId("weeklyScrollPane_"+this._portlet_id);
if(A){if(typeof aipo.schedule.tmpScroll=="undefined"){dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=ptConfig[this._portlet_id].contentScrollTop
}else{dojo.byId("weeklyScrollPane_"+this._portlet_id).scrollTop=aipo.schedule.tmpScroll
}}},onLoad:function(){this._position();
dijit.Dialog.superclass.onLoad.call(this);
this.isPositionLock=false;
var A=window.navigator.userAgent.toLowerCase();
if(A.indexOf("iphone")>-1||A.indexOf("android")>-1){if(!!document.documentElement.scrollTop){document.documentElement.scrollTop=0
}else{if(!!document.body.scrollTop){document.body.scrollTop=0
}}}var B=dojo.byId(this.widgetId);
if(B){B.focus();
if(this._callback!=null){this._callback.call(this._callback,this._portlet_id)
}}},setCallback:function(A,B){this._portlet_id=A;
this._callback=B
},setParam:function(A,B){this.params[A]=B
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},reload:function(A){this.href=A;
this.isPositionLock=true;
this.refresh()
},_position:function(){if(dojo.hasClass(dojo.body(),"dojoMove")){return 
}var A=dijit.getViewport();
var C=dojo.marginBox(this.domNode);
var B=this.domNode.style;
B.left=Math.floor((A.l+(A.w-C.w)/2))+"px";
if(Math.floor((A.t+(A.h-C.h)/2))>0){B.top=Math.floor((A.t+(A.h-C.h)/2))+"px"
}else{B.top=0+"px"
}},layout:function(){if(this.domNode.style.display=="block"){this._underlay.layout()
}},_downloadExternalContent:function(){this._onUnloadHandler();
this._setContent(this.onDownloadStart.call(this));
var B=this;
var C={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(dojo.isObject(this.ioArgs)){dojo.mixin(C,this.ioArgs)
}var A=this._xhrDfd=(this.ioMethod||dojo.xhrPost)(C);
A.addCallback(function(D){B.clearParams();
B.clearReloadIds();
try{B.onDownloadEnd.call(B);
B._isDownloaded=true;
B.setContent.call(B,D)
}catch(E){B._onError.call(B,"Content",E)
}delete B._xhrDfd;
return D
});
A.addErrback(function(D){if(!A.cancelled){B._onError.call(B,"Download",D)
}delete B._xhrDfd;
return D
})
},hide:function(){dijit.Dialog.prototype.hide.apply(this);
dojo.query(".mb_dialoghide").removeClass("mb_dialoghide");
dojo.query("#modalDialog").removeClass("mb_dialog")
}})
};