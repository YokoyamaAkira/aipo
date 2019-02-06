if(!dojo._hasResource["dojox.charting.plot2d.Columns"]){dojo._hasResource["dojox.charting.plot2d.Columns"]=true;
dojo.provide("dojox.charting.plot2d.Columns");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.lang.utils,A=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(F,E){this.opt=dojo.clone(this.defaultParams);
B.updateWithObject(this.opt,E);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(F){var E=A.collectSimpleStats(this.series);
E.hmin-=0.5;
E.hmax+=0.5;
this._calc(F,E);
return this
},render:function(S,G){if(this.dirty){dojo.forEach(this.series,C);
this.cleanGroup();
var K=this.group;
D.forEachReversed(this.series,function(Z){Z.cleanGroup(K)
})
}var J=this.chart.theme,Q,H,R,X,O=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0;
for(var U=this.series.length-1;
U>=0;
--U){var L=this.series[U];
if(!this.dirty&&!L.dirty){continue
}L.cleanGroup();
var K=L.group;
if(!L.fill||!L.stroke){Q=L.dyn.color=new dojo.Color(J.next("color"))
}H=L.stroke?L.stroke:A.augmentStroke(J.series.stroke,Q);
R=L.fill?L.fill:A.augmentFill(J.series.fill,Q);
var M=Math.max(0,this._vScaler.bounds.lower),W=G.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+O,Y=S.height-G.b-this._vScaler.scale*(M-this._vScaler.bounds.lower);
for(var T=0;
T<L.data.length;
++T){var I=L.data[T],P=this._hScaler.scale-2*O,N=this._vScaler.scale*(I-M),V=Math.abs(N);
if(P>=1&&V>=1){var F={x:W+this._hScaler.scale*T,y:Y-(N<0?0:N),width:P,height:V},E=K.createRect(F).setFill(R).setStroke(H);
L.dyn.fill=E.getFill();
L.dyn.stroke=E.getStroke()
}}L.dirty=false
}this.dirty=false;
return this
}})
})()
};