dojo._xdResourceLoaded({depends:[["provide","dojo.i18n"]],defineResource:function(A){if(!A._hasResource["dojo.i18n"]){A._hasResource["dojo.i18n"]=true;
A.provide("dojo.i18n");
A.i18n.getLocalization=function(K,B,G){G=A.i18n.normalizeLocale(G);
var J=G.split("-");
var C=[K,"nls",B].join(".");
var I=A._loadedModules[C];
if(I){var H;
for(var D=J.length;
D>0;
D--){var F=J.slice(0,D).join("_");
if(I[F]){H=I[F];
break
}}if(!H){H=I.ROOT
}if(H){var E=function(){};
E.prototype=H;
return new E()
}}throw new Error("Bundle not found: "+B+" in "+K+" , locale="+G)
};
A.i18n.normalizeLocale=function(B){var C=B?B.toLowerCase():A.locale;
if(C=="root"){C="ROOT"
}return C
};
A.i18n._requireLocalization=function(I,J,F,R){var O=A.i18n.normalizeLocale(F);
var L=[I,"nls",J].join(".");
var K="";
if(R){var E=R.split(",");
for(var P=0;
P<E.length;
P++){if(O.indexOf(E[P])==0){if(E[P].length>K.length){K=E[P]
}}}if(!K){K="ROOT"
}}var B=R?K:O;
var H=A._loadedModules[L];
var D=null;
if(H){if(djConfig.localizationComplete&&H._built){return 
}var N=B.replace(/-/g,"_");
var C=L+"."+N;
D=A._loadedModules[C]
}if(!D){H=A.provide(L);
var M=A._getModuleSymbols(I);
var Q=M.concat("nls").join("/");
var G;
A.i18n._searchLocalePath(B,R,function(X){var S=X.replace(/-/g,"_");
var W=L+"."+S;
var U=false;
if(!A._loadedModules[W]){A.provide(W);
var V=[Q];
if(X!="ROOT"){V.push(X)
}V.push(J);
var T=V.join("/")+".js";
U=A._loadPath(T,null,function(a){var Z=function(){};
Z.prototype=G;
H[S]=new Z();
for(var Y in a){H[S][Y]=a[Y]
}})
}else{U=true
}if(U&&H[S]){G=H[S]
}else{H[S]=G
}if(R){return true
}})
}if(R&&O!=K){H[O.replace(/-/g,"_")]=H[K.replace(/-/g,"_")]
}};
(function(){var C=djConfig.extraLocale;
if(C){if(!C instanceof Array){C=[C]
}var B=A.i18n._requireLocalization;
A.i18n._requireLocalization=function(F,E,D,H){B(F,E,D,H);
if(D){return 
}for(var G=0;
G<C.length;
G++){B(F,E,C[G],H)
}}
}})();
A.i18n._searchLocalePath=function(G,H,B){G=A.i18n.normalizeLocale(G);
var I=G.split("-");
var J=[];
for(var D=I.length;
D>0;
D--){J.push(I.slice(0,D).join("-"))
}J.push(false);
if(H){J.reverse()
}for(var C=J.length-1;
C>=0;
C--){var E=J[C]||"ROOT";
var F=B(E);
if(F){break
}}};
A.i18n._preloadLocalizations=function(B,D){function E(G){G=A.i18n.normalizeLocale(G);
A.i18n._searchLocalePath(G,true,function(I){for(var H=0;
H<D.length;
H++){if(D[H]==I){A.require(B+"_"+I);
return true
}}return false
})
}E();
var C=djConfig.extraLocale||[];
for(var F=0;
F<C.length;
F++){E(C[F])
}}
}}});