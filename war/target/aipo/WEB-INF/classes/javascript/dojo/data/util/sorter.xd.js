dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.sorter"]],defineResource:function(A){if(!A._hasResource["dojo.data.util.sorter"]){A._hasResource["dojo.data.util.sorter"]=true;
A.provide("dojo.data.util.sorter");
A.data.util.sorter.basicComparator=function(C,B){var D=0;
if(C>B||typeof C==="undefined"||C===null){D=1
}else{if(C<B||typeof B==="undefined"||B===null){D=-1
}}return D
};
A.data.util.sorter.createSortFunction=function(E,C){var G=[];
function B(H,I){return function(N,M){var L=C.getValue(N,H);
var J=C.getValue(M,H);
var K=null;
if(C.comparatorMap){if(typeof H!=="string"){H=C.getIdentity(H)
}K=C.comparatorMap[H]||A.data.util.sorter.basicComparator
}K=K||A.data.util.sorter.basicComparator;
return I*K(L,J)
}
}for(var D=0;
D<E.length;
D++){sortAttribute=E[D];
if(sortAttribute.attribute){var F=(sortAttribute.descending)?-1:1;
G.push(B(sortAttribute.attribute,F))
}}return function(I,H){var K=0;
while(K<G.length){var J=G[K++](I,H);
if(J!==0){return J
}}return 0
}
}
}}});