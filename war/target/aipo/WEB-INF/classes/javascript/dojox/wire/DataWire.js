if(!dojo._hasResource["dojox.wire.DataWire"]){dojo._hasResource["dojox.wire.DataWire"]=true;
dojo.provide("dojox.wire.DataWire");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.DataWire",dojox.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(A){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore
}},_getValue:function(D){if(!D||!this.attribute||!this.dataStore){return D
}var C=D;
var B=this.attribute.split(".");
for(var A in B){C=this._getAttributeValue(C,B[A]);
if(!C){return undefined
}}return C
},_setValue:function(F,E){if(!F||!this.attribute||!this.dataStore){return F
}var C=F;
var D=this.attribute.split(".");
var B=D.length-1;
for(var A=0;
A<B;
A++){C=this._getAttributeValue(C,D[A]);
if(!C){return undefined
}}this._setAttributeValue(C,D[B],E);
return F
},_getAttributeValue:function(B,A){var C=undefined;
var G=A.indexOf("[");
if(G>=0){var F=A.indexOf("]");
var E=A.substring(G+1,F);
A=A.substring(0,G);
var D=this.dataStore.getValues(B,A);
if(D){if(!E){C=D
}else{C=D[E]
}}}else{C=this.dataStore.getValue(B,A)
}return C
},_setAttributeValue:function(B,A,C){var G=A.indexOf("[");
if(G>=0){var F=A.indexOf("]");
var E=A.substring(G+1,F);
A=A.substring(0,G);
var D=null;
if(!E){D=C
}else{D=this.dataStore.getValues(B,A);
if(!D){D=[]
}D[E]=C
}this.dataStore.setValues(B,A,D)
}else{this.dataStore.setValue(B,A,C)
}}})
};