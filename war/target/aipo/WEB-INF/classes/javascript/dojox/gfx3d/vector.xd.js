dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.vector"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.vector"]){A._hasResource["dojox.gfx3d.vector"]=true;
A.provide("dojox.gfx3d.vector");
A.mixin(dojox.gfx3d.vector,{sum:function(){var B={x:0,y:0,z:0};
A.forEach(arguments,function(C){B.x+=C.x;
B.y+=C.y;
B.z+=C.z
});
return B
},center:function(){var C=arguments.length;
if(C==0){return{x:0,y:0,z:0}
}var B=dojox.gfx3d.vector.sum(arguments);
return{x:B.x/C,y:B.y/C,z:B.z/C}
},substract:function(B,C){return{x:B.x-C.x,y:B.y-C.y,z:B.z-C.z}
},_crossProduct:function(C,B,G,F,E,D){return{x:B*D-G*E,y:G*F-C*D,z:C*E-B*F}
},crossProduct:function(D,C,B,G,F,E){if(arguments.length==6&&A.every(arguments,function(H){return typeof H=="number"
})){return dojox.gfx3d.vector._crossProduct(D,C,B,G,F,E)
}return dojox.gfx3d.vector._crossProduct(D.x,D.y,D.z,C.x,C.y,C.z)
},_dotProduct:function(C,B,G,F,E,D){return C*F+B*E+G*D
},dotProduct:function(D,C,B,G,F,E){if(arguments.length==6&&A.every(arguments,function(H){return typeof H=="number"
})){return dojox.gfx3d.vector._dotProduct(D,C,B,G,F,E)
}return dojox.gfx3d.vector._dotProduct(D.x,D.y,D.z,C.x,C.y,C.z)
},normalize:function(I,G,C){var H,F,E;
if(I instanceof Array){H=I[0];
F=I[1];
E=I[2]
}else{H=I;
F=G;
E=C
}var D=dojox.gfx3d.vector.substract(F,H);
var B=dojox.gfx3d.vector.substract(E,H);
return dojox.gfx3d.vector.crossProduct(D,B)
}})
}}});