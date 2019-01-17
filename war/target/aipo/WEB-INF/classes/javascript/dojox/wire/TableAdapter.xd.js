dojo._xdResourceLoaded({depends:[["provide","dojox.wire.TableAdapter"],["require","dojox.wire.CompositeWire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.TableAdapter"]){A._hasResource["dojox.wire.TableAdapter"]=true;
A.provide("dojox.wire.TableAdapter");
A.require("dojox.wire.CompositeWire");
A.declare("dojox.wire.TableAdapter",dojox.wire.CompositeWire,{_wireClass:"dojox.wire.TableAdapter",constructor:function(B){this._initializeChildren(this.columns)
},_getValue:function(B){if(!B||!this.columns){return B
}var F=B;
if(!A.isArray(F)){F=[F]
}var D=[];
for(var C in F){var E=this._getRow(F[C]);
D.push(E)
}return D
},_setValue:function(B,C){throw new Error("Unsupported API: "+this._wireClass+"._setValue")
},_getRow:function(B){var C=(A.isArray(this.columns)?[]:{});
for(var D in this.columns){C[D]=this.columns[D].getValue(B)
}return C
}})
}}});