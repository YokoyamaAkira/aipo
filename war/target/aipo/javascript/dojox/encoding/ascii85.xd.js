dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.ascii85"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.ascii85"]){A._hasResource["dojox.encoding.ascii85"]=true;
A.provide("dojox.encoding.ascii85");
(function(){var B=function(E,H,D){var G,F,I,C=[0,0,0,0,0];
for(G=0;
G<H;
G+=4){I=((E[G]*256+E[G+1])*256+E[G+2])*256+E[G+3];
if(!I){D.push("z")
}else{for(F=0;
F<5;
C[F++]=I%85+33,I=Math.floor(I/85)){}}D.push(String.fromCharCode(C[4],C[3],C[2],C[1],C[0]))
}};
dojox.encoding.ascii85.encode=function(F){var D=[],E=F.length%4,H=F.length-E;
B(F,H,D);
if(E){var G=F.slice(H);
while(G.length<4){G.push(0)
}B(G,4,D);
var C=D.pop();
if(C=="z"){C="!!!!!"
}D.push(C.substr(0,E+1))
}return D.join("")
};
dojox.encoding.ascii85.decode=function(J){var D=J.length,C=[],I=[0,0,0,0,0],F,E,L,K,H,G;
for(F=0;
F<D;
++F){if(J.charAt(F)=="z"){C.push(0,0,0,0);
continue
}for(E=0;
E<5;
++E){I[E]=J.charCodeAt(F+E)-33
}G=D-F;
if(G<5){for(E=G;
E<4;
I[++E]=0){}I[G]=85
}L=(((I[0]*85+I[1])*85+I[2])*85+I[3])*85+I[4];
K=L&255;
L>>>=8;
H=L&255;
L>>>=8;
C.push(L>>>8,L&255,H,K);
for(E=G;
E<5;
++E,C.pop()){}F+=4
}return C
}
})()
}}});