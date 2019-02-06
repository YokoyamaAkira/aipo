dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.arc"],["require","dojox.gfx.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.arc"]){A._hasResource["dojox.gfx.arc"]=true;
A.provide("dojox.gfx.arc");
A.require("dojox.gfx.matrix");
(function(){var G=dojox.gfx.matrix,F=function(L){var J=Math.cos(L),I=Math.sin(L),K={x:J+(4/3)*(1-J),y:I-(4/3)*J*(1-J)/I};
return{s:{x:J,y:-I},c1:{x:K.x,y:-K.y},c2:K,e:{x:J,y:I}}
},C=2*Math.PI,E=Math.PI/4,H=Math.PI/8,D=E+H,B=F(H);
A.mixin(dojox.gfx.arc,{unitArcAsBezier:F,curvePI4:B,arcAsBezier:function(N,Y,X,l,I,f,T,R){I=Boolean(I);
f=Boolean(f);
var K=G._degToRad(l),j=Y*Y,O=X*X,J=G.multiplyPoint(G.rotate(-K),{x:(N.x-T)/2,y:(N.y-R)/2}),L=J.x*J.x,a=J.y*J.y,Z=Math.sqrt((j*O-j*a-O*L)/(j*a+O*L));
if(isNaN(Z)){Z=0
}var U={x:Z*Y*J.y/X,y:-Z*X*J.x/Y};
if(I==f){U={x:-U.x,y:-U.y}
}var k=G.multiplyPoint([G.translate((N.x+T)/2,(N.y+R)/2),G.rotate(K)],U);
var S=G.normalize([G.translate(k.x,k.y),G.rotate(K),G.scale(Y,X)]);
var n=G.invert(S),g=G.multiplyPoint(n,N),m=G.multiplyPoint(n,T,R),d=Math.atan2(g.y,g.x),W=Math.atan2(m.y,m.x),p=d-W;
if(f){p=-p
}if(p<0){p+=C
}else{if(p>C){p-=C
}}var Q=H,M=B,b=f?Q:-Q,V=[];
for(var h=p;
h>0;
h-=E){if(h<D){Q=h/2;
M=F(Q);
b=f?Q:-Q;
h=0
}var Z,P,i,o=G.normalize([S,G.rotate(d+b)]);
if(f){Z=G.multiplyPoint(o,M.c1);
P=G.multiplyPoint(o,M.c2);
i=G.multiplyPoint(o,M.e)
}else{Z=G.multiplyPoint(o,M.c2);
P=G.multiplyPoint(o,M.c1);
i=G.multiplyPoint(o,M.s)
}V.push([Z.x,Z.y,P.x,P.y,i.x,i.y]);
d+=2*b
}return V
}})
})()
}}});