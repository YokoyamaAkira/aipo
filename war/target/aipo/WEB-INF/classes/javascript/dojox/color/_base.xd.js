dojo._xdResourceLoaded({depends:[["provide","dojox.color._base"],["require","dojo.colors"]],defineResource:function(A){if(!A._hasResource["dojox.color._base"]){A._hasResource["dojox.color._base"]=true;
A.provide("dojox.color._base");
A.require("dojo.colors");
dojox.color.Color=A.Color;
dojox.color.blend=A.blendColors;
dojox.color.fromRgb=A.colorFromRgb;
dojox.color.fromHex=A.colorFromHex;
dojox.color.fromArray=A.colorFromArray;
dojox.color.fromString=A.colorFromString;
dojox.color.greyscale=A.colors.makeGrey;
A.mixin(dojox.color,{fromCmy:function(F,C,G){if(A.isArray(F)){C=F[1],G=F[2],F=F[0]
}else{if(A.isObject(F)){C=F.m,G=F.y,F=F.c
}}F/=100,C/=100,G/=100;
var E=1-F,D=1-C,B=1-G;
return new dojox.color.Color({r:Math.round(E*255),g:Math.round(D*255),b:Math.round(B*255)})
},fromCmyk:function(F,C,G,H){if(A.isArray(F)){C=F[1],G=F[2],H=F[3],F=F[0]
}else{if(A.isObject(F)){C=F.m,G=F.y,H=F.b,F=F.c
}}F/=100,C/=100,G/=100,H/=100;
var E,D,B;
E=1-Math.min(1,F*(1-H)+H);
D=1-Math.min(1,C*(1-H)+H);
B=1-Math.min(1,G*(1-H)+H);
return new dojox.color.Color({r:Math.round(E*255),g:Math.round(D*255),b:Math.round(B*255)})
},fromHsl:function(C,G,D){if(A.isArray(C)){G=C[1],D=C[2],C=C[0]
}else{if(A.isObject(C)){G=C.s,D=C.l,C=C.h
}}G/=100;
D/=100;
while(C<0){C+=360
}while(C>=360){C-=360
}var F,E,B;
if(C<120){F=(120-C)/60,E=C/60,B=0
}else{if(C<240){F=0,E=(240-C)/60,B=(C-120)/60
}else{F=(C-240)/60,E=0,B=(360-C)/60
}}F=2*G*Math.min(F,1)+(1-G);
E=2*G*Math.min(E,1)+(1-G);
B=2*G*Math.min(B,1)+(1-G);
if(D<0.5){F*=D,E*=D,B*=D
}else{F=(1-D)*F+2*D-1;
E=(1-D)*E+2*D-1;
B=(1-D)*B+2*D-1
}return new dojox.color.Color({r:Math.round(F*255),g:Math.round(E*255),b:Math.round(B*255)})
},fromHsv:function(I,G,L){if(A.isArray(I)){G=I[1],L=I[2],I=I[0]
}else{if(A.isObject(I)){G=I.s,L=I.v,I=I.h
}}if(I==360){I=0
}G/=100;
L/=100;
var B,H,K;
if(G==0){B=L,K=L,H=L
}else{var E=I/60,F=Math.floor(E),J=E-F;
var D=L*(1-G);
var C=L*(1-(G*J));
var M=L*(1-(G*(1-J)));
switch(F){case 0:B=L,H=M,K=D;
break;
case 1:B=C,H=L,K=D;
break;
case 2:B=D,H=L,K=M;
break;
case 3:B=D,H=C,K=L;
break;
case 4:B=M,H=D,K=L;
break;
case 5:B=L,H=D,K=C;
break
}}return new dojox.color.Color({r:Math.round(B*255),g:Math.round(H*255),b:Math.round(K*255)})
}});
A.extend(dojox.color.Color,{toCmy:function(){var C=1-(this.r/255),B=1-(this.g/255),D=1-(this.b/255);
return{c:Math.round(C*100),m:Math.round(B*100),y:Math.round(D*100)}
},toCmyk:function(){var F,C,G,H;
var E=this.r/255,D=this.g/255,B=this.b/255;
H=Math.min(1-E,1-D,1-B);
F=(1-E-H)/(1-H);
C=(1-D-H)/(1-H);
G=(1-B-H)/(1-H);
return{c:Math.round(F*100),m:Math.round(C*100),y:Math.round(G*100),b:Math.round(H*100)}
},toHsl:function(){var B=this.r/255,F=this.g/255,G=this.b/255;
var D=Math.min(B,G,F),H=Math.max(B,F,G);
var I=H-D;
var E=0,J=0,C=(D+H)/2;
if(C>0&&C<1){J=I/((C<0.5)?(2*C):(2-2*C))
}if(I>0){if(H==B&&H!=F){E+=(F-G)/I
}if(H==F&&H!=G){E+=(2+(G-B)/I)
}if(H==G&&H!=B){E+=(4+(B-F)/I)
}E*=60
}return{h:E,s:Math.round(J*100),l:Math.round(C*100)}
},toHsv:function(){var H=this.r/255,G=this.g/255,C=this.b/255;
var D=Math.min(H,C,G),B=Math.max(H,G,C);
var I=B-D;
var F=null,E=(B==0)?0:(I/B);
if(E==0){F=0
}else{if(H==B){F=60*(G-C)/I
}else{if(G==B){F=120+60*(C-H)/I
}else{F=240+60*(H-G)/I
}}if(F<0){F+=360
}}return{h:F,s:Math.round(E*100),v:Math.round(B*100)}
}})
}}});