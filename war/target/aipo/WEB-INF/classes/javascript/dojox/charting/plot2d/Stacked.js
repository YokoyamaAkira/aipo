if(!dojo._hasResource["dojox.charting.plot2d.Stacked"]){dojo._hasResource["dojox.charting.plot2d.Stacked"]=true;
dojo.provide("dojox.charting.plot2d.Stacked");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{calculateAxes:function(E){var D=A.collectStackedStats(this.series);
this._maxRunLength=D.hmax;
this._calc(E,D);
return this
},render:function(S,H){var F=C.repeat(this._maxRunLength,"-> 0",0);
for(var U=0;
U<this.series.length;
++U){var O=this.series[U];
for(var T=0;
T<O.data.length;
++T){var K=O.data[T];
if(isNaN(K)){K=0
}F[T]+=K
}}if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var N=this.group;
C.forEachReversed(this.series,function(X){X.cleanGroup(N)
})
}var M=this.chart.theme,J,G,Q,I;
for(var U=this.series.length-1;
U>=0;
--U){var O=this.series[U];
if(!this.dirty&&!O.dirty){continue
}O.cleanGroup();
var N=O.group,V=dojo.map(F,function(X,Y){return{x:this._hScaler.scale*(Y+1-this._hScaler.bounds.lower)+H.l,y:S.height-H.b-this._vScaler.scale*(X-this._vScaler.bounds.lower)}
},this);
if(!O.fill||!O.stroke){Q=new dojo.Color(M.next("color"))
}if(this.opt.areas){var D=dojo.clone(V);
D.push({x:V[V.length-1].x,y:S.height-H.b});
D.push({x:V[0].x,y:S.height-H.b});
D.push(V[0]);
var R=O.fill?O.fill:A.augmentFill(M.series.fill,Q);
N.createPolyline(D).setFill(R)
}if(this.opt.lines||this.opt.markers){J=O.stroke?A.makeStroke(O.stroke):A.augmentStroke(M.series.stroke,Q);
if(O.outline||M.series.outline){G=A.makeStroke(O.outline?O.outline:M.series.outline);
G.width=2*G.width+J.width
}}if(this.opt.markers){I=O.marker?O.marker:M.next("marker")
}if(this.opt.shadows&&J){var W=this.opt.shadows,P=new dojo.Color([0,0,0,0.3]),E=dojo.map(V,function(X){return{x:X.x+W.dx,y:X.y+W.dy}
}),L=dojo.clone(G?G:J);
L.color=P;
L.width+=W.dw?W.dw:0;
if(this.opt.lines){N.createPolyline(E).setStroke(L)
}if(this.opt.markers){dojo.forEach(E,function(X){N.createPath("M"+X.x+" "+X.y+" "+I).setStroke(L).setFill(P)
},this)
}}if(this.opt.lines){if(G){N.createPolyline(V).setStroke(G)
}N.createPolyline(V).setStroke(J)
}if(this.opt.markers){dojo.forEach(V,function(Y){var X="M"+Y.x+" "+Y.y+" "+I;
if(G){N.createPath(X).setStroke(G)
}N.createPath(X).setStroke(J).setFill(J.color)
},this)
}O.dirty=false;
for(var T=0;
T<O.data.length;
++T){var K=O.data[T];
if(isNaN(K)){K=0
}F[T]-=K
}}this.dirty=false;
return this
}})
})()
};