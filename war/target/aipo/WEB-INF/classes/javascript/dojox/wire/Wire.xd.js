dojo._xdResourceLoaded({depends:[["provide","dojox.wire.Wire"],["require","dojox.wire._base"]],defineResource:function(A){if(!A._hasResource["dojox.wire.Wire"]){A._hasResource["dojox.wire.Wire"]=true;
A.provide("dojox.wire.Wire");
A.require("dojox.wire._base");
A.declare("dojox.wire.Wire",null,{_wireClass:"dojox.wire.Wire",constructor:function(D){A.mixin(this,D);
if(this.converter){if(A.isString(this.converter)){var F=A.getObject(this.converter);
if(A.isFunction(F)){try{var C=new F();
if(C&&!A.isFunction(C.convert)){this.converter={convert:F}
}else{this.converter=C
}}catch(E){}}else{if(A.isObject(F)){if(A.isFunction(F.convert)){this.converter=F
}}}if(A.isString(this.converter)){var B=dojox.wire._getClass(this.converter);
if(B){this.converter=new B()
}else{this.converter=undefined
}}}else{if(A.isFunction(this.converter)){this.converter={convert:this.converter}
}}}},getValue:function(C){var D=undefined;
if(dojox.wire.isWire(this.object)){D=this.object.getValue(C)
}else{D=(this.object||C)
}if(this.property){var B=this.property.split(".");
for(var E in B){if(!D){return D
}D=this._getPropertyValue(D,B[E])
}}var F=undefined;
if(this._getValue){F=this._getValue(D)
}else{F=D
}if(F){if(this.type){if(this.type=="string"){F=F.toString()
}else{if(this.type=="number"){F=parseInt(F)
}else{if(this.type=="boolean"){F=(F!="false")
}else{if(this.type=="array"){if(!A.isArray(F)){F=[F]
}}}}}}if(this.converter&&this.converter.convert){F=this.converter.convert(F,this)
}}return F
},setValue:function(G,E){var B=undefined;
if(dojox.wire.isWire(this.object)){B=this.object.getValue(E)
}else{B=(this.object||E)
}var H=undefined;
if(this.property){if(!B){if(dojox.wire.isWire(this.object)){B={};
this.object.setValue(B,E)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}var F=this.property.split(".");
var I=F.length-1;
for(var C=0;
C<I;
C++){var J=F[C];
var K=this._getPropertyValue(B,J);
if(!K){K={};
this._setPropertyValue(B,J,K)
}B=K
}H=F[I]
}if(this._setValue){if(H){var K=this._getPropertyValue(B,H);
if(!K){K={};
this._setPropertyValue(B,H,K)
}B=K
}var D=this._setValue(B,G);
if(!B&&D){if(dojox.wire.isWire(this.object)){this.object.setValue(D,E)
}else{throw new Error(this._wireClass+".setValue(): invalid object")
}}}else{if(H){this._setPropertyValue(B,H,G)
}else{if(dojox.wire.isWire(this.object)){this.object.setValue(G,E)
}else{throw new Error(this._wireClass+".setValue(): invalid property")
}}}},_getPropertyValue:function(H,E){var D=undefined;
var C=E.indexOf("[");
if(C>=0){var I=E.indexOf("]");
var G=E.substring(C+1,I);
var B=null;
if(C===0){B=H
}else{E=E.substring(0,C);
B=this._getPropertyValue(H,E);
if(B&&!A.isArray(B)){B=[B]
}}if(B){D=B[G]
}}else{if(H.getPropertyValue){D=H.getPropertyValue(E)
}else{var F="get"+E.charAt(0).toUpperCase()+E.substring(1);
if(H[F]){D=H[F]()
}else{D=H[E]
}}}return D
},_setPropertyValue:function(G,D,C){var I=D.indexOf("[");
if(I>=0){var H=D.indexOf("]");
var F=D.substring(I+1,H);
var B=null;
if(I===0){B=G
}else{D=D.substring(0,I);
B=this._getPropertyValue(G,D);
if(!B){B=[];
this._setPropertyValue(G,D,B)
}}B[F]=C
}else{if(G.setPropertyValue){G.setPropertyValue(D,C)
}else{var E="set"+D.charAt(0).toUpperCase()+D.substring(1);
if(G[E]){G[E](C)
}else{G[D]=C
}}}}})
}}});