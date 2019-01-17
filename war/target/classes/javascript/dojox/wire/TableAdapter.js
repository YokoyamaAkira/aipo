if(!dojo._hasResource["dojox.wire.TableAdapter"]){dojo._hasResource["dojox.wire.TableAdapter"]=true;
dojo.provide("dojox.wire.TableAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TableAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TableAdapter",constructor:function(A){this._initializeChildren(this.columns)
},_getValue:function(A){if(!A||!this.columns){return A
}var E=A;
if(!dojo.isArray(E)){E=[E]
}var C=[];
for(var B in E){var D=this._getRow(E[B]);
C.push(D)
}return C
},_setValue:function(A,B){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_getRow:function(A){var B=(dojo.isArray(this.columns)?[]:{});
for(var C in this.columns){B[C]=this.columns[C].getValue(A)
}return B
}})
};