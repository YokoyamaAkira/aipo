dojo._xdResourceLoaded({depends:[["require","dojo._base.lang"],["provide","dojo._base.array"]],defineResource:function(A){if(!A._hasResource["dojo._base.array"]){A._hasResource["dojo._base.array"]=true;
A.require("dojo._base.lang");
A.provide("dojo._base.array");
(function(){var B=function(D,E,C){return[(A.isString(D)?D.split(""):D),(E||A.global),(A.isString(C)?(new Function("item","index","array",C)):C)]
};
A.mixin(A,{indexOf:function(E,D,I,H){var G=0,C=1,F=E.length;
if(H){G=F-1;
C=F=-1
}for(G=I||G;
G!=F;
G+=C){if(E[G]==D){return G
}}return -1
},lastIndexOf:function(E,D,C){return A.indexOf(E,D,C,true)
},forEach:function(H,F,E){if(!H||!H.length){return 
}var G=B(H,E,F);
H=G[0];
for(var D=0,C=G[0].length;
D<C;
D++){G[2].call(G[1],H[D],D,H)
}},_everyOrSome:function(C,G,D,J){var F=B(G,J,D);
G=F[0];
for(var I=0,H=G.length;
I<H;
I++){var E=!!F[2].call(F[1],G[I],I,G);
if(C^E){return E
}}return C
},every:function(C,E,D){return this._everyOrSome(true,C,E,D)
},some:function(C,E,D){return this._everyOrSome(false,C,E,D)
},map:function(H,D,E){var G=B(H,E,D);
H=G[0];
var F=((arguments[3])?(new arguments[3]()):[]);
for(var C=0;
C<H.length;
++C){F.push(G[2].call(G[1],H[C],C,H))
}return F
},filter:function(H,F,D){var G=B(H,D,F);
H=G[0];
var E=[];
for(var C=0;
C<H.length;
C++){if(G[2].call(G[1],H[C],C,H)){E.push(H[C])
}}return E
}})
})()
}}});