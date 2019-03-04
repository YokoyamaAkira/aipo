if(!dojo._hasResource["dojox.gfx3d.gradient"]){dojo._hasResource["dojox.gfx3d.gradient"]=true;
dojo.provide("dojox.gfx3d.gradient");
dojo.require("dojox.gfx3d.vector");
dojo.require("dojox.gfx3d.matrix");
(function(){var B=function(D,C){return Math.sqrt(Math.pow(C.x-D.x,2)+Math.pow(C.y-D.y,2))
};
var A=32;
dojox.gfx3d.gradient=function(D,I,W,E,Q,C,R){var P=dojox.gfx3d.matrix,H=dojox.gfx3d.vector,K=P.normalize(R),T=P.multiplyPoint(K,E*Math.cos(Q)+W.x,E*Math.sin(Q)+W.y,W.z),J=P.multiplyPoint(K,E*Math.cos(C)+W.x,E*Math.sin(C)+W.y,W.z),V=P.multiplyPoint(K,W.x,W.y,W.z),F=(C-Q)/A,M=B(T,J)/2,Y=D[I.type],S=I.finish,N=I.color,G=[{offset:0,color:Y.call(D,H.substract(T,V),S,N)}];
for(var X=Q+F;
X<C;
X+=F){var O=P.multiplyPoint(K,E*Math.cos(X)+W.x,E*Math.sin(X)+W.y,W.z),U=B(T,O),L=B(J,O);
G.push({offset:U/(U+L),color:Y.call(D,H.substract(O,V),S,N)})
}G.push({offset:1,color:Y.call(D,H.substract(J,V),S,N)});
return{type:"linear",x1:0,y1:-M,x2:0,y2:M,colors:G}
}
})()
};