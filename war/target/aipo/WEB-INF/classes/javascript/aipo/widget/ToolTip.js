if(!dojo._hasResource["aipo.widget.ToolTip"]){dojo._hasResource["aipo.widget.ToolTip"]=true;
dojo.provide("aipo.widget.ToolTip");
dojo.require("dijit.Tooltip");
dojo.declare("aipo.widget._MasterToolTip",[dijit._MasterTooltip],{duration:100,postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode)
},show:function(C,D,B,F){if(this.aroundNode&&this.aroundNode===D){return 
}if(D==null||D=="undefined"){return 
}if(this.domNode==null||this.domNode=="undefined"){return 
}this.containerNode.innerHTML=C;
this.domNode.style.width="150px";
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
try{var A=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var H=dijit.placeOnScreenAroundElement(this.domNode,D,A);
this.domNode.className="dijitTooltip dijitTooltip"+(H.corner=="BL"?"Right":"Left")
}catch(E){this.hide(D);
return 
}if(parseInt(this.domNode.style.left)<1){this.domNode.style.top=-10000+"px"
}else{var G=parseInt(aipo.widget.tmpY)-36;
this.domNode.style.top=G+"px"
}dojo.style(this.domNode,"opacity",1);
this.isShowingNow=true;
this.aroundNode=D;
if(B){B(this.containerNode,F)
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
aipo.widget.showTooltip=function(C,D,B,A){if(!aipo.widget._masterTT){aipo.widget._masterTT=new aipo.widget._MasterToolTip()
}return aipo.widget._masterTT.show(C,D,B,A)
};
aipo.widget.hideTooltip=function(A){if(!aipo.widget._masterTT){return 
}return aipo.widget._masterTT.hide(A)
};
dojo.declare("aipo.widget.ToolTip",[dijit.Tooltip],{origZIndex:0,_portletId:null,_callback:null,constructor:function(A,C,B){this._portletId=C;
this._callback=B
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
}},_onHover:function(A){if(ptConfig[this._portletId].isTooltipEnable!=true){return 
}if(!this._showTimer){var B=A.target;
aipo.widget.tmpX=A.pageX;
aipo.widget.tmpY=A.pageY;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(B)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
}})
};