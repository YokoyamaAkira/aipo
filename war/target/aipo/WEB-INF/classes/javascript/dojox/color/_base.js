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
dojo.mixin(dojox.color,{fromCmy:function(D,A,E){if(dojo.isArray(D)){A=D[1],E=D[2],D=D[0]
}else{if(dojo.isObject(D)){A=D.m,E=D.y,D=D.c
}}D/=100,A/=100,E/=100;
var C=1-D,B=1-A,F=1-E;
return new dojox.color.Color({r:Math.round(C*255),g:Math.round(B*255),b:Math.round(F*255)})
},fromCmyk:function(B,F,C,D){if(dojo.isArray(B)){F=B[1],C=B[2],D=B[3],B=B[0]
}else{if(dojo.isObject(B)){F=B.m,C=B.y,D=B.b,B=B.c
}}B/=100,F/=100,C/=100,D/=100;
var A,G,E;
A=1-Math.min(1,B*(1-D)+D);
G=1-Math.min(1,F*(1-D)+D);
E=1-Math.min(1,C*(1-D)+D);
return new dojox.color.Color({r:Math.round(A*255),g:Math.round(G*255),b:Math.round(E*255)})
},fromHsl:function(A,E,B){if(dojo.isArray(A)){E=A[1],B=A[2],A=A[0]
}else{if(dojo.isObject(A)){E=A.s,B=A.l,A=A.h
}}E/=100;
B/=100;
while(A<0){A+=360
}while(A>=360){A-=360
}var D,C,F;
if(A<120){D=(120-A)/60,C=A/60,F=0
}else{if(A<240){D=0,C=(240-A)/60,F=(A-120)/60
}else{D=(A-240)/60,C=0,F=(360-A)/60
}}D=2*E*Math.min(D,1)+(1-E);
C=2*E*Math.min(C,1)+(1-E);
F=2*E*Math.min(F,1)+(1-E);
if(B<0.5){D*=B,C*=B,F*=B
}else{D=(1-B)*D+2*B-1;
C=(1-B)*C+2*B-1;
F=(1-B)*F+2*B-1
}return new dojox.color.Color({r:Math.round(D*255),g:Math.round(C*255),b:Math.round(F*255)})
},fromHsv:function(D,B,G){if(dojo.isArray(D)){B=D[1],G=D[2],D=D[0]
}else{if(dojo.isObject(D)){B=D.s,G=D.v,D=D.h
}}if(D==360){D=0
}B/=100;
G/=100;
var I,C,F;
if(B==0){I=G,F=G,C=G
}else{var L=D/60,A=Math.floor(L),E=L-A;
var K=G*(1-B);
var J=G*(1-(B*E));
var H=G*(1-(B*(1-E)));
switch(A){case 0:I=G,C=H,F=K;
break;
case 1:I=J,C=G,F=K;
break;
case 2:I=K,C=G,F=H;
break;
case 3:I=K,C=J,F=G;
break;
case 4:I=H,C=K,F=G;
break;
case 5:I=G,C=K,F=J;
break
}}return new dojox.color.Color({r:Math.round(I*255),g:Math.round(C*255),b:Math.round(F*255)})
}});
dojo.extend(dojox.color.Color,{toCmy:function(){var A=1-(this.r/255),C=1-(this.g/255),B=1-(this.b/255);
return{c:Math.round(A*100),m:Math.round(C*100),y:Math.round(B*100)}
},toCmyk:function(){var B,F,C,D;
var A=this.r/255,G=this.g/255,E=this.b/255;
D=Math.min(1-A,1-G,1-E);
B=(1-A-D)/(1-D);
F=(1-G-D)/(1-D);
C=(1-E-D)/(1-D);
return{c:Math.round(B*100),m:Math.round(F*100),y:Math.round(C*100),b:Math.round(D*100)}
},toHsl:function(){var F=this.r/255,A=this.g/255,B=this.b/255;
var H=Math.min(F,B,A),C=Math.max(F,A,B);
var D=C-H;
var I=0,E=0,G=(H+C)/2;
if(G>0&&G<1){E=D/((G<0.5)?(2*G):(2-2*G))
}if(D>0){if(C==F&&C!=A){I+=(A-B)/D
}if(C==A&&C!=B){I+=(2+(B-F)/D)
}if(C==B&&C!=F){I+=(4+(F-A)/D)
}I*=60
}return{h:I,s:Math.round(E*100),l:Math.round(G*100)}
},toHsv:function(){var B=this.r/255,A=this.g/255,E=this.b/255;
var F=Math.min(B,E,A),D=Math.max(B,A,E);
var C=D-F;
var H=null,G=(D==0)?0:(C/D);
if(G==0){H=0
}else{if(B==D){H=60*(A-E)/C
}else{if(A==D){H=120+60*(E-B)/C
}else{H=240+60*(B-A)/C
}}if(H<0){H+=360
}}return{h:H,s:Math.round(G*100),v:Math.round(D*100)}
}})
};