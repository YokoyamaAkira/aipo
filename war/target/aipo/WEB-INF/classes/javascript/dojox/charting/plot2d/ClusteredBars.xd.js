dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.ClusteredBars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Bars"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.ClusteredBars"]){A._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
A.provide("dojox.charting.plot2d.ClusteredBars");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Bars");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,D=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(W,J){if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var O=this.group;
B.forEachReversed(this.series,function(Z){Z.cleanGroup(O)
})
}var N=this.chart.theme,U,K,V,F,S=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0,H=(this._vScaler.scale-2*S)/this.series.length;
for(var Y=this.series.length-1;
Y>=0;
--Y){var P=this.series[Y];
if(!this.dirty&&!P.dirty){continue
}P.cleanGroup();
var O=P.group;
if(!P.fill||!P.stroke){U=P.dyn.color=new A.Color(N.next("color"))
}K=P.stroke?P.stroke:C.augmentStroke(N.series.stroke,U);
V=P.fill?P.fill:C.augmentFill(N.series.fill,U);
var Q=Math.max(0,this._hScaler.bounds.lower),E=J.l+this._hScaler.scale*(Q-this._hScaler.bounds.lower),G=W.height-J.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+S+H*(this.series.length-Y-1);
for(var X=0;
X<P.data.length;
++X){var M=P.data[X],T=this._hScaler.scale*(M-Q),R=H,L=Math.abs(T);
if(L>=1&&R>=1){var I=O.createRect({x:E+(T<0?T:0),y:G-this._vScaler.scale*X,width:L,height:R}).setFill(V).setStroke(K);
P.dyn.fill=I.getFill();
P.dyn.stroke=I.getStroke()
}}P.dirty=false
}this.dirty=false;
return this
}})
})()
}}});