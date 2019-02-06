if(!dojo._hasResource["dojox.gfx.arc"]){dojo._hasResource["dojox.gfx.arc"]=true;
dojo.provide("dojox.gfx.arc");
dojo.require("dojox.gfx.matrix");
(function(){var E=dojox.gfx.matrix,C=function(H){var J=Math.cos(H),I=Math.sin(H),K={x:J+(4/3)*(1-J),y:I-(4/3)*J*(1-J)/I};
return{s:{x:J,y:-I},c1:{x:K.x,y:-K.y},c2:K,e:{x:J,y:I}}
},G=2*Math.PI,B=Math.PI/4,F=Math.PI/8,A=B+F,D=C(F);
dojo.mixin(dojox.gfx.arc,{unitArcAsBezier:C,curvePI4:D,arcAsBezier:function(M,Z,W,l,I,d,S,Q){I=Boolean(I);
d=Boolean(d);
var g=E._degToRad(l),j=Z*Z,N=W*W,J=E.multiplyPoint(E.rotate(-g),{x:(M.x-S)/2,y:(M.y-Q)/2}),K=J.x*J.x,Y=J.y*J.y,X=Math.sqrt((j*N-j*Y-N*K)/(j*Y+N*K));
if(isNaN(X)){X=0
}var T={x:X*Z*J.y/W,y:-X*W*J.x/Z};
if(I==d){T={x:-T.x,y:-T.y}
}var k=E.multiplyPoint([E.translate((M.x+S)/2,(M.y+Q)/2),E.rotate(g)],T);
var R=E.normalize([E.translate(k.x,k.y),E.rotate(g),E.scale(Z,W)]);
var H=E.invert(R),f=E.multiplyPoint(H,M),m=E.multiplyPoint(H,S,Q),b=Math.atan2(f.y,f.x),V=Math.atan2(m.y,m.x),o=b-V;
if(d){o=-o
}if(o<0){o+=G
}else{if(o>G){o-=G
}}var P=F,L=D,a=d?P:-P,U=[];
for(var h=o;
h>0;
h-=B){if(h<A){P=h/2;
L=C(P);
a=d?P:-P;
h=0
}var X,O,i,n=E.normalize([R,E.rotate(b+a)]);
if(d){X=E.multiplyPoint(n,L.c1);
O=E.multiplyPoint(n,L.c2);
i=E.multiplyPoint(n,L.e)
}else{X=E.multiplyPoint(n,L.c2);
O=E.multiplyPoint(n,L.c1);
i=E.multiplyPoint(n,L.s)
}U.push([X.x,X.y,O.x,O.y,i.x,i.y]);
b+=2*a
}return U
}})
})()
};