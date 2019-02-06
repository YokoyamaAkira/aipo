if(!dojo._hasResource["dojox.wire.CompositeWire"]){dojo._hasResource["dojox.wire.CompositeWire"]=true;
dojo.provide("dojox.wire.CompositeWire");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.CompositeWire",dojox.wire.Wire,{_wireClass:"dojox.wire.CompositeWire",constructor:function(A){this._initializeChildren(this.children)
},_getValue:function(C){if(!C||!this.children){return C
}var A=(dojo.isArray(this.children)?[]:{});
for(var B in this.children){A[B]=this.children[B].getValue(C)
}return A
},_setValue:function(C,A){if(!C||!this.children){return C
}for(var B in this.children){this.children[B].setValue(A[B],C)
}return C
},_initializeChildren:function(C){if(!C){return 
}for(var B in C){var A=C[B];
A.parent=this;
if(!dojox.wire.isWire(A)){C[B]=dojox.wire.create(A)
}}}})
};