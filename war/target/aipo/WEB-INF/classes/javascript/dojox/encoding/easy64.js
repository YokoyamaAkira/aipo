if(!dojo._hasResource["dojox.encoding.easy64"]){dojo._hasResource["dojox.encoding.easy64"]=true;
dojo.provide("dojox.encoding.easy64");
(function(){var A=function(D,B,C){for(var E=0;
E<B;
E+=3){C.push(String.fromCharCode((D[E]>>>2)+33),String.fromCharCode(((D[E]&3)<<4)+(D[E+1]>>>4)+33),String.fromCharCode(((D[E+1]&15)<<2)+(D[E+2]>>>6)+33),String.fromCharCode((D[E+2]&63)+33))
}};
dojox.encoding.easy64.encode=function(E){var C=[],D=E.length%3,B=E.length-D;
A(E,B,C);
if(D){var G=E.slice(B);
while(G.length<3){G.push(0)
}A(G,3,C);
for(var F=3;
F>D;
C.pop(),--F){}}return C.join("")
};
dojox.encoding.easy64.decode=function(H){var C=H.length,E=[],G=[0,0,0,0],D,B,F;
for(D=0;
D<C;
D+=4){for(B=0;
B<4;
++B){G[B]=H.charCodeAt(D+B)-33
}F=C-D;
for(B=F;
B<4;
G[++B]=0){}E.push((G[0]<<2)+(G[1]>>>4),((G[1]&15)<<4)+(G[2]>>>2),((G[2]&3)<<6)+G[3]);
for(B=F;
B<4;
++B,E.pop()){}}return E
}
})()
};