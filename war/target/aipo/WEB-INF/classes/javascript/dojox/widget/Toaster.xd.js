dojo._xdResourceLoaded({depends:[["provide","dojox.widget.Toaster"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dojox.widget.Toaster"]){A._hasResource["dojox.widget.Toaster"]=true;
A.provide("dojox.widget.Toaster");
A.require("dojo.fx");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dojox.widget.Toaster",[dijit._Widget,dijit._Templated],{templateString:'<div dojoAttachPoint="clipNode"><div dojoAttachPoint="containerNode" dojoAttachEvent="onclick:onSelect"><div dojoAttachPoint="contentNode"></div></div></div>',messageTopic:"",_uniqueId:0,messageTypes:{MESSAGE:"message",WARNING:"warning",ERROR:"error",FATAL:"fatal"},defaultType:"message",positionDirection:"br-up",positionDirectionTypes:["br-up","br-left","bl-up","bl-right","tr-down","tr-left","tl-down","tl-right"],duration:"2000",separator:"<hr></hr>",postCreate:function(){dojox.widget.Toaster.superclass.postCreate.apply(this);
this.hide();
this.clipNode.className="dijitToasterClip";
this.containerNode.className+=" dijitToasterContainer";
this.contentNode.className="dijitToasterContent";
if(this.messageTopic){A.subscribe(this.messageTopic,this,"_handleMessage")
}},_handleMessage:function(B){if(A.isString(B)){this.setContent(B)
}else{this.setContent(B.message,B.type,B.duration)
}},setContent:function(E,I,C){C=C||this.duration;
if(this.slideAnim){if(this.slideAnim.status()!="playing"){this.slideAnim.stop()
}if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){setTimeout(A.hitch(this,function(){this.setContent(E,I)
}),50);
return 
}}var H=function(J){return J.substring(0,1).toUpperCase()+J.substring(1)
};
for(var D in this.messageTypes){A.removeClass(this.containerNode,"dijitToaster"+H(this.messageTypes[D]))
}A.style(this.containerNode,"opacity",1);
if(E&&this.isVisible){E=this.contentNode.innerHTML+this.separator+E
}this.contentNode.innerHTML=E;
A.addClass(this.containerNode,"dijitToaster"+H(I||this.defaultType));
this.show();
var F=A.marginBox(this.containerNode);
if(this.isVisible){this._placeClip()
}else{var B=this.containerNode.style;
var G=this.positionDirection;
if(G.indexOf("-up")>=0){B.left=0+"px";
B.top=F.h+10+"px"
}else{if(G.indexOf("-left")>=0){B.left=F.w+10+"px";
B.top=0+"px"
}else{if(G.indexOf("-right")>=0){B.left=0-F.w-10+"px";
B.top=0+"px"
}else{if(G.indexOf("-down")>=0){B.left=0+"px";
B.top=0-F.h-10+"px"
}else{throw new Error(this.id+".positionDirection is invalid: "+G)
}}}}this.slideAnim=A.fx.slideTo({node:this.containerNode,top:0,left:0,duration:450});
A.connect(this.slideAnim,"onEnd",this,function(J,K){this.fadeAnim=A.fadeOut({node:this.containerNode,duration:1000});
A.connect(this.fadeAnim,"onEnd",this,function(L){this.isVisible=false;
this.hide()
});
if(C>0){setTimeout(A.hitch(this,function(L){if(this.bgIframe&&this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.fadeAnim.play()
}),C)
}else{A.connect(this,"onSelect",this,function(L){this.fadeAnim.play()
})
}this.isVisible=true
});
this.slideAnim.play()
}},_placeClip:function(){var D=dijit.getViewport();
var C=A.marginBox(this.containerNode);
var B=this.clipNode.style;
B.height=C.h+"px";
B.width=C.w+"px";
var E=this.positionDirection;
if(E.match(/^t/)){B.top=D.t+"px"
}else{if(E.match(/^b/)){B.top=(D.h-C.h-2+D.t)+"px"
}}if(E.match(/^[tb]r-/)){B.left=(D.w-C.w-1-D.l)+"px"
}else{if(E.match(/^[tb]l-/)){B.left=0+"px"
}}B.clip="rect(0px, "+C.w+"px, "+C.h+"px, 0px)";
if(A.isIE){if(!this.bgIframe){this.clipNode.id="__dojoXToaster_"+this._uniqueId++;
this.bgIframe=new dijit.BackgroundIframe(this.clipNode)
}var F=this.bgIframe.iframe;
F&&(F.style.display="block")
}},onSelect:function(B){},show:function(){A.style(this.containerNode,"display","");
this._placeClip();
if(!this._scrollConnected){this._scrollConnected=A.connect(window,"onscroll",this,this._placeClip)
}},hide:function(){A.style(this.containerNode,"display","none");
if(this._scrollConnected){A.disconnect(this._scrollConnected);
this._scrollConnected=false
}A.style(this.containerNode,"opacity",1)
}})
}}});