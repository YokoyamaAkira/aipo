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
}},setContent:function(B,G,C){C=C||this.duration;
if(this.slideAnim){if(this.slideAnim.status()!="playing"){this.slideAnim.stop()
}if(this.slideAnim.status()=="playing"||(this.fadeAnim&&this.fadeAnim.status()=="playing")){setTimeout(dojo.hitch(this,function(){this.setContent(B,G)
}),50);
return 
}}var F=function(I){return I.substring(0,1).toUpperCase()+I.substring(1)
};
for(var A in this.messageTypes){dojo.removeClass(this.containerNode,"dijitToaster"+F(this.messageTypes[A]))
}dojo.style(this.containerNode,"opacity",1);
if(B&&this.isVisible){B=this.contentNode.innerHTML+this.separator+B
}this.contentNode.innerHTML=B;
dojo.addClass(this.containerNode,"dijitToaster"+F(G||this.defaultType));
this.show();
var D=dojo.marginBox(this.containerNode);
if(this.isVisible){this._placeClip()
}else{var H=this.containerNode.style;
var E=this.positionDirection;
if(E.indexOf("-up")>=0){H.left=0+"px";
H.top=D.h+10+"px"
}else{if(E.indexOf("-left")>=0){H.left=D.w+10+"px";
H.top=0+"px"
}else{if(E.indexOf("-right")>=0){H.left=0-D.w-10+"px";
H.top=0+"px"
}else{if(E.indexOf("-down")>=0){H.left=0+"px";
H.top=0-D.h-10+"px"
}else{throw new Error(this.id+".positionDirection is invalid: "+E)
}}}}this.slideAnim=dojo.fx.slideTo({node:this.containerNode,top:0,left:0,duration:450});
dojo.connect(this.slideAnim,"onEnd",this,function(J,I){this.fadeAnim=dojo.fadeOut({node:this.containerNode,duration:1000});
dojo.connect(this.fadeAnim,"onEnd",this,function(K){this.isVisible=false;
this.hide()
});
if(C>0){setTimeout(dojo.hitch(this,function(K){if(this.bgIframe&&this.bgIframe.iframe){this.bgIframe.iframe.style.display="none"
}this.fadeAnim.play()
}),C)
}else{dojo.connect(this,"onSelect",this,function(K){this.fadeAnim.play()
})
}this.isVisible=true
});
this.slideAnim.play()
}},_placeClip:function(){var A=dijit.getViewport();
var E=dojo.marginBox(this.containerNode);
var D=this.clipNode.style;
D.height=E.h+"px";
D.width=E.w+"px";
var B=this.positionDirection;
if(B.match(/^t/)){D.top=A.t+"px"
}else{if(B.match(/^b/)){D.top=(A.h-E.h-2+A.t)+"px"
}}if(B.match(/^[tb]r-/)){D.left=(A.w-E.w-1-A.l)+"px"
}else{if(B.match(/^[tb]l-/)){D.left=0+"px"
}}D.clip="rect(0px, "+E.w+"px, "+E.h+"px, 0px)";
if(dojo.isIE){if(!this.bgIframe){this.clipNode.id="__dojoXToaster_"+this._uniqueId++;
this.bgIframe=new dijit.BackgroundIframe(this.clipNode)
}var C=this.bgIframe.iframe;
C&&(C.style.display="block")
}},onSelect:function(A){},show:function(){dojo.style(this.containerNode,"display","");
this._placeClip();
if(!this._scrollConnected){this._scrollConnected=dojo.connect(window,"onscroll",this,this._placeClip)
}},hide:function(){dojo.style(this.containerNode,"display","none");
if(this._scrollConnected){dojo.disconnect(this._scrollConnected);
this._scrollConnected=false
}dojo.style(this.containerNode,"opacity",1)
}})
};