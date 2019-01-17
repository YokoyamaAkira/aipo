if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.date.stamp");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(A){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=A.url;
this._jsonData=A.data;
this._datatypeMap=A.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(B){return dojo.date.stamp.fromISOString(B)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(D,C,A){var B=this.getValues(D,C);
return(B.length>0)?B[0]:A
},getValues:function(B,A){this._assertIsItem(B);
this._assertIsAttribute(A);
return B[A]||[]
},getAttributes:function(C){this._assertIsItem(C);
var A=[];
for(var B in C){if((B!==this._storeRefPropName)&&(B!==this._itemNumPropName)&&(B!==this._rootItemPropName)){A.push(B)
}}return A
},hasAttribute:function(B,A){return this.getValues(B,A).length>0
},containsValue:function(B,A,D){var C=undefined;
if(typeof D==="string"){C=dojo.data.util.filter.patternToRegExp(D,false)
}return this._containsValue(B,A,D,C)
},_containsValue:function(B,A,D,C){return dojo.some(this.getValues(B,A),function(E){if(E!==null&&!dojo.isObject(E)&&C){if(E.toString().match(C)){return true
}}else{if(D===E){return true
}}})
},isItem:function(A){if(A&&A[this._storeRefPropName]===this){if(this._arrayOfAllItems[A[this._itemNumPropName]]===A){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},getFeatures:function(){return this._features
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){return this.getValue(A,this._labelAttr)
}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(C,H,B){var A=this;
var D=function(L,O){var N=[];
if(L.query){var M=L.queryOptions?L.queryOptions.ignoreCase:false;
var Q={};
for(var R in L.query){var P=L.query[R];
if(typeof P==="string"){Q[R]=dojo.data.util.filter.patternToRegExp(P,M)
}}for(var J=0;
J<O.length;
++J){var K=true;
var I=O[J];
if(I===null){K=false
}else{for(var R in L.query){var P=L.query[R];
if(!A._containsValue(I,R,P,Q[R])){K=false
}}}if(K){N.push(I)
}}H(N,L)
}else{for(var J=0;
J<O.length;
++J){var S=O[J];
if(S!==null){N.push(S)
}}H(N,L)
}};
if(this._loadFinished){D(C,this._getItemsArray(C.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{this._loadInProgress=true;
var F={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var E=dojo.xhrGet(F);
E.addCallback(function(I){try{A._getItemsFromLoadedData(I);
A._loadFinished=true;
A._loadInProgress=false;
D(C,A._getItemsArray(C.queryOptions));
A._handleQueuedFetches()
}catch(J){A._loadFinished=true;
A._loadInProgress=false;
B(J,C)
}});
E.addErrback(function(I){A._loadInProgress=false;
B(I,C)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
D(C,this._getItemsArray(C.queryOptions))
}catch(G){B(G,C)
}}else{B(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),C)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var C=0;
C<this._queuedFetches.length;
C++){var A=this._queuedFetches[C];
var B=A.args;
var D=A.filter;
if(D){D(B,this._getItemsArray(B.queryOptions))
}else{this.fetchItemByIdentity(B)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(E){function B(U){var V=((U!=null)&&(typeof U=="object")&&(!dojo.isArray(U))&&(!dojo.isFunction(U))&&(U.constructor==Object)&&(typeof U._reference=="undefined")&&(typeof U._type=="undefined")&&(typeof U._value=="undefined"));
return V
}var J=this;
function R(Z){J._arrayOfAllItems.push(Z);
for(var Y in Z){var X=Z[Y];
if(X){if(dojo.isArray(X)){var W=X;
for(var V=0;
V<W.length;
++V){var U=W[V];
if(B(U)){R(U)
}}}else{if(B(X)){R(X)
}}}}}this._labelAttr=E.label;
var O;
var Q;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=E.items;
for(O=0;
O<this._arrayOfTopLevelItems.length;
++O){Q=this._arrayOfTopLevelItems[O];
R(Q);
Q[this._rootItemPropName]=true
}var L={};
var S;
for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
for(S in Q){if(S!==this._rootItemPropName){var K=Q[S];
if(K!==null){if(!dojo.isArray(K)){Q[S]=[K]
}}else{Q[S]=[null]
}}L[S]=S
}}while(L[this._storeRefPropName]){this._storeRefPropName+="_"
}while(L[this._itemNumPropName]){this._itemNumPropName+="_"
}var H;
var D=E.identifier;
if(D){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=D;
for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
H=Q[D];
var T=H[0];
if(!this._itemsByIdentity[T]){this._itemsByIdentity[T]=Q
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+D+"].  Value collided: ["+T+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+D+"].  Value collided: ["+T+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
Q[this._storeRefPropName]=this;
Q[this._itemNumPropName]=O
}for(O=0;
O<this._arrayOfAllItems.length;
++O){Q=this._arrayOfAllItems[O];
for(S in Q){H=Q[S];
for(var N=0;
N<H.length;
++N){K=H[N];
if(K!==null&&typeof K=="object"){if(K._type&&K._value){var F=K._type;
var G=this._datatypeMap[F];
if(!G){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+F+"'")
}else{if(dojo.isFunction(G)){H[N]=new G(K._value)
}else{if(dojo.isFunction(G.deserialize)){H[N]=G.deserialize(K._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(K._reference){var A=K._reference;
if(dojo.isString(A)){H[N]=this._itemsByIdentity[A]
}else{for(var M=0;
M<this._arrayOfAllItems.length;
++M){var C=this._arrayOfAllItems[M];
var I=true;
for(var P in A){if(C[P]!=A[P]){I=false
}}if(I){H[N]=C
}}}}}}}}},getIdentity:function(B){var A=this._features["dojo.data.api.Identity"];
if(A===Number){return B[this._itemNumPropName]
}else{var C=B[A];
if(C){return C[0]
}}return null
},fetchItemByIdentity:function(B){if(!this._loadFinished){var A=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:B})
}else{this._loadInProgress=true;
var F={url:A._jsonFileUrl,handleAs:"json-comment-optional"};
var E=dojo.xhrGet(F);
E.addCallback(function(J){var H=B.scope?B.scope:dojo.global;
try{A._getItemsFromLoadedData(J);
A._loadFinished=true;
A._loadInProgress=false;
var I=A._getItemByIdentity(B.identity);
if(B.onItem){B.onItem.call(H,I)
}A._handleQueuedFetches()
}catch(G){A._loadInProgress=false;
if(B.onError){B.onError.call(H,G)
}}});
E.addErrback(function(G){A._loadInProgress=false;
if(B.onError){var H=B.scope?B.scope:dojo.global;
B.onError.call(H,G)
}})
}}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true;
var D=A._getItemByIdentity(B.identity);
if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}}}else{var D=this._getItemByIdentity(B.identity);
if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}},_getItemByIdentity:function(A){var B=null;
if(this._itemsByIdentity){B=this._itemsByIdentity[A]
}else{B=this._arrayOfAllItems[A]
}if(B===undefined){B=null
}return B
},getIdentityAttributes:function(B){var A=this._features["dojo.data.api.Identity"];
if(A===Number){return null
}else{return[A]
}},_forceLoad:function(){var A=this;
if(this._jsonFileUrl){var C={url:A._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var B=dojo.xhrGet(C);
B.addCallback(function(D){try{if(A._loadInProgress!==true&&!A._loadFinished){A._getItemsFromLoadedData(D);
A._loadFinished=true
}}catch(E){console.log(E);
throw E
}});
B.addErrback(function(D){throw D
})
}else{if(this._jsonData){A._getItemsFromLoadedData(A._jsonData);
A._jsonData=null;
A._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
};