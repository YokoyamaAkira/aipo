if(!dojo._hasResource["dojox.string.tokenize"]){dojo._hasResource["dojox.string.tokenize"]=true;
dojo.provide("dojox.string.tokenize");
dojox.string.tokenize=function(A,E,C,D){var B=[];
var F,H,G=0;
while(F=E.exec(A)){H=A.substring(G,E.lastIndex-F[0].length);
if(H.length){B.push(H)
}if(C){var I=C.apply(D,F.slice(1));
if(typeof I!="undefined"){B.push(I)
}}G=E.lastIndex
}H=A.substr(G);
if(H.length){B.push(H)
}return B
}
};