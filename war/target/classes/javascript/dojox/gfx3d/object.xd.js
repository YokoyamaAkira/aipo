dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.object"],["require","dojox.gfx"],["require","dojox.gfx3d.lighting"],["require","dojox.gfx3d.scheduler"],["require","dojox.gfx3d.vector"],["require","dojox.gfx3d.gradient"]],defineResource:function(B){if(!B._hasResource["dojox.gfx3d.object"]){B._hasResource["dojox.gfx3d.object"]=true;
B.provide("dojox.gfx3d.object");
B.require("dojox.gfx");
B.require("dojox.gfx3d.lighting");
B.require("dojox.gfx3d.scheduler");
B.require("dojox.gfx3d.vector");
B.require("dojox.gfx3d.gradient");
var A=function(F,C){if(arguments.length>1){F=C
}var E={};
for(var D in F){if(D in E){continue
}}};
B.declare("dojox.gfx3d.Object",null,{constructor:function(){this.object=null;
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
},toStdFill:function(C,D){return(this.fillStyle&&typeof this.fillStyle.type!="undefined")?C[this.fillStyle.type](D,this.fillStyle.finish,this.fillStyle.color):this.fillStyle
},invalidate:function(){this.renderer.addTodo(this)
},destroy:function(){if(this.shape){var C=this.shape.getParent();
if(C){C.remove(this.shape)
}this.shape=null
}},render:function(C){throw"Pure virtual function, not implemented"
},draw:function(C){throw"Pure virtual function, not implemented"
},getZOrder:function(){return 0
},getOutline:function(){return null
}});
B.declare("dojox.gfx3d.Scene",dojox.gfx3d.Object,{constructor:function(){this.objects=[];
this.todos=[];
this.schedule=dojox.gfx3d.scheduler.zOrder;
this._draw=dojox.gfx3d.drawer.conservative
},setFill:function(C){this.fillStyle=C;
B.forEach(this.objects,function(D){D.setFill(C)
});
return this
},setStroke:function(C){this.strokeStyle=C;
B.forEach(this.objects,function(D){D.setStroke(C)
});
return this
},render:function(E,D){var C=dojox.gfx3d.matrix.multiply(E,this.matrix);
if(D){this.todos=this.objects
}B.forEach(this.todos,function(F){F.render(C,D)
})
},draw:function(C){this.objects=this.schedule(this.objects);
this._draw(this.todos,this.objects,this.renderer)
},addTodo:function(C){if(B.every(this.todos,function(D){return D!=C
})){this.todos.push(C);
this.invalidate()
}},invalidate:function(){this.parent.addTodo(this)
},getZOrder:function(){var C=0;
B.forEach(this.objects,function(D){C+=D.getZOrder()
});
return(this.objects.length>1)?C/this.objects.length:0
}});
B.declare("dojox.gfx3d.Edges",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultEdges)
},setObject:function(C,D){this.object=dojox.gfx.makeParameters(this.object,(C instanceof Array)?{points:C,style:D}:C);
return this
},getZOrder:function(){var C=0;
B.forEach(this.cache,function(D){C+=D.z
});
return(this.cache.length>1)?C/this.cache.length:0
},render:function(D){var C=dojox.gfx3d.matrix.multiply(D,this.matrix);
this.cache=B.map(this.object.points,function(E){return dojox.gfx3d.matrix.multiplyPoint(C,E)
})
},draw:function(){var E=this.cache;
if(this.shape){this.shape.setShape("")
}else{this.shape=this.renderer.createPath()
}var D=this.shape.setAbsoluteMode("absolute");
if(this.object.style=="strip"||this.object.style=="loop"){D.moveTo(E[0].x,E[0].y);
B.forEach(E.slice(1),function(F){D.lineTo(F.x,F.y)
});
if(this.object.style=="loop"){D.closePath()
}}else{for(var C=0;
C<this.cache.length;
){D.moveTo(E[C].x,E[C].y);
C++;
D.lineTo(E[C].x,E[C].y);
C++
}}D.setStroke(this.strokeStyle)
}});
B.declare("dojox.gfx3d.Orbit",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultOrbit)
},render:function(K){var I=dojox.gfx3d.matrix.multiply(K,this.matrix);
var O=[0,Math.PI/4,Math.PI/3];
var C=dojox.gfx3d.matrix.multiplyPoint(I,this.object.center);
var R=B.map(O,function(S){return{x:this.center.x+this.radius*Math.cos(S),y:this.center.y+this.radius*Math.sin(S),z:this.center.z}
},this.object);
R=B.map(R,function(S){return dojox.gfx3d.matrix.multiplyPoint(I,S)
});
var J=dojox.gfx3d.vector.normalize(R);
R=B.map(R,function(S){return dojox.gfx3d.vector.substract(S,C)
});
var H={xx:R[0].x*R[0].y,xy:R[0].y*R[0].y,xz:1,yx:R[1].x*R[1].y,yy:R[1].y*R[1].y,yz:1,zx:R[2].x*R[2].y,zy:R[2].y*R[2].y,zz:1,dx:0,dy:0,dz:0};
var P=B.map(R,function(S){return -Math.pow(S.x,2)
});
var G=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(H),P[0],P[1],P[2]);
var F=Math.atan2(G.x,1-G.y)/2;
var M=B.map(R,function(S){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-F),S.x,S.y)
});
var Q=Math.pow(M[0].x,2);
var P=Math.pow(M[0].y,2);
var N=Math.pow(M[1].x,2);
var L=Math.pow(M[1].y,2);
var E=Math.sqrt((Q*L-P*N)/(L-P));
var D=Math.sqrt((Q*L-P*N)/(Q-N));
this.cache={cx:C.x,cy:C.y,rx:E,ry:D,theta:F,normal:J}
},draw:function(C){if(this.shape){this.shape.setShape(this.cache)
}else{this.shape=this.renderer.createEllipse(this.cache)
}this.shape.applyTransform(dojox.gfx.matrix.rotateAt(this.cache.theta,this.cache.cx,this.cache.cy)).setStroke(this.strokeStyle).setFill(this.toStdFill(C,this.cache.normal))
}});
B.declare("dojox.gfx3d.Path3d",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultPath3d);
this.segments=[];
this.absolute=true;
this.last={};
this.path=""
},_collectArgs:function(F,C){for(var E=0;
E<C.length;
++E){var D=C[E];
if(typeof (D)=="boolean"){F.push(D?1:0)
}else{if(typeof (D)=="number"){F.push(D)
}else{if(D instanceof Array){this._collectArgs(F,D)
}else{if("x" in D&&"y" in D){F.push(D.x);
F.push(D.y)
}}}}}},_validSegments:{m:3,l:3,z:0},_pushSegment:function(E,C){var F=this._validSegments[E.toLowerCase()];
if(typeof (F)=="number"){if(F){if(C.length>=F){var D={action:E,args:C.slice(0,C.length-C.length%F)};
this.segments.push(D)
}}else{var D={action:E,args:[]};
this.segments.push(D)
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
},render:function(E){var D=dojox.gfx3d.matrix.multiply(E,this.matrix);
var F="";
var C=this._validSegments;
B.forEach(this.segments,function(H){F+=H.action;
for(var G=0;
G<H.args.length;
G+=C[H.action.toLowerCase()]){var I=dojox.gfx3d.matrix.multiplyPoint(D,H.args[G],H.args[G+1],H.args[G+2]);
F+=" "+I.x+" "+I.y
}});
this.cache=F
},_draw:function(){return this.parent.createPath(this.cache)
}});
B.declare("dojox.gfx3d.Triangles",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultTriangles)
},setObject:function(C,D){if(C instanceof Array){this.object=dojox.gfx.makeParameters(this.object,{points:C,style:D})
}else{this.object=dojox.gfx.makeParameters(this.object,C)
}return this
},render:function(G){var D=dojox.gfx3d.matrix.multiply(G,this.matrix);
var H=B.map(this.object.points,function(I){return dojox.gfx3d.matrix.multiplyPoint(D,I)
});
this.cache=[];
var F=H.slice(0,2);
var C=H[0];
if(this.object.style=="strip"){B.forEach(H.slice(2),function(I){F.push(I);
F.push(F[0]);
this.cache.push(F);
F=F.slice(1,3)
},this)
}else{if(this.object.style=="fan"){B.forEach(H.slice(2),function(I){F.push(I);
F.push(C);
this.cache.push(F);
F=[C,I]
},this)
}else{for(var E=0;
E<H.length;
){this.cache.push([H[E],H[E+1],H[E+2],H[E]]);
E+=3
}}}},draw:function(C){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(D){return D
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}B.forEach(this.cache,function(D){this.shape.createPolyline(D).setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.vector.normalize(D)))
},this)
},getZOrder:function(){var C=0;
B.forEach(this.cache,function(D){C+=(D[0].z+D[1].z+D[2].z)/3
});
return(this.cache.length>1)?C/this.cache.length:0
}});
B.declare("dojox.gfx3d.Quads",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultQuads)
},setObject:function(C,D){this.object=dojox.gfx.makeParameters(this.object,(C instanceof Array)?{points:C,style:D}:C);
return this
},render:function(F){var C=dojox.gfx3d.matrix.multiply(F,this.matrix);
var G=B.map(this.object.points,function(H){return dojox.gfx3d.matrix.multiplyPoint(C,H)
});
this.cache=[];
if(this.object.style=="strip"){var E=G.slice(0,2);
for(var D=2;
D<G.length;
){E=E.concat([G[D],G[D+1],E[0]]);
this.cache.push(E);
E=E.slice(2,4);
D+=2
}}else{for(var D=0;
D<G.length;
){this.cache.push([G[D],G[D+1],G[D+2],G[D+3],G[D]]);
D+=4
}}},draw:function(D){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(E){return E
});
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var C=0;
C<this.cache.length;
C++){this.shape.createPolyline(this.cache[C]).setStroke(this.strokeStyle).setFill(this.toStdFill(D,dojox.gfx3d.vector.normalize(this.cache[C])))
}},getZOrder:function(){var E=0;
for(var C=0;
C<this.cache.length;
C++){var D=this.cache[C];
E+=(D[0].z+D[1].z+D[2].z+D[3].z)/4
}return(this.cache.length>1)?E/this.cache.length:0
}});
B.declare("dojox.gfx3d.Polygon",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultPolygon)
},setObject:function(C){this.object=dojox.gfx.makeParameters(this.object,(C instanceof Array)?{path:C}:C);
return this
},render:function(D){var C=dojox.gfx3d.matrix.multiply(D,this.matrix);
this.cache=B.map(this.object.path,function(E){return dojox.gfx3d.matrix.multiplyPoint(C,E)
});
this.cache.push(this.cache[0])
},draw:function(C){if(this.shape){this.shape.setShape({points:this.cache})
}else{this.shape=this.renderer.createPolyline({points:this.cache})
}this.shape.setStroke(this.strokeStyle).setFill(this.toStdFill(C,dojox.gfx3d.matrix.normalize(this.cache)))
},getZOrder:function(){var D=0;
for(var C=0;
C<this.cache.length;
C++){D+=this.cache[C].z
}return(this.cache.length>1)?D/this.cache.length:0
},getOutline:function(){return this.cache.slice(0,3)
}});
B.declare("dojox.gfx3d.Cube",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultCube);
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
var C=B.map(M,function(O){return dojox.gfx3d.matrix.multiplyPoint(D,O)
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
},draw:function(E){this.cache=dojox.gfx3d.scheduler.bsp(this.cache,function(F){return F
});
var D=this.cache.slice(3);
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}for(var C=0;
C<D.length;
C++){this.shape.createPolyline(D[C]).setStroke(this.strokeStyle).setFill(this.toStdFill(E,dojox.gfx3d.vector.normalize(D[C])))
}},getZOrder:function(){var D=this.cache[0][0];
var C=this.cache[1][2];
return(D.z+C.z)/2
}});
B.declare("dojox.gfx3d.Cylinder",dojox.gfx3d.Object,{constructor:function(){this.object=B.clone(dojox.gfx3d.defaultCylinder)
},render:function(O){var K=dojox.gfx3d.matrix.multiply(O,this.matrix);
var L=[0,Math.PI/4,Math.PI/3];
var S=dojox.gfx3d.matrix.multiplyPoint(K,this.object.center);
var M=B.map(L,function(U){return{x:this.center.x+this.radius*Math.cos(U),y:this.center.y+this.radius*Math.sin(U),z:this.center.z}
},this.object);
M=B.map(M,function(U){return dojox.gfx3d.vector.substract(dojox.gfx3d.matrix.multiplyPoint(K,U),S)
});
var J={xx:M[0].x*M[0].y,xy:M[0].y*M[0].y,xz:1,yx:M[1].x*M[1].y,yy:M[1].y*M[1].y,yz:1,zx:M[2].x*M[2].y,zy:M[2].y*M[2].y,zz:1,dx:0,dy:0,dz:0};
var R=B.map(M,function(U){return -Math.pow(U.x,2)
});
var D=dojox.gfx3d.matrix.multiplyPoint(dojox.gfx3d.matrix.invert(J),R[0],R[1],R[2]);
var G=Math.atan2(D.x,1-D.y)/2;
var N=B.map(M,function(U){return dojox.gfx.matrix.multiplyPoint(dojox.gfx.matrix.rotate(-G),U.x,U.y)
});
var T=Math.pow(N[0].x,2);
var R=Math.pow(N[0].y,2);
var Q=Math.pow(N[1].x,2);
var P=Math.pow(N[1].y,2);
var F=Math.sqrt((T*P-R*Q)/(P-R));
var E=Math.sqrt((T*P-R*Q)/(T-Q));
if(F<E){var H=F;
F=E;
E=H;
G-=Math.PI/2
}var I=dojox.gfx3d.matrix.multiplyPoint(K,dojox.gfx3d.vector.sum(this.object.center,{x:0,y:0,z:this.object.height}));
var C=this.fillStyle.type=="constant"?this.fillStyle.color:dojox.gfx3d.gradient(this.renderer.lighting,this.fillStyle,this.object.center,this.object.radius,Math.PI,2*Math.PI,K);
if(isNaN(F)||isNaN(E)||isNaN(G)){F=this.object.radius,E=0,G=0
}this.cache={center:S,top:I,rx:F,ry:E,theta:G,gradient:C}
},draw:function(){var I=this.cache,E=dojox.gfx3d.vector,C=dojox.gfx.matrix,F=[I.center,I.top],G=E.substract(I.top,I.center);
if(E.dotProduct(G,this.renderer.lighting.incident)>0){F=[I.top,I.center];
G=E.substract(I.center,I.top)
}var D=this.renderer.lighting[this.fillStyle.type](G,this.fillStyle.finish,this.fillStyle.color),H=Math.sqrt(Math.pow(I.center.x-I.top.x,2)+Math.pow(I.center.y-I.top.y,2));
if(this.shape){this.shape.clear()
}else{this.shape=this.renderer.createGroup()
}this.shape.createPath("").moveTo(0,-I.rx).lineTo(H,-I.rx).lineTo(H,I.rx).lineTo(0,I.rx).arcTo(I.ry,I.rx,0,true,true,0,-I.rx).setFill(I.gradient).setStroke(this.strokeStyle).setTransform([C.translate(F[0]),C.rotate(Math.atan2(F[1].y-F[0].y,F[1].x-F[0].x))]);
if(I.rx>0&&I.ry>0){this.shape.createEllipse({cx:F[1].x,cy:F[1].y,rx:I.rx,ry:I.ry}).setFill(D).setStroke(this.strokeStyle).applyTransform(C.rotateAt(I.theta,F[1]))
}}});
B.declare("dojox.gfx3d.Viewport",dojox.gfx.Group,{constructor:function(){this.dimension=null;
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
},setLights:function(D,E,F){this.lights=(D instanceof Array)?{sources:D,ambient:E,specular:F}:D;
var C={x:0,y:0,z:1};
this.lighting=new dojox.gfx3d.lighting.Model(C,this.lights.sources,this.lights.ambient,this.lights.specular);
this.invalidate();
return this
},addLights:function(C){return this.setLights(this.lights.sources.concat(C))
},addTodo:function(C){if(B.every(this.todos,function(D){return D!=C
})){this.todos.push(C)
}},invalidate:function(){this.deep=true;
this.todos=this.objects
},setDimensions:function(C){if(C){this.dimension={width:typeof C.width=="string"?parseInt(C.width):C.width,height:typeof C.height=="string"?parseInt(C.height):C.height}
}else{this.dimension=null
}},render:function(){if(this.todos.length==0){return 
}var D=dojox.gfx3d.matrix;
for(var C=0;
C<this.todos.length;
C++){this.todos[C].render(dojox.gfx3d.matrix.normalize([D.cameraRotateXg(180),D.cameraTranslate(0,this.dimension.height,0),this.camera,]),this.deep)
}this.objects=this.schedule(this.objects);
this.draw(this.todos,this.objects,this);
this.todos=[];
this.deep=false
}});
dojox.gfx3d.Viewport.nodeType=dojox.gfx.Group.nodeType;
dojox.gfx3d._creators={createEdges:function(C,D){return this.create3DObject(dojox.gfx3d.Edges,C,D)
},createTriangles:function(D,C){return this.create3DObject(dojox.gfx3d.Triangles,D,C)
},createQuads:function(C,D){return this.create3DObject(dojox.gfx3d.Quads,C,D)
},createPolygon:function(C){return this.create3DObject(dojox.gfx3d.Polygon,C)
},createOrbit:function(C){return this.create3DObject(dojox.gfx3d.Orbit,C)
},createCube:function(C){return this.create3DObject(dojox.gfx3d.Cube,C)
},createCylinder:function(C){return this.create3DObject(dojox.gfx3d.Cylinder,C)
},createPath3d:function(C){return this.create3DObject(dojox.gfx3d.Path3d,C)
},createScene:function(){return this.create3DObject(dojox.gfx3d.Scene)
},create3DObject:function(C,D,E){var F=new C();
this.adopt(F);
if(D){F.setObject(D,E)
}return F
},adopt:function(C){C.renderer=this.renderer;
C.parent=this;
this.objects.push(C);
this.addTodo(C);
return this
},abandon:function(D,E){for(var C=0;
C<this.objects.length;
++C){if(this.objects[C]==D){this.objects.splice(C,1)
}}D.parent=null;
return this
},setScheduler:function(C){this.schedule=C
},setDrawer:function(C){this.draw=C
}};
B.extend(dojox.gfx3d.Viewport,dojox.gfx3d._creators);
B.extend(dojox.gfx3d.Scene,dojox.gfx3d._creators);
delete dojox.gfx3d._creators;
B.extend(dojox.gfx.Surface,{createViewport:function(){var C=this.createObject(dojox.gfx3d.Viewport,null,true);
C.setDimensions(this.getDimensions());
return C
}})
}}});