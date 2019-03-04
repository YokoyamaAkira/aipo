if(!dojo._hasResource["dojox.color.Colorspace"]){dojo._hasResource["dojox.color.Colorspace"]=true;
dojo.provide("dojox.color.Colorspace");
dojo.require("dojox.math.matrix");
dojox.color.Colorspace=new (function(){var D=dojox.color;
var E=dojox.math.matrix;
var C=this;
var G={"2":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34567,y:0.3585,t:5000},D55:{x:0.33242,y:0.34743,t:5500},D65:{x:0.31271,y:0.32902,t:6500},D75:{x:0.29902,y:0.31485,t:7500},A:{x:0.44757,y:0.40745,t:2856},B:{x:0.34842,y:0.35161,t:4874},C:{x:0.31006,y:0.31616,t:6774},"9300":{x:0.2848,y:0.2932,t:9300},F2:{x:0.37207,y:0.37512,t:4200},F7:{x:0.31285,y:0.32918,t:6500},F11:{x:0.38054,y:0.37691,t:4000}},"10":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34773,y:0.35952,t:5000},D55:{x:0.33411,y:0.34877,t:5500},D65:{x:0.31382,y:0.331,t:6500},D75:{x:0.29968,y:0.3174,t:7500},A:{x:0.45117,y:0.40594,t:2856},B:{x:0.3498,y:0.3527,t:4874},C:{x:0.31039,y:0.31905,t:6774},F2:{x:0.37928,y:0.36723,t:4200},F7:{x:0.31565,y:0.32951,t:6500},F11:{x:0.38543,y:0.3711,t:4000}}};
var B={"Adobe RGB 98":[2.2,"D65",0.64,0.33,0.297361,0.21,0.71,0.627355,0.15,0.06,0.075285],"Apple RGB":[1.8,"D65",0.625,0.34,0.244634,0.28,0.595,0.672034,0.155,0.07,0.083332],"Best RGB":[2.2,"D50",0.7347,0.2653,0.228457,0.215,0.775,0.737352,0.13,0.035,0.034191],"Beta RGB":[2.2,"D50",0.6888,0.3112,0.303273,0.1986,0.7551,0.663786,0.1265,0.0352,0.032941],"Bruce RGB":[2.2,"D65",0.64,0.33,0.240995,0.28,0.65,0.683554,0.15,0.06,0.075452],"CIE RGB":[2.2,"E",0.735,0.265,0.176204,0.274,0.717,0.812985,0.167,0.009,0.010811],"ColorMatch RGB":[1.8,"D50",0.63,0.34,0.274884,0.295,0.605,0.658132,0.15,0.075,0.066985],"DON RGB 4":[2.2,"D50",0.696,0.3,0.27835,0.215,0.765,0.68797,0.13,0.035,0.03368],"ECI RGB":[1.8,"D50",0.67,0.33,0.32025,0.21,0.71,0.602071,0.14,0.08,0.077679],"EktaSpace PS5":[2.2,"D50",0.695,0.305,0.260629,0.26,0.7,0.734946,0.11,0.005,0.004425],"NTSC RGB":[2.2,"C",0.67,0.33,0.298839,0.21,0.71,0.586811,0.14,0.08,0.11435],"PAL/SECAM RGB":[2.2,"D65",0.64,0.33,0.222021,0.29,0.6,0.706645,0.15,0.06,0.071334],"Pro Photo RGB":[1.8,"D50",0.7347,0.2653,0.28804,0.1596,0.8404,0.711874,0.0366,0.0001,0.000086],"SMPTE/C RGB":[2.2,"D65",0.63,0.34,0.212395,0.31,0.595,0.701049,0.155,0.07,0.086556],sRGB:[2.2,"D65",0.64,0.33,0.212656,0.3,0.6,0.715158,0.15,0.06,0.072186],"Wide Gamut RGB":[2.2,"D50",0.735,0.265,0.258187,0.115,0.826,0.724938,0.157,0.018,0.016875]};
var A={"XYZ scaling":{ma:[[1,0,0],[0,1,0],[0,0,1]],mai:[[1,0,0],[0,1,0],[0,0,1]]},Bradford:{ma:[[0.8951,-0.7502,0.0389],[0.2664,1.7135,-0.0685],[-0.1614,0.0367,1.0296]],mai:[[0.986993,0.432305,-0.008529],[-0.147054,0.51836,0.040043],[0.159963,0.049291,0.968487]]},"Von Kries":{ma:[[0.40024,-0.2263,0],[0.7076,1.16532,0],[-0.08081,0.0457,0.91822]],mai:[[1.859936,0.361191,0],[-1.129382,0.638812,0],[0.219897,-0.000006,1.089064]]}};
var F={XYZ:{xyY:function(J,L){L=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},L||{});
var K=C.whitepoint(L.whitepoint,L.observer);
var M=J.X+J.Y+J.Z;
if(M==0){var I=K.x,N=K.y
}else{var I=J.X/M,N=J.Y/M
}return{x:I,y:N,Y:J.Y}
},Lab:function(R,N){N=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},N||{});
var O=C.kappa(N.useApproximation),V=C.epsilon(N.useApproximation);
var T=C.whitepoint(N.whitepoint,N.observer);
var M=R.X/T.x,W=R.Y/T.y,P=R.z/T.z;
var K=(M>V)?Math.pow(M,1/3):(O*M+16)/116;
var J=(W>V)?Math.pow(W,1/3):(O*W+16)/116;
var I=(P>V)?Math.pow(P,1/3):(O*P+16)/116;
var Q=116*J-16,U=500*(K-J),S=200*(J-I);
return{L:Q,a:U,b:S}
},Luv:function(N,I){I=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},I||{});
var J=C.kappa(I.useApproximation),T=C.epsilon(I.useApproximation);
var P=C.whitepoint(I.whitepoint,I.observer);
var V=(4*N.X)/(N.X+15*N.Y+3*N.Z);
var K=(9*N.Y)/(N.X+15*N.Y+3*N.Z);
var O=(4*P.x)/(P.x+15*P.y+3*P.z);
var S=(9*P.y)/(P.x+15*P.y+3*P.z);
var U=N.Y/P.y;
var M=(U>T)?116*Math.pow(U,1/3)-16:J*U;
var R=13*M*(V-O);
var Q=13*M*(K-S);
return{L:M,u:R,v:Q}
}},xyY:{XYZ:function(I){if(I.y==0){var L=0,K=0,J=0
}else{var L=(I.x*I.Y)/I.y;
var K=I.Y;
var J=((1-I.x-I.y)*I.Y)/I.y
}return{X:L,Y:K,Z:J}
}},Lab:{XYZ:function(M,N){N=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},N||{});
var R=N.useApproximation,O=C.kappa(R),T=C.epsilon(R);
var Q=C.whitepoint(N.whitepoint,N.observer);
var U=(M.L>(O*T))?Math.pow((M.L+16)/116,3):M.L/O;
var J=(U>T)?(M.L+16)/116:(O*U+16)/116;
var L=(M.a/500)+J;
var I=J-(M.b/200);
var V=Math.pow(L,3),S=Math.pow(I,3);
var K=(V>T)?V:(116*L-16)/O;
var P=(S>T)?S:(116*I-16)/O;
return{X:K*Q.x,Y:U*Q.y,Z:P*Q.z}
},LCHab:function(K){var I=K.L,M=Math.pow(K.a*K.a+K.b*K.b,0.5),J=Math.atan(K.b,K.a)*(180/Math.PI);
if(J<0){J+=360
}if(J<360){J-=360
}return{L:I,C:M,H:J}
}},LCHab:{Lab:function(M){var N=M.H*(Math.PI/180),J=M.L,K=M.C/Math.pow(Math.pow(Math.tan(N),2)+1,0.5);
if(90<lchH&&M.H<270){K=-K
}var I=Math.pow(Math.pow(M.C,2)-Math.pow(K,2),0.5);
if(M.H>180){I=-I
}return{L:J,a:K,b:I}
}},Luv:{XYZ:function(Q,L){L=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},L||{});
var S=L.useApproximation,M=C.kappa(S),U=C.epsilon(S);
var R=C.whitepoint(L.whitepoint,L.observer);
var V=(4*R.x)/(R.x+15*R.y+3*R.z);
var O=(9*R.y)/(R.x+15*R.y+3*R.z);
var J=(Q.L>M*U)?Math.pow((Q.L+16)/116,3):Q.L/M;
var T=(1/3)*(((52*Q.L)/(Q.u+13*Q.L*V))-1);
var S=-5*J,P=-(1/3),N=J*(((39*Q.L)/(Q.v+13*Q.L*O))-5);
var K=(N-S)/(T-P),I=K*T+S;
return{X:K,Y:J,Z:I}
},LCHuv:function(M){var I=M.L,K=Math.pow(M.u*M.u+M.v*M*v,0.5),J=Math.atan(M.v,M.u)*(180/Math.PI);
if(J<0){J+=360
}if(J>360){J-=360
}return{L:I,C:K,H:J}
}},LCHuv:{Luv:function(N){var M=N.H*(Math.PI/180);
var I=N.L,K=N.C/Math.pow(Math.pow(Math.tan(M),2)+1,0.5);
var J=Math.pow(N.C*N.C-K*K,0.5);
if(90<N.H&&N.H>270){K*=-1
}if(N.H>180){J*=-1
}return{L:I,u:K,v:J}
}}};
var H={CMY:{CMYK:function(J,I){return D.fromCmy(J).toCmyk()
},HSL:function(J,I){return D.fromCmy(J).toHsl()
},HSV:function(J,I){return D.fromCmy(J).toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](D.fromCmy(J).toXYZ(I))
},LCHab:function(J,I){return F.Lab["LCHab"](H.CMY["Lab"](J))
},LCHuv:function(J,I){return F.LCHuv["Luv"](F.Luv["XYZ"](D.fromCmy(J).toXYZ(I)))
},Luv:function(J,I){return F.Luv["XYZ"](D.fromCmy(J).toXYZ(I))
},RGB:function(J,I){return D.fromCmy(J)
},XYZ:function(J,I){return D.fromCmy(J).toXYZ(I)
},xyY:function(J,I){return F.XYZ["xyY"](D.fromCmy(J).toXYZ(I))
}},CMYK:{CMY:function(J,I){return D.fromCmyk(J).toCmy()
},HSL:function(J,I){return D.fromCmyk(J).toHsl()
},HSV:function(J,I){return D.fromCmyk(J).toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](D.fromCmyk(J).toXYZ(I))
},LCHab:function(J,I){return F.Lab["LCHab"](H.CMYK["Lab"](J))
},LCHuv:function(J,I){return F.LCHuv["Luv"](F.Luv["XYZ"](D.fromCmyk(J).toXYZ(I)))
},Luv:function(J,I){return F.Luv["XYZ"](D.fromCmyk(J).toXYZ(I))
},RGB:function(J,I){return D.fromCmyk(J)
},XYZ:function(J,I){return D.fromCmyk(J).toXYZ(I)
},xyY:function(J,I){return F.XYZ["xyY"](D.fromCmyk(J).toXYZ(I))
}},HSL:{CMY:function(J,I){return D.fromHsl(J).toCmy()
},CMYK:function(J,I){return D.fromHsl(J).toCmyk()
},HSV:function(J,I){return D.fromHsl(J).toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](D.fromHsl(J).toXYZ(I))
},LCHab:function(J,I){return F.Lab["LCHab"](H.CMYK["Lab"](J))
},LCHuv:function(J,I){return F.LCHuv["Luv"](F.Luv["XYZ"](D.fromHsl(J).toXYZ(I)))
},Luv:function(J,I){return F.Luv["XYZ"](D.fromHsl(J).toXYZ(I))
},RGB:function(J,I){return D.fromHsl(J)
},XYZ:function(J,I){return D.fromHsl(J).toXYZ(I)
},xyY:function(J,I){return F.XYZ["xyY"](D.fromHsl(J).toXYZ(I))
}},HSV:{CMY:function(J,I){return D.fromHsv(J).toCmy()
},CMYK:function(J,I){return D.fromHsv(J).toCmyk()
},HSL:function(J,I){return D.fromHsv(J).toHsl()
},Lab:function(J,I){return F.XYZ["Lab"](D.fromHsv(J).toXYZ(I))
},LCHab:function(J,I){return F.Lab["LCHab"](H.CMYK["Lab"](J))
},LCHuv:function(J,I){return F.LCHuv["Luv"](F.Luv["XYZ"](D.fromHsv(J).toXYZ(I)))
},Luv:function(J,I){return F.Luv["XYZ"](D.fromHsv(J).toXYZ(I))
},RGB:function(J,I){return D.fromHsv(J)
},XYZ:function(J,I){return D.fromHsv(J).toXYZ(I)
},xyY:function(J,I){return F.XYZ["xyY"](D.fromHsv(J).toXYZ(I))
}},Lab:{CMY:function(J,I){return D.fromXYZ(F.Lab["XYZ"](J,I)).toCmy()
},CMYK:function(J,I){return D.fromXYZ(F.Lab["XYZ"](J,I)).toCmyk()
},HSL:function(J,I){return D.fromXYZ(F.Lab["XYZ"](J,I)).toHsl()
},HSV:function(J,I){return D.fromXYZ(F.Lab["XYZ"](J,I)).toHsv()
},LCHab:function(J,I){return F.Lab["LCHab"](J,I)
},LCHuv:function(J,I){return F.Luv["LCHuv"](F.Lab["XYZ"](J,I),I)
},Luv:function(J,I){return F.XYZ["Luv"](F.Lab["XYZ"](J,I),I)
},RGB:function(J,I){return D.fromXYZ(F.Lab["XYZ"](J,I))
},XYZ:function(J,I){return F.Lab["XYZ"](J,I)
},xyY:function(J,I){return F.XYZ["xyY"](F.Lab["XYZ"](J,I),I)
}},LCHab:{CMY:function(J,I){return D.fromXYZ(F.Lab["XYZ"](F.LCHab["Lab"](J),I),I).toCmy()
},CMYK:function(J,I){return D.fromXYZ(F.Lab["XYZ"](F.LCHab["Lab"](J),I),I).toCmyk()
},HSL:function(J,I){return D.fromXYZ(F.Lab["XYZ"](F.LCHab["Lab"](J),I),I).toHsl()
},HSV:function(J,I){return D.fromXYZ(F.Lab["XYZ"](F.LCHab["Lab"](J),I),I).toHsv()
},Lab:function(J,I){return F.Lab["LCHab"](J,I)
},LCHuv:function(J,I){return F.Luv["LCHuv"](F.XYZ["Luv"](F.Lab["XYZ"](F.LCHab["Lab"](J),I),I),I)
},Luv:function(J,I){return F.XYZ["Luv"](F.Lab["XYZ"](F.LCHab["Lab"](J),I),I)
},RGB:function(J,I){return D.fromXYZ(F.Lab["XYZ"](F.LCHab["Lab"](J),I),I)
},XYZ:function(J,I){return F.Lab["XYZ"](F.LCHab["Lab"](J,I),I)
},xyY:function(J,I){return F.XYZ["xyY"](F.Lab["XYZ"](F.LCHab["Lab"](J),I),I)
}},LCHuv:{CMY:function(J,I){return D.fromXYZ(F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I).toCmy()
},CMYK:function(J,I){return D.fromXYZ(F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I).toCmyk()
},HSL:function(J,I){return D.fromXYZ(F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I).toHsl()
},HSV:function(J,I){return D.fromXYZ(F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I).toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I)
},LCHab:function(J,I){return F.Lab["LCHab"](F.XYZ["Lab"](F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I),I)
},Luv:function(J,I){return F.LCHuv["Luv"](J,I)
},RGB:function(J,I){return D.fromXYZ(F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I)
},XYZ:function(J,I){return F.Luv["XYZ"](F.LCHuv["Luv"](J),I)
},xyY:function(J,I){return F.XYZ["xyY"](F.Luv["XYZ"](F.LCHuv["Luv"](J),I),I)
},},Luv:{CMY:function(J,I){return D.fromXYZ(F.Luv["XYZ"](J,I),I).toCmy()
},CMYK:function(J,I){return D.fromXYZ(F.Luv["XYZ"](J,I),I).toCmyk()
},HSL:function(J,I){return D.fromXYZ(F.Luv["XYZ"](J,I),I).toHsl()
},HSV:function(J,I){return D.fromXYZ(F.Luv["XYZ"](J,I),I).toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](F.Luv["XYZ"](J,I),I)
},LCHab:function(J,I){return F.Lab["LCHab"](F.XYZ["Lab"](F.Luv["XYZ"](J,I),I),I)
},LCHuv:function(J,I){return F.Luv["LCHuv"](J,I)
},RGB:function(J,I){return D.fromXYZ(F.Luv["XYZ"](J,I),I)
},XYZ:function(J,I){return F.Luv["XYZ"](J,I)
},xyY:function(J,I){return F.XYZ["xyY"](F.Luv["XYZ"](J,I),I)
},},RGB:{CMY:function(J,I){return J.toCmy()
},CMYK:function(J,I){return J.toCmyk()
},HSL:function(J,I){return J.toHsl()
},HSV:function(J,I){return J.toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](J.toXYZ(I),I)
},LCHab:function(J,I){return F.LCHab["Lab"](F.XYZ["Lab"](J.toXYZ(I),I),I)
},LCHuv:function(J,I){return F.LCHuv["Luv"](F.XYZ["Luv"](J.toXYZ(I),I),I)
},Luv:function(J,I){return F.XYZ["Luv"](J.toXYZ(I),I)
},XYZ:function(J,I){return J.toXYZ(I)
},xyY:function(J,I){return F.XYZ["xyY"](J.toXYZ(I),I)
}},XYZ:{CMY:function(J,I){return D.fromXYZ(J,I).toCmy()
},CMYK:function(J,I){return D.fromXYZ(J,I).toCmyk()
},HSL:function(J,I){return D.fromXYZ(J,I).toHsl()
},HSV:function(J,I){return D.fromXYZ(J,I).toHsv()
},Lab:function(J,I){return F.XYZ["Lab"](J,I)
},LCHab:function(J,I){return F.Lab["LCHab"](F.XYZ["Lab"](J,I),I)
},LCHuv:function(J,I){return F.Luv["LCHuv"](F.XYZ["Luv"](J,I),I)
},Luv:function(J,I){return F.XYZ["Luv"](J,I)
},RGB:function(J,I){return D.fromXYZ(J,I)
},xyY:function(J,I){return F.XYZ["xyY"](D.fromXYZ(J,I),I)
}},xyY:{CMY:function(J,I){return D.fromXYZ(F.xyY["XYZ"](J,I),I).toCmy()
},CMYK:function(J,I){return D.fromXYZ(F.xyY["XYZ"](J,I),I).toCmyk()
},HSL:function(J,I){return D.fromXYZ(F.xyY["XYZ"](J,I),I).toHsl()
},HSV:function(J,I){return D.fromXYZ(F.xyY["XYZ"](J,I),I).toHsv()
},Lab:function(J,I){return F.Lab["XYZ"](F.xyY["XYZ"](J,I),I)
},LCHab:function(J,I){return F.LCHab["Lab"](F.Lab["XYZ"](F.xyY["XYZ"](J,I),I),I)
},LCHuv:function(J,I){return F.LCHuv["Luv"](F.Luv["XYZ"](F.xyY["XYZ"](J,I),I),I)
},Luv:function(J,I){return F.Luv["XYZ"](F.xyY["XYZ"](J,I),I)
},RGB:function(J,I){return D.fromXYZ(F.xyY["XYZ"](J,I),I)
},XYZ:function(J,I){return F.xyY["XYZ"](J,I)
}}};
this.whitepoint=function(M,J){J=J||"10";
var I=0,N=0,L=0;
if(G[J]&&G[J][M]){I=G[J][M].x;
N=G[J][M].y;
L=G[J][M].t
}else{console.warn("dojox.color.Colorspace::whitepoint: either the observer or the whitepoint name was not found. ",J,M)
}var K={x:I,y:N,z:(1-I-N),t:L,Y:1};
return this.convert(K,"xyY","XYZ")
};
this.tempToWhitepoint=function(P){if(P<4000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures less than 4000K. (Passed ",P,").");
return{x:0,y:0}
}if(P>25000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures greater than 25000K. (Passed ",P,").");
return{x:0,y:0}
}var M=P,L=P*P,K=L*P;
var Q=Math.pow(10,9),I=Math.pow(10,6),J=Math.pow(10,3);
if(P<=7000){var O=(-4.607*Q/K)+(2.9678*I/L)+(0.09911*J/P)+0.2444063
}else{var O=(-2.0064*Q/K)+(1.9018*I/L)+(0.24748*J/P)+0.23704
}var N=-3*O*O+2.87*O-0.275;
return{x:O,y:N}
};
this.primaries=function(K){K=dojo.mixin({profile:"sRGB",whitepoint:"D65",observer:"10",adaptor:"Bradford"},K||{});
var J=[];
if(B[K.profile]){J=B[K.profile].slice(0)
}else{console.warn("dojox.color.Colorspace::primaries: the passed profile was not found.  ","Available profiles include: ",B,".  The profile passed was ",K.profile)
}var L={name:K.profile,gamma:J[0],whitepoint:J[1],xr:J[2],yr:J[3],Yr:J[4],xg:J[5],yg:J[6],Yg:J[7],xb:J[8],yb:J[9],Yb:J[10]};
if(K.whitepoint!=L.whitepoint){var N=this.convert(this.adapt({color:this.convert({x:xr,y:yr,Y:Yr},"xyY","XYZ"),adaptor:K.adaptor,source:L.whitepoint,destination:K.whitepoint}),"XYZ","xyY");
var M=this.convert(this.adapt({color:this.convert({x:xg,y:yg,Y:Yg},"xyY","XYZ"),adaptor:K.adaptor,source:L.whitepoint,destination:K.whitepoint}),"XYZ","xyY");
var I=this.convert(this.adapt({color:this.convert({x:xb,y:yb,Y:Yb},"xyY","XYZ"),adaptor:K.adaptor,source:L.whitepoint,destination:K.whitepoint}),"XYZ","xyY");
L=dojo.mixin(L,{xr:N.x,yr:N.y,Yr:N.Y,xg:M.x,yg:M.y,Yg:M.Y,xb:I.x,yb:I.y,Yb:I.Y,whitepoint:K.whitepoint})
}return dojo.mixin(L,{zr:1-L.xr-L.yr,zg:1-L.xg-L.yg,zb:1-L.xb-L.yb})
};
this.adapt=function(N){if(!N.color||!N.source){console.error("dojox.color.Colorspace::adapt: color and source arguments are required. ",N)
}N=dojo.mixin({adaptor:"Bradford",destination:"D65"},N);
var P=this.whitepoint(N.source);
var O=this.whitepoint(N.destination);
if(A[N.adaptor]){var Q=A[N.adaptor].ma;
var L=A[N.adaptor].mai
}else{console.warn("dojox.color.Colorspace::adapt: the passed adaptor '",N.adaptor,"' was not found.")
}var R=E.multiply([[P.x,P.y,P.z]],Q);
var M=E.multiply([[O.x,O.y,O.z]],Q);
var J=[[M[0][0]/R[0][0],0,0],[0,M[0][1]/R[0][1],0],[0,0,M[0][2]/R[0][2]]];
var K=E.multiply(E.multiply(Q,J),L);
var I=E.multiply([[N.color.X,N.color.Y,N.color.Z]],K)[0];
return{X:I[0],Y:I[1],Z:I[2]}
};
this.matrix=function(M,U){var N=this.whitepoint(U.whitepoint);
var T=p.xr/p.yr,Z=1,Q=(1-p.xr-p.yr)/p.yr;
var V=p.xg/p.yg,L=1,R=(1-p.xg-p.yg)/p.yg;
var Y=p.xb/p.yb,P=1,Q=(1-p.xb-p.yb)/p.yb;
var J=[[T,Z,Q],[V,L,R],[Y,P,Zb]];
var I=[[N.X,N.Y,N.Z]];
var W=dojox.math.matrix.multiply(I,dojox.math.matrix.inverse(J));
var X=W[0][0],K=W[0][1],O=W[0][2];
var S=[[X*T,X*Z,X*Q],[K*V,K*L,K*R],[O*Y,O*P,O*Zb]];
if(M=="RGB"){return dojox.math.inverse(S)
}return S
};
this.epsilon=function(I){return(I||typeof (I)=="undefined")?0.008856:216/24289
};
this.kappa=function(I){return(I||typeof (I)=="undefined")?903.3:24389/27
};
this.convert=function(I,L,K,J){if(H[L]&&H[L][K]){return H[L][K](obj,J)
}console.warn("dojox.color.Colorspace::convert: Can't convert ",I," from ",L," to ",K,".")
}
})();
dojo.mixin(dojox.color,{fromXYZ:function(K,H){H=H||{};
var D=dojox.color.Colorspace.primaries(H);
var E=dojox.color.Colorspace.matrix("RGB",D);
var J=dojox.math.matrix.mutliply([[K.X,K.Y,K.Z]],E);
var A=J[0][0],I=J[0][1],L=J[0][2];
if(D.profile=="sRGB"){var F=(A>0.0031308)?(1.055*Math.pow(A,1/2.4))-0.055:12.92*A;
var M=(I>0.0031308)?(1.055*Math.pow(I,1/2.4))-0.055:12.92*I;
var C=(L>0.0031308)?(1.055*Math.pow(L,1/2.4))-0.055:12.92*L
}else{var F=Math.pow(A,1/D.gamma),M=Math.pow(I,1/D.gamma),C=Math.pow(L,1/D.gamma)
}return new dojox.color.Color({r:Math.floor(F*255),g:Math.floor(M*255),b:Math.floor(C*255)})
}});
dojo.extend(dojox.color.Color,{toXYZ:function(E){E=E||{};
var B=dojox.color.Colorspace.primaries(E);
var C=dojox.color.Colorspace.matrix("XYZ",B);
var J=this.r/255,D=this.g/255,H=this.b/255;
if(B.profile=="sRGB"){var A=(J>0.04045)?Math.pow(((J+0.055)/1.055),2.4):J/12.92;
var F=(D>0.04045)?Math.pow(((D+0.055)/1.055),2.4):D/12.92;
var I=(H>0.04045)?Math.pow(((H+0.055)/1.055),2.4):H/12.92
}else{var A=Math.pow(J,B.gamma),F=Math.pow(D,B.gamma),I=Math.pow(H,B.gamma)
}var G=dojox.math.matrix([[A,F,I]],C);
return{X:G[0][0],Y:G[0][1],Z:G[0][2]}
}})
};