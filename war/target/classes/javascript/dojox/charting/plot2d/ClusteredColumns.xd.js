dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.ClusteredColumns"],["require","dojox.charting.plot2d.common"],["require","dojox.charting.plot2d.Columns"],["require","dojox.lang.functional"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.ClusteredColumns"]){A._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
A.provide("dojox.charting.plot2d.ClusteredColumns");
A.require("dojox.charting.plot2d.common");
A.require("dojox.charting.plot2d.Columns");
A.require("dojox.lang.functional");
(function(){var B=dojox.lang.functional,C=dojox.charting.plot2d.common,D=B.lambda("item.purgeGroup()");
A.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(V,J){if(this.dirty){A.forEach(this.series,D);
this.cleanGroup();
var N=this.group;
B.forEachReversed(this.series,function(Z){Z.cleanGroup(N)
})
}var M=this.chart.theme,T,K,U,F,R=this.opt.gap<this._hScaler.scale/3?this.opt.gap:0,H=(this._hScaler.scale-2*R)/this.series.length;
for(var X=0;
X<this.series.length;
++X){var O=this.series[X];
if(!this.dirty&&!O.dirty){continue
}O.cleanGroup();
var N=O.group;
if(!O.fill||!O.stroke){T=O.dyn.color=new A.Color(M.next("color"))
}K=O.stroke?O.stroke:C.augmentStroke(M.series.stroke,T);
U=O.fill?O.fill:C.augmentFill(M.series.fill,T);
var P=Math.max(0,this._vScaler.bounds.lower),E=J.l+this._hScaler.scale*(0.5-this._hScaler.bounds.lower)+R+H*X,G=V.height-J.b-this._vScaler.scale*(P-this._vScaler.bounds.lower);
for(var W=0;
W<O.data.length;
++W){var L=O.data[W],S=H,Q=this._vScaler.scale*(L-P),Y=Math.abs(Q);
if(S>=1&&Y>=1){var I=N.createRect({x:E+this._hScaler.scale*W,y:G-(Q<0?0:Q),width:S,height:Y}).setFill(U).setStroke(K);
O.dyn.fill=I.getFill();
O.dyn.stroke=I.getStroke()
}}O.dirty=false
}this.dirty=false;
return this
}})
})()
}}});