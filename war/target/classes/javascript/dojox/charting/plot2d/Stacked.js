if(!dojo._hasResource["dojox.charting.plot2d.Stacked"]){dojo._hasResource["dojox.charting.plot2d.Stacked"]=true;
dojo.provide("dojox.charting.plot2d.Stacked");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,A=B.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{calculateAxes:function(D){var E=C.collectStackedStats(this.series);
this._maxRunLength=E.hmax;
this._calc(D,E);
return this
},render:function(E,N){var L=B.repeat(this._maxRunLength,"-> 0",0);
for(var G=0;
G<this.series.length;
++G){var U=this.series[G];
for(var F=0;
F<U.data.length;
++F){var Q=U.data[F];
if(isNaN(Q)){Q=0
}L[F]+=Q
}}if(this.dirty){dojo.forEach(this.series,A);
this.cleanGroup();
var T=this.group;
B.forEachReversed(this.series,function(X){X.cleanGroup(T)
})
}var S=this.chart.theme,P,M,W,O;
for(var G=this.series.length-1;
G>=0;
--G){var U=this.series[G];
if(!this.dirty&&!U.dirty){continue
}U.cleanGroup();
var T=U.group,H=dojo.map(L,function(X,Y){return{x:this._hScaler.scale*(Y+1-this._hScaler.bounds.lower)+N.l,y:E.height-N.b-this._vScaler.scale*(X-this._vScaler.bounds.lower)}
},this);
if(!U.fill||!U.stroke){W=new dojo.Color(S.next("color"))
}if(this.opt.areas){var J=dojo.clone(H);
J.push({x:H[H.length-1].x,y:E.height-N.b});
J.push({x:H[0].x,y:E.height-N.b});
J.push(H[0]);
var D=U.fill?U.fill:C.augmentFill(S.series.fill,W);
T.createPolyline(J).setFill(D)
}if(this.opt.lines||this.opt.markers){P=U.stroke?C.makeStroke(U.stroke):C.augmentStroke(S.series.stroke,W);
if(U.outline||S.series.outline){M=C.makeStroke(U.outline?U.outline:S.series.outline);
M.width=2*M.width+P.width
}}if(this.opt.markers){O=U.marker?U.marker:S.next("marker")
}if(this.opt.shadows&&P){var I=this.opt.shadows,V=new dojo.Color([0,0,0,0.3]),K=dojo.map(H,function(X){return{x:X.x+I.dx,y:X.y+I.dy}
}),R=dojo.clone(M?M:P);
R.color=V;
R.width+=I.dw?I.dw:0;
if(this.opt.lines){T.createPolyline(K).setStroke(R)
}if(this.opt.markers){dojo.forEach(K,function(X){T.createPath("M"+X.x+" "+X.y+" "+O).setStroke(R).setFill(V)
},this)
}}if(this.opt.lines){if(M){T.createPolyline(H).setStroke(M)
}T.createPolyline(H).setStroke(P)
}if(this.opt.markers){dojo.forEach(H,function(Y){var X="M"+Y.x+" "+Y.y+" "+O;
if(M){T.createPath(X).setStroke(M)
}T.createPath(X).setStroke(P).setFill(P.color)
},this)
}U.dirty=false;
for(var F=0;
F<U.data.length;
++F){var Q=U.data[F];
if(isNaN(Q)){Q=0
}L[F]-=Q
}}this.dirty=false;
return this
}})
})()
};