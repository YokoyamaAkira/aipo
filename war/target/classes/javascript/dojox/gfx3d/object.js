if(!dojo._hasResource["dojox.gfx3d.object"]){dojo._hasResource["dojox.gfx3d.object"]=true;
dojo.provide("dojox.gfx3d.object");
dojo.require("dojox.gfx");
dojo.require("dojox.gfx3d.lighting");
dojo.require("dojox.gfx3d.scheduler");
dojo.require("dojox.gfx3d.vector");
dojo.require("dojox.gfx3d.gradient");
var out=function(C,D){if(arguments.length>1){C=D
}var B={};
for(var A in C){if(A in B){continue
}}};
dojo.declare("dojox.gfx3d.Object",null,{constructor:function(){this.object=null;
this.matrix=null;
this.cache=null;
this.renderer=null;
this.parent=null;
this.strokeStyle=null;
this.fillStyle=null;
this.shape=null
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,A);
return this
},setTransform:function(A){this.matrix=dojox.gfx3d.matrix.clone(A?dojox.gfx3d.matrix.normalize(A):dojox.gfx3d.identity,true);
return this
},applyRightTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},applyLeftTransform:function(A){return A?this.setTransform([A,this.matrix]):this
},applyTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},setFill:function(A){this.fillStyle=A;
return this
},setStroke:function(A){this.strokeStyle=A;
return this
},toStdFill:function(B,A){return(this.fillStyle&&typeof this.fillStyle.type!="undefined")?B[this.fillStyle.type](A,this.fillStyle.finish,this.fillStyle.color):this.fillStyle
},invalidate:function(){this.renderer.addTodo(this)
},destroy:function(){if(this.shape){var A=this.shape.getParent();
if(A){A.remove(this.shape)
}this.shape=null
}},render:function(A){throw"Pure virtual function, not implemented"
},draw:function(A){throw"Pure virtual function, not implemented"
},getZOrder:function(){return 0
},getOutline:function(){return null
}});
dojo.declare("dojox.gfx3d.Scene",dojox.gfx3d.Object,{constructor:function(){this.objects=[];
this.todos=[];
this.schedule=dojox.gfx3d.scheduler.zOrder;
this._draw=dojox.gfx3d.drawer.conservative
},setFill:function(A){this.fillStyle=A;
dojo.forEach(this.objects,function(B){B.setFill(A)
});
return this
},setStroke:function(A){this.strokeStyle=A;
dojo.forEach(this.objects,function(B){B.setStroke(A)
});
return this
},render:function(B,A){var C=dojox.gfx3d.matrix.multiply(B,this.matrix);
if(A){this.todos=this.objects
}dojo.forEach(this.todos,function(D){D.render(C,A)
})
},draw:function(A){this.objects=this.schedule(this.objects);
this._draw(this.todos,this.objects,this.renderer)
},addTodo:function(A){if(dojo.every(this.todos,function(B){return B!=A
})){this.todos.push(A);
this.invalidate()
}},invalidate:function(){this.parent.addTodo(this)
},getZOrder:function(){var A=0;
dojo.forEach(this.objects,function(B){A+=B.getZOrder()
});
return(this.objects.length>1)?A/this.objects.length:0
}});
dojo.declare("dojox.gfx3d.Edges",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultEdges)
},setObject:function(B,A){this.object=dojox.gfx.makeParameters(this.object,(B instanceof Array)?{points:B,style:A}:B);
return this
},getZOrder:function(){var A=0;
dojo.forEach(this.cache,function(B){A+=B.z
});
return(this.cache.length>1)?A/this.cache.length:0
},render:function(A){var B=dojox.gfx3d.matrix.multiply(A,this.matrix);
this.cache=dojo.map(this.object.points,function(C){return dojox.gfx3d.matrix.multiplyPoint(B,C)
})
},draw:function(){var B=this.cache;
if(this.shape){this.shape.setShape("")
}else{this.shape=this.renderer.createPath()
}var A=this.shape.setAbsoluteMode("absolute");
if(this.object.style=="strip"||this.object.style=="loop"){A.moveTo(B[0].x,B[0].y);
dojo.forEach(B.slice(1),function(D){A.lineTo(D.x,D.y)
});
if(this.object.style=="loop"){A.closePath()
}}else{for(var C=0;
C<this.cache.length;
){A.moveTo(B[C].x,B[C].y);
C++;
A.lineTo(B[C].x,B[C].y);
C++
}}A.setStroke(this.strokeStyle)
}});
dojo.declare("dojox.gfx3d.Orbit",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultOrbit)
},render:function(Q){var O=dojox.gfx3d.matrix.multiply(Q,this.matrix);
var F=[0,Math.PI/4,Math.PI/3];
var J=dojox.gfx3d.matrix.multiplyPoint(O,this.object.center);
var I=dojo.map(F,function(A){return{x:this.center.x+this.radius*Math.cos(A),y:this.center.y+this.radius*Math.sin(A),z:this.center.z}
},this.object);
I=dojo.map(I,function(A){return dojox.gfx3d.matrix.multiplyPoint(O,A)
});
var P=dojox.gfx3d.vector.normalize(I);
I=dojo.map(I,function(A){return dojox.gfx3d.vector.substract(A,J)
});
var N={xx:I[0].x*I[0].y,xy:I[0].y*I[0].y,xz:1,yx:I[1].x*I[1].y,yy:I[1].y*I[1].y,yz:1,zx:I[2].x*I[2].y,zy:I[2].y*I[2].y,zz:1,dx:0,dy:0,dz:0};
var G=dojo.map(I,function(A){return -Math.pow(A.x,2)
});
var M=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(N),G[0],G[1],G[2]);
var L=Math.atan2(M.x,1-M.y)/2;
var C=dojo.map(I,function(A){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-L),A.x,A.y)
});
var H=Math.pow(C[0].x,2);
var G=Math.pow(C[0].y,2);
var E=Math.pow(C[1].x,2);
var B=Math.pow(C[1].y,2);
var D=Math.sqrt((H*B-G*E)/(B-G));
var K=Math.sqrt((H*B-G*E)/(H-E));
this.cache={cx:J.x,cy:J.y,rx:D,ry:K,theta:L,normal:P}
},draw:function(A){if(this.shape){this.shape.setShape(this.cache)
}else{this.shape=this.renderer.createEllipse(this.cache)
}this.shape.applyTransform(dojox.gfx.matrix.rotateAt(this.cache.theta,this.cache.cx,this.cache.cy)).setStroke(this.strokeStyle).setFill(this.toStdFill(A,this.cache.normal))
}});
dojo.declare("dojox.gfx3d.Path3d",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultPath3d);
this.segments=[];
this.absolute=true;
this.last={};
this.path=""
},_collectArgs:function(C,D){for(var B=0;
B<D.length;
++B){var A=D[B];
if(typeof (A)=="boolean"){C.push(A?1:0)
}else{if(typeof (A)=="number"){C.push(A)
}else{if(A instanceof Array){this._collectArgs(C,A)
}else{if("x" in A&&"y" in A){C.push(A.x);
C.push(A.y)
}}}}}},_validSegments:{m:3,l:3,z:0},_pushSegment:function(B,D){var C=this._validSegments[B.toLowerCase()];
if(typeof (C)=="number"){if(C){if(D.length>=C){var A={action:B,args:D.slice(0,D.length-D.length%C)};
this.segments.push(A)
}}else{var A={action:B,args:[]};
this.segments.push(A)
}}},moveTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"M":"m",A);
return this
},lineTo:function(){var A=[];
this._collectArgs(A,arguments);
this._pushSegment(this.absolute?"L":"l",A);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},render:function(B){var A=dojox.gfx3d.matrix.multiply(B,this.matrix);
var C="";
var D=this._validSegments;
dojo.forEach(this.segments,function(G){C+=G.action;
for(var F=0;
F<G.args.length;
F+=D[G.action.toLowerCase()]){var E=dojox.gfx3d.matrix.multiplyPoint(A,G.args[F],G.args[F+1],G.args[F+2]);
C+=" "+E.x+" "+E.y
}});
this.cache=C
},_draw:function(){return this.parent.createPath(this.cache)
}});
dojo.declare("dojox.gfx3d.Triangles",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultTriangles)
},setObject:function(B,A){if(B instanceof Array){this.object=dojox.gfx.makeParameters(this.object,{points:B,style:A})
}else{this.object=dojox.gfx.makeParameters(this.object,B)
}return this
},render:function(D){var A=dojox.gfx3d.matrix.multiply(D,this.matrix);
var E=dojo.map(this.object.points,function(G){return dojox.gfx3d.matrix.multiplyPoint(A,G)
});
this.cache=[];
var C=E.slice(0,2);
var F=E[0];
if(this.object.style=="strip"){dojo.forEach(E.slice(2),function(G){C.push(G);
C.push(C[0]);
this.cache.push(C);
C=C.slice(1,3)
},this)
}else{if(this.object.style=="fan"){dojo.forEach(E.slice(2),function(G){C.push(G);
C.push(F);
this.cache.push(C);
C=[F,G]
},this)
}else{for(var B=0;
B<E.length;
){this.cache.push([E[B],E[B+1],E[B+2],E[B]]);
B+=3
}}}},draw:function(A){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(B){return B
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}dojo.forEach(this.cache,function(B){this.shape.createPolyline(B).setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.vector.normalize(B)))
},this)
},getZOrder:function(){var A=0;
dojo.forEach(this.cache,function(B){A+=(B[0].z+B[1].z+B[2].z)/3
});
return(this.cache.length>1)?A/this.cache.length:0
}});
dojo.declare("dojox.gfx3d.Quads",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultQuads)
},setObject:function(B,A){this.object=dojox.gfx.makeParameters(this.object,(B instanceof Array)?{points:B,style:A}:B);
return this
},render:function(C){var E=dojox.gfx3d.matrix.multiply(C,this.matrix);
var D=dojo.map(this.object.points,function(F){return dojox.gfx3d.matrix.multiplyPoint(E,F)
});
this.cache=[];
if(this.object.style=="strip"){var B=D.slice(0,2);
for(var A=2;
A<D.length;
){B=B.concat([D[A],D[A+1],B[0]]);
this.cache.push(B);
B=B.slice(2,4);
A+=2
}}else{for(var A=0;
A<D.length;
){this.cache.push([D[A],D[A+1],D[A+2],D[A+3],D[A]]);
A+=4
}}},draw:function(A){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(C){return C
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var B=0;
B<this.cache.length;
B++){this.shape.createPolyline(this.cache[B]).setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.vector.normalize(this.cache[B])))
}},getZOrder:function(){var B=0;
for(var C=0;
C<this.cache.length;
C++){var A=this.cache[C];
B+=(A[0].z+A[1].z+A[2].z+A[3].z)/4
}return(this.cache.length>1)?B/this.cache.length:0
}});
dojo.declare("dojox.gfx3d.Polygon",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultPolygon)
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,(A instanceof Array)?{path:A}:A);
return this
},render:function(A){var B=dojox.gfx3d.matrix.multiply(A,this.matrix);
this.cache=dojo.map(this.object.path,function(C){return dojox.gfx3d.matrix.multiplyPoint(B,C)
});
this.cache.push(this.cache[0])
},draw:function(A){if(this.shape){this.shape.setShape({points:this.cache})
}else{this.shape=this.renderer.createPolyline({points:this.cache})
}this.shape.setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.matrix.normalize(this.cache)))
},getZOrder:function(){var A=0;
for(var B=0;
B<this.cache.length;
B++){A+=this.cache[B].z
}return(this.cache.length>1)?A/this.cache.length:0
},getOutline:function(){return this.cache.slice(0,3)
}});
dojo.declare("dojox.gfx3d.Cube",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultCube);
this.polygons=[]
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,A)
},render:function(C){var H=this.object.top;
var L=this.object.bottom;
var F={x:L.x,y:H.y,z:H.z};
var E={x:L.x,y:L.y,z:H.z};
var D={x:H.x,y:L.y,z:H.z};
var B={x:H.x,y:H.y,z:L.z};
var A={x:L.x,y:H.y,z:L.z};
var K={x:H.x,y:L.y,z:L.z};
var G=[H,F,E,D,B,A,L,K];
var J=dojox.gfx3d.matrix.multiply(C,this.matrix);
var I=dojo.map(G,function(M){return dojox.gfx3d.matrix.multiplyPoint(J,M)
});
H=I[0];
F=I[1];
E=I[2];
D=I[3];
B=I[4];
A=I[5];
L=I[6];
K=I[7];
this.cache=[[H,F,E,D,H],[B,A,L,K,B],[H,D,K,B,H],[D,E,L,K,D],[E,F,A,L,E],[F,H,B,A,F]]
},draw:function(B){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(D){return D
});
var A=this.cache.slice(3);
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var C=0;
C<A.length;
C++){this.shape.createPolyline(A[C]).setStroke(this.strokeStyle).setFill(this.toStdFill(B,dojox.gfx3d.vector.normalize(A[C])))
}},getZOrder:function(){var A=this.cache[0][0];
var B=this.cache[1][2];
return(A.z+B.z)/2
}});
dojo.declare("dojox.gfx3d.Cylinder",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultCylinder)
},render:function(D){var R=dojox.gfx3d.matrix.multiply(D,this.matrix);
var S=[0,Math.PI/4,Math.PI/3];
var H=dojox.gfx3d.matrix.multiplyPoint(R,this.object.center);
var B=dojo.map(S,function(A){return{x:this.center.x+this.radius*Math.cos(A),y:this.center.y+this.radius*Math.sin(A),z:this.center.z}
},this.object);
B=dojo.map(B,function(A){return dojox.gfx3d.vector.substract(dojox.gfx3d.matrix.multiplyPoint(R,A),H)
});
var Q={xx:B[0].x*B[0].y,xy:B[0].y*B[0].y,xz:1,yx:B[1].x*B[1].y,yy:B[1].y*B[1].y,yz:1,zx:B[2].x*B[2].y,zy:B[2].y*B[2].y,zz:1,dx:0,dy:0,dz:0};
var G=dojo.map(B,function(A){return -Math.pow(A.x,2)
});
var K=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(Q),G[0],G[1],G[2]);
var N=Math.atan2(K.x,1-K.y)/2;
var C=dojo.map(B,function(A){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-N),A.x,A.y)
});
var I=Math.pow(C[0].x,2);
var G=Math.pow(C[0].y,2);
var F=Math.pow(C[1].x,2);
var E=Math.pow(C[1].y,2);
var M=Math.sqrt((I*E-G*F)/(E-G));
var L=Math.sqrt((I*E-G*F)/(I-F));
if(M<L){var O=M;
M=L;
L=O;
N-=Math.PI/2
}var P=dojox.gfx3d.matrix.multiplyPoint(R,dojox.gfx3d.vector.sum(this.object.center,{x:0,y:0,z:this.object.height}));
var J=this.fillStyle.type=="constant"?this.fillStyle.color:dojox.gfx3d.gradient(this.renderer.lighting,this.fillStyle,this.object.center,this.object.radius,Math.PI,2*Math.PI,R);
if(isNaN(M)||isNaN(L)||isNaN(N)){M=this.object.radius,L=0,N=0
}this.cache={center:H,top:P,rx:M,ry:L,theta:N,gradient:J}
},draw:function(){var D=this.cache,G=dojox.gfx3d.vector,E=dojox.gfx.matrix,A=[D.center,D.top],B=G.substract(D.top,D.center);
if(G.dotProduct(B,this.renderer.lighting.incident)>0){A=[D.top,D.center];
B=G.substract(D.center,D.top)
}var F=this.renderer.lighting[this.fillStyle.type](B,this.fillStyle.finish,this.fillStyle.color),C=Math.sqrt(Math.pow(D.center.x-D.top.x,2)+Math.pow(D.center.y-D.top.y,2));
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}this.shape.createPath("").moveTo(0,-D.rx).lineTo(C,-D.rx).lineTo(C,D.rx).lineTo(0,D.rx).arcTo(D.ry,D.rx,0,true,true,0,-D.rx).setFill(D.gradient).setStroke(this.strokeStyle).setTransform([E.translate(A[0]),E.rotate(Math.atan2(A[1].y-A[0].y,A[1].x-A[0].x))]);
if(D.rx>0&&D.ry>0){this.shape.createEllipse({cx:A[1].x,cy:A[1].y,rx:D.rx,ry:D.ry}).setFill(F).setStroke(this.strokeStyle).applyTransform(E.rotateAt(D.theta,A[1]))
}}});
dojo.declare("dojox.gfx3d.Viewport",dojox.gfx.Group,{constructor:function(){this.dimension=null;
this.objects=[];
this.todos=[];
this.renderer=this;
this.schedule=dojox.gfx3d.scheduler.zOrder;
this.draw=dojox.gfx3d.drawer.conservative;
this.deep=false;
this.lights=[];
this.lighting=null
},setCameraTransform:function(A){this.camera=dojox.gfx3d.matrix.clone(A?dojox.gfx3d.matrix.normalize(A):dojox.gfx3d.identity,true);
this.invalidate();
return this
},applyCameraRightTransform:function(A){return A?this.setCameraTransform([this.camera,A]):this
},applyCameraLeftTransform:function(A){return A?this.setCameraTransform([A,this.camera]):this
},applyCameraTransform:function(A){return this.applyCameraRightTransform(A)
},setLights:function(A,B,C){this.lights=(A instanceof Array)?{sources:A,ambient:B,specular:C}:A;
var D={x:0,y:0,z:1};
this.lighting=new dojox.gfx3d.lighting.Model(D,this.lights.sources,this.lights.ambient,this.lights.specular);
this.invalidate();
return this
},addLights:function(A){return this.setLights(this.lights.sources.concat(A))
},addTodo:function(A){if(dojo.every(this.todos,function(B){return B!=A
})){this.todos.push(A)
}},invalidate:function(){this.deep=true;
this.todos=this.objects
},setDimensions:function(A){if(A){this.dimension={width:typeof A.width=="string"?parseInt(A.width):A.width,height:typeof A.height=="string"?parseInt(A.height):A.height}
}else{this.dimension=null
}},render:function(){if(this.todos.length==0){return 
}var A=dojox.gfx3d.matrix;
for(var B=0;
B<this.todos.length;
B++){this.todos[B].render(dojox.gfx3d.matrix.normalize([A.cameraRotateXg(180),A.cameraTranslate(0,this.dimension.height,0),this.camera,]),this.deep)
}this.objects=this.schedule(this.objects);
this.draw(this.todos,this.objects,this);
this.todos=[];
this.deep=false
}});
dojox.gfx3d.Viewport.nodeType=dojox.gfx.Group.nodeType;
dojox.gfx3d._creators={createEdges:function(B,A){return this.create3DObject(dojox.gfx3d.Edges,B,A)
},createTriangles:function(A,B){return this.create3DObject(dojox.gfx3d.Triangles,A,B)
},createQuads:function(B,A){return this.create3DObject(dojox.gfx3d.Quads,B,A)
},createPolygon:function(A){return this.create3DObject(dojox.gfx3d.Polygon,A)
},createOrbit:function(A){return this.create3DObject(dojox.gfx3d.Orbit,A)
},createCube:function(A){return this.create3DObject(dojox.gfx3d.Cube,A)
},createCylinder:function(A){return this.create3DObject(dojox.gfx3d.Cylinder,A)
},createPath3d:function(A){return this.create3DObject(dojox.gfx3d.Path3d,A)
},createScene:function(){return this.create3DObject(dojox.gfx3d.Scene)
},create3DObject:function(D,A,B){var C=new D();
this.adopt(C);
if(A){C.setObject(A,B)
}return C
},adopt:function(A){A.renderer=this.renderer;
A.parent=this;
this.objects.push(A);
this.addTodo(A);
return this
},abandon:function(A,B){for(var C=0;
C<this.objects.length;
++C){if(this.objects[C]==A){this.objects.splice(C,1)
}}A.parent=null;
return this
},setScheduler:function(A){this.schedule=A
},setDrawer:function(A){this.draw=A
}};
dojo.extend(dojox.gfx3d.Viewport,dojox.gfx3d._creators);
dojo.extend(dojox.gfx3d.Scene,dojox.gfx3d._creators);
delete dojox.gfx3d._creators;
dojo.extend(dojox.gfx.Surface,{createViewport:function(){var A=this.createObject(dojox.gfx3d.Viewport,null,true);
A.setDimensions(this.getDimensions());
return A
}})
};