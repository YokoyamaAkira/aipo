if(!dojo._hasResource["dojox.wire.TableAdapter"]){dojo._hasResource["dojox.wire.TableAdapter"]=true;
dojo.provide("dojox.wire.TableAdapter");
dojo.require("dojox.wire.CompositeWire");
dojo.declare("dojox.wire.TableAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TableAdapter",constructor:function(A){this._initializeChildren(this.columns)
},_getValue:function(E){if(!E||!this.columns){return E
}var D=E;
if(!dojo.isArray(D)){D=[D]
}var B=[];
for(var A in D){var C=this._getRow(D[A]);
B.push(C)
}return B
},_setValue:function(B,A){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_getRow:function(C){var A=(dojo.isArray(this.columns)?[]:{});
for(var B in this.columns){A[B]=this.columns[B].getValue(C)
}return A
}})
};