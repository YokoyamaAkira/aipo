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
}},setContent:function(H,E,I){I=I||this.duration;
if(this.slideAnim){if(this.slideAnim.status()!="playing"){this.slideAnim.stop()
}if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){setTimeout(A.hitch(this,function(){this.setContent(H,E)
}),50);
return 
}}var D=function(J){return J.substring(0,1).toUpperCase()+J.substring(1)
};
for(var G in this.messageTypes){A.removeClass(this.containerNode,"dijitToaster"+D(this.messageTypes[G]))
}A.style(this.containerNode,"opacity",1);
if(H&&this.isVisible){H=this.contentNode.innerHTML+this.separator+H
}this.contentNode.innerHTML=H;
A.addClass(this.containerNode,"dijitToaster"+D(E||this.defaultType));
this.show();
var B=A.marginBox(this.containerNode);
if(this.isVisible){this._placeClip()
}else{var F=this.containerNode.style;
var C=this.positionDirection;
if(C.indexOf("-up")>=0){F.left=0+"px";
F.top=B.h+10+"px"
}else{if(C.indexOf("-left")>=0){F.left=B.w+10+"px";
F.top=0+"px"
}else{if(C.indexOf("-right")>=0){F.left=0-B.w-10+"px";
F.top=0+"px"
}else{if(C.indexOf("-down")>=0){F.left=0+"px";
F.top=0-B.h-10+"px"
}else{throw new Error(this.id+".positionDirection is invalid: "+C)
}}}}this.slideAnim=A.fx.slideTo({node:this.containerNode,top:0,left:0,duration:450});
A.connect(this.slideAnim,"onEnd",this,function(J,K){this.fadeAnim=A.fadeOut({node:this.containerNode,duration:1000});
A.connect(this.fadeAnim,"onEnd",this,function(L){this.isVisible=false;
this.hide()
});
if(I>0){setTimeout(A.hitch(this,function(L){if(this.bgIframe&&this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.fadeAnim.play()
}),I)
}else{A.connect(this,"onSelect",this,function(L){this.fadeAnim.play()
})
}this.isVisible=true
});
this.slideAnim.play()
}},_placeClip:function(){var C=dijit.getViewport();
var B=A.marginBox(this.containerNode);
var F=this.clipNode.style;
F.height=B.h+"px";
F.width=B.w+"px";
var D=this.positionDirection;
if(D.match(/^t/)){F.top=C.t+"px"
}else{if(D.match(/^b/)){F.top=(C.h-B.h-2+C.t)+"px"
}}if(D.match(/^[tb]r-/)){F.left=(C.w-B.w-1-C.l)+"px"
}else{if(D.match(/^[tb]l-/)){F.left=0+"px"
}}F.clip="rect(0px, "+B.w+"px, "+B.h+"px, 0px)";
if(A.isIE){if(!this.bgIframe){this.clipNode.id="__dojoXToaster_"+this._uniqueId++;
this.bgIframe=new dijit.BackgroundIframe(this.clipNode)
}var E=this.bgIframe.iframe;
E&&(E.style.display="block")
}},onSelect:function(B){},show:function(){A.style(this.containerNode,"display","");
this._placeClip();
if(!this._scrollConnected){this._scrollConnected=A.connect(window,"onscroll",this,this._placeClip)
}},hide:function(){A.style(this.containerNode,"display","none");
if(this._scrollConnected){A.disconnect(this._scrollConnected);
this._scrollConnected=false
}A.style(this.containerNode,"opacity",1)
}})
}}});