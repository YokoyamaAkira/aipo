if(!dojo._hasResource["dojox.color.Colorspace"]){dojo._hasResource["dojox.color.Colorspace"]=true;
dojo.provide("dojox.color.Colorspace");
dojo.require("dojox.math.matrix");
dojox.color.Colorspace=new (function(){var G=dojox.color;
var H=dojox.math.matrix;
var F=this;
var B={"2":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34567,y:0.3585,t:5000},D55:{x:0.33242,y:0.34743,t:5500},D65:{x:0.31271,y:0.32902,t:6500},D75:{x:0.29902,y:0.31485,t:7500},A:{x:0.44757,y:0.40745,t:2856},B:{x:0.34842,y:0.35161,t:4874},C:{x:0.31006,y:0.31616,t:6774},"9300":{x:0.2848,y:0.2932,t:9300},F2:{x:0.37207,y:0.37512,t:4200},F7:{x:0.31285,y:0.32918,t:6500},F11:{x:0.38054,y:0.37691,t:4000}},"10":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34773,y:0.35952,t:5000},D55:{x:0.33411,y:0.34877,t:5500},D65:{x:0.31382,y:0.331,t:6500},D75:{x:0.29968,y:0.3174,t:7500},A:{x:0.45117,y:0.40594,t:2856},B:{x:0.3498,y:0.3527,t:4874},C:{x:0.31039,y:0.31905,t:6774},F2:{x:0.37928,y:0.36723,t:4200},F7:{x:0.31565,y:0.32951,t:6500},F11:{x:0.38543,y:0.3711,t:4000}}};
var E={"Adobe RGB 98":[2.2,"D65",0.64,0.33,0.297361,0.21,0.71,0.627355,0.15,0.06,0.075285],"Apple RGB":[1.8,"D65",0.625,0.34,0.244634,0.28,0.595,0.672034,0.155,0.07,0.083332],"Best RGB":[2.2,"D50",0.7347,0.2653,0.228457,0.215,0.775,0.737352,0.13,0.035,0.034191],"Beta RGB":[2.2,"D50",0.6888,0.3112,0.303273,0.1986,0.7551,0.663786,0.1265,0.0352,0.032941],"Bruce RGB":[2.2,"D65",0.64,0.33,0.240995,0.28,0.65,0.683554,0.15,0.06,0.075452],"CIE RGB":[2.2,"E",0.735,0.265,0.176204,0.274,0.717,0.812985,0.167,0.009,0.010811],"ColorMatch RGB":[1.8,"D50",0.63,0.34,0.274884,0.295,0.605,0.658132,0.15,0.075,0.066985],"DON RGB 4":[2.2,"D50",0.696,0.3,0.27835,0.215,0.765,0.68797,0.13,0.035,0.03368],"ECI RGB":[1.8,"D50",0.67,0.33,0.32025,0.21,0.71,0.602071,0.14,0.08,0.077679],"EktaSpace PS5":[2.2,"D50",0.695,0.305,0.260629,0.26,0.7,0.734946,0.11,0.005,0.004425],"NTSC RGB":[2.2,"C",0.67,0.33,0.298839,0.21,0.71,0.586811,0.14,0.08,0.11435],"PAL/SECAM RGB":[2.2,"D65",0.64,0.33,0.222021,0.29,0.6,0.706645,0.15,0.06,0.071334],"Pro Photo RGB":[1.8,"D50",0.7347,0.2653,0.28804,0.1596,0.8404,0.711874,0.0366,0.0001,0.000086],"SMPTE/C RGB":[2.2,"D65",0.63,0.34,0.212395,0.31,0.595,0.701049,0.155,0.07,0.086556],sRGB:[2.2,"D65",0.64,0.33,0.212656,0.3,0.6,0.715158,0.15,0.06,0.072186],"Wide Gamut RGB":[2.2,"D50",0.735,0.265,0.258187,0.115,0.826,0.724938,0.157,0.018,0.016875]};
var D={"XYZ scaling":{ma:[[1,0,0],[0,1,0],[0,0,1]],mai:[[1,0,0],[0,1,0],[0,0,1]]},Bradford:{ma:[[0.8951,-0.7502,0.0389],[0.2664,1.7135,-0.0685],[-0.1614,0.0367,1.0296]],mai:[[0.986993,0.432305,-0.008529],[-0.147054,0.51836,0.040043],[0.159963,0.049291,0.968487]]},"Von Kries":{ma:[[0.40024,-0.2263,0],[0.7076,1.16532,0],[-0.08081,0.0457,0.91822]],mai:[[1.859936,0.361191,0],[-1.129382,0.638812,0],[0.219897,-0.000006,1.089064]]}};
var A={XYZ:{xyY:function(M,I){I=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},I||{});
var N=F.whitepoint(I.whitepoint,I.observer);
var J=M.X+M.Y+M.Z;
if(J==0){var L=N.x,K=N.y
}else{var L=M.X/J,K=M.Y/J
}return{x:L,y:K,Y:M.Y}
},Lab:function(U,M){M=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},M||{});
var N=F.kappa(M.useApproximation),L=F.epsilon(M.useApproximation);
var I=F.whitepoint(M.whitepoint,M.observer);
var K=U.X/I.x,O=U.Y/I.y,S=U.z/I.z;
var R=(K>L)?Math.pow(K,1/3):(N*K+16)/116;
var Q=(O>L)?Math.pow(O,1/3):(N*O+16)/116;
var P=(S>L)?Math.pow(S,1/3):(N*S+16)/116;
var T=116*Q-16,J=500*(R-Q),V=200*(Q-P);
return{L:T,a:J,b:V}
},Luv:function(P,Q){Q=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},Q||{});
var K=F.kappa(Q.useApproximation),J=F.epsilon(Q.useApproximation);
var S=F.whitepoint(Q.whitepoint,Q.observer);
var O=(4*P.X)/(P.X+15*P.Y+3*P.Z);
var M=(9*P.Y)/(P.X+15*P.Y+3*P.Z);
var R=(4*S.x)/(S.x+15*S.y+3*S.z);
var I=(9*S.y)/(S.x+15*S.y+3*S.z);
var L=P.Y/S.y;
var N=(L>J)?116*Math.pow(L,1/3)-16:K*L;
var U=13*N*(O-R);
var T=13*N*(M-I);
return{L:N,u:U,v:T}
}},xyY:{XYZ:function(J){if(J.y==0){var I=0,L=0,K=0
}else{var I=(J.x*J.Y)/J.y;
var L=J.Y;
var K=((1-J.x-J.y)*J.Y)/J.y
}return{X:I,Y:L,Z:K}
}},Lab:{XYZ:function(O,P){P=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},P||{});
var V=P.useApproximation,S=F.kappa(V),K=F.epsilon(V);
var U=F.whitepoint(P.whitepoint,P.observer);
var M=(O.L>(S*K))?Math.pow((O.L+16)/116,3):O.L/S;
var R=(M>K)?(O.L+16)/116:(S*M+16)/116;
var L=(O.a/500)+R;
var Q=R-(O.b/200);
var N=Math.pow(L,3),I=Math.pow(Q,3);
var J=(N>K)?N:(116*L-16)/S;
var T=(I>K)?I:(116*Q-16)/S;
return{X:J*U.x,Y:M*U.y,Z:T*U.z}
},LCHab:function(I){var K=I.L,J=Math.pow(I.a*I.a+I.b*I.b,0.5),L=Math.atan(I.b,I.a)*(180/Math.PI);
if(L<0){L+=360
}if(L<360){L-=360
}return{L:K,C:J,H:L}
}},LCHab:{Lab:function(J){var K=J.H*(Math.PI/180),M=J.L,I=J.C/Math.pow(Math.pow(Math.tan(K),2)+1,0.5);
if(90<lchH&&J.H<270){I=-I
}var L=Math.pow(Math.pow(J.C,2)-Math.pow(I,2),0.5);
if(J.H>180){L=-L
}return{L:M,a:I,b:L}
}},Luv:{XYZ:function(U,M){M=dojo.mixin({whitepoint:"D65",observer:"10",useApproximation:true},M||{});
var I=M.useApproximation,N=F.kappa(I),L=F.epsilon(I);
var V=F.whitepoint(M.whitepoint,M.observer);
var O=(4*V.x)/(V.x+15*V.y+3*V.z);
var S=(9*V.y)/(V.x+15*V.y+3*V.z);
var R=(U.L>N*L)?Math.pow((U.L+16)/116,3):U.L/N;
var K=(1/3)*(((52*U.L)/(U.u+13*U.L*O))-1);
var I=-5*R,T=-(1/3),P=R*(((39*U.L)/(U.v+13*U.L*S))-5);
var J=(P-I)/(K-T),Q=J*K+I;
return{X:J,Y:R,Z:Q}
},LCHuv:function(J){var K=J.L,I=Math.pow(J.u*J.u+J.v*J*v,0.5),L=Math.atan(J.v,J.u)*(180/Math.PI);
if(L<0){L+=360
}if(L>360){L-=360
}return{L:K,C:I,H:L}
}},LCHuv:{Luv:function(K){var J=K.H*(Math.PI/180);
var L=K.L,I=K.C/Math.pow(Math.pow(Math.tan(J),2)+1,0.5);
var M=Math.pow(K.C*K.C-I*I,0.5);
if(90<K.H&&K.H>270){I*=-1
}if(K.H>180){M*=-1
}return{L:L,u:I,v:M}
}}};
var C={CMY:{CMYK:function(I,J){return G.fromCmy(I).toCmyk()
},HSL:function(I,J){return G.fromCmy(I).toHsl()
},HSV:function(I,J){return G.fromCmy(I).toHsv()
},Lab:function(I,J){return A.XYZ.Lab(G.fromCmy(I).toXYZ(J))
},LCHab:function(I,J){return A.Lab.LCHab(C.CMY.Lab(I))
},LCHuv:function(I,J){return A.LCHuv.Luv(A.Luv.XYZ(G.fromCmy(I).toXYZ(J)))
},Luv:function(I,J){return A.Luv.XYZ(G.fromCmy(I).toXYZ(J))
},RGB:function(I,J){return G.fromCmy(I)
},XYZ:function(I,J){return G.fromCmy(I).toXYZ(J)
},xyY:function(I,J){return A.XYZ.xyY(G.fromCmy(I).toXYZ(J))
}},CMYK:{CMY:function(I,J){return G.fromCmyk(I).toCmy()
},HSL:function(I,J){return G.fromCmyk(I).toHsl()
},HSV:function(I,J){return G.fromCmyk(I).toHsv()
},Lab:function(I,J){return A.XYZ.Lab(G.fromCmyk(I).toXYZ(J))
},LCHab:function(I,J){return A.Lab.LCHab(C.CMYK.Lab(I))
},LCHuv:function(I,J){return A.LCHuv.Luv(A.Luv.XYZ(G.fromCmyk(I).toXYZ(J)))
},Luv:function(I,J){return A.Luv.XYZ(G.fromCmyk(I).toXYZ(J))
},RGB:function(I,J){return G.fromCmyk(I)
},XYZ:function(I,J){return G.fromCmyk(I).toXYZ(J)
},xyY:function(I,J){return A.XYZ.xyY(G.fromCmyk(I).toXYZ(J))
}},HSL:{CMY:function(I,J){return G.fromHsl(I).toCmy()
},CMYK:function(I,J){return G.fromHsl(I).toCmyk()
},HSV:function(I,J){return G.fromHsl(I).toHsv()
},Lab:function(I,J){return A.XYZ.Lab(G.fromHsl(I).toXYZ(J))
},LCHab:function(I,J){return A.Lab.LCHab(C.CMYK.Lab(I))
},LCHuv:function(I,J){return A.LCHuv.Luv(A.Luv.XYZ(G.fromHsl(I).toXYZ(J)))
},Luv:function(I,J){return A.Luv.XYZ(G.fromHsl(I).toXYZ(J))
},RGB:function(I,J){return G.fromHsl(I)
},XYZ:function(I,J){return G.fromHsl(I).toXYZ(J)
},xyY:function(I,J){return A.XYZ.xyY(G.fromHsl(I).toXYZ(J))
}},HSV:{CMY:function(I,J){return G.fromHsv(I).toCmy()
},CMYK:function(I,J){return G.fromHsv(I).toCmyk()
},HSL:function(I,J){return G.fromHsv(I).toHsl()
},Lab:function(I,J){return A.XYZ.Lab(G.fromHsv(I).toXYZ(J))
},LCHab:function(I,J){return A.Lab.LCHab(C.CMYK.Lab(I))
},LCHuv:function(I,J){return A.LCHuv.Luv(A.Luv.XYZ(G.fromHsv(I).toXYZ(J)))
},Luv:function(I,J){return A.Luv.XYZ(G.fromHsv(I).toXYZ(J))
},RGB:function(I,J){return G.fromHsv(I)
},XYZ:function(I,J){return G.fromHsv(I).toXYZ(J)
},xyY:function(I,J){return A.XYZ.xyY(G.fromHsv(I).toXYZ(J))
}},Lab:{CMY:function(I,J){return G.fromXYZ(A.Lab.XYZ(I,J)).toCmy()
},CMYK:function(I,J){return G.fromXYZ(A.Lab.XYZ(I,J)).toCmyk()
},HSL:function(I,J){return G.fromXYZ(A.Lab.XYZ(I,J)).toHsl()
},HSV:function(I,J){return G.fromXYZ(A.Lab.XYZ(I,J)).toHsv()
},LCHab:function(I,J){return A.Lab.LCHab(I,J)
},LCHuv:function(I,J){return A.Luv.LCHuv(A.Lab.XYZ(I,J),J)
},Luv:function(I,J){return A.XYZ.Luv(A.Lab.XYZ(I,J),J)
},RGB:function(I,J){return G.fromXYZ(A.Lab.XYZ(I,J))
},XYZ:function(I,J){return A.Lab.XYZ(I,J)
},xyY:function(I,J){return A.XYZ.xyY(A.Lab.XYZ(I,J),J)
}},LCHab:{CMY:function(I,J){return G.fromXYZ(A.Lab.XYZ(A.LCHab.Lab(I),J),J).toCmy()
},CMYK:function(I,J){return G.fromXYZ(A.Lab.XYZ(A.LCHab.Lab(I),J),J).toCmyk()
},HSL:function(I,J){return G.fromXYZ(A.Lab.XYZ(A.LCHab.Lab(I),J),J).toHsl()
},HSV:function(I,J){return G.fromXYZ(A.Lab.XYZ(A.LCHab.Lab(I),J),J).toHsv()
},Lab:function(I,J){return A.Lab.LCHab(I,J)
},LCHuv:function(I,J){return A.Luv.LCHuv(A.XYZ.Luv(A.Lab.XYZ(A.LCHab.Lab(I),J),J),J)
},Luv:function(I,J){return A.XYZ.Luv(A.Lab.XYZ(A.LCHab.Lab(I),J),J)
},RGB:function(I,J){return G.fromXYZ(A.Lab.XYZ(A.LCHab.Lab(I),J),J)
},XYZ:function(I,J){return A.Lab.XYZ(A.LCHab.Lab(I,J),J)
},xyY:function(I,J){return A.XYZ.xyY(A.Lab.XYZ(A.LCHab.Lab(I),J),J)
}},LCHuv:{CMY:function(I,J){return G.fromXYZ(A.Luv.XYZ(A.LCHuv.Luv(I),J),J).toCmy()
},CMYK:function(I,J){return G.fromXYZ(A.Luv.XYZ(A.LCHuv.Luv(I),J),J).toCmyk()
},HSL:function(I,J){return G.fromXYZ(A.Luv.XYZ(A.LCHuv.Luv(I),J),J).toHsl()
},HSV:function(I,J){return G.fromXYZ(A.Luv.XYZ(A.LCHuv.Luv(I),J),J).toHsv()
},Lab:function(I,J){return A.XYZ.Lab(A.Luv.XYZ(A.LCHuv.Luv(I),J),J)
},LCHab:function(I,J){return A.Lab.LCHab(A.XYZ.Lab(A.Luv.XYZ(A.LCHuv.Luv(I),J),J),J)
},Luv:function(I,J){return A.LCHuv.Luv(I,J)
},RGB:function(I,J){return G.fromXYZ(A.Luv.XYZ(A.LCHuv.Luv(I),J),J)
},XYZ:function(I,J){return A.Luv.XYZ(A.LCHuv.Luv(I),J)
},xyY:function(I,J){return A.XYZ.xyY(A.Luv.XYZ(A.LCHuv.Luv(I),J),J)
},},Luv:{CMY:function(I,J){return G.fromXYZ(A.Luv.XYZ(I,J),J).toCmy()
},CMYK:function(I,J){return G.fromXYZ(A.Luv.XYZ(I,J),J).toCmyk()
},HSL:function(I,J){return G.fromXYZ(A.Luv.XYZ(I,J),J).toHsl()
},HSV:function(I,J){return G.fromXYZ(A.Luv.XYZ(I,J),J).toHsv()
},Lab:function(I,J){return A.XYZ.Lab(A.Luv.XYZ(I,J),J)
},LCHab:function(I,J){return A.Lab.LCHab(A.XYZ.Lab(A.Luv.XYZ(I,J),J),J)
},LCHuv:function(I,J){return A.Luv.LCHuv(I,J)
},RGB:function(I,J){return G.fromXYZ(A.Luv.XYZ(I,J),J)
},XYZ:function(I,J){return A.Luv.XYZ(I,J)
},xyY:function(I,J){return A.XYZ.xyY(A.Luv.XYZ(I,J),J)
},},RGB:{CMY:function(I,J){return I.toCmy()
},CMYK:function(I,J){return I.toCmyk()
},HSL:function(I,J){return I.toHsl()
},HSV:function(I,J){return I.toHsv()
},Lab:function(I,J){return A.XYZ.Lab(I.toXYZ(J),J)
},LCHab:function(I,J){return A.LCHab.Lab(A.XYZ.Lab(I.toXYZ(J),J),J)
},LCHuv:function(I,J){return A.LCHuv.Luv(A.XYZ.Luv(I.toXYZ(J),J),J)
},Luv:function(I,J){return A.XYZ.Luv(I.toXYZ(J),J)
},XYZ:function(I,J){return I.toXYZ(J)
},xyY:function(I,J){return A.XYZ.xyY(I.toXYZ(J),J)
}},XYZ:{CMY:function(I,J){return G.fromXYZ(I,J).toCmy()
},CMYK:function(I,J){return G.fromXYZ(I,J).toCmyk()
},HSL:function(I,J){return G.fromXYZ(I,J).toHsl()
},HSV:function(I,J){return G.fromXYZ(I,J).toHsv()
},Lab:function(I,J){return A.XYZ.Lab(I,J)
},LCHab:function(I,J){return A.Lab.LCHab(A.XYZ.Lab(I,J),J)
},LCHuv:function(I,J){return A.Luv.LCHuv(A.XYZ.Luv(I,J),J)
},Luv:function(I,J){return A.XYZ.Luv(I,J)
},RGB:function(I,J){return G.fromXYZ(I,J)
},xyY:function(I,J){return A.XYZ.xyY(G.fromXYZ(I,J),J)
}},xyY:{CMY:function(I,J){return G.fromXYZ(A.xyY.XYZ(I,J),J).toCmy()
},CMYK:function(I,J){return G.fromXYZ(A.xyY.XYZ(I,J),J).toCmyk()
},HSL:function(I,J){return G.fromXYZ(A.xyY.XYZ(I,J),J).toHsl()
},HSV:function(I,J){return G.fromXYZ(A.xyY.XYZ(I,J),J).toHsv()
},Lab:function(I,J){return A.Lab.XYZ(A.xyY.XYZ(I,J),J)
},LCHab:function(I,J){return A.LCHab.Lab(A.Lab.XYZ(A.xyY.XYZ(I,J),J),J)
},LCHuv:function(I,J){return A.LCHuv.Luv(A.Luv.XYZ(A.xyY.XYZ(I,J),J),J)
},Luv:function(I,J){return A.Luv.XYZ(A.xyY.XYZ(I,J),J)
},RGB:function(I,J){return G.fromXYZ(A.xyY.XYZ(I,J),J)
},XYZ:function(I,J){return A.xyY.XYZ(I,J)
}}};
this.whitepoint=function(J,M){M=M||"10";
var L=0,K=0,I=0;
if(B[M]&&B[M][J]){L=B[M][J].x;
K=B[M][J].y;
I=B[M][J].t
}else{console.warn("dojox.color.Colorspace::whitepoint: either the observer or the whitepoint name was not found. ",M,J)
}var N={x:L,y:K,z:(1-L-K),t:I,Y:1};
return this.convert(N,"xyY","XYZ")
};
this.tempToWhitepoint=function(K){if(K<4000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures less than 4000K. (Passed ",K,").");
return{x:0,y:0}
}if(K>25000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures greater than 25000K. (Passed ",K,").");
return{x:0,y:0}
}var Q=K,P=K*K,O=P*K;
var L=Math.pow(10,9),M=Math.pow(10,6),N=Math.pow(10,3);
if(K<=7000){var J=(-4.607*L/O)+(2.9678*M/P)+(0.09911*N/K)+0.2444063
}else{var J=(-2.0064*L/O)+(1.9018*M/P)+(0.24748*N/K)+0.23704
}var I=-3*J*J+2.87*J-0.275;
return{x:J,y:I}
};
this.primaries=function(N){N=dojo.mixin({profile:"sRGB",whitepoint:"D65",observer:"10",adaptor:"Bradford"},N||{});
var M=[];
if(E[N.profile]){M=E[N.profile].slice(0)
}else{console.warn("dojox.color.Colorspace::primaries: the passed profile was not found.  ","Available profiles include: ",E,".  The profile passed was ",N.profile)
}var I={name:N.profile,gamma:M[0],whitepoint:M[1],xr:M[2],yr:M[3],Yr:M[4],xg:M[5],yg:M[6],Yg:M[7],xb:M[8],yb:M[9],Yb:M[10]};
if(N.whitepoint!=I.whitepoint){var K=this.convert(this.adapt({color:this.convert({x:xr,y:yr,Y:Yr},"xyY","XYZ"),adaptor:N.adaptor,source:I.whitepoint,destination:N.whitepoint}),"XYZ","xyY");
var J=this.convert(this.adapt({color:this.convert({x:xg,y:yg,Y:Yg},"xyY","XYZ"),adaptor:N.adaptor,source:I.whitepoint,destination:N.whitepoint}),"XYZ","xyY");
var L=this.convert(this.adapt({color:this.convert({x:xb,y:yb,Y:Yb},"xyY","XYZ"),adaptor:N.adaptor,source:I.whitepoint,destination:N.whitepoint}),"XYZ","xyY");
I=dojo.mixin(I,{xr:K.x,yr:K.y,Yr:K.Y,xg:J.x,yg:J.y,Yg:J.Y,xb:L.x,yb:L.y,Yb:L.Y,whitepoint:N.whitepoint})
}return dojo.mixin(I,{zr:1-I.xr-I.yr,zg:1-I.xg-I.yg,zb:1-I.xb-I.yb})
};
this.adapt=function(R){if(!R.color||!R.source){console.error("dojox.color.Colorspace::adapt: color and source arguments are required. ",R)
}R=dojo.mixin({adaptor:"Bradford",destination:"D65"},R);
var J=this.whitepoint(R.source);
var I=this.whitepoint(R.destination);
if(D[R.adaptor]){var K=D[R.adaptor].ma;
var P=D[R.adaptor].mai
}else{console.warn("dojox.color.Colorspace::adapt: the passed adaptor '",R.adaptor,"' was not found.")
}var L=H.multiply([[J.x,J.y,J.z]],K);
var Q=H.multiply([[I.x,I.y,I.z]],K);
var N=[[Q[0][0]/L[0][0],0,0],[0,Q[0][1]/L[0][1],0],[0,0,Q[0][2]/L[0][2]]];
var O=H.multiply(H.multiply(K,N),P);
var M=H.multiply([[R.color.X,R.color.Y,R.color.Z]],O)[0];
return{X:M[0],Y:M[1],Z:M[2]}
};
this.matrix=function(U,K){var V=this.whitepoint(K.whitepoint);
var J=p.xr/p.yr,P=1,Y=(1-p.xr-p.yr)/p.yr;
var L=p.xg/p.yg,T=1,Z=(1-p.xg-p.yg)/p.yg;
var O=p.xb/p.yb,X=1,Y=(1-p.xb-p.yb)/p.yb;
var R=[[J,P,Y],[L,T,Z],[O,X,Zb]];
var Q=[[V.X,V.Y,V.Z]];
var M=dojox.math.matrix.multiply(Q,dojox.math.matrix.inverse(R));
var N=M[0][0],S=M[0][1],W=M[0][2];
var I=[[N*J,N*P,N*Y],[S*L,S*T,S*Z],[W*O,W*X,W*Zb]];
if(U=="RGB"){return dojox.math.inverse(I)
}return I
};
this.epsilon=function(I){return(I||typeof (I)=="undefined")?0.008856:216/24289
};
this.kappa=function(I){return(I||typeof (I)=="undefined")?903.3:24389/27
};
this.convert=function(J,I,L,K){if(C[I]&&C[I][L]){return C[I][L](obj,K)
}console.warn("dojox.color.Colorspace::convert: Can't convert ",J," from ",I," to ",L,".")
}
})();
dojo.mixin(dojox.color,{fromXYZ:function(I,E){E=E||{};
var A=dojox.color.Colorspace.primaries(E);
var C=dojox.color.Colorspace.matrix("RGB",A);
var H=dojox.math.matrix.mutliply([[I.X,I.Y,I.Z]],C);
var L=H[0][0],F=H[0][1],J=H[0][2];
if(A.profile=="sRGB"){var D=(L>0.0031308)?(1.055*Math.pow(L,1/2.4))-0.055:12.92*L;
var K=(F>0.0031308)?(1.055*Math.pow(F,1/2.4))-0.055:12.92*F;
var M=(J>0.0031308)?(1.055*Math.pow(J,1/2.4))-0.055:12.92*J
}else{var D=Math.pow(L,1/A.gamma),K=Math.pow(F,1/A.gamma),M=Math.pow(J,1/A.gamma)
}return new dojox.color.Color({r:Math.floor(D*255),g:Math.floor(K*255),b:Math.floor(M*255)})
}});
dojo.extend(dojox.color.Color,{toXYZ:function(A){A=A||{};
var H=dojox.color.Colorspace.primaries(A);
var I=dojox.color.Colorspace.matrix("XYZ",H);
var F=this.r/255,J=this.g/255,D=this.b/255;
if(H.profile=="sRGB"){var G=(F>0.04045)?Math.pow(((F+0.055)/1.055),2.4):F/12.92;
var B=(J>0.04045)?Math.pow(((J+0.055)/1.055),2.4):J/12.92;
var E=(D>0.04045)?Math.pow(((D+0.055)/1.055),2.4):D/12.92
}else{var G=Math.pow(F,H.gamma),B=Math.pow(J,H.gamma),E=Math.pow(D,H.gamma)
}var C=dojox.math.matrix([[G,B,E]],I);
return{X:C[0][0],Y:C[0][1],Z:C[0][2]}
}})
};