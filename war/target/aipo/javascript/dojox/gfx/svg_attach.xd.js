dojo._xdResourceLoaded({depends:[["require","dojox.gfx.svg"]],defineResource:function(A){A.require("dojox.gfx.svg");
A.experimental("dojox.gfx.svg_attach");
(function(){dojox.gfx.attachNode=function(M){if(!M){return null
}var L=null;
switch(M.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:L=new dojox.gfx.Rect(M);
D(L);
break;
case dojox.gfx.Ellipse.nodeType:L=new dojox.gfx.Ellipse(M);
J(L,dojox.gfx.defaultEllipse);
break;
case dojox.gfx.Polyline.nodeType:L=new dojox.gfx.Polyline(M);
J(L,dojox.gfx.defaultPolyline);
break;
case dojox.gfx.Path.nodeType:L=new dojox.gfx.Path(M);
J(L,dojox.gfx.defaultPath);
break;
case dojox.gfx.Circle.nodeType:L=new dojox.gfx.Circle(M);
J(L,dojox.gfx.defaultCircle);
break;
case dojox.gfx.Line.nodeType:L=new dojox.gfx.Line(M);
J(L,dojox.gfx.defaultLine);
break;
case dojox.gfx.Image.nodeType:L=new dojox.gfx.Image(M);
J(L,dojox.gfx.defaultImage);
break;
case dojox.gfx.Text.nodeType:var K=M.getElementsByTagName("textPath");
if(K&&K.length){L=new dojox.gfx.TextPath(M);
J(L,dojox.gfx.defaultPath);
B(L)
}else{L=new dojox.gfx.Text(M);
E(L)
}I(L);
break;
default:return null
}if(!(L instanceof dojox.gfx.Image)){F(L);
H(L)
}G(L);
return L
};
dojox.gfx.attachSurface=function(M){var L=new dojox.gfx.Surface();
L.rawNode=M;
var K=M.getElementsByTagName("defs");
if(K.length==0){return null
}L.defNode=K[0];
return L
};
var F=function(M){var O=M.rawNode.getAttribute("fill");
if(O=="none"){M.fillStyle=null;
return 
}var K=null,N=dojox.gfx.svg.getRef(O);
if(ref){switch(N.tagName.toLowerCase()){case"lineargradient":K=C(dojox.gfx.defaultLinearGradient,N);
A.forEach(["x1","y1","x2","y2"],function(P){K[P]=N.getAttribute(P)
});
break;
case"radialgradient":K=C(dojox.gfx.defaultRadialGradient,N);
A.forEach(["cx","cy","r"],function(P){K[P]=N.getAttribute(P)
});
K.cx=N.getAttribute("cx");
K.cy=N.getAttribute("cy");
K.r=N.getAttribute("r");
break;
case"pattern":K=A.lang.shallowCopy(dojox.gfx.defaultPattern,true);
A.forEach(["x","y","width","height"],function(P){K[P]=N.getAttribute(P)
});
K.src=N.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
break
}}else{K=new A.Color(O);
var L=rawNode.getAttribute("fill-opacity");
if(L!=null){K.a=L
}}M.fillStyle=K
};
var C=function(M,N){var K=A.clone(M);
K.colors=[];
for(var L=0;
L<N.childNodes.length;
++L){K.colors.push({offset:N.childNodes[L].getAttribute("offset"),color:new A.Color(N.childNodes[L].getAttribute("stop-color"))})
}return K
};
var H=function(L){var N=L.rawNode,M=N.getAttribute("stroke");
if(M==null||M=="none"){L.strokeStyle=null;
return 
}var O=L.strokeStyle=A.clone(dojox.gfx.defaultStroke);
var K=new A.Color(M);
if(K){O.color=K;
O.color.a=N.getAttribute("stroke-opacity");
O.width=N.getAttribute("stroke-width");
O.cap=N.getAttribute("stroke-linecap");
O.join=N.getAttribute("stroke-linejoin");
if(O.join=="miter"){O.join=N.getAttribute("stroke-miterlimit")
}O.style=N.getAttribute("dojoGfxStrokeStyle")
}};
var G=function(L){var K=L.rawNode.getAttribute("transform");
if(K.match(/^matrix\(.+\)$/)){var M=K.slice(7,-1).split(",");
L.matrix=dojox.gfx.matrix.normalize({xx:parseFloat(M[0]),xy:parseFloat(M[2]),yx:parseFloat(M[1]),yy:parseFloat(M[3]),dx:parseFloat(M[4]),dy:parseFloat(M[5])})
}else{L.matrix=null
}};
var I=function(K){var M=K.fontStyle=A.clone(dojox.gfx.defaultFont),L=K.rawNode;
M.style=L.getAttribute("font-style");
M.variant=L.getAttribute("font-variant");
M.weight=L.getAttribute("font-weight");
M.size=L.getAttribute("font-size");
M.family=L.getAttribute("font-family")
};
var J=function(L,O){var K=L.shape=A.clone(O),N=L.rawNode;
for(var M in K){K[M]=N.getAttribute(M)
}};
var D=function(K){J(K,dojox.gfx.defaultRect);
K.shape.r=Math.min(K.rawNode.getAttribute("rx"),K.rawNode.getAttribute("ry"))
};
var E=function(L){var K=L.shape=A.clone(dojox.gfx.defaultText),M=L.rawNode;
K.x=M.getAttribute("x");
K.y=M.getAttribute("y");
K.align=M.getAttribute("text-anchor");
K.decoration=M.getAttribute("text-decoration");
K.rotated=parseFloat(M.getAttribute("rotate"))!=0;
K.kerning=M.getAttribute("kerning")=="auto";
K.text=M.firstChild.nodeValue
};
var B=function(L){var K=L.shape=A.clone(dojox.gfx.defaultTextPath),M=L.rawNode;
K.align=M.getAttribute("text-anchor");
K.decoration=M.getAttribute("text-decoration");
K.rotated=parseFloat(M.getAttribute("rotate"))!=0;
K.kerning=M.getAttribute("kerning")=="auto";
K.text=M.firstChild.nodeValue
}
})()
}});