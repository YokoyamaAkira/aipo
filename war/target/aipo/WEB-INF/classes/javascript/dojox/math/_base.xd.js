dojo._xdResourceLoaded({depends:[["provide","dojox.math._base"]],defineResource:function(A){if(!A._hasResource["dojox.math._base"]){A._hasResource["dojox.math._base"]=true;
A.provide("dojox.math._base");
A.mixin(dojox.math,{degreesToRadians:function(B){return(B*Math.PI)/180
},radiansToDegrees:function(B){return(B*180)/Math.PI
},factoral:function(B){if(B<1){return 0
}var C=1;
for(var D=1;
D<=B;
D++){C*=D
}return C
},permutations:function(B,C){if(B==0||C==0){return 1
}return(this.factoral(B)/this.factoral(B-C))
},combinations:function(B,C){if(B==0||C==0){return 1
}return(this.factoral(B)/(this.factoral(B-C)*this.factoral(C)))
},bernstein:function(D,B,C){return(this.combinations(B,C)*Math.pow(D,C)*Math.pow(1-D,B-C))
},gaussian:function(){var C=2;
do{var B=2*Math.random()-1;
var D=2*Math.random()-1;
C=B*B+D*D
}while(C>=1);
return(B*Math.sqrt((-2*Math.log(C))/C))
},sd:function(B){return Math.sqrt(this.variance(B))
},variance:function(D){var C=0,B=0;
A.forEach(D,function(E){C+=E;
B+=Math.pow(E,2)
});
return(B/D.length)-Math.pow(C/D.length,2)
},range:function(D,C,B){if(arguments.length<2){C=D,D=0
}var G=B||1;
var E=[];
if(G>0){for(var F=D;
F<C;
F+=G){E.push(F)
}}else{if(G<0){for(var F=D;
F>C;
F+=G){E.push(F)
}}else{throw new Error("dojox.math.range: step must not be zero.")
}}return E
},distance:function(B,C){return Math.sqrt(Math.pow(C[0]-B[0],2)+Math.pow(C[1]-B[1],2))
},midpoint:function(E,D){if(E.length!=D.length){console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.",E,D)
}var C=[];
for(var B=0;
B<E.length;
B++){C[B]=(E[B]+D[B])/2
}return C
}})
}}});