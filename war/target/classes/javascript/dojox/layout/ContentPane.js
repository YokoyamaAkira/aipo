if(!dojo._hasResource["dojox.layout.ContentPane"]){dojo._hasResource["dojox.layout.ContentPane"]=true;
dojo.provide("dojox.layout.ContentPane");
dojo.require("dijit.layout.ContentPane");
(function(){if(dojo.isIE){var A=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g
}var I=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function G(J,K){if(!K||!J){return 
}if(A){K=K.replace(A,function(O,M,N,P,L){return M+(new dojo._Url(J,"./"+P).toString())+L
})
}return K.replace(I,function(P,O,N,L,Q,M){if(N){return'@import "'+(new dojo._Url(J,"./"+N).toString())+'"'+M
}else{return"url("+(new dojo._Url(J,"./"+Q).toString())+")"+M
}})
}var H=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function F(J,K){var L=J||"./";
return K.replace(H,function(M,T,O,S,P,R,Q,N){return T+(O?(O+"="+S+(new dojo._Url(L,P).toString())+S):("style="+R+G(L,Q)+R))+N
})
}function B(J){return J.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"")
}function D(L,K,J){J.attributes=[];
return K.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(V,X,R,M,Q,P){var O,U=(X||M||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(R){O=J.push(L?G(L,R):R)
}else{O=J.push('@import "'+P+'";');
U=U.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"")
}if(U){U=U.split(/\s+/);
var W={},N;
for(var S=0,T=U.length;
S<T;
S++){N=U[S].split("=");
W[N[0]]=N[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1")
}J.attributes[O-1]=W
}return""
})
}function C(K,J){J.code="";
function L(M){if(J.downloadRemote){dojo.xhrGet({url:M,sync:true,load:function(N){J.code+=N+";"
},error:J.errBack})
}}return K.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(P,O,N,M){if(N){L(N)
}else{J.code+=M
}return""
})
}function E(L,K){K=K||dojo.doc.body;
var J=K.ownerDocument.createElement("script");
J.type="text/javascript";
K.appendChild(J);
J.text=L
}dojo.declare("dojox.layout.ContentPane",dijit.layout.ContentPane,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){this.ioArgs={};
this.ioMethod=dojo.xhrGet;
this.onLoadDeferred=new dojo.Deferred();
this.onUnloadDeferred=new dojo.Deferred()
},postCreate:function(){this._setUpDeferreds();
dijit.layout.ContentPane.prototype.postCreate.apply(this,arguments)
},onExecError:function(J){},setContent:function(K){if(!this._isDownloaded){var J=this._setUpDeferreds()
}dijit.layout.ContentPane.prototype.setContent.apply(this,arguments);
return J
},cancel:function(){if(this._xhrDfd&&this._xhrDfd.fired==-1){this.onUnloadDeferred=null
}dijit.layout.ContentPane.prototype.cancel.apply(this,arguments)
},_setUpDeferreds:function(){var K=this,J=function(){K.cancel()
};
var M=(K.onLoadDeferred=new dojo.Deferred());
var L=(K._nextUnloadDeferred=new dojo.Deferred());
return{cancel:J,addOnLoad:function(N){M.addCallback(N)
},addOnUnload:function(N){L.addCallback(N)
}}
},_onLoadHandler:function(){dijit.layout.ContentPane.prototype._onLoadHandler.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.callback(true)
}},_onUnloadHandler:function(){this.isLoaded=false;
this.cancel();
if(this.onUnloadDeferred){this.onUnloadDeferred.callback(true)
}dijit.layout.ContentPane.prototype._onUnloadHandler.apply(this,arguments);
if(this._nextUnloadDeferred){this.onUnloadDeferred=this._nextUnloadDeferred
}},_onError:function(K,J){dijit.layout.ContentPane.prototype._onError.apply(this,arguments);
if(this.onLoadDeferred){this.onLoadDeferred.errback(J)
}},_prepareLoad:function(J){var K=this._setUpDeferreds();
dijit.layout.ContentPane.prototype._prepareLoad.apply(this,arguments);
return K
},_setContent:function(M){var L=[];
if(dojo.isString(M)){if(this.adjustPaths&&this.href){M=F(this.href,M)
}if(this.cleanContent){M=B(M)
}if(this.renderStyles||this.cleanContent){M=D(this.href,M,L)
}if(this.executeScripts){var K=this,N,O={downloadRemote:true,errBack:function(T){K._onError.call(K,"Exec",'Error downloading remote script in "'+K.id+'"',T)
}};
M=C(M,O);
N=O.code
}var Q=(this.containerNode||this.domNode),R=post="",J=0;
switch(name=Q.nodeName.toLowerCase()){case"tr":R="<tr>";
post="</tr>";
J+=1;
case"tbody":case"thead":R="<tbody>"+R;
post+="</tbody>";
J+=1;
case"table":R="<table>"+R;
post+="</table>";
J+=1;
break
}if(J){var P=Q.ownerDocument.createElement("div");
P.innerHTML=R+M+post;
do{P=P.firstChild
}while(--J);
M=P.childNodes
}}dijit.layout.ContentPane.prototype._setContent.call(this,M);
if(this._styleNodes&&this._styleNodes.length){while(this._styleNodes.length){dojo._destroyElement(this._styleNodes.pop())
}}if(this.renderStyles&&L&&L.length){this._renderStyles(L)
}if(this.executeScripts&&N){if(this.cleanContent){N=N.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"")
}if(this.scriptHasHooks){N=N.replace(/_container_(?!\s*=[^=])/g,"dijit.byId('"+this.id+"')")
}try{E(N,(this.containerNode||this.domNode))
}catch(S){this._onError("Exec","Error eval script in "+this.id+", "+S.message,S)
}}},_renderStyles:function(L){this._styleNodes=[];
var M,Q,N,K=this.domNode.ownerDocument;
var R=K.getElementsByTagName("head")[0];
for(var O=0,P=L.length;
O<P;
O++){N=L[O];
Q=L.attributes[O];
M=K.createElement("style");
M.setAttribute("type","text/css");
for(var J in Q){M.setAttribute(J,Q[J])
}this._styleNodes.push(M);
R.appendChild(M);
if(M.styleSheet){M.styleSheet.cssText=N
}else{M.appendChild(K.createTextNode(N))
}}}})
})()
};