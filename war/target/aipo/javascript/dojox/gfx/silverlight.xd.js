dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.silverlight"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.silverlight"]){A._hasResource["dojox.gfx.silverlight"]=true;
A.provide("dojox.gfx.silverlight");
A.require("dojox.gfx._base");
A.require("dojox.gfx.shape");
A.require("dojox.gfx.path");
A.experimental("dojox.gfx.silverlight");
dojox.gfx.silverlight.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
dojox.gfx.silverlight.fontweight={normal:400,bold:700};
dojox.gfx.silverlight.caps={butt:"Flat",round:"Round",square:"Square"};
dojox.gfx.silverlight.joins={bevel:"Bevel",round:"Round"};
dojox.gfx.silverlight.fonts={serif:"Times New Roman",times:"Times New Roman","sans-serif":"Arial",helvetica:"Arial",monotone:"Courier New",courier:"Courier New"};
dojox.gfx.silverlight.hexColor=function(C){var E=dojox.gfx.normalizeColor(C),D=E.toHex(),B=Math.round(E.a*255);
B=(B<0?0:B>255?255:B).toString(16);
return"#"+(B.length<2?"0"+B:B)+D.slice(1)
};
A.extend(dojox.gfx.Shape,{setFill:function(L){var C=this.rawNode.getHost().content,B=this.rawNode,H;
if(!L){this.fillStyle=null;
this._setFillAttr(null);
return this
}if(typeof (L)=="object"&&"type" in L){switch(L.type){case"linear":this.fillStyle=H=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,L);
var F=C.createFromXaml("<LinearGradientBrush/>");
F.mappingMode="Absolute";
F.startPoint=H.x1+","+H.y1;
F.endPoint=H.x2+","+H.y2;
A.forEach(H.colors,function(N){var M=C.createFromXaml("<GradientStop/>");
M.offset=N.offset;
M.color=dojox.gfx.silverlight.hexColor(N.color);
F.gradientStops.add(M)
});
this._setFillAttr(F);
break;
case"radial":this.fillStyle=H=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,L);
var I=C.createFromXaml("<RadialGradientBrush/>"),J=B.width,G=B.height,E=this.rawNode["Canvas.Left"],K=this.rawNode["Canvas.Top"];
I.center=(H.cx-E)/J+","+(H.cy-K)/G;
I.radiusX=H.r/J;
I.radiusY=H.r/G;
A.forEach(H.colors,function(N){var M=C.createFromXaml("<GradientStop/>");
M.offset=N.offset;
M.color=dojox.gfx.silverlight.hexColor(N.color);
I.gradientStops.add(M)
});
this._setFillAttr(I);
break;
case"pattern":this.fillStyle=null;
this._setFillAttr(null);
break
}return this
}this.fillStyle=H=dojox.gfx.normalizeColor(L);
var D=C.createFromXaml("<SolidColorBrush/>");
D.color=H.toHex();
D.opacity=H.a;
this._setFillAttr(D);
return this
},_setFillAttr:function(B){this.rawNode.fill=B
},setStroke:function(H){var G=this.rawNode.getHost().content,F=this.rawNode;
if(!H){this.strokeStyle=null;
F.stroke=null;
return this
}if(typeof H=="string"){H={color:H}
}var E=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,H);
E.color=dojox.gfx.normalizeColor(E.color);
if(E){var B=G.createFromXaml("<SolidColorBrush/>");
B.color=E.color.toHex();
B.opacity=E.color.a;
F.stroke=B;
F.strokeThickness=E.width;
F.strokeStartLineCap=F.strokeEndLineCap=F.strokeDashCap=dojox.gfx.silverlight.caps[E.cap];
if(typeof E.join=="number"){F.strokeLineJoin="Miter";
F.strokeMiterLimit=E.join
}else{F.strokeLineJoin=dojox.gfx.silverlight.joins[E.join]
}var C=E.style.toLowerCase();
if(C in dojox.gfx.silverlight.dasharray){C=dojox.gfx.silverlight.dasharray[C]
}if(C instanceof Array){C=A.clone(C);
if(E.cap!="butt"){for(var D=0;
D<C.length;
D+=2){--C[D];
if(C[D]<1){C[D]=1
}}for(var D=1;
D<C.length;
D+=2){++C[D]
}}F.strokeDashArray=C.join(",")
}else{F.strokeDashArray=null
}}return this
},_getParentSurface:function(){var B=this.parent;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}return B
},_applyTransform:function(){var C=this.matrix,D=this.rawNode;
if(C){var E=this.rawNode.getHost().content,B=E.createFromXaml("<MatrixTransform/>"),F=E.createFromXaml("<Matrix/>");
F.m11=C.xx;
F.m21=C.xy;
F.m12=C.yx;
F.m22=C.yy;
F.offsetX=C.dx;
F.offsetY=C.dy;
B.matrix=F;
D.renderTransform=B
}else{D.renderTransform=null
}return this
},setRawNode:function(B){B.fill=null;
B.stroke=null;
this.rawNode=B
},_moveToFront:function(){var C=this.parent.rawNode.children,B=this.rawNode;
C.remove(B);
C.add(B);
return this
},_moveToBack:function(){var C=this.parent.rawNode.children,B=this.rawNode;
C.remove(B);
C.insert(0,B);
return this
}});
A.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Group.nodeType="Canvas";
A.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode,D=this.shape;
C["Canvas.Left"]=D.x;
C["Canvas.Top"]=D.y;
C.width=D.width;
C.height=D.height;
C.radiusX=C.radiusY=D.r;
return this
}});
dojox.gfx.Rect.nodeType="Rectangle";
A.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode,D=this.shape;
C["Canvas.Left"]=D.cx-D.rx;
C["Canvas.Top"]=D.cy-D.ry;
C.width=2*D.rx;
C.height=2*D.ry;
return this
}});
dojox.gfx.Ellipse.nodeType="Ellipse";
A.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode,D=this.shape;
C["Canvas.Left"]=D.cx-D.r;
C["Canvas.Top"]=D.cy-D.r;
C.width=C.height=2*D.r;
return this
}});
dojox.gfx.Circle.nodeType="Ellipse";
A.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode,D=this.shape;
C.x1=D.x1;
C.y1=D.y1;
C.x2=D.x2;
C.y2=D.y2;
return this
}});
dojox.gfx.Line.nodeType="Line";
A.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(E,B){if(E&&E instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:E});
if(B&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,E)
}this.box=null;
var F=this.shape.points,D=[];
for(var C=0;
C<F.length;
++C){if(typeof F[C]=="number"){D.push(F[C],F[++C])
}else{D.push(F[C].x,F[C].y)
}}this.rawNode.points=D.join(",");
return this
}});
dojox.gfx.Polyline.nodeType="Polyline";
A.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode,D=this.shape;
C["Canvas.Left"]=D.x;
C["Canvas.Top"]=D.y;
C.width=D.width;
C.height=D.height;
C.source=D.src;
return this
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Image.nodeType="Image";
A.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var D=this.rawNode,C=this.shape;
D.text=C.text;
D.textDecorations=C.decoration=="underline"?"Underline":"None";
D["Canvas.Left"]=-10000;
D["Canvas.Top"]=-10000;
window.setTimeout(A.hitch(this,"_delayAlignment"),0);
return this
},_delayAlignment:function(){var G=this.rawNode,F=this.shape,D=G.actualWidth,E=G.actualHeight,B=F.x,H=F.y-E*0.75;
switch(F.align){case"middle":B-=D/2;
break;
case"end":B-=D;
break
}var C=this.matrix?dojox.gfx.matrix.multiplyPoint(this.matrix,B,H):{x:B,y:H};
G["Canvas.Left"]=C.x;
G["Canvas.Top"]=C.y
},setStroke:function(){return this
},_setFillAttr:function(B){this.rawNode.foreground=B
},setRawNode:function(B){this.rawNode=B
},_applyTransform:function(){var C=this.matrix,D=this.rawNode;
if(C){C=dojox.gfx.matrix.normalize([1/100,C,100]);
var E=this.rawNode.getHost().content,B=E.createFromXaml("<MatrixTransform/>"),F=E.createFromXaml("<Matrix/>");
F.m11=C.xx;
F.m21=C.xy;
F.m12=C.yx;
F.m22=C.yy;
F.offsetX=C.dx;
F.offsetY=C.dy;
B.matrix=F;
D.renderTransform=B
}else{D.renderTransform=null
}return this
},getTextWidth:function(){return this.rawNode.actualWidth
}});
dojox.gfx.Text.nodeType="TextBlock";
A.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(B){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var C=this.shape.path;
if(typeof (C)=="string"){this.rawNode.data=C?C:null
}},setShape:function(B){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
var C=this.shape.path;
this.rawNode.data=C?C:null;
return this
}});
dojox.gfx.Path.nodeType="Path";
A.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(B){},setShape:function(B){},_setText:function(){}});
dojox.gfx.TextPath.nodeType="text";
A.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setDimensions:function(C,B){this.width=dojox.gfx.normalizedLength(C);
this.height=dojox.gfx.normalizedLength(B);
var D=this.rawNode&&this.rawNode.getHost();
if(D){D.width=C;
D.height=B
}return this
},getDimensions:function(){var C=this.rawNode&&this.rawNode.getHost();
var B=C?{width:C.content.actualWidth,height:C.content.actualHeight}:null;
if(B.width<=0){B.width=this.width
}if(B.height<=0){B.height=this.height
}return B
}});
dojox.gfx.silverlight.surfaces={};
dojox.gfx.createSurface=function(C,F,B){var E=new dojox.gfx.Surface();
C=A.byId(C);
var D=C.ownerDocument.createElement("script");
D.type="text/xaml";
D.id=dojox.gfx._base._getUniqueId();
D.text="<Canvas xmlns='http://schemas.microsoft.com/client/2007' Name='"+dojox.gfx._base._getUniqueId()+"'/>";
document.body.appendChild(D);
var G=dojox.gfx._base._getUniqueId();
Silverlight.createObject("#"+D.id,C,G,{width:String(F),height:String(B),inplaceInstallPrompt:"false",background:"transparent",isWindowless:"true",framerate:"24",version:"1.0"},{},null,null);
E.rawNode=A.byId(G).content.root;
dojox.gfx.silverlight.surfaces[E.rawNode.name]=C;
E.width=dojox.gfx.normalizedLength(F);
E.height=dojox.gfx.normalizedLength(B);
return E
};
dojox.gfx.silverlight.Font={_setFont:function(){var F=this.fontStyle,D=this.rawNode,E=dojox.gfx.silverlight.fontweight,C=dojox.gfx.silverlight.fonts,B=F.family.toLowerCase();
D.fontStyle=F.style=="italic"?"Italic":"Normal";
D.fontWeight=F.weight in E?E[F.weight]:F.weight;
D.fontSize=dojox.gfx.normalizedLength(F.size);
D.fontFamily=B in C?C[B]:F.family
}};
dojox.gfx.silverlight.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){dojox.gfx.shape.Container.add.apply(this,arguments);
this.rawNode.children.add(B.rawNode)
}return this
},remove:function(B,D){if(this==B.getParent()){var C=B.rawNode.getParent();
if(C){C.children.remove(B.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){this.rawNode.children.clear();
return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
A.mixin(dojox.gfx.shape.Creator,{createObject:function(E,C){if(!this.rawNode){return null
}var B=new E();
var D=this.rawNode.getHost().content.createFromXaml("<"+E.nodeType+"/>");
B.setRawNode(D);
B.setShape(C);
this.add(B);
return B
}});
A.extend(dojox.gfx.Text,dojox.gfx.silverlight.Font);
A.extend(dojox.gfx.Group,dojox.gfx.silverlight.Container);
A.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
A.extend(dojox.gfx.Surface,dojox.gfx.silverlight.Container);
A.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator);
(function(){var B=dojox.gfx.silverlight.surfaces;
var C=function(J,G){var K={target:J,currentTarget:J,preventDefault:function(){},stopPropagation:function(){}};
if(G){K.ctrlKey=G.ctrl;
K.shiftKey=G.shift;
var L=G.getPosition(null);
K.x=K.offsetX=K.layerX=L.x;
K.y=K.offsetY=K.layerY=L.y;
var I=B[J.getHost().content.root.name];
var H=A._abs(I);
K.clientX=H.x+L.x;
K.clientY=H.y+L.y
}return K
};
var E=function(H,G){var I={keyCode:G.platformKeyCode,ctrlKey:G.ctrl,shiftKey:G.shift};
return I
};
var F={onclick:{name:"MouseLeftButtonUp",fix:C},onmouseenter:{name:"MouseEnter",fix:C},onmouseleave:{name:"MouseLeave",fix:C},onmousedown:{name:"MouseLeftButtonDown",fix:C},onmouseup:{name:"MouseLeftButtonUp",fix:C},onmousemove:{name:"MouseMove",fix:C},onkeydown:{name:"KeyDown",fix:E},onkeyup:{name:"KeyUp",fix:E}};
var D={connect:function(H,G,K){var I,J=H in F?F[H]:{name:H,fix:function(){return{}
}};
if(arguments.length>2){I=this.getEventSource().addEventListener(J.name,function(M,L){A.hitch(G,K)(J.fix(M,L))
})
}else{I=this.getEventSource().addEventListener(J.name,function(M,L){G(J.fix(M,L))
})
}return{name:J.name,token:I}
},disconnect:function(G){this.getEventSource().removeEventListener(G.name,G.token)
}};
A.extend(dojox.gfx.Shape,D);
A.extend(dojox.gfx.Surface,D);
dojox.gfx.equalSources=function(H,G){return H&&G&&H.equals(G)
}
})()
}}});