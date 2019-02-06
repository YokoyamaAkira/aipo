dojo._xdResourceLoaded({depends:[["provide","dojox.crypto.MD5"],["require","dojox.crypto._base"]],defineResource:function(A){if(!A._hasResource["dojox.crypto.MD5"]){A._hasResource["dojox.crypto.MD5"]=true;
A.provide("dojox.crypto.MD5");
A.require("dojox.crypto._base");
dojox.crypto.MD5=new function(){var I=8;
var M=(1<<I)-1;
function Q(R){var S=[];
for(var C=0;
C<R.length*I;
C+=I){S[C>>5]|=(R.charCodeAt(C/I)&M)<<(C%32)
}return S
}function G(S){var R=[];
for(var C=0;
C<S.length*32;
C+=I){R.push(String.fromCharCode((S[C>>5]>>>(C%32))&M))
}return R.join("")
}function P(T){var S="0123456789abcdef";
var R=[];
for(var C=0;
C<T.length*4;
C++){R.push(S.charAt((T[C>>2]>>((C%4)*8+4))&15)+S.charAt((T[C>>2]>>((C%4)*8))&15))
}return R.join("")
}function L(W){var V="=";
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
}function K(R,T){var S=(R&65535)+(T&65535);
var C=(R>>16)+(T>>16)+(S>>16);
return(C<<16)|(S&65535)
}function E(R,C){return(R<<C)|(R>>>(32-C))
}function D(V,S,R,C,U,T){return K(E(K(K(S,V),K(C,T)),U),R)
}function H(S,R,W,V,C,U,T){return D((R&W)|((~R)&V),S,R,C,U,T)
}function N(S,R,W,V,C,U,T){return D((R&V)|(W&(~V)),S,R,C,U,T)
}function J(S,R,W,V,C,U,T){return D(R^W^V,S,R,C,U,T)
}function B(S,R,W,V,C,U,T){return D(W^(R|(~V)),S,R,C,U,T)
}function O(R,W){R[W>>5]|=128<<((W)%32);
R[(((W+64)>>>9)<<4)+14]=W;
var a=1732584193;
var Z=-271733879;
var Y=-1732584194;
var X=271733878;
for(var T=0;
T<R.length;
T+=16){var V=a;
var U=Z;
var S=Y;
var C=X;
a=H(a,Z,Y,X,R[T+0],7,-680876936);
X=H(X,a,Z,Y,R[T+1],12,-389564586);
Y=H(Y,X,a,Z,R[T+2],17,606105819);
Z=H(Z,Y,X,a,R[T+3],22,-1044525330);
a=H(a,Z,Y,X,R[T+4],7,-176418897);
X=H(X,a,Z,Y,R[T+5],12,1200080426);
Y=H(Y,X,a,Z,R[T+6],17,-1473231341);
Z=H(Z,Y,X,a,R[T+7],22,-45705983);
a=H(a,Z,Y,X,R[T+8],7,1770035416);
X=H(X,a,Z,Y,R[T+9],12,-1958414417);
Y=H(Y,X,a,Z,R[T+10],17,-42063);
Z=H(Z,Y,X,a,R[T+11],22,-1990404162);
a=H(a,Z,Y,X,R[T+12],7,1804603682);
X=H(X,a,Z,Y,R[T+13],12,-40341101);
Y=H(Y,X,a,Z,R[T+14],17,-1502002290);
Z=H(Z,Y,X,a,R[T+15],22,1236535329);
a=N(a,Z,Y,X,R[T+1],5,-165796510);
X=N(X,a,Z,Y,R[T+6],9,-1069501632);
Y=N(Y,X,a,Z,R[T+11],14,643717713);
Z=N(Z,Y,X,a,R[T+0],20,-373897302);
a=N(a,Z,Y,X,R[T+5],5,-701558691);
X=N(X,a,Z,Y,R[T+10],9,38016083);
Y=N(Y,X,a,Z,R[T+15],14,-660478335);
Z=N(Z,Y,X,a,R[T+4],20,-405537848);
a=N(a,Z,Y,X,R[T+9],5,568446438);
X=N(X,a,Z,Y,R[T+14],9,-1019803690);
Y=N(Y,X,a,Z,R[T+3],14,-187363961);
Z=N(Z,Y,X,a,R[T+8],20,1163531501);
a=N(a,Z,Y,X,R[T+13],5,-1444681467);
X=N(X,a,Z,Y,R[T+2],9,-51403784);
Y=N(Y,X,a,Z,R[T+7],14,1735328473);
Z=N(Z,Y,X,a,R[T+12],20,-1926607734);
a=J(a,Z,Y,X,R[T+5],4,-378558);
X=J(X,a,Z,Y,R[T+8],11,-2022574463);
Y=J(Y,X,a,Z,R[T+11],16,1839030562);
Z=J(Z,Y,X,a,R[T+14],23,-35309556);
a=J(a,Z,Y,X,R[T+1],4,-1530992060);
X=J(X,a,Z,Y,R[T+4],11,1272893353);
Y=J(Y,X,a,Z,R[T+7],16,-155497632);
Z=J(Z,Y,X,a,R[T+10],23,-1094730640);
a=J(a,Z,Y,X,R[T+13],4,681279174);
X=J(X,a,Z,Y,R[T+0],11,-358537222);
Y=J(Y,X,a,Z,R[T+3],16,-722521979);
Z=J(Z,Y,X,a,R[T+6],23,76029189);
a=J(a,Z,Y,X,R[T+9],4,-640364487);
X=J(X,a,Z,Y,R[T+12],11,-421815835);
Y=J(Y,X,a,Z,R[T+15],16,530742520);
Z=J(Z,Y,X,a,R[T+2],23,-995338651);
a=B(a,Z,Y,X,R[T+0],6,-198630844);
X=B(X,a,Z,Y,R[T+7],10,1126891415);
Y=B(Y,X,a,Z,R[T+14],15,-1416354905);
Z=B(Z,Y,X,a,R[T+5],21,-57434055);
a=B(a,Z,Y,X,R[T+12],6,1700485571);
X=B(X,a,Z,Y,R[T+3],10,-1894986606);
Y=B(Y,X,a,Z,R[T+10],15,-1051523);
Z=B(Z,Y,X,a,R[T+1],21,-2054922799);
a=B(a,Z,Y,X,R[T+8],6,1873313359);
X=B(X,a,Z,Y,R[T+15],10,-30611744);
Y=B(Y,X,a,Z,R[T+6],15,-1560198380);
Z=B(Z,Y,X,a,R[T+13],21,1309151649);
a=B(a,Z,Y,X,R[T+4],6,-145523070);
X=B(X,a,Z,Y,R[T+11],10,-1120210379);
Y=B(Y,X,a,Z,R[T+2],15,718787259);
Z=B(Z,Y,X,a,R[T+9],21,-343485551);
a=K(a,V);
Z=K(Z,U);
Y=K(Y,S);
X=K(X,C)
}return[a,Z,Y,X]
}function F(V,S){var W=Q(S);
if(W.length>16){W=O(W,S.length*I)
}var C=[],U=[];
for(var R=0;
R<16;
R++){C[R]=W[R]^909522486;
U[R]=W[R]^1549556828
}var T=O(C.concat(Q(V)),512+V.length*I);
return O(U.concat(T),640)
}this.compute=function(R,S){var C=S||dojox.crypto.outputTypes.Base64;
switch(C){case dojox.crypto.outputTypes.Hex:return P(O(Q(R),R.length*I));
case dojox.crypto.outputTypes.String:return G(O(Q(R),R.length*I));
default:return L(O(Q(R),R.length*I))
}};
this.getHMAC=function(S,R,T){var C=T||dojox.crypto.outputTypes.Base64;
switch(C){case dojox.crypto.outputTypes.Hex:return P(F(S,R));
case dojox.crypto.outputTypes.String:return G(F(S,R));
default:return L(F(S,R))
}}
}()
}}});