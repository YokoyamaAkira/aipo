if(!dojo._hasResource["dojox.dtl.filter.lists"]){dojo._hasResource["dojox.dtl.filter.lists"]=true;
dojo.provide("dojox.dtl.filter.lists");
dojo.require("dojox.dtl._base");
dojo.mixin(dojox.dtl.filter.lists,{_dictsort:function(B,A){if(B[0]==A[0]){return 0
}return(B[0]<A[0])?-1:1
},dictsort:function(G,A){if(!A){return G
}var C=[];
for(var E in G){C.push([dojox.dtl.resolveVariable("var."+A,new dojox.dtl.Context({"var":G[E]})),G[E]])
}C.sort(dojox.dtl.filter.lists._dictsort);
var B=[];
for(var D=0,F;
F=C[D];
D++){B.push(F[1])
}return B
},dictsortreversed:function(C,A){if(!A){return C
}var B=dojox.dtl.filter.lists.dictsort(C,A);
return B.reverse()
},first:function(A){return(A.length)?A[0]:""
},join:function(B,A){return B.join(A||",")
},length:function(A){return(isNaN(A.length))?(A+"").length:A.length
},length_is:function(B,A){return B.length==parseInt(A)
},random:function(A){return A[Math.floor(Math.random()*A.length)]
},slice:function(D,A){A=A||"";
var E=A.split(":");
var C=[];
for(var B=0;
B<E.length;
B++){if(!E[B].length){C.push(null)
}else{C.push(parseInt(E[B]))
}}if(C[0]===null){C[0]=0
}if(C[0]<0){C[0]=D.length+C[0]
}if(C.length<2||C[1]===null){C[1]=D.length
}if(C[1]<0){C[1]=D.length+C[1]
}return D.slice(C[0],C[1])
},_unordered_list:function(E,C){var F=dojox.dtl.filter.lists;
var A="";
for(var B=0;
B<C;
B++){A+="\t"
}if(E[1]&&E[1].length){var D=[];
for(var B=0;
B<E[1].length;
B++){D.push(F._unordered_list(E[1][B],C+1))
}return A+"<li>"+E[0]+"\n"+A+"<ul>\n"+D.join("\n")+"\n"+A+"</ul>\n"+A+"</li>"
}else{return A+"<li>"+E[0]+"</li>"
}},unordered_list:function(A){return dojox.dtl.filter.lists._unordered_list(A,1)
}})
};