if(!dojo._hasResource["dojox.gfx3d.vector"]){dojo._hasResource["dojox.gfx3d.vector"]=true;
dojo.provide("dojox.gfx3d.vector");
dojo.mixin(dojox.gfx3d.vector,{sum:function(){var A={x:0,y:0,z:0};
dojo.forEach(arguments,function(B){A.x+=B.x;
A.y+=B.y;
A.z+=B.z
});
return A
},center:function(){var B=arguments.length;
if(B==0){return{x:0,y:0,z:0}
}var A=dojox.gfx3d.vector.sum(arguments);
return{x:A.x/B,y:A.y/B,z:A.z/B}
},substract:function(A,B){return{x:A.x-B.x,y:A.y-B.y,z:A.z-B.z}
},_crossProduct:function(F,E,D,C,B,A){return{x:E*A-D*B,y:D*C-F*A,z:F*B-E*C}
},crossProduct:function(A,F,E,D,C,B){if(arguments.length==6&&dojo.every(arguments,function(G){return typeof G=="number"
})){return dojox.gfx3d.vector._crossProduct(A,F,E,D,C,B)
}return dojox.gfx3d.vector._crossProduct(A.x,A.y,A.z,F.x,F.y,F.z)
},_dotProduct:function(F,E,D,C,B,A){return F*C+E*B+D*A
},dotProduct:function(A,F,E,D,C,B){if(arguments.length==6&&dojo.every(arguments,function(G){return typeof G=="number"
})){return dojox.gfx3d.vector._dotProduct(A,F,E,D,C,B)
}return dojox.gfx3d.vector._dotProduct(A.x,A.y,A.z,F.x,F.y,F.z)
},normalize:function(G,E,C){var F,D,B;
if(G instanceof Array){F=G[0];
D=G[1];
B=G[2]
}else{F=G;
D=E;
B=C
}var A=dojox.gfx3d.vector.substract(D,F);
var H=dojox.gfx3d.vector.substract(B,F);
return dojox.gfx3d.vector.crossProduct(A,H)
}})
};