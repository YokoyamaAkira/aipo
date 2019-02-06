dojo._xdResourceLoaded({depends:[["provide","dojox.charting._color"]],defineResource:function(A){if(!A._hasResource["dojox.charting._color"]){A._hasResource["dojox.charting._color"]=true;
A.provide("dojox.charting._color");
dojox.charting._color={};
dojox.charting._color.fromHsb=function(C,J,D){C=Math.round(C);
J=Math.round((J/100)*255);
D=Math.round((D/100)*255);
var I,B,E;
if(J==0){I=B=E=D
}else{var H=D,G=(255-J)*D/255,F=(H-G)*(C%60)/60;
if(C<60){I=H,B=G+F,E=G
}else{if(C<120){I=H-F,B=H,E=G
}else{if(C<180){I=G,B=H,E=G+F
}else{if(C<240){I=G,B=H-F,E=H
}else{if(C<300){I=G+F,B=G,E=H
}else{if(C<360){I=H,B=G,E=H-F
}}}}}}}I=Math.round(I);
B=Math.round(B);
E=Math.round(E);
return new A.Color({r:I,g:B,b:E})
};
dojox.charting._color.toHsb=function(M,C,J){var L=M,F=C,H=J;
if(A.isObject(M)){L=M.r,F=M.g,H=M.b
}var B=Math.min(L,F,H);
var I=Math.max(L,F,H);
var K=I-B;
var E=0,D=(I!=0?K/I:0),G=I/255;
if(D==0){E=0
}else{if(L==I){E=((I-H)/K)-((I-F)/K)
}else{if(F==I){E=2+(((I-L)/K)-((I-H)/K))
}else{E=4+(((I-F)/K)-((I-L)/K))
}}E/=6;
if(E<0){E++
}}E=Math.round(E*360);
D=Math.round(D*100);
G=Math.round(G*100);
return{h:E,s:D,b:G,hue:E,saturation:D,brightness:G}
}
}}});