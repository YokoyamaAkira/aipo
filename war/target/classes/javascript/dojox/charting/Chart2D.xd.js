dojo._xdResourceLoaded({depends:[["provide","dojox.charting.Chart2D"],["require","dojox.gfx"],["require","dojox.lang.functional"],["require","dojox.charting.Theme"],["require","dojox.charting.Series"],["require","dojox.charting.axis2d.Default"],["require","dojox.charting.plot2d.Default"],["require","dojox.charting.plot2d.Lines"],["require","dojox.charting.plot2d.Areas"],["require","dojox.charting.plot2d.Markers"],["require","dojox.charting.plot2d.MarkersOnly"],["require","dojox.charting.plot2d.Scatter"],["require","dojox.charting.plot2d.Stacked"],["require","dojox.charting.plot2d.StackedLines"],["require","dojox.charting.plot2d.StackedAreas"],["require","dojox.charting.plot2d.Columns"],["require","dojox.charting.plot2d.StackedColumns"],["require","dojox.charting.plot2d.ClusteredColumns"],["require","dojox.charting.plot2d.Bars"],["require","dojox.charting.plot2d.StackedBars"],["require","dojox.charting.plot2d.ClusteredBars"],["require","dojox.charting.plot2d.Grid"],["require","dojox.charting.plot2d.Pie"]],defineResource:function(A){if(!A._hasResource["dojox.charting.Chart2D"]){A._hasResource["dojox.charting.Chart2D"]=true;
A.provide("dojox.charting.Chart2D");
A.require("dojox.gfx");
A.require("dojox.lang.functional");
A.require("dojox.charting.Theme");
A.require("dojox.charting.Series");
A.require("dojox.charting.axis2d.Default");
A.require("dojox.charting.plot2d.Default");
A.require("dojox.charting.plot2d.Lines");
A.require("dojox.charting.plot2d.Areas");
A.require("dojox.charting.plot2d.Markers");
A.require("dojox.charting.plot2d.MarkersOnly");
A.require("dojox.charting.plot2d.Scatter");
A.require("dojox.charting.plot2d.Stacked");
A.require("dojox.charting.plot2d.StackedLines");
A.require("dojox.charting.plot2d.StackedAreas");
A.require("dojox.charting.plot2d.Columns");
A.require("dojox.charting.plot2d.StackedColumns");
A.require("dojox.charting.plot2d.ClusteredColumns");
A.require("dojox.charting.plot2d.Bars");
A.require("dojox.charting.plot2d.StackedBars");
A.require("dojox.charting.plot2d.ClusteredBars");
A.require("dojox.charting.plot2d.Grid");
A.require("dojox.charting.plot2d.Pie");
(function(){var H=dojox.lang.functional,C=dojox.charting,B=H.lambda("item.clear()"),D=H.lambda("item.purgeGroup()"),G=H.lambda("item.destroy()"),E=H.lambda("item.dirty = false"),F=H.lambda("item.dirty = true");
A.declare("dojox.charting.Chart2D",null,{constructor:function(K,I){if(!I){I={}
}this.margins=I.margins?I.margins:{l:10,t:10,r:10,b:10};
this.stroke=I.stroke;
this.fill=I.fill;
this.theme=null;
this.axes={};
this.stack=[];
this.plots={};
this.series=[];
this.runs={};
this.dirty=true;
this.coords=null;
this.node=A.byId(K);
var J=A.marginBox(K);
this.surface=dojox.gfx.createSurface(this.node,J.w,J.h)
},destroy:function(){A.forEach(this.series,G);
A.forEach(this.stack,G);
H.forIn(this.axes,G)
},getCoords:function(){if(!this.coords){this.coords=A.coords(this.node,true)
}return this.coords
},setTheme:function(I){this.theme=I;
this.dirty=true;
return this
},addAxis:function(I,J){var K;
if(!J||!("type" in J)){K=new C.axis2d.Default(this,J)
}else{K=typeof J.type=="string"?new C.axis2d[J.type](this,J):new J.type(this,J)
}K.name=I;
K.dirty=true;
if(I in this.axes){this.axes[I].destroy()
}this.axes[I]=K;
this.dirty=true;
return this
},addPlot:function(I,J){var K;
if(!J||!("type" in J)){K=new C.plot2d.Default(this,J)
}else{K=typeof J.type=="string"?new C.plot2d[J.type](this,J):new J.type(this,J)
}K.name=I;
K.dirty=true;
if(I in this.plots){this.stack[this.plots[I]].destroy();
this.stack[this.plots[I]]=K
}else{this.plots[I]=this.stack.length;
this.stack.push(K)
}this.dirty=true;
return this
},addSeries:function(I,K,J){var L=new C.Series(this,K,J);
if(I in this.runs){this.series[this.runs[I]].destroy();
this.series[this.runs[I]]=L
}else{this.runs[I]=this.series.length;
this.series.push(L)
}this.dirty=true;
if(!("ymin" in L)&&"min" in L){L.ymin=L.min
}if(!("ymax" in L)&&"max" in L){L.ymax=L.max
}return this
},updateSeries:function(I,K){if(I in this.runs){var M=this.series[this.runs[I]],L=this.stack[this.plots[M.plot]],J;
M.data=K;
M.dirty=true;
if(L.hAxis){J=this.axes[L.hAxis];
if(J.dependOnData()){J.dirty=true;
A.forEach(this.stack,function(N){if(N.hAxis&&N.hAxis==L.hAxis){N.dirty=true
}})
}}else{L.dirty=true
}if(L.vAxis){J=this.axes[L.vAxis];
if(J.dependOnData()){J.dirty=true;
A.forEach(this.stack,function(N){if(N.vAxis&&N.vAxis==L.vAxis){N.dirty=true
}})
}}else{L.dirty=true
}}return this
},resize:function(J,I){var K;
switch(arguments.length){case 0:K=A.marginBox(this.node);
break;
case 1:K=J;
break;
default:K={w:J,h:I};
break
}A.marginBox(this.node,K);
this.surface.setDimensions(K.w,K.h);
this.dirty=true;
this.coords=null;
return this.render()
},render:function(){if(this.dirty){return this.fullRender()
}A.forEach(this.stack,function(I){if(I.dirty||(I.hAxis&&this.axes[I.hAxis].dirty)||(I.vAxis&&this.axes[I.vAxis].dirty)){I.calculateAxes(this.plotArea)
}},this);
H.forEachReversed(this.stack,function(I){I.render(this.dim,this.offsets)
},this);
H.forIn(this.axes,function(I){I.render(this.dim,this.offsets)
},this);
this._makeClean();
if(this.surface.render){this.surface.render()
}return this
},fullRender:function(){this._makeDirty();
A.forEach(this.stack,B);
A.forEach(this.series,D);
H.forIn(this.axes,D);
A.forEach(this.stack,D);
this.surface.clear();
A.forEach(this.series,function(P){if(!(P.plot in this.plots)){var O=new C.plot2d.Default(this,{});
O.name=P.plot;
this.plots[P.plot]=this.stack.length;
this.stack.push(O)
}this.stack[this.plots[P.plot]].addSeries(P)
},this);
A.forEach(this.stack,function(O){if(O.hAxis){O.setAxis(this.axes[O.hAxis])
}if(O.vAxis){O.setAxis(this.axes[O.vAxis])
}},this);
if(!this.theme){this.theme=new dojox.charting.Theme(dojox.charting._def)
}var J=H.foldl(this.stack,"z + plot.getRequiredColors()",0);
this.theme.defineColors({num:J,cache:false});
var N=this.dim=this.surface.getDimensions();
N.width=dojox.gfx.normalizedLength(N.width);
N.height=dojox.gfx.normalizedLength(N.height);
H.forIn(this.axes,B);
A.forEach(this.stack,function(O){O.calculateAxes(N)
});
var K=this.offsets={l:0,r:0,t:0,b:0};
H.forIn(this.axes,function(O){H.forIn(O.getOffsets(),function(Q,P){K[P]+=Q
})
});
H.forIn(this.margins,function(P,O){K[O]+=P
});
this.plotArea={width:N.width-K.l-K.r,height:N.height-K.t-K.b};
H.forIn(this.axes,B);
A.forEach(this.stack,function(O){O.calculateAxes(this.plotArea)
},this);
var I=this.theme,M=this.fill?this.fill:(I.chart&&I.chart.fill),L=this.stroke?this.stroke:(I.chart&&I.chart.stroke);
if(M){this.surface.createRect({width:N.width,height:N.height}).setFill(M)
}if(L){this.surface.createRect({width:N.width-1,height:N.height-1}).setStroke(L)
}M=I.plotarea&&I.plotarea.fill;
L=I.plotarea&&I.plotarea.stroke;
if(M){this.surface.createRect({x:K.l,y:K.t,width:N.width-K.l-K.r,height:N.height-K.t-K.b}).setFill(M)
}if(L){this.surface.createRect({x:K.l,y:K.t,width:N.width-K.l-K.r-1,height:N.height-K.t-K.b-1}).setStroke(L)
}H.foldr(this.stack,function(P,O){return O.render(N,K),0
},0);
H.forIn(this.axes,function(O){O.render(N,K)
});
this._makeClean();
return this
},_makeClean:function(){A.forEach(this.axes,E);
A.forEach(this.stack,E);
A.forEach(this.series,E);
this.dirty=false
},_makeDirty:function(){A.forEach(this.axes,F);
A.forEach(this.stack,F);
A.forEach(this.series,F);
this.dirty=true
}})
})()
}}});