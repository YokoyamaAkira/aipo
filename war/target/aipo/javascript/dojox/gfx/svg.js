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
dojo.extend(dojox.gfx.Shape,{setFill:function(D){if(!D){this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this
}var B;
var E=function(F){this.setAttribute(F,B[F].toFixed(8))
};
if(typeof (D)=="object"&&"type" in D){switch(D.type){case"linear":B=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,D);
var C=this._setFillObject(B,"linearGradient");
dojo.forEach(["x1","y1","x2","y2"],E,C);
break;
case"radial":B=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,D);
var C=this._setFillObject(B,"radialGradient");
dojo.forEach(["cx","cy","r"],E,C);
break;
case"pattern":B=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,D);
var A=this._setFillObject(B,"pattern");
dojo.forEach(["x","y","width","height"],E,A);
break
}this.fillStyle=B;
return this
}var B=dojox.gfx.normalizeColor(D);
this.fillStyle=B;
this.rawNode.setAttribute("fill",B.toCss());
this.rawNode.setAttribute("fill-opacity",B.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this
},setStroke:function(E){if(!E){this.strokeStyle=null;
this.rawNode.setAttribute("stroke","none");
this.rawNode.setAttribute("stroke-opacity",0);
return this
}if(typeof E=="string"){E={color:E}
}var C=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,E);
C.color=dojox.gfx.normalizeColor(C.color);
var D=this.rawNode;
if(C){D.setAttribute("stroke",C.color.toCss());
D.setAttribute("stroke-opacity",C.color.a);
D.setAttribute("stroke-width",C.width);
D.setAttribute("stroke-linecap",C.cap);
if(typeof C.join=="number"){D.setAttribute("stroke-linejoin","miter");
D.setAttribute("stroke-miterlimit",C.join)
}else{D.setAttribute("stroke-linejoin",C.join)
}var A=C.style.toLowerCase();
if(A in dojox.gfx.svg.dasharray){A=dojox.gfx.svg.dasharray[A]
}if(A instanceof Array){A=dojo.clone(A);
for(var B=0;
B<A.length;
++B){A[B]*=C.width
}if(C.cap!="butt"){for(var B=0;
B<A.length;
B+=2){A[B]-=C.width;
if(A[B]<1){A[B]=1
}}for(var B=1;
B<A.length;
B+=2){A[B]+=C.width
}}A=A.join(",")
}D.setAttribute("stroke-dasharray",A);
D.setAttribute("dojoGfxStrokeStyle",C.style)
}return this
},_getParentSurface:function(){var A=this.parent;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}return A
},_setFillObject:function(J,F){var E=dojox.gfx.svg.xmlns.svg;
this.fillStyle=J;
var B=this._getParentSurface();
var G=B.defNode;
var M=this.rawNode.getAttribute("fill");
var C=dojox.gfx.svg.getRef(M);
if(C){M=C;
if(M.tagName.toLowerCase()!=F.toLowerCase()){var A=M.id;
M.parentNode.removeChild(M);
M=document.createElementNS(E,F);
M.setAttribute("id",A);
G.appendChild(M)
}else{while(M.childNodes.length){M.removeChild(M.lastChild)
}}}else{M=document.createElementNS(E,F);
M.setAttribute("id",dojox.gfx._base._getUniqueId());
G.appendChild(M)
}if(F=="pattern"){if(dojo.isSafari){M.setAttributeNS(null,"patternUnits","userSpaceOnUse")
}else{M.setAttribute("patternUnits","userSpaceOnUse")
}var I=document.createElementNS(E,"image");
I.setAttribute("x",0);
I.setAttribute("y",0);
I.setAttribute("width",J.width.toFixed(8));
I.setAttribute("height",J.height.toFixed(8));
I.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",J.src);
M.appendChild(I)
}else{if(dojo.isSafari){M.setAttributeNS(null,"gradientUnits","userSpaceOnUse")
}else{M.setAttribute("gradientUnits","userSpaceOnUse")
}for(var H=0;
H<J.colors.length;
++H){var K=J.colors[H],L=document.createElementNS(E,"stop"),D=K.color=dojox.gfx.normalizeColor(K.color);
L.setAttribute("offset",K.offset.toFixed(8));
L.setAttribute("stop-color",D.toCss());
L.setAttribute("stop-opacity",D.a);
M.appendChild(L)
}}this.rawNode.setAttribute("fill","url(#"+M.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return M
},_applyTransform:function(){var B=this.matrix;
if(B){var A=this.matrix;
this.rawNode.setAttribute("transform","matrix("+A.xx.toFixed(8)+","+A.yx.toFixed(8)+","+A.xy.toFixed(8)+","+A.yy.toFixed(8)+","+A.dx.toFixed(8)+","+A.dy.toFixed(8)+")")
}else{this.rawNode.removeAttribute("transform")
}return this
},setRawNode:function(B){var A=this.rawNode=B;
A.setAttribute("fill","none");
A.setAttribute("fill-opacity",0);
A.setAttribute("stroke","none");
A.setAttribute("stroke-opacity",0);
A.setAttribute("stroke-width",1);
A.setAttribute("stroke-linecap","butt");
A.setAttribute("stroke-linejoin","miter");
A.setAttribute("stroke-miterlimit",4)
},setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
for(var B in this.shape){if(B!="type"){this.rawNode.setAttribute(B,this.shape[B])
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
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
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
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(D,B){if(D&&D instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:D});
if(B&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,D)
}this.box=null;
var A=[];
var E=this.shape.points;
for(var C=0;
C<E.length;
++C){if(typeof E[C]=="number"){A.push(E[C].toFixed(8))
}else{A.push(E[C].x.toFixed(8));
A.push(E[C].y.toFixed(8))
}}this.rawNode.setAttribute("points",A.join(" "));
return this
}});
dojox.gfx.Polyline.nodeType="polyline";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var C=this.rawNode;
for(var B in this.shape){if(B!="type"&&B!="src"){C.setAttribute(B,this.shape[B])
}}C.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",this.shape.src);
return this
}});
dojox.gfx.Image.nodeType="image";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(A){this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var C=this.rawNode;
var B=this.shape;
C.setAttribute("x",B.x);
C.setAttribute("y",B.y);
C.setAttribute("text-anchor",B.align);
C.setAttribute("text-decoration",B.decoration);
C.setAttribute("rotate",B.rotated?90:0);
C.setAttribute("kerning",B.kerning?"auto":0);
C.setAttribute("text-rendering","optimizeLegibility");
C.textContent=B.text;
return this
},getTextWidth:function(){var E=this.rawNode;
var C=E.parentNode;
var B=E.cloneNode(true);
B.style.visibility="hidden";
var A=0;
var D=B.firstChild.nodeValue;
C.appendChild(B);
if(D!=""){while(!A){A=parseInt(B.getBBox().width)
}}C.removeChild(B);
return A
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
}var E=this.rawNode;
if(!E.firstChild){var G=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var C=document.createTextNode("");
G.appendChild(C);
E.appendChild(G)
}var D=E.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
var F=D&&dojox.gfx.svg.getRef(D);
if(!F){var B=this._getParentSurface();
if(B){var A=B.defNode;
F=document.createElementNS(dojox.gfx.svg.xmlns.svg,"path");
var H=dojox.gfx._base._getUniqueId();
F.setAttribute("id",H);
A.appendChild(F);
E.firstChild.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href","#"+H)
}}if(F){F.setAttribute("d",this.shape.path)
}},_setText:function(){var C=this.rawNode;
if(!C.firstChild){var D=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var A=document.createTextNode("");
D.appendChild(A);
C.appendChild(D)
}C=C.firstChild;
var B=this.text;
C.setAttribute("alignment-baseline","middle");
switch(B.align){case"middle":C.setAttribute("text-anchor","middle");
C.setAttribute("startOffset","50%");
break;
case"end":C.setAttribute("text-anchor","end");
C.setAttribute("startOffset","100%");
break;
default:C.setAttribute("text-anchor","start");
C.setAttribute("startOffset","0%");
break
}C.setAttribute("baseline-shift","0.5ex");
C.setAttribute("text-decoration",B.decoration);
C.setAttribute("rotate",B.rotated?90:0);
C.setAttribute("kerning",B.kerning?"auto":0);
C.firstChild.data=B.text
}});
dojox.gfx.TextPath.nodeType="text";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setDimensions:function(B,A){if(!this.rawNode){return this
}this.rawNode.setAttribute("width",B);
this.rawNode.setAttribute("height",A);
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.getAttribute("width"),height:this.rawNode.getAttribute("height")}:null
}});
dojox.gfx.createSurface=function(B,D,A){var C=new dojox.gfx.Surface();
C.rawNode=document.createElementNS(dojox.gfx.svg.xmlns.svg,"svg");
C.rawNode.setAttribute("width",D);
C.rawNode.setAttribute("height",A);
var E=document.createElementNS(dojox.gfx.svg.xmlns.svg,"defs");
C.rawNode.appendChild(E);
C.defNode=E;
dojo.byId(B).appendChild(C.rawNode);
return C
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
},remove:function(A,B){if(this==A.getParent()){if(this.rawNode==A.rawNode.parentNode){this.rawNode.removeChild(A.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var A=this.rawNode;
while(A.lastChild){A.removeChild(A.lastChild)
}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createObject:function(D,B){if(!this.rawNode){return null
}var A=new D();
var C=document.createElementNS(dojox.gfx.svg.xmlns.svg,D.nodeType);
A.setRawNode(C);
this.rawNode.appendChild(C);
A.setShape(B);
this.add(A);
return A
}});
dojo.extend(dojox.gfx.Text,dojox.gfx.svg.Font);
dojo.extend(dojox.gfx.TextPath,dojox.gfx.svg.Font);
dojo.extend(dojox.gfx.Group,dojox.gfx.svg.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.svg.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
};