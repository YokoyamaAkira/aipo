if(!dojo._hasResource["dojox.gfx.silverlight"]){dojo._hasResource["dojox.gfx.silverlight"]=true;
dojo.provide("dojox.gfx.silverlight");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.experimental("dojox.gfx.silverlight");
dojox.gfx.silverlight.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
dojox.gfx.silverlight.fontweight={normal:400,bold:700};
dojox.gfx.silverlight.caps={butt:"Flat",round:"Round",square:"Square"};
dojox.gfx.silverlight.joins={bevel:"Bevel",round:"Round"};
dojox.gfx.silverlight.fonts={serif:"Times New Roman",times:"Times New Roman","sans-serif":"Arial",helvetica:"Arial",monotone:"Courier New",courier:"Courier New"};
dojox.gfx.silverlight.hexColor=function(B){var D=dojox.gfx.normalizeColor(B),C=D.toHex(),A=Math.round(D.a*255);
A=(A<0?0:A>255?255:A).toString(16);
return"#"+(A.length<2?"0"+A:A)+C.slice(1)
};
dojo.extend(dojox.gfx.Shape,{setFill:function(K){var B=this.rawNode.getHost().content,A=this.rawNode,G;
if(!K){this.fillStyle=null;
this._setFillAttr(null);
return this
}if(typeof (K)=="object"&&"type" in K){switch(K.type){case"linear":this.fillStyle=G=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,K);
var E=B.createFromXaml("<LinearGradientBrush/>");
E.mappingMode="Absolute";
E.startPoint=G.x1+","+G.y1;
E.endPoint=G.x2+","+G.y2;
dojo.forEach(G.colors,function(M){var L=B.createFromXaml("<GradientStop/>");
L.offset=M.offset;
L.color=dojox.gfx.silverlight.hexColor(M.color);
E.gradientStops.add(L)
});
this._setFillAttr(E);
break;
case"radial":this.fillStyle=G=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,K);
var H=B.createFromXaml("<RadialGradientBrush/>"),I=A.width,F=A.height,D=this.rawNode["Canvas.Left"],J=this.rawNode["Canvas.Top"];
H.center=(G.cx-D)/I+","+(G.cy-J)/F;
H.radiusX=G.r/I;
H.radiusY=G.r/F;
dojo.forEach(G.colors,function(M){var L=B.createFromXaml("<GradientStop/>");
L.offset=M.offset;
L.color=dojox.gfx.silverlight.hexColor(M.color);
H.gradientStops.add(L)
});
this._setFillAttr(H);
break;
case"pattern":this.fillStyle=null;
this._setFillAttr(null);
break
}return this
}this.fillStyle=G=dojox.gfx.normalizeColor(K);
var C=B.createFromXaml("<SolidColorBrush/>");
C.color=G.toHex();
C.opacity=G.a;
this._setFillAttr(C);
return this
},_setFillAttr:function(A){this.rawNode.fill=A
},setStroke:function(G){var F=this.rawNode.getHost().content,E=this.rawNode;
if(!G){this.strokeStyle=null;
E.stroke=null;
return this
}if(typeof G=="string"){G={color:G}
}var D=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,G);
D.color=dojox.gfx.normalizeColor(D.color);
if(D){var A=F.createFromXaml("<SolidColorBrush/>");
A.color=D.color.toHex();
A.opacity=D.color.a;
E.stroke=A;
E.strokeThickness=D.width;
E.strokeStartLineCap=E.strokeEndLineCap=E.strokeDashCap=dojox.gfx.silverlight.caps[D.cap];
if(typeof D.join=="number"){E.strokeLineJoin="Miter";
E.strokeMiterLimit=D.join
}else{E.strokeLineJoin=dojox.gfx.silverlight.joins[D.join]
}var B=D.style.toLowerCase();
if(B in dojox.gfx.silverlight.dasharray){B=dojox.gfx.silverlight.dasharray[B]
}if(B instanceof Array){B=dojo.clone(B);
if(D.cap!="butt"){for(var C=0;
C<B.length;
C+=2){--B[C];
if(B[C]<1){B[C]=1
}}for(var C=1;
C<B.length;
C+=2){++B[C]
}}E.strokeDashArray=B.join(",")
}else{E.strokeDashArray=null
}}return this
},_getParentSurface:function(){var A=this.parent;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}return A
},_applyTransform:function(){var B=this.matrix,C=this.rawNode;
if(B){var D=this.rawNode.getHost().content,A=D.createFromXaml("<MatrixTransform/>"),E=D.createFromXaml("<Matrix/>");
E.m11=B.xx;
E.m21=B.xy;
E.m12=B.yx;
E.m22=B.yy;
E.offsetX=B.dx;
E.offsetY=B.dy;
A.matrix=E;
C.renderTransform=A
}else{C.renderTransform=null
}return this
},setRawNode:function(A){A.fill=null;
A.stroke=null;
this.rawNode=A
},_moveToFront:function(){var B=this.parent.rawNode.children,A=this.rawNode;
B.remove(A);
B.add(A);
return this
},_moveToBack:function(){var B=this.parent.rawNode.children,A=this.rawNode;
B.remove(A);
B.insert(0,A);
return this
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Group.nodeType="Canvas";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode,C=this.shape;
B["Canvas.Left"]=C.x;
B["Canvas.Top"]=C.y;
B.width=C.width;
B.height=C.height;
B.radiusX=B.radiusY=C.r;
return this
}});
dojox.gfx.Rect.nodeType="Rectangle";
dojo.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode,C=this.shape;
B["Canvas.Left"]=C.cx-C.rx;
B["Canvas.Top"]=C.cy-C.ry;
B.width=2*C.rx;
B.height=2*C.ry;
return this
}});
dojox.gfx.Ellipse.nodeType="Ellipse";
dojo.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode,C=this.shape;
B["Canvas.Left"]=C.cx-C.r;
B["Canvas.Top"]=C.cy-C.r;
B.width=B.height=2*C.r;
return this
}});
dojox.gfx.Circle.nodeType="Ellipse";
dojo.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode,C=this.shape;
B.x1=C.x1;
B.y1=C.y1;
B.x2=C.x2;
B.y2=C.y2;
return this
}});
dojox.gfx.Line.nodeType="Line";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(D,A){if(D&&D instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:D});
if(A&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,D)
}this.box=null;
var E=this.shape.points,C=[];
for(var B=0;
B<E.length;
++B){if(typeof E[B]=="number"){C.push(E[B],E[++B])
}else{C.push(E[B].x,E[B].y)
}}this.rawNode.points=C.join(",");
return this
}});
dojox.gfx.Polyline.nodeType="Polyline";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode,C=this.shape;
B["Canvas.Left"]=C.x;
B["Canvas.Top"]=C.y;
B.width=C.width;
B.height=C.height;
B.source=C.src;
return this
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Image.nodeType="Image";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var C=this.rawNode,B=this.shape;
C.text=B.text;
C.textDecorations=B.decoration=="underline"?"Underline":"None";
C["Canvas.Left"]=-10000;
C["Canvas.Top"]=-10000;
window.setTimeout(dojo.hitch(this,"_delayAlignment"),0);
return this
},_delayAlignment:function(){var F=this.rawNode,E=this.shape,C=F.actualWidth,D=F.actualHeight,A=E.x,G=E.y-D*0.75;
switch(E.align){case"middle":A-=C/2;
break;
case"end":A-=C;
break
}var B=this.matrix?dojox.gfx.matrix.multiplyPoint(this.matrix,A,G):{x:A,y:G};
F["Canvas.Left"]=B.x;
F["Canvas.Top"]=B.y
},setStroke:function(){return this
},_setFillAttr:function(A){this.rawNode.foreground=A
},setRawNode:function(A){this.rawNode=A
},_applyTransform:function(){var B=this.matrix,C=this.rawNode;
if(B){B=dojox.gfx.matrix.normalize([1/100,B,100]);
var D=this.rawNode.getHost().content,A=D.createFromXaml("<MatrixTransform/>"),E=D.createFromXaml("<Matrix/>");
E.m11=B.xx;
E.m21=B.xy;
E.m12=B.yx;
E.m22=B.yy;
E.offsetX=B.dx;
E.offsetY=B.dy;
A.matrix=E;
C.renderTransform=A
}else{C.renderTransform=null
}return this
},getTextWidth:function(){return this.rawNode.actualWidth
}});
dojox.gfx.Text.nodeType="TextBlock";
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(A){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var B=this.shape.path;
if(typeof (B)=="string"){this.rawNode.data=B?B:null
}},setShape:function(A){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
var B=this.shape.path;
this.rawNode.data=B?B:null;
return this
}});
dojox.gfx.Path.nodeType="Path";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(A){},setShape:function(A){},_setText:function(){}});
dojox.gfx.TextPath.nodeType="text";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setDimensions:function(B,A){this.width=dojox.gfx.normalizedLength(B);
this.height=dojox.gfx.normalizedLength(A);
var C=this.rawNode&&this.rawNode.getHost();
if(C){C.width=B;
C.height=A
}return this
},getDimensions:function(){var B=this.rawNode&&this.rawNode.getHost();
var A=B?{width:B.content.actualWidth,height:B.content.actualHeight}:null;
if(A.width<=0){A.width=this.width
}if(A.height<=0){A.height=this.height
}return A
}});
dojox.gfx.silverlight.surfaces={};
dojox.gfx.createSurface=function(B,E,A){var D=new dojox.gfx.Surface();
B=dojo.byId(B);
var C=B.ownerDocument.createElement("script");
C.type="text/xaml";
C.id=dojox.gfx._base._getUniqueId();
C.text="<Canvas xmlns='http://schemas.microsoft.com/client/2007' Name='"+dojox.gfx._base._getUniqueId()+"'/>";
document.body.appendChild(C);
var F=dojox.gfx._base._getUniqueId();
Silverlight.createObject("#"+C.id,B,F,{width:String(E),height:String(A),inplaceInstallPrompt:"false",background:"transparent",isWindowless:"true",framerate:"24",version:"1.0"},{},null,null);
D.rawNode=dojo.byId(F).content.root;
dojox.gfx.silverlight.surfaces[D.rawNode.name]=B;
D.width=dojox.gfx.normalizedLength(E);
D.height=dojox.gfx.normalizedLength(A);
return D
};
dojox.gfx.silverlight.Font={_setFont:function(){var E=this.fontStyle,C=this.rawNode,D=dojox.gfx.silverlight.fontweight,B=dojox.gfx.silverlight.fonts,A=E.family.toLowerCase();
C.fontStyle=E.style=="italic"?"Italic":"Normal";
C.fontWeight=E.weight in D?D[E.weight]:E.weight;
C.fontSize=dojox.gfx.normalizedLength(E.size);
C.fontFamily=A in B?B[A]:E.family
}};
dojox.gfx.silverlight.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){dojox.gfx.shape.Container.add.apply(this,arguments);
this.rawNode.children.add(A.rawNode)
}return this
},remove:function(A,C){if(this==A.getParent()){var B=A.rawNode.getParent();
if(B){B.children.remove(A.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){this.rawNode.children.clear();
return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createObject:function(D,B){if(!this.rawNode){return null
}var A=new D();
var C=this.rawNode.getHost().content.createFromXaml("<"+D.nodeType+"/>");
A.setRawNode(C);
A.setShape(B);
this.add(A);
return A
}});
dojo.extend(dojox.gfx.Text,dojox.gfx.silverlight.Font);
dojo.extend(dojox.gfx.Group,dojox.gfx.silverlight.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.silverlight.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator);
(function(){var A=dojox.gfx.silverlight.surfaces;
var B=function(I,F){var J={target:I,currentTarget:I,preventDefault:function(){},stopPropagation:function(){}};
if(F){J.ctrlKey=F.ctrl;
J.shiftKey=F.shift;
var K=F.getPosition(null);
J.x=J.offsetX=J.layerX=K.x;
J.y=J.offsetY=J.layerY=K.y;
var H=A[I.getHost().content.root.name];
var G=dojo._abs(H);
J.clientX=G.x+K.x;
J.clientY=G.y+K.y
}return J
};
var D=function(G,F){var H={keyCode:F.platformKeyCode,ctrlKey:F.ctrl,shiftKey:F.shift};
return H
};
var E={onclick:{name:"MouseLeftButtonUp",fix:B},onmouseenter:{name:"MouseEnter",fix:B},onmouseleave:{name:"MouseLeave",fix:B},onmousedown:{name:"MouseLeftButtonDown",fix:B},onmouseup:{name:"MouseLeftButtonUp",fix:B},onmousemove:{name:"MouseMove",fix:B},onkeydown:{name:"KeyDown",fix:D},onkeyup:{name:"KeyUp",fix:D}};
var C={connect:function(G,F,J){var H,I=G in E?E[G]:{name:G,fix:function(){return{}
}};
if(arguments.length>2){H=this.getEventSource().addEventListener(I.name,function(L,K){dojo.hitch(F,J)(I.fix(L,K))
})
}else{H=this.getEventSource().addEventListener(I.name,function(L,K){F(I.fix(L,K))
})
}return{name:I.name,token:H}
},disconnect:function(F){this.getEventSource().removeEventListener(F.name,F.token)
}};
dojo.extend(dojox.gfx.Shape,C);
dojo.extend(dojox.gfx.Surface,C);
dojox.gfx.equalSources=function(G,F){return G&&F&&G.equals(F)
}
})()
};