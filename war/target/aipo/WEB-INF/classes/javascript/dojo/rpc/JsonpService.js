if(!dojo._hasResource["dojo.rpc.JsonpService"]){dojo._hasResource["dojo.rpc.JsonpService"]=true;
dojo.provide("dojo.rpc.JsonpService");
dojo.require("dojo.rpc.RpcService");
dojo.require("dojo.io.script");
dojo.declare("dojo.rpc.JsonpService",dojo.rpc.RpcService,{constructor:function(B,A){if(this.required){if(A){dojo.mixin(this.required,A)
}dojo.forEach(this.required,function(C){if(C==""||C==undefined){throw new Error("Required Service Argument not found: "+C)
}})
}},strictArgChecks:false,bind:function(D,A,C,E){var B=dojo.io.script.get({url:E||this.serviceUrl,callbackParamName:this.callbackParamName||"callback",content:this.createRequest(A),timeout:this.timeout,handleAs:"json",preventCache:true});
B.addCallbacks(this.resultCallback(C),this.errorCallback(C))
},createRequest:function(B){var A=(dojo.isArrayLike(B)&&B.length==1)?B[0]:{};
dojo.mixin(A,this.required);
return A
}})
};