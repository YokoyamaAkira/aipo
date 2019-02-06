dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.bits"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.bits"]){A._hasResource["dojox.encoding.bits"]=true;
A.provide("dojox.encoding.bits");
dojox.encoding.bits.OutputStream=function(){this.reset()
};
A.extend(dojox.encoding.bits.OutputStream,{reset:function(){this.buffer=[];
this.accumulator=0;
this.available=8
},putBits:function(B,E){while(E){var C=Math.min(E,this.available);
var D=(C<=E?B>>>(E-C):B)<<(this.available-C);
this.accumulator|=D&(255>>>(8-this.available));
this.available-=C;
if(!this.available){this.buffer.push(this.accumulator);
this.accumulator=0;
this.available=8
}E-=C
}},getWidth:function(){return this.buffer.length*8+(8-this.available)
},getBuffer:function(){var B=this.buffer;
if(this.available<8){B.push(this.accumulator&(255<<this.available))
}this.reset();
return B
}});
dojox.encoding.bits.InputStream=function(C,B){this.buffer=C;
this.width=B;
this.bbyte=this.bit=0
};
A.extend(dojox.encoding.bits.InputStream,{getBits:function(E){var B=0;
while(E){var C=Math.min(E,8-this.bit);
var D=this.buffer[this.bbyte]>>>(8-this.bit-C);
B<<=C;
B|=D&~(~0<<C);
this.bit+=C;
if(this.bit==8){++this.bbyte;
this.bit=0
}E-=C
}return B
},getWidth:function(){return this.width-this.bbyte*8-this.bit
}})
}}});