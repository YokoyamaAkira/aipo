dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.canvas"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"],["require","dojox.gfx.arc"],["require","dojox.gfx.decompose"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.canvas"]){A._hasResource["dojox.gfx.canvas"]=true;
A.provide("dojox.gfx.canvas");
A.require("dojox.gfx._base");
A.require("dojox.gfx.shape");
A.require("dojox.gfx.path");
A.require("dojox.gfx.arc");
A.require("dojox.gfx.decompose");
A.experimental("dojox.gfx.canvas");
(function(){var I=dojox.gfx,D=I.shape,L=I.arc,H=I.matrix,F=H.multiplyPoint,M=2*Math.PI;
A.extend(I.Shape,{render:function(C){C.save();
this._renderTransform(C);
this._renderShape(C);
this._renderFill(C,true);
this._renderStroke(C,true);
C.restore()
},_renderTransform:function(C){if("canvasTransform" in this){var N=this.canvasTransform;
C.translate(N.dx,N.dy);
C.rotate(N.angle2);
C.scale(N.sx,N.sy);
C.rotate(N.angle1)
}},_renderShape:function(C){},_renderFill:function(C,N){if("canvasFill" in this){if("canvasFillImage" in this){this.canvasFill=C.createPattern(this.canvasFillImage,"repeat");
delete this.canvasFillImage
}C.fillStyle=this.canvasFill;
if(N){C.fill()
}}else{C.fillStyle="rgba(0,0,0,0.0)"
}},_renderStroke:function(C,N){var O=this.strokeStyle;
if(O){C.strokeStyle=O.color.toString();
C.lineWidth=O.width;
C.lineCap=O.cap;
if(typeof O.join=="number"){C.lineJoin="miter";
C.miterLimit=O.join
}else{C.lineJoin=O.join
}if(N){C.stroke()
}}else{if(!N){C.strokeStyle="rgba(0,0,0,0.0)"
}}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
var J=function(O,P,C){var N=O.prototype[P];
O.prototype[P]=C?function(){this.surface.makeDirty();
N.apply(this,arguments);
C.call(this);
return this
}:function(){this.surface.makeDirty();
return N.apply(this,arguments)
}
};
J(I.Shape,"setTransform",function(){if(this.matrix){this.canvasTransform=I.decompose(this.matrix)
}else{delete this.canvasTransform
}});
J(I.Shape,"setFill",function(){var C=this.fillStyle,P;
if(C){if(typeof (C)=="object"&&"type" in C){var N=this.surface.rawNode.getContext("2d");
switch(C.type){case"linear":case"radial":P=C.type=="linear"?N.createLinearGradient(C.x1,C.y1,C.x2,C.y2):N.createRadialGradient(C.cx,C.cy,0,C.cx,C.cy,C.r);
A.forEach(C.colors,function(Q){P.addColorStop(Q.offset,I.normalizeColor(Q.color).toString())
});
break;
case"pattern":var O=new Image(C.width,C.height);
this.surface.downloadImage(O,C.src);
this.canvasFillImage=O
}}else{P=C.toString()
}this.canvasFill=P
}else{delete this.canvasFill
}});
J(I.Shape,"setStroke");
J(I.Shape,"setShape");
A.declare("dojox.gfx.Group",I.Shape,{constructor:function(){D.Container._init.call(this)
},render:function(C){C.save();
this._renderTransform(C);
this._renderFill(C);
this._renderStroke(C);
for(var N=0;
N<this.children.length;
++N){this.children[N].render(C)
}C.restore()
}});
A.declare("dojox.gfx.Rect",D.Rect,{_renderShape:function(V){var W=this.shape,N=Math.min(W.r,W.height/2,W.width/2),R=W.x,P=R+W.width,U=W.y,S=U+W.height,Q=R+N,O=P-N,T=U+N,C=S-N;
V.beginPath();
V.moveTo(Q,U);
V.lineTo(O,U);
if(N){V.arcTo(P,U,P,T,N)
}V.lineTo(P,C);
if(N){V.arcTo(P,S,O,S,N)
}V.lineTo(Q,S);
if(N){V.arcTo(R,S,R,C,N)
}V.lineTo(R,T);
if(N){V.arcTo(R,U,Q,U,N)
}V.closePath()
}});
var K=[];
(function(){var N=L.curvePI4;
K.push(N.s,N.c1,N.c2,N.e);
for(var C=45;
C<360;
C+=45){var O=H.rotateg(C);
K.push(F(O,N.c1),F(O,N.c2),F(O,N.e))
}})();
A.declare("dojox.gfx.Ellipse",D.Ellipse,{setShape:function(){I.Ellipse.superclass.setShape.apply(this,arguments);
var Q=this.shape,O,P,N,R=[],S=H.normalize([H.translate(Q.cx,Q.cy),H.scale(Q.rx,Q.ry)]);
O=F(S,K[0]);
R.push([O.x,O.y]);
for(var C=1;
C<K.length;
C+=3){P=F(S,K[C]);
N=F(S,K[C+1]);
O=F(S,K[C+2]);
R.push([P.x,P.y,N.x,N.y,O.x,O.y])
}this.canvasEllipse=R;
return this
},_renderShape:function(C){var O=this.canvasEllipse;
C.beginPath();
C.moveTo.apply(C,O[0]);
for(var N=1;
N<O.length;
++N){C.bezierCurveTo.apply(C,O[N])
}C.closePath()
}});
A.declare("dojox.gfx.Circle",D.Circle,{_renderShape:function(C){var N=this.shape;
C.beginPath();
C.arc(N.cx,N.cy,N.r,0,M,1)
}});
A.declare("dojox.gfx.Line",D.Line,{_renderShape:function(C){var N=this.shape;
C.beginPath();
C.moveTo(N.x1,N.y1);
C.lineTo(N.x2,N.y2)
}});
A.declare("dojox.gfx.Polyline",D.Polyline,{setShape:function(){I.Polyline.superclass.setShape.apply(this,arguments);
var P=this.shape.points,O=P[0],N=[],Q,C;
if(P.length){if(typeof O=="number"){N.push(O,P[1]);
C=2
}else{N.push(O.x,O.y);
C=1
}for(;
C<P.length;
++C){Q=P[C];
if(typeof Q=="number"){N.push(Q,P[++C])
}else{N.push(Q.x,Q.y)
}}}this.canvasPolyline=N;
return this
},_renderShape:function(C){var O=this.canvasPolyline;
if(O.length){C.beginPath();
C.moveTo(O[0],O[1]);
for(var N=2;
N<O.length;
N+=2){C.lineTo(O[N],O[N+1])
}}}});
A.declare("dojox.gfx.Image",D.Image,{setShape:function(){I.Image.superclass.setShape.apply(this,arguments);
var C=new Image();
this.surface.downloadImage(C,this.shape.src);
this.canvasImage=C;
return this
},_renderShape:function(C){var N=this.shape;
C.drawImage(this.canvasImage,N.x,N.y,N.width,N.height)
}});
A.declare("dojox.gfx.Text",D.Text,{_renderShape:function(C){var N=this.shape
}});
J(I.Text,"setFont");
var E={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};
A.declare("dojox.gfx.Path",I.path.Path,{constructor:function(){this.last={};
this.lastControl={}
},setShape:function(){this.canvasPath=[];
return I.Path.superclass.setShape.apply(this,arguments)
},_updateWithSegment:function(N){var C=A.clone(this.last);
this[E[N.action]](this.canvasPath,N.action,N.args);
this.last=C;
I.Path.superclass._updateWithSegment.apply(this,arguments)
},_renderShape:function(C){var O=this.canvasPath;
C.beginPath();
for(var N=0;
N<O.length;
N+=2){C[O[N]].apply(C,O[N+1])
}},_moveToA:function(C,P,N){C.push("moveTo",[N[0],N[1]]);
for(var O=2;
O<N.length;
O+=2){C.push("lineTo",[N[O],N[O+1]])
}this.last.x=N[N.length-2];
this.last.y=N[N.length-1];
this.lastControl={}
},_moveToR:function(C,P,N){if("x" in this.last){C.push("moveTo",[this.last.x+=N[0],this.last.y+=N[1]])
}else{C.push("moveTo",[this.last.x=N[0],this.last.y=N[1]])
}for(var O=2;
O<N.length;
O+=2){C.push("lineTo",[this.last.x+=N[O],this.last.y+=N[O+1]])
}this.lastControl={}
},_lineToA:function(C,P,N){for(var O=0;
O<N.length;
O+=2){C.push("lineTo",[N[O],N[O+1]])
}this.last.x=N[N.length-2];
this.last.y=N[N.length-1];
this.lastControl={}
},_lineToR:function(C,P,N){for(var O=0;
O<N.length;
O+=2){C.push("lineTo",[this.last.x+=N[O],this.last.y+=N[O+1]])
}this.lastControl={}
},_hLineToA:function(C,P,N){for(var O=0;
O<N.length;
++O){C.push("lineTo",[N[O],this.last.y])
}this.last.x=N[N.length-1];
this.lastControl={}
},_hLineToR:function(C,P,N){for(var O=0;
O<N.length;
++O){C.push("lineTo",[this.last.x+=N[O],this.last.y])
}this.lastControl={}
},_vLineToA:function(C,P,N){for(var O=0;
O<N.length;
++O){C.push("lineTo",[this.last.x,N[O]])
}this.last.y=N[N.length-1];
this.lastControl={}
},_vLineToR:function(C,P,N){for(var O=0;
O<N.length;
++O){C.push("lineTo",[this.last.x,this.last.y+=N[O]])
}this.lastControl={}
},_curveToA:function(C,P,N){for(var O=0;
O<N.length;
O+=6){C.push("bezierCurveTo",N.slice(O,O+6))
}this.last.x=N[N.length-2];
this.last.y=N[N.length-1];
this.lastControl.x=N[N.length-4];
this.lastControl.y=N[N.length-3];
this.lastControl.type="C"
},_curveToR:function(C,P,N){for(var O=0;
O<N.length;
O+=6){C.push("bezierCurveTo",[this.last.x+N[O],this.last.y+N[O+1],this.lastControl.x=this.last.x+N[O+2],this.lastControl.y=this.last.y+N[O+3],this.last.x+N[O+4],this.last.y+N[O+5]]);
this.last.x+=N[O+4];
this.last.y+=N[O+5]
}this.lastControl.type="C"
},_smoothCurveToA:function(C,Q,N){for(var O=0;
O<N.length;
O+=4){var P=this.lastControl.type=="C";
C.push("bezierCurveTo",[P?2*this.last.x-this.lastControl.x:this.last.x,P?2*this.last.y-this.lastControl.y:this.last.y,N[O],N[O+1],N[O+2],N[O+3]]);
this.lastControl.x=N[O];
this.lastControl.y=N[O+1];
this.lastControl.type="C"
}this.last.x=N[N.length-2];
this.last.y=N[N.length-1]
},_smoothCurveToR:function(C,Q,N){for(var O=0;
O<N.length;
O+=4){var P=this.lastControl.type=="C";
C.push("bezierCurveTo",[P?2*this.last.x-this.lastControl.x:this.last.x,P?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+N[O],this.last.y+N[O+1],this.last.x+N[O+2],this.last.y+N[O+3]]);
this.lastControl.x=this.last.x+N[O];
this.lastControl.y=this.last.y+N[O+1];
this.lastControl.type="C";
this.last.x+=N[O+2];
this.last.y+=N[O+3]
}},_qCurveToA:function(C,P,N){for(var O=0;
O<N.length;
O+=4){C.push("quadraticCurveTo",N.slice(O,O+4))
}this.last.x=N[N.length-2];
this.last.y=N[N.length-1];
this.lastControl.x=N[N.length-4];
this.lastControl.y=N[N.length-3];
this.lastControl.type="Q"
},_qCurveToR:function(C,P,N){for(var O=0;
O<N.length;
O+=4){C.push("quadraticCurveTo",[this.lastControl.x=this.last.x+N[O],this.lastControl.y=this.last.y+N[O+1],this.last.x+N[O+2],this.last.y+N[O+3]]);
this.last.x+=N[O+2];
this.last.y+=N[O+3]
}this.lastControl.type="Q"
},_qSmoothCurveToA:function(C,Q,N){for(var O=0;
O<N.length;
O+=2){var P=this.lastControl.type=="Q";
C.push("quadraticCurveTo",[this.lastControl.x=P?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=P?2*this.last.y-this.lastControl.y:this.last.y,N[O],N[O+1]]);
this.lastControl.type="Q"
}this.last.x=N[N.length-2];
this.last.y=N[N.length-1]
},_qSmoothCurveToR:function(C,Q,N){for(var O=0;
O<N.length;
O+=2){var P=this.lastControl.type=="Q";
C.push("quadraticCurveTo",[this.lastControl.x=P?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=P?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+N[O],this.last.y+N[O+1]]);
this.lastControl.type="Q";
this.last.x+=N[O];
this.last.y+=N[O+1]
}},_arcTo:function(C,T,O){var S=T=="a";
for(var P=0;
P<O.length;
P+=7){var N=O[P+5],Q=O[P+6];
if(S){N+=this.last.x;
Q+=this.last.y
}var R=L.arcAsBezier(this.last,O[P],O[P+1],O[P+2],O[P+3]?1:0,O[P+4]?1:0,N,Q);
A.forEach(R,function(U){C.push("bezierCurveTo",U)
});
this.last.x=N;
this.last.y=Q
}this.lastControl={}
},_closePath:function(C,O,N){C.push("closePath",[]);
this.lastControl={}
}});
A.forEach(["moveTo","lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(C){J(I.Path,C)
});
A.declare("dojox.gfx.TextPath",I.path.TextPath,{_renderShape:function(C){var N=this.shape
}});
A.declare("dojox.gfx.Surface",D.Surface,{constructor:function(){D.Container._init.call(this);
this.pendingImageCount=0;
this.makeDirty()
},setDimensions:function(N,C){this.width=I.normalizedLength(N);
this.height=I.normalizedLength(C);
if(!this.rawNode){return this
}this.rawNode.width=N;
this.rawNode.height=C;
this.makeDirty();
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null
},render:function(){if(this.pendingImageCount){return 
}var C=this.rawNode.getContext("2d");
C.save();
C.clearRect(0,0,this.rawNode.width,this.rawNode.height);
for(var N=0;
N<this.children.length;
++N){this.children[N].render(C)
}C.restore();
if("pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}},makeDirty:function(){if(!this.pendingImagesCount&&!("pendingRender" in this)){this.pendingRender=setTimeout(A.hitch(this,this.render),0)
}},downloadImage:function(C,N){var O=A.hitch(this,this.onImageLoad);
if(!this.pendingImageCount++&&"pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}C.onload=O;
C.onerror=O;
C.onabort=O;
C.src=N
},onImageLoad:function(){if(!--this.pendingImageCount){this.render()
}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
I.createSurface=function(N,P,C){if(!P){P="100%"
}if(!C){C="100%"
}var O=new I.Surface(),Q=A.byId(N),R=Q.ownerDocument.createElement("canvas");
R.width=P;
R.height=C;
Q.appendChild(R);
O.rawNode=R;
O.surface=O;
return O
};
var B=D.Container,G={add:function(C){this.surface.makeDirty();
return B.add.apply(this,arguments)
},remove:function(C,N){this.surface.makeDirty();
return B.remove.apply(this,arguments)
},clear:function(){this.surface.makeDirty();
return B.clear.apply(this,arguments)
},_moveChildToFront:function(C){this.surface.makeDirty();
return B._moveChildToFront.apply(this,arguments)
},_moveChildToBack:function(C){this.surface.makeDirty();
return B._moveChildToBack.apply(this,arguments)
}};
A.mixin(D.Creator,{createObject:function(O,N){var C=new O();
C.surface=this.surface;
C.setShape(N);
this.add(C);
return C
}});
A.extend(I.Group,G);
A.extend(I.Group,D.Creator);
A.extend(I.Surface,G);
A.extend(I.Surface,D.Creator)
})()
}}});