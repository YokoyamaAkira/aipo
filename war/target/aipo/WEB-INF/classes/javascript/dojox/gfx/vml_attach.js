dojo.require("dojox.gfx.vml");
dojo.experimental("dojox.gfx.vml_attach");
(function(){dojox.gfx.attachNode=function(P){if(!P){return null
}var Q=null;
switch(P.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:Q=new dojox.gfx.Rect(P);
J(Q);
break;
case dojox.gfx.Ellipse.nodeType:if(P.style.width==P.style.height){Q=new dojox.gfx.Circle(P);
F(Q)
}else{Q=new dojox.gfx.Ellipse(P);
G(Q)
}break;
case dojox.gfx.Path.nodeType:switch(P.getAttribute("dojoGfxType")){case"line":Q=new dojox.gfx.Line(P);
N(Q);
break;
case"polyline":Q=new dojox.gfx.Polyline(P);
A(Q);
break;
case"path":Q=new dojox.gfx.Path(P);
M(Q);
break;
case"text":Q=new dojox.gfx.Text(P);
K(Q);
E(Q);
C(Q);
break;
case"textpath":Q=new dojox.gfx.TextPath(P);
M(Q);
K(Q);
E(Q);
break
}break;
case dojox.gfx.Image.nodeType:switch(P.getAttribute("dojoGfxType")){case"image":Q=new dojox.gfx.Image(P);
B(Q);
H(Q);
break
}break;
default:return null
}if(!(Q instanceof dojox.gfx.Image)){L(Q);
D(Q);
if(!(Q instanceof dojox.gfx.Text)){O(Q)
}}return Q
};
dojox.gfx.attachSurface=function(P){var R=new dojox.gfx.Surface();
R.clipNode=P;
var S=R.rawNode=P.firstChild;
var Q=S.firstChild;
if(!Q||Q.tagName!="rect"){return null
}R.bgNode=S;
return R
};
var L=function(U){var Q=null,T=U.rawNode,X=T.fill;
if(X.on&&X.type=="gradient"){var Q=dojo.clone(dojox.gfx.defaultLinearGradient),Y=dojox.gfx.matrix._degToRad(X.angle);
Q.x2=Math.cos(Y);
Q.y2=Math.sin(Y);
Q.colors=[];
var R=X.colors.value.split(";");
for(var V=0;
V<R.length;
++V){var S=R[V].match(/\S+/g);
if(!S||S.length!=2){continue
}Q.colors.push({offset:dojox.gfx.vml._parseFloat(S[0]),color:new dojo.Color(S[1])})
}}else{if(X.on&&X.type=="gradientradial"){var Q=dojo.clone(dojox.gfx.defaultRadialGradient),P=parseFloat(T.style.width),W=parseFloat(T.style.height);
Q.cx=isNaN(P)?0:X.focusposition.x*P;
Q.cy=isNaN(W)?0:X.focusposition.y*W;
Q.r=isNaN(P)?1:P/2;
Q.colors=[];
var R=X.colors.value.split(";");
for(var V=R.length-1;
V>=0;
--V){var S=R[V].match(/\S+/g);
if(!S||S.length!=2){continue
}Q.colors.push({offset:dojox.gfx.vml._parseFloat(S[0]),color:new dojo.Color(S[1])})
}}else{if(X.on&&X.type=="tile"){var Q=dojo.clone(dojox.gfx.defaultPattern);
Q.width=dojox.gfx.pt2px(X.size.x);
Q.height=dojox.gfx.pt2px(X.size.y);
Q.x=X.origin.x*Q.width;
Q.y=X.origin.y*Q.height;
Q.src=X.src
}else{if(X.on&&T.fillcolor){Q=new dojo.Color(T.fillcolor+"");
Q.a=X.opacity
}}}}U.fillStyle=Q
};
var D=function(R){var S=R.rawNode;
if(!S.stroked){R.strokeStyle=null;
return 
}var P=R.strokeStyle=dojo.clone(dojox.gfx.defaultStroke),Q=S.stroke;
P.color=new dojo.Color(S.strokecolor.value);
P.width=dojox.gfx.normalizedLength(S.strokeweight+"");
P.color.a=Q.opacity;
P.cap=this._translate(this._capMapReversed,Q.endcap);
P.join=Q.joinstyle=="miter"?Q.miterlimit:Q.joinstyle;
P.style=Q.dashstyle
};
var O=function(Q){var R=rawNode.skew,P=R.matrix,S=R.offset;
Q.matrix=dojox.gfx.matrix.normalize({xx:P.xtox,xy:P.ytox,yx:P.xtoy,yy:P.ytoy,dx:dojox.gfx.pt2px(S.x),dy:dojox.gfx.pt2px(S.y)})
};
var I=function(P){P.bgNode=P.rawNode.firstChild
};
var J=function(S){var P=S.rawNode,R=P.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],U=P.style,T=parseFloat(U.width),Q=parseFloat(U.height);
R=(R.indexOf("%")>=0)?parseFloat(R)/100:dojox.gfx.vml._parseFloat(R);
S.shape=dojox.gfx.makeParameters(dojox.gfx.defaultRect,{x:parseInt(U.left),y:parseInt(U.top),width:T,height:Q,r:Math.min(T,Q)*R})
};
var G=function(Q){var R=Q.rawNode.style,P=parseInt(R.width)/2,S=parseInt(R.height)/2;
Q.shape=dojox.gfx.makeParameters(dojox.gfx.defaultEllipse,{cx:parseInt(R.left)+P,cy:parseInt(R.top)+S,rx:P,ry:S})
};
var F=function(Q){var R=Q.rawNode.style,P=parseInt(R.width)/2;
Q.shape=dojox.gfx.makeParameters(dojox.gfx.defaultCircle,{cx:parseInt(R.left)+P,cy:parseInt(R.top)+P,r:P})
};
var N=function(R){var Q=R.shape=dojo.clone(dojox.gfx.defaultLine),P=R.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(P.length<7||P[0]!="m"||P[3]!="l"||P[6]!="e"){break
}Q.x1=parseInt(P[1]);
Q.y1=parseInt(P[2]);
Q.x2=parseInt(P[4]);
Q.y2=parseInt(P[5])
}while(false)
};
var A=function(S){var R=S.shape=dojo.clone(dojox.gfx.defaultPolyline),U=S.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(U.length<3||U[0]!="m"){break
}var Q=parseInt(U[0]),P=parseInt(U[1]);
if(isNaN(Q)||isNaN(P)){break
}R.points.push({x:Q,y:P});
if(U.length<6||U[3]!="l"){break
}for(var T=4;
T<U.length;
T+=2){Q=parseInt(U[T]);
P=parseInt(U[T+1]);
if(isNaN(Q)||isNaN(P)){break
}R.points.push({x:Q,y:P})
}}while(false)
};
var B=function(P){P.shape=dojo.clone(dojox.gfx.defaultImage);
P.shape.src=P.rawNode.firstChild.src
};
var H=function(P){var Q=P.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
P.matrix=dojox.gfx.matrix.normalize({xx:Q.M11,xy:Q.M12,yx:Q.M21,yy:Q.M22,dx:Q.Dx,dy:Q.Dy})
};
var K=function(R){var Q=R.shape=dojo.clone(dojox.gfx.defaultText),U=R.rawNode,V=U.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(!V||V.length!=7){break
}var P=U.childNodes,S=0;
for(;
S<P.length&&P[S].tagName!="textpath";
++S){}if(S>=P.length){break
}var T=P[S].style;
Q.text=P[S].string;
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
var E=function(Q){var T=Q.fontStyle=dojo.clone(dojox.gfx.defaultFont),P=Q.rawNode.childNodes,R=0;
for(;
R<P.length&&P[R].tagName=="textpath";
++R){}if(R>=P.length){Q.fontStyle=null;
return 
}var S=P[R].style;
T.style=S.fontstyle;
T.variant=S.fontvariant;
T.weight=S.fontweight;
T.size=S.fontsize;
T.family=S.fontfamily
};
var C=function(P){O(P);
var R=P.matrix,Q=P.fontStyle;
if(R&&Q){P.matrix=dojox.gfx.matrix.multiply(R,{dy:dojox.gfx.normalizedLength(Q.size)*0.35})
}};
var M=function(X){var P=X.shape=dojo.clone(dojox.gfx.defaultPath),U=rawNode.path.v.match(dojox.gfx.pathVmlRegExp),R=[],Q=false,T=dojox.gfx.Path._pathVmlToSvgMap;
for(var Y=0;
Y<U.length;
++U){var S=U[Y];
if(S in T){Q=false;
R.push(T[S])
}else{if(!Q){var V=parseInt(S);
if(isNaN(V)){Q=true
}else{R.push(V)
}}}}var W=R.length;
if(W>=4&&R[W-1]==""&&R[W-2]==0&&R[W-3]==0&&R[W-4]=="l"){R.splice(W-4,4)
}if(W){P.path=R.join(" ")
}}
})();