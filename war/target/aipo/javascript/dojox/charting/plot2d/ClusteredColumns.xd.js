dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.ClusteredColumns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Columns"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.ClusteredColumns"]){A._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
A.provide("dojox.charting.plot2d.ClusteredColumns");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Columns");
A.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(S,G){if(this.dirty){A.forEach(this.series,C);
this.cleanGroup();
var K=this.group;
D.forEachReversed(this.series,function(Z){Z.cleanGroup(K)
})
}var J=this.chart.theme,Q,H,R,X,O=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0,E=(this._hScaler.scale-2*O)/this.series.length;
for(var U=0;
U<this.series.length;
++U){var L=this.series[U];
if(!this.dirty&&!L.dirty){continue
}L.cleanGroup();
var K=L.group;
if(!L.fill||!L.stroke){Q=L.dyn.color=new A.Color(J.next("color"))
}H=L.stroke?L.stroke:B.augmentStroke(J.series.stroke,Q);
R=L.fill?L.fill:B.augmentFill(J.series.fill,Q);
var M=Math.max(0,this._vScaler.bounds.lower),W=G.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+O+E*U,Y=S.height-G.b-this._vScaler.scale*(M-this._vScaler.bounds.lower);
for(var T=0;
T<L.data.length;
++T){var I=L.data[T],P=E,N=this._vScaler.scale*(I-M),V=Math.abs(N);
if(P>=1&&V>=1){var F=K.createRect({x:W+this._hScaler.scale*T,y:Y-(N<0?0:N),width:P,height:V}).setFill(R).setStroke(H);
L.dyn.fill=F.getFill();
L.dyn.stroke=F.getStroke()
}}L.dirty=false
}this.dirty=false;
return this
}})
})()
}}});