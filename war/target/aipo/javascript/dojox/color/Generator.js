if(!dojo._hasResource["dojox.color.Generator"]){dojo._hasResource["dojox.color.Generator"]=true;
dojo.provide("dojox.color.Generator");
dojox.color.Generator=new (function(){var B=dojox.color;
var A=function(F,G){if(!F){console.warn("dojox.color.Generator::",G,": no base color was passed. ",F);
return null
}if(!F.toHsv){F=new B.Color(F)
}return F
};
var D=function(L,J,F){var G=[];
var H,I=(J-F)/L,K=J;
for(H=0;
H<L;
H++,K-=I){G.push(K)
}return G
};
var C=function(G,I,L){var K=L.length-1,N=[],F,J,M;
for(var H=0;
H<I;
H++){if(H<L.length){F=G.r+(255-G.r)*L[H],J=G.g+(255-G.g)*L[H],M=G.b+(255-G.b)*L[H];
N.push(new B.Color({r:F,g:J,b:M}))
}else{if(H==L.length){N.push(G)
}else{if(K<0){K=L.length-1
}F=G.r*(1-L[K]),J=G.g*(1-L[K]),M=G.b*(1-L[K--]);
N.push(new B.Color({r:F,g:J,b:M}))
}}}return N
};
var E=function(H,F,G){var J=[];
for(var K=0;
K<H[0].length;
K++){for(var I=0;
I<H.length;
I++){J.push(H[I][K])
}}J.length=F;
return J
};
this.analogous=function(I){I=dojo.mixin({series:4,num:32,order:"bottom up",angle:30,high:0.5,low:0.15},I||{});
var F=A(I.base,"analogous");
if(!F){return[]
}var J=I.num,K=F.toHsv();
var O=I.series+1,M=Math.ceil(J/O);
var L=D(Math.floor(M/2),I.high,I.low);
var G=[],N=K.h-(I.angle*(I.series/2));
for(var H=0;
H<O;
H++,N+=I.angle){if(N<0){N+=360
}if(N>=360){N-=360
}G.push(C(B.fromHsv({h:N,s:K.s,v:K.v}),M,L))
}return E(G,J,I.order)
};
this.monochromatic=function(H){H=dojo.mixin({num:32,high:0.5,low:0.15},H||{});
var I=A(H.base,"monochromatic");
if(!I){return[]
}var F=D(Math.floor(H.num/2),H.high,H.low);
var G=C(I,H.num,F);
return G
};
this.triadic=function(H){H=dojo.mixin({num:32,order:"bottom up",high:0.5,low:0.15},H||{});
var F=A(H.base,"triadic");
if(!F){return[]
}var I=H.num,R=3,N=Math.ceil(I/R),K=D(Math.floor(N/2),H.high,H.low);
var G=[],J=F.toHsv();
var M=J.h+57,L=J.h-157;
if(M>360){M-=360
}if(L<0){L+=360
}var Q=(J.s>=20)?J.s-10:J.s+10;
var P=(J.s>=95)?J.s-5:J.s+5;
var O=(J.v>=70)?J.v-30:J.v+30;
G.push(C(dojox.color.fromHsv({h:M,s:Q,v:J.v}),N,K));
G.push(C(F,N,K));
G.push(C(dojox.color.fromHsv({h:L,s:P,v:O}),N,K));
return E(G,I,H.order)
};
this.complementary=function(I){I=dojo.mixin({num:32,order:"bottom up",high:0.5,low:0.15},I||{});
var G=A(I.base,"complimentary");
if(!G){return[]
}var J=I.num,N=2,M=Math.ceil(J/N),L=D(Math.floor(M/2),I.high,I.low);
var H=[],K=G.toHsv();
var F=(K.h+120)%360;
H.push(C(G,M,L));
H.push(C(dojox.color.fromHsv({h:F,s:K.s,v:K.v}),M,L));
return E(H,J,I.order)
};
this.splitComplementary=function(J){J=dojo.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},J||{});
var H=A(J.base,"splitComplementary");
if(!H){return[]
}var K=J.num,P=3,N=Math.ceil(K/P),M=D(Math.floor(N/2),J.high,J.low);
var I=[],L=H.toHsv();
var G=(L.h+120)%360;
var F=G-J.angle,O=(G+J.angle)%360;
if(F<0){F+=360
}I.push(C(H,N,M));
I.push(C(dojox.color.fromHsv({h:F,s:L.s,v:L.v}),N,M));
I.push(C(dojox.color.fromHsv({h:O,s:L.s,v:L.v}),N,M));
return E(I,K,J.order)
};
this.compound=function(H){H=dojo.mixin({num:32,order:"bottom up",angle:30,high:0.5,low:0.15},H||{});
var F=A(H.base,"compound");
if(!F){return[]
}var I=H.num,U=4,P=Math.ceil(I/U),L=D(Math.floor(P/2),H.high,H.low);
var G=[],J=F.toHsv();
var K=(J.h+120)%360;
var O=(J.h+H.angle)%360,N=K-H.angle,M=K-(H.angle/2);
if(N<0){N+=360
}if(M<0){M+=360
}var T=(J.s>=90&&J.s<=100)?J.s-10:J.s+10;
var S=(J.s<=35)?J.s+25:J.s-25;
var R=J.v-20;
var Q=J.v;
G.push(C(F,P,L));
G.push(C(dojox.color.fromHsv({h:O,s:T,v:R}),P,L));
G.push(C(dojox.color.fromHsv({h:N,s:T,v:R}),P,L));
G.push(C(dojox.color.fromHsv({h:M,s:S,v:Q}),P,L));
return E(G,I,H.order)
};
this.shades=function(J){J=dojo.mixin({num:32,high:1.5,low:0.5},J||{});
var L=A(J.base,"shades");
if(!L){return[]
}var H=J.num,G=L.toHsv();
var K=(J.high-J.low)/H,M=J.low;
var F=[];
for(var I=0;
I<H;
I++,M+=K){F.push(B.fromHsv({h:G.h,s:G.s,v:Math.min(Math.round(G.v*M),100)}))
}console.log("generated color list from shades: ",F);
return F
}
})()
};