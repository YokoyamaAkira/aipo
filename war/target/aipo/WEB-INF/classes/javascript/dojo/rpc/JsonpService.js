if(!dojo._hasResource["dojo.rpc.JsonpService"]){dojo._hasResource["dojo.rpc.JsonpService"]=true;
dojo.provide("dojo.rpc.JsonpService");
dojo.require("dojo.rpc.RpcService");
dojo.require("dojo.io.script");
dojo.declare("dojo.rpc.JsonpService",dojo.rpc.RpcService,{constructor:function(A,B){if(this.required){if(B){dojo.mixin(this.required,B)
}dojo.forEach(this.required,function(C){if(C==""||C==undefined){throw new Error("Required Service Argument not found: "+C)
}})
}},strictArgChecks:false,bind:function(E,B,D,A){var C=dojo.io.script.get({url:A||this.serviceUrl,callbackParamName:this.callbackParamName||"callback",content:this.createRequest(B),timeout:this.timeout,handleAs:"json",preventCache:true});
C.addCallbacks(this.resultCallback(D),this.errorCallback(D))
},createRequest:function(A){var B=(dojo.isArrayLike(A)&&A.length==1)?A[0]:{};
dojo.mixin(B,this.required);
return B
}})
};