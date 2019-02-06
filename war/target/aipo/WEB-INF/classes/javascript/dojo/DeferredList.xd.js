dojo._xdResourceLoaded({depends:[["provide","dojo.DeferredList"]],defineResource:function(A){if(!A._hasResource["dojo.DeferredList"]){A._hasResource["dojo.DeferredList"]=true;
A.provide("dojo.DeferredList");
A.declare("dojo.DeferredList",A.Deferred,{constructor:function(C,G,B,F,E){this.list=C;
this.resultList=new Array(this.list.length);
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=E;
this.silentlyCancelled=false;
if(this.list.length===0&&!G){this.callback(this.resultList)
}this.finishedCount=0;
this.fireOnOneCallback=G;
this.fireOnOneErrback=B;
this.consumeErrors=F;
var D=0;
A.forEach(this.list,function(I,H){I.addCallback(this,function(J){this._cbDeferred(H,true,J);
return J
});
I.addErrback(this,function(J){this._cbDeferred(H,false,J);
return J
});
H++
},this)
},_cbDeferred:function(D,B,C){this.resultList[D]=[B,C];
this.finishedCount+=1;
if(this.fired!==0){if(B&&this.fireOnOneCallback){this.callback([D,C])
}else{if(!B&&this.fireOnOneErrback){this.errback(C)
}else{if(this.finishedCount==this.list.length){this.callback(this.resultList)
}}}}if(!B&&this.consumeErrors){C=null
}return C
},gatherResults:function(C){var B=new A.DeferedList(C,false,true,false);
B.addCallback(function(F){var D=[];
for(var E=0;
E<F.length;
E++){D.push(F[E][1])
}return D
});
return B
}})
}}});