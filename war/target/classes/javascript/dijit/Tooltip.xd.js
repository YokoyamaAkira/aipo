dojo._xdResourceLoaded({depends:[["provide","dijit.Tooltip"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(A){if(!A._hasResource["dijit.Tooltip"]){A._hasResource["dijit.Tooltip"]=true;
A.provide("dijit.Tooltip");
A.require("dijit._Widget");
A.require("dijit._Templated");
A.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){A.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=A.fadeIn({node:this.domNode,duration:this.duration,onEnd:A.hitch(this,"_onShow")});
this.fadeOut=A.fadeOut({node:this.domNode,duration:this.duration,onEnd:A.hitch(this,"_onHide")})
},show:function(B,C){if(this.aroundNode&&this.aroundNode===C){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=B;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var E=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var D=dijit.placeOnScreenAroundElement(this.domNode,C,E);
this.domNode.className="dijitTooltip dijitTooltip"+(D.corner=="BL"?"Right":"Left");
A.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=C
},_onShow:function(){if(A.isIE){this.domNode.style.filter=""
}},hide:function(B){if(!this.aroundNode||this.aroundNode!==B){return 
}if(this._onDeck){this._onDeck=null;
return 
}this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play()
},_onHide:function(){this.domNode.style.cssText="";
if(this._onDeck){this.show.apply(this,this._onDeck);
this._onDeck=null
}}});
dijit.showTooltip=function(B,C){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(B,C)
};
dijit.hideTooltip=function(B){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(B)
};
A.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
A.forEach(this.connectId,function(B){var C=A.byId(B);
if(C){this._connectNodes.push(C);
A.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(D){this.connect(C,D.toLowerCase(),"_"+D)
},this);
if(A.isIE){C.style.zoom=1
}}},this)
},_onMouseOver:function(B){this._onHover(B)
},_onMouseOut:function(B){if(A.isDescendant(B.relatedTarget,B.target)){return 
}this._onUnHover(B)
},_onFocus:function(B){this._focus=true;
this._onHover(B)
},_onBlur:function(B){this._focus=false;
this._onUnHover(B)
},_onHover:function(B){if(!this._showTimer){var C=B.target;
this._showTimer=setTimeout(A.hitch(this,function(){this.open(C)
}),this.showDelay)
}},_onUnHover:function(B){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(B){B=B||this._connectNodes[0];
if(!B){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,B);
this._connectNode=B
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
}}});