dojo.require("dojox.gfx.svg");
dojo.experimental("dojox.gfx.svg_attach");
(function(){dojox.gfx.attachNode=function(J){if(!J){return null
}var L=null;
switch(J.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:L=new dojox.gfx.Rect(J);
H(L);
break;
case dojox.gfx.Ellipse.nodeType:L=new dojox.gfx.Ellipse(J);
E(L,dojox.gfx.defaultEllipse);
break;
case dojox.gfx.Polyline.nodeType:L=new dojox.gfx.Polyline(J);
E(L,dojox.gfx.defaultPolyline);
break;
case dojox.gfx.Path.nodeType:L=new dojox.gfx.Path(J);
E(L,dojox.gfx.defaultPath);
break;
case dojox.gfx.Circle.nodeType:L=new dojox.gfx.Circle(J);
E(L,dojox.gfx.defaultCircle);
break;
case dojox.gfx.Line.nodeType:L=new dojox.gfx.Line(J);
E(L,dojox.gfx.defaultLine);
break;
case dojox.gfx.Image.nodeType:L=new dojox.gfx.Image(J);
E(L,dojox.gfx.defaultImage);
break;
case dojox.gfx.Text.nodeType:var K=J.getElementsByTagName("textPath");
if(K&&K.length){L=new dojox.gfx.TextPath(J);
E(L,dojox.gfx.defaultPath);
F(L)
}else{L=new dojox.gfx.Text(J);
I(L)
}D(L);
break;
default:return null
}if(!(L instanceof dojox.gfx.Image)){A(L);
C(L)
}B(L);
return L
};
dojox.gfx.attachSurface=function(J){var L=new dojox.gfx.Surface();
L.rawNode=J;
var K=J.getElementsByTagName("defs");
if(K.length==0){return null
}L.defNode=K[0];
return L
};
var A=function(J){var L=J.rawNode.getAttribute("fill");
if(L=="none"){J.fillStyle=null;
return 
}var M=null,K=dojox.gfx.svg.getRef(L);
if(ref){switch(K.tagName.toLowerCase()){case"lineargradient":M=G(dojox.gfx.defaultLinearGradient,K);
dojo.forEach(["x1","y1","x2","y2"],function(O){M[O]=K.getAttribute(O)
});
break;
case"radialgradient":M=G(dojox.gfx.defaultRadialGradient,K);
dojo.forEach(["cx","cy","r"],function(O){M[O]=K.getAttribute(O)
});
M.cx=K.getAttribute("cx");
M.cy=K.getAttribute("cy");
M.r=K.getAttribute("r");
break;
case"pattern":M=dojo.lang.shallowCopy(dojox.gfx.defaultPattern,true);
dojo.forEach(["x","y","width","height"],function(O){M[O]=K.getAttribute(O)
});
M.src=K.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
break
}}else{M=new dojo.Color(L);
var N=rawNode.getAttribute("fill-opacity");
if(N!=null){M.a=N
}}J.fillStyle=M
};
var G=function(J,K){var L=dojo.clone(J);
L.colors=[];
for(var M=0;
M<K.childNodes.length;
++M){L.colors.push({offset:K.childNodes[M].getAttribute("offset"),color:new dojo.Color(K.childNodes[M].getAttribute("stop-color"))})
}return L
};
var C=function(N){var K=N.rawNode,J=K.getAttribute("stroke");
if(J==null||J=="none"){N.strokeStyle=null;
return 
}var L=N.strokeStyle=dojo.clone(dojox.gfx.defaultStroke);
var M=new dojo.Color(J);
if(M){L.color=M;
L.color.a=K.getAttribute("stroke-opacity");
L.width=K.getAttribute("stroke-width");
L.cap=K.getAttribute("stroke-linecap");
L.join=K.getAttribute("stroke-linejoin");
if(L.join=="miter"){L.join=K.getAttribute("stroke-miterlimit")
}L.style=K.getAttribute("dojoGfxStrokeStyle")
}};
var B=function(L){var K=L.rawNode.getAttribute("transform");
if(K.match(/^matrix\(.+\)$/)){var J=K.slice(7,-1).split(",");
L.matrix=dojox.gfx.matrix.normalize({xx:parseFloat(J[0]),xy:parseFloat(J[2]),yx:parseFloat(J[1]),yy:parseFloat(J[3]),dx:parseFloat(J[4]),dy:parseFloat(J[5])})
}else{L.matrix=null
}};
var D=function(K){var J=K.fontStyle=dojo.clone(dojox.gfx.defaultFont),L=K.rawNode;
J.style=L.getAttribute("font-style");
J.variant=L.getAttribute("font-variant");
J.weight=L.getAttribute("font-weight");
J.size=L.getAttribute("font-size");
J.family=L.getAttribute("font-family")
};
var E=function(N,L){var M=N.shape=dojo.clone(L),K=N.rawNode;
for(var J in M){M[J]=K.getAttribute(J)
}};
var H=function(J){E(J,dojox.gfx.defaultRect);
J.shape.r=Math.min(J.rawNode.getAttribute("rx"),J.rawNode.getAttribute("ry"))
};
var I=function(L){var K=L.shape=dojo.clone(dojox.gfx.defaultText),J=L.rawNode;
K.x=J.getAttribute("x");
K.y=J.getAttribute("y");
K.align=J.getAttribute("text-anchor");
K.decoration=J.getAttribute("text-decoration");
K.rotated=parseFloat(J.getAttribute("rotate"))!=0;
K.kerning=J.getAttribute("kerning")=="auto";
K.text=J.firstChild.nodeValue
};
var F=function(L){var K=L.shape=dojo.clone(dojox.gfx.defaultTextPath),J=L.rawNode;
K.align=J.getAttribute("text-anchor");
K.decoration=J.getAttribute("text-decoration");
K.rotated=parseFloat(J.getAttribute("rotate"))!=0;
K.kerning=J.getAttribute("kerning")=="auto";
K.text=J.firstChild.nodeValue
}
})();