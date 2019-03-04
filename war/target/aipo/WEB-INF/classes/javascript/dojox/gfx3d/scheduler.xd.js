dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.scheduler"],["provide","dojox.gfx3d.drawer"],["require","dojox.gfx3d.vector"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.scheduler"]){A._hasResource["dojox.gfx3d.scheduler"]=true;
A.provide("dojox.gfx3d.scheduler");
A.provide("dojox.gfx3d.drawer");
A.require("dojox.gfx3d.vector");
A.mixin(dojox.gfx3d.scheduler,{zOrder:function(C,B){B=B?B:dojox.gfx3d.scheduler.order;
C.sort(function(E,D){return B(D)-B(E)
});
return C
},bsp:function(B,C){console.debug("BSP scheduler");
C=C?C:dojox.gfx3d.scheduler.outline;
var D=new dojox.gfx3d.scheduler.BinarySearchTree(B[0],C);
A.forEach(B.slice(1),function(E){D.add(E,C)
});
return D.iterate(C)
},order:function(B){return B.getZOrder()
},outline:function(B){return B.getOutline()
}});
A.declare("dojox.gfx3d.scheduler.BinarySearchTree",null,{constructor:function(C,B){this.plus=null;
this.minus=null;
this.object=C;
var D=B(C);
this.orient=D[0];
this.normal=dojox.gfx3d.vector.normalize(D)
},add:function(E,D){var H=0.5,F=D(E),C=dojox.gfx3d.vector,G=this.normal,B=this.orient;
if(A.every(F,function(I){return Math.floor(H+C.dotProduct(G,C.substract(I,B)))<=0
})){if(this.minus){this.minus.add(E,D)
}else{this.minus=new dojox.gfx3d.scheduler.BinarySearchTree(E,D)
}}else{if(A.every(F,function(I){return Math.floor(H+C.dotProduct(G,C.substract(I,B)))>=0
})){if(this.plus){this.plus.add(E,D)
}else{this.plus=new dojox.gfx3d.scheduler.BinarySearchTree(E,D)
}}else{A.forEach(F,function(I){console.debug(C.dotProduct(G,C.substract(I,B)))
});
throw"The case: polygon cross siblings' plate is not implemneted yet"
}}},iterate:function(F){var G=0.5;
var D=dojox.gfx3d.vector;
var C=[];
var E=null;
var B={x:0,y:0,z:-10000};
if(Math.floor(G+D.dotProduct(this.normal,D.substract(B,this.orient)))<=0){E=[this.plus,this.minus]
}else{E=[this.minus,this.plus]
}if(E[0]){C=C.concat(E[0].iterate())
}C.push(this.object);
if(E[1]){C=C.concat(E[1].iterate())
}return C
}});
A.mixin(dojox.gfx3d.drawer,{conservative:function(C,D,B){console.debug("conservative draw");
A.forEach(this.objects,function(E){E.destroy()
});
A.forEach(D,function(E){E.draw(B.lighting)
})
},chart:function(C,D,B){console.debug("chart draw");
A.forEach(this.todos,function(E){E.draw(B.lighting)
})
}})
}}});