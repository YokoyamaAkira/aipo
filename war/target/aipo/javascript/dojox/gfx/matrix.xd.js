dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.matrix"]){A._hasResource["dojox.gfx.matrix"]=true;
A.provide("dojox.gfx.matrix");
(function(){var B=dojox.gfx.matrix;
B._degToRad=function(C){return Math.PI*C/180
};
B._radToDeg=function(C){return C/Math.PI*180
};
B.Matrix2D=function(C){if(C){if(typeof C=="number"){this.xx=this.yy=C
}else{if(C instanceof Array){if(C.length>0){var E=B.normalize(C[0]);
for(var F=1;
F<C.length;
++F){var D=E,G=dojox.gfx.matrix.normalize(C[F]);
E=new B.Matrix2D();
E.xx=D.xx*G.xx+D.xy*G.yx;
E.xy=D.xx*G.xy+D.xy*G.yy;
E.yx=D.yx*G.xx+D.yy*G.yx;
E.yy=D.yx*G.xy+D.yy*G.yy;
E.dx=D.xx*G.dx+D.xy*G.dy+D.dx;
E.dy=D.yx*G.dx+D.yy*G.dy+D.dy
}A.mixin(this,E)
}}else{A.mixin(this,C)
}}}};
A.extend(B.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
A.mixin(B,{identity:new B.Matrix2D(),flipX:new B.Matrix2D({xx:-1}),flipY:new B.Matrix2D({yy:-1}),flipXY:new B.Matrix2D({xx:-1,yy:-1}),translate:function(D,C){if(arguments.length>1){return new B.Matrix2D({dx:D,dy:C})
}return new B.Matrix2D({dx:D.x,dy:D.y})
},scale:function(D,C){if(arguments.length>1){return new B.Matrix2D({xx:D,yy:C})
}if(typeof D=="number"){return new B.Matrix2D({xx:D,yy:D})
}return new B.Matrix2D({xx:D.x,yy:D.y})
},rotate:function(D){var E=Math.cos(D);
var C=Math.sin(D);
return new B.Matrix2D({xx:E,xy:-C,yx:C,yy:E})
},rotateg:function(C){return B.rotate(B._degToRad(C))
},skewX:function(C){return new B.Matrix2D({xy:-Math.tan(C)})
},skewXg:function(C){return B.skewX(B._degToRad(C))
},skewY:function(C){return new B.Matrix2D({yx:Math.tan(C)})
},skewYg:function(C){return B.skewY(B._degToRad(C))
},reflect:function(E,D){if(arguments.length==1){D=E.y;
E=E.x
}var C=E*E,F=D*D,G=C+F,H=2*E*D/G;
return new B.Matrix2D({xx:2*C/G-1,xy:H,yx:H,yy:2*F/G-1})
},project:function(E,D){if(arguments.length==1){D=E.y;
E=E.x
}var C=E*E,F=D*D,G=C+F,H=E*D/G;
return new B.Matrix2D({xx:C/G,xy:H,yx:H,yy:F/G})
},normalize:function(C){return(C instanceof B.Matrix2D)?C:new B.Matrix2D(C)
},clone:function(C){var E=new B.Matrix2D();
for(var D in C){if(typeof (C[D])=="number"&&typeof (E[D])=="number"&&E[D]!=C[D]){E[D]=C[D]
}}return E
},invert:function(C){var F=B.normalize(C),E=F.xx*F.yy-F.xy*F.yx,F=new B.Matrix2D({xx:F.yy/E,xy:-F.xy/E,yx:-F.yx/E,yy:F.xx/E,dx:(F.xy*F.dy-F.yy*F.dx)/E,dy:(F.yx*F.dx-F.xx*F.dy)/E});
return F
},_multiplyPoint:function(D,C,E){return{x:D.xx*C+D.xy*E+D.dx,y:D.yx*C+D.yy*E+D.dy}
},multiplyPoint:function(E,D,C){var F=B.normalize(E);
if(typeof D=="number"&&typeof C=="number"){return B._multiplyPoint(F,D,C)
}return B._multiplyPoint(F,D.x,D.y)
},multiply:function(D){var G=B.normalize(D);
for(var E=1;
E<arguments.length;
++E){var C=G,F=B.normalize(arguments[E]);
G=new B.Matrix2D();
G.xx=C.xx*F.xx+C.xy*F.yx;
G.xy=C.xx*F.xy+C.xy*F.yy;
G.yx=C.yx*F.xx+C.yy*F.yx;
G.yy=C.yx*F.xy+C.yy*F.yy;
G.dx=C.xx*F.dx+C.xy*F.dy+C.dx;
G.dy=C.yx*F.dx+C.yy*F.dy+C.dy
}return G
},_sandwich:function(D,C,E){return B.multiply(B.translate(C,E),D,B.translate(-C,-E))
},scaleAt:function(D,C,F,E){switch(arguments.length){case 4:return B._sandwich(B.scale(D,C),F,E);
case 3:if(typeof F=="number"){return B._sandwich(B.scale(D),C,F)
}return B._sandwich(B.scale(D,C),F.x,F.y)
}return B._sandwich(B.scale(D),C.x,C.y)
},rotateAt:function(E,D,C){if(arguments.length>2){return B._sandwich(B.rotate(E),D,C)
}return B._sandwich(B.rotate(E),D.x,D.y)
},rotategAt:function(E,D,C){if(arguments.length>2){return B._sandwich(B.rotateg(E),D,C)
}return B._sandwich(B.rotateg(E),D.x,D.y)
},skewXAt:function(E,D,C){if(arguments.length>2){return B._sandwich(B.skewX(E),D,C)
}return B._sandwich(B.skewX(E),D.x,D.y)
},skewXgAt:function(E,D,C){if(arguments.length>2){return B._sandwich(B.skewXg(E),D,C)
}return B._sandwich(B.skewXg(E),D.x,D.y)
},skewYAt:function(E,D,C){if(arguments.length>2){return B._sandwich(B.skewY(E),D,C)
}return B._sandwich(B.skewY(E),D.x,D.y)
},skewYgAt:function(E,D,C){if(arguments.length>2){return B._sandwich(B.skewYg(E),D,C)
}return B._sandwich(B.skewYg(E),D.x,D.y)
}})
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D
}}});