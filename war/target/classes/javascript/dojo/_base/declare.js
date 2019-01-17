if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.declare=function(D,J,F){if(dojo.isFunction(F)||(arguments.length>3)){dojo.deprecated("dojo.declare: for class '"+D+"' pass initializer function as 'constructor' property instead of as a separate argument.","","1.0");
var E=F;
F=arguments[3]||{};
F.constructor=E
}var I=arguments.callee,C=null;
if(dojo.isArray(J)){C=J;
J=C.shift()
}if(C){for(var B=0,A;
B<C.length;
B++){A=C[B];
if(!A){throw ("Mixin #"+B+" to declaration of "+D+" is null. It's likely a required module is not loaded.")
}J=I._delegate(J,A)
}}var K=(F||0).constructor,H=I._delegate(J),G;
for(var B in F){if(dojo.isFunction(G=F[B])&&(!0[B])){G.nom=B
}}dojo.extend(H,{declaredClass:D,_constructor:K,preamble:null},F||0);
H.prototype.constructor=H;
return dojo.setObject(D,H)
};
dojo.mixin(dojo.declare,{_delegate:function(E,A){var D=(E||0).prototype,C=(A||0).prototype;
var B=dojo.declare._makeCtor();
dojo.mixin(B,{superclass:D,mixin:C,extend:dojo.declare._extend});
if(E){B.prototype=dojo._delegate(D)
}dojo.extend(B,dojo.declare._core,C||0,{_constructor:null,preamble:null});
B.prototype.constructor=B;
B.prototype.declaredClass=(D||0).declaredClass+"_"+(C||0).declaredClass;
return B
},_extend:function(B){for(var A in B){if(dojo.isFunction(fn=B[A])&&(!0[A])){fn.nom=A
}}dojo.extend(this,B)
},_makeCtor:function(){return function(){this._construct(arguments)
}
},_core:{_construct:function(D){var E=D.callee,I=E.superclass,C=I&&I.constructor,B=E.mixin,A=B&&B.constructor,G=D,H,F;
if(G[0]){if((F=G[0]["preamble"])){G=F.apply(this,G)||G
}}if(F=E.prototype.preamble){G=F.apply(this,G)||G
}if(C&&C.apply){C.apply(this,G)
}if(A&&A.apply){A.apply(this,G)
}if(H=E.prototype._constructor){H.apply(this,D)
}if(this.constructor.prototype==E.prototype&&(C=this.postscript)){C.apply(this,D)
}},_findMixin:function(B){var D=this.constructor,C,A;
while(D){C=D.superclass;
A=D.mixin;
if(A==B||(A instanceof B.constructor)){return C
}if(A&&(A=A._findMixin(B))){return A
}D=C&&C.constructor
}},_findMethod:function(C,H,D,B){var F=D,G,A,E;
do{G=F.constructor;
A=G.mixin;
if(A&&(A=this._findMethod(C,H,A,B))){return A
}if((E=F[C])&&(B==(E==H))){return F
}F=G.superclass
}while(F);
return !B&&(F=this._findMixin(D))&&this._findMethod(C,H,F,B)
},inherited:function(D,C,B){var A=arguments;
if(!dojo.isString(A[0])){B=C;
C=D;
D=C.callee.nom
}var H=C.callee,G=this.constructor.prototype,A=B||C,E,F;
if(this[D]!=H||G[D]==H){F=this._findMethod(D,H,G,true);
if(!F){throw (this.declaredClass+': name argument ("'+D+'") to inherited must match callee (declare.js)')
}G=this._findMethod(D,H,F,false)
}E=G&&G[D];
if(!E){console.debug(F.declaredClass+': no inherited "'+D+'" was found (declare.js)');
return 
}return E.apply(this,A)
}}})
};