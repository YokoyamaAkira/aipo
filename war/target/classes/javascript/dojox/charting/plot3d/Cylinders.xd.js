dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot3d.Cylinders"],["require","dojox.charting.plot3d.Base"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot3d.Cylinders"]){A._hasResource["dojox.charting.plot3d.Cylinders"]=true;
A.provide("dojox.charting.plot3d.Cylinders");
A.require("dojox.charting.plot3d.Base");
(function(){var B=function(C,E,G){C=typeof C=="string"?C.split(""):C;
G=G||A.global;
var F=C[0];
for(var D=1;
D<C.length;
F=E.call(G,F,C[D++])){}return F
};
A.declare("dojox.charting.plot3d.Cylinders",dojox.charting.plot3d.Base,{constructor:function(F,D,E){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"shiny",color:"lime"};
this.outline=null;
if(E){if("depth" in E){this.depth=E.depth
}if("gap" in E){this.gap=E.gap
}if("material" in E){var C=E.material;
if(typeof C=="string"||C instanceof A.Color){this.material.color=C
}else{this.material=C
}}if("outline" in E){this.outline=E.outline
}}},getDepth:function(){if(this.depth=="auto"){var C=this.width;
if(this.data&&this.data.length){C=C/this.data.length
}return C-2*this.gap
}return this.depth
},generate:function(E,D){if(!this.data){return this
}var F=this.width/this.data.length,H=0,G=this.height/B(this.data,Math.max);
if(!D){D=E.view
}for(var C=0;
C<this.data.length;
++C,H+=F){D.createCylinder({center:{x:H+F/2,y:0,z:0},radius:F/2-this.gap,height:this.data[C]*G}).setTransform(dojox.gfx3d.matrix.rotateXg(-90)).setFill(this.material).setStroke(this.outline)
}}})
})()
}}});