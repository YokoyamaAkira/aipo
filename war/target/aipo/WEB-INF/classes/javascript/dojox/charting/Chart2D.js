if(!dojo._hasResource["dojox.charting.Chart2D"]){dojo._hasResource["dojox.charting.Chart2D"]=true;
dojo.provide("dojox.charting.Chart2D");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
dojo.require("dojox.charting.Theme");
dojo.require("dojox.charting.Series");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojox.charting.plot2d.Lines");
dojo.require("dojox.charting.plot2d.Areas");
dojo.require("dojox.charting.plot2d.Markers");
dojo.require("dojox.charting.plot2d.MarkersOnly");
dojo.require("dojox.charting.plot2d.Scatter");
dojo.require("dojox.charting.plot2d.Stacked");
dojo.require("dojox.charting.plot2d.StackedLines");
dojo.require("dojox.charting.plot2d.StackedAreas");
dojo.require("dojox.charting.plot2d.Columns");
dojo.require("dojox.charting.plot2d.StackedColumns");
dojo.require("dojox.charting.plot2d.ClusteredColumns");
dojo.require("dojox.charting.plot2d.Bars");
dojo.require("dojox.charting.plot2d.StackedBars");
dojo.require("dojox.charting.plot2d.ClusteredBars");
dojo.require("dojox.charting.plot2d.Grid");
dojo.require("dojox.charting.plot2d.Pie");
(function(){var D=dojox.lang.functional,F=dojox.charting,E=D.lambda("item.clear()"),G=D.lambda("item.purgeGroup()"),C=D.lambda("item.destroy()"),A=D.lambda("item.dirty = false"),B=D.lambda("item.dirty = true");
dojo.declare("dojox.charting.Chart2D",null,{constructor:function(H,I){if(!I){I={}
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
this.node=dojo.byId(H);
var J=dojo.marginBox(H);
this.surface=dojox.gfx.createSurface(this.node,J.w,J.h)
},destroy:function(){dojo.forEach(this.series,C);
dojo.forEach(this.stack,C);
D.forIn(this.axes,C)
},getCoords:function(){if(!this.coords){this.coords=dojo.coords(this.node,true)
}return this.coords
},setTheme:function(H){this.theme=H;
this.dirty=true;
return this
},addAxis:function(I,J){var H;
if(!J||!("type" in J)){H=new F.axis2d.Default(this,J)
}else{H=typeof J.type=="string"?new F.axis2d[J.type](this,J):new J.type(this,J)
}H.name=I;
H.dirty=true;
if(I in this.axes){this.axes[I].destroy()
}this.axes[I]=H;
this.dirty=true;
return this
},addPlot:function(I,J){var H;
if(!J||!("type" in J)){H=new F.plot2d.Default(this,J)
}else{H=typeof J.type=="string"?new F.plot2d[J.type](this,J):new J.type(this,J)
}H.name=I;
H.dirty=true;
if(I in this.plots){this.stack[this.plots[I]].destroy();
this.stack[this.plots[I]]=H
}else{this.plots[I]=this.stack.length;
this.stack.push(H)
}this.dirty=true;
return this
},addSeries:function(I,K,J){var H=new F.Series(this,K,J);
if(I in this.runs){this.series[this.runs[I]].destroy();
this.series[this.runs[I]]=H
}else{this.runs[I]=this.series.length;
this.series.push(H)
}this.dirty=true;
if(!("ymin" in H)&&"min" in H){H.ymin=H.min
}if(!("ymax" in H)&&"max" in H){H.ymax=H.max
}return this
},updateSeries:function(I,K){if(I in this.runs){var H=this.series[this.runs[I]],L=this.stack[this.plots[H.plot]],J;
H.data=K;
H.dirty=true;
if(L.hAxis){J=this.axes[L.hAxis];
if(J.dependOnData()){J.dirty=true;
dojo.forEach(this.stack,function(M){if(M.hAxis&&M.hAxis==L.hAxis){M.dirty=true
}})
}}else{L.dirty=true
}if(L.vAxis){J=this.axes[L.vAxis];
if(J.dependOnData()){J.dirty=true;
dojo.forEach(this.stack,function(M){if(M.vAxis&&M.vAxis==L.vAxis){M.dirty=true
}})
}}else{L.dirty=true
}}return this
},resize:function(J,I){var H;
switch(arguments.length){case 0:H=dojo.marginBox(this.node);
break;
case 1:H=J;
break;
default:H={w:J,h:I};
break
}dojo.marginBox(this.node,H);
this.surface.setDimensions(H.w,H.h);
this.dirty=true;
this.coords=null;
return this.render()
},render:function(){if(this.dirty){return this.fullRender()
}dojo.forEach(this.stack,function(H){if(H.dirty||(H.hAxis&&this.axes[H.hAxis].dirty)||(H.vAxis&&this.axes[H.vAxis].dirty)){H.calculateAxes(this.plotArea)
}},this);
D.forEachReversed(this.stack,function(H){H.render(this.dim,this.offsets)
},this);
D.forIn(this.axes,function(H){H.render(this.dim,this.offsets)
},this);
this._makeClean();
if(this.surface.render){this.surface.render()
}return this
},fullRender:function(){this._makeDirty();
dojo.forEach(this.stack,E);
dojo.forEach(this.series,G);
D.forIn(this.axes,G);
dojo.forEach(this.stack,G);
this.surface.clear();
dojo.forEach(this.series,function(N){if(!(N.plot in this.plots)){var O=new F.plot2d.Default(this,{});
O.name=N.plot;
this.plots[N.plot]=this.stack.length;
this.stack.push(O)
}this.stack[this.plots[N.plot]].addSeries(N)
},this);
dojo.forEach(this.stack,function(N){if(N.hAxis){N.setAxis(this.axes[N.hAxis])
}if(N.vAxis){N.setAxis(this.axes[N.vAxis])
}},this);
if(!this.theme){this.theme=new dojox.charting.Theme(dojox.charting._def)
}var K=D.foldl(this.stack,"z + plot.getRequiredColors()",0);
this.theme.defineColors({num:K,cache:false});
var I=this.dim=this.surface.getDimensions();
I.width=dojox.gfx.normalizedLength(I.width);
I.height=dojox.gfx.normalizedLength(I.height);
D.forIn(this.axes,E);
dojo.forEach(this.stack,function(N){N.calculateAxes(I)
});
var L=this.offsets={l:0,r:0,t:0,b:0};
D.forIn(this.axes,function(N){D.forIn(N.getOffsets(),function(P,O){L[O]+=P
})
});
D.forIn(this.margins,function(N,O){L[O]+=N
});
this.plotArea={width:I.width-L.l-L.r,height:I.height-L.t-L.b};
D.forIn(this.axes,E);
dojo.forEach(this.stack,function(N){N.calculateAxes(this.plotArea)
},this);
var J=this.theme,H=this.fill?this.fill:(J.chart&&J.chart.fill),M=this.stroke?this.stroke:(J.chart&&J.chart.stroke);
if(H){this.surface.createRect({width:I.width,height:I.height}).setFill(H)
}if(M){this.surface.createRect({width:I.width-1,height:I.height-1}).setStroke(M)
}H=J.plotarea&&J.plotarea.fill;
M=J.plotarea&&J.plotarea.stroke;
if(H){this.surface.createRect({x:L.l,y:L.t,width:I.width-L.l-L.r,height:I.height-L.t-L.b}).setFill(H)
}if(M){this.surface.createRect({x:L.l,y:L.t,width:I.width-L.l-L.r-1,height:I.height-L.t-L.b-1}).setStroke(M)
}D.foldr(this.stack,function(N,O){return O.render(I,L),0
},0);
D.forIn(this.axes,function(N){N.render(I,L)
});
this._makeClean();
return this
},_makeClean:function(){dojo.forEach(this.axes,A);
dojo.forEach(this.stack,A);
dojo.forEach(this.series,A);
this.dirty=false
},_makeDirty:function(){dojo.forEach(this.axes,B);
dojo.forEach(this.stack,B);
dojo.forEach(this.series,B);
this.dirty=true
}})
})()
};