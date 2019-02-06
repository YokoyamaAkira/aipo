dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.shape"],["require","dojox.gfx._base"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.shape"]){A._hasResource["dojox.gfx.shape"]=true;
A.provide("dojox.gfx.shape");
A.require("dojox.gfx._base");
A.declare("dojox.gfx.Shape",null,{constructor:function(){this.rawNode=null;
this.shape=null;
this.matrix=null;
this.fillStyle=null;
this.strokeStyle=null;
this.bbox=null;
this.parent=null;
this.parentMatrix=null
},getNode:function(){return this.rawNode
},getShape:function(){return this.shape
},getTransform:function(){return this.matrix
},getFill:function(){return this.fillStyle
},getStroke:function(){return this.strokeStyle
},getParent:function(){return this.parent
},getBoundingBox:function(){return this.bbox
},getTransformedBoundingBox:function(){var D=this.getBoundingBox();
if(!D){return null
}var C=this._getRealMatrix();
var B=[];
var E=dojox.gfx.matrix;
B.push(E.multiplyPoint(C,D.x,D.y));
B.push(E.multiplyPoint(C,D.x+D.width,D.y));
B.push(E.multiplyPoint(C,D.x+D.width,D.y+D.height));
B.push(E.multiplyPoint(C,D.x,D.y+D.height));
return B
},getEventSource:function(){return this.rawNode
},setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
return this
},setFill:function(B){if(!B){this.fillStyle=null;
return this
}var C=null;
if(typeof (B)=="object"&&"type" in B){switch(B.type){case"linear":C=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,B);
break;
case"radial":C=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,B);
break;
case"pattern":C=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,B);
break
}}else{C=dojox.gfx.normalizeColor(B)
}this.fillStyle=C;
return this
},setStroke:function(B){if(!B){this.strokeStyle=null;
return this
}if(typeof B=="string"){B={color:B}
}var C=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,B);
C.color=dojox.gfx.normalizeColor(C.color);
return this
},setTransform:function(B){this.matrix=dojox.gfx.matrix.clone(B?dojox.gfx.matrix.normalize(B):dojox.gfx.matrix.identity);
return this._applyTransform()
},_applyTransform:function(){return this
},moveToFront:function(){var B=this.getParent();
if(B){B._moveChildToFront(this);
this._moveToFront()
}return this
},moveToBack:function(){var B=this.getParent();
if(B){B._moveChildToBack(this);
this._moveToBack()
}return this
},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(B){return B?this.setTransform([this.matrix,B]):this
},applyLeftTransform:function(B){return B?this.setTransform([B,this.matrix]):this
},applyTransform:function(B){return B?this.setTransform([this.matrix,B]):this
},removeShape:function(B){if(this.parent){this.parent.remove(this,B)
}return this
},_setParent:function(B,C){this.parent=B;
return this._updateParentMatrix(C)
},_updateParentMatrix:function(B){this.parentMatrix=B?dojox.gfx.matrix.clone(B):null;
return this._applyTransform()
},_getRealMatrix:function(){var C=this.matrix;
var B=this.parent;
while(B){if(B.matrix){C=dojox.gfx.matrix.multiply(B.matrix,C)
}B=B.parent
}return C
}});
dojox.gfx.shape._eventsProcessing={connect:function(D,C,B){return arguments.length>2?A.connect(this.getEventSource(),D,C,B):A.connect(this.getEventSource(),D,C)
},disconnect:function(B){A.disconnect(B)
}};
A.extend(dojox.gfx.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){this.children=[]
},add:function(C){var B=C.getParent();
if(B){B.remove(C,true)
}this.children.push(C);
return C._setParent(this,this._getRealMatrix())
},remove:function(C,B){for(var D=0;
D<this.children.length;
++D){if(this.children[D]==C){if(B){}else{C._setParent(null,null)
}this.children.splice(D,1);
break
}}return this
},clear:function(){this.children=[];
return this
},_moveChildToFront:function(C){for(var B=0;
B<this.children.length;
++B){if(this.children[B]==C){this.children.splice(B,1);
this.children.push(C);
break
}}return this
},_moveChildToBack:function(C){for(var B=0;
B<this.children.length;
++B){if(this.children[B]==C){this.children.splice(B,1);
this.children.unshift(C);
break
}}return this
}};
A.declare("dojox.gfx.shape.Surface",null,{constructor:function(){this.rawNode=null
},getEventSource:function(){return this.rawNode
},_getRealMatrix:function(){return null
}});
A.extend(dojox.gfx.shape.Surface,dojox.gfx.shape._eventsProcessing);
A.declare("dojox.gfx.Point",null,{});
A.declare("dojox.gfx.Rectangle",null,{});
A.declare("dojox.gfx.shape.Rect",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultRect);
this.rawNode=B
},getBoundingBox:function(){return this.shape
}});
A.declare("dojox.gfx.shape.Ellipse",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultEllipse);
this.rawNode=B
},getBoundingBox:function(){if(!this.bbox){var B=this.shape;
this.bbox={x:B.cx-B.rx,y:B.cy-B.ry,width:2*B.rx,height:2*B.ry}
}return this.bbox
}});
A.declare("dojox.gfx.shape.Circle",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultCircle);
this.rawNode=B
},getBoundingBox:function(){if(!this.bbox){var B=this.shape;
this.bbox={x:B.cx-B.r,y:B.cy-B.r,width:2*B.r,height:2*B.r}
}return this.bbox
}});
A.declare("dojox.gfx.shape.Line",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultLine);
this.rawNode=B
},getBoundingBox:function(){if(!this.bbox){var B=this.shape;
this.bbox={x:Math.min(B.x1,B.x2),y:Math.min(B.y1,B.y2),width:Math.abs(B.x2-B.x1),height:Math.abs(B.y2-B.y1)}
}return this.bbox
}});
A.declare("dojox.gfx.shape.Polyline",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultPolyline);
this.rawNode=B
},setShape:function(B,C){if(B&&B instanceof Array){dojox.gfx.Shape.prototype.setShape.call(this,{points:B});
if(C&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{dojox.gfx.Shape.prototype.setShape.call(this,B)
}return this
},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var F=this.shape.points;
var C=F.length;
var E=F[0];
var B={l:E.x,t:E.y,r:E.x,b:E.y};
for(var D=1;
D<C;
++D){E=F[D];
if(B.l>E.x){B.l=E.x
}if(B.r<E.x){B.r=E.x
}if(B.t>E.y){B.t=E.y
}if(B.b<E.y){B.b=E.y
}}this.bbox={x:B.l,y:B.t,width:B.r-B.l,height:B.b-B.t}
}return this.bbox
}});
A.declare("dojox.gfx.shape.Image",dojox.gfx.Shape,{constructor:function(B){this.shape=A.clone(dojox.gfx.defaultImage);
this.rawNode=B
},getBoundingBox:function(){return this.shape
},setStroke:function(){return this
},setFill:function(){return this
}});
A.declare("dojox.gfx.shape.Text",dojox.gfx.Shape,{constructor:function(B){this.fontStyle=null;
this.shape=A.clone(dojox.gfx.defaultText);
this.rawNode=B
},setFont:function(B){this.fontStyle=typeof B=="string"?dojox.gfx.splitFontString(B):dojox.gfx.makeParameters(dojox.gfx.defaultFont,B);
this._setFont();
return this
}});
dojox.gfx.shape.Creator={createShape:function(B){switch(B.type){case dojox.gfx.defaultPath.type:return this.createPath(B);
case dojox.gfx.defaultRect.type:return this.createRect(B);
case dojox.gfx.defaultCircle.type:return this.createCircle(B);
case dojox.gfx.defaultEllipse.type:return this.createEllipse(B);
case dojox.gfx.defaultLine.type:return this.createLine(B);
case dojox.gfx.defaultPolyline.type:return this.createPolyline(B);
case dojox.gfx.defaultImage.type:return this.createImage(B);
case dojox.gfx.defaultText.type:return this.createText(B);
case dojox.gfx.defaultTextPath.type:return this.createTextPath(B)
}return null
},createGroup:function(){return this.createObject(dojox.gfx.Group)
},createRect:function(B){return this.createObject(dojox.gfx.Rect,B)
},createEllipse:function(B){return this.createObject(dojox.gfx.Ellipse,B)
},createCircle:function(B){return this.createObject(dojox.gfx.Circle,B)
},createLine:function(B){return this.createObject(dojox.gfx.Line,B)
},createPolyline:function(B){return this.createObject(dojox.gfx.Polyline,B)
},createImage:function(B){return this.createObject(dojox.gfx.Image,B)
},createText:function(B){return this.createObject(dojox.gfx.Text,B)
},createPath:function(B){return this.createObject(dojox.gfx.Path,B)
},createTextPath:function(B){return this.createObject(dojox.gfx.TextPath,{}).setText(B)
},createObject:function(B,C){return null
}}
}}});