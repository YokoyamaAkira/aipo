if(!dojo._hasResource["dojox.charting._color"]){dojo._hasResource["dojox.charting._color"]=true;
dojo.provide("dojox.charting._color");
dojox.charting._color={};
dojox.charting._color.fromHsb=function(I,G,A){I=Math.round(I);
G=Math.round((G/100)*255);
A=Math.round((A/100)*255);
var F,H,B;
if(G==0){F=H=B=A
}else{var E=A,D=(255-G)*A/255,C=(E-D)*(I%60)/60;
if(I<60){F=E,H=D+C,B=D
}else{if(I<120){F=E-C,H=E,B=D
}else{if(I<180){F=D,H=E,B=D+C
}else{if(I<240){F=D,H=E-C,B=E
}else{if(I<300){F=D+C,H=D,B=E
}else{if(I<360){F=E,H=D,B=E-C
}}}}}}}F=Math.round(F);
H=Math.round(H);
B=Math.round(B);
return new dojo.Color({r:F,g:H,b:B})
};
dojox.charting._color.toHsb=function(J,K,G){var I=J,C=K,E=G;
if(dojo.isObject(J)){I=J.r,C=J.g,E=J.b
}var L=Math.min(I,C,E);
var F=Math.max(I,C,E);
var H=F-L;
var B=0,A=(F!=0?H/F:0),D=F/255;
if(A==0){B=0
}else{if(I==F){B=((F-E)/H)-((F-C)/H)
}else{if(C==F){B=2+(((F-I)/H)-((F-E)/H))
}else{B=4+(((F-C)/H)-((F-I)/H))
}}B/=6;
if(B<0){B++
}}B=Math.round(B*360);
A=Math.round(A*100);
D=Math.round(D*100);
return{h:B,s:A,b:D,hue:B,saturation:A,brightness:D}
}
};