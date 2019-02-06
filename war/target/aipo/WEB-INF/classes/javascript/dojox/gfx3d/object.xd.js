dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.object"],["require","dojox.gfx"],["require","dojox.gfx3d.lighting"],["require","dojox.gfx3d.scheduler"],["require","dojox.gfx3d.vector"],["require","dojox.gfx3d.gradient"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.object"]){A._hasResource["dojox.gfx3d.object"]=true;
A.provide("dojox.gfx3d.object");
A.require("dojox.gfx");
A.require("dojox.gfx3d.lighting");
A.require("dojox.gfx3d.scheduler");
A.require("dojox.gfx3d.vector");
A.require("dojox.gfx3d.gradient");
var B=function(C,D){if(arguments.length>1){C=D
}var F={};
for(var E in C){if(E in F){continue
}}};
A.declare("dojox.gfx3d.Object",null,{constructor:function(){this.object=null;
this.matrix=null;
this.cache=null;
this.renderer=null;
this.parent=null;
this.strokeStyle=null;
this.fillStyle=null;
this.shape=null
},setObject:function(C){this.object=dojox.gfx.makeParameters(this.object,C);
return this
},setTransform:function(C){this.matrix=dojox.gfx3d.matrix.clone(C?dojox.gfx3d.matrix.normalize(C):dojox.gfx3d.identity,true);
return this
},applyRightTransform:function(C){return C?this.setTransform([this.matrix,C]):this
},applyLeftTransform:function(C){return C?this.setTransform([C,this.matrix]):this
},applyTransform:function(C){return C?this.setTransform([this.matrix,C]):this
},setFill:function(C){this.fillStyle=C;
return this
},setStroke:function(C){this.strokeStyle=C;
return this
},toStdFill:function(D,C){return(this.fillStyle&&typeof this.fillStyle.type!="undefined")?D[this.fillStyle.type](C,this.fillStyle.finish,this.fillStyle.color):this.fillStyle
},invalidate:function(){this.renderer.addTodo(this)
},destroy:function(){if(this.shape){var C=this.shape.getParent();
if(C){C.remove(this.shape)
}this.shape=null
}},render:function(C){throw"Pure virtual function, not implemented"
},draw:function(C){throw"Pure virtual function, not implemented"
},getZOrder:function(){return 0
},getOutline:function(){return null
}});
A.declare("dojox.gfx3d.Scene",dojox.gfx3d.Object,{constructor:function(){this.objects=[];
this.todos=[];
this.schedule=dojox.gfx3d.scheduler.zOrder;
this._draw=dojox.gfx3d.drawer.conservative
},setFill:function(C){this.fillStyle=C;
A.forEach(this.objects,function(D){D.setFill(C)
});
return this
},setStroke:function(C){this.strokeStyle=C;
A.forEach(this.objects,function(D){D.setStroke(C)
});
return this
},render:function(C,E){var D=dojox.gfx3d.matrix.multiply(C,this.matrix);
if(E){this.todos=this.objects
}A.forEach(this.todos,function(F){F.render(D,E)
})
},draw:function(C){this.objects=this.schedule(this.objects);
this._draw(this.todos,this.objects,this.renderer)
},addTodo:function(C){if(A.every(this.todos,function(D){return D!=C
})){this.todos.push(C);
this.invalidate()
}},invalidate:function(){this.parent.addTodo(this)
},getZOrder:function(){var C=0;
A.forEach(this.objects,function(D){C+=D.getZOrder()
});
return(this.objects.length>1)?C/this.objects.length:0
}});
A.declare("dojox.gfx3d.Edges",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultEdges)
},setObject:function(D,C){this.object=dojox.gfx.makeParameters(this.object,(D instanceof Array)?{points:D,style:C}:D);
return this
},getZOrder:function(){var C=0;
A.forEach(this.cache,function(D){C+=D.z
});
return(this.cache.length>1)?C/this.cache.length:0
},render:function(C){var D=dojox.gfx3d.matrix.multiply(C,this.matrix);
this.cache=A.map(this.object.points,function(E){return dojox.gfx3d.matrix.multiplyPoint(D,E)
})
},draw:function(){var C=this.cache;
if(this.shape){this.shape.setShape("")
}else{this.shape=this.renderer.createPath()
}var E=this.shape.setAbsoluteMode("absolute");
if(this.object.style=="strip"||this.object.style=="loop"){E.moveTo(C[0].x,C[0].y);
A.forEach(C.slice(1),function(F){E.lineTo(F.x,F.y)
});
if(this.object.style=="loop"){E.closePath()
}}else{for(var D=0;
D<this.cache.length;
){E.moveTo(C[D].x,C[D].y);
D++;
E.lineTo(C[D].x,C[D].y);
D++
}}E.setStroke(this.strokeStyle)
}});
A.declare("dojox.gfx3d.Orbit",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultOrbit)
},render:function(C){var Q=dojox.gfx3d.matrix.multiply(C,this.matrix);
var I=[0,Math.PI/4,Math.PI/3];
var E=dojox.gfx3d.matrix.multiplyPoint(Q,this.object.center);
var L=A.map(I,function(S){return{x:this.center.x+this.radius*Math.cos(S),y:this.center.y+this.radius*Math.sin(S),z:this.center.z}
},this.object);
L=A.map(L,function(S){return dojox.gfx3d.matrix.multiplyPoint(Q,S)
});
var R=dojox.gfx3d.vector.normalize(L);
L=A.map(L,function(S){return dojox.gfx3d.vector.substract(S,E)
});
var P={xx:L[0].x*L[0].y,xy:L[0].y*L[0].y,xz:1,yx:L[1].x*L[1].y,yy:L[1].y*L[1].y,yz:1,zx:L[2].x*L[2].y,zy:L[2].y*L[2].y,zz:1,dx:0,dy:0,dz:0};
var J=A.map(L,function(S){return -Math.pow(S.x,2)
});
var O=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(P),J[0],J[1],J[2]);
var N=Math.atan2(O.x,1-O.y)/2;
var G=A.map(L,function(S){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-N),S.x,S.y)
});
var K=Math.pow(G[0].x,2);
var J=Math.pow(G[0].y,2);
var H=Math.pow(G[1].x,2);
var D=Math.pow(G[1].y,2);
var M=Math.sqrt((K*D-J*H)/(D-J));
var F=Math.sqrt((K*D-J*H)/(K-H));
this.cache={cx:E.x,cy:E.y,rx:M,ry:F,theta:N,normal:R}
},draw:function(C){if(this.shape){this.shape.setShape(this.cache)
}else{this.shape=this.renderer.createEllipse(this.cache)
}this.shape.applyTransform(dojox.gfx.matrix.rotateAt(this.cache.theta,this.cache.cx,this.cache.cy)).setStroke(this.strokeStyle).setFill(this.toStdFill(C,this.cache.normal))
}});
A.declare("dojox.gfx3d.Path3d",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultPath3d);
this.segments=[];
this.absolute=true;
this.last={};
this.path=""
},_collectArgs:function(C,D){for(var F=0;
F<D.length;
++F){var E=D[F];
if(typeof (E)=="boolean"){C.push(E?1:0)
}else{if(typeof (E)=="number"){C.push(E)
}else{if(E instanceof Array){this._collectArgs(C,E)
}else{if("x" in E&&"y" in E){C.push(E.x);
C.push(E.y)
}}}}}},_validSegments:{m:3,l:3,z:0},_pushSegment:function(F,D){var C=this._validSegments[F.toLowerCase()];
if(typeof (C)=="number"){if(C){if(D.length>=C){var E={action:F,args:D.slice(0,D.length-D.length%C)};
this.segments.push(E)
}}else{var E={action:F,args:[]};
this.segments.push(E)
}}},moveTo:function(){var C=[];
this._collectArgs(C,arguments);
this._pushSegment(this.absolute?"M":"m",C);
return this
},lineTo:function(){var C=[];
this._collectArgs(C,arguments);
this._pushSegment(this.absolute?"L":"l",C);
return this
},closePath:function(){this._pushSegment("Z",[]);
return this
},render:function(F){var E=dojox.gfx3d.matrix.multiply(F,this.matrix);
var C="";
var D=this._validSegments;
A.forEach(this.segments,function(H){C+=H.action;
for(var G=0;
G<H.args.length;
G+=D[H.action.toLowerCase()]){var I=dojox.gfx3d.matrix.multiplyPoint(E,H.args[G],H.args[G+1],H.args[G+2]);
C+=" "+I.x+" "+I.y
}});
this.cache=C
},_draw:function(){return this.parent.createPath(this.cache)
}});
A.declare("dojox.gfx3d.Triangles",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultTriangles)
},setObject:function(D,C){if(D instanceof Array){this.object=dojox.gfx.makeParameters(this.object,{points:D,style:C})
}else{this.object=dojox.gfx.makeParameters(this.object,D)
}return this
},render:function(H){var E=dojox.gfx3d.matrix.multiply(H,this.matrix);
var D=A.map(this.object.points,function(I){return dojox.gfx3d.matrix.multiplyPoint(E,I)
});
this.cache=[];
var G=D.slice(0,2);
var C=D[0];
if(this.object.style=="strip"){A.forEach(D.slice(2),function(I){G.push(I);
G.push(G[0]);
this.cache.push(G);
G=G.slice(1,3)
},this)
}else{if(this.object.style=="fan"){A.forEach(D.slice(2),function(I){G.push(I);
G.push(C);
this.cache.push(G);
G=[C,I]
},this)
}else{for(var F=0;
F<D.length;
){this.cache.push([D[F],D[F+1],D[F+2],D[F]]);
F+=3
}}}},draw:function(C){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(D){return D
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}A.forEach(this.cache,function(D){this.shape.createPolyline(D).setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.vector.normalize(D)))
},this)
},getZOrder:function(){var C=0;
A.forEach(this.cache,function(D){C+=(D[0].z+D[1].z+D[2].z)/3
});
return(this.cache.length>1)?C/this.cache.length:0
}});
A.declare("dojox.gfx3d.Quads",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultQuads)
},setObject:function(D,C){this.object=dojox.gfx.makeParameters(this.object,(D instanceof Array)?{points:D,style:C}:D);
return this
},render:function(G){var D=dojox.gfx3d.matrix.multiply(G,this.matrix);
var C=A.map(this.object.points,function(H){return dojox.gfx3d.matrix.multiplyPoint(D,H)
});
this.cache=[];
if(this.object.style=="strip"){var F=C.slice(0,2);
for(var E=2;
E<C.length;
){F=F.concat([C[E],C[E+1],F[0]]);
this.cache.push(F);
F=F.slice(2,4);
E+=2
}}else{for(var E=0;
E<C.length;
){this.cache.push([C[E],C[E+1],C[E+2],C[E+3],C[E]]);
E+=4
}}},draw:function(C){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(E){return E
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var D=0;
D<this.cache.length;
D++){this.shape.createPolyline(this.cache[D]).setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.vector.normalize(this.cache[D])))
}},getZOrder:function(){var C=0;
for(var D=0;
D<this.cache.length;
D++){var E=this.cache[D];
C+=(E[0].z+E[1].z+E[2].z+E[3].z)/4
}return(this.cache.length>1)?C/this.cache.length:0
}});
A.declare("dojox.gfx3d.Polygon",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultPolygon)
},setObject:function(C){this.object=dojox.gfx.makeParameters(this.object,(C instanceof Array)?{path:C}:C);
return this
},render:function(C){var D=dojox.gfx3d.matrix.multiply(C,this.matrix);
this.cache=A.map(this.object.path,function(E){return dojox.gfx3d.matrix.multiplyPoint(D,E)
});
this.cache.push(this.cache[0])
},draw:function(C){if(this.shape){this.shape.setShape({points:this.cache})
}else{this.shape=this.renderer.createPolyline({points:this.cache})
}this.shape.setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.matrix.normalize(this.cache)))
},getZOrder:function(){var C=0;
for(var D=0;
D<this.cache.length;
D++){C+=this.cache[D].z
}return(this.cache.length>1)?C/this.cache.length:0
},getOutline:function(){return this.cache.slice(0,3)
}});
A.declare("dojox.gfx3d.Cube",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultCube);
this.polygons=[]
},setObject:function(C){this.object=dojox.gfx.makeParameters(this.object,C)
},render:function(I){var N=this.object.top;
var F=this.object.bottom;
var L={x:F.x,y:N.y,z:N.z};
var K={x:F.x,y:F.y,z:N.z};
var J={x:N.x,y:F.y,z:N.z};
var H={x:N.x,y:N.y,z:F.z};
var G={x:F.x,y:N.y,z:F.z};
var E={x:N.x,y:F.y,z:F.z};
var M=[N,L,K,J,H,G,F,E];
var D=dojox.gfx3d.matrix.multiply(I,this.matrix);
var C=A.map(M,function(O){return dojox.gfx3d.matrix.multiplyPoint(D,O)
});
N=C[0];
L=C[1];
K=C[2];
J=C[3];
H=C[4];
G=C[5];
F=C[6];
E=C[7];
this.cache=[[N,L,K,J,N],[H,G,F,E,H],[N,J,E,H,N],[J,K,F,E,J],[K,L,G,F,K],[L,N,H,G,L]]
},draw:function(C){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(F){return F
});
var E=this.cache.slice(3);
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var D=0;
D<E.length;
D++){this.shape.createPolyline(E[D]).setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.vector.normalize(E[D])))
}},getZOrder:function(){var C=this.cache[0][0];
var D=this.cache[1][2];
return(C.z+D.z)/2
}});
A.declare("dojox.gfx3d.Cylinder",dojox.gfx3d.Object,{constructor:function(){this.object=A.clone(dojox.gfx3d.defaultCylinder)
},render:function(E){var S=dojox.gfx3d.matrix.multiply(E,this.matrix);
var T=[0,Math.PI/4,Math.PI/3];
var I=dojox.gfx3d.matrix.multiplyPoint(S,this.object.center);
var C=A.map(T,function(U){return{x:this.center.x+this.radius*Math.cos(U),y:this.center.y+this.radius*Math.sin(U),z:this.center.z}
},this.object);
C=A.map(C,function(U){return dojox.gfx3d.vector.substract(dojox.gfx3d.matrix.multiplyPoint(S,U),I)
});
var R={xx:C[0].x*C[0].y,xy:C[0].y*C[0].y,xz:1,yx:C[1].x*C[1].y,yy:C[1].y*C[1].y,yz:1,zx:C[2].x*C[2].y,zy:C[2].y*C[2].y,zz:1,dx:0,dy:0,dz:0};
var H=A.map(C,function(U){return -Math.pow(U.x,2)
});
var L=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(R),H[0],H[1],H[2]);
var O=Math.atan2(L.x,1-L.y)/2;
var D=A.map(C,function(U){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-O),U.x,U.y)
});
var J=Math.pow(D[0].x,2);
var H=Math.pow(D[0].y,2);
var G=Math.pow(D[1].x,2);
var F=Math.pow(D[1].y,2);
var N=Math.sqrt((J*F-H*G)/(F-H));
var M=Math.sqrt((J*F-H*G)/(J-G));
if(N<M){var P=N;
N=M;
M=P;
O-=Math.PI/2
}var Q=dojox.gfx3d.matrix.multiplyPoint(S,dojox.gfx3d.vector.sum(this.object.center,{x:0,y:0,z:this.object.height}));
var K=this.fillStyle.type=="constant"?this.fillStyle.color:dojox.gfx3d.gradient(this.renderer.lighting,this.fillStyle,this.object.center,this.object.radius,Math.PI,2*Math.PI,S);
if(isNaN(N)||isNaN(M)||isNaN(O)){N=this.object.radius,M=0,O=0
}this.cache={center:I,top:Q,rx:N,ry:M,theta:O,gradient:K}
},draw:function(){var D=this.cache,C=dojox.gfx3d.vector,G=dojox.gfx.matrix,E=[D.center,D.top],F=C.substract(D.top,D.center);
if(C.dotProduct(F,this.renderer.lighting.incident)>0){E=[D.top,D.center];
F=C.substract(D.center,D.top)
}var I=this.renderer.lighting[this.fillStyle.type](F,this.fillStyle.finish,this.fillStyle.color),H=Math.sqrt(Math.pow(D.center.x-D.top.x,2)+Math.pow(D.center.y-D.top.y,2));
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}this.shape.createPath("").moveTo(0,-D.rx).lineTo(H,-D.rx).lineTo(H,D.rx).lineTo(0,D.rx).arcTo(D.ry,D.rx,0,true,true,0,-D.rx).setFill(D.gradient).setStroke(this.strokeStyle).setTransform([G.translate(E[0]),G.rotate(Math.atan2(E[1].y-E[0].y,E[1].x-E[0].x))]);
if(D.rx>0&&D.ry>0){this.shape.createEllipse({cx:E[1].x,cy:E[1].y,rx:D.rx,ry:D.ry}).setFill(I).setStroke(this.strokeStyle).applyTransform(G.rotateAt(D.theta,E[1]))
}}});
A.declare("dojox.gfx3d.Viewport",dojox.gfx.Group,{constructor:function(){this.dimension=null;
this.objects=[];
this.todos=[];
this.renderer=this;
this.schedule=dojox.gfx3d.scheduler.zOrder;
this.draw=dojox.gfx3d.drawer.conservative;
this.deep=false;
this.lights=[];
this.lighting=null
},setCameraTransform:function(C){this.camera=dojox.gfx3d.matrix.clone(C?dojox.gfx3d.matrix.normalize(C):dojox.gfx3d.identity,true);
this.invalidate();
return this
},applyCameraRightTransform:function(C){return C?this.setCameraTransform([this.camera,C]):this
},applyCameraLeftTransform:function(C){return C?this.setCameraTransform([C,this.camera]):this
},applyCameraTransform:function(C){return this.applyCameraRightTransform(C)
},setLights:function(E,F,C){this.lights=(E instanceof Array)?{sources:E,ambient:F,specular:C}:E;
var D={x:0,y:0,z:1};
this.lighting=new dojox.gfx3d.lighting.Model(D,this.lights.sources,this.lights.ambient,this.lights.specular);
this.invalidate();
return this
},addLights:function(C){return this.setLights(this.lights.sources.concat(C))
},addTodo:function(C){if(A.every(this.todos,function(D){return D!=C
})){this.todos.push(C)
}},invalidate:function(){this.deep=true;
this.todos=this.objects
},setDimensions:function(C){if(C){this.dimension={width:typeof C.width=="string"?parseInt(C.width):C.width,height:typeof C.height=="string"?parseInt(C.height):C.height}
}else{this.dimension=null
}},render:function(){if(this.todos.length==0){return 
}var C=dojox.gfx3d.matrix;
for(var D=0;
D<this.todos.length;
D++){this.todos[D].render(dojox.gfx3d.matrix.normalize([C.cameraRotateXg(180),C.cameraTranslate(0,this.dimension.height,0),this.camera,]),this.deep)
}this.objects=this.schedule(this.objects);
this.draw(this.todos,this.objects,this);
this.todos=[];
this.deep=false
}});
dojox.gfx3d.Viewport.nodeType=dojox.gfx.Group.nodeType;
dojox.gfx3d._creators={createEdges:function(D,C){return this.create3DObject(dojox.gfx3d.Edges,D,C)
},createTriangles:function(C,D){return this.create3DObject(dojox.gfx3d.Triangles,C,D)
},createQuads:function(D,C){return this.create3DObject(dojox.gfx3d.Quads,D,C)
},createPolygon:function(C){return this.create3DObject(dojox.gfx3d.Polygon,C)
},createOrbit:function(C){return this.create3DObject(dojox.gfx3d.Orbit,C)
},createCube:function(C){return this.create3DObject(dojox.gfx3d.Cube,C)
},createCylinder:function(C){return this.create3DObject(dojox.gfx3d.Cylinder,C)
},createPath3d:function(C){return this.create3DObject(dojox.gfx3d.Path3d,C)
},createScene:function(){return this.create3DObject(dojox.gfx3d.Scene)
},create3DObject:function(D,E,F){var C=new D();
this.adopt(C);
if(E){C.setObject(E,F)
}return C
},adopt:function(C){C.renderer=this.renderer;
C.parent=this;
this.objects.push(C);
this.addTodo(C);
return this
},abandon:function(E,C){for(var D=0;
D<this.objects.length;
++D){if(this.objects[D]==E){this.objects.splice(D,1)
}}E.parent=null;
return this
},setScheduler:function(C){this.schedule=C
},setDrawer:function(C){this.draw=C
}};
A.extend(dojox.gfx3d.Viewport,dojox.gfx3d._creators);
A.extend(dojox.gfx3d.Scene,dojox.gfx3d._creators);
delete dojox.gfx3d._creators;
A.extend(dojox.gfx.Surface,{createViewport:function(){var C=this.createObject(dojox.gfx3d.Viewport,null,true);
C.setDimensions(this.getDimensions());
return C
}})
}}});