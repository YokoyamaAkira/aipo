dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot2d.Pie"],["require","dojox.charting.Element"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.plot2d.common"],["require","dojox.lang.functional"],["require","dojox.gfx"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot2d.Pie"]){A._hasResource["dojox.charting.plot2d.Pie"]=true;
A.provide("dojox.charting.plot2d.Pie");
A.require("dojox.charting.Element");
A.require("dojox.charting.axis2d.common");
A.require("dojox.charting.plot2d.common");
A.require("dojox.lang.functional");
A.require("dojox.gfx");
(function(){var C=dojox.lang.functional,F=dojox.lang.utils,D=dojox.charting.plot2d.common,E=dojox.charting.axis2d.common,G=dojox.gfx,B=0.8;
A.declare("dojox.charting.plot2d.Pie",dojox.charting.Element,{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true},optionalParams:{font:"",fontColor:"",radius:0},constructor:function(I,H){this.opt=A.clone(this.defaultParams);
F.updateWithObject(this.opt,H);
F.updateWithPattern(this.opt,H,this.optionalParams);
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
},render:function(J,W){if(!this.dirty){return this
}this.dirty=false;
this.cleanGroup();
var Z=this.group,I,Y=this.chart.theme;
var V=(J.width-W.l-W.r)/2,U=(J.height-W.t-W.b)/2,b=Math.min(V,U),N="font" in this.opt?this.opt.font:Y.axis.font,Q="fontColor" in this.opt?this.opt.fontColor:Y.axis.fontColor,R=C.foldl1(this.run.data,"+"),T=0,X,P=A.map(this.run.data,function(c){return c/R
}),K,H,a;
if(this.opt.labels){var M=A.map(P,function(c){return this._getLabel(c*100)+"%"
},this);
K=C.foldl1(A.map(M,C.pluck("length")),"x, y -> Math.max(x, y)");
H=N?G.normalizedLength(G.splitFontString(N).size):0;
K=Math.max(K*B,1)/2*H;
if(this.opt.labelOffset<0){b=Math.min(V-2*K,U-H)+this.opt.labelOffset
}a=b-this.opt.labelOffset
}if("radius" in this.opt){b=this.opt.radius;
a=b-this.opt.labelOffset
}var S={cx:W.l+V,cy:W.t+U,r:b};
this.dyn=[];
if(!this.run||!this.run.data.length){return this
}if(this.run.data.length==1){I=new A.Color(Y.next("color"));
var O=Z.createCircle(S).setFill(D.augmentFill(Y.run.fill,I)).setStroke(D.augmentStroke(Y.series.stroke,I));
this.dyn.push({color:I,fill:O.getFill(),stroke:O.getStroke()});
if(this.opt.labels){var K=4,N="font" in this.opt?this.opt.font:Y.axis.font,Q="fontColor" in this.opt?this.opt.fontColor:Y.axis.fontColor,H=N?G.normalizedLength(G.splitFontString(N).size):0;
K=Math.max(K*B,1)/2*H;
var L=E.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,Z,S.cx,S.cy+H/2,"middle","100%",N,Q);
if(this.opt.htmlLabels){this.htmlElements.push(L)
}}return this
}A.forEach(P,function(k,g){var f=T+k*2*Math.PI;
if(g+1==P.length){f=2*Math.PI
}var e=f-T,d=S.cx+b*Math.cos(T),j=S.cy+b*Math.sin(T),c=S.cx+b*Math.cos(f),i=S.cy+b*Math.sin(f);
I=new A.Color(Y.next("color"));
var h=Z.createPath({}).moveTo(S.cx,S.cy).lineTo(d,j).arcTo(b,b,0,e>Math.PI,true,c,i).lineTo(S.cx,S.cy).closePath().setFill(D.augmentFill(Y.series.fill,I)).setStroke(D.augmentStroke(Y.series.stroke,I));
this.dyn.push({color:I,fill:h.getFill(),stroke:h.getStroke()});
T=f
},this);
if(this.opt.labels){T=0;
A.forEach(P,function(c,f){var d=T+c*2*Math.PI;
if(f+1==P.length){d=2*Math.PI
}var e=(T+d)/2,c=S.cx+a*Math.cos(e),h=S.cy+a*Math.sin(e)+H/2;
var g=E.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,Z,c,h,"middle",M[f],N,Q);
if(this.opt.htmlLabels){this.htmlElements.push(g)
}T=d
},this)
}return this
},_getLabel:function(H){return this.opt.fixed?H.toFixed(this.opt.precision):H.toString()
}})
})()
}}});