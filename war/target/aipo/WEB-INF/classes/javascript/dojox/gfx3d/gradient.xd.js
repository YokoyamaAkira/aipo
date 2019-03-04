dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.gradient"],["require","dojox.gfx3d.vector"],["require","dojox.gfx3d.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.gradient"]){A._hasResource["dojox.gfx3d.gradient"]=true;
A.provide("dojox.gfx3d.gradient");
A.require("dojox.gfx3d.vector");
A.require("dojox.gfx3d.matrix");
(function(){var C=function(E,D){return Math.sqrt(Math.pow(D.x-E.x,2)+Math.pow(D.y-E.y,2))
};
var B=32;
dojox.gfx3d.gradient=function(E,J,X,F,R,D,S){var Q=dojox.gfx3d.matrix,I=dojox.gfx3d.vector,L=Q.normalize(S),U=Q.multiplyPoint(L,F*Math.cos(R)+X.x,F*Math.sin(R)+X.y,X.z),K=Q.multiplyPoint(L,F*Math.cos(D)+X.x,F*Math.sin(D)+X.y,X.z),W=Q.multiplyPoint(L,X.x,X.y,X.z),G=(D-R)/B,N=C(U,K)/2,Z=E[J.type],T=J.finish,O=J.color,H=[{offset:0,color:Z.call(E,I.substract(U,W),T,O)}];
for(var Y=R+G;
Y<D;
Y+=G){var P=Q.multiplyPoint(L,F*Math.cos(Y)+X.x,F*Math.sin(Y)+X.y,X.z),V=C(U,P),M=C(K,P);
H.push({offset:V/(V+M),color:Z.call(E,I.substract(P,W),T,O)})
}H.push({offset:1,color:Z.call(E,I.substract(K,W),T,O)});
return{type:"linear",x1:0,y1:-N,x2:0,y2:N,colors:H}
}
})()
}}});