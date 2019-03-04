if(!dojo._hasResource["dojox.gfx3d.matrix"]){dojo._hasResource["dojox.gfx3d.matrix"]=true;
dojo.provide("dojox.gfx3d.matrix");
dojox.gfx3d.matrix._degToRad=function(A){return Math.PI*A/180
};
dojox.gfx3d.matrix._radToDeg=function(A){return A/Math.PI*180
};
dojox.gfx3d.matrix.Matrix3D=function(B){if(B){if(typeof B=="number"){this.xx=this.yy=this.zz=B
}else{if(B instanceof Array){if(B.length>0){var A=dojox.gfx3d.matrix.normalize(B[0]);
for(var D=1;
D<B.length;
++D){var C=A;
var E=dojox.gfx3d.matrix.normalize(B[D]);
A=new dojox.gfx3d.matrix.Matrix3D();
A.xx=C.xx*E.xx+C.xy*E.yx+C.xz*E.zx;
A.xy=C.xx*E.xy+C.xy*E.yy+C.xz*E.zy;
A.xz=C.xx*E.xz+C.xy*E.yz+C.xz*E.zz;
A.yx=C.yx*E.xx+C.yy*E.yx+C.yz*E.zx;
A.yy=C.yx*E.xy+C.yy*E.yy+C.yz*E.zy;
A.yz=C.yx*E.xz+C.yy*E.yz+C.yz*E.zz;
A.zx=C.zx*E.xx+C.zy*E.yx+C.zz*E.zx;
A.zy=C.zx*E.xy+C.zy*E.yy+C.zz*E.zy;
A.zz=C.zx*E.xz+C.zy*E.yz+C.zz*E.zz;
A.dx=C.xx*E.dx+C.xy*E.dy+C.xz*E.dz+C.dx;
A.dy=C.yx*E.dx+C.yy*E.dy+C.yz*E.dz+C.dy;
A.dz=C.zx*E.dx+C.zy*E.dy+C.zz*E.dz+C.dz
}dojo.mixin(this,A)
}}else{dojo.mixin(this,B)
}}}};
dojo.extend(dojox.gfx3d.matrix.Matrix3D,{xx:1,xy:0,xz:0,yx:0,yy:1,yz:0,zx:0,zy:0,zz:1,dx:0,dy:0,dz:0});
dojo.mixin(dojox.gfx3d.matrix,{identity:new dojox.gfx3d.matrix.Matrix3D(),translate:function(B,A,C){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:B,dy:A,dz:C})
}return new dojox.gfx3d.matrix.Matrix3D({dx:B.x,dy:B.y,dz:B.z})
},scale:function(B,A,C){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({xx:B,yy:A,zz:C})
}if(typeof B=="number"){return new dojox.gfx3d.matrix.Matrix3D({xx:B,yy:B,zz:B})
}return new dojox.gfx3d.matrix.Matrix3D({xx:B.x,yy:B.y,zz:B.z})
},rotateX:function(B){var C=Math.cos(B);
var A=Math.sin(B);
return new dojox.gfx3d.matrix.Matrix3D({yy:C,yz:-A,zy:A,zz:C})
},rotateXg:function(A){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(A))
},rotateY:function(B){var C=Math.cos(B);
var A=Math.sin(B);
return new dojox.gfx3d.matrix.Matrix3D({xx:C,xz:A,zx:-A,zz:C})
},rotateYg:function(A){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(A))
},rotateZ:function(B){var C=Math.cos(B);
var A=Math.sin(B);
return new dojox.gfx3d.matrix.Matrix3D({xx:C,xy:-A,yx:A,yy:C})
},rotateZg:function(A){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(A))
},cameraTranslate:function(B,A,C){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:-B,dy:-A,dz:-C})
}return new dojox.gfx3d.matrix.Matrix3D({dx:-B.x,dy:-B.y,dz:-B.z})
},cameraRotateX:function(B){var C=Math.cos(-B);
var A=Math.sin(-B);
return new dojox.gfx3d.matrix.Matrix3D({yy:C,yz:-A,zy:A,zz:C})
},cameraRotateXg:function(A){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(A))
},cameraRotateY:function(B){var C=Math.cos(-B);
var A=Math.sin(-B);
return new dojox.gfx3d.matrix.Matrix3D({xx:C,xz:A,zx:-A,zz:C})
},cameraRotateYg:function(A){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(A))
},cameraRotateZ:function(B){var C=Math.cos(-B);
var A=Math.sin(-B);
return new dojox.gfx3d.matrix.Matrix3D({xx:C,xy:-A,yx:A,yy:C})
},cameraRotateZg:function(A){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(A))
},normalize:function(A){return(A instanceof dojox.gfx3d.matrix.Matrix3D)?A:new dojox.gfx3d.matrix.Matrix3D(A)
},clone:function(A){var C=new dojox.gfx3d.matrix.Matrix3D();
for(var B in A){if(typeof (A[B])=="number"&&typeof (C[B])=="number"&&C[B]!=A[B]){C[B]=A[B]
}}return C
},invert:function(B){var A=dojox.gfx3d.matrix.normalize(B);
var C=A.xx*A.yy*A.zz+A.xy*A.yz*A.zx+A.xz*A.yx*A.zy-A.xx*A.yz*A.zy-A.xy*A.yx*A.zz-A.xz*A.yy*A.zx;
var E=new dojox.gfx3d.matrix.Matrix3D({xx:(A.yy*A.zz-A.yz*A.zy)/C,xy:(A.xz*A.zy-A.xy*A.zz)/C,xz:(A.xy*A.yz-A.xz*A.yy)/C,yx:(A.yz*A.zx-A.yx*A.zz)/C,yy:(A.xx*A.zz-A.xz*A.zx)/C,yz:(A.xz*A.yx-A.xx*A.yz)/C,zx:(A.yx*A.zy-A.yy*A.zx)/C,zy:(A.xy*A.zx-A.xx*A.zy)/C,zz:(A.xx*A.yy-A.xy*A.yx)/C,dx:-1*(A.xy*A.yz*A.dz+A.xz*A.dy*A.zy+A.dx*A.yy*A.zz-A.xy*A.dy*A.zz-A.xz*A.yy*A.dz-A.dx*A.yz*A.zy)/C,dy:(A.xx*A.yz*A.dz+A.xz*A.dy*A.zx+A.dx*A.yx*A.zz-A.xx*A.dy*A.zz-A.xz*A.yx*A.dz-A.dx*A.yz*A.zx)/C,dz:-1*(A.xx*A.yy*A.dz+A.xy*A.dy*A.zx+A.dx*A.yx*A.zy-A.xx*A.dy*A.zy-A.xy*A.yx*A.dz-A.dx*A.yy*A.zx)/C});
return E
},_multiplyPoint:function(B,A,D,C){return{x:B.xx*A+B.xy*D+B.xz*C+B.dx,y:B.yx*A+B.yy*D+B.yz*C+B.dy,z:B.zx*A+B.zy*D+B.zz*C+B.dz}
},multiplyPoint:function(D,C,B,E){var A=dojox.gfx3d.matrix.normalize(D);
if(typeof C=="number"&&typeof B=="number"&&typeof E=="number"){return dojox.gfx3d.matrix._multiplyPoint(A,C,B,E)
}return dojox.gfx3d.matrix._multiplyPoint(A,C.x,C.y,C.z)
},multiply:function(C){var A=dojox.gfx3d.matrix.normalize(C);
for(var D=1;
D<arguments.length;
++D){var B=A;
var E=dojox.gfx3d.matrix.normalize(arguments[D]);
A=new dojox.gfx3d.matrix.Matrix3D();
A.xx=B.xx*E.xx+B.xy*E.yx+B.xz*E.zx;
A.xy=B.xx*E.xy+B.xy*E.yy+B.xz*E.zy;
A.xz=B.xx*E.xz+B.xy*E.yz+B.xz*E.zz;
A.yx=B.yx*E.xx+B.yy*E.yx+B.yz*E.zx;
A.yy=B.yx*E.xy+B.yy*E.yy+B.yz*E.zy;
A.yz=B.yx*E.xz+B.yy*E.yz+B.yz*E.zz;
A.zx=B.zx*E.xx+B.zy*E.yx+B.zz*E.zx;
A.zy=B.zx*E.xy+B.zy*E.yy+B.zz*E.zy;
A.zz=B.zx*E.xz+B.zy*E.yz+B.zz*E.zz;
A.dx=B.xx*E.dx+B.xy*E.dy+B.xz*E.dz+B.dx;
A.dy=B.yx*E.dx+B.yy*E.dy+B.yz*E.dz+B.dy;
A.dz=B.zx*E.dx+B.zy*E.dy+B.zz*E.dz+B.dz
}return A
},_project:function(B,A,D,C){return{x:B.xx*A+B.xy*D+B.xz*C+B.dx,y:B.yx*A+B.yy*D+B.yz*C+B.dy,z:B.zx*A+B.zy*D+B.zz*C+B.dz}
},project:function(D,C,B,E){var A=dojox.gfx3d.matrix.normalize(D);
if(typeof C=="number"&&typeof B=="number"&&typeof E=="number"){return dojox.gfx3d.matrix._project(A,C,B,E)
}return dojox.gfx3d.matrix._project(A,C.x,C.y,C.z)
}});
dojox.gfx3d.Matrix3D=dojox.gfx3d.matrix.Matrix3D
};