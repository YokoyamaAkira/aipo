dojo.require("dojox.gfx.vml");
dojo.experimental("dojox.gfx.vml_attach");
(function(){dojox.gfx.attachNode=function(Q){if(!Q){return null
}var P=null;
switch(Q.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:P=new dojox.gfx.Rect(Q);
C(P);
break;
case dojox.gfx.Ellipse.nodeType:if(Q.style.width==Q.style.height){P=new dojox.gfx.Circle(Q);
N(P)
}else{P=new dojox.gfx.Ellipse(Q);
O(P)
}break;
case dojox.gfx.Path.nodeType:switch(Q.getAttribute("dojoGfxType")){case"line":P=new dojox.gfx.Line(Q);
G(P);
break;
case"polyline":P=new dojox.gfx.Polyline(Q);
I(P);
break;
case"path":P=new dojox.gfx.Path(Q);
F(P);
break;
case"text":P=new dojox.gfx.Text(Q);
D(P);
M(P);
K(P);
break;
case"textpath":P=new dojox.gfx.TextPath(Q);
F(P);
D(P);
M(P);
break
}break;
case dojox.gfx.Image.nodeType:switch(Q.getAttribute("dojoGfxType")){case"image":P=new dojox.gfx.Image(Q);
J(P);
A(P);
break
}break;
default:return null
}if(!(P instanceof dojox.gfx.Image)){E(P);
L(P);
if(!(P instanceof dojox.gfx.Text)){H(P)
}}return P
};
dojox.gfx.attachSurface=function(S){var Q=new dojox.gfx.Surface();
Q.clipNode=S;
var R=Q.rawNode=S.firstChild;
var P=R.firstChild;
if(!P||P.tagName!="rect"){return null
}Q.bgNode=R;
return Q
};
var E=function(Q){var W=null,P=Q.rawNode,T=P.fill;
if(T.on&&T.type=="gradient"){var W=dojo.clone(dojox.gfx.defaultLinearGradient),U=dojox.gfx.matrix._degToRad(T.angle);
W.x2=Math.cos(U);
W.y2=Math.sin(U);
W.colors=[];
var X=T.colors.value.split(";");
for(var R=0;
R<X.length;
++R){var Y=X[R].match(/\S+/g);
if(!Y||Y.length!=2){continue
}W.colors.push({offset:dojox.gfx.vml._parseFloat(Y[0]),color:new dojo.Color(Y[1])})
}}else{if(T.on&&T.type=="gradientradial"){var W=dojo.clone(dojox.gfx.defaultRadialGradient),V=parseFloat(P.style.width),S=parseFloat(P.style.height);
W.cx=isNaN(V)?0:T.focusposition.x*V;
W.cy=isNaN(S)?0:T.focusposition.y*S;
W.r=isNaN(V)?1:V/2;
W.colors=[];
var X=T.colors.value.split(";");
for(var R=X.length-1;
R>=0;
--R){var Y=X[R].match(/\S+/g);
if(!Y||Y.length!=2){continue
}W.colors.push({offset:dojox.gfx.vml._parseFloat(Y[0]),color:new dojo.Color(Y[1])})
}}else{if(T.on&&T.type=="tile"){var W=dojo.clone(dojox.gfx.defaultPattern);
W.width=dojox.gfx.pt2px(T.size.x);
W.height=dojox.gfx.pt2px(T.size.y);
W.x=T.origin.x*W.width;
W.y=T.origin.y*W.height;
W.src=T.src
}else{if(T.on&&P.fillcolor){W=new dojo.Color(P.fillcolor+"");
W.a=T.opacity
}}}}Q.fillStyle=W
};
var L=function(Q){var R=Q.rawNode;
if(!R.stroked){Q.strokeStyle=null;
return 
}var S=Q.strokeStyle=dojo.clone(dojox.gfx.defaultStroke),P=R.stroke;
S.color=new dojo.Color(R.strokecolor.value);
S.width=dojox.gfx.normalizedLength(R.strokeweight+"");
S.color.a=P.opacity;
S.cap=this._translate(this._capMapReversed,P.endcap);
S.join=P.joinstyle=="miter"?P.miterlimit:P.joinstyle;
S.style=P.dashstyle
};
var H=function(P){var Q=rawNode.skew,S=Q.matrix,R=Q.offset;
P.matrix=dojox.gfx.matrix.normalize({xx:S.xtox,xy:S.ytox,yx:S.xtoy,yy:S.ytoy,dx:dojox.gfx.pt2px(R.x),dy:dojox.gfx.pt2px(R.y)})
};
var B=function(P){P.bgNode=P.rawNode.firstChild
};
var C=function(R){var U=R.rawNode,Q=U.outerHTML.match(/arcsize = \"(\d*\.?\d+[%f]?)\"/)[1],T=U.style,S=parseFloat(T.width),P=parseFloat(T.height);
Q=(Q.indexOf("%")>=0)?parseFloat(Q)/100:dojox.gfx.vml._parseFloat(Q);
R.shape=dojox.gfx.makeParameters(dojox.gfx.defaultRect,{x:parseInt(T.left),y:parseInt(T.top),width:S,height:P,r:Math.min(S,P)*Q})
};
var O=function(P){var Q=P.rawNode.style,S=parseInt(Q.width)/2,R=parseInt(Q.height)/2;
P.shape=dojox.gfx.makeParameters(dojox.gfx.defaultEllipse,{cx:parseInt(Q.left)+S,cy:parseInt(Q.top)+R,rx:S,ry:R})
};
var N=function(P){var Q=P.rawNode.style,R=parseInt(Q.width)/2;
P.shape=dojox.gfx.makeParameters(dojox.gfx.defaultCircle,{cx:parseInt(Q.left)+R,cy:parseInt(Q.top)+R,r:R})
};
var G=function(Q){var P=Q.shape=dojo.clone(dojox.gfx.defaultLine),R=Q.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(R.length<7||R[0]!="m"||R[3]!="l"||R[6]!="e"){break
}P.x1=parseInt(R[1]);
P.y1=parseInt(R[2]);
P.x2=parseInt(R[4]);
P.y2=parseInt(R[5])
}while(false)
};
var I=function(R){var Q=R.shape=dojo.clone(dojox.gfx.defaultPolyline),T=R.rawNode.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(T.length<3||T[0]!="m"){break
}var P=parseInt(T[0]),U=parseInt(T[1]);
if(isNaN(P)||isNaN(U)){break
}Q.points.push({x:P,y:U});
if(T.length<6||T[3]!="l"){break
}for(var S=4;
S<T.length;
S+=2){P=parseInt(T[S]);
U=parseInt(T[S+1]);
if(isNaN(P)||isNaN(U)){break
}Q.points.push({x:P,y:U})
}}while(false)
};
var J=function(P){P.shape=dojo.clone(dojox.gfx.defaultImage);
P.shape.src=P.rawNode.firstChild.src
};
var A=function(Q){var P=Q.rawNode.filters["DXImageTransform.Microsoft.Matrix"];
Q.matrix=dojox.gfx.matrix.normalize({xx:P.M11,xy:P.M12,yx:P.M21,yy:P.M22,dx:P.Dx,dy:P.Dy})
};
var D=function(Q){var P=Q.shape=dojo.clone(dojox.gfx.defaultText),T=Q.rawNode,U=T.path.v.match(dojox.gfx.pathVmlRegExp);
do{if(!U||U.length!=7){break
}var V=T.childNodes,R=0;
for(;
R<V.length&&V[R].tagName!="textpath";
++R){}if(R>=V.length){break
}var S=V[R].style;
P.text=V[R].string;
switch(S["v-text-align"]){case"left":P.x=parseInt(U[1]);
P.align="start";
break;
case"center":P.x=(parseInt(U[1])+parseInt(U[4]))/2;
P.align="middle";
break;
case"right":P.x=parseInt(U[4]);
P.align="end";
break
}P.y=parseInt(U[2]);
P.decoration=S["text-decoration"];
P.rotated=S["v-rotate-letters"].toLowerCase() in dojox.gfx.vml._bool;
P.kerning=S["v-text-kern"].toLowerCase() in dojox.gfx.vml._bool;
return 
}while(false);
Q.shape=null
};
var M=function(P){var S=P.fontStyle=dojo.clone(dojox.gfx.defaultFont),T=P.rawNode.childNodes,Q=0;
for(;
Q<T.length&&T[Q].tagName=="textpath";
++Q){}if(Q>=T.length){P.fontStyle=null;
return 
}var R=T[Q].style;
S.style=R.fontstyle;
S.variant=R.fontvariant;
S.weight=R.fontweight;
S.size=R.fontsize;
S.family=R.fontfamily
};
var K=function(R){H(R);
var Q=R.matrix,P=R.fontStyle;
if(Q&&P){R.matrix=dojox.gfx.matrix.multiply(Q,{dy:dojox.gfx.normalizedLength(P.size)*0.35})
}};
var F=function(T){var V=T.shape=dojo.clone(dojox.gfx.defaultPath),Q=rawNode.path.v.match(dojox.gfx.pathVmlRegExp),X=[],W=false,P=dojox.gfx.Path._pathVmlToSvgMap;
for(var U=0;
U<Q.length;
++Q){var Y=Q[U];
if(Y in P){W=false;
X.push(P[Y])
}else{if(!W){var R=parseInt(Y);
if(isNaN(R)){W=true
}else{X.push(R)
}}}}var S=X.length;
if(S>=4&&X[S-1]==""&&X[S-2]==0&&X[S-3]==0&&X[S-4]=="l"){X.splice(S-4,4)
}if(S){V.path=X.join(" ")
}}
})();