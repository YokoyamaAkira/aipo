dojo.require("dojox.gfx.silverlight");
dojo.experimental("dojox.gfx.silverlight_attach");
(function(){dojox.gfx.attachNode=function(F){return null;
if(!F){return null
}var G=null;
switch(F.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:G=new dojox.gfx.Rect(F);
break;
case dojox.gfx.Ellipse.nodeType:if(F.width==F.height){G=new dojox.gfx.Circle(F)
}else{G=new dojox.gfx.Ellipse(F)
}break;
case dojox.gfx.Polyline.nodeType:G=new dojox.gfx.Polyline(F);
break;
case dojox.gfx.Path.nodeType:G=new dojox.gfx.Path(F);
break;
case dojox.gfx.Line.nodeType:G=new dojox.gfx.Line(F);
break;
case dojox.gfx.Image.nodeType:G=new dojox.gfx.Image(F);
break;
case dojox.gfx.Text.nodeType:G=new dojox.gfx.Text(F);
C(G);
break;
default:return null
}E(G);
if(!(G instanceof dojox.gfx.Image)){A(G);
D(G)
}B(G);
return G
};
dojox.gfx.attachSurface=function(F){return null
};
var A=function(F){return null
};
var D=function(F){return null
};
var B=function(F){return null
};
var C=function(F){return null
};
var E=function(F){return null
}
})();