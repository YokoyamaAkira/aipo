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
}},getValue:function(C,B,D){var A=this.getValues(C,B);
return(A.length>0)?A[0]:D
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
return A[B]||[]
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var A in B){if((A!==this._storeRefPropName)&&(A!==this._itemNumPropName)&&(A!==this._rootItemPropName)){C.push(A)
}}return C
},hasAttribute:function(A,B){return this.getValues(A,B).length>0
},containsValue:function(A,D,C){var B=undefined;
if(typeof C==="string"){B=dojo.data.util.filter.patternToRegExp(C,false)
}return this._containsValue(A,D,C,B)
},_containsValue:function(A,D,C,B){return dojo.some(this.getValues(A,D),function(E){if(E!==null&&!dojo.isObject(E)&&B){if(E.toString().match(B)){return true
}}else{if(C===E){return true
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
},_fetchItems:function(F,C,E){var D=this;
var G=function(P,S){var R=[];
if(P.query){var Q=P.queryOptions?P.queryOptions.ignoreCase:false;
var J={};
for(var K in P.query){var I=P.query[K];
if(typeof I==="string"){J[K]=dojo.data.util.filter.patternToRegExp(I,Q)
}}for(var N=0;
N<S.length;
++N){var O=true;
var M=S[N];
if(M===null){O=false
}else{for(var K in P.query){var I=P.query[K];
if(!D._containsValue(M,K,I,J[K])){O=false
}}}if(O){R.push(M)
}}C(R,P)
}else{for(var N=0;
N<S.length;
++N){var L=S[N];
if(L!==null){R.push(L)
}}C(R,P)
}};
if(this._loadFinished){G(F,this._getItemsArray(F.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:F,filter:G})
}else{this._loadInProgress=true;
var A={url:D._jsonFileUrl,handleAs:"json-comment-optional"};
var H=dojo.xhrGet(A);
H.addCallback(function(J){try{D._getItemsFromLoadedData(J);
D._loadFinished=true;
D._loadInProgress=false;
G(F,D._getItemsArray(F.queryOptions));
D._handleQueuedFetches()
}catch(I){D._loadFinished=true;
D._loadInProgress=false;
E(I,F)
}});
H.addErrback(function(I){D._loadInProgress=false;
E(I,F)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
G(F,this._getItemsArray(F.queryOptions))
}catch(B){E(B,F)
}}else{E(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),F)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var B=0;
B<this._queuedFetches.length;
B++){var D=this._queuedFetches[B];
var A=D.args;
var C=D.filter;
if(C){C(A,this._getItemsArray(A.queryOptions))
}else{this.fetchItemByIdentity(A)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(K){function H(V){var U=((V!=null)&&(typeof V=="object")&&(!dojo.isArray(V))&&(!dojo.isFunction(V))&&(V.constructor==Object)&&(typeof V._reference=="undefined")&&(typeof V._type=="undefined")&&(typeof V._value=="undefined"));
return U
}var P=this;
function D(X){P._arrayOfAllItems.push(X);
for(var W in X){var V=X[W];
if(V){if(dojo.isArray(V)){var U=V;
for(var Z=0;
Z<U.length;
++Z){var Y=U[Z];
if(H(Y)){D(Y)
}}}else{if(H(V)){D(V)
}}}}}this._labelAttr=K.label;
var A;
var C;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=K.items;
for(A=0;
A<this._arrayOfTopLevelItems.length;
++A){C=this._arrayOfTopLevelItems[A];
D(C);
C[this._rootItemPropName]=true
}var R={};
var E;
for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
for(E in C){if(E!==this._rootItemPropName){var Q=C[E];
if(Q!==null){if(!dojo.isArray(Q)){C[E]=[Q]
}}else{C[E]=[null]
}}R[E]=E
}}while(R[this._storeRefPropName]){this._storeRefPropName+="_"
}while(R[this._itemNumPropName]){this._itemNumPropName+="_"
}var N;
var J=K.identifier;
if(J){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=J;
for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
N=C[J];
var F=N[0];
if(!this._itemsByIdentity[F]){this._itemsByIdentity[F]=C
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+F+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+F+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
C[this._storeRefPropName]=this;
C[this._itemNumPropName]=A
}for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
for(E in C){N=C[E];
for(var T=0;
T<N.length;
++T){Q=N[T];
if(Q!==null&&typeof Q=="object"){if(Q._type&&Q._value){var L=Q._type;
var M=this._datatypeMap[L];
if(!M){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+L+"'")
}else{if(dojo.isFunction(M)){N[T]=new M(Q._value)
}else{if(dojo.isFunction(M.deserialize)){N[T]=M.deserialize(Q._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(Q._reference){var G=Q._reference;
if(dojo.isString(G)){N[T]=this._itemsByIdentity[G]
}else{for(var S=0;
S<this._arrayOfAllItems.length;
++S){var I=this._arrayOfAllItems[S];
var O=true;
for(var B in G){if(I[B]!=G[B]){O=false
}}if(O){N[T]=I
}}}}}}}}},getIdentity:function(A){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return A[this._itemNumPropName]
}else{var B=A[C];
if(B){return B[0]
}}return null
},fetchItemByIdentity:function(A){if(!this._loadFinished){var F=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:A})
}else{this._loadInProgress=true;
var E={url:F._jsonFileUrl,handleAs:"json-comment-optional"};
var D=dojo.xhrGet(E);
D.addCallback(function(G){var I=A.scope?A.scope:dojo.global;
try{F._getItemsFromLoadedData(G);
F._loadFinished=true;
F._loadInProgress=false;
var J=F._getItemByIdentity(A.identity);
if(A.onItem){A.onItem.call(I,J)
}F._handleQueuedFetches()
}catch(H){F._loadInProgress=false;
if(A.onError){A.onError.call(I,H)
}}});
D.addErrback(function(H){F._loadInProgress=false;
if(A.onError){var G=A.scope?A.scope:dojo.global;
A.onError.call(G,H)
}})
}}else{if(this._jsonData){F._getItemsFromLoadedData(F._jsonData);
F._jsonData=null;
F._loadFinished=true;
var C=F._getItemByIdentity(A.identity);
if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}}}else{var C=this._getItemByIdentity(A.identity);
if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}},_getItemByIdentity:function(B){var A=null;
if(this._itemsByIdentity){A=this._itemsByIdentity[B]
}else{A=this._arrayOfAllItems[B]
}if(A===undefined){A=null
}return A
},getIdentityAttributes:function(A){var B=this._features["dojo.data.api.Identity"];
if(B===Number){return null
}else{return[B]
}},_forceLoad:function(){var C=this;
if(this._jsonFileUrl){var B={url:C._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var A=dojo.xhrGet(B);
A.addCallback(function(E){try{if(C._loadInProgress!==true&&!C._loadFinished){C._getItemsFromLoadedData(E);
C._loadFinished=true
}}catch(D){console.log(D);
throw D
}});
A.addErrback(function(D){throw D
})
}else{if(this._jsonData){C._getItemsFromLoadedData(C._jsonData);
C._jsonData=null;
C._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
};