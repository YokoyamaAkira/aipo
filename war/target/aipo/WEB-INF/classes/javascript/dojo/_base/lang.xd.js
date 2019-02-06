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
A.isArrayLike=function(C){var B=A;
return C&&C!==undefined&&!B.isString(C)&&!B.isFunction(C)&&!(C.tagName&&C.tagName.toLowerCase()=="form")&&(B.isArray(C)||isFinite(C.length))
};
A.isAlien=function(B){return B&&!A.isFunction(B)&&/\{\s*\[native code\]\s*\}/.test(String(B))
};
A.extend=function(B,E){for(var D=1,C=arguments.length;
D<C;
D++){A._mixin(B.prototype,arguments[D])
}return B
};
A._hitchArgs=function(D,B){var E=A._toArray(arguments,2);
var C=A.isString(B);
return function(){var F=A._toArray(arguments);
var G=C?(D||A.global)[B]:B;
return G&&G.apply(D||this,E.concat(F))
}
};
A.hitch=function(C,B){if(arguments.length>2){return A._hitchArgs.apply(A,arguments)
}if(!B){B=C;
C=null
}if(A.isString(B)){C=C||A.global;
if(!C[B]){throw (['dojo.hitch: scope["',B,'"] is null (scope="',C,'")'].join(""))
}return function(){return C[B].apply(C,arguments||[])
}
}return !C?B:function(){return B.apply(C,arguments||[])
}
};
A.delegate=A._delegate=function(B,E){function C(){}C.prototype=B;
var D=new C();
if(E){A.mixin(D,E)
}return D
};
A.partial=function(B){var C=[null];
return A.hitch.apply(A,C.concat(A._toArray(arguments)))
};
A._toArray=function(F,B,E){var D=E||[];
for(var C=B||0;
C<F.length;
C++){D.push(F[C])
}return D
};
A.clone=function(B){if(!B){return B
}if(A.isArray(B)){var D=[];
for(var C=0;
C<B.length;
++C){D.push(A.clone(B[C]))
}return D
}if(!A.isObject(B)){return B
}if(B.nodeType&&B.cloneNode){return B.cloneNode(true)
}if(B instanceof Date){return new Date(B.getTime())
}var D=new B.constructor();
for(var C in B){if(!(C in D)||D[C]!=B[C]){D[C]=A.clone(B[C])
}}return D
};
A.trim=function(B){return B.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
}}});