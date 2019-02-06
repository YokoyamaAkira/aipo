if(!dojo._hasResource["dojox.encoding.ascii85"]){dojo._hasResource["dojox.encoding.ascii85"]=true;
dojo.provide("dojox.encoding.ascii85");
(function(){var A=function(D,G,C){var F,E,H,B=[0,0,0,0,0];
for(F=0;
F<G;
F+=4){H=((D[F]*256+D[F+1])*256+D[F+2])*256+D[F+3];
if(!H){C.push("z")
}else{for(E=0;
E<5;
B[E++]=H%85+33,H=Math.floor(H/85)){}}C.push(String.fromCharCode(B[4],B[3],B[2],B[1],B[0]))
}};
dojox.encoding.ascii85.encode=function(E){var C=[],D=E.length%4,G=E.length-D;
A(E,G,C);
if(D){var F=E.slice(G);
while(F.length<4){F.push(0)
}A(F,4,C);
var B=C.pop();
if(B=="z"){B="!!!!!"
}C.push(B.substr(0,D+1))
}return C.join("")
};
dojox.encoding.ascii85.decode=function(I){var C=I.length,B=[],H=[0,0,0,0,0],E,D,K,J,G,F;
for(E=0;
E<C;
++E){if(I.charAt(E)=="z"){B.push(0,0,0,0);
continue
}for(D=0;
D<5;
++D){H[D]=I.charCodeAt(E+D)-33
}F=C-E;
if(F<5){for(D=F;
D<4;
H[++D]=0){}H[F]=85
}K=(((H[0]*85+H[1])*85+H[2])*85+H[3])*85+H[4];
J=K&255;
K>>>=8;
G=K&255;
K>>>=8;
B.push(K>>>8,K&255,G,J);
for(D=F;
D<5;
++D,B.pop()){}E+=4
}return B
}
})()
};