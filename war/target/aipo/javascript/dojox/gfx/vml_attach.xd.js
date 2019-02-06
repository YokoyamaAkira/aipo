dojo._xdResourceLoaded({depends:[["require","dojox.gfx.vml"]],defineResource:function(A){A.require("dojox.gfx.vml");
A.experimental("dojox.gfx.vml_attach");
(function(){dojox.gfx.attachNode=function(R){if(!R){return null
}var Q=null;
switch(R.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:Q=new dojox.gfx.Rect(R);
D(Q);
break;
case dojox.gfx.Ellipse.nodeType:if(R.style.width==R.style.height){Q=new dojox.gfx.Circle(R);
O(Q)
}else{Q=new dojox.gfx.Ellipse(R);
P(Q)
}break;
case dojox.gfx.Path.nodeType:switch(R.getAttribute("dojoGfxType")){case"line":Q=new dojox.gfx.Line(R);
H(Q);
break;
case"polyline":Q=new dojox.gfx.Polyline(R);
J(Q);
break;
case"path":Q=new dojox.gfx.Path(R);
G(Q);
break;
case"text":Q=new dojox.gfx.Text(R);
E(Q);
N(Q);
L(Q);
break;
case"textpath":Q=new dojox.gfx.TextPath(R);
G(Q);
E(Q);
N(Q);
break
}break;
case dojox.gfx.Image.nodeType:switch(R.getAttribute("dojoGfxType")){case"image":Q=new dojox.gfx.Image(R);
K(Q);
B(Q);
break
}break;
default:return null
}if(!(Q instanceof dojox.gfx.Image)){F(Q);
M(Q);
if(!(Q instanceof dojox.gfx.Text)){I(Q)
}}return Q
};
dojox.gfx.attachSurface=function(T){var R=new dojox.gfx.Surface();
R.clipNode=T;
var S=R.rawNode=T.firstChild;
var Q=S.firstChild;
if(!Q||Q.tagName!="rect"){return null
}R.bgNode=S;
return R
};
var F=function(R){var X=null,Q=R.rawNode,U=Q.fill;
if(U.on&&U.type=="gradient"){var X=A.clone(dojox.gfx.defaultLinearGradient),V=dojox.gfx.matrix._degToRad(U.angle);
X.x2=Math.cos(V);
X.y2=Math.sin(V);
X.colors=[];
var Y=U.colors.value.split(";");
for(var S=0;
S<Y.length;
++S){var Z=Y[S].match(/\S+/g);
if(!Z||Z.length!=2){continue
}X.colors.push({offset:dojox.gfx.vml._parseFloat(Z[0]),color:new A.Color(Z[1])})
}}else{if(U.on&&U.type=="gradientradial"){var X=A.clone(dojox.gfx.defaultRadialGradient),W=parseFloat(Q.style.width),T=parseFloat(Q.style.height);
X.cx=isNaN(W)?0:U.focusposition.x*W;
X.cy=isNaN(T)?0:U.focusposition.y*T;
X.r=isNaN(W)?1:W/2;
X.colors=[];
var Y=U.colors.value.split(";");
for(var S=Y.length-1;
S>=0;
--S){var Z=Y[S].match(/\S+/g);
if(!Z||Z.length!=2){continue
}X.colors.push({offset:dojox.gfx.vml._parseFloat(Z[0]),color:new A.Color(Z[1])})
}}else{if(U.on&&U.type=="tile"){var X=A.clone(dojox.gfx.defaultPattern);
X.width=dojox.gfx.pt2px(U.size.x);
X.height=dojox.gfx.pt2px(U.size.y);
X.x=U.origin.x*X.width;
X.y=U.origin.y*X.height;
X.src=U.src
}else{if(U.on&&Q.fillcolor){X=new A.Color(Q.fillcolor+"");
X.a=U.opacity
}}}}R.fillStyle=X
};
var M=function(R){var S=R.rawNode;
if(!S.stroked){R.strokeStyle=null;
return 
}var T=R.strokeStyle=A.clone(dojox.gfx.defaultStroke),Q=S.stroke;
T.color=new A.Color(S.strokecolor.value);
T.width=dojox.gfx.normalizedLength(S.strokeweight+"");
T.color.a=Q.opacity;
T.cap=this._translate(this._capMapReversed,Q.endcap);
T.join=Q.joinstyle=="miter"?Q.miterlimit:Q.joinstyle;
T.style=Q.dashstyle
};
var I=function(Q){var R=rawNode.skew,T=R.matrix,S=R.offset;
Q.matrix=dojox.gfx.matrix.normalize({xx:T.xtox,xy:T.ytox,yx:T.xtoy,yy:T.ytoy,dx:dojox.gfx.pt2px(S.x),dy:dojox.gfx.pt2px(S.y)})
};
var C=function(Q){Q.bgNode=Q.rawNode.firstChild
};
var D=function(S){var V=S.rawNode,R=V.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],U=V.style,T=parseFloat(U.width),Q=parseFloat(U.height);
R=(R.indexOf("%")>=0)?parseFloat(R)/100:dojox.gfx.vml._parseFloat(R);
S.shape=dojox.gfx.makeParameters(dojox.gfx.defaultRect,{x:parseInt(U.left),y:parseInt(U.top),width:T,height:Q,r:Math.min(T,Q)*R})
};
var P=function(Q){var R=Q.rawNode.style,T=parseInt(R.width)/2,S=parseInt(R.height)/2;
Q.shape=dojox.gfx.makeParameters(dojox.gfx.defaultEllipse,{cx:parseInt(R.left)+T,cy:parseInt(R.top)+S,rx:T,ry:S})
};
var O=function(Q){var R=Q.rawNode.style,S=parseInt(R.width)/2;
Q.shape=dojox.gfx.makeParameters(dojox.gfx.defaultCircle,{cx:parseInt(R.left)+S,cy:parseInt(R.top)+S,r:S})
};
var H=function(R){var Q=R.shape=A.clone(dojox.gfx.defaultLine),S=R.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(S.length<7||S[0]!="m"||S[3]!="l"||S[6]!="e"){break
}Q.x1=parseInt(S[1]);
Q.y1=parseInt(S[2]);
Q.x2=parseInt(S[4]);
Q.y2=parseInt(S[5])
}while(false)
};
var J=function(S){var R=S.shape=A.clone(dojox.gfx.defaultPolyline),U=S.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(U.length<3||U[0]!="m"){break
}var Q=parseInt(U[0]),V=parseInt(U[1]);
if(isNaN(Q)||isNaN(V)){break
}R.points.push({x:Q,y:V});
if(U.length<6||U[3]!="l"){break
}for(var T=4;
T<U.length;
T+=2){Q=parseInt(U[T]);
V=parseInt(U[T+1]);
if(isNaN(Q)||isNaN(V)){break
}R.points.push({x:Q,y:V})
}}while(false)
};
var K=function(Q){Q.shape=A.clone(dojox.gfx.defaultImage);
Q.shape.src=Q.rawNode.firstChild.src
};
var B=function(R){var Q=R.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
R.matrix=dojox.gfx.matrix.normalize({xx:Q.M11,xy:Q.M12,yx:Q.M21,yy:Q.M22,dx:Q.Dx,dy:Q.Dy})
};
var E=function(R){var Q=R.shape=A.clone(dojox.gfx.defaultText),U=R.rawNode,V=U.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(!V||V.length!=7){break
}var W=U.childNodes,S=0;
for(;
S<W.length&&W[S].tagName!="textpath";
++S){}if(S>=W.length){break
}var T=W[S].style;
Q.text=W[S].string;
switch(T["v-text-align"]){case"left":Q.x=parseInt(V[1]);
Q.align="start";
break;
case"center":Q.x=(parseInt(V[1])+parseInt(V[4]))/2;
Q.align="middle";
break;
case"right":Q.x=parseInt(V[4]);
Q.align="end";
break
}Q.y=parseInt(V[2]);
Q.decoration=T["text-decoration"];
Q.rotated=T["v-rotate-letters"].toLowerCase() in dojox.gfx.vml._bool;
Q.kerning=T["v-text-kern"].toLowerCase() in dojox.gfx.vml._bool;
return 
}while(false);
R.shape=null
};
var N=function(Q){var T=Q.fontStyle=A.clone(dojox.gfx.defaultFont),U=Q.rawNode.childNodes,R=0;
for(;
R<U.length&&U[R].tagName=="textpath";
++R){}if(R>=U.length){Q.fontStyle=null;
return 
}var S=U[R].style;
T.style=S.fontstyle;
T.variant=S.fontvariant;
T.weight=S.fontweight;
T.size=S.fontsize;
T.family=S.fontfamily
};
var L=function(S){I(S);
var R=S.matrix,Q=S.fontStyle;
if(R&&Q){S.matrix=dojox.gfx.matrix.multiply(R,{dy:dojox.gfx.normalizedLength(Q.size)*0.35})
}};
var G=function(U){var W=U.shape=A.clone(dojox.gfx.defaultPath),R=rawNode.path.v.match(dojox.gfx.pathVmlRegExp),Y=[],X=false,Q=dojox.gfx.Path._pathVmlToSvgMap;
for(var V=0;
V<R.length;
++R){var Z=R[V];
if(Z in Q){X=false;
Y.push(Q[Z])
}else{if(!X){var S=parseInt(Z);
if(isNaN(S)){X=true
}else{Y.push(S)
}}}}var T=Y.length;
if(T>=4&&Y[T-1]==""&&Y[T-2]==0&&Y[T-3]==0&&Y[T-4]=="l"){Y.splice(T-4,4)
}if(T){W.path=Y.join(" ")
}}
})()
}});