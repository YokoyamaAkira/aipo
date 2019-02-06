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
(function(){var G=dojox.lang.functional,B=dojox.charting,A=G.lambda("item.clear()"),C=G.lambda("item.purgeGroup()"),F=G.lambda("item.destroy()"),D=G.lambda("item.dirty = false"),E=G.lambda("item.dirty = true");
dojo.declare("dojox.charting.Chart2D",null,{constructor:function(J,H){if(!H){H={}
}this.margins=H.margins?H.margins:{l:10,t:10,r:10,b:10};
this.stroke=H.stroke;
this.fill=H.fill;
this.theme=null;
this.axes={};
this.stack=[];
this.plots={};
this.series=[];
this.runs={};
this.dirty=true;
this.coords=null;
this.node=dojo.byId(J);
var I=dojo.marginBox(J);
this.surface=dojox.gfx.createSurface(this.node,I.w,I.h)
},destroy:function(){dojo.forEach(this.series,F);
dojo.forEach(this.stack,F);
G.forIn(this.axes,F)
},getCoords:function(){if(!this.coords){this.coords=dojo.coords(this.node,true)
}return this.coords
},setTheme:function(H){this.theme=H;
this.dirty=true;
return this
},addAxis:function(H,I){var J;
if(!I||!("type" in I)){J=new B.axis2d.Default(this,I)
}else{J=typeof I.type=="string"?new B.axis2d[I.type](this,I):new I.type(this,I)
}J.name=H;
J.dirty=true;
if(H in this.axes){this.axes[H].destroy()
}this.axes[H]=J;
this.dirty=true;
return this
},addPlot:function(H,I){var J;
if(!I||!("type" in I)){J=new B.plot2d.Default(this,I)
}else{J=typeof I.type=="string"?new B.plot2d[I.type](this,I):new I.type(this,I)
}J.name=H;
J.dirty=true;
if(H in this.plots){this.stack[this.plots[H]].destroy();
this.stack[this.plots[H]]=J
}else{this.plots[H]=this.stack.length;
this.stack.push(J)
}this.dirty=true;
return this
},addSeries:function(H,J,I){var K=new B.Series(this,J,I);
if(H in this.runs){this.series[this.runs[H]].destroy();
this.series[this.runs[H]]=K
}else{this.runs[H]=this.series.length;
this.series.push(K)
}this.dirty=true;
if(!("ymin" in K)&&"min" in K){K.ymin=K.min
}if(!("ymax" in K)&&"max" in K){K.ymax=K.max
}return this
},updateSeries:function(H,J){if(H in this.runs){var L=this.series[this.runs[H]],K=this.stack[this.plots[L.plot]],I;
L.data=J;
L.dirty=true;
if(K.hAxis){I=this.axes[K.hAxis];
if(I.dependOnData()){I.dirty=true;
dojo.forEach(this.stack,function(M){if(M.hAxis&&M.hAxis==K.hAxis){M.dirty=true
}})
}}else{K.dirty=true
}if(K.vAxis){I=this.axes[K.vAxis];
if(I.dependOnData()){I.dirty=true;
dojo.forEach(this.stack,function(M){if(M.vAxis&&M.vAxis==K.vAxis){M.dirty=true
}})
}}else{K.dirty=true
}}return this
},resize:function(I,H){var J;
switch(arguments.length){case 0:J=dojo.marginBox(this.node);
break;
case 1:J=I;
break;
default:J={w:I,h:H};
break
}dojo.marginBox(this.node,J);
this.surface.setDimensions(J.w,J.h);
this.dirty=true;
this.coords=null;
return this.render()
},render:function(){if(this.dirty){return this.fullRender()
}dojo.forEach(this.stack,function(H){if(H.dirty||(H.hAxis&&this.axes[H.hAxis].dirty)||(H.vAxis&&this.axes[H.vAxis].dirty)){H.calculateAxes(this.plotArea)
}},this);
G.forEachReversed(this.stack,function(H){H.render(this.dim,this.offsets)
},this);
G.forIn(this.axes,function(H){H.render(this.dim,this.offsets)
},this);
this._makeClean();
if(this.surface.render){this.surface.render()
}return this
},fullRender:function(){this._makeDirty();
dojo.forEach(this.stack,A);
dojo.forEach(this.series,C);
G.forIn(this.axes,C);
dojo.forEach(this.stack,C);
this.surface.clear();
dojo.forEach(this.series,function(O){if(!(O.plot in this.plots)){var N=new B.plot2d.Default(this,{});
N.name=O.plot;
this.plots[O.plot]=this.stack.length;
this.stack.push(N)
}this.stack[this.plots[O.plot]].addSeries(O)
},this);
dojo.forEach(this.stack,function(N){if(N.hAxis){N.setAxis(this.axes[N.hAxis])
}if(N.vAxis){N.setAxis(this.axes[N.vAxis])
}},this);
if(!this.theme){this.theme=new dojox.charting.Theme(dojox.charting._def)
}var I=G.foldl(this.stack,"z + plot.getRequiredColors()",0);
this.theme.defineColors({num:I,cache:false});
var M=this.dim=this.surface.getDimensions();
M.width=dojox.gfx.normalizedLength(M.width);
M.height=dojox.gfx.normalizedLength(M.height);
G.forIn(this.axes,A);
dojo.forEach(this.stack,function(N){N.calculateAxes(M)
});
var J=this.offsets={l:0,r:0,t:0,b:0};
G.forIn(this.axes,function(N){G.forIn(N.getOffsets(),function(P,O){J[O]+=P
})
});
G.forIn(this.margins,function(O,N){J[N]+=O
});
this.plotArea={width:M.width-J.l-J.r,height:M.height-J.t-J.b};
G.forIn(this.axes,A);
dojo.forEach(this.stack,function(N){N.calculateAxes(this.plotArea)
},this);
var H=this.theme,L=this.fill?this.fill:(H.chart&&H.chart.fill),K=this.stroke?this.stroke:(H.chart&&H.chart.stroke);
if(L){this.surface.createRect({width:M.width,height:M.height}).setFill(L)
}if(K){this.surface.createRect({width:M.width-1,height:M.height-1}).setStroke(K)
}L=H.plotarea&&H.plotarea.fill;
K=H.plotarea&&H.plotarea.stroke;
if(L){this.surface.createRect({x:J.l,y:J.t,width:M.width-J.l-J.r,height:M.height-J.t-J.b}).setFill(L)
}if(K){this.surface.createRect({x:J.l,y:J.t,width:M.width-J.l-J.r-1,height:M.height-J.t-J.b-1}).setStroke(K)
}G.foldr(this.stack,function(O,N){return N.render(M,J),0
},0);
G.forIn(this.axes,function(N){N.render(M,J)
});
this._makeClean();
return this
},_makeClean:function(){dojo.forEach(this.axes,D);
dojo.forEach(this.stack,D);
dojo.forEach(this.series,D);
this.dirty=false
},_makeDirty:function(){dojo.forEach(this.axes,E);
dojo.forEach(this.stack,E);
dojo.forEach(this.series,E);
this.dirty=true
}})
})()
};