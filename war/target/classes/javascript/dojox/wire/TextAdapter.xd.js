dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TextAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.TextAdapter"]){A._hasResource["dojox.wire.TextAdapter"]=true;
A.provide("dojox.wire.TextAdapter");
A.require("dojox.wire.CompositeWire");
A.declare("dojox.wire.TextAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TextAdapter",constructor:function(B){this._initializeChildren(this.segments);
if(!this.delimiter){this.delimiter=""
}},_getValue:function(B){if(!B||!this.segments){return B
}var E="";
for(var C in this.segments){var D=this.segments[C].getValue(B);
E=this._addSegment(E,D)
}return E
},_setValue:function(B,C){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_addSegment:function(C,B){if(!B){return C
}else{if(!C){return B
}else{return C+this.delimiter+B
}}}})
}}});