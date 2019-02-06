dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.utils"],["require","dojox.gfx"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.utils"]){A._hasResource["dojox.gfx.utils"]=true;
A.provide("dojox.gfx.utils");
A.require("dojox.gfx");
dojox.gfx.utils.serialize=function(E){var B={},D,C=E instanceof dojox.gfx.Surface;
if(C||E instanceof dojox.gfx.Group){B.children=[];
for(var F=0;
F<E.children.length;
++F){B.children.push(dojox.gfx.utils.serialize(E.children[F]))
}if(C){return B.children
}}else{B.shape=E.getShape()
}if(E.getTransform){D=E.getTransform();
if(D){B.transform=D
}}if(E.getStroke){D=E.getStroke();
if(D){B.stroke=D
}}if(E.getFill){D=E.getFill();
if(D){B.fill=D
}}if(E.getFont){D=E.getFont();
if(D){B.font=D
}}return B
};
dojox.gfx.utils.toJson=function(C,B){return A.toJson(dojox.gfx.utils.serialize(C),B)
};
dojox.gfx.utils.deserialize=function(B,D){if(D instanceof Array){var F=[];
for(var E=0;
E<D.length;
++E){F.push(dojox.gfx.utils.deserialize(B,D[E]))
}return F
}var C=("shape" in D)?B.createShape(D.shape):B.createGroup();
if("transform" in D){C.setTransform(D.transform)
}if("stroke" in D){C.setStroke(D.stroke)
}if("fill" in D){C.setFill(D.fill)
}if("font" in D){C.setFont(D.font)
}if("children" in D){for(var E=0;
E<D.children.length;
++E){dojox.gfx.utils.deserialize(C,D.children[E])
}}return C
};
dojox.gfx.utils.fromJson=function(B,C){return dojox.gfx.utils.deserialize(B,A.fromJson(C))
}
}}});