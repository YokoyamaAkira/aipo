if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(B,A){var C=0;
if(B>A||typeof B==="undefined"||B===null){C=1
}else{if(B<A||typeof A==="undefined"||A===null){C=-1
}}return C
};
dojo.data.util.sorter.createSortFunction=function(D,B){var F=[];
function A(G,H){return function(M,L){var K=B.getValue(M,G);
var I=B.getValue(L,G);
var J=null;
if(B.comparatorMap){if(typeof G!=="string"){G=B.getIdentity(G)
}J=B.comparatorMap[G]||dojo.data.util.sorter.basicComparator
}J=J||dojo.data.util.sorter.basicComparator;
return H*J(K,I)
}
}for(var C=0;
C<D.length;
C++){sortAttribute=D[C];
if(sortAttribute.attribute){var E=(sortAttribute.descending)?-1:1;
F.push(A(sortAttribute.attribute,E))
}}return function(H,G){var J=0;
while(J<F.length){var I=F[J++](H,G);
if(I!==0){return I
}}return 0
}
}
};