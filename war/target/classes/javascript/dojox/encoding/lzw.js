if(!dojo._hasResource["dojox.encoding.lzw"]){dojo._hasResource["dojox.encoding.lzw"]=true;
dojo.provide("dojox.encoding.lzw");
(function(){var A=function(B){var C=1;
for(var D=2;
B>=D;
D<<=1,++C){}return C
};
dojox.encoding.lzw.Encoder=function(B){this.size=B;
this.init()
};
dojo.extend(dojox.encoding.lzw.Encoder,{init:function(){this.dict={};
for(var B=0;
B<this.size;
++B){this.dict[String.fromCharCode(B)]=B
}this.width=A(this.code=this.size);
this.p=""
},encode:function(C,E){var F=String.fromCharCode(C),D=this.p+F,B=0;
if(D in this.dict){this.p=D;
return B
}E.putBits(this.dict[this.p],this.width);
if((this.code&(this.code+1))==0){E.putBits(this.code++,B=this.width++)
}this.dict[D]=this.code++;
this.p=F;
return B+this.width
},flush:function(B){if(this.p.length==0){return 0
}B.putBits(this.dict[this.p],this.width);
this.p="";
return this.width
}});
dojox.encoding.lzw.Decoder=function(B){this.size=B;
this.init()
};
dojo.extend(dojox.encoding.lzw.Decoder,{init:function(){this.codes=new Array(this.size);
for(var B=0;
B<this.size;
++B){this.codes[B]=String.fromCharCode(B)
}this.width=A(this.size);
this.p=-1
},decode:function(D){var E=D.getBits(this.width),C;
if(E<this.codes.length){C=this.codes[E];
if(this.p>=0){this.codes.push(this.codes[this.p]+C.substr(0,1))
}}else{if((E&(E+1))==0){this.codes.push("");
++this.width;
return""
}var B=this.codes[this.p];
C=B+B.substr(0,1);
this.codes.push(C)
}this.p=E;
return C
}})
})()
};