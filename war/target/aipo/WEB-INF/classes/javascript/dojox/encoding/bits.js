if(!dojo._hasResource["dojox.encoding.bits"]){dojo._hasResource["dojox.encoding.bits"]=true;
dojo.provide("dojox.encoding.bits");
dojox.encoding.bits.OutputStream=function(){this.reset()
};
dojo.extend(dojox.encoding.bits.OutputStream,{reset:function(){this.buffer=[];
this.accumulator=0;
this.available=8
},putBits:function(D,C){while(C){var A=Math.min(C,this.available);
var B=(A<=C?D>>>(C-A):D)<<(this.available-A);
this.accumulator|=B&(255>>>(8-this.available));
this.available-=A;
if(!this.available){this.buffer.push(this.accumulator);
this.accumulator=0;
this.available=8
}C-=A
}},getWidth:function(){return this.buffer.length*8+(8-this.available)
},getBuffer:function(){var A=this.buffer;
if(this.available<8){A.push(this.accumulator&(255<<this.available))
}this.reset();
return A
}});
dojox.encoding.bits.InputStream=function(A,B){this.buffer=A;
this.width=B;
this.bbyte=this.bit=0
};
dojo.extend(dojox.encoding.bits.InputStream,{getBits:function(C){var D=0;
while(C){var A=Math.min(C,8-this.bit);
var B=this.buffer[this.bbyte]>>>(8-this.bit-A);
D<<=A;
D|=B&~(~0<<A);
this.bit+=A;
if(this.bit==8){++this.bbyte;
this.bit=0
}C-=A
}return D
},getWidth:function(){return this.width-this.bbyte*8-this.bit
}})
};