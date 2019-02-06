dojo._xdResourceLoaded({depends:[["provide","dojox.color.Colorspace"],["require","dojox.math.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.color.Colorspace"]){A._hasResource["dojox.color.Colorspace"]=true;
A.provide("dojox.color.Colorspace");
A.require("dojox.math.matrix");
dojox.color.Colorspace=new (function(){var I=dojox.color;
var C=dojox.math.matrix;
var H=this;
var E={"2":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34567,y:0.3585,t:5000},D55:{x:0.33242,y:0.34743,t:5500},D65:{x:0.31271,y:0.32902,t:6500},D75:{x:0.29902,y:0.31485,t:7500},A:{x:0.44757,y:0.40745,t:2856},B:{x:0.34842,y:0.35161,t:4874},C:{x:0.31006,y:0.31616,t:6774},"9300":{x:0.2848,y:0.2932,t:9300},F2:{x:0.37207,y:0.37512,t:4200},F7:{x:0.31285,y:0.32918,t:6500},F11:{x:0.38054,y:0.37691,t:4000}},"10":{E:{x:1/3,y:1/3,t:5400},D50:{x:0.34773,y:0.35952,t:5000},D55:{x:0.33411,y:0.34877,t:5500},D65:{x:0.31382,y:0.331,t:6500},D75:{x:0.29968,y:0.3174,t:7500},A:{x:0.45117,y:0.40594,t:2856},B:{x:0.3498,y:0.3527,t:4874},C:{x:0.31039,y:0.31905,t:6774},F2:{x:0.37928,y:0.36723,t:4200},F7:{x:0.31565,y:0.32951,t:6500},F11:{x:0.38543,y:0.3711,t:4000}}};
var G={"Adobe RGB 98":[2.2,"D65",0.64,0.33,0.297361,0.21,0.71,0.627355,0.15,0.06,0.075285],"Apple RGB":[1.8,"D65",0.625,0.34,0.244634,0.28,0.595,0.672034,0.155,0.07,0.083332],"Best RGB":[2.2,"D50",0.7347,0.2653,0.228457,0.215,0.775,0.737352,0.13,0.035,0.034191],"Beta RGB":[2.2,"D50",0.6888,0.3112,0.303273,0.1986,0.7551,0.663786,0.1265,0.0352,0.032941],"Bruce RGB":[2.2,"D65",0.64,0.33,0.240995,0.28,0.65,0.683554,0.15,0.06,0.075452],"CIE RGB":[2.2,"E",0.735,0.265,0.176204,0.274,0.717,0.812985,0.167,0.009,0.010811],"ColorMatch RGB":[1.8,"D50",0.63,0.34,0.274884,0.295,0.605,0.658132,0.15,0.075,0.066985],"DON RGB 4":[2.2,"D50",0.696,0.3,0.27835,0.215,0.765,0.68797,0.13,0.035,0.03368],"ECI RGB":[1.8,"D50",0.67,0.33,0.32025,0.21,0.71,0.602071,0.14,0.08,0.077679],"EktaSpace PS5":[2.2,"D50",0.695,0.305,0.260629,0.26,0.7,0.734946,0.11,0.005,0.004425],"NTSC RGB":[2.2,"C",0.67,0.33,0.298839,0.21,0.71,0.586811,0.14,0.08,0.11435],"PAL/SECAM RGB":[2.2,"D65",0.64,0.33,0.222021,0.29,0.6,0.706645,0.15,0.06,0.071334],"Pro Photo RGB":[1.8,"D50",0.7347,0.2653,0.28804,0.1596,0.8404,0.711874,0.0366,0.0001,0.000086],"SMPTE/C RGB":[2.2,"D65",0.63,0.34,0.212395,0.31,0.595,0.701049,0.155,0.07,0.086556],sRGB:[2.2,"D65",0.64,0.33,0.212656,0.3,0.6,0.715158,0.15,0.06,0.072186],"Wide Gamut RGB":[2.2,"D50",0.735,0.265,0.258187,0.115,0.826,0.724938,0.157,0.018,0.016875]};
var F={"XYZ scaling":{ma:[[1,0,0],[0,1,0],[0,0,1]],mai:[[1,0,0],[0,1,0],[0,0,1]]},Bradford:{ma:[[0.8951,-0.7502,0.0389],[0.2664,1.7135,-0.0685],[-0.1614,0.0367,1.0296]],mai:[[0.986993,0.432305,-0.008529],[-0.147054,0.51836,0.040043],[0.159963,0.049291,0.968487]]},"Von Kries":{ma:[[0.40024,-0.2263,0],[0.7076,1.16532,0],[-0.08081,0.0457,0.91822]],mai:[[1.859936,0.361191,0],[-1.129382,0.638812,0],[0.219897,-0.000006,1.089064]]}};
var D={XYZ:{xyY:function(N,J){J=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},J||{});
var O=H.whitepoint(J.whitepoint,J.observer);
var K=N.X+N.Y+N.Z;
if(K==0){var M=O.x,L=O.y
}else{var M=N.X/K,L=N.Y/K
}return{x:M,y:L,Y:N.Y}
},Lab:function(T,R){R=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},R||{});
var L=H.kappa(R.useApproximation),J=H.epsilon(R.useApproximation);
var V=H.whitepoint(R.whitepoint,R.observer);
var Q=T.X/V.x,K=T.Y/V.y,M=T.z/V.z;
var P=(Q>J)?Math.pow(Q,1/3):(L*Q+16)/116;
var O=(K>J)?Math.pow(K,1/3):(L*K+16)/116;
var N=(M>J)?Math.pow(M,1/3):(L*M+16)/116;
var S=116*O-16,W=500*(P-O),U=200*(O-N);
return{L:S,a:W,b:U}
},Luv:function(M,O){O=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},O||{});
var P=H.kappa(O.useApproximation),V=H.epsilon(O.useApproximation);
var R=H.whitepoint(O.whitepoint,O.observer);
var L=(4*M.X)/(M.X+15*M.Y+3*M.Z);
var Q=(9*M.Y)/(M.X+15*M.Y+3*M.Z);
var N=(4*R.x)/(R.x+15*R.y+3*R.z);
var U=(9*R.y)/(R.x+15*R.y+3*R.z);
var J=M.Y/R.y;
var K=(J>V)?116*Math.pow(J,1/3)-16:P*J;
var T=13*K*(L-N);
var S=13*K*(Q-U);
return{L:K,u:T,v:S}
}},xyY:{XYZ:function(K){if(K.y==0){var J=0,M=0,L=0
}else{var J=(K.x*K.Y)/K.y;
var M=K.Y;
var L=((1-K.x-K.y)*K.Y)/K.y
}return{X:J,Y:M,Z:L}
}},Lab:{XYZ:function(L,M){M=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},M||{});
var U=M.useApproximation,N=H.kappa(U),W=H.epsilon(U);
var T=H.whitepoint(M.whitepoint,M.observer);
var J=(L.L>(N*W))?Math.pow((L.L+16)/116,3):L.L/N;
var P=(J>W)?(L.L+16)/116:(N*J+16)/116;
var R=(L.a/500)+P;
var O=P-(L.b/200);
var K=Math.pow(R,3),V=Math.pow(O,3);
var Q=(K>W)?K:(116*R-16)/N;
var S=(V>W)?V:(116*O-16)/N;
return{X:Q*T.x,Y:J*T.y,Z:S*T.z}
},LCHab:function(J){var L=J.L,K=Math.pow(J.a*J.a+J.b*J.b,0.5),M=Math.atan(J.b,J.a)*(180/Math.PI);
if(M<0){M+=360
}if(M<360){M-=360
}return{L:L,C:K,H:M}
}},LCHab:{Lab:function(K){var L=K.H*(Math.PI/180),N=K.L,J=K.C/Math.pow(Math.pow(Math.tan(L),2)+1,0.5);
if(90<lchH&&K.H<270){J=-J
}var M=Math.pow(Math.pow(K.C,2)-Math.pow(J,2),0.5);
if(K.H>180){M=-M
}return{L:N,a:J,b:M}
}},Luv:{XYZ:function(T,R){R=A.mixin({whitepoint:"D65",observer:"10",useApproximation:true},R||{});
var V=R.useApproximation,L=H.kappa(V),J=H.epsilon(V);
var U=H.whitepoint(R.whitepoint,R.observer);
var K=(4*U.x)/(U.x+15*U.y+3*U.z);
var N=(9*U.y)/(U.x+15*U.y+3*U.z);
var P=(T.L>L*J)?Math.pow((T.L+16)/116,3):T.L/L;
var W=(1/3)*(((52*T.L)/(T.u+13*T.L*K))-1);
var V=-5*P,S=-(1/3),M=P*(((39*T.L)/(T.v+13*T.L*N))-5);
var Q=(M-V)/(W-S),O=Q*W+V;
return{X:Q,Y:P,Z:O}
},LCHuv:function(K){var L=K.L,J=Math.pow(K.u*K.u+K.v*K*v,0.5),M=Math.atan(K.v,K.u)*(180/Math.PI);
if(M<0){M+=360
}if(M>360){M-=360
}return{L:L,C:J,H:M}
}},LCHuv:{Luv:function(L){var K=L.H*(Math.PI/180);
var M=L.L,J=L.C/Math.pow(Math.pow(Math.tan(K),2)+1,0.5);
var N=Math.pow(L.C*L.C-J*J,0.5);
if(90<L.H&&L.H>270){J*=-1
}if(L.H>180){N*=-1
}return{L:M,u:J,v:N}
}}};
var B={CMY:{CMYK:function(K,J){return I.fromCmy(K).toCmyk()
},HSL:function(K,J){return I.fromCmy(K).toHsl()
},HSV:function(K,J){return I.fromCmy(K).toHsv()
},Lab:function(K,J){return D.XYZ.Lab(I.fromCmy(K).toXYZ(J))
},LCHab:function(K,J){return D.Lab.LCHab(B.CMY.Lab(K))
},LCHuv:function(K,J){return D.LCHuv.Luv(D.Luv.XYZ(I.fromCmy(K).toXYZ(J)))
},Luv:function(K,J){return D.Luv.XYZ(I.fromCmy(K).toXYZ(J))
},RGB:function(K,J){return I.fromCmy(K)
},XYZ:function(K,J){return I.fromCmy(K).toXYZ(J)
},xyY:function(K,J){return D.XYZ.xyY(I.fromCmy(K).toXYZ(J))
}},CMYK:{CMY:function(K,J){return I.fromCmyk(K).toCmy()
},HSL:function(K,J){return I.fromCmyk(K).toHsl()
},HSV:function(K,J){return I.fromCmyk(K).toHsv()
},Lab:function(K,J){return D.XYZ.Lab(I.fromCmyk(K).toXYZ(J))
},LCHab:function(K,J){return D.Lab.LCHab(B.CMYK.Lab(K))
},LCHuv:function(K,J){return D.LCHuv.Luv(D.Luv.XYZ(I.fromCmyk(K).toXYZ(J)))
},Luv:function(K,J){return D.Luv.XYZ(I.fromCmyk(K).toXYZ(J))
},RGB:function(K,J){return I.fromCmyk(K)
},XYZ:function(K,J){return I.fromCmyk(K).toXYZ(J)
},xyY:function(K,J){return D.XYZ.xyY(I.fromCmyk(K).toXYZ(J))
}},HSL:{CMY:function(K,J){return I.fromHsl(K).toCmy()
},CMYK:function(K,J){return I.fromHsl(K).toCmyk()
},HSV:function(K,J){return I.fromHsl(K).toHsv()
},Lab:function(K,J){return D.XYZ.Lab(I.fromHsl(K).toXYZ(J))
},LCHab:function(K,J){return D.Lab.LCHab(B.CMYK.Lab(K))
},LCHuv:function(K,J){return D.LCHuv.Luv(D.Luv.XYZ(I.fromHsl(K).toXYZ(J)))
},Luv:function(K,J){return D.Luv.XYZ(I.fromHsl(K).toXYZ(J))
},RGB:function(K,J){return I.fromHsl(K)
},XYZ:function(K,J){return I.fromHsl(K).toXYZ(J)
},xyY:function(K,J){return D.XYZ.xyY(I.fromHsl(K).toXYZ(J))
}},HSV:{CMY:function(K,J){return I.fromHsv(K).toCmy()
},CMYK:function(K,J){return I.fromHsv(K).toCmyk()
},HSL:function(K,J){return I.fromHsv(K).toHsl()
},Lab:function(K,J){return D.XYZ.Lab(I.fromHsv(K).toXYZ(J))
},LCHab:function(K,J){return D.Lab.LCHab(B.CMYK.Lab(K))
},LCHuv:function(K,J){return D.LCHuv.Luv(D.Luv.XYZ(I.fromHsv(K).toXYZ(J)))
},Luv:function(K,J){return D.Luv.XYZ(I.fromHsv(K).toXYZ(J))
},RGB:function(K,J){return I.fromHsv(K)
},XYZ:function(K,J){return I.fromHsv(K).toXYZ(J)
},xyY:function(K,J){return D.XYZ.xyY(I.fromHsv(K).toXYZ(J))
}},Lab:{CMY:function(K,J){return I.fromXYZ(D.Lab.XYZ(K,J)).toCmy()
},CMYK:function(K,J){return I.fromXYZ(D.Lab.XYZ(K,J)).toCmyk()
},HSL:function(K,J){return I.fromXYZ(D.Lab.XYZ(K,J)).toHsl()
},HSV:function(K,J){return I.fromXYZ(D.Lab.XYZ(K,J)).toHsv()
},LCHab:function(K,J){return D.Lab.LCHab(K,J)
},LCHuv:function(K,J){return D.Luv.LCHuv(D.Lab.XYZ(K,J),J)
},Luv:function(K,J){return D.XYZ.Luv(D.Lab.XYZ(K,J),J)
},RGB:function(K,J){return I.fromXYZ(D.Lab.XYZ(K,J))
},XYZ:function(K,J){return D.Lab.XYZ(K,J)
},xyY:function(K,J){return D.XYZ.xyY(D.Lab.XYZ(K,J),J)
}},LCHab:{CMY:function(K,J){return I.fromXYZ(D.Lab.XYZ(D.LCHab.Lab(K),J),J).toCmy()
},CMYK:function(K,J){return I.fromXYZ(D.Lab.XYZ(D.LCHab.Lab(K),J),J).toCmyk()
},HSL:function(K,J){return I.fromXYZ(D.Lab.XYZ(D.LCHab.Lab(K),J),J).toHsl()
},HSV:function(K,J){return I.fromXYZ(D.Lab.XYZ(D.LCHab.Lab(K),J),J).toHsv()
},Lab:function(K,J){return D.Lab.LCHab(K,J)
},LCHuv:function(K,J){return D.Luv.LCHuv(D.XYZ.Luv(D.Lab.XYZ(D.LCHab.Lab(K),J),J),J)
},Luv:function(K,J){return D.XYZ.Luv(D.Lab.XYZ(D.LCHab.Lab(K),J),J)
},RGB:function(K,J){return I.fromXYZ(D.Lab.XYZ(D.LCHab.Lab(K),J),J)
},XYZ:function(K,J){return D.Lab.XYZ(D.LCHab.Lab(K,J),J)
},xyY:function(K,J){return D.XYZ.xyY(D.Lab.XYZ(D.LCHab.Lab(K),J),J)
}},LCHuv:{CMY:function(K,J){return I.fromXYZ(D.Luv.XYZ(D.LCHuv.Luv(K),J),J).toCmy()
},CMYK:function(K,J){return I.fromXYZ(D.Luv.XYZ(D.LCHuv.Luv(K),J),J).toCmyk()
},HSL:function(K,J){return I.fromXYZ(D.Luv.XYZ(D.LCHuv.Luv(K),J),J).toHsl()
},HSV:function(K,J){return I.fromXYZ(D.Luv.XYZ(D.LCHuv.Luv(K),J),J).toHsv()
},Lab:function(K,J){return D.XYZ.Lab(D.Luv.XYZ(D.LCHuv.Luv(K),J),J)
},LCHab:function(K,J){return D.Lab.LCHab(D.XYZ.Lab(D.Luv.XYZ(D.LCHuv.Luv(K),J),J),J)
},Luv:function(K,J){return D.LCHuv.Luv(K,J)
},RGB:function(K,J){return I.fromXYZ(D.Luv.XYZ(D.LCHuv.Luv(K),J),J)
},XYZ:function(K,J){return D.Luv.XYZ(D.LCHuv.Luv(K),J)
},xyY:function(K,J){return D.XYZ.xyY(D.Luv.XYZ(D.LCHuv.Luv(K),J),J)
},},Luv:{CMY:function(K,J){return I.fromXYZ(D.Luv.XYZ(K,J),J).toCmy()
},CMYK:function(K,J){return I.fromXYZ(D.Luv.XYZ(K,J),J).toCmyk()
},HSL:function(K,J){return I.fromXYZ(D.Luv.XYZ(K,J),J).toHsl()
},HSV:function(K,J){return I.fromXYZ(D.Luv.XYZ(K,J),J).toHsv()
},Lab:function(K,J){return D.XYZ.Lab(D.Luv.XYZ(K,J),J)
},LCHab:function(K,J){return D.Lab.LCHab(D.XYZ.Lab(D.Luv.XYZ(K,J),J),J)
},LCHuv:function(K,J){return D.Luv.LCHuv(K,J)
},RGB:function(K,J){return I.fromXYZ(D.Luv.XYZ(K,J),J)
},XYZ:function(K,J){return D.Luv.XYZ(K,J)
},xyY:function(K,J){return D.XYZ.xyY(D.Luv.XYZ(K,J),J)
},},RGB:{CMY:function(K,J){return K.toCmy()
},CMYK:function(K,J){return K.toCmyk()
},HSL:function(K,J){return K.toHsl()
},HSV:function(K,J){return K.toHsv()
},Lab:function(K,J){return D.XYZ.Lab(K.toXYZ(J),J)
},LCHab:function(K,J){return D.LCHab.Lab(D.XYZ.Lab(K.toXYZ(J),J),J)
},LCHuv:function(K,J){return D.LCHuv.Luv(D.XYZ.Luv(K.toXYZ(J),J),J)
},Luv:function(K,J){return D.XYZ.Luv(K.toXYZ(J),J)
},XYZ:function(K,J){return K.toXYZ(J)
},xyY:function(K,J){return D.XYZ.xyY(K.toXYZ(J),J)
}},XYZ:{CMY:function(K,J){return I.fromXYZ(K,J).toCmy()
},CMYK:function(K,J){return I.fromXYZ(K,J).toCmyk()
},HSL:function(K,J){return I.fromXYZ(K,J).toHsl()
},HSV:function(K,J){return I.fromXYZ(K,J).toHsv()
},Lab:function(K,J){return D.XYZ.Lab(K,J)
},LCHab:function(K,J){return D.Lab.LCHab(D.XYZ.Lab(K,J),J)
},LCHuv:function(K,J){return D.Luv.LCHuv(D.XYZ.Luv(K,J),J)
},Luv:function(K,J){return D.XYZ.Luv(K,J)
},RGB:function(K,J){return I.fromXYZ(K,J)
},xyY:function(K,J){return D.XYZ.xyY(I.fromXYZ(K,J),J)
}},xyY:{CMY:function(K,J){return I.fromXYZ(D.xyY.XYZ(K,J),J).toCmy()
},CMYK:function(K,J){return I.fromXYZ(D.xyY.XYZ(K,J),J).toCmyk()
},HSL:function(K,J){return I.fromXYZ(D.xyY.XYZ(K,J),J).toHsl()
},HSV:function(K,J){return I.fromXYZ(D.xyY.XYZ(K,J),J).toHsv()
},Lab:function(K,J){return D.Lab.XYZ(D.xyY.XYZ(K,J),J)
},LCHab:function(K,J){return D.LCHab.Lab(D.Lab.XYZ(D.xyY.XYZ(K,J),J),J)
},LCHuv:function(K,J){return D.LCHuv.Luv(D.Luv.XYZ(D.xyY.XYZ(K,J),J),J)
},Luv:function(K,J){return D.Luv.XYZ(D.xyY.XYZ(K,J),J)
},RGB:function(K,J){return I.fromXYZ(D.xyY.XYZ(K,J),J)
},XYZ:function(K,J){return D.xyY.XYZ(K,J)
}}};
this.whitepoint=function(K,N){N=N||"10";
var M=0,L=0,J=0;
if(E[N]&&E[N][K]){M=E[N][K].x;
L=E[N][K].y;
J=E[N][K].t
}else{console.warn("dojox.color.Colorspace::whitepoint: either the observer or the whitepoint name was not found. ",N,K)
}var O={x:M,y:L,z:(1-M-L),t:J,Y:1};
return this.convert(O,"xyY","XYZ")
};
this.tempToWhitepoint=function(J){if(J<4000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures less than 4000K. (Passed ",J,").");
return{x:0,y:0}
}if(J>25000){console.warn("dojox.color.Colorspace::tempToWhitepoint: can't find a white point for temperatures greater than 25000K. (Passed ",J,").");
return{x:0,y:0}
}var P=J,O=J*J,N=O*J;
var K=Math.pow(10,9),L=Math.pow(10,6),M=Math.pow(10,3);
if(J<=7000){var R=(-4.607*K/N)+(2.9678*L/O)+(0.09911*M/J)+0.2444063
}else{var R=(-2.0064*K/N)+(1.9018*L/O)+(0.24748*M/J)+0.23704
}var Q=-3*R*R+2.87*R-0.275;
return{x:R,y:Q}
};
this.primaries=function(O){O=A.mixin({profile:"sRGB",whitepoint:"D65",observer:"10",adaptor:"Bradford"},O||{});
var N=[];
if(G[O.profile]){N=G[O.profile].slice(0)
}else{console.warn("dojox.color.Colorspace::primaries: the passed profile was not found.  ","Available profiles include: ",G,".  The profile passed was ",O.profile)
}var J={name:O.profile,gamma:N[0],whitepoint:N[1],xr:N[2],yr:N[3],Yr:N[4],xg:N[5],yg:N[6],Yg:N[7],xb:N[8],yb:N[9],Yb:N[10]};
if(O.whitepoint!=J.whitepoint){var L=this.convert(this.adapt({color:this.convert({x:xr,y:yr,Y:Yr},"xyY","XYZ"),adaptor:O.adaptor,source:J.whitepoint,destination:O.whitepoint}),"XYZ","xyY");
var K=this.convert(this.adapt({color:this.convert({x:xg,y:yg,Y:Yg},"xyY","XYZ"),adaptor:O.adaptor,source:J.whitepoint,destination:O.whitepoint}),"XYZ","xyY");
var M=this.convert(this.adapt({color:this.convert({x:xb,y:yb,Y:Yb},"xyY","XYZ"),adaptor:O.adaptor,source:J.whitepoint,destination:O.whitepoint}),"XYZ","xyY");
J=A.mixin(J,{xr:L.x,yr:L.y,Yr:L.Y,xg:K.x,yg:K.y,Yg:K.Y,xb:M.x,yb:M.y,Yb:M.Y,whitepoint:O.whitepoint})
}return A.mixin(J,{zr:1-J.xr-J.yr,zg:1-J.xg-J.yg,zb:1-J.xb-J.yb})
};
this.adapt=function(Q){if(!Q.color||!Q.source){console.error("dojox.color.Colorspace::adapt: color and source arguments are required. ",Q)
}Q=A.mixin({adaptor:"Bradford",destination:"D65"},Q);
var S=this.whitepoint(Q.source);
var R=this.whitepoint(Q.destination);
if(F[Q.adaptor]){var J=F[Q.adaptor].ma;
var O=F[Q.adaptor].mai
}else{console.warn("dojox.color.Colorspace::adapt: the passed adaptor '",Q.adaptor,"' was not found.")
}var K=C.multiply([[S.x,S.y,S.z]],J);
var P=C.multiply([[R.x,R.y,R.z]],J);
var M=[[P[0][0]/K[0][0],0,0],[0,P[0][1]/K[0][1],0],[0,0,P[0][2]/K[0][2]]];
var N=C.multiply(C.multiply(J,M),O);
var L=C.multiply([[Q.color.X,Q.color.Y,Q.color.Z]],N)[0];
return{X:L[0],Y:L[1],Z:L[2]}
};
this.matrix=function(V,L){var W=this.whitepoint(L.whitepoint);
var K=p.xr/p.yr,Q=1,Z=(1-p.xr-p.yr)/p.yr;
var M=p.xg/p.yg,U=1,a=(1-p.xg-p.yg)/p.yg;
var P=p.xb/p.yb,Y=1,Z=(1-p.xb-p.yb)/p.yb;
var S=[[K,Q,Z],[M,U,a],[P,Y,Zb]];
var R=[[W.X,W.Y,W.Z]];
var N=dojox.math.matrix.multiply(R,dojox.math.matrix.inverse(S));
var O=N[0][0],T=N[0][1],X=N[0][2];
var J=[[O*K,O*Q,O*Z],[T*M,T*U,T*a],[X*P,X*Y,X*Zb]];
if(V=="RGB"){return dojox.math.inverse(J)
}return J
};
this.epsilon=function(J){return(J||typeof (J)=="undefined")?0.008856:216/24289
};
this.kappa=function(J){return(J||typeof (J)=="undefined")?903.3:24389/27
};
this.convert=function(K,J,M,L){if(B[J]&&B[J][M]){return B[J][M](obj,L)
}console.warn("dojox.color.Colorspace::convert: Can't convert ",K," from ",J," to ",M,".")
}
})();
A.mixin(dojox.color,{fromXYZ:function(J,F){F=F||{};
var C=dojox.color.Colorspace.primaries(F);
var D=dojox.color.Colorspace.matrix("RGB",C);
var I=dojox.math.matrix.mutliply([[J.X,J.Y,J.Z]],D);
var M=I[0][0],H=I[0][1],K=I[0][2];
if(C.profile=="sRGB"){var E=(M>0.0031308)?(1.055*Math.pow(M,1/2.4))-0.055:12.92*M;
var L=(H>0.0031308)?(1.055*Math.pow(H,1/2.4))-0.055:12.92*H;
var B=(K>0.0031308)?(1.055*Math.pow(K,1/2.4))-0.055:12.92*K
}else{var E=Math.pow(M,1/C.gamma),L=Math.pow(H,1/C.gamma),B=Math.pow(K,1/C.gamma)
}return new dojox.color.Color({r:Math.floor(E*255),g:Math.floor(L*255),b:Math.floor(B*255)})
}});
A.extend(dojox.color.Color,{toXYZ:function(D){D=D||{};
var K=dojox.color.Colorspace.primaries(D);
var B=dojox.color.Colorspace.matrix("XYZ",K);
var I=this.r/255,C=this.g/255,G=this.b/255;
if(K.profile=="sRGB"){var J=(I>0.04045)?Math.pow(((I+0.055)/1.055),2.4):I/12.92;
var E=(C>0.04045)?Math.pow(((C+0.055)/1.055),2.4):C/12.92;
var H=(G>0.04045)?Math.pow(((G+0.055)/1.055),2.4):G/12.92
}else{var J=Math.pow(I,K.gamma),E=Math.pow(C,K.gamma),H=Math.pow(G,K.gamma)
}var F=dojox.math.matrix([[J,E,H]],B);
return{X:F[0][0],Y:F[0][1],Z:F[0][2]}
}})
}}});