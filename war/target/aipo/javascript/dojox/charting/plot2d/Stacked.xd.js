dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Stacked"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Default"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Stacked"]){A._hasResource["dojox.charting.plot2d.Stacked"]=true;
A.provide("dojox.charting.plot2d.Stacked");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Default");
A.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{calculateAxes:function(F){var E=B.collectStackedStats(this.series);
this._maxRunLength=E.hmax;
this._calc(F,E);
return this
},render:function(T,I){var G=D.repeat(this._maxRunLength,"-> 0",0);
for(var V=0;
V<this.series.length;
++V){var P=this.series[V];
for(var U=0;
U<P.data.length;
++U){var L=P.data[U];
if(isNaN(L)){L=0
}G[U]+=L
}}if(this.dirty){A.forEach(this.series,C);
this.cleanGroup();
var O=this.group;
D.forEachReversed(this.series,function(Y){Y.cleanGroup(O)
})
}var N=this.chart.theme,K,H,R,J;
for(var V=this.series.length-1;
V>=0;
--V){var P=this.series[V];
if(!this.dirty&&!P.dirty){continue
}P.cleanGroup();
var O=P.group,W=A.map(G,function(Y,Z){return{x:this._hScaler.scale*(Z+1-this._hScaler.bounds.lower)+I.l,y:T.height-I.b-this._vScaler.scale*(Y-this._vScaler.bounds.lower)}
},this);
if(!P.fill||!P.stroke){R=new A.Color(N.next("color"))
}if(this.opt.areas){var E=A.clone(W);
E.push({x:W[W.length-1].x,y:T.height-I.b});
E.push({x:W[0].x,y:T.height-I.b});
E.push(W[0]);
var S=P.fill?P.fill:B.augmentFill(N.series.fill,R);
O.createPolyline(E).setFill(S)
}if(this.opt.lines||this.opt.markers){K=P.stroke?B.makeStroke(P.stroke):B.augmentStroke(N.series.stroke,R);
if(P.outline||N.series.outline){H=B.makeStroke(P.outline?P.outline:N.series.outline);
H.width=2*H.width+K.width
}}if(this.opt.markers){J=P.marker?P.marker:N.next("marker")
}if(this.opt.shadows&&K){var X=this.opt.shadows,Q=new A.Color([0,0,0,0.3]),F=A.map(W,function(Y){return{x:Y.x+X.dx,y:Y.y+X.dy}
}),M=A.clone(H?H:K);
M.color=Q;
M.width+=X.dw?X.dw:0;
if(this.opt.lines){O.createPolyline(F).setStroke(M)
}if(this.opt.markers){A.forEach(F,function(Y){O.createPath("M"+Y.x+" "+Y.y+" "+J).setStroke(M).setFill(Q)
},this)
}}if(this.opt.lines){if(H){O.createPolyline(W).setStroke(H)
}O.createPolyline(W).setStroke(K)
}if(this.opt.markers){A.forEach(W,function(Z){var Y="M"+Z.x+" "+Z.y+" "+J;
if(H){O.createPath(Y).setStroke(H)
}O.createPath(Y).setStroke(K).setFill(K.color)
},this)
}P.dirty=false;
for(var U=0;
U<P.data.length;
++U){var L=P.data[U];
if(isNaN(L)){L=0
}G[U]-=L
}}this.dirty=false;
return this
}})
})()
}}});