if(!dojo._hasResource["dojox.charting.plot2d.Columns"]){dojo._hasResource["dojox.charting.plot2d.Columns"]=true;
dojo.provide("dojox.charting.plot2d.Columns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.lang.utils,D=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(E,F){this.opt=dojo.clone(this.defaultParams);
A.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(E){var F=D.collectSimpleStats(this.series);
F.hmin-=0.5;
F.hmax+=0.5;
this._calc(E,F);
return this
},render:function(X,L){if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var P=this.group;
C.forEachReversed(this.series,function(Z){Z.cleanGroup(P)
})
}var O=this.chart.theme,V,M,W,H,T=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var E=this.series.length-1;
E>=0;
--E){var Q=this.series[E];
if(!this.dirty&&!Q.dirty){continue
}Q.cleanGroup();
var P=Q.group;
if(!Q.fill||!Q.stroke){V=Q.dyn.color=new dojo.Color(O.next("color"))
}M=Q.stroke?Q.stroke:D.augmentStroke(O.series.stroke,V);
W=Q.fill?Q.fill:D.augmentFill(O.series.fill,V);
var R=Math.max(0,this._vScaler.bounds.lower),G=L.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+T,J=X.height-L.b-this._vScaler.scale*(R-this._vScaler.bounds.lower);
for(var Y=0;
Y<Q.data.length;
++Y){var N=Q.data[Y],U=this._hScaler.scale-2*T,S=this._vScaler.scale*(N-R),F=Math.abs(S);
if(U>=1&&F>=1){var K={x:G+this._hScaler.scale*Y,y:J-(S<0?0:S),width:U,height:F},I=P.createRect(K).setFill(W).setStroke(M);
Q.dyn.fill=I.getFill();
Q.dyn.stroke=I.getStroke()
}}Q.dirty=false
}this.dirty=false;
return this
}})
})()
};