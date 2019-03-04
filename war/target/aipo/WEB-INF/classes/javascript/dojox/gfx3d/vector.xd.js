dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.vector"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.vector"]){A._hasResource["dojox.gfx3d.vector"]=true;
A.provide("dojox.gfx3d.vector");
A.mixin(dojox.gfx3d.vector,{sum:function(){var B={x:0,y:0,z:0};
A.forEach(arguments,function(C){B.x+=C.x;
B.y+=C.y;
B.z+=C.z
});
return B
},center:function(){var B=arguments.length;
if(B==0){return{x:0,y:0,z:0}
}var C=dojox.gfx3d.vector.sum(arguments);
return{x:C.x/B,y:C.y/B,z:C.z/B}
},substract:function(C,B){return{x:C.x-B.x,y:C.y-B.y,z:C.z-B.z}
},_crossProduct:function(B,G,F,E,D,C){return{x:G*C-F*D,y:F*E-B*C,z:B*D-G*E}
},crossProduct:function(C,B,G,F,E,D){if(arguments.length==6&&A.every(arguments,function(H){return typeof H=="number"
})){return dojox.gfx3d.vector._crossProduct(C,B,G,F,E,D)
}return dojox.gfx3d.vector._crossProduct(C.x,C.y,C.z,B.x,B.y,B.z)
},_dotProduct:function(B,G,F,E,D,C){return B*E+G*D+F*C
},dotProduct:function(C,B,G,F,E,D){if(arguments.length==6&&A.every(arguments,function(H){return typeof H=="number"
})){return dojox.gfx3d.vector._dotProduct(C,B,G,F,E,D)
}return dojox.gfx3d.vector._dotProduct(C.x,C.y,C.z,B.x,B.y,B.z)
},normalize:function(E,C,I){var D,B,H;
if(E instanceof Array){D=E[0];
B=E[1];
H=E[2]
}else{D=E;
B=C;
H=I
}var G=dojox.gfx3d.vector.substract(B,D);
var F=dojox.gfx3d.vector.substract(H,D);
return dojox.gfx3d.vector.crossProduct(G,F)
}})
}}});