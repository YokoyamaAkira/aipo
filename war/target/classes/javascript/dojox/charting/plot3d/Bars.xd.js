dojo._xdResourceLoaded({depends:[["provide","dojox.charting.plot3d.Bars"],["require","dojox.charting.plot3d.Base"]],defineResource:function(A){if(!A._hasResource["dojox.charting.plot3d.Bars"]){A._hasResource["dojox.charting.plot3d.Bars"]=true;
A.provide("dojox.charting.plot3d.Bars");
A.require("dojox.charting.plot3d.Base");
(function(){var B=function(C,E,G){C=typeof C=="string"?C.split(""):C;
G=G||A.global;
var F=C[0];
for(var D=1;
D<C.length;
F=E.call(G,F,C[D++])){}return F
};
A.declare("dojox.charting.plot3d.Bars",dojox.charting.plot3d.Base,{constructor:function(F,D,E){this.depth="auto";
this.gap=0;
this.data=[];
this.material={type:"plastic",finish:"dull",color:"lime"};
if(E){if("depth" in E){this.depth=E.depth
}if("gap" in E){this.gap=E.gap
}if("material" in E){var C=E.material;
if(typeof C=="string"||C instanceof A.Color){this.material.color=C
}else{this.material=C
}}}},getDepth:function(){if(this.depth=="auto"){var C=this.width;
if(this.data&&this.data.length){C=C/this.data.length
}return C-2*this.gap
}return this.depth
},generate:function(H,G){if(!this.data){return this
}var I=this.width/this.data.length,E=0,D=this.depth=="auto"?I-2*this.gap:this.depth,C=this.height/B(this.data,Math.max);
if(!G){G=H.view
}for(var F=0;
F<this.data.length;
++F,E+=I){G.createCube({bottom:{x:E+this.gap,y:0,z:0},top:{x:E+I-this.gap,y:this.data[F]*C,z:D}}).setFill(this.material)
}}})
})()
}}});