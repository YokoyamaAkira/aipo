if(!dojo._hasResource["dojo.rpc.RpcService"]){dojo._hasResource["dojo.rpc.RpcService"]=true;
dojo.provide("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.RpcService",null,{constructor:function(args){if(args){if((dojo.isString(args))||(args instanceof dojo._Url)){if(args instanceof dojo._Url){var url=args+""
}else{url=args
}var def=dojo.xhrGet({url:url,handleAs:"json-comment-optional",sync:true});
def.addCallback(this,"processSmd");
def.addErrback(function(){throw new Error("Unable to load SMD from "+args)
})
}else{if(args.smdStr){this.processSmd(dojo.eval("("+args.smdStr+")"))
}else{if(args.serviceUrl){this.serviceUrl=args.serviceUrl
}this.timeout=args.timeout||3000;
if("strictArgChecks" in args){this.strictArgChecks=args.strictArgChecks
}this.processSmd(args)
}}}},strictArgChecks:true,serviceUrl:"",parseResults:function(A){return A
},errorCallback:function(A){return function(B){A.errback(new Error(B.message))
}
},resultCallback:function(A){var B=dojo.hitch(this,function(C){if(C.error!=null){var D;
if(typeof C.error=="object"){D=new Error(C.error.message);
D.code=C.error.code;
D.error=C.error.error
}else{D=new Error(C.error)
}D.id=C.id;
D.errorObject=C;
A.errback(D)
}else{A.callback(this.parseResults(C))
}});
return B
},generateMethod:function(B,A,C){return dojo.hitch(this,function(){var D=new dojo.Deferred();
if((this.strictArgChecks)&&(A!=null)&&(arguments.length!=A.length)){throw new Error("Invalid number of parameters for remote method.")
}else{this.bind(B,dojo._toArray(arguments),D,C)
}return D
})
},processSmd:function(A){if(A.methods){dojo.forEach(A.methods,function(B){if(B&&B.name){this[B.name]=this.generateMethod(B.name,B.parameters,B.url||B.serviceUrl||B.serviceURL);
if(!dojo.isFunction(this[B.name])){throw new Error("RpcService: Failed to create"+B.name+"()")
}}},this)
}this.serviceUrl=A.serviceUrl||A.serviceURL;
this.required=A.required;
this.smd=A
}})
};