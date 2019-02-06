dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.ascii85"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.ascii85"]){A._hasResource["dojox.encoding.ascii85"]=true;
A.provide("dojox.encoding.ascii85");
(function(){var B=function(H,D,G){var C,I,E,F=[0,0,0,0,0];
for(C=0;
C<D;
C+=4){E=((H[C]*256+H[C+1])*256+H[C+2])*256+H[C+3];
if(!E){G.push("z")
}else{for(I=0;
I<5;
F[I++]=E%85+33,E=Math.floor(E/85)){}}G.push(String.fromCharCode(F[4],F[3],F[2],F[1],F[0]))
}};
dojox.encoding.ascii85.encode=function(D){var H=[],C=D.length%4,F=D.length-C;
B(D,F,H);
if(C){var E=D.slice(F);
while(E.length<4){E.push(0)
}B(E,4,H);
var G=H.pop();
if(G=="z"){G="!!!!!"
}H.push(G.substr(0,C+1))
}return H.join("")
};
dojox.encoding.ascii85.decode=function(H){var L=H.length,K=[],G=[0,0,0,0,0],D,C,J,I,F,E;
for(D=0;
D<L;
++D){if(H.charAt(D)=="z"){K.push(0,0,0,0);
continue
}for(C=0;
C<5;
++C){G[C]=H.charCodeAt(D+C)-33
}E=L-D;
if(E<5){for(C=E;
C<4;
G[++C]=0){}G[E]=85
}J=(((G[0]*85+G[1])*85+G[2])*85+G[3])*85+G[4];
I=J&255;
J>>>=8;
F=J&255;
J>>>=8;
K.push(J>>>8,J&255,F,I);
for(C=E;
C<5;
++C,K.pop()){}D+=4
}return K
}
})()
}}});