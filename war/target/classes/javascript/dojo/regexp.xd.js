dojo._xdResourceLoaded({depends:[["provide","dojo.regexp"]],defineResource:function(A){if(!A._hasResource["dojo.regexp"]){A._hasResource["dojo.regexp"]=true;
A.provide("dojo.regexp");
A.regexp.escapeString=function(B,C){return B.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(D){if(C&&C.indexOf(D)!=-1){return D
}return"\\"+D
})
};
A.regexp.buildGroupRE=function(D,B,F){if(!(D instanceof Array)){return B(D)
}var C=[];
for(var E=0;
E<D.length;
E++){C.push(B(D[E]))
}return A.regexp.group(C.join("|"),F)
};
A.regexp.group=function(B,C){return"("+(C?"?:":"")+B+")"
}
}}});