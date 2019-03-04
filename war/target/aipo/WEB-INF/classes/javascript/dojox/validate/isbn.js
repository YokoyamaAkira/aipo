if(!dojo._hasResource["dojox.validate.isbn"]){dojo._hasResource["dojox.validate.isbn"]=true;
dojo.provide("dojox.validate.isbn");
dojox.validate.isValidIsbn=function(F){var A,D,E;
if(typeof F!="string"){F=String(F)
}F=F.replace(/[- ]/g,"");
A=F.length;
D=0;
if(A==10){E=10;
for(var C=0;
C<9;
C++){D+=parseInt(F.charAt(C))*E;
E--
}var B=F.charAt(9).toUpperCase();
D+=B=="X"?10:parseInt(B);
return D%11==0
}else{if(A==13){E=-1;
for(var C=0;
C<A;
C++){D+=parseInt(F.charAt(C))*(2+E);
E*=-1
}return D%10==0
}else{return false
}}}
};