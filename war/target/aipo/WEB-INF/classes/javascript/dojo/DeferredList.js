if(!dojo._hasResource["dojo.DeferredList"]){dojo._hasResource["dojo.DeferredList"]=true;
dojo.provide("dojo.DeferredList");
dojo.declare("dojo.DeferredList",dojo.Deferred,{constructor:function(E,D,F,C,B){this.list=E;
this.resultList=new Array(this.list.length);
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=B;
this.silentlyCancelled=false;
if(this.list.length===0&&!D){this.callback(this.resultList)
}this.finishedCount=0;
this.fireOnOneCallback=D;
this.fireOnOneErrback=F;
this.consumeErrors=C;
var A=0;
dojo.forEach(this.list,function(G,H){G.addCallback(this,function(I){this._cbDeferred(H,true,I);
return I
});
G.addErrback(this,function(I){this._cbDeferred(H,false,I);
return I
});
H++
},this)
},_cbDeferred:function(A,B,C){this.resultList[A]=[B,C];
this.finishedCount+=1;
if(this.fired!==0){if(B&&this.fireOnOneCallback){this.callback([A,C])
}else{if(!B&&this.fireOnOneErrback){this.errback(C)
}else{if(this.finishedCount==this.list.length){this.callback(this.resultList)
}}}}if(!B&&this.consumeErrors){C=null
}return C
},gatherResults:function(B){var A=new dojo.DeferedList(B,false,true,false);
A.addCallback(function(C){var D=[];
for(var E=0;
E<C.length;
E++){D.push(C[E][1])
}return D
});
return A
}})
};