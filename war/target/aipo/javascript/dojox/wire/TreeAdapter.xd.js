dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TreeAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.TreeAdapter"]){A._hasResource["dojox.wire.TreeAdapter"]=true;
A.provide("dojox.wire.TreeAdapter");
A.require("dojox.wire.CompositeWire");
A.declare("dojox.wire.TreeAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TreeAdapter",constructor:function(B){this._initializeChildren(this.nodes)
},_getValue:function(C){if(!C||!this.nodes){return C
}var F=C;
if(!A.isArray(F)){F=[F]
}var B=[];
for(var D in F){for(var E in this.nodes){B=B.concat(this._getNodes(F[D],this.nodes[E]))
}}return B
},_setValue:function(B,C){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_initializeChildren:function(C){if(!C){return 
}for(var B in C){var D=C[B];
if(D.node){D.node.parent=this;
if(!dojox.wire.isWire(D.node)){D.node=dojox.wire.create(D.node)
}}if(D.title){D.title.parent=this;
if(!dojox.wire.isWire(D.title)){D.title=dojox.wire.create(D.title)
}}if(D.children){this._initializeChildren(D.children)
}}},_getNodes:function(C,I){var H=null;
if(I.node){H=I.node.getValue(C);
if(!H){return[]
}if(!A.isArray(H)){H=[H]
}}else{H=[C]
}var B=[];
for(var E in H){C=H[E];
var G={};
if(I.title){G.title=I.title.getValue(C)
}else{G.title=C
}if(I.children){var D=[];
for(var F in I.children){D=D.concat(this._getNodes(C,I.children[F]))
}if(D.length>0){G.children=D
}}B.push(G)
}return B
}})
}}});