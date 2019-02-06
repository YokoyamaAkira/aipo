if(!dojo._hasResource["dojox.dtl.filter.integers"]){dojo._hasResource["dojox.dtl.filter.integers"]=true;
dojo.provide("dojox.dtl.filter.integers");
dojo.mixin(dojox.dtl.filter.integers,{add:function(A,B){A=parseInt(A);
B=parseInt(B);
return isNaN(B)?A:A+B
},get_digit:function(A,B){A=parseInt(A);
B=parseInt(B)-1;
if(B>=0){A+="";
if(B<A.length){A=parseInt(A.charAt(B))
}else{A=0
}}return(isNaN(A)?0:A)
}})
};