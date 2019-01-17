if(!dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]){dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredBars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(S,F){if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var K=this.group;
C.forEachReversed(this.series,function(Y){Y.cleanGroup(K)
})
}var J=this.chart.theme,Q,G,R,W,O=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0,D=(this._vScaler.scale-2*O)/this.series.length;
for(var U=this.series.length-1;
U>=0;
--U){var L=this.series[U];
if(!this.dirty&&!L.dirty){continue
}L.cleanGroup();
var K=L.group;
if(!L.fill||!L.stroke){Q=L.dyn.color=new dojo.Color(J.next("color"))
}G=L.stroke?L.stroke:A.augmentStroke(J.series.stroke,Q);
R=L.fill?L.fill:A.augmentFill(J.series.fill,Q);
var M=Math.max(0,this._hScaler.bounds.lower),V=F.l+this._hScaler.scale*(M-this._hScaler.bounds.lower),X=S.height-F.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+O+D*(this.series.length-U-1);
for(var T=0;
T<L.data.length;
++T){var I=L.data[T],P=this._hScaler.scale*(I-M),N=D,H=Math.abs(P);
if(H>=1&&N>=1){var E=K.createRect({x:V+(P<0?P:0),y:X-this._vScaler.scale*T,width:H,height:N}).setFill(R).setStroke(G);
L.dyn.fill=E.getFill();
L.dyn.stroke=E.getStroke()
}}L.dirty=false
}this.dirty=false;
return this
}})
})()
};