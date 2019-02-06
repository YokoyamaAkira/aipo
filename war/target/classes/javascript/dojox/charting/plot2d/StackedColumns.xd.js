dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.StackedColumns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Columns"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.StackedColumns"]){A._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
A.provide("dojox.charting.plot2d.StackedColumns");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Columns");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,D=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{calculateAxes:function(F){var E=C.collectStackedStats(this.series);
this._maxRunLength=E.hmax;
E.hmin-=0.5;
E.hmax+=0.5;
this._calc(F,E);
return this
},render:function(S,N){var P=B.repeat(this._maxRunLength,"-> 0",0);
for(var R=0;
R<this.series.length;
++R){var M=this.series[R];
for(var Q=0;
Q<M.data.length;
++Q){var H=M.data[Q];
if(isNaN(H)){H=0
}P[Q]+=H
}}if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var G=this.group;
B.forEachReversed(this.series,function(V){V.cleanGroup(G)
})
}var E=this.chart.theme,O,K,J,T,F=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var R=this.series.length-1;
R>=0;
--R){var M=this.series[R];
if(!this.dirty&&!M.dirty){continue
}M.cleanGroup();
var G=M.group;
if(!M.fill||!M.stroke){O=M.dyn.color=new A.Color(E.next("color"))
}K=M.stroke?M.stroke:C.augmentStroke(E.series.stroke,O);
J=M.fill?M.fill:C.augmentFill(E.series.fill,O);
for(var Q=0;
Q<P.length;
++Q){var H=P[Q],L=this._hScaler.scale-2*F,I=this._vScaler.scale*(H-this._vScaler.bounds.lower);
if(L>=1&&I>=1){var U=G.createRect({x:N.l+this._hScaler.scale*(Q+0.5-this._hScaler.bounds.lower)+F,y:S.height-N.b-this._vScaler.scale*(H-this._vScaler.bounds.lower),width:L,height:I}).setFill(J).setStroke(K);
M.dyn.fill=U.getFill();
M.dyn.stroke=U.getStroke()
}}M.dirty=false;
for(var Q=0;
Q<M.data.length;
++Q){var H=M.data[Q];
if(isNaN(H)){H=0
}P[Q]-=H
}}this.dirty=false;
return this
}})
})()
}}});