if(!dojo._hasResource["dojox.charting.plot2d.Pie"]){dojo._hasResource["dojox.charting.plot2d.Pie"]=true;
dojo.provide("dojox.charting.plot2d.Pie");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.axis2d.common");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.lang.functional");
dojo.require("dojox.gfx");
(function(){var E=dojox.lang.functional,C=dojox.lang.utils,A=dojox.charting.plot2d.common,B=dojox.charting.axis2d.common,D=dojox.gfx,F=0.8;
dojo.declare("dojox.charting.plot2d.Pie",dojox.charting.Element,{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true},optionalParams:{font:"",fontColor:"",radius:0},constructor:function(G,H){this.opt=dojo.clone(this.defaultParams);
C.updateWithObject(this.opt,H);
C.updateWithPattern(this.opt,H,this.optionalParams);
this.run=null;
this.dyn=[]
},clear:function(){this.dirty=true;
this.dyn=[];
return this
},setAxis:function(G){return this
},addSeries:function(G){this.run=G;
return this
},calculateAxes:function(G){return this
},getRequiredColors:function(){return this.run?this.run.data.length:0
},render:function(I,V){if(!this.dirty){return this
}this.dirty=false;
this.cleanGroup();
var Y=this.group,H,X=this.chart.theme;
var U=(I.width-V.l-V.r)/2,T=(I.height-V.t-V.b)/2,a=Math.min(U,T),M="font" in this.opt?this.opt.font:X.axis.font,P="fontColor" in this.opt?this.opt.fontColor:X.axis.fontColor,Q=E.foldl1(this.run.data,"+"),S=0,W,O=dojo.map(this.run.data,function(b){return b/Q
}),J,G,Z;
if(this.opt.labels){var L=dojo.map(O,function(b){return this._getLabel(b*100)+"%"
},this);
J=E.foldl1(dojo.map(L,E.pluck("length")),"x, y -> Math.max(x, y)");
G=M?D.normalizedLength(D.splitFontString(M).size):0;
J=Math.max(J*F,1)/2*G;
if(this.opt.labelOffset<0){a=Math.min(U-2*J,T-G)+this.opt.labelOffset
}Z=a-this.opt.labelOffset
}if("radius" in this.opt){a=this.opt.radius;
Z=a-this.opt.labelOffset
}var R={cx:V.l+U,cy:V.t+T,r:a};
this.dyn=[];
if(!this.run||!this.run.data.length){return this
}if(this.run.data.length==1){H=new dojo.Color(X.next("color"));
var N=Y.createCircle(R).setFill(A.augmentFill(X.run.fill,H)).setStroke(A.augmentStroke(X.series.stroke,H));
this.dyn.push({color:H,fill:N.getFill(),stroke:N.getStroke()});
if(this.opt.labels){var J=4,M="font" in this.opt?this.opt.font:X.axis.font,P="fontColor" in this.opt?this.opt.fontColor:X.axis.fontColor,G=M?D.normalizedLength(D.splitFontString(M).size):0;
J=Math.max(J*F,1)/2*G;
var K=B.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,Y,R.cx,R.cy+G/2,"middle","100%",M,P);
if(this.opt.htmlLabels){this.htmlElements.push(K)
}}return this
}dojo.forEach(O,function(j,f){var e=S+j*2*Math.PI;
if(f+1==O.length){e=2*Math.PI
}var d=e-S,c=R.cx+a*Math.cos(S),i=R.cy+a*Math.sin(S),b=R.cx+a*Math.cos(e),h=R.cy+a*Math.sin(e);
H=new dojo.Color(X.next("color"));
var g=Y.createPath({}).moveTo(R.cx,R.cy).lineTo(c,i).arcTo(a,a,0,d>Math.PI,true,b,h).lineTo(R.cx,R.cy).closePath().setFill(A.augmentFill(X.series.fill,H)).setStroke(A.augmentStroke(X.series.stroke,H));
this.dyn.push({color:H,fill:g.getFill(),stroke:g.getStroke()});
S=e
},this);
if(this.opt.labels){S=0;
dojo.forEach(O,function(g,d){var b=S+g*2*Math.PI;
if(d+1==O.length){b=2*Math.PI
}var c=(S+b)/2,g=R.cx+Z*Math.cos(c),f=R.cy+Z*Math.sin(c)+G/2;
var e=B.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,Y,g,f,"middle",L[d],M,P);
if(this.opt.htmlLabels){this.htmlElements.push(e)
}S=b
},this)
}return this
},_getLabel:function(G){return this.opt.fixed?G.toFixed(this.opt.precision):G.toString()
}})
})()
};