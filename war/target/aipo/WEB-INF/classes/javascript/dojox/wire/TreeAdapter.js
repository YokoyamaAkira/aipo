if(!dojo._hasResource["dojox.wire.TreeAdapter"]){dojo._hasResource["dojox.wire.TreeAdapter"]=true;
dojo.provide("dojox.wire.TreeAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TreeAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TreeAdapter",constructor:function(A){this._initializeChildren(this.nodes)
},_getValue:function(A){if(!A||!this.nodes){return A
}var D=A;
if(!dojo.isArray(D)){D=[D]
}var E=[];
for(var B in D){for(var C in this.nodes){E=E.concat(this._getNodes(D[B],this.nodes[C]))
}}return E
},_setValue:function(B,A){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_initializeChildren:function(A){if(!A){return 
}for(var C in A){var B=A[C];
if(B.node){B.node.parent=this;
if(!dojox.wire.isWire(B.node)){B.node=dojox.wire.create(B.node)
}}if(B.title){B.title.parent=this;
if(!dojox.wire.isWire(B.title)){B.title=dojox.wire.create(B.title)
}}if(B.children){this._initializeChildren(B.children)
}}},_getNodes:function(E,C){var B=null;
if(C.node){B=C.node.getValue(E);
if(!B){return[]
}if(!dojo.isArray(B)){B=[B]
}}else{B=[E]
}var D=[];
for(var G in B){E=B[G];
var A={};
if(C.title){A.title=C.title.getValue(E)
}else{A.title=E
}if(C.children){var F=[];
for(var H in C.children){F=F.concat(this._getNodes(E,C.children[H]))
}if(F.length>0){A.children=F
}}D.push(A)
}return D
}})
};