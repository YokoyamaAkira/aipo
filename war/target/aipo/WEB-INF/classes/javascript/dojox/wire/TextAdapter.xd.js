dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TextAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.TextAdapter"]){A._hasResource["dojox.wire.TextAdapter"]=true;
A.provide("dojox.wire.TextAdapter");
A.require("dojox.wire.CompositeWire");
A.declare("dojox.wire.TextAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TextAdapter",constructor:function(B){this._initializeChildren(this.segments);
if(!this.delimiter){this.delimiter=""
}},_getValue:function(C){if(!C||!this.segments){return C
}var B="";
for(var D in this.segments){var E=this.segments[D].getValue(C);
B=this._addSegment(B,E)
}return B
},_setValue:function(C,B){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_addSegment:function(B,C){if(!C){return B
}else{if(!B){return C
}else{return B+this.delimiter+C
}}}})
}}});