dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.gradient"],["require","dojox.gfx3d.vector"],["require","dojox.gfx3d.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.gradient"]){A._hasResource["dojox.gfx3d.gradient"]=true;
A.provide("dojox.gfx3d.gradient");
A.require("dojox.gfx3d.vector");
A.require("dojox.gfx3d.matrix");
(function(){var B=function(E,D){return Math.sqrt(Math.pow(D.x-E.x,2)+Math.pow(D.y-E.y,2))
};
var C=32;
dojox.gfx3d.gradient=function(E,K,Y,F,S,D,T){var R=dojox.gfx3d.matrix,J=dojox.gfx3d.vector,M=R.normalize(T),V=R.multiplyPoint(M,F*Math.cos(S)+Y.x,F*Math.sin(S)+Y.y,Y.z),L=R.multiplyPoint(M,F*Math.cos(D)+Y.x,F*Math.sin(D)+Y.y,Y.z),X=R.multiplyPoint(M,Y.x,Y.y,Y.z),G=(D-S)/C,O=B(V,L)/2,I=E[K.type],U=K.finish,P=K.color,H=[{offset:0,color:I.call(E,J.substract(V,X),U,P)}];
for(var Z=S+G;
Z<D;
Z+=G){var Q=R.multiplyPoint(M,F*Math.cos(Z)+Y.x,F*Math.sin(Z)+Y.y,Y.z),W=B(V,Q),N=B(L,Q);
H.push({offset:W/(W+N),color:I.call(E,J.substract(Q,X),U,P)})
}H.push({offset:1,color:I.call(E,J.substract(L,X),U,P)});
return{type:"linear",x1:0,y1:-O,x2:0,y2:O,colors:H}
}
})()
}}});