if(!dojo._hasResource["dojox.encoding.bits"]){dojo._hasResource["dojox.encoding.bits"]=true;
dojo.provide("dojox.encoding.bits");
dojox.encoding.bits.OutputStream=function(){this.reset()
};
dojo.extend(dojox.encoding.bits.OutputStream,{reset:function(){this.buffer=[];
this.accumulator=0;
this.available=8
},putBits:function(C,B){while(B){var D=Math.min(B,this.available);
var A=(D<=B?C>>>(B-D):C)<<(this.available-D);
this.accumulator|=A&(255>>>(8-this.available));
this.available-=D;
if(!this.available){this.buffer.push(this.accumulator);
this.accumulator=0;
this.available=8
}B-=D
}},getWidth:function(){return this.buffer.length*8+(8-this.available)
},getBuffer:function(){var A=this.buffer;
if(this.available<8){A.push(this.accumulator&(255<<this.available))
}this.reset();
return A
}});
dojox.encoding.bits.InputStream=function(B,A){this.buffer=B;
this.width=A;
this.bbyte=this.bit=0
};
dojo.extend(dojox.encoding.bits.InputStream,{getBits:function(B){var C=0;
while(B){var D=Math.min(B,8-this.bit);
var A=this.buffer[this.bbyte]>>>(8-this.bit-D);
C<<=D;
C|=A&~(~0<<D);
this.bit+=D;
if(this.bit==8){++this.bbyte;
this.bit=0
}B-=D
}return C
},getWidth:function(){return this.width-this.bbyte*8-this.bit
}})
};