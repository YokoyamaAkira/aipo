dojo._xdResourceLoaded({depends:[["provide","dojo._base.declare"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.declare"]){A._hasResource["dojo._base.declare"]=true;
A.provide("dojo._base.declare");
A.require("dojo._base.lang");
A.declare=function(E,K,G){if(A.isFunction(G)||(arguments.length>3)){A.deprecated("dojo.declare: for class '"+E+"' pass initializer function as 'constructor' property instead of as a separate argument.","","1.0");
var F=G;
G=arguments[3]||{};
G.constructor=F
}var J=arguments.callee,D=null;
if(A.isArray(K)){D=K;
K=D.shift()
}if(D){for(var C=0,B;
C<D.length;
C++){B=D[C];
if(!B){throw ("Mixin #"+C+" to declaration of "+E+" is null. It's likely a required module is not loaded.")
}K=J._delegate(K,B)
}}var L=(G||0).constructor,I=J._delegate(K),H;
for(var C in G){if(A.isFunction(H=G[C])&&(!0[C])){H.nom=C
}}A.extend(I,{declaredClass:E,_constructor:L,preamble:null},G||0);
I.prototype.constructor=I;
return A.setObject(E,I)
};
A.mixin(A.declare,{_delegate:function(F,B){var E=(F||0).prototype,D=(B||0).prototype;
var C=A.declare._makeCtor();
A.mixin(C,{superclass:E,mixin:D,extend:A.declare._extend});
if(F){C.prototype=A._delegate(E)
}A.extend(C,A.declare._core,D||0,{_constructor:null,preamble:null});
C.prototype.constructor=C;
C.prototype.declaredClass=(E||0).declaredClass+"_"+(D||0).declaredClass;
return C
},_extend:function(C){for(var B in C){if(A.isFunction(fn=C[B])&&(!0[B])){fn.nom=B
}}A.extend(this,C)
},_makeCtor:function(){return function(){this._construct(arguments)
}
},_core:{_construct:function(E){var F=E.callee,J=F.superclass,D=J&&J.constructor,C=F.mixin,B=C&&C.constructor,H=E,I,G;
if(H[0]){if((G=H[0]["preamble"])){H=G.apply(this,H)||H
}}if(G=F.prototype.preamble){H=G.apply(this,H)||H
}if(D&&D.apply){D.apply(this,H)
}if(B&&B.apply){B.apply(this,H)
}if(I=F.prototype._constructor){I.apply(this,E)
}if(this.constructor.prototype==F.prototype&&(D=this.postscript)){D.apply(this,E)
}},_findMixin:function(C){var E=this.constructor,D,B;
while(E){D=E.superclass;
B=E.mixin;
if(B==C||(B instanceof C.constructor)){return D
}if(B&&(B=B._findMixin(C))){return B
}E=D&&D.constructor
}},_findMethod:function(D,I,E,C){var G=E,H,B,F;
do{H=G.constructor;
B=H.mixin;
if(B&&(B=this._findMethod(D,I,B,C))){return B
}if((F=G[D])&&(C==(F==I))){return G
}G=H.superclass
}while(G);
return !C&&(G=this._findMixin(E))&&this._findMethod(D,I,G,C)
},inherited:function(E,D,C){var B=arguments;
if(!A.isString(B[0])){C=D;
D=E;
E=D.callee.nom
}var I=D.callee,H=this.constructor.prototype,B=C||D,F,G;
if(this[E]!=I||H[E]==I){G=this._findMethod(E,I,H,true);
if(!G){throw (this.declaredClass+': name argument ("'+E+'") to inherited must match callee (declare.js)')
}H=this._findMethod(E,I,G,false)
}F=H&&H[E];
if(!F){console.debug(G.declaredClass+': no inherited "'+E+'" was found (declare.js)');
return 
}return F.apply(this,B)
}}})
}}});