if(!dojo._hasResource["dojox.gfx3d.scheduler"]){dojo._hasResource["dojox.gfx3d.scheduler"]=true;
dojo.provide("dojox.gfx3d.scheduler");
dojo.provide("dojox.gfx3d.drawer");
dojo.require("dojox.gfx3d.vector");
dojo.mixin(dojox.gfx3d.scheduler,{zOrder:function(A,B){B=B?B:dojox.gfx3d.scheduler.order;
A.sort(function(C,D){return B(D)-B(C)
});
return A
},bsp:function(C,A){console.debug("BSP scheduler");
A=A?A:dojox.gfx3d.scheduler.outline;
var B=new dojox.gfx3d.scheduler.BinarySearchTree(C[0],A);
dojo.forEach(C.slice(1),function(D){B.add(D,A)
});
return B.iterate(A)
},order:function(A){return A.getZOrder()
},outline:function(A){return A.getOutline()
}});
dojo.declare("dojox.gfx3d.scheduler.BinarySearchTree",null,{constructor:function(A,C){this.plus=null;
this.minus=null;
this.object=A;
var B=C(A);
this.orient=B[0];
this.normal=dojox.gfx3d.vector.normalize(B)
},add:function(A,G){var D=0.5,B=G(A),F=dojox.gfx3d.vector,C=this.normal,E=this.orient;
if(dojo.every(B,function(H){return Math.floor(D+F.dotProduct(C,F.substract(H,E)))<=0
})){if(this.minus){this.minus.add(A,G)
}else{this.minus=new dojox.gfx3d.scheduler.BinarySearchTree(A,G)
}}else{if(dojo.every(B,function(H){return Math.floor(D+F.dotProduct(C,F.substract(H,E)))>=0
})){if(this.plus){this.plus.add(A,G)
}else{this.plus=new dojox.gfx3d.scheduler.BinarySearchTree(A,G)
}}else{dojo.forEach(B,function(H){console.debug(F.dotProduct(C,F.substract(H,E)))
});
throw"The case: polygon cross siblings' plate is not implemneted yet"
}}},iterate:function(D){var E=0.5;
var B=dojox.gfx3d.vector;
var A=[];
var C=null;
var F={x:0,y:0,z:-10000};
if(Math.floor(E+B.dotProduct(this.normal,B.substract(F,this.orient)))<=0){C=[this.plus,this.minus]
}else{C=[this.minus,this.plus]
}if(C[0]){A=A.concat(C[0].iterate())
}A.push(this.object);
if(C[1]){A=A.concat(C[1].iterate())
}return A
}});
dojo.mixin(dojox.gfx3d.drawer,{conservative:function(A,B,C){console.debug("conservative draw");
dojo.forEach(this.objects,function(D){D.destroy()
});
dojo.forEach(B,function(D){D.draw(C.lighting)
})
},chart:function(A,B,C){console.debug("chart draw");
dojo.forEach(this.todos,function(D){D.draw(C.lighting)
})
}})
};