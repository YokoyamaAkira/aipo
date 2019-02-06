if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(H,I,D){D=dojo.i18n.normalizeLocale(D);
var G=D.split("-");
var J=[H,"nls",I].join(".");
var F=dojo._loadedModules[J];
if(F){var E;
for(var A=G.length;
A>0;
A--){var C=G.slice(0,A).join("_");
if(F[C]){E=F[C];
break
}}if(!E){E=F.ROOT
}if(E){var B=function(){};
B.prototype=E;
return new B()
}}throw new Error("Bundle not found: "+I+" in "+H+" , locale="+D)
};
dojo.i18n.normalizeLocale=function(A){var B=A?A.toLowerCase():dojo.locale;
if(B=="root"){B="ROOT"
}return B
};
dojo.i18n._requireLocalization=function(F,G,C,P){var M=dojo.i18n.normalizeLocale(C);
var J=[F,"nls",G].join(".");
var I="";
if(P){var B=P.split(",");
for(var N=0;
N<B.length;
N++){if(M.indexOf(B[N])==0){if(B[N].length>I.length){I=B[N]
}}}if(!I){I="ROOT"
}}var Q=P?I:M;
var E=dojo._loadedModules[J];
var H=null;
if(E){if(djConfig.localizationComplete&&E._built){return 
}var L=Q.replace(/-/g,"_");
var A=J+"."+L;
H=dojo._loadedModules[A]
}if(!H){E=dojo.provide(J);
var K=dojo._getModuleSymbols(F);
var O=K.concat("nls").join("/");
var D;
dojo.i18n._searchLocalePath(Q,P,function(W){var R=W.replace(/-/g,"_");
var V=J+"."+R;
var T=false;
if(!dojo._loadedModules[V]){dojo.provide(V);
var U=[O];
if(W!="ROOT"){U.push(W)
}U.push(G);
var S=U.join("/")+".js";
T=dojo._loadPath(S,null,function(Z){var Y=function(){};
Y.prototype=D;
E[R]=new Y();
for(var X in Z){E[R][X]=Z[X]
}})
}else{T=true
}if(T&&E[R]){D=E[R]
}else{E[R]=D
}if(P){return true
}})
}if(P&&M!=I){E[M.replace(/-/g,"_")]=E[I.replace(/-/g,"_")]
}};
(function(){var B=djConfig.extraLocale;
if(B){if(!B instanceof Array){B=[B]
}var A=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(F,E,D,C){A(F,E,D,C);
if(D){return 
}for(var G=0;
G<B.length;
G++){A(F,E,B[G],C)
}}
}})();
dojo.i18n._searchLocalePath=function(D,E,H){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var G=[];
for(var A=F.length;
A>0;
A--){G.push(F.slice(0,A).join("-"))
}G.push(false);
if(E){G.reverse()
}for(var I=G.length-1;
I>=0;
I--){var B=G[I]||"ROOT";
var C=H(B);
if(C){break
}}};
dojo.i18n._preloadLocalizations=function(D,A){function B(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<A.length;
G++){if(A[G]==H){dojo.require(D+"_"+H);
return true
}}return false
})
}B();
var E=djConfig.extraLocale||[];
for(var C=0;
C<E.length;
C++){B(E[C])
}}
};