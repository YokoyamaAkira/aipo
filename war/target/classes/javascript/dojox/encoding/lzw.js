if(!dojo._hasResource["dojox.encoding.lzw"]){dojo._hasResource["dojox.encoding.lzw"]=true;
dojo.provide("dojox.encoding.lzw");
(function(){var A=function(C){var D=1;
for(var B=2;
C>=B;
B<<=1,++D){}return D
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
},encode:function(D,F){var B=String.fromCharCode(D),E=this.p+B,C=0;
if(E in this.dict){this.p=E;
return C
}F.putBits(this.dict[this.p],this.width);
if((this.code&(this.code+1))==0){F.putBits(this.code++,C=this.width++)
}this.dict[E]=this.code++;
this.p=B;
return C+this.width
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
},decode:function(E){var B=E.getBits(this.width),D;
if(B<this.codes.length){D=this.codes[B];
if(this.p>=0){this.codes.push(this.codes[this.p]+D.substr(0,1))
}}else{if((B&(B+1))==0){this.codes.push("");
++this.width;
return""
}var C=this.codes[this.p];
D=C+C.substr(0,1);
this.codes.push(D)
}this.p=B;
return D
}})
})()
};