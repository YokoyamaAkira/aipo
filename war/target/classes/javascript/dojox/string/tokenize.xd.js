dojo._xdResourceLoaded({depends:[["provide","dojox.string.tokenize"]],defineResource:function(A){if(!A._hasResource["dojox.string.tokenize"]){A._hasResource["dojox.string.tokenize"]=true;
A.provide("dojox.string.tokenize");
dojox.string.tokenize=function(D,H,F,G){var E=[];
var I,B,J=0;
while(I=H.exec(D)){B=D.substring(J,H.lastIndex-I[0].length);
if(B.length){E.push(B)
}if(F){var C=F.apply(G,I.slice(1));
if(typeof C!="undefined"){E.push(C)
}}J=H.lastIndex
}B=D.substr(J);
if(B.length){E.push(B)
}return E
}
}}});