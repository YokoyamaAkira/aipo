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
},_handlerClasses:{TEXT:"dojox.wire.ml.RestHandler",XML:"dojox.wire.ml.XmlHandler",JSON:"dojox.wire.ml.JsonHandler","JSON-RPC":"dojo.rpc.JsonService"},_createHandler:function(){if(this.url){var B=this;
var D=A.xhrGet({url:this.url,handleAs:"json",sync:true});
D.addCallback(function(E){B.smd=E
});
if(this.smd&&!this.serviceUrl){this.serviceUrl=(this.smd.serviceUrl||this.smd.serviceURL)
}}var C=undefined;
if(this.handlerClass){C=dojox.wire._getClass(this.handlerClass)
}else{if(this.serviceType){C=this._handlerClasses[this.serviceType];
if(C&&A.isString(C)){C=dojox.wire._getClass(C);
this._handlerClasses[this.serviceType]=C
}}else{if(this.smd&&this.smd.serviceType){C=this._handlerClasses[this.smd.serviceType];
if(C&&A.isString(C)){C=dojox.wire._getClass(C);
this._handlerClasses[this.smd.serviceType]=C
}}}}if(!C){return null
}return new C()
},callMethod:function(D,C){var B=new A.Deferred();
this.handler.bind(D,C,B,this.serviceUrl);
return B
}});
A.declare("dojox.wire.ml.RestHandler",null,{contentType:"text/plain",handleAs:"text",bind:function(H,F,C,E){H=H.toUpperCase();
var B=this;
var D={url:this._getUrl(H,F,E),contentType:this.contentType,handleAs:this.handleAs,headers:this.headers,preventCache:this.preventCache};
var G=null;
if(H=="POST"){D.postData=this._getContent(H,F);
G=A.rawXhrPost(D)
}else{if(H=="PUT"){D.putData=this._getContent(H,F);
G=A.rawXhrPut(D)
}else{if(H=="DELETE"){G=A.xhrDelete(D)
}else{G=A.xhrGet(D)
}}}G.addCallbacks(function(I){C.callback(B._getResult(I))
},function(I){C.errback(I)
})
},_getUrl:function(B,J,D){if(B=="GET"||B=="DELETE"){var H=J[0];
var C="";
for(var E in H){var I=H[E];
if(I){I=encodeURIComponent(I);
var F="{"+E+"}";
var G=D.indexOf(F);
if(G>=0){D=D.substring(0,G)+I+D.substring(G+F.length)
}else{if(C){C+="&"
}C+=(E+"="+I)
}}}if(C){D+="?"+C
}}return D
},_getContent:function(C,B){if(C=="POST"||C=="PUT"){return(B?B[0]:null)
}else{return null
}},_getResult:function(B){return B
}});
A.declare("dojox.wire.ml.XmlHandler",dojox.wire.ml.RestHandler,{contentType:"text/xml",handleAs:"xml",_getContent:function(G,D){var C=null;
if(G=="POST"||G=="PUT"){var E=D[0];
if(E){if(A.isString(E)){C=E
}else{var B=E;
if(B instanceof dojox.wire.ml.XmlElement){B=B.element
}else{if(B.nodeType===9){B=B.documentElement
}}var F='<?xml version="1.0"?>';
C=F+dojox.data.dom.innerXML(B)
}}}return C
},_getResult:function(B){if(B){B=new dojox.wire.ml.XmlElement(B)
}return B
}});
A.declare("dojox.wire.ml.JsonHandler",dojox.wire.ml.RestHandler,{contentType:"text/json",handleAs:"json",headers:{Accept:"*/json"},_getContent:function(E,C){var B=null;
if(E=="POST"||E=="PUT"){var D=(C?C[0]:undefined);
if(D){if(A.isString(D)){B=D
}else{B=A.toJson(D)
}}}return B
}})
}}});