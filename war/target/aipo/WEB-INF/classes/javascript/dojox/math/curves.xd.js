dojo._xdResourceLoaded({depends:[["provide","dojox.math.curves"]],defineResource:function(A){if(!A._hasResource["dojox.math.curves"]){A._hasResource["dojox.math.curves"]=true;
A.provide("dojox.math.curves");
A.mixin(dojox.math.curves,{Line:function(D,B){this.start=D;
this.end=B;
this.dimensions=D.length;
for(var C=0;
C<D.length;
C++){D[C]=Number(D[C])
}for(var C=0;
C<B.length;
C++){B[C]=Number(B[C])
}this.getValue=function(G){var F=new Array(this.dimensions);
for(var E=0;
E<this.dimensions;
E++){F[E]=((this.end[E]-this.start[E])*G)+this.start[E]
}return F
};
return this
},Bezier:function(B){this.getValue=function(I){if(I>=1){return this.p[this.p.length-1]
}if(I<=0){return this.p[0]
}var K=new Array(this.p[0].length);
for(var F=0;
G<this.p[0].length;
F++){K[F]=0
}for(var G=0;
G<this.p[0].length;
G++){var L=0;
var J=0;
for(var H=0;
H<this.p.length;
H++){L+=this.p[H][G]*this.p[this.p.length-1][0]*dojox.math.bernstein(I,this.p.length,H)
}for(var E=0;
E<this.p.length;
E++){J+=this.p[this.p.length-1][0]*dojox.math.bernstein(I,this.p.length,E)
}K[G]=L/J
}return K
};
this.p=B;
return this
},CatmullRom:function(B,C){this.getValue=function(K){var R=K*(this.p.length-1);
var L=Math.floor(R);
var E=R-L;
var P=L-1;
if(P<0){P=0
}var Q=L;
var O=L+1;
if(O>=this.p.length){O=this.p.length-1
}var M=L+2;
if(M>=this.p.length){M=this.p.length-1
}var S=E;
var I=E*E;
var G=E*E*E;
var J=new Array(this.p[0].length);
for(var N=0;
N<this.p[0].length;
N++){var H=(-this.c*this.p[P][N])+((2-this.c)*this.p[Q][N])+((this.c-2)*this.p[O][N])+(this.c*this.p[M][N]);
var F=(2*this.c*this.p[P][N])+((this.c-3)*this.p[Q][N])+((3-2*this.c)*this.p[O][N])+(-this.c*this.p[M][N]);
var D=(-this.c*this.p[P][N])+(this.c*this.p[O][N]);
var T=this.p[Q][N];
J[N]=H*G+F*I+D*S+T
}return J
};
if(!C){this.c=0.7
}else{this.c=C
}this.p=B;
return this
},Arc:function(C,H,J){function G(L,K){var N=new Array(L.length);
for(var M=0;
M<L.length;
M++){N[M]=L[M]+K[M]
}return N
}function D(L){var K=new Array(L.length);
for(var M=0;
M<L.length;
M++){K[M]=-L[M]
}return K
}var B=dojox.math.midpoint(C,H);
var F=G(D(B),C);
var I=Math.sqrt(Math.pow(F[0],2)+Math.pow(F[1],2));
var E=dojox.math.radiansToDegrees(Math.atan(F[1]/F[0]));
if(F[0]<0){E-=90
}else{E+=90
}dojox.math.curves.CenteredArc.call(this,B,I,E,E+(J?-180:180))
},CenteredArc:function(C,B,E,D){this.center=C;
this.radius=B;
this.start=E||0;
this.end=D;
this.getValue=function(H){var G=new Array(2);
var F=dojox.math.degreesToRadians(this.start+((this.end-this.start)*H));
G[0]=this.center[0]+this.radius*Math.sin(F);
G[1]=this.center[1]-this.radius*Math.cos(F);
return G
};
return this
},Circle:function(C,B){dojox.math.curves.CenteredArc.call(this,C,B,0,360);
return this
},Path:function(){var F=[];
var E=[];
var D=[];
var B=0;
this.add=function(H,G){if(G<0){console.error("dojox.math.curves.Path.add: weight cannot be less than 0")
}F.push(H);
E.push(G);
B+=G;
C()
};
this.remove=function(H){for(var G=0;
G<F.length;
G++){if(F[G]==H){F.splice(G,1);
B-=E.splice(G,1)[0];
break
}}C()
};
this.removeAll=function(){F=[];
E=[];
B=0
};
this.getValue=function(M){var K=false,J=0;
for(var H=0;
H<D.length;
H++){var I=D[H];
if(M>=I[0]&&M<I[1]){var L=(M-I[0])/I[2];
J=F[H].getValue(L);
K=true;
break
}}if(!K){J=F[F.length-1].getValue(1)
}for(var G=0;
G<H;
G++){J=dojox.math.points.translate(J,F[G].getValue(1))
}return J
};
function C(){var J=0;
for(var I=0;
I<E.length;
I++){var H=J+E[I]/B;
var G=H-J;
D[I]=[J,H,G];
J=H
}}return this
}})
}}});