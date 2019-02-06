dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Default"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Base"],["require","dojox.lang.utils"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Default"]){A._hasResource["dojox.charting.plot2d.Default"]=true;
A.provide("dojox.charting.plot2d.Default");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Base");
A.require("dojox.lang.utils");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,D=dojox.lang.utils,C=dojox.charting.plot2d.common,E=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,shadows:0},optionalParams:{},constructor:function(G,F){this.opt=A.clone(this.defaultParams);
D.updateWithObject(this.opt,F);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis
},calculateAxes:function(F){this._calc(F,C.collectSimpleStats(this.series));
return this
},render:function(T,O){if(this.dirty){A.forEach(this.series,E);
this.cleanGroup();
var H=this.group;
B.forEachReversed(this.series,function(W){W.cleanGroup(H)
})
}var F=this.chart.theme,V,L,P,R;
for(var Q=this.series.length-1;
Q>=0;
--Q){var N=this.series[Q];
if(!this.dirty&&!N.dirty){continue
}N.cleanGroup();
if(!N.data.length){N.dirty=false;
continue
}var H=N.group,J;
if(typeof N.data[0]=="number"){J=A.map(N.data,function(X,W){return{x:this._hScaler.scale*(W+1-this._hScaler.bounds.lower)+O.l,y:T.height-O.b-this._vScaler.scale*(X-this._vScaler.bounds.lower)}
},this)
}else{J=A.map(N.data,function(X,W){return{x:this._hScaler.scale*(X.x-this._hScaler.bounds.lower)+O.l,y:T.height-O.b-this._vScaler.scale*(X.y-this._vScaler.bounds.lower)}
},this)
}if(!N.fill||!N.stroke){P=N.dyn.color=new A.Color(F.next("color"))
}if(this.opt.areas){var I=A.clone(J);
I.push({x:J[J.length-1].x,y:T.height-O.b});
I.push({x:J[0].x,y:T.height-O.b});
I.push(J[0]);
var K=N.fill?N.fill:C.augmentFill(F.series.fill,P);
N.dyn.fill=H.createPolyline(I).setFill(K).getFill()
}if(this.opt.lines||this.opt.markers){V=N.stroke?C.makeStroke(N.stroke):C.augmentStroke(F.series.stroke,P);
if(N.outline||F.series.outline){L=C.makeStroke(N.outline?N.outline:F.series.outline);
L.width=2*L.width+V.width
}}if(this.opt.markers){R=N.dyn.marker=N.marker?N.marker:F.next("marker")
}if(this.opt.shadows&&V){var S=this.opt.shadows,G=new A.Color([0,0,0,0.3]),M=A.map(J,function(W){return{x:W.x+S.dx,y:W.y+S.dy}
}),U=A.clone(L?L:V);
U.color=G;
U.width+=S.dw?S.dw:0;
if(this.opt.lines){H.createPolyline(M).setStroke(U)
}if(this.opt.markers){A.forEach(M,function(W){H.createPath("M"+W.x+" "+W.y+" "+R).setStroke(U).setFill(G)
},this)
}}if(this.opt.lines){if(L){N.dyn.outline=H.createPolyline(J).setStroke(L).getStroke()
}N.dyn.stroke=H.createPolyline(J).setStroke(V).getStroke()
}if(this.opt.markers){A.forEach(J,function(W){var X="M"+W.x+" "+W.y+" "+R;
if(L){H.createPath(X).setStroke(L)
}H.createPath(X).setStroke(V).setFill(V.color)
},this)
}N.dirty=false
}this.dirty=false;
return this
}})
})()
}}});