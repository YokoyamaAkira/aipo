if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(A){return typeof A=="string"||A instanceof String
};
dojo.isArray=function(A){return A&&A instanceof Array||typeof A=="array"
};
dojo.isFunction=(function(){var A=function(B){return typeof B=="function"||B instanceof Function
};
return dojo.isSafari?function(B){if(typeof B=="function"&&B=="[object NodeList]"){return false
}return A(B)
}:A
})();
dojo.isObject=function(A){return A!==undefined&&(A===null||typeof A=="object"||dojo.isArray(A)||dojo.isFunction(A))
};
dojo.isArrayLike=function(A){var B=dojo;
return A&&A!==undefined&&!B.isString(A)&&!B.isFunction(A)&&!(A.tagName&&A.tagName.toLowerCase()=="form")&&(B.isArray(A)||isFinite(A.length))
};
dojo.isAlien=function(A){return A&&!dojo.isFunction(A)&&/\{\s*\[native code\]\s*\}/.test(String(A))
};
dojo.extend=function(D,C){for(var B=1,A=arguments.length;
B<A;
B++){dojo._mixin(D.prototype,arguments[B])
}return D
};
dojo._hitchArgs=function(B,D){var C=dojo._toArray(arguments,2);
var A=dojo.isString(D);
return function(){var E=dojo._toArray(arguments);
var F=A?(B||dojo.global)[D]:D;
return F&&F.apply(B||this,C.concat(E))
}
};
dojo.hitch=function(A,B){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments)
}if(!B){B=A;
A=null
}if(dojo.isString(B)){A=A||dojo.global;
if(!A[B]){throw (['dojo.hitch: scope["',B,'"] is null (scope="',A,'")'].join(""))
}return function(){return A[B].apply(A,arguments||[])
}
}return !A?B:function(){return B.apply(A,arguments||[])
}
};
dojo.delegate=dojo._delegate=function(D,C){function A(){}A.prototype=D;
var B=new A();
if(C){dojo.mixin(B,C)
}return B
};
dojo.partial=function(B){var A=[null];
return dojo.hitch.apply(dojo,A.concat(dojo._toArray(arguments)))
};
dojo._toArray=function(D,E,C){var B=C||[];
for(var A=E||0;
A<D.length;
A++){B.push(D[A])
}return B
};
dojo.clone=function(C){if(!C){return C
}if(dojo.isArray(C)){var B=[];
for(var A=0;
A<C.length;
++A){B.push(dojo.clone(C[A]))
}return B
}if(!dojo.isObject(C)){return C
}if(C.nodeType&&C.cloneNode){return C.cloneNode(true)
}if(C instanceof Date){return new Date(C.getTime())
}var B=new C.constructor();
for(var A in C){if(!(A in B)||B[A]!=C[A]){B[A]=dojo.clone(C[A])
}}return B
};
dojo.trim=function(A){return A.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
};