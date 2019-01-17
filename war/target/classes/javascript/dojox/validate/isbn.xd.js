dojo._xdResourceLoaded({depends:[["provide","dojox.validate.isbn"]],defineResource:function(A){if(!A._hasResource["dojox.validate.isbn"]){A._hasResource["dojox.validate.isbn"]=true;
A.provide("dojox.validate.isbn");
dojox.validate.isValidIsbn=function(G){var B,E,F;
if(typeof G!="string"){G=String(G)
}G=G.replace(/[- ]/g,"");
B=G.length;
E=0;
if(B==10){F=10;
for(var D=0;
D<9;
D++){E+=parseInt(G.charAt(D))*F;
F--
}var C=G.charAt(9).toUpperCase();
E+=C=="X"?10:parseInt(C);
return E%11==0
}else{if(B==13){F=-1;
for(var D=0;
D<B;
D++){E+=parseInt(G.charAt(D))*(2+F);
F*=-1
}return E%10==0
}else{return false
}}}
}}});