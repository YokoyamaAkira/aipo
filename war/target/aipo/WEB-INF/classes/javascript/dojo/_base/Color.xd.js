dojo._xdResourceLoaded({depends:[["provide","dojo._base.Color"],["require","dojo._base.array"],["require","dojo._base.lang"]],defineResource:function(A){if(!A._hasResource["dojo._base.Color"]){A._hasResource["dojo._base.Color"]=true;
A.provide("dojo._base.Color");
A.require("dojo._base.array");
A.require("dojo._base.lang");
A.Color=function(B){if(B){this.setColor(B)
}};
A.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
A.extend(A.Color,{r:255,g:255,b:255,a:1,_set:function(B,F,C,D){var E=this;
E.r=B;
E.g=F;
E.b=C;
E.a=D
},setColor:function(C){var B=A;
if(B.isString(C)){B.colorFromString(C,this)
}else{if(B.isArray(C)){B.colorFromArray(C,this)
}else{this._set(C.r,C.g,C.b,C.a);
if(!(C instanceof B.Color)){this.sanitize()
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
},toCss:function(C){var B=this,D=B.r+", "+B.g+", "+B.b;
return(C?"rgba("+D+", "+B.a:"rgb("+D)+")"
},toString:function(){return this.toCss(true)
}});
A.blendColors=function(C,B,E,F){var G=A,D=F||new A.Color();
G.forEach(["r","g","b","a"],function(H){D[H]=C[H]+(B[H]-C[H])*E;
if(H!="a"){D[H]=Math.round(D[H])
}});
return D.sanitize()
};
A.colorFromRgb=function(D,B){var C=D.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return C&&A.colorFromArray(C[1].split(/\s*,\s*/),B)
};
A.colorFromHex=function(D,G){var C=A,E=G||new C.Color(),F=(D.length==4)?4:8,B=(1<<F)-1;
D=Number("0x"+D.substr(1));
if(isNaN(D)){return null
}C.forEach(["b","g","r"],function(H){var I=D&B;
D>>=F;
E[H]=F==4?17*I:I
});
E.a=1;
return E
};
A.colorFromArray=function(C,B){var D=B||new A.Color();
D._set(Number(C[0]),Number(C[1]),Number(C[2]),Number(C[3]));
if(isNaN(D.a)){D.a=1
}return D.sanitize()
};
A.colorFromString=function(B,D){var C=A.Color.named[B];
return C&&A.colorFromArray(C,D)||A.colorFromRgb(B,D)||A.colorFromHex(B,D)
}
}}});