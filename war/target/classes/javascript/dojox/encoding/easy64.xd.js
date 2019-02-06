dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.easy64"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.easy64"]){A._hasResource["dojox.encoding.easy64"]=true;
A.provide("dojox.encoding.easy64");
(function(){var B=function(D,F,C){for(var E=0;
E<F;
E+=3){C.push(String.fromCharCode((D[E]>>>2)+33),String.fromCharCode(((D[E]&3)<<4)+(D[E+1]>>>4)+33),String.fromCharCode(((D[E+1]&15)<<2)+(D[E+2]>>>6)+33),String.fromCharCode((D[E+2]&63)+33))
}};
dojox.encoding.easy64.encode=function(C){var G=[],H=C.length%3,F=C.length-H;
B(C,F,G);
if(H){var E=C.slice(F);
while(E.length<3){E.push(0)
}B(E,3,G);
for(var D=3;
D>H;
G.pop(),--D){}}return G.join("")
};
dojox.encoding.easy64.decode=function(G){var E=G.length,C=[],F=[0,0,0,0],I,H,D;
for(I=0;
I<E;
I+=4){for(H=0;
H<4;
++H){F[H]=G.charCodeAt(I+H)-33
}D=E-I;
for(H=D;
H<4;
F[++H]=0){}C.push((F[0]<<2)+(F[1]>>>4),((F[1]&15)<<4)+(F[2]>>>2),((F[2]&3)<<6)+F[3]);
for(H=D;
H<4;
++H,C.pop()){}}return C
}
})()
}}});