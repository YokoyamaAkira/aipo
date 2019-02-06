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
},newItem:function(I,J){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof I!="object"&&typeof I!="undefined"){throw new Error("newItem() was passed something other than an object")
}var D=null;
var K=this._getIdentifierAttribute();
if(K===Number){D=this._arrayOfAllItems.length
}else{D=I[K];
if(typeof D==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(A.isArray(D)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[D]==="undefined")
}this._assert(typeof this._pending._newItems[D]==="undefined");
this._assert(typeof this._pending._deletedItems[D]==="undefined");
var B={};
B[this._storeRefPropName]=this;
B[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[D]=B
}this._arrayOfAllItems.push(B);
var F=null;
if(J&&J.parent&&J.attribute){F={item:J.parent,attribute:J.attribute,oldValue:undefined};
var H=this.getValues(J.parent,J.attribute);
if(H&&H.length>0){var C=H.slice(0,H.length);
if(H.length===1){F.oldValue=H[0]
}else{F.oldValue=H.slice(0,H.length)
}C.push(B);
this._setValueOrValues(J.parent,J.attribute,C,false);
F.newValue=this.getValues(J.parent,J.attribute)
}else{this._setValueOrValues(J.parent,J.attribute,B,false);
F.newValue=B
}}else{B[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(B)
}this._pending._newItems[D]=B;
for(var G in I){if(G===this._storeRefPropName||G===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var E=I[G];
if(!A.isArray(E)){E=[E]
}B[G]=E
}this.onNew(B,F);
return B
},_removeArrayElement:function(B,D){var C=A.indexOf(B,D);
if(C!=-1){B.splice(C,1);
return true
}return false
},deleteItem:function(D){this._assert(!this._saveInProgress);
this._assertIsItem(D);
var B=D[this._itemNumPropName];
this._arrayOfAllItems[B]=null;
var C=this.getIdentity(D);
D[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[C]
}this._pending._deletedItems[C]=D;
if(D[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,D)
}this.onDelete(D);
return true
},setValue:function(D,C,B){return this._setValueOrValues(D,C,B,true)
},setValues:function(B,D,C){return this._setValueOrValues(B,D,C,true)
},unsetAttribute:function(B,C){return this._setValueOrValues(B,C,[],true)
},_setValueOrValues:function(G,E,Q,M){this._assert(!this._saveInProgress);
this._assertIsItem(G);
this._assert(A.isString(E));
this._assert(typeof Q!=="undefined");
var O=this._getIdentifierAttribute();
if(E==O){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var N=this._getValueOrValues(G,E);
var R=this.getIdentity(G);
if(!this._pending._modifiedItems[R]){var I={};
for(var D in G){if((D===this._storeRefPropName)||(D===this._itemNumPropName)||(D===this._rootItemPropName)){I[D]=G[D]
}else{var C=G[D];
var P=[];
for(var L=0;
L<C.length;
++L){P.push(C[L])
}I[D]=P
}}this._pending._modifiedItems[R]=I
}var F=false;
if(A.isArray(Q)&&Q.length===0){F=delete G[E];
Q=undefined
}else{var B=[];
if(A.isArray(Q)){var H=Q;
for(var K=0;
K<H.length;
++K){B.push(H[K])
}}else{var J=Q;
B.push(J)
}G[E]=B;
F=true
}if(M){this.onSet(G,E,N,Q)
}return F
},_getValueOrValues:function(B,E){var C=undefined;
if(this.hasAttribute(B,E)){var D=this.getValues(B,E);
if(D.length==1){C=D[0]
}else{C=D
}}return C
},_flatten:function(F){if(this.isItem(F)){var E=F;
var C=this.getIdentity(E);
var D={_reference:C};
return D
}else{if(typeof F==="object"){for(type in this._datatypeMap){var B=this._datatypeMap[type];
if(A.isObject(B)&&!A.isFunction(B)){if(F instanceof B.type){if(!B.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:B.serialize(F)}
}}else{if(F instanceof B){return{_type:type,_value:F.toString()}
}}}}return F
}},_getNewFileContentString:function(){var I={};
var D=this._getIdentifierAttribute();
if(D!==Number){I.identifier=D
}if(this._labelAttr){I.label=this._labelAttr
}I.items=[];
for(var C=0;
C<this._arrayOfAllItems.length;
++C){var H=this._arrayOfAllItems[C];
if(H!==null){serializableItem={};
for(var G in H){if(G!==this._storeRefPropName&&G!==this._itemNumPropName){var J=G;
var F=this.getValues(H,J);
if(F.length==1){serializableItem[J]=this._flatten(F[0])
}else{var E=[];
for(var B=0;
B<F.length;
++B){E.push(this._flatten(F[B]));
serializableItem[J]=E
}}}}I.items.push(serializableItem)
}}var K=true;
return A.toJson(I,K)
},save:function(D){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var C=this;
var F=function(){C._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
C._saveInProgress=false;
if(D&&D.onComplete){var G=D.scope||A.global;
D.onComplete.call(G)
}};
var B=function(){C._saveInProgress=false;
if(D&&D.onError){var G=D.scope||A.global;
D.onError.call(G)
}};
if(this._saveEverything){var E=this._getNewFileContentString();
this._saveEverything(F,B,E)
}if(this._saveCustom){this._saveCustom(F,B)
}if(!this._saveEverything&&!this._saveCustom){F()
}},revert:function(){this._assert(!this._saveInProgress);
var C;
for(C in this._pending._newItems){var E=this._pending._newItems[C];
E[this._storeRefPropName]=null;
this._arrayOfAllItems[E[this._itemNumPropName]]=null;
if(E[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,E)
}if(this._itemsByIdentity){delete this._itemsByIdentity[C]
}}for(C in this._pending._modifiedItems){var B=this._pending._modifiedItems[C];
var F=null;
if(this._itemsByIdentity){F=this._itemsByIdentity[C]
}else{F=this._arrayOfAllItems[C]
}B[this._storeRefPropName]=this;
F[this._storeRefPropName]=null;
var H=F[this._itemNumPropName];
this._arrayOfAllItems[H]=B;
if(F[this._rootItemPropName]){H=F[this._itemNumPropName];
this._arrayOfTopLevelItems[H]=B
}if(this._itemsByIdentity){this._itemsByIdentity[C]=B
}}for(C in this._pending._deletedItems){var G=this._pending._deletedItems[C];
G[this._storeRefPropName]=this;
var D=G[this._itemNumPropName];
this._arrayOfAllItems[D]=G;
if(this._itemsByIdentity){this._itemsByIdentity[C]=G
}if(G[this._rootItemPropName]){this._arrayOfTopLevelItems.push(G)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(B){if(B){var C=this.getIdentity(B);
return new Boolean(this._pending._newItems[C]||this._pending._modifiedItems[C]||this._pending._deletedItems[C])
}else{var D;
for(D in this._pending._newItems){return true
}for(D in this._pending._modifiedItems){return true
}for(D in this._pending._deletedItems){return true
}return false
}},onSet:function(E,D,C,B){},onNew:function(B,C){},onDelete:function(B){}})
}}});