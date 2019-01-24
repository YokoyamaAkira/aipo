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
}},_removeChildNodesThatAreNotElementNodes:function(F,C){var G=F.childNodes;
if(G.length===0){return 
}var B=[];
var E,D;
for(E=0;
E<G.length;
++E){D=G[E];
if(D.nodeType!=1){B.push(D)
}}for(E=0;
E<B.length;
++E){D=B[E];
F.removeChild(D)
}if(C){for(E=0;
E<G.length;
++E){D=G[E];
this._removeChildNodesThatAreNotElementNodes(D,C)
}}},_processRawXmlTree:function(I){this._loadFinished=true;
this._xmlData=I;
var H=I.getElementsByTagName("head");
var F=H[0];
if(F){this._removeChildNodesThatAreNotElementNodes(F);
this._metadataNodes=F.childNodes
}var G=I.getElementsByTagName("body");
var D=G[0];
if(D){this._removeChildNodesThatAreNotElementNodes(D,true);
var B=G[0].childNodes;
for(var C=0;
C<B.length;
++C){var E=B[C];
if(E.tagName=="outline"){this._identityMap[this._identCount]=E;
this._identCount++;
this._arrayOfTopLevelItems.push(E);
this._arrayOfAllItems.push(E);
this._checkChildNodes(E)
}}}},_checkChildNodes:function(C){if(C.firstChild){for(var B=0;
B<C.childNodes.length;
B++){var D=C.childNodes[B];
if(D.tagName=="outline"){this._identityMap[this._identCount]=D;
this._identCount++;
this._arrayOfAllItems.push(D);
this._checkChildNodes(D)
}}}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},getValue:function(D,C,B){this._assertIsItem(D);
this._assertIsAttribute(C);
if(C=="children"){return(D.firstChild||B)
}else{var E=D.getAttribute(C);
return(E!==undefined)?E:B
}},getValues:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
var E=[];
if(C=="children"){for(var B=0;
B<D.childNodes.length;
++B){E.push(D.childNodes[B])
}}else{if(D.getAttribute(C)!==null){E.push(D.getAttribute(C))
}}return E
},getAttributes:function(G){this._assertIsItem(G);
var B=[];
var D=G;
var F=D.attributes;
for(var C=0;
C<F.length;
++C){var E=F.item(C);
B.push(E.nodeName)
}if(D.childNodes.length>0){B.push("children")
}return B
},hasAttribute:function(C,B){return(this.getValues(C,B).length>0)
},containsValue:function(C,B,E){var D=undefined;
if(typeof E==="string"){D=A.data.util.filter.patternToRegExp(E,false)
}return this._containsValue(C,B,E,D)
},_containsValue:function(F,E,H,G){var B=this.getValues(F,E);
for(var D=0;
D<B.length;
++D){var C=B[D];
if(typeof C==="string"&&G){return(C.match(G)!==null)
}else{if(H===C){return true
}}}return false
},isItem:function(B){return(B&&B.nodeType==1&&B.tagName=="outline"&&B.ownerDocument===this._xmlData)
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getLabel:function(B){if(this.isItem(B)){return this.getValue(B,this.label)
}return undefined
},getLabelAttributes:function(B){return[this.label]
},_fetchItems:function(D,H,C){var B=this;
var E=function(L,O){var N=null;
if(L.query){N=[];
var M=L.queryOptions?L.queryOptions.ignoreCase:false;
var Q={};
for(var R in L.query){var P=L.query[R];
if(typeof P==="string"){Q[R]=A.data.util.filter.patternToRegExp(P,M)
}}for(var J=0;
J<O.length;
++J){var K=true;
var I=O[J];
for(var R in L.query){var P=L.query[R];
if(!B._containsValue(I,R,P,Q[R])){K=false
}}if(K){N.push(I)
}}}else{if(O.length>0){N=O.slice(0,O.length)
}}H(N,L)
};
if(this._loadFinished){E(D,this._getItemsArray(D.queryOptions))
}else{if(this._loadInProgress){this._queuedFetches.push({args:D,filter:E})
}else{if(this.url!==""){this._loadInProgress=true;
var G={url:B.url,handleAs:"xml"};
var F=A.xhrGet(G);
F.addCallback(function(I){B._processRawXmlTree(I);
E(D,B._getItemsArray(D.queryOptions));
B._handleQueuedFetches()
});
F.addErrback(function(I){throw I
})
}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
E(D,this._getItemsArray(D.queryOptions))
}else{throw new Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.")
}}}}},getFeatures:function(){var B={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
return B
},getIdentity:function(C){if(this.isItem(C)){for(var B in this._identityMap){if(this._identityMap[B]===C){return B
}}}return null
},fetchItemByIdentity:function(C){if(!this._loadFinished){var B=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:C})
}else{this._loadInProgress=true;
var G={url:B.url,handleAs:"xml"};
var F=A.xhrGet(G);
F.addCallback(function(K){var I=C.scope?C.scope:A.global;
try{B._processRawXmlTree(K);
var J=B._identityMap[C.identity];
if(!B.isItem(J)){J=null
}if(C.onItem){C.onItem.call(I,J)
}B._handleQueuedFetches()
}catch(H){if(C.onError){C.onError.call(I,H)
}}});
F.addErrback(function(H){this._loadInProgress=false;
if(C.onError){var I=C.scope?C.scope:A.global;
C.onError.call(I,H)
}})
}}else{if(this._opmlData){this._processRawXmlTree(this._opmlData);
this._opmlData=null;
var E=this._identityMap[C.identity];
if(!B.isItem(E)){E=null
}if(C.onItem){var D=C.scope?C.scope:A.global;
C.onItem.call(D,E)
}}}}else{var E=this._identityMap[C.identity];
if(!this.isItem(E)){E=null
}if(C.onItem){var D=C.scope?C.scope:A.global;
C.onItem.call(D,E)
}}},getIdentityAttributes:function(B){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var D=0;
D<this._queuedFetches.length;
D++){var B=this._queuedFetches[D];
var C=B.args;
var E=B.filter;
if(E){E(C,this._getItemsArray(C.queryOptions))
}else{this.fetchItemByIdentity(C)
}}this._queuedFetches=[]
}},close:function(B){}});
A.extend(dojox.data.OpmlStore,A.data.util.simpleFetch)
}}});