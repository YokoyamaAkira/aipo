if(!dojo._hasResource["dojox.color._base"]){dojo._hasResource["dojox.color._base"]=true;
dojo.provide("dojox.color._base");
dojo.require("dojo.colors");
dojox.color.Color=dojo.Color;
dojox.color.blend=dojo.blendColors;
dojox.color.fromRgb=dojo.colorFromRgb;
dojox.color.fromHex=dojo.colorFromHex;
dojox.color.fromArray=dojo.colorFromArray;
dojox.color.fromString=dojo.colorFromString;
dojox.color.greyscale=dojo.colors.makeGrey;
dojo.mixin(dojox.color,{fromCmy:function(E,B,F){if(dojo.isArray(E)){B=E[1],F=E[2],E=E[0]
}else{if(dojo.isObject(E)){B=E.m,F=E.y,E=E.c
}}E/=100,B/=100,F/=100;
var D=1-E,C=1-B,A=1-F;
return new dojox.color.Color({r:Math.round(D*255),g:Math.round(C*255),b:Math.round(A*255)})
},fromCmyk:function(E,B,F,G){if(dojo.isArray(E)){B=E[1],F=E[2],G=E[3],E=E[0]
}else{if(dojo.isObject(E)){B=E.m,F=E.y,G=E.b,E=E.c
}}E/=100,B/=100,F/=100,G/=100;
var D,C,A;
D=1-Math.min(1,E*(1-G)+G);
C=1-Math.min(1,B*(1-G)+G);
A=1-Math.min(1,F*(1-G)+G);
return new dojox.color.Color({r:Math.round(D*255),g:Math.round(C*255),b:Math.round(A*255)})
},fromHsl:function(B,F,C){if(dojo.isArray(B)){F=B[1],C=B[2],B=B[0]
}else{if(dojo.isObject(B)){F=B.s,C=B.l,B=B.h
}}F/=100;
C/=100;
while(B<0){B+=360
}while(B>=360){B-=360
}var E,D,A;
if(B<120){E=(120-B)/60,D=B/60,A=0
}else{if(B<240){E=0,D=(240-B)/60,A=(B-120)/60
}else{E=(B-240)/60,D=0,A=(360-B)/60
}}E=2*F*Math.min(E,1)+(1-F);
D=2*F*Math.min(D,1)+(1-F);
A=2*F*Math.min(A,1)+(1-F);
if(C<0.5){E*=C,D*=C,A*=C
}else{E=(1-C)*E+2*C-1;
D=(1-C)*D+2*C-1;
A=(1-C)*A+2*C-1
}return new dojox.color.Color({r:Math.round(E*255),g:Math.round(D*255),b:Math.round(A*255)})
},fromHsv:function(H,F,K){if(dojo.isArray(H)){F=H[1],K=H[2],H=H[0]
}else{if(dojo.isObject(H)){F=H.s,K=H.v,H=H.h
}}if(H==360){H=0
}F/=100;
K/=100;
var A,G,J;
if(F==0){A=K,J=K,G=K
}else{var D=H/60,E=Math.floor(D),I=D-E;
var C=K*(1-F);
var B=K*(1-(F*I));
var L=K*(1-(F*(1-I)));
switch(E){case 0:A=K,G=L,J=C;
break;
case 1:A=B,G=K,J=C;
break;
case 2:A=C,G=K,J=L;
break;
case 3:A=C,G=B,J=K;
break;
case 4:A=L,G=C,J=K;
break;
case 5:A=K,G=C,J=B;
break
}}return new dojox.color.Color({r:Math.round(A*255),g:Math.round(G*255),b:Math.round(J*255)})
}});
dojo.extend(dojox.color.Color,{toCmy:function(){var B=1-(this.r/255),A=1-(this.g/255),C=1-(this.b/255);
return{c:Math.round(B*100),m:Math.round(A*100),y:Math.round(C*100)}
},toCmyk:function(){var E,B,F,G;
var D=this.r/255,C=this.g/255,A=this.b/255;
G=Math.min(1-D,1-C,1-A);
E=(1-D-G)/(1-G);
B=(1-C-G)/(1-G);
F=(1-A-G)/(1-G);
return{c:Math.round(E*100),m:Math.round(B*100),y:Math.round(F*100),b:Math.round(G*100)}
},toHsl:function(){var A=this.r/255,E=this.g/255,F=this.b/255;
var C=Math.min(A,F,E),G=Math.max(A,E,F);
var H=G-C;
var D=0,I=0,B=(C+G)/2;
if(B>0&&B<1){I=H/((B<0.5)?(2*B):(2-2*B))
}if(H>0){if(G==A&&G!=E){D+=(E-F)/H
}if(G==E&&G!=F){D+=(2+(F-A)/H)
}if(G==F&&G!=A){D+=(4+(A-E)/H)
}D*=60
}return{h:D,s:Math.round(I*100),l:Math.round(B*100)}
},toHsv:function(){var G=this.r/255,F=this.g/255,B=this.b/255;
var C=Math.min(G,B,F),A=Math.max(G,F,B);
var H=A-C;
var E=null,D=(A==0)?0:(H/A);
if(D==0){E=0
}else{if(G==A){E=60*(F-B)/H
}else{if(F==A){E=120+60*(B-G)/H
}else{E=240+60*(G-F)/H
}}if(E<0){E+=360
}}return{h:E,s:Math.round(D*100),v:Math.round(A*100)}
}})
};