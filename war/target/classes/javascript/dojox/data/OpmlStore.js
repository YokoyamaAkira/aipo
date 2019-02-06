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
}},_removeChildNodesThatAreNotElementNodes:function(D,A){var E=D.childNodes;
if(E.length===0){return 
}var F=[];
var C,B;
for(C=0;
C<E.length;
++C){B=E[C];
if(B.nodeType!=1){F.push(B)
}}for(C=0;
C<F.length;
++C){B=F[C];
D.removeChild(B)
}if(A){for(C=0;
C<E.length;
++C){B=E[C];
this._removeChildNodesThatAreNotElementNodes(B,A)
}}},_processRawXmlTree:function(C){this._loadFinished=true;
this._xmlData=C;
var B=C.getElementsByTagName("head");
var H=B[0];
if(H){this._removeChildNodesThatAreNotElementNodes(H);
this._metadataNodes=H.childNodes
}var A=C.getElementsByTagName("body");
var F=A[0];
if(F){this._removeChildNodesThatAreNotElementNodes(F,true);
var D=A[0].childNodes;
for(var E=0;
E<D.length;
++E){var G=D[E];
if(G.tagName=="outline"){this._identityMap[this._identCount]=G;
this._identCount++;
this._arrayOfTopLevelItems.push(G);
this._arrayOfAllItems.push(G);
this._checkChildNodes(G)
}}}},_checkChildNodes:function(A){if(A.firstChild){for(var C=0;
C<A.childNodes.length;
C++){var B=A.childNodes[C];
if(B.tagName=="outline"){this._identityMap[this._identCount]=B;
this._identCount++;
this._arrayOfAllItems.push(B);
this._checkChildNodes(B)
}}}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},getValue:function(B,A,D){this._assertIsItem(B);
this._assertIsAttribute(A);
if(A=="children"){return(B.firstChild||D)
}else{var C=B.getAttribute(A);
return(C!==undefined)?C:D
}},getValues:function(B,A){this._assertIsItem(B);
this._assertIsAttribute(A);
var C=[];
if(A=="children"){for(var D=0;
D<B.childNodes.length;
++D){C.push(B.childNodes[D])
}}else{if(B.getAttribute(A)!==null){C.push(B.getAttribute(A))
}}return C
},getAttributes:function(E){this._assertIsItem(E);
var F=[];
var B=E;
var D=B.attributes;
for(var A=0;
A<D.length;
++A){var C=D.item(A);
F.push(C.nodeName)
}if(B.childNodes.length>0){F.push("children")
}return F
},hasAttribute:function(A,B){return(this.getValues(A,B).length>0)
},containsValue:function(A,D,C){var B=undefined;
if(typeof C==="string"){B=dojo.data.util.filter.patternToRegExp(C,false)
}return this._containsValue(A,D,C,B)
},_containsValue:function(B,A,D,C){var E=this.getValues(B,A);
for(var G=0;
G<E.length;
++G){var F=E[G];
if(typeof F==="string"&&C){return(F.match(C)!==null)
}else{if(D===F){return true
}}}return false
},isItem:function(A){return(A&&A.nodeType==1&&A.tagName=="outline"&&A.ownerDocument===this._xmlData)
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getLabel:function(A){if(this.isItem(A)){return this.getValue(A,this.label)
}return undefined
},getLabelAttributes:function(A){return[this.label]
},_fetchItems:function(G,D,F){var E=this;
var A=function(O,H){var Q=null;
if(O.query){Q=[];
var P=O.queryOptions?O.queryOptions.ignoreCase:false;
var J={};
for(var K in O.query){var I=O.query[K];
if(typeof I==="string"){J[K]=dojo.data.util.filter.patternToRegExp(I,P)
}}for(var M=0;
M<H.length;
++M){var N=true;
var L=H[M];
for(var K in O.query){var I=O.query[K];
if(!E._containsValue(L,K,I,J[K])){N=false
}}if(N){Q.push(L)
}}}else{if(H.length>0){Q=H.slice(0,H.length)
}}D(Q,O)
};
if(this._loadFinished){A(G,this._getItemsArray(G.queryOptions))
}else{if(this._loadInProgress){this._queuedFetches.push({args:G,filter:A})
}else{if(this.url!==""){this._loadInProgress=true;
var C={url:E.url,handleAs:"xml"};
var B=dojo.xhrGet(C);
B.addCallback(function(H){E._processRawXmlTree(H);
A(G,E._getItemsArray(G.queryOptions));
E._handleQueuedFetches()
});
B.addErrback(function(H){throw H
})
}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
A(G,this._getItemsArray(G.queryOptions))
}else{throw new Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.")
}}}}},getFeatures:function(){var A={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
return A
},getIdentity:function(A){if(this.isItem(A)){for(var B in this._identityMap){if(this._identityMap[B]===A){return B
}}}return null
},fetchItemByIdentity:function(A){if(!this._loadFinished){var F=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:A})
}else{this._loadInProgress=true;
var E={url:F.url,handleAs:"xml"};
var D=dojo.xhrGet(E);
D.addCallback(function(G){var I=A.scope?A.scope:dojo.global;
try{F._processRawXmlTree(G);
var J=F._identityMap[A.identity];
if(!F.isItem(J)){J=null
}if(A.onItem){A.onItem.call(I,J)
}F._handleQueuedFetches()
}catch(H){if(A.onError){A.onError.call(I,H)
}}});
D.addErrback(function(H){this._loadInProgress=false;
if(A.onError){var G=A.scope?A.scope:dojo.global;
A.onError.call(G,H)
}})
}}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
var C=this._identityMap[A.identity];
if(!F.isItem(C)){C=null
}if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}}}else{var C=this._identityMap[A.identity];
if(!this.isItem(C)){C=null
}if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}},getIdentityAttributes:function(A){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var B=0;
B<this._queuedFetches.length;
B++){var D=this._queuedFetches[B];
var A=D.args;
var C=D.filter;
if(C){C(A,this._getItemsArray(A.queryOptions))
}else{this.fetchItemByIdentity(A)
}}this._queuedFetches=[]
}},close:function(A){}});
dojo.extend(dojox.data.OpmlStore,dojo.data.util.simpleFetch)
};