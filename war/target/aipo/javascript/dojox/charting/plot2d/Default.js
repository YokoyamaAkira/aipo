if(!dojo._hasResource["dojox.charting.plot2d.Default"]){dojo._hasResource["dojox.charting.plot2d.Default"]=true;
dojo.provide("dojox.charting.plot2d.Default");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var D=dojox.lang.functional,B=dojox.lang.utils,A=dojox.charting.plot2d.common,C=D.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,shadows:0},optionalParams:{},constructor:function(F,E){this.opt=dojo.clone(this.defaultParams);
B.updateWithObject(this.opt,E);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(E){this._calc(E,A.collectSimpleStats(this.series));
return this
},render:function(M,H){if(this.dirty){dojo.forEach(this.series,C);
this.cleanGroup();
var U=this.group;
D.forEachReversed(this.series,function(V){V.cleanGroup(U)
})
}var T=this.chart.theme,S,E,I,K;
for(var J=this.series.length-1;
J>=0;
--J){var G=this.series[J];
if(!this.dirty&&!G.dirty){continue
}G.cleanGroup();
if(!G.data.length){G.dirty=false;
continue
}var U=G.group,Q;
if(typeof G.data[0]=="number"){Q=dojo.map(G.data,function(V,W){return{x:this._hScaler.scale*(W+1-this._hScaler.bounds.lower)+H.l,y:M.height-H.b-this._vScaler.scale*(V-this._vScaler.bounds.lower)}
},this)
}else{Q=dojo.map(G.data,function(V,W){return{x:this._hScaler.scale*(V.x-this._hScaler.bounds.lower)+H.l,y:M.height-H.b-this._vScaler.scale*(V.y-this._vScaler.bounds.lower)}
},this)
}if(!G.fill||!G.stroke){I=G.dyn.color=new dojo.Color(T.next("color"))
}if(this.opt.areas){var P=dojo.clone(Q);
P.push({x:Q[Q.length-1].x,y:M.height-H.b});
P.push({x:Q[0].x,y:M.height-H.b});
P.push(Q[0]);
var R=G.fill?G.fill:A.augmentFill(T.series.fill,I);
G.dyn.fill=U.createPolyline(P).setFill(R).getFill()
}if(this.opt.lines||this.opt.markers){S=G.stroke?A.makeStroke(G.stroke):A.augmentStroke(T.series.stroke,I);
if(G.outline||T.series.outline){E=A.makeStroke(G.outline?G.outline:T.series.outline);
E.width=2*E.width+S.width
}}if(this.opt.markers){K=G.dyn.marker=G.marker?G.marker:T.next("marker")
}if(this.opt.shadows&&S){var L=this.opt.shadows,O=new dojo.Color([0,0,0,0.3]),F=dojo.map(Q,function(V){return{x:V.x+L.dx,y:V.y+L.dy}
}),N=dojo.clone(E?E:S);
N.color=O;
N.width+=L.dw?L.dw:0;
if(this.opt.lines){U.createPolyline(F).setStroke(N)
}if(this.opt.markers){dojo.forEach(F,function(V){U.createPath("M"+V.x+" "+V.y+" "+K).setStroke(N).setFill(O)
},this)
}}if(this.opt.lines){if(E){G.dyn.outline=U.createPolyline(Q).setStroke(E).getStroke()
}G.dyn.stroke=U.createPolyline(Q).setStroke(S).getStroke()
}if(this.opt.markers){dojo.forEach(Q,function(W){var V="M"+W.x+" "+W.y+" "+K;
if(E){U.createPath(V).setStroke(E)
}U.createPath(V).setStroke(S).setFill(S.color)
},this)
}G.dirty=false
}this.dirty=false;
return this
}})
})()
};