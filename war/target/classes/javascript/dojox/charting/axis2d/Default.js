if(!dojo._hasResource["dojox.charting.axis2d.Default"]){dojo._hasResource["dojox.charting.axis2d.Default"]=true;
dojo.provide("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.scaler");
dojo.require("dojox.charting.axis2d.common");
dojo.require("dojox.charting.axis2d.Base");
dojo.require("dojo.colors");
dojo.require("dojox.gfx");
dojo.require("dojox.lang.functional");
dojo.require("dojox.lang.utils");
(function(){var C=dojox.charting,G=dojox.lang.functional,D=dojox.lang.utils,E=dojox.gfx,F=4,B=0.8;
var A=function(I,H){return Math.abs(I-H)<=0.000001*(Math.abs(I)+Math.abs(H))
};
dojo.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,htmlLabels:true},optionalParams:{min:0,max:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],stroke:{},majorTick:{},minorTick:{},font:"",fontColor:""},constructor:function(I,H){this.opt=dojo.clone(this.defaultParams);
D.updateWithObject(this.opt,H);
D.updateWithPattern(this.opt,H,this.optionalParams)
},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt)
},clear:function(){delete this.scaler;
this.dirty=true;
return this
},initialized:function(){return"scaler" in this
},calculate:function(I,P,Q,M){if(this.initialized()){return this
}this.labels="labels" in this.opt?this.opt.labels:M;
if("min" in this.opt){I=this.opt.min
}if("max" in this.opt){P=this.opt.max
}if(this.opt.includeZero){if(I>0){I=0
}if(P<0){P=0
}}var H=0,J=this.chart.theme.axis,O="font" in this.opt?this.opt.font:J.font,R=O?E.normalizedLength(E.splitFontString(O).size):0;
if(this.vertical){if(R){H=R+F
}}else{if(R){var N=Math.ceil(Math.log(Math.max(Math.abs(I),Math.abs(P)))/Math.LN10);
if(I<0||P<0){++N
}var L=Math.floor(Math.log(P-I)/Math.LN10);
if(L>0){N+=L
}if(this.labels){N=G.foldl(G.map(this.labels,"x.text.length"),"Math.max(a, b)",N)
}H=Math.floor(R*N*B)+F
}}var K={fixUpper:this.opt.fixUpper,fixLower:this.opt.fixLower,natural:this.opt.natural};
if("majorTickStep" in this.opt){K.majorTick=this.opt.majorTickStep
}if("minorTickStep" in this.opt){K.minorTick=this.opt.minorTickStep
}if("microTickStep" in this.opt){K.microTick=this.opt.microTickStep
}this.scaler=dojox.charting.scaler(I,P,Q,K);
this.scaler.minMinorStep=H;
return this
},getScaler:function(){return this.scaler
},getOffsets:function(){var H={l:0,r:0,t:0,b:0};
var I=0,J=this.chart.theme.axis,O="font" in this.opt?this.opt.font:J.font,R="majorTick" in this.opt?this.opt.majorTick:J.majorTick,K="minorTick" in this.opt?this.opt.minorTick:J.minorTick,T=O?E.normalizedLength(E.splitFontString(O).size):0;
if(this.vertical){if(T){var S=this.scaler,Q=this._getLabel(S.major.start,S.major.prec).length,P=this._getLabel(S.major.start+S.major.count*S.major.tick,S.major.prec).length,N=this._getLabel(S.minor.start,S.minor.prec).length,M=this._getLabel(S.minor.start+S.minor.count*S.minor.tick,S.minor.prec).length,L=Math.max(Q,P,N,M);
if(this.labels){L=G.foldl(G.map(this.labels,"x.text.length"),"Math.max(a, b)",L)
}I=Math.floor(T*L*B)+F
}I+=F+Math.max(R.length,K.length);
H[this.opt.leftBottom?"l":"r"]=I;
H.t=H.b=T/2
}else{if(T){I=T+F
}I+=F+Math.max(R.length,K.length);
H[this.opt.leftBottom?"b":"t"]=I;
if(T){var S=this.scaler,Q=this._getLabel(S.major.start,S.major.prec).length,P=this._getLabel(S.major.start+S.major.count*S.major.tick,S.major.prec).length,N=this._getLabel(S.minor.start,S.minor.prec).length,M=this._getLabel(S.minor.start+S.minor.count*S.minor.tick,S.minor.prec).length,L=Math.max(Q,P,N,M);
if(this.labels){L=G.foldl(G.map(this.labels,"x.text.length"),"Math.max(a, b)",L)
}H.l=H.r=Math.floor(T*L*B)/2
}}return H
},render:function(a,O){if(!this.dirty){return this
}var M,Z,R,H,b,i,S=this.chart.theme.axis,h="stroke" in this.opt?this.opt.stroke:S.stroke,U="majorTick" in this.opt?this.opt.majorTick:S.majorTick,L="minorTick" in this.opt?this.opt.minorTick:S.minorTick,g="font" in this.opt?this.opt.font:S.font,I="fontColor" in this.opt?this.opt.fontColor:S.fontColor,X=Math.max(U.length,L.length),W=g?E.normalizedLength(E.splitFontString(g).size):0;
if(this.vertical){M={y:a.height-O.b};
Z={y:O.t};
R={x:0,y:-1};
if(this.opt.leftBottom){M.x=Z.x=O.l;
H={x:-1,y:0};
i="end"
}else{M.x=Z.x=a.width-O.r;
H={x:1,y:0};
i="start"
}b={x:H.x*(X+F),y:W*0.4}
}else{M={x:O.l};
Z={x:a.width-O.r};
R={x:1,y:0};
i="middle";
if(this.opt.leftBottom){M.y=Z.y=a.height-O.b;
H={x:0,y:1};
b={y:X+F+W}
}else{M.y=Z.y=O.t;
H={x:0,y:-1};
b={y:-X-F}
}b.x=0
}this.cleanGroup();
var V=this.group,f=this.scaler,P,Y,d=f.major.start,K=f.minor.start,J=f.micro.start;
V.createLine({x1:M.x,y1:M.y,x2:Z.x,y2:Z.y}).setStroke(h);
if(this.opt.microTicks&&f.micro.tick){P=f.micro.tick,Y=J
}else{if(this.opt.minorTicks&&f.minor.tick){P=f.minor.tick,Y=K
}else{if(f.major.tick){P=f.major.tick,Y=d
}else{return this
}}}while(Y<=f.bounds.upper+1/f.scale){var N=(Y-f.bounds.lower)*f.scale,T=M.x+R.x*N,Q=M.y+R.y*N;
if(Math.abs(d-Y)<P/2){V.createLine({x1:T,y1:Q,x2:T+H.x*U.length,y2:Q+H.y*U.length}).setStroke(U);
if(this.opt.majorLabels){var e=C.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,V,T+b.x,Q+b.y,i,this._getLabel(d,f.major.prec),g,I);
if(this.opt.htmlLabels){this.htmlElements.push(e)
}}d+=f.major.tick;
K+=f.minor.tick;
J+=f.micro.tick
}else{if(Math.abs(K-Y)<P/2){if(this.opt.minorTicks){V.createLine({x1:T,y1:Q,x2:T+H.x*L.length,y2:Q+H.y*L.length}).setStroke(L);
if(this.opt.minorLabels&&(f.minMinorStep<=f.minor.tick*f.scale)){var e=C.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,V,T+b.x,Q+b.y,i,this._getLabel(K,f.minor.prec),g,I);
if(this.opt.htmlLabels){this.htmlElements.push(e)
}}}K+=f.minor.tick;
J+=f.micro.tick
}else{if(this.opt.microTicks){V.createLine({x1:T,y1:Q,x2:T+H.x*L.length,y2:Q+H.y*L.length}).setStroke(L)
}J+=f.micro.tick
}}Y+=P
}this.dirty=false;
return this
},_getLabel:function(M,I){if(this.opt.labels){var H=this.opt.labels,L=0,K=H.length;
while(L<K){var J=Math.floor((L+K)/2),N=H[J].value;
if(N<M){L=J+1
}else{K=J
}}if(L<H.length&&A(H[L].value,M)){return H[L].text
}--L;
if(L<H.length&&A(H[L].value,M)){return H[L].text
}L+=2;
if(L<H.length&&A(H[L].value,M)){return H[L].text
}}return this.opt.fixed?M.toFixed(I<0?-I:0):M.toString()
}})
})()
};