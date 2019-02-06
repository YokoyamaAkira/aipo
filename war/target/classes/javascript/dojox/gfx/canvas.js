if(!dojo._hasResource["dojox.gfx.canvas"]){dojo._hasResource["dojox.gfx.canvas"]=true;
dojo.provide("dojox.gfx.canvas");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.require("dojox.gfx.arc");
dojo.require("dojox.gfx.decompose");
dojo.experimental("dojox.gfx.canvas");
(function(){var F=dojox.gfx,L=F.shape,I=F.arc,E=F.matrix,B=E.multiplyPoint,J=2*Math.PI;
dojo.extend(F.Shape,{render:function(C){C.save();
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
}},_renderStroke:function(N,M){var C=this.strokeStyle;
if(C){N.strokeStyle=C.color.toString();
N.lineWidth=C.width;
N.lineCap=C.cap;
if(typeof C.join=="number"){N.lineJoin="miter";
N.miterLimit=C.join
}else{N.lineJoin=C.join
}if(M){N.stroke()
}}else{if(!M){N.strokeStyle="rgba(0,0,0,0.0)"
}}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
var G=function(N,C,O){var M=N.prototype[C];
N.prototype[C]=O?function(){this.surface.makeDirty();
M.apply(this,arguments);
O.call(this);
return this
}:function(){this.surface.makeDirty();
return M.apply(this,arguments)
}
};
G(F.Shape,"setTransform",function(){if(this.matrix){this.canvasTransform=F.decompose(this.matrix)
}else{delete this.canvasTransform
}});
G(F.Shape,"setFill",function(){var N=this.fillStyle,C;
if(N){if(typeof (N)=="object"&&"type" in N){var M=this.surface.rawNode.getContext("2d");
switch(N.type){case"linear":case"radial":C=N.type=="linear"?M.createLinearGradient(N.x1,N.y1,N.x2,N.y2):M.createRadialGradient(N.cx,N.cy,0,N.cx,N.cy,N.r);
dojo.forEach(N.colors,function(P){C.addColorStop(P.offset,F.normalizeColor(P.color).toString())
});
break;
case"pattern":var O=new Image(N.width,N.height);
this.surface.downloadImage(O,N.src);
this.canvasFillImage=O
}}else{C=N.toString()
}this.canvasFill=C
}else{delete this.canvasFill
}});
G(F.Shape,"setStroke");
G(F.Shape,"setShape");
dojo.declare("dojox.gfx.Group",F.Shape,{constructor:function(){L.Container._init.call(this)
},render:function(C){C.save();
this._renderTransform(C);
this._renderFill(C);
this._renderStroke(C);
for(var M=0;
M<this.children.length;
++M){this.children[M].render(C)
}C.restore()
}});
dojo.declare("dojox.gfx.Rect",L.Rect,{_renderShape:function(C){var M=this.shape,O=Math.min(M.r,M.height/2,M.width/2),S=M.x,Q=S+M.width,V=M.y,T=V+M.height,R=S+O,P=Q-O,U=V+O,N=T-O;
C.beginPath();
C.moveTo(R,V);
C.lineTo(P,V);
if(O){C.arcTo(Q,V,Q,U,O)
}C.lineTo(Q,N);
if(O){C.arcTo(Q,T,P,T,O)
}C.lineTo(R,T);
if(O){C.arcTo(S,T,S,N,O)
}C.lineTo(S,U);
if(O){C.arcTo(S,V,R,V,O)
}C.closePath()
}});
var H=[];
(function(){var M=I.curvePI4;
H.push(M.s,M.c1,M.c2,M.e);
for(var N=45;
N<360;
N+=45){var C=E.rotateg(N);
H.push(B(C,M.c1),B(C,M.c2),B(C,M.e))
}})();
dojo.declare("dojox.gfx.Ellipse",L.Ellipse,{setShape:function(){F.Ellipse.superclass.setShape.apply(this,arguments);
var Q=this.shape,O,P,M,R=[],C=E.normalize([E.translate(Q.cx,Q.cy),E.scale(Q.rx,Q.ry)]);
O=B(C,H[0]);
R.push([O.x,O.y]);
for(var N=1;
N<H.length;
N+=3){P=B(C,H[N]);
M=B(C,H[N+1]);
O=B(C,H[N+2]);
R.push([P.x,P.y,M.x,M.y,O.x,O.y])
}this.canvasEllipse=R;
return this
},_renderShape:function(N){var C=this.canvasEllipse;
N.beginPath();
N.moveTo.apply(N,C[0]);
for(var M=1;
M<C.length;
++M){N.bezierCurveTo.apply(N,C[M])
}N.closePath()
}});
dojo.declare("dojox.gfx.Circle",L.Circle,{_renderShape:function(C){var M=this.shape;
C.beginPath();
C.arc(M.cx,M.cy,M.r,0,J,1)
}});
dojo.declare("dojox.gfx.Line",L.Line,{_renderShape:function(C){var M=this.shape;
C.beginPath();
C.moveTo(M.x1,M.y1);
C.lineTo(M.x2,M.y2)
}});
dojo.declare("dojox.gfx.Polyline",L.Polyline,{setShape:function(){F.Polyline.superclass.setShape.apply(this,arguments);
var P=this.shape.points,N=P[0],M=[],C,O;
if(P.length){if(typeof N=="number"){M.push(N,P[1]);
O=2
}else{M.push(N.x,N.y);
O=1
}for(;
O<P.length;
++O){C=P[O];
if(typeof C=="number"){M.push(C,P[++O])
}else{M.push(C.x,C.y)
}}}this.canvasPolyline=M;
return this
},_renderShape:function(N){var C=this.canvasPolyline;
if(C.length){N.beginPath();
N.moveTo(C[0],C[1]);
for(var M=2;
M<C.length;
M+=2){N.lineTo(C[M],C[M+1])
}}}});
dojo.declare("dojox.gfx.Image",L.Image,{setShape:function(){F.Image.superclass.setShape.apply(this,arguments);
var C=new Image();
this.surface.downloadImage(C,this.shape.src);
this.canvasImage=C;
return this
},_renderShape:function(C){var M=this.shape;
C.drawImage(this.canvasImage,M.x,M.y,M.width,M.height)
}});
dojo.declare("dojox.gfx.Text",L.Text,{_renderShape:function(C){var M=this.shape
}});
G(F.Text,"setFont");
var A={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"};
dojo.declare("dojox.gfx.Path",F.path.Path,{constructor:function(){this.last={};
this.lastControl={}
},setShape:function(){this.canvasPath=[];
return F.Path.superclass.setShape.apply(this,arguments)
},_updateWithSegment:function(M){var C=dojo.clone(this.last);
this[A[M.action]](this.canvasPath,M.action,M.args);
this.last=C;
F.Path.superclass._updateWithSegment.apply(this,arguments)
},_renderShape:function(N){var C=this.canvasPath;
N.beginPath();
for(var M=0;
M<C.length;
M+=2){N[C[M]].apply(N,C[M+1])
}},_moveToA:function(N,C,M){N.push("moveTo",[M[0],M[1]]);
for(var O=2;
O<M.length;
O+=2){N.push("lineTo",[M[O],M[O+1]])
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl={}
},_moveToR:function(N,C,M){if("x" in this.last){N.push("moveTo",[this.last.x+=M[0],this.last.y+=M[1]])
}else{N.push("moveTo",[this.last.x=M[0],this.last.y=M[1]])
}for(var O=2;
O<M.length;
O+=2){N.push("lineTo",[this.last.x+=M[O],this.last.y+=M[O+1]])
}this.lastControl={}
},_lineToA:function(N,C,M){for(var O=0;
O<M.length;
O+=2){N.push("lineTo",[M[O],M[O+1]])
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl={}
},_lineToR:function(N,C,M){for(var O=0;
O<M.length;
O+=2){N.push("lineTo",[this.last.x+=M[O],this.last.y+=M[O+1]])
}this.lastControl={}
},_hLineToA:function(N,C,M){for(var O=0;
O<M.length;
++O){N.push("lineTo",[M[O],this.last.y])
}this.last.x=M[M.length-1];
this.lastControl={}
},_hLineToR:function(N,C,M){for(var O=0;
O<M.length;
++O){N.push("lineTo",[this.last.x+=M[O],this.last.y])
}this.lastControl={}
},_vLineToA:function(N,C,M){for(var O=0;
O<M.length;
++O){N.push("lineTo",[this.last.x,M[O]])
}this.last.y=M[M.length-1];
this.lastControl={}
},_vLineToR:function(N,C,M){for(var O=0;
O<M.length;
++O){N.push("lineTo",[this.last.x,this.last.y+=M[O]])
}this.lastControl={}
},_curveToA:function(N,C,M){for(var O=0;
O<M.length;
O+=6){N.push("bezierCurveTo",M.slice(O,O+6))
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl.x=M[M.length-4];
this.lastControl.y=M[M.length-3];
this.lastControl.type="C"
},_curveToR:function(N,C,M){for(var O=0;
O<M.length;
O+=6){N.push("bezierCurveTo",[this.last.x+M[O],this.last.y+M[O+1],this.lastControl.x=this.last.x+M[O+2],this.lastControl.y=this.last.y+M[O+3],this.last.x+M[O+4],this.last.y+M[O+5]]);
this.last.x+=M[O+4];
this.last.y+=M[O+5]
}this.lastControl.type="C"
},_smoothCurveToA:function(N,C,M){for(var O=0;
O<M.length;
O+=4){var P=this.lastControl.type=="C";
N.push("bezierCurveTo",[P?2*this.last.x-this.lastControl.x:this.last.x,P?2*this.last.y-this.lastControl.y:this.last.y,M[O],M[O+1],M[O+2],M[O+3]]);
this.lastControl.x=M[O];
this.lastControl.y=M[O+1];
this.lastControl.type="C"
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1]
},_smoothCurveToR:function(N,C,M){for(var O=0;
O<M.length;
O+=4){var P=this.lastControl.type=="C";
N.push("bezierCurveTo",[P?2*this.last.x-this.lastControl.x:this.last.x,P?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+M[O],this.last.y+M[O+1],this.last.x+M[O+2],this.last.y+M[O+3]]);
this.lastControl.x=this.last.x+M[O];
this.lastControl.y=this.last.y+M[O+1];
this.lastControl.type="C";
this.last.x+=M[O+2];
this.last.y+=M[O+3]
}},_qCurveToA:function(N,C,M){for(var O=0;
O<M.length;
O+=4){N.push("quadraticCurveTo",M.slice(O,O+4))
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1];
this.lastControl.x=M[M.length-4];
this.lastControl.y=M[M.length-3];
this.lastControl.type="Q"
},_qCurveToR:function(N,C,M){for(var O=0;
O<M.length;
O+=4){N.push("quadraticCurveTo",[this.lastControl.x=this.last.x+M[O],this.lastControl.y=this.last.y+M[O+1],this.last.x+M[O+2],this.last.y+M[O+3]]);
this.last.x+=M[O+2];
this.last.y+=M[O+3]
}this.lastControl.type="Q"
},_qSmoothCurveToA:function(N,C,M){for(var O=0;
O<M.length;
O+=2){var P=this.lastControl.type=="Q";
N.push("quadraticCurveTo",[this.lastControl.x=P?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=P?2*this.last.y-this.lastControl.y:this.last.y,M[O],M[O+1]]);
this.lastControl.type="Q"
}this.last.x=M[M.length-2];
this.last.y=M[M.length-1]
},_qSmoothCurveToR:function(N,C,M){for(var O=0;
O<M.length;
O+=2){var P=this.lastControl.type=="Q";
N.push("quadraticCurveTo",[this.lastControl.x=P?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=P?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+M[O],this.last.y+M[O+1]]);
this.lastControl.type="Q";
this.last.x+=M[O];
this.last.y+=M[O+1]
}},_arcTo:function(N,C,O){var S=C=="a";
for(var P=0;
P<O.length;
P+=7){var M=O[P+5],Q=O[P+6];
if(S){M+=this.last.x;
Q+=this.last.y
}var R=I.arcAsBezier(this.last,O[P],O[P+1],O[P+2],O[P+3]?1:0,O[P+4]?1:0,M,Q);
dojo.forEach(R,function(T){N.push("bezierCurveTo",T)
});
this.last.x=M;
this.last.y=Q
}this.lastControl={}
},_closePath:function(N,C,M){N.push("closePath",[]);
this.lastControl={}
}});
dojo.forEach(["moveTo","lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(C){G(F.Path,C)
});
dojo.declare("dojox.gfx.TextPath",F.path.TextPath,{_renderShape:function(C){var M=this.shape
}});
dojo.declare("dojox.gfx.Surface",L.Surface,{constructor:function(){L.Container._init.call(this);
this.pendingImageCount=0;
this.makeDirty()
},setDimensions:function(M,C){this.width=F.normalizedLength(M);
this.height=F.normalizedLength(C);
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
}},downloadImage:function(N,M){var C=dojo.hitch(this,this.onImageLoad);
if(!this.pendingImageCount++&&"pendingRender" in this){clearTimeout(this.pendingRender);
delete this.pendingRender
}N.onload=C;
N.onerror=C;
N.onabort=C;
N.src=M
},onImageLoad:function(){if(!--this.pendingImageCount){this.render()
}},getEventSource:function(){return null
},connect:function(){},disconnect:function(){}});
F.createSurface=function(M,P,N){if(!P){P="100%"
}if(!N){N="100%"
}var O=new F.Surface(),Q=dojo.byId(M),C=Q.ownerDocument.createElement("canvas");
C.width=P;
C.height=N;
Q.appendChild(C);
O.rawNode=C;
O.surface=O;
return O
};
var K=L.Container,D={add:function(C){this.surface.makeDirty();
return K.add.apply(this,arguments)
},remove:function(C,M){this.surface.makeDirty();
return K.remove.apply(this,arguments)
},clear:function(){this.surface.makeDirty();
return K.clear.apply(this,arguments)
},_moveChildToFront:function(C){this.surface.makeDirty();
return K._moveChildToFront.apply(this,arguments)
},_moveChildToBack:function(C){this.surface.makeDirty();
return K._moveChildToBack.apply(this,arguments)
}};
dojo.mixin(L.Creator,{createObject:function(N,M){var C=new N();
C.surface=this.surface;
C.setShape(M);
this.add(C);
return C
}});
dojo.extend(F.Group,D);
dojo.extend(F.Group,L.Creator);
dojo.extend(F.Surface,D);
dojo.extend(F.Surface,L.Creator)
})()
};