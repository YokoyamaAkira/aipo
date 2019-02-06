if(!dojo._hasResource["dojox.color.Generator"]){dojo._hasResource["dojox.color.Generator"]=true;
dojo.provide("dojox.color.Generator");
dojox.color.Generator=new (function(){var A=dojox.color;
var E=function(G,F){if(!G){console.warn("dojox.color.Generator::",F,": no base color was passed. ",G);
return null
}if(!G.toHsv){G=new A.Color(G)
}return G
};
var C=function(F,J,I){var L=[];
var G,H=(J-I)/F,K=J;
for(G=0;
G<F;
G++,K-=H){L.push(K)
}return L
};
var B=function(K,M,G){var F=G.length-1,I=[],J,N,H;
for(var L=0;
L<M;
L++){if(L<G.length){J=K.r+(255-K.r)*G[L],N=K.g+(255-K.g)*G[L],H=K.b+(255-K.b)*G[L];
I.push(new A.Color({r:J,g:N,b:H}))
}else{if(L==G.length){I.push(K)
}else{if(F<0){F=G.length-1
}J=K.r*(1-G[F]),N=K.g*(1-G[F]),H=K.b*(1-G[F--]);
I.push(new A.Color({r:J,g:N,b:H}))
}}}return I
};
var D=function(I,G,H){var K=[];
for(var F=0;
F<I[0].length;
F++){for(var J=0;
J<I.length;
J++){K.push(I[J][F])
}}K.length=G;
return K
};
this.analogous=function(M){M=dojo.mixin({series:4,num:32,order:"bottom up",angle:30,high:0.5,low:0.15},M||{});
var J=E(M.base,"analogous");
if(!J){return[]
}var N=M.num,O=J.toHsv();
var I=M.series+1,G=Math.ceil(N/I);
var F=C(Math.floor(G/2),M.high,M.low);
var K=[],H=O.h-(M.angle*(M.series/2));
for(var L=0;
L<I;
L++,H+=M.angle){if(H<0){H+=360
}if(H>=360){H-=360
}K.push(B(A.fromHsv({h:H,s:O.s,v:O.v}),G,F))
}return D(K,N,M.order)
};
this.monochromatic=function(I){I=dojo.mixin({num:32,high:0.5,low:0.15},I||{});
var F=E(I.base,"monochromatic");
if(!F){return[]
}var G=C(Math.floor(I.num/2),I.high,I.low);
var H=B(F,I.num,G);
return H
};
this.triadic=function(K){K=dojo.mixin({num:32,order:"bottom up",high:0.5,low:0.15},K||{});
var H=E(K.base,"triadic");
if(!H){return[]
}var M=K.num,L=3,R=Math.ceil(M/L),O=C(Math.floor(R/2),K.high,K.low);
var J=[],N=H.toHsv();
var Q=N.h+57,P=N.h-157;
if(Q>360){Q-=360
}if(P<0){P+=360
}var I=(N.s>=20)?N.s-10:N.s+10;
var G=(N.s>=95)?N.s-5:N.s+5;
var F=(N.v>=70)?N.v-30:N.v+30;
J.push(B(dojox.color.fromHsv({h:Q,s:I,v:N.v}),R,O));
J.push(B(H,R,O));
J.push(B(dojox.color.fromHsv({h:P,s:G,v:F}),R,O));
return D(J,M,K.order)
};
this.complementary=function(M){M=dojo.mixin({num:32,order:"bottom up",high:0.5,low:0.15},M||{});
var K=E(M.base,"complimentary");
if(!K){return[]
}var N=M.num,I=2,H=Math.ceil(N/I),G=C(Math.floor(H/2),M.high,M.low);
var L=[],F=K.toHsv();
var J=(F.h+120)%360;
L.push(B(K,H,G));
L.push(B(dojox.color.fromHsv({h:J,s:F.s,v:F.v}),H,G));
return D(L,N,M.order)
};
this.splitComplementary=function(N){N=dojo.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},N||{});
var L=E(N.base,"splitComplementary");
if(!L){return[]
}var O=N.num,I=3,G=Math.ceil(O/I),F=C(Math.floor(G/2),N.high,N.low);
var M=[],P=L.toHsv();
var K=(P.h+120)%360;
var J=K-N.angle,H=(K+N.angle)%360;
if(J<0){J+=360
}M.push(B(L,G,F));
M.push(B(dojox.color.fromHsv({h:J,s:P.s,v:P.v}),G,F));
M.push(B(dojox.color.fromHsv({h:H,s:P.s,v:P.v}),G,F));
return D(M,O,N.order)
};
this.compound=function(Q){Q=dojo.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},Q||{});
var O=E(Q.base,"compound");
if(!O){return[]
}var R=Q.num,L=4,N=Math.ceil(R/L),H=C(Math.floor(N/2),Q.high,Q.low);
var P=[],S=O.toHsv();
var T=(S.h+120)%360;
var M=(S.h+Q.angle)%360,K=T-Q.angle,J=T-(Q.angle/2);
if(K<0){K+=360
}if(J<0){J+=360
}var I=(S.s>=90&&S.s<=100)?S.s-10:S.s+10;
var G=(S.s<=35)?S.s+25:S.s-25;
var F=S.v-20;
var U=S.v;
P.push(B(O,N,H));
P.push(B(dojox.color.fromHsv({h:M,s:I,v:F}),N,H));
P.push(B(dojox.color.fromHsv({h:K,s:I,v:F}),N,H));
P.push(B(dojox.color.fromHsv({h:J,s:G,v:U}),N,H));
return D(P,R,Q.order)
};
this.shades=function(L){L=dojo.mixin({num:32,high:1.5,low:0.5},L||{});
var F=E(L.base,"shades");
if(!F){return[]
}var H=L.num,K=F.toHsv();
var M=(L.high-L.low)/H,G=L.low;
var J=[];
for(var I=0;
I<H;
I++,G+=M){J.push(A.fromHsv({h:K.h,s:K.s,v:Math.min(Math.round(K.v*G),100)}))
}console.log("generated color list from shades: ",J);
return J
}
})()
};