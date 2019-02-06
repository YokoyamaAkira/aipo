dojo._xdResourceLoaded({depends:[["provide","dojo.rpc.JsonService"],["require","dojo.rpc.RpcService"]],defineResource:function(A){if(!A._hasResource["dojo.rpc.JsonService"]){A._hasResource["dojo.rpc.JsonService"]=true;
A.provide("dojo.rpc.JsonService");
A.require("dojo.rpc.RpcService");
A.declare("dojo.rpc.JsonService",A.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(B,D){var C=new A.Deferred();
this.bind(B,D,C);
return C
},bind:function(B,D,F,C){var E=A.rawXhrPost({url:C||this.serviceUrl,postData:this.createRequest(B,D),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
E.addCallbacks(this.resultCallback(F),this.errorCallback(F))
},createRequest:function(B,E){var C={params:E,method:B,id:++this.lastSubmissionId};
var D=A.toJson(C);
return D
},parseResults:function(B){if(A.isObject(B)){if("result" in B){return B.result
}if("Result" in B){return B.Result
}if("ResultSet" in B){return B.ResultSet
}}return B
}})
}}});