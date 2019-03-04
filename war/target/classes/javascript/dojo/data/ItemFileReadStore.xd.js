dojo._xdResourceLoaded({depends:[["provide","dojo.data.ItemFileReadStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojo.data.ItemFileReadStore"]){A._hasResource["dojo.data.ItemFileReadStore"]=true;
A.provide("dojo.data.ItemFileReadStore");
A.require("dojo.data.util.filter");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.date.stamp");
A.declare("dojo.data.ItemFileReadStore",null,{constructor:function(B){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=B.url;
this._jsonData=B.data;
this._datatypeMap=B.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(C){return A.date.stamp.fromISOString(C)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(E,D,B){var C=this.getValues(E,D);
return(C.length>0)?C[0]:B
},getValues:function(C,B){this._assertIsItem(C);
this._assertIsAttribute(B);
return C[B]||[]
},getAttributes:function(D){this._assertIsItem(D);
var B=[];
for(var C in D){if((C!==this._storeRefPropName)&&(C!==this._itemNumPropName)&&(C!==this._rootItemPropName)){B.push(C)
}}return B
},hasAttribute:function(C,B){return this.getValues(C,B).length>0
},containsValue:function(C,B,E){var D=undefined;
if(typeof E==="string"){D=A.data.util.filter.patternToRegExp(E,false)
}return this._containsValue(C,B,E,D)
},_containsValue:function(C,B,E,D){return A.some(this.getValues(C,B),function(F){if(F!==null&&!A.isObject(F)&&D){if(F.toString().match(D)){return true
}}else{if(E===F){return true
}}})
},isItem:function(B){if(B&&B[this._storeRefPropName]===this){if(this._arrayOfAllItems[B[this._itemNumPropName]]===B){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},getFeatures:function(){return this._features
},getLabel:function(B){if(this._labelAttr&&this.isItem(B)){return this.getValue(B,this._labelAttr)
}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(D,I,C){var B=this;
var E=function(M,P){var O=[];
if(M.query){var N=M.queryOptions?M.queryOptions.ignoreCase:false;
var R={};
for(var S in M.query){var Q=M.query[S];
if(typeof Q==="string"){R[S]=A.data.util.filter.patternToRegExp(Q,N)
}}for(var K=0;
K<P.length;
++K){var L=true;
var J=P[K];
if(J===null){L=false
}else{for(var S in M.query){var Q=M.query[S];
if(!B._containsValue(J,S,Q,R[S])){L=false
}}}if(L){O.push(J)
}}I(O,M)
}else{for(var K=0;
K<P.length;
++K){var T=P[K];
if(T!==null){O.push(T)
}}I(O,M)
}};
if(this._loadFinished){E(D,this._getItemsArray(D.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:D,filter:E})
}else{this._loadInProgress=true;
var G={url:B._jsonFileUrl,handleAs:"json-comment-optional"};
var F=A.xhrGet(G);
F.addCallback(function(J){try{B._getItemsFromLoadedData(J);
B._loadFinished=true;
B._loadInProgress=false;
E(D,B._getItemsArray(D.queryOptions));
B._handleQueuedFetches()
}catch(K){B._loadFinished=true;
B._loadInProgress=false;
C(K,D)
}});
F.addErrback(function(J){B._loadInProgress=false;
C(J,D)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
E(D,this._getItemsArray(D.queryOptions))
}catch(H){C(H,D)
}}else{C(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),D)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var D=0;
D<this._queuedFetches.length;
D++){var B=this._queuedFetches[D];
var C=B.args;
var E=B.filter;
if(E){E(C,this._getItemsArray(C.queryOptions))
}else{this.fetchItemByIdentity(C)
}}this._queuedFetches=[]
}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(B){},_getItemsFromLoadedData:function(F){function C(V){var W=((V!=null)&&(typeof V=="object")&&(!A.isArray(V))&&(!A.isFunction(V))&&(V.constructor==Object)&&(typeof V._reference=="undefined")&&(typeof V._type=="undefined")&&(typeof V._value=="undefined"));
return W
}var K=this;
function S(a){K._arrayOfAllItems.push(a);
for(var Z in a){var Y=a[Z];
if(Y){if(A.isArray(Y)){var X=Y;
for(var W=0;
W<X.length;
++W){var V=X[W];
if(C(V)){S(V)
}}}else{if(C(Y)){S(Y)
}}}}}this._labelAttr=F.label;
var P;
var R;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=F.items;
for(P=0;
P<this._arrayOfTopLevelItems.length;
++P){R=this._arrayOfTopLevelItems[P];
S(R);
R[this._rootItemPropName]=true
}var M={};
var T;
for(P=0;
P<this._arrayOfAllItems.length;
++P){R=this._arrayOfAllItems[P];
for(T in R){if(T!==this._rootItemPropName){var L=R[T];
if(L!==null){if(!A.isArray(L)){R[T]=[L]
}}else{R[T]=[null]
}}M[T]=T
}}while(M[this._storeRefPropName]){this._storeRefPropName+="_"
}while(M[this._itemNumPropName]){this._itemNumPropName+="_"
}var I;
var E=F.identifier;
if(E){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=E;
for(P=0;
P<this._arrayOfAllItems.length;
++P){R=this._arrayOfAllItems[P];
I=R[E];
var U=I[0];
if(!this._itemsByIdentity[U]){this._itemsByIdentity[U]=R
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+E+"].  Value collided: ["+U+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+E+"].  Value collided: ["+U+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(P=0;
P<this._arrayOfAllItems.length;
++P){R=this._arrayOfAllItems[P];
R[this._storeRefPropName]=this;
R[this._itemNumPropName]=P
}for(P=0;
P<this._arrayOfAllItems.length;
++P){R=this._arrayOfAllItems[P];
for(T in R){I=R[T];
for(var O=0;
O<I.length;
++O){L=I[O];
if(L!==null&&typeof L=="object"){if(L._type&&L._value){var G=L._type;
var H=this._datatypeMap[G];
if(!H){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+G+"'")
}else{if(A.isFunction(H)){I[O]=new H(L._value)
}else{if(A.isFunction(H.deserialize)){I[O]=H.deserialize(L._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(L._reference){var B=L._reference;
if(A.isString(B)){I[O]=this._itemsByIdentity[B]
}else{for(var N=0;
N<this._arrayOfAllItems.length;
++N){var D=this._arrayOfAllItems[N];
var J=true;
for(var Q in B){if(D[Q]!=B[Q]){J=false
}}if(J){I[O]=D
}}}}}}}}},getIdentity:function(C){var B=this._features["dojo.data.api.Identity"];
if(B===Number){return C[this._itemNumPropName]
}else{var D=C[B];
if(D){return D[0]
}}return null
},fetchItemByIdentity:function(C){if(!this._loadFinished){var B=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:C})
}else{this._loadInProgress=true;
var G={url:B._jsonFileUrl,handleAs:"json-comment-optional"};
var F=A.xhrGet(G);
F.addCallback(function(K){var I=C.scope?C.scope:A.global;
try{B._getItemsFromLoadedData(K);
B._loadFinished=true;
B._loadInProgress=false;
var J=B._getItemByIdentity(C.identity);
if(C.onItem){C.onItem.call(I,J)
}B._handleQueuedFetches()
}catch(H){B._loadInProgress=false;
if(C.onError){C.onError.call(I,H)
}}});
F.addErrback(function(H){B._loadInProgress=false;
if(C.onError){var I=C.scope?C.scope:A.global;
C.onError.call(I,H)
}})
}}else{if(this._jsonData){B._getItemsFromLoadedData(B._jsonData);
B._jsonData=null;
B._loadFinished=true;
var E=B._getItemByIdentity(C.identity);
if(C.onItem){var D=C.scope?C.scope:A.global;
C.onItem.call(D,E)
}}}}else{var E=this._getItemByIdentity(C.identity);
if(C.onItem){var D=C.scope?C.scope:A.global;
C.onItem.call(D,E)
}}},_getItemByIdentity:function(B){var C=null;
if(this._itemsByIdentity){C=this._itemsByIdentity[B]
}else{C=this._arrayOfAllItems[B]
}if(C===undefined){C=null
}return C
},getIdentityAttributes:function(C){var B=this._features["dojo.data.api.Identity"];
if(B===Number){return null
}else{return[B]
}},_forceLoad:function(){var B=this;
if(this._jsonFileUrl){var D={url:B._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var C=A.xhrGet(D);
C.addCallback(function(E){try{if(B._loadInProgress!==true&&!B._loadFinished){B._getItemsFromLoadedData(E);
B._loadFinished=true
}}catch(F){console.log(F);
throw F
}});
C.addErrback(function(E){throw E
})
}else{if(this._jsonData){B._getItemsFromLoadedData(B._jsonData);
B._jsonData=null;
B._loadFinished=true
}}}});
A.extend(A.data.ItemFileReadStore,A.data.util.simpleFetch)
}}});