if(!dojo._hasResource["dojox.string.tokenize"]){dojo._hasResource["dojox.string.tokenize"]=true;
dojo.provide("dojox.string.tokenize");
dojox.string.tokenize=function(E,I,G,H){var F=[];
var A,C,B=0;
while(A=I.exec(E)){C=E.substring(B,I.lastIndex-A[0].length);
if(C.length){F.push(C)
}if(G){var D=G.apply(H,A.slice(1));
if(typeof D!="undefined"){F.push(D)
}}B=I.lastIndex
}C=E.substr(B);
if(C.length){F.push(C)
}return F
}
};