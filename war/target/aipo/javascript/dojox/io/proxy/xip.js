if(!dojo._hasResource["dojox.io.proxy.xip"]){dojo._hasResource["dojox.io.proxy.xip"]=true;
dojo.provide("dojox.io.proxy.xip");
dojo.require("dojo.io.iframe");
dojo.require("dojox.data.dom");
dojox.io.proxy.xip={xipClientUrl:djConfig.xipClientUrl||dojo.moduleUrl("dojox.io.proxy","xip_client.html"),_state:{},_stateIdCounter:0,needFrameRecursion:function(){return(dojo.isIE>=7)
},send:function(D){var F="XhrIframeProxy"+(this._stateIdCounter++);
D._stateId=F;
var B=this.xipClientUrl+"#0:init:id="+F+"&server="+encodeURIComponent(D._ifpServerUrl)+"&fr=false";
if(this.needFrameRecursion()){var C=window.location.href.split("#")[0].split("?")[0];
if((this.xipClientUrl+"").charAt(0)=="/"){var E=C.indexOf("://");
E=C.indexOf("/",E+3);
C=C.substring(0,E)
}else{C=C.substring(0,C.lastIndexOf("/")+1)
}C+=this.xipClientUrl;
var A=D._ifpServerUrl+(D._ifpServerUrl.indexOf("?")==-1?"?":"&")+"dojo.fr=1";
B=A+"#0:init:id="+F+"&client="+encodeURIComponent(C)+"&fr="+this.needFrameRecursion()
}this._state[F]={facade:D,stateId:F,clientFrame:dojo.io.iframe.create(F,"",B)};
return F
},receive:function(D,G){var B={};
var H=G.split("&");
for(var C=0;
C<H.length;
C++){if(H[C]){var F=H[C].split("=");
B[decodeURIComponent(F[0])]=decodeURIComponent(F[1])
}}var A=this._state[D];
var I=A.facade;
I._setResponseHeaders(B.responseHeaders);
if(B.status==0||B.status){I.status=parseInt(B.status,10)
}if(B.statusText){I.statusText=B.statusText
}if(B.responseText){I.responseText=B.responseText;
var E=I.getResponseHeader("Content-Type");
if(E&&(E=="application/xml"||E=="text/xml")){I.responseXML=dojox.data.dom.createDocument(B.responseText,E)
}}I.readyState=4;
this.destroyState(D)
},clientFrameLoaded:function(G){var C=this._state[G];
var B=C.facade;
if(this.needFrameRecursion()){var D=window.open("",C.stateId+"_clientEndPoint")
}else{var D=C.clientFrame.contentWindow
}var F=[];
for(var E in B._requestHeaders){F.push(E+": "+B._requestHeaders[E])
}var A={uri:B._uri};
if(F.length>0){A.requestHeaders=F.join("\r\n")
}if(B._method){A.method=B._method
}if(B._bodyData){A.data=B._bodyData
}D.send(dojo.objectToQuery(A))
},destroyState:function(C){var B=this._state[C];
if(B){delete this._state[C];
var A=B.clientFrame.parentNode;
A.removeChild(B.clientFrame);
B.clientFrame=null;
B=null
}},createFacade:function(){if(arguments&&arguments[0]&&arguments[0].iframeProxyUrl){return new dojox.io.proxy.xip.XhrIframeFacade(arguments[0].iframeProxyUrl)
}else{return dojox.io.proxy.xip._xhrObjOld.apply(dojo,arguments)
}}};
dojox.io.proxy.xip._xhrObjOld=dojo._xhrObj;
dojo._xhrObj=dojox.io.proxy.xip.createFacade;
dojox.io.proxy.xip.XhrIframeFacade=function(A){this._requestHeaders={};
this._allResponseHeaders=null;
this._responseHeaders={};
this._method=null;
this._uri=null;
this._bodyData=null;
this.responseText=null;
this.responseXML=null;
this.status=null;
this.statusText=null;
this.readyState=0;
this._ifpServerUrl=A;
this._stateId=null
};
dojo.extend(dojox.io.proxy.xip.XhrIframeFacade,{open:function(B,A){this._method=B;
this._uri=A;
this.readyState=1
},setRequestHeader:function(B,A){this._requestHeaders[B]=A
},send:function(A){this._bodyData=A;
this._stateId=dojox.io.proxy.xip.send(this);
this.readyState=2
},abort:function(){dojox.io.proxy.xip.destroyState(this._stateId)
},getAllResponseHeaders:function(){return this._allResponseHeaders
},getResponseHeader:function(A){return this._responseHeaders[A]
},_setResponseHeaders:function(D){if(D){this._allResponseHeaders=D;
D=D.replace(/\r/g,"");
var B=D.split("\n");
for(var C=0;
C<B.length;
C++){if(B[C]){var A=B[C].split(": ");
this._responseHeaders[A[0]]=A[1]
}}}}})
};