dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.integers"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.integers"]){A._hasResource["dojox.dtl.filter.integers"]=true;
A.provide("dojox.dtl.filter.integers");
A.mixin(dojox.dtl.filter.integers,{add:function(C,B){C=parseInt(C);
B=parseInt(B);
return isNaN(B)?C:C+B
},get_digit:function(C,B){C=parseInt(C);
B=parseInt(B)-1;
if(B>=0){C+="";
if(B<C.length){C=parseInt(C.charAt(B))
}else{C=0
}}return(isNaN(C)?0:C)
}})
}}});