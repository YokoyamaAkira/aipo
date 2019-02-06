if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.sorter");
dojo.data.util.simpleFetch.fetch=function(C){C=C||{};
if(!C.store){C.store=this
}var A=this;
var B=function(E,F){if(F.onError){var G=F.scope||dojo.global;
F.onError.call(G,E,F)
}};
var D=function(M,N){var G=N.abort||null;
var I=false;
var E=N.start?N.start:0;
var L=N.count?(E+N.count):M.length;
N.abort=function(){I=true;
if(G){G.call(N)
}};
var H=N.scope||dojo.global;
if(!N.store){N.store=A
}if(N.onBegin){N.onBegin.call(H,M.length,N)
}if(N.sort){M.sort(dojo.data.util.sorter.createSortFunction(N.sort,A))
}if(N.onItem){for(var K=E;
(K<M.length)&&(K<L);
++K){var F=M[K];
if(!I){N.onItem.call(H,F,N)
}}}if(N.onComplete&&!I){var J=null;
if(!N.onItem){J=M.slice(E,L)
}N.onComplete.call(H,J,N)
}};
this._fetchItems(C,D,B);
return C
}
};