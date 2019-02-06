dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.ClusteredBars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Bars"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.ClusteredBars"]){A._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
A.provide("dojox.charting.plot2d.ClusteredBars");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Bars");
A.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(T,G){if(this.dirty){A.forEach(this.series,C);
this.cleanGroup();
var L=this.group;
D.forEachReversed(this.series,function(Z){Z.cleanGroup(L)
})
}var K=this.chart.theme,R,H,S,X,P=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0,E=(this._vScaler.scale-2*P)/this.series.length;
for(var V=this.series.length-1;
V>=0;
--V){var M=this.series[V];
if(!this.dirty&&!M.dirty){continue
}M.cleanGroup();
var L=M.group;
if(!M.fill||!M.stroke){R=M.dyn.color=new A.Color(K.next("color"))
}H=M.stroke?M.stroke:B.augmentStroke(K.series.stroke,R);
S=M.fill?M.fill:B.augmentFill(K.series.fill,R);
var N=Math.max(0,this._hScaler.bounds.lower),W=G.l+this._hScaler.scale*(N-this._hScaler.bounds.lower),Y=T.height-G.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+P+E*(this.series.length-V-1);
for(var U=0;
U<M.data.length;
++U){var J=M.data[U],Q=this._hScaler.scale*(J-N),O=E,I=Math.abs(Q);
if(I>=1&&O>=1){var F=L.createRect({x:W+(Q<0?Q:0),y:Y-this._vScaler.scale*U,width:I,height:O}).setFill(S).setStroke(H);
M.dyn.fill=F.getFill();
M.dyn.stroke=F.getStroke()
}}M.dirty=false
}this.dirty=false;
return this
}})
})()
}}});