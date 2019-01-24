dojo._xdResourceLoaded({depends:[["provide","dojo.data.ItemFileWriteStore"],["require","dojo.data.ItemFileReadStore"]],defineResource:function(A){if(!A._hasResource["dojo.data.ItemFileWriteStore"]){A._hasResource["dojo.data.ItemFileWriteStore"]=true;
A.provide("dojo.data.ItemFileWriteStore");
A.require("dojo.data.ItemFileReadStore");
A.declare("dojo.data.ItemFileWriteStore",A.data.ItemFileReadStore,{constructor:function(B){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(C){return A.date.stamp.toISOString(C,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(B){if(!B){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var B=this.getFeatures()["dojo.data.api.Identity"];
return B
},newItem:function(K,B){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof K!="object"&&typeof K!="undefined"){throw new Error("newItem() was passed something other than an object")
}var F=null;
var C=this._getIdentifierAttribute();
if(C===Number){F=this._arrayOfAllItems.length
}else{F=K[C];
if(typeof F==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(A.isArray(F)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[F]==="undefined")
}this._assert(typeof this._pending._newItems[F]==="undefined");
this._assert(typeof this._pending._deletedItems[F]==="undefined");
var D={};
D[this._storeRefPropName]=this;
D[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[F]=D
}this._arrayOfAllItems.push(D);
var H=null;
if(B&&B.parent&&B.attribute){H={item:B.parent,attribute:B.attribute,oldValue:undefined};
var J=this.getValues(B.parent,B.attribute);
if(J&&J.length>0){var E=J.slice(0,J.length);
if(J.length===1){H.oldValue=J[0]
}else{H.oldValue=J.slice(0,J.length)
}E.push(D);
this._setValueOrValues(B.parent,B.attribute,E,false);
H.newValue=this.getValues(B.parent,B.attribute)
}else{this._setValueOrValues(B.parent,B.attribute,D,false);
H.newValue=D
}}else{D[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(D)
}this._pending._newItems[F]=D;
for(var I in K){if(I===this._storeRefPropName||I===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var G=K[I];
if(!A.isArray(G)){G=[G]
}D[I]=G
}this.onNew(D,H);
return D
},_removeArrayElement:function(D,C){var B=A.indexOf(D,C);
if(B!=-1){D.splice(B,1);
return true
}return false
},deleteItem:function(C){this._assert(!this._saveInProgress);
this._assertIsItem(C);
var D=C[this._itemNumPropName];
this._arrayOfAllItems[D]=null;
var B=this.getIdentity(C);
C[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[B]
}this._pending._deletedItems[B]=C;
if(C[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,C)
}this.onDelete(C);
return true
},setValue:function(C,B,D){return this._setValueOrValues(C,B,D,true)
},setValues:function(D,C,B){return this._setValueOrValues(D,C,B,true)
},unsetAttribute:function(C,B){return this._setValueOrValues(C,B,[],true)
},_setValueOrValues:function(Q,D,K,G){this._assert(!this._saveInProgress);
this._assertIsItem(Q);
this._assert(A.isString(D));
this._assert(typeof K!=="undefined");
var I=this._getIdentifierAttribute();
if(D==I){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var H=this._getValueOrValues(Q,D);
var L=this.getIdentity(Q);
if(!this._pending._modifiedItems[L]){var B={};
for(var O in Q){if((O===this._storeRefPropName)||(O===this._itemNumPropName)||(O===this._rootItemPropName)){B[O]=Q[O]
}else{var N=Q[O];
var J=[];
for(var F=0;
F<N.length;
++F){J.push(N[F])
}B[O]=J
}}this._pending._modifiedItems[L]=B
}var P=false;
if(A.isArray(K)&&K.length===0){P=delete Q[D];
K=undefined
}else{var M=[];
if(A.isArray(K)){var R=K;
for(var E=0;
E<R.length;
++E){M.push(R[E])
}}else{var C=K;
M.push(C)
}Q[D]=M;
P=true
}if(G){this.onSet(Q,D,H,K)
}return P
},_getValueOrValues:function(E,D){var B=undefined;
if(this.hasAttribute(E,D)){var C=this.getValues(E,D);
if(C.length==1){B=C[0]
}else{B=C
}}return B
},_flatten:function(E){if(this.isItem(E)){var D=E;
var B=this.getIdentity(D);
var C={_reference:B};
return C
}else{if(typeof E==="object"){for(type in this._datatypeMap){var F=this._datatypeMap[type];
if(A.isObject(F)&&!A.isFunction(F)){if(E instanceof F.type){if(!F.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:F.serialize(E)}
}}else{if(E instanceof F){return{_type:type,_value:E.toString()}
}}}}return E
}},_getNewFileContentString:function(){var K={};
var F=this._getIdentifierAttribute();
if(F!==Number){K.identifier=F
}if(this._labelAttr){K.label=this._labelAttr
}K.items=[];
for(var E=0;
E<this._arrayOfAllItems.length;
++E){var J=this._arrayOfAllItems[E];
if(J!==null){serializableItem={};
for(var I in J){if(I!==this._storeRefPropName&&I!==this._itemNumPropName){var B=I;
var H=this.getValues(J,B);
if(H.length==1){serializableItem[B]=this._flatten(H[0])
}else{var G=[];
for(var D=0;
D<H.length;
++D){G.push(this._flatten(H[D]));
serializableItem[B]=G
}}}}K.items.push(serializableItem)
}}var C=true;
return A.toJson(K,C)
},save:function(C){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var B=this;
var E=function(){B._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
B._saveInProgress=false;
if(C&&C.onComplete){var G=C.scope||A.global;
C.onComplete.call(G)
}};
var F=function(){B._saveInProgress=false;
if(C&&C.onError){var G=C.scope||A.global;
C.onError.call(G)
}};
if(this._saveEverything){var D=this._getNewFileContentString();
this._saveEverything(E,F,D)
}if(this._saveCustom){this._saveCustom(E,F)
}if(!this._saveEverything&&!this._saveCustom){E()
}},revert:function(){this._assert(!this._saveInProgress);
var D;
for(D in this._pending._newItems){var F=this._pending._newItems[D];
F[this._storeRefPropName]=null;
this._arrayOfAllItems[F[this._itemNumPropName]]=null;
if(F[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,F)
}if(this._itemsByIdentity){delete this._itemsByIdentity[D]
}}for(D in this._pending._modifiedItems){var H=this._pending._modifiedItems[D];
var G=null;
if(this._itemsByIdentity){G=this._itemsByIdentity[D]
}else{G=this._arrayOfAllItems[D]
}H[this._storeRefPropName]=this;
G[this._storeRefPropName]=null;
var C=G[this._itemNumPropName];
this._arrayOfAllItems[C]=H;
if(G[this._rootItemPropName]){C=G[this._itemNumPropName];
this._arrayOfTopLevelItems[C]=H
}if(this._itemsByIdentity){this._itemsByIdentity[D]=H
}}for(D in this._pending._deletedItems){var B=this._pending._deletedItems[D];
B[this._storeRefPropName]=this;
var E=B[this._itemNumPropName];
this._arrayOfAllItems[E]=B;
if(this._itemsByIdentity){this._itemsByIdentity[D]=B
}if(B[this._rootItemPropName]){this._arrayOfTopLevelItems.push(B)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(D){if(D){var B=this.getIdentity(D);
return new Boolean(this._pending._newItems[B]||this._pending._modifiedItems[B]||this._pending._deletedItems[B])
}else{var C;
for(C in this._pending._newItems){return true
}for(C in this._pending._modifiedItems){return true
}for(C in this._pending._deletedItems){return true
}return false
}},onSet:function(D,C,B,E){},onNew:function(C,B){},onDelete:function(B){}})
}}});