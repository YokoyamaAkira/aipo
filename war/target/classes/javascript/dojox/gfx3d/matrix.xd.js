dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.matrix"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.matrix"]){A._hasResource["dojox.gfx3d.matrix"]=true;
A.provide("dojox.gfx3d.matrix");
dojox.gfx3d.matrix._degToRad=function(B){return Math.PI*B/180
};
dojox.gfx3d.matrix._radToDeg=function(B){return B/Math.PI*180
};
dojox.gfx3d.matrix.Matrix3D=function(C){if(C){if(typeof C=="number"){this.xx=this.yy=this.zz=C
}else{if(C instanceof Array){if(C.length>0){var B=dojox.gfx3d.matrix.normalize(C[0]);
for(var E=1;
E<C.length;
++E){var D=B;
var F=dojox.gfx3d.matrix.normalize(C[E]);
B=new dojox.gfx3d.matrix.Matrix3D();
B.xx=D.xx*F.xx+D.xy*F.yx+D.xz*F.zx;
B.xy=D.xx*F.xy+D.xy*F.yy+D.xz*F.zy;
B.xz=D.xx*F.xz+D.xy*F.yz+D.xz*F.zz;
B.yx=D.yx*F.xx+D.yy*F.yx+D.yz*F.zx;
B.yy=D.yx*F.xy+D.yy*F.yy+D.yz*F.zy;
B.yz=D.yx*F.xz+D.yy*F.yz+D.yz*F.zz;
B.zx=D.zx*F.xx+D.zy*F.yx+D.zz*F.zx;
B.zy=D.zx*F.xy+D.zy*F.yy+D.zz*F.zy;
B.zz=D.zx*F.xz+D.zy*F.yz+D.zz*F.zz;
B.dx=D.xx*F.dx+D.xy*F.dy+D.xz*F.dz+D.dx;
B.dy=D.yx*F.dx+D.yy*F.dy+D.yz*F.dz+D.dy;
B.dz=D.zx*F.dx+D.zy*F.dy+D.zz*F.dz+D.dz
}A.mixin(this,B)
}}else{A.mixin(this,C)
}}}};
A.extend(dojox.gfx3d.matrix.Matrix3D,{xx:1,xy:0,xz:0,yx:0,yy:1,yz:0,zx:0,zy:0,zz:1,dx:0,dy:0,dz:0});
A.mixin(dojox.gfx3d.matrix,{identity:new dojox.gfx3d.matrix.Matrix3D(),translate:function(C,B,D){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:C,dy:B,dz:D})
}return new dojox.gfx3d.matrix.Matrix3D({dx:C.x,dy:C.y,dz:C.z})
},scale:function(C,B,D){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({xx:C,yy:B,zz:D})
}if(typeof C=="number"){return new dojox.gfx3d.matrix.Matrix3D({xx:C,yy:C,zz:C})
}return new dojox.gfx3d.matrix.Matrix3D({xx:C.x,yy:C.y,zz:C.z})
},rotateX:function(C){var D=Math.cos(C);
var B=Math.sin(C);
return new dojox.gfx3d.matrix.Matrix3D({yy:D,yz:-B,zy:B,zz:D})
},rotateXg:function(B){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(B))
},rotateY:function(C){var D=Math.cos(C);
var B=Math.sin(C);
return new dojox.gfx3d.matrix.Matrix3D({xx:D,xz:B,zx:-B,zz:D})
},rotateYg:function(B){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(B))
},rotateZ:function(C){var D=Math.cos(C);
var B=Math.sin(C);
return new dojox.gfx3d.matrix.Matrix3D({xx:D,xy:-B,yx:B,yy:D})
},rotateZg:function(B){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(B))
},cameraTranslate:function(C,B,D){if(arguments.length>1){return new dojox.gfx3d.matrix.Matrix3D({dx:-C,dy:-B,dz:-D})
}return new dojox.gfx3d.matrix.Matrix3D({dx:-C.x,dy:-C.y,dz:-C.z})
},cameraRotateX:function(C){var D=Math.cos(-C);
var B=Math.sin(-C);
return new dojox.gfx3d.matrix.Matrix3D({yy:D,yz:-B,zy:B,zz:D})
},cameraRotateXg:function(B){return dojox.gfx3d.matrix.rotateX(dojox.gfx3d.matrix._degToRad(B))
},cameraRotateY:function(C){var D=Math.cos(-C);
var B=Math.sin(-C);
return new dojox.gfx3d.matrix.Matrix3D({xx:D,xz:B,zx:-B,zz:D})
},cameraRotateYg:function(B){return dojox.gfx3d.matrix.rotateY(dojox.gfx3d.matrix._degToRad(B))
},cameraRotateZ:function(C){var D=Math.cos(-C);
var B=Math.sin(-C);
return new dojox.gfx3d.matrix.Matrix3D({xx:D,xy:-B,yx:B,yy:D})
},cameraRotateZg:function(B){return dojox.gfx3d.matrix.rotateZ(dojox.gfx3d.matrix._degToRad(B))
},normalize:function(B){return(B instanceof dojox.gfx3d.matrix.Matrix3D)?B:new dojox.gfx3d.matrix.Matrix3D(B)
},clone:function(B){var D=new dojox.gfx3d.matrix.Matrix3D();
for(var C in B){if(typeof (B[C])=="number"&&typeof (D[C])=="number"&&D[C]!=B[C]){D[C]=B[C]
}}return D
},invert:function(C){var B=dojox.gfx3d.matrix.normalize(C);
var E=B.xx*B.yy*B.zz+B.xy*B.yz*B.zx+B.xz*B.yx*B.zy-B.xx*B.yz*B.zy-B.xy*B.yx*B.zz-B.xz*B.yy*B.zx;
var F=new dojox.gfx3d.matrix.Matrix3D({xx:(B.yy*B.zz-B.yz*B.zy)/E,xy:(B.xz*B.zy-B.xy*B.zz)/E,xz:(B.xy*B.yz-B.xz*B.yy)/E,yx:(B.yz*B.zx-B.yx*B.zz)/E,yy:(B.xx*B.zz-B.xz*B.zx)/E,yz:(B.xz*B.yx-B.xx*B.yz)/E,zx:(B.yx*B.zy-B.yy*B.zx)/E,zy:(B.xy*B.zx-B.xx*B.zy)/E,zz:(B.xx*B.yy-B.xy*B.yx)/E,dx:-1*(B.xy*B.yz*B.dz+B.xz*B.dy*B.zy+B.dx*B.yy*B.zz-B.xy*B.dy*B.zz-B.xz*B.yy*B.dz-B.dx*B.yz*B.zy)/E,dy:(B.xx*B.yz*B.dz+B.xz*B.dy*B.zx+B.dx*B.yx*B.zz-B.xx*B.dy*B.zz-B.xz*B.yx*B.dz-B.dx*B.yz*B.zx)/E,dz:-1*(B.xx*B.yy*B.dz+B.xy*B.dy*B.zx+B.dx*B.yx*B.zy-B.xx*B.dy*B.zy-B.xy*B.yx*B.dz-B.dx*B.yy*B.zx)/E});
return F
},_multiplyPoint:function(C,B,E,D){return{x:C.xx*B+C.xy*E+C.xz*D+C.dx,y:C.yx*B+C.yy*E+C.yz*D+C.dy,z:C.zx*B+C.zy*E+C.zz*D+C.dz}
},multiplyPoint:function(E,D,C,F){var B=dojox.gfx3d.matrix.normalize(E);
if(typeof D=="number"&&typeof C=="number"&&typeof F=="number"){return dojox.gfx3d.matrix._multiplyPoint(B,D,C,F)
}return dojox.gfx3d.matrix._multiplyPoint(B,D.x,D.y,D.z)
},multiply:function(D){var B=dojox.gfx3d.matrix.normalize(D);
for(var E=1;
E<arguments.length;
++E){var C=B;
var F=dojox.gfx3d.matrix.normalize(arguments[E]);
B=new dojox.gfx3d.matrix.Matrix3D();
B.xx=C.xx*F.xx+C.xy*F.yx+C.xz*F.zx;
B.xy=C.xx*F.xy+C.xy*F.yy+C.xz*F.zy;
B.xz=C.xx*F.xz+C.xy*F.yz+C.xz*F.zz;
B.yx=C.yx*F.xx+C.yy*F.yx+C.yz*F.zx;
B.yy=C.yx*F.xy+C.yy*F.yy+C.yz*F.zy;
B.yz=C.yx*F.xz+C.yy*F.yz+C.yz*F.zz;
B.zx=C.zx*F.xx+C.zy*F.yx+C.zz*F.zx;
B.zy=C.zx*F.xy+C.zy*F.yy+C.zz*F.zy;
B.zz=C.zx*F.xz+C.zy*F.yz+C.zz*F.zz;
B.dx=C.xx*F.dx+C.xy*F.dy+C.xz*F.dz+C.dx;
B.dy=C.yx*F.dx+C.yy*F.dy+C.yz*F.dz+C.dy;
B.dz=C.zx*F.dx+C.zy*F.dy+C.zz*F.dz+C.dz
}return B
},_project:function(C,B,E,D){return{x:C.xx*B+C.xy*E+C.xz*D+C.dx,y:C.yx*B+C.yy*E+C.yz*D+C.dy,z:C.zx*B+C.zy*E+C.zz*D+C.dz}
},project:function(E,D,C,F){var B=dojox.gfx3d.matrix.normalize(E);
if(typeof D=="number"&&typeof C=="number"&&typeof F=="number"){return dojox.gfx3d.matrix._project(B,D,C,F)
}return dojox.gfx3d.matrix._project(B,D.x,D.y,D.z)
}});
dojox.gfx3d.Matrix3D=dojox.gfx3d.matrix.Matrix3D
}}});