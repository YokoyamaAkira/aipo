dojo._xdResourceLoaded({depends:[["provide","aipo.widget.ToolTip"],["require","dijit.Tooltip"]],defineResource:function(A){if(!A._hasResource["aipo.widget.ToolTip"]){A._hasResource["aipo.widget.ToolTip"]=true;
A.provide("aipo.widget.ToolTip");
A.require("dijit.Tooltip");
A.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){A.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(I,B,H,D){if(this.aroundNode&&this.aroundNode===B){return 
}if(B==null||B=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=I;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var G=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var F=dijit.placeOnScreenAroundElement(this.domNode,B,G);
this.domNode.className="dijitTooltip dijitTooltip"+(F.corner=="BL"?"Right":"Left")
}catch(C){this.hide(B);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var E=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=E+"px"
}A.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=B;
if(H){H(this.containerNode,D)
}},hide:function(B){if(this.domNode){this.domNode.zIndex=0
}if(!this.aroundNode||this.aroundNode!==B){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.domNode.style.top=-10000+"px";
A.style(this.domNode,"opacity",0);
this.isShowingNow=false;
this.aroundNode=null
}});
aipo.widget._masterTT=null;
aipo.widget.showTooltip=function(E,B,D,C){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(E,B,D,C)
};
aipo.widget.hideTooltip=function(B){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(B)
};
A.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(C,B,D){this._portletId=B;
this._callback=D
},open:function(B){B=B||this._connectNodes[0];
if(!B){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}aipo.widget.showTooltip(this.label||this.domNode.innerHTML,B,this._callback,this._connectNodes[0]);
this._connectNode=B
},close:function(){aipo.widget.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},_onHover:function(C){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var B=C.target;
aipo.widget.tmpX=C.pageX;
aipo.widget.tmpY=C.pageY;
this._showTimer=setTimeout(A.hitch(this,function(){this.open(B)
}),this.showDelay)
}},_onUnHover:function(B){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
}}});