dojo._xdResourceLoaded({depends:[["provide","dojo._base.declare"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.declare"]){A._hasResource["dojo._base.declare"]=true;
A.provide("dojo._base.declare");
A.require("dojo._base.lang");
A.declare=function(C,I,E){if(A.isFunction(E)||(arguments.length>3)){A.deprecated("dojo.declare: for class '"+C+"' pass initializer function as 'constructor' property instead of as a separate argument.","","1.0");
var D=E;
E=arguments[3]||{};
E.constructor=D
}var H=arguments.callee,B=null;
if(A.isArray(I)){B=I;
I=B.shift()
}if(B){for(var L=0,K;
L<B.length;
L++){K=B[L];
if(!K){throw ("Mixin #"+L+" to declaration of "+C+" is null. It's likely a required module is not loaded.")
}I=H._delegate(I,K)
}}var J=(E||0).constructor,G=H._delegate(I),F;
for(var L in E){if(A.isFunction(F=E[L])&&(!0[L])){F.nom=L
}}A.extend(G,{declaredClass:C,_constructor:J,preamble:null},E||0);
G.prototype.constructor=G;
return A.setObject(C,G)
};
A.mixin(A.declare,{_delegate:function(B,C){var F=(B||0).prototype,E=(C||0).prototype;
var D=A.declare._makeCtor();
A.mixin(D,{superclass:F,mixin:E,extend:A.declare._extend});
if(B){D.prototype=A._delegate(F)
}A.extend(D,A.declare._core,E||0,{_constructor:null,preamble:null});
D.prototype.constructor=D;
D.prototype.declaredClass=(F||0).declaredClass+"_"+(E||0).declaredClass;
return D
},_extend:function(B){for(var C in B){if(A.isFunction(fn=B[C])&&(!0[C])){fn.nom=C
}}A.extend(this,B)
},_makeCtor:function(){return function(){this._construct(arguments)
}
},_core:{_construct:function(C){var D=C.callee,H=D.superclass,B=H&&H.constructor,J=D.mixin,I=J&&J.constructor,F=C,G,E;
if(F[0]){if((E=F[0]["preamble"])){F=E.apply(this,F)||F
}}if(E=D.prototype.preamble){F=E.apply(this,F)||F
}if(B&&B.apply){B.apply(this,F)
}if(I&&I.apply){I.apply(this,F)
}if(G=D.prototype._constructor){G.apply(this,C)
}if(this.constructor.prototype==D.prototype&&(B=this.postscript)){B.apply(this,C)
}},_findMixin:function(D){var B=this.constructor,E,C;
while(B){E=B.superclass;
C=B.mixin;
if(C==D||(C instanceof D.constructor)){return E
}if(C&&(C=C._findMixin(D))){return C
}B=E&&E.constructor
}},_findMethod:function(H,C,I,G){var D=I,E,F,B;
do{E=D.constructor;
F=E.mixin;
if(F&&(F=this._findMethod(H,C,F,G))){return F
}if((B=D[H])&&(G==(B==C))){return D
}D=E.superclass
}while(D);
return !G&&(D=this._findMixin(I))&&this._findMethod(H,C,D,G)
},inherited:function(I,H,G){var F=arguments;
if(!A.isString(F[0])){G=H;
H=I;
I=H.callee.nom
}var C=H.callee,E=this.constructor.prototype,F=G||H,B,D;
if(this[I]!=C||E[I]==C){D=this._findMethod(I,C,E,true);
if(!D){throw (this.declaredClass+': name argument ("'+I+'") to inherited must match callee (declare.js)')
}E=this._findMethod(I,C,D,false)
}B=E&&E[I];
if(!B){console.debug(D.declaredClass+': no inherited "'+I+'" was found (declare.js)');
return 
}return B.apply(this,F)
}}})
}}});