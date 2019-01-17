if(!dojo._hasResource["dojox.wire.DataWire"]){dojo._hasResource["dojox.wire.DataWire"]=true;
dojo.provide("dojox.wire.DataWire");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.DataWire",dojox.wire.Wire,{_wireClass:"dojox.wire.DataWire",constructor:function(A){if(!this.dataStore&&this.parent){this.dataStore=this.parent.dataStore
}},_getValue:function(A){if(!A||!this.attribute||!this.dataStore){return A
}var D=A;
var C=this.attribute.split(".");
for(var B in C){D=this._getAttributeValue(D,C[B]);
if(!D){return undefined
}}return D
},_setValue:function(A,F){if(!A||!this.attribute||!this.dataStore){return A
}var D=A;
var E=this.attribute.split(".");
var C=E.length-1;
for(var B=0;
B<C;
B++){D=this._getAttributeValue(D,E[B]);
if(!D){return undefined
}}this._setAttributeValue(D,E[C],F);
return A
},_getAttributeValue:function(E,D){var F=undefined;
var C=D.indexOf("[");
if(C>=0){var B=D.indexOf("]");
var A=D.substring(C+1,B);
D=D.substring(0,C);
var G=this.dataStore.getValues(E,D);
if(G){if(!A){F=G
}else{F=G[A]
}}}else{F=this.dataStore.getValue(E,D)
}return F
},_setAttributeValue:function(E,D,F){var C=D.indexOf("[");
if(C>=0){var B=D.indexOf("]");
var A=D.substring(C+1,B);
D=D.substring(0,C);
var G=null;
if(!A){G=F
}else{G=this.dataStore.getValues(E,D);
if(!G){G=[]
}G[A]=F
}this.dataStore.setValues(E,D,G)
}else{this.dataStore.setValue(E,D,F)
}}})
};