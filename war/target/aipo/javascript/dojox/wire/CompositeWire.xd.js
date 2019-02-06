dojo._xdResourceLoaded({depends:[["provide","dojox.wire.CompositeWire"],["require","dojox.wire._base"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.CompositeWire"]){A._hasResource["dojox.wire.CompositeWire"]=true;
A.provide("dojox.wire.CompositeWire");
A.require("dojox.wire._base");
A.require("dojox.wire.Wire");
A.declare("dojox.wire.CompositeWire",dojox.wire.Wire,{_wireClass:"dojox.wire.CompositeWire",constructor:function(B){this._initializeChildren(this.children)
},_getValue:function(B){if(!B||!this.children){return B
}var C=(A.isArray(this.children)?[]:{});
for(var D in this.children){C[D]=this.children[D].getValue(B)
}return C
},_setValue:function(B,C){if(!B||!this.children){return B
}for(var D in this.children){this.children[D].setValue(C[D],B)
}return B
},_initializeChildren:function(B){if(!B){return 
}for(var D in B){var C=B[D];
C.parent=this;
if(!dojox.wire.isWire(C)){B[D]=dojox.wire.create(C)
}}}})
}}});