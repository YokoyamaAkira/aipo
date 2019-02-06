dojo._xdResourceLoaded({depends:[["provide","dojox.io.proxy.xip"],["require","dojo.io.iframe"],["require","dojox.data.dom"]],defineResource:function(A){if(!A._hasResource["dojox.io.proxy.xip"]){A._hasResource["dojox.io.proxy.xip"]=true;
A.provide("dojox.io.proxy.xip");
A.require("dojo.io.iframe");
A.require("dojox.data.dom");
dojox.io.proxy.xip={xipClientUrl:djConfig.xipClientUrl||A.moduleUrl("dojox.io.proxy","xip_client.html"),_state:{},_stateIdCounter:0,needFrameRecursion:function(){return(A.isIE>=7)
},send:function(E){var G="XhrIframeProxy"+(this._stateIdCounter++);
E._stateId=G;
var C=this.xipClientUrl+"#0:init:id="+G+"&server="+encodeURIComponent(E._ifpServerUrl)+"&fr=false";
if(this.needFrameRecursion()){var D=window.location.href.split("#")[0].split("?")[0];
if((this.xipClientUrl+"").charAt(0)=="/"){var F=D.indexOf("://");
F=D.indexOf("/",F+3);
D=D.substring(0,F)
}else{D=D.substring(0,D.lastIndexOf("/")+1)
}D+=this.xipClientUrl;
var B=E._ifpServerUrl+(E._ifpServerUrl.indexOf("?")==-1?"?":"&")+"dojo.fr=1";
C=B+"#0:init:id="+G+"&client="+encodeURIComponent(D)+"&fr="+this.needFrameRecursion()
}this._state[G]={facade:E,stateId:G,clientFrame:A.io.iframe.create(G,"",C)};
return G
},receive:function(E,H){var C={};
var I=H.split("&");
for(var D=0;
D<I.length;
D++){if(I[D]){var G=I[D].split("=");
C[decodeURIComponent(G[0])]=decodeURIComponent(G[1])
}}var B=this._state[E];
var J=B.facade;
J._setResponseHeaders(C.responseHeaders);
if(C.status==0||C.status){J.status=parseInt(C.status,10)
}if(C.statusText){J.statusText=C.statusText
}if(C.responseText){J.responseText=C.responseText;
var F=J.getResponseHeader("Content-Type");
if(F&&(F=="application/xml"||F=="text/xml")){J.responseXML=dojox.data.dom.createDocument(C.responseText,F)
}}J.readyState=4;
this.destroyState(E)
},clientFrameLoaded:function(H){var D=this._state[H];
var C=D.facade;
if(this.needFrameRecursion()){var E=window.open("",D.stateId+"_clientEndPoint")
}else{var E=D.clientFrame.contentWindow
}var G=[];
for(var F in C._requestHeaders){G.push(F+": "+C._requestHeaders[F])
}var B={uri:C._uri};
if(G.length>0){B.requestHeaders=G.join("\r\n")
}if(C._method){B.method=C._method
}if(C._bodyData){B.data=C._bodyData
}E.send(A.objectToQuery(B))
},destroyState:function(D){var C=this._state[D];
if(C){delete this._state[D];
var B=C.clientFrame.parentNode;
B.removeChild(C.clientFrame);
C.clientFrame=null;
C=null
}},createFacade:function(){if(arguments&&arguments[0]&&arguments[0].iframeProxyUrl){return new dojox.io.proxy.xip.XhrIframeFacade(arguments[0].iframeProxyUrl)
}else{return dojox.io.proxy.xip._xhrObjOld.apply(A,arguments)
}}};
dojox.io.proxy.xip._xhrObjOld=A._xhrObj;
A._xhrObj=dojox.io.proxy.xip.createFacade;
dojox.io.proxy.xip.XhrIframeFacade=function(B){this._requestHeaders={};
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
this._ifpServerUrl=B;
this._stateId=null
};
A.extend(dojox.io.proxy.xip.XhrIframeFacade,{open:function(C,B){this._method=C;
this._uri=B;
this.readyState=1
},setRequestHeader:function(C,B){this._requestHeaders[C]=B
},send:function(B){this._bodyData=B;
this._stateId=dojox.io.proxy.xip.send(this);
this.readyState=2
},abort:function(){dojox.io.proxy.xip.destroyState(this._stateId)
},getAllResponseHeaders:function(){return this._allResponseHeaders
},getResponseHeader:function(B){return this._responseHeaders[B]
},_setResponseHeaders:function(E){if(E){this._allResponseHeaders=E;
E=E.replace(/\r/g,"");
var C=E.split("\n");
for(var D=0;
D<C.length;
D++){if(C[D]){var B=C[D].split(": ");
this._responseHeaders[B[0]]=B[1]
}}}}})
}}});