dojo._xdResourceLoaded({depends:[["provide","dojo.regexp"]],defineResource:function(A){if(!A._hasResource["dojo.regexp"]){A._hasResource["dojo.regexp"]=true;
A.provide("dojo.regexp");
A.regexp.escapeString=function(C,B){return C.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(D){if(B&&B.indexOf(D)!=-1){return D
}return"\\"+D
})
};
A.regexp.buildGroupRE=function(C,F,E){if(!(C instanceof Array)){return F(C)
}var B=[];
for(var D=0;
D<C.length;
D++){B.push(F(C[D]))
}return A.regexp.group(B.join("|"),E)
};
A.regexp.group=function(C,B){return"("+(B?"?:":"")+C+")"
}
}}});