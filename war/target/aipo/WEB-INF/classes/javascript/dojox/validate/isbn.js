if(!dojo._hasResource["dojox.validate.isbn"]){dojo._hasResource["dojox.validate.isbn"]=true;
dojo.provide("dojox.validate.isbn");
dojox.validate.isValidIsbn=function(E){var F,C,D;
if(typeof E!="string"){E=String(E)
}E=E.replace(/[- ]/g,"");
F=E.length;
C=0;
if(F==10){D=10;
for(var B=0;
B<9;
B++){C+=parseInt(E.charAt(B))*D;
D--
}var A=E.charAt(9).toUpperCase();
C+=A=="X"?10:parseInt(A);
return C%11==0
}else{if(F==13){D=-1;
for(var B=0;
B<F;
B++){C+=parseInt(E.charAt(B))*(2+D);
D*=-1
}return C%10==0
}else{return false
}}}
};