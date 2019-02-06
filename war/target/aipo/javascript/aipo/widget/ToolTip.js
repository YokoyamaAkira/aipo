if(!dojo._hasResource["aipo.widget.ToolTip"]){dojo._hasResource["aipo.widget.ToolTip"]=true;
dojo.provide("aipo.widget.ToolTip");
dojo.require("dijit.Tooltip");
dojo.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(H,A,G,C){if(this.aroundNode&&this.aroundNode===A){return 
}if(A==null||A=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=H;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var F=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var E=dijit.placeOnScreenAroundElement(this.domNode,A,F);
this.domNode.className="dijitTooltip dijitTooltip"+(E.corner=="BL"?"Right":"Left")
}catch(B){this.hide(A);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var D=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=D+"px"
}dojo.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=A;
if(G){G(this.containerNode,C)
}},hide:function(A){if(this.domNode){this.domNode.zIndex=0
}if(!this.aroundNode||this.aroundNode!==A){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.domNode.style.top=-10000+"px";
dojo.style(this.domNode,"opacity",0);
this.isShowingNow=false;
this.aroundNode=null
}});
aipo.widget._masterTT=null;
aipo.widget.showTooltip=function(D,A,C,B){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(D,A,C,B)
};
aipo.widget.hideTooltip=function(A){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(A)
};
dojo.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(B,A,C){this._portletId=A;
this._callback=C
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}aipo.widget.showTooltip(this.label||this.domNode.innerHTML,A,this._callback,this._connectNodes[0]);
this._connectNode=A
},close:function(){aipo.widget.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},_onHover:function(B){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var A=B.target;
aipo.widget.tmpX=B.pageX;
aipo.widget.tmpY=B.pageY;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(A)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
};