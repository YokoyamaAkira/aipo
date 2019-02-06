if(!dojo._hasResource["dojox.wire.TreeAdapter"]){dojo._hasResource["dojox.wire.TreeAdapter"]=true;
dojo.provide("dojox.wire.TreeAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TreeAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TreeAdapter",constructor:function(A){this._initializeChildren(this.nodes)
},_getValue:function(B){if(!B||!this.nodes){return B
}var E=B;
if(!dojo.isArray(E)){E=[E]
}var A=[];
for(var C in E){for(var D in this.nodes){A=A.concat(this._getNodes(E[C],this.nodes[D]))
}}return A
},_setValue:function(A,B){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_initializeChildren:function(B){if(!B){return 
}for(var A in B){var C=B[A];
if(C.node){C.node.parent=this;
if(!dojox.wire.isWire(C.node)){C.node=dojox.wire.create(C.node)
}}if(C.title){C.title.parent=this;
if(!dojox.wire.isWire(C.title)){C.title=dojox.wire.create(C.title)
}}if(C.children){this._initializeChildren(C.children)
}}},_getNodes:function(B,H){var G=null;
if(H.node){G=H.node.getValue(B);
if(!G){return[]
}if(!dojo.isArray(G)){G=[G]
}}else{G=[B]
}var A=[];
for(var D in G){B=G[D];
var F={};
if(H.title){F.title=H.title.getValue(B)
}else{F.title=B
}if(H.children){var C=[];
for(var E in H.children){C=C.concat(this._getNodes(B,H.children[E]))
}if(C.length>0){F.children=C
}}A.push(F)
}return A
}})
};