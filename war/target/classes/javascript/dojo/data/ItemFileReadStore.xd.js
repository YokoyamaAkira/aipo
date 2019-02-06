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
}},getValue:function(B,E,C){var D=this.getValues(B,E);
return(D.length>0)?D[0]:C
},getValues:function(B,C){this._assertIsItem(B);
this._assertIsAttribute(C);
return B[C]||[]
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var D in B){if((D!==this._storeRefPropName)&&(D!==this._itemNumPropName)&&(D!==this._rootItemPropName)){C.push(D)
}}return C
},hasAttribute:function(B,C){return this.getValues(B,C).length>0
},containsValue:function(D,C,B){var E=undefined;
if(typeof B==="string"){E=A.data.util.filter.patternToRegExp(B,false)
}return this._containsValue(D,C,B,E)
},_containsValue:function(D,C,B,E){return A.some(this.getValues(D,C),function(F){if(F!==null&&!A.isObject(F)&&E){if(F.toString().match(E)){return true
}}else{if(B===F){return true
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
},_fetchItems:function(H,C,G){var F=this;
var I=function(O,R){var Q=[];
if(O.query){var P=O.queryOptions?O.queryOptions.ignoreCase:false;
var T={};
for(var J in O.query){var S=O.query[J];
if(typeof S==="string"){T[J]=A.data.util.filter.patternToRegExp(S,P)
}}for(var M=0;
M<R.length;
++M){var N=true;
var L=R[M];
if(L===null){N=false
}else{for(var J in O.query){var S=O.query[J];
if(!F._containsValue(L,J,S,T[J])){N=false
}}}if(N){Q.push(L)
}}C(Q,O)
}else{for(var M=0;
M<R.length;
++M){var K=R[M];
if(K!==null){Q.push(K)
}}C(Q,O)
}};
if(this._loadFinished){I(H,this._getItemsArray(H.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:H,filter:I})
}else{this._loadInProgress=true;
var D={url:F._jsonFileUrl,handleAs:"json-comment-optional"};
var B=A.xhrGet(D);
B.addCallback(function(J){try{F._getItemsFromLoadedData(J);
F._loadFinished=true;
F._loadInProgress=false;
I(H,F._getItemsArray(H.queryOptions));
F._handleQueuedFetches()
}catch(K){F._loadFinished=true;
F._loadInProgress=false;
G(K,H)
}});
B.addErrback(function(J){F._loadInProgress=false;
G(J,H)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
I(H,this._getItemsArray(H.queryOptions))
}catch(E){G(E,H)
}}else{G(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),H)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var E=0;
E<this._queuedFetches.length;
E++){var C=this._queuedFetches[E];
var D=C.args;
var B=C.filter;
if(B){B(D,this._getItemsArray(D.queryOptions))
}else{this.fetchItemByIdentity(D)
}}this._queuedFetches=[]
}},_getItemsArray:function(B){if(B&&B.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(B){},_getItemsFromLoadedData:function(L){function I(V){var W=((V!=null)&&(typeof V=="object")&&(!A.isArray(V))&&(!A.isFunction(V))&&(V.constructor==Object)&&(typeof V._reference=="undefined")&&(typeof V._type=="undefined")&&(typeof V._value=="undefined"));
return W
}var Q=this;
function E(Y){Q._arrayOfAllItems.push(Y);
for(var X in Y){var W=Y[X];
if(W){if(A.isArray(W)){var V=W;
for(var a=0;
a<V.length;
++a){var Z=V[a];
if(I(Z)){E(Z)
}}}else{if(I(W)){E(W)
}}}}}this._labelAttr=L.label;
var B;
var D;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=L.items;
for(B=0;
B<this._arrayOfTopLevelItems.length;
++B){D=this._arrayOfTopLevelItems[B];
E(D);
D[this._rootItemPropName]=true
}var S={};
var F;
for(B=0;
B<this._arrayOfAllItems.length;
++B){D=this._arrayOfAllItems[B];
for(F in D){if(F!==this._rootItemPropName){var R=D[F];
if(R!==null){if(!A.isArray(R)){D[F]=[R]
}}else{D[F]=[null]
}}S[F]=F
}}while(S[this._storeRefPropName]){this._storeRefPropName+="_"
}while(S[this._itemNumPropName]){this._itemNumPropName+="_"
}var O;
var K=L.identifier;
if(K){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=K;
for(B=0;
B<this._arrayOfAllItems.length;
++B){D=this._arrayOfAllItems[B];
O=D[K];
var G=O[0];
if(!this._itemsByIdentity[G]){this._itemsByIdentity[G]=D
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+K+"].  Value collided: ["+G+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+K+"].  Value collided: ["+G+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(B=0;
B<this._arrayOfAllItems.length;
++B){D=this._arrayOfAllItems[B];
D[this._storeRefPropName]=this;
D[this._itemNumPropName]=B
}for(B=0;
B<this._arrayOfAllItems.length;
++B){D=this._arrayOfAllItems[B];
for(F in D){O=D[F];
for(var U=0;
U<O.length;
++U){R=O[U];
if(R!==null&&typeof R=="object"){if(R._type&&R._value){var M=R._type;
var N=this._datatypeMap[M];
if(!N){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+M+"'")
}else{if(A.isFunction(N)){O[U]=new N(R._value)
}else{if(A.isFunction(N.deserialize)){O[U]=N.deserialize(R._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(R._reference){var H=R._reference;
if(A.isString(H)){O[U]=this._itemsByIdentity[H]
}else{for(var T=0;
T<this._arrayOfAllItems.length;
++T){var J=this._arrayOfAllItems[T];
var P=true;
for(var C in H){if(J[C]!=H[C]){P=false
}}if(P){O[U]=J
}}}}}}}}},getIdentity:function(D){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return D[this._itemNumPropName]
}else{var B=D[C];
if(B){return B[0]
}}return null
},fetchItemByIdentity:function(D){if(!this._loadFinished){var C=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:D})
}else{this._loadInProgress=true;
var B={url:C._jsonFileUrl,handleAs:"json-comment-optional"};
var G=A.xhrGet(B);
G.addCallback(function(K){var I=D.scope?D.scope:A.global;
try{C._getItemsFromLoadedData(K);
C._loadFinished=true;
C._loadInProgress=false;
var J=C._getItemByIdentity(D.identity);
if(D.onItem){D.onItem.call(I,J)
}C._handleQueuedFetches()
}catch(H){C._loadInProgress=false;
if(D.onError){D.onError.call(I,H)
}}});
G.addErrback(function(H){C._loadInProgress=false;
if(D.onError){var I=D.scope?D.scope:A.global;
D.onError.call(I,H)
}})
}}else{if(this._jsonData){C._getItemsFromLoadedData(C._jsonData);
C._jsonData=null;
C._loadFinished=true;
var F=C._getItemByIdentity(D.identity);
if(D.onItem){var E=D.scope?D.scope:A.global;
D.onItem.call(E,F)
}}}}else{var F=this._getItemByIdentity(D.identity);
if(D.onItem){var E=D.scope?D.scope:A.global;
D.onItem.call(E,F)
}}},_getItemByIdentity:function(C){var B=null;
if(this._itemsByIdentity){B=this._itemsByIdentity[C]
}else{B=this._arrayOfAllItems[C]
}if(B===undefined){B=null
}return B
},getIdentityAttributes:function(B){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return null
}else{return[C]
}},_forceLoad:function(){var C=this;
if(this._jsonFileUrl){var B={url:C._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var D=A.xhrGet(B);
D.addCallback(function(E){try{if(C._loadInProgress!==true&&!C._loadFinished){C._getItemsFromLoadedData(E);
C._loadFinished=true
}}catch(F){console.log(F);
throw F
}});
D.addErrback(function(E){throw E
})
}else{if(this._jsonData){C._getItemsFromLoadedData(C._jsonData);
C._jsonData=null;
C._loadFinished=true
}}}});
A.extend(A.data.ItemFileReadStore,A.data.util.simpleFetch)
}}});