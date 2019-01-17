dojo.require("dojox.gfx.silverlight");
dojo.experimental("dojox.gfx.silverlight_attach");
(function(){dojox.gfx.attachNode=function(G){return null;
if(!G){return null
}var F=null;
switch(G.tagName.toLowerCase()){case dojox.gfx.Rect.nodeType:F=new dojox.gfx.Rect(G);
break;
case dojox.gfx.Ellipse.nodeType:if(G.width==G.height){F=new dojox.gfx.Circle(G)
}else{F=new dojox.gfx.Ellipse(G)
}break;
case dojox.gfx.Polyline.nodeType:F=new dojox.gfx.Polyline(G);
break;
case dojox.gfx.Path.nodeType:F=new dojox.gfx.Path(G);
break;
case dojox.gfx.Line.nodeType:F=new dojox.gfx.Line(G);
break;
case dojox.gfx.Image.nodeType:F=new dojox.gfx.Image(G);
break;
case dojox.gfx.Text.nodeType:F=new dojox.gfx.Text(G);
D(F);
break;
default:return null
}A(F);
if(!(F instanceof dojox.gfx.Image)){B(F);
E(F)
}C(F);
return F
};
dojox.gfx.attachSurface=function(F){return null
};
var B=function(F){return null
};
var E=function(F){return null
};
var C=function(F){return null
};
var D=function(F){return null
};
var A=function(F){return null
}
})();