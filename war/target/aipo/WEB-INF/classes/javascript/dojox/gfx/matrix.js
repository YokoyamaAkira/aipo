if(!dojo._hasResource["dojox.gfx.matrix"]){dojo._hasResource["dojox.gfx.matrix"]=true;
dojo.provide("dojox.gfx.matrix");
(function(){var A=dojox.gfx.matrix;
A._degToRad=function(B){return Math.PI*B/180
};
A._radToDeg=function(B){return B/Math.PI*180
};
A.Matrix2D=function(B){if(B){if(typeof B=="number"){this.xx=this.yy=B
}else{if(B instanceof Array){if(B.length>0){var D=A.normalize(B[0]);
for(var E=1;
E<B.length;
++E){var C=D,F=dojox.gfx.matrix.normalize(B[E]);
D=new A.Matrix2D();
D.xx=C.xx*F.xx+C.xy*F.yx;
D.xy=C.xx*F.xy+C.xy*F.yy;
D.yx=C.yx*F.xx+C.yy*F.yx;
D.yy=C.yx*F.xy+C.yy*F.yy;
D.dx=C.xx*F.dx+C.xy*F.dy+C.dx;
D.dy=C.yx*F.dx+C.yy*F.dy+C.dy
}dojo.mixin(this,D)
}}else{dojo.mixin(this,B)
}}}};
dojo.extend(A.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
dojo.mixin(A,{identity:new A.Matrix2D(),flipX:new A.Matrix2D({xx:-1}),flipY:new A.Matrix2D({yy:-1}),flipXY:new A.Matrix2D({xx:-1,yy:-1}),translate:function(C,B){if(arguments.length>1){return new A.Matrix2D({dx:C,dy:B})
}return new A.Matrix2D({dx:C.x,dy:C.y})
},scale:function(C,B){if(arguments.length>1){return new A.Matrix2D({xx:C,yy:B})
}if(typeof C=="number"){return new A.Matrix2D({xx:C,yy:C})
}return new A.Matrix2D({xx:C.x,yy:C.y})
},rotate:function(C){var D=Math.cos(C);
var B=Math.sin(C);
return new A.Matrix2D({xx:D,xy:-B,yx:B,yy:D})
},rotateg:function(B){return A.rotate(A._degToRad(B))
},skewX:function(B){return new A.Matrix2D({xy:-Math.tan(B)})
},skewXg:function(B){return A.skewX(A._degToRad(B))
},skewY:function(B){return new A.Matrix2D({yx:Math.tan(B)})
},skewYg:function(B){return A.skewY(A._degToRad(B))
},reflect:function(D,C){if(arguments.length==1){C=D.y;
D=D.x
}var B=D*D,E=C*C,F=B+E,G=2*D*C/F;
return new A.Matrix2D({xx:2*B/F-1,xy:G,yx:G,yy:2*E/F-1})
},project:function(D,C){if(arguments.length==1){C=D.y;
D=D.x
}var B=D*D,E=C*C,F=B+E,G=D*C/F;
return new A.Matrix2D({xx:B/F,xy:G,yx:G,yy:E/F})
},normalize:function(B){return(B instanceof A.Matrix2D)?B:new A.Matrix2D(B)
},clone:function(B){var D=new A.Matrix2D();
for(var C in B){if(typeof (B[C])=="number"&&typeof (D[C])=="number"&&D[C]!=B[C]){D[C]=B[C]
}}return D
},invert:function(B){var E=A.normalize(B),C=E.xx*E.yy-E.xy*E.yx,E=new A.Matrix2D({xx:E.yy/C,xy:-E.xy/C,yx:-E.yx/C,yy:E.xx/C,dx:(E.xy*E.dy-E.yy*E.dx)/C,dy:(E.yx*E.dx-E.xx*E.dy)/C});
return E
},_multiplyPoint:function(C,B,D){return{x:C.xx*B+C.xy*D+C.dx,y:C.yx*B+C.yy*D+C.dy}
},multiplyPoint:function(D,C,B){var E=A.normalize(D);
if(typeof C=="number"&&typeof B=="number"){return A._multiplyPoint(E,C,B)
}return A._multiplyPoint(E,C.x,C.y)
},multiply:function(C){var F=A.normalize(C);
for(var D=1;
D<arguments.length;
++D){var B=F,E=A.normalize(arguments[D]);
F=new A.Matrix2D();
F.xx=B.xx*E.xx+B.xy*E.yx;
F.xy=B.xx*E.xy+B.xy*E.yy;
F.yx=B.yx*E.xx+B.yy*E.yx;
F.yy=B.yx*E.xy+B.yy*E.yy;
F.dx=B.xx*E.dx+B.xy*E.dy+B.dx;
F.dy=B.yx*E.dx+B.yy*E.dy+B.dy
}return F
},_sandwich:function(C,B,D){return A.multiply(A.translate(B,D),C,A.translate(-B,-D))
},scaleAt:function(C,B,E,D){switch(arguments.length){case 4:return A._sandwich(A.scale(C,B),E,D);
case 3:if(typeof E=="number"){return A._sandwich(A.scale(C),B,E)
}return A._sandwich(A.scale(C,B),E.x,E.y)
}return A._sandwich(A.scale(C),B.x,B.y)
},rotateAt:function(D,C,B){if(arguments.length>2){return A._sandwich(A.rotate(D),C,B)
}return A._sandwich(A.rotate(D),C.x,C.y)
},rotategAt:function(D,C,B){if(arguments.length>2){return A._sandwich(A.rotateg(D),C,B)
}return A._sandwich(A.rotateg(D),C.x,C.y)
},skewXAt:function(D,C,B){if(arguments.length>2){return A._sandwich(A.skewX(D),C,B)
}return A._sandwich(A.skewX(D),C.x,C.y)
},skewXgAt:function(D,C,B){if(arguments.length>2){return A._sandwich(A.skewXg(D),C,B)
}return A._sandwich(A.skewXg(D),C.x,C.y)
},skewYAt:function(D,C,B){if(arguments.length>2){return A._sandwich(A.skewY(D),C,B)
}return A._sandwich(A.skewY(D),C.x,C.y)
},skewYgAt:function(D,C,B){if(arguments.length>2){return A._sandwich(A.skewYg(D),C,B)
}return A._sandwich(A.skewYg(D),C.x,C.y)
}})
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D
};