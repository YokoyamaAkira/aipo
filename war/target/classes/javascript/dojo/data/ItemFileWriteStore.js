if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.require("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(A){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(B){return dojo.date.stamp.toISOString(B,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(A){if(!A){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var A=this.getFeatures()["dojo.data.api.Identity"];
return A
},newItem:function(J,A){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof J!="object"&&typeof J!="undefined"){throw new Error("newItem() was passed something other than an object")
}var E=null;
var B=this._getIdentifierAttribute();
if(B===Number){E=this._arrayOfAllItems.length
}else{E=J[B];
if(typeof E==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(E)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[E]==="undefined")
}this._assert(typeof this._pending._newItems[E]==="undefined");
this._assert(typeof this._pending._deletedItems[E]==="undefined");
var C={};
C[this._storeRefPropName]=this;
C[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[E]=C
}this._arrayOfAllItems.push(C);
var G=null;
if(A&&A.parent&&A.attribute){G={item:A.parent,attribute:A.attribute,oldValue:undefined};
var I=this.getValues(A.parent,A.attribute);
if(I&&I.length>0){var D=I.slice(0,I.length);
if(I.length===1){G.oldValue=I[0]
}else{G.oldValue=I.slice(0,I.length)
}D.push(C);
this._setValueOrValues(A.parent,A.attribute,D,false);
G.newValue=this.getValues(A.parent,A.attribute)
}else{this._setValueOrValues(A.parent,A.attribute,C,false);
G.newValue=C
}}else{C[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(C)
}this._pending._newItems[E]=C;
for(var H in J){if(H===this._storeRefPropName||H===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var F=J[H];
if(!dojo.isArray(F)){F=[F]
}C[H]=F
}this.onNew(C,G);
return C
},_removeArrayElement:function(C,B){var A=dojo.indexOf(C,B);
if(A!=-1){C.splice(A,1);
return true
}return false
},deleteItem:function(B){this._assert(!this._saveInProgress);
this._assertIsItem(B);
var C=B[this._itemNumPropName];
this._arrayOfAllItems[C]=null;
var A=this.getIdentity(B);
B[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[A]
}this._pending._deletedItems[A]=B;
if(B[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,B)
}this.onDelete(B);
return true
},setValue:function(B,A,C){return this._setValueOrValues(B,A,C,true)
},setValues:function(C,B,A){return this._setValueOrValues(C,B,A,true)
},unsetAttribute:function(B,A){return this._setValueOrValues(B,A,[],true)
},_setValueOrValues:function(P,C,J,F){this._assert(!this._saveInProgress);
this._assertIsItem(P);
this._assert(dojo.isString(C));
this._assert(typeof J!=="undefined");
var H=this._getIdentifierAttribute();
if(C==H){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var G=this._getValueOrValues(P,C);
var K=this.getIdentity(P);
if(!this._pending._modifiedItems[K]){var A={};
for(var N in P){if((N===this._storeRefPropName)||(N===this._itemNumPropName)||(N===this._rootItemPropName)){A[N]=P[N]
}else{var M=P[N];
var I=[];
for(var E=0;
E<M.length;
++E){I.push(M[E])
}A[N]=I
}}this._pending._modifiedItems[K]=A
}var O=false;
if(dojo.isArray(J)&&J.length===0){O=delete P[C];
J=undefined
}else{var L=[];
if(dojo.isArray(J)){var Q=J;
for(var D=0;
D<Q.length;
++D){L.push(Q[D])
}}else{var B=J;
L.push(B)
}P[C]=L;
O=true
}if(F){this.onSet(P,C,G,J)
}return O
},_getValueOrValues:function(D,C){var A=undefined;
if(this.hasAttribute(D,C)){var B=this.getValues(D,C);
if(B.length==1){A=B[0]
}else{A=B
}}return A
},_flatten:function(D){if(this.isItem(D)){var C=D;
var A=this.getIdentity(C);
var B={_reference:A};
return B
}else{if(typeof D==="object"){for(type in this._datatypeMap){var E=this._datatypeMap[type];
if(dojo.isObject(E)&&!dojo.isFunction(E)){if(D instanceof E.type){if(!E.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:E.serialize(D)}
}}else{if(D instanceof E){return{_type:type,_value:D.toString()}
}}}}return D
}},_getNewFileContentString:function(){var J={};
var E=this._getIdentifierAttribute();
if(E!==Number){J.identifier=E
}if(this._labelAttr){J.label=this._labelAttr
}J.items=[];
for(var D=0;
D<this._arrayOfAllItems.length;
++D){var I=this._arrayOfAllItems[D];
if(I!==null){serializableItem={};
for(var H in I){if(H!==this._storeRefPropName&&H!==this._itemNumPropName){var A=H;
var G=this.getValues(I,A);
if(G.length==1){serializableItem[A]=this._flatten(G[0])
}else{var F=[];
for(var C=0;
C<G.length;
++C){F.push(this._flatten(G[C]));
serializableItem[A]=F
}}}}J.items.push(serializableItem)
}}var B=true;
return dojo.toJson(J,B)
},save:function(B){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var A=this;
var D=function(){A._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
A._saveInProgress=false;
if(B&&B.onComplete){var F=B.scope||dojo.global;
B.onComplete.call(F)
}};
var E=function(){A._saveInProgress=false;
if(B&&B.onError){var F=B.scope||dojo.global;
B.onError.call(F)
}};
if(this._saveEverything){var C=this._getNewFileContentString();
this._saveEverything(D,E,C)
}if(this._saveCustom){this._saveCustom(D,E)
}if(!this._saveEverything&&!this._saveCustom){D()
}},revert:function(){this._assert(!this._saveInProgress);
var C;
for(C in this._pending._newItems){var E=this._pending._newItems[C];
E[this._storeRefPropName]=null;
this._arrayOfAllItems[E[this._itemNumPropName]]=null;
if(E[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,E)
}if(this._itemsByIdentity){delete this._itemsByIdentity[C]
}}for(C in this._pending._modifiedItems){var G=this._pending._modifiedItems[C];
var F=null;
if(this._itemsByIdentity){F=this._itemsByIdentity[C]
}else{F=this._arrayOfAllItems[C]
}G[this._storeRefPropName]=this;
F[this._storeRefPropName]=null;
var B=F[this._itemNumPropName];
this._arrayOfAllItems[B]=G;
if(F[this._rootItemPropName]){B=F[this._itemNumPropName];
this._arrayOfTopLevelItems[B]=G
}if(this._itemsByIdentity){this._itemsByIdentity[C]=G
}}for(C in this._pending._deletedItems){var A=this._pending._deletedItems[C];
A[this._storeRefPropName]=this;
var D=A[this._itemNumPropName];
this._arrayOfAllItems[D]=A;
if(this._itemsByIdentity){this._itemsByIdentity[C]=A
}if(A[this._rootItemPropName]){this._arrayOfTopLevelItems.push(A)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(C){if(C){var A=this.getIdentity(C);
return new Boolean(this._pending._newItems[A]||this._pending._modifiedItems[A]||this._pending._deletedItems[A])
}else{var B;
for(B in this._pending._newItems){return true
}for(B in this._pending._modifiedItems){return true
}for(B in this._pending._deletedItems){return true
}return false
}},onSet:function(C,B,A,D){},onNew:function(B,A){},onDelete:function(A){}})
};