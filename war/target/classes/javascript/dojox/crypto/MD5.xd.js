dojo._xdResourceLoaded({depends:[["provide","dojox.crypto.MD5"],["require","dojox.crypto._base"]],defineResource:function(A){if(!A._hasResource["dojox.crypto.MD5"]){A._hasResource["dojox.crypto.MD5"]=true;
A.provide("dojox.crypto.MD5");
A.require("dojox.crypto._base");
dojox.crypto.MD5=new function(){var M=8;
var Q=(1<<M)-1;
function H(R){var S=[];
for(var C=0;
C<R.length*M;
C+=M){S[C>>5]|=(R.charCodeAt(C/M)&Q)<<(C%32)
}return S
}function D(S){var R=[];
for(var C=0;
C<S.length*32;
C+=M){R.push(String.fromCharCode((S[C>>5]>>>(C%32))&Q))
}return R.join("")
}function G(T){var S="0123456789abcdef";
var R=[];
for(var C=0;
C<T.length*4;
C++){R.push(S.charAt((T[C>>2]>>((C%4)*8+4))&15)+S.charAt((T[C>>2]>>((C%4)*8))&15))
}return R.join("")
}function P(W){var V="=";
var U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var T=[];
for(var S=0;
S<W.length*4;
S+=3){var R=(((W[S>>2]>>8*(S%4))&255)<<16)|(((W[S+1>>2]>>8*((S+1)%4))&255)<<8)|((W[S+2>>2]>>8*((S+2)%4))&255);
for(var C=0;
C<4;
C++){if(S*8+C*6>W.length*32){T.push(V)
}else{T.push(U.charAt((R>>6*(3-C))&63))
}}}return T.join("")
}function O(R,T){var S=(R&65535)+(T&65535);
var C=(R>>16)+(T>>16)+(S>>16);
return(C<<16)|(S&65535)
}function J(R,C){return(R<<C)|(R>>>(32-C))
}function B(V,S,R,C,U,T){return O(J(O(O(S,V),O(C,T)),U),R)
}function L(S,R,W,V,C,U,T){return B((R&W)|((~R)&V),S,R,C,U,T)
}function E(S,R,W,V,C,U,T){return B((R&V)|(W&(~V)),S,R,C,U,T)
}function N(S,R,W,V,C,U,T){return B(R^W^V,S,R,C,U,T)
}function I(S,R,W,V,C,U,T){return B(W^(R|(~V)),S,R,C,U,T)
}function F(e,V){e[V>>5]|=128<<((V)%32);
e[(((V+64)>>>9)<<4)+14]=V;
var Z=1732584193;
var Y=-271733879;
var X=-1732584194;
var W=271733878;
for(var S=0;
S<e.length;
S+=16){var U=Z;
var T=Y;
var R=X;
var C=W;
Z=L(Z,Y,X,W,e[S+0],7,-680876936);
W=L(W,Z,Y,X,e[S+1],12,-389564586);
X=L(X,W,Z,Y,e[S+2],17,606105819);
Y=L(Y,X,W,Z,e[S+3],22,-1044525330);
Z=L(Z,Y,X,W,e[S+4],7,-176418897);
W=L(W,Z,Y,X,e[S+5],12,1200080426);
X=L(X,W,Z,Y,e[S+6],17,-1473231341);
Y=L(Y,X,W,Z,e[S+7],22,-45705983);
Z=L(Z,Y,X,W,e[S+8],7,1770035416);
W=L(W,Z,Y,X,e[S+9],12,-1958414417);
X=L(X,W,Z,Y,e[S+10],17,-42063);
Y=L(Y,X,W,Z,e[S+11],22,-1990404162);
Z=L(Z,Y,X,W,e[S+12],7,1804603682);
W=L(W,Z,Y,X,e[S+13],12,-40341101);
X=L(X,W,Z,Y,e[S+14],17,-1502002290);
Y=L(Y,X,W,Z,e[S+15],22,1236535329);
Z=E(Z,Y,X,W,e[S+1],5,-165796510);
W=E(W,Z,Y,X,e[S+6],9,-1069501632);
X=E(X,W,Z,Y,e[S+11],14,643717713);
Y=E(Y,X,W,Z,e[S+0],20,-373897302);
Z=E(Z,Y,X,W,e[S+5],5,-701558691);
W=E(W,Z,Y,X,e[S+10],9,38016083);
X=E(X,W,Z,Y,e[S+15],14,-660478335);
Y=E(Y,X,W,Z,e[S+4],20,-405537848);
Z=E(Z,Y,X,W,e[S+9],5,568446438);
W=E(W,Z,Y,X,e[S+14],9,-1019803690);
X=E(X,W,Z,Y,e[S+3],14,-187363961);
Y=E(Y,X,W,Z,e[S+8],20,1163531501);
Z=E(Z,Y,X,W,e[S+13],5,-1444681467);
W=E(W,Z,Y,X,e[S+2],9,-51403784);
X=E(X,W,Z,Y,e[S+7],14,1735328473);
Y=E(Y,X,W,Z,e[S+12],20,-1926607734);
Z=N(Z,Y,X,W,e[S+5],4,-378558);
W=N(W,Z,Y,X,e[S+8],11,-2022574463);
X=N(X,W,Z,Y,e[S+11],16,1839030562);
Y=N(Y,X,W,Z,e[S+14],23,-35309556);
Z=N(Z,Y,X,W,e[S+1],4,-1530992060);
W=N(W,Z,Y,X,e[S+4],11,1272893353);
X=N(X,W,Z,Y,e[S+7],16,-155497632);
Y=N(Y,X,W,Z,e[S+10],23,-1094730640);
Z=N(Z,Y,X,W,e[S+13],4,681279174);
W=N(W,Z,Y,X,e[S+0],11,-358537222);
X=N(X,W,Z,Y,e[S+3],16,-722521979);
Y=N(Y,X,W,Z,e[S+6],23,76029189);
Z=N(Z,Y,X,W,e[S+9],4,-640364487);
W=N(W,Z,Y,X,e[S+12],11,-421815835);
X=N(X,W,Z,Y,e[S+15],16,530742520);
Y=N(Y,X,W,Z,e[S+2],23,-995338651);
Z=I(Z,Y,X,W,e[S+0],6,-198630844);
W=I(W,Z,Y,X,e[S+7],10,1126891415);
X=I(X,W,Z,Y,e[S+14],15,-1416354905);
Y=I(Y,X,W,Z,e[S+5],21,-57434055);
Z=I(Z,Y,X,W,e[S+12],6,1700485571);
W=I(W,Z,Y,X,e[S+3],10,-1894986606);
X=I(X,W,Z,Y,e[S+10],15,-1051523);
Y=I(Y,X,W,Z,e[S+1],21,-2054922799);
Z=I(Z,Y,X,W,e[S+8],6,1873313359);
W=I(W,Z,Y,X,e[S+15],10,-30611744);
X=I(X,W,Z,Y,e[S+6],15,-1560198380);
Y=I(Y,X,W,Z,e[S+13],21,1309151649);
Z=I(Z,Y,X,W,e[S+4],6,-145523070);
W=I(W,Z,Y,X,e[S+11],10,-1120210379);
X=I(X,W,Z,Y,e[S+2],15,718787259);
Y=I(Y,X,W,Z,e[S+9],21,-343485551);
Z=O(Z,U);
Y=O(Y,T);
X=O(X,R);
W=O(W,C)
}return[Z,Y,X,W]
}function K(V,S){var W=H(S);
if(W.length>16){W=F(W,S.length*M)
}var C=[],U=[];
for(var R=0;
R<16;
R++){C[R]=W[R]^909522486;
U[R]=W[R]^1549556828
}var T=F(C.concat(H(V)),512+V.length*M);
return F(U.concat(T),640)
}this.compute=function(R,S){var C=S||dojox.crypto.outputTypes.Base64;
switch(C){case dojox.crypto.outputTypes.Hex:return G(F(H(R),R.length*M));
case dojox.crypto.outputTypes.String:return D(F(H(R),R.length*M));
default:return P(F(H(R),R.length*M))
}};
this.getHMAC=function(S,R,T){var C=T||dojox.crypto.outputTypes.Base64;
switch(C){case dojox.crypto.outputTypes.Hex:return G(K(S,R));
case dojox.crypto.outputTypes.String:return D(K(S,R));
default:return P(K(S,R))
}}
}()
}}});