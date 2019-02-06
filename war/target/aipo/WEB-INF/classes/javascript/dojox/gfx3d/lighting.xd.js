dojo._xdResourceLoaded({depends:[["provide","dojox.gfx3d.lighting"],["require","dojox.gfx._base"]],defineResource:function(A){if(!A._hasResource["dojox.gfx3d.lighting"]){A._hasResource["dojox.gfx3d.lighting"]=true;
A.provide("dojox.gfx3d.lighting");
A.require("dojox.gfx._base");
(function(){var B=dojox.gfx3d.lighting;
A.mixin(dojox.gfx3d.lighting,{black:function(){return{r:0,g:0,b:0,a:1}
},white:function(){return{r:1,g:1,b:1,a:1}
},toStdColor:function(C){C=dojox.gfx.normalizeColor(C);
return{r:C.r/255,g:C.g/255,b:C.b/255,a:C.a}
},fromStdColor:function(C){return new A.Color([Math.round(255*C.r),Math.round(255*C.g),Math.round(255*C.b),C.a])
},scaleColor:function(C,D){return{r:C*D.r,g:C*D.g,b:C*D.b,a:C*D.a}
},addColor:function(D,C){return{r:D.r+C.r,g:D.g+C.g,b:D.b+C.b,a:D.a+C.a}
},multiplyColor:function(D,C){return{r:D.r*C.r,g:D.g*C.g,b:D.b*C.b,a:D.a*C.a}
},saturateColor:function(C){return{r:C.r<0?0:C.r>1?1:C.r,g:C.g<0?0:C.g>1?1:C.g,b:C.b<0?0:C.b>1?1:C.b,a:C.a<0?0:C.a>1?1:C.a}
},mixColor:function(E,C,D){return B.addColor(B.scaleColor(D,E),B.scaleColor(1-D,C))
},diff2Color:function(D,C){var F=D.r-C.r;
var E=D.g-C.g;
var G=D.b-C.b;
var H=D.a-C.a;
return F*F+E*E+G*G+H*H
},length2Color:function(C){return C.r*C.r+C.g*C.g+C.b*C.b+C.a*C.a
},dot:function(D,C){return D.x*C.x+D.y*C.y+D.z*C.z
},scale:function(D,C){return{x:D*C.x,y:D*C.y,z:D*C.z}
},add:function(D,C){return{x:D.x+C.x,y:D.y+C.y,z:D.z+C.z}
},saturate:function(C){return Math.min(Math.max(C,0),1)
},length:function(C){return Math.sqrt(dojox.gfx3d.lighting.dot(C,C))
},normalize:function(C){return B.scale(1/B.length(C),C)
},faceforward:function(F,C){var E=dojox.gfx3d.lighting;
var D=E.dot(C,F)<0?1:-1;
return E.scale(D,F)
},reflect:function(C,E){var D=dojox.gfx3d.lighting;
return D.add(C,D.scale(-2*D.dot(C,E),E))
},diffuse:function(D,H){var F=B.black();
for(var C=0;
C<H.length;
++C){var G=H[C],E=B.dot(B.normalize(G.direction),D);
F=B.addColor(F,B.scaleColor(E,G.color))
}return B.saturateColor(F)
},specular:function(F,H,E,K){var G=B.black();
for(var C=0;
C<K.length;
++C){var J=K[C],D=B.normalize(B.add(B.normalize(J.direction),H)),I=Math.pow(Math.max(0,B.dot(F,D)),1/E);
G=B.addColor(G,B.scaleColor(I,J.color))
}return B.saturateColor(G)
},phong:function(E,G,I,C){E=B.normalize(E);
var F=B.black();
for(var D=0;
D<C.length;
++D){var K=C[D],J=B.reflect(B.scale(-1,B.normalize(G)),E),H=Math.pow(Math.max(0,B.dot(J,B.normalize(K.direction))),I);
F=B.addColor(F,B.scaleColor(H,K.color))
}return B.saturateColor(F)
}});
A.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(D,H,E,F){this.incident=B.normalize(D);
this.lights=[];
for(var C=0;
C<H.length;
++C){var G=H[C];
this.lights.push({direction:B.normalize(G.direction),color:B.toStdColor(G.color)})
}this.ambient=B.toStdColor(E.color?E.color:"white");
this.ambient=B.scaleColor(E.intensity,this.ambient);
this.ambient=B.scaleColor(this.ambient.a,this.ambient);
this.ambient.a=1;
this.specular=B.toStdColor(F?F:"white");
this.specular=B.scaleColor(this.specular.a,this.specular);
this.specular.a=1;
this.npr_cool={r:0,g:0,b:0.4,a:1};
this.npr_warm={r:0.4,g:0.4,b:0.2,a:1};
this.npr_alpha=0.2;
this.npr_beta=0.6;
this.npr_scale=0.6
},constant:function(G,D,E){E=B.toStdColor(E);
var F=E.a,C=B.scaleColor(F,E);
C.a=F;
return B.fromStdColor(B.saturateColor(C))
},matte:function(D,H,I){if(typeof H=="string"){H=B.finish[H]
}I=B.toStdColor(I);
D=B.faceforward(B.normalize(D),this.incident);
var C=B.scaleColor(H.Ka,this.ambient),E=B.saturate(-4*B.dot(D,this.incident)),G=B.scaleColor(E*H.Kd,B.diffuse(D,this.lights)),F=B.scaleColor(I.a,B.multiplyColor(I,B.addColor(C,G)));
F.a=I.a;
return B.fromStdColor(B.saturateColor(F))
},metal:function(J,G,H){if(typeof G=="string"){G=B.finish[G]
}H=B.toStdColor(H);
J=B.faceforward(B.normalize(J),this.incident);
var F=B.scale(-1,this.incident),D,E,I=B.scaleColor(G.Ka,this.ambient),C=B.saturate(-4*B.dot(J,this.incident));
if("phong" in G){D=B.scaleColor(C*G.Ks*G.phong,B.phong(J,F,G.phong_size,this.lights))
}else{D=B.scaleColor(C*G.Ks,B.specular(J,F,G.roughness,this.lights))
}E=B.scaleColor(H.a,B.addColor(B.multiplyColor(H,I),B.multiplyColor(this.specular,D)));
E.a=H.a;
return B.fromStdColor(B.saturateColor(E))
},plastic:function(C,E,J){if(typeof E=="string"){E=B.finish[E]
}J=B.toStdColor(J);
C=B.faceforward(B.normalize(C),this.incident);
var H=B.scale(-1,this.incident),F,K,D=B.scaleColor(E.Ka,this.ambient),G=B.saturate(-4*B.dot(C,this.incident)),I=B.scaleColor(G*E.Kd,B.diffuse(C,this.lights));
if("phong" in E){F=B.scaleColor(G*E.Ks*E.phong,B.phong(C,H,E.phong_size,this.lights))
}else{F=B.scaleColor(G*E.Ks,B.specular(C,H,E.roughness,this.lights))
}K=B.scaleColor(J.a,B.addColor(B.multiplyColor(J,B.addColor(D,I)),B.multiplyColor(this.specular,F)));
K.a=J.a;
return B.fromStdColor(B.saturateColor(K))
},npr:function(C,G,K){if(typeof G=="string"){G=B.finish[G]
}K=B.toStdColor(K);
C=B.faceforward(B.normalize(C),this.incident);
var F=B.scaleColor(G.Ka,this.ambient),H=B.saturate(-4*B.dot(C,this.incident)),I=B.scaleColor(H*G.Kd,B.diffuse(C,this.lights)),L=B.scaleColor(K.a,B.multiplyColor(K,B.addColor(F,I))),J=B.addColor(this.npr_cool,B.scaleColor(this.npr_alpha,L)),E=B.addColor(this.npr_warm,B.scaleColor(this.npr_beta,L)),D=(1+B.dot(this.incident,C))/2,L=B.scaleColor(this.npr_scale,B.addColor(L,B.mixColor(J,E,D)));
L.a=K.a;
return B.fromStdColor(B.saturateColor(L))
}})
})();
dojox.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}}
}}});