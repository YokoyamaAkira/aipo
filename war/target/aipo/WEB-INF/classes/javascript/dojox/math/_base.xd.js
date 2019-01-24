dojo._xdResourceLoaded({depends:[["provide","dojox.math._base"]],defineResource:function(A){if(!A._hasResource["dojox.math._base"]){A._hasResource["dojox.math._base"]=true;
A.provide("dojox.math._base");
A.mixin(dojox.math,{degreesToRadians:function(B){return(B*Math.PI)/180
},radiansToDegrees:function(B){return(B*180)/Math.PI
},factoral:function(D){if(D<1){return 0
}var B=1;
for(var C=1;
C<=D;
C++){B*=C
}return B
},permutations:function(C,B){if(C==0||B==0){return 1
}return(this.factoral(C)/this.factoral(C-B))
},combinations:function(C,B){if(C==0||B==0){return 1
}return(this.factoral(C)/(this.factoral(C-B)*this.factoral(B)))
},bernstein:function(C,D,B){return(this.combinations(D,B)*Math.pow(C,B)*Math.pow(1-C,D-B))
},gaussian:function(){var B=2;
do{var D=2*Math.random()-1;
var C=2*Math.random()-1;
B=D*D+C*C
}while(B>=1);
return(D*Math.sqrt((-2*Math.log(B))/B))
},sd:function(B){return Math.sqrt(this.variance(B))
},variance:function(C){var B=0,D=0;
A.forEach(C,function(E){B+=E;
D+=Math.pow(E,2)
});
return(D/C.length)-Math.pow(B/C.length,2)
},range:function(C,B,G){if(arguments.length<2){B=C,C=0
}var F=G||1;
var D=[];
if(F>0){for(var E=C;
E<B;
E+=F){D.push(E)
}}else{if(F<0){for(var E=C;
E>B;
E+=F){D.push(E)
}}else{throw new Error("dojox.math.range: step must not be zero.")
}}return D
},distance:function(C,B){return Math.sqrt(Math.pow(B[0]-C[0],2)+Math.pow(B[1]-C[1],2))
},midpoint:function(D,C){if(D.length!=C.length){console.error("dojox.math.midpoint: Points A and B are not the same dimensionally.",D,C)
}var B=[];
for(var E=0;
E<D.length;
E++){B[E]=(D[E]+C[E])/2
}return B
}})
}}});