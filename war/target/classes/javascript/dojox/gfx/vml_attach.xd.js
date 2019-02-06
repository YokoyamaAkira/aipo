dojo._xdResourceLoaded({depends:[["require","dojox.gfx.vml"]],defineResource:function(A){A.require("dojox.gfx.vml");
A.experimental("dojox.gfx.vml_attach");
(function(){dojox.gfx.attachNode=function(R){if(!R){return null
}var Q=null;
switch(R.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:Q=new dojox.gfx.Rect(R);
E(Q);
break;
case dojox.gfx.Ellipse.nodeType:if(R.style.width==R.style.height){Q=new dojox.gfx.Circle(R);
I(Q)
}else{Q=new dojox.gfx.Ellipse(R);
J(Q)
}break;
case dojox.gfx.Path.nodeType:switch(R.getAttribute("dojoGfxType")){case"line":Q=new dojox.gfx.Line(R);
P(Q);
break;
case"polyline":Q=new dojox.gfx.Polyline(R);
C(Q);
break;
case"path":Q=new dojox.gfx.Path(R);
O(Q);
break;
case"text":Q=new dojox.gfx.Text(R);
M(Q);
H(Q);
F(Q);
break;
case"textpath":Q=new dojox.gfx.TextPath(R);
O(Q);
M(Q);
H(Q);
break
}break;
case dojox.gfx.Image.nodeType:switch(R.getAttribute("dojoGfxType")){case"image":Q=new dojox.gfx.Image(R);
D(Q);
K(Q);
break
}break;
default:return null
}if(!(Q instanceof dojox.gfx.Image)){N(Q);
G(Q);
if(!(Q instanceof dojox.gfx.Text)){B(Q)
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
var N=function(T){var Z=null,S=T.rawNode,W=S.fill;
if(W.on&&W.type=="gradient"){var Z=A.clone(dojox.gfx.defaultLinearGradient),X=dojox.gfx.matrix._degToRad(W.angle);
Z.x2=Math.cos(X);
Z.y2=Math.sin(X);
Z.colors=[];
var Q=W.colors.value.split(";");
for(var U=0;
U<Q.length;
++U){var R=Q[U].match(/\S+/g);
if(!R||R.length!=2){continue
}Z.colors.push({offset:dojox.gfx.vml._parseFloat(R[0]),color:new A.Color(R[1])})
}}else{if(W.on&&W.type=="gradientradial"){var Z=A.clone(dojox.gfx.defaultRadialGradient),Y=parseFloat(S.style.width),V=parseFloat(S.style.height);
Z.cx=isNaN(Y)?0:W.focusposition.x*Y;
Z.cy=isNaN(V)?0:W.focusposition.y*V;
Z.r=isNaN(Y)?1:Y/2;
Z.colors=[];
var Q=W.colors.value.split(";");
for(var U=Q.length-1;
U>=0;
--U){var R=Q[U].match(/\S+/g);
if(!R||R.length!=2){continue
}Z.colors.push({offset:dojox.gfx.vml._parseFloat(R[0]),color:new A.Color(R[1])})
}}else{if(W.on&&W.type=="tile"){var Z=A.clone(dojox.gfx.defaultPattern);
Z.width=dojox.gfx.pt2px(W.size.x);
Z.height=dojox.gfx.pt2px(W.size.y);
Z.x=W.origin.x*Z.width;
Z.y=W.origin.y*Z.height;
Z.src=W.src
}else{if(W.on&&S.fillcolor){Z=new A.Color(S.fillcolor+"");
Z.a=W.opacity
}}}}T.fillStyle=Z
};
var G=function(R){var S=R.rawNode;
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
var B=function(Q){var R=rawNode.skew,T=R.matrix,S=R.offset;
Q.matrix=dojox.gfx.matrix.normalize({xx:T.xtox,xy:T.ytox,yx:T.xtoy,yy:T.ytoy,dx:dojox.gfx.pt2px(S.x),dy:dojox.gfx.pt2px(S.y)})
};
var L=function(Q){Q.bgNode=Q.rawNode.firstChild
};
var E=function(S){var V=S.rawNode,R=V.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],U=V.style,T=parseFloat(U.width),Q=parseFloat(U.height);
R=(R.indexOf("%")>=0)?parseFloat(R)/100:dojox.gfx.vml._parseFloat(R);
S.shape=dojox.gfx.makeParameters(dojox.gfx.defaultRect,{x:parseInt(U.left),y:parseInt(U.top),width:T,height:Q,r:Math.min(T,Q)*R})
};
var J=function(Q){var R=Q.rawNode.style,T=parseInt(R.width)/2,S=parseInt(R.height)/2;
Q.shape=dojox.gfx.makeParameters(dojox.gfx.defaultEllipse,{cx:parseInt(R.left)+T,cy:parseInt(R.top)+S,rx:T,ry:S})
};
var I=function(Q){var R=Q.rawNode.style,S=parseInt(R.width)/2;
Q.shape=dojox.gfx.makeParameters(dojox.gfx.defaultCircle,{cx:parseInt(R.left)+S,cy:parseInt(R.top)+S,r:S})
};
var P=function(R){var Q=R.shape=A.clone(dojox.gfx.defaultLine),S=R.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(S.length<7||S[0]!="m"||S[3]!="l"||S[6]!="e"){break
}Q.x1=parseInt(S[1]);
Q.y1=parseInt(S[2]);
Q.x2=parseInt(S[4]);
Q.y2=parseInt(S[5])
}while(false)
};
var C=function(S){var R=S.shape=A.clone(dojox.gfx.defaultPolyline),U=S.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
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
var D=function(Q){Q.shape=A.clone(dojox.gfx.defaultImage);
Q.shape.src=Q.rawNode.firstChild.src
};
var K=function(R){var Q=R.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
R.matrix=dojox.gfx.matrix.normalize({xx:Q.M11,xy:Q.M12,yx:Q.M21,yy:Q.M22,dx:Q.Dx,dy:Q.Dy})
};
var M=function(R){var Q=R.shape=A.clone(dojox.gfx.defaultText),U=R.rawNode,V=U.path.v.match(dojox.gfx.pathVmlRegExp);
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
var H=function(Q){var T=Q.fontStyle=A.clone(dojox.gfx.defaultFont),U=Q.rawNode.childNodes,R=0;
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
var F=function(S){B(S);
var R=S.matrix,Q=S.fontStyle;
if(R&&Q){S.matrix=dojox.gfx.matrix.multiply(R,{dy:dojox.gfx.normalizedLength(Q.size)*0.35})
}};
var O=function(W){var Y=W.shape=A.clone(dojox.gfx.defaultPath),T=rawNode.path.v.match(dojox.gfx.pathVmlRegExp),Q=[],Z=false,S=dojox.gfx.Path._pathVmlToSvgMap;
for(var X=0;
X<T.length;
++T){var R=T[X];
if(R in S){Z=false;
Q.push(S[R])
}else{if(!Z){var U=parseInt(R);
if(isNaN(U)){Z=true
}else{Q.push(U)
}}}}var V=Q.length;
if(V>=4&&Q[V-1]==""&&Q[V-2]==0&&Q[V-3]==0&&Q[V-4]=="l"){Q.splice(V-4,4)
}if(V){Y.path=Q.join(" ")
}}
})()
}});