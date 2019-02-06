dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.StackedColumns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Columns"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.StackedColumns"]){A._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
A.provide("dojox.charting.plot2d.StackedColumns");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Columns");
A.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{calculateAxes:function(F){var E=B.collectStackedStats(this.series);
this._maxRunLength=E.hmax;
E.hmin-=0.5;
E.hmax+=0.5;
this._calc(F,E);
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
}var T=this.chart.theme,H,S,R,M,O=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
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
++J){var P=I[J],E=this._hScaler.scale-2*O,Q=this._vScaler.scale*(P-this._vScaler.bounds.lower);
if(E>=1&&Q>=1){var N=U.createRect({x:G.l+this._hScaler.scale*(J+0.5-this._hScaler.bounds.lower)+O,y:L.height-G.b-this._vScaler.scale*(P-this._vScaler.bounds.lower),width:E,height:Q}).setFill(R).setStroke(S);
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