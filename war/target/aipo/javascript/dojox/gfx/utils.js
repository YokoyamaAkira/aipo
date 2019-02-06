if(!dojo._hasResource["dojox.gfx.utils"]){dojo._hasResource["dojox.gfx.utils"]=true;
dojo.provide("dojox.gfx.utils");
dojo.require("dojox.gfx");
dojox.gfx.utils.serialize=function(C){var E={},B,A=C instanceof dojox.gfx.Surface;
if(A||C instanceof dojox.gfx.Group){E.children=[];
for(var D=0;
D<C.children.length;
++D){E.children.push(dojox.gfx.utils.serialize(C.children[D]))
}if(A){return E.children
}}else{E.shape=C.getShape()
}if(C.getTransform){B=C.getTransform();
if(B){E.transform=B
}}if(C.getStroke){B=C.getStroke();
if(B){E.stroke=B
}}if(C.getFill){B=C.getFill();
if(B){E.fill=B
}}if(C.getFont){B=C.getFont();
if(B){E.font=B
}}return E
};
dojox.gfx.utils.toJson=function(A,B){return dojo.toJson(dojox.gfx.utils.serialize(A),B)
};
dojox.gfx.utils.deserialize=function(E,B){if(B instanceof Array){var D=[];
for(var C=0;
C<B.length;
++C){D.push(dojox.gfx.utils.deserialize(E,B[C]))
}return D
}var A=("shape" in B)?E.createShape(B.shape):E.createGroup();
if("transform" in B){A.setTransform(B.transform)
}if("stroke" in B){A.setStroke(B.stroke)
}if("fill" in B){A.setFill(B.fill)
}if("font" in B){A.setFont(B.font)
}if("children" in B){for(var C=0;
C<B.children.length;
++C){dojox.gfx.utils.deserialize(A,B.children[C])
}}return A
};
dojox.gfx.utils.fromJson=function(B,A){return dojox.gfx.utils.deserialize(B,dojo.fromJson(A))
}
};