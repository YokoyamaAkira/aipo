if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(A,C){var B=0;
if(A>C||typeof A==="undefined"||A===null){B=1
}else{if(A<C||typeof C==="undefined"||C===null){B=-1
}}return B
};
dojo.data.util.sorter.createSortFunction=function(C,A){var E=[];
function F(H,G){return function(M,L){var K=A.getValue(M,H);
var I=A.getValue(L,H);
var J=null;
if(A.comparatorMap){if(typeof H!=="string"){H=A.getIdentity(H)
}J=A.comparatorMap[H]||dojo.data.util.sorter.basicComparator
}J=J||dojo.data.util.sorter.basicComparator;
return G*J(K,I)
}
}for(var B=0;
B<C.length;
B++){sortAttribute=C[B];
if(sortAttribute.attribute){var D=(sortAttribute.descending)?-1:1;
E.push(F(sortAttribute.attribute,D))
}}return function(I,H){var G=0;
while(G<E.length){var J=E[G++](I,H);
if(J!==0){return J
}}return 0
}
}
};