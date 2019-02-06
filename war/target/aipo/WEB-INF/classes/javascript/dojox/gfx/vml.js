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
dojo.extend(dojox.gfx.Shape,{setFill:function(D){if(!D){this.fillStyle=null;
this.rawNode.filled="f";
return this
}if(typeof D=="object"&&"type" in D){switch(D.type){case"linear":var M=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,D),E=[],A=M.colors,Q=this._getRealMatrix(),H=dojox.gfx.matrix;
this.fillStyle=M;
dojo.forEach(A,function(T,R,S){S[R].color=dojox.gfx.normalizeColor(T.color)
});
if(A[0].offset>0){E.push("0 "+A[0].color.toHex())
}for(var J=0;
J<A.length;
++J){E.push(A[J].offset.toFixed(8)+" "+A[J].color.toHex())
}var J=A.length-1;
if(A[J].offset<1){E.push("1 "+A[J].color.toHex())
}var P=this.rawNode.fill;
P.colors.value=E.join(";");
P.method="sigma";
P.type="gradient";
var N=Q?H.multiplyPoint(Q,M.x1,M.y1):{x:M.x1,y:M.y1},L=Q?H.multiplyPoint(Q,M.x2,M.y2):{x:M.x2,y:M.y2};
P.angle=(H._radToDeg(Math.atan2(L.x-N.x,L.y-N.y))+180)%360;
P.on=true;
break;
case"radial":var M=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,D);
this.fillStyle=M;
var I=parseFloat(this.rawNode.style.left),C=parseFloat(this.rawNode.style.top),B=parseFloat(this.rawNode.style.width),K=parseFloat(this.rawNode.style.height),O=isNaN(B)?1:2*M.r/B,A=new Array(M.colors.length);
dojo.forEach(M.colors,function(S,R){A[R]={offset:1-S.offset*O,color:dojox.gfx.normalizeColor(S.color)}
});
var J=A.length-1;
while(J>=0&&A[J].offset<0){--J
}if(J<A.length-1){var F=A[J],G=A[J+1];
G.color=dojo.blendColors(F.color,G.color,F.offset/(F.offset-G.offset));
G.offset=0;
while(A.length-J>2){A.pop()
}}var J=A.length-1,E=[];
if(A[J].offset>0){E.push("0 "+A[J].color.toHex())
}for(;
J>=0;
--J){E.push(A[J].offset.toFixed(8)+" "+A[J].color.toHex())
}if(A[0].offset<1){E.push("1 "+A[0].color.toHex())
}var P=this.rawNode.fill;
P.colors.value=E.join(";");
P.method="sigma";
P.type="gradientradial";
if(isNaN(B)||isNaN(K)||isNaN(I)||isNaN(C)){P.focusposition="0.5 0.5"
}else{P.focusposition=((M.cx-I)/B).toFixed(8)+" "+((M.cy-C)/K).toFixed(8)
}P.focussize="0 0";
P.on=true;
break;
case"pattern":var M=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,D);
this.fillStyle=M;
var P=this.rawNode.fill;
P.type="tile";
P.src=M.src;
if(M.width&&M.height){P.size.x=dojox.gfx.px2pt(M.width);
P.size.y=dojox.gfx.px2pt(M.height)
}P.alignShape="f";
P.position.x=0;
P.position.y=0;
P.origin.x=M.width?M.x/M.width:0;
P.origin.y=M.height?M.y/M.height:0;
P.on=true;
break
}this.rawNode.fill.opacity=1;
return this
}this.fillStyle=dojox.gfx.normalizeColor(D);
this.rawNode.fillcolor=this.fillStyle.toHex();
this.rawNode.fill.opacity=this.fillStyle.a;
this.rawNode.filled=true;
return this
},setStroke:function(B){if(!B){this.strokeStyle=null;
this.rawNode.stroked="f";
return this
}if(typeof B=="string"){B={color:B}
}var C=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,B);
C.color=dojox.gfx.normalizeColor(C.color);
var A=this.rawNode;
A.stroked=true;
A.strokecolor=C.color.toCss();
A.strokeweight=C.width+"px";
if(A.stroke){A.stroke.opacity=C.color.a;
A.stroke.endcap=this._translate(this._capMap,C.cap);
if(typeof C.join=="number"){A.stroke.joinstyle="miter";
A.stroke.miterlimit=C.join
}else{A.stroke.joinstyle=C.join
}A.stroke.dashstyle=C.style=="none"?"Solid":C.style
}return this
},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(A,B){return(B in A)?A[B]:B
},_applyTransform:function(){if(this.fillStyle&&this.fillStyle.type=="linear"){this.setFill(this.fillStyle)
}var B=this._getRealMatrix();
if(!B){return this
}var F=this.rawNode.skew;
if(typeof F=="undefined"){for(var K=0;
K<this.rawNode.childNodes.length;
++K){if(this.rawNode.childNodes[K].tagName=="skew"){F=this.rawNode.childNodes[K];
break
}}}if(F){F.on="f";
var H=B.xx.toFixed(8)+" "+B.xy.toFixed(8)+" "+B.yx.toFixed(8)+" "+B.yy.toFixed(8)+" 0 0",J=Math.floor(B.dx).toFixed()+"px "+Math.floor(B.dy).toFixed()+"px",G=this.rawNode.style,I=parseFloat(G.left),E=parseFloat(G.top),D=parseFloat(G.width),A=parseFloat(G.height);
if(isNaN(I)){I=0
}if(isNaN(E)){E=0
}if(isNaN(D)){D=1
}if(isNaN(A)){A=1
}var C=(-I/D-0.5).toFixed(8)+" "+(-E/A-0.5).toFixed(8);
F.matrix=H;
F.origin=C;
F.offset=J;
F.on=true
}return this
},setRawNode:function(A){A.stroked="f";
A.filled="f";
this.rawNode=A
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){var C=this.rawNode,A=C.parentNode,B=A.firstChild;
A.insertBefore(C,B);
if(B.tagName=="rect"){B.swapNode(C)
}return this
},_getRealMatrix:function(){return this.parentMatrix?new dojox.gfx.Matrix2D([this.parentMatrix,this.matrix]):this.matrix
}});
dojo.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},_applyTransform:function(){var B=this._getRealMatrix();
for(var A=0;
A<this.children.length;
++A){this.children[A]._updateParentMatrix(B)
}return this
}});
dojox.gfx.Group.nodeType="group";
dojo.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(F){var E=this.shape=dojox.gfx.makeParameters(this.shape,F);
this.bbox=null;
var B=this.rawNode.style;
B.left=E.x.toFixed();
B.top=E.y.toFixed();
B.width=(typeof E.width=="string"&&E.width.indexOf("%")>=0)?E.width:E.width.toFixed();
B.height=(typeof E.width=="string"&&E.height.indexOf("%")>=0)?E.height:E.height.toFixed();
var C=Math.min(1,(E.r/Math.min(parseFloat(E.width),parseFloat(E.height)))).toFixed(8);
var A=this.rawNode.parentNode,D=null;
if(A){if(A.lastChild!=this.rawNode){for(var G=0;
G<A.childNodes.length;
++G){if(A.childNodes[G]==this.rawNode){D=A.childNodes[G+1];
break
}}}A.removeChild(this.rawNode)
}this.rawNode.arcsize=C;
if(A){if(D){A.insertBefore(this.rawNode,D)
}else{A.appendChild(this.rawNode)
}}return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)
}});
dojox.gfx.Rect.nodeType="roundrect";
dojo.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(A){var C=this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode.style;
B.left=(C.cx-C.rx).toFixed();
B.top=(C.cy-C.ry).toFixed();
B.width=(C.rx*2).toFixed();
B.height=(C.ry*2).toFixed();
return this.setTransform(this.matrix)
}});
dojox.gfx.Ellipse.nodeType="oval";
dojo.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(A){var C=this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode.style;
B.left=(C.cx-C.r).toFixed();
B.top=(C.cy-C.r).toFixed();
B.width=(C.r*2).toFixed();
B.height=(C.r*2).toFixed();
return this
}});
dojox.gfx.Circle.nodeType="oval";
dojo.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","line")
}},setShape:function(A){var B=this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
this.rawNode.path.v="m"+B.x1.toFixed()+" "+B.y1.toFixed()+"l"+B.x2.toFixed()+" "+B.y2.toFixed()+"e";
return this.setTransform(this.matrix)
}});
dojox.gfx.Line.nodeType="shape";
dojo.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","polyline")
}},setShape:function(D,B){if(D&&D instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:D});
if(B&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,D)
}this.bbox=null;
var F=[],E=this.shape.points;
if(E.length>0){F.push("m");
var A=1;
if(typeof E[0]=="number"){F.push(E[0].toFixed());
F.push(E[1].toFixed());
A=2
}else{F.push(E[0].x.toFixed());
F.push(E[0].y.toFixed())
}if(E.length>A){F.push("l");
for(var C=A;
C<E.length;
++C){if(typeof E[C]=="number"){F.push(E[C].toFixed())
}else{F.push(E[C].x.toFixed());
F.push(E[C].y.toFixed())
}}}}F.push("e");
this.rawNode.path.v=F.join(" ");
return this.setTransform(this.matrix)
}});
dojox.gfx.Polyline.nodeType="shape";
dojo.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","image")
}},getEventSource:function(){return this.rawNode?this.rawNode.firstChild:null
},setShape:function(A){var C=this.shape=dojox.gfx.makeParameters(this.shape,A);
this.bbox=null;
var B=this.rawNode.firstChild;
B.src=C.src;
if(C.width||C.height){B.style.width=C.width;
B.style.height=C.height
}return this.setTransform(this.matrix)
},_applyTransform:function(){var B=this._getRealMatrix();
if(!B){return this
}B=dojox.gfx.matrix.multiply(B,{dx:this.shape.x,dy:this.shape.y});
var A=this.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
A.M11=B.xx;
A.M12=B.xy;
A.M21=B.yx;
A.M22=B.yy;
A.Dx=B.dx;
A.Dy=B.dy;
return this
}});
dojox.gfx.Image.nodeType="div";
dojo.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{constructor:function(A){if(A){A.setAttribute("dojoGfxType","text")
}this.fontStyle=null
},_alignment:{start:"left",middle:"center",end:"right"},setShape:function(D){this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var H=this.rawNode,G=this.shape,C=G.x,A=G.y.toFixed();
switch(G.align){case"middle":C-=5;
break;
case"end":C-=10;
break
}this.rawNode.path.v="m"+C.toFixed()+","+A+"l"+(C+10).toFixed()+","+A+"e";
var I=null,E=null,K=H.childNodes;
for(var J=0;
J<K.length;
++J){var F=K[J].tagName;
if(F=="path"){I=K[J];
if(E){break
}}else{if(F=="textpath"){E=K[J];
if(I){break
}}}}if(!I){I=this.rawNode.ownerDocument.createElement("v:path");
H.appendChild(I)
}if(!E){E=this.rawNode.ownerDocument.createElement("v:textpath");
H.appendChild(E)
}I.textPathOk=true;
E.on=true;
var B=dojox.gfx.vml.text_alignment[G.align];
E.style["v-text-align"]=B?B:"left";
E.style["text-decoration"]=G.decoration;
E.style["v-rotate-letters"]=G.rotated;
E.style["v-text-kern"]=G.kerning;
E.string=G.text;
return this.setTransform(this.matrix)
},_setFont:function(){var A=this.fontStyle,B=this.rawNode.childNodes;
for(var C=0;
C<B.length;
++C){if(B[C].tagName=="textpath"){B[C].style.font=dojox.gfx.makeFontString(A);
break
}}this.setTransform(this.matrix)
},_getRealMatrix:function(){var A=dojox.gfx.Shape.prototype._getRealMatrix.call(this);
if(A){A=dojox.gfx.matrix.multiply(A,{dy:-dojox.gfx.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35})
}return A
},getTextWidth:function(){var B=this.rawNode,A=B.style.display;
B.style.display="inline";
var C=dojox.gfx.pt2px(parseFloat(B.currentStyle.width));
B.style.display=A;
return C
}});
dojox.gfx.Text.nodeType="shape";
dojox.gfx.path._calcArc=function(C){var A=Math.cos(C),D=Math.sin(C),B={x:A+(4/3)*(1-A),y:D-(4/3)*A*(1-A)/D};
return{s:{x:A,y:-D},c1:{x:B.x,y:-B.y},c2:B,e:{x:A,y:D}}
};
dojo.declare("dojox.gfx.Path",dojox.gfx.path.Path,{constructor:function(A){if(A&&!A.getAttribute("dojoGfxType")){A.setAttribute("dojoGfxType","path")
}this.vmlPath="";
this.lastControl={}
},_updateWithSegment:function(A){var C=dojo.clone(this.last);
dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var B=this[this.renderers[A.action]](A,C);
if(typeof this.vmlPath=="string"){this.vmlPath+=B.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e"
}else{this.vmlPath=this.vmlPath.concat(B)
}},setShape:function(A){this.vmlPath=[];
this.lastControl={};
dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.vmlPath=this.vmlPath.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e";
return this
},_pathVmlToSvgMap:{m:"M",l:"L",t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(C,A,D,E){if(typeof E=="undefined"){E=A.length
}if(typeof D=="undefined"){D=0
}for(var B=D;
B<E;
++B){C.push(" ");
C.push(A[B].toFixed())
}},_addArgsAdjusted:function(D,C,A,E,F){if(typeof F=="undefined"){F=A.length
}if(typeof E=="undefined"){E=0
}for(var B=E;
B<F;
B+=2){D.push(" ");
D.push((C.x+A[B]).toFixed());
D.push(" ");
D.push((C.y+A[B+1]).toFixed())
}},_moveToA:function(A){var B=[" m"],C=A.args,D=C.length;
if(D==2){this._addArgs(B,C)
}else{this._addArgs(B,C,0,2);
B.push(" l");
this._addArgs(B,C,2)
}this.lastControl={};
return B
},_moveToR:function(B,A){var C=["x" in A?" t":" m"],D=B.args,E=D.length;
if(E==2){this._addArgs(C,D)
}else{this._addArgs(C,D,0,2);
C.push(" r");
this._addArgs(C,D,2)
}this.lastControl={};
return C
},_lineToA:function(B){var A=[" l"];
this._addArgs(A,B.args);
this.lastControl={};
return A
},_lineToR:function(B){var A=[" r"];
this._addArgs(A,B.args);
this.lastControl={};
return A
},_hLineToA:function(A,G){var B=[" l"],D=A.args,E=D.length,C=" "+G.y.toFixed();
for(var F=0;
F<E;
++F){B.push(" ");
B.push(D[F].toFixed());
B.push(C)
}this.lastControl={};
return B
},_hLineToR:function(B){var C=[" r"],D=B.args,E=D.length;
for(var A=0;
A<E;
++A){C.push(" ");
C.push(D[A].toFixed());
C.push(" 0")
}this.lastControl={};
return C
},_vLineToA:function(B,A){var C=[" l"],D=B.args,F=D.length,E=" "+A.x.toFixed();
for(var G=0;
G<F;
++G){C.push(E);
C.push(" ");
C.push(D[G].toFixed())
}this.lastControl={};
return C
},_vLineToR:function(B){var C=[" r"],D=B.args,E=D.length;
for(var A=0;
A<E;
++A){C.push(" 0 ");
C.push(D[A].toFixed())
}this.lastControl={};
return C
},_curveToA:function(B){var C=[],D=B.args,E=D.length;
for(var A=0;
A<E;
A+=6){C.push(" c");
this._addArgs(C,D,A,A+6)
}this.lastControl={x:D[E-4],y:D[E-3],type:"C"};
return C
},_curveToR:function(C,B){var D=[],E=C.args,F=E.length;
for(var A=0;
A<F;
A+=6){D.push(" v");
this._addArgs(D,E,A,A+6);
this.lastControl={x:B.x+E[A+2],y:B.y+E[A+3]};
B.x+=E[A+4];
B.y+=E[A+5]
}this.lastControl.type="C";
return D
},_smoothCurveToA:function(C,B){var D=[],E=C.args,F=E.length;
for(var A=0;
A<F;
A+=4){D.push(" c");
if(this.lastControl.type=="C"){this._addArgs(D,[2*B.x-this.lastControl.x,2*B.y-this.lastControl.y])
}else{this._addArgs(D,[B.x,B.y])
}this._addArgs(D,E,A,A+4)
}this.lastControl={x:E[F-4],y:E[F-3],type:"C"};
return D
},_smoothCurveToR:function(C,B){var D=[],E=C.args,F=E.length;
for(var A=0;
A<F;
A+=4){D.push(" v");
if(this.lastControl.type=="C"){this._addArgs(D,[B.x-this.lastControl.x,B.y-this.lastControl.y])
}else{this._addArgs(D,[0,0])
}this._addArgs(D,E,A,A+4);
this.lastControl={x:B.x+E[A],y:B.y+E[A+1]};
B.x+=E[A+2];
B.y+=E[A+3]
}this.lastControl.type="C";
return D
},_qCurveToA:function(B){var C=[],D=B.args,E=D.length;
for(var A=0;
A<E;
A+=4){C.push(" qb");
this._addArgs(C,D,A,A+4)
}this.lastControl={x:D[E-4],y:D[E-3],type:"Q"};
return C
},_qCurveToR:function(C,B){var D=[],E=C.args,F=E.length;
for(var A=0;
A<F;
A+=4){D.push(" qb");
this._addArgsAdjusted(D,B,E,A,A+4);
this.lastControl={x:B.x+E[A],y:B.y+E[A+1]};
B.x+=E[A+2];
B.y+=E[A+3]
}this.lastControl.type="Q";
return D
},_qSmoothCurveToA:function(C,B){var D=[],E=C.args,F=E.length;
for(var A=0;
A<F;
A+=2){D.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(D,[this.lastControl.x=2*B.x-this.lastControl.x,this.lastControl.y=2*B.y-this.lastControl.y])
}else{this._addArgs(D,[this.lastControl.x=B.x,this.lastControl.y=B.y])
}this._addArgs(D,E,A,A+2)
}this.lastControl.type="Q";
return D
},_qSmoothCurveToR:function(C,B){var D=[],E=C.args,F=E.length;
for(var A=0;
A<F;
A+=2){D.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(D,[this.lastControl.x=2*B.x-this.lastControl.x,this.lastControl.y=2*B.y-this.lastControl.y])
}else{this._addArgs(D,[this.lastControl.x=B.x,this.lastControl.y=B.y])
}this._addArgsAdjusted(D,B,E,A,A+2)
}this.lastControl.type="Q";
return D
},_arcTo:function(D,F){var I=[],K=D.args,A=K.length,H=D.action=="a";
for(var C=0;
C<A;
C+=7){var J=K[C+5],E=K[C+6];
if(H){J+=F.x;
E+=F.y
}var G=dojox.gfx.arc.arcAsBezier(F,K[C],K[C+1],K[C+2],K[C+3]?1:0,K[C+4]?1:0,J,E);
for(var B=0;
B<G.length;
++B){I.push(" c");
this._addArgs(I,G[B])
}F={x:J,y:E}
}this.lastControl={};
return I
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
var A=this.rawNode,H=this.text,B=null,G=null,C=A.childNodes;
for(var F=0;
F<C.length;
++F){var D=C[F].tagName;
if(D=="path"){B=C[F];
if(G){break
}}else{if(D=="textpath"){G=C[F];
if(B){break
}}}}if(!B){B=this.rawNode.ownerDocument.createElement("v:path");
A.appendChild(B)
}if(!G){G=this.rawNode.ownerDocument.createElement("v:textpath");
A.appendChild(G)
}B.textPathOk=true;
G.on=true;
var E=dojox.gfx.vml.text_alignment[H.align];
G.style["v-text-align"]=E?E:"left";
G.style["text-decoration"]=H.decoration;
G.style["v-rotate-letters"]=H.rotated;
G.style["v-text-kern"]=H.kerning;
G.string=H.text
},_setFont:function(){var A=this.fontStyle,B=this.rawNode.childNodes;
for(var C=0;
C<B.length;
++C){if(B[C].tagName=="textpath"){B[C].style.font=dojox.gfx.makeFontString(A);
break
}}}});
dojox.gfx.TextPath.nodeType="shape";
dojo.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},setDimensions:function(D,F){this.width=dojox.gfx.normalizedLength(D);
this.height=dojox.gfx.normalizedLength(F);
if(!this.rawNode){return this
}var C=this.clipNode.style,E=this.rawNode,A=E.style,B=this.bgNode.style;
C.width=D;
C.height=F;
C.clip="rect(0 "+D+" "+F+" 0)";
A.width=D;
A.height=F;
E.coordsize=D+" "+F;
B.width=D;
B.height=F;
return this
},getDimensions:function(){var A=this.rawNode?{width:dojox.gfx.normalizedLength(this.rawNode.style.width),height:dojox.gfx.normalizedLength(this.rawNode.style.height)}:null;
if(A.width<=0){A.width=this.width
}if(A.height<=0){A.height=this.height
}return A
}});
dojox.gfx.createSurface=function(A,J,F){if(!J){J="100%"
}if(!F){F="100%"
}var G=new dojox.gfx.Surface(),I=dojo.byId(A),C=G.clipNode=I.ownerDocument.createElement("div"),H=G.rawNode=I.ownerDocument.createElement("v:group"),B=C.style,K=H.style;
I.style.width=J;
I.style.height=F;
B.width=J;
B.height=F;
B.clip="rect(0 "+J+" "+F+" 0)";
B.position="absolute";
K.width=J;
K.height=F;
H.coordsize=(J=="100%"?J:parseFloat(J))+" "+(F=="100%"?F:parseFloat(F));
H.coordorigin="0 0";
var D=G.bgNode=H.ownerDocument.createElement("v:rect"),E=D.style;
E.left=E.top=0;
E.width=K.width;
E.height=K.height;
D.filled=D.stroked="f";
H.appendChild(D);
C.appendChild(H);
I.appendChild(C);
G.width=dojox.gfx.normalizedLength(J);
G.height=dojox.gfx.normalizedLength(F);
return G
};
dojox.gfx.vml.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(A){if(this!=A.getParent()){this.rawNode.appendChild(A.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(B,A){if(this==B.getParent()){if(this.rawNode==B.rawNode.parentNode){this.rawNode.removeChild(B.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var A=this.rawNode;
while(A.firstChild!=A.lastChild){if(A.firstChild!=this.bgNode){A.removeChild(A.firstChild)
}if(A.lastChild!=this.bgNode){A.removeChild(A.lastChild)
}}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
dojo.mixin(dojox.gfx.shape.Creator,{createGroup:function(){var A=this.createObject(dojox.gfx.Group,null);
var B=A.rawNode.ownerDocument.createElement("v:rect");
B.style.left=B.style.top=0;
B.style.width=A.rawNode.style.width;
B.style.height=A.rawNode.style.height;
B.filled=B.stroked="f";
A.rawNode.appendChild(B);
A.bgNode=B;
return A
},createImage:function(C){if(!this.rawNode){return null
}var A=new dojox.gfx.Image(),B=this.rawNode.ownerDocument.createElement("div");
B.style.position="absolute";
B.style.width=this.rawNode.style.width;
B.style.height=this.rawNode.style.height;
B.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)";
var D=this.rawNode.ownerDocument.createElement("img");
B.appendChild(D);
A.setRawNode(B);
this.rawNode.appendChild(B);
A.setShape(C);
this.add(A);
return A
},createObject:function(C,A){if(!this.rawNode){return null
}var D=new C(),B=this.rawNode.ownerDocument.createElement("v:"+C.nodeType);
D.setRawNode(B);
this.rawNode.appendChild(B);
switch(C){case dojox.gfx.Group:case dojox.gfx.Line:case dojox.gfx.Polyline:case dojox.gfx.Text:case dojox.gfx.Path:case dojox.gfx.TextPath:this._overrideSize(B)
}D.setShape(A);
this.add(D);
return D
},_overrideSize:function(B){var A=this;
for(;
A&&!(A instanceof dojox.gfx.Surface);
A=A.parent){}B.style.width=A.width;
B.style.height=A.height;
B.coordsize=A.width+" "+A.height
}});
dojo.extend(dojox.gfx.Group,dojox.gfx.vml.Container);
dojo.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
dojo.extend(dojox.gfx.Surface,dojox.gfx.vml.Container);
dojo.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
};