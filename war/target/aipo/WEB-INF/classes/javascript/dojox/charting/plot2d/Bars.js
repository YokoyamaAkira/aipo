if(!dojo._hasResource["dojox.charting.plot2d.Bars"]){dojo._hasResource["dojox.charting.plot2d.Bars"]=true;
dojo.provide("dojox.charting.plot2d.Bars");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.lang.utils,A=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,shadows:null},optionalParams:{},constructor:function(F,E){this.opt=dojo.clone(this.defaultParams);
B.updateWithObject(this.opt,E);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(G){var F=A.collectSimpleStats(this.series),E;
F.hmin-=0.5;
F.hmax+=0.5;
E=F.hmin,F.hmin=F.vmin,F.vmin=E;
E=F.hmax,F.hmax=F.vmax,F.vmax=E;
this._calc(G,F);
return this
},render:function(S,F){if(this.dirty){dojo.forEach(this.series,C);
this.cleanGroup();
var K=this.group;
D.forEachReversed(this.series,function(Y){Y.cleanGroup(K)
})
}var J=this.chart.theme,Q,G,R,W,O=this.opt.gap<this._vScaler.scale/3?this.opt.gap:0;
for(var U=this.series.length-1;
U>=0;
--U){var L=this.series[U];
if(!this.dirty&&!L.dirty){continue
}L.cleanGroup();
var K=L.group;
if(!L.fill||!L.stroke){Q=L.dyn.color=new dojo.Color(J.next("color"))
}G=L.stroke?L.stroke:A.augmentStroke(J.series.stroke,Q);
R=L.fill?L.fill:A.augmentFill(J.series.fill,Q);
var M=Math.max(0,this._hScaler.bounds.lower),V=F.l+this._hScaler.scale*(M-this._hScaler.bounds.lower),X=S.height-F.b-this._vScaler.scale*(1.5-this._vScaler.bounds.lower)+O;
for(var T=0;
T<L.data.length;
++T){var I=L.data[T],P=this._hScaler.scale*(I-M),N=this._vScaler.scale-2*O,H=Math.abs(P);
if(H>=1&&N>=1){var E=K.createRect({x:V+(P<0?P:0),y:X-this._vScaler.scale*T,width:H,height:N}).setFill(R).setStroke(G);
L.dyn.fill=E.getFill();
L.dyn.stroke=E.getStroke()
}}L.dirty=false
}this.dirty=false;
return this
}})
})()
};