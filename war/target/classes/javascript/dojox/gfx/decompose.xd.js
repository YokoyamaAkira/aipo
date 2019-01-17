dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.decompose"],["require","dojox.gfx.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.decompose"]){A._hasResource["dojox.gfx.decompose"]=true;
A.provide("dojox.gfx.decompose");
A.require("dojox.gfx.matrix");
(function(){var C=dojox.gfx.matrix;
var B=function(K,J){return Math.abs(K-J)<=0.000001*(Math.abs(K)+Math.abs(J))
};
var I=function(L,M,J,K){if(!isFinite(L)){return J
}else{if(!isFinite(J)){return L
}}M=Math.abs(M),K=Math.abs(K);
return(M*L+K*J)/(M+K)
};
var D=function(J){var K=new C.Matrix2D(J);
return A.mixin(K,{dx:0,dy:0,xy:K.yx,yx:K.xy})
};
var G=function(J){return(J.xx*J.yy<0||J.xy*J.yx>0)?-1:1
};
var F=function(W){var Q=C.normalize(W),U=-Q.xx-Q.yy,S=Q.xx*Q.yy-Q.xy*Q.yx,R=Math.sqrt(U*U-4*S),N=-(U+(U<0?-R:R))/2,L=S/N,V=Q.xy/(N-Q.xx),P=1,T=Q.xy/(L-Q.xx),O=1;
if(B(N,L)){V=1,P=0,T=0,O=1
}if(!isFinite(V)){V=1,P=(N-Q.xx)/Q.xy;
if(!isFinite(P)){V=(N-Q.yy)/Q.yx,P=1;
if(!isFinite(V)){V=1,P=Q.yx/(N-Q.yy)
}}}if(!isFinite(T)){T=1,O=(L-Q.xx)/Q.xy;
if(!isFinite(O)){T=(L-Q.yy)/Q.yx,O=1;
if(!isFinite(T)){T=1,O=Q.yx/(L-Q.yy)
}}}var K=Math.sqrt(V*V+P*P),J=Math.sqrt(T*T+O*O);
if(!isFinite(V/=K)){V=0
}if(!isFinite(P/=K)){P=0
}if(!isFinite(T/=J)){T=0
}if(!isFinite(O/=J)){O=0
}return{value1:N,value2:L,vector1:{x:V,y:P},vector2:{x:T,y:O}}
};
var H=function(P,J){var L=G(P),K=J.angle1=(Math.atan2(P.yx,P.yy)+Math.atan2(-L*P.xy,L*P.xx))/2,O=Math.cos(K),N=Math.sin(K);
J.sx=I(P.xx/O,O,-P.xy/N,N);
J.sy=I(P.yy/O,O,P.yx/N,N);
return J
};
var E=function(P,J){var L=G(P),K=J.angle2=(Math.atan2(L*P.yx,L*P.xx)+Math.atan2(-P.xy,P.yy))/2,O=Math.cos(K),N=Math.sin(K);
J.sx=I(P.xx/O,O,P.yx/N,N);
J.sy=I(P.yy/O,O,-P.xy/N,N);
return J
};
dojox.gfx.decompose=function(P){var O=C.normalize(P),T={dx:O.dx,dy:O.dy,sx:1,sy:1,angle1:0,angle2:0};
if(B(O.xy,0)&&B(O.yx,0)){return A.mixin(T,{sx:O.xx,sy:O.yy})
}if(B(O.xx*O.yx,-O.xy*O.yy)){return H(O,T)
}if(B(O.xx*O.xy,-O.yx*O.yy)){return E(O,T)
}var N=D(O),R=F([O,N]),Q=F([N,O]),J=new C.Matrix2D({xx:R.vector1.x,xy:R.vector2.x,yx:R.vector1.y,yy:R.vector2.y}),L=new C.Matrix2D({xx:Q.vector1.x,xy:Q.vector1.y,yx:Q.vector2.x,yy:Q.vector2.y}),K=new C.Matrix2D([C.invert(J),O,C.invert(L)]);
H(L,T);
K.xx*=T.sx;
K.yy*=T.sy;
E(J,T);
K.xx*=T.sx;
K.yy*=T.sy;
return A.mixin(T,{sx:K.xx,sy:K.yy})
}
})()
}}});