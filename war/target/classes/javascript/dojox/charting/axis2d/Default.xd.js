dojo._xdResourceLoaded({depends:[["provide","dojox.charting.axis2d.Default"],["require","dojox.charting.scaler"],["require","dojox.charting.axis2d.common"],["require","dojox.charting.axis2d.Base"],["require","dojo.colors"],["require","dojox.gfx"],["require","dojox.lang.functional"],["require","dojox.lang.utils"]],defineResource:function(A){if(!A._hasResource["dojox.charting.axis2d.Default"]){A._hasResource["dojox.charting.axis2d.Default"]=true;
A.provide("dojox.charting.axis2d.Default");
A.require("dojox.charting.scaler");
A.require("dojox.charting.axis2d.common");
A.require("dojox.charting.axis2d.Base");
A.require("dojo.colors");
A.require("dojox.gfx");
A.require("dojox.lang.functional");
A.require("dojox.lang.utils");
(function(){var D=dojox.charting,H=dojox.lang.functional,E=dojox.lang.utils,F=dojox.gfx,G=4,C=0.8;
var B=function(J,I){return Math.abs(J-I)<=0.000001*(Math.abs(J)+Math.abs(I))
};
A.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,htmlLabels:true},optionalParams:{min:0,max:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],stroke:{},majorTick:{},minorTick:{},font:"",fontColor:""},constructor:function(J,I){this.opt=A.clone(this.defaultParams);
E.updateWithObject(this.opt,I);
E.updateWithPattern(this.opt,I,this.optionalParams)
},dependOnData:function(){return !("min" in this.opt)||!("max" in this.opt)
},clear:function(){delete this.scaler;
this.dirty=true;
return this
},initialized:function(){return"scaler" in this
},calculate:function(J,Q,R,N){if(this.initialized()){return this
}this.labels="labels" in this.opt?this.opt.labels:N;
if("min" in this.opt){J=this.opt.min
}if("max" in this.opt){Q=this.opt.max
}if(this.opt.includeZero){if(J>0){J=0
}if(Q<0){Q=0
}}var I=0,K=this.chart.theme.axis,P="font" in this.opt?this.opt.font:K.font,S=P?F.normalizedLength(F.splitFontString(P).size):0;
if(this.vertical){if(S){I=S+G
}}else{if(S){var O=Math.ceil(Math.log(Math.max(Math.abs(J),Math.abs(Q)))/Math.LN10);
if(J<0||Q<0){++O
}var M=Math.floor(Math.log(Q-J)/Math.LN10);
if(M>0){O+=M
}if(this.labels){O=H.foldl(H.map(this.labels,"x.text.length"),"Math.max(a, b)",O)
}I=Math.floor(S*O*C)+G
}}var L={fixUpper:this.opt.fixUpper,fixLower:this.opt.fixLower,natural:this.opt.natural};
if("majorTickStep" in this.opt){L.majorTick=this.opt.majorTickStep
}if("minorTickStep" in this.opt){L.minorTick=this.opt.minorTickStep
}if("microTickStep" in this.opt){L.microTick=this.opt.microTickStep
}this.scaler=dojox.charting.scaler(J,Q,R,L);
this.scaler.minMinorStep=I;
return this
},getScaler:function(){return this.scaler
},getOffsets:function(){var I={l:0,r:0,t:0,b:0};
var J=0,K=this.chart.theme.axis,P="font" in this.opt?this.opt.font:K.font,S="majorTick" in this.opt?this.opt.majorTick:K.majorTick,L="minorTick" in this.opt?this.opt.minorTick:K.minorTick,U=P?F.normalizedLength(F.splitFontString(P).size):0;
if(this.vertical){if(U){var T=this.scaler,R=this._getLabel(T.major.start,T.major.prec).length,Q=this._getLabel(T.major.start+T.major.count*T.major.tick,T.major.prec).length,O=this._getLabel(T.minor.start,T.minor.prec).length,N=this._getLabel(T.minor.start+T.minor.count*T.minor.tick,T.minor.prec).length,M=Math.max(R,Q,O,N);
if(this.labels){M=H.foldl(H.map(this.labels,"x.text.length"),"Math.max(a, b)",M)
}J=Math.floor(U*M*C)+G
}J+=G+Math.max(S.length,L.length);
I[this.opt.leftBottom?"l":"r"]=J;
I.t=I.b=U/2
}else{if(U){J=U+G
}J+=G+Math.max(S.length,L.length);
I[this.opt.leftBottom?"b":"t"]=J;
if(U){var T=this.scaler,R=this._getLabel(T.major.start,T.major.prec).length,Q=this._getLabel(T.major.start+T.major.count*T.major.tick,T.major.prec).length,O=this._getLabel(T.minor.start,T.minor.prec).length,N=this._getLabel(T.minor.start+T.minor.count*T.minor.tick,T.minor.prec).length,M=Math.max(R,Q,O,N);
if(this.labels){M=H.foldl(H.map(this.labels,"x.text.length"),"Math.max(a, b)",M)
}I.l=I.r=Math.floor(U*M*C)/2
}}return I
},render:function(b,P){if(!this.dirty){return this
}var N,a,S,I,d,j,T=this.chart.theme.axis,i="stroke" in this.opt?this.opt.stroke:T.stroke,V="majorTick" in this.opt?this.opt.majorTick:T.majorTick,M="minorTick" in this.opt?this.opt.minorTick:T.minorTick,h="font" in this.opt?this.opt.font:T.font,J="fontColor" in this.opt?this.opt.fontColor:T.fontColor,Y=Math.max(V.length,M.length),X=h?F.normalizedLength(F.splitFontString(h).size):0;
if(this.vertical){N={y:b.height-P.b};
a={y:P.t};
S={x:0,y:-1};
if(this.opt.leftBottom){N.x=a.x=P.l;
I={x:-1,y:0};
j="end"
}else{N.x=a.x=b.width-P.r;
I={x:1,y:0};
j="start"
}d={x:I.x*(Y+G),y:X*0.4}
}else{N={x:P.l};
a={x:b.width-P.r};
S={x:1,y:0};
j="middle";
if(this.opt.leftBottom){N.y=a.y=b.height-P.b;
I={x:0,y:1};
d={y:Y+G+X}
}else{N.y=a.y=P.t;
I={x:0,y:-1};
d={y:-Y-G}
}d.x=0
}this.cleanGroup();
var W=this.group,g=this.scaler,Q,Z,e=g.major.start,L=g.minor.start,K=g.micro.start;
W.createLine({x1:N.x,y1:N.y,x2:a.x,y2:a.y}).setStroke(i);
if(this.opt.microTicks&&g.micro.tick){Q=g.micro.tick,Z=K
}else{if(this.opt.minorTicks&&g.minor.tick){Q=g.minor.tick,Z=L
}else{if(g.major.tick){Q=g.major.tick,Z=e
}else{return this
}}}while(Z<=g.bounds.upper+1/g.scale){var O=(Z-g.bounds.lower)*g.scale,U=N.x+S.x*O,R=N.y+S.y*O;
if(Math.abs(e-Z)<Q/2){W.createLine({x1:U,y1:R,x2:U+I.x*V.length,y2:R+I.y*V.length}).setStroke(V);
if(this.opt.majorLabels){var f=D.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,W,U+d.x,R+d.y,j,this._getLabel(e,g.major.prec),h,J);
if(this.opt.htmlLabels){this.htmlElements.push(f)
}}e+=g.major.tick;
L+=g.minor.tick;
K+=g.micro.tick
}else{if(Math.abs(L-Z)<Q/2){if(this.opt.minorTicks){W.createLine({x1:U,y1:R,x2:U+I.x*M.length,y2:R+I.y*M.length}).setStroke(M);
if(this.opt.minorLabels&&(g.minMinorStep<=g.minor.tick*g.scale)){var f=D.axis2d.common.createText[this.opt.htmlLabels?"html":"gfx"](this.chart,W,U+d.x,R+d.y,j,this._getLabel(L,g.minor.prec),h,J);
if(this.opt.htmlLabels){this.htmlElements.push(f)
}}}L+=g.minor.tick;
K+=g.micro.tick
}else{if(this.opt.microTicks){W.createLine({x1:U,y1:R,x2:U+I.x*M.length,y2:R+I.y*M.length}).setStroke(M)
}K+=g.micro.tick
}}Z+=Q
}this.dirty=false;
return this
},_getLabel:function(N,J){if(this.opt.labels){var I=this.opt.labels,M=0,L=I.length;
while(M<L){var K=Math.floor((M+L)/2),O=I[K].value;
if(O<N){M=K+1
}else{L=K
}}if(M<I.length&&B(I[M].value,N)){return I[M].text
}--M;
if(M<I.length&&B(I[M].value,N)){return I[M].text
}M+=2;
if(M<I.length&&B(I[M].value,N)){return I[M].text
}}return this.opt.fixed?N.toFixed(J<0?-J:0):N.toString()
}})
})()
}}});