dojo._xdResourceLoaded({depends:[["provide","dojox.encoding.bits"]],defineResource:function(A){if(!A._hasResource["dojox.encoding.bits"]){A._hasResource["dojox.encoding.bits"]=true;
A.provide("dojox.encoding.bits");
dojox.encoding.bits.OutputStream=function(){this.reset()
};
A.extend(dojox.encoding.bits.OutputStream,{reset:function(){this.buffer=[];
this.accumulator=0;
this.available=8
},putBits:function(E,D){while(D){var B=Math.min(D,this.available);
var C=(B<=D?E>>>(D-B):E)<<(this.available-B);
this.accumulator|=C&(255>>>(8-this.available));
this.available-=B;
if(!this.available){this.buffer.push(this.accumulator);
this.accumulator=0;
this.available=8
}D-=B
}},getWidth:function(){return this.buffer.length*8+(8-this.available)
},getBuffer:function(){var B=this.buffer;
if(this.available<8){B.push(this.accumulator&(255<<this.available))
}this.reset();
return B
}});
dojox.encoding.bits.InputStream=function(B,C){this.buffer=B;
this.width=C;
this.bbyte=this.bit=0
};
A.extend(dojox.encoding.bits.InputStream,{getBits:function(D){var E=0;
while(D){var B=Math.min(D,8-this.bit);
var C=this.buffer[this.bbyte]>>>(8-this.bit-B);
E<<=B;
E|=C&~(~0<<B);
this.bit+=B;
if(this.bit==8){++this.bbyte;
this.bit=0
}D-=B
}return E
},getWidth:function(){return this.width-this.bbyte*8-this.bit
}})
}}});