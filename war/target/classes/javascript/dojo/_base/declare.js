if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.declare=function(K,F,B){if(dojo.isFunction(B)||(arguments.length>3)){dojo.deprecated("dojo.declare: for class '"+K+"' pass initializer function as 'constructor' property instead of as a separate argument.","","1.0");
var A=B;
B=arguments[3]||{};
B.constructor=A
}var E=arguments.callee,J=null;
if(dojo.isArray(F)){J=F;
F=J.shift()
}if(J){for(var I=0,H;
I<J.length;
I++){H=J[I];
if(!H){throw ("Mixin #"+I+" to declaration of "+K+" is null. It's likely a required module is not loaded.")
}F=E._delegate(F,H)
}}var G=(B||0).constructor,D=E._delegate(F),C;
for(var I in B){if(dojo.isFunction(C=B[I])&&(!0[I])){C.nom=I
}}dojo.extend(D,{declaredClass:K,_constructor:G,preamble:null},B||0);
D.prototype.constructor=D;
return dojo.setObject(K,D)
};
dojo.mixin(dojo.declare,{_delegate:function(D,E){var C=(D||0).prototype,B=(E||0).prototype;
var A=dojo.declare._makeCtor();
dojo.mixin(A,{superclass:C,mixin:B,extend:dojo.declare._extend});
if(D){A.prototype=dojo._delegate(C)
}dojo.extend(A,dojo.declare._core,B||0,{_constructor:null,preamble:null});
A.prototype.constructor=A;
A.prototype.declaredClass=(C||0).declaredClass+"_"+(B||0).declaredClass;
return A
},_extend:function(A){for(var B in A){if(dojo.isFunction(fn=A[B])&&(!0[B])){fn.nom=B
}}dojo.extend(this,A)
},_makeCtor:function(){return function(){this._construct(arguments)
}
},_core:{_construct:function(I){var A=I.callee,E=A.superclass,H=E&&E.constructor,G=A.mixin,F=G&&G.constructor,C=I,D,B;
if(C[0]){if((B=C[0]["preamble"])){C=B.apply(this,C)||C
}}if(B=A.prototype.preamble){C=B.apply(this,C)||C
}if(H&&H.apply){H.apply(this,C)
}if(F&&F.apply){F.apply(this,C)
}if(D=A.prototype._constructor){D.apply(this,I)
}if(this.constructor.prototype==A.prototype&&(H=this.postscript)){H.apply(this,I)
}},_findMixin:function(A){var C=this.constructor,B,D;
while(C){B=C.superclass;
D=C.mixin;
if(D==A||(D instanceof A.constructor)){return B
}if(D&&(D=D._findMixin(A))){return D
}C=B&&B.constructor
}},_findMethod:function(F,C,G,E){var A=G,B,D,H;
do{B=A.constructor;
D=B.mixin;
if(D&&(D=this._findMethod(F,C,D,E))){return D
}if((H=A[F])&&(E==(H==C))){return A
}A=B.superclass
}while(A);
return !E&&(A=this._findMixin(G))&&this._findMethod(F,C,A,E)
},inherited:function(G,F,E){var D=arguments;
if(!dojo.isString(D[0])){E=F;
F=G;
G=F.callee.nom
}var C=F.callee,B=this.constructor.prototype,D=E||F,H,A;
if(this[G]!=C||B[G]==C){A=this._findMethod(G,C,B,true);
if(!A){throw (this.declaredClass+': name argument ("'+G+'") to inherited must match callee (declare.js)')
}B=this._findMethod(G,C,A,false)
}H=B&&B[G];
if(!H){console.debug(A.declaredClass+': no inherited "'+G+'" was found (declare.js)');
return 
}return H.apply(this,D)
}}})
};