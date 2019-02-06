if(!dojo._hasResource["dojox.gfx.matrix"]){dojo._hasResource["dojox.gfx.matrix"]=true;
dojo.provide("dojox.gfx.matrix");
(function(){var A=dojox.gfx.matrix;
A._degToRad=function(B){return Math.PI*B/180
};
A._radToDeg=function(B){return B/Math.PI*180
};
A.Matrix2D=function(C){if(C){if(typeof C=="number"){this.xx=this.yy=C
}else{if(C instanceof Array){if(C.length>0){var E=A.normalize(C[0]);
for(var F=1;
F<C.length;
++F){var D=E,B=dojox.gfx.matrix.normalize(C[F]);
E=new A.Matrix2D();
E.xx=D.xx*B.xx+D.xy*B.yx;
E.xy=D.xx*B.xy+D.xy*B.yy;
E.yx=D.yx*B.xx+D.yy*B.yx;
E.yy=D.yx*B.xy+D.yy*B.yy;
E.dx=D.xx*B.dx+D.xy*B.dy+D.dx;
E.dy=D.yx*B.dx+D.yy*B.dy+D.dy
}dojo.mixin(this,E)
}}else{dojo.mixin(this,C)
}}}};
dojo.extend(A.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
dojo.mixin(A,{identity:new A.Matrix2D(),flipX:new A.Matrix2D({xx:-1}),flipY:new A.Matrix2D({yy:-1}),flipXY:new A.Matrix2D({xx:-1,yy:-1}),translate:function(B,C){if(arguments.length>1){return new A.Matrix2D({dx:B,dy:C})
}return new A.Matrix2D({dx:B.x,dy:B.y})
},scale:function(B,C){if(arguments.length>1){return new A.Matrix2D({xx:B,yy:C})
}if(typeof B=="number"){return new A.Matrix2D({xx:B,yy:B})
}return new A.Matrix2D({xx:B.x,yy:B.y})
},rotate:function(D){var B=Math.cos(D);
var C=Math.sin(D);
return new A.Matrix2D({xx:B,xy:-C,yx:C,yy:B})
},rotateg:function(B){return A.rotate(A._degToRad(B))
},skewX:function(B){return new A.Matrix2D({xy:-Math.tan(B)})
},skewXg:function(B){return A.skewX(A._degToRad(B))
},skewY:function(B){return new A.Matrix2D({yx:Math.tan(B)})
},skewYg:function(B){return A.skewY(A._degToRad(B))
},reflect:function(E,D){if(arguments.length==1){D=E.y;
E=E.x
}var C=E*E,F=D*D,G=C+F,B=2*E*D/G;
return new A.Matrix2D({xx:2*C/G-1,xy:B,yx:B,yy:2*F/G-1})
},project:function(E,D){if(arguments.length==1){D=E.y;
E=E.x
}var C=E*E,F=D*D,G=C+F,B=E*D/G;
return new A.Matrix2D({xx:C/G,xy:B,yx:B,yy:F/G})
},normalize:function(B){return(B instanceof A.Matrix2D)?B:new A.Matrix2D(B)
},clone:function(C){var B=new A.Matrix2D();
for(var D in C){if(typeof (C[D])=="number"&&typeof (B[D])=="number"&&B[D]!=C[D]){B[D]=C[D]
}}return B
},invert:function(C){var B=A.normalize(C),E=B.xx*B.yy-B.xy*B.yx,B=new A.Matrix2D({xx:B.yy/E,xy:-B.xy/E,yx:-B.yx/E,yy:B.xx/E,dx:(B.xy*B.dy-B.yy*B.dx)/E,dy:(B.yx*B.dx-B.xx*B.dy)/E});
return B
},_multiplyPoint:function(D,C,B){return{x:D.xx*C+D.xy*B+D.dx,y:D.yx*C+D.yy*B+D.dy}
},multiplyPoint:function(E,D,C){var B=A.normalize(E);
if(typeof D=="number"&&typeof C=="number"){return A._multiplyPoint(B,D,C)
}return A._multiplyPoint(B,D.x,D.y)
},multiply:function(D){var B=A.normalize(D);
for(var E=1;
E<arguments.length;
++E){var C=B,F=A.normalize(arguments[E]);
B=new A.Matrix2D();
B.xx=C.xx*F.xx+C.xy*F.yx;
B.xy=C.xx*F.xy+C.xy*F.yy;
B.yx=C.yx*F.xx+C.yy*F.yx;
B.yy=C.yx*F.xy+C.yy*F.yy;
B.dx=C.xx*F.dx+C.xy*F.dy+C.dx;
B.dy=C.yx*F.dx+C.yy*F.dy+C.dy
}return B
},_sandwich:function(D,C,B){return A.multiply(A.translate(C,B),D,A.translate(-C,-B))
},scaleAt:function(D,C,B,E){switch(arguments.length){case 4:return A._sandwich(A.scale(D,C),B,E);
case 3:if(typeof B=="number"){return A._sandwich(A.scale(D),C,B)
}return A._sandwich(A.scale(D,C),B.x,B.y)
}return A._sandwich(A.scale(D),C.x,C.y)
},rotateAt:function(B,D,C){if(arguments.length>2){return A._sandwich(A.rotate(B),D,C)
}return A._sandwich(A.rotate(B),D.x,D.y)
},rotategAt:function(B,D,C){if(arguments.length>2){return A._sandwich(A.rotateg(B),D,C)
}return A._sandwich(A.rotateg(B),D.x,D.y)
},skewXAt:function(B,D,C){if(arguments.length>2){return A._sandwich(A.skewX(B),D,C)
}return A._sandwich(A.skewX(B),D.x,D.y)
},skewXgAt:function(B,D,C){if(arguments.length>2){return A._sandwich(A.skewXg(B),D,C)
}return A._sandwich(A.skewXg(B),D.x,D.y)
},skewYAt:function(B,D,C){if(arguments.length>2){return A._sandwich(A.skewY(B),D,C)
}return A._sandwich(A.skewY(B),D.x,D.y)
},skewYgAt:function(B,D,C){if(arguments.length>2){return A._sandwich(A.skewYg(B),D,C)
}return A._sandwich(A.skewYg(B),D.x,D.y)
}})
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D
};