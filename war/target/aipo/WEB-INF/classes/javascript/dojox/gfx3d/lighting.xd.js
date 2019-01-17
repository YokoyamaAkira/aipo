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
},diff2Color:function(F,E){var H=F.r-E.r;
var G=F.g-E.g;
var C=F.b-E.b;
var D=F.a-E.a;
return H*H+G*G+C*C+D*D
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
},diffuse:function(F,D){var H=B.black();
for(var E=0;
E<D.length;
++E){var C=D[E],G=B.dot(B.normalize(C.direction),F);
H=B.addColor(H,B.scaleColor(G,C.color))
}return B.saturateColor(H)
},specular:function(H,J,G,D){var I=B.black();
for(var E=0;
E<D.length;
++E){var C=D[E],F=B.normalize(B.add(B.normalize(C.direction),J)),K=Math.pow(Math.max(0,B.dot(H,F)),1/G);
I=B.addColor(I,B.scaleColor(K,C.color))
}return B.saturateColor(I)
},phong:function(G,I,K,E){G=B.normalize(G);
var H=B.black();
for(var F=0;
F<E.length;
++F){var D=E[F],C=B.reflect(B.scale(-1,B.normalize(I)),G),J=Math.pow(Math.max(0,B.dot(C,B.normalize(D.direction))),K);
H=B.addColor(H,B.scaleColor(J,D.color))
}return B.saturateColor(H)
}});
A.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(F,D,G,H){this.incident=B.normalize(F);
this.lights=[];
for(var E=0;
E<D.length;
++E){var C=D[E];
this.lights.push({direction:B.normalize(C.direction),color:B.toStdColor(C.color)})
}this.ambient=B.toStdColor(G.color?G.color:"white");
this.ambient=B.scaleColor(G.intensity,this.ambient);
this.ambient=B.scaleColor(this.ambient.a,this.ambient);
this.ambient.a=1;
this.specular=B.toStdColor(H?H:"white");
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
},matte:function(H,E,F){if(typeof E=="string"){E=B.finish[E]
}F=B.toStdColor(F);
H=B.faceforward(B.normalize(H),this.incident);
var G=B.scaleColor(E.Ka,this.ambient),I=B.saturate(-4*B.dot(H,this.incident)),D=B.scaleColor(I*E.Kd,B.diffuse(H,this.lights)),C=B.scaleColor(F.a,B.multiplyColor(F,B.addColor(G,D)));
C.a=F.a;
return B.fromStdColor(B.saturateColor(C))
},metal:function(H,E,F){if(typeof E=="string"){E=B.finish[E]
}F=B.toStdColor(F);
H=B.faceforward(B.normalize(H),this.incident);
var D=B.scale(-1,this.incident),J,C,G=B.scaleColor(E.Ka,this.ambient),I=B.saturate(-4*B.dot(H,this.incident));
if("phong" in E){J=B.scaleColor(I*E.Ks*E.phong,B.phong(H,D,E.phong_size,this.lights))
}else{J=B.scaleColor(I*E.Ks,B.specular(H,D,E.roughness,this.lights))
}C=B.scaleColor(F.a,B.addColor(B.multiplyColor(F,G),B.multiplyColor(this.specular,J)));
C.a=F.a;
return B.fromStdColor(B.saturateColor(C))
},plastic:function(E,G,C){if(typeof G=="string"){G=B.finish[G]
}C=B.toStdColor(C);
E=B.faceforward(B.normalize(E),this.incident);
var J=B.scale(-1,this.incident),H,D,F=B.scaleColor(G.Ka,this.ambient),I=B.saturate(-4*B.dot(E,this.incident)),K=B.scaleColor(I*G.Kd,B.diffuse(E,this.lights));
if("phong" in G){H=B.scaleColor(I*G.Ks*G.phong,B.phong(E,J,G.phong_size,this.lights))
}else{H=B.scaleColor(I*G.Ks,B.specular(E,J,G.roughness,this.lights))
}D=B.scaleColor(C.a,B.addColor(B.multiplyColor(C,B.addColor(F,K)),B.multiplyColor(this.specular,H)));
D.a=C.a;
return B.fromStdColor(B.saturateColor(D))
},npr:function(E,I,C){if(typeof I=="string"){I=B.finish[I]
}C=B.toStdColor(C);
E=B.faceforward(B.normalize(E),this.incident);
var H=B.scaleColor(I.Ka,this.ambient),J=B.saturate(-4*B.dot(E,this.incident)),K=B.scaleColor(J*I.Kd,B.diffuse(E,this.lights)),D=B.scaleColor(C.a,B.multiplyColor(C,B.addColor(H,K))),L=B.addColor(this.npr_cool,B.scaleColor(this.npr_alpha,D)),G=B.addColor(this.npr_warm,B.scaleColor(this.npr_beta,D)),F=(1+B.dot(this.incident,E))/2,D=B.scaleColor(this.npr_scale,B.addColor(D,B.mixColor(L,G,F)));
D.a=C.a;
return B.fromStdColor(B.saturateColor(D))
}})
})();
dojox.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}}
}}});