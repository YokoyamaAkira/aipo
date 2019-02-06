if(!dojo._hasResource["dojox.charting.axis2d.Default"]){dojo._hasResource["dojox.charting.axis2d.Default"]=true;
dojo.provide("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.scaler");
dojo.require("dojox.charting.axis2d.common");
dojo.require("dojox.charting.axis2d.Base");
dojo.require("dojo.colors");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
dojo.require("dojox.lang.utils");
(function(){var G=dojox.charting,D=dojox.lang.functional,A=dojox.lang.utils,B=dojox.gfx,C=4,F=0.8;
var E=function(H,I){return Math.abs(H-I)<=0.000001*(Math.abs(H)+Math.abs(I))
};
dojo.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,htmlLabels:true},optionalParams:{min:0,max:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],stroke:{},majorTick:{},minorTick:{},font:"",fontColor:""},constructor:function(H,I){this.opt=dojo.clone(this.defaultParams);
A.updateWithObject(this.opt,I);
A.updateWithPattern(this.opt,I,this.optionalParams)
},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt)
},clear:function(){delete this.scaler;
this.dirty=true;
return this
},initialized:function(){return"scaler" in this
},calculate:function(M,I,J,Q){if(this.initialized()){return this
}this.labels="labels" in this.opt?this.opt.labels:Q;
if("min" in this.opt){M=this.opt.min
}if("max" in this.opt){I=this.opt.max
}if(this.opt.includeZero){if(M>0){M=0
}if(I<0){I=0
}}var L=0,N=this.chart.theme.axis,H="font" in this.opt?this.opt.font:N.font,K=H?B.normalizedLength(B.splitFontString(H).size):0;
if(this.vertical){if(K){L=K+C
}}else{if(K){var R=Math.ceil(Math.log(Math.max(Math.abs(M),Math.abs(I)))/Math.LN10);
if(M<0||I<0){++R
}var P=Math.floor(Math.log(I-M)/Math.LN10);
if(P>0){R+=P
}if(this.labels){R=D.foldl(D.map(this.labels,"x.text.length"),"Math.max(a, b)",R)
}L=Math.floor(K*R*F)+C
}}var O={fixUpper:this.opt.fixUpper,fixLower:this.opt.fixLower,natural:this.opt.natural};
if("majorTickStep" in this.opt){O.majorTick=this.opt.majorTickStep
}if("minorTickStep" in this.opt){O.minorTick=this.opt.minorTickStep
}if("microTickStep" in this.opt){O.microTick=this.opt.microTickStep
}this.scaler=dojox.charting.scaler(M,I,J,O);
this.scaler.minMinorStep=L;
return this
},getScaler:function(){return this.scaler
},getOffsets:function(){var J={l:0,r:0,t:0,b:0};
var L=0,M=this.chart.theme.axis,S="font" in this.opt?this.opt.font:M.font,I="majorTick" in this.opt?this.opt.majorTick:M.majorTick,O="minorTick" in this.opt?this.opt.minorTick:M.minorTick,N=S?B.normalizedLength(B.splitFontString(S).size):0;
if(this.vertical){if(N){var K=this.scaler,H=this._getLabel(K.major.start,K.major.prec).length,T=this._getLabel(K.major.start+K.major.count*K.major.tick,K.major.prec).length,R=this._getLabel(K.minor.start,K.minor.prec).length,Q=this._getLabel(K.minor.start+K.minor.count*K.minor.tick,K.minor.prec).length,P=Math.max(H,T,R,Q);
if(this.labels){P=D.foldl(D.map(this.labels,"x.text.length"),"Math.max(a, b)",P)
}L=Math.floor(N*P*F)+C
}L+=C+Math.max(I.length,O.length);
J[this.opt.leftBottom?"l":"r"]=L;
J.t=J.b=N/2
}else{if(N){L=N+C
}L+=C+Math.max(I.length,O.length);
J[this.opt.leftBottom?"b":"t"]=L;
if(N){var K=this.scaler,H=this._getLabel(K.major.start,K.major.prec).length,T=this._getLabel(K.major.start+K.major.count*K.major.tick,K.major.prec).length,R=this._getLabel(K.minor.start,K.minor.prec).length,Q=this._getLabel(K.minor.start+K.minor.count*K.minor.tick,K.minor.prec).length,P=Math.max(H,T,R,Q);
if(this.labels){P=D.foldl(D.map(this.labels,"x.text.length"),"Math.max(a, b)",P)
}J.l=J.r=Math.floor(N*P*F)/2
}}return J
},render:function(f,b){if(!this.dirty){return this
}var Z,X,h,Q,g,O,i=this.chart.theme.axis,M="stroke" in this.opt?this.opt.stroke:i.stroke,N="majorTick" in this.opt?this.opt.majorTick:i.majorTick,Y="minorTick" in this.opt?this.opt.minorTick:i.minorTick,K="font" in this.opt?this.opt.font:i.font,R="fontColor" in this.opt?this.opt.fontColor:i.fontColor,U=Math.max(N.length,Y.length),S=K?B.normalizedLength(B.splitFontString(K).size):0;
if(this.vertical){Z={y:f.height-b.b};
X={y:b.t};
h={x:0,y:-1};
if(this.opt.leftBottom){Z.x=X.x=b.l;
Q={x:-1,y:0};
O="end"
}else{Z.x=X.x=f.width-b.r;
Q={x:1,y:0};
O="start"
}g={x:Q.x*(U+C),y:S*0.4}
}else{Z={x:b.l};
X={x:f.width-b.r};
h={x:1,y:0};
O="middle";
if(this.opt.leftBottom){Z.y=X.y=f.height-b.b;
Q={x:0,y:1};
g={y:U+C+S}
}else{Z.y=X.y=b.t;
Q={x:0,y:-1};
g={y:-U-C}
}g.x=0
}this.cleanGroup();
var P=this.group,J=this.scaler,d,W,H=J.major.start,V=J.minor.start,T=J.micro.start;
P.createLine({x1:Z.x,y1:Z.y,x2:X.x,y2:X.y}).setStroke(M);
if(this.opt.microTicks&&J.micro.tick){d=J.micro.tick,W=T
}else{if(this.opt.minorTicks&&J.minor.tick){d=J.minor.tick,W=V
}else{if(J.major.tick){d=J.major.tick,W=H
}else{return this
}}}while(W<=J.bounds.upper+1/J.scale){var a=(W-J.bounds.lower)*J.scale,L=Z.x+h.x*a,e=Z.y+h.y*a;
if(Math.abs(H-W)<d/2){P.createLine({x1:L,y1:e,x2:L+Q.x*N.length,y2:e+Q.y*N.length}).setStroke(N);
if(this.opt.majorLabels){var I=G.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,P,L+g.x,e+g.y,O,this._getLabel(H,J.major.prec),K,R);
if(this.opt.htmlLabels){this.htmlElements.push(I)
}}H+=J.major.tick;
V+=J.minor.tick;
T+=J.micro.tick
}else{if(Math.abs(V-W)<d/2){if(this.opt.minorTicks){P.createLine({x1:L,y1:e,x2:L+Q.x*Y.length,y2:e+Q.y*Y.length}).setStroke(Y);
if(this.opt.minorLabels&&(J.minMinorStep<=J.minor.tick*J.scale)){var I=G.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,P,L+g.x,e+g.y,O,this._getLabel(V,J.minor.prec),K,R);
if(this.opt.htmlLabels){this.htmlElements.push(I)
}}}V+=J.minor.tick;
T+=J.micro.tick
}else{if(this.opt.microTicks){P.createLine({x1:L,y1:e,x2:L+Q.x*Y.length,y2:e+Q.y*Y.length}).setStroke(Y)
}T+=J.micro.tick
}}W+=d
}this.dirty=false;
return this
},_getLabel:function(I,L){if(this.opt.labels){var K=this.opt.labels,H=0,N=K.length;
while(H<N){var M=Math.floor((H+N)/2),J=K[M].value;
if(J<I){H=M+1
}else{N=M
}}if(H<K.length&&E(K[H].value,I)){return K[H].text
}--H;
if(H<K.length&&E(K[H].value,I)){return K[H].text
}H+=2;
if(H<K.length&&E(K[H].value,I)){return K[H].text
}}return this.opt.fixed?I.toFixed(L<0?-L:0):I.toString()
}})
})()
};