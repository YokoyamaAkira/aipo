if(!dojo._hasResource["dojox.wire.TextAdapter"]){dojo._hasResource["dojox.wire.TextAdapter"]=true;
dojo.provide("dojox.wire.TextAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TextAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TextAdapter",constructor:function(A){this._initializeChildren(this.segments);
if(!this.delimiter){this.delimiter=""
}},_getValue:function(D){if(!D||!this.segments){return D
}var C="";
for(var A in this.segments){var B=this.segments[A].getValue(D);
C=this._addSegment(C,B)
}return C
},_setValue:function(B,A){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_addSegment:function(A,B){if(!B){return A
}else{if(!A){return B
}else{return A+this.delimiter+B
}}}})
};