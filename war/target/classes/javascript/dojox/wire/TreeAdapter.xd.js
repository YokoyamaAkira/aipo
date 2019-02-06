dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TreeAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.TreeAdapter"]){A._hasResource["dojox.wire.TreeAdapter"]=true;
A.provide("dojox.wire.TreeAdapter");
A.require("dojox.wire.CompositeWire");
A.declare("dojox.wire.TreeAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TreeAdapter",constructor:function(B){this._initializeChildren(this.nodes)
},_getValue:function(D){if(!D||!this.nodes){return D
}var B=D;
if(!A.isArray(B)){B=[B]
}var C=[];
for(var E in B){for(var F in this.nodes){C=C.concat(this._getNodes(B[E],this.nodes[F]))
}}return C
},_setValue:function(C,B){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_initializeChildren:function(D){if(!D){return 
}for(var C in D){var B=D[C];
if(B.node){B.node.parent=this;
if(!dojox.wire.isWire(B.node)){B.node=dojox.wire.create(B.node)
}}if(B.title){B.title.parent=this;
if(!dojox.wire.isWire(B.title)){B.title=dojox.wire.create(B.title)
}}if(B.children){this._initializeChildren(B.children)
}}},_getNodes:function(G,C){var E=null;
if(C.node){E=C.node.getValue(G);
if(!E){return[]
}if(!A.isArray(E)){E=[E]
}}else{E=[G]
}var F=[];
for(var I in E){G=E[I];
var D={};
if(C.title){D.title=C.title.getValue(G)
}else{D.title=G
}if(C.children){var H=[];
for(var B in C.children){H=H.concat(this._getNodes(G,C.children[B]))
}if(H.length>0){D.children=H
}}F.push(D)
}return F
}})
}}});