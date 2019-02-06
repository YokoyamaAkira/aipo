if(!dojo._hasResource["dojox.dtl.filter.lists"]){dojo._hasResource["dojox.dtl.filter.lists"]=true;
dojo.provide("dojox.dtl.filter.lists");
dojo.require("dojox.dtl._base");
dojo.mixin(dojox.dtl.filter.lists,{_dictsort:function(A,B){if(A[0]==B[0]){return 0
}return(A[0]<B[0])?-1:1
},dictsort:function(D,E){if(!E){return D
}var G=[];
for(var B in D){G.push([dojox.dtl.resolveVariable("var."+E,new dojox.dtl.Context({"var":D[B]})),D[B]])
}G.sort(dojox.dtl.filter.lists._dictsort);
var F=[];
for(var A=0,C;
C=G[A];
A++){F.push(C[1])
}return F
},dictsortreversed:function(B,C){if(!C){return B
}var A=dojox.dtl.filter.lists.dictsort(B,C);
return A.reverse()
},first:function(A){return(A.length)?A[0]:""
},join:function(A,B){return A.join(B||",")
},length:function(A){return(isNaN(A.length))?(A+"").length:A.length
},length_is:function(A,B){return A.length==parseInt(B)
},random:function(A){return A[Math.floor(Math.random()*A.length)]
},slice:function(C,E){E=E||"";
var D=E.split(":");
var B=[];
for(var A=0;
A<D.length;
A++){if(!D[A].length){B.push(null)
}else{B.push(parseInt(D[A]))
}}if(B[0]===null){B[0]=0
}if(B[0]<0){B[0]=C.length+B[0]
}if(B.length<2||B[1]===null){B[1]=C.length
}if(B[1]<0){B[1]=C.length+B[1]
}return C.slice(B[0],B[1])
},_unordered_list:function(D,B){var E=dojox.dtl.filter.lists;
var F="";
for(var A=0;
A<B;
A++){F+="\t"
}if(D[1]&&D[1].length){var C=[];
for(var A=0;
A<D[1].length;
A++){C.push(E._unordered_list(D[1][A],B+1))
}return F+"<li>"+D[0]+"\n"+F+"<ul>\n"+C.join("\n")+"\n"+F+"</ul>\n"+F+"</li>"
}else{return F+"<li>"+D[0]+"</li>"
}},unordered_list:function(A){return dojox.dtl.filter.lists._unordered_list(A,1)
}})
};