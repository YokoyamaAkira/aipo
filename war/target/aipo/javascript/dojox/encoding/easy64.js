if(!dojo._hasResource["dojox.encoding.easy64"]){dojo._hasResource["dojox.encoding.easy64"]=true;
dojo.provide("dojox.encoding.easy64");
(function(){var A=function(C,E,B){for(var D=0;
D<E;
D+=3){B.push(String.fromCharCode((C[D]>>>2)+33),String.fromCharCode(((C[D]&3)<<4)+(C[D+1]>>>4)+33),String.fromCharCode(((C[D+1]&15)<<2)+(C[D+2]>>>6)+33),String.fromCharCode((C[D+2]&63)+33))
}};
dojox.encoding.easy64.encode=function(D){var B=[],C=D.length%3,G=D.length-C;
A(D,G,B);
if(C){var F=D.slice(G);
while(F.length<3){F.push(0)
}A(F,3,B);
for(var E=3;
E>C;
B.pop(),--E){}}return B.join("")
};
dojox.encoding.easy64.decode=function(C){var H=C.length,F=[],B=[0,0,0,0],E,D,G;
for(E=0;
E<H;
E+=4){for(D=0;
D<4;
++D){B[D]=C.charCodeAt(E+D)-33
}G=H-E;
for(D=G;
D<4;
B[++D]=0){}F.push((B[0]<<2)+(B[1]>>>4),((B[1]&15)<<4)+(B[2]>>>2),((B[2]&3)<<6)+B[3]);
for(D=G;
D<4;
++D,F.pop()){}}return F
}
})()
};