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
},_handlerClasses:{TEXT:"dojox.wire.ml.RestHandler",XML:"dojox.wire.ml.XmlHandler",JSON:"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var A=this;
var C=dojo.xhrGet({url:this.url,handleAs:"json",sync:true});
C.addCallback(function(D){A.smd=D
});
if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL)
}}var B=undefined;
if(this.handlerClass){B=dojox.wire._getClass(this.handlerClass)
}else{if(this.serviceType){B=this._handlerClasses[this.serviceType];
if(B&&dojo.isString(B)){B=dojox.wire._getClass(B);
this._handlerClasses[this.serviceType]=B
}}else{if(this.smd&&this.smd.serviceType){B=this._handlerClasses[this.smd.serviceType];
if(B&&dojo.isString(B)){B=dojox.wire._getClass(B);
this._handlerClasses[this.smd.serviceType]=B
}}}}if(!B){return null
}return new B()
},callMethod:function(C,B){var A=new dojo.Deferred();
this.handler.bind(C,B,A,this.serviceUrl);
return A
}});
dojo.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(G,E,B,D){G=G.toUpperCase();
var A=this;
var C={url:this._getUrl(G,E,D),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};
var F=null;
if(G=="POST"){C.postData=this._getContent(G,E);
F=dojo.rawXhrPost(C)
}else{if(G=="PUT"){C.putData=this._getContent(G,E);
F=dojo.rawXhrPut(C)
}else{if(G=="DELETE"){F=dojo.xhrDelete(C)
}else{F=dojo.xhrGet(C)
}}}F.addCallbacks(function(H){B.callback(A._getResult(H))
},function(H){B.errback(H)
})
},_getUrl:function(A,I,C){if(A=="GET"||A=="DELETE"){var G=I[0];
var B="";
for(var D in G){var H=G[D];
if(H){H=encodeURIComponent(H);
var E="{"+D+"}";
var F=C.indexOf(E);
if(F>=0){C=C.substring(0,F)+H+C.substring(F+E.length)
}else{if(B){B+="&"
}B+=(D+"="+H)
}}}if(B){C+="?"+B
}}return C
},_getContent:function(B,A){if(B=="POST"||B=="PUT"){return(A?A[0]:null)
}else{return null
}},_getResult:function(A){return A
}});
dojo.declare("dojox.wire.ml.XmlHandler",dojox.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(F,C){var B=null;
if(F=="POST"||F=="PUT"){var D=C[0];
if(D){if(dojo.isString(D)){B=D
}else{var A=D;
if(A instanceof dojox.wire.ml.XmlElement){A=A.element
}else{if(A.nodeType===9){A=A.documentElement
}}var E='<?xml version="1.0"?>';
B=E+dojox.data.dom.innerXML(A)
}}}return B
},_getResult:function(A){if(A){A=new dojox.wire.ml.XmlElement(A)
}return A
}});
dojo.declare("dojox.wire.ml.JsonHandler",dojox.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(D,B){var A=null;
if(D=="POST"||D=="PUT"){var C=(B?B[0]:undefined);
if(C){if(dojo.isString(C)){A=C
}else{A=dojo.toJson(C)
}}}return A
}})
};