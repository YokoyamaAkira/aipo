if(!dojo._hasResource["dojox.charting.plot2d.StackedBars"]){dojo._hasResource["dojox.charting.plot2d.StackedBars"]=true;
dojo.provide("dojox.charting.plot2d.StackedBars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedBars",dojox.charting.plot2d.Bars,{calculateAxes:function(F){var E=A.collectStackedStats(this.series),D;
this._maxRunLength=E.hmax;
E.hmin-=0.5;
E.hmax+=0.5;
D=E.hmin,E.hmin=E.vmin,E.vmin=D;
D=E.hmax,E.hmax=E.vmax,E.vmax=D;
this._calc(F,E);
return this
},render:function(K,F){var H=C.repeat(this._maxRunLength,"-> 0",0);
for(var J=0;
J<this.series.length;
++J){var E=this.series[J];
for(var I=0;
I<E.data.length;
++I){var O=E.data[I];
if(isNaN(O)){O=0
}H[I]+=O
}}if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var T=this.group;
C.forEachReversed(this.series,function(U){U.cleanGroup(T)
})
}var S=this.chart.theme,G,R,Q,L,N=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var J=this.series.length-1;
J>=0;
--J){var E=this.series[J];
if(!this.dirty&&!E.dirty){continue
}E.cleanGroup();
var T=E.group;
if(!E.fill||!E.stroke){G=E.dyn.color=new dojo.Color(S.next("color"))
}R=E.stroke?E.stroke:A.augmentStroke(S.series.stroke,G);
Q=E.fill?E.fill:A.augmentFill(S.series.fill,G);
for(var I=0;
I<H.length;
++I){var O=H[I],D=this._hScaler.scale*(O-this._hScaler.bounds.lower),P=this._vScaler.scale-2*N;
if(D>=1&&P>=1){var M=T.createRect({x:F.l,y:K.height-F.b-this._vScaler.scale*(I+1.5-this._vScaler.bounds.lower)+N,width:D,height:P}).setFill(Q).setStroke(R);
E.dyn.fill=M.getFill();
E.dyn.stroke=M.getStroke()
}}E.dirty=false;
for(var I=0;
I<E.data.length;
++I){var O=E.data[I];
if(isNaN(O)){O=0
}H[I]-=O
}}this.dirty=false;
return this
}})
})()
};