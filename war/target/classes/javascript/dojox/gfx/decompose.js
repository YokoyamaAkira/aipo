if(!dojo._hasResource["dojox.gfx.decompose"]){dojo._hasResource["dojox.gfx.decompose"]=true;
dojo.provide("dojox.gfx.decompose");
dojo.require("dojox.gfx.matrix");
(function(){var B=dojox.gfx.matrix;
var A=function(J,I){return Math.abs(J-I)<=0.000001*(Math.abs(J)+Math.abs(I))
};
var H=function(K,L,I,J){if(!isFinite(K)){return I
}else{if(!isFinite(I)){return K
}}L=Math.abs(L),J=Math.abs(J);
return(L*K+J*I)/(L+J)
};
var C=function(I){var J=new B.Matrix2D(I);
return dojo.mixin(J,{dx:0,dy:0,xy:J.yx,yx:J.xy})
};
var F=function(I){return(I.xx*I.yy<0||I.xy*I.yx>0)?-1:1
};
var E=function(V){var P=B.normalize(V),T=-P.xx-P.yy,R=P.xx*P.yy-P.xy*P.yx,Q=Math.sqrt(T*T-4*R),L=-(T+(T<0?-Q:Q))/2,K=R/L,U=P.xy/(L-P.xx),O=1,S=P.xy/(K-P.xx),N=1;
if(A(L,K)){U=1,O=0,S=0,N=1
}if(!isFinite(U)){U=1,O=(L-P.xx)/P.xy;
if(!isFinite(O)){U=(L-P.yy)/P.yx,O=1;
if(!isFinite(U)){U=1,O=P.yx/(L-P.yy)
}}}if(!isFinite(S)){S=1,N=(K-P.xx)/P.xy;
if(!isFinite(N)){S=(K-P.yy)/P.yx,N=1;
if(!isFinite(S)){S=1,N=P.yx/(K-P.yy)
}}}var J=Math.sqrt(U*U+O*O),I=Math.sqrt(S*S+N*N);
if(!isFinite(U/=J)){U=0
}if(!isFinite(O/=J)){O=0
}if(!isFinite(S/=I)){S=0
}if(!isFinite(N/=I)){N=0
}return{value1:L,value2:K,vector1:{x:U,y:O},vector2:{x:S,y:N}}
};
var G=function(O,I){var K=F(O),J=I.angle1=(Math.atan2(O.yx,O.yy)+Math.atan2(-K*O.xy,K*O.xx))/2,N=Math.cos(J),L=Math.sin(J);
I.sx=H(O.xx/N,N,-O.xy/L,L);
I.sy=H(O.yy/N,N,O.yx/L,L);
return I
};
var D=function(O,I){var K=F(O),J=I.angle2=(Math.atan2(K*O.yx,K*O.xx)+Math.atan2(-O.xy,O.yy))/2,N=Math.cos(J),L=Math.sin(J);
I.sx=H(O.xx/N,N,O.yx/L,L);
I.sy=H(O.yy/N,N,-O.xy/L,L);
return I
};
dojox.gfx.decompose=function(O){var N=B.normalize(O),R={dx:N.dx,dy:N.dy,sx:1,sy:1,angle1:0,angle2:0};
if(A(N.xy,0)&&A(N.yx,0)){return dojo.mixin(R,{sx:N.xx,sy:N.yy})
}if(A(N.xx*N.yx,-N.xy*N.yy)){return G(N,R)
}if(A(N.xx*N.xy,-N.yx*N.yy)){return D(N,R)
}var L=C(N),Q=E([N,L]),P=E([L,N]),I=new B.Matrix2D({xx:Q.vector1.x,xy:Q.vector2.x,yx:Q.vector1.y,yy:Q.vector2.y}),K=new B.Matrix2D({xx:P.vector1.x,xy:P.vector1.y,yx:P.vector2.x,yy:P.vector2.y}),J=new B.Matrix2D([B.invert(I),N,B.invert(K)]);
G(K,R);
J.xx*=R.sx;
J.yy*=R.sy;
D(I,R);
J.xx*=R.sx;
J.yy*=R.sy;
return dojo.mixin(R,{sx:J.xx,sy:J.yy})
}
})()
};