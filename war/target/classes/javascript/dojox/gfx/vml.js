if(!dojo._hasResource["dojox.gfx.vml"]){dojo._hasResource["dojox.gfx.vml"]=true;
dojo.provide("dojox.gfx.vml");
dojo.require("dojox.gfx._base");
dojo.require("dojox.gfx.shape");
dojo.require("dojox.gfx.path");
dojo.require("dojox.gfx.arc");
dojox.gfx.vml.xmlns="urn:schemas-microsoft-com:vml";
dojox.gfx.vml.text_alignment={start:"left",middle:"center",end:"right"};
dojox.gfx.vml._parseFloat=function(A){return A.match(/^\d+f$/i)?parseInt(A)/65536:parseFloat(A)
};
dojox.gfx.vml._bool={t:1,"true":1};
dojo.extend(dojox.gfx.Shape,{setFill:function(P){if(!P){this.fillStyle=null;
this.rawNode.filled="f";
return this
}if(typeof P=="object"&&"type" in P){switch(P.type){case"linear":var H=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,P),Q=[],M=H.colors,L=this._getRealMatrix(),C=dojox.gfx.matrix;
this.fillStyle=H;
dojo.forEach(M,function(S,T,R){R[T].color=dojox.gfx.normalizeColor(S.color)
});
if(M[0].offset>0){Q.push("0 "+M[0].color.toHex())
}for(var E=0;
E<M.length;
++E){Q.push(M[E].offset.toFixed(8)+" "+M[E].color.toHex())
}var E=M.length-1;
if(M[E].offset<1){Q.push("1 "+M[E].color.toHex())
}var K=this.rawNode.fill;
K.colors.value=Q.join(";");
K.method="sigma";
K.type="gradient";
var I=L?C.multiplyPoint(L,H.x1,H.y1):{x:H.x1,y:H.y1},G=L?C.multiplyPoint(L,H.x2,H.y2):{x:H.x2,y:H.y2};
K.angle=(C._radToDeg(Math.atan2(G.x-I.x,G.y-I.y))+180)%360;
K.on=true;
break;
case"radial":var H=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,P);
this.fillStyle=H;
var D=parseFloat(this.rawNode.style.left),O=parseFloat(this.rawNode.style.top),N=parseFloat(this.rawNode.style.width),F=parseFloat(this.rawNode.style.height),J=isNaN(N)?1:2*H.r/N,M=new Array(H.colors.length);
dojo.forEach(H.colors,function(R,S){M[S]={offset:1-R.offset*J,color:dojox.gfx.normalizeColor(R.color)}
});
var E=M.length-1;
while(E>=0&&M[E].offset<0){--E
}if(E<M.length-1){var A=M[E],B=M[E+1];
B.color=dojo.blendColors(A.color,B.color,A.offset/(A.offset-B.offset));
B.offset=0;
while(M.length-E>2){M.pop()
}}var E=M.length-1,Q=[];
if(M[E].offset>0){Q.push("0 "+M[E].color.toHex())
}for(;
E>=0;
--E){Q.push(M[E].offset.toFixed(8)+" "+M[E].color.toHex())
}if(M[0].offset<1){Q.push("1 "+M[0].color.toHex())
}var K=this.rawNode.fill;
K.colors.value=Q.join(";");
K.method="sigma";
K.type="gradientradial";
if(isNaN(N)||isNaN(F)||isNaN(D)||isNaN(O)){K.focusposition="0.5 0.5"
}else{K.focusposition=((H.cx-D)/N).toFixed(8)+" "+((H.cy-O)/F).toFixed(8)
}K.focussize="0 0";
K.on=true;
break;
case"pattern":var H=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,P);
this.fillStyle=H;
var K=this.rawNode.fill;
K.type="tile";
K.src=H.src;
if(H.width&&H.height){K.size.x=dojox.gfx.px2pt(H.width);
K.size.y=dojox.gfx.px2pt(H.height)
}K.alignShape="f";
K.position.x=0;
K.position.y=0;
K.origin.x=H.width?H.x/H.width:0;
K.origin.y=H.height?H.y/H.height:0;
K.on=true;
break
}this.rawNode.fill.opacity=1;
return this
}this.fillStyle=dojox.gfx.normalizeColor(P);
this.rawNode.fillcolor=this.fillStyle.toHex();
this.rawNode.fill.opacity=this.fillStyle.a;
this.rawNode.filled=true;
return this
},setStroke:function(C){if(!C){this.strokeStyle=null;
this.rawNode.stroked="f";
return this
}if(typeof C=="string"){C={color:C}
}var A=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,C);
A.color=dojox.gfx.normalizeColor(A.color);
var B=this.rawNode;
B.stroked=true;
B.strokecolor=A.color.toCss();
B.strokeweight=A.width+"px";
if(B.stroke){B.stroke.opacity=A.color.a;
B.stroke.endcap=this._translate(this._capMap,A.cap);
if(typeof A.join=="number"){B.stroke.joinstyle="miter";
B.stroke.miterlimit=A.join
}else{B.stroke.joinstyle=A.join
}B.stroke.dashstyle=A.style=="none"?"Solid":A.style
}return this
},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(B,A){return(A in B)?B[A]:A
},_applyTransform:function(){if(this.fillStyle&&this.fillStyle.type=="linear"){this.setFill(this.fillStyle)
}var F=this._getRealMatrix();
if(!F){return this
}var J=this.rawNode.skew;
if(typeof J=="undefined"){for(var D=0;
D<this.rawNode.childNodes.length;
++D){if(this.rawNode.childNodes[D].tagName=="skew"){J=this.rawNode.childNodes[D];
break
}}}if(J){J.on="f";
var A=F.xx.toFixed(8)+" "+F.xy.toFixed(8)+" "+F.yx.toFixed(8)+" "+F.yy.toFixed(8)+" 0 0",C=Math.floor(F.dx).toFixed()+"px "+Math.floor(F.dy).toFixed()+"px",K=this.rawNode.style,B=parseFloat(K.left),I=parseFloat(K.top),H=parseFloat(K.width),E=parseFloat(K.height);
if(isNaN(B)){B=0
}if(isNaN(I)){I=0
}if(isNaN(H)){H=1
}if(isNaN(E)){E=1
}var G=(-B/H-0.5).toFixed(8)+" "+(-I/E-0.5).toFixed(8);
J.matrix=A;
J.origin=G;
J.offset=C;
J.on=true
}return this
},setRawNode:function(A){A.stroked="f";
A.filled="f";
this.rawNode=A
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){var A=this.rawNode,B=A.parentNode,C=B.firstChild;
B.insertBefore(A,C);
if(C.tagName=="rect"){C.swapNode(A)
}return this
},_getRealMatrix:function(){return this.parentMatrix?new dojox.gfx.Matrix2D([this.parentMatrix,this.matrix]):this.matrix
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},_applyTransform:function(){var A=this._getRealMatrix();
for(var B=0;
B<this.children.length;
++B){this.children[B]._updateParentMatrix(A)
}return this
}});
dojox.gfx.Group.nodeType="group";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(B){var A=this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var E=this.rawNode.style;
E.left=A.x.toFixed();
E.top=A.y.toFixed();
E.width=(typeof A.width=="string"&&A.width.indexOf("%")>=0)?A.width:A.width.toFixed();
E.height=(typeof A.width=="string"&&A.height.indexOf("%")>=0)?A.height:A.height.toFixed();
var F=Math.min(1,(A.r/Math.min(parseFloat(A.width),parseFloat(A.height)))).toFixed(8);
var D=this.rawNode.parentNode,G=null;
if(D){if(D.lastChild!=this.rawNode){for(var C=0;
C<D.childNodes.length;
++C){if(D.childNodes[C]==this.rawNode){G=D.childNodes[C+1];
break
}}}D.removeChild(this.rawNode)
}this.rawNode.arcsize=F;
if(D){if(G){D.insertBefore(this.rawNode,G)
}else{D.appendChild(this.rawNode)
}}return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)
}});
dojox.gfx.Rect.nodeType="roundrect";
dojo.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(B){var A=this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode.style;
C.left=(A.cx-A.rx).toFixed();
C.top=(A.cy-A.ry).toFixed();
C.width=(A.rx*2).toFixed();
C.height=(A.ry*2).toFixed();
return this.setTransform(this.matrix)
}});
dojox.gfx.Ellipse.nodeType="oval";
dojo.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(B){var A=this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode.style;
C.left=(A.cx-A.r).toFixed();
C.top=(A.cy-A.r).toFixed();
C.width=(A.r*2).toFixed();
C.height=(A.r*2).toFixed();
return this
}});
dojox.gfx.Circle.nodeType="oval";
dojo.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","line")
}},setShape:function(B){var A=this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
this.rawNode.path.v="m"+A.x1.toFixed()+" "+A.y1.toFixed()+"l"+A.x2.toFixed()+" "+A.y2.toFixed()+"e";
return this.setTransform(this.matrix)
}});
dojox.gfx.Line.nodeType="shape";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","polyline")
}},setShape:function(E,C){if(E&&E instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:E});
if(C&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,E)
}this.bbox=null;
var A=[],F=this.shape.points;
if(F.length>0){A.push("m");
var B=1;
if(typeof F[0]=="number"){A.push(F[0].toFixed());
A.push(F[1].toFixed());
B=2
}else{A.push(F[0].x.toFixed());
A.push(F[0].y.toFixed())
}if(F.length>B){A.push("l");
for(var D=B;
D<F.length;
++D){if(typeof F[D]=="number"){A.push(F[D].toFixed())
}else{A.push(F[D].x.toFixed());
A.push(F[D].y.toFixed())
}}}}A.push("e");
this.rawNode.path.v=A.join(" ");
return this.setTransform(this.matrix)
}});
dojox.gfx.Polyline.nodeType="shape";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","image")
}},getEventSource:function(){return this.rawNode?this.rawNode.firstChild:null
},setShape:function(B){var A=this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
var C=this.rawNode.firstChild;
C.src=A.src;
if(A.width||A.height){C.style.width=A.width;
C.style.height=A.height
}return this.setTransform(this.matrix)
},_applyTransform:function(){var A=this._getRealMatrix();
if(!A){return this
}A=dojox.gfx.matrix.multiply(A,{dx:this.shape.x,dy:this.shape.y});
var B=this.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
B.M11=A.xx;
B.M12=A.xy;
B.M21=A.yx;
B.M22=A.yy;
B.Dx=A.dx;
B.Dy=A.dy;
return this
}});
dojox.gfx.Image.nodeType="div";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","text")
}this.fontStyle=null
},_alignment:{start:"left",middle:"center",end:"right"},setShape:function(H){this.shape=dojox.gfx.makeParameters(this.shape,H);
this.bbox=null;
var A=this.rawNode,K=this.shape,G=K.x,E=K.y.toFixed();
switch(K.align){case"middle":G-=5;
break;
case"end":G-=10;
break
}this.rawNode.path.v="m"+G.toFixed()+","+E+"l"+(G+10).toFixed()+","+E+"e";
var B=null,I=null,D=A.childNodes;
for(var C=0;
C<D.length;
++C){var J=D[C].tagName;
if(J=="path"){B=D[C];
if(I){break
}}else{if(J=="textpath"){I=D[C];
if(B){break
}}}}if(!B){B=this.rawNode.ownerDocument.createElement("v:path");
A.appendChild(B)
}if(!I){I=this.rawNode.ownerDocument.createElement("v:textpath");
A.appendChild(I)
}B.textPathOk=true;
I.on=true;
var F=dojox.gfx.vml.text_alignment[K.align];
I.style["v-text-align"]=F?F:"left";
I.style["text-decoration"]=K.decoration;
I.style["v-rotate-letters"]=K.rotated;
I.style["v-text-kern"]=K.kerning;
I.string=K.text;
return this.setTransform(this.matrix)
},_setFont:function(){var B=this.fontStyle,C=this.rawNode.childNodes;
for(var A=0;
A<C.length;
++A){if(C[A].tagName=="textpath"){C[A].style.font=dojox.gfx.makeFontString(B);
break
}}this.setTransform(this.matrix)
},_getRealMatrix:function(){var A=dojox.gfx.Shape.prototype._getRealMatrix.call(this);
if(A){A=dojox.gfx.matrix.multiply(A,{dy:-dojox.gfx.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35})
}return A
},getTextWidth:function(){var C=this.rawNode,B=C.style.display;
C.style.display="inline";
var A=dojox.gfx.pt2px(parseFloat(C.currentStyle.width));
C.style.display=B;
return A
}});
dojox.gfx.Text.nodeType="shape";
dojox.gfx.path._calcArc=function(D){var B=Math.cos(D),A=Math.sin(D),C={x:B+(4/3)*(1-B),y:A-(4/3)*B*(1-B)/A};
return{s:{x:B,y:-A},c1:{x:C.x,y:-C.y},c2:C,e:{x:B,y:A}}
};
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{constructor:function(A){if(A&&!A.getAttribute("dojoGfxType")){A.setAttribute("dojoGfxType","path")
}this.vmlPath="";
this.lastControl={}
},_updateWithSegment:function(B){var A=dojo.clone(this.last);
dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var C=this[this.renderers[B.action]](B,A);
if(typeof this.vmlPath=="string"){this.vmlPath+=C.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e"
}else{this.vmlPath=this.vmlPath.concat(C)
}},setShape:function(A){this.vmlPath=[];
this.lastControl={};
dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.vmlPath=this.vmlPath.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e";
return this
},_pathVmlToSvgMap:{m:"M",l:"L",t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(D,B,E,A){if(typeof A=="undefined"){A=B.length
}if(typeof E=="undefined"){E=0
}for(var C=E;
C<A;
++C){D.push(" ");
D.push(B[C].toFixed())
}},_addArgsAdjusted:function(E,D,B,F,A){if(typeof A=="undefined"){A=B.length
}if(typeof F=="undefined"){F=0
}for(var C=F;
C<A;
C+=2){E.push(" ");
E.push((D.x+B[C]).toFixed());
E.push(" ");
E.push((D.y+B[C+1]).toFixed())
}},_moveToA:function(B){var C=[" m"],D=B.args,A=D.length;
if(A==2){this._addArgs(C,D)
}else{this._addArgs(C,D,0,2);
C.push(" l");
this._addArgs(C,D,2)
}this.lastControl={};
return C
},_moveToR:function(C,B){var D=["x" in B?" t":" m"],E=C.args,A=E.length;
if(A==2){this._addArgs(D,E)
}else{this._addArgs(D,E,0,2);
D.push(" r");
this._addArgs(D,E,2)
}this.lastControl={};
return D
},_lineToA:function(A){var B=[" l"];
this._addArgs(B,A.args);
this.lastControl={};
return B
},_lineToR:function(A){var B=[" r"];
this._addArgs(B,A.args);
this.lastControl={};
return B
},_hLineToA:function(D,C){var E=[" l"],G=D.args,A=G.length,F=" "+C.y.toFixed();
for(var B=0;
B<A;
++B){E.push(" ");
E.push(G[B].toFixed());
E.push(F)
}this.lastControl={};
return E
},_hLineToR:function(C){var D=[" r"],E=C.args,A=E.length;
for(var B=0;
B<A;
++B){D.push(" ");
D.push(E[B].toFixed());
D.push(" 0")
}this.lastControl={};
return D
},_vLineToA:function(E,D){var F=[" l"],G=E.args,B=G.length,A=" "+D.x.toFixed();
for(var C=0;
C<B;
++C){F.push(A);
F.push(" ");
F.push(G[C].toFixed())
}this.lastControl={};
return F
},_vLineToR:function(C){var D=[" r"],E=C.args,A=E.length;
for(var B=0;
B<A;
++B){D.push(" 0 ");
D.push(E[B].toFixed())
}this.lastControl={};
return D
},_curveToA:function(C){var D=[],E=C.args,A=E.length;
for(var B=0;
B<A;
B+=6){D.push(" c");
this._addArgs(D,E,B,B+6)
}this.lastControl={x:E[A-4],y:E[A-3],type:"C"};
return D
},_curveToR:function(D,C){var E=[],F=D.args,A=F.length;
for(var B=0;
B<A;
B+=6){E.push(" v");
this._addArgs(E,F,B,B+6);
this.lastControl={x:C.x+F[B+2],y:C.y+F[B+3]};
C.x+=F[B+4];
C.y+=F[B+5]
}this.lastControl.type="C";
return E
},_smoothCurveToA:function(D,C){var E=[],F=D.args,A=F.length;
for(var B=0;
B<A;
B+=4){E.push(" c");
if(this.lastControl.type=="C"){this._addArgs(E,[2*C.x-this.lastControl.x,2*C.y-this.lastControl.y])
}else{this._addArgs(E,[C.x,C.y])
}this._addArgs(E,F,B,B+4)
}this.lastControl={x:F[A-4],y:F[A-3],type:"C"};
return E
},_smoothCurveToR:function(D,C){var E=[],F=D.args,A=F.length;
for(var B=0;
B<A;
B+=4){E.push(" v");
if(this.lastControl.type=="C"){this._addArgs(E,[C.x-this.lastControl.x,C.y-this.lastControl.y])
}else{this._addArgs(E,[0,0])
}this._addArgs(E,F,B,B+4);
this.lastControl={x:C.x+F[B],y:C.y+F[B+1]};
C.x+=F[B+2];
C.y+=F[B+3]
}this.lastControl.type="C";
return E
},_qCurveToA:function(C){var D=[],E=C.args,A=E.length;
for(var B=0;
B<A;
B+=4){D.push(" qb");
this._addArgs(D,E,B,B+4)
}this.lastControl={x:E[A-4],y:E[A-3],type:"Q"};
return D
},_qCurveToR:function(D,C){var E=[],F=D.args,A=F.length;
for(var B=0;
B<A;
B+=4){E.push(" qb");
this._addArgsAdjusted(E,C,F,B,B+4);
this.lastControl={x:C.x+F[B],y:C.y+F[B+1]};
C.x+=F[B+2];
C.y+=F[B+3]
}this.lastControl.type="Q";
return E
},_qSmoothCurveToA:function(D,C){var E=[],F=D.args,A=F.length;
for(var B=0;
B<A;
B+=2){E.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(E,[this.lastControl.x=2*C.x-this.lastControl.x,this.lastControl.y=2*C.y-this.lastControl.y])
}else{this._addArgs(E,[this.lastControl.x=C.x,this.lastControl.y=C.y])
}this._addArgs(E,F,B,B+2)
}this.lastControl.type="Q";
return E
},_qSmoothCurveToR:function(D,C){var E=[],F=D.args,A=F.length;
for(var B=0;
B<A;
B+=2){E.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(E,[this.lastControl.x=2*C.x-this.lastControl.x,this.lastControl.y=2*C.y-this.lastControl.y])
}else{this._addArgs(E,[this.lastControl.x=C.x,this.lastControl.y=C.y])
}this._addArgsAdjusted(E,C,F,B,B+2)
}this.lastControl.type="Q";
return E
},_arcTo:function(H,J){var B=[],D=H.args,E=D.length,A=H.action=="a";
for(var G=0;
G<E;
G+=7){var C=D[G+5],I=D[G+6];
if(A){C+=J.x;
I+=J.y
}var K=dojox.gfx.arc.arcAsBezier(J,D[G],D[G+1],D[G+2],D[G+3]?1:0,D[G+4]?1:0,C,I);
for(var F=0;
F<K.length;
++F){B.push(" c");
this._addArgs(B,K[F])
}J={x:C,y:I}
}this.lastControl={};
return B
},_closePath:function(){this.lastControl={};
return["x"]
}});
dojox.gfx.Path.nodeType="shape";
dojo.declare("dojox.gfx.TextPath",dojox.gfx.Path,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","textpath")
}this.fontStyle=null;
if(!("text" in this)){this.text=dojo.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=dojo.clone(dojox.gfx.defaultFont)
}},setText:function(A){this.text=dojox.gfx.makeParameters(this.text,typeof A=="string"?{text:A}:A);
this._setText();
return this
},setFont:function(A){this.fontStyle=typeof A=="string"?dojox.gfx.splitFontString(A):dojox.gfx.makeParameters(dojox.gfx.defaultFont,A);
this._setFont();
return this
},_setText:function(){this.bbox=null;
var F=this.rawNode,E=this.text,G=null,D=null,H=F.childNodes;
for(var C=0;
C<H.length;
++C){var A=H[C].tagName;
if(A=="path"){G=H[C];
if(D){break
}}else{if(A=="textpath"){D=H[C];
if(G){break
}}}}if(!G){G=this.rawNode.ownerDocument.createElement("v:path");
F.appendChild(G)
}if(!D){D=this.rawNode.ownerDocument.createElement("v:textpath");
F.appendChild(D)
}G.textPathOk=true;
D.on=true;
var B=dojox.gfx.vml.text_alignment[E.align];
D.style["v-text-align"]=B?B:"left";
D.style["text-decoration"]=E.decoration;
D.style["v-rotate-letters"]=E.rotated;
D.style["v-text-kern"]=E.kerning;
D.string=E.text
},_setFont:function(){var B=this.fontStyle,C=this.rawNode.childNodes;
for(var A=0;
A<C.length;
++A){if(C[A].tagName=="textpath"){C[A].style.font=dojox.gfx.makeFontString(B);
break
}}}});
dojox.gfx.TextPath.nodeType="shape";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},setDimensions:function(E,A){this.width=dojox.gfx.normalizedLength(E);
this.height=dojox.gfx.normalizedLength(A);
if(!this.rawNode){return this
}var D=this.clipNode.style,F=this.rawNode,B=F.style,C=this.bgNode.style;
D.width=E;
D.height=A;
D.clip="rect(0 "+E+" "+A+" 0)";
B.width=E;
B.height=A;
F.coordsize=E+" "+A;
C.width=E;
C.height=A;
return this
},getDimensions:function(){var A=this.rawNode?{width:dojox.gfx.normalizedLength(this.rawNode.style.width),height:dojox.gfx.normalizedLength(this.rawNode.style.height)}:null;
if(A.width<=0){A.width=this.width
}if(A.height<=0){A.height=this.height
}return A
}});
dojox.gfx.createSurface=function(E,C,J){if(!C){C="100%"
}if(!J){J="100%"
}var K=new dojox.gfx.Surface(),B=dojo.byId(E),G=K.clipNode=B.ownerDocument.createElement("div"),A=K.rawNode=B.ownerDocument.createElement("v:group"),F=G.style,D=A.style;
B.style.width=C;
B.style.height=J;
F.width=C;
F.height=J;
F.clip="rect(0 "+C+" "+J+" 0)";
F.position="absolute";
D.width=C;
D.height=J;
A.coordsize=(C=="100%"?C:parseFloat(C))+" "+(J=="100%"?J:parseFloat(J));
A.coordorigin="0 0";
var H=K.bgNode=A.ownerDocument.createElement("v:rect"),I=H.style;
I.left=I.top=0;
I.width=D.width;
I.height=D.height;
H.filled=H.stroked="f";
A.appendChild(H);
G.appendChild(A);
B.appendChild(G);
K.width=dojox.gfx.normalizedLength(C);
K.height=dojox.gfx.normalizedLength(J);
return K
};
dojox.gfx.vml.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){this.rawNode.appendChild(A.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(A,B){if(this==A.getParent()){if(this.rawNode==A.rawNode.parentNode){this.rawNode.removeChild(A.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var A=this.rawNode;
while(A.firstChild!=A.lastChild){if(A.firstChild!=this.bgNode){A.removeChild(A.firstChild)
}if(A.lastChild!=this.bgNode){A.removeChild(A.lastChild)
}}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createGroup:function(){var B=this.createObject(dojox.gfx.Group,null);
var A=B.rawNode.ownerDocument.createElement("v:rect");
A.style.left=A.style.top=0;
A.style.width=B.rawNode.style.width;
A.style.height=B.rawNode.style.height;
A.filled=A.stroked="f";
B.rawNode.appendChild(A);
B.bgNode=A;
return B
},createImage:function(D){if(!this.rawNode){return null
}var B=new dojox.gfx.Image(),C=this.rawNode.ownerDocument.createElement("div");
C.style.position="absolute";
C.style.width=this.rawNode.style.width;
C.style.height=this.rawNode.style.height;
C.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)";
var A=this.rawNode.ownerDocument.createElement("img");
C.appendChild(A);
B.setRawNode(C);
this.rawNode.appendChild(C);
B.setShape(D);
this.add(B);
return B
},createObject:function(D,B){if(!this.rawNode){return null
}var A=new D(),C=this.rawNode.ownerDocument.createElement("v:"+D.nodeType);
A.setRawNode(C);
this.rawNode.appendChild(C);
switch(D){case dojox.gfx.Group:case dojox.gfx.Line:case dojox.gfx.Polyline:case dojox.gfx.Text:case dojox.gfx.Path:case dojox.gfx.TextPath:this._overrideSize(C)
}A.setShape(B);
this.add(A);
return A
},_overrideSize:function(A){var B=this;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}A.style.width=B.width;
A.style.height=B.height;
A.coordsize=B.width+" "+B.height
}});
dojo.extend(dojox.gfx.Group,dojox.gfx.vml.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.vml.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
};