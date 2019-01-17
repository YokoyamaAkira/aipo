if(!dojo._hasResource["dojox.widget.Toaster"]){dojo._hasResource["dojox.widget.Toaster"]=true;
dojo.provide("dojox.widget.Toaster");
dojo.require("dojo.fx");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dojox.widget.Toaster",[dijit._Widget,dijit._Templated],{templateString:'<div dojoAttachPoint="clipNode"><div dojoAttachPoint="containerNode" dojoAttachEvent="onclick:onSelect"><div dojoAttachPoint="contentNode"></div></div></div>',messageTopic:"",_uniqueId:0,messageTypes:{MESSAGE:"message",WARNING:"warning",ERROR:"error",FATAL:"fatal"},defaultType:"message",positionDirection:"br-up",positionDirectionTypes:["br-up","br-left","bl-up","bl-right","tr-down","tr-left","tl-down","tl-right"],duration:"2000",separator:"<hr></hr>",postCreate:function(){dojox.widget.Toaster.superclass.postCreate.apply(this);
this.hide();
this.clipNode.className="dijitToasterClip";
this.containerNode.className+=" dijitToasterContainer";
this.contentNode.className="dijitToasterContent";
if(this.messageTopic){dojo.subscribe(this.messageTopic,this,"_handleMessage")
}},_handleMessage:function(A){if(dojo.isString(A)){this.setContent(A)
}else{this.setContent(A.message,A.type,A.duration)
}},setContent:function(G,D,H){H=H||this.duration;
if(this.slideAnim){if(this.slideAnim.status()!="playing"){this.slideAnim.stop()
}if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){setTimeout(dojo.hitch(this,function(){this.setContent(G,D)
}),50);
return 
}}var C=function(I){return I.substring(0,1).toUpperCase()+I.substring(1)
};
for(var F in this.messageTypes){dojo.removeClass(this.containerNode,"dijitToaster"+C(this.messageTypes[F]))
}dojo.style(this.containerNode,"opacity",1);
if(G&&this.isVisible){G=this.contentNode.innerHTML+this.separator+G
}this.contentNode.innerHTML=G;
dojo.addClass(this.containerNode,"dijitToaster"+C(D||this.defaultType));
this.show();
var A=dojo.marginBox(this.containerNode);
if(this.isVisible){this._placeClip()
}else{var E=this.containerNode.style;
var B=this.positionDirection;
if(B.indexOf("-up")>=0){E.left=0+"px";
E.top=A.h+10+"px"
}else{if(B.indexOf("-left")>=0){E.left=A.w+10+"px";
E.top=0+"px"
}else{if(B.indexOf("-right")>=0){E.left=0-A.w-10+"px";
E.top=0+"px"
}else{if(B.indexOf("-down")>=0){E.left=0+"px";
E.top=0-A.h-10+"px"
}else{throw new Error(this.id+".positionDirection is invalid: "+B)
}}}}this.slideAnim=dojo.fx.slideTo({node:this.containerNode,top:0,left:0,duration:450});
dojo.connect(this.slideAnim,"onEnd",this,function(I,J){this.fadeAnim=dojo.fadeOut({node:this.containerNode,duration:1000});
dojo.connect(this.fadeAnim,"onEnd",this,function(K){this.isVisible=false;
this.hide()
});
if(H>0){setTimeout(dojo.hitch(this,function(K){if(this.bgIframe&&this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.fadeAnim.play()
}),H)
}else{dojo.connect(this,"onSelect",this,function(K){this.fadeAnim.play()
})
}this.isVisible=true
});
this.slideAnim.play()
}},_placeClip:function(){var B=dijit.getViewport();
var A=dojo.marginBox(this.containerNode);
var E=this.clipNode.style;
E.height=A.h+"px";
E.width=A.w+"px";
var C=this.positionDirection;
if(C.match(/^t/)){E.top=B.t+"px"
}else{if(C.match(/^b/)){E.top=(B.h-A.h-2+B.t)+"px"
}}if(C.match(/^[tb]r-/)){E.left=(B.w-A.w-1-B.l)+"px"
}else{if(C.match(/^[tb]l-/)){E.left=0+"px"
}}E.clip="rect(0px, "+A.w+"px, "+A.h+"px, 0px)";
if(dojo.isIE){if(!this.bgIframe){this.clipNode.id="__dojoXToaster_"+this._uniqueId++;
this.bgIframe=new dijit.BackgroundIframe(this.clipNode)
}var D=this.bgIframe.iframe;
D&&(D.style.display="block")
}},onSelect:function(A){},show:function(){dojo.style(this.containerNode,"display","");
this._placeClip();
if(!this._scrollConnected){this._scrollConnected=dojo.connect(window,"onscroll",this,this._placeClip)
}},hide:function(){dojo.style(this.containerNode,"display","none");
if(this._scrollConnected){dojo.disconnect(this._scrollConnected);
this._scrollConnected=false
}dojo.style(this.containerNode,"opacity",1)
}})
};