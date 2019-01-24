dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.easy64"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.easy64"]){A._hasResource["dojox.encoding.easy64"]=true;
A.provide("dojox.encoding.easy64");
(function(){var B=function(D,F,C){for(var E=0;
E<F;
E+=3){C.push(String.fromCharCode((D[E]>>>2)+33),String.fromCharCode(((D[E]&3)<<4)+(D[E+1]>>>4)+33),String.fromCharCode(((D[E+1]&15)<<2)+(D[E+2]>>>6)+33),String.fromCharCode((D[E+2]&63)+33))
}};
dojox.encoding.easy64.encode=function(E){var C=[],D=E.length%3,H=E.length-D;
B(E,H,C);
if(D){var G=E.slice(H);
while(G.length<3){G.push(0)
}B(G,3,C);
for(var F=3;
F>D;
C.pop(),--F){}}return C.join("")
};
dojox.encoding.easy64.decode=function(D){var I=D.length,G=[],C=[0,0,0,0],F,E,H;
for(F=0;
F<I;
F+=4){for(E=0;
E<4;
++E){C[E]=D.charCodeAt(F+E)-33
}H=I-F;
for(E=H;
E<4;
C[++E]=0){}G.push((C[0]<<2)+(C[1]>>>4),((C[1]&15)<<4)+(C[2]>>>2),((C[2]&3)<<6)+C[3]);
for(E=H;
E<4;
++E,G.pop()){}}return G
}
})()
}}});