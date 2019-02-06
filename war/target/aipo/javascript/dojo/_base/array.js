if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;
dojo.require("dojo._base.lang");
dojo.provide("dojo._base.array");
(function(){var A=function(C,D,B){return[(dojo.isString(C)?C.split(""):C),(D||dojo.global),(dojo.isString(B)?(new Function("item","index","array",B)):B)]
};
dojo.mixin(dojo,{indexOf:function(H,G,E,D){var C=0,F=1,B=H.length;
if(D){C=B-1;
F=B=-1
}for(C=E||C;
C!=B;
C+=F){if(H[C]==G){return C
}}return -1
},lastIndexOf:function(D,C,B){return dojo.indexOf(D,C,B,true)
},forEach:function(C,G,F){if(!C||!C.length){return 
}var B=A(C,F,G);
C=B[0];
for(var E=0,D=B[0].length;
E<D;
E++){B[2].call(B[1],C[E],E,C)
}},_everyOrSome:function(H,D,I,G){var C=A(D,G,I);
D=C[0];
for(var F=0,E=D.length;
F<E;
F++){var B=!!C[2].call(C[1],D[F],F,D);
if(H^B){return B
}}return H
},every:function(B,D,C){return this._everyOrSome(true,B,D,C)
},some:function(B,D,C){return this._everyOrSome(false,B,D,C)
},map:function(C,E,F){var B=A(C,F,E);
C=B[0];
var G=((arguments[3])?(new arguments[3]()):[]);
for(var D=0;
D<C.length;
++D){G.push(B[2].call(B[1],C[D],D,C))
}return G
},filter:function(C,G,E){var B=A(C,E,G);
C=B[0];
var F=[];
for(var D=0;
D<C.length;
D++){if(B[2].call(B[1],C[D],D,C)){F.push(C[D])
}}return F
}})
})()
};