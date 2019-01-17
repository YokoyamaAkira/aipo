dojo._xdResourceLoaded({depends:[["require","dojox.gfx.silverlight"]],defineResource:function(A){A.require("dojox.gfx.silverlight");
A.experimental("dojox.gfx.silverlight_attach");
(function(){dojox.gfx.attachNode=function(H){return null;
if(!H){return null
}var G=null;
switch(H.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:G=new dojox.gfx.Rect(H);
break;
case dojox.gfx.Ellipse.nodeType:if(H.width==H.height){G=new dojox.gfx.Circle(H)
}else{G=new dojox.gfx.Ellipse(H)
}break;
case dojox.gfx.Polyline.nodeType:G=new dojox.gfx.Polyline(H);
break;
case dojox.gfx.Path.nodeType:G=new dojox.gfx.Path(H);
break;
case dojox.gfx.Line.nodeType:G=new dojox.gfx.Line(H);
break;
case dojox.gfx.Image.nodeType:G=new dojox.gfx.Image(H);
break;
case dojox.gfx.Text.nodeType:G=new dojox.gfx.Text(H);
E(G);
break;
default:return null
}B(G);
if(!(G instanceof dojox.gfx.Image)){C(G);
F(G)
}D(G);
return G
};
dojox.gfx.attachSurface=function(G){return null
};
var C=function(G){return null
};
var F=function(G){return null
};
var D=function(G){return null
};
var E=function(G){return null
};
var B=function(G){return null
}
})()
}});