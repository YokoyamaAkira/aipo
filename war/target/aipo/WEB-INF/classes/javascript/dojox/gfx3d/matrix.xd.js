dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.matrix"]){A._hasResource["dojox.gfx3d.matrix"]=true;
A.provide("dojox.gfx3d.matrix");
dojox.gfx3d.matrix._degToRad=function(B){return Math.PI*B/180
};
dojox.gfx3d.matrix._radToDeg=function(B){return B/Math.PI*180
};
dojox.gfx3d.matrix.Matrix3D=function(D){if(D){if(typeof D=="number"){this.xx=this.yy=this.zz=D
}else{if(D instanceof Array){if(D.length>0){var C=dojox.gfx3d.matrix.normalize(D[0]);
for(var F=1;
F<D.length;
++F){var E=C;
var B=dojox.gfx3d.matrix.normalize(D[F]);
C=new dojox.gfx3d.matrix.Matrix3D();
C.xx=E.xx*B.xx+E.xy*B.yx+E.xz*B.zx;
C.xy=E.xx*B.xy+E.xy*B.yy+E.xz*B.zy;
C.xz=E.xx*B.xz+E.xy*B.yz+E.xz*B.zz;
C.yx=E.yx*B.xx+E.yy*B.yx+E.yz*B.zx;
C.yy=E.yx*B.xy+E.yy*B.yy+E.yz*B.zy;
C.yz=E.yx*B.xz+E.yy*B.yz+E.yz*B.zz;
C.zx=E.zx*B.xx+E.zy*B.yx+E.zz*B.zx;
C.zy=E.zx*B.xy+E.zy*B.yy+E.zz*B.zy;
C.zz=E.zx*B.xz+E.zy*B.yz+E.zz*B.zz;
C.dx=E.xx*B.dx+E.xy*B.dy+E.xz*B.dz+E.dx;
C.dy=E.yx*B.dx+E.yy*B.dy+E.yz*B.dz+E.dy;
C.dz=E.zx*B.dx+E.zy*B.dy+E.zz*B.dz+E.dz
}A.mixin(this,C)
}}else{A.mixin(this,D)
}}}};
A.extend(dojox.gfx3d.matrix.Matrix3D,{xx:1,xy:0,xz:0,yx:0,yy:1,yz:0,zx:0,zy:0,zz:1,dx:0,dy:0,dz:0});
A.mixin(dojox.gfx3d.matrix,{identity:new dojox.gfx3d.matrix.Matrix3D(),translate:function(D,C,B){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:D,dy:C,dz:B})
}return new dojox.gfx3d.matrix.Matrix3D({dx:D.x,dy:D.y,dz:D.z})
},scale:function(D,C,B){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({xx:D,yy:C,zz:B})
}if(typeof D=="number"){return new dojox.gfx3d.matrix.Matrix3D({xx:D,yy:D,zz:D})
}return new dojox.gfx3d.matrix.Matrix3D({xx:D.x,yy:D.y,zz:D.z})
},rotateX:function(D){var B=Math.cos(D);
var C=Math.sin(D);
return new dojox.gfx3d.matrix.Matrix3D({yy:B,yz:-C,zy:C,zz:B})
},rotateXg:function(B){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(B))
},rotateY:function(D){var B=Math.cos(D);
var C=Math.sin(D);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xz:C,zx:-C,zz:B})
},rotateYg:function(B){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(B))
},rotateZ:function(D){var B=Math.cos(D);
var C=Math.sin(D);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xy:-C,yx:C,yy:B})
},rotateZg:function(B){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(B))
},cameraTranslate:function(D,C,B){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:-D,dy:-C,dz:-B})
}return new dojox.gfx3d.matrix.Matrix3D({dx:-D.x,dy:-D.y,dz:-D.z})
},cameraRotateX:function(D){var B=Math.cos(-D);
var C=Math.sin(-D);
return new dojox.gfx3d.matrix.Matrix3D({yy:B,yz:-C,zy:C,zz:B})
},cameraRotateXg:function(B){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(B))
},cameraRotateY:function(D){var B=Math.cos(-D);
var C=Math.sin(-D);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xz:C,zx:-C,zz:B})
},cameraRotateYg:function(B){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(B))
},cameraRotateZ:function(D){var B=Math.cos(-D);
var C=Math.sin(-D);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xy:-C,yx:C,yy:B})
},cameraRotateZg:function(B){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(B))
},normalize:function(B){return(B instanceof dojox.gfx3d.matrix.Matrix3D)?B:new dojox.gfx3d.matrix.Matrix3D(B)
},clone:function(C){var B=new dojox.gfx3d.matrix.Matrix3D();
for(var D in C){if(typeof (C[D])=="number"&&typeof (B[D])=="number"&&B[D]!=C[D]){B[D]=C[D]
}}return B
},invert:function(E){var C=dojox.gfx3d.matrix.normalize(E);
var F=C.xx*C.yy*C.zz+C.xy*C.yz*C.zx+C.xz*C.yx*C.zy-C.xx*C.yz*C.zy-C.xy*C.yx*C.zz-C.xz*C.yy*C.zx;
var B=new dojox.gfx3d.matrix.Matrix3D({xx:(C.yy*C.zz-C.yz*C.zy)/F,xy:(C.xz*C.zy-C.xy*C.zz)/F,xz:(C.xy*C.yz-C.xz*C.yy)/F,yx:(C.yz*C.zx-C.yx*C.zz)/F,yy:(C.xx*C.zz-C.xz*C.zx)/F,yz:(C.xz*C.yx-C.xx*C.yz)/F,zx:(C.yx*C.zy-C.yy*C.zx)/F,zy:(C.xy*C.zx-C.xx*C.zy)/F,zz:(C.xx*C.yy-C.xy*C.yx)/F,dx:-1*(C.xy*C.yz*C.dz+C.xz*C.dy*C.zy+C.dx*C.yy*C.zz-C.xy*C.dy*C.zz-C.xz*C.yy*C.dz-C.dx*C.yz*C.zy)/F,dy:(C.xx*C.yz*C.dz+C.xz*C.dy*C.zx+C.dx*C.yx*C.zz-C.xx*C.dy*C.zz-C.xz*C.yx*C.dz-C.dx*C.yz*C.zx)/F,dz:-1*(C.xx*C.yy*C.dz+C.xy*C.dy*C.zx+C.dx*C.yx*C.zy-C.xx*C.dy*C.zy-C.xy*C.yx*C.dz-C.dx*C.yy*C.zx)/F});
return B
},_multiplyPoint:function(D,C,B,E){return{x:D.xx*C+D.xy*B+D.xz*E+D.dx,y:D.yx*C+D.yy*B+D.yz*E+D.dy,z:D.zx*C+D.zy*B+D.zz*E+D.dz}
},multiplyPoint:function(F,E,D,B){var C=dojox.gfx3d.matrix.normalize(F);
if(typeof E=="number"&&typeof D=="number"&&typeof B=="number"){return dojox.gfx3d.matrix._multiplyPoint(C,E,D,B)
}return dojox.gfx3d.matrix._multiplyPoint(C,E.x,E.y,E.z)
},multiply:function(E){var C=dojox.gfx3d.matrix.normalize(E);
for(var F=1;
F<arguments.length;
++F){var D=C;
var B=dojox.gfx3d.matrix.normalize(arguments[F]);
C=new dojox.gfx3d.matrix.Matrix3D();
C.xx=D.xx*B.xx+D.xy*B.yx+D.xz*B.zx;
C.xy=D.xx*B.xy+D.xy*B.yy+D.xz*B.zy;
C.xz=D.xx*B.xz+D.xy*B.yz+D.xz*B.zz;
C.yx=D.yx*B.xx+D.yy*B.yx+D.yz*B.zx;
C.yy=D.yx*B.xy+D.yy*B.yy+D.yz*B.zy;
C.yz=D.yx*B.xz+D.yy*B.yz+D.yz*B.zz;
C.zx=D.zx*B.xx+D.zy*B.yx+D.zz*B.zx;
C.zy=D.zx*B.xy+D.zy*B.yy+D.zz*B.zy;
C.zz=D.zx*B.xz+D.zy*B.yz+D.zz*B.zz;
C.dx=D.xx*B.dx+D.xy*B.dy+D.xz*B.dz+D.dx;
C.dy=D.yx*B.dx+D.yy*B.dy+D.yz*B.dz+D.dy;
C.dz=D.zx*B.dx+D.zy*B.dy+D.zz*B.dz+D.dz
}return C
},_project:function(D,C,B,E){return{x:D.xx*C+D.xy*B+D.xz*E+D.dx,y:D.yx*C+D.yy*B+D.yz*E+D.dy,z:D.zx*C+D.zy*B+D.zz*E+D.dz}
},project:function(F,E,D,B){var C=dojox.gfx3d.matrix.normalize(F);
if(typeof E=="number"&&typeof D=="number"&&typeof B=="number"){return dojox.gfx3d.matrix._project(C,E,D,B)
}return dojox.gfx3d.matrix._project(C,E.x,E.y,E.z)
}});
dojox.gfx3d.Matrix3D=dojox.gfx3d.matrix.Matrix3D
}}});