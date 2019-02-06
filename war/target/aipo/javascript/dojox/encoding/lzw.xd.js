dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.lzw"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.lzw"]){A._hasResource["dojox.encoding.lzw"]=true;
A.provide("dojox.encoding.lzw");
(function(){var B=function(C){var D=1;
for(var E=2;
C>=E;
E<<=1,++D){}return D
};
dojox.encoding.lzw.Encoder=function(C){this.size=C;
this.init()
};
A.extend(dojox.encoding.lzw.Encoder,{init:function(){this.dict={};
for(var C=0;
C<this.size;
++C){this.dict[String.fromCharCode(C)]=C
}this.width=B(this.code=this.size);
this.p=""
},encode:function(D,F){var G=String.fromCharCode(D),E=this.p+G,C=0;
if(E in this.dict){this.p=E;
return C
}F.putBits(this.dict[this.p],this.width);
if((this.code&(this.code+1))==0){F.putBits(this.code++,C=this.width++)
}this.dict[E]=this.code++;
this.p=G;
return C+this.width
},flush:function(C){if(this.p.length==0){return 0
}C.putBits(this.dict[this.p],this.width);
this.p="";
return this.width
}});
dojox.encoding.lzw.Decoder=function(C){this.size=C;
this.init()
};
A.extend(dojox.encoding.lzw.Decoder,{init:function(){this.codes=new Array(this.size);
for(var C=0;
C<this.size;
++C){this.codes[C]=String.fromCharCode(C)
}this.width=B(this.size);
this.p=-1
},decode:function(E){var F=E.getBits(this.width),D;
if(F<this.codes.length){D=this.codes[F];
if(this.p>=0){this.codes.push(this.codes[this.p]+D.substr(0,1))
}}else{if((F&(F+1))==0){this.codes.push("");
++this.width;
return""
}var C=this.codes[this.p];
D=C+C.substr(0,1);
this.codes.push(D)
}this.p=F;
return D
}})
})()
}}});