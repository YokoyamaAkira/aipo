dojo._xdResourceLoaded({depends:[["provide","dojox.layout.ContentPane"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["dojox.layout.ContentPane"]){A._hasResource["dojox.layout.ContentPane"]=true;
A.provide("dojox.layout.ContentPane");
A.require("dijit.layout.ContentPane");
(function(){if(A.isIE){var D=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g
}var C=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function J(L,K){if(!K||!L){return 
}if(D){K=K.replace(D,function(Q,O,P,M,N){return O+(new A._Url(L,"./"+M).toString())+N
})
}return K.replace(C,function(R,Q,P,N,M,O){if(P){return'@import "'+(new A._Url(L,"./"+P).toString())+'"'+O
}else{return"url("+(new A._Url(L,"./"+M).toString())+")"+O
}})
}var B=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function I(K,L){var M=K||"./";
return L.replace(B,function(U,T,O,S,P,R,Q,N){return T+(O?(O+"="+S+(new A._Url(M,P).toString())+S):("style="+R+J(M,Q)+R))+N
})
}function E(K){return K.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")
}function G(M,L,K){K.attributes=[];
return L.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(V,X,Q,Y,P,O){var U,T=(X||Y||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(Q){U=K.push(M?J(M,Q):Q)
}else{U=K.push('@import "'+O+'";');
T=T.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"")
}if(T){T=T.split(/\s+/);
var W={},S;
for(var R=0,N=T.length;
R<N;
R++){S=T[R].split("=");
W[S[0]]=S[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1")
}K.attributes[U-1]=W
}return""
})
}function F(L,K){K.code="";
function M(N){if(K.downloadRemote){A.xhrGet({url:N,sync:true,load:function(O){K.code+=O+";"
},error:K.errBack})
}}return L.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(Q,P,O,N){if(O){M(O)
}else{K.code+=N
}return""
})
}function H(M,L){L=L||A.doc.body;
var K=L.ownerDocument.createElement("script");
K.type="text/javascript";
L.appendChild(K);
K.text=M
}A.declare("dojox.layout.ContentPane",dijit.layout.ContentPane,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){this.ioArgs={};
this.ioMethod=A.xhrGet;
this.onLoadDeferred=new A.Deferred();
this.onUnloadDeferred=new A.Deferred()
},postCreate:function(){this._setUpDeferreds();
dijit.layout.ContentPane.prototype.postCreate.apply(this,arguments)
},onExecError:function(K){},setContent:function(K){if(!this._isDownloaded){var L=this._setUpDeferreds()
}dijit.layout.ContentPane.prototype.setContent.apply(this,arguments);
return L
},cancel:function(){if(this._xhrDfd&&this._xhrDfd.fired==-1){this.onUnloadDeferred=null
}dijit.layout.ContentPane.prototype.cancel.apply(this,arguments)
},_setUpDeferreds:function(){var L=this,K=function(){L.cancel()
};
var N=(L.onLoadDeferred=new A.Deferred());
var M=(L._nextUnloadDeferred=new A.Deferred());
return{cancel:K,addOnLoad:function(O){N.addCallback(O)
},addOnUnload:function(O){M.addCallback(O)
}}
},_onLoadHandler:function(){dijit.layout.ContentPane.prototype._onLoadHandler.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
if(this.onUnloadDeferred){this.onUnloadDeferred.callback(true)
}dijit.layout.ContentPane.prototype._onUnloadHandler.apply(this,arguments);
if(this._nextUnloadDeferred){this.onUnloadDeferred=this._nextUnloadDeferred
}},_onError:function(K,L){dijit.layout.ContentPane.prototype._onError.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.errback(L)
}},_prepareLoad:function(L){var K=this._setUpDeferreds();
dijit.layout.ContentPane.prototype._prepareLoad.apply(this,arguments);
return K
},_setContent:function(L){var K=[];
if(A.isString(L)){if(this.adjustPaths&&this.href){L=I(this.href,L)
}if(this.cleanContent){L=E(L)
}if(this.renderStyles||this.cleanContent){L=G(this.href,L,K)
}if(this.executeScripts){var T=this,M,N={downloadRemote:true,errBack:function(U){T._onError.call(T,"Exec",'Error downloading remote script in "'+T.id+'"',U)
}};
L=F(L,N);
M=N.code
}var P=(this.containerNode||this.domNode),Q=post="",S=0;
switch(name=P.nodeName.toLowerCase()){case"tr":Q="<tr>";
post="</tr>";
S+=1;
case"tbody":case"thead":Q="<tbody>"+Q;
post+="</tbody>";
S+=1;
case"table":Q="<table>"+Q;
post+="</table>";
S+=1;
break
}if(S){var O=P.ownerDocument.createElement("div");
O.innerHTML=Q+L+post;
do{O=O.firstChild
}while(--S);
L=O.childNodes
}}dijit.layout.ContentPane.prototype._setContent.call(this,L);
if(this._styleNodes&&this._styleNodes.length){while(this._styleNodes.length){A._destroyElement(this._styleNodes.pop())
}}if(this.renderStyles&&K&&K.length){this._renderStyles(K)
}if(this.executeScripts&&M){if(this.cleanContent){M=M.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"")
}if(this.scriptHasHooks){M=M.replace(/_container_(?!\s*=[^=])/g,"dijit.byId('"+this.id+"')")
}try{H(M,(this.containerNode||this.domNode))
}catch(R){this._onError("Exec","Error eval script in "+this.id+", "+R.message,R)
}}},_renderStyles:function(K){this._styleNodes=[];
var L,P,M,S=this.domNode.ownerDocument;
var Q=S.getElementsByTagName("head")[0];
for(var N=0,O=K.length;
N<O;
N++){M=K[N];
P=K.attributes[N];
L=S.createElement("style");
L.setAttribute("type","text/css");
for(var R in P){L.setAttribute(R,P[R])
}this._styleNodes.push(L);
Q.appendChild(L);
if(L.styleSheet){L.styleSheet.cssText=M
}else{L.appendChild(S.createTextNode(M))
}}}})
})()
}}});