dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Bars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Bars"]){A._hasResource["dojox.charting.plot2d.Bars"]=true;
A.provide("dojox.charting.plot2d.Bars");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Base");
A.require("dojox.lang.utils");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,D=dojox.lang.utils,C=dojox.charting.plot2d.common,E=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(G,F){this.opt=A.clone(this.defaultParams);
D.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(H){var G=C.collectSimpleStats(this.series),F;
G.hmin-=0.5;
G.hmax+=0.5;
F=G.hmin,G.hmin=G.vmin,G.vmin=F;
F=G.hmax,G.hmax=G.vmax,G.vmax=F;
this._calc(H,G);
return this
},render:function(X,K){if(this.dirty){A.forEach(this.series,E);
this.cleanGroup();
var P=this.group;
B.forEachReversed(this.series,function(Z){Z.cleanGroup(P)
})
}var O=this.chart.theme,V,L,W,H,T=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var F=this.series.length-1;
F>=0;
--F){var Q=this.series[F];
if(!this.dirty&&!Q.dirty){continue
}Q.cleanGroup();
var P=Q.group;
if(!Q.fill||!Q.stroke){V=Q.dyn.color=new A.Color(O.next("color"))
}L=Q.stroke?Q.stroke:C.augmentStroke(O.series.stroke,V);
W=Q.fill?Q.fill:C.augmentFill(O.series.fill,V);
var R=Math.max(0,this._hScaler.bounds.lower),G=K.l+this._hScaler.scale*(R-this._hScaler.bounds.lower),I=X.height-K.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+T;
for(var Y=0;
Y<Q.data.length;
++Y){var N=Q.data[Y],U=this._hScaler.scale*(N-R),S=this._vScaler.scale-2*T,M=Math.abs(U);
if(M>=1&&S>=1){var J=P.createRect({x:G+(U<0?U:0),y:I-this._vScaler.scale*Y,width:M,height:S}).setFill(W).setStroke(L);
Q.dyn.fill=J.getFill();
Q.dyn.stroke=J.getStroke()
}}Q.dirty=false
}this.dirty=false;
return this
}})
})()
}}});