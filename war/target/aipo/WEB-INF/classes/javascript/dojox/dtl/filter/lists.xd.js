dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.lists"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.lists"]){A._hasResource["dojox.dtl.filter.lists"]=true;
A.provide("dojox.dtl.filter.lists");
A.require("dojox.dtl._base");
A.mixin(dojox.dtl.filter.lists,{_dictsort:function(C,B){if(C[0]==B[0]){return 0
}return(C[0]<B[0])?-1:1
},dictsort:function(H,B){if(!B){return H
}var D=[];
for(var F in H){D.push([dojox.dtl.resolveVariable("var."+B,new dojox.dtl.Context({"var":H[F]})),H[F]])
}D.sort(dojox.dtl.filter.lists._dictsort);
var C=[];
for(var E=0,G;
G=D[E];
E++){C.push(G[1])
}return C
},dictsortreversed:function(D,B){if(!B){return D
}var C=dojox.dtl.filter.lists.dictsort(D,B);
return C.reverse()
},first:function(B){return(B.length)?B[0]:""
},join:function(C,B){return C.join(B||",")
},length:function(B){return(isNaN(B.length))?(B+"").length:B.length
},length_is:function(C,B){return C.length==parseInt(B)
},random:function(B){return B[Math.floor(Math.random()*B.length)]
},slice:function(E,B){B=B||"";
var F=B.split(":");
var D=[];
for(var C=0;
C<F.length;
C++){if(!F[C].length){D.push(null)
}else{D.push(parseInt(F[C]))
}}if(D[0]===null){D[0]=0
}if(D[0]<0){D[0]=E.length+D[0]
}if(D.length<2||D[1]===null){D[1]=E.length
}if(D[1]<0){D[1]=E.length+D[1]
}return E.slice(D[0],D[1])
},_unordered_list:function(F,D){var G=dojox.dtl.filter.lists;
var B="";
for(var C=0;
C<D;
C++){B+="\t"
}if(F[1]&&F[1].length){var E=[];
for(var C=0;
C<F[1].length;
C++){E.push(G._unordered_list(F[1][C],D+1))
}return B+"<li>"+F[0]+"\n"+B+"<ul>\n"+E.join("\n")+"\n"+B+"</ul>\n"+B+"</li>"
}else{return B+"<li>"+F[0]+"</li>"
}},unordered_list:function(B){return dojox.dtl.filter.lists._unordered_list(B,1)
}})
}}});