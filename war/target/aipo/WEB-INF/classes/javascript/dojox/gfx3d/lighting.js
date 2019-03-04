if(!dojo._hasResource["dojox.gfx3d.lighting"]){dojo._hasResource["dojox.gfx3d.lighting"]=true;
dojo.provide("dojox.gfx3d.lighting");
dojo.require("dojox.gfx._base");
(function(){var A=dojox.gfx3d.lighting;
dojo.mixin(dojox.gfx3d.lighting,{black:function(){return{r:0,g:0,b:0,a:1}
},white:function(){return{r:1,g:1,b:1,a:1}
},toStdColor:function(B){B=dojox.gfx.normalizeColor(B);
return{r:B.r/255,g:B.g/255,b:B.b/255,a:B.a}
},fromStdColor:function(B){return new dojo.Color([Math.round(255*B.r),Math.round(255*B.g),Math.round(255*B.b),B.a])
},scaleColor:function(B,C){return{r:B*C.r,g:B*C.g,b:B*C.b,a:B*C.a}
},addColor:function(C,B){return{r:C.r+B.r,g:C.g+B.g,b:C.b+B.b,a:C.a+B.a}
},multiplyColor:function(C,B){return{r:C.r*B.r,g:C.g*B.g,b:C.b*B.b,a:C.a*B.a}
},saturateColor:function(B){return{r:B.r<0?0:B.r>1?1:B.r,g:B.g<0?0:B.g>1?1:B.g,b:B.b<0?0:B.b>1?1:B.b,a:B.a<0?0:B.a>1?1:B.a}
},mixColor:function(D,B,C){return A.addColor(A.scaleColor(C,D),A.scaleColor(1-C,B))
},diff2Color:function(E,D){var G=E.r-D.r;
var F=E.g-D.g;
var B=E.b-D.b;
var C=E.a-D.a;
return G*G+F*F+B*B+C*C
},length2Color:function(B){return B.r*B.r+B.g*B.g+B.b*B.b+B.a*B.a
},dot:function(C,B){return C.x*B.x+C.y*B.y+C.z*B.z
},scale:function(C,B){return{x:C*B.x,y:C*B.y,z:C*B.z}
},add:function(C,B){return{x:C.x+B.x,y:C.y+B.y,z:C.z+B.z}
},saturate:function(B){return Math.min(Math.max(B,0),1)
},length:function(B){return Math.sqrt(dojox.gfx3d.lighting.dot(B,B))
},normalize:function(B){return A.scale(1/A.length(B),B)
},faceforward:function(E,B){var D=dojox.gfx3d.lighting;
var C=D.dot(B,E)<0?1:-1;
return D.scale(C,E)
},reflect:function(B,D){var C=dojox.gfx3d.lighting;
return C.add(B,C.scale(-2*C.dot(B,D),D))
},diffuse:function(E,C){var G=A.black();
for(var D=0;
D<C.length;
++D){var B=C[D],F=A.dot(A.normalize(B.direction),E);
G=A.addColor(G,A.scaleColor(F,B.color))
}return A.saturateColor(G)
},specular:function(G,I,F,C){var H=A.black();
for(var D=0;
D<C.length;
++D){var B=C[D],E=A.normalize(A.add(A.normalize(B.direction),I)),J=Math.pow(Math.max(0,A.dot(G,E)),1/F);
H=A.addColor(H,A.scaleColor(J,B.color))
}return A.saturateColor(H)
},phong:function(F,H,J,D){F=A.normalize(F);
var G=A.black();
for(var E=0;
E<D.length;
++E){var C=D[E],B=A.reflect(A.scale(-1,A.normalize(H)),F),I=Math.pow(Math.max(0,A.dot(B,A.normalize(C.direction))),J);
G=A.addColor(G,A.scaleColor(I,C.color))
}return A.saturateColor(G)
}});
dojo.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(E,C,F,G){this.incident=A.normalize(E);
this.lights=[];
for(var D=0;
D<C.length;
++D){var B=C[D];
this.lights.push({direction:A.normalize(B.direction),color:A.toStdColor(B.color)})
}this.ambient=A.toStdColor(F.color?F.color:"white");
this.ambient=A.scaleColor(F.intensity,this.ambient);
this.ambient=A.scaleColor(this.ambient.a,this.ambient);
this.ambient.a=1;
this.specular=A.toStdColor(G?G:"white");
this.specular=A.scaleColor(this.specular.a,this.specular);
this.specular.a=1;
this.npr_cool={r:0,g:0,b:0.4,a:1};
this.npr_warm={r:0.4,g:0.4,b:0.2,a:1};
this.npr_alpha=0.2;
this.npr_beta=0.6;
this.npr_scale=0.6
},constant:function(F,C,D){D=A.toStdColor(D);
var E=D.a,B=A.scaleColor(E,D);
B.a=E;
return A.fromStdColor(A.saturateColor(B))
},matte:function(G,D,E){if(typeof D=="string"){D=A.finish[D]
}E=A.toStdColor(E);
G=A.faceforward(A.normalize(G),this.incident);
var F=A.scaleColor(D.Ka,this.ambient),H=A.saturate(-4*A.dot(G,this.incident)),C=A.scaleColor(H*D.Kd,A.diffuse(G,this.lights)),B=A.scaleColor(E.a,A.multiplyColor(E,A.addColor(F,C)));
B.a=E.a;
return A.fromStdColor(A.saturateColor(B))
},metal:function(G,D,E){if(typeof D=="string"){D=A.finish[D]
}E=A.toStdColor(E);
G=A.faceforward(A.normalize(G),this.incident);
var C=A.scale(-1,this.incident),I,B,F=A.scaleColor(D.Ka,this.ambient),H=A.saturate(-4*A.dot(G,this.incident));
if("phong" in D){I=A.scaleColor(H*D.Ks*D.phong,A.phong(G,C,D.phong_size,this.lights))
}else{I=A.scaleColor(H*D.Ks,A.specular(G,C,D.roughness,this.lights))
}B=A.scaleColor(E.a,A.addColor(A.multiplyColor(E,F),A.multiplyColor(this.specular,I)));
B.a=E.a;
return A.fromStdColor(A.saturateColor(B))
},plastic:function(D,F,B){if(typeof F=="string"){F=A.finish[F]
}B=A.toStdColor(B);
D=A.faceforward(A.normalize(D),this.incident);
var I=A.scale(-1,this.incident),G,C,E=A.scaleColor(F.Ka,this.ambient),H=A.saturate(-4*A.dot(D,this.incident)),J=A.scaleColor(H*F.Kd,A.diffuse(D,this.lights));
if("phong" in F){G=A.scaleColor(H*F.Ks*F.phong,A.phong(D,I,F.phong_size,this.lights))
}else{G=A.scaleColor(H*F.Ks,A.specular(D,I,F.roughness,this.lights))
}C=A.scaleColor(B.a,A.addColor(A.multiplyColor(B,A.addColor(E,J)),A.multiplyColor(this.specular,G)));
C.a=B.a;
return A.fromStdColor(A.saturateColor(C))
},npr:function(D,H,B){if(typeof H=="string"){H=A.finish[H]
}B=A.toStdColor(B);
D=A.faceforward(A.normalize(D),this.incident);
var G=A.scaleColor(H.Ka,this.ambient),I=A.saturate(-4*A.dot(D,this.incident)),J=A.scaleColor(I*H.Kd,A.diffuse(D,this.lights)),C=A.scaleColor(B.a,A.multiplyColor(B,A.addColor(G,J))),K=A.addColor(this.npr_cool,A.scaleColor(this.npr_alpha,C)),F=A.addColor(this.npr_warm,A.scaleColor(this.npr_beta,C)),E=(1+A.dot(this.incident,D))/2,C=A.scaleColor(this.npr_scale,A.addColor(C,A.mixColor(K,F,E)));
C.a=B.a;
return A.fromStdColor(A.saturateColor(C))
}})
})();
dojox.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}}
};