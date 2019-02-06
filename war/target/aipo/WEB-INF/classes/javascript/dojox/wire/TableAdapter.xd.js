dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TableAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.TableAdapter"]){A._hasResource["dojox.wire.TableAdapter"]=true;
A.provide("dojox.wire.TableAdapter");
A.require("dojox.wire.CompositeWire");
A.declare("dojox.wire.TableAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TableAdapter",constructor:function(B){this._initializeChildren(this.columns)
},_getValue:function(C){if(!C||!this.columns){return C
}var B=C;
if(!A.isArray(B)){B=[B]
}var E=[];
for(var D in B){var F=this._getRow(B[D]);
E.push(F)
}return E
},_setValue:function(C,B){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_getRow:function(C){var D=(A.isArray(this.columns)?[]:{});
for(var B in this.columns){D[B]=this.columns[B].getValue(C)
}return D
}})
}}});