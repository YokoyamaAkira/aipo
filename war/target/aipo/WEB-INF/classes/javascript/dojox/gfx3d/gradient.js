if(!dojo._hasResource["dojox.gfx3d.gradient"]){dojo._hasResource["dojox.gfx3d.gradient"]=true;
dojo.provide("dojox.gfx3d.gradient");
dojo.require("dojox.gfx3d.vector");
dojo.require("dojox.gfx3d.matrix");
(function(){var A=function(C,D){return Math.sqrt(Math.pow(D.x-C.x,2)+Math.pow(D.y-C.y,2))
};
var B=32;
dojox.gfx3d.gradient=function(E,L,C,F,T,D,U){var S=dojox.gfx3d.matrix,K=dojox.gfx3d.vector,N=S.normalize(U),W=S.multiplyPoint(N,F*Math.cos(T)+C.x,F*Math.sin(T)+C.y,C.z),M=S.multiplyPoint(N,F*Math.cos(D)+C.x,F*Math.sin(D)+C.y,C.z),Y=S.multiplyPoint(N,C.x,C.y,C.z),H=(D-T)/B,P=A(W,M)/2,J=E[L.type],V=L.finish,Q=L.color,I=[{offset:0,color:J.call(E,K.substract(W,Y),V,Q)}];
for(var G=T+H;
G<D;
G+=H){var R=S.multiplyPoint(N,F*Math.cos(G)+C.x,F*Math.sin(G)+C.y,C.z),X=A(W,R),O=A(M,R);
I.push({offset:X/(X+O),color:J.call(E,K.substract(R,Y),V,Q)})
}I.push({offset:1,color:J.call(E,K.substract(M,Y),V,Q)});
return{type:"linear",x1:0,y1:-P,x2:0,y2:P,colors:I}
}
})()
};