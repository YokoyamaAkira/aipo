if(!dojo._hasResource["dojo.rpc.JsonService"]){dojo._hasResource["dojo.rpc.JsonService"]=true;
dojo.provide("dojo.rpc.JsonService");
dojo.require("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.JsonService",dojo.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(C,B){var A=new dojo.Deferred();
this.bind(C,B,A);
return A
},bind:function(E,B,D,A){var C=dojo.rawXhrPost({url:A||this.serviceUrl,postData:this.createRequest(E,B),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
C.addCallbacks(this.resultCallback(D),this.errorCallback(D))
},createRequest:function(D,C){var A={params:C,method:D,id:++this.lastSubmissionId};
var B=dojo.toJson(A);
return B
},parseResults:function(A){if(dojo.isObject(A)){if("result" in A){return A.result
}if("Result" in A){return A.Result
}if("ResultSet" in A){return A.ResultSet
}}return A
}})
};