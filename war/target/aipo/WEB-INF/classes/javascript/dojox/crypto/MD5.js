if(!dojo._hasResource["dojox.crypto.MD5"]){dojo._hasResource["dojox.crypto.MD5"]=true;
dojo.provide("dojox.crypto.MD5");
dojo.require("dojox.crypto._base");
dojox.crypto.MD5=new function(){var L=8;
var P=(1<<L)-1;
function G(Q){var R=[];
for(var C=0;
C<Q.length*L;
C+=L){R[C>>5]|=(Q.charCodeAt(C/L)&P)<<(C%32)
}return R
}function B(R){var Q=[];
for(var C=0;
C<R.length*32;
C+=L){Q.push(String.fromCharCode((R[C>>5]>>>(C%32))&P))
}return Q.join("")
}function F(S){var R="0123456789abcdef";
var Q=[];
for(var C=0;
C<S.length*4;
C++){Q.push(R.charAt((S[C>>2]>>((C%4)*8+4))&15)+R.charAt((S[C>>2]>>((C%4)*8))&15))
}return Q.join("")
}function O(V){var U="=";
var T="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var S=[];
for(var R=0;
R<V.length*4;
R+=3){var Q=(((V[R>>2]>>8*(R%4))&255)<<16)|(((V[R+1>>2]>>8*((R+1)%4))&255)<<8)|((V[R+2>>2]>>8*((R+2)%4))&255);
for(var C=0;
C<4;
C++){if(R*8+C*6>V.length*32){S.push(U)
}else{S.push(T.charAt((Q>>6*(3-C))&63))
}}}return S.join("")
}function N(Q,S){var R=(Q&65535)+(S&65535);
var C=(Q>>16)+(S>>16)+(R>>16);
return(C<<16)|(R&65535)
}function I(Q,C){return(Q<<C)|(Q>>>(32-C))
}function A(U,R,Q,C,T,S){return N(I(N(N(R,U),N(C,S)),T),Q)
}function K(R,Q,V,U,C,T,S){return A((Q&V)|((~Q)&U),R,Q,C,T,S)
}function D(R,Q,V,U,C,T,S){return A((Q&U)|(V&(~U)),R,Q,C,T,S)
}function M(R,Q,V,U,C,T,S){return A(Q^V^U,R,Q,C,T,S)
}function H(R,Q,V,U,C,T,S){return A(V^(Q|(~U)),R,Q,C,T,S)
}function E(Z,U){Z[U>>5]|=128<<((U)%32);
Z[(((U+64)>>>9)<<4)+14]=U;
var Y=1732584193;
var X=-271733879;
var W=-1732584194;
var V=271733878;
for(var R=0;
R<Z.length;
R+=16){var T=Y;
var S=X;
var Q=W;
var C=V;
Y=K(Y,X,W,V,Z[R+0],7,-680876936);
V=K(V,Y,X,W,Z[R+1],12,-389564586);
W=K(W,V,Y,X,Z[R+2],17,606105819);
X=K(X,W,V,Y,Z[R+3],22,-1044525330);
Y=K(Y,X,W,V,Z[R+4],7,-176418897);
V=K(V,Y,X,W,Z[R+5],12,1200080426);
W=K(W,V,Y,X,Z[R+6],17,-1473231341);
X=K(X,W,V,Y,Z[R+7],22,-45705983);
Y=K(Y,X,W,V,Z[R+8],7,1770035416);
V=K(V,Y,X,W,Z[R+9],12,-1958414417);
W=K(W,V,Y,X,Z[R+10],17,-42063);
X=K(X,W,V,Y,Z[R+11],22,-1990404162);
Y=K(Y,X,W,V,Z[R+12],7,1804603682);
V=K(V,Y,X,W,Z[R+13],12,-40341101);
W=K(W,V,Y,X,Z[R+14],17,-1502002290);
X=K(X,W,V,Y,Z[R+15],22,1236535329);
Y=D(Y,X,W,V,Z[R+1],5,-165796510);
V=D(V,Y,X,W,Z[R+6],9,-1069501632);
W=D(W,V,Y,X,Z[R+11],14,643717713);
X=D(X,W,V,Y,Z[R+0],20,-373897302);
Y=D(Y,X,W,V,Z[R+5],5,-701558691);
V=D(V,Y,X,W,Z[R+10],9,38016083);
W=D(W,V,Y,X,Z[R+15],14,-660478335);
X=D(X,W,V,Y,Z[R+4],20,-405537848);
Y=D(Y,X,W,V,Z[R+9],5,568446438);
V=D(V,Y,X,W,Z[R+14],9,-1019803690);
W=D(W,V,Y,X,Z[R+3],14,-187363961);
X=D(X,W,V,Y,Z[R+8],20,1163531501);
Y=D(Y,X,W,V,Z[R+13],5,-1444681467);
V=D(V,Y,X,W,Z[R+2],9,-51403784);
W=D(W,V,Y,X,Z[R+7],14,1735328473);
X=D(X,W,V,Y,Z[R+12],20,-1926607734);
Y=M(Y,X,W,V,Z[R+5],4,-378558);
V=M(V,Y,X,W,Z[R+8],11,-2022574463);
W=M(W,V,Y,X,Z[R+11],16,1839030562);
X=M(X,W,V,Y,Z[R+14],23,-35309556);
Y=M(Y,X,W,V,Z[R+1],4,-1530992060);
V=M(V,Y,X,W,Z[R+4],11,1272893353);
W=M(W,V,Y,X,Z[R+7],16,-155497632);
X=M(X,W,V,Y,Z[R+10],23,-1094730640);
Y=M(Y,X,W,V,Z[R+13],4,681279174);
V=M(V,Y,X,W,Z[R+0],11,-358537222);
W=M(W,V,Y,X,Z[R+3],16,-722521979);
X=M(X,W,V,Y,Z[R+6],23,76029189);
Y=M(Y,X,W,V,Z[R+9],4,-640364487);
V=M(V,Y,X,W,Z[R+12],11,-421815835);
W=M(W,V,Y,X,Z[R+15],16,530742520);
X=M(X,W,V,Y,Z[R+2],23,-995338651);
Y=H(Y,X,W,V,Z[R+0],6,-198630844);
V=H(V,Y,X,W,Z[R+7],10,1126891415);
W=H(W,V,Y,X,Z[R+14],15,-1416354905);
X=H(X,W,V,Y,Z[R+5],21,-57434055);
Y=H(Y,X,W,V,Z[R+12],6,1700485571);
V=H(V,Y,X,W,Z[R+3],10,-1894986606);
W=H(W,V,Y,X,Z[R+10],15,-1051523);
X=H(X,W,V,Y,Z[R+1],21,-2054922799);
Y=H(Y,X,W,V,Z[R+8],6,1873313359);
V=H(V,Y,X,W,Z[R+15],10,-30611744);
W=H(W,V,Y,X,Z[R+6],15,-1560198380);
X=H(X,W,V,Y,Z[R+13],21,1309151649);
Y=H(Y,X,W,V,Z[R+4],6,-145523070);
V=H(V,Y,X,W,Z[R+11],10,-1120210379);
W=H(W,V,Y,X,Z[R+2],15,718787259);
X=H(X,W,V,Y,Z[R+9],21,-343485551);
Y=N(Y,T);
X=N(X,S);
W=N(W,Q);
V=N(V,C)
}return[Y,X,W,V]
}function J(U,R){var V=G(R);
if(V.length>16){V=E(V,R.length*L)
}var C=[],T=[];
for(var Q=0;
Q<16;
Q++){C[Q]=V[Q]^909522486;
T[Q]=V[Q]^1549556828
}var S=E(C.concat(G(U)),512+U.length*L);
return E(T.concat(S),640)
}this.compute=function(Q,R){var C=R||dojox.crypto.outputTypes.Base64;
switch(C){case dojox.crypto.outputTypes.Hex:return F(E(G(Q),Q.length*L));
case dojox.crypto.outputTypes.String:return B(E(G(Q),Q.length*L));
default:return O(E(G(Q),Q.length*L))
}};
this.getHMAC=function(R,Q,S){var C=S||dojox.crypto.outputTypes.Base64;
switch(C){case dojox.crypto.outputTypes.Hex:return F(J(R,Q));
case dojox.crypto.outputTypes.String:return B(J(R,Q));
default:return O(J(R,Q))
}}
}()
};