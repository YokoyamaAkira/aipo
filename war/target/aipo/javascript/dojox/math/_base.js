if(!dojo._hasResource["dojox.math._base"]){dojo._hasResource["dojox.math._base"]=true;
dojo.provide("dojox.math._base");
dojo.mixin(dojox.math,{degreesToRadians:function(A){return(A*Math.PI)/180
},radiansToDegrees:function(A){return(A*180)/Math.PI
},factoral:function(C){if(C<1){return 0
}var A=1;
for(var B=1;
B<=C;
B++){A*=B
}return A
},permutations:function(B,A){if(B==0||A==0){return 1
}return(this.factoral(B)/this.factoral(B-A))
},combinations:function(B,A){if(B==0||A==0){return 1
}return(this.factoral(B)/(this.factoral(B-A)*this.factoral(A)))
},bernstein:function(B,C,A){return(this.combinations(C,A)*Math.pow(B,A)*Math.pow(1-B,C-A))
},gaussian:function(){var A=2;
do{var C=2*Math.random()-1;
var B=2*Math.random()-1;
A=C*C+B*B
}while(A>=1);
return(C*Math.sqrt((-2*Math.log(A))/A))
},sd:function(A){return Math.sqrt(this.variance(A))
},variance:function(B){var A=0,C=0;
dojo.forEach(B,function(D){A+=D;
C+=Math.pow(D,2)
});
return(C/B.length)-Math.pow(A/B.length,2)
},range:function(B,A,F){if(arguments.length<2){A=B,B=0
}var E=F||1;
var C=[];
if(E>0){for(var D=B;
D<A;
D+=E){C.push(D)
}}else{if(E<0){for(var D=B;
D>A;
D+=E){C.push(D)
}}else{throw new Error("dojox.math.range: step must not be zero.")
}}return C
},distance:function(B,A){return Math.sqrt(Math.pow(A[0]-B[0],2)+Math.pow(A[1]-B[1],2))
},midpoint:function(C,B){if(C.length!=B.length){console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.",C,B)
}var A=[];
for(var D=0;
D<C.length;
D++){A[D]=(C[D]+B[D])/2
}return A
}})
};