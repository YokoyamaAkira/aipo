if(!dojo._hasResource["dojox.charting.plot3d.Bars"]){dojo._hasResource["dojox.charting.plot3d.Bars"]=true;
dojo.provide("dojox.charting.plot3d.Bars");
dojo.require("dojox.charting.plot3d.Base");
(function(){var A=function(B,D,F){B=typeof B=="string"?B.split(""):B;
F=F||dojo.global;
var E=B[0];
for(var C=1;
C<B.length;
E=D.call(F,E,B[C++])){}return E
};
dojo.declare("dojox.charting.plot3d.Bars",dojox.charting.plot3d.Base,{constructor:function(E,C,D){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"dull",color:"lime"};
if(D){if("depth" in D){this.depth=D.depth
}if("gap" in D){this.gap=D.gap
}if("material" in D){var B=D.material;
if(typeof B=="string"||B instanceof dojo.Color){this.material.color=B
}else{this.material=B
}}}},getDepth:function(){if(this.depth=="auto"){var B=this.width;
if(this.data&&this.data.length){B=B/this.data.length
}return B-2*this.gap
}return this.depth
},generate:function(D,C){if(!this.data){return this
}var E=this.width/this.data.length,H=0,G=this.depth=="auto"?E-2*this.gap:this.depth,F=this.height/A(this.data,Math.max);
if(!C){C=D.view
}for(var B=0;
B<this.data.length;
++B,H+=E){C.createCube({bottom:{x:H+this.gap,y:0,z:0},top:{x:H+E-this.gap,y:this.data[B]*F,z:G}}).setFill(this.material)
}}})
})()
};