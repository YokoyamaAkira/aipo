if(!dojo._hasResource["dojox.gfx3d.lighting"]){dojo._hasResource["dojox.gfx3d.lighting"]=true;
dojo.provide("dojox.gfx3d.lighting");
dojo.require("dojox.gfx._base");
(function(){var A=dojox.gfx3d.lighting;
dojo.mixin(dojox.gfx3d.lighting,{black:function(){return{r:0,g:0,b:0,a:1}
},white:function(){return{r:1,g:1,b:1,a:1}
},toStdColor:function(B){B=dojox.gfx.normalizeColor(B);
return{r:B.r/255,g:B.g/255,b:B.b/255,a:B.a}
},fromStdColor:function(B){return new dojo.Color([Math.round(255*B.r),Math.round(255*B.g),Math.round(255*B.b),B.a])
},scaleColor:function(C,B){return{r:C*B.r,g:C*B.g,b:C*B.b,a:C*B.a}
},addColor:function(B,C){return{r:B.r+C.r,g:B.g+C.g,b:B.b+C.b,a:B.a+C.a}
},multiplyColor:function(B,C){return{r:B.r*C.r,g:B.g*C.g,b:B.b*C.b,a:B.a*C.a}
},saturateColor:function(B){return{r:B.r<0?0:B.r>1?1:B.r,g:B.g<0?0:B.g>1?1:B.g,b:B.b<0?0:B.b>1?1:B.b,a:B.a<0?0:B.a>1?1:B.a}
},mixColor:function(B,C,D){return A.addColor(A.scaleColor(D,B),A.scaleColor(1-D,C))
},diff2Color:function(F,E){var C=F.r-E.r;
var G=F.g-E.g;
var B=F.b-E.b;
var D=F.a-E.a;
return C*C+G*G+B*B+D*D
},length2Color:function(B){return B.r*B.r+B.g*B.g+B.b*B.b+B.a*B.a
},dot:function(B,C){return B.x*C.x+B.y*C.y+B.z*C.z
},scale:function(B,C){return{x:B*C.x,y:B*C.y,z:B*C.z}
},add:function(B,C){return{x:B.x+C.x,y:B.y+C.y,z:B.z+C.z}
},saturate:function(B){return Math.min(Math.max(B,0),1)
},length:function(B){return Math.sqrt(dojox.gfx3d.lighting.dot(B,B))
},normalize:function(B){return A.scale(1/A.length(B),B)
},faceforward:function(B,C){var E=dojox.gfx3d.lighting;
var D=E.dot(C,B)<0?1:-1;
return E.scale(D,B)
},reflect:function(C,B){var D=dojox.gfx3d.lighting;
return D.add(C,D.scale(-2*D.dot(C,B),B))
},diffuse:function(F,D){var C=A.black();
for(var E=0;
E<D.length;
++E){var B=D[E],G=A.dot(A.normalize(B.direction),F);
C=A.addColor(C,A.scaleColor(G,B.color))
}return A.saturateColor(C)
},specular:function(E,G,D,J){var F=A.black();
for(var B=0;
B<J.length;
++B){var I=J[B],C=A.normalize(A.add(A.normalize(I.direction),G)),H=Math.pow(Math.max(0,A.dot(E,C)),1/D);
F=A.addColor(F,A.scaleColor(H,I.color))
}return A.saturateColor(F)
},phong:function(D,F,H,B){D=A.normalize(D);
var E=A.black();
for(var C=0;
C<B.length;
++C){var J=B[C],I=A.reflect(A.scale(-1,A.normalize(F)),D),G=Math.pow(Math.max(0,A.dot(I,A.normalize(J.direction))),H);
E=A.addColor(E,A.scaleColor(G,J.color))
}return A.saturateColor(E)
}});
dojo.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(F,D,G,C){this.incident=A.normalize(F);
this.lights=[];
for(var E=0;
E<D.length;
++E){var B=D[E];
this.lights.push({direction:A.normalize(B.direction),color:A.toStdColor(B.color)})
}this.ambient=A.toStdColor(G.color?G.color:"white");
this.ambient=A.scaleColor(G.intensity,this.ambient);
this.ambient=A.scaleColor(this.ambient.a,this.ambient);
this.ambient.a=1;
this.specular=A.toStdColor(C?C:"white");
this.specular=A.scaleColor(this.specular.a,this.specular);
this.specular.a=1;
this.npr_cool={r:0,g:0,b:0.4,a:1};
this.npr_warm={r:0.4,g:0.4,b:0.2,a:1};
this.npr_alpha=0.2;
this.npr_beta=0.6;
this.npr_scale=0.6
},constant:function(B,D,E){E=A.toStdColor(E);
var F=E.a,C=A.scaleColor(F,E);
C.a=F;
return A.fromStdColor(A.saturateColor(C))
},matte:function(F,C,D){if(typeof C=="string"){C=A.finish[C]
}D=A.toStdColor(D);
F=A.faceforward(A.normalize(F),this.incident);
var E=A.scaleColor(C.Ka,this.ambient),B=A.saturate(-4*A.dot(F,this.incident)),H=A.scaleColor(B*C.Kd,A.diffuse(F,this.lights)),G=A.scaleColor(D.a,A.multiplyColor(D,A.addColor(E,H)));
G.a=D.a;
return A.fromStdColor(A.saturateColor(G))
},metal:function(D,H,I){if(typeof H=="string"){H=A.finish[H]
}I=A.toStdColor(I);
D=A.faceforward(A.normalize(D),this.incident);
var G=A.scale(-1,this.incident),C,F,B=A.scaleColor(H.Ka,this.ambient),E=A.saturate(-4*A.dot(D,this.incident));
if("phong" in H){C=A.scaleColor(E*H.Ks*H.phong,A.phong(D,G,H.phong_size,this.lights))
}else{C=A.scaleColor(E*H.Ks,A.specular(D,G,H.roughness,this.lights))
}F=A.scaleColor(I.a,A.addColor(A.multiplyColor(I,B),A.multiplyColor(this.specular,C)));
F.a=I.a;
return A.fromStdColor(A.saturateColor(F))
},plastic:function(B,D,I){if(typeof D=="string"){D=A.finish[D]
}I=A.toStdColor(I);
B=A.faceforward(A.normalize(B),this.incident);
var G=A.scale(-1,this.incident),E,J,C=A.scaleColor(D.Ka,this.ambient),F=A.saturate(-4*A.dot(B,this.incident)),H=A.scaleColor(F*D.Kd,A.diffuse(B,this.lights));
if("phong" in D){E=A.scaleColor(F*D.Ks*D.phong,A.phong(B,G,D.phong_size,this.lights))
}else{E=A.scaleColor(F*D.Ks,A.specular(B,G,D.roughness,this.lights))
}J=A.scaleColor(I.a,A.addColor(A.multiplyColor(I,A.addColor(C,H)),A.multiplyColor(this.specular,E)));
J.a=I.a;
return A.fromStdColor(A.saturateColor(J))
},npr:function(B,F,J){if(typeof F=="string"){F=A.finish[F]
}J=A.toStdColor(J);
B=A.faceforward(A.normalize(B),this.incident);
var E=A.scaleColor(F.Ka,this.ambient),G=A.saturate(-4*A.dot(B,this.incident)),H=A.scaleColor(G*F.Kd,A.diffuse(B,this.lights)),K=A.scaleColor(J.a,A.multiplyColor(J,A.addColor(E,H))),I=A.addColor(this.npr_cool,A.scaleColor(this.npr_alpha,K)),D=A.addColor(this.npr_warm,A.scaleColor(this.npr_beta,K)),C=(1+A.dot(this.incident,B))/2,K=A.scaleColor(this.npr_scale,A.addColor(K,A.mixColor(I,D,C)));
K.a=J.a;
return A.fromStdColor(A.saturateColor(K))
}})
})();
dojox.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}}
};