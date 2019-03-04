dojo._xdResourceLoaded({depends:[["provide","dojox.wire.Wire"],["require","dojox.wire._base"]],defineResource:function(A){if(!A._hasResource["dojox.wire.Wire"]){A._hasResource["dojox.wire.Wire"]=true;
A.provide("dojox.wire.Wire");
A.require("dojox.wire._base");
A.declare("dojox.wire.Wire",null,{_wireClass:"dojox.wire.Wire",constructor:function(C){A.mixin(this,C);
if(this.converter){if(A.isString(this.converter)){var E=A.getObject(this.converter);
if(A.isFunction(E)){try{var B=new E();
if(B&&!A.isFunction(B.convert)){this.converter={convert:E}
}else{this.converter=B
}}catch(D){}}else{if(A.isObject(E)){if(A.isFunction(E.convert)){this.converter=E
}}}if(A.isString(this.converter)){var F=dojox.wire._getClass(this.converter);
if(F){this.converter=new F()
}else{this.converter=undefined
}}}else{if(A.isFunction(this.converter)){this.converter={convert:this.converter}
}}}},getValue:function(B){var C=undefined;
if(dojox.wire.isWire(this.object)){C=this.object.getValue(B)
}else{C=(this.object||B)
}if(this.property){var F=this.property.split(".");
for(var D in F){if(!C){return C
}C=this._getPropertyValue(C,F[D])
}}var E=undefined;
if(this._getValue){E=this._getValue(C)
}else{E=C
}if(E){if(this.type){if(this.type=="string"){E=E.toString()
}else{if(this.type=="number"){E=parseInt(E)
}else{if(this.type=="boolean"){E=(E!="false")
}else{if(this.type=="array"){if(!A.isArray(E)){E=[E]
}}}}}}if(this.converter&&this.converter.convert){E=this.converter.convert(E,this)
}}return E
},setValue:function(I,G){var D=undefined;
if(dojox.wire.isWire(this.object)){D=this.object.getValue(G)
}else{D=(this.object||G)
}var J=undefined;
if(this.property){if(!D){if(dojox.wire.isWire(this.object)){D={};
this.object.setValue(D,G)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}var H=this.property.split(".");
var K=H.length-1;
for(var E=0;
E<K;
E++){var B=H[E];
var C=this._getPropertyValue(D,B);
if(!C){C={};
this._setPropertyValue(D,B,C)
}D=C
}J=H[K]
}if(this._setValue){if(J){var C=this._getPropertyValue(D,J);
if(!C){C={};
this._setPropertyValue(D,J,C)
}D=C
}var F=this._setValue(D,I);
if(!D&&F){if(dojox.wire.isWire(this.object)){this.object.setValue(F,G)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}}else{if(J){this._setPropertyValue(D,J,I)
}else{if(dojox.wire.isWire(this.object)){this.object.setValue(I,G)
}else{throw new Error(this._wireClass+".setValue(): invalid property")
}}}},_getPropertyValue:function(D,H){var G=undefined;
var F=H.indexOf("[");
if(F>=0){var E=H.indexOf("]");
var C=H.substring(F+1,E);
var I=null;
if(F===0){I=D
}else{H=H.substring(0,F);
I=this._getPropertyValue(D,H);
if(I&&!A.isArray(I)){I=[I]
}}if(I){G=I[C]
}}else{if(D.getPropertyValue){G=D.getPropertyValue(H)
}else{var B="get"+H.charAt(0).toUpperCase()+H.substring(1);
if(D[B]){G=D[B]()
}else{G=D[H]
}}}return G
},_setPropertyValue:function(C,G,F){var E=G.indexOf("[");
if(E>=0){var D=G.indexOf("]");
var B=G.substring(E+1,D);
var I=null;
if(E===0){I=C
}else{G=G.substring(0,E);
I=this._getPropertyValue(C,G);
if(!I){I=[];
this._setPropertyValue(C,G,I)
}}I[B]=F
}else{if(C.setPropertyValue){C.setPropertyValue(G,F)
}else{var H="set"+G.charAt(0).toUpperCase()+G.substring(1);
if(C[H]){C[H](F)
}else{C[G]=F
}}}}})
}}});