dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.sorter"]],defineResource:function(A){if(!A._hasResource["dojo.data.util.sorter"]){A._hasResource["dojo.data.util.sorter"]=true;
A.provide("dojo.data.util.sorter");
A.data.util.sorter.basicComparator=function(D,C){var B=0;
if(D>C||typeof D==="undefined"||D===null){B=1
}else{if(D<C||typeof C==="undefined"||C===null){B=-1
}}return B
};
A.data.util.sorter.createSortFunction=function(F,D){var C=[];
function B(H,I){return function(N,M){var L=D.getValue(N,H);
var J=D.getValue(M,H);
var K=null;
if(D.comparatorMap){if(typeof H!=="string"){H=D.getIdentity(H)
}K=D.comparatorMap[H]||A.data.util.sorter.basicComparator
}K=K||A.data.util.sorter.basicComparator;
return I*K(L,J)
}
}for(var E=0;
E<F.length;
E++){sortAttribute=F[E];
if(sortAttribute.attribute){var G=(sortAttribute.descending)?-1:1;
C.push(B(sortAttribute.attribute,G))
}}return function(I,H){var K=0;
while(K<C.length){var J=C[K++](I,H);
if(J!==0){return J
}}return 0
}
}
}}});