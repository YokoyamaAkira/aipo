dojo._xdResourceLoaded({depends:[["provide","dojox.color.Generator"]],defineResource:function(A){if(!A._hasResource["dojox.color.Generator"]){A._hasResource["dojox.color.Generator"]=true;
A.provide("dojox.color.Generator");
dojox.color.Generator=new (function(){var D=dojox.color;
var C=function(G,H){if(!G){console.warn("dojox.color.Generator::",H,": no base color was passed. ",G);
return null
}if(!G.toHsv){G=new D.Color(G)
}return G
};
var F=function(I,K,J){var M=[];
var G,H=(K-J)/I,L=K;
for(G=0;
G<I;
G++,L-=H){M.push(L)
}return M
};
var E=function(J,L,O){var N=O.length-1,H=[],I,M,G;
for(var K=0;
K<L;
K++){if(K<O.length){I=J.r+(255-J.r)*O[K],M=J.g+(255-J.g)*O[K],G=J.b+(255-J.b)*O[K];
H.push(new D.Color({r:I,g:M,b:G}))
}else{if(K==O.length){H.push(J)
}else{if(N<0){N=O.length-1
}I=J.r*(1-O[N]),M=J.g*(1-O[N]),G=J.b*(1-O[N--]);
H.push(new D.Color({r:I,g:M,b:G}))
}}}return H
};
var B=function(G,K,L){var I=[];
for(var J=0;
J<G[0].length;
J++){for(var H=0;
H<G.length;
H++){I.push(G[H][J])
}}I.length=K;
return I
};
this.analogous=function(L){L=A.mixin({series:4,num:32,order:"bottom up",angle:30,high:0.5,low:0.15},L||{});
var I=C(L.base,"analogous");
if(!I){return[]
}var M=L.num,N=I.toHsv();
var H=L.series+1,P=Math.ceil(M/H);
var O=F(Math.floor(P/2),L.high,L.low);
var J=[],G=N.h-(L.angle*(L.series/2));
for(var K=0;
K<H;
K++,G+=L.angle){if(G<0){G+=360
}if(G>=360){G-=360
}J.push(E(D.fromHsv({h:G,s:N.s,v:N.v}),P,O))
}return B(J,M,L.order)
};
this.monochromatic=function(I){I=A.mixin({num:32,high:0.5,low:0.15},I||{});
var J=C(I.base,"monochromatic");
if(!J){return[]
}var G=F(Math.floor(I.num/2),I.high,I.low);
var H=E(J,I.num,G);
return H
};
this.triadic=function(I){I=A.mixin({num:32,order:"bottom up",high:0.5,low:0.15},I||{});
var P=C(I.base,"triadic");
if(!P){return[]
}var J=I.num,H=3,O=Math.ceil(J/H),L=F(Math.floor(O/2),I.high,I.low);
var Q=[],K=P.toHsv();
var N=K.h+57,M=K.h-157;
if(N>360){N-=360
}if(M<0){M+=360
}var G=(K.s>=20)?K.s-10:K.s+10;
var S=(K.s>=95)?K.s-5:K.s+5;
var R=(K.v>=70)?K.v-30:K.v+30;
Q.push(E(dojox.color.fromHsv({h:N,s:G,v:K.v}),O,L));
Q.push(E(P,O,L));
Q.push(E(dojox.color.fromHsv({h:M,s:S,v:R}),O,L));
return B(Q,J,I.order)
};
this.complementary=function(L){L=A.mixin({num:32,order:"bottom up",high:0.5,low:0.15},L||{});
var J=C(L.base,"complimentary");
if(!J){return[]
}var M=L.num,H=2,G=Math.ceil(M/H),O=F(Math.floor(G/2),L.high,L.low);
var K=[],N=J.toHsv();
var I=(N.h+120)%360;
K.push(E(J,G,O));
K.push(E(dojox.color.fromHsv({h:I,s:N.s,v:N.v}),G,O));
return B(K,M,L.order)
};
this.splitComplementary=function(M){M=A.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},M||{});
var K=C(M.base,"splitComplementary");
if(!K){return[]
}var N=M.num,H=3,Q=Math.ceil(N/H),P=F(Math.floor(Q/2),M.high,M.low);
var L=[],O=K.toHsv();
var J=(O.h+120)%360;
var I=J-M.angle,G=(J+M.angle)%360;
if(I<0){I+=360
}L.push(E(K,Q,P));
L.push(E(dojox.color.fromHsv({h:I,s:O.s,v:O.v}),Q,P));
L.push(E(dojox.color.fromHsv({h:G,s:O.s,v:O.v}),Q,P));
return B(L,N,M.order)
};
this.compound=function(O){O=A.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},O||{});
var M=C(O.base,"compound");
if(!M){return[]
}var P=O.num,I=4,K=Math.ceil(P/I),S=F(Math.floor(K/2),O.high,O.low);
var N=[],Q=M.toHsv();
var R=(Q.h+120)%360;
var J=(Q.h+O.angle)%360,H=R-O.angle,T=R-(O.angle/2);
if(H<0){H+=360
}if(T<0){T+=360
}var G=(Q.s>=90&&Q.s<=100)?Q.s-10:Q.s+10;
var V=(Q.s<=35)?Q.s+25:Q.s-25;
var U=Q.v-20;
var L=Q.v;
N.push(E(M,K,S));
N.push(E(dojox.color.fromHsv({h:J,s:G,v:U}),K,S));
N.push(E(dojox.color.fromHsv({h:H,s:G,v:U}),K,S));
N.push(E(dojox.color.fromHsv({h:T,s:V,v:L}),K,S));
return B(N,P,O.order)
};
this.shades=function(M){M=A.mixin({num:32,high:1.5,low:0.5},M||{});
var G=C(M.base,"shades");
if(!G){return[]
}var I=M.num,L=G.toHsv();
var N=(M.high-M.low)/I,H=M.low;
var K=[];
for(var J=0;
J<I;
J++,H+=N){K.push(D.fromHsv({h:L.h,s:L.s,v:Math.min(Math.round(L.v*H),100)}))
}console.log("generated color list from shades: ",K);
return K
}
})()
}}});