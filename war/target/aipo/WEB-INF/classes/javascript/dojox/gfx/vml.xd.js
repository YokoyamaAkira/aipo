dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.vml"],["require","dojox.gfx._base"],["require","dojox.gfx.shape"],["require","dojox.gfx.path"],["require","dojox.gfx.arc"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.vml"]){A._hasResource["dojox.gfx.vml"]=true;
A.provide("dojox.gfx.vml");
A.require("dojox.gfx._base");
A.require("dojox.gfx.shape");
A.require("dojox.gfx.path");
A.require("dojox.gfx.arc");
dojox.gfx.vml.xmlns="urn:schemas-microsoft-com:vml";
dojox.gfx.vml.text_alignment={start:"left",middle:"center",end:"right"};
dojox.gfx.vml._parseFloat=function(B){return B.match(/^\d+f$/i)?parseInt(B)/65536:parseFloat(B)
};
dojox.gfx.vml._bool={t:1,"true":1};
A.extend(dojox.gfx.Shape,{setFill:function(Q){if(!Q){this.fillStyle=null;
this.rawNode.filled="f";
return this
}if(typeof Q=="object"&&"type" in Q){switch(Q.type){case"linear":var I=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,Q),R=[],N=I.colors,M=this._getRealMatrix(),D=dojox.gfx.matrix;
this.fillStyle=I;
A.forEach(N,function(T,U,S){S[U].color=dojox.gfx.normalizeColor(T.color)
});
if(N[0].offset>0){R.push("0 "+N[0].color.toHex())
}for(var F=0;
F<N.length;
++F){R.push(N[F].offset.toFixed(8)+" "+N[F].color.toHex())
}var F=N.length-1;
if(N[F].offset<1){R.push("1 "+N[F].color.toHex())
}var L=this.rawNode.fill;
L.colors.value=R.join(";");
L.method="sigma";
L.type="gradient";
var J=M?D.multiplyPoint(M,I.x1,I.y1):{x:I.x1,y:I.y1},H=M?D.multiplyPoint(M,I.x2,I.y2):{x:I.x2,y:I.y2};
L.angle=(D._radToDeg(Math.atan2(H.x-J.x,H.y-J.y))+180)%360;
L.on=true;
break;
case"radial":var I=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,Q);
this.fillStyle=I;
var E=parseFloat(this.rawNode.style.left),P=parseFloat(this.rawNode.style.top),O=parseFloat(this.rawNode.style.width),G=parseFloat(this.rawNode.style.height),K=isNaN(O)?1:2*I.r/O,N=new Array(I.colors.length);
A.forEach(I.colors,function(S,T){N[T]={offset:1-S.offset*K,color:dojox.gfx.normalizeColor(S.color)}
});
var F=N.length-1;
while(F>=0&&N[F].offset<0){--F
}if(F<N.length-1){var B=N[F],C=N[F+1];
C.color=A.blendColors(B.color,C.color,B.offset/(B.offset-C.offset));
C.offset=0;
while(N.length-F>2){N.pop()
}}var F=N.length-1,R=[];
if(N[F].offset>0){R.push("0 "+N[F].color.toHex())
}for(;
F>=0;
--F){R.push(N[F].offset.toFixed(8)+" "+N[F].color.toHex())
}if(N[0].offset<1){R.push("1 "+N[0].color.toHex())
}var L=this.rawNode.fill;
L.colors.value=R.join(";");
L.method="sigma";
L.type="gradientradial";
if(isNaN(O)||isNaN(G)||isNaN(E)||isNaN(P)){L.focusposition="0.5 0.5"
}else{L.focusposition=((I.cx-E)/O).toFixed(8)+" "+((I.cy-P)/G).toFixed(8)
}L.focussize="0 0";
L.on=true;
break;
case"pattern":var I=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,Q);
this.fillStyle=I;
var L=this.rawNode.fill;
L.type="tile";
L.src=I.src;
if(I.width&&I.height){L.size.x=dojox.gfx.px2pt(I.width);
L.size.y=dojox.gfx.px2pt(I.height)
}L.alignShape="f";
L.position.x=0;
L.position.y=0;
L.origin.x=I.width?I.x/I.width:0;
L.origin.y=I.height?I.y/I.height:0;
L.on=true;
break
}this.rawNode.fill.opacity=1;
return this
}this.fillStyle=dojox.gfx.normalizeColor(Q);
this.rawNode.fillcolor=this.fillStyle.toHex();
this.rawNode.fill.opacity=this.fillStyle.a;
this.rawNode.filled=true;
return this
},setStroke:function(D){if(!D){this.strokeStyle=null;
this.rawNode.stroked="f";
return this
}if(typeof D=="string"){D={color:D}
}var B=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,D);
B.color=dojox.gfx.normalizeColor(B.color);
var C=this.rawNode;
C.stroked=true;
C.strokecolor=B.color.toCss();
C.strokeweight=B.width+"px";
if(C.stroke){C.stroke.opacity=B.color.a;
C.stroke.endcap=this._translate(this._capMap,B.cap);
if(typeof B.join=="number"){C.stroke.joinstyle="miter";
C.stroke.miterlimit=B.join
}else{C.stroke.joinstyle=B.join
}C.stroke.dashstyle=B.style=="none"?"Solid":B.style
}return this
},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(C,B){return(B in C)?C[B]:B
},_applyTransform:function(){if(this.fillStyle&&this.fillStyle.type=="linear"){this.setFill(this.fillStyle)
}var G=this._getRealMatrix();
if(!G){return this
}var K=this.rawNode.skew;
if(typeof K=="undefined"){for(var E=0;
E<this.rawNode.childNodes.length;
++E){if(this.rawNode.childNodes[E].tagName=="skew"){K=this.rawNode.childNodes[E];
break
}}}if(K){K.on="f";
var B=G.xx.toFixed(8)+" "+G.xy.toFixed(8)+" "+G.yx.toFixed(8)+" "+G.yy.toFixed(8)+" 0 0",D=Math.floor(G.dx).toFixed()+"px "+Math.floor(G.dy).toFixed()+"px",L=this.rawNode.style,C=parseFloat(L.left),J=parseFloat(L.top),I=parseFloat(L.width),F=parseFloat(L.height);
if(isNaN(C)){C=0
}if(isNaN(J)){J=0
}if(isNaN(I)){I=1
}if(isNaN(F)){F=1
}var H=(-C/I-0.5).toFixed(8)+" "+(-J/F-0.5).toFixed(8);
K.matrix=B;
K.origin=H;
K.offset=D;
K.on=true
}return this
},setRawNode:function(B){B.stroked="f";
B.filled="f";
this.rawNode=B
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){var B=this.rawNode,C=B.parentNode,D=C.firstChild;
C.insertBefore(B,D);
if(D.tagName=="rect"){D.swapNode(B)
}return this
},_getRealMatrix:function(){return this.parentMatrix?new dojox.gfx.Matrix2D([this.parentMatrix,this.matrix]):this.matrix
}});
A.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},_applyTransform:function(){var B=this._getRealMatrix();
for(var C=0;
C<this.children.length;
++C){this.children[C]._updateParentMatrix(B)
}return this
}});
dojox.gfx.Group.nodeType="group";
A.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(C){var B=this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var F=this.rawNode.style;
F.left=B.x.toFixed();
F.top=B.y.toFixed();
F.width=(typeof B.width=="string"&&B.width.indexOf("%")>=0)?B.width:B.width.toFixed();
F.height=(typeof B.width=="string"&&B.height.indexOf("%")>=0)?B.height:B.height.toFixed();
var G=Math.min(1,(B.r/Math.min(parseFloat(B.width),parseFloat(B.height)))).toFixed(8);
var E=this.rawNode.parentNode,H=null;
if(E){if(E.lastChild!=this.rawNode){for(var D=0;
D<E.childNodes.length;
++D){if(E.childNodes[D]==this.rawNode){H=E.childNodes[D+1];
break
}}}E.removeChild(this.rawNode)
}this.rawNode.arcsize=G;
if(E){if(H){E.insertBefore(this.rawNode,H)
}else{E.appendChild(this.rawNode)
}}return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)
}});
dojox.gfx.Rect.nodeType="roundrect";
A.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(C){var B=this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode.style;
D.left=(B.cx-B.rx).toFixed();
D.top=(B.cy-B.ry).toFixed();
D.width=(B.rx*2).toFixed();
D.height=(B.ry*2).toFixed();
return this.setTransform(this.matrix)
}});
dojox.gfx.Ellipse.nodeType="oval";
A.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(C){var B=this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode.style;
D.left=(B.cx-B.r).toFixed();
D.top=(B.cy-B.r).toFixed();
D.width=(B.r*2).toFixed();
D.height=(B.r*2).toFixed();
return this
}});
dojox.gfx.Circle.nodeType="oval";
A.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","line")
}},setShape:function(C){var B=this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
this.rawNode.path.v="m"+B.x1.toFixed()+" "+B.y1.toFixed()+"l"+B.x2.toFixed()+" "+B.y2.toFixed()+"e";
return this.setTransform(this.matrix)
}});
dojox.gfx.Line.nodeType="shape";
A.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","polyline")
}},setShape:function(F,D){if(F&&F instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:F});
if(D&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,F)
}this.bbox=null;
var B=[],G=this.shape.points;
if(G.length>0){B.push("m");
var C=1;
if(typeof G[0]=="number"){B.push(G[0].toFixed());
B.push(G[1].toFixed());
C=2
}else{B.push(G[0].x.toFixed());
B.push(G[0].y.toFixed())
}if(G.length>C){B.push("l");
for(var E=C;
E<G.length;
++E){if(typeof G[E]=="number"){B.push(G[E].toFixed())
}else{B.push(G[E].x.toFixed());
B.push(G[E].y.toFixed())
}}}}B.push("e");
this.rawNode.path.v=B.join(" ");
return this.setTransform(this.matrix)
}});
dojox.gfx.Polyline.nodeType="shape";
A.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","image")
}},getEventSource:function(){return this.rawNode?this.rawNode.firstChild:null
},setShape:function(C){var B=this.shape=dojox.gfx.makeParameters(this.shape,C);
this.bbox=null;
var D=this.rawNode.firstChild;
D.src=B.src;
if(B.width||B.height){D.style.width=B.width;
D.style.height=B.height
}return this.setTransform(this.matrix)
},_applyTransform:function(){var B=this._getRealMatrix();
if(!B){return this
}B=dojox.gfx.matrix.multiply(B,{dx:this.shape.x,dy:this.shape.y});
var C=this.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
C.M11=B.xx;
C.M12=B.xy;
C.M21=B.yx;
C.M22=B.yy;
C.Dx=B.dx;
C.Dy=B.dy;
return this
}});
dojox.gfx.Image.nodeType="div";
A.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","text")
}this.fontStyle=null
},_alignment:{start:"left",middle:"center",end:"right"},setShape:function(I){this.shape=dojox.gfx.makeParameters(this.shape,I);
this.bbox=null;
var B=this.rawNode,L=this.shape,H=L.x,F=L.y.toFixed();
switch(L.align){case"middle":H-=5;
break;
case"end":H-=10;
break
}this.rawNode.path.v="m"+H.toFixed()+","+F+"l"+(H+10).toFixed()+","+F+"e";
var C=null,J=null,E=B.childNodes;
for(var D=0;
D<E.length;
++D){var K=E[D].tagName;
if(K=="path"){C=E[D];
if(J){break
}}else{if(K=="textpath"){J=E[D];
if(C){break
}}}}if(!C){C=this.rawNode.ownerDocument.createElement("v:path");
B.appendChild(C)
}if(!J){J=this.rawNode.ownerDocument.createElement("v:textpath");
B.appendChild(J)
}C.textPathOk=true;
J.on=true;
var G=dojox.gfx.vml.text_alignment[L.align];
J.style["v-text-align"]=G?G:"left";
J.style["text-decoration"]=L.decoration;
J.style["v-rotate-letters"]=L.rotated;
J.style["v-text-kern"]=L.kerning;
J.string=L.text;
return this.setTransform(this.matrix)
},_setFont:function(){var C=this.fontStyle,D=this.rawNode.childNodes;
for(var B=0;
B<D.length;
++B){if(D[B].tagName=="textpath"){D[B].style.font=dojox.gfx.makeFontString(C);
break
}}this.setTransform(this.matrix)
},_getRealMatrix:function(){var B=dojox.gfx.Shape.prototype._getRealMatrix.call(this);
if(B){B=dojox.gfx.matrix.multiply(B,{dy:-dojox.gfx.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35})
}return B
},getTextWidth:function(){var D=this.rawNode,C=D.style.display;
D.style.display="inline";
var B=dojox.gfx.pt2px(parseFloat(D.currentStyle.width));
D.style.display=C;
return B
}});
dojox.gfx.Text.nodeType="shape";
dojox.gfx.path._calcArc=function(E){var C=Math.cos(E),B=Math.sin(E),D={x:C+(4/3)*(1-C),y:B-(4/3)*C*(1-C)/B};
return{s:{x:C,y:-B},c1:{x:D.x,y:-D.y},c2:D,e:{x:C,y:B}}
};
A.declare("dojox.gfx.Path",dojox.gfx.path.Path,{constructor:function(B){if(B&&!B.getAttribute("dojoGfxType")){B.setAttribute("dojoGfxType","path")
}this.vmlPath="";
this.lastControl={}
},_updateWithSegment:function(C){var B=A.clone(this.last);
dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var D=this[this.renderers[C.action]](C,B);
if(typeof this.vmlPath=="string"){this.vmlPath+=D.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e"
}else{this.vmlPath=this.vmlPath.concat(D)
}},setShape:function(B){this.vmlPath=[];
this.lastControl={};
dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.vmlPath=this.vmlPath.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e";
return this
},_pathVmlToSvgMap:{m:"M",l:"L",t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(E,C,F,B){if(typeof B=="undefined"){B=C.length
}if(typeof F=="undefined"){F=0
}for(var D=F;
D<B;
++D){E.push(" ");
E.push(C[D].toFixed())
}},_addArgsAdjusted:function(F,E,C,G,B){if(typeof B=="undefined"){B=C.length
}if(typeof G=="undefined"){G=0
}for(var D=G;
D<B;
D+=2){F.push(" ");
F.push((E.x+C[D]).toFixed());
F.push(" ");
F.push((E.y+C[D+1]).toFixed())
}},_moveToA:function(C){var D=[" m"],E=C.args,B=E.length;
if(B==2){this._addArgs(D,E)
}else{this._addArgs(D,E,0,2);
D.push(" l");
this._addArgs(D,E,2)
}this.lastControl={};
return D
},_moveToR:function(D,C){var E=["x" in C?" t":" m"],F=D.args,B=F.length;
if(B==2){this._addArgs(E,F)
}else{this._addArgs(E,F,0,2);
E.push(" r");
this._addArgs(E,F,2)
}this.lastControl={};
return E
},_lineToA:function(B){var C=[" l"];
this._addArgs(C,B.args);
this.lastControl={};
return C
},_lineToR:function(B){var C=[" r"];
this._addArgs(C,B.args);
this.lastControl={};
return C
},_hLineToA:function(E,D){var F=[" l"],H=E.args,B=H.length,G=" "+D.y.toFixed();
for(var C=0;
C<B;
++C){F.push(" ");
F.push(H[C].toFixed());
F.push(G)
}this.lastControl={};
return F
},_hLineToR:function(D){var E=[" r"],F=D.args,B=F.length;
for(var C=0;
C<B;
++C){E.push(" ");
E.push(F[C].toFixed());
E.push(" 0")
}this.lastControl={};
return E
},_vLineToA:function(F,E){var G=[" l"],H=F.args,C=H.length,B=" "+E.x.toFixed();
for(var D=0;
D<C;
++D){G.push(B);
G.push(" ");
G.push(H[D].toFixed())
}this.lastControl={};
return G
},_vLineToR:function(D){var E=[" r"],F=D.args,B=F.length;
for(var C=0;
C<B;
++C){E.push(" 0 ");
E.push(F[C].toFixed())
}this.lastControl={};
return E
},_curveToA:function(D){var E=[],F=D.args,B=F.length;
for(var C=0;
C<B;
C+=6){E.push(" c");
this._addArgs(E,F,C,C+6)
}this.lastControl={x:F[B-4],y:F[B-3],type:"C"};
return E
},_curveToR:function(E,D){var F=[],G=E.args,B=G.length;
for(var C=0;
C<B;
C+=6){F.push(" v");
this._addArgs(F,G,C,C+6);
this.lastControl={x:D.x+G[C+2],y:D.y+G[C+3]};
D.x+=G[C+4];
D.y+=G[C+5]
}this.lastControl.type="C";
return F
},_smoothCurveToA:function(E,D){var F=[],G=E.args,B=G.length;
for(var C=0;
C<B;
C+=4){F.push(" c");
if(this.lastControl.type=="C"){this._addArgs(F,[2*D.x-this.lastControl.x,2*D.y-this.lastControl.y])
}else{this._addArgs(F,[D.x,D.y])
}this._addArgs(F,G,C,C+4)
}this.lastControl={x:G[B-4],y:G[B-3],type:"C"};
return F
},_smoothCurveToR:function(E,D){var F=[],G=E.args,B=G.length;
for(var C=0;
C<B;
C+=4){F.push(" v");
if(this.lastControl.type=="C"){this._addArgs(F,[D.x-this.lastControl.x,D.y-this.lastControl.y])
}else{this._addArgs(F,[0,0])
}this._addArgs(F,G,C,C+4);
this.lastControl={x:D.x+G[C],y:D.y+G[C+1]};
D.x+=G[C+2];
D.y+=G[C+3]
}this.lastControl.type="C";
return F
},_qCurveToA:function(D){var E=[],F=D.args,B=F.length;
for(var C=0;
C<B;
C+=4){E.push(" qb");
this._addArgs(E,F,C,C+4)
}this.lastControl={x:F[B-4],y:F[B-3],type:"Q"};
return E
},_qCurveToR:function(E,D){var F=[],G=E.args,B=G.length;
for(var C=0;
C<B;
C+=4){F.push(" qb");
this._addArgsAdjusted(F,D,G,C,C+4);
this.lastControl={x:D.x+G[C],y:D.y+G[C+1]};
D.x+=G[C+2];
D.y+=G[C+3]
}this.lastControl.type="Q";
return F
},_qSmoothCurveToA:function(E,D){var F=[],G=E.args,B=G.length;
for(var C=0;
C<B;
C+=2){F.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(F,[this.lastControl.x=2*D.x-this.lastControl.x,this.lastControl.y=2*D.y-this.lastControl.y])
}else{this._addArgs(F,[this.lastControl.x=D.x,this.lastControl.y=D.y])
}this._addArgs(F,G,C,C+2)
}this.lastControl.type="Q";
return F
},_qSmoothCurveToR:function(E,D){var F=[],G=E.args,B=G.length;
for(var C=0;
C<B;
C+=2){F.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(F,[this.lastControl.x=2*D.x-this.lastControl.x,this.lastControl.y=2*D.y-this.lastControl.y])
}else{this._addArgs(F,[this.lastControl.x=D.x,this.lastControl.y=D.y])
}this._addArgsAdjusted(F,D,G,C,C+2)
}this.lastControl.type="Q";
return F
},_arcTo:function(I,K){var C=[],E=I.args,F=E.length,B=I.action=="a";
for(var H=0;
H<F;
H+=7){var D=E[H+5],J=E[H+6];
if(B){D+=K.x;
J+=K.y
}var L=dojox.gfx.arc.arcAsBezier(K,E[H],E[H+1],E[H+2],E[H+3]?1:0,E[H+4]?1:0,D,J);
for(var G=0;
G<L.length;
++G){C.push(" c");
this._addArgs(C,L[G])
}K={x:D,y:J}
}this.lastControl={};
return C
},_closePath:function(){this.lastControl={};
return["x"]
}});
dojox.gfx.Path.nodeType="shape";
A.declare("dojox.gfx.TextPath",dojox.gfx.Path,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","textpath")
}this.fontStyle=null;
if(!("text" in this)){this.text=A.clone(dojox.gfx.defaultTextPath)
}if(!("fontStyle" in this)){this.fontStyle=A.clone(dojox.gfx.defaultFont)
}},setText:function(B){this.text=dojox.gfx.makeParameters(this.text,typeof B=="string"?{text:B}:B);
this._setText();
return this
},setFont:function(B){this.fontStyle=typeof B=="string"?dojox.gfx.splitFontString(B):dojox.gfx.makeParameters(dojox.gfx.defaultFont,B);
this._setFont();
return this
},_setText:function(){this.bbox=null;
var G=this.rawNode,F=this.text,H=null,E=null,I=G.childNodes;
for(var D=0;
D<I.length;
++D){var B=I[D].tagName;
if(B=="path"){H=I[D];
if(E){break
}}else{if(B=="textpath"){E=I[D];
if(H){break
}}}}if(!H){H=this.rawNode.ownerDocument.createElement("v:path");
G.appendChild(H)
}if(!E){E=this.rawNode.ownerDocument.createElement("v:textpath");
G.appendChild(E)
}H.textPathOk=true;
E.on=true;
var C=dojox.gfx.vml.text_alignment[F.align];
E.style["v-text-align"]=C?C:"left";
E.style["text-decoration"]=F.decoration;
E.style["v-rotate-letters"]=F.rotated;
E.style["v-text-kern"]=F.kerning;
E.string=F.text
},_setFont:function(){var C=this.fontStyle,D=this.rawNode.childNodes;
for(var B=0;
B<D.length;
++B){if(D[B].tagName=="textpath"){D[B].style.font=dojox.gfx.makeFontString(C);
break
}}}});
dojox.gfx.TextPath.nodeType="shape";
A.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},setDimensions:function(F,B){this.width=dojox.gfx.normalizedLength(F);
this.height=dojox.gfx.normalizedLength(B);
if(!this.rawNode){return this
}var E=this.clipNode.style,G=this.rawNode,C=G.style,D=this.bgNode.style;
E.width=F;
E.height=B;
E.clip="rect(0 "+F+" "+B+" 0)";
C.width=F;
C.height=B;
G.coordsize=F+" "+B;
D.width=F;
D.height=B;
return this
},getDimensions:function(){var B=this.rawNode?{width:dojox.gfx.normalizedLength(this.rawNode.style.width),height:dojox.gfx.normalizedLength(this.rawNode.style.height)}:null;
if(B.width<=0){B.width=this.width
}if(B.height<=0){B.height=this.height
}return B
}});
dojox.gfx.createSurface=function(F,D,K){if(!D){D="100%"
}if(!K){K="100%"
}var L=new dojox.gfx.Surface(),C=A.byId(F),H=L.clipNode=C.ownerDocument.createElement("div"),B=L.rawNode=C.ownerDocument.createElement("v:group"),G=H.style,E=B.style;
C.style.width=D;
C.style.height=K;
G.width=D;
G.height=K;
G.clip="rect(0 "+D+" "+K+" 0)";
G.position="absolute";
E.width=D;
E.height=K;
B.coordsize=(D=="100%"?D:parseFloat(D))+" "+(K=="100%"?K:parseFloat(K));
B.coordorigin="0 0";
var I=L.bgNode=B.ownerDocument.createElement("v:rect"),J=I.style;
J.left=J.top=0;
J.width=E.width;
J.height=E.height;
I.filled=I.stroked="f";
B.appendChild(I);
H.appendChild(B);
C.appendChild(H);
L.width=dojox.gfx.normalizedLength(D);
L.height=dojox.gfx.normalizedLength(K);
return L
};
dojox.gfx.vml.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){this.rawNode.appendChild(B.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(B,C){if(this==B.getParent()){if(this.rawNode==B.rawNode.parentNode){this.rawNode.removeChild(B.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var B=this.rawNode;
while(B.firstChild!=B.lastChild){if(B.firstChild!=this.bgNode){B.removeChild(B.firstChild)
}if(B.lastChild!=this.bgNode){B.removeChild(B.lastChild)
}}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
A.mixin(dojox.gfx.shape.Creator,{createGroup:function(){var C=this.createObject(dojox.gfx.Group,null);
var B=C.rawNode.ownerDocument.createElement("v:rect");
B.style.left=B.style.top=0;
B.style.width=C.rawNode.style.width;
B.style.height=C.rawNode.style.height;
B.filled=B.stroked="f";
C.rawNode.appendChild(B);
C.bgNode=B;
return C
},createImage:function(E){if(!this.rawNode){return null
}var C=new dojox.gfx.Image(),D=this.rawNode.ownerDocument.createElement("div");
D.style.position="absolute";
D.style.width=this.rawNode.style.width;
D.style.height=this.rawNode.style.height;
D.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)";
var B=this.rawNode.ownerDocument.createElement("img");
D.appendChild(B);
C.setRawNode(D);
this.rawNode.appendChild(D);
C.setShape(E);
this.add(C);
return C
},createObject:function(E,C){if(!this.rawNode){return null
}var B=new E(),D=this.rawNode.ownerDocument.createElement("v:"+E.nodeType);
B.setRawNode(D);
this.rawNode.appendChild(D);
switch(E){case dojox.gfx.Group:case dojox.gfx.Line:case dojox.gfx.Polyline:case dojox.gfx.Text:case dojox.gfx.Path:case dojox.gfx.TextPath:this._overrideSize(D)
}B.setShape(C);
this.add(B);
return B
},_overrideSize:function(B){var C=this;
for(;
C&&!(C instanceof dojox.gfx.Surface);
C=C.parent){}B.style.width=C.width;
B.style.height=C.height;
B.coordsize=C.width+" "+C.height
}});
A.extend(dojox.gfx.Group,dojox.gfx.vml.Container);
A.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
A.extend(dojox.gfx.Surface,dojox.gfx.vml.Container);
A.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
}}});