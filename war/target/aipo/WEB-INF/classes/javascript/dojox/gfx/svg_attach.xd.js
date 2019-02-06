dojo._xdResourceLoaded({depends:[["require","dojox.gfx.svg"]],defineResource:function(A){A.require("dojox.gfx.svg");
A.experimental("dojox.gfx.svg_attach");
(function(){dojox.gfx.attachNode=function(K){if(!K){return null
}var M=null;
switch(K.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:M=new dojox.gfx.Rect(K);
B(M);
break;
case dojox.gfx.Ellipse.nodeType:M=new dojox.gfx.Ellipse(K);
H(M,dojox.gfx.defaultEllipse);
break;
case dojox.gfx.Polyline.nodeType:M=new dojox.gfx.Polyline(K);
H(M,dojox.gfx.defaultPolyline);
break;
case dojox.gfx.Path.nodeType:M=new dojox.gfx.Path(K);
H(M,dojox.gfx.defaultPath);
break;
case dojox.gfx.Circle.nodeType:M=new dojox.gfx.Circle(K);
H(M,dojox.gfx.defaultCircle);
break;
case dojox.gfx.Line.nodeType:M=new dojox.gfx.Line(K);
H(M,dojox.gfx.defaultLine);
break;
case dojox.gfx.Image.nodeType:M=new dojox.gfx.Image(K);
H(M,dojox.gfx.defaultImage);
break;
case dojox.gfx.Text.nodeType:var L=K.getElementsByTagName("textPath");
if(L&&L.length){M=new dojox.gfx.TextPath(K);
H(M,dojox.gfx.defaultPath);
I(M)
}else{M=new dojox.gfx.Text(K);
C(M)
}G(M);
break;
default:return null
}if(!(M instanceof dojox.gfx.Image)){D(M);
F(M)
}E(M);
return M
};
dojox.gfx.attachSurface=function(K){var M=new dojox.gfx.Surface();
M.rawNode=K;
var L=K.getElementsByTagName("defs");
if(L.length==0){return null
}M.defNode=L[0];
return M
};
var D=function(K){var M=K.rawNode.getAttribute("fill");
if(M=="none"){K.fillStyle=null;
return 
}var N=null,L=dojox.gfx.svg.getRef(M);
if(ref){switch(L.tagName.toLowerCase()){case"lineargradient":N=J(dojox.gfx.defaultLinearGradient,L);
A.forEach(["x1","y1","x2","y2"],function(P){N[P]=L.getAttribute(P)
});
break;
case"radialgradient":N=J(dojox.gfx.defaultRadialGradient,L);
A.forEach(["cx","cy","r"],function(P){N[P]=L.getAttribute(P)
});
N.cx=L.getAttribute("cx");
N.cy=L.getAttribute("cy");
N.r=L.getAttribute("r");
break;
case"pattern":N=A.lang.shallowCopy(dojox.gfx.defaultPattern,true);
A.forEach(["x","y","width","height"],function(P){N[P]=L.getAttribute(P)
});
N.src=L.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
break
}}else{N=new A.Color(M);
var O=rawNode.getAttribute("fill-opacity");
if(O!=null){N.a=O
}}K.fillStyle=N
};
var J=function(K,L){var M=A.clone(K);
M.colors=[];
for(var N=0;
N<L.childNodes.length;
++N){M.colors.push({offset:L.childNodes[N].getAttribute("offset"),color:new A.Color(L.childNodes[N].getAttribute("stop-color"))})
}return M
};
var F=function(O){var L=O.rawNode,K=L.getAttribute("stroke");
if(K==null||K=="none"){O.strokeStyle=null;
return 
}var M=O.strokeStyle=A.clone(dojox.gfx.defaultStroke);
var N=new A.Color(K);
if(N){M.color=N;
M.color.a=L.getAttribute("stroke-opacity");
M.width=L.getAttribute("stroke-width");
M.cap=L.getAttribute("stroke-linecap");
M.join=L.getAttribute("stroke-linejoin");
if(M.join=="miter"){M.join=L.getAttribute("stroke-miterlimit")
}M.style=L.getAttribute("dojoGfxStrokeStyle")
}};
var E=function(M){var L=M.rawNode.getAttribute("transform");
if(L.match(/^matrix\(.+\)$/)){var K=L.slice(7,-1).split(",");
M.matrix=dojox.gfx.matrix.normalize({xx:parseFloat(K[0]),xy:parseFloat(K[2]),yx:parseFloat(K[1]),yy:parseFloat(K[3]),dx:parseFloat(K[4]),dy:parseFloat(K[5])})
}else{M.matrix=null
}};
var G=function(L){var K=L.fontStyle=A.clone(dojox.gfx.defaultFont),M=L.rawNode;
K.style=M.getAttribute("font-style");
K.variant=M.getAttribute("font-variant");
K.weight=M.getAttribute("font-weight");
K.size=M.getAttribute("font-size");
K.family=M.getAttribute("font-family")
};
var H=function(O,M){var N=O.shape=A.clone(M),L=O.rawNode;
for(var K in N){N[K]=L.getAttribute(K)
}};
var B=function(K){H(K,dojox.gfx.defaultRect);
K.shape.r=Math.min(K.rawNode.getAttribute("rx"),K.rawNode.getAttribute("ry"))
};
var C=function(M){var L=M.shape=A.clone(dojox.gfx.defaultText),K=M.rawNode;
L.x=K.getAttribute("x");
L.y=K.getAttribute("y");
L.align=K.getAttribute("text-anchor");
L.decoration=K.getAttribute("text-decoration");
L.rotated=parseFloat(K.getAttribute("rotate"))!=0;
L.kerning=K.getAttribute("kerning")=="auto";
L.text=K.firstChild.nodeValue
};
var I=function(M){var L=M.shape=A.clone(dojox.gfx.defaultTextPath),K=M.rawNode;
L.align=K.getAttribute("text-anchor");
L.decoration=K.getAttribute("text-decoration");
L.rotated=parseFloat(K.getAttribute("rotate"))!=0;
L.kerning=K.getAttribute("kerning")=="auto";
L.text=K.firstChild.nodeValue
}
})()
}});