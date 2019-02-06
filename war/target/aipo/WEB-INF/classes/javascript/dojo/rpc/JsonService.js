if(!dojo._hasResource["dojo.rpc.JsonService"]){dojo._hasResource["dojo.rpc.JsonService"]=true;
dojo.provide("dojo.rpc.JsonService");
dojo.require("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.JsonService",dojo.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(B,A){var C=new dojo.Deferred();
this.bind(B,A,C);
return C
},bind:function(D,A,C,E){var B=dojo.rawXhrPost({url:E||this.serviceUrl,postData:this.createRequest(D,A),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
B.addCallbacks(this.resultCallback(C),this.errorCallback(C))
},createRequest:function(C,B){var D={params:B,method:C,id:++this.lastSubmissionId};
var A=dojo.toJson(D);
return A
},parseResults:function(A){if(dojo.isObject(A)){if("result" in A){return A.result
}if("Result" in A){return A.Result
}if("ResultSet" in A){return A.ResultSet
}}return A
}})
};