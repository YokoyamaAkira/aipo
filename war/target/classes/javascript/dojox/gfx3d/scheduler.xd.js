dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.scheduler"],["provide","dojox.gfx3d.drawer"],["require","dojox.gfx3d.vector"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.scheduler"]){A._hasResource["dojox.gfx3d.scheduler"]=true;
A.provide("dojox.gfx3d.scheduler");
A.provide("dojox.gfx3d.drawer");
A.require("dojox.gfx3d.vector");
A.mixin(dojox.gfx3d.scheduler,{zOrder:function(B,C){C=C?C:dojox.gfx3d.scheduler.order;
B.sort(function(E,D){return C(D)-C(E)
});
return B
},bsp:function(C,D){console.debug("BSP scheduler");
D=D?D:dojox.gfx3d.scheduler.outline;
var B=new dojox.gfx3d.scheduler.BinarySearchTree(C[0],D);
A.forEach(C.slice(1),function(E){B.add(E,D)
});
return B.iterate(D)
},order:function(B){return B.getZOrder()
},outline:function(B){return B.getOutline()
}});
A.declare("dojox.gfx3d.scheduler.BinarySearchTree",null,{constructor:function(D,C){this.plus=null;
this.minus=null;
this.object=D;
var B=C(D);
this.orient=B[0];
this.normal=dojox.gfx3d.vector.normalize(B)
},add:function(D,C){var B=0.5,E=C(D),H=dojox.gfx3d.vector,F=this.normal,G=this.orient;
if(A.every(E,function(I){return Math.floor(B+H.dotProduct(F,H.substract(I,G)))<=0
})){if(this.minus){this.minus.add(D,C)
}else{this.minus=new dojox.gfx3d.scheduler.BinarySearchTree(D,C)
}}else{if(A.every(E,function(I){return Math.floor(B+H.dotProduct(F,H.substract(I,G)))>=0
})){if(this.plus){this.plus.add(D,C)
}else{this.plus=new dojox.gfx3d.scheduler.BinarySearchTree(D,C)
}}else{A.forEach(E,function(I){console.debug(H.dotProduct(F,H.substract(I,G)))
});
throw"The case: polygon cross siblings' plate is not implemneted yet"
}}},iterate:function(G){var C=0.5;
var E=dojox.gfx3d.vector;
var D=[];
var F=null;
var B={x:0,y:0,z:-10000};
if(Math.floor(C+E.dotProduct(this.normal,E.substract(B,this.orient)))<=0){F=[this.plus,this.minus]
}else{F=[this.minus,this.plus]
}if(F[0]){D=D.concat(F[0].iterate())
}D.push(this.object);
if(F[1]){D=D.concat(F[1].iterate())
}return D
}});
A.mixin(dojox.gfx3d.drawer,{conservative:function(D,B,C){console.debug("conservative draw");
A.forEach(this.objects,function(E){E.destroy()
});
A.forEach(B,function(E){E.draw(C.lighting)
})
},chart:function(D,B,C){console.debug("chart draw");
A.forEach(this.todos,function(E){E.draw(C.lighting)
})
}})
}}});