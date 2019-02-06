dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Stacked"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Default"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Stacked"]){A._hasResource["dojox.charting.plot2d.Stacked"]=true;
A.provide("dojox.charting.plot2d.Stacked");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Default");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,D=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{calculateAxes:function(F){var E=C.collectStackedStats(this.series);
this._maxRunLength=E.hmax;
this._calc(F,E);
return this
},render:function(X,M){var K=B.repeat(this._maxRunLength,"-> 0",0);
for(var F=0;
F<this.series.length;
++F){var T=this.series[F];
for(var E=0;
E<T.data.length;
++E){var P=T.data[E];
if(isNaN(P)){P=0
}K[E]+=P
}}if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var S=this.group;
B.forEachReversed(this.series,function(Y){Y.cleanGroup(S)
})
}var R=this.chart.theme,O,L,V,N;
for(var F=this.series.length-1;
F>=0;
--F){var T=this.series[F];
if(!this.dirty&&!T.dirty){continue
}T.cleanGroup();
var S=T.group,G=A.map(K,function(Y,Z){return{x:this._hScaler.scale*(Z+1-this._hScaler.bounds.lower)+M.l,y:X.height-M.b-this._vScaler.scale*(Y-this._vScaler.bounds.lower)}
},this);
if(!T.fill||!T.stroke){V=new A.Color(R.next("color"))
}if(this.opt.areas){var I=A.clone(G);
I.push({x:G[G.length-1].x,y:X.height-M.b});
I.push({x:G[0].x,y:X.height-M.b});
I.push(G[0]);
var W=T.fill?T.fill:C.augmentFill(R.series.fill,V);
S.createPolyline(I).setFill(W)
}if(this.opt.lines||this.opt.markers){O=T.stroke?C.makeStroke(T.stroke):C.augmentStroke(R.series.stroke,V);
if(T.outline||R.series.outline){L=C.makeStroke(T.outline?T.outline:R.series.outline);
L.width=2*L.width+O.width
}}if(this.opt.markers){N=T.marker?T.marker:R.next("marker")
}if(this.opt.shadows&&O){var H=this.opt.shadows,U=new A.Color([0,0,0,0.3]),J=A.map(G,function(Y){return{x:Y.x+H.dx,y:Y.y+H.dy}
}),Q=A.clone(L?L:O);
Q.color=U;
Q.width+=H.dw?H.dw:0;
if(this.opt.lines){S.createPolyline(J).setStroke(Q)
}if(this.opt.markers){A.forEach(J,function(Y){S.createPath("M"+Y.x+" "+Y.y+" "+N).setStroke(Q).setFill(U)
},this)
}}if(this.opt.lines){if(L){S.createPolyline(G).setStroke(L)
}S.createPolyline(G).setStroke(O)
}if(this.opt.markers){A.forEach(G,function(Z){var Y="M"+Z.x+" "+Z.y+" "+N;
if(L){S.createPath(Y).setStroke(L)
}S.createPath(Y).setStroke(O).setFill(O.color)
},this)
}T.dirty=false;
for(var E=0;
E<T.data.length;
++E){var P=T.data[E];
if(isNaN(P)){P=0
}K[E]-=P
}}this.dirty=false;
return this
}})
})()
}}});