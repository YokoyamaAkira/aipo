if(!dojo._hasResource["dojox.wire.Wire"]){dojo._hasResource["dojox.wire.Wire"]=true;
dojo.provide("dojox.wire.Wire");
dojo.require("dojox.wire._base");
dojo.declare("dojox.wire.Wire",null,{_wireClass:"dojox.wire.Wire",constructor:function(A){dojo.mixin(this,A);
if(this.converter){if(dojo.isString(this.converter)){var C=dojo.getObject(this.converter);
if(dojo.isFunction(C)){try{var E=new C();
if(E&&!dojo.isFunction(E.convert)){this.converter={convert:C}
}else{this.converter=E
}}catch(B){}}else{if(dojo.isObject(C)){if(dojo.isFunction(C.convert)){this.converter=C
}}}if(dojo.isString(this.converter)){var D=dojox.wire._getClass(this.converter);
if(D){this.converter=new D()
}else{this.converter=undefined
}}}else{if(dojo.isFunction(this.converter)){this.converter={convert:this.converter}
}}}},getValue:function(E){var A=undefined;
if(dojox.wire.isWire(this.object)){A=this.object.getValue(E)
}else{A=(this.object||E)
}if(this.property){var D=this.property.split(".");
for(var B in D){if(!A){return A
}A=this._getPropertyValue(A,D[B])
}}var C=undefined;
if(this._getValue){C=this._getValue(A)
}else{C=A
}if(C){if(this.type){if(this.type=="string"){C=C.toString()
}else{if(this.type=="number"){C=parseInt(C)
}else{if(this.type=="boolean"){C=(C!="false")
}else{if(this.type=="array"){if(!dojo.isArray(C)){C=[C]
}}}}}}if(this.converter&&this.converter.convert){C=this.converter.convert(C,this)
}}return C
},setValue:function(D,B){var I=undefined;
if(dojox.wire.isWire(this.object)){I=this.object.getValue(B)
}else{I=(this.object||B)
}var E=undefined;
if(this.property){if(!I){if(dojox.wire.isWire(this.object)){I={};
this.object.setValue(I,B)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}var C=this.property.split(".");
var F=C.length-1;
for(var J=0;
J<F;
J++){var G=C[J];
var H=this._getPropertyValue(I,G);
if(!H){H={};
this._setPropertyValue(I,G,H)
}I=H
}E=C[F]
}if(this._setValue){if(E){var H=this._getPropertyValue(I,E);
if(!H){H={};
this._setPropertyValue(I,E,H)
}I=H
}var A=this._setValue(I,D);
if(!I&&A){if(dojox.wire.isWire(this.object)){this.object.setValue(A,B)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}}else{if(E){this._setPropertyValue(I,E,D)
}else{if(dojox.wire.isWire(this.object)){this.object.setValue(D,B)
}else{throw new Error(this._wireClass+".setValue(): invalid property")
}}}},_getPropertyValue:function(F,B){var A=undefined;
var H=B.indexOf("[");
if(H>=0){var G=B.indexOf("]");
var E=B.substring(H+1,G);
var C=null;
if(H===0){C=F
}else{B=B.substring(0,H);
C=this._getPropertyValue(F,B);
if(C&&!dojo.isArray(C)){C=[C]
}}if(C){A=C[E]
}}else{if(F.getPropertyValue){A=F.getPropertyValue(B)
}else{var D="get"+B.charAt(0).toUpperCase()+B.substring(1);
if(F[D]){A=F[D]()
}else{A=F[B]
}}}return A
},_setPropertyValue:function(E,A,H){var G=A.indexOf("[");
if(G>=0){var F=A.indexOf("]");
var D=A.substring(G+1,F);
var C=null;
if(G===0){C=E
}else{A=A.substring(0,G);
C=this._getPropertyValue(E,A);
if(!C){C=[];
this._setPropertyValue(E,A,C)
}}C[D]=H
}else{if(E.setPropertyValue){E.setPropertyValue(A,H)
}else{var B="set"+A.charAt(0).toUpperCase()+A.substring(1);
if(E[B]){E[B](H)
}else{E[A]=H
}}}}})
};