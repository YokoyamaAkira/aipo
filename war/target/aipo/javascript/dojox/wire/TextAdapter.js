if(!dojo._hasResource["dojox.wire.TextAdapter"]){dojo._hasResource["dojox.wire.TextAdapter"]=true;
dojo.provide("dojox.wire.TextAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TextAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TextAdapter",constructor:function(A){this._initializeChildren(this.segments);
if(!this.delimiter){this.delimiter=""
}},_getValue:function(A){if(!A||!this.segments){return A
}var D="";
for(var B in this.segments){var C=this.segments[B].getValue(A);
D=this._addSegment(D,C)
}return D
},_setValue:function(A,B){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_addSegment:function(B,A){if(!A){return B
}else{if(!B){return A
}else{return B+this.delimiter+A
}}}})
};