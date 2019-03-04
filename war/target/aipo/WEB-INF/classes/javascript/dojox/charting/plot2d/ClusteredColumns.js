if(!dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]){dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredColumns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(R,F){if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var J=this.group;
C.forEachReversed(this.series,function(Y){Y.cleanGroup(J)
})
}var I=this.chart.theme,P,G,Q,W,N=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0,D=(this._hScaler.scale-2*N)/this.series.length;
for(var T=0;
T<this.series.length;
++T){var K=this.series[T];
if(!this.dirty&&!K.dirty){continue
}K.cleanGroup();
var J=K.group;
if(!K.fill||!K.stroke){P=K.dyn.color=new dojo.Color(I.next("color"))
}G=K.stroke?K.stroke:A.augmentStroke(I.series.stroke,P);
Q=K.fill?K.fill:A.augmentFill(I.series.fill,P);
var L=Math.max(0,this._vScaler.bounds.lower),V=F.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+N+D*T,X=R.height-F.b-this._vScaler.scale*(L-this._vScaler.bounds.lower);
for(var S=0;
S<K.data.length;
++S){var H=K.data[S],O=D,M=this._vScaler.scale*(H-L),U=Math.abs(M);
if(O>=1&&U>=1){var E=J.createRect({x:V+this._hScaler.scale*S,y:X-(M<0?0:M),width:O,height:U}).setFill(Q).setStroke(G);
K.dyn.fill=E.getFill();
K.dyn.stroke=E.getStroke()
}}K.dirty=false
}this.dirty=false;
return this
}})
})()
};