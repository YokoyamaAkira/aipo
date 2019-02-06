if(!dojo._hasResource["dojox.gfx.svg"]){dojo._hasResource["dojox.gfx.svg"]=true;
dojo.provide("dojox.gfx.svg");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojox.gfx.svg.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};
dojox.gfx.svg.getRef=function(A){if(!A||A=="none"){return null
}if(A.match(/^url\(#.+\)$/)){return dojo.byId(A.slice(5,-1))
}if(A.match(/^#dojoUnique\d+$/)){return dojo.byId(A.slice(1))
}return null
};
dojox.gfx.svg.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
dojo.extend(dojox.gfx.Shape,{setFill:function(C){if(!C){this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this
}var A;
var D=function(F){this.setAttribute(F,A[F].toFixed(8))
};
if(typeof (C)=="object"&&"type" in C){switch(C.type){case"linear":A=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,C);
var B=this._setFillObject(A,"linearGradient");
dojo.forEach(["x1","y1","x2","y2"],D,B);
break;
case"radial":A=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,C);
var B=this._setFillObject(A,"radialGradient");
dojo.forEach(["cx","cy","r"],D,B);
break;
case"pattern":A=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,C);
var E=this._setFillObject(A,"pattern");
dojo.forEach(["x","y","width","height"],D,E);
break
}this.fillStyle=A;
return this
}var A=dojox.gfx.normalizeColor(C);
this.fillStyle=A;
this.rawNode.setAttribute("fill",A.toCss());
this.rawNode.setAttribute("fill-opacity",A.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this
},setStroke:function(D){if(!D){this.strokeStyle=null;
this.rawNode.setAttribute("stroke","none");
this.rawNode.setAttribute("stroke-opacity",0);
return this
}if(typeof D=="string"){D={color:D}
}var B=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,D);
B.color=dojox.gfx.normalizeColor(B.color);
var C=this.rawNode;
if(B){C.setAttribute("stroke",B.color.toCss());
C.setAttribute("stroke-opacity",B.color.a);
C.setAttribute("stroke-width",B.width);
C.setAttribute("stroke-linecap",B.cap);
if(typeof B.join=="number"){C.setAttribute("stroke-linejoin","miter");
C.setAttribute("stroke-miterlimit",B.join)
}else{C.setAttribute("stroke-linejoin",B.join)
}var E=B.style.toLowerCase();
if(E in dojox.gfx.svg.dasharray){E=dojox.gfx.svg.dasharray[E]
}if(E instanceof Array){E=dojo.clone(E);
for(var A=0;
A<E.length;
++A){E[A]*=B.width
}if(B.cap!="butt"){for(var A=0;
A<E.length;
A+=2){E[A]-=B.width;
if(E[A]<1){E[A]=1
}}for(var A=1;
A<E.length;
A+=2){E[A]+=B.width
}}E=E.join(",")
}C.setAttribute("stroke-dasharray",E);
C.setAttribute("dojoGfxStrokeStyle",B.style)
}return this
},_getParentSurface:function(){var A=this.parent;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}return A
},_setFillObject:function(F,B){var A=dojox.gfx.svg.xmlns.svg;
this.fillStyle=F;
var K=this._getParentSurface();
var C=K.defNode;
var I=this.rawNode.getAttribute("fill");
var L=dojox.gfx.svg.getRef(I);
if(L){I=L;
if(I.tagName.toLowerCase()!=B.toLowerCase()){var J=I.id;
I.parentNode.removeChild(I);
I=document.createElementNS(A,B);
I.setAttribute("id",J);
C.appendChild(I)
}else{while(I.childNodes.length){I.removeChild(I.lastChild)
}}}else{I=document.createElementNS(A,B);
I.setAttribute("id",dojox.gfx._base._getUniqueId());
C.appendChild(I)
}if(B=="pattern"){if(dojo.isSafari){I.setAttributeNS(null,"patternUnits","userSpaceOnUse")
}else{I.setAttribute("patternUnits","userSpaceOnUse")
}var E=document.createElementNS(A,"image");
E.setAttribute("x",0);
E.setAttribute("y",0);
E.setAttribute("width",F.width.toFixed(8));
E.setAttribute("height",F.height.toFixed(8));
E.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",F.src);
I.appendChild(E)
}else{if(dojo.isSafari){I.setAttributeNS(null,"gradientUnits","userSpaceOnUse")
}else{I.setAttribute("gradientUnits","userSpaceOnUse")
}for(var D=0;
D<F.colors.length;
++D){var G=F.colors[D],H=document.createElementNS(A,"stop"),M=G.color=dojox.gfx.normalizeColor(G.color);
H.setAttribute("offset",G.offset.toFixed(8));
H.setAttribute("stop-color",M.toCss());
H.setAttribute("stop-opacity",M.a);
I.appendChild(H)
}}this.rawNode.setAttribute("fill","url(#"+I.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return I
},_applyTransform:function(){var A=this.matrix;
if(A){var B=this.matrix;
this.rawNode.setAttribute("transform","matrix("+B.xx.toFixed(8)+","+B.yx.toFixed(8)+","+B.xy.toFixed(8)+","+B.yy.toFixed(8)+","+B.dx.toFixed(8)+","+B.dy.toFixed(8)+")")
}else{this.rawNode.removeAttribute("transform")
}return this
},setRawNode:function(A){var B=this.rawNode=A;
B.setAttribute("fill","none");
B.setAttribute("fill-opacity",0);
B.setAttribute("stroke","none");
B.setAttribute("stroke-opacity",0);
B.setAttribute("stroke-width",1);
B.setAttribute("stroke-linecap","butt");
B.setAttribute("stroke-linejoin","miter");
B.setAttribute("stroke-miterlimit",4)
},setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
for(var A in this.shape){if(A!="type"){this.rawNode.setAttribute(A,this.shape[A])
}}return this
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);
return this
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setRawNode:function(A){this.rawNode=A
}});
dojox.gfx.Group.nodeType="g";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
for(var A in this.shape){if(A!="type"&&A!="r"){this.rawNode.setAttribute(A,this.shape[A])
}}if(this.shape.r){this.rawNode.setAttribute("ry",this.shape.r);
this.rawNode.setAttribute("rx",this.shape.r)
}return this
}});
dojox.gfx.Rect.nodeType="rect";
dojox.gfx.Ellipse=dojox.gfx.shape.Ellipse;
dojox.gfx.Ellipse.nodeType="ellipse";
dojox.gfx.Circle=dojox.gfx.shape.Circle;
dojox.gfx.Circle.nodeType="circle";
dojox.gfx.Line=dojox.gfx.shape.Line;
dojox.gfx.Line.nodeType="line";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(C,A){if(C&&C instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:C});
if(A&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,C)
}this.box=null;
var E=[];
var D=this.shape.points;
for(var B=0;
B<D.length;
++B){if(typeof D[B]=="number"){E.push(D[B].toFixed(8))
}else{E.push(D[B].x.toFixed(8));
E.push(D[B].y.toFixed(8))
}}this.rawNode.setAttribute("points",E.join(" "));
return this
}});
dojox.gfx.Polyline.nodeType="polyline";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var B=this.rawNode;
for(var A in this.shape){if(A!="type"&&A!="src"){B.setAttribute(A,this.shape[A])
}}B.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",this.shape.src);
return this
}});
dojox.gfx.Image.nodeType="image";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var B=this.rawNode;
var A=this.shape;
B.setAttribute("x",A.x);
B.setAttribute("y",A.y);
B.setAttribute("text-anchor",A.align);
B.setAttribute("text-decoration",A.decoration);
B.setAttribute("rotate",A.rotated?90:0);
B.setAttribute("kerning",A.kerning?"auto":0);
B.setAttribute("text-rendering","optimizeLegibility");
B.textContent=A.text;
return this
},getTextWidth:function(){var D=this.rawNode;
var B=D.parentNode;
var A=D.cloneNode(true);
A.style.visibility="hidden";
var E=0;
var C=A.firstChild.nodeValue;
B.appendChild(A);
if(C!=""){while(!E){E=parseInt(A.getBBox().width)
}}B.removeChild(A);
return E
}});
dojox.gfx.Text.nodeType="text";
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(A){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
if(typeof (this.shape.path)=="string"){this.rawNode.setAttribute("d",this.shape.path)
}},setShape:function(A){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.rawNode.setAttribute("d",this.shape.path);
return this
}});
dojox.gfx.Path.nodeType="path";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(A){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
this._setTextPath()
},setShape:function(A){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this._setTextPath();
return this
},_setTextPath:function(){if(typeof this.shape.path!="string"){return 
}var H=this.rawNode;
if(!H.firstChild){var B=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var F=document.createTextNode("");
B.appendChild(F);
H.appendChild(B)
}var G=H.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
var A=G&&dojox.gfx.svg.getRef(G);
if(!A){var E=this._getParentSurface();
if(E){var D=E.defNode;
A=document.createElementNS(dojox.gfx.svg.xmlns.svg,"path");
var C=dojox.gfx._base._getUniqueId();
A.setAttribute("id",C);
D.appendChild(A);
H.firstChild.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href","#"+C)
}}if(A){A.setAttribute("d",this.shape.path)
}},_setText:function(){var B=this.rawNode;
if(!B.firstChild){var C=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var D=document.createTextNode("");
C.appendChild(D);
B.appendChild(C)
}B=B.firstChild;
var A=this.text;
B.setAttribute("alignment-baseline","middle");
switch(A.align){case"middle":B.setAttribute("text-anchor","middle");
B.setAttribute("startOffset","50%");
break;
case"end":B.setAttribute("text-anchor","end");
B.setAttribute("startOffset","100%");
break;
default:B.setAttribute("text-anchor","start");
B.setAttribute("startOffset","0%");
break
}B.setAttribute("baseline-shift","0.5ex");
B.setAttribute("text-decoration",A.decoration);
B.setAttribute("rotate",A.rotated?90:0);
B.setAttribute("kerning",A.kerning?"auto":0);
B.firstChild.data=A.text
}});
dojox.gfx.TextPath.nodeType="text";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setDimensions:function(A,B){if(!this.rawNode){return this
}this.rawNode.setAttribute("width",A);
this.rawNode.setAttribute("height",B);
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.getAttribute("width"),height:this.rawNode.getAttribute("height")}:null
}});
dojox.gfx.createSurface=function(A,C,E){var B=new dojox.gfx.Surface();
B.rawNode=document.createElementNS(dojox.gfx.svg.xmlns.svg,"svg");
B.rawNode.setAttribute("width",C);
B.rawNode.setAttribute("height",E);
var D=document.createElementNS(dojox.gfx.svg.xmlns.svg,"defs");
B.rawNode.appendChild(D);
B.defNode=D;
dojo.byId(A).appendChild(B.rawNode);
return B
};
dojox.gfx.svg.Font={_setFont:function(){var A=this.fontStyle;
this.rawNode.setAttribute("font-style",A.style);
this.rawNode.setAttribute("font-variant",A.variant);
this.rawNode.setAttribute("font-weight",A.weight);
this.rawNode.setAttribute("font-size",A.size);
this.rawNode.setAttribute("font-family",A.family)
}};
dojox.gfx.svg.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){this.rawNode.appendChild(A.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(B,A){if(this==B.getParent()){if(this.rawNode==B.rawNode.parentNode){this.rawNode.removeChild(B.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var A=this.rawNode;
while(A.lastChild){A.removeChild(A.lastChild)
}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createObject:function(C,A){if(!this.rawNode){return null
}var D=new C();
var B=document.createElementNS(dojox.gfx.svg.xmlns.svg,C.nodeType);
D.setRawNode(B);
this.rawNode.appendChild(B);
D.setShape(A);
this.add(D);
return D
}});
dojo.extend(dojox.gfx.Text,dojox.gfx.svg.Font);
dojo.extend(dojox.gfx.TextPath,dojox.gfx.svg.Font);
dojo.extend(dojox.gfx.Group,dojox.gfx.svg.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.svg.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
};