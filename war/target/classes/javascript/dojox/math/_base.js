if(!dojo._hasResource["dojox.math._base"]){dojo._hasResource["dojox.math._base"]=true;
dojo.provide("dojox.math._base");
dojo.mixin(dojox.math,{degreesToRadians:function(A){return(A*Math.PI)/180
},radiansToDegrees:function(A){return(A*180)/Math.PI
},factoral:function(B){if(B<1){return 0
}var C=1;
for(var A=1;
A<=B;
A++){C*=A
}return C
},permutations:function(A,B){if(A==0||B==0){return 1
}return(this.factoral(A)/this.factoral(A-B))
},combinations:function(A,B){if(A==0||B==0){return 1
}return(this.factoral(A)/(this.factoral(A-B)*this.factoral(B)))
},bernstein:function(A,B,C){return(this.combinations(B,C)*Math.pow(A,C)*Math.pow(1-A,B-C))
},gaussian:function(){var C=2;
do{var B=2*Math.random()-1;
var A=2*Math.random()-1;
C=B*B+A*A
}while(C>=1);
return(B*Math.sqrt((-2*Math.log(C))/C))
},sd:function(A){return Math.sqrt(this.variance(A))
},variance:function(A){var C=0,B=0;
dojo.forEach(A,function(D){C+=D;
B+=Math.pow(D,2)
});
return(B/A.length)-Math.pow(C/A.length,2)
},range:function(A,F,E){if(arguments.length<2){F=A,A=0
}var D=E||1;
var B=[];
if(D>0){for(var C=A;
C<F;
C+=D){B.push(C)
}}else{if(D<0){for(var C=A;
C>F;
C+=D){B.push(C)
}}else{throw new Error("dojox.math.range: step must not be zero.")
}}return B
},distance:function(A,B){return Math.sqrt(Math.pow(B[0]-A[0],2)+Math.pow(B[1]-A[1],2))
},midpoint:function(B,A){if(B.length!=A.length){console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.",B,A)
}var D=[];
for(var C=0;
C<B.length;
C++){D[C]=(B[C]+A[C])/2
}return D
}})
};