if(!dojo._hasResource["dojox.charting.plot3d.Cylinders"]){dojo._hasResource["dojox.charting.plot3d.Cylinders"]=true;
dojo.provide("dojox.charting.plot3d.Cylinders");
dojo.require("dojox.charting.plot3d.Base");
(function(){var A=function(C,E,B){C=typeof C=="string"?C.split(""):C;
B=B||dojo.global;
var F=C[0];
for(var D=1;
D<C.length;
F=E.call(B,F,C[D++])){}return F
};
dojo.declare("dojox.charting.plot3d.Cylinders",dojox.charting.plot3d.Base,{constructor:function(B,D,E){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"shiny",color:"lime"};
this.outline=null;
if(E){if("depth" in E){this.depth=E.depth
}if("gap" in E){this.gap=E.gap
}if("material" in E){var C=E.material;
if(typeof C=="string"||C instanceof dojo.Color){this.material.color=C
}else{this.material=C
}}if("outline" in E){this.outline=E.outline
}}},getDepth:function(){if(this.depth=="auto"){var B=this.width;
if(this.data&&this.data.length){B=B/this.data.length
}return B-2*this.gap
}return this.depth
},generate:function(E,D){if(!this.data){return this
}var F=this.width/this.data.length,C=0,G=this.height/A(this.data,Math.max);
if(!D){D=E.view
}for(var B=0;
B<this.data.length;
++B,C+=F){D.createCylinder({center:{x:C+F/2,y:0,z:0},radius:F/2-this.gap,height:this.data[B]*G}).setTransform(dojox.gfx3d.matrix.rotateXg(-90)).setFill(this.material).setStroke(this.outline)
}}})
})()
};