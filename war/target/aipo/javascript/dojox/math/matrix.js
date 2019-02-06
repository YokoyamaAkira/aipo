if(!dojo._hasResource["dojox.math.matrix"]){dojo._hasResource["dojox.math.matrix"]=true;
dojo.provide("dojox.math.matrix");
dojo.mixin(dojox.math.matrix,{iDF:0,ALMOST_ZERO:1e-10,multiply:function(I,H){var J=I.length,A=I[0].length,E=H.length,G=H[0].length;
if(A!=E){console.warn("Can't multiply matricies of sizes "+A+","+J+" and "+G+","+E);
return[[0]]
}var F=[];
for(var C=0;
C<J;
C++){F[C]=[];
for(var D=0;
D<G;
D++){F[C][D]=0;
for(var B=0;
B<A;
B++){F[C][D]+=I[C][B]*H[B][D]
}}}return F
},product:function(){if(arguments.length==0){console.warn("can't multiply 0 matrices!");
return 1
}var A=arguments[0];
for(var B=1;
B<arguments.length;
B++){A=this.multiply(A,arguments[B])
}return A
},sum:function(){if(arguments.length==0){console.warn("can't sum 0 matrices!");
return 0
}var B=this.copy(arguments[0]);
var E=B.length;
if(E==0){console.warn("can't deal with matrices of 0 rows!");
return 0
}var F=B[0].length;
if(F==0){console.warn("can't deal with matrices of 0 cols!");
return 0
}for(var C=1;
C<arguments.length;
++C){var A=arguments[C];
if(A.length!=E||A[0].length!=F){console.warn("can't add matrices of different dimensions: first dimensions were "+E+"x"+F+", current dimensions are "+A.length+"x"+A[0].length);
return 0
}for(var D=0;
D<E;
D++){for(var G=0;
G<F;
G++){B[D][G]+=A[D][G]
}}}return B
},inverse:function(D){if(D.length==1&&D[0].length==1){return[[1/D[0][0]]]
}var C=D.length,B=this.create(C,C),H=this.adjoint(D),G=this.determinant(D),A=0;
if(G==0){console.warn("Determinant Equals 0, Not Invertible.");
return[[0]]
}else{A=1/G
}for(var F=0;
F<C;
F++){for(var E=0;
E<C;
E++){B[F][E]=A*H[F][E]
}}return B
},determinant:function(C){if(C.length!=C[0].length){console.warn("Can't calculate the determinant of a non-squre matrix!");
return 0
}var B=C.length,E=1,A=this.upperTriangle(C);
for(var D=0;
D<B;
D++){var F=A[D][D];
if(Math.abs(F)<this.ALMOST_ZERO){return 0
}E*=F
}E*=this.iDF;
return E
},upperTriangle:function(C){C=this.copy(C);
var E=0,I=0,D=C.length,H=1;
this.iDF=1;
for(var B=0;
B<D-1;
B++){if(typeof C[B][B]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+B+"]["+B+"]="+C[B][B])
}H=1;
var G=0;
while((C[B][B]==0)&&!G){if(B+H>=D){this.iDF=0;
G=1
}else{for(var A=0;
A<D;
A++){I=C[B][A];
C[B][A]=C[B+H][A];
C[B+H][A]=I
}H++;
this.iDF*=-1
}}for(var J=B+1;
J<D;
J++){if(typeof C[J][B]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+J+"]["+B+"]="+C[J][B])
}if(typeof C[B][J]!="number"){console.warn("non-numeric entry found in a numeric matrix: m["+B+"]["+J+"]="+C[B][J])
}if(C[B][B]!=0){var E=(-1)*C[J][B]/C[B][B];
for(var F=B;
F<D;
F++){C[J][F]=E*C[B][F]+C[J][F]
}}}}return C
},create:function(C,B,F){F=F||0;
var A=[];
for(var E=0;
E<B;
E++){A[E]=[];
for(var D=0;
D<C;
D++){A[E][D]=F
}}return A
},ones:function(B,A){return this.create(B,A,1)
},zeros:function(B,A){return this.create(B,A)
},identity:function(D,E){E=E||1;
var A=[];
for(var C=0;
C<D;
C++){A[C]=[];
for(var B=0;
B<D;
B++){A[C][B]=(C==B?E:0)
}}return A
},adjoint:function(I){var C=I.length;
if(C<=1){console.warn("Can't find the adjoint of a matrix with a dimension less than 2");
return[[0]]
}if(I.length!=I[0].length){console.warn("Can't find the adjoint of a non-square matrix");
return[[0]]
}var B=this.create(C,C),E=this.create(C-1,C-1);
var J=0,G=0,A=0,K=0,H=0;
for(var F=0;
F<C;
F++){for(var D=0;
D<C;
D++){A=0;
for(J=0;
J<C;
J++){if(J==F){continue
}K=0;
for(G=0;
G<C;
G++){if(G==D){continue
}E[A][K]=I[J][G];
K++
}A++
}H=this.determinant(E);
B[F][D]=Math.pow(-1,(F+D))*H
}}return this.transpose(B)
},transpose:function(B){var A=this.create(B.length,B[0].length);
for(var D=0;
D<B.length;
D++){for(var C=0;
C<B[D].length;
C++){A[C][D]=B[D][C]
}}return A
},format:function(D,E){E=E||5;
function F(J,M){var L=Math.pow(10,M);
var K=Math.round(J*L)/L;
var I=K.toString();
if(I.charAt(0)!="-"){I=" "+I
}if(I.indexOf(".")>-1){I+="."
}while(I.length<M+3){I+="0"
}return I
}var C=D.length;
var H=C>0?D[0].length:0;
var B="";
for(var G=0;
G<C;
G++){B+="| ";
for(var A=0;
A<H;
A++){B+=F(D[G][A],E)+" "
}B+="|\n"
}return B
},copy:function(D){var C=D.length,F=D[0].length,B=this.create(F,C);
for(var E=0;
E<C;
E++){for(var A=0;
A<F;
A++){B[E][A]=D[E][A]
}}return B
},scale:function(C,D){C=this.copy(C);
var B=C.length,F=C[0].length;
for(var E=0;
E<B;
E++){for(var A=0;
A<F;
A++){C[E][A]*=D
}}return C
}})
};