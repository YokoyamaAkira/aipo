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
A.mixin(dojox.color,{fromCmy:function(G,D,C){if(A.isArray(G)){D=G[1],C=G[2],G=G[0]
}else{if(A.isObject(G)){D=G.m,C=G.y,G=G.c
}}G/=100,D/=100,C/=100;
var F=1-G,E=1-D,B=1-C;
return new dojox.color.Color({r:Math.round(F*255),g:Math.round(E*255),b:Math.round(B*255)})
},fromCmyk:function(E,H,F,C){if(A.isArray(E)){H=E[1],F=E[2],C=E[3],E=E[0]
}else{if(A.isObject(E)){H=E.m,F=E.y,C=E.b,E=E.c
}}E/=100,H/=100,F/=100,C/=100;
var D,B,G;
D=1-Math.min(1,E*(1-C)+C);
B=1-Math.min(1,H*(1-C)+C);
G=1-Math.min(1,F*(1-C)+C);
return new dojox.color.Color({r:Math.round(D*255),g:Math.round(B*255),b:Math.round(G*255)})
},fromHsl:function(D,C,E){if(A.isArray(D)){C=D[1],E=D[2],D=D[0]
}else{if(A.isObject(D)){C=D.s,E=D.l,D=D.h
}}C/=100;
E/=100;
while(D<0){D+=360
}while(D>=360){D-=360
}var G,F,B;
if(D<120){G=(120-D)/60,F=D/60,B=0
}else{if(D<240){G=0,F=(240-D)/60,B=(D-120)/60
}else{G=(D-240)/60,F=0,B=(360-D)/60
}}G=2*C*Math.min(G,1)+(1-C);
F=2*C*Math.min(F,1)+(1-C);
B=2*C*Math.min(B,1)+(1-C);
if(E<0.5){G*=E,F*=E,B*=E
}else{G=(1-E)*G+2*E-1;
F=(1-E)*F+2*E-1;
B=(1-E)*B+2*E-1
}return new dojox.color.Color({r:Math.round(G*255),g:Math.round(F*255),b:Math.round(B*255)})
},fromHsv:function(G,E,J){if(A.isArray(G)){E=G[1],J=G[2],G=G[0]
}else{if(A.isObject(G)){E=G.s,J=G.v,G=G.h
}}if(G==360){G=0
}E/=100;
J/=100;
var L,F,I;
if(E==0){L=J,I=J,F=J
}else{var C=G/60,D=Math.floor(C),H=C-D;
var B=J*(1-E);
var M=J*(1-(E*H));
var K=J*(1-(E*(1-H)));
switch(D){case 0:L=J,F=K,I=B;
break;
case 1:L=M,F=J,I=B;
break;
case 2:L=B,F=J,I=K;
break;
case 3:L=B,F=M,I=J;
break;
case 4:L=K,F=B,I=J;
break;
case 5:L=J,F=B,I=M;
break
}}return new dojox.color.Color({r:Math.round(L*255),g:Math.round(F*255),b:Math.round(I*255)})
}});
A.extend(dojox.color.Color,{toCmy:function(){var D=1-(this.r/255),C=1-(this.g/255),B=1-(this.b/255);
return{c:Math.round(D*100),m:Math.round(C*100),y:Math.round(B*100)}
},toCmyk:function(){var E,H,F,C;
var D=this.r/255,B=this.g/255,G=this.b/255;
C=Math.min(1-D,1-B,1-G);
E=(1-D-C)/(1-C);
H=(1-B-C)/(1-C);
F=(1-G-C)/(1-C);
return{c:Math.round(E*100),m:Math.round(H*100),y:Math.round(F*100),b:Math.round(C*100)}
},toHsl:function(){var I=this.r/255,D=this.g/255,E=this.b/255;
var B=Math.min(I,E,D),F=Math.max(I,D,E);
var G=F-B;
var C=0,H=0,J=(B+F)/2;
if(J>0&&J<1){H=G/((J<0.5)?(2*J):(2-2*J))
}if(G>0){if(F==I&&F!=D){C+=(D-E)/G
}if(F==D&&F!=E){C+=(2+(E-I)/G)
}if(F==E&&F!=I){C+=(4+(I-D)/G)
}C*=60
}return{h:C,s:Math.round(H*100),l:Math.round(J*100)}
},toHsv:function(){var E=this.r/255,D=this.g/255,G=this.b/255;
var H=Math.min(E,G,D),F=Math.max(E,D,G);
var C=F-H;
var B=null,I=(F==0)?0:(C/F);
if(I==0){B=0
}else{if(E==F){B=60*(D-G)/C
}else{if(D==F){B=120+60*(G-E)/C
}else{B=240+60*(E-D)/C
}}if(B<0){B+=360
}}return{h:B,s:Math.round(I*100),v:Math.round(F*100)}
}})
}}});