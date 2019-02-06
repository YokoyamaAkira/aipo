if(!dojo._hasResource["dojox.charting.plot2d.Default"]){dojo._hasResource["dojox.charting.plot2d.Default"]=true;
dojo.provide("dojox.charting.plot2d.Default");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Base");
dojo.require("dojox.lang.utils");
dojo.require("dojox.lang.functional");
(function(){var C=dojox.lang.functional,A=dojox.lang.utils,D=dojox.charting.plot2d.common,B=C.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,shadows:0},optionalParams:{},constructor:function(E,F){this.opt=dojo.clone(this.defaultParams);
A.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(E){this._calc(E,D.collectSimpleStats(this.series));
return this
},render:function(G,Q){if(this.dirty){dojo.forEach(this.series,B);
this.cleanGroup();
var K=this.group;
C.forEachReversed(this.series,function(V){V.cleanGroup(K)
})
}var I=this.chart.theme,F,N,R,T;
for(var S=this.series.length-1;
S>=0;
--S){var P=this.series[S];
if(!this.dirty&&!P.dirty){continue
}P.cleanGroup();
if(!P.data.length){P.dirty=false;
continue
}var K=P.group,M;
if(typeof P.data[0]=="number"){M=dojo.map(P.data,function(V,W){return{x:this._hScaler.scale*(W+1-this._hScaler.bounds.lower)+Q.l,y:G.height-Q.b-this._vScaler.scale*(V-this._vScaler.bounds.lower)}
},this)
}else{M=dojo.map(P.data,function(V,W){return{x:this._hScaler.scale*(V.x-this._hScaler.bounds.lower)+Q.l,y:G.height-Q.b-this._vScaler.scale*(V.y-this._vScaler.bounds.lower)}
},this)
}if(!P.fill||!P.stroke){R=P.dyn.color=new dojo.Color(I.next("color"))
}if(this.opt.areas){var L=dojo.clone(M);
L.push({x:M[M.length-1].x,y:G.height-Q.b});
L.push({x:M[0].x,y:G.height-Q.b});
L.push(M[0]);
var E=P.fill?P.fill:D.augmentFill(I.series.fill,R);
P.dyn.fill=K.createPolyline(L).setFill(E).getFill()
}if(this.opt.lines||this.opt.markers){F=P.stroke?D.makeStroke(P.stroke):D.augmentStroke(I.series.stroke,R);
if(P.outline||I.series.outline){N=D.makeStroke(P.outline?P.outline:I.series.outline);
N.width=2*N.width+F.width
}}if(this.opt.markers){T=P.dyn.marker=P.marker?P.marker:I.next("marker")
}if(this.opt.shadows&&F){var U=this.opt.shadows,J=new dojo.Color([0,0,0,0.3]),O=dojo.map(M,function(V){return{x:V.x+U.dx,y:V.y+U.dy}
}),H=dojo.clone(N?N:F);
H.color=J;
H.width+=U.dw?U.dw:0;
if(this.opt.lines){K.createPolyline(O).setStroke(H)
}if(this.opt.markers){dojo.forEach(O,function(V){K.createPath("M"+V.x+" "+V.y+" "+T).setStroke(H).setFill(J)
},this)
}}if(this.opt.lines){if(N){P.dyn.outline=K.createPolyline(M).setStroke(N).getStroke()
}P.dyn.stroke=K.createPolyline(M).setStroke(F).getStroke()
}if(this.opt.markers){dojo.forEach(M,function(W){var V="M"+W.x+" "+W.y+" "+T;
if(N){K.createPath(V).setStroke(N)
}K.createPath(V).setStroke(F).setFill(F.color)
},this)
}P.dirty=false
}this.dirty=false;
return this
}})
})()
};