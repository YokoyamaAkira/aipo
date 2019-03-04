if(!dojo._hasResource["dojox.charting.plot2d.Pie"]){dojo._hasResource["dojox.charting.plot2d.Pie"]=true;
dojo.provide("dojox.charting.plot2d.Pie");
dojo.require("dojox.charting.Element");
dojo.require("dojox.charting.axis2d.common");
dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.lang.functional");
dojo.require("dojox.gfx");
(function(){var F=dojox.lang.functional,D=dojox.lang.utils,B=dojox.charting.plot2d.common,C=dojox.charting.axis2d.common,E=dojox.gfx,A=0.8;
dojo.declare("dojox.charting.plot2d.Pie",dojox.charting.Element,{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true},optionalParams:{font:"",fontColor:"",radius:0},constructor:function(H,G){this.opt=dojo.clone(this.defaultParams);
D.updateWithObject(this.opt,G);
D.updateWithPattern(this.opt,G,this.optionalParams);
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
},render:function(W,O){if(!this.dirty){return this
}this.dirty=false;
this.cleanGroup();
var R=this.group,V,Q=this.chart.theme;
var N=(W.width-O.l-O.r)/2,M=(W.height-O.t-O.b)/2,T=Math.min(N,M),a="font" in this.opt?this.opt.font:Q.axis.font,I="fontColor" in this.opt?this.opt.fontColor:Q.axis.fontColor,J=F.foldl1(this.run.data,"+"),L=0,P,H=dojo.map(this.run.data,function(b){return b/J
}),X,U,S;
if(this.opt.labels){var Z=dojo.map(H,function(b){return this._getLabel(b*100)+"%"
},this);
X=F.foldl1(dojo.map(Z,F.pluck("length")),"x, y -> Math.max(x, y)");
U=a?E.normalizedLength(E.splitFontString(a).size):0;
X=Math.max(X*A,1)/2*U;
if(this.opt.labelOffset<0){T=Math.min(N-2*X,M-U)+this.opt.labelOffset
}S=T-this.opt.labelOffset
}if("radius" in this.opt){T=this.opt.radius;
S=T-this.opt.labelOffset
}var K={cx:O.l+N,cy:O.t+M,r:T};
this.dyn=[];
if(!this.run||!this.run.data.length){return this
}if(this.run.data.length==1){V=new dojo.Color(Q.next("color"));
var G=R.createCircle(K).setFill(B.augmentFill(Q.run.fill,V)).setStroke(B.augmentStroke(Q.series.stroke,V));
this.dyn.push({color:V,fill:G.getFill(),stroke:G.getStroke()});
if(this.opt.labels){var X=4,a="font" in this.opt?this.opt.font:Q.axis.font,I="fontColor" in this.opt?this.opt.fontColor:Q.axis.fontColor,U=a?E.normalizedLength(E.splitFontString(a).size):0;
X=Math.max(X*A,1)/2*U;
var Y=C.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,R,K.cx,K.cy+U/2,"middle","100%",a,I);
if(this.opt.htmlLabels){this.htmlElements.push(Y)
}}return this
}dojo.forEach(H,function(k,f){var e=L+k*2*Math.PI;
if(f+1==H.length){e=2*Math.PI
}var d=e-L,c=K.cx+T*Math.cos(L),j=K.cy+T*Math.sin(L),b=K.cx+T*Math.cos(e),h=K.cy+T*Math.sin(e);
V=new dojo.Color(Q.next("color"));
var g=R.createPath({}).moveTo(K.cx,K.cy).lineTo(c,j).arcTo(T,T,0,d>Math.PI,true,b,h).lineTo(K.cx,K.cy).closePath().setFill(B.augmentFill(Q.series.fill,V)).setStroke(B.augmentStroke(Q.series.stroke,V));
this.dyn.push({color:V,fill:g.getFill(),stroke:g.getStroke()});
L=e
},this);
if(this.opt.labels){L=0;
dojo.forEach(H,function(b,e){var c=L+b*2*Math.PI;
if(e+1==H.length){c=2*Math.PI
}var d=(L+c)/2,b=K.cx+S*Math.cos(d),g=K.cy+S*Math.sin(d)+U/2;
var f=C.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,R,b,g,"middle",Z[e],a,I);
if(this.opt.htmlLabels){this.htmlElements.push(f)
}L=c
},this)
}return this
},_getLabel:function(G){return this.opt.fixed?G.toFixed(this.opt.precision):G.toString()
}})
})()
};