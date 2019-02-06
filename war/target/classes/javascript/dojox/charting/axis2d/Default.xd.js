dojo._xdResourceLoaded({depends:[["provide","dojox.charting.axis2d.Default"],["require","dojox.charting.scaler"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.axis2d.Base"],["require","dojo.colors"],["require","dojox.gfx"],["require","dojox.lang.functional"],["require","dojox.lang.utils"]],defineResource:function(A){if(!A._hasResource["dojox.charting.axis2d.Default"]){A._hasResource["dojox.charting.axis2d.Default"]=true;
A.provide("dojox.charting.axis2d.Default");
A.require("dojox.charting.scaler");
A.require("dojox.charting.axis2d.common");
A.require("dojox.charting.axis2d.Base");
A.require("dojo.colors");
A.require("dojox.gfx");
A.require("dojox.lang.functional");
A.require("dojox.lang.utils");
(function(){var C=dojox.charting,B=dojox.lang.functional,D=dojox.lang.utils,E=dojox.gfx,F=4,H=0.8;
var G=function(J,I){return Math.abs(J-I)<=0.000001*(Math.abs(J)+Math.abs(I))
};
A.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,htmlLabels:true},optionalParams:{min:0,max:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],stroke:{},majorTick:{},minorTick:{},font:"",fontColor:""},constructor:function(J,I){this.opt=A.clone(this.defaultParams);
D.updateWithObject(this.opt,I);
D.updateWithPattern(this.opt,I,this.optionalParams)
},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt)
},clear:function(){delete this.scaler;
this.dirty=true;
return this
},initialized:function(){return"scaler" in this
},calculate:function(L,S,I,P){if(this.initialized()){return this
}this.labels="labels" in this.opt?this.opt.labels:P;
if("min" in this.opt){L=this.opt.min
}if("max" in this.opt){S=this.opt.max
}if(this.opt.includeZero){if(L>0){L=0
}if(S<0){S=0
}}var K=0,M=this.chart.theme.axis,R="font" in this.opt?this.opt.font:M.font,J=R?E.normalizedLength(E.splitFontString(R).size):0;
if(this.vertical){if(J){K=J+F
}}else{if(J){var Q=Math.ceil(Math.log(Math.max(Math.abs(L),Math.abs(S)))/Math.LN10);
if(L<0||S<0){++Q
}var O=Math.floor(Math.log(S-L)/Math.LN10);
if(O>0){Q+=O
}if(this.labels){Q=B.foldl(B.map(this.labels,"x.text.length"),"Math.max(a, b)",Q)
}K=Math.floor(J*Q*H)+F
}}var N={fixUpper:this.opt.fixUpper,fixLower:this.opt.fixLower,natural:this.opt.natural};
if("majorTickStep" in this.opt){N.majorTick=this.opt.majorTickStep
}if("minorTickStep" in this.opt){N.minorTick=this.opt.minorTickStep
}if("microTickStep" in this.opt){N.microTick=this.opt.microTickStep
}this.scaler=dojox.charting.scaler(L,S,I,N);
this.scaler.minMinorStep=K;
return this
},getScaler:function(){return this.scaler
},getOffsets:function(){var P={l:0,r:0,t:0,b:0};
var Q=0,K=this.chart.theme.axis,R="font" in this.opt?this.opt.font:K.font,U="majorTick" in this.opt?this.opt.majorTick:K.majorTick,L="minorTick" in this.opt?this.opt.minorTick:K.minorTick,J=R?E.normalizedLength(E.splitFontString(R).size):0;
if(this.vertical){if(J){var I=this.scaler,T=this._getLabel(I.major.start,I.major.prec).length,S=this._getLabel(I.major.start+I.major.count*I.major.tick,I.major.prec).length,O=this._getLabel(I.minor.start,I.minor.prec).length,N=this._getLabel(I.minor.start+I.minor.count*I.minor.tick,I.minor.prec).length,M=Math.max(T,S,O,N);
if(this.labels){M=B.foldl(B.map(this.labels,"x.text.length"),"Math.max(a, b)",M)
}Q=Math.floor(J*M*H)+F
}Q+=F+Math.max(U.length,L.length);
P[this.opt.leftBottom?"l":"r"]=Q;
P.t=P.b=J/2
}else{if(J){Q=J+F
}Q+=F+Math.max(U.length,L.length);
P[this.opt.leftBottom?"b":"t"]=Q;
if(J){var I=this.scaler,T=this._getLabel(I.major.start,I.major.prec).length,S=this._getLabel(I.major.start+I.major.count*I.major.tick,I.major.prec).length,O=this._getLabel(I.minor.start,I.minor.prec).length,N=this._getLabel(I.minor.start+I.minor.count*I.minor.tick,I.minor.prec).length,M=Math.max(T,S,O,N);
if(this.labels){M=B.foldl(B.map(this.labels,"x.text.length"),"Math.max(a, b)",M)
}P.l=P.r=Math.floor(J*M*H)/2
}}return P
},render:function(f,a){if(!this.dirty){return this
}var Y,d,h,Q,g,O,j=this.chart.theme.axis,M="stroke" in this.opt?this.opt.stroke:j.stroke,N="majorTick" in this.opt?this.opt.majorTick:j.majorTick,X="minorTick" in this.opt?this.opt.minorTick:j.minorTick,K="font" in this.opt?this.opt.font:j.font,S="fontColor" in this.opt?this.opt.fontColor:j.fontColor,U=Math.max(N.length,X.length),R=K?E.normalizedLength(E.splitFontString(K).size):0;
if(this.vertical){Y={y:f.height-a.b};
d={y:a.t};
h={x:0,y:-1};
if(this.opt.leftBottom){Y.x=d.x=a.l;
Q={x:-1,y:0};
O="end"
}else{Y.x=d.x=f.width-a.r;
Q={x:1,y:0};
O="start"
}g={x:Q.x*(U+F),y:R*0.4}
}else{Y={x:a.l};
d={x:f.width-a.r};
h={x:1,y:0};
O="middle";
if(this.opt.leftBottom){Y.y=d.y=f.height-a.b;
Q={x:0,y:1};
g={y:U+F+R}
}else{Y.y=d.y=a.t;
Q={x:0,y:-1};
g={y:-U-F}
}g.x=0
}this.cleanGroup();
var P=this.group,J=this.scaler,b,W,i=J.major.start,V=J.minor.start,T=J.micro.start;
P.createLine({x1:Y.x,y1:Y.y,x2:d.x,y2:d.y}).setStroke(M);
if(this.opt.microTicks&&J.micro.tick){b=J.micro.tick,W=T
}else{if(this.opt.minorTicks&&J.minor.tick){b=J.minor.tick,W=V
}else{if(J.major.tick){b=J.major.tick,W=i
}else{return this
}}}while(W<=J.bounds.upper+1/J.scale){var Z=(W-J.bounds.lower)*J.scale,L=Y.x+h.x*Z,e=Y.y+h.y*Z;
if(Math.abs(i-W)<b/2){P.createLine({x1:L,y1:e,x2:L+Q.x*N.length,y2:e+Q.y*N.length}).setStroke(N);
if(this.opt.majorLabels){var I=C.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,P,L+g.x,e+g.y,O,this._getLabel(i,J.major.prec),K,S);
if(this.opt.htmlLabels){this.htmlElements.push(I)
}}i+=J.major.tick;
V+=J.minor.tick;
T+=J.micro.tick
}else{if(Math.abs(V-W)<b/2){if(this.opt.minorTicks){P.createLine({x1:L,y1:e,x2:L+Q.x*X.length,y2:e+Q.y*X.length}).setStroke(X);
if(this.opt.minorLabels&&(J.minMinorStep<=J.minor.tick*J.scale)){var I=C.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,P,L+g.x,e+g.y,O,this._getLabel(V,J.minor.prec),K,S);
if(this.opt.htmlLabels){this.htmlElements.push(I)
}}}V+=J.minor.tick;
T+=J.micro.tick
}else{if(this.opt.microTicks){P.createLine({x1:L,y1:e,x2:L+Q.x*X.length,y2:e+Q.y*X.length}).setStroke(X)
}T+=J.micro.tick
}}W+=b
}this.dirty=false;
return this
},_getLabel:function(I,M){if(this.opt.labels){var K=this.opt.labels,L=0,O=K.length;
while(L<O){var N=Math.floor((L+O)/2),J=K[N].value;
if(J<I){L=N+1
}else{O=N
}}if(L<K.length&&G(K[L].value,I)){return K[L].text
}--L;
if(L<K.length&&G(K[L].value,I)){return K[L].text
}L+=2;
if(L<K.length&&G(K[L].value,I)){return K[L].text
}}return this.opt.fixed?I.toFixed(M<0?-M:0):I.toString()
}})
})()
}}});