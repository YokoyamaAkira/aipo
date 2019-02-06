if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.sorter");
dojo.data.util.simpleFetch.fetch=function(D){D=D||{};
if(!D.store){D.store=this
}var B=this;
var C=function(G,E){if(E.onError){var F=E.scope||dojo.global;
E.onError.call(F,G,E)
}};
var A=function(I,J){var M=J.abort||null;
var E=false;
var K=J.start?J.start:0;
var H=J.count?(K+J.count):I.length;
J.abort=function(){E=true;
if(M){M.call(J)
}};
var N=J.scope||dojo.global;
if(!J.store){J.store=B
}if(J.onBegin){J.onBegin.call(N,I.length,J)
}if(J.sort){I.sort(dojo.data.util.sorter.createSortFunction(J.sort,B))
}if(J.onItem){for(var G=K;
(G<I.length)&&(G<H);
++G){var L=I[G];
if(!E){J.onItem.call(N,L,J)
}}}if(J.onComplete&&!E){var F=null;
if(!J.onItem){F=I.slice(K,H)
}J.onComplete.call(N,F,J)
}};
this._fetchItems(D,A,C);
return D
}
};