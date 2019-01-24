dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Bars"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Bars"]){A._hasResource["dojox.charting.plot2d.Bars"]=true;
A.provide("dojox.charting.plot2d.Bars");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Base");
A.require("dojox.lang.utils");
A.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,C=dojox.lang.utils,B=dojox.charting.plot2d.common,D=E.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(G,F){this.opt=A.clone(this.defaultParams);
C.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(H){var G=B.collectSimpleStats(this.series),F;
G.hmin-=0.5;
G.hmax+=0.5;
F=G.hmin,G.hmin=G.vmin,G.vmin=F;
F=G.hmax,G.hmax=G.vmax,G.vmax=F;
this._calc(H,G);
return this
},render:function(T,G){if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var L=this.group;
E.forEachReversed(this.series,function(Z){Z.cleanGroup(L)
})
}var K=this.chart.theme,R,H,S,X,P=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var V=this.series.length-1;
V>=0;
--V){var M=this.series[V];
if(!this.dirty&&!M.dirty){continue
}M.cleanGroup();
var L=M.group;
if(!M.fill||!M.stroke){R=M.dyn.color=new A.Color(K.next("color"))
}H=M.stroke?M.stroke:B.augmentStroke(K.series.stroke,R);
S=M.fill?M.fill:B.augmentFill(K.series.fill,R);
var N=Math.max(0,this._hScaler.bounds.lower),W=G.l+this._hScaler.scale*(N-this._hScaler.bounds.lower),Y=T.height-G.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+P;
for(var U=0;
U<M.data.length;
++U){var J=M.data[U],Q=this._hScaler.scale*(J-N),O=this._vScaler.scale-2*P,I=Math.abs(Q);
if(I>=1&&O>=1){var F=L.createRect({x:W+(Q<0?Q:0),y:Y-this._vScaler.scale*U,width:I,height:O}).setFill(S).setStroke(H);
M.dyn.fill=F.getFill();
M.dyn.stroke=F.getStroke()
}}M.dirty=false
}this.dirty=false;
return this
}})
})()
}}});