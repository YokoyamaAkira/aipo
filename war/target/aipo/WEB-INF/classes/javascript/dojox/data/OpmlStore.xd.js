dojo._xdResourceLoaded({depends:[["provide","dojox.data.OpmlStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"]],defineResource:function(A){if(!A._hasResource["dojox.data.OpmlStore"]){A._hasResource["dojox.data.OpmlStore"]=true;
A.provide("dojox.data.OpmlStore");
A.require("dojo.data.util.filter");
A.require("dojo.data.util.simpleFetch");
A.declare("dojox.data.OpmlStore",null,{constructor:function(B){this._xmlData=null;
this._arrayOfTopLevelItems=[];
this._arrayOfAllItems=[];
this._metadataNodes=null;
this._loadFinished=false;
this.url=B.url;
this._opmlData=B.data;
if(B.label){this.label=B.label
}this._loadInProgress=false;
this._queuedFetches=[];
this._identityMap={};
this._identCount=0;
this._idProp="_I"
},label:"text",url:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.OpmlStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(!A.isString(B)){throw new Error("dojox.data.OpmlStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},_removeChildNodesThatAreNotElementNodes:function(G,D){var C=G.childNodes;
if(C.length===0){return 
}var B=[];
var F,E;
for(F=0;
F<C.length;
++F){E=C[F];
if(E.nodeType!=1){B.push(E)
}}for(F=0;
F<B.length;
++F){E=B[F];
G.removeChild(E)
}if(D){for(F=0;
F<C.length;
++F){E=C[F];
this._removeChildNodesThatAreNotElementNodes(E,D)
}}},_processRawXmlTree:function(C){this._loadFinished=true;
this._xmlData=C;
var E=C.getElementsByTagName("head");
var B=E[0];
if(B){this._removeChildNodesThatAreNotElementNodes(B);
this._metadataNodes=B.childNodes
}var D=C.getElementsByTagName("body");
var H=D[0];
if(H){this._removeChildNodesThatAreNotElementNodes(H,true);
var F=D[0].childNodes;
for(var G=0;
G<F.length;
++G){var I=F[G];
if(I.tagName=="outline"){this._identityMap[this._identCount]=I;
this._identCount++;
this._arrayOfTopLevelItems.push(I);
this._arrayOfAllItems.push(I);
this._checkChildNodes(I)
}}}},_checkChildNodes:function(D){if(D.firstChild){for(var C=0;
C<D.childNodes.length;
C++){var B=D.childNodes[C];
if(B.tagName=="outline"){this._identityMap[this._identCount]=B;
this._identCount++;
this._arrayOfAllItems.push(B);
this._checkChildNodes(B)
}}}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},getValue:function(E,D,C){this._assertIsItem(E);
this._assertIsAttribute(D);
if(D=="children"){return(E.firstChild||C)
}else{var B=E.getAttribute(D);
return(B!==undefined)?B:C
}},getValues:function(E,D){this._assertIsItem(E);
this._assertIsAttribute(D);
var B=[];
if(D=="children"){for(var C=0;
C<E.childNodes.length;
++C){B.push(E.childNodes[C])
}}else{if(E.getAttribute(D)!==null){B.push(E.getAttribute(D))
}}return B
},getAttributes:function(C){this._assertIsItem(C);
var B=[];
var E=C;
var G=E.attributes;
for(var D=0;
D<G.length;
++D){var F=G.item(D);
B.push(F.nodeName)
}if(E.childNodes.length>0){B.push("children")
}return B
},hasAttribute:function(B,C){return(this.getValues(B,C).length>0)
},containsValue:function(D,C,B){var E=undefined;
if(typeof B==="string"){E=A.data.util.filter.patternToRegExp(B,false)
}return this._containsValue(D,C,B,E)
},_containsValue:function(E,D,C,F){var G=this.getValues(E,D);
for(var B=0;
B<G.length;
++B){var H=G[B];
if(typeof H==="string"&&F){return(H.match(F)!==null)
}else{if(C===H){return true
}}}return false
},isItem:function(B){return(B&&B.nodeType==1&&B.tagName=="outline"&&B.ownerDocument===this._xmlData)
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getLabel:function(B){if(this.isItem(B)){return this.getValue(B,this.label)
}return undefined
},getLabelAttributes:function(B){return[this.label]
},_fetchItems:function(C,B,H){var G=this;
var D=function(N,Q){var P=null;
if(N.query){P=[];
var O=N.queryOptions?N.queryOptions.ignoreCase:false;
var I={};
for(var J in N.query){var R=N.query[J];
if(typeof R==="string"){I[J]=A.data.util.filter.patternToRegExp(R,O)
}}for(var L=0;
L<Q.length;
++L){var M=true;
var K=Q[L];
for(var J in N.query){var R=N.query[J];
if(!G._containsValue(K,J,R,I[J])){M=false
}}if(M){P.push(K)
}}}else{if(Q.length>0){P=Q.slice(0,Q.length)
}}B(P,N)
};
if(this._loadFinished){D(C,this._getItemsArray(C.queryOptions))
}else{if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{if(this.url!==""){this._loadInProgress=true;
var F={url:G.url,handleAs:"xml"};
var E=A.xhrGet(F);
E.addCallback(function(I){G._processRawXmlTree(I);
D(C,G._getItemsArray(C.queryOptions));
G._handleQueuedFetches()
});
E.addErrback(function(I){throw I
})
}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
D(C,this._getItemsArray(C.queryOptions))
}else{throw new Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.")
}}}}},getFeatures:function(){var B={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
return B
},getIdentity:function(B){if(this.isItem(B)){for(var C in this._identityMap){if(this._identityMap[C]===B){return C
}}}return null
},fetchItemByIdentity:function(D){if(!this._loadFinished){var C=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:D})
}else{this._loadInProgress=true;
var B={url:C.url,handleAs:"xml"};
var G=A.xhrGet(B);
G.addCallback(function(K){var I=D.scope?D.scope:A.global;
try{C._processRawXmlTree(K);
var J=C._identityMap[D.identity];
if(!C.isItem(J)){J=null
}if(D.onItem){D.onItem.call(I,J)
}C._handleQueuedFetches()
}catch(H){if(D.onError){D.onError.call(I,H)
}}});
G.addErrback(function(H){this._loadInProgress=false;
if(D.onError){var I=D.scope?D.scope:A.global;
D.onError.call(I,H)
}})
}}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
var F=this._identityMap[D.identity];
if(!C.isItem(F)){F=null
}if(D.onItem){var E=D.scope?D.scope:A.global;
D.onItem.call(E,F)
}}}}else{var F=this._identityMap[D.identity];
if(!this.isItem(F)){F=null
}if(D.onItem){var E=D.scope?D.scope:A.global;
D.onItem.call(E,F)
}}},getIdentityAttributes:function(B){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var E=0;
E<this._queuedFetches.length;
E++){var C=this._queuedFetches[E];
var D=C.args;
var B=C.filter;
if(B){B(D,this._getItemsArray(D.queryOptions))
}else{this.fetchItemByIdentity(D)
}}this._queuedFetches=[]
}},close:function(B){}});
A.extend(dojox.data.OpmlStore,A.data.util.simpleFetch)
}}});