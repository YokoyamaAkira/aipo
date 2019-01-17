dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Pie"],["require","dojox.charting.Element"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.plot2d.common"],["require","dojox.lang.functional"],["require","dojox.gfx"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Pie"]){A._hasResource["dojox.charting.plot2d.Pie"]=true;
A.provide("dojox.charting.plot2d.Pie");
A.require("dojox.charting.Element");
A.require("dojox.charting.axis2d.common");
A.require("dojox.charting.plot2d.common");
A.require("dojox.lang.functional");
A.require("dojox.gfx");
(function(){var G=dojox.lang.functional,E=dojox.lang.utils,C=dojox.charting.plot2d.common,D=dojox.charting.axis2d.common,F=dojox.gfx,B=0.8;
A.declare("dojox.charting.plot2d.Pie",dojox.charting.Element,{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true},optionalParams:{font:"",fontColor:"",radius:0},constructor:function(I,H){this.opt=A.clone(this.defaultParams);
E.updateWithObject(this.opt,H);
E.updateWithPattern(this.opt,H,this.optionalParams);
this.run=null;
this.dyn=[]
},clear:function(){this.dirty=true;
this.dyn=[];
return this
},setAxis:function(H){return this
},addSeries:function(H){this.run=H;
return this
},calculateAxes:function(H){return this
},getRequiredColors:function(){return this.run?this.run.data.length:0
},render:function(X,P){if(!this.dirty){return this
}this.dirty=false;
this.cleanGroup();
var S=this.group,W,R=this.chart.theme;
var O=(X.width-P.l-P.r)/2,N=(X.height-P.t-P.b)/2,U=Math.min(O,N),b="font" in this.opt?this.opt.font:R.axis.font,J="fontColor" in this.opt?this.opt.fontColor:R.axis.fontColor,K=G.foldl1(this.run.data,"+"),M=0,Q,I=A.map(this.run.data,function(c){return c/K
}),Y,V,T;
if(this.opt.labels){var a=A.map(I,function(c){return this._getLabel(c*100)+"%"
},this);
Y=G.foldl1(A.map(a,G.pluck("length")),"x, y -> Math.max(x, y)");
V=b?F.normalizedLength(F.splitFontString(b).size):0;
Y=Math.max(Y*B,1)/2*V;
if(this.opt.labelOffset<0){U=Math.min(O-2*Y,N-V)+this.opt.labelOffset
}T=U-this.opt.labelOffset
}if("radius" in this.opt){U=this.opt.radius;
T=U-this.opt.labelOffset
}var L={cx:P.l+O,cy:P.t+N,r:U};
this.dyn=[];
if(!this.run||!this.run.data.length){return this
}if(this.run.data.length==1){W=new A.Color(R.next("color"));
var H=S.createCircle(L).setFill(C.augmentFill(R.run.fill,W)).setStroke(C.augmentStroke(R.series.stroke,W));
this.dyn.push({color:W,fill:H.getFill(),stroke:H.getStroke()});
if(this.opt.labels){var Y=4,b="font" in this.opt?this.opt.font:R.axis.font,J="fontColor" in this.opt?this.opt.fontColor:R.axis.fontColor,V=b?F.normalizedLength(F.splitFontString(b).size):0;
Y=Math.max(Y*B,1)/2*V;
var Z=D.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,S,L.cx,L.cy+V/2,"middle","100%",b,J);
if(this.opt.htmlLabels){this.htmlElements.push(Z)
}}return this
}A.forEach(I,function(l,g){var f=M+l*2*Math.PI;
if(g+1==I.length){f=2*Math.PI
}var e=f-M,d=L.cx+U*Math.cos(M),k=L.cy+U*Math.sin(M),c=L.cx+U*Math.cos(f),j=L.cy+U*Math.sin(f);
W=new A.Color(R.next("color"));
var h=S.createPath({}).moveTo(L.cx,L.cy).lineTo(d,k).arcTo(U,U,0,e>Math.PI,true,c,j).lineTo(L.cx,L.cy).closePath().setFill(C.augmentFill(R.series.fill,W)).setStroke(C.augmentStroke(R.series.stroke,W));
this.dyn.push({color:W,fill:h.getFill(),stroke:h.getStroke()});
M=f
},this);
if(this.opt.labels){M=0;
A.forEach(I,function(c,f){var d=M+c*2*Math.PI;
if(f+1==I.length){d=2*Math.PI
}var e=(M+d)/2,c=L.cx+T*Math.cos(e),h=L.cy+T*Math.sin(e)+V/2;
var g=D.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,S,c,h,"middle",a[f],b,J);
if(this.opt.htmlLabels){this.htmlElements.push(g)
}M=d
},this)
}return this
},_getLabel:function(H){return this.opt.fixed?H.toFixed(this.opt.precision):H.toString()
}})
})()
}}});