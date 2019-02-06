dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.arc"],["require","dojox.gfx.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.arc"]){A._hasResource["dojox.gfx.arc"]=true;
A.provide("dojox.gfx.arc");
A.require("dojox.gfx.matrix");
(function(){var B=dojox.gfx.matrix,G=function(L){var J=Math.cos(L),I=Math.sin(L),K={x:J+(4/3)*(1-J),y:I-(4/3)*J*(1-J)/I};
return{s:{x:J,y:-I},c1:{x:K.x,y:-K.y},c2:K,e:{x:J,y:I}}
},D=2*Math.PI,F=Math.PI/4,C=Math.PI/8,E=F+C,H=G(C);
A.mixin(dojox.gfx.arc,{unitArcAsBezier:G,curvePI4:H,arcAsBezier:function(U,Q,P,o,I,Z,W,V){I=Boolean(I);
Z=Boolean(Z);
var a=B._degToRad(o),m=Q*Q,L=P*P,J=B.multiplyPoint(B.rotate(-a),{x:(U.x-W)/2,y:(U.y-V)/2}),K=J.x*J.x,Y=J.y*J.y,h=Math.sqrt((m*L-m*Y-L*K)/(m*Y+L*K));
if(isNaN(h)){h=0
}var f={x:h*Q*J.y/P,y:-h*P*J.x/Q};
if(I==Z){f={x:-f.x,y:-f.y}
}var n=B.multiplyPoint([B.translate((U.x+W)/2,(U.y+V)/2),B.rotate(a)],f);
var O=B.normalize([B.translate(n.x,n.y),B.rotate(a),B.scale(Q,P)]);
var q=B.invert(O),j=B.multiplyPoint(q,U),p=B.multiplyPoint(q,W,V),i=Math.atan2(j.y,j.x),g=Math.atan2(p.y,p.x),T=i-g;
if(Z){T=-T
}if(T<0){T+=D
}else{if(T>D){T-=D
}}var N=C,b=H,R=Z?N:-N,X=[];
for(var k=T;
k>0;
k-=F){if(k<E){N=k/2;
b=G(N);
R=Z?N:-N;
k=0
}var h,d,l,S=B.normalize([O,B.rotate(i+R)]);
if(Z){h=B.multiplyPoint(S,b.c1);
d=B.multiplyPoint(S,b.c2);
l=B.multiplyPoint(S,b.e)
}else{h=B.multiplyPoint(S,b.c2);
d=B.multiplyPoint(S,b.c1);
l=B.multiplyPoint(S,b.s)
}X.push([h.x,h.y,d.x,d.y,l.x,l.y]);
i+=2*R
}return X
}})
})()
}}});