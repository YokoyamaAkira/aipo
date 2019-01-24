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
},getTransformedBoundingBox:function(){var C=this.getBoundingBox();
if(!C){return null
}var B=this._getRealMatrix();
var E=[];
var D=dojox.gfx.matrix;
E.push(D.multiplyPoint(B,C.x,C.y));
E.push(D.multiplyPoint(B,C.x+C.width,C.y));
E.push(D.multiplyPoint(B,C.x+C.width,C.y+C.height));
E.push(D.multiplyPoint(B,C.x,C.y+C.height));
return E
},getEventSource:function(){return this.rawNode
},setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
return this
},setFill:function(C){if(!C){this.fillStyle=null;
return this
}var B=null;
if(typeof (C)=="object"&&"type" in C){switch(C.type){case"linear":B=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,C);
break;
case"radial":B=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,C);
break;
case"pattern":B=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,C);
break
}}else{B=dojox.gfx.normalizeColor(C)
}this.fillStyle=B;
return this
},setStroke:function(C){if(!C){this.strokeStyle=null;
return this
}if(typeof C=="string"){C={color:C}
}var B=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,C);
B.color=dojox.gfx.normalizeColor(B.color);
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
},_setParent:function(C,B){this.parent=C;
return this._updateParentMatrix(B)
},_updateParentMatrix:function(B){this.parentMatrix=B?dojox.gfx.matrix.clone(B):null;
return this._applyTransform()
},_getRealMatrix:function(){var B=this.matrix;
var C=this.parent;
while(C){if(C.matrix){B=dojox.gfx.matrix.multiply(C.matrix,B)
}C=C.parent
}return B
}});
dojox.gfx.shape._eventsProcessing={connect:function(C,B,D){return arguments.length>2?A.connect(this.getEventSource(),C,B,D):A.connect(this.getEventSource(),C,B)
},disconnect:function(B){A.disconnect(B)
}};
A.extend(dojox.gfx.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){this.children=[]
},add:function(B){var C=B.getParent();
if(C){C.remove(B,true)
}this.children.push(B);
return B._setParent(this,this._getRealMatrix())
},remove:function(B,D){for(var C=0;
C<this.children.length;
++C){if(this.children[C]==B){if(D){}else{B._setParent(null,null)
}this.children.splice(C,1);
break
}}return this
},clear:function(){this.children=[];
return this
},_moveChildToFront:function(B){for(var C=0;
C<this.children.length;
++C){if(this.children[C]==B){this.children.splice(C,1);
this.children.push(B);
break
}}return this
},_moveChildToBack:function(B){for(var C=0;
C<this.children.length;
++C){if(this.children[C]==B){this.children.splice(C,1);
this.children.unshift(B);
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
},setShape:function(C,B){if(C&&C instanceof Array){dojox.gfx.Shape.prototype.setShape.call(this,{points:C});
if(B&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{dojox.gfx.Shape.prototype.setShape.call(this,C)
}return this
},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){var E=this.shape.points;
var B=E.length;
var D=E[0];
var F={l:D.x,t:D.y,r:D.x,b:D.y};
for(var C=1;
C<B;
++C){D=E[C];
if(F.l>D.x){F.l=D.x
}if(F.r<D.x){F.r=D.x
}if(F.t>D.y){F.t=D.y
}if(F.b<D.y){F.b=D.y
}}this.bbox={x:F.l,y:F.t,width:F.r-F.l,height:F.b-F.t}
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
},createObject:function(C,B){return null
}}
}}});