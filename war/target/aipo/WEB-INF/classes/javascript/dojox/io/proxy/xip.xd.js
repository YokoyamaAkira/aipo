dojo._xdResourceLoaded({depends:[["provide","dojox.io.proxy.xip"],["require","dojo.io.iframe"],["require","dojox.data.dom"]],defineResource:function(A){if(!A._hasResource["dojox.io.proxy.xip"]){A._hasResource["dojox.io.proxy.xip"]=true;
A.provide("dojox.io.proxy.xip");
A.require("dojo.io.iframe");
A.require("dojox.data.dom");
dojox.io.proxy.xip={xipClientUrl:djConfig.xipClientUrl||A.moduleUrl("dojox.io.proxy","xip_client.html"),_state:{},_stateIdCounter:0,needFrameRecursion:function(){return(A.isIE>=7)
},send:function(F){var C="XhrIframeProxy"+(this._stateIdCounter++);
F._stateId=C;
var D=this.xipClientUrl+"#0:init:id="+C+"&server="+encodeURIComponent(F._ifpServerUrl)+"&fr=false";
if(this.needFrameRecursion()){var E=window.location.href.split("#")[0].split("?")[0];
if((this.xipClientUrl+"").charAt(0)=="/"){var G=E.indexOf("://");
G=E.indexOf("/",G+3);
E=E.substring(0,G)
}else{E=E.substring(0,E.lastIndexOf("/")+1)
}E+=this.xipClientUrl;
var B=F._ifpServerUrl+(F._ifpServerUrl.indexOf("?")==-1?"?":"&")+"dojo.fr=1";
D=B+"#0:init:id="+C+"&client="+encodeURIComponent(E)+"&fr="+this.needFrameRecursion()
}this._state[C]={facade:F,stateId:C,clientFrame:A.io.iframe.create(C,"",D)};
return C
},receive:function(C,F){var J={};
var G=F.split("&");
for(var B=0;
B<G.length;
B++){if(G[B]){var E=G[B].split("=");
J[decodeURIComponent(E[0])]=decodeURIComponent(E[1])
}}var I=this._state[C];
var H=I.facade;
H._setResponseHeaders(J.responseHeaders);
if(J.status==0||J.status){H.status=parseInt(J.status,10)
}if(J.statusText){H.statusText=J.statusText
}if(J.responseText){H.responseText=J.responseText;
var D=H.getResponseHeader("Content-Type");
if(D&&(D=="application/xml"||D=="text/xml")){H.responseXML=dojox.data.dom.createDocument(J.responseText,D)
}}H.readyState=4;
this.destroyState(C)
},clientFrameLoaded:function(C){var B=this._state[C];
var H=B.facade;
if(this.needFrameRecursion()){var D=window.open("",B.stateId+"_clientEndPoint")
}else{var D=B.clientFrame.contentWindow
}var F=[];
for(var E in H._requestHeaders){F.push(E+": "+H._requestHeaders[E])
}var G={uri:H._uri};
if(F.length>0){G.requestHeaders=F.join("\r\n")
}if(H._method){G.method=H._method
}if(H._bodyData){G.data=H._bodyData
}D.send(A.objectToQuery(G))
},destroyState:function(B){var D=this._state[B];
if(D){delete this._state[B];
var C=D.clientFrame.parentNode;
C.removeChild(D.clientFrame);
D.clientFrame=null;
D=null
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
A.extend(dojox.io.proxy.xip.XhrIframeFacade,{open:function(B,C){this._method=B;
this._uri=C;
this.readyState=1
},setRequestHeader:function(B,C){this._requestHeaders[B]=C
},send:function(B){this._bodyData=B;
this._stateId=dojox.io.proxy.xip.send(this);
this.readyState=2
},abort:function(){dojox.io.proxy.xip.destroyState(this._stateId)
},getAllResponseHeaders:function(){return this._allResponseHeaders
},getResponseHeader:function(B){return this._responseHeaders[B]
},_setResponseHeaders:function(B){if(B){this._allResponseHeaders=B;
B=B.replace(/\r/g,"");
var D=B.split("\n");
for(var E=0;
E<D.length;
E++){if(D[E]){var C=D[E].split(": ");
this._responseHeaders[C[0]]=C[1]
}}}}})
}}});