if(!dojo._hasResource["dojox.gfx.arc"]){dojo._hasResource["dojox.gfx.arc"]=true;
dojo.provide("dojox.gfx.arc");
dojo.require("dojox.gfx.matrix");
(function(){var A=dojox.gfx.matrix,F=function(K){var I=Math.cos(K),H=Math.sin(K),J={x:I+(4/3)*(1-I),y:H-(4/3)*I*(1-I)/H};
return{s:{x:I,y:-H},c1:{x:J.x,y:-J.y},c2:J,e:{x:I,y:H}}
},C=2*Math.PI,E=Math.PI/4,B=Math.PI/8,D=E+B,G=F(B);
dojo.mixin(dojox.gfx.arc,{unitArcAsBezier:F,curvePI4:G,arcAsBezier:function(T,P,O,n,H,Y,V,U){H=Boolean(H);
Y=Boolean(Y);
var Z=A._degToRad(n),l=P*P,K=O*O,I=A.multiplyPoint(A.rotate(-Z),{x:(T.x-V)/2,y:(T.y-U)/2}),J=I.x*I.x,X=I.y*I.y,g=Math.sqrt((l*K-l*X-K*J)/(l*X+K*J));
if(isNaN(g)){g=0
}var d={x:g*P*I.y/O,y:-g*O*I.x/P};
if(H==Y){d={x:-d.x,y:-d.y}
}var m=A.multiplyPoint([A.translate((T.x+V)/2,(T.y+U)/2),A.rotate(Z)],d);
var N=A.normalize([A.translate(m.x,m.y),A.rotate(Z),A.scale(P,O)]);
var p=A.invert(N),i=A.multiplyPoint(p,T),o=A.multiplyPoint(p,V,U),h=Math.atan2(i.y,i.x),f=Math.atan2(o.y,o.x),S=h-f;
if(Y){S=-S
}if(S<0){S+=C
}else{if(S>C){S-=C
}}var L=B,a=G,Q=Y?L:-L,W=[];
for(var j=S;
j>0;
j-=E){if(j<D){L=j/2;
a=F(L);
Q=Y?L:-L;
j=0
}var g,b,k,R=A.normalize([N,A.rotate(h+Q)]);
if(Y){g=A.multiplyPoint(R,a.c1);
b=A.multiplyPoint(R,a.c2);
k=A.multiplyPoint(R,a.e)
}else{g=A.multiplyPoint(R,a.c2);
b=A.multiplyPoint(R,a.c1);
k=A.multiplyPoint(R,a.s)
}W.push([g.x,g.y,b.x,b.y,k.x,k.y]);
h+=2*Q
}return W
}})
})()
};