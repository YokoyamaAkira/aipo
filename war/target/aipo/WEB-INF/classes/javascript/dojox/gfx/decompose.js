if(!dojo._hasResource["dojox.gfx.decompose"]){dojo._hasResource["dojox.gfx.decompose"]=true;
dojo.provide("dojox.gfx.decompose");
dojo.require("dojox.gfx.matrix");
(function(){var E=dojox.gfx.matrix;
var D=function(I,J){return Math.abs(I-J)<=0.000001*(Math.abs(I)+Math.abs(J))
};
var C=function(L,I,J,K){if(!isFinite(L)){return J
}else{if(!isFinite(J)){return L
}}I=Math.abs(I),K=Math.abs(K);
return(I*L+K*J)/(I+K)
};
var F=function(J){var I=new E.Matrix2D(J);
return dojo.mixin(I,{dx:0,dy:0,xy:I.yx,yx:I.xy})
};
var A=function(I){return(I.xx*I.yy<0||I.xy*I.yx>0)?-1:1
};
var H=function(O){var S=E.normalize(O),K=-S.xx-S.yy,U=S.xx*S.yy-S.xy*S.yx,T=Math.sqrt(K*K-4*U),N=-(K+(K<0?-T:T))/2,M=U/N,L=S.xy/(N-S.xx),R=1,I=S.xy/(M-S.xx),P=1;
if(D(N,M)){L=1,R=0,I=0,P=1
}if(!isFinite(L)){L=1,R=(N-S.xx)/S.xy;
if(!isFinite(R)){L=(N-S.yy)/S.yx,R=1;
if(!isFinite(L)){L=1,R=S.yx/(N-S.yy)
}}}if(!isFinite(I)){I=1,P=(M-S.xx)/S.xy;
if(!isFinite(P)){I=(M-S.yy)/S.yx,P=1;
if(!isFinite(I)){I=1,P=S.yx/(M-S.yy)
}}}var J=Math.sqrt(L*L+R*R),Q=Math.sqrt(I*I+P*P);
if(!isFinite(L/=J)){L=0
}if(!isFinite(R/=J)){R=0
}if(!isFinite(I/=Q)){I=0
}if(!isFinite(P/=Q)){P=0
}return{value1:N,value2:M,vector1:{x:L,y:R},vector2:{x:I,y:P}}
};
var B=function(K,L){var N=A(K),M=L.angle1=(Math.atan2(K.yx,K.yy)+Math.atan2(-N*K.xy,N*K.xx))/2,J=Math.cos(M),I=Math.sin(M);
L.sx=C(K.xx/J,J,-K.xy/I,I);
L.sy=C(K.yy/J,J,K.yx/I,I);
return L
};
var G=function(K,L){var N=A(K),M=L.angle2=(Math.atan2(N*K.yx,N*K.xx)+Math.atan2(-K.xy,K.yy))/2,J=Math.cos(M),I=Math.sin(M);
L.sx=C(K.xx/J,J,K.yx/I,I);
L.sy=C(K.yy/J,J,-K.xy/I,I);
return L
};
dojox.gfx.decompose=function(I){var Q=E.normalize(I),L={dx:Q.dx,dy:Q.dy,sx:1,sy:1,angle1:0,angle2:0};
if(D(Q.xy,0)&&D(Q.yx,0)){return dojo.mixin(L,{sx:Q.xx,sy:Q.yy})
}if(D(Q.xx*Q.yx,-Q.xy*Q.yy)){return B(Q,L)
}if(D(Q.xx*Q.xy,-Q.yx*Q.yy)){return G(Q,L)
}var P=F(Q),K=H([Q,P]),J=H([P,Q]),M=new E.Matrix2D({xx:K.vector1.x,xy:K.vector2.x,yx:K.vector1.y,yy:K.vector2.y}),O=new E.Matrix2D({xx:J.vector1.x,xy:J.vector1.y,yx:J.vector2.x,yy:J.vector2.y}),N=new E.Matrix2D([E.invert(M),Q,E.invert(O)]);
B(O,L);
N.xx*=L.sx;
N.yy*=L.sy;
G(M,L);
N.xx*=L.sx;
N.yy*=L.sy;
return dojo.mixin(L,{sx:N.xx,sy:N.yy})
}
})()
};