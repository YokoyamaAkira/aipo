dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Default"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Default"]){A._hasResource["dojox.charting.plot2d.Default"]=true;
A.provide("dojox.charting.plot2d.Default");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Base");
A.require("dojox.lang.utils");
A.require("dojox.lang.functional");
(function(){var E=dojox.lang.functional,C=dojox.lang.utils,B=dojox.charting.plot2d.common,D=E.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,shadows:0},optionalParams:{},constructor:function(G,F){this.opt=A.clone(this.defaultParams);
C.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(F){this._calc(F,B.collectSimpleStats(this.series));
return this
},render:function(N,I){if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var V=this.group;
E.forEachReversed(this.series,function(W){W.cleanGroup(V)
})
}var U=this.chart.theme,T,F,J,L;
for(var K=this.series.length-1;
K>=0;
--K){var H=this.series[K];
if(!this.dirty&&!H.dirty){continue
}H.cleanGroup();
if(!H.data.length){H.dirty=false;
continue
}var V=H.group,R;
if(typeof H.data[0]=="number"){R=A.map(H.data,function(W,X){return{x:this._hScaler.scale*(X+1-this._hScaler.bounds.lower)+I.l,y:N.height-I.b-this._vScaler.scale*(W-this._vScaler.bounds.lower)}
},this)
}else{R=A.map(H.data,function(W,X){return{x:this._hScaler.scale*(W.x-this._hScaler.bounds.lower)+I.l,y:N.height-I.b-this._vScaler.scale*(W.y-this._vScaler.bounds.lower)}
},this)
}if(!H.fill||!H.stroke){J=H.dyn.color=new A.Color(U.next("color"))
}if(this.opt.areas){var Q=A.clone(R);
Q.push({x:R[R.length-1].x,y:N.height-I.b});
Q.push({x:R[0].x,y:N.height-I.b});
Q.push(R[0]);
var S=H.fill?H.fill:B.augmentFill(U.series.fill,J);
H.dyn.fill=V.createPolyline(Q).setFill(S).getFill()
}if(this.opt.lines||this.opt.markers){T=H.stroke?B.makeStroke(H.stroke):B.augmentStroke(U.series.stroke,J);
if(H.outline||U.series.outline){F=B.makeStroke(H.outline?H.outline:U.series.outline);
F.width=2*F.width+T.width
}}if(this.opt.markers){L=H.dyn.marker=H.marker?H.marker:U.next("marker")
}if(this.opt.shadows&&T){var M=this.opt.shadows,P=new A.Color([0,0,0,0.3]),G=A.map(R,function(W){return{x:W.x+M.dx,y:W.y+M.dy}
}),O=A.clone(F?F:T);
O.color=P;
O.width+=M.dw?M.dw:0;
if(this.opt.lines){V.createPolyline(G).setStroke(O)
}if(this.opt.markers){A.forEach(G,function(W){V.createPath("M"+W.x+" "+W.y+" "+L).setStroke(O).setFill(P)
},this)
}}if(this.opt.lines){if(F){H.dyn.outline=V.createPolyline(R).setStroke(F).getStroke()
}H.dyn.stroke=V.createPolyline(R).setStroke(T).getStroke()
}if(this.opt.markers){A.forEach(R,function(X){var W="M"+X.x+" "+X.y+" "+L;
if(F){V.createPath(W).setStroke(F)
}V.createPath(W).setStroke(T).setFill(T.color)
},this)
}H.dirty=false
}this.dirty=false;
return this
}})
})()
}}});