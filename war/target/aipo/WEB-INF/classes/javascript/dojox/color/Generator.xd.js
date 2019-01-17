dojo._xdResourceLoaded({depends:[["provide","dojox.color.Generator"]],defineResource:function(A){if(!A._hasResource["dojox.color.Generator"]){A._hasResource["dojox.color.Generator"]=true;
A.provide("dojox.color.Generator");
dojox.color.Generator=new (function(){var C=dojox.color;
var B=function(G,H){if(!G){console.warn("dojox.color.Generator::",H,": no base color was passed. ",G);
return null
}if(!G.toHsv){G=new C.Color(G)
}return G
};
var E=function(M,K,G){var H=[];
var I,J=(K-G)/M,L=K;
for(I=0;
I<M;
I++,L-=J){H.push(L)
}return H
};
var D=function(H,J,M){var L=M.length-1,O=[],G,K,N;
for(var I=0;
I<J;
I++){if(I<M.length){G=H.r+(255-H.r)*M[I],K=H.g+(255-H.g)*M[I],N=H.b+(255-H.b)*M[I];
O.push(new C.Color({r:G,g:K,b:N}))
}else{if(I==M.length){O.push(H)
}else{if(L<0){L=M.length-1
}G=H.r*(1-M[L]),K=H.g*(1-M[L]),N=H.b*(1-M[L--]);
O.push(new C.Color({r:G,g:K,b:N}))
}}}return O
};
var F=function(I,G,H){var K=[];
for(var L=0;
L<I[0].length;
L++){for(var J=0;
J<I.length;
J++){K.push(I[J][L])
}}K.length=G;
return K
};
this.analogous=function(J){J=A.mixin({series:4,num:32,order:"bottom up",angle:30,high:0.5,low:0.15},J||{});
var G=B(J.base,"analogous");
if(!G){return[]
}var K=J.num,L=G.toHsv();
var P=J.series+1,N=Math.ceil(K/P);
var M=E(Math.floor(N/2),J.high,J.low);
var H=[],O=L.h-(J.angle*(J.series/2));
for(var I=0;
I<P;
I++,O+=J.angle){if(O<0){O+=360
}if(O>=360){O-=360
}H.push(D(C.fromHsv({h:O,s:L.s,v:L.v}),N,M))
}return F(H,K,J.order)
};
this.monochromatic=function(I){I=A.mixin({num:32,high:0.5,low:0.15},I||{});
var J=B(I.base,"monochromatic");
if(!J){return[]
}var G=E(Math.floor(I.num/2),I.high,I.low);
var H=D(J,I.num,G);
return H
};
this.triadic=function(I){I=A.mixin({num:32,order:"bottom up",high:0.5,low:0.15},I||{});
var G=B(I.base,"triadic");
if(!G){return[]
}var J=I.num,S=3,O=Math.ceil(J/S),L=E(Math.floor(O/2),I.high,I.low);
var H=[],K=G.toHsv();
var N=K.h+57,M=K.h-157;
if(N>360){N-=360
}if(M<0){M+=360
}var R=(K.s>=20)?K.s-10:K.s+10;
var Q=(K.s>=95)?K.s-5:K.s+5;
var P=(K.v>=70)?K.v-30:K.v+30;
H.push(D(dojox.color.fromHsv({h:N,s:R,v:K.v}),O,L));
H.push(D(G,O,L));
H.push(D(dojox.color.fromHsv({h:M,s:Q,v:P}),O,L));
return F(H,J,I.order)
};
this.complementary=function(J){J=A.mixin({num:32,order:"bottom up",high:0.5,low:0.15},J||{});
var H=B(J.base,"complimentary");
if(!H){return[]
}var K=J.num,O=2,N=Math.ceil(K/O),M=E(Math.floor(N/2),J.high,J.low);
var I=[],L=H.toHsv();
var G=(L.h+120)%360;
I.push(D(H,N,M));
I.push(D(dojox.color.fromHsv({h:G,s:L.s,v:L.v}),N,M));
return F(I,K,J.order)
};
this.splitComplementary=function(K){K=A.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},K||{});
var I=B(K.base,"splitComplementary");
if(!I){return[]
}var L=K.num,Q=3,O=Math.ceil(L/Q),N=E(Math.floor(O/2),K.high,K.low);
var J=[],M=I.toHsv();
var H=(M.h+120)%360;
var G=H-K.angle,P=(H+K.angle)%360;
if(G<0){G+=360
}J.push(D(I,O,N));
J.push(D(dojox.color.fromHsv({h:G,s:M.s,v:M.v}),O,N));
J.push(D(dojox.color.fromHsv({h:P,s:M.s,v:M.v}),O,N));
return F(J,L,K.order)
};
this.compound=function(I){I=A.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},I||{});
var G=B(I.base,"compound");
if(!G){return[]
}var J=I.num,V=4,Q=Math.ceil(J/V),M=E(Math.floor(Q/2),I.high,I.low);
var H=[],K=G.toHsv();
var L=(K.h+120)%360;
var P=(K.h+I.angle)%360,O=L-I.angle,N=L-(I.angle/2);
if(O<0){O+=360
}if(N<0){N+=360
}var U=(K.s>=90&&K.s<=100)?K.s-10:K.s+10;
var T=(K.s<=35)?K.s+25:K.s-25;
var S=K.v-20;
var R=K.v;
H.push(D(G,Q,M));
H.push(D(dojox.color.fromHsv({h:P,s:U,v:S}),Q,M));
H.push(D(dojox.color.fromHsv({h:O,s:U,v:S}),Q,M));
H.push(D(dojox.color.fromHsv({h:N,s:T,v:R}),Q,M));
return F(H,J,I.order)
};
this.shades=function(K){K=A.mixin({num:32,high:1.5,low:0.5},K||{});
var M=B(K.base,"shades");
if(!M){return[]
}var I=K.num,H=M.toHsv();
var L=(K.high-K.low)/I,N=K.low;
var G=[];
for(var J=0;
J<I;
J++,N+=L){G.push(C.fromHsv({h:H.h,s:H.s,v:Math.min(Math.round(H.v*N),100)}))
}console.log("generated color list from shades: ",G);
return G
}
})()
}}});