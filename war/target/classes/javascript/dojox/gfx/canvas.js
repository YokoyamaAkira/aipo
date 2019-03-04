if(!dojo._hasResource["dojox.gfx.canvas"]){dojo._hasResource["dojox.gfx.canvas"]=true;
dojo.provide("dojox.gfx.canvas");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.require("dojox.gfx.arc");
dojo.require("dojox.gfx.decompose");
dojo.experimental("dojox.gfx.canvas");
(function(){var H=dojox.gfx,B=H.shape,K=H.arc,G=H.matrix,E=G.multiplyPoint,L=2*Math.PI;
dojo.extend(H.Shape,{render:function(C){C.save();
this._renderTransform(C);
this._renderShape(C);
this._renderFill(C,true);
this._renderStroke(C,true);
C.restore()
},_renderTransform:function(C){if("canvasTransform" in this){var M=this.canvasTransform;
C.translate(M.dx,M.dy);
C.rotate(M.angle2);
C.scale(M.sx,M.sy);
C.rotate(M.angle1)
}},_renderShape:function(C){},_renderFill:function(C,M){if("canvasFill" in this){if("canvasFillImage" in this){this.canvasFill=C.createPattern(this.canvasFillImage,"repeat");
delete this.canvasFillImage
}C.fillStyle=this.canvasFill;
if(M){C.fill()
}}else{C.fillStyle="rgba(0,0,0,0.0)"
}},_renderStroke:function(C,M){var N=this.strokeStyle;
if(N){C.strokeStyle=N.color.toString();
C.lineWidth=N.width;
C.lineCap=N.cap;
if(typeof N.join=="number"){C.lineJoin="miter";
C.miterLimit=N.join
}else{C.lineJoin=N.join
}if(M){C.stroke()
}}else{if(!M){C.strokeStyle="rgba(0,0,0,0.0)"
}}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
var I=function(N,O,C){var M=N.prototype[O];
N.prototype[O]=C?function(){this.surface.makeDirty();
M.apply(this,arguments);
C.call(this);
return this
}:function(){this.surface.makeDirty();
return M.apply(this,arguments)
}
};
I(H.Shape,"setTransform",function(){if(this.matrix){this.canvasTransform=H.decompose(this.matrix)
}else{delete this.canvasTransform
}});
I(H.Shape,"setFill",function(){var C=this.fillStyle,O;
if(C){if(typeof (C)=="object"&&"type" in C){var M=this.surface.rawNode.getContext("2d");
switch(C.type){case"linear":case"radial":O=C.type=="linear"?M.createLinearGradient(C.x1,C.y1,C.x2,C.y2):M.createRadialGradient(C.cx,C.cy,0,C.cx,C.cy,C.r);
dojo.forEach(C.colors,function(P){O.addColorStop(P.offset,H.normalizeColor(P.color).toString())
});
break;
case"pattern":var N=new Image(C.width,C.height);
this.surface.downloadImage(N,C.src);
this.canvasFillImage=N
}}else{O=C.toString()
}this.canvasFill=O
}else{delete this.canvasFill
}});
I(H.Shape,"setStroke");
I(H.Shape,"setShape");
dojo.declare("dojox.gfx.Group",H.Shape,{constructor:function(){B.Container._init.call(this)
},render:function(C){C.save();
this._renderTransform(C);
this._renderFill(C);
this._renderStroke(C);
for(var M=0;
M<this.children.length;
++M){this.children[M].render(C)
}C.restore()
}});
dojo.declare("dojox.gfx.Rect",B.Rect,{_renderShape:function(U){var V=this.shape,M=Math.min(V.r,V.height/2,V.width/2),Q=V.x,O=Q+V.width,T=V.y,R=T+V.height,P=Q+M,N=O-M,S=T+M,C=R-M;
U.beginPath();
U.moveTo(P,T);
U.lineTo(N,T);
if(M){U.arcTo(O,T,O,S,M)
}U.lineTo(O,C);
if(M){U.arcTo(O,R,N,R,M)
}U.lineTo(P,R);
if(M){U.arcTo(Q,R,Q,C,M)
}U.lineTo(Q,S);
if(M){U.arcTo(Q,T,P,T,M)
}U.closePath()
}});
var J=[];
(function(){var M=K.curvePI4;
J.push(M.s,M.c1,M.c2,M.e);
for(var C=45;
C<360;
C+=45){var N=G.rotateg(C);
J.push(E(N,M.c1),E(N,M.c2),E(N,M.e))
}})();
dojo.declare("dojox.gfx.Ellipse",B.Ellipse,{setShape:function(){H.Ellipse.superclass.setShape.apply(this,arguments);
var Q=this.shape,O,P,N,R=[],S=G.normalize([G.translate(Q.cx,Q.cy),G.scale(Q.rx,Q.ry)]);
O=E(S,J[0]);
R.push([O.x,O.y]);
for(var C=1;
C<J.length;
C+=3){P=E(S,J[C]);
N=E(S,J[C+1]);
O=E(S,J[C+2]);
R.push([P.x,P.y,N.x,N.y,O.x,O.y])
}this.canvasEllipse=R;
return this
},_renderShape:function(C){var N=this.canvasEllipse;
C.beginPath();
C.moveTo.apply(C,N[0]);
for(var M=1;
M<N.length;
++M){C.bezierCurveTo.apply(C,N[M])
}C.closePath()
}});
dojo.declare("dojox.gfx.Circle",B.Circle,{_renderShape:function(C){var M=this.shape;
C.beginPath();
C.arc(M.cx,M.cy,M.r,0,L,1)
}});
dojo.declare("dojox.gfx.Line",B.Line,{_renderShape:function(C){var M=this.shape;
C.beginPath();
C.moveTo(M.x1,M.y1);
C.lineTo(M.x2,M.y2)
}});
dojo.declare("dojox.gfx.Polyline",B.Polyline,{setShape:function(){H.Polyline.superclass.setShape.apply(this,arguments);
var O=this.shape.points,N=O[0],M=[],P,C;
if(O.length){if(typeof N=="number"){M.push(N,O[1]);
C=2
}else{M.push(N.x,N.y);
C=1
}for(;
C<O.length;
++C){P=O[C];
if(typeof P=="number"){M.push(P,O[++C])
}else{M.push(P.x,P.y)
}}}this.canvasPolyline=M;
return this
},_renderShape:function(C){var N=this.canvasPolyline;
if(N.length){C.beginPath();
C.moveTo(N[0],N[1]);
for(var M=2;
M<N.length;
M+=2){C.lineTo(N[M],N[M+1])
}}}});
dojo.declare("dojox.gfx.Image",B.Image,{setShape:function(){H.Image.superclass.setShape.apply(this,arguments);
var C=new Image();
this.surface.downloadImage(C,this.shape.src);
this.canvasImage=C;
return this
},_renderShape:function(C){var M=this.shape;
C.drawImage(this.canvasImage,M.x,M.y,M.width,M.height)
}});
dojo.declare("dojox.gfx.Text",B.Text,{_renderShape:function(C){var M=this.shape
}});
I(H.Text,"setFont");
var D={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};
dojo.declare("dojox.gfx.Path",H.path.Path,{constructor:function(){this.last={};
this.lastControl={}
},setShape:function(){this.canvasPath=[];
return H.Path.superclass.setShape.apply(this,arguments)
},_updateWithSegment:function(M){var C=dojo.clone(this.last);
this[D[M.action]](this.canvasPath,M.action,M.args);
this.last=C;
H.Path.superclass._updateWithSegment.apply(this,arguments)
},_renderShape:function(C){var N=this.canvasPath;
C.beginPath();
for(var M=0;
M<N.length;
M+=2){C[N[M]].apply(C,N[M+1])
}},_moveToA:function(C,O,M){C.push("moveTo",[M[0],M[1]]);
for(var N=2;
N<M.length;
N+=2){C.push("lineTo",[M[N],M[N+1]])
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl={}
},_moveToR:function(C,O,M){if("x" in this.last){C.push("moveTo",[this.last.x+=M[0],this.last.y+=M[1]])
}else{C.push("moveTo",[this.last.x=M[0],this.last.y=M[1]])
}for(var N=2;
N<M.length;
N+=2){C.push("lineTo",[this.last.x+=M[N],this.last.y+=M[N+1]])
}this.lastControl={}
},_lineToA:function(C,O,M){for(var N=0;
N<M.length;
N+=2){C.push("lineTo",[M[N],M[N+1]])
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl={}
},_lineToR:function(C,O,M){for(var N=0;
N<M.length;
N+=2){C.push("lineTo",[this.last.x+=M[N],this.last.y+=M[N+1]])
}this.lastControl={}
},_hLineToA:function(C,O,M){for(var N=0;
N<M.length;
++N){C.push("lineTo",[M[N],this.last.y])
}this.last.x=M[M.length-1];
this.lastControl={}
},_hLineToR:function(C,O,M){for(var N=0;
N<M.length;
++N){C.push("lineTo",[this.last.x+=M[N],this.last.y])
}this.lastControl={}
},_vLineToA:function(C,O,M){for(var N=0;
N<M.length;
++N){C.push("lineTo",[this.last.x,M[N]])
}this.last.y=M[M.length-1];
this.lastControl={}
},_vLineToR:function(C,O,M){for(var N=0;
N<M.length;
++N){C.push("lineTo",[this.last.x,this.last.y+=M[N]])
}this.lastControl={}
},_curveToA:function(C,O,M){for(var N=0;
N<M.length;
N+=6){C.push("bezierCurveTo",M.slice(N,N+6))
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl.x=M[M.length-4];
this.lastControl.y=M[M.length-3];
this.lastControl.type="C"
},_curveToR:function(C,O,M){for(var N=0;
N<M.length;
N+=6){C.push("bezierCurveTo",[this.last.x+M[N],this.last.y+M[N+1],this.lastControl.x=this.last.x+M[N+2],this.lastControl.y=this.last.y+M[N+3],this.last.x+M[N+4],this.last.y+M[N+5]]);
this.last.x+=M[N+4];
this.last.y+=M[N+5]
}this.lastControl.type="C"
},_smoothCurveToA:function(C,P,M){for(var N=0;
N<M.length;
N+=4){var O=this.lastControl.type=="C";
C.push("bezierCurveTo",[O?2*this.last.x-this.lastControl.x:this.last.x,O?2*this.last.y-this.lastControl.y:this.last.y,M[N],M[N+1],M[N+2],M[N+3]]);
this.lastControl.x=M[N];
this.lastControl.y=M[N+1];
this.lastControl.type="C"
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1]
},_smoothCurveToR:function(C,P,M){for(var N=0;
N<M.length;
N+=4){var O=this.lastControl.type=="C";
C.push("bezierCurveTo",[O?2*this.last.x-this.lastControl.x:this.last.x,O?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+M[N],this.last.y+M[N+1],this.last.x+M[N+2],this.last.y+M[N+3]]);
this.lastControl.x=this.last.x+M[N];
this.lastControl.y=this.last.y+M[N+1];
this.lastControl.type="C";
this.last.x+=M[N+2];
this.last.y+=M[N+3]
}},_qCurveToA:function(C,O,M){for(var N=0;
N<M.length;
N+=4){C.push("quadraticCurveTo",M.slice(N,N+4))
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl.x=M[M.length-4];
this.lastControl.y=M[M.length-3];
this.lastControl.type="Q"
},_qCurveToR:function(C,O,M){for(var N=0;
N<M.length;
N+=4){C.push("quadraticCurveTo",[this.lastControl.x=this.last.x+M[N],this.lastControl.y=this.last.y+M[N+1],this.last.x+M[N+2],this.last.y+M[N+3]]);
this.last.x+=M[N+2];
this.last.y+=M[N+3]
}this.lastControl.type="Q"
},_qSmoothCurveToA:function(C,P,M){for(var N=0;
N<M.length;
N+=2){var O=this.lastControl.type=="Q";
C.push("quadraticCurveTo",[this.lastControl.x=O?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=O?2*this.last.y-this.lastControl.y:this.last.y,M[N],M[N+1]]);
this.lastControl.type="Q"
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1]
},_qSmoothCurveToR:function(C,P,M){for(var N=0;
N<M.length;
N+=2){var O=this.lastControl.type=="Q";
C.push("quadraticCurveTo",[this.lastControl.x=O?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=O?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+M[N],this.last.y+M[N+1]]);
this.lastControl.type="Q";
this.last.x+=M[N];
this.last.y+=M[N+1]
}},_arcTo:function(C,S,N){var R=S=="a";
for(var O=0;
O<N.length;
O+=7){var M=N[O+5],P=N[O+6];
if(R){M+=this.last.x;
P+=this.last.y
}var Q=K.arcAsBezier(this.last,N[O],N[O+1],N[O+2],N[O+3]?1:0,N[O+4]?1:0,M,P);
dojo.forEach(Q,function(T){C.push("bezierCurveTo",T)
});
this.last.x=M;
this.last.y=P
}this.lastControl={}
},_closePath:function(C,N,M){C.push("closePath",[]);
this.lastControl={}
}});
dojo.forEach(["moveTo","lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(C){I(H.Path,C)
});
dojo.declare("dojox.gfx.TextPath",H.path.TextPath,{_renderShape:function(C){var M=this.shape
}});
dojo.declare("dojox.gfx.Surface",B.Surface,{constructor:function(){B.Container._init.call(this);
this.pendingImageCount=0;
this.makeDirty()
},setDimensions:function(M,C){this.width=H.normalizedLength(M);
this.height=H.normalizedLength(C);
if(!this.rawNode){return this
}this.rawNode.width=M;
this.rawNode.height=C;
this.makeDirty();
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null
},render:function(){if(this.pendingImageCount){return 
}var C=this.rawNode.getContext("2d");
C.save();
C.clearRect(0,0,this.rawNode.width,this.rawNode.height);
for(var M=0;
M<this.children.length;
++M){this.children[M].render(C)
}C.restore();
if("pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}},makeDirty:function(){if(!this.pendingImagesCount&&!("pendingRender" in this)){this.pendingRender=setTimeout(dojo.hitch(this,this.render),0)
}},downloadImage:function(C,M){var N=dojo.hitch(this,this.onImageLoad);
if(!this.pendingImageCount++&&"pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}C.onload=N;
C.onerror=N;
C.onabort=N;
C.src=M
},onImageLoad:function(){if(!--this.pendingImageCount){this.render()
}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
H.createSurface=function(M,O,C){if(!O){O="100%"
}if(!C){C="100%"
}var N=new H.Surface(),P=dojo.byId(M),Q=P.ownerDocument.createElement("canvas");
Q.width=O;
Q.height=C;
P.appendChild(Q);
N.rawNode=Q;
N.surface=N;
return N
};
var A=B.Container,F={add:function(C){this.surface.makeDirty();
return A.add.apply(this,arguments)
},remove:function(C,M){this.surface.makeDirty();
return A.remove.apply(this,arguments)
},clear:function(){this.surface.makeDirty();
return A.clear.apply(this,arguments)
},_moveChildToFront:function(C){this.surface.makeDirty();
return A._moveChildToFront.apply(this,arguments)
},_moveChildToBack:function(C){this.surface.makeDirty();
return A._moveChildToBack.apply(this,arguments)
}};
dojo.mixin(B.Creator,{createObject:function(N,M){var C=new N();
C.surface=this.surface;
C.setShape(M);
this.add(C);
return C
}});
dojo.extend(H.Group,F);
dojo.extend(H.Group,B.Creator);
dojo.extend(H.Surface,F);
dojo.extend(H.Surface,B.Creator)
})()
};