if(!dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]){dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredColumns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,A=B.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(W,K){if(this.dirty){dojo.forEach(this.series,A);
this.cleanGroup();
var O=this.group;
B.forEachReversed(this.series,function(Y){Y.cleanGroup(O)
})
}var N=this.chart.theme,U,L,V,G,S=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0,I=(this._hScaler.scale-2*S)/this.series.length;
for(var D=0;
D<this.series.length;
++D){var P=this.series[D];
if(!this.dirty&&!P.dirty){continue
}P.cleanGroup();
var O=P.group;
if(!P.fill||!P.stroke){U=P.dyn.color=new dojo.Color(N.next("color"))
}L=P.stroke?P.stroke:C.augmentStroke(N.series.stroke,U);
V=P.fill?P.fill:C.augmentFill(N.series.fill,U);
var Q=Math.max(0,this._vScaler.bounds.lower),F=K.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+S+I*D,H=W.height-K.b-this._vScaler.scale*(Q-this._vScaler.bounds.lower);
for(var X=0;
X<P.data.length;
++X){var M=P.data[X],T=I,R=this._vScaler.scale*(M-Q),E=Math.abs(R);
if(T>=1&&E>=1){var J=O.createRect({x:F+this._hScaler.scale*X,y:H-(R<0?0:R),width:T,height:E}).setFill(V).setStroke(L);
P.dyn.fill=J.getFill();
P.dyn.stroke=J.getStroke()
}}P.dirty=false
}this.dirty=false;
return this
}})
})()
};