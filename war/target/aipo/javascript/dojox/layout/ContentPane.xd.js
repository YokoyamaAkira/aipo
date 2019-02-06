dojo._xdResourceLoaded({depends:[["provide","dojox.layout.ContentPane"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["dojox.layout.ContentPane"]){A._hasResource["dojox.layout.ContentPane"]=true;
A.provide("dojox.layout.ContentPane");
A.require("dijit.layout.ContentPane");
(function(){if(A.isIE){var F=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g
}var E=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function C(L,K){if(!K||!L){return 
}if(F){K=K.replace(F,function(Q,O,P,M,N){return O+(new A._Url(L,"./"+M).toString())+N
})
}return K.replace(E,function(R,Q,P,N,M,O){if(P){return'@import "'+(new A._Url(L,"./"+P).toString())+'"'+O
}else{return"url("+(new A._Url(L,"./"+M).toString())+")"+O
}})
}var D=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function B(M,K){var L=M||"./";
return K.replace(D,function(N,U,P,T,Q,S,R,O){return U+(P?(P+"="+T+(new A._Url(L,Q).toString())+T):("style="+S+C(L,R)+S))+O
})
}function G(K){return K.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")
}function I(L,K,M){M.attributes=[];
return K.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(V,X,P,Y,O,N){var S,U=(X||Y||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(P){S=M.push(L?C(L,P):P)
}else{S=M.push('@import "'+N+'";');
U=U.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"")
}if(U){U=U.split(/\s+/);
var W={},R;
for(var Q=0,T=U.length;
Q<T;
Q++){R=U[Q].split("=");
W[R[0]]=R[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1")
}M.attributes[S-1]=W
}return""
})
}function H(K,M){M.code="";
function L(N){if(M.downloadRemote){A.xhrGet({url:N,sync:true,load:function(O){M.code+=O+";"
},error:M.errBack})
}}return K.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(Q,P,O,N){if(O){L(O)
}else{M.code+=N
}return""
})
}function J(L,K){K=K||A.doc.body;
var M=K.ownerDocument.createElement("script");
M.type="text/javascript";
K.appendChild(M);
M.text=L
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
},_setUpDeferreds:function(){var N=this,M=function(){N.cancel()
};
var L=(N.onLoadDeferred=new A.Deferred());
var K=(N._nextUnloadDeferred=new A.Deferred());
return{cancel:M,addOnLoad:function(O){L.addCallback(O)
},addOnUnload:function(O){K.addCallback(O)
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
},_setContent:function(T){var S=[];
if(A.isString(T)){if(this.adjustPaths&&this.href){T=B(this.href,T)
}if(this.cleanContent){T=G(T)
}if(this.renderStyles||this.cleanContent){T=I(this.href,T,S)
}if(this.executeScripts){var R=this,K,L={downloadRemote:true,errBack:function(U){R._onError.call(R,"Exec",'Error downloading remote script in "'+R.id+'"',U)
}};
T=H(T,L);
K=L.code
}var N=(this.containerNode||this.domNode),O=post="",Q=0;
switch(name=N.nodeName.toLowerCase()){case"tr":O="<tr>";
post="</tr>";
Q+=1;
case"tbody":case"thead":O="<tbody>"+O;
post+="</tbody>";
Q+=1;
case"table":O="<table>"+O;
post+="</table>";
Q+=1;
break
}if(Q){var M=N.ownerDocument.createElement("div");
M.innerHTML=O+T+post;
do{M=M.firstChild
}while(--Q);
T=M.childNodes
}}dijit.layout.ContentPane.prototype._setContent.call(this,T);
if(this._styleNodes&&this._styleNodes.length){while(this._styleNodes.length){A._destroyElement(this._styleNodes.pop())
}}if(this.renderStyles&&S&&S.length){this._renderStyles(S)
}if(this.executeScripts&&K){if(this.cleanContent){K=K.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"")
}if(this.scriptHasHooks){K=K.replace(/_container_(?!\s*=[^=])/g,"dijit.byId('"+this.id+"')")
}try{J(K,(this.containerNode||this.domNode))
}catch(P){this._onError("Exec","Error eval script in "+this.id+", "+P.message,P)
}}},_renderStyles:function(R){this._styleNodes=[];
var S,N,K,Q=this.domNode.ownerDocument;
var O=Q.getElementsByTagName("head")[0];
for(var L=0,M=R.length;
L<M;
L++){K=R[L];
N=R.attributes[L];
S=Q.createElement("style");
S.setAttribute("type","text/css");
for(var P in N){S.setAttribute(P,N[P])
}this._styleNodes.push(S);
O.appendChild(S);
if(S.styleSheet){S.styleSheet.cssText=K
}else{S.appendChild(Q.createTextNode(K))
}}}})
})()
}}});