if(!dojo._hasResource["dojox.gfx3d.object"]){dojo._hasResource["dojox.gfx3d.object"]=true;
dojo.provide("dojox.gfx3d.object");
dojo.require("dojox.gfx");
dojo.require("dojox.gfx3d.lighting");
dojo.require("dojox.gfx3d.scheduler");
dojo.require("dojox.gfx3d.vector");
dojo.require("dojox.gfx3d.gradient");
var out=function(D,A){if(arguments.length>1){D=A
}var C={};
for(var B in D){if(B in C){continue
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
},toStdFill:function(A,B){return(this.fillStyle&&typeof this.fillStyle.type!="undefined")?A[this.fillStyle.type](B,this.fillStyle.finish,this.fillStyle.color):this.fillStyle
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
},render:function(C,B){var A=dojox.gfx3d.matrix.multiply(C,this.matrix);
if(B){this.todos=this.objects
}dojo.forEach(this.todos,function(D){D.render(A,B)
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
},setObject:function(A,B){this.object=dojox.gfx.makeParameters(this.object,(A instanceof Array)?{points:A,style:B}:A);
return this
},getZOrder:function(){var A=0;
dojo.forEach(this.cache,function(B){A+=B.z
});
return(this.cache.length>1)?A/this.cache.length:0
},render:function(B){var A=dojox.gfx3d.matrix.multiply(B,this.matrix);
this.cache=dojo.map(this.object.points,function(C){return dojox.gfx3d.matrix.multiplyPoint(A,C)
})
},draw:function(){var C=this.cache;
if(this.shape){this.shape.setShape("")
}else{this.shape=this.renderer.createPath()
}var B=this.shape.setAbsoluteMode("absolute");
if(this.object.style=="strip"||this.object.style=="loop"){B.moveTo(C[0].x,C[0].y);
dojo.forEach(C.slice(1),function(D){B.lineTo(D.x,D.y)
});
if(this.object.style=="loop"){B.closePath()
}}else{for(var A=0;
A<this.cache.length;
){B.moveTo(C[A].x,C[A].y);
A++;
B.lineTo(C[A].x,C[A].y);
A++
}}B.setStroke(this.strokeStyle)
}});
dojo.declare("dojox.gfx3d.Orbit",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultOrbit)
},render:function(J){var H=dojox.gfx3d.matrix.multiply(J,this.matrix);
var N=[0,Math.PI/4,Math.PI/3];
var B=dojox.gfx3d.matrix.multiplyPoint(H,this.object.center);
var Q=dojo.map(N,function(A){return{x:this.center.x+this.radius*Math.cos(A),y:this.center.y+this.radius*Math.sin(A),z:this.center.z}
},this.object);
Q=dojo.map(Q,function(A){return dojox.gfx3d.matrix.multiplyPoint(H,A)
});
var I=dojox.gfx3d.vector.normalize(Q);
Q=dojo.map(Q,function(A){return dojox.gfx3d.vector.substract(A,B)
});
var G={xx:Q[0].x*Q[0].y,xy:Q[0].y*Q[0].y,xz:1,yx:Q[1].x*Q[1].y,yy:Q[1].y*Q[1].y,yz:1,zx:Q[2].x*Q[2].y,zy:Q[2].y*Q[2].y,zz:1,dx:0,dy:0,dz:0};
var O=dojo.map(Q,function(A){return -Math.pow(A.x,2)
});
var F=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(G),O[0],O[1],O[2]);
var E=Math.atan2(F.x,1-F.y)/2;
var L=dojo.map(Q,function(A){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-E),A.x,A.y)
});
var P=Math.pow(L[0].x,2);
var O=Math.pow(L[0].y,2);
var M=Math.pow(L[1].x,2);
var K=Math.pow(L[1].y,2);
var D=Math.sqrt((P*K-O*M)/(K-O));
var C=Math.sqrt((P*K-O*M)/(P-M));
this.cache={cx:B.x,cy:B.y,rx:D,ry:C,theta:E,normal:I}
},draw:function(A){if(this.shape){this.shape.setShape(this.cache)
}else{this.shape=this.renderer.createEllipse(this.cache)
}this.shape.applyTransform(dojox.gfx.matrix.rotateAt(this.cache.theta,this.cache.cx,this.cache.cy)).setStroke(this.strokeStyle).setFill(this.toStdFill(A,this.cache.normal))
}});
dojo.declare("dojox.gfx3d.Path3d",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultPath3d);
this.segments=[];
this.absolute=true;
this.last={};
this.path=""
},_collectArgs:function(D,A){for(var C=0;
C<A.length;
++C){var B=A[C];
if(typeof (B)=="boolean"){D.push(B?1:0)
}else{if(typeof (B)=="number"){D.push(B)
}else{if(B instanceof Array){this._collectArgs(D,B)
}else{if("x" in B&&"y" in B){D.push(B.x);
D.push(B.y)
}}}}}},_validSegments:{m:3,l:3,z:0},_pushSegment:function(C,A){var D=this._validSegments[C.toLowerCase()];
if(typeof (D)=="number"){if(D){if(A.length>=D){var B={action:C,args:A.slice(0,A.length-A.length%D)};
this.segments.push(B)
}}else{var B={action:C,args:[]};
this.segments.push(B)
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
},render:function(C){var B=dojox.gfx3d.matrix.multiply(C,this.matrix);
var D="";
var A=this._validSegments;
dojo.forEach(this.segments,function(F){D+=F.action;
for(var E=0;
E<F.args.length;
E+=A[F.action.toLowerCase()]){var G=dojox.gfx3d.matrix.multiplyPoint(B,F.args[E],F.args[E+1],F.args[E+2]);
D+=" "+G.x+" "+G.y
}});
this.cache=D
},_draw:function(){return this.parent.createPath(this.cache)
}});
dojo.declare("dojox.gfx3d.Triangles",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultTriangles)
},setObject:function(A,B){if(A instanceof Array){this.object=dojox.gfx.makeParameters(this.object,{points:A,style:B})
}else{this.object=dojox.gfx.makeParameters(this.object,A)
}return this
},render:function(E){var B=dojox.gfx3d.matrix.multiply(E,this.matrix);
var F=dojo.map(this.object.points,function(G){return dojox.gfx3d.matrix.multiplyPoint(B,G)
});
this.cache=[];
var D=F.slice(0,2);
var A=F[0];
if(this.object.style=="strip"){dojo.forEach(F.slice(2),function(G){D.push(G);
D.push(D[0]);
this.cache.push(D);
D=D.slice(1,3)
},this)
}else{if(this.object.style=="fan"){dojo.forEach(F.slice(2),function(G){D.push(G);
D.push(A);
this.cache.push(D);
D=[A,G]
},this)
}else{for(var C=0;
C<F.length;
){this.cache.push([F[C],F[C+1],F[C+2],F[C]]);
C+=3
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
},setObject:function(A,B){this.object=dojox.gfx.makeParameters(this.object,(A instanceof Array)?{points:A,style:B}:A);
return this
},render:function(D){var A=dojox.gfx3d.matrix.multiply(D,this.matrix);
var E=dojo.map(this.object.points,function(F){return dojox.gfx3d.matrix.multiplyPoint(A,F)
});
this.cache=[];
if(this.object.style=="strip"){var C=E.slice(0,2);
for(var B=2;
B<E.length;
){C=C.concat([E[B],E[B+1],C[0]]);
this.cache.push(C);
C=C.slice(2,4);
B+=2
}}else{for(var B=0;
B<E.length;
){this.cache.push([E[B],E[B+1],E[B+2],E[B+3],E[B]]);
B+=4
}}},draw:function(B){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(C){return C
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var A=0;
A<this.cache.length;
A++){this.shape.createPolyline(this.cache[A]).setStroke(this.strokeStyle).setFill(this.toStdFill(B,dojox.gfx3d.vector.normalize(this.cache[A])))
}},getZOrder:function(){var C=0;
for(var A=0;
A<this.cache.length;
A++){var B=this.cache[A];
C+=(B[0].z+B[1].z+B[2].z+B[3].z)/4
}return(this.cache.length>1)?C/this.cache.length:0
}});
dojo.declare("dojox.gfx3d.Polygon",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultPolygon)
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,(A instanceof Array)?{path:A}:A);
return this
},render:function(B){var A=dojox.gfx3d.matrix.multiply(B,this.matrix);
this.cache=dojo.map(this.object.path,function(C){return dojox.gfx3d.matrix.multiplyPoint(A,C)
});
this.cache.push(this.cache[0])
},draw:function(A){if(this.shape){this.shape.setShape({points:this.cache})
}else{this.shape=this.renderer.createPolyline({points:this.cache})
}this.shape.setStroke(this.strokeStyle).setFill(this.toStdFill(A,dojox.gfx3d.matrix.normalize(this.cache)))
},getZOrder:function(){var B=0;
for(var A=0;
A<this.cache.length;
A++){B+=this.cache[A].z
}return(this.cache.length>1)?B/this.cache.length:0
},getOutline:function(){return this.cache.slice(0,3)
}});
dojo.declare("dojox.gfx3d.Cube",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultCube);
this.polygons=[]
},setObject:function(A){this.object=dojox.gfx.makeParameters(this.object,A)
},render:function(G){var L=this.object.top;
var D=this.object.bottom;
var J={x:D.x,y:L.y,z:L.z};
var I={x:D.x,y:D.y,z:L.z};
var H={x:L.x,y:D.y,z:L.z};
var F={x:L.x,y:L.y,z:D.z};
var E={x:D.x,y:L.y,z:D.z};
var C={x:L.x,y:D.y,z:D.z};
var K=[L,J,I,H,F,E,D,C];
var B=dojox.gfx3d.matrix.multiply(G,this.matrix);
var A=dojo.map(K,function(M){return dojox.gfx3d.matrix.multiplyPoint(B,M)
});
L=A[0];
J=A[1];
I=A[2];
H=A[3];
F=A[4];
E=A[5];
D=A[6];
C=A[7];
this.cache=[[L,J,I,H,L],[F,E,D,C,F],[L,H,C,F,L],[H,I,D,C,H],[I,J,E,D,I],[J,L,F,E,J]]
},draw:function(C){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(D){return D
});
var B=this.cache.slice(3);
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var A=0;
A<B.length;
A++){this.shape.createPolyline(B[A]).setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.vector.normalize(B[A])))
}},getZOrder:function(){var B=this.cache[0][0];
var A=this.cache[1][2];
return(B.z+A.z)/2
}});
dojo.declare("dojox.gfx3d.Cylinder",dojox.gfx3d.Object,{constructor:function(){this.object=dojo.clone(dojox.gfx3d.defaultCylinder)
},render:function(N){var J=dojox.gfx3d.matrix.multiply(N,this.matrix);
var K=[0,Math.PI/4,Math.PI/3];
var R=dojox.gfx3d.matrix.multiplyPoint(J,this.object.center);
var L=dojo.map(K,function(A){return{x:this.center.x+this.radius*Math.cos(A),y:this.center.y+this.radius*Math.sin(A),z:this.center.z}
},this.object);
L=dojo.map(L,function(A){return dojox.gfx3d.vector.substract(dojox.gfx3d.matrix.multiplyPoint(J,A),R)
});
var I={xx:L[0].x*L[0].y,xy:L[0].y*L[0].y,xz:1,yx:L[1].x*L[1].y,yy:L[1].y*L[1].y,yz:1,zx:L[2].x*L[2].y,zy:L[2].y*L[2].y,zz:1,dx:0,dy:0,dz:0};
var Q=dojo.map(L,function(A){return -Math.pow(A.x,2)
});
var C=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(I),Q[0],Q[1],Q[2]);
var F=Math.atan2(C.x,1-C.y)/2;
var M=dojo.map(L,function(A){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-F),A.x,A.y)
});
var S=Math.pow(M[0].x,2);
var Q=Math.pow(M[0].y,2);
var P=Math.pow(M[1].x,2);
var O=Math.pow(M[1].y,2);
var E=Math.sqrt((S*O-Q*P)/(O-Q));
var D=Math.sqrt((S*O-Q*P)/(S-P));
if(E<D){var G=E;
E=D;
D=G;
F-=Math.PI/2
}var H=dojox.gfx3d.matrix.multiplyPoint(J,dojox.gfx3d.vector.sum(this.object.center,{x:0,y:0,z:this.object.height}));
var B=this.fillStyle.type=="constant"?this.fillStyle.color:dojox.gfx3d.gradient(this.renderer.lighting,this.fillStyle,this.object.center,this.object.radius,Math.PI,2*Math.PI,J);
if(isNaN(E)||isNaN(D)||isNaN(F)){E=this.object.radius,D=0,F=0
}this.cache={center:R,top:H,rx:E,ry:D,theta:F,gradient:B}
},draw:function(){var G=this.cache,C=dojox.gfx3d.vector,A=dojox.gfx.matrix,D=[G.center,G.top],E=C.substract(G.top,G.center);
if(C.dotProduct(E,this.renderer.lighting.incident)>0){D=[G.top,G.center];
E=C.substract(G.center,G.top)
}var B=this.renderer.lighting[this.fillStyle.type](E,this.fillStyle.finish,this.fillStyle.color),F=Math.sqrt(Math.pow(G.center.x-G.top.x,2)+Math.pow(G.center.y-G.top.y,2));
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}this.shape.createPath("").moveTo(0,-G.rx).lineTo(F,-G.rx).lineTo(F,G.rx).lineTo(0,G.rx).arcTo(G.ry,G.rx,0,true,true,0,-G.rx).setFill(G.gradient).setStroke(this.strokeStyle).setTransform([A.translate(D[0]),A.rotate(Math.atan2(D[1].y-D[0].y,D[1].x-D[0].x))]);
if(G.rx>0&&G.ry>0){this.shape.createEllipse({cx:D[1].x,cy:D[1].y,rx:G.rx,ry:G.ry}).setFill(B).setStroke(this.strokeStyle).applyTransform(A.rotateAt(G.theta,D[1]))
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
},setLights:function(B,C,D){this.lights=(B instanceof Array)?{sources:B,ambient:C,specular:D}:B;
var A={x:0,y:0,z:1};
this.lighting=new dojox.gfx3d.lighting.Model(A,this.lights.sources,this.lights.ambient,this.lights.specular);
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
}var B=dojox.gfx3d.matrix;
for(var A=0;
A<this.todos.length;
A++){this.todos[A].render(dojox.gfx3d.matrix.normalize([B.cameraRotateXg(180),B.cameraTranslate(0,this.dimension.height,0),this.camera,]),this.deep)
}this.objects=this.schedule(this.objects);
this.draw(this.todos,this.objects,this);
this.todos=[];
this.deep=false
}});
dojox.gfx3d.Viewport.nodeType=dojox.gfx.Group.nodeType;
dojox.gfx3d._creators={createEdges:function(A,B){return this.create3DObject(dojox.gfx3d.Edges,A,B)
},createTriangles:function(B,A){return this.create3DObject(dojox.gfx3d.Triangles,B,A)
},createQuads:function(A,B){return this.create3DObject(dojox.gfx3d.Quads,A,B)
},createPolygon:function(A){return this.create3DObject(dojox.gfx3d.Polygon,A)
},createOrbit:function(A){return this.create3DObject(dojox.gfx3d.Orbit,A)
},createCube:function(A){return this.create3DObject(dojox.gfx3d.Cube,A)
},createCylinder:function(A){return this.create3DObject(dojox.gfx3d.Cylinder,A)
},createPath3d:function(A){return this.create3DObject(dojox.gfx3d.Path3d,A)
},createScene:function(){return this.create3DObject(dojox.gfx3d.Scene)
},create3DObject:function(A,B,C){var D=new A();
this.adopt(D);
if(B){D.setObject(B,C)
}return D
},adopt:function(A){A.renderer=this.renderer;
A.parent=this;
this.objects.push(A);
this.addTodo(A);
return this
},abandon:function(B,C){for(var A=0;
A<this.objects.length;
++A){if(this.objects[A]==B){this.objects.splice(A,1)
}}B.parent=null;
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