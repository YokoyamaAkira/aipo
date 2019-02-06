if(!dojo._hasResource["dojox.charting.plot2d.StackedBars"]){dojo._hasResource["dojox.charting.plot2d.StackedBars"]=true;
dojo.provide("dojox.charting.plot2d.StackedBars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,A=B.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedBars",dojox.charting.plot2d.Bars,{calculateAxes:function(D){var F=C.collectStackedStats(this.series),E;
this._maxRunLength=F.hmax;
F.hmin-=0.5;
F.hmax+=0.5;
E=F.hmin,F.hmin=F.vmin,F.vmin=E;
E=F.hmax,F.hmax=F.vmax,F.vmax=E;
this._calc(D,F);
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
}var E=this.chart.theme,O,L,K,T,F=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
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
++Q){var I=P[Q],H=this._hScaler.scale*(I-this._hScaler.bounds.lower),J=this._vScaler.scale-2*F;
if(H>=1&&J>=1){var D=G.createRect({x:N.l,y:S.height-N.b-this._vScaler.scale*(Q+1.5-this._vScaler.bounds.lower)+F,width:H,height:J}).setFill(K).setStroke(L);
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