dojo._xdResourceLoaded({depends:[["provide","dojox.math.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.math.matrix"]){A._hasResource["dojox.math.matrix"]=true;
A.provide("dojox.math.matrix");
A.mixin(dojox.math.matrix,{iDF:0,ALMOST_ZERO:1e-10,multiply:function(H,G){var I=H.length,J=H[0].length,D=G.length,F=G[0].length;
if(J!=D){console.warn("Can't multiply matricies of sizes "+J+","+I+" and "+F+","+D);
return[[0]]
}var E=[];
for(var B=0;
B<I;
B++){E[B]=[];
for(var C=0;
C<F;
C++){E[B][C]=0;
for(var K=0;
K<J;
K++){E[B][C]+=H[B][K]*G[K][C]
}}}return E
},product:function(){if(arguments.length==0){console.warn("can't multiply 0 matrices!");
return 1
}var C=arguments[0];
for(var B=1;
B<arguments.length;
B++){C=this.multiply(C,arguments[B])
}return C
},sum:function(){if(arguments.length==0){console.warn("can't sum 0 matrices!");
return 0
}var H=this.copy(arguments[0]);
var E=H.length;
if(E==0){console.warn("can't deal with matrices of 0 rows!");
return 0
}var F=H[0].length;
if(F==0){console.warn("can't deal with matrices of 0 cols!");
return 0
}for(var C=1;
C<arguments.length;
++C){var G=arguments[C];
if(G.length!=E||G[0].length!=F){console.warn("can't add matrices of different dimensions: first dimensions were "+E+"x"+F+", current dimensions are "+G.length+"x"+G[0].length);
return 0
}for(var D=0;
D<E;
D++){for(var B=0;
B<F;
B++){H[D][B]+=G[D][B]
}}}return H
},inverse:function(I){if(I.length==1&&I[0].length==1){return[[1/I[0][0]]]
}var H=I.length,G=this.create(H,H),C=this.adjoint(I),E=this.determinant(I),F=0;
if(E==0){console.warn("Determinant Equals 0, Not Invertible.");
return[[0]]
}else{F=1/E
}for(var D=0;
D<H;
D++){for(var B=0;
B<H;
B++){G[D][B]=F*C[D][B]
}}return G
},determinant:function(E){if(E.length!=E[0].length){console.warn("Can't calculate the determinant of a non-squre matrix!");
return 0
}var D=E.length,G=1,C=this.upperTriangle(E);
for(var F=0;
F<D;
F++){var B=C[F][F];
if(Math.abs(B)<this.ALMOST_ZERO){return 0
}G*=B
}G*=this.iDF;
return G
},upperTriangle:function(B){B=this.copy(B);
var D=0,H=0,C=B.length,G=1;
this.iDF=1;
for(var K=0;
K<C-1;
K++){if(typeof B[K][K]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+K+"]["+K+"]="+B[K][K])
}G=1;
var F=0;
while((B[K][K]==0)&&!F){if(K+G>=C){this.iDF=0;
F=1
}else{for(var J=0;
J<C;
J++){H=B[K][J];
B[K][J]=B[K+G][J];
B[K+G][J]=H
}G++;
this.iDF*=-1
}}for(var I=K+1;
I<C;
I++){if(typeof B[I][K]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+I+"]["+K+"]="+B[I][K])
}if(typeof B[K][I]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+K+"]["+I+"]="+B[K][I])
}if(B[K][K]!=0){var D=(-1)*B[I][K]/B[K][K];
for(var E=K;
E<C;
E++){B[I][E]=D*B[K][E]+B[I][E]
}}}}return B
},create:function(E,D,C){C=C||0;
var B=[];
for(var G=0;
G<D;
G++){B[G]=[];
for(var F=0;
F<E;
F++){B[G][F]=C
}}return B
},ones:function(B,C){return this.create(B,C,1)
},zeros:function(B,C){return this.create(B,C)
},identity:function(F,B){B=B||1;
var C=[];
for(var E=0;
E<F;
E++){C[E]=[];
for(var D=0;
D<F;
D++){C[E][D]=(E==D?B:0)
}}return C
},adjoint:function(H){var B=H.length;
if(B<=1){console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
return[[0]]
}if(H.length!=H[0].length){console.warn("Can't find the adjoint of a non-square matrix");
return[[0]]
}var L=this.create(B,B),D=this.create(B-1,B-1);
var I=0,F=0,K=0,J=0,G=0;
for(var E=0;
E<B;
E++){for(var C=0;
C<B;
C++){K=0;
for(I=0;
I<B;
I++){if(I==E){continue
}J=0;
for(F=0;
F<B;
F++){if(F==C){continue
}D[K][J]=H[I][F];
J++
}K++
}G=this.determinant(D);
L[E][C]=Math.pow(-1,(E+C))*G
}}return this.transpose(L)
},transpose:function(D){var C=this.create(D.length,D[0].length);
for(var B=0;
B<D.length;
B++){for(var E=0;
E<D[B].length;
E++){C[E][B]=D[B][E]
}}return C
},format:function(I,C){C=C||5;
function D(M,K){var J=Math.pow(10,K);
var N=Math.round(M*J)/J;
var L=N.toString();
if(L.charAt(0)!="-"){L=" "+L
}if(L.indexOf(".")>-1){L+="."
}while(L.length<K+3){L+="0"
}return L
}var H=I.length;
var B=H>0?I[0].length:0;
var G="";
for(var E=0;
E<H;
E++){G+="| ";
for(var F=0;
F<B;
F++){G+=D(I[E][F],C)+" "
}G+="|\n"
}return G
},copy:function(F){var E=F.length,C=F[0].length,D=this.create(C,E);
for(var G=0;
G<E;
G++){for(var B=0;
B<C;
B++){D[G][B]=F[G][B]
}}return D
},scale:function(E,F){E=this.copy(E);
var D=E.length,C=E[0].length;
for(var G=0;
G<D;
G++){for(var B=0;
B<C;
B++){E[G][B]*=F
}}return E
}})
}}});