if(!dojo._hasResource["dojox.math.curves"]){dojo._hasResource["dojox.math.curves"]=true;
dojo.provide("dojox.math.curves");
dojo.mixin(dojox.math.curves,{Line:function(C,A){this.start=C;
this.end=A;
this.dimensions=C.length;
for(var B=0;
B<C.length;
B++){C[B]=Number(C[B])
}for(var B=0;
B<A.length;
B++){A[B]=Number(A[B])
}this.getValue=function(F){var E=new Array(this.dimensions);
for(var D=0;
D<this.dimensions;
D++){E[D]=((this.end[D]-this.start[D])*F)+this.start[D]
}return E
};
return this
},Bezier:function(A){this.getValue=function(H){if(H>=1){return this.p[this.p.length-1]
}if(H<=0){return this.p[0]
}var J=new Array(this.p[0].length);
for(var E=0;
F<this.p[0].length;
E++){J[E]=0
}for(var F=0;
F<this.p[0].length;
F++){var K=0;
var I=0;
for(var G=0;
G<this.p.length;
G++){K+=this.p[G][F]*this.p[this.p.length-1][0]*dojox.math.bernstein(H,this.p.length,G)
}for(var B=0;
B<this.p.length;
B++){I+=this.p[this.p.length-1][0]*dojox.math.bernstein(H,this.p.length,B)
}J[F]=K/I
}return J
};
this.p=A;
return this
},CatmullRom:function(A,B){this.getValue=function(J){var Q=J*(this.p.length-1);
var K=Math.floor(Q);
var D=Q-K;
var O=K-1;
if(O<0){O=0
}var P=K;
var N=K+1;
if(N>=this.p.length){N=this.p.length-1
}var L=K+2;
if(L>=this.p.length){L=this.p.length-1
}var R=D;
var H=D*D;
var F=D*D*D;
var I=new Array(this.p[0].length);
for(var M=0;
M<this.p[0].length;
M++){var G=(-this.c*this.p[O][M])+((2-this.c)*this.p[P][M])+((this.c-2)*this.p[N][M])+(this.c*this.p[L][M]);
var E=(2*this.c*this.p[O][M])+((this.c-3)*this.p[P][M])+((3-2*this.c)*this.p[N][M])+(-this.c*this.p[L][M]);
var C=(-this.c*this.p[O][M])+(this.c*this.p[N][M]);
var S=this.p[P][M];
I[M]=G*F+E*H+C*R+S
}return I
};
if(!B){this.c=0.7
}else{this.c=B
}this.p=A;
return this
},Arc:function(B,G,I){function F(K,J){var M=new Array(K.length);
for(var L=0;
L<K.length;
L++){M[L]=K[L]+J[L]
}return M
}function C(K){var J=new Array(K.length);
for(var L=0;
L<K.length;
L++){J[L]=-K[L]
}return J
}var A=dojox.math.midpoint(B,G);
var E=F(C(A),B);
var H=Math.sqrt(Math.pow(E[0],2)+Math.pow(E[1],2));
var D=dojox.math.radiansToDegrees(Math.atan(E[1]/E[0]));
if(E[0]<0){D-=90
}else{D+=90
}dojox.math.curves.CenteredArc.call(this,A,H,D,D+(I?-180:180))
},CenteredArc:function(B,A,D,C){this.center=B;
this.radius=A;
this.start=D||0;
this.end=C;
this.getValue=function(G){var F=new Array(2);
var E=dojox.math.degreesToRadians(this.start+((this.end-this.start)*G));
F[0]=this.center[0]+this.radius*Math.sin(E);
F[1]=this.center[1]-this.radius*Math.cos(E);
return F
};
return this
},Circle:function(B,A){dojox.math.curves.CenteredArc.call(this,B,A,0,360);
return this
},Path:function(){var E=[];
var D=[];
var C=[];
var A=0;
this.add=function(G,F){if(F<0){console.error("dojox.math.curves.Path.add: weight cannot be less than 0")
}E.push(G);
D.push(F);
A+=F;
B()
};
this.remove=function(G){for(var F=0;
F<E.length;
F++){if(E[F]==G){E.splice(F,1);
A-=D.splice(F,1)[0];
break
}}B()
};
this.removeAll=function(){E=[];
D=[];
A=0
};
this.getValue=function(L){var J=false,I=0;
for(var G=0;
G<C.length;
G++){var H=C[G];
if(L>=H[0]&&L<H[1]){var K=(L-H[0])/H[2];
I=E[G].getValue(K);
J=true;
break
}}if(!J){I=E[E.length-1].getValue(1)
}for(var F=0;
F<G;
F++){I=dojox.math.points.translate(I,E[F].getValue(1))
}return I
};
function B(){var I=0;
for(var H=0;
H<D.length;
H++){var G=I+D[H]/A;
var F=G-I;
C[H]=[I,G,F];
I=G
}}return this
}})
};