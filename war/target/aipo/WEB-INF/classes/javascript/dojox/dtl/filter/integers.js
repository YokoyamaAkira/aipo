if(!dojo._hasResource["dojox.dtl.filter.integers"]){dojo._hasResource["dojox.dtl.filter.integers"]=true;
dojo.provide("dojox.dtl.filter.integers");
dojo.mixin(dojox.dtl.filter.integers,{add:function(B,A){B=parseInt(B);
A=parseInt(A);
return isNaN(A)?B:B+A
},get_digit:function(B,A){B=parseInt(B);
A=parseInt(A)-1;
if(A>=0){B+="";
if(A<B.length){B=parseInt(B.charAt(A))
}else{B=0
}}return(isNaN(B)?0:B)
}})
};