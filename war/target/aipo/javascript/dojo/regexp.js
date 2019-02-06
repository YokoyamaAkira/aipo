if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(B,A){return B.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(A&&A.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(B,E,D){if(!(B instanceof Array)){return E(B)
}var A=[];
for(var C=0;
C<B.length;
C++){A.push(E(B[C]))
}return dojo.regexp.group(A.join("|"),D)
};
dojo.regexp.group=function(B,A){return"("+(A?"?:":"")+B+")"
}
};