if(!dojo._hasResource["dojox.crypto.MD5"]){dojo._hasResource["dojox.crypto.MD5"]=true;
dojo.provide("dojox.crypto.MD5");
dojo.require("dojox.crypto._base");
dojox.crypto.MD5=new function(){var F=8;
var J=(1<<F)-1;
function O(R){var C=[];
for(var Q=0;
Q<R.length*F;
Q+=F){C[Q>>5]|=(R.charCodeAt(Q/F)&J)<<(Q%32)
}return C
}function L(C){var R=[];
for(var Q=0;
Q<C.length*32;
Q+=F){R.push(String.fromCharCode((C[Q>>5]>>>(Q%32))&J))
}return R.join("")
}function N(C){var S="0123456789abcdef";
var R=[];
for(var Q=0;
Q<C.length*4;
Q++){R.push(S.charAt((C[Q>>2]>>((Q%4)*8+4))&15)+S.charAt((C[Q>>2]>>((Q%4)*8))&15))
}return R.join("")
}function I(C){var V="=";
var U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var T=[];
for(var S=0;
S<C.length*4;
S+=3){var R=(((C[S>>2]>>8*(S%4))&255)<<16)|(((C[S+1>>2]>>8*((S+1)%4))&255)<<8)|((C[S+2>>2]>>8*((S+2)%4))&255);
for(var Q=0;
Q<4;
Q++){if(S*8+Q*6>C.length*32){T.push(V)
}else{T.push(U.charAt((R>>6*(3-Q))&63))
}}}return T.join("")
}function H(R,C){var S=(R&65535)+(C&65535);
var Q=(R>>16)+(C>>16)+(S>>16);
return(Q<<16)|(S&65535)
}function B(C,Q){return(C<<Q)|(C>>>(32-Q))
}function K(C,S,R,Q,U,T){return H(B(H(H(S,C),H(Q,T)),U),R)
}function E(S,R,C,V,Q,U,T){return K((R&C)|((~R)&V),S,R,Q,U,T)
}function A(S,R,C,V,Q,U,T){return K((R&V)|(C&(~V)),S,R,Q,U,T)
}function G(S,R,C,V,Q,U,T){return K(R^C^V,S,R,Q,U,T)
}function P(S,R,C,V,Q,U,T){return K(C^(R|(~V)),S,R,Q,U,T)
}function M(Q,W){Q[W>>5]|=128<<((W)%32);
Q[(((W+64)>>>9)<<4)+14]=W;
var C=1732584193;
var Z=-271733879;
var Y=-1732584194;
var X=271733878;
for(var T=0;
T<Q.length;
T+=16){var V=C;
var U=Z;
var S=Y;
var R=X;
C=E(C,Z,Y,X,Q[T+0],7,-680876936);
X=E(X,C,Z,Y,Q[T+1],12,-389564586);
Y=E(Y,X,C,Z,Q[T+2],17,606105819);
Z=E(Z,Y,X,C,Q[T+3],22,-1044525330);
C=E(C,Z,Y,X,Q[T+4],7,-176418897);
X=E(X,C,Z,Y,Q[T+5],12,1200080426);
Y=E(Y,X,C,Z,Q[T+6],17,-1473231341);
Z=E(Z,Y,X,C,Q[T+7],22,-45705983);
C=E(C,Z,Y,X,Q[T+8],7,1770035416);
X=E(X,C,Z,Y,Q[T+9],12,-1958414417);
Y=E(Y,X,C,Z,Q[T+10],17,-42063);
Z=E(Z,Y,X,C,Q[T+11],22,-1990404162);
C=E(C,Z,Y,X,Q[T+12],7,1804603682);
X=E(X,C,Z,Y,Q[T+13],12,-40341101);
Y=E(Y,X,C,Z,Q[T+14],17,-1502002290);
Z=E(Z,Y,X,C,Q[T+15],22,1236535329);
C=A(C,Z,Y,X,Q[T+1],5,-165796510);
X=A(X,C,Z,Y,Q[T+6],9,-1069501632);
Y=A(Y,X,C,Z,Q[T+11],14,643717713);
Z=A(Z,Y,X,C,Q[T+0],20,-373897302);
C=A(C,Z,Y,X,Q[T+5],5,-701558691);
X=A(X,C,Z,Y,Q[T+10],9,38016083);
Y=A(Y,X,C,Z,Q[T+15],14,-660478335);
Z=A(Z,Y,X,C,Q[T+4],20,-405537848);
C=A(C,Z,Y,X,Q[T+9],5,568446438);
X=A(X,C,Z,Y,Q[T+14],9,-1019803690);
Y=A(Y,X,C,Z,Q[T+3],14,-187363961);
Z=A(Z,Y,X,C,Q[T+8],20,1163531501);
C=A(C,Z,Y,X,Q[T+13],5,-1444681467);
X=A(X,C,Z,Y,Q[T+2],9,-51403784);
Y=A(Y,X,C,Z,Q[T+7],14,1735328473);
Z=A(Z,Y,X,C,Q[T+12],20,-1926607734);
C=G(C,Z,Y,X,Q[T+5],4,-378558);
X=G(X,C,Z,Y,Q[T+8],11,-2022574463);
Y=G(Y,X,C,Z,Q[T+11],16,1839030562);
Z=G(Z,Y,X,C,Q[T+14],23,-35309556);
C=G(C,Z,Y,X,Q[T+1],4,-1530992060);
X=G(X,C,Z,Y,Q[T+4],11,1272893353);
Y=G(Y,X,C,Z,Q[T+7],16,-155497632);
Z=G(Z,Y,X,C,Q[T+10],23,-1094730640);
C=G(C,Z,Y,X,Q[T+13],4,681279174);
X=G(X,C,Z,Y,Q[T+0],11,-358537222);
Y=G(Y,X,C,Z,Q[T+3],16,-722521979);
Z=G(Z,Y,X,C,Q[T+6],23,76029189);
C=G(C,Z,Y,X,Q[T+9],4,-640364487);
X=G(X,C,Z,Y,Q[T+12],11,-421815835);
Y=G(Y,X,C,Z,Q[T+15],16,530742520);
Z=G(Z,Y,X,C,Q[T+2],23,-995338651);
C=P(C,Z,Y,X,Q[T+0],6,-198630844);
X=P(X,C,Z,Y,Q[T+7],10,1126891415);
Y=P(Y,X,C,Z,Q[T+14],15,-1416354905);
Z=P(Z,Y,X,C,Q[T+5],21,-57434055);
C=P(C,Z,Y,X,Q[T+12],6,1700485571);
X=P(X,C,Z,Y,Q[T+3],10,-1894986606);
Y=P(Y,X,C,Z,Q[T+10],15,-1051523);
Z=P(Z,Y,X,C,Q[T+1],21,-2054922799);
C=P(C,Z,Y,X,Q[T+8],6,1873313359);
X=P(X,C,Z,Y,Q[T+15],10,-30611744);
Y=P(Y,X,C,Z,Q[T+6],15,-1560198380);
Z=P(Z,Y,X,C,Q[T+13],21,1309151649);
C=P(C,Z,Y,X,Q[T+4],6,-145523070);
X=P(X,C,Z,Y,Q[T+11],10,-1120210379);
Y=P(Y,X,C,Z,Q[T+2],15,718787259);
Z=P(Z,Y,X,C,Q[T+9],21,-343485551);
C=H(C,V);
Z=H(Z,U);
Y=H(Y,S);
X=H(X,R)
}return[C,Z,Y,X]
}function D(V,S){var C=O(S);
if(C.length>16){C=M(C,S.length*F)
}var Q=[],U=[];
for(var R=0;
R<16;
R++){Q[R]=C[R]^909522486;
U[R]=C[R]^1549556828
}var T=M(Q.concat(O(V)),512+V.length*F);
return M(U.concat(T),640)
}this.compute=function(R,C){var Q=C||dojox.crypto.outputTypes.Base64;
switch(Q){case dojox.crypto.outputTypes.Hex:return N(M(O(R),R.length*F));
case dojox.crypto.outputTypes.String:return L(M(O(R),R.length*F));
default:return I(M(O(R),R.length*F))
}};
this.getHMAC=function(S,R,C){var Q=C||dojox.crypto.outputTypes.Base64;
switch(Q){case dojox.crypto.outputTypes.Hex:return N(D(S,R));
case dojox.crypto.outputTypes.String:return L(D(S,R));
default:return I(D(S,R))
}}
}()
};