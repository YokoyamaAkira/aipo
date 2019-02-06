if(!dojo._hasResource["dojox.gfx3d.matrix"]){dojo._hasResource["dojox.gfx3d.matrix"]=true;
dojo.provide("dojox.gfx3d.matrix");
dojox.gfx3d.matrix._degToRad=function(A){return Math.PI*A/180
};
dojox.gfx3d.matrix._radToDeg=function(A){return A/Math.PI*180
};
dojox.gfx3d.matrix.Matrix3D=function(A){if(A){if(typeof A=="number"){this.xx=this.yy=this.zz=A
}else{if(A instanceof Array){if(A.length>0){var E=dojox.gfx3d.matrix.normalize(A[0]);
for(var C=1;
C<A.length;
++C){var B=E;
var D=dojox.gfx3d.matrix.normalize(A[C]);
E=new dojox.gfx3d.matrix.Matrix3D();
E.xx=B.xx*D.xx+B.xy*D.yx+B.xz*D.zx;
E.xy=B.xx*D.xy+B.xy*D.yy+B.xz*D.zy;
E.xz=B.xx*D.xz+B.xy*D.yz+B.xz*D.zz;
E.yx=B.yx*D.xx+B.yy*D.yx+B.yz*D.zx;
E.yy=B.yx*D.xy+B.yy*D.yy+B.yz*D.zy;
E.yz=B.yx*D.xz+B.yy*D.yz+B.yz*D.zz;
E.zx=B.zx*D.xx+B.zy*D.yx+B.zz*D.zx;
E.zy=B.zx*D.xy+B.zy*D.yy+B.zz*D.zy;
E.zz=B.zx*D.xz+B.zy*D.yz+B.zz*D.zz;
E.dx=B.xx*D.dx+B.xy*D.dy+B.xz*D.dz+B.dx;
E.dy=B.yx*D.dx+B.yy*D.dy+B.yz*D.dz+B.dy;
E.dz=B.zx*D.dx+B.zy*D.dy+B.zz*D.dz+B.dz
}dojo.mixin(this,E)
}}else{dojo.mixin(this,A)
}}}};
dojo.extend(dojox.gfx3d.matrix.Matrix3D,{xx:1,xy:0,xz:0,yx:0,yy:1,yz:0,zx:0,zy:0,zz:1,dx:0,dy:0,dz:0});
dojo.mixin(dojox.gfx3d.matrix,{identity:new dojox.gfx3d.matrix.Matrix3D(),translate:function(A,C,B){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:A,dy:C,dz:B})
}return new dojox.gfx3d.matrix.Matrix3D({dx:A.x,dy:A.y,dz:A.z})
},scale:function(A,C,B){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({xx:A,yy:C,zz:B})
}if(typeof A=="number"){return new dojox.gfx3d.matrix.Matrix3D({xx:A,yy:A,zz:A})
}return new dojox.gfx3d.matrix.Matrix3D({xx:A.x,yy:A.y,zz:A.z})
},rotateX:function(A){var B=Math.cos(A);
var C=Math.sin(A);
return new dojox.gfx3d.matrix.Matrix3D({yy:B,yz:-C,zy:C,zz:B})
},rotateXg:function(A){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(A))
},rotateY:function(A){var B=Math.cos(A);
var C=Math.sin(A);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xz:C,zx:-C,zz:B})
},rotateYg:function(A){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(A))
},rotateZ:function(A){var B=Math.cos(A);
var C=Math.sin(A);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xy:-C,yx:C,yy:B})
},rotateZg:function(A){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(A))
},cameraTranslate:function(A,C,B){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:-A,dy:-C,dz:-B})
}return new dojox.gfx3d.matrix.Matrix3D({dx:-A.x,dy:-A.y,dz:-A.z})
},cameraRotateX:function(A){var B=Math.cos(-A);
var C=Math.sin(-A);
return new dojox.gfx3d.matrix.Matrix3D({yy:B,yz:-C,zy:C,zz:B})
},cameraRotateXg:function(A){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(A))
},cameraRotateY:function(A){var B=Math.cos(-A);
var C=Math.sin(-A);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xz:C,zx:-C,zz:B})
},cameraRotateYg:function(A){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(A))
},cameraRotateZ:function(A){var B=Math.cos(-A);
var C=Math.sin(-A);
return new dojox.gfx3d.matrix.Matrix3D({xx:B,xy:-C,yx:C,yy:B})
},cameraRotateZg:function(A){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(A))
},normalize:function(A){return(A instanceof dojox.gfx3d.matrix.Matrix3D)?A:new dojox.gfx3d.matrix.Matrix3D(A)
},clone:function(C){var B=new dojox.gfx3d.matrix.Matrix3D();
for(var A in C){if(typeof (C[A])=="number"&&typeof (B[A])=="number"&&B[A]!=C[A]){B[A]=C[A]
}}return B
},invert:function(A){var E=dojox.gfx3d.matrix.normalize(A);
var B=E.xx*E.yy*E.zz+E.xy*E.yz*E.zx+E.xz*E.yx*E.zy-E.xx*E.yz*E.zy-E.xy*E.yx*E.zz-E.xz*E.yy*E.zx;
var C=new dojox.gfx3d.matrix.Matrix3D({xx:(E.yy*E.zz-E.yz*E.zy)/B,xy:(E.xz*E.zy-E.xy*E.zz)/B,xz:(E.xy*E.yz-E.xz*E.yy)/B,yx:(E.yz*E.zx-E.yx*E.zz)/B,yy:(E.xx*E.zz-E.xz*E.zx)/B,yz:(E.xz*E.yx-E.xx*E.yz)/B,zx:(E.yx*E.zy-E.yy*E.zx)/B,zy:(E.xy*E.zx-E.xx*E.zy)/B,zz:(E.xx*E.yy-E.xy*E.yx)/B,dx:-1*(E.xy*E.yz*E.dz+E.xz*E.dy*E.zy+E.dx*E.yy*E.zz-E.xy*E.dy*E.zz-E.xz*E.yy*E.dz-E.dx*E.yz*E.zy)/B,dy:(E.xx*E.yz*E.dz+E.xz*E.dy*E.zx+E.dx*E.yx*E.zz-E.xx*E.dy*E.zz-E.xz*E.yx*E.dz-E.dx*E.yz*E.zx)/B,dz:-1*(E.xx*E.yy*E.dz+E.xy*E.dy*E.zx+E.dx*E.yx*E.zy-E.xx*E.dy*E.zy-E.xy*E.yx*E.dz-E.dx*E.yy*E.zx)/B});
return C
},_multiplyPoint:function(A,D,C,B){return{x:A.xx*D+A.xy*C+A.xz*B+A.dx,y:A.yx*D+A.yy*C+A.yz*B+A.dy,z:A.zx*D+A.zy*C+A.zz*B+A.dz}
},multiplyPoint:function(C,B,A,D){var E=dojox.gfx3d.matrix.normalize(C);
if(typeof B=="number"&&typeof A=="number"&&typeof D=="number"){return dojox.gfx3d.matrix._multiplyPoint(E,B,A,D)
}return dojox.gfx3d.matrix._multiplyPoint(E,B.x,B.y,B.z)
},multiply:function(B){var E=dojox.gfx3d.matrix.normalize(B);
for(var C=1;
C<arguments.length;
++C){var A=E;
var D=dojox.gfx3d.matrix.normalize(arguments[C]);
E=new dojox.gfx3d.matrix.Matrix3D();
E.xx=A.xx*D.xx+A.xy*D.yx+A.xz*D.zx;
E.xy=A.xx*D.xy+A.xy*D.yy+A.xz*D.zy;
E.xz=A.xx*D.xz+A.xy*D.yz+A.xz*D.zz;
E.yx=A.yx*D.xx+A.yy*D.yx+A.yz*D.zx;
E.yy=A.yx*D.xy+A.yy*D.yy+A.yz*D.zy;
E.yz=A.yx*D.xz+A.yy*D.yz+A.yz*D.zz;
E.zx=A.zx*D.xx+A.zy*D.yx+A.zz*D.zx;
E.zy=A.zx*D.xy+A.zy*D.yy+A.zz*D.zy;
E.zz=A.zx*D.xz+A.zy*D.yz+A.zz*D.zz;
E.dx=A.xx*D.dx+A.xy*D.dy+A.xz*D.dz+A.dx;
E.dy=A.yx*D.dx+A.yy*D.dy+A.yz*D.dz+A.dy;
E.dz=A.zx*D.dx+A.zy*D.dy+A.zz*D.dz+A.dz
}return E
},_project:function(A,D,C,B){return{x:A.xx*D+A.xy*C+A.xz*B+A.dx,y:A.yx*D+A.yy*C+A.yz*B+A.dy,z:A.zx*D+A.zy*C+A.zz*B+A.dz}
},project:function(C,B,A,D){var E=dojox.gfx3d.matrix.normalize(C);
if(typeof B=="number"&&typeof A=="number"&&typeof D=="number"){return dojox.gfx3d.matrix._project(E,B,A,D)
}return dojox.gfx3d.matrix._project(E,B.x,B.y,B.z)
}});
dojox.gfx3d.Matrix3D=dojox.gfx3d.matrix.Matrix3D
};