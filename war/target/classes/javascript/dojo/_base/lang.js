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
dojo.isArrayLike=function(B){var A=dojo;
return B&&B!==undefined&&!A.isString(B)&&!A.isFunction(B)&&!(B.tagName&&B.tagName.toLowerCase()=="form")&&(A.isArray(B)||isFinite(B.length))
};
dojo.isAlien=function(A){return A&&!dojo.isFunction(A)&&/\{\s*\[native code\]\s*\}/.test(String(A))
};
dojo.extend=function(C,B){for(var A=1,D=arguments.length;
A<D;
A++){dojo._mixin(C.prototype,arguments[A])
}return C
};
dojo._hitchArgs=function(A,C){var B=dojo._toArray(arguments,2);
var D=dojo.isString(C);
return function(){var F=dojo._toArray(arguments);
var E=D?(A||dojo.global)[C]:C;
return E&&E.apply(A||this,B.concat(F))
}
};
dojo.hitch=function(B,A){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments)
}if(!A){A=B;
B=null
}if(dojo.isString(A)){B=B||dojo.global;
if(!B[A]){throw (['dojo.hitch: scope["',A,'"] is null (scope="',B,'")'].join(""))
}return function(){return B[A].apply(B,arguments||[])
}
}return !B?A:function(){return A.apply(B,arguments||[])
}
};
dojo.delegate=dojo._delegate=function(C,B){function D(){}D.prototype=C;
var A=new D();
if(B){dojo.mixin(A,B)
}return A
};
dojo.partial=function(A){var B=[null];
return dojo.hitch.apply(dojo,B.concat(dojo._toArray(arguments)))
};
dojo._toArray=function(C,D,B){var A=B||[];
for(var E=D||0;
E<C.length;
E++){A.push(C[E])
}return A
};
dojo.clone=function(B){if(!B){return B
}if(dojo.isArray(B)){var A=[];
for(var C=0;
C<B.length;
++C){A.push(dojo.clone(B[C]))
}return A
}if(!dojo.isObject(B)){return B
}if(B.nodeType&&B.cloneNode){return B.cloneNode(true)
}if(B instanceof Date){return new Date(B.getTime())
}var A=new B.constructor();
for(var C in B){if(!(C in A)||A[C]!=B[C]){A[C]=dojo.clone(B[C])
}}return A
};
dojo.trim=function(A){return A.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}
};