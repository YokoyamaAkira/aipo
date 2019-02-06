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
dojox.gfx.silverlight.hexColor=function(A){var C=dojox.gfx.normalizeColor(A),B=C.toHex(),D=Math.round(C.a*255);
D=(D<0?0:D>255?255:D).toString(16);
return"#"+(D.length<2?"0"+D:D)+B.slice(1)
};
dojo.extend(dojox.gfx.Shape,{setFill:function(G){var I=this.rawNode.getHost().content,H=this.rawNode,C;
if(!G){this.fillStyle=null;
this._setFillAttr(null);
return this
}if(typeof (G)=="object"&&"type" in G){switch(G.type){case"linear":this.fillStyle=C=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,G);
var A=I.createFromXaml("<LinearGradientBrush/>");
A.mappingMode="Absolute";
A.startPoint=C.x1+","+C.y1;
A.endPoint=C.x2+","+C.y2;
dojo.forEach(C.colors,function(M){var L=I.createFromXaml("<GradientStop/>");
L.offset=M.offset;
L.color=dojox.gfx.silverlight.hexColor(M.color);
A.gradientStops.add(L)
});
this._setFillAttr(A);
break;
case"radial":this.fillStyle=C=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,G);
var D=I.createFromXaml("<RadialGradientBrush/>"),E=H.width,B=H.height,K=this.rawNode["Canvas.Left"],F=this.rawNode["Canvas.Top"];
D.center=(C.cx-K)/E+","+(C.cy-F)/B;
D.radiusX=C.r/E;
D.radiusY=C.r/B;
dojo.forEach(C.colors,function(M){var L=I.createFromXaml("<GradientStop/>");
L.offset=M.offset;
L.color=dojox.gfx.silverlight.hexColor(M.color);
D.gradientStops.add(L)
});
this._setFillAttr(D);
break;
case"pattern":this.fillStyle=null;
this._setFillAttr(null);
break
}return this
}this.fillStyle=C=dojox.gfx.normalizeColor(G);
var J=I.createFromXaml("<SolidColorBrush/>");
J.color=C.toHex();
J.opacity=C.a;
this._setFillAttr(J);
return this
},_setFillAttr:function(A){this.rawNode.fill=A
},setStroke:function(D){var C=this.rawNode.getHost().content,B=this.rawNode;
if(!D){this.strokeStyle=null;
B.stroke=null;
return this
}if(typeof D=="string"){D={color:D}
}var A=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,D);
A.color=dojox.gfx.normalizeColor(A.color);
if(A){var E=C.createFromXaml("<SolidColorBrush/>");
E.color=A.color.toHex();
E.opacity=A.color.a;
B.stroke=E;
B.strokeThickness=A.width;
B.strokeStartLineCap=B.strokeEndLineCap=B.strokeDashCap=dojox.gfx.silverlight.caps[A.cap];
if(typeof A.join=="number"){B.strokeLineJoin="Miter";
B.strokeMiterLimit=A.join
}else{B.strokeLineJoin=dojox.gfx.silverlight.joins[A.join]
}var F=A.style.toLowerCase();
if(F in dojox.gfx.silverlight.dasharray){F=dojox.gfx.silverlight.dasharray[F]
}if(F instanceof Array){F=dojo.clone(F);
if(A.cap!="butt"){for(var G=0;
G<F.length;
G+=2){--F[G];
if(F[G]<1){F[G]=1
}}for(var G=1;
G<F.length;
G+=2){++F[G]
}}B.strokeDashArray=F.join(",")
}else{B.strokeDashArray=null
}}return this
},_getParentSurface:function(){var A=this.parent;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}return A
},_applyTransform:function(){var A=this.matrix,B=this.rawNode;
if(A){var C=this.rawNode.getHost().content,E=C.createFromXaml("<MatrixTransform/>"),D=C.createFromXaml("<Matrix/>");
D.m11=A.xx;
D.m21=A.xy;
D.m12=A.yx;
D.m22=A.yy;
D.offsetX=A.dx;
D.offsetY=A.dy;
E.matrix=D;
B.renderTransform=E
}else{B.renderTransform=null
}return this
},setRawNode:function(A){A.fill=null;
A.stroke=null;
this.rawNode=A
},_moveToFront:function(){var A=this.parent.rawNode.children,B=this.rawNode;
A.remove(B);
A.add(B);
return this
},_moveToBack:function(){var A=this.parent.rawNode.children,B=this.rawNode;
A.remove(B);
A.insert(0,B);
return this
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Group.nodeType="Canvas";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var A=this.rawNode,B=this.shape;
A["Canvas.Left"]=B.x;
A["Canvas.Top"]=B.y;
A.width=B.width;
A.height=B.height;
A.radiusX=A.radiusY=B.r;
return this
}});
dojox.gfx.Rect.nodeType="Rectangle";
dojo.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var A=this.rawNode,B=this.shape;
A["Canvas.Left"]=B.cx-B.rx;
A["Canvas.Top"]=B.cy-B.ry;
A.width=2*B.rx;
A.height=2*B.ry;
return this
}});
dojox.gfx.Ellipse.nodeType="Ellipse";
dojo.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var A=this.rawNode,B=this.shape;
A["Canvas.Left"]=B.cx-B.r;
A["Canvas.Top"]=B.cy-B.r;
A.width=A.height=2*B.r;
return this
}});
dojox.gfx.Circle.nodeType="Ellipse";
dojo.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var A=this.rawNode,B=this.shape;
A.x1=B.x1;
A.y1=B.y1;
A.x2=B.x2;
A.y2=B.y2;
return this
}});
dojox.gfx.Line.nodeType="Line";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(C,E){if(C&&C instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:C});
if(E&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,C)
}this.box=null;
var D=this.shape.points,B=[];
for(var A=0;
A<D.length;
++A){if(typeof D[A]=="number"){B.push(D[A],D[++A])
}else{B.push(D[A].x,D[A].y)
}}this.rawNode.points=B.join(",");
return this
}});
dojox.gfx.Polyline.nodeType="Polyline";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var A=this.rawNode,B=this.shape;
A["Canvas.Left"]=B.x;
A["Canvas.Top"]=B.y;
A.width=B.width;
A.height=B.height;
A.source=B.src;
return this
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Image.nodeType="Image";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var B=this.rawNode,A=this.shape;
B.text=A.text;
B.textDecorations=A.decoration=="underline"?"Underline":"None";
B["Canvas.Left"]=-10000;
B["Canvas.Top"]=-10000;
window.setTimeout(dojo.hitch(this,"_delayAlignment"),0);
return this
},_delayAlignment:function(){var C=this.rawNode,B=this.shape,G=C.actualWidth,A=C.actualHeight,E=B.x,D=B.y-A*0.75;
switch(B.align){case"middle":E-=G/2;
break;
case"end":E-=G;
break
}var F=this.matrix?dojox.gfx.matrix.multiplyPoint(this.matrix,E,D):{x:E,y:D};
C["Canvas.Left"]=F.x;
C["Canvas.Top"]=F.y
},setStroke:function(){return this
},_setFillAttr:function(A){this.rawNode.foreground=A
},setRawNode:function(A){this.rawNode=A
},_applyTransform:function(){var A=this.matrix,B=this.rawNode;
if(A){A=dojox.gfx.matrix.normalize([1/100,A,100]);
var C=this.rawNode.getHost().content,E=C.createFromXaml("<MatrixTransform/>"),D=C.createFromXaml("<Matrix/>");
D.m11=A.xx;
D.m21=A.xy;
D.m12=A.yx;
D.m22=A.yy;
D.offsetX=A.dx;
D.offsetY=A.dy;
E.matrix=D;
B.renderTransform=E
}else{B.renderTransform=null
}return this
},getTextWidth:function(){return this.rawNode.actualWidth
}});
dojox.gfx.Text.nodeType="TextBlock";
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(B){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var A=this.shape.path;
if(typeof (A)=="string"){this.rawNode.data=A?A:null
}},setShape:function(B){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
var A=this.shape.path;
this.rawNode.data=A?A:null;
return this
}});
dojox.gfx.Path.nodeType="Path";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(A){},setShape:function(A){},_setText:function(){}});
dojox.gfx.TextPath.nodeType="text";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setDimensions:function(A,C){this.width=dojox.gfx.normalizedLength(A);
this.height=dojox.gfx.normalizedLength(C);
var B=this.rawNode&&this.rawNode.getHost();
if(B){B.width=A;
B.height=C
}return this
},getDimensions:function(){var A=this.rawNode&&this.rawNode.getHost();
var B=A?{width:A.content.actualWidth,height:A.content.actualHeight}:null;
if(B.width<=0){B.width=this.width
}if(B.height<=0){B.height=this.height
}return B
}});
dojox.gfx.silverlight.surfaces={};
dojox.gfx.createSurface=function(A,D,F){var C=new dojox.gfx.Surface();
A=dojo.byId(A);
var B=A.ownerDocument.createElement("script");
B.type="text/xaml";
B.id=dojox.gfx._base._getUniqueId();
B.text="<Canvas xmlns='http://schemas.microsoft.com/client/2007' Name='"+dojox.gfx._base._getUniqueId()+"'/>";
document.body.appendChild(B);
var E=dojox.gfx._base._getUniqueId();
Silverlight.createObject("#"+B.id,A,E,{width:String(D),height:String(F),inplaceInstallPrompt:"false",background:"transparent",isWindowless:"true",framerate:"24",version:"1.0"},{},null,null);
C.rawNode=dojo.byId(E).content.root;
dojox.gfx.silverlight.surfaces[C.rawNode.name]=A;
C.width=dojox.gfx.normalizedLength(D);
C.height=dojox.gfx.normalizedLength(F);
return C
};
dojox.gfx.silverlight.Font={_setFont:function(){var D=this.fontStyle,B=this.rawNode,C=dojox.gfx.silverlight.fontweight,A=dojox.gfx.silverlight.fonts,E=D.family.toLowerCase();
B.fontStyle=D.style=="italic"?"Italic":"Normal";
B.fontWeight=D.weight in C?C[D.weight]:D.weight;
B.fontSize=dojox.gfx.normalizedLength(D.size);
B.fontFamily=E in A?A[E]:D.family
}};
dojox.gfx.silverlight.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){dojox.gfx.shape.Container.add.apply(this,arguments);
this.rawNode.children.add(A.rawNode)
}return this
},remove:function(C,B){if(this==C.getParent()){var A=C.rawNode.getParent();
if(A){A.children.remove(C.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){this.rawNode.children.clear();
return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createObject:function(C,A){if(!this.rawNode){return null
}var D=new C();
var B=this.rawNode.getHost().content.createFromXaml("<"+C.nodeType+"/>");
D.setRawNode(B);
D.setShape(A);
this.add(D);
return D
}});
dojo.extend(dojox.gfx.Text,dojox.gfx.silverlight.Font);
dojo.extend(dojox.gfx.Group,dojox.gfx.silverlight.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.silverlight.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator);
(function(){var E=dojox.gfx.silverlight.surfaces;
var A=function(J,G){var K={target:J,currentTarget:J,preventDefault:function(){},stopPropagation:function(){}};
if(G){K.ctrlKey=G.ctrl;
K.shiftKey=G.shift;
var F=G.getPosition(null);
K.x=K.offsetX=K.layerX=F.x;
K.y=K.offsetY=K.layerY=F.y;
var I=E[J.getHost().content.root.name];
var H=dojo._abs(I);
K.clientX=H.x+F.x;
K.clientY=H.y+F.y
}return K
};
var C=function(H,G){var F={keyCode:G.platformKeyCode,ctrlKey:G.ctrl,shiftKey:G.shift};
return F
};
var D={onclick:{name:"MouseLeftButtonUp",fix:A},onmouseenter:{name:"MouseEnter",fix:A},onmouseleave:{name:"MouseLeave",fix:A},onmousedown:{name:"MouseLeftButtonDown",fix:A},onmouseup:{name:"MouseLeftButtonUp",fix:A},onmousemove:{name:"MouseMove",fix:A},onkeydown:{name:"KeyDown",fix:C},onkeyup:{name:"KeyUp",fix:C}};
var B={connect:function(H,G,F){var I,J=H in D?D[H]:{name:H,fix:function(){return{}
}};
if(arguments.length>2){I=this.getEventSource().addEventListener(J.name,function(L,K){dojo.hitch(G,F)(J.fix(L,K))
})
}else{I=this.getEventSource().addEventListener(J.name,function(L,K){G(J.fix(L,K))
})
}return{name:J.name,token:I}
},disconnect:function(F){this.getEventSource().removeEventListener(F.name,F.token)
}};
dojo.extend(dojox.gfx.Shape,B);
dojo.extend(dojox.gfx.Surface,B);
dojox.gfx.equalSources=function(F,G){return F&&G&&F.equals(G)
}
})()
};