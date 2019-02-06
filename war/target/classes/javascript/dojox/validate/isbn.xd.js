dojo._xdResourceLoaded({depends:[["provide","dojox.validate.isbn"]],defineResource:function(A){if(!A._hasResource["dojox.validate.isbn"]){A._hasResource["dojox.validate.isbn"]=true;
A.provide("dojox.validate.isbn");
dojox.validate.isValidIsbn=function(C){var B,F,G;
if(typeof C!="string"){C=String(C)
}C=C.replace(/[- ]/g,"");
B=C.length;
F=0;
if(B==10){G=10;
for(var E=0;
E<9;
E++){F+=parseInt(C.charAt(E))*G;
G--
}var D=C.charAt(9).toUpperCase();
F+=D=="X"?10:parseInt(D);
return F%11==0
}else{if(B==13){G=-1;
for(var E=0;
E<B;
E++){F+=parseInt(C.charAt(E))*(2+G);
G*=-1
}return F%10==0
}else{return false
}}}
}}});