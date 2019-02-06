if(!dojo._hasResource["dojox.charting.plot3d.Bars"]){dojo._hasResource["dojox.charting.plot3d.Bars"]=true;
dojo.provide("dojox.charting.plot3d.Bars");
dojo.require("dojox.charting.plot3d.Base");
(function(){var A=function(C,E,B){C=typeof C=="string"?C.split(""):C;
B=B||dojo.global;
var F=C[0];
for(var D=1;
D<C.length;
F=E.call(B,F,C[D++])){}return F
};
dojo.declare("dojox.charting.plot3d.Bars",dojox.charting.plot3d.Base,{constructor:function(B,D,E){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"dull",color:"lime"};
if(E){if("depth" in E){this.depth=E.depth
}if("gap" in E){this.gap=E.gap
}if("material" in E){var C=E.material;
if(typeof C=="string"||C instanceof dojo.Color){this.material.color=C
}else{this.material=C
}}}},getDepth:function(){if(this.depth=="auto"){var B=this.width;
if(this.data&&this.data.length){B=B/this.data.length
}return B-2*this.gap
}return this.depth
},generate:function(C,H){if(!this.data){return this
}var D=this.width/this.data.length,B=0,F=this.depth=="auto"?D-2*this.gap:this.depth,E=this.height/A(this.data,Math.max);
if(!H){H=C.view
}for(var G=0;
G<this.data.length;
++G,B+=D){H.createCube({bottom:{x:B+this.gap,y:0,z:0},top:{x:B+D-this.gap,y:this.data[G]*E,z:F}}).setFill(this.material)
}}})
})()
};