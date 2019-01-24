dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Columns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Columns"]){A._hasResource["dojox.charting.plot2d.Columns"]=true;
A.provide("dojox.charting.plot2d.Columns");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Base");
A.require("dojox.lang.utils");
A.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,C=dojox.lang.utils,B=dojox.charting.plot2d.common,D=E.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(G,F){this.opt=A.clone(this.defaultParams);
C.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(G){var F=B.collectSimpleStats(this.series);
F.hmin-=0.5;
F.hmax+=0.5;
this._calc(G,F);
return this
},render:function(T,H){if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var L=this.group;
E.forEachReversed(this.series,function(a){a.cleanGroup(L)
})
}var K=this.chart.theme,R,I,S,Y,P=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var V=this.series.length-1;
V>=0;
--V){var M=this.series[V];
if(!this.dirty&&!M.dirty){continue
}M.cleanGroup();
var L=M.group;
if(!M.fill||!M.stroke){R=M.dyn.color=new A.Color(K.next("color"))
}I=M.stroke?M.stroke:B.augmentStroke(K.series.stroke,R);
S=M.fill?M.fill:B.augmentFill(K.series.fill,R);
var N=Math.max(0,this._vScaler.bounds.lower),X=H.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+P,Z=T.height-H.b-this._vScaler.scale*(N-this._vScaler.bounds.lower);
for(var U=0;
U<M.data.length;
++U){var J=M.data[U],Q=this._hScaler.scale-2*P,O=this._vScaler.scale*(J-N),W=Math.abs(O);
if(Q>=1&&W>=1){var G={x:X+this._hScaler.scale*U,y:Z-(O<0?0:O),width:Q,height:W},F=L.createRect(G).setFill(S).setStroke(I);
M.dyn.fill=F.getFill();
M.dyn.stroke=F.getStroke()
}}M.dirty=false
}this.dirty=false;
return this
}})
})()
}}});