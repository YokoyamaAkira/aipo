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
dojox.gfx.silverlight.hexColor=function(D){var B=dojox.gfx.normalizeColor(D),E=B.toHex(),C=Math.round(B.a*255);
C=(C<0?0:C>255?255:C).toString(16);
return"#"+(C.length<2?"0"+C:C)+E.slice(1)
};
A.extend(dojox.gfx.Shape,{setFill:function(J){var L=this.rawNode.getHost().content,K=this.rawNode,F;
if(!J){this.fillStyle=null;
this._setFillAttr(null);
return this
}if(typeof (J)=="object"&&"type" in J){switch(J.type){case"linear":this.fillStyle=F=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,J);
var D=L.createFromXaml("<LinearGradientBrush/>");
D.mappingMode="Absolute";
D.startPoint=F.x1+","+F.y1;
D.endPoint=F.x2+","+F.y2;
A.forEach(F.colors,function(N){var M=L.createFromXaml("<GradientStop/>");
M.offset=N.offset;
M.color=dojox.gfx.silverlight.hexColor(N.color);
D.gradientStops.add(M)
});
this._setFillAttr(D);
break;
case"radial":this.fillStyle=F=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,J);
var G=L.createFromXaml("<RadialGradientBrush/>"),H=K.width,E=K.height,C=this.rawNode["Canvas.Left"],I=this.rawNode["Canvas.Top"];
G.center=(F.cx-C)/H+","+(F.cy-I)/E;
G.radiusX=F.r/H;
G.radiusY=F.r/E;
A.forEach(F.colors,function(N){var M=L.createFromXaml("<GradientStop/>");
M.offset=N.offset;
M.color=dojox.gfx.silverlight.hexColor(N.color);
G.gradientStops.add(M)
});
this._setFillAttr(G);
break;
case"pattern":this.fillStyle=null;
this._setFillAttr(null);
break
}return this
}this.fillStyle=F=dojox.gfx.normalizeColor(J);
var B=L.createFromXaml("<SolidColorBrush/>");
B.color=F.toHex();
B.opacity=F.a;
this._setFillAttr(B);
return this
},_setFillAttr:function(B){this.rawNode.fill=B
},setStroke:function(C){var F=this.rawNode.getHost().content,E=this.rawNode;
if(!C){this.strokeStyle=null;
E.stroke=null;
return this
}if(typeof C=="string"){C={color:C}
}var D=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,C);
D.color=dojox.gfx.normalizeColor(D.color);
if(D){var G=F.createFromXaml("<SolidColorBrush/>");
G.color=D.color.toHex();
G.opacity=D.color.a;
E.stroke=G;
E.strokeThickness=D.width;
E.strokeStartLineCap=E.strokeEndLineCap=E.strokeDashCap=dojox.gfx.silverlight.caps[D.cap];
if(typeof D.join=="number"){E.strokeLineJoin="Miter";
E.strokeMiterLimit=D.join
}else{E.strokeLineJoin=dojox.gfx.silverlight.joins[D.join]
}var H=D.style.toLowerCase();
if(H in dojox.gfx.silverlight.dasharray){H=dojox.gfx.silverlight.dasharray[H]
}if(H instanceof Array){H=A.clone(H);
if(D.cap!="butt"){for(var B=0;
B<H.length;
B+=2){--H[B];
if(H[B]<1){H[B]=1
}}for(var B=1;
B<H.length;
B+=2){++H[B]
}}E.strokeDashArray=H.join(",")
}else{E.strokeDashArray=null
}}return this
},_getParentSurface:function(){var B=this.parent;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}return B
},_applyTransform:function(){var D=this.matrix,E=this.rawNode;
if(D){var F=this.rawNode.getHost().content,C=F.createFromXaml("<MatrixTransform/>"),B=F.createFromXaml("<Matrix/>");
B.m11=D.xx;
B.m21=D.xy;
B.m12=D.yx;
B.m22=D.yy;
B.offsetX=D.dx;
B.offsetY=D.dy;
C.matrix=B;
E.renderTransform=C
}else{E.renderTransform=null
}return this
},setRawNode:function(B){B.fill=null;
B.stroke=null;
this.rawNode=B
},_moveToFront:function(){var B=this.parent.rawNode.children,C=this.rawNode;
B.remove(C);
B.add(C);
return this
},_moveToBack:function(){var B=this.parent.rawNode.children,C=this.rawNode;
B.remove(C);
B.insert(0,C);
return this
}});
A.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Group.nodeType="Canvas";
A.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode,B=this.shape;
D["Canvas.Left"]=B.x;
D["Canvas.Top"]=B.y;
D.width=B.width;
D.height=B.height;
D.radiusX=D.radiusY=B.r;
return this
}});
dojox.gfx.Rect.nodeType="Rectangle";
A.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode,B=this.shape;
D["Canvas.Left"]=B.cx-B.rx;
D["Canvas.Top"]=B.cy-B.ry;
D.width=2*B.rx;
D.height=2*B.ry;
return this
}});
dojox.gfx.Ellipse.nodeType="Ellipse";
A.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode,B=this.shape;
D["Canvas.Left"]=B.cx-B.r;
D["Canvas.Top"]=B.cy-B.r;
D.width=D.height=2*B.r;
return this
}});
dojox.gfx.Circle.nodeType="Ellipse";
A.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode,B=this.shape;
D.x1=B.x1;
D.y1=B.y1;
D.x2=B.x2;
D.y2=B.y2;
return this
}});
dojox.gfx.Line.nodeType="Line";
A.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(F,C){if(F&&F instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:F});
if(C&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,F)
}this.box=null;
var B=this.shape.points,E=[];
for(var D=0;
D<B.length;
++D){if(typeof B[D]=="number"){E.push(B[D],B[++D])
}else{E.push(B[D].x,B[D].y)
}}this.rawNode.points=E.join(",");
return this
}});
dojox.gfx.Polyline.nodeType="Polyline";
A.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode,B=this.shape;
D["Canvas.Left"]=B.x;
D["Canvas.Top"]=B.y;
D.width=B.width;
D.height=B.height;
D.source=B.src;
return this
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Image.nodeType="Image";
A.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var B=this.rawNode,D=this.shape;
B.text=D.text;
B.textDecorations=D.decoration=="underline"?"Underline":"None";
B["Canvas.Left"]=-10000;
B["Canvas.Top"]=-10000;
window.setTimeout(A.hitch(this,"_delayAlignment"),0);
return this
},_delayAlignment:function(){var F=this.rawNode,E=this.shape,C=F.actualWidth,D=F.actualHeight,G=E.x,B=E.y-D*0.75;
switch(E.align){case"middle":G-=C/2;
break;
case"end":G-=C;
break
}var H=this.matrix?dojox.gfx.matrix.multiplyPoint(this.matrix,G,B):{x:G,y:B};
F["Canvas.Left"]=H.x;
F["Canvas.Top"]=H.y
},setStroke:function(){return this
},_setFillAttr:function(B){this.rawNode.foreground=B
},setRawNode:function(B){this.rawNode=B
},_applyTransform:function(){var D=this.matrix,E=this.rawNode;
if(D){D=dojox.gfx.matrix.normalize([1/100,D,100]);
var F=this.rawNode.getHost().content,C=F.createFromXaml("<MatrixTransform/>"),B=F.createFromXaml("<Matrix/>");
B.m11=D.xx;
B.m21=D.xy;
B.m12=D.yx;
B.m22=D.yy;
B.offsetX=D.dx;
B.offsetY=D.dy;
C.matrix=B;
E.renderTransform=C
}else{E.renderTransform=null
}return this
},getTextWidth:function(){return this.rawNode.actualWidth
}});
dojox.gfx.Text.nodeType="TextBlock";
A.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(C){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var B=this.shape.path;
if(typeof (B)=="string"){this.rawNode.data=B?B:null
}},setShape:function(C){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
var B=this.shape.path;
this.rawNode.data=B?B:null;
return this
}});
dojox.gfx.Path.nodeType="Path";
A.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(B){},setShape:function(B){},_setText:function(){}});
dojox.gfx.TextPath.nodeType="text";
A.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.silverlight.Container._init.call(this)
},setDimensions:function(D,C){this.width=dojox.gfx.normalizedLength(D);
this.height=dojox.gfx.normalizedLength(C);
var B=this.rawNode&&this.rawNode.getHost();
if(B){B.width=D;
B.height=C
}return this
},getDimensions:function(){var B=this.rawNode&&this.rawNode.getHost();
var C=B?{width:B.content.actualWidth,height:B.content.actualHeight}:null;
if(C.width<=0){C.width=this.width
}if(C.height<=0){C.height=this.height
}return C
}});
dojox.gfx.silverlight.surfaces={};
dojox.gfx.createSurface=function(D,G,C){var F=new dojox.gfx.Surface();
D=A.byId(D);
var E=D.ownerDocument.createElement("script");
E.type="text/xaml";
E.id=dojox.gfx._base._getUniqueId();
E.text="<Canvas xmlns='http://schemas.microsoft.com/client/2007' Name='"+dojox.gfx._base._getUniqueId()+"'/>";
document.body.appendChild(E);
var B=dojox.gfx._base._getUniqueId();
Silverlight.createObject("#"+E.id,D,B,{width:String(G),height:String(C),inplaceInstallPrompt:"false",background:"transparent",isWindowless:"true",framerate:"24",version:"1.0"},{},null,null);
F.rawNode=A.byId(B).content.root;
dojox.gfx.silverlight.surfaces[F.rawNode.name]=D;
F.width=dojox.gfx.normalizedLength(G);
F.height=dojox.gfx.normalizedLength(C);
return F
};
dojox.gfx.silverlight.Font={_setFont:function(){var B=this.fontStyle,E=this.rawNode,F=dojox.gfx.silverlight.fontweight,D=dojox.gfx.silverlight.fonts,C=B.family.toLowerCase();
E.fontStyle=B.style=="italic"?"Italic":"Normal";
E.fontWeight=B.weight in F?F[B.weight]:B.weight;
E.fontSize=dojox.gfx.normalizedLength(B.size);
E.fontFamily=C in D?D[C]:B.family
}};
dojox.gfx.silverlight.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){dojox.gfx.shape.Container.add.apply(this,arguments);
this.rawNode.children.add(B.rawNode)
}return this
},remove:function(C,B){if(this==C.getParent()){var D=C.rawNode.getParent();
if(D){D.children.remove(C.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){this.rawNode.children.clear();
return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
A.mixin(dojox.gfx.shape.Creator,{createObject:function(B,D){if(!this.rawNode){return null
}var C=new B();
var E=this.rawNode.getHost().content.createFromXaml("<"+B.nodeType+"/>");
C.setRawNode(E);
C.setShape(D);
this.add(C);
return C
}});
A.extend(dojox.gfx.Text,dojox.gfx.silverlight.Font);
A.extend(dojox.gfx.Group,dojox.gfx.silverlight.Container);
A.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
A.extend(dojox.gfx.Surface,dojox.gfx.silverlight.Container);
A.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator);
(function(){var C=dojox.gfx.silverlight.surfaces;
var D=function(H,K){var I={target:H,currentTarget:H,preventDefault:function(){},stopPropagation:function(){}};
if(K){I.ctrlKey=K.ctrl;
I.shiftKey=K.shift;
var J=K.getPosition(null);
I.x=I.offsetX=I.layerX=J.x;
I.y=I.offsetY=I.layerY=J.y;
var G=C[H.getHost().content.root.name];
var L=A._abs(G);
I.clientX=L.x+J.x;
I.clientY=L.y+J.y
}return I
};
var F=function(H,G){var I={keyCode:G.platformKeyCode,ctrlKey:G.ctrl,shiftKey:G.shift};
return I
};
var B={onclick:{name:"MouseLeftButtonUp",fix:D},onmouseenter:{name:"MouseEnter",fix:D},onmouseleave:{name:"MouseLeave",fix:D},onmousedown:{name:"MouseLeftButtonDown",fix:D},onmouseup:{name:"MouseLeftButtonUp",fix:D},onmousemove:{name:"MouseMove",fix:D},onkeydown:{name:"KeyDown",fix:F},onkeyup:{name:"KeyUp",fix:F}};
var E={connect:function(H,G,K){var I,J=H in B?B[H]:{name:H,fix:function(){return{}
}};
if(arguments.length>2){I=this.getEventSource().addEventListener(J.name,function(M,L){A.hitch(G,K)(J.fix(M,L))
})
}else{I=this.getEventSource().addEventListener(J.name,function(M,L){G(J.fix(M,L))
})
}return{name:J.name,token:I}
},disconnect:function(G){this.getEventSource().removeEventListener(G.name,G.token)
}};
A.extend(dojox.gfx.Shape,E);
A.extend(dojox.gfx.Surface,E);
dojox.gfx.equalSources=function(H,G){return H&&G&&H.equals(G)
}
})()
}}});