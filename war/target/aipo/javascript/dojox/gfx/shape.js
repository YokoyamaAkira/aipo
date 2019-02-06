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
},getTransformedBoundingBox:function(){var B=this.getBoundingBox();
if(!B){return null
}var A=this._getRealMatrix();
var D=[];
var C=dojox.gfx.matrix;
D.push(C.multiplyPoint(A,B.x,B.y));
D.push(C.multiplyPoint(A,B.x+B.width,B.y));
D.push(C.multiplyPoint(A,B.x+B.width,B.y+B.height));
D.push(C.multiplyPoint(A,B.x,B.y+B.height));
return D
},getEventSource:function(){return this.rawNode
},setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
return this
},setFill:function(B){if(!B){this.fillStyle=null;
return this
}var A=null;
if(typeof (B)=="object"&&"type" in B){switch(B.type){case"linear":A=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,B);
break;
case"radial":A=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,B);
break;
case"pattern":A=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,B);
break
}}else{A=dojox.gfx.normalizeColor(B)
}this.fillStyle=A;
return this
},setStroke:function(B){if(!B){this.strokeStyle=null;
return this
}if(typeof B=="string"){B={color:B}
}var A=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,B);
A.color=dojox.gfx.normalizeColor(A.color);
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
},_setParent:function(B,A){this.parent=B;
return this._updateParentMatrix(A)
},_updateParentMatrix:function(A){this.parentMatrix=A?dojox.gfx.matrix.clone(A):null;
return this._applyTransform()
},_getRealMatrix:function(){var A=this.matrix;
var B=this.parent;
while(B){if(B.matrix){A=dojox.gfx.matrix.multiply(B.matrix,A)
}B=B.parent
}return A
}});
dojox.gfx.shape._eventsProcessing={connect:function(B,A,C){return arguments.length>2?dojo.connect(this.getEventSource(),B,A,C):dojo.connect(this.getEventSource(),B,A)
},disconnect:function(A){dojo.disconnect(A)
}};
dojo.extend(dojox.gfx.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){this.children=[]
},add:function(A){var B=A.getParent();
if(B){B.remove(A,true)
}this.children.push(A);
return A._setParent(this,this._getRealMatrix())
},remove:function(A,C){for(var B=0;
B<this.children.length;
++B){if(this.children[B]==A){if(C){}else{A._setParent(null,null)
}this.children.splice(B,1);
break
}}return this
},clear:function(){this.children=[];
return this
},_moveChildToFront:function(A){for(var B=0;
B<this.children.length;
++B){if(this.children[B]==A){this.children.splice(B,1);
this.children.push(A);
break
}}return this
},_moveChildToBack:function(A){for(var B=0;
B<this.children.length;
++B){if(this.children[B]==A){this.children.splice(B,1);
this.children.unshift(A);
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
},setShape:function(B,A){if(B&&B instanceof Array){dojox.gfx.Shape.prototype.setShape.call(this,{points:B});
if(A&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{dojox.gfx.Shape.prototype.setShape.call(this,B)
}return this
},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var D=this.shape.points;
var A=D.length;
var C=D[0];
var E={l:C.x,t:C.y,r:C.x,b:C.y};
for(var B=1;
B<A;
++B){C=D[B];
if(E.l>C.x){E.l=C.x
}if(E.r<C.x){E.r=C.x
}if(E.t>C.y){E.t=C.y
}if(E.b<C.y){E.b=C.y
}}this.bbox={x:E.l,y:E.t,width:E.r-E.l,height:E.b-E.t}
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
},createObject:function(B,A){return null
}}
};