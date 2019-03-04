if(!dojo._hasResource["dojo.DeferredList"]){dojo._hasResource["dojo.DeferredList"]=true;
dojo.provide("dojo.DeferredList");
dojo.declare("dojo.DeferredList",dojo.Deferred,{constructor:function(F,E,A,D,C){this.list=F;
this.resultList=new Array(this.list.length);
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=C;
this.silentlyCancelled=false;
if(this.list.length===0&&!E){this.callback(this.resultList)
}this.finishedCount=0;
this.fireOnOneCallback=E;
this.fireOnOneErrback=A;
this.consumeErrors=D;
var B=0;
dojo.forEach(this.list,function(H,G){H.addCallback(this,function(I){this._cbDeferred(G,true,I);
return I
});
H.addErrback(this,function(I){this._cbDeferred(G,false,I);
return I
});
G++
},this)
},_cbDeferred:function(B,C,A){this.resultList[B]=[C,A];
this.finishedCount+=1;
if(this.fired!==0){if(C&&this.fireOnOneCallback){this.callback([B,A])
}else{if(!C&&this.fireOnOneErrback){this.errback(A)
}else{if(this.finishedCount==this.list.length){this.callback(this.resultList)
}}}}if(!C&&this.consumeErrors){A=null
}return A
},gatherResults:function(A){var B=new dojo.DeferedList(A,false,true,false);
B.addCallback(function(E){var C=[];
for(var D=0;
D<E.length;
D++){C.push(E[D][1])
}return C
});
return B
}})
};