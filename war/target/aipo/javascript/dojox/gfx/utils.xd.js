dojo._xdResourceLoaded({depends:[["provide","dojox.gfx.utils"],["require","dojox.gfx"]],defineResource:function(A){if(!A._hasResource["dojox.gfx.utils"]){A._hasResource["dojox.gfx.utils"]=true;
A.provide("dojox.gfx.utils");
A.require("dojox.gfx");
dojox.gfx.utils.serialize=function(D){var F={},C,B=D instanceof dojox.gfx.Surface;
if(B||D instanceof dojox.gfx.Group){F.children=[];
for(var E=0;
E<D.children.length;
++E){F.children.push(dojox.gfx.utils.serialize(D.children[E]))
}if(B){return F.children
}}else{F.shape=D.getShape()
}if(D.getTransform){C=D.getTransform();
if(C){F.transform=C
}}if(D.getStroke){C=D.getStroke();
if(C){F.stroke=C
}}if(D.getFill){C=D.getFill();
if(C){F.fill=C
}}if(D.getFont){C=D.getFont();
if(C){F.font=C
}}return F
};
dojox.gfx.utils.toJson=function(B,C){return A.toJson(dojox.gfx.utils.serialize(B),C)
};
dojox.gfx.utils.deserialize=function(F,C){if(C instanceof Array){var E=[];
for(var D=0;
D<C.length;
++D){E.push(dojox.gfx.utils.deserialize(F,C[D]))
}return E
}var B=("shape" in C)?F.createShape(C.shape):F.createGroup();
if("transform" in C){B.setTransform(C.transform)
}if("stroke" in C){B.setStroke(C.stroke)
}if("fill" in C){B.setFill(C.fill)
}if("font" in C){B.setFont(C.font)
}if("children" in C){for(var D=0;
D<C.children.length;
++D){dojox.gfx.utils.deserialize(B,C.children[D])
}}return B
};
dojox.gfx.utils.fromJson=function(C,B){return dojox.gfx.utils.deserialize(C,A.fromJson(B))
}
}}});