dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.simpleFetch"],["require","dojo.data.util.sorter"]],defineResource:function(A){if(!A._hasResource["dojo.data.util.simpleFetch"]){A._hasResource["dojo.data.util.simpleFetch"]=true;
A.provide("dojo.data.util.simpleFetch");
A.require("dojo.data.util.sorter");
A.data.util.simpleFetch.fetch=function(E){E=E||{};
if(!E.store){E.store=this
}var C=this;
var D=function(H,F){if(F.onError){var G=F.scope||A.global;
F.onError.call(G,H,F)
}};
var B=function(J,K){var N=K.abort||null;
var F=false;
var L=K.start?K.start:0;
var I=K.count?(L+K.count):J.length;
K.abort=function(){F=true;
if(N){N.call(K)
}};
var O=K.scope||A.global;
if(!K.store){K.store=C
}if(K.onBegin){K.onBegin.call(O,J.length,K)
}if(K.sort){J.sort(A.data.util.sorter.createSortFunction(K.sort,C))
}if(K.onItem){for(var H=L;
(H<J.length)&&(H<I);
++H){var M=J[H];
if(!F){K.onItem.call(O,M,K)
}}}if(K.onComplete&&!F){var G=null;
if(!K.onItem){G=J.slice(L,I)
}K.onComplete.call(O,G,K)
}};
this._fetchItems(E,B,D);
return E
}
}}});