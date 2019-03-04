if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
dojo.require("dojo._base.array");
dojo.require("dojo._base.lang");
dojo.Color=function(A){if(A){this.setColor(A)
}};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(E,D,A,B){var C=this;
C.r=E;
C.g=D;
C.b=A;
C.a=B
},setColor:function(A){var B=dojo;
if(B.isString(A)){B.colorFromString(A,this)
}else{if(B.isArray(A)){B.colorFromArray(A,this)
}else{this._set(A.r,A.g,A.b,A.a);
if(!(A instanceof B.Color)){this.sanitize()
}}}return this
},sanitize:function(){return this
},toRgb:function(){var A=this;
return[A.r,A.g,A.b]
},toRgba:function(){var A=this;
return[A.r,A.g,A.b,A.a]
},toHex:function(){var A=dojo.map(["r","g","b"],function(B){var C=this[B].toString(16);
return C.length<2?"0"+C:C
},this);
return"#"+A.join("")
},toCss:function(A){var C=this,B=C.r+", "+C.g+", "+C.b;
return(A?"rgba("+B+", "+C.a:"rgb("+B)+")"
},toString:function(){return this.toCss(true)
}});
dojo.blendColors=function(F,A,C,D){var E=dojo,B=D||new dojo.Color();
E.forEach(["r","g","b","a"],function(G){B[G]=F[G]+(A[G]-F[G])*C;
if(G!="a"){B[G]=Math.round(B[G])
}});
return B.sanitize()
};
dojo.colorFromRgb=function(B,C){var A=B.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return A&&dojo.colorFromArray(A[1].split(/\s*,\s*/),C)
};
dojo.colorFromHex=function(B,E){var F=dojo,C=E||new F.Color(),D=(B.length==4)?4:8,A=(1<<D)-1;
B=Number("0x"+B.substr(1));
if(isNaN(B)){return null
}F.forEach(["b","g","r"],function(G){var H=B&A;
B>>=D;
C[G]=D==4?17*H:H
});
C.a=1;
return C
};
dojo.colorFromArray=function(A,C){var B=C||new dojo.Color();
B._set(Number(A[0]),Number(A[1]),Number(A[2]),Number(A[3]));
if(isNaN(B.a)){B.a=1
}return B.sanitize()
};
dojo.colorFromString=function(C,B){var A=dojo.Color.named[C];
return A&&dojo.colorFromArray(A,B)||dojo.colorFromRgb(C,B)||dojo.colorFromHex(C,B)
}
};