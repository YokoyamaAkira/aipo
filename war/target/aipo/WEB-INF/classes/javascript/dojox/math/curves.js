if(!dojo._hasResource["dojox.math.curves"]){dojo._hasResource["dojox.math.curves"]=true;
dojo.provide("dojox.math.curves");
dojo.mixin(dojox.math.curves,{Line:function(B,C){this.start=B;
this.end=C;
this.dimensions=B.length;
for(var A=0;
A<B.length;
A++){B[A]=Number(B[A])
}for(var A=0;
A<C.length;
A++){C[A]=Number(C[A])
}this.getValue=function(D){var F=new Array(this.dimensions);
for(var E=0;
E<this.dimensions;
E++){F[E]=((this.end[E]-this.start[E])*D)+this.start[E]
}return F
};
return this
},Bezier:function(A){this.getValue=function(E){if(E>=1){return this.p[this.p.length-1]
}if(E<=0){return this.p[0]
}var J=new Array(this.p[0].length);
for(var H=0;
I<this.p[0].length;
H++){J[H]=0
}for(var I=0;
I<this.p[0].length;
I++){var B=0;
var G=0;
for(var K=0;
K<this.p.length;
K++){B+=this.p[K][I]*this.p[this.p.length-1][0]*dojox.math.bernstein(E,this.p.length,K)
}for(var F=0;
F<this.p.length;
F++){G+=this.p[this.p.length-1][0]*dojox.math.bernstein(E,this.p.length,F)
}J[I]=B/G
}return J
};
this.p=A;
return this
},CatmullRom:function(B,A){this.getValue=function(Q){var I=Q*(this.p.length-1);
var R=Math.floor(I);
var G=I-R;
var F=R-1;
if(F<0){F=0
}var H=R;
var E=R+1;
if(E>=this.p.length){E=this.p.length-1
}var S=R+2;
if(S>=this.p.length){S=this.p.length-1
}var J=G;
var O=G*G;
var M=G*G*G;
var P=new Array(this.p[0].length);
for(var C=0;
C<this.p[0].length;
C++){var N=(-this.c*this.p[F][C])+((2-this.c)*this.p[H][C])+((this.c-2)*this.p[E][C])+(this.c*this.p[S][C]);
var L=(2*this.c*this.p[F][C])+((this.c-3)*this.p[H][C])+((3-2*this.c)*this.p[E][C])+(-this.c*this.p[S][C]);
var D=(-this.c*this.p[F][C])+(this.c*this.p[E][C]);
var K=this.p[H][C];
P[C]=N*M+L*O+D*J+K
}return P
};
if(!A){this.c=0.7
}else{this.c=A
}this.p=B;
return this
},Arc:function(G,C,E){function B(M,L){var K=new Array(M.length);
for(var J=0;
J<M.length;
J++){K[J]=M[J]+L[J]
}return K
}function H(L){var K=new Array(L.length);
for(var J=0;
J<L.length;
J++){K[J]=-L[J]
}return K
}var F=dojox.math.midpoint(G,C);
var A=B(H(F),G);
var D=Math.sqrt(Math.pow(A[0],2)+Math.pow(A[1],2));
var I=dojox.math.radiansToDegrees(Math.atan(A[1]/A[0]));
if(A[0]<0){I-=90
}else{I+=90
}dojox.math.curves.CenteredArc.call(this,F,D,I,I+(E?-180:180))
},CenteredArc:function(A,D,C,B){this.center=A;
this.radius=D;
this.start=C||0;
this.end=B;
this.getValue=function(E){var G=new Array(2);
var F=dojox.math.degreesToRadians(this.start+((this.end-this.start)*E));
G[0]=this.center[0]+this.radius*Math.sin(F);
G[1]=this.center[1]-this.radius*Math.cos(F);
return G
};
return this
},Circle:function(A,B){dojox.math.curves.CenteredArc.call(this,A,B,0,360);
return this
},Path:function(){var D=[];
var C=[];
var B=[];
var E=0;
this.add=function(F,G){if(G<0){console.error("dojox.math.curves.Path.add: weight cannot be less than 0")
}D.push(F);
C.push(G);
E+=G;
A()
};
this.remove=function(F){for(var G=0;
G<D.length;
G++){if(D[G]==F){D.splice(G,1);
E-=C.splice(G,1)[0];
break
}}A()
};
this.removeAll=function(){D=[];
C=[];
E=0
};
this.getValue=function(F){var J=false,H=0;
for(var L=0;
L<B.length;
L++){var G=B[L];
if(F>=G[0]&&F<G[1]){var K=(F-G[0])/G[2];
H=D[L].getValue(K);
J=true;
break
}}if(!J){H=D[D.length-1].getValue(1)
}for(var I=0;
I<L;
I++){H=dojox.math.points.translate(H,D[I].getValue(1))
}return H
};
function A(){var F=0;
for(var I=0;
I<C.length;
I++){var H=F+C[I]/E;
var G=H-F;
B[I]=[F,H,G];
F=H
}}return this
}})
};