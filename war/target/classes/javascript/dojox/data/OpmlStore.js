if(!dojo._hasResource["dojox.data.OpmlStore"]){dojo._hasResource["dojox.data.OpmlStore"]=true;
dojo.provide("dojox.data.OpmlStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.OpmlStore",null,{constructor:function(A){this._xmlData=null;
this._arrayOfTopLevelItems=[];
this._arrayOfAllItems=[];
this._metadataNodes=null;
this._loadFinished=false;
this.url=A.url;
this._opmlData=A.data;
if(A.label){this.label=A.label
}this._loadInProgress=false;
this._queuedFetches=[];
this._identityMap={};
this._identCount=0;
this._idProp="_I"
},label:"text",url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.OpmlStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(!dojo.isString(A)){throw new Error("dojox.data.OpmlStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},_removeChildNodesThatAreNotElementNodes:function(E,B){var F=E.childNodes;
if(F.length===0){return 
}var A=[];
var D,C;
for(D=0;
D<F.length;
++D){C=F[D];
if(C.nodeType!=1){A.push(C)
}}for(D=0;
D<A.length;
++D){C=A[D];
E.removeChild(C)
}if(B){for(D=0;
D<F.length;
++D){C=F[D];
this._removeChildNodesThatAreNotElementNodes(C,B)
}}},_processRawXmlTree:function(H){this._loadFinished=true;
this._xmlData=H;
var G=H.getElementsByTagName("head");
var E=G[0];
if(E){this._removeChildNodesThatAreNotElementNodes(E);
this._metadataNodes=E.childNodes
}var F=H.getElementsByTagName("body");
var C=F[0];
if(C){this._removeChildNodesThatAreNotElementNodes(C,true);
var A=F[0].childNodes;
for(var B=0;
B<A.length;
++B){var D=A[B];
if(D.tagName=="outline"){this._identityMap[this._identCount]=D;
this._identCount++;
this._arrayOfTopLevelItems.push(D);
this._arrayOfAllItems.push(D);
this._checkChildNodes(D)
}}}},_checkChildNodes:function(B){if(B.firstChild){for(var A=0;
A<B.childNodes.length;
A++){var C=B.childNodes[A];
if(C.tagName=="outline"){this._identityMap[this._identCount]=C;
this._identCount++;
this._arrayOfAllItems.push(C);
this._checkChildNodes(C)
}}}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},getValue:function(C,B,A){this._assertIsItem(C);
this._assertIsAttribute(B);
if(B=="children"){return(C.firstChild||A)
}else{var D=C.getAttribute(B);
return(D!==undefined)?D:A
}},getValues:function(C,B){this._assertIsItem(C);
this._assertIsAttribute(B);
var D=[];
if(B=="children"){for(var A=0;
A<C.childNodes.length;
++A){D.push(C.childNodes[A])
}}else{if(C.getAttribute(B)!==null){D.push(C.getAttribute(B))
}}return D
},getAttributes:function(F){this._assertIsItem(F);
var A=[];
var C=F;
var E=C.attributes;
for(var B=0;
B<E.length;
++B){var D=E.item(B);
A.push(D.nodeName)
}if(C.childNodes.length>0){A.push("children")
}return A
},hasAttribute:function(B,A){return(this.getValues(B,A).length>0)
},containsValue:function(B,A,D){var C=undefined;
if(typeof D==="string"){C=dojo.data.util.filter.patternToRegExp(D,false)
}return this._containsValue(B,A,D,C)
},_containsValue:function(E,D,G,F){var A=this.getValues(E,D);
for(var C=0;
C<A.length;
++C){var B=A[C];
if(typeof B==="string"&&F){return(B.match(F)!==null)
}else{if(G===B){return true
}}}return false
},isItem:function(A){return(A&&A.nodeType==1&&A.tagName=="outline"&&A.ownerDocument===this._xmlData)
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){if(this.isItem(A)){return this.getValue(A,this.label)
}return undefined
},getLabelAttributes:function(A){return[this.label]
},_fetchItems:function(C,G,B){var A=this;
var D=function(K,N){var M=null;
if(K.query){M=[];
var L=K.queryOptions?K.queryOptions.ignoreCase:false;
var P={};
for(var Q in K.query){var O=K.query[Q];
if(typeof O==="string"){P[Q]=dojo.data.util.filter.patternToRegExp(O,L)
}}for(var I=0;
I<N.length;
++I){var J=true;
var H=N[I];
for(var Q in K.query){var O=K.query[Q];
if(!A._containsValue(H,Q,O,P[Q])){J=false
}}if(J){M.push(H)
}}}else{if(N.length>0){M=N.slice(0,N.length)
}}G(M,K)
};
if(this._loadFinished){D(C,this._getItemsArray(C.queryOptions))
}else{if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{if(this.url!==""){this._loadInProgress=true;
var F={url:A.url,handleAs:"xml"};
var E=dojo.xhrGet(F);
E.addCallback(function(H){A._processRawXmlTree(H);
D(C,A._getItemsArray(C.queryOptions));
A._handleQueuedFetches()
});
E.addErrback(function(H){throw H
})
}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
D(C,this._getItemsArray(C.queryOptions))
}else{throw new Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.")
}}}}},getFeatures:function(){var A={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
return A
},getIdentity:function(B){if(this.isItem(B)){for(var A in this._identityMap){if(this._identityMap[A]===B){return A
}}}return null
},fetchItemByIdentity:function(B){if(!this._loadFinished){var A=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:B})
}else{this._loadInProgress=true;
var F={url:A.url,handleAs:"xml"};
var E=dojo.xhrGet(F);
E.addCallback(function(J){var H=B.scope?B.scope:dojo.global;
try{A._processRawXmlTree(J);
var I=A._identityMap[B.identity];
if(!A.isItem(I)){I=null
}if(B.onItem){B.onItem.call(H,I)
}A._handleQueuedFetches()
}catch(G){if(B.onError){B.onError.call(H,G)
}}});
E.addErrback(function(G){this._loadInProgress=false;
if(B.onError){var H=B.scope?B.scope:dojo.global;
B.onError.call(H,G)
}})
}}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
var D=this._identityMap[B.identity];
if(!A.isItem(D)){D=null
}if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}}}else{var D=this._identityMap[B.identity];
if(!this.isItem(D)){D=null
}if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}},getIdentityAttributes:function(A){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var C=0;
C<this._queuedFetches.length;
C++){var A=this._queuedFetches[C];
var B=A.args;
var D=A.filter;
if(D){D(B,this._getItemsArray(B.queryOptions))
}else{this.fetchItemByIdentity(B)
}}this._queuedFetches=[]
}},close:function(A){}});
dojo.extend(dojox.data.OpmlStore,dojo.data.util.simpleFetch)
};