if(!dojo._hasResource["dojox.charting.plot3d.Cylinders"]){dojo._hasResource["dojox.charting.plot3d.Cylinders"]=true;
dojo.provide("dojox.charting.plot3d.Cylinders");
dojo.require("dojox.charting.plot3d.Base");
(function(){var A=function(B,D,F){B=typeof B=="string"?B.split(""):B;
F=F||dojo.global;
var E=B[0];
for(var C=1;
C<B.length;
E=D.call(F,E,B[C++])){}return E
};
dojo.declare("dojox.charting.plot3d.Cylinders",dojox.charting.plot3d.Base,{constructor:function(E,C,D){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"shiny",color:"lime"};
this.outline=null;
if(D){if("depth" in D){this.depth=D.depth
}if("gap" in D){this.gap=D.gap
}if("material" in D){var B=D.material;
if(typeof B=="string"||B instanceof dojo.Color){this.material.color=B
}else{this.material=B
}}if("outline" in D){this.outline=D.outline
}}},getDepth:function(){if(this.depth=="auto"){var B=this.width;
if(this.data&&this.data.length){B=B/this.data.length
}return B-2*this.gap
}return this.depth
},generate:function(D,C){if(!this.data){return this
}var E=this.width/this.data.length,G=0,F=this.height/A(this.data,Math.max);
if(!C){C=D.view
}for(var B=0;
B<this.data.length;
++B,G+=E){C.createCylinder({center:{x:G+E/2,y:0,z:0},radius:E/2-this.gap,height:this.data[B]*F}).setTransform(dojox.gfx3d.matrix.rotateXg(-90)).setFill(this.material).setStroke(this.outline)
}}})
})()
};