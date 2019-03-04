dojo._xdResourceLoaded({depends:[["provide","dojox.wire.DataWire"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.DataWire"]){A._hasResource["dojox.wire.DataWire"]=true;
A.provide("dojox.wire.DataWire");
A.require("dojox.wire.Wire");
A.declare("dojox.wire.DataWire",dojox.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(B){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore
}},_getValue:function(B){if(!B||!this.attribute||!this.dataStore){return B
}var E=B;
var D=this.attribute.split(".");
for(var C in D){E=this._getAttributeValue(E,D[C]);
if(!E){return undefined
}}return E
},_setValue:function(B,G){if(!B||!this.attribute||!this.dataStore){return B
}var E=B;
var F=this.attribute.split(".");
var D=F.length-1;
for(var C=0;
C<D;
C++){E=this._getAttributeValue(E,F[C]);
if(!E){return undefined
}}this._setAttributeValue(E,F[D],G);
return B
},_getAttributeValue:function(F,E){var G=undefined;
var D=E.indexOf("[");
if(D>=0){var C=E.indexOf("]");
var B=E.substring(D+1,C);
E=E.substring(0,D);
var H=this.dataStore.getValues(F,E);
if(H){if(!B){G=H
}else{G=H[B]
}}}else{G=this.dataStore.getValue(F,E)
}return G
},_setAttributeValue:function(F,E,G){var D=E.indexOf("[");
if(D>=0){var C=E.indexOf("]");
var B=E.substring(D+1,C);
E=E.substring(0,D);
var H=null;
if(!B){H=G
}else{H=this.dataStore.getValues(F,E);
if(!H){H=[]
}H[B]=G
}this.dataStore.setValues(F,E,H)
}else{this.dataStore.setValue(F,E,G)
}}})
}}});