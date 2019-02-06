if(!dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]){dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredBars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,A=B.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(X,K){if(this.dirty){dojo.forEach(this.series,A);
this.cleanGroup();
var P=this.group;
B.forEachReversed(this.series,function(Y){Y.cleanGroup(P)
})
}var O=this.chart.theme,V,L,W,G,T=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0,I=(this._vScaler.scale-2*T)/this.series.length;
for(var E=this.series.length-1;
E>=0;
--E){var Q=this.series[E];
if(!this.dirty&&!Q.dirty){continue
}Q.cleanGroup();
var P=Q.group;
if(!Q.fill||!Q.stroke){V=Q.dyn.color=new dojo.Color(O.next("color"))
}L=Q.stroke?Q.stroke:C.augmentStroke(O.series.stroke,V);
W=Q.fill?Q.fill:C.augmentFill(O.series.fill,V);
var R=Math.max(0,this._hScaler.bounds.lower),F=K.l+this._hScaler.scale*(R-this._hScaler.bounds.lower),H=X.height-K.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+T+I*(this.series.length-E-1);
for(var D=0;
D<Q.data.length;
++D){var N=Q.data[D],U=this._hScaler.scale*(N-R),S=I,M=Math.abs(U);
if(M>=1&&S>=1){var J=P.createRect({x:F+(U<0?U:0),y:H-this._vScaler.scale*D,width:M,height:S}).setFill(W).setStroke(L);
Q.dyn.fill=J.getFill();
Q.dyn.stroke=J.getStroke()
}}Q.dirty=false
}this.dirty=false;
return this
}})
})()
};