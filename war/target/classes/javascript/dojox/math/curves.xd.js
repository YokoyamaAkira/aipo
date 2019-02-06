dojo._xdResourceLoaded({depends:[["provide","dojox.math.curves"]],defineResource:function(A){if(!A._hasResource["dojox.math.curves"]){A._hasResource["dojox.math.curves"]=true;
A.provide("dojox.math.curves");
A.mixin(dojox.math.curves,{Line:function(B,C){this.start=B;
this.end=C;
this.dimensions=B.length;
for(var D=0;
D<B.length;
D++){B[D]=Number(B[D])
}for(var D=0;
D<C.length;
D++){C[D]=Number(C[D])
}this.getValue=function(G){var F=new Array(this.dimensions);
for(var E=0;
E<this.dimensions;
E++){F[E]=((this.end[E]-this.start[E])*G)+this.start[E]
}return F
};
return this
},Bezier:function(B){this.getValue=function(K){if(K>=1){return this.p[this.p.length-1]
}if(K<=0){return this.p[0]
}var I=new Array(this.p[0].length);
for(var F=0;
G<this.p[0].length;
F++){I[F]=0
}for(var G=0;
G<this.p[0].length;
G++){var J=0;
var L=0;
for(var H=0;
H<this.p.length;
H++){J+=this.p[H][G]*this.p[this.p.length-1][0]*dojox.math.bernstein(K,this.p.length,H)
}for(var E=0;
E<this.p.length;
E++){L+=this.p[this.p.length-1][0]*dojox.math.bernstein(K,this.p.length,E)
}I[G]=J/L
}return I
};
this.p=B;
return this
},CatmullRom:function(C,B){this.getValue=function(Q){var H=Q*(this.p.length-1);
var R=Math.floor(H);
var K=H-R;
var F=R-1;
if(F<0){F=0
}var G=R;
var E=R+1;
if(E>=this.p.length){E=this.p.length-1
}var S=R+2;
if(S>=this.p.length){S=this.p.length-1
}var I=K;
var O=K*K;
var M=K*K*K;
var P=new Array(this.p[0].length);
for(var T=0;
T<this.p[0].length;
T++){var N=(-this.c*this.p[F][T])+((2-this.c)*this.p[G][T])+((this.c-2)*this.p[E][T])+(this.c*this.p[S][T]);
var L=(2*this.c*this.p[F][T])+((this.c-3)*this.p[G][T])+((3-2*this.c)*this.p[E][T])+(-this.c*this.p[S][T]);
var D=(-this.c*this.p[F][T])+(this.c*this.p[E][T]);
var J=this.p[G][T];
P[T]=N*M+L*O+D*I+J
}return P
};
if(!B){this.c=0.7
}else{this.c=B
}this.p=C;
return this
},Arc:function(J,F,H){function E(N,M){var L=new Array(N.length);
for(var K=0;
K<N.length;
K++){L[K]=N[K]+M[K]
}return L
}function B(M){var L=new Array(M.length);
for(var K=0;
K<M.length;
K++){L[K]=-M[K]
}return L
}var I=dojox.math.midpoint(J,F);
var D=E(B(I),J);
var G=Math.sqrt(Math.pow(D[0],2)+Math.pow(D[1],2));
var C=dojox.math.radiansToDegrees(Math.atan(D[1]/D[0]));
if(D[0]<0){C-=90
}else{C+=90
}dojox.math.curves.CenteredArc.call(this,I,G,C,C+(H?-180:180))
},CenteredArc:function(D,C,B,E){this.center=D;
this.radius=C;
this.start=B||0;
this.end=E;
this.getValue=function(H){var G=new Array(2);
var F=dojox.math.degreesToRadians(this.start+((this.end-this.start)*H));
G[0]=this.center[0]+this.radius*Math.sin(F);
G[1]=this.center[1]-this.radius*Math.cos(F);
return G
};
return this
},Circle:function(B,C){dojox.math.curves.CenteredArc.call(this,B,C,0,360);
return this
},Path:function(){var B=[];
var F=[];
var E=[];
var C=0;
this.add=function(H,G){if(G<0){console.error("dojox.math.curves.Path.add: weight cannot be less than 0")
}B.push(H);
F.push(G);
C+=G;
D()
};
this.remove=function(H){for(var G=0;
G<B.length;
G++){if(B[G]==H){B.splice(G,1);
C-=F.splice(G,1)[0];
break
}}D()
};
this.removeAll=function(){B=[];
F=[];
C=0
};
this.getValue=function(I){var K=false,H=0;
for(var M=0;
M<E.length;
M++){var G=E[M];
if(I>=G[0]&&I<G[1]){var L=(I-G[0])/G[2];
H=B[M].getValue(L);
K=true;
break
}}if(!K){H=B[B.length-1].getValue(1)
}for(var J=0;
J<M;
J++){H=dojox.math.points.translate(H,B[J].getValue(1))
}return H
};
function D(){var J=0;
for(var I=0;
I<F.length;
I++){var H=J+F[I]/C;
var G=H-J;
E[I]=[J,H,G];
J=H
}}return this
}})
}}});