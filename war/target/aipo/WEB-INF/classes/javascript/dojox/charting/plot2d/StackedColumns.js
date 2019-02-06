if(!dojo._hasResource["dojox.charting.plot2d.StackedColumns"]){dojo._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
dojo.provide("dojox.charting.plot2d.StackedColumns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,A=B.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{calculateAxes:function(D){var E=C.collectStackedStats(this.series);
this._maxRunLength=E.hmax;
E.hmin-=0.5;
E.hmax+=0.5;
this._calc(D,E);
return this
},render:function(S,N){var P=B.repeat(this._maxRunLength,"-> 0",0);
for(var R=0;
R<this.series.length;
++R){var M=this.series[R];
for(var Q=0;
Q<M.data.length;
++Q){var I=M.data[Q];
if(isNaN(I)){I=0
}P[Q]+=I
}}if(this.dirty){dojo.forEach(this.series,A);
this.cleanGroup();
var G=this.group;
B.forEachReversed(this.series,function(U){U.cleanGroup(G)
})
}var E=this.chart.theme,O,L,K,T,F=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var R=this.series.length-1;
R>=0;
--R){var M=this.series[R];
if(!this.dirty&&!M.dirty){continue
}M.cleanGroup();
var G=M.group;
if(!M.fill||!M.stroke){O=M.dyn.color=new dojo.Color(E.next("color"))
}L=M.stroke?M.stroke:C.augmentStroke(E.series.stroke,O);
K=M.fill?M.fill:C.augmentFill(E.series.fill,O);
for(var Q=0;
Q<P.length;
++Q){var I=P[Q],H=this._hScaler.scale-2*F,J=this._vScaler.scale*(I-this._vScaler.bounds.lower);
if(H>=1&&J>=1){var D=G.createRect({x:N.l+this._hScaler.scale*(Q+0.5-this._hScaler.bounds.lower)+F,y:S.height-N.b-this._vScaler.scale*(I-this._vScaler.bounds.lower),width:H,height:J}).setFill(K).setStroke(L);
M.dyn.fill=D.getFill();
M.dyn.stroke=D.getStroke()
}}M.dirty=false;
for(var Q=0;
Q<M.data.length;
++Q){var I=M.data[Q];
if(isNaN(I)){I=0
}P[Q]-=I
}}this.dirty=false;
return this
}})
})()
};