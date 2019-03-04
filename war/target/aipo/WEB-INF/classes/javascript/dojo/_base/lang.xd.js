dojo._xdResourceLoaded({depends:[["provide","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.lang"]){A._hasResource["dojo._base.lang"]=true;
A.provide("dojo._base.lang");
A.isString=function(B){return typeof B=="string"||B instanceof String
};
A.isArray=function(B){return B&&B instanceof Array||typeof B=="array"
};
A.isFunction=(function(){var B=function(C){return typeof C=="function"||C instanceof Function
};
return A.isSafari?function(C){if(typeof C=="function"&&C=="[object NodeList]"){return false
}return B(C)
}:B
})();
A.isObject=function(B){return B!==undefined&&(B===null||typeof B=="object"||A.isArray(B)||A.isFunction(B))
};
A.isArrayLike=function(B){var C=A;
return B&&B!==undefined&&!C.isString(B)&&!C.isFunction(B)&&!(B.tagName&&B.tagName.toLowerCase()=="form")&&(C.isArray(B)||isFinite(B.length))
};
A.isAlien=function(B){return B&&!A.isFunction(B)&&/\{\s*\[native code\]\s*\}/.test(String(B))
};
A.extend=function(E,D){for(var C=1,B=arguments.length;
C<B;
C++){A._mixin(E.prototype,arguments[C])
}return E
};
A._hitchArgs=function(C,E){var D=A._toArray(arguments,2);
var B=A.isString(E);
return function(){var F=A._toArray(arguments);
var G=B?(C||A.global)[E]:E;
return G&&G.apply(C||this,D.concat(F))
}
};
A.hitch=function(B,C){if(arguments.length>2){return A._hitchArgs.apply(A,arguments)
}if(!C){C=B;
B=null
}if(A.isString(C)){B=B||A.global;
if(!B[C]){throw (['dojo.hitch: scope["',C,'"] is null (scope="',B,'")'].join(""))
}return function(){return B[C].apply(B,arguments||[])
}
}return !B?C:function(){return C.apply(B,arguments||[])
}
};
A.delegate=A._delegate=function(E,D){function B(){}B.prototype=E;
var C=new B();
if(D){A.mixin(C,D)
}return C
};
A.partial=function(C){var B=[null];
return A.hitch.apply(A,B.concat(A._toArray(arguments)))
};
A._toArray=function(E,F,D){var C=D||[];
for(var B=F||0;
B<E.length;
B++){C.push(E[B])
}return C
};
A.clone=function(D){if(!D){return D
}if(A.isArray(D)){var C=[];
for(var B=0;
B<D.length;
++B){C.push(A.clone(D[B]))
}return C
}if(!A.isObject(D)){return D
}if(D.nodeType&&D.cloneNode){return D.cloneNode(true)
}if(D instanceof Date){return new Date(D.getTime())
}var C=new D.constructor();
for(var B in D){if(!(B in C)||C[B]!=D[B]){C[B]=A.clone(D[B])
}}return C
};
A.trim=function(B){return B.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
}}});