dojo._xdResourceLoaded({depends:[["provide","dojox.math.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.math.matrix"]){A._hasResource["dojox.math.matrix"]=true;
A.provide("dojox.math.matrix");
A.mixin(dojox.math.matrix,{iDF:0,ALMOST_ZERO:1e-10,multiply:function(J,I){var K=J.length,B=J[0].length,F=I.length,H=I[0].length;
if(B!=F){console.warn("Can't multiply matricies of sizes "+B+","+K+" and "+H+","+F);
return[[0]]
}var G=[];
for(var D=0;
D<K;
D++){G[D]=[];
for(var E=0;
E<H;
E++){G[D][E]=0;
for(var C=0;
C<B;
C++){G[D][E]+=J[D][C]*I[C][E]
}}}return G
},product:function(){if(arguments.length==0){console.warn("can't multiply 0 matrices!");
return 1
}var B=arguments[0];
for(var C=1;
C<arguments.length;
C++){B=this.multiply(B,arguments[C])
}return B
},sum:function(){if(arguments.length==0){console.warn("can't sum 0 matrices!");
return 0
}var C=this.copy(arguments[0]);
var F=C.length;
if(F==0){console.warn("can't deal with matrices of 0 rows!");
return 0
}var G=C[0].length;
if(G==0){console.warn("can't deal with matrices of 0 cols!");
return 0
}for(var D=1;
D<arguments.length;
++D){var B=arguments[D];
if(B.length!=F||B[0].length!=G){console.warn("can't add matrices of different dimensions: first dimensions were "+F+"x"+G+", current dimensions are "+B.length+"x"+B[0].length);
return 0
}for(var E=0;
E<F;
E++){for(var H=0;
H<G;
H++){C[E][H]+=B[E][H]
}}}return C
},inverse:function(E){if(E.length==1&&E[0].length==1){return[[1/E[0][0]]]
}var D=E.length,C=this.create(D,D),I=this.adjoint(E),H=this.determinant(E),B=0;
if(H==0){console.warn("Determinant Equals 0, Not Invertible.");
return[[0]]
}else{B=1/H
}for(var G=0;
G<D;
G++){for(var F=0;
F<D;
F++){C[G][F]=B*I[G][F]
}}return C
},determinant:function(D){if(D.length!=D[0].length){console.warn("Can't calculate the determinant of a non-squre matrix!");
return 0
}var C=D.length,F=1,B=this.upperTriangle(D);
for(var E=0;
E<C;
E++){var G=B[E][E];
if(Math.abs(G)<this.ALMOST_ZERO){return 0
}F*=G
}F*=this.iDF;
return F
},upperTriangle:function(D){D=this.copy(D);
var F=0,J=0,E=D.length,I=1;
this.iDF=1;
for(var C=0;
C<E-1;
C++){if(typeof D[C][C]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+C+"]["+C+"]="+D[C][C])
}I=1;
var H=0;
while((D[C][C]==0)&&!H){if(C+I>=E){this.iDF=0;
H=1
}else{for(var B=0;
B<E;
B++){J=D[C][B];
D[C][B]=D[C+I][B];
D[C+I][B]=J
}I++;
this.iDF*=-1
}}for(var K=C+1;
K<E;
K++){if(typeof D[K][C]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+K+"]["+C+"]="+D[K][C])
}if(typeof D[C][K]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+C+"]["+K+"]="+D[C][K])
}if(D[C][C]!=0){var F=(-1)*D[K][C]/D[C][C];
for(var G=C;
G<E;
G++){D[K][G]=F*D[C][G]+D[K][G]
}}}}return D
},create:function(D,C,G){G=G||0;
var B=[];
for(var F=0;
F<C;
F++){B[F]=[];
for(var E=0;
E<D;
E++){B[F][E]=G
}}return B
},ones:function(C,B){return this.create(C,B,1)
},zeros:function(C,B){return this.create(C,B)
},identity:function(E,F){F=F||1;
var B=[];
for(var D=0;
D<E;
D++){B[D]=[];
for(var C=0;
C<E;
C++){B[D][C]=(D==C?F:0)
}}return B
},adjoint:function(J){var D=J.length;
if(D<=1){console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
return[[0]]
}if(J.length!=J[0].length){console.warn("Can't find the adjoint of a non-square matrix");
return[[0]]
}var C=this.create(D,D),F=this.create(D-1,D-1);
var K=0,H=0,B=0,L=0,I=0;
for(var G=0;
G<D;
G++){for(var E=0;
E<D;
E++){B=0;
for(K=0;
K<D;
K++){if(K==G){continue
}L=0;
for(H=0;
H<D;
H++){if(H==E){continue
}F[B][L]=J[K][H];
L++
}B++
}I=this.determinant(F);
C[G][E]=Math.pow(-1,(G+E))*I
}}return this.transpose(C)
},transpose:function(C){var B=this.create(C.length,C[0].length);
for(var E=0;
E<C.length;
E++){for(var D=0;
D<C[E].length;
D++){B[D][E]=C[E][D]
}}return B
},format:function(E,F){F=F||5;
function G(K,N){var M=Math.pow(10,N);
var L=Math.round(K*M)/M;
var J=L.toString();
if(J.charAt(0)!="-"){J=" "+J
}if(J.indexOf(".")>-1){J+="."
}while(J.length<N+3){J+="0"
}return J
}var D=E.length;
var I=D>0?E[0].length:0;
var C="";
for(var H=0;
H<D;
H++){C+="| ";
for(var B=0;
B<I;
B++){C+=G(E[H][B],F)+" "
}C+="|\n"
}return C
},copy:function(E){var D=E.length,G=E[0].length,C=this.create(G,D);
for(var F=0;
F<D;
F++){for(var B=0;
B<G;
B++){C[F][B]=E[F][B]
}}return C
},scale:function(D,E){D=this.copy(D);
var C=D.length,G=D[0].length;
for(var F=0;
F<C;
F++){for(var B=0;
B<G;
B++){D[F][B]*=E
}}return D
}})
}}});