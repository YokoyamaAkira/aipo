dojo._xdResourceLoaded({depends:[["require","dojo._base.lang"],["provide","dojo._base.array"]],defineResource:function(A){if(!A._hasResource["dojo._base.array"]){A._hasResource["dojo._base.array"]=true;
A.require("dojo._base.lang");
A.provide("dojo._base.array");
(function(){var B=function(D,E,C){return[(A.isString(D)?D.split(""):D),(E||A.global),(A.isString(C)?(new Function("item","index","array",C)):C)]
};
A.mixin(A,{indexOf:function(I,H,F,E){var D=0,G=1,C=I.length;
if(E){D=C-1;
G=C=-1
}for(D=F||D;
D!=C;
D+=G){if(I[D]==H){return D
}}return -1
},lastIndexOf:function(E,D,C){return A.indexOf(E,D,C,true)
},forEach:function(D,H,G){if(!D||!D.length){return 
}var C=B(D,G,H);
D=C[0];
for(var F=0,E=C[0].length;
F<E;
F++){C[2].call(C[1],D[F],F,D)
}},_everyOrSome:function(I,E,J,H){var D=B(E,H,J);
E=D[0];
for(var G=0,F=E.length;
G<F;
G++){var C=!!D[2].call(D[1],E[G],G,E);
if(I^C){return C
}}return I
},every:function(C,E,D){return this._everyOrSome(true,C,E,D)
},some:function(C,E,D){return this._everyOrSome(false,C,E,D)
},map:function(D,F,G){var C=B(D,G,F);
D=C[0];
var H=((arguments[3])?(new arguments[3]()):[]);
for(var E=0;
E<D.length;
++E){H.push(C[2].call(C[1],D[E],E,D))
}return H
},filter:function(D,H,F){var C=B(D,F,H);
D=C[0];
var G=[];
for(var E=0;
E<D.length;
E++){if(C[2].call(C[1],D[E],E,D)){G.push(D[E])
}}return G
}})
})()
}}});