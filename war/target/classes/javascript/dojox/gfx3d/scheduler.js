if(!dojo._hasResource["dojox.gfx3d.scheduler"]){dojo._hasResource["dojox.gfx3d.scheduler"]=true;
dojo.provide("dojox.gfx3d.scheduler");
dojo.provide("dojox.gfx3d.drawer");
dojo.require("dojox.gfx3d.vector");
dojo.mixin(dojox.gfx3d.scheduler,{zOrder:function(B,A){A=A?A:dojox.gfx3d.scheduler.order;
B.sort(function(D,C){return A(C)-A(D)
});
return B
},bsp:function(A,B){console.debug("BSP scheduler");
B=B?B:dojox.gfx3d.scheduler.outline;
var C=new dojox.gfx3d.scheduler.BinarySearchTree(A[0],B);
dojo.forEach(A.slice(1),function(D){C.add(D,B)
});
return C.iterate(B)
},order:function(A){return A.getZOrder()
},outline:function(A){return A.getOutline()
}});
dojo.declare("dojox.gfx3d.scheduler.BinarySearchTree",null,{constructor:function(B,A){this.plus=null;
this.minus=null;
this.object=B;
var C=A(B);
this.orient=C[0];
this.normal=dojox.gfx3d.vector.normalize(C)
},add:function(D,C){var G=0.5,E=C(D),B=dojox.gfx3d.vector,F=this.normal,A=this.orient;
if(dojo.every(E,function(H){return Math.floor(G+B.dotProduct(F,B.substract(H,A)))<=0
})){if(this.minus){this.minus.add(D,C)
}else{this.minus=new dojox.gfx3d.scheduler.BinarySearchTree(D,C)
}}else{if(dojo.every(E,function(H){return Math.floor(G+B.dotProduct(F,B.substract(H,A)))>=0
})){if(this.plus){this.plus.add(D,C)
}else{this.plus=new dojox.gfx3d.scheduler.BinarySearchTree(D,C)
}}else{dojo.forEach(E,function(H){console.debug(B.dotProduct(F,B.substract(H,A)))
});
throw"The case: polygon cross siblings' plate is not implemneted yet"
}}},iterate:function(E){var F=0.5;
var C=dojox.gfx3d.vector;
var B=[];
var D=null;
var A={x:0,y:0,z:-10000};
if(Math.floor(F+C.dotProduct(this.normal,C.substract(A,this.orient)))<=0){D=[this.plus,this.minus]
}else{D=[this.minus,this.plus]
}if(D[0]){B=B.concat(D[0].iterate())
}B.push(this.object);
if(D[1]){B=B.concat(D[1].iterate())
}return B
}});
dojo.mixin(dojox.gfx3d.drawer,{conservative:function(B,C,A){console.debug("conservative draw");
dojo.forEach(this.objects,function(D){D.destroy()
});
dojo.forEach(C,function(D){D.draw(A.lighting)
})
},chart:function(B,C,A){console.debug("chart draw");
dojo.forEach(this.todos,function(D){D.draw(A.lighting)
})
}})
};