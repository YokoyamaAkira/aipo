if(!dojo._hasResource["dojox.gfx.utils"]){dojo._hasResource["dojox.gfx.utils"]=true;
dojo.provide("dojox.gfx.utils");
dojo.require("dojox.gfx");
dojox.gfx.utils.serialize=function(B){var D={},A,E=B instanceof dojox.gfx.Surface;
if(E||B instanceof dojox.gfx.Group){D.children=[];
for(var C=0;
C<B.children.length;
++C){D.children.push(dojox.gfx.utils.serialize(B.children[C]))
}if(E){return D.children
}}else{D.shape=B.getShape()
}if(B.getTransform){A=B.getTransform();
if(A){D.transform=A
}}if(B.getStroke){A=B.getStroke();
if(A){D.stroke=A
}}if(B.getFill){A=B.getFill();
if(A){D.fill=A
}}if(B.getFont){A=B.getFont();
if(A){D.font=A
}}return D
};
dojox.gfx.utils.toJson=function(B,A){return dojo.toJson(dojox.gfx.utils.serialize(B),A)
};
dojox.gfx.utils.deserialize=function(D,A){if(A instanceof Array){var C=[];
for(var B=0;
B<A.length;
++B){C.push(dojox.gfx.utils.deserialize(D,A[B]))
}return C
}var E=("shape" in A)?D.createShape(A.shape):D.createGroup();
if("transform" in A){E.setTransform(A.transform)
}if("stroke" in A){E.setStroke(A.stroke)
}if("fill" in A){E.setFill(A.fill)
}if("font" in A){E.setFont(A.font)
}if("children" in A){for(var B=0;
B<A.children.length;
++B){dojox.gfx.utils.deserialize(E,A.children[B])
}}return E
};
dojox.gfx.utils.fromJson=function(A,B){return dojox.gfx.utils.deserialize(A,dojo.fromJson(B))
}
};