dojo._xdResourceLoaded({depends:[["provide","dojo.i18n"]],defineResource:function(A){if(!A._hasResource["dojo.i18n"]){A._hasResource["dojo.i18n"]=true;
A.provide("dojo.i18n");
A.i18n.getLocalization=function(C,D,I){I=A.i18n.normalizeLocale(I);
var B=I.split("-");
var E=[C,"nls",D].join(".");
var K=A._loadedModules[E];
if(K){var J;
for(var F=B.length;
F>0;
F--){var H=B.slice(0,F).join("_");
if(K[H]){J=K[H];
break
}}if(!J){J=K.ROOT
}if(J){var G=function(){};
G.prototype=J;
return new G()
}}throw new Error("Bundle not found: "+D+" in "+C+" , locale="+I)
};
A.i18n.normalizeLocale=function(C){var B=C?C.toLowerCase():A.locale;
if(B=="root"){B="ROOT"
}return B
};
A.i18n._requireLocalization=function(B,C,P,L){var I=A.i18n.normalizeLocale(P);
var F=[B,"nls",C].join(".");
var E="";
if(L){var O=L.split(",");
for(var J=0;
J<O.length;
J++){if(I.indexOf(O[J])==0){if(O[J].length>E.length){E=O[J]
}}}if(!E){E="ROOT"
}}var M=L?E:I;
var R=A._loadedModules[F];
var D=null;
if(R){if(djConfig.localizationComplete&&R._built){return 
}var H=M.replace(/-/g,"_");
var N=F+"."+H;
D=A._loadedModules[N]
}if(!D){R=A.provide(F);
var G=A._getModuleSymbols(B);
var K=G.concat("nls").join("/");
var Q;
A.i18n._searchLocalePath(M,L,function(W){var X=W.replace(/-/g,"_");
var V=F+"."+X;
var T=false;
if(!A._loadedModules[V]){A.provide(V);
var U=[K];
if(W!="ROOT"){U.push(W)
}U.push(C);
var S=U.join("/")+".js";
T=A._loadPath(S,null,function(a){var Z=function(){};
Z.prototype=Q;
R[X]=new Z();
for(var Y in a){R[X][Y]=a[Y]
}})
}else{T=true
}if(T&&R[X]){Q=R[X]
}else{R[X]=Q
}if(L){return true
}})
}if(L&&I!=E){R[I.replace(/-/g,"_")]=R[E.replace(/-/g,"_")]
}};
(function(){var B=djConfig.extraLocale;
if(B){if(!B instanceof Array){B=[B]
}var C=A.i18n._requireLocalization;
A.i18n._requireLocalization=function(F,E,D,H){C(F,E,D,H);
if(D){return 
}for(var G=0;
G<B.length;
G++){C(F,E,B[G],H)
}}
}})();
A.i18n._searchLocalePath=function(I,J,D){I=A.i18n.normalizeLocale(I);
var B=I.split("-");
var C=[];
for(var F=B.length;
F>0;
F--){C.push(B.slice(0,F).join("-"))
}C.push(false);
if(J){C.reverse()
}for(var E=C.length-1;
E>=0;
E--){var G=C[E]||"ROOT";
var H=D(G);
if(H){break
}}};
A.i18n._preloadLocalizations=function(F,C){function D(G){G=A.i18n.normalizeLocale(G);
A.i18n._searchLocalePath(G,true,function(I){for(var H=0;
H<C.length;
H++){if(C[H]==I){A.require(F+"_"+I);
return true
}}return false
})
}D();
var B=djConfig.extraLocale||[];
for(var E=0;
E<B.length;
E++){D(B[E])
}}
}}});