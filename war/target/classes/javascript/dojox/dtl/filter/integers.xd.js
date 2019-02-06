dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.integers"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.integers"]){A._hasResource["dojox.dtl.filter.integers"]=true;
A.provide("dojox.dtl.filter.integers");
A.mixin(dojox.dtl.filter.integers,{add:function(B,C){B=parseInt(B);
C=parseInt(C);
return isNaN(C)?B:B+C
},get_digit:function(B,C){B=parseInt(B);
C=parseInt(C)-1;
if(C>=0){B+="";
if(C<B.length){B=parseInt(B.charAt(C))
}else{B=0
}}return(isNaN(B)?0:B)
}})
}}});