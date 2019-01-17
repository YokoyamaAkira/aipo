if(!dojo._hasResource["dojox.wire.CompositeWire"]){dojo._hasResource["dojox.wire.CompositeWire"]=true;
dojo.provide("dojox.wire.CompositeWire");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.CompositeWire",dojox.wire.Wire,{_wireClass:"dojox.wire.CompositeWire",constructor:function(A){this._initializeChildren(this.children)
},_getValue:function(A){if(!A||!this.children){return A
}var B=(dojo.isArray(this.children)?[]:{});
for(var C in this.children){B[C]=this.children[C].getValue(A)
}return B
},_setValue:function(A,B){if(!A||!this.children){return A
}for(var C in this.children){this.children[C].setValue(B[C],A)
}return A
},_initializeChildren:function(A){if(!A){return 
}for(var C in A){var B=A[C];
B.parent=this;
if(!dojox.wire.isWire(B)){A[C]=dojox.wire.create(B)
}}}})
};