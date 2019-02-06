if(!dojo._hasResource["dojox.wire.Wire"]){dojo._hasResource["dojox.wire.Wire"]=true;
dojo.provide("dojox.wire.Wire");
dojo.require("dojox.wire._base");
dojo.declare("dojox.wire.Wire",null,{_wireClass:"dojox.wire.Wire",constructor:function(B){dojo.mixin(this,B);
if(this.converter){if(dojo.isString(this.converter)){var D=dojo.getObject(this.converter);
if(dojo.isFunction(D)){try{var A=new D();
if(A&&!dojo.isFunction(A.convert)){this.converter={convert:D}
}else{this.converter=A
}}catch(C){}}else{if(dojo.isObject(D)){if(dojo.isFunction(D.convert)){this.converter=D
}}}if(dojo.isString(this.converter)){var E=dojox.wire._getClass(this.converter);
if(E){this.converter=new E()
}else{this.converter=undefined
}}}else{if(dojo.isFunction(this.converter)){this.converter={convert:this.converter}
}}}},getValue:function(A){var B=undefined;
if(dojox.wire.isWire(this.object)){B=this.object.getValue(A)
}else{B=(this.object||A)
}if(this.property){var E=this.property.split(".");
for(var C in E){if(!B){return B
}B=this._getPropertyValue(B,E[C])
}}var D=undefined;
if(this._getValue){D=this._getValue(B)
}else{D=B
}if(D){if(this.type){if(this.type=="string"){D=D.toString()
}else{if(this.type=="number"){D=parseInt(D)
}else{if(this.type=="boolean"){D=(D!="false")
}else{if(this.type=="array"){if(!dojo.isArray(D)){D=[D]
}}}}}}if(this.converter&&this.converter.convert){D=this.converter.convert(D,this)
}}return D
},setValue:function(H,F){var C=undefined;
if(dojox.wire.isWire(this.object)){C=this.object.getValue(F)
}else{C=(this.object||F)
}var I=undefined;
if(this.property){if(!C){if(dojox.wire.isWire(this.object)){C={};
this.object.setValue(C,F)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}var G=this.property.split(".");
var J=G.length-1;
for(var D=0;
D<J;
D++){var A=G[D];
var B=this._getPropertyValue(C,A);
if(!B){B={};
this._setPropertyValue(C,A,B)
}C=B
}I=G[J]
}if(this._setValue){if(I){var B=this._getPropertyValue(C,I);
if(!B){B={};
this._setPropertyValue(C,I,B)
}C=B
}var E=this._setValue(C,H);
if(!C&&E){if(dojox.wire.isWire(this.object)){this.object.setValue(E,F)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}}else{if(I){this._setPropertyValue(C,I,H)
}else{if(dojox.wire.isWire(this.object)){this.object.setValue(H,F)
}else{throw new Error(this._wireClass+".setValue(): invalid property")
}}}},_getPropertyValue:function(C,G){var F=undefined;
var E=G.indexOf("[");
if(E>=0){var D=G.indexOf("]");
var B=G.substring(E+1,D);
var H=null;
if(E===0){H=C
}else{G=G.substring(0,E);
H=this._getPropertyValue(C,G);
if(H&&!dojo.isArray(H)){H=[H]
}}if(H){F=H[B]
}}else{if(C.getPropertyValue){F=C.getPropertyValue(G)
}else{var A="get"+G.charAt(0).toUpperCase()+G.substring(1);
if(C[A]){F=C[A]()
}else{F=C[G]
}}}return F
},_setPropertyValue:function(B,F,E){var D=F.indexOf("[");
if(D>=0){var C=F.indexOf("]");
var A=F.substring(D+1,C);
var H=null;
if(D===0){H=B
}else{F=F.substring(0,D);
H=this._getPropertyValue(B,F);
if(!H){H=[];
this._setPropertyValue(B,F,H)
}}H[A]=E
}else{if(B.setPropertyValue){B.setPropertyValue(F,E)
}else{var G="set"+F.charAt(0).toUpperCase()+F.substring(1);
if(B[G]){B[G](E)
}else{B[F]=E
}}}}})
};