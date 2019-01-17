if(!dojo._hasResource["dojox.gfx3d.vector"]){dojo._hasResource["dojox.gfx3d.vector"]=true;
dojo.provide("dojox.gfx3d.vector");
dojo.mixin(dojox.gfx3d.vector,{sum:function(){var A={x:0,y:0,z:0};
dojo.forEach(arguments,function(B){A.x+=B.x;
A.y+=B.y;
A.z+=B.z
});
return A
},center:function(){var A=arguments.length;
if(A==0){return{x:0,y:0,z:0}
}var B=dojox.gfx3d.vector.sum(arguments);
return{x:B.x/A,y:B.y/A,z:B.z/A}
},substract:function(B,A){return{x:B.x-A.x,y:B.y-A.y,z:B.z-A.z}
},_crossProduct:function(A,F,E,D,C,B){return{x:F*B-E*C,y:E*D-A*B,z:A*C-F*D}
},crossProduct:function(B,A,F,E,D,C){if(arguments.length==6&&dojo.every(arguments,function(G){return typeof G=="number"
})){return dojox.gfx3d.vector._crossProduct(B,A,F,E,D,C)
}return dojox.gfx3d.vector._crossProduct(B.x,B.y,B.z,A.x,A.y,A.z)
},_dotProduct:function(A,F,E,D,C,B){return A*D+F*C+E*B
},dotProduct:function(B,A,F,E,D,C){if(arguments.length==6&&dojo.every(arguments,function(G){return typeof G=="number"
})){return dojox.gfx3d.vector._dotProduct(B,A,F,E,D,C)
}return dojox.gfx3d.vector._dotProduct(B.x,B.y,B.z,A.x,A.y,A.z)
},normalize:function(D,B,H){var C,A,G;
if(D instanceof Array){C=D[0];
A=D[1];
G=D[2]
}else{C=D;
A=B;
G=H
}var F=dojox.gfx3d.vector.substract(A,C);
var E=dojox.gfx3d.vector.substract(G,C);
return dojox.gfx3d.vector.crossProduct(F,E)
}})
};