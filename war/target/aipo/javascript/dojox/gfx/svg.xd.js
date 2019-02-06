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
A.extend(dojox.gfx.Shape,{setFill:function(E){if(!E){this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this
}var C;
var F=function(G){this.setAttribute(G,C[G].toFixed(8))
};
if(typeof (E)=="object"&&"type" in E){switch(E.type){case"linear":C=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,E);
var D=this._setFillObject(C,"linearGradient");
A.forEach(["x1","y1","x2","y2"],F,D);
break;
case"radial":C=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,E);
var D=this._setFillObject(C,"radialGradient");
A.forEach(["cx","cy","r"],F,D);
break;
case"pattern":C=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,E);
var B=this._setFillObject(C,"pattern");
A.forEach(["x","y","width","height"],F,B);
break
}this.fillStyle=C;
return this
}var C=dojox.gfx.normalizeColor(E);
this.fillStyle=C;
this.rawNode.setAttribute("fill",C.toCss());
this.rawNode.setAttribute("fill-opacity",C.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this
},setStroke:function(F){if(!F){this.strokeStyle=null;
this.rawNode.setAttribute("stroke","none");
this.rawNode.setAttribute("stroke-opacity",0);
return this
}if(typeof F=="string"){F={color:F}
}var D=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,F);
D.color=dojox.gfx.normalizeColor(D.color);
var E=this.rawNode;
if(D){E.setAttribute("stroke",D.color.toCss());
E.setAttribute("stroke-opacity",D.color.a);
E.setAttribute("stroke-width",D.width);
E.setAttribute("stroke-linecap",D.cap);
if(typeof D.join=="number"){E.setAttribute("stroke-linejoin","miter");
E.setAttribute("stroke-miterlimit",D.join)
}else{E.setAttribute("stroke-linejoin",D.join)
}var B=D.style.toLowerCase();
if(B in dojox.gfx.svg.dasharray){B=dojox.gfx.svg.dasharray[B]
}if(B instanceof Array){B=A.clone(B);
for(var C=0;
C<B.length;
++C){B[C]*=D.width
}if(D.cap!="butt"){for(var C=0;
C<B.length;
C+=2){B[C]-=D.width;
if(B[C]<1){B[C]=1
}}for(var C=1;
C<B.length;
C+=2){B[C]+=D.width
}}B=B.join(",")
}E.setAttribute("stroke-dasharray",B);
E.setAttribute("dojoGfxStrokeStyle",D.style)
}return this
},_getParentSurface:function(){var B=this.parent;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}return B
},_setFillObject:function(K,G){var F=dojox.gfx.svg.xmlns.svg;
this.fillStyle=K;
var C=this._getParentSurface();
var H=C.defNode;
var N=this.rawNode.getAttribute("fill");
var D=dojox.gfx.svg.getRef(N);
if(D){N=D;
if(N.tagName.toLowerCase()!=G.toLowerCase()){var B=N.id;
N.parentNode.removeChild(N);
N=document.createElementNS(F,G);
N.setAttribute("id",B);
H.appendChild(N)
}else{while(N.childNodes.length){N.removeChild(N.lastChild)
}}}else{N=document.createElementNS(F,G);
N.setAttribute("id",dojox.gfx._base._getUniqueId());
H.appendChild(N)
}if(G=="pattern"){if(A.isSafari){N.setAttributeNS(null,"patternUnits","userSpaceOnUse")
}else{N.setAttribute("patternUnits","userSpaceOnUse")
}var J=document.createElementNS(F,"image");
J.setAttribute("x",0);
J.setAttribute("y",0);
J.setAttribute("width",K.width.toFixed(8));
J.setAttribute("height",K.height.toFixed(8));
J.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",K.src);
N.appendChild(J)
}else{if(A.isSafari){N.setAttributeNS(null,"gradientUnits","userSpaceOnUse")
}else{N.setAttribute("gradientUnits","userSpaceOnUse")
}for(var I=0;
I<K.colors.length;
++I){var L=K.colors[I],M=document.createElementNS(F,"stop"),E=L.color=dojox.gfx.normalizeColor(L.color);
M.setAttribute("offset",L.offset.toFixed(8));
M.setAttribute("stop-color",E.toCss());
M.setAttribute("stop-opacity",E.a);
N.appendChild(M)
}}this.rawNode.setAttribute("fill","url(#"+N.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return N
},_applyTransform:function(){var C=this.matrix;
if(C){var B=this.matrix;
this.rawNode.setAttribute("transform","matrix("+B.xx.toFixed(8)+","+B.yx.toFixed(8)+","+B.xy.toFixed(8)+","+B.yy.toFixed(8)+","+B.dx.toFixed(8)+","+B.dy.toFixed(8)+")")
}else{this.rawNode.removeAttribute("transform")
}return this
},setRawNode:function(C){var B=this.rawNode=C;
B.setAttribute("fill","none");
B.setAttribute("fill-opacity",0);
B.setAttribute("stroke","none");
B.setAttribute("stroke-opacity",0);
B.setAttribute("stroke-width",1);
B.setAttribute("stroke-linecap","butt");
B.setAttribute("stroke-linejoin","miter");
B.setAttribute("stroke-miterlimit",4)
},setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
for(var C in this.shape){if(C!="type"){this.rawNode.setAttribute(C,this.shape[C])
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
A.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
for(var C in this.shape){if(C!="type"&&C!="r"){this.rawNode.setAttribute(C,this.shape[C])
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
A.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{setShape:function(E,C){if(E&&E instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:E});
if(C&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,E)
}this.box=null;
var B=[];
var F=this.shape.points;
for(var D=0;
D<F.length;
++D){if(typeof F[D]=="number"){B.push(F[D].toFixed(8))
}else{B.push(F[D].x.toFixed(8));
B.push(F[D].y.toFixed(8))
}}this.rawNode.setAttribute("points",B.join(" "));
return this
}});
dojox.gfx.Polyline.nodeType="polyline";
A.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var D=this.rawNode;
for(var C in this.shape){if(C!="type"&&C!="src"){D.setAttribute(C,this.shape[C])
}}D.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href",this.shape.src);
return this
}});
dojox.gfx.Image.nodeType="image";
A.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{setShape:function(B){this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var D=this.rawNode;
var C=this.shape;
D.setAttribute("x",C.x);
D.setAttribute("y",C.y);
D.setAttribute("text-anchor",C.align);
D.setAttribute("text-decoration",C.decoration);
D.setAttribute("rotate",C.rotated?90:0);
D.setAttribute("kerning",C.kerning?"auto":0);
D.setAttribute("text-rendering","optimizeLegibility");
D.textContent=C.text;
return this
},getTextWidth:function(){var F=this.rawNode;
var D=F.parentNode;
var C=F.cloneNode(true);
C.style.visibility="hidden";
var B=0;
var E=C.firstChild.nodeValue;
D.appendChild(C);
if(E!=""){while(!B){B=parseInt(C.getBBox().width)
}}D.removeChild(C);
return B
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
}var F=this.rawNode;
if(!F.firstChild){var H=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var D=document.createTextNode("");
H.appendChild(D);
F.appendChild(H)
}var E=F.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
var G=E&&dojox.gfx.svg.getRef(E);
if(!G){var C=this._getParentSurface();
if(C){var B=C.defNode;
G=document.createElementNS(dojox.gfx.svg.xmlns.svg,"path");
var I=dojox.gfx._base._getUniqueId();
G.setAttribute("id",I);
B.appendChild(G);
F.firstChild.setAttributeNS(dojox.gfx.svg.xmlns.xlink,"href","#"+I)
}}if(G){G.setAttribute("d",this.shape.path)
}},_setText:function(){var D=this.rawNode;
if(!D.firstChild){var E=document.createElementNS(dojox.gfx.svg.xmlns.svg,"textPath");
var B=document.createTextNode("");
E.appendChild(B);
D.appendChild(E)
}D=D.firstChild;
var C=this.text;
D.setAttribute("alignment-baseline","middle");
switch(C.align){case"middle":D.setAttribute("text-anchor","middle");
D.setAttribute("startOffset","50%");
break;
case"end":D.setAttribute("text-anchor","end");
D.setAttribute("startOffset","100%");
break;
default:D.setAttribute("text-anchor","start");
D.setAttribute("startOffset","0%");
break
}D.setAttribute("baseline-shift","0.5ex");
D.setAttribute("text-decoration",C.decoration);
D.setAttribute("rotate",C.rotated?90:0);
D.setAttribute("kerning",C.kerning?"auto":0);
D.firstChild.data=C.text
}});
dojox.gfx.TextPath.nodeType="text";
A.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.svg.Container._init.call(this)
},setDimensions:function(C,B){if(!this.rawNode){return this
}this.rawNode.setAttribute("width",C);
this.rawNode.setAttribute("height",B);
return this
},getDimensions:function(){return this.rawNode?{width:this.rawNode.getAttribute("width"),height:this.rawNode.getAttribute("height")}:null
}});
dojox.gfx.createSurface=function(C,E,B){var D=new dojox.gfx.Surface();
D.rawNode=document.createElementNS(dojox.gfx.svg.xmlns.svg,"svg");
D.rawNode.setAttribute("width",E);
D.rawNode.setAttribute("height",B);
var F=document.createElementNS(dojox.gfx.svg.xmlns.svg,"defs");
D.rawNode.appendChild(F);
D.defNode=F;
A.byId(C).appendChild(D.rawNode);
return D
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
},remove:function(B,C){if(this==B.getParent()){if(this.rawNode==B.rawNode.parentNode){this.rawNode.removeChild(B.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var B=this.rawNode;
while(B.lastChild){B.removeChild(B.lastChild)
}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
A.mixin(dojox.gfx.shape.Creator,{createObject:function(E,C){if(!this.rawNode){return null
}var B=new E();
var D=document.createElementNS(dojox.gfx.svg.xmlns.svg,E.nodeType);
B.setRawNode(D);
this.rawNode.appendChild(D);
B.setShape(C);
this.add(B);
return B
}});
A.extend(dojox.gfx.Text,dojox.gfx.svg.Font);
A.extend(dojox.gfx.TextPath,dojox.gfx.svg.Font);
A.extend(dojox.gfx.Group,dojox.gfx.svg.Container);
A.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
A.extend(dojox.gfx.Surface,dojox.gfx.svg.Container);
A.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
}}});