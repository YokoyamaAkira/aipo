if(!dojo._hasResource["dojox.io.proxy.xip"]){dojo._hasResource["dojox.io.proxy.xip"]=true;
dojo.provide("dojox.io.proxy.xip");
dojo.require("dojo.io.iframe");
dojo.require("dojox.data.dom");
dojox.io.proxy.xip={xipClientUrl:djConfig.xipClientUrl||dojo.moduleUrl("dojox.io.proxy","xip_client.html"),_state:{},_stateIdCounter:0,needFrameRecursion:function(){return(dojo.isIE>=7)
},send:function(C){var E="XhrIframeProxy"+(this._stateIdCounter++);
C._stateId=E;
var A=this.xipClientUrl+"#0:init:id="+E+"&server="+encodeURIComponent(C._ifpServerUrl)+"&fr=false";
if(this.needFrameRecursion()){var B=window.location.href.split("#")[0].split("?")[0];
if((this.xipClientUrl+"").charAt(0)=="/"){var D=B.indexOf("://");
D=B.indexOf("/",D+3);
B=B.substring(0,D)
}else{B=B.substring(0,B.lastIndexOf("/")+1)
}B+=this.xipClientUrl;
var F=C._ifpServerUrl+(C._ifpServerUrl.indexOf("?")==-1?"?":"&")+"dojo.fr=1";
A=F+"#0:init:id="+E+"&client="+encodeURIComponent(B)+"&fr="+this.needFrameRecursion()
}this._state[E]={facade:C,stateId:E,clientFrame:dojo.io.iframe.create(E,"",A)};
return E
},receive:function(I,C){var G={};
var D=C.split("&");
for(var H=0;
H<D.length;
H++){if(D[H]){var B=D[H].split("=");
G[decodeURIComponent(B[0])]=decodeURIComponent(B[1])
}}var F=this._state[I];
var E=F.facade;
E._setResponseHeaders(G.responseHeaders);
if(G.status==0||G.status){E.status=parseInt(G.status,10)
}if(G.statusText){E.statusText=G.statusText
}if(G.responseText){E.responseText=G.responseText;
var A=E.getResponseHeader("Content-Type");
if(A&&(A=="application/xml"||A=="text/xml")){E.responseXML=dojox.data.dom.createDocument(G.responseText,A)
}}E.readyState=4;
this.destroyState(I)
},clientFrameLoaded:function(D){var G=this._state[D];
var F=G.facade;
if(this.needFrameRecursion()){var A=window.open("",G.stateId+"_clientEndPoint")
}else{var A=G.clientFrame.contentWindow
}var C=[];
for(var B in F._requestHeaders){C.push(B+": "+F._requestHeaders[B])
}var E={uri:F._uri};
if(C.length>0){E.requestHeaders=C.join("\r\n")
}if(F._method){E.method=F._method
}if(F._bodyData){E.data=F._bodyData
}A.send(dojo.objectToQuery(E))
},destroyState:function(B){var A=this._state[B];
if(A){delete this._state[B];
var C=A.clientFrame.parentNode;
C.removeChild(A.clientFrame);
A.clientFrame=null;
A=null
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
dojo.extend(dojox.io.proxy.xip.XhrIframeFacade,{open:function(A,B){this._method=A;
this._uri=B;
this.readyState=1
},setRequestHeader:function(A,B){this._requestHeaders[A]=B
},send:function(A){this._bodyData=A;
this._stateId=dojox.io.proxy.xip.send(this);
this.readyState=2
},abort:function(){dojox.io.proxy.xip.destroyState(this._stateId)
},getAllResponseHeaders:function(){return this._allResponseHeaders
},getResponseHeader:function(A){return this._responseHeaders[A]
},_setResponseHeaders:function(C){if(C){this._allResponseHeaders=C;
C=C.replace(/\r/g,"");
var A=C.split("\n");
for(var B=0;
B<A.length;
B++){if(A[B]){var D=A[B].split(": ");
this._responseHeaders[D[0]]=D[1]
}}}}})
};