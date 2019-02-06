dojo._xdResourceLoaded({depends:[["provide","dojox.wire.CompositeWire"],["require","dojox.wire._base"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.CompositeWire"]){A._hasResource["dojox.wire.CompositeWire"]=true;
A.provide("dojox.wire.CompositeWire");
A.require("dojox.wire._base");
A.require("dojox.wire.Wire");
A.declare("dojox.wire.CompositeWire",dojox.wire.Wire,{_wireClass:"dojox.wire.CompositeWire",constructor:function(B){this._initializeChildren(this.children)
},_getValue:function(C){if(!C||!this.children){return C
}var D=(A.isArray(this.children)?[]:{});
for(var B in this.children){D[B]=this.children[B].getValue(C)
}return D
},_setValue:function(C,D){if(!C||!this.children){return C
}for(var B in this.children){this.children[B].setValue(D[B],C)
}return C
},_initializeChildren:function(C){if(!C){return 
}for(var B in C){var D=C[B];
D.parent=this;
if(!dojox.wire.isWire(D)){C[B]=dojox.wire.create(D)
}}}})
}}});