dojo._xdResourceLoaded({depends:[["provide","dojo.DeferredList"]],defineResource:function(A){if(!A._hasResource["dojo.DeferredList"]){A._hasResource["dojo.DeferredList"]=true;
A.provide("dojo.DeferredList");
A.declare("dojo.DeferredList",A.Deferred,{constructor:function(G,F,B,E,D){this.list=G;
this.resultList=new Array(this.list.length);
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=D;
this.silentlyCancelled=false;
if(this.list.length===0&&!F){this.callback(this.resultList)
}this.finishedCount=0;
this.fireOnOneCallback=F;
this.fireOnOneErrback=B;
this.consumeErrors=E;
var C=0;
A.forEach(this.list,function(I,H){I.addCallback(this,function(J){this._cbDeferred(H,true,J);
return J
});
I.addErrback(this,function(J){this._cbDeferred(H,false,J);
return J
});
H++
},this)
},_cbDeferred:function(C,D,B){this.resultList[C]=[D,B];
this.finishedCount+=1;
if(this.fired!==0){if(D&&this.fireOnOneCallback){this.callback([C,B])
}else{if(!D&&this.fireOnOneErrback){this.errback(B)
}else{if(this.finishedCount==this.list.length){this.callback(this.resultList)
}}}}if(!D&&this.consumeErrors){B=null
}return B
},gatherResults:function(B){var C=new A.DeferedList(B,false,true,false);
C.addCallback(function(F){var D=[];
for(var E=0;
E<F.length;
E++){D.push(F[E][1])
}return D
});
return C
}})
}}});