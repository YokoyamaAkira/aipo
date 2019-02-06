dojo._xdResourceLoaded({depends:[["provide","dojox.wire.DataWire"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.DataWire"]){A._hasResource["dojox.wire.DataWire"]=true;
A.provide("dojox.wire.DataWire");
A.require("dojox.wire.Wire");
A.declare("dojox.wire.DataWire",dojox.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(B){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore
}},_getValue:function(C){if(!C||!this.attribute||!this.dataStore){return C
}var B=C;
var E=this.attribute.split(".");
for(var D in E){B=this._getAttributeValue(B,E[D]);
if(!B){return undefined
}}return B
},_setValue:function(C,B){if(!C||!this.attribute||!this.dataStore){return C
}var F=C;
var G=this.attribute.split(".");
var E=G.length-1;
for(var D=0;
D<E;
D++){F=this._getAttributeValue(F,G[D]);
if(!F){return undefined
}}this._setAttributeValue(F,G[E],B);
return C
},_getAttributeValue:function(E,D){var F=undefined;
var C=D.indexOf("[");
if(C>=0){var H=D.indexOf("]");
var G=D.substring(C+1,H);
D=D.substring(0,C);
var B=this.dataStore.getValues(E,D);
if(B){if(!G){F=B
}else{F=B[G]
}}}else{F=this.dataStore.getValue(E,D)
}return F
},_setAttributeValue:function(E,D,F){var C=D.indexOf("[");
if(C>=0){var H=D.indexOf("]");
var G=D.substring(C+1,H);
D=D.substring(0,C);
var B=null;
if(!G){B=F
}else{B=this.dataStore.getValues(E,D);
if(!B){B=[]
}B[G]=F
}this.dataStore.setValues(E,D,B)
}else{this.dataStore.setValue(E,D,F)
}}})
}}});