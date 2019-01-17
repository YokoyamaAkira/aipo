dojo._xdResourceLoaded({depends:[["provide","dojo.rpc.JsonService"],["require","dojo.rpc.RpcService"]],defineResource:function(A){if(!A._hasResource["dojo.rpc.JsonService"]){A._hasResource["dojo.rpc.JsonService"]=true;
A.provide("dojo.rpc.JsonService");
A.require("dojo.rpc.RpcService");
A.declare("dojo.rpc.JsonService",A.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(D,C){var B=new A.Deferred();
this.bind(D,C,B);
return B
},bind:function(F,C,E,B){var D=A.rawXhrPost({url:B||this.serviceUrl,postData:this.createRequest(F,C),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
D.addCallbacks(this.resultCallback(E),this.errorCallback(E))
},createRequest:function(E,D){var B={params:D,method:E,id:++this.lastSubmissionId};
var C=A.toJson(B);
return C
},parseResults:function(B){if(A.isObject(B)){if("result" in B){return B.result
}if("Result" in B){return B.Result
}if("ResultSet" in B){return B.ResultSet
}}return B
}})
}}});