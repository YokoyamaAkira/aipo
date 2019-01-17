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
},resultCallback:function(B){var A=dojo.hitch(this,function(D){if(D.error!=null){var C;
if(typeof D.error=="object"){C=new Error(D.error.message);
C.code=D.error.code;
C.error=D.error.error
}else{C=new Error(D.error)
}C.id=D.id;
C.errorObject=D;
B.errback(C)
}else{B.callback(this.parseResults(D))
}});
return A
},generateMethod:function(C,B,A){return dojo.hitch(this,function(){var D=new dojo.Deferred();
if((this.strictArgChecks)&&(B!=null)&&(arguments.length!=B.length)){throw new Error("Invalid number of parameters for remote method.")
}else{this.bind(C,dojo._toArray(arguments),D,A)
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