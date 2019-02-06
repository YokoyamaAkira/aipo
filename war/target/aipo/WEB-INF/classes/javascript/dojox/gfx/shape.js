if(!dojo._hasResource["dojox.gfx.shape"]){dojo._hasResource["dojox.gfx.shape"]=true;
dojo.provide("dojox.gfx.shape");
dojo.require("dojox.gfx._base");
dojo.declare("dojox.gfx.Shape",null,{constructor:function(){this.rawNode=null;
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
},getTransformedBoundingBox:function(){var A=this.getBoundingBox();
if(!A){return null
}var D=this._getRealMatrix();
var C=[];
var B=dojox.gfx.matrix;
C.push(B.multiplyPoint(D,A.x,A.y));
C.push(B.multiplyPoint(D,A.x+A.width,A.y));
C.push(B.multiplyPoint(D,A.x+A.width,A.y+A.height));
C.push(B.multiplyPoint(D,A.x,A.y+A.height));
return C
},getEventSource:function(){return this.rawNode
},setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
return this
},setFill:function(A){if(!A){this.fillStyle=null;
return this
}var B=null;
if(typeof (A)=="object"&&"type" in A){switch(A.type){case"linear":B=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,A);
break;
case"radial":B=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,A);
break;
case"pattern":B=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,A);
break
}}else{B=dojox.gfx.normalizeColor(A)
}this.fillStyle=B;
return this
},setStroke:function(A){if(!A){this.strokeStyle=null;
return this
}if(typeof A=="string"){A={color:A}
}var B=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,A);
B.color=dojox.gfx.normalizeColor(B.color);
return this
},setTransform:function(A){this.matrix=dojox.gfx.matrix.clone(A?dojox.gfx.matrix.normalize(A):dojox.gfx.matrix.identity);
return this._applyTransform()
},_applyTransform:function(){return this
},moveToFront:function(){var A=this.getParent();
if(A){A._moveChildToFront(this);
this._moveToFront()
}return this
},moveToBack:function(){var A=this.getParent();
if(A){A._moveChildToBack(this);
this._moveToBack()
}return this
},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},applyLeftTransform:function(A){return A?this.setTransform([A,this.matrix]):this
},applyTransform:function(A){return A?this.setTransform([this.matrix,A]):this
},removeShape:function(A){if(this.parent){this.parent.remove(this,A)
}return this
},_setParent:function(A,B){this.parent=A;
return this._updateParentMatrix(B)
},_updateParentMatrix:function(A){this.parentMatrix=A?dojox.gfx.matrix.clone(A):null;
return this._applyTransform()
},_getRealMatrix:function(){var B=this.matrix;
var A=this.parent;
while(A){if(A.matrix){B=dojox.gfx.matrix.multiply(A.matrix,B)
}A=A.parent
}return B
}});
dojox.gfx.shape._eventsProcessing={connect:function(A,C,B){return arguments.length>2?dojo.connect(this.getEventSource(),A,C,B):dojo.connect(this.getEventSource(),A,C)
},disconnect:function(A){dojo.disconnect(A)
}};
dojo.extend(dojox.gfx.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){this.children=[]
},add:function(B){var A=B.getParent();
if(A){A.remove(B,true)
}this.children.push(B);
return B._setParent(this,this._getRealMatrix())
},remove:function(C,B){for(var A=0;
A<this.children.length;
++A){if(this.children[A]==C){if(B){}else{C._setParent(null,null)
}this.children.splice(A,1);
break
}}return this
},clear:function(){this.children=[];
return this
},_moveChildToFront:function(B){for(var A=0;
A<this.children.length;
++A){if(this.children[A]==B){this.children.splice(A,1);
this.children.push(B);
break
}}return this
},_moveChildToBack:function(B){for(var A=0;
A<this.children.length;
++A){if(this.children[A]==B){this.children.splice(A,1);
this.children.unshift(B);
break
}}return this
}};
dojo.declare("dojox.gfx.shape.Surface",null,{constructor:function(){this.rawNode=null
},getEventSource:function(){return this.rawNode
},_getRealMatrix:function(){return null
}});
dojo.extend(dojox.gfx.shape.Surface,dojox.gfx.shape._eventsProcessing);
dojo.declare("dojox.gfx.Point",null,{});
dojo.declare("dojox.gfx.Rectangle",null,{});
dojo.declare("dojox.gfx.shape.Rect",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultRect);
this.rawNode=A
},getBoundingBox:function(){return this.shape
}});
dojo.declare("dojox.gfx.shape.Ellipse",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultEllipse);
this.rawNode=A
},getBoundingBox:function(){if(!this.bbox){var A=this.shape;
this.bbox={x:A.cx-A.rx,y:A.cy-A.ry,width:2*A.rx,height:2*A.ry}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Circle",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultCircle);
this.rawNode=A
},getBoundingBox:function(){if(!this.bbox){var A=this.shape;
this.bbox={x:A.cx-A.r,y:A.cy-A.r,width:2*A.r,height:2*A.r}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Line",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultLine);
this.rawNode=A
},getBoundingBox:function(){if(!this.bbox){var A=this.shape;
this.bbox={x:Math.min(A.x1,A.x2),y:Math.min(A.y1,A.y2),width:Math.abs(A.x2-A.x1),height:Math.abs(A.y2-A.y1)}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Polyline",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultPolyline);
this.rawNode=A
},setShape:function(A,B){if(A&&A instanceof Array){dojox.gfx.Shape.prototype.setShape.call(this,{points:A});
if(B&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{dojox.gfx.Shape.prototype.setShape.call(this,A)
}return this
},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var C=this.shape.points;
var E=C.length;
var B=C[0];
var D={l:B.x,t:B.y,r:B.x,b:B.y};
for(var A=1;
A<E;
++A){B=C[A];
if(D.l>B.x){D.l=B.x
}if(D.r<B.x){D.r=B.x
}if(D.t>B.y){D.t=B.y
}if(D.b<B.y){D.b=B.y
}}this.bbox={x:D.l,y:D.t,width:D.r-D.l,height:D.b-D.t}
}return this.bbox
}});
dojo.declare("dojox.gfx.shape.Image",dojox.gfx.Shape,{constructor:function(A){this.shape=dojo.clone(dojox.gfx.defaultImage);
this.rawNode=A
},getBoundingBox:function(){return this.shape
},setStroke:function(){return this
},setFill:function(){return this
}});
dojo.declare("dojox.gfx.shape.Text",dojox.gfx.Shape,{constructor:function(A){this.fontStyle=null;
this.shape=dojo.clone(dojox.gfx.defaultText);
this.rawNode=A
},setFont:function(A){this.fontStyle=typeof A=="string"?dojox.gfx.splitFontString(A):dojox.gfx.makeParameters(dojox.gfx.defaultFont,A);
this._setFont();
return this
}});
dojox.gfx.shape.Creator={createShape:function(A){switch(A.type){case dojox.gfx.defaultPath.type:return this.createPath(A);
case dojox.gfx.defaultRect.type:return this.createRect(A);
case dojox.gfx.defaultCircle.type:return this.createCircle(A);
case dojox.gfx.defaultEllipse.type:return this.createEllipse(A);
case dojox.gfx.defaultLine.type:return this.createLine(A);
case dojox.gfx.defaultPolyline.type:return this.createPolyline(A);
case dojox.gfx.defaultImage.type:return this.createImage(A);
case dojox.gfx.defaultText.type:return this.createText(A);
case dojox.gfx.defaultTextPath.type:return this.createTextPath(A)
}return null
},createGroup:function(){return this.createObject(dojox.gfx.Group)
},createRect:function(A){return this.createObject(dojox.gfx.Rect,A)
},createEllipse:function(A){return this.createObject(dojox.gfx.Ellipse,A)
},createCircle:function(A){return this.createObject(dojox.gfx.Circle,A)
},createLine:function(A){return this.createObject(dojox.gfx.Line,A)
},createPolyline:function(A){return this.createObject(dojox.gfx.Polyline,A)
},createImage:function(A){return this.createObject(dojox.gfx.Image,A)
},createText:function(A){return this.createObject(dojox.gfx.Text,A)
},createPath:function(A){return this.createObject(dojox.gfx.Path,A)
},createTextPath:function(A){return this.createObject(dojox.gfx.TextPath,{}).setText(A)
},createObject:function(A,B){return null
}}
};