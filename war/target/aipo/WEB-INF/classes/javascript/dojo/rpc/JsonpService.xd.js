dojo._xdResourceLoaded({depends:[["provide","dojo.rpc.JsonpService"],["require","dojo.rpc.RpcService"],["require","dojo.io.script"]],defineResource:function(A){if(!A._hasResource["dojo.rpc.JsonpService"]){A._hasResource["dojo.rpc.JsonpService"]=true;
A.provide("dojo.rpc.JsonpService");
A.require("dojo.rpc.RpcService");
A.require("dojo.io.script");
A.declare("dojo.rpc.JsonpService",A.rpc.RpcService,{constructor:function(C,B){if(this.required){if(B){A.mixin(this.required,B)
}A.forEach(this.required,function(D){if(D==""||D==undefined){throw new Error("Required Service Argument not found: "+D)
}})
}},strictArgChecks:false,bind:function(B,D,F,C){var E=A.io.script.get({url:C||this.serviceUrl,callbackParamName:this.callbackParamName||"callback",content:this.createRequest(D),timeout:this.timeout,handleAs:"json",preventCache:true});
E.addCallbacks(this.resultCallback(F),this.errorCallback(F))
},createRequest:function(C){var B=(A.isArrayLike(C)&&C.length==1)?C[0]:{};
A.mixin(B,this.required);
return B
}})
}}});