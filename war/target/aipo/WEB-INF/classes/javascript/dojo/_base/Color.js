if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
dojo.require("dojo._base.array");
dojo.require("dojo._base.lang");
dojo.Color=function(A){if(A){this.setColor(A)
}};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(D,C,E,A){var B=this;
B.r=D;
B.g=C;
B.b=E;
B.a=A
},setColor:function(B){var A=dojo;
if(A.isString(B)){A.colorFromString(B,this)
}else{if(A.isArray(B)){A.colorFromArray(B,this)
}else{this._set(B.r,B.g,B.b,B.a);
if(!(B instanceof A.Color)){this.sanitize()
}}}return this
},sanitize:function(){return this
},toRgb:function(){var A=this;
return[A.r,A.g,A.b]
},toRgba:function(){var A=this;
return[A.r,A.g,A.b,A.a]
},toHex:function(){var A=dojo.map(["r","g","b"],function(C){var B=this[C].toString(16);
return B.length<2?"0"+B:B
},this);
return"#"+A.join("")
},toCss:function(C){var B=this,A=B.r+", "+B.g+", "+B.b;
return(C?"rgba("+A+", "+B.a:"rgb("+A)+")"
},toString:function(){return this.toCss(true)
}});
dojo.blendColors=function(E,F,B,C){var D=dojo,A=C||new dojo.Color();
D.forEach(["r","g","b","a"],function(G){A[G]=E[G]+(F[G]-E[G])*B;
if(G!="a"){A[G]=Math.round(A[G])
}});
return A.sanitize()
};
dojo.colorFromRgb=function(A,B){var C=A.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return C&&dojo.colorFromArray(C[1].split(/\s*,\s*/),B)
};
dojo.colorFromHex=function(A,D){var E=dojo,B=D||new E.Color(),C=(A.length==4)?4:8,F=(1<<C)-1;
A=Number("0x"+A.substr(1));
if(isNaN(A)){return null
}E.forEach(["b","g","r"],function(H){var G=A&F;
A>>=C;
B[H]=C==4?17*G:G
});
B.a=1;
return B
};
dojo.colorFromArray=function(C,B){var A=B||new dojo.Color();
A._set(Number(C[0]),Number(C[1]),Number(C[2]),Number(C[3]));
if(isNaN(A.a)){A.a=1
}return A.sanitize()
};
dojo.colorFromString=function(B,A){var C=dojo.Color.named[B];
return C&&dojo.colorFromArray(C,A)||dojo.colorFromRgb(B,A)||dojo.colorFromHex(B,A)
}
};