if(!dojo._hasResource["dojox.wire.ml.Service"]){dojo._hasResource["dojox.wire.ml.Service"]=true;
dojo.provide("dojox.wire.ml.Service");
dojo.provide("dojox.wire.ml.RestHandler");
dojo.provide("dojox.wire.ml.XmlHandler");
dojo.provide("dojox.wire.ml.JsonHandler");
dojo.require("dijit._Widget");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire._base");
dojo.require("dojox.wire.ml.util");
dojo.declare("dojox.wire.ml.Service",dijit._Widget,{url:"",serviceUrl:"",serviceType:"",handlerClass:"",preventCache:true,postCreate:function(){this.handler=this._createHandler()
},_handlerClasses:{TEXT:"dojox.wire.ml.RestHandler",XML:"dojox.wire.ml.XmlHandler",JSON:"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var C=this;
var B=dojo.xhrGet({url:this.url,handleAs:"json",sync:true});
B.addCallback(function(D){C.smd=D
});
if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL)
}}var A=undefined;
if(this.handlerClass){A=dojox.wire._getClass(this.handlerClass)
}else{if(this.serviceType){A=this._handlerClasses[this.serviceType];
if(A&&dojo.isString(A)){A=dojox.wire._getClass(A);
this._handlerClasses[this.serviceType]=A
}}else{if(this.smd&&this.smd.serviceType){A=this._handlerClasses[this.smd.serviceType];
if(A&&dojo.isString(A)){A=dojox.wire._getClass(A);
this._handlerClasses[this.smd.serviceType]=A
}}}}if(!A){return null
}return new A()
},callMethod:function(B,A){var C=new dojo.Deferred();
this.handler.bind(B,A,C,this.serviceUrl);
return C
}});
dojo.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(D,B,F,A){D=D.toUpperCase();
var E=this;
var G={url:this._getUrl(D,B,A),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};
var C=null;
if(D=="POST"){G.postData=this._getContent(D,B);
C=dojo.rawXhrPost(G)
}else{if(D=="PUT"){G.putData=this._getContent(D,B);
C=dojo.rawXhrPut(G)
}else{if(D=="DELETE"){C=dojo.xhrDelete(G)
}else{C=dojo.xhrGet(G)
}}}C.addCallbacks(function(H){F.callback(E._getResult(H))
},function(H){F.errback(H)
})
},_getUrl:function(F,E,H){if(F=="GET"||F=="DELETE"){var C=E[0];
var G="";
for(var I in C){var D=C[I];
if(D){D=encodeURIComponent(D);
var A="{"+I+"}";
var B=H.indexOf(A);
if(B>=0){H=H.substring(0,B)+D+H.substring(B+A.length)
}else{if(G){G+="&"
}G+=(I+"="+D)
}}}if(G){H+="?"+G
}}return H
},_getContent:function(A,B){if(A=="POST"||A=="PUT"){return(B?B[0]:null)
}else{return null
}},_getResult:function(A){return A
}});
dojo.declare("dojox.wire.ml.XmlHandler",dojox.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(E,B){var A=null;
if(E=="POST"||E=="PUT"){var C=B[0];
if(C){if(dojo.isString(C)){A=C
}else{var F=C;
if(F instanceof dojox.wire.ml.XmlElement){F=F.element
}else{if(F.nodeType===9){F=F.documentElement
}}var D='<?xml version="1.0"?>';
A=D+dojox.data.dom.innerXML(F)
}}}return A
},_getResult:function(A){if(A){A=new dojox.wire.ml.XmlElement(A)
}return A
}});
dojo.declare("dojox.wire.ml.JsonHandler",dojox.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(C,A){var D=null;
if(C=="POST"||C=="PUT"){var B=(A?A[0]:undefined);
if(B){if(dojo.isString(B)){D=B
}else{D=dojo.toJson(B)
}}}return D
}})
};