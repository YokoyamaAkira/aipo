if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(A,B){return A.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(B&&B.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(A,D,C){if(!(A instanceof Array)){return D(A)
}var E=[];
for(var B=0;
B<A.length;
B++){E.push(D(A[B]))
}return dojo.regexp.group(E.join("|"),C)
};
dojo.regexp.group=function(A,B){return"("+(B?"?:":"")+A+")"
}
};