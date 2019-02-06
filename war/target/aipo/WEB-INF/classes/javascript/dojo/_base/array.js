if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;
dojo.require("dojo._base.lang");
dojo.provide("dojo._base.array");
(function(){var A=function(D,B,C){return[(dojo.isString(D)?D.split(""):D),(B||dojo.global),(dojo.isString(C)?(new Function("item","index","array",C)):C)]
};
dojo.mixin(dojo,{indexOf:function(C,F,D,B){var H=0,E=1,G=C.length;
if(B){H=G-1;
E=G=-1
}for(H=D||H;
H!=G;
H+=E){if(C[H]==F){return H
}}return -1
},lastIndexOf:function(B,D,C){return dojo.indexOf(B,D,C,true)
},forEach:function(D,C,G){if(!D||!D.length){return 
}var B=A(D,G,C);
D=B[0];
for(var F=0,E=B[0].length;
F<E;
F++){B[2].call(B[1],D[F],F,D)
}},_everyOrSome:function(E,H,C,D){var G=A(H,D,C);
H=G[0];
for(var B=0,I=H.length;
B<I;
B++){var F=!!G[2].call(G[1],H[B],B,H);
if(E^F){return F
}}return E
},every:function(C,B,D){return this._everyOrSome(true,C,B,D)
},some:function(C,B,D){return this._everyOrSome(false,C,B,D)
},map:function(D,F,G){var C=A(D,G,F);
D=C[0];
var B=((arguments[3])?(new arguments[3]()):[]);
for(var E=0;
E<D.length;
++E){B.push(C[2].call(C[1],D[E],E,D))
}return B
},filter:function(D,C,F){var B=A(D,F,C);
D=B[0];
var G=[];
for(var E=0;
E<D.length;
E++){if(B[2].call(B[1],D[E],E,D)){G.push(D[E])
}}return G
}})
})()
};