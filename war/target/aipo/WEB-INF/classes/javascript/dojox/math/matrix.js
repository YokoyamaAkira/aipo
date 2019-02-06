if(!dojo._hasResource["dojox.math.matrix"]){dojo._hasResource["dojox.math.matrix"]=true;
dojo.provide("dojox.math.matrix");
dojo.mixin(dojox.math.matrix,{iDF:0,ALMOST_ZERO:1e-10,multiply:function(E,D){var F=E.length,G=E[0].length,A=D.length,C=D[0].length;
if(G!=A){console.warn("Can't multiply matricies of sizes "+G+","+F+" and "+C+","+A);
return[[0]]
}var B=[];
for(var I=0;
I<F;
I++){B[I]=[];
for(var J=0;
J<C;
J++){B[I][J]=0;
for(var H=0;
H<G;
H++){B[I][J]+=E[I][H]*D[H][J]
}}}return B
},product:function(){if(arguments.length==0){console.warn("can't multiply 0 matrices!");
return 1
}var B=arguments[0];
for(var A=1;
A<arguments.length;
A++){B=this.multiply(B,arguments[A])
}return B
},sum:function(){if(arguments.length==0){console.warn("can't sum 0 matrices!");
return 0
}var F=this.copy(arguments[0]);
var B=F.length;
if(B==0){console.warn("can't deal with matrices of 0 rows!");
return 0
}var C=F[0].length;
if(C==0){console.warn("can't deal with matrices of 0 cols!");
return 0
}for(var G=1;
G<arguments.length;
++G){var E=arguments[G];
if(E.length!=B||E[0].length!=C){console.warn("can't add matrices of different dimensions: first dimensions were "+B+"x"+C+", current dimensions are "+E.length+"x"+E[0].length);
return 0
}for(var A=0;
A<B;
A++){for(var D=0;
D<C;
D++){F[A][D]+=E[A][D]
}}}return F
},inverse:function(G){if(G.length==1&&G[0].length==1){return[[1/G[0][0]]]
}var F=G.length,E=this.create(F,F),C=this.adjoint(G),B=this.determinant(G),D=0;
if(B==0){console.warn("Determinant Equals 0, Not Invertible.");
return[[0]]
}else{D=1/B
}for(var A=0;
A<F;
A++){for(var H=0;
H<F;
H++){E[A][H]=D*C[A][H]
}}return E
},determinant:function(B){if(B.length!=B[0].length){console.warn("Can't calculate the determinant of a non-squre matrix!");
return 0
}var A=B.length,D=1,F=this.upperTriangle(B);
for(var C=0;
C<A;
C++){var E=F[C][C];
if(Math.abs(E)<this.ALMOST_ZERO){return 0
}D*=E
}D*=this.iDF;
return D
},upperTriangle:function(I){I=this.copy(I);
var A=0,E=0,J=I.length,D=1;
this.iDF=1;
for(var H=0;
H<J-1;
H++){if(typeof I[H][H]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+H+"]["+H+"]="+I[H][H])
}D=1;
var C=0;
while((I[H][H]==0)&&!C){if(H+D>=J){this.iDF=0;
C=1
}else{for(var G=0;
G<J;
G++){E=I[H][G];
I[H][G]=I[H+D][G];
I[H+D][G]=E
}D++;
this.iDF*=-1
}}for(var F=H+1;
F<J;
F++){if(typeof I[F][H]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+F+"]["+H+"]="+I[F][H])
}if(typeof I[H][F]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+H+"]["+F+"]="+I[H][F])
}if(I[H][H]!=0){var A=(-1)*I[F][H]/I[H][H];
for(var B=H;
B<J;
B++){I[F][B]=A*I[H][B]+I[F][B]
}}}}return I
},create:function(B,A,E){E=E||0;
var F=[];
for(var D=0;
D<A;
D++){F[D]=[];
for(var C=0;
C<B;
C++){F[D][C]=E
}}return F
},ones:function(A,B){return this.create(A,B,1)
},zeros:function(A,B){return this.create(A,B)
},identity:function(C,D){D=D||1;
var E=[];
for(var B=0;
B<C;
B++){E[B]=[];
for(var A=0;
A<C;
A++){E[B][A]=(B==A?D:0)
}}return E
},adjoint:function(E){var J=E.length;
if(J<=1){console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
return[[0]]
}if(E.length!=E[0].length){console.warn("Can't find the adjoint of a non-square matrix");
return[[0]]
}var I=this.create(J,J),A=this.create(J-1,J-1);
var F=0,C=0,H=0,G=0,D=0;
for(var B=0;
B<J;
B++){for(var K=0;
K<J;
K++){H=0;
for(F=0;
F<J;
F++){if(F==B){continue
}G=0;
for(C=0;
C<J;
C++){if(C==K){continue
}A[H][G]=E[F][C];
G++
}H++
}D=this.determinant(A);
I[B][K]=Math.pow(-1,(B+K))*D
}}return this.transpose(I)
},transpose:function(A){var D=this.create(A.length,A[0].length);
for(var C=0;
C<A.length;
C++){for(var B=0;
B<A[C].length;
B++){D[B][C]=A[C][B]
}}return D
},format:function(G,H){H=H||5;
function A(L,J){var I=Math.pow(10,J);
var M=Math.round(L*I)/I;
var K=M.toString();
if(K.charAt(0)!="-"){K=" "+K
}if(K.indexOf(".")>-1){K+="."
}while(K.length<J+3){K+="0"
}return K
}var F=G.length;
var C=F>0?G[0].length:0;
var E="";
for(var B=0;
B<F;
B++){E+="| ";
for(var D=0;
D<C;
D++){E+=A(G[B][D],H)+" "
}E+="|\n"
}return E
},copy:function(C){var B=C.length,E=C[0].length,A=this.create(E,B);
for(var D=0;
D<B;
D++){for(var F=0;
F<E;
F++){A[D][F]=C[D][F]
}}return A
},scale:function(B,C){B=this.copy(B);
var A=B.length,E=B[0].length;
for(var D=0;
D<A;
D++){for(var F=0;
F<E;
F++){B[D][F]*=C
}}return B
}})
};