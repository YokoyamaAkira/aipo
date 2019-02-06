dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Columns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Columns"]){A._hasResource["dojox.charting.plot2d.Columns"]=true;
A.provide("dojox.charting.plot2d.Columns");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Base");
A.require("dojox.lang.utils");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,D=dojox.lang.utils,C=dojox.charting.plot2d.common,E=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(G,F){this.opt=A.clone(this.defaultParams);
D.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(G){var F=C.collectSimpleStats(this.series);
F.hmin-=0.5;
F.hmax+=0.5;
this._calc(G,F);
return this
},render:function(W,K){if(this.dirty){A.forEach(this.series,E);
this.cleanGroup();
var O=this.group;
B.forEachReversed(this.series,function(a){a.cleanGroup(O)
})
}var N=this.chart.theme,U,L,V,G,S=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var Y=this.series.length-1;
Y>=0;
--Y){var P=this.series[Y];
if(!this.dirty&&!P.dirty){continue
}P.cleanGroup();
var O=P.group;
if(!P.fill||!P.stroke){U=P.dyn.color=new A.Color(N.next("color"))
}L=P.stroke?P.stroke:C.augmentStroke(N.series.stroke,U);
V=P.fill?P.fill:C.augmentFill(N.series.fill,U);
var Q=Math.max(0,this._vScaler.bounds.lower),F=K.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+S,I=W.height-K.b-this._vScaler.scale*(Q-this._vScaler.bounds.lower);
for(var X=0;
X<P.data.length;
++X){var M=P.data[X],T=this._hScaler.scale-2*S,R=this._vScaler.scale*(M-Q),Z=Math.abs(R);
if(T>=1&&Z>=1){var J={x:F+this._hScaler.scale*X,y:I-(R<0?0:R),width:T,height:Z},H=O.createRect(J).setFill(V).setStroke(L);
P.dyn.fill=H.getFill();
P.dyn.stroke=H.getStroke()
}}P.dirty=false
}this.dirty=false;
return this
}})
})()
}}});