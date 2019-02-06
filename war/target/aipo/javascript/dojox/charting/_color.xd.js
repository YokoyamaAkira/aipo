dojo._xdResourceLoaded({depends:[["provide","dojox.charting._color"]],defineResource:function(A){if(!A._hasResource["dojox.charting._color"]){A._hasResource["dojox.charting._color"]=true;
A.provide("dojox.charting._color");
dojox.charting._color={};
dojox.charting._color.fromHsb=function(E,C,F){E=Math.round(E);
C=Math.round((C/100)*255);
F=Math.round((F/100)*255);
var B,D,G;
if(C==0){B=D=G=F
}else{var J=F,I=(255-C)*F/255,H=(J-I)*(E%60)/60;
if(E<60){B=J,D=I+H,G=I
}else{if(E<120){B=J-H,D=J,G=I
}else{if(E<180){B=I,D=J,G=I+H
}else{if(E<240){B=I,D=J-H,G=J
}else{if(E<300){B=I+H,D=I,G=J
}else{if(E<360){B=J,D=I,G=J-H
}}}}}}}B=Math.round(B);
D=Math.round(D);
G=Math.round(G);
return new A.Color({r:B,g:D,b:G})
};
dojox.charting._color.toHsb=function(C,D,L){var B=C,H=D,J=L;
if(A.isObject(C)){B=C.r,H=C.g,J=C.b
}var E=Math.min(B,H,J);
var K=Math.max(B,H,J);
var M=K-E;
var G=0,F=(K!=0?M/K:0),I=K/255;
if(F==0){G=0
}else{if(B==K){G=((K-J)/M)-((K-H)/M)
}else{if(H==K){G=2+(((K-B)/M)-((K-J)/M))
}else{G=4+(((K-H)/M)-((K-B)/M))
}}G/=6;
if(G<0){G++
}}G=Math.round(G*360);
F=Math.round(F*100);
I=Math.round(I*100);
return{h:G,s:F,b:I,hue:G,saturation:F,brightness:I}
}
}}});