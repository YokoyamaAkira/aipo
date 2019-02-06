dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.svg"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.svg"]){A._hasResource["dojox.gfx.svg"]=true;
A.provide("dojox.gfx.svg");
A.require("dojox.gfx._base");
A.require("dojox.gfx.shape");
A.require("dojox.gfx.path");
dojox.gfx.svg.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};
dojox.gfx.svg.getRef=function(B){if(!B||B=="none"){return null
}if(B.match(/^url\(#.+\)$/)){return A.byId(B.slice(5,-1))
}if(B.match(/^#dojoUnique\d+$/)){return A.byId(B.slice(1))
}return null
};
dojox.gfx.svg.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
A.extend(dojox.gfx.Shape,{setFill:function(F){if(!F){this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this
}var D;
var B=function(G){this.setAttribute(G,D[G].toFixed(8))
};
if(typeof (F)=="object"&&"type" in F){switch(F.type){case"linear":D=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,F);
var E=this._setFillObject(D,"linearGradient");
A.forEach(["x1","y1","x2","y2"],B,E);
break;
case"radial":D=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,F);
var E=this._setFillObject(D,"radialGradient");
A.forEach(["cx","cy","r"],B,E);
break;
case"pattern":D=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,F);
var C=this._setFillObject(D,"pattern");
A.forEach(["x","y","width","height"],B,C);
break
}this.fillStyle=D;
return this
}var D=dojox.gfx.normalizeColor(F);
this.fillStyle=D;
this.rawNode.setAttribute("fill",D.toCss());
this.rawNode.setAttribute("fill-opacity",D.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this
},setStroke:function(B){if(!B){this.strokeStyle=null;
this.rawNode.setAttribute("stroke","none");
this.rawNode.setAttribute("stroke-opacity",0);
return this
}if(typeof B=="string"){B={color:B}
}var E=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,B);
E.color=dojox.gfx.normalizeColor(E.color);
var F=this.rawNode;
if(E){F.setAttribute("stroke",E.color.toCss());
F.setAttribute("stroke-opacity",E.color.a);
F.setAttribute("stroke-width",E.width);
F.setAttribute("stroke-linecap",E.cap);
if(typeof E.join=="number"){F.setAttribute("stroke-linejoin","miter");
F.setAttribute("stroke-miterlimit",E.join)
}else{F.setAttribute("stroke-linejoin",E.join)
}var C=E.style.toLowerCase();
if(C in dojox.gfx.svg.dasharray){C=dojox.gfx.svg.dasharray[C]
}if(C instanceof Array){C=A.clone(C);
for(var D=0;
D<C.length;
++D){C[D]*=E.width
}if(E.cap!="butt"){for(var D=0;
D<C.length;
D+=2){C[D]-=E.width;
if(C[D]<1){C[D]=1
}}for(var D=1;
D<C.length;
D+=2){C[D]+=E.width
}}C=C.join(",")
}F.setAttribute("stroke-dasharray",C);
F.setAttribute("dojoGfxStrokeStyle",E.style)
}return this
},_getParentSurface:function(){var B=this.parent;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}return B
},_setFillObject:function(I,D){var C=dojox.gfx.svg.xmlns.svg;
this.fillStyle=I;
var N=this._getParentSurface();
var F=N.defNode;
var L=this.rawNode.getAttribute("fill");
var E=dojox.gfx.svg.getRef(L);
if(E){L=E;
if(L.tagName.toLowerCase()!=D.toLowerCase()){var M=L.id;
L.parentNode.removeChild(L);
L=document.createElementNS(C,D);
L.setAttribute("id",M);
F.appendChild(L)
}else{while(L.childNodes.length){L.removeChild(L.lastChild)
}}}else{L=document.createElementNS(C,D);
L.setAttribute("id",dojox.gfx._base._getUniqueId());
F.appendChild(L)
}if(D=="pattern"){if(A.isSafari){L.setAttributeNS(null,"patternUnits","userSpaceOnUse")
}else{L.setAttribute("patternUnits","userSpaceOnUse")
}var H=document.createElementNS(C,"image");
H.setAttribute("x",0);
H.setAttribute("y",0);
H.setAttribute("width",I.width.toFixed(8));
H.setAttribute("height",I.height.toFixed(8));
H.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",I.src);
L.appendChild(H)
}else{if(A.isSafari){L.setAttributeNS(null,"gradientUnits","userSpaceOnUse")
}else{L.setAttribute("gradientUnits","userSpaceOnUse")
}for(var G=0;
G<I.colors.length;
++G){var J=I.colors[G],K=document.createElementNS(C,"stop"),B=J.color=dojox.gfx.normalizeColor(J.color);
K.setAttribute("offset",J.offset.toFixed(8));
K.setAttribute("stop-color",B.toCss());
K.setAttribute("stop-opacity",B.a);
L.appendChild(K)
}}this.rawNode.setAttribute("fill","url(#"+L.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return L
},_applyTransform:function(){var B=this.matrix;
if(B){var C=this.matrix;
this.rawNode.setAttribute("transform","matrix("+C.xx.toFixed(8)+","+C.yx.toFixed(8)+","+C.xy.toFixed(8)+","+C.yy.toFixed(8)+","+C.dx.toFixed(8)+","+C.dy.toFixed(8)+")")
}else{this.rawNode.removeAttribute("transform")
}return this
},setRawNode:function(B){var C=this.rawNode=B;
C.setAttribute("fill","none");
C.setAttribute("fill-opacity",0);
C.setAttribute("stroke","none");
C.setAttribute("stroke-opacity",0);
C.setAttribute("stroke-width",1);
C.setAttribute("stroke-linecap","butt");
C.setAttribute("stroke-linejoin","miter");
C.setAttribute("stroke-miterlimit",4)
},setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
for(var B in this.shape){if(B!="type"){this.rawNode.setAttribute(B,this.shape[B])
}}return this
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);
return this
}});
A.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setRawNode:function(B){this.rawNode=B
}});
dojox.gfx.Group.nodeType="g";
A.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
for(var B in this.shape){if(B!="type"&&B!="r"){this.rawNode.setAttribute(B,this.shape[B])
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
A.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(F,D){if(F&&F instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:F});
if(D&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,F)
}this.box=null;
var C=[];
var B=this.shape.points;
for(var E=0;
E<B.length;
++E){if(typeof B[E]=="number"){C.push(B[E].toFixed(8))
}else{C.push(B[E].x.toFixed(8));
C.push(B[E].y.toFixed(8))
}}this.rawNode.setAttribute("points",C.join(" "));
return this
}});
dojox.gfx.Polyline.nodeType="polyline";
A.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var B=this.rawNode;
for(var D in this.shape){if(D!="type"&&D!="src"){B.setAttribute(D,this.shape[D])
}}B.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",this.shape.src);
return this
}});
dojox.gfx.Image.nodeType="image";
A.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(C){this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var B=this.rawNode;
var D=this.shape;
B.setAttribute("x",D.x);
B.setAttribute("y",D.y);
B.setAttribute("text-anchor",D.align);
B.setAttribute("text-decoration",D.decoration);
B.setAttribute("rotate",D.rotated?90:0);
B.setAttribute("kerning",D.kerning?"auto":0);
B.setAttribute("text-rendering","optimizeLegibility");
B.textContent=D.text;
return this
},getTextWidth:function(){var B=this.rawNode;
var E=B.parentNode;
var D=B.cloneNode(true);
D.style.visibility="hidden";
var C=0;
var F=D.firstChild.nodeValue;
E.appendChild(D);
if(F!=""){while(!C){C=parseInt(D.getBBox().width)
}}E.removeChild(D);
return C
}});
dojox.gfx.Text.nodeType="text";
A.declare("dojox.gfx.Path",dojox.gfx.path.Path,{_updateWithSegment:function(B){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
if(typeof (this.shape.path)=="string"){this.rawNode.setAttribute("d",this.shape.path)
}},setShape:function(B){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.rawNode.setAttribute("d",this.shape.path);
return this
}});
dojox.gfx.Path.nodeType="path";
A.declare("dojox.gfx.TextPath",dojox.gfx.path.TextPath,{_updateWithSegment:function(B){dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
this._setTextPath()
},setShape:function(B){dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this._setTextPath();
return this
},_setTextPath:function(){if(typeof this.shape.path!="string"){return 
}var C=this.rawNode;
if(!C.firstChild){var E=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var H=document.createTextNode("");
E.appendChild(H);
C.appendChild(E)
}var I=C.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
var D=I&&dojox.gfx.svg.getRef(I);
if(!D){var G=this._getParentSurface();
if(G){var F=G.defNode;
D=document.createElementNS(dojox.gfx.svg.xmlns.svg,"path");
var B=dojox.gfx._base._getUniqueId();
D.setAttribute("id",B);
F.appendChild(D);
C.firstChild.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href","#"+B)
}}if(D){D.setAttribute("d",this.shape.path)
}},_setText:function(){var E=this.rawNode;
if(!E.firstChild){var B=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var C=document.createTextNode("");
B.appendChild(C);
E.appendChild(B)
}E=E.firstChild;
var D=this.text;
E.setAttribute("alignment-baseline","middle");
switch(D.align){case"middle":E.setAttribute("text-anchor","middle");
E.setAttribute("startOffset","50%");
break;
case"end":E.setAttribute("text-anchor","end");
E.setAttribute("startOffset","100%");
break;
default:E.setAttribute("text-anchor","start");
E.setAttribute("startOffset","0%");
break
}E.setAttribute("baseline-shift","0.5ex");
E.setAttribute("text-decoration",D.decoration);
E.setAttribute("rotate",D.rotated?90:0);
E.setAttribute("kerning",D.kerning?"auto":0);
E.firstChild.data=D.text
}});
dojox.gfx.TextPath.nodeType="text";
A.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setDimensions:function(B,C){if(!this.rawNode){return this
}this.rawNode.setAttribute("width",B);
this.rawNode.setAttribute("height",C);
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.getAttribute("width"),height:this.rawNode.getAttribute("height")}:null
}});
dojox.gfx.createSurface=function(D,F,C){var E=new dojox.gfx.Surface();
E.rawNode=document.createElementNS(dojox.gfx.svg.xmlns.svg,"svg");
E.rawNode.setAttribute("width",F);
E.rawNode.setAttribute("height",C);
var B=document.createElementNS(dojox.gfx.svg.xmlns.svg,"defs");
E.rawNode.appendChild(B);
E.defNode=B;
A.byId(D).appendChild(E.rawNode);
return E
};
dojox.gfx.svg.Font={_setFont:function(){var B=this.fontStyle;
this.rawNode.setAttribute("font-style",B.style);
this.rawNode.setAttribute("font-variant",B.variant);
this.rawNode.setAttribute("font-weight",B.weight);
this.rawNode.setAttribute("font-size",B.size);
this.rawNode.setAttribute("font-family",B.family)
}};
dojox.gfx.svg.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){this.rawNode.appendChild(B.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(C,B){if(this==C.getParent()){if(this.rawNode==C.rawNode.parentNode){this.rawNode.removeChild(C.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var B=this.rawNode;
while(B.lastChild){B.removeChild(B.lastChild)
}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
A.mixin(dojox.gfx.shape.Creator,{createObject:function(B,D){if(!this.rawNode){return null
}var C=new B();
var E=document.createElementNS(dojox.gfx.svg.xmlns.svg,B.nodeType);
C.setRawNode(E);
this.rawNode.appendChild(E);
C.setShape(D);
this.add(C);
return C
}});
A.extend(dojox.gfx.Text,dojox.gfx.svg.Font);
A.extend(dojox.gfx.TextPath,dojox.gfx.svg.Font);
A.extend(dojox.gfx.Group,dojox.gfx.svg.Container);
A.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
A.extend(dojox.gfx.Surface,dojox.gfx.svg.Container);
A.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
}}});