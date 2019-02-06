if(!dojo._hasResource["dojox.encoding.ascii85"]){dojo._hasResource["dojox.encoding.ascii85"]=true;
dojo.provide("dojox.encoding.ascii85");
(function(){var A=function(C,F,H){var E,D,B,G=[0,0,0,0,0];
for(E=0;
E<F;
E+=4){B=((C[E]*256+C[E+1])*256+C[E+2])*256+C[E+3];
if(!B){H.push("z")
}else{for(D=0;
D<5;
G[D++]=B%85+33,B=Math.floor(B/85)){}}H.push(String.fromCharCode(G[4],G[3],G[2],G[1],G[0]))
}};
dojox.encoding.ascii85.encode=function(F){var D=[],E=F.length%4,C=F.length-E;
A(F,C,D);
if(E){var G=F.slice(C);
while(G.length<4){G.push(0)
}A(G,4,D);
var B=D.pop();
if(B=="z"){B="!!!!!"
}D.push(B.substr(0,E+1))
}return D.join("")
};
dojox.encoding.ascii85.decode=function(G){var K=G.length,J=[],F=[0,0,0,0,0],C,B,I,H,E,D;
for(C=0;
C<K;
++C){if(G.charAt(C)=="z"){J.push(0,0,0,0);
continue
}for(B=0;
B<5;
++B){F[B]=G.charCodeAt(C+B)-33
}D=K-C;
if(D<5){for(B=D;
B<4;
F[++B]=0){}F[D]=85
}I=(((F[0]*85+F[1])*85+F[2])*85+F[3])*85+F[4];
H=I&255;
I>>>=8;
E=I&255;
I>>>=8;
J.push(I>>>8,I&255,E,H);
for(B=D;
B<5;
++B,J.pop()){}C+=4
}return J
}
})()
};