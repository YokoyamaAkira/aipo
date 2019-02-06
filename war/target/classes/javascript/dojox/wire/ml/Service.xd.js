dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.Service"],["provide","dojox.wire.ml.RestHandler"],["provide","dojox.wire.ml.XmlHandler"],["provide","dojox.wire.ml.JsonHandler"],["require","dijit._Widget"],["require","dojox.data.dom"],["require","dojox.wire._base"],["require","dojox.wire.ml.util"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.Service"]){A._hasResource["dojox.wire.ml.Service"]=true;
A.provide("dojox.wire.ml.Service");
A.provide("dojox.wire.ml.RestHandler");
A.provide("dojox.wire.ml.XmlHandler");
A.provide("dojox.wire.ml.JsonHandler");
A.require("dijit._Widget");
A.require("dojox.data.dom");
A.require("dojox.wire._base");
A.require("dojox.wire.ml.util");
A.declare("dojox.wire.ml.Service",dijit._Widget,{url:"",serviceUrl:"",serviceType:"",handlerClass:"",preventCache:true,postCreate:function(){this.handler=this._createHandler()
},_handlerClasses:{TEXT:"dojox.wire.ml.RestHandler",XML:"dojox.wire.ml.XmlHandler",JSON:"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var C=this;
var B=A.xhrGet({url:this.url,handleAs:"json",sync:true});
B.addCallback(function(E){C.smd=E
});
if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL)
}}var D=undefined;
if(this.handlerClass){D=dojox.wire._getClass(this.handlerClass)
}else{if(this.serviceType){D=this._handlerClasses[this.serviceType];
if(D&&A.isString(D)){D=dojox.wire._getClass(D);
this._handlerClasses[this.serviceType]=D
}}else{if(this.smd&&this.smd.serviceType){D=this._handlerClasses[this.smd.serviceType];
if(D&&A.isString(D)){D=dojox.wire._getClass(D);
this._handlerClasses[this.smd.serviceType]=D
}}}}if(!D){return null
}return new D()
},callMethod:function(B,D){var C=new A.Deferred();
this.handler.bind(B,D,C,this.serviceUrl);
return C
}});
A.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(C,E,H,D){C=C.toUpperCase();
var G=this;
var B={url:this._getUrl(C,E,D),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};
var F=null;
if(C=="POST"){B.postData=this._getContent(C,E);
F=A.rawXhrPost(B)
}else{if(C=="PUT"){B.putData=this._getContent(C,E);
F=A.rawXhrPut(B)
}else{if(C=="DELETE"){F=A.xhrDelete(B)
}else{F=A.xhrGet(B)
}}}F.addCallbacks(function(I){H.callback(G._getResult(I))
},function(I){H.errback(I)
})
},_getUrl:function(I,H,B){if(I=="GET"||I=="DELETE"){var F=H[0];
var J="";
for(var C in F){var G=F[C];
if(G){G=encodeURIComponent(G);
var D="{"+C+"}";
var E=B.indexOf(D);
if(E>=0){B=B.substring(0,E)+G+B.substring(E+D.length)
}else{if(J){J+="&"
}J+=(C+"="+G)
}}}if(J){B+="?"+J
}}return B
},_getContent:function(B,C){if(B=="POST"||B=="PUT"){return(C?C[0]:null)
}else{return null
}},_getResult:function(B){return B
}});
A.declare("dojox.wire.ml.XmlHandler",dojox.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(C,E){var D=null;
if(C=="POST"||C=="PUT"){var F=E[0];
if(F){if(A.isString(F)){D=F
}else{var B=F;
if(B instanceof dojox.wire.ml.XmlElement){B=B.element
}else{if(B.nodeType===9){B=B.documentElement
}}var G='<?xml version="1.0"?>';
D=G+dojox.data.dom.innerXML(B)
}}}return D
},_getResult:function(B){if(B){B=new dojox.wire.ml.XmlElement(B)
}return B
}});
A.declare("dojox.wire.ml.JsonHandler",dojox.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(B,D){var C=null;
if(B=="POST"||B=="PUT"){var E=(D?D[0]:undefined);
if(E){if(A.isString(E)){C=E
}else{C=A.toJson(E)
}}}return C
}})
}}});