dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.simpleFetch"],["require","dojo.data.util.sorter"]],defineResource:function(A){if(!A._hasResource["dojo.data.util.simpleFetch"]){A._hasResource["dojo.data.util.simpleFetch"]=true;
A.provide("dojo.data.util.simpleFetch");
A.require("dojo.data.util.sorter");
A.data.util.simpleFetch.fetch=function(B){B=B||{};
if(!B.store){B.store=this
}var D=this;
var E=function(H,F){if(F.onError){var G=F.scope||A.global;
F.onError.call(G,H,F)
}};
var C=function(L,M){var F=M.abort||null;
var H=false;
var N=M.start?M.start:0;
var K=M.count?(N+M.count):L.length;
M.abort=function(){H=true;
if(F){F.call(M)
}};
var G=M.scope||A.global;
if(!M.store){M.store=D
}if(M.onBegin){M.onBegin.call(G,L.length,M)
}if(M.sort){L.sort(A.data.util.sorter.createSortFunction(M.sort,D))
}if(M.onItem){for(var J=N;
(J<L.length)&&(J<K);
++J){var O=L[J];
if(!H){M.onItem.call(G,O,M)
}}}if(M.onComplete&&!H){var I=null;
if(!M.onItem){I=L.slice(N,K)
}M.onComplete.call(G,I,M)
}};
this._fetchItems(B,C,E);
return B
}
}}});