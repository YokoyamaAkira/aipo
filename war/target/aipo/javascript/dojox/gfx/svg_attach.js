dojo.require("dojox.gfx.svg");
dojo.experimental("dojox.gfx.svg_attach");
(function(){dojox.gfx.attachNode=function(L){if(!L){return null
}var K=null;
switch(L.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:K=new dojox.gfx.Rect(L);
C(K);
break;
case dojox.gfx.Ellipse.nodeType:K=new dojox.gfx.Ellipse(L);
I(K,dojox.gfx.defaultEllipse);
break;
case dojox.gfx.Polyline.nodeType:K=new dojox.gfx.Polyline(L);
I(K,dojox.gfx.defaultPolyline);
break;
case dojox.gfx.Path.nodeType:K=new dojox.gfx.Path(L);
I(K,dojox.gfx.defaultPath);
break;
case dojox.gfx.Circle.nodeType:K=new dojox.gfx.Circle(L);
I(K,dojox.gfx.defaultCircle);
break;
case dojox.gfx.Line.nodeType:K=new dojox.gfx.Line(L);
I(K,dojox.gfx.defaultLine);
break;
case dojox.gfx.Image.nodeType:K=new dojox.gfx.Image(L);
I(K,dojox.gfx.defaultImage);
break;
case dojox.gfx.Text.nodeType:var J=L.getElementsByTagName("textPath");
if(J&&J.length){K=new dojox.gfx.TextPath(L);
I(K,dojox.gfx.defaultPath);
A(K)
}else{K=new dojox.gfx.Text(L);
D(K)
}H(K);
break;
default:return null
}if(!(K instanceof dojox.gfx.Image)){E(K);
G(K)
}F(K);
return K
};
dojox.gfx.attachSurface=function(L){var K=new dojox.gfx.Surface();
K.rawNode=L;
var J=L.getElementsByTagName("defs");
if(J.length==0){return null
}K.defNode=J[0];
return K
};
var E=function(L){var N=L.rawNode.getAttribute("fill");
if(N=="none"){L.fillStyle=null;
return 
}var J=null,M=dojox.gfx.svg.getRef(N);
if(ref){switch(M.tagName.toLowerCase()){case"lineargradient":J=B(dojox.gfx.defaultLinearGradient,M);
dojo.forEach(["x1","y1","x2","y2"],function(O){J[O]=M.getAttribute(O)
});
break;
case"radialgradient":J=B(dojox.gfx.defaultRadialGradient,M);
dojo.forEach(["cx","cy","r"],function(O){J[O]=M.getAttribute(O)
});
J.cx=M.getAttribute("cx");
J.cy=M.getAttribute("cy");
J.r=M.getAttribute("r");
break;
case"pattern":J=dojo.lang.shallowCopy(dojox.gfx.defaultPattern,true);
dojo.forEach(["x","y","width","height"],function(O){J[O]=M.getAttribute(O)
});
J.src=M.firstChild.getAttributeNS(dojox.gfx.svg.xmlns.xlink,"href");
break
}}else{J=new dojo.Color(N);
var K=rawNode.getAttribute("fill-opacity");
if(K!=null){J.a=K
}}L.fillStyle=J
};
var B=function(L,M){var J=dojo.clone(L);
J.colors=[];
for(var K=0;
K<M.childNodes.length;
++K){J.colors.push({offset:M.childNodes[K].getAttribute("offset"),color:new dojo.Color(M.childNodes[K].getAttribute("stop-color"))})
}return J
};
var G=function(K){var M=K.rawNode,L=M.getAttribute("stroke");
if(L==null||L=="none"){K.strokeStyle=null;
return 
}var N=K.strokeStyle=dojo.clone(dojox.gfx.defaultStroke);
var J=new dojo.Color(L);
if(J){N.color=J;
N.color.a=M.getAttribute("stroke-opacity");
N.width=M.getAttribute("stroke-width");
N.cap=M.getAttribute("stroke-linecap");
N.join=M.getAttribute("stroke-linejoin");
if(N.join=="miter"){N.join=M.getAttribute("stroke-miterlimit")
}N.style=M.getAttribute("dojoGfxStrokeStyle")
}};
var F=function(K){var J=K.rawNode.getAttribute("transform");
if(J.match(/^matrix\(.+\)$/)){var L=J.slice(7,-1).split(",");
K.matrix=dojox.gfx.matrix.normalize({xx:parseFloat(L[0]),xy:parseFloat(L[2]),yx:parseFloat(L[1]),yy:parseFloat(L[3]),dx:parseFloat(L[4]),dy:parseFloat(L[5])})
}else{K.matrix=null
}};
var H=function(J){var L=J.fontStyle=dojo.clone(dojox.gfx.defaultFont),K=J.rawNode;
L.style=K.getAttribute("font-style");
L.variant=K.getAttribute("font-variant");
L.weight=K.getAttribute("font-weight");
L.size=K.getAttribute("font-size");
L.family=K.getAttribute("font-family")
};
var I=function(K,N){var J=K.shape=dojo.clone(N),M=K.rawNode;
for(var L in J){J[L]=M.getAttribute(L)
}};
var C=function(J){I(J,dojox.gfx.defaultRect);
J.shape.r=Math.min(J.rawNode.getAttribute("rx"),J.rawNode.getAttribute("ry"))
};
var D=function(K){var J=K.shape=dojo.clone(dojox.gfx.defaultText),L=K.rawNode;
J.x=L.getAttribute("x");
J.y=L.getAttribute("y");
J.align=L.getAttribute("text-anchor");
J.decoration=L.getAttribute("text-decoration");
J.rotated=parseFloat(L.getAttribute("rotate"))!=0;
J.kerning=L.getAttribute("kerning")=="auto";
J.text=L.firstChild.nodeValue
};
var A=function(K){var J=K.shape=dojo.clone(dojox.gfx.defaultTextPath),L=K.rawNode;
J.align=L.getAttribute("text-anchor");
J.decoration=L.getAttribute("text-decoration");
J.rotated=parseFloat(L.getAttribute("rotate"))!=0;
J.kerning=L.getAttribute("kerning")=="auto";
J.text=L.firstChild.nodeValue
}
})();