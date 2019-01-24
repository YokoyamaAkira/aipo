dojo._xdResourceLoaded({depends:[["provide","dojox.color.Colorspace"],["require","dojox.math.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.color.Colorspace"]){A._hasResource["dojox.color.Colorspace"]=true;
A.provide("dojox.color.Colorspace");
A.require("dojox.math.matrix");
dojox.color.Colorspace=new (function(){var E=dojox.color;
var F=dojox.math.matrix;
var D=this;
var H={"2":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34567,y:0.3585,t:5000},D55:{x:0.33242,y:0.34743,t:5500},D65:{x:0.31271,y:0.32902,t:6500},D75:{x:0.29902,y:0.31485,t:7500},A:{x:0.44757,y:0.40745,t:2856},B:{x:0.34842,y:0.35161,t:4874},C:{x:0.31006,y:0.31616,t:6774},"9300":{x:0.2848,y:0.2932,t:9300},F2:{x:0.37207,y:0.37512,t:4200},F7:{x:0.31285,y:0.32918,t:6500},F11:{x:0.38054,y:0.37691,t:4000}},"10":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34773,y:0.35952,t:5000},D55:{x:0.33411,y:0.34877,t:5500},D65:{x:0.31382,y:0.331,t:6500},D75:{x:0.29968,y:0.3174,t:7500},A:{x:0.45117,y:0.40594,t:2856},B:{x:0.3498,y:0.3527,t:4874},C:{x:0.31039,y:0.31905,t:6774},F2:{x:0.37928,y:0.36723,t:4200},F7:{x:0.31565,y:0.32951,t:6500},F11:{x:0.38543,y:0.3711,t:4000}}};
var C={"Adobe RGB 98":[2.2,"D65",0.64,0.33,0.297361,0.21,0.71,0.627355,0.15,0.06,0.075285],"Apple RGB":[1.8,"D65",0.625,0.34,0.244634,0.28,0.595,0.672034,0.155,0.07,0.083332],"Best RGB":[2.2,"D50",0.7347,0.2653,0.228457,0.215,0.775,0.737352,0.13,0.035,0.034191],"Beta RGB":[2.2,"D50",0.6888,0.3112,0.303273,0.1986,0.7551,0.663786,0.1265,0.0352,0.032941],"Bruce RGB":[2.2,"D65",0.64,0.33,0.240995,0.28,0.65,0.683554,0.15,0.06,0.075452],"CIE RGB":[2.2,"E",0.735,0.265,0.176204,0.274,0.717,0.812985,0.167,0.009,0.010811],"ColorMatch RGB":[1.8,"D50",0.63,0.34,0.274884,0.295,0.605,0.658132,0.15,0.075,0.066985],"DON RGB 4":[2.2,"D50",0.696,0.3,0.27835,0.215,0.765,0.68797,0.13,0.035,0.03368],"ECI RGB":[1.8,"D50",0.67,0.33,0.32025,0.21,0.71,0.602071,0.14,0.08,0.077679],"EktaSpace PS5":[2.2,"D50",0.695,0.305,0.260629,0.26,0.7,0.734946,0.11,0.005,0.004425],"NTSC RGB":[2.2,"C",0.67,0.33,0.298839,0.21,0.71,0.586811,0.14,0.08,0.11435],"PAL/SECAM RGB":[2.2,"D65",0.64,0.33,0.222021,0.29,0.6,0.706645,0.15,0.06,0.071334],"Pro Photo RGB":[1.8,"D50",0.7347,0.2653,0.28804,0.1596,0.8404,0.711874,0.0366,0.0001,0.000086],"SMPTE/C RGB":[2.2,"D65",0.63,0.34,0.212395,0.31,0.595,0.701049,0.155,0.07,0.086556],sRGB:[2.2,"D65",0.64,0.33,0.212656,0.3,0.6,0.715158,0.15,0.06,0.072186],"Wide Gamut RGB":[2.2,"D50",0.735,0.265,0.258187,0.115,0.826,0.724938,0.157,0.018,0.016875]};
var B={"XYZ scaling":{ma:[[1,0,0],[0,1,0],[0,0,1]],mai:[[1,0,0],[0,1,0],[0,0,1]]},Bradford:{ma:[[0.8951,-0.7502,0.0389],[0.2664,1.7135,-0.0685],[-0.1614,0.0367,1.0296]],mai:[[0.986993,0.432305,-0.008529],[-0.147054,0.51836,0.040043],[0.159963,0.049291,0.968487]]},"Von Kries":{ma:[[0.40024,-0.2263,0],[0.7076,1.16532,0],[-0.08081,0.0457,0.91822]],mai:[[1.859936,0.361191,0],[-1.129382,0.638812,0],[0.219897,-0.000006,1.089064]]}};
var G={XYZ:{xyY:function(K,M){M=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},M||{});
var L=D.whitepoint(M.whitepoint,M.observer);
var N=K.X+K.Y+K.Z;
if(N==0){var J=L.x,O=L.y
}else{var J=K.X/N,O=K.Y/N
}return{x:J,y:O,Y:K.Y}
},Lab:function(S,O){O=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},O||{});
var P=D.kappa(O.useApproximation),W=D.epsilon(O.useApproximation);
var U=D.whitepoint(O.whitepoint,O.observer);
var N=S.X/U.x,X=S.Y/U.y,Q=S.z/U.z;
var M=(N>W)?Math.pow(N,1/3):(P*N+16)/116;
var K=(X>W)?Math.pow(X,1/3):(P*X+16)/116;
var J=(Q>W)?Math.pow(Q,1/3):(P*Q+16)/116;
var R=116*K-16,V=500*(M-K),T=200*(K-J);
return{L:R,a:V,b:T}
},Luv:function(O,J){J=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},J||{});
var K=D.kappa(J.useApproximation),U=D.epsilon(J.useApproximation);
var Q=D.whitepoint(J.whitepoint,J.observer);
var W=(4*O.X)/(O.X+15*O.Y+3*O.Z);
var M=(9*O.Y)/(O.X+15*O.Y+3*O.Z);
var P=(4*Q.x)/(Q.x+15*Q.y+3*Q.z);
var T=(9*Q.y)/(Q.x+15*Q.y+3*Q.z);
var V=O.Y/Q.y;
var N=(V>U)?116*Math.pow(V,1/3)-16:K*V;
var S=13*N*(W-P);
var R=13*N*(M-T);
return{L:N,u:S,v:R}
}},xyY:{XYZ:function(J){if(J.y==0){var M=0,L=0,K=0
}else{var M=(J.x*J.Y)/J.y;
var L=J.Y;
var K=((1-J.x-J.y)*J.Y)/J.y
}return{X:M,Y:L,Z:K}
}},Lab:{XYZ:function(N,O){O=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},O||{});
var S=O.useApproximation,P=D.kappa(S),U=D.epsilon(S);
var R=D.whitepoint(O.whitepoint,O.observer);
var V=(N.L>(P*U))?Math.pow((N.L+16)/116,3):N.L/P;
var K=(V>U)?(N.L+16)/116:(P*V+16)/116;
var M=(N.a/500)+K;
var J=K-(N.b/200);
var W=Math.pow(M,3),T=Math.pow(J,3);
var L=(W>U)?W:(116*M-16)/P;
var Q=(T>U)?T:(116*J-16)/P;
return{X:L*R.x,Y:V*R.y,Z:Q*R.z}
},LCHab:function(M){var J=M.L,N=Math.pow(M.a*M.a+M.b*M.b,0.5),K=Math.atan(M.b,M.a)*(180/Math.PI);
if(K<0){K+=360
}if(K<360){K-=360
}return{L:J,C:N,H:K}
}},LCHab:{Lab:function(N){var O=N.H*(Math.PI/180),K=N.L,M=N.C/Math.pow(Math.pow(Math.tan(O),2)+1,0.5);
if(90<lchH&&N.H<270){M=-M
}var J=Math.pow(Math.pow(N.C,2)-Math.pow(M,2),0.5);
if(N.H>180){J=-J
}return{L:K,a:M,b:J}
}},Luv:{XYZ:function(R,M){M=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},M||{});
var T=M.useApproximation,N=D.kappa(T),V=D.epsilon(T);
var S=D.whitepoint(M.whitepoint,M.observer);
var W=(4*S.x)/(S.x+15*S.y+3*S.z);
var P=(9*S.y)/(S.x+15*S.y+3*S.z);
var K=(R.L>N*V)?Math.pow((R.L+16)/116,3):R.L/N;
var U=(1/3)*(((52*R.L)/(R.u+13*R.L*W))-1);
var T=-5*K,Q=-(1/3),O=K*(((39*R.L)/(R.v+13*R.L*P))-5);
var L=(O-T)/(U-Q),J=L*U+T;
return{X:L,Y:K,Z:J}
},LCHuv:function(N){var J=N.L,M=Math.pow(N.u*N.u+N.v*N*v,0.5),K=Math.atan(N.v,N.u)*(180/Math.PI);
if(K<0){K+=360
}if(K>360){K-=360
}return{L:J,C:M,H:K}
}},LCHuv:{Luv:function(O){var N=O.H*(Math.PI/180);
var J=O.L,M=O.C/Math.pow(Math.pow(Math.tan(N),2)+1,0.5);
var K=Math.pow(O.C*O.C-M*M,0.5);
if(90<O.H&&O.H>270){M*=-1
}if(O.H>180){K*=-1
}return{L:J,u:M,v:K}
}}};
var I={CMY:{CMYK:function(K,J){return E.fromCmy(K).toCmyk()
},HSL:function(K,J){return E.fromCmy(K).toHsl()
},HSV:function(K,J){return E.fromCmy(K).toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](E.fromCmy(K).toXYZ(J))
},LCHab:function(K,J){return G.Lab["LCHab"](I.CMY["Lab"](K))
},LCHuv:function(K,J){return G.LCHuv["Luv"](G.Luv["XYZ"](E.fromCmy(K).toXYZ(J)))
},Luv:function(K,J){return G.Luv["XYZ"](E.fromCmy(K).toXYZ(J))
},RGB:function(K,J){return E.fromCmy(K)
},XYZ:function(K,J){return E.fromCmy(K).toXYZ(J)
},xyY:function(K,J){return G.XYZ["xyY"](E.fromCmy(K).toXYZ(J))
}},CMYK:{CMY:function(K,J){return E.fromCmyk(K).toCmy()
},HSL:function(K,J){return E.fromCmyk(K).toHsl()
},HSV:function(K,J){return E.fromCmyk(K).toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](E.fromCmyk(K).toXYZ(J))
},LCHab:function(K,J){return G.Lab["LCHab"](I.CMYK["Lab"](K))
},LCHuv:function(K,J){return G.LCHuv["Luv"](G.Luv["XYZ"](E.fromCmyk(K).toXYZ(J)))
},Luv:function(K,J){return G.Luv["XYZ"](E.fromCmyk(K).toXYZ(J))
},RGB:function(K,J){return E.fromCmyk(K)
},XYZ:function(K,J){return E.fromCmyk(K).toXYZ(J)
},xyY:function(K,J){return G.XYZ["xyY"](E.fromCmyk(K).toXYZ(J))
}},HSL:{CMY:function(K,J){return E.fromHsl(K).toCmy()
},CMYK:function(K,J){return E.fromHsl(K).toCmyk()
},HSV:function(K,J){return E.fromHsl(K).toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](E.fromHsl(K).toXYZ(J))
},LCHab:function(K,J){return G.Lab["LCHab"](I.CMYK["Lab"](K))
},LCHuv:function(K,J){return G.LCHuv["Luv"](G.Luv["XYZ"](E.fromHsl(K).toXYZ(J)))
},Luv:function(K,J){return G.Luv["XYZ"](E.fromHsl(K).toXYZ(J))
},RGB:function(K,J){return E.fromHsl(K)
},XYZ:function(K,J){return E.fromHsl(K).toXYZ(J)
},xyY:function(K,J){return G.XYZ["xyY"](E.fromHsl(K).toXYZ(J))
}},HSV:{CMY:function(K,J){return E.fromHsv(K).toCmy()
},CMYK:function(K,J){return E.fromHsv(K).toCmyk()
},HSL:function(K,J){return E.fromHsv(K).toHsl()
},Lab:function(K,J){return G.XYZ["Lab"](E.fromHsv(K).toXYZ(J))
},LCHab:function(K,J){return G.Lab["LCHab"](I.CMYK["Lab"](K))
},LCHuv:function(K,J){return G.LCHuv["Luv"](G.Luv["XYZ"](E.fromHsv(K).toXYZ(J)))
},Luv:function(K,J){return G.Luv["XYZ"](E.fromHsv(K).toXYZ(J))
},RGB:function(K,J){return E.fromHsv(K)
},XYZ:function(K,J){return E.fromHsv(K).toXYZ(J)
},xyY:function(K,J){return G.XYZ["xyY"](E.fromHsv(K).toXYZ(J))
}},Lab:{CMY:function(K,J){return E.fromXYZ(G.Lab["XYZ"](K,J)).toCmy()
},CMYK:function(K,J){return E.fromXYZ(G.Lab["XYZ"](K,J)).toCmyk()
},HSL:function(K,J){return E.fromXYZ(G.Lab["XYZ"](K,J)).toHsl()
},HSV:function(K,J){return E.fromXYZ(G.Lab["XYZ"](K,J)).toHsv()
},LCHab:function(K,J){return G.Lab["LCHab"](K,J)
},LCHuv:function(K,J){return G.Luv["LCHuv"](G.Lab["XYZ"](K,J),J)
},Luv:function(K,J){return G.XYZ["Luv"](G.Lab["XYZ"](K,J),J)
},RGB:function(K,J){return E.fromXYZ(G.Lab["XYZ"](K,J))
},XYZ:function(K,J){return G.Lab["XYZ"](K,J)
},xyY:function(K,J){return G.XYZ["xyY"](G.Lab["XYZ"](K,J),J)
}},LCHab:{CMY:function(K,J){return E.fromXYZ(G.Lab["XYZ"](G.LCHab["Lab"](K),J),J).toCmy()
},CMYK:function(K,J){return E.fromXYZ(G.Lab["XYZ"](G.LCHab["Lab"](K),J),J).toCmyk()
},HSL:function(K,J){return E.fromXYZ(G.Lab["XYZ"](G.LCHab["Lab"](K),J),J).toHsl()
},HSV:function(K,J){return E.fromXYZ(G.Lab["XYZ"](G.LCHab["Lab"](K),J),J).toHsv()
},Lab:function(K,J){return G.Lab["LCHab"](K,J)
},LCHuv:function(K,J){return G.Luv["LCHuv"](G.XYZ["Luv"](G.Lab["XYZ"](G.LCHab["Lab"](K),J),J),J)
},Luv:function(K,J){return G.XYZ["Luv"](G.Lab["XYZ"](G.LCHab["Lab"](K),J),J)
},RGB:function(K,J){return E.fromXYZ(G.Lab["XYZ"](G.LCHab["Lab"](K),J),J)
},XYZ:function(K,J){return G.Lab["XYZ"](G.LCHab["Lab"](K,J),J)
},xyY:function(K,J){return G.XYZ["xyY"](G.Lab["XYZ"](G.LCHab["Lab"](K),J),J)
}},LCHuv:{CMY:function(K,J){return E.fromXYZ(G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J).toCmy()
},CMYK:function(K,J){return E.fromXYZ(G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J).toCmyk()
},HSL:function(K,J){return E.fromXYZ(G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J).toHsl()
},HSV:function(K,J){return E.fromXYZ(G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J).toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J)
},LCHab:function(K,J){return G.Lab["LCHab"](G.XYZ["Lab"](G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J),J)
},Luv:function(K,J){return G.LCHuv["Luv"](K,J)
},RGB:function(K,J){return E.fromXYZ(G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J)
},XYZ:function(K,J){return G.Luv["XYZ"](G.LCHuv["Luv"](K),J)
},xyY:function(K,J){return G.XYZ["xyY"](G.Luv["XYZ"](G.LCHuv["Luv"](K),J),J)
},},Luv:{CMY:function(K,J){return E.fromXYZ(G.Luv["XYZ"](K,J),J).toCmy()
},CMYK:function(K,J){return E.fromXYZ(G.Luv["XYZ"](K,J),J).toCmyk()
},HSL:function(K,J){return E.fromXYZ(G.Luv["XYZ"](K,J),J).toHsl()
},HSV:function(K,J){return E.fromXYZ(G.Luv["XYZ"](K,J),J).toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](G.Luv["XYZ"](K,J),J)
},LCHab:function(K,J){return G.Lab["LCHab"](G.XYZ["Lab"](G.Luv["XYZ"](K,J),J),J)
},LCHuv:function(K,J){return G.Luv["LCHuv"](K,J)
},RGB:function(K,J){return E.fromXYZ(G.Luv["XYZ"](K,J),J)
},XYZ:function(K,J){return G.Luv["XYZ"](K,J)
},xyY:function(K,J){return G.XYZ["xyY"](G.Luv["XYZ"](K,J),J)
},},RGB:{CMY:function(K,J){return K.toCmy()
},CMYK:function(K,J){return K.toCmyk()
},HSL:function(K,J){return K.toHsl()
},HSV:function(K,J){return K.toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](K.toXYZ(J),J)
},LCHab:function(K,J){return G.LCHab["Lab"](G.XYZ["Lab"](K.toXYZ(J),J),J)
},LCHuv:function(K,J){return G.LCHuv["Luv"](G.XYZ["Luv"](K.toXYZ(J),J),J)
},Luv:function(K,J){return G.XYZ["Luv"](K.toXYZ(J),J)
},XYZ:function(K,J){return K.toXYZ(J)
},xyY:function(K,J){return G.XYZ["xyY"](K.toXYZ(J),J)
}},XYZ:{CMY:function(K,J){return E.fromXYZ(K,J).toCmy()
},CMYK:function(K,J){return E.fromXYZ(K,J).toCmyk()
},HSL:function(K,J){return E.fromXYZ(K,J).toHsl()
},HSV:function(K,J){return E.fromXYZ(K,J).toHsv()
},Lab:function(K,J){return G.XYZ["Lab"](K,J)
},LCHab:function(K,J){return G.Lab["LCHab"](G.XYZ["Lab"](K,J),J)
},LCHuv:function(K,J){return G.Luv["LCHuv"](G.XYZ["Luv"](K,J),J)
},Luv:function(K,J){return G.XYZ["Luv"](K,J)
},RGB:function(K,J){return E.fromXYZ(K,J)
},xyY:function(K,J){return G.XYZ["xyY"](E.fromXYZ(K,J),J)
}},xyY:{CMY:function(K,J){return E.fromXYZ(G.xyY["XYZ"](K,J),J).toCmy()
},CMYK:function(K,J){return E.fromXYZ(G.xyY["XYZ"](K,J),J).toCmyk()
},HSL:function(K,J){return E.fromXYZ(G.xyY["XYZ"](K,J),J).toHsl()
},HSV:function(K,J){return E.fromXYZ(G.xyY["XYZ"](K,J),J).toHsv()
},Lab:function(K,J){return G.Lab["XYZ"](G.xyY["XYZ"](K,J),J)
},LCHab:function(K,J){return G.LCHab["Lab"](G.Lab["XYZ"](G.xyY["XYZ"](K,J),J),J)
},LCHuv:function(K,J){return G.LCHuv["Luv"](G.Luv["XYZ"](G.xyY["XYZ"](K,J),J),J)
},Luv:function(K,J){return G.Luv["XYZ"](G.xyY["XYZ"](K,J),J)
},RGB:function(K,J){return E.fromXYZ(G.xyY["XYZ"](K,J),J)
},XYZ:function(K,J){return G.xyY["XYZ"](K,J)
}}};
this.whitepoint=function(N,K){K=K||"10";
var J=0,O=0,M=0;
if(H[K]&&H[K][N]){J=H[K][N].x;
O=H[K][N].y;
M=H[K][N].t
}else{console.warn("dojox.color.Colorspace::whitepoint: either the observer or the whitepoint name was not found. ",K,N)
}var L={x:J,y:O,z:(1-J-O),t:M,Y:1};
return this.convert(L,"xyY","XYZ")
};
this.tempToWhitepoint=function(Q){if(Q<4000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures less than 4000K. (Passed ",Q,").");
return{x:0,y:0}
}if(Q>25000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures greater than 25000K. (Passed ",Q,").");
return{x:0,y:0}
}var N=Q,M=Q*Q,L=M*Q;
var R=Math.pow(10,9),J=Math.pow(10,6),K=Math.pow(10,3);
if(Q<=7000){var P=(-4.607*R/L)+(2.9678*J/M)+(0.09911*K/Q)+0.2444063
}else{var P=(-2.0064*R/L)+(1.9018*J/M)+(0.24748*K/Q)+0.23704
}var O=-3*P*P+2.87*P-0.275;
return{x:P,y:O}
};
this.primaries=function(L){L=A.mixin({profile:"sRGB",whitepoint:"D65",observer:"10",adaptor:"Bradford"},L||{});
var K=[];
if(C[L.profile]){K=C[L.profile].slice(0)
}else{console.warn("dojox.color.Colorspace::primaries: the passed profile was not found.  ","Available profiles include: ",C,".  The profile passed was ",L.profile)
}var M={name:L.profile,gamma:K[0],whitepoint:K[1],xr:K[2],yr:K[3],Yr:K[4],xg:K[5],yg:K[6],Yg:K[7],xb:K[8],yb:K[9],Yb:K[10]};
if(L.whitepoint!=M.whitepoint){var O=this.convert(this.adapt({color:this.convert({x:xr,y:yr,Y:Yr},"xyY","XYZ"),adaptor:L.adaptor,source:M.whitepoint,destination:L.whitepoint}),"XYZ","xyY");
var N=this.convert(this.adapt({color:this.convert({x:xg,y:yg,Y:Yg},"xyY","XYZ"),adaptor:L.adaptor,source:M.whitepoint,destination:L.whitepoint}),"XYZ","xyY");
var J=this.convert(this.adapt({color:this.convert({x:xb,y:yb,Y:Yb},"xyY","XYZ"),adaptor:L.adaptor,source:M.whitepoint,destination:L.whitepoint}),"XYZ","xyY");
M=A.mixin(M,{xr:O.x,yr:O.y,Yr:O.Y,xg:N.x,yg:N.y,Yg:N.Y,xb:J.x,yb:J.y,Yb:J.Y,whitepoint:L.whitepoint})
}return A.mixin(M,{zr:1-M.xr-M.yr,zg:1-M.xg-M.yg,zb:1-M.xb-M.yb})
};
this.adapt=function(O){if(!O.color||!O.source){console.error("dojox.color.Colorspace::adapt: color and source arguments are required. ",O)
}O=A.mixin({adaptor:"Bradford",destination:"D65"},O);
var Q=this.whitepoint(O.source);
var P=this.whitepoint(O.destination);
if(B[O.adaptor]){var R=B[O.adaptor].ma;
var M=B[O.adaptor].mai
}else{console.warn("dojox.color.Colorspace::adapt: the passed adaptor '",O.adaptor,"' was not found.")
}var S=F.multiply([[Q.x,Q.y,Q.z]],R);
var N=F.multiply([[P.x,P.y,P.z]],R);
var K=[[N[0][0]/S[0][0],0,0],[0,N[0][1]/S[0][1],0],[0,0,N[0][2]/S[0][2]]];
var L=F.multiply(F.multiply(R,K),M);
var J=F.multiply([[O.color.X,O.color.Y,O.color.Z]],L)[0];
return{X:J[0],Y:J[1],Z:J[2]}
};
this.matrix=function(N,V){var O=this.whitepoint(V.whitepoint);
var U=p.xr/p.yr,a=1,R=(1-p.xr-p.yr)/p.yr;
var W=p.xg/p.yg,M=1,S=(1-p.xg-p.yg)/p.yg;
var Z=p.xb/p.yb,Q=1,R=(1-p.xb-p.yb)/p.yb;
var K=[[U,a,R],[W,M,S],[Z,Q,Zb]];
var J=[[O.X,O.Y,O.Z]];
var X=dojox.math.matrix.multiply(J,dojox.math.matrix.inverse(K));
var Y=X[0][0],L=X[0][1],P=X[0][2];
var T=[[Y*U,Y*a,Y*R],[L*W,L*M,L*S],[P*Z,P*Q,P*Zb]];
if(N=="RGB"){return dojox.math.inverse(T)
}return T
};
this.epsilon=function(J){return(J||typeof (J)=="undefined")?0.008856:216/24289
};
this.kappa=function(J){return(J||typeof (J)=="undefined")?903.3:24389/27
};
this.convert=function(J,M,L,K){if(I[M]&&I[M][L]){return I[M][L](obj,K)
}console.warn("dojox.color.Colorspace::convert: Can't convert ",J," from ",M," to ",L,".")
}
})();
A.mixin(dojox.color,{fromXYZ:function(L,I){I=I||{};
var E=dojox.color.Colorspace.primaries(I);
var F=dojox.color.Colorspace.matrix("RGB",E);
var K=dojox.math.matrix.mutliply([[L.X,L.Y,L.Z]],F);
var C=K[0][0],J=K[0][1],M=K[0][2];
if(E.profile=="sRGB"){var H=(C>0.0031308)?(1.055*Math.pow(C,1/2.4))-0.055:12.92*C;
var N=(J>0.0031308)?(1.055*Math.pow(J,1/2.4))-0.055:12.92*J;
var D=(M>0.0031308)?(1.055*Math.pow(M,1/2.4))-0.055:12.92*M
}else{var H=Math.pow(C,1/E.gamma),N=Math.pow(J,1/E.gamma),D=Math.pow(M,1/E.gamma)
}return new dojox.color.Color({r:Math.floor(H*255),g:Math.floor(N*255),b:Math.floor(D*255)})
}});
A.extend(dojox.color.Color,{toXYZ:function(F){F=F||{};
var C=dojox.color.Colorspace.primaries(F);
var D=dojox.color.Colorspace.matrix("XYZ",C);
var K=this.r/255,E=this.g/255,I=this.b/255;
if(C.profile=="sRGB"){var B=(K>0.04045)?Math.pow(((K+0.055)/1.055),2.4):K/12.92;
var G=(E>0.04045)?Math.pow(((E+0.055)/1.055),2.4):E/12.92;
var J=(I>0.04045)?Math.pow(((I+0.055)/1.055),2.4):I/12.92
}else{var B=Math.pow(K,C.gamma),G=Math.pow(E,C.gamma),J=Math.pow(I,C.gamma)
}var H=dojox.math.matrix([[B,G,J]],D);
return{X:H[0][0],Y:H[0][1],Z:H[0][2]}
}})
}}});