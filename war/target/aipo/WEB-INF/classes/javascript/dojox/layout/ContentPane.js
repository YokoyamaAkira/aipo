if(!dojo._hasResource["dojox.layout.ContentPane"]){dojo._hasResource["dojox.layout.ContentPane"]=true;
dojo.provide("dojox.layout.ContentPane");
dojo.require("dijit.layout.ContentPane");
(function(){if(dojo.isIE){var E=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g
}var D=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function B(K,J){if(!J||!K){return 
}if(E){J=J.replace(E,function(P,N,O,L,M){return N+(new dojo._Url(K,"./"+L).toString())+M
})
}return J.replace(D,function(Q,P,O,M,L,N){if(O){return'@import "'+(new dojo._Url(K,"./"+O).toString())+'"'+N
}else{return"url("+(new dojo._Url(K,"./"+L).toString())+")"+N
}})
}var C=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function A(L,J){var K=L||"./";
return J.replace(C,function(M,T,O,S,P,R,Q,N){return T+(O?(O+"="+S+(new dojo._Url(K,P).toString())+S):("style="+R+B(K,Q)+R))+N
})
}function F(J){return J.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")
}function H(K,J,L){L.attributes=[];
return J.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(U,W,O,X,N,M){var R,T=(W||X||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(O){R=L.push(K?B(K,O):O)
}else{R=L.push('@import "'+M+'";');
T=T.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"")
}if(T){T=T.split(/\s+/);
var V={},Q;
for(var P=0,S=T.length;
P<S;
P++){Q=T[P].split("=");
V[Q[0]]=Q[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1")
}L.attributes[R-1]=V
}return""
})
}function G(J,L){L.code="";
function K(M){if(L.downloadRemote){dojo.xhrGet({url:M,sync:true,load:function(N){L.code+=N+";"
},error:L.errBack})
}}return J.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(P,O,N,M){if(N){K(N)
}else{L.code+=M
}return""
})
}function I(K,J){J=J||dojo.doc.body;
var L=J.ownerDocument.createElement("script");
L.type="text/javascript";
J.appendChild(L);
L.text=K
}dojo.declare("dojox.layout.ContentPane",dijit.layout.ContentPane,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){this.ioArgs={};
this.ioMethod=dojo.xhrGet;
this.onLoadDeferred=new dojo.Deferred();
this.onUnloadDeferred=new dojo.Deferred()
},postCreate:function(){this._setUpDeferreds();
dijit.layout.ContentPane.prototype.postCreate.apply(this,arguments)
},onExecError:function(J){},setContent:function(J){if(!this._isDownloaded){var K=this._setUpDeferreds()
}dijit.layout.ContentPane.prototype.setContent.apply(this,arguments);
return K
},cancel:function(){if(this._xhrDfd&&this._xhrDfd.fired==-1){this.onUnloadDeferred=null
}dijit.layout.ContentPane.prototype.cancel.apply(this,arguments)
},_setUpDeferreds:function(){var M=this,L=function(){M.cancel()
};
var K=(M.onLoadDeferred=new dojo.Deferred());
var J=(M._nextUnloadDeferred=new dojo.Deferred());
return{cancel:L,addOnLoad:function(N){K.addCallback(N)
},addOnUnload:function(N){J.addCallback(N)
}}
},_onLoadHandler:function(){dijit.layout.ContentPane.prototype._onLoadHandler.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
if(this.onUnloadDeferred){this.onUnloadDeferred.callback(true)
}dijit.layout.ContentPane.prototype._onUnloadHandler.apply(this,arguments);
if(this._nextUnloadDeferred){this.onUnloadDeferred=this._nextUnloadDeferred
}},_onError:function(J,K){dijit.layout.ContentPane.prototype._onError.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.errback(K)
}},_prepareLoad:function(K){var J=this._setUpDeferreds();
dijit.layout.ContentPane.prototype._prepareLoad.apply(this,arguments);
return J
},_setContent:function(S){var R=[];
if(dojo.isString(S)){if(this.adjustPaths&&this.href){S=A(this.href,S)
}if(this.cleanContent){S=F(S)
}if(this.renderStyles||this.cleanContent){S=H(this.href,S,R)
}if(this.executeScripts){var Q=this,J,K={downloadRemote:true,errBack:function(T){Q._onError.call(Q,"Exec",'Error downloading remote script in "'+Q.id+'"',T)
}};
S=G(S,K);
J=K.code
}var M=(this.containerNode||this.domNode),N=post="",P=0;
switch(name=M.nodeName.toLowerCase()){case"tr":N="<tr>";
post="</tr>";
P+=1;
case"tbody":case"thead":N="<tbody>"+N;
post+="</tbody>";
P+=1;
case"table":N="<table>"+N;
post+="</table>";
P+=1;
break
}if(P){var L=M.ownerDocument.createElement("div");
L.innerHTML=N+S+post;
do{L=L.firstChild
}while(--P);
S=L.childNodes
}}dijit.layout.ContentPane.prototype._setContent.call(this,S);
if(this._styleNodes&&this._styleNodes.length){while(this._styleNodes.length){dojo._destroyElement(this._styleNodes.pop())
}}if(this.renderStyles&&R&&R.length){this._renderStyles(R)
}if(this.executeScripts&&J){if(this.cleanContent){J=J.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"")
}if(this.scriptHasHooks){J=J.replace(/_container_(?!\s*=[^=])/g,"dijit.byId('"+this.id+"')")
}try{I(J,(this.containerNode||this.domNode))
}catch(O){this._onError("Exec","Error eval script in "+this.id+", "+O.message,O)
}}},_renderStyles:function(Q){this._styleNodes=[];
var R,M,J,P=this.domNode.ownerDocument;
var N=P.getElementsByTagName("head")[0];
for(var K=0,L=Q.length;
K<L;
K++){J=Q[K];
M=Q.attributes[K];
R=P.createElement("style");
R.setAttribute("type","text/css");
for(var O in M){R.setAttribute(O,M[O])
}this._styleNodes.push(R);
N.appendChild(R);
if(R.styleSheet){R.styleSheet.cssText=J
}else{R.appendChild(P.createTextNode(J))
}}}})
})()
};