dojo._xdResourceLoaded({depends:[["provide","dojo._base.Color"],["require","dojo._base.array"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.Color"]){A._hasResource["dojo._base.Color"]=true;
A.provide("dojo._base.Color");
A.require("dojo._base.array");
A.require("dojo._base.lang");
A.Color=function(B){if(B){this.setColor(B)
}};
A.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
A.extend(A.Color,{r:255,g:255,b:255,a:1,_set:function(F,E,B,C){var D=this;
D.r=F;
D.g=E;
D.b=B;
D.a=C
},setColor:function(B){var C=A;
if(C.isString(B)){C.colorFromString(B,this)
}else{if(C.isArray(B)){C.colorFromArray(B,this)
}else{this._set(B.r,B.g,B.b,B.a);
if(!(B instanceof C.Color)){this.sanitize()
}}}return this
},sanitize:function(){return this
},toRgb:function(){var B=this;
return[B.r,B.g,B.b]
},toRgba:function(){var B=this;
return[B.r,B.g,B.b,B.a]
},toHex:function(){var B=A.map(["r","g","b"],function(C){var D=this[C].toString(16);
return D.length<2?"0"+D:D
},this);
return"#"+B.join("")
},toCss:function(B){var D=this,C=D.r+", "+D.g+", "+D.b;
return(B?"rgba("+C+", "+D.a:"rgb("+C)+")"
},toString:function(){return this.toCss(true)
}});
A.blendColors=function(G,B,D,E){var F=A,C=E||new A.Color();
F.forEach(["r","g","b","a"],function(H){C[H]=G[H]+(B[H]-G[H])*D;
if(H!="a"){C[H]=Math.round(C[H])
}});
return C.sanitize()
};
A.colorFromRgb=function(C,D){var B=C.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return B&&A.colorFromArray(B[1].split(/\s*,\s*/),D)
};
A.colorFromHex=function(C,F){var G=A,D=F||new G.Color(),E=(C.length==4)?4:8,B=(1<<E)-1;
C=Number("0x"+C.substr(1));
if(isNaN(C)){return null
}G.forEach(["b","g","r"],function(H){var I=C&B;
C>>=E;
D[H]=E==4?17*I:I
});
D.a=1;
return D
};
A.colorFromArray=function(B,D){var C=D||new A.Color();
C._set(Number(B[0]),Number(B[1]),Number(B[2]),Number(B[3]));
if(isNaN(C.a)){C.a=1
}return C.sanitize()
};
A.colorFromString=function(D,C){var B=A.Color.named[D];
return B&&A.colorFromArray(B,C)||A.colorFromRgb(D,C)||A.colorFromHex(D,C)
}
}}});