dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.StackedBars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Bars"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.StackedBars"]){A._hasResource["dojox.charting.plot2d.StackedBars"]=true;
A.provide("dojox.charting.plot2d.StackedBars");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Bars");
A.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.StackedBars",dojox.charting.plot2d.Bars,{calculateAxes:function(G){var F=B.collectStackedStats(this.series),E;
this._maxRunLength=F.hmax;
F.hmin-=0.5;
F.hmax+=0.5;
E=F.hmin,F.hmin=F.vmin,F.vmin=E;
E=F.hmax,F.hmax=F.vmax,F.vmax=E;
this._calc(G,F);
return this
},render:function(L,G){var I=D.repeat(this._maxRunLength,"-> 0",0);
for(var K=0;
K<this.series.length;
++K){var F=this.series[K];
for(var J=0;
J<F.data.length;
++J){var P=F.data[J];
if(isNaN(P)){P=0
}I[J]+=P
}}if(this.dirty){A.forEach(this.series,C);
this.cleanGroup();
var U=this.group;
D.forEachReversed(this.series,function(V){V.cleanGroup(U)
})
}var T=this.chart.theme,H,S,R,M,O=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var K=this.series.length-1;
K>=0;
--K){var F=this.series[K];
if(!this.dirty&&!F.dirty){continue
}F.cleanGroup();
var U=F.group;
if(!F.fill||!F.stroke){H=F.dyn.color=new A.Color(T.next("color"))
}S=F.stroke?F.stroke:B.augmentStroke(T.series.stroke,H);
R=F.fill?F.fill:B.augmentFill(T.series.fill,H);
for(var J=0;
J<I.length;
++J){var P=I[J],E=this._hScaler.scale*(P-this._hScaler.bounds.lower),Q=this._vScaler.scale-2*O;
if(E>=1&&Q>=1){var N=U.createRect({x:G.l,y:L.height-G.b-this._vScaler.scale*(J+1.5-this._vScaler.bounds.lower)+O,width:E,height:Q}).setFill(R).setStroke(S);
F.dyn.fill=N.getFill();
F.dyn.stroke=N.getStroke()
}}F.dirty=false;
for(var J=0;
J<F.data.length;
++J){var P=F.data[J];
if(isNaN(P)){P=0
}I[J]-=P
}}this.dirty=false;
return this
}})
})()
}}});