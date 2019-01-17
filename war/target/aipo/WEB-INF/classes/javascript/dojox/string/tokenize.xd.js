dojo._xdResourceLoaded({depends:[["provide","dojox.string.tokenize"]],defineResource:function(A){if(!A._hasResource["dojox.string.tokenize"]){A._hasResource["dojox.string.tokenize"]=true;
A.provide("dojox.string.tokenize");
dojox.string.tokenize=function(F,J,H,I){var G=[];
var B,D,C=0;
while(B=J.exec(F)){D=F.substring(C,J.lastIndex-B[0].length);
if(D.length){G.push(D)
}if(H){var E=H.apply(I,B.slice(1));
if(typeof E!="undefined"){G.push(E)
}}C=J.lastIndex
}D=F.substr(C);
if(D.length){G.push(D)
}return G
}
}}});