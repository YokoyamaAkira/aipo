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
A.extend(dojox.gfx.Shape,{setFill:function(G){if(!G){this.fillStyle=null;
this.rawNode.filled="f";
return this
}if(typeof G=="object"&&"type" in G){switch(G.type){case"linear":var O=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,G),H=[],C=O.colors,B=this._getRealMatrix(),E=dojox.gfx.matrix;
this.fillStyle=O;
A.forEach(C,function(T,U,S){S[U].color=dojox.gfx.normalizeColor(T.color)
});
if(C[0].offset>0){H.push("0 "+C[0].color.toHex())
}for(var L=0;
L<C.length;
++L){H.push(C[L].offset.toFixed(8)+" "+C[L].color.toHex())
}var L=C.length-1;
if(C[L].offset<1){H.push("1 "+C[L].color.toHex())
}var R=this.rawNode.fill;
R.colors.value=H.join(";");
R.method="sigma";
R.type="gradient";
var P=B?E.multiplyPoint(B,O.x1,O.y1):{x:O.x1,y:O.y1},N=B?E.multiplyPoint(B,O.x2,O.y2):{x:O.x2,y:O.y2};
R.angle=(E._radToDeg(Math.atan2(N.x-P.x,N.y-P.y))+180)%360;
R.on=true;
break;
case"radial":var O=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,G);
this.fillStyle=O;
var K=parseFloat(this.rawNode.style.left),F=parseFloat(this.rawNode.style.top),D=parseFloat(this.rawNode.style.width),M=parseFloat(this.rawNode.style.height),Q=isNaN(D)?1:2*O.r/D,C=new Array(O.colors.length);
A.forEach(O.colors,function(S,T){C[T]={offset:1-S.offset*Q,color:dojox.gfx.normalizeColor(S.color)}
});
var L=C.length-1;
while(L>=0&&C[L].offset<0){--L
}if(L<C.length-1){var I=C[L],J=C[L+1];
J.color=A.blendColors(I.color,J.color,I.offset/(I.offset-J.offset));
J.offset=0;
while(C.length-L>2){C.pop()
}}var L=C.length-1,H=[];
if(C[L].offset>0){H.push("0 "+C[L].color.toHex())
}for(;
L>=0;
--L){H.push(C[L].offset.toFixed(8)+" "+C[L].color.toHex())
}if(C[0].offset<1){H.push("1 "+C[0].color.toHex())
}var R=this.rawNode.fill;
R.colors.value=H.join(";");
R.method="sigma";
R.type="gradientradial";
if(isNaN(D)||isNaN(M)||isNaN(K)||isNaN(F)){R.focusposition="0.5 0.5"
}else{R.focusposition=((O.cx-K)/D).toFixed(8)+" "+((O.cy-F)/M).toFixed(8)
}R.focussize="0 0";
R.on=true;
break;
case"pattern":var O=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,G);
this.fillStyle=O;
var R=this.rawNode.fill;
R.type="tile";
R.src=O.src;
if(O.width&&O.height){R.size.x=dojox.gfx.px2pt(O.width);
R.size.y=dojox.gfx.px2pt(O.height)
}R.alignShape="f";
R.position.x=0;
R.position.y=0;
R.origin.x=O.width?O.x/O.width:0;
R.origin.y=O.height?O.y/O.height:0;
R.on=true;
break
}this.rawNode.fill.opacity=1;
return this
}this.fillStyle=dojox.gfx.normalizeColor(G);
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
var D=this.rawNode;
D.stroked=true;
D.strokecolor=C.color.toCss();
D.strokeweight=C.width+"px";
if(D.stroke){D.stroke.opacity=C.color.a;
D.stroke.endcap=this._translate(this._capMap,C.cap);
if(typeof C.join=="number"){D.stroke.joinstyle="miter";
D.stroke.miterlimit=C.join
}else{D.stroke.joinstyle=C.join
}D.stroke.dashstyle=C.style=="none"?"Solid":C.style
}return this
},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(B,C){return(C in B)?B[C]:C
},_applyTransform:function(){if(this.fillStyle&&this.fillStyle.type=="linear"){this.setFill(this.fillStyle)
}var E=this._getRealMatrix();
if(!E){return this
}var I=this.rawNode.skew;
if(typeof I=="undefined"){for(var C=0;
C<this.rawNode.childNodes.length;
++C){if(this.rawNode.childNodes[C].tagName=="skew"){I=this.rawNode.childNodes[C];
break
}}}if(I){I.on="f";
var K=E.xx.toFixed(8)+" "+E.xy.toFixed(8)+" "+E.yx.toFixed(8)+" "+E.yy.toFixed(8)+" 0 0",B=Math.floor(E.dx).toFixed()+"px "+Math.floor(E.dy).toFixed()+"px",J=this.rawNode.style,L=parseFloat(J.left),H=parseFloat(J.top),G=parseFloat(J.width),D=parseFloat(J.height);
if(isNaN(L)){L=0
}if(isNaN(H)){H=0
}if(isNaN(G)){G=1
}if(isNaN(D)){D=1
}var F=(-L/G-0.5).toFixed(8)+" "+(-H/D-0.5).toFixed(8);
I.matrix=K;
I.origin=F;
I.offset=B;
I.on=true
}return this
},setRawNode:function(B){B.stroked="f";
B.filled="f";
this.rawNode=B
},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);
return this
},_moveToBack:function(){var C=this.rawNode,D=C.parentNode,B=D.firstChild;
D.insertBefore(C,B);
if(B.tagName=="rect"){B.swapNode(C)
}return this
},_getRealMatrix:function(){return this.parentMatrix?new dojox.gfx.Matrix2D([this.parentMatrix,this.matrix]):this.matrix
}});
A.declare("dojox.gfx.Group",dojox.gfx.Shape,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},_applyTransform:function(){var C=this._getRealMatrix();
for(var B=0;
B<this.children.length;
++B){this.children[B]._updateParentMatrix(C)
}return this
}});
dojox.gfx.Group.nodeType="group";
A.declare("dojox.gfx.Rect",dojox.gfx.shape.Rect,{setShape:function(H){var G=this.shape=dojox.gfx.makeParameters(this.shape,H);
this.bbox=null;
var E=this.rawNode.style;
E.left=G.x.toFixed();
E.top=G.y.toFixed();
E.width=(typeof G.width=="string"&&G.width.indexOf("%")>=0)?G.width:G.width.toFixed();
E.height=(typeof G.width=="string"&&G.height.indexOf("%")>=0)?G.height:G.height.toFixed();
var F=Math.min(1,(G.r/Math.min(parseFloat(G.width),parseFloat(G.height)))).toFixed(8);
var D=this.rawNode.parentNode,C=null;
if(D){if(D.lastChild!=this.rawNode){for(var B=0;
B<D.childNodes.length;
++B){if(D.childNodes[B]==this.rawNode){C=D.childNodes[B+1];
break
}}}D.removeChild(this.rawNode)
}this.rawNode.arcsize=F;
if(D){if(C){D.insertBefore(this.rawNode,C)
}else{D.appendChild(this.rawNode)
}}return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)
}});
dojox.gfx.Rect.nodeType="roundrect";
A.declare("dojox.gfx.Ellipse",dojox.gfx.shape.Ellipse,{setShape:function(D){var C=this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var B=this.rawNode.style;
B.left=(C.cx-C.rx).toFixed();
B.top=(C.cy-C.ry).toFixed();
B.width=(C.rx*2).toFixed();
B.height=(C.ry*2).toFixed();
return this.setTransform(this.matrix)
}});
dojox.gfx.Ellipse.nodeType="oval";
A.declare("dojox.gfx.Circle",dojox.gfx.shape.Circle,{setShape:function(D){var C=this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var B=this.rawNode.style;
B.left=(C.cx-C.r).toFixed();
B.top=(C.cy-C.r).toFixed();
B.width=(C.r*2).toFixed();
B.height=(C.r*2).toFixed();
return this
}});
dojox.gfx.Circle.nodeType="oval";
A.declare("dojox.gfx.Line",dojox.gfx.shape.Line,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","line")
}},setShape:function(B){var C=this.shape=dojox.gfx.makeParameters(this.shape,B);
this.bbox=null;
this.rawNode.path.v="m"+C.x1.toFixed()+" "+C.y1.toFixed()+"l"+C.x2.toFixed()+" "+C.y2.toFixed()+"e";
return this.setTransform(this.matrix)
}});
dojox.gfx.Line.nodeType="shape";
A.declare("dojox.gfx.Polyline",dojox.gfx.shape.Polyline,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","polyline")
}},setShape:function(G,E){if(G&&G instanceof Array){this.shape=dojox.gfx.makeParameters(this.shape,{points:G});
if(E&&this.shape.points.length){this.shape.points.push(this.shape.points[0])
}}else{this.shape=dojox.gfx.makeParameters(this.shape,G)
}this.bbox=null;
var C=[],B=this.shape.points;
if(B.length>0){C.push("m");
var D=1;
if(typeof B[0]=="number"){C.push(B[0].toFixed());
C.push(B[1].toFixed());
D=2
}else{C.push(B[0].x.toFixed());
C.push(B[0].y.toFixed())
}if(B.length>D){C.push("l");
for(var F=D;
F<B.length;
++F){if(typeof B[F]=="number"){C.push(B[F].toFixed())
}else{C.push(B[F].x.toFixed());
C.push(B[F].y.toFixed())
}}}}C.push("e");
this.rawNode.path.v=C.join(" ");
return this.setTransform(this.matrix)
}});
dojox.gfx.Polyline.nodeType="shape";
A.declare("dojox.gfx.Image",dojox.gfx.shape.Image,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","image")
}},getEventSource:function(){return this.rawNode?this.rawNode.firstChild:null
},setShape:function(D){var C=this.shape=dojox.gfx.makeParameters(this.shape,D);
this.bbox=null;
var B=this.rawNode.firstChild;
B.src=C.src;
if(C.width||C.height){B.style.width=C.width;
B.style.height=C.height
}return this.setTransform(this.matrix)
},_applyTransform:function(){var C=this._getRealMatrix();
if(!C){return this
}C=dojox.gfx.matrix.multiply(C,{dx:this.shape.x,dy:this.shape.y});
var B=this.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
B.M11=C.xx;
B.M12=C.xy;
B.M21=C.yx;
B.M22=C.yy;
B.Dx=C.dx;
B.Dy=C.dy;
return this
}});
dojox.gfx.Image.nodeType="div";
A.declare("dojox.gfx.Text",dojox.gfx.shape.Text,{constructor:function(B){if(B){B.setAttribute("dojoGfxType","text")
}this.fontStyle=null
},_alignment:{start:"left",middle:"center",end:"right"},setShape:function(G){this.shape=dojox.gfx.makeParameters(this.shape,G);
this.bbox=null;
var K=this.rawNode,J=this.shape,F=J.x,D=J.y.toFixed();
switch(J.align){case"middle":F-=5;
break;
case"end":F-=10;
break
}this.rawNode.path.v="m"+F.toFixed()+","+D+"l"+(F+10).toFixed()+","+D+"e";
var L=null,H=null,C=K.childNodes;
for(var B=0;
B<C.length;
++B){var I=C[B].tagName;
if(I=="path"){L=C[B];
if(H){break
}}else{if(I=="textpath"){H=C[B];
if(L){break
}}}}if(!L){L=this.rawNode.ownerDocument.createElement("v:path");
K.appendChild(L)
}if(!H){H=this.rawNode.ownerDocument.createElement("v:textpath");
K.appendChild(H)
}L.textPathOk=true;
H.on=true;
var E=dojox.gfx.vml.text_alignment[J.align];
H.style["v-text-align"]=E?E:"left";
H.style["text-decoration"]=J.decoration;
H.style["v-rotate-letters"]=J.rotated;
H.style["v-text-kern"]=J.kerning;
H.string=J.text;
return this.setTransform(this.matrix)
},_setFont:function(){var D=this.fontStyle,B=this.rawNode.childNodes;
for(var C=0;
C<B.length;
++C){if(B[C].tagName=="textpath"){B[C].style.font=dojox.gfx.makeFontString(D);
break
}}this.setTransform(this.matrix)
},_getRealMatrix:function(){var B=dojox.gfx.Shape.prototype._getRealMatrix.call(this);
if(B){B=dojox.gfx.matrix.multiply(B,{dy:-dojox.gfx.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35})
}return B
},getTextWidth:function(){var B=this.rawNode,D=B.style.display;
B.style.display="inline";
var C=dojox.gfx.pt2px(parseFloat(B.currentStyle.width));
B.style.display=D;
return C
}});
dojox.gfx.Text.nodeType="shape";
dojox.gfx.path._calcArc=function(B){var D=Math.cos(B),C=Math.sin(B),E={x:D+(4/3)*(1-D),y:C-(4/3)*D*(1-D)/C};
return{s:{x:D,y:-C},c1:{x:E.x,y:-E.y},c2:E,e:{x:D,y:C}}
};
A.declare("dojox.gfx.Path",dojox.gfx.path.Path,{constructor:function(B){if(B&&!B.getAttribute("dojoGfxType")){B.setAttribute("dojoGfxType","path")
}this.vmlPath="";
this.lastControl={}
},_updateWithSegment:function(D){var C=A.clone(this.last);
dojox.gfx.Path.superclass._updateWithSegment.apply(this,arguments);
var B=this[this.renderers[D.action]](D,C);
if(typeof this.vmlPath=="string"){this.vmlPath+=B.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e"
}else{this.vmlPath=this.vmlPath.concat(B)
}},setShape:function(B){this.vmlPath=[];
this.lastControl={};
dojox.gfx.Path.superclass.setShape.apply(this,arguments);
this.vmlPath=this.vmlPath.join("");
this.rawNode.path.v=this.vmlPath+" r0,0 e";
return this
},_pathVmlToSvgMap:{m:"M",l:"L",t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(F,D,B,C){if(typeof C=="undefined"){C=D.length
}if(typeof B=="undefined"){B=0
}for(var E=B;
E<C;
++E){F.push(" ");
F.push(D[E].toFixed())
}},_addArgsAdjusted:function(G,F,D,C,B){if(typeof B=="undefined"){B=D.length
}if(typeof C=="undefined"){C=0
}for(var E=C;
E<B;
E+=2){G.push(" ");
G.push((F.x+D[E]).toFixed());
G.push(" ");
G.push((F.y+D[E+1]).toFixed())
}},_moveToA:function(D){var E=[" m"],B=D.args,C=B.length;
if(C==2){this._addArgs(E,B)
}else{this._addArgs(E,B,0,2);
E.push(" l");
this._addArgs(E,B,2)
}this.lastControl={};
return E
},_moveToR:function(E,D){var F=["x" in D?" t":" m"],B=E.args,C=B.length;
if(C==2){this._addArgs(F,B)
}else{this._addArgs(F,B,0,2);
F.push(" r");
this._addArgs(F,B,2)
}this.lastControl={};
return F
},_lineToA:function(C){var B=[" l"];
this._addArgs(B,C.args);
this.lastControl={};
return B
},_lineToR:function(C){var B=[" r"];
this._addArgs(B,C.args);
this.lastControl={};
return B
},_hLineToA:function(D,C){var E=[" l"],B=D.args,G=B.length,F=" "+C.y.toFixed();
for(var H=0;
H<G;
++H){E.push(" ");
E.push(B[H].toFixed());
E.push(F)
}this.lastControl={};
return E
},_hLineToR:function(E){var F=[" r"],B=E.args,C=B.length;
for(var D=0;
D<C;
++D){F.push(" ");
F.push(B[D].toFixed());
F.push(" 0")
}this.lastControl={};
return F
},_vLineToA:function(E,D){var F=[" l"],C=E.args,H=C.length,G=" "+D.x.toFixed();
for(var B=0;
B<H;
++B){F.push(G);
F.push(" ");
F.push(C[B].toFixed())
}this.lastControl={};
return F
},_vLineToR:function(E){var F=[" r"],B=E.args,C=B.length;
for(var D=0;
D<C;
++D){F.push(" 0 ");
F.push(B[D].toFixed())
}this.lastControl={};
return F
},_curveToA:function(E){var F=[],B=E.args,C=B.length;
for(var D=0;
D<C;
D+=6){F.push(" c");
this._addArgs(F,B,D,D+6)
}this.lastControl={x:B[C-4],y:B[C-3],type:"C"};
return F
},_curveToR:function(F,E){var G=[],C=F.args,B=C.length;
for(var D=0;
D<B;
D+=6){G.push(" v");
this._addArgs(G,C,D,D+6);
this.lastControl={x:E.x+C[D+2],y:E.y+C[D+3]};
E.x+=C[D+4];
E.y+=C[D+5]
}this.lastControl.type="C";
return G
},_smoothCurveToA:function(F,E){var G=[],C=F.args,B=C.length;
for(var D=0;
D<B;
D+=4){G.push(" c");
if(this.lastControl.type=="C"){this._addArgs(G,[2*E.x-this.lastControl.x,2*E.y-this.lastControl.y])
}else{this._addArgs(G,[E.x,E.y])
}this._addArgs(G,C,D,D+4)
}this.lastControl={x:C[B-4],y:C[B-3],type:"C"};
return G
},_smoothCurveToR:function(F,E){var G=[],C=F.args,B=C.length;
for(var D=0;
D<B;
D+=4){G.push(" v");
if(this.lastControl.type=="C"){this._addArgs(G,[E.x-this.lastControl.x,E.y-this.lastControl.y])
}else{this._addArgs(G,[0,0])
}this._addArgs(G,C,D,D+4);
this.lastControl={x:E.x+C[D],y:E.y+C[D+1]};
E.x+=C[D+2];
E.y+=C[D+3]
}this.lastControl.type="C";
return G
},_qCurveToA:function(E){var F=[],B=E.args,C=B.length;
for(var D=0;
D<C;
D+=4){F.push(" qb");
this._addArgs(F,B,D,D+4)
}this.lastControl={x:B[C-4],y:B[C-3],type:"Q"};
return F
},_qCurveToR:function(F,E){var G=[],C=F.args,B=C.length;
for(var D=0;
D<B;
D+=4){G.push(" qb");
this._addArgsAdjusted(G,E,C,D,D+4);
this.lastControl={x:E.x+C[D],y:E.y+C[D+1]};
E.x+=C[D+2];
E.y+=C[D+3]
}this.lastControl.type="Q";
return G
},_qSmoothCurveToA:function(F,E){var G=[],C=F.args,B=C.length;
for(var D=0;
D<B;
D+=2){G.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(G,[this.lastControl.x=2*E.x-this.lastControl.x,this.lastControl.y=2*E.y-this.lastControl.y])
}else{this._addArgs(G,[this.lastControl.x=E.x,this.lastControl.y=E.y])
}this._addArgs(G,C,D,D+2)
}this.lastControl.type="Q";
return G
},_qSmoothCurveToR:function(F,E){var G=[],C=F.args,B=C.length;
for(var D=0;
D<B;
D+=2){G.push(" qb");
if(this.lastControl.type=="Q"){this._addArgs(G,[this.lastControl.x=2*E.x-this.lastControl.x,this.lastControl.y=2*E.y-this.lastControl.y])
}else{this._addArgs(G,[this.lastControl.x=E.x,this.lastControl.y=E.y])
}this._addArgsAdjusted(G,E,C,D,D+2)
}this.lastControl.type="Q";
return G
},_arcTo:function(G,I){var L=[],C=G.args,D=C.length,K=G.action=="a";
for(var F=0;
F<D;
F+=7){var B=C[F+5],H=C[F+6];
if(K){B+=I.x;
H+=I.y
}var J=dojox.gfx.arc.arcAsBezier(I,C[F],C[F+1],C[F+2],C[F+3]?1:0,C[F+4]?1:0,B,H);
for(var E=0;
E<J.length;
++E){L.push(" c");
this._addArgs(L,J[E])
}I={x:B,y:H}
}this.lastControl={};
return L
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
var D=this.rawNode,C=this.text,E=null,I=null,B=D.childNodes;
for(var H=0;
H<B.length;
++H){var F=B[H].tagName;
if(F=="path"){E=B[H];
if(I){break
}}else{if(F=="textpath"){I=B[H];
if(E){break
}}}}if(!E){E=this.rawNode.ownerDocument.createElement("v:path");
D.appendChild(E)
}if(!I){I=this.rawNode.ownerDocument.createElement("v:textpath");
D.appendChild(I)
}E.textPathOk=true;
I.on=true;
var G=dojox.gfx.vml.text_alignment[C.align];
I.style["v-text-align"]=G?G:"left";
I.style["text-decoration"]=C.decoration;
I.style["v-rotate-letters"]=C.rotated;
I.style["v-text-kern"]=C.kerning;
I.string=C.text
},_setFont:function(){var D=this.fontStyle,B=this.rawNode.childNodes;
for(var C=0;
C<B.length;
++C){if(B[C].tagName=="textpath"){B[C].style.font=dojox.gfx.makeFontString(D);
break
}}}});
dojox.gfx.TextPath.nodeType="shape";
A.declare("dojox.gfx.Surface",dojox.gfx.shape.Surface,{constructor:function(){dojox.gfx.vml.Container._init.call(this)
},setDimensions:function(G,C){this.width=dojox.gfx.normalizedLength(G);
this.height=dojox.gfx.normalizedLength(C);
if(!this.rawNode){return this
}var F=this.clipNode.style,B=this.rawNode,D=B.style,E=this.bgNode.style;
F.width=G;
F.height=C;
F.clip="rect(0 "+G+" "+C+" 0)";
D.width=G;
D.height=C;
B.coordsize=G+" "+C;
E.width=G;
E.height=C;
return this
},getDimensions:function(){var B=this.rawNode?{width:dojox.gfx.normalizedLength(this.rawNode.style.width),height:dojox.gfx.normalizedLength(this.rawNode.style.height)}:null;
if(B.width<=0){B.width=this.width
}if(B.height<=0){B.height=this.height
}return B
}});
dojox.gfx.createSurface=function(D,B,I){if(!B){B="100%"
}if(!I){I="100%"
}var J=new dojox.gfx.Surface(),L=A.byId(D),F=J.clipNode=L.ownerDocument.createElement("div"),K=J.rawNode=L.ownerDocument.createElement("v:group"),E=F.style,C=K.style;
L.style.width=B;
L.style.height=I;
E.width=B;
E.height=I;
E.clip="rect(0 "+B+" "+I+" 0)";
E.position="absolute";
C.width=B;
C.height=I;
K.coordsize=(B=="100%"?B:parseFloat(B))+" "+(I=="100%"?I:parseFloat(I));
K.coordorigin="0 0";
var G=J.bgNode=K.ownerDocument.createElement("v:rect"),H=G.style;
H.left=H.top=0;
H.width=C.width;
H.height=C.height;
G.filled=G.stroked="f";
K.appendChild(G);
F.appendChild(K);
L.appendChild(F);
J.width=dojox.gfx.normalizedLength(B);
J.height=dojox.gfx.normalizedLength(I);
return J
};
dojox.gfx.vml.Container={_init:function(){dojox.gfx.shape.Container._init.call(this)
},add:function(B){if(this!=B.getParent()){this.rawNode.appendChild(B.rawNode);
dojox.gfx.shape.Container.add.apply(this,arguments)
}return this
},remove:function(C,B){if(this==C.getParent()){if(this.rawNode==C.rawNode.parentNode){this.rawNode.removeChild(C.rawNode)
}dojox.gfx.shape.Container.remove.apply(this,arguments)
}return this
},clear:function(){var B=this.rawNode;
while(B.firstChild!=B.lastChild){if(B.firstChild!=this.bgNode){B.removeChild(B.firstChild)
}if(B.lastChild!=this.bgNode){B.removeChild(B.lastChild)
}}return dojox.gfx.shape.Container.clear.apply(this,arguments)
},_moveChildToFront:dojox.gfx.shape.Container._moveChildToFront,_moveChildToBack:dojox.gfx.shape.Container._moveChildToBack};
A.mixin(dojox.gfx.shape.Creator,{createGroup:function(){var B=this.createObject(dojox.gfx.Group,null);
var C=B.rawNode.ownerDocument.createElement("v:rect");
C.style.left=C.style.top=0;
C.style.width=B.rawNode.style.width;
C.style.height=B.rawNode.style.height;
C.filled=C.stroked="f";
B.rawNode.appendChild(C);
B.bgNode=C;
return B
},createImage:function(B){if(!this.rawNode){return null
}var D=new dojox.gfx.Image(),E=this.rawNode.ownerDocument.createElement("div");
E.style.position="absolute";
E.style.width=this.rawNode.style.width;
E.style.height=this.rawNode.style.height;
E.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)";
var C=this.rawNode.ownerDocument.createElement("img");
E.appendChild(C);
D.setRawNode(E);
this.rawNode.appendChild(E);
D.setShape(B);
this.add(D);
return D
},createObject:function(B,D){if(!this.rawNode){return null
}var C=new B(),E=this.rawNode.ownerDocument.createElement("v:"+B.nodeType);
C.setRawNode(E);
this.rawNode.appendChild(E);
switch(B){case dojox.gfx.Group:case dojox.gfx.Line:case dojox.gfx.Polyline:case dojox.gfx.Text:case dojox.gfx.Path:case dojox.gfx.TextPath:this._overrideSize(E)
}C.setShape(D);
this.add(C);
return C
},_overrideSize:function(C){var B=this;
for(;
B&&!(B instanceof dojox.gfx.Surface);
B=B.parent){}C.style.width=B.width;
C.style.height=B.height;
C.coordsize=B.width+" "+B.height
}});
A.extend(dojox.gfx.Group,dojox.gfx.vml.Container);
A.extend(dojox.gfx.Group,dojox.gfx.shape.Creator);
A.extend(dojox.gfx.Surface,dojox.gfx.vml.Container);
A.extend(dojox.gfx.Surface,dojox.gfx.shape.Creator)
}}});