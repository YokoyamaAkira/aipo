if(!dojo._hasResource["dojox.charting._color"]){dojo._hasResource["dojox.charting._color"]=true;
dojo.provide("dojox.charting._color");
dojox.charting._color={};
dojox.charting._color.fromHsb=function(D,B,E){D=Math.round(D);
B=Math.round((B/100)*255);
E=Math.round((E/100)*255);
var A,C,F;
if(B==0){A=C=F=E
}else{var I=E,H=(255-B)*E/255,G=(I-H)*(D%60)/60;
if(D<60){A=I,C=H+G,F=H
}else{if(D<120){A=I-G,C=I,F=H
}else{if(D<180){A=H,C=I,F=H+G
}else{if(D<240){A=H,C=I-G,F=I
}else{if(D<300){A=H+G,C=H,F=I
}else{if(D<360){A=I,C=H,F=I-G
}}}}}}}A=Math.round(A);
C=Math.round(C);
F=Math.round(F);
return new dojo.Color({r:A,g:C,b:F})
};
dojox.charting._color.toHsb=function(B,C,K){var A=B,G=C,I=K;
if(dojo.isObject(B)){A=B.r,G=B.g,I=B.b
}var D=Math.min(A,G,I);
var J=Math.max(A,G,I);
var L=J-D;
var F=0,E=(J!=0?L/J:0),H=J/255;
if(E==0){F=0
}else{if(A==J){F=((J-I)/L)-((J-G)/L)
}else{if(G==J){F=2+(((J-A)/L)-((J-I)/L))
}else{F=4+(((J-G)/L)-((J-A)/L))
}}F/=6;
if(F<0){F++
}}F=Math.round(F*360);
E=Math.round(E*100);
H=Math.round(H*100);
return{h:F,s:E,b:H,hue:F,saturation:E,brightness:H}
}
};