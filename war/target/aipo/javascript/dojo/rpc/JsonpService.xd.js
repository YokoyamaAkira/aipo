dojo._xdResourceLoaded({depends:[["provide","dojo.rpc.JsonpService"],["require","dojo.rpc.RpcService"],["require","dojo.io.script"]],defineResource:function(A){if(!A._hasResource["dojo.rpc.JsonpService"]){A._hasResource["dojo.rpc.JsonpService"]=true;
A.provide("dojo.rpc.JsonpService");
A.require("dojo.rpc.RpcService");
A.require("dojo.io.script");
A.declare("dojo.rpc.JsonpService",A.rpc.RpcService,{constructor:function(B,C){if(this.required){if(C){A.mixin(this.required,C)
}A.forEach(this.required,function(D){if(D==""||D==undefined){throw new Error("Required Service Argument not found: "+D)
}})
}},strictArgChecks:false,bind:function(F,C,E,B){var D=A.io.script.get({url:B||this.serviceUrl,callbackParamName:this.callbackParamName||"callback",content:this.createRequest(C),timeout:this.timeout,handleAs:"json",preventCache:true});
D.addCallbacks(this.resultCallback(E),this.errorCallback(E))
},createRequest:function(B){var C=(A.isArrayLike(B)&&B.length==1)?B[0]:{};
A.mixin(C,this.required);
return C
}})
}}});