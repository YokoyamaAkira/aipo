dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.decompose"],["require","dojox.gfx.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.decompose"]){A._hasResource["dojox.gfx.decompose"]=true;
A.provide("dojox.gfx.decompose");
A.require("dojox.gfx.matrix");
(function(){var G=dojox.gfx.matrix;
var F=function(K,J){return Math.abs(K-J)<=0.000001*(Math.abs(K)+Math.abs(J))
};
var C=function(M,J,K,L){if(!isFinite(M)){return K
}else{if(!isFinite(K)){return M
}}J=Math.abs(J),L=Math.abs(L);
return(J*M+L*K)/(J+L)
};
var H=function(J){var K=new G.Matrix2D(J);
return A.mixin(K,{dx:0,dy:0,xy:K.yx,yx:K.xy})
};
var D=function(J){return(J.xx*J.yy<0||J.xy*J.yx>0)?-1:1
};
var B=function(K){var R=G.normalize(K),V=-R.xx-R.yy,T=R.xx*R.yy-R.xy*R.yx,S=Math.sqrt(V*V-4*T),L=-(V+(V<0?-S:S))/2,Q=T/L,J=R.xy/(L-R.xx),N=1,U=R.xy/(Q-R.xx),M=1;
if(F(L,Q)){J=1,N=0,U=0,M=1
}if(!isFinite(J)){J=1,N=(L-R.xx)/R.xy;
if(!isFinite(N)){J=(L-R.yy)/R.yx,N=1;
if(!isFinite(J)){J=1,N=R.yx/(L-R.yy)
}}}if(!isFinite(U)){U=1,M=(Q-R.xx)/R.xy;
if(!isFinite(M)){U=(Q-R.yy)/R.yx,M=1;
if(!isFinite(U)){U=1,M=R.yx/(Q-R.yy)
}}}var P=Math.sqrt(J*J+N*N),O=Math.sqrt(U*U+M*M);
if(!isFinite(J/=P)){J=0
}if(!isFinite(N/=P)){N=0
}if(!isFinite(U/=O)){U=0
}if(!isFinite(M/=O)){M=0
}return{value1:L,value2:Q,vector1:{x:J,y:N},vector2:{x:U,y:M}}
};
var E=function(L,M){var O=D(L),N=M.angle1=(Math.atan2(L.yx,L.yy)+Math.atan2(-O*L.xy,O*L.xx))/2,K=Math.cos(N),J=Math.sin(N);
M.sx=C(L.xx/K,K,-L.xy/J,J);
M.sy=C(L.yy/K,K,L.yx/J,J);
return M
};
var I=function(L,M){var O=D(L),N=M.angle2=(Math.atan2(O*L.yx,O*L.xx)+Math.atan2(-L.xy,L.yy))/2,K=Math.cos(N),J=Math.sin(N);
M.sx=C(L.xx/K,K,L.yx/J,J);
M.sy=C(L.yy/K,K,-L.xy/J,J);
return M
};
dojox.gfx.decompose=function(Q){var P=G.normalize(Q),K={dx:P.dx,dy:P.dy,sx:1,sy:1,angle1:0,angle2:0};
if(F(P.xy,0)&&F(P.yx,0)){return A.mixin(K,{sx:P.xx,sy:P.yy})
}if(F(P.xx*P.yx,-P.xy*P.yy)){return E(P,K)
}if(F(P.xx*P.xy,-P.yx*P.yy)){return I(P,K)
}var O=H(P),J=B([P,O]),R=B([O,P]),L=new G.Matrix2D({xx:J.vector1.x,xy:J.vector2.x,yx:J.vector1.y,yy:J.vector2.y}),N=new G.Matrix2D({xx:R.vector1.x,xy:R.vector1.y,yx:R.vector2.x,yy:R.vector2.y}),M=new G.Matrix2D([G.invert(L),P,G.invert(N)]);
E(N,K);
M.xx*=K.sx;
M.yy*=K.sy;
I(L,K);
M.xx*=K.sx;
M.yy*=K.sy;
return A.mixin(K,{sx:M.xx,sy:M.yy})
}
})()
}}});