if(!dojo._hasResource["dijit.Tooltip"]){dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:200,templateString:'<div class="dijitTooltip dijitTooltipLeft" id="dojoTooltip">\r\n\t<div class="dijitTooltipContainer dijitTooltipContents" dojoAttachPoint="containerNode" waiRole=\'alert\'></div>\r\n\t<div class="dijitTooltipConnector"></div>\r\n</div>\r\n',postCreate:function(){dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")})
},show:function(C,D){if(this.aroundNode&&this.aroundNode===D){return 
}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;
return 
}this.containerNode.innerHTML=C;
this.domNode.style.top=(this.domNode.offsetTop+1)+"px";
var B=this.isLeftToRight()?{BR:"BL",BL:"BR"}:{BL:"BR",BR:"BL"};
var A=dijit.placeOnScreenAroundElement(this.domNode,D,B);
this.domNode.className="dijitTooltip dijitTooltip"+(A.corner=="BL"?"Right":"Left");
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=D
},_onShow:function(){if(dojo.isIE){this.domNode.style.filter=""
}},hide:function(A){if(!this.aroundNode||this.aroundNode!==A){return 
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
dijit.showTooltip=function(A,B){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.show(A,B)
};
dijit.hideTooltip=function(A){if(!dijit._masterTT){dijit._masterTT=new dijit._MasterTooltip()
}return dijit._masterTT.hide(A)
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],postCreate:function(){if(this.srcNodeRef){this.srcNodeRef.style.display="none"
}this._connectNodes=[];
dojo.forEach(this.connectId,function(A){var B=dojo.byId(A);
if(B){this._connectNodes.push(B);
dojo.forEach(["onMouseOver","onMouseOut","onFocus","onBlur","onHover","onUnHover"],function(C){this.connect(B,C.toLowerCase(),"_"+C)
},this);
if(dojo.isIE){B.style.zoom=1
}}},this)
},_onMouseOver:function(A){this._onHover(A)
},_onMouseOut:function(A){if(dojo.isDescendant(A.relatedTarget,A.target)){return 
}this._onUnHover(A)
},_onFocus:function(A){this._focus=true;
this._onHover(A)
},_onBlur:function(A){this._focus=false;
this._onUnHover(A)
},_onHover:function(A){if(!this._showTimer){var B=A.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){this.open(B)
}),this.showDelay)
}},_onUnHover:function(A){if(this._focus){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}this.close()
},open:function(A){A=A||this._connectNodes[0];
if(!A){return 
}if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}dijit.showTooltip(this.label||this.domNode.innerHTML,A);
this._connectNode=A
},close:function(){dijit.hideTooltip(this._connectNode);
delete this._connectNode;
if(this._showTimer){clearTimeout(this._showTimer);
delete this._showTimer
}},uninitialize:function(){this.close()
}})
};