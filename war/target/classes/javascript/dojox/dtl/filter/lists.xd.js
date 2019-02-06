dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.lists"],["require","dojox.dtl._base"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.lists"]){A._hasResource["dojox.dtl.filter.lists"]=true;
A.provide("dojox.dtl.filter.lists");
A.require("dojox.dtl._base");
A.mixin(dojox.dtl.filter.lists,{_dictsort:function(B,C){if(B[0]==C[0]){return 0
}return(B[0]<C[0])?-1:1
},dictsort:function(C,G){if(!G){return C
}var B=[];
for(var E in C){B.push([dojox.dtl.resolveVariable("var."+G,new dojox.dtl.Context({"var":C[E]})),C[E]])
}B.sort(dojox.dtl.filter.lists._dictsort);
var H=[];
for(var D=0,F;
F=B[D];
D++){H.push(F[1])
}return H
},dictsortreversed:function(B,C){if(!C){return B
}var D=dojox.dtl.filter.lists.dictsort(B,C);
return D.reverse()
},first:function(B){return(B.length)?B[0]:""
},join:function(B,C){return B.join(C||",")
},length:function(B){return(isNaN(B.length))?(B+"").length:B.length
},length_is:function(B,C){return B.length==parseInt(C)
},random:function(B){return B[Math.floor(Math.random()*B.length)]
},slice:function(F,C){C=C||"";
var B=C.split(":");
var E=[];
for(var D=0;
D<B.length;
D++){if(!B[D].length){E.push(null)
}else{E.push(parseInt(B[D]))
}}if(E[0]===null){E[0]=0
}if(E[0]<0){E[0]=F.length+E[0]
}if(E.length<2||E[1]===null){E[1]=F.length
}if(E[1]<0){E[1]=F.length+E[1]
}return F.slice(E[0],E[1])
},_unordered_list:function(G,E){var C=dojox.dtl.filter.lists;
var B="";
for(var D=0;
D<E;
D++){B+="\t"
}if(G[1]&&G[1].length){var F=[];
for(var D=0;
D<G[1].length;
D++){F.push(C._unordered_list(G[1][D],E+1))
}return B+"<li>"+G[0]+"\n"+B+"<ul>\n"+F.join("\n")+"\n"+B+"</ul>\n"+B+"</li>"
}else{return B+"<li>"+G[0]+"</li>"
}},unordered_list:function(B){return dojox.dtl.filter.lists._unordered_list(B,1)
}})
}}});