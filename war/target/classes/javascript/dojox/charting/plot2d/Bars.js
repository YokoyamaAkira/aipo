if(!dojo._hasResource["dojox.charting.plot2d.Bars"]){dojo._hasResource["dojox.charting.plot2d.Bars"]=true;
dojo.provide("dojox.charting.plot2d.Bars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.lang.utils,D=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(E,F){this.opt=dojo.clone(this.defaultParams);
A.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(E){var G=D.collectSimpleStats(this.series),F;
G.hmin-=0.5;
G.hmax+=0.5;
F=G.hmin,G.hmin=G.vmin,G.vmin=F;
F=G.hmax,G.hmax=G.vmax,G.vmax=F;
this._calc(E,G);
return this
},render:function(E,L){if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var Q=this.group;
C.forEachReversed(this.series,function(Y){Y.cleanGroup(Q)
})
}var P=this.chart.theme,W,M,X,I,U=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var G=this.series.length-1;
G>=0;
--G){var R=this.series[G];
if(!this.dirty&&!R.dirty){continue
}R.cleanGroup();
var Q=R.group;
if(!R.fill||!R.stroke){W=R.dyn.color=new dojo.Color(P.next("color"))
}M=R.stroke?R.stroke:D.augmentStroke(P.series.stroke,W);
X=R.fill?R.fill:D.augmentFill(P.series.fill,W);
var S=Math.max(0,this._hScaler.bounds.lower),H=L.l+this._hScaler.scale*(S-this._hScaler.bounds.lower),J=E.height-L.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+U;
for(var F=0;
F<R.data.length;
++F){var O=R.data[F],V=this._hScaler.scale*(O-S),T=this._vScaler.scale-2*U,N=Math.abs(V);
if(N>=1&&T>=1){var K=Q.createRect({x:H+(V<0?V:0),y:J-this._vScaler.scale*F,width:N,height:T}).setFill(X).setStroke(M);
R.dyn.fill=K.getFill();
R.dyn.stroke=K.getStroke()
}}R.dirty=false
}this.dirty=false;
return this
}})
})()
};