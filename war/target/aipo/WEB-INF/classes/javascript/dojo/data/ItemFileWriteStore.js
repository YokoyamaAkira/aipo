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
},newItem:function(F,G){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof F!="object"&&typeof F!="undefined"){throw new Error("newItem() was passed something other than an object")
}var A=null;
var H=this._getIdentifierAttribute();
if(H===Number){A=this._arrayOfAllItems.length
}else{A=F[H];
if(typeof A==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(A)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[A]==="undefined")
}this._assert(typeof this._pending._newItems[A]==="undefined");
this._assert(typeof this._pending._deletedItems[A]==="undefined");
var I={};
I[this._storeRefPropName]=this;
I[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[A]=I
}this._arrayOfAllItems.push(I);
var C=null;
if(G&&G.parent&&G.attribute){C={item:G.parent,attribute:G.attribute,oldValue:undefined};
var E=this.getValues(G.parent,G.attribute);
if(E&&E.length>0){var J=E.slice(0,E.length);
if(E.length===1){C.oldValue=E[0]
}else{C.oldValue=E.slice(0,E.length)
}J.push(I);
this._setValueOrValues(G.parent,G.attribute,J,false);
C.newValue=this.getValues(G.parent,G.attribute)
}else{this._setValueOrValues(G.parent,G.attribute,I,false);
C.newValue=I
}}else{I[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(I)
}this._pending._newItems[A]=I;
for(var D in F){if(D===this._storeRefPropName||D===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var B=F[D];
if(!dojo.isArray(B)){B=[B]
}I[D]=B
}this.onNew(I,C);
return I
},_removeArrayElement:function(B,A){var C=dojo.indexOf(B,A);
if(C!=-1){B.splice(C,1);
return true
}return false
},deleteItem:function(A){this._assert(!this._saveInProgress);
this._assertIsItem(A);
var B=A[this._itemNumPropName];
this._arrayOfAllItems[B]=null;
var C=this.getIdentity(A);
A[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[C]
}this._pending._deletedItems[C]=A;
if(A[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,A)
}this.onDelete(A);
return true
},setValue:function(A,C,B){return this._setValueOrValues(A,C,B,true)
},setValues:function(B,A,C){return this._setValueOrValues(B,A,C,true)
},unsetAttribute:function(A,B){return this._setValueOrValues(A,B,[],true)
},_setValueOrValues:function(D,H,O,K){this._assert(!this._saveInProgress);
this._assertIsItem(D);
this._assert(dojo.isString(H));
this._assert(typeof O!=="undefined");
var M=this._getIdentifierAttribute();
if(H==M){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var L=this._getValueOrValues(D,H);
var P=this.getIdentity(D);
if(!this._pending._modifiedItems[P]){var F={};
for(var B in D){if((B===this._storeRefPropName)||(B===this._itemNumPropName)||(B===this._rootItemPropName)){F[B]=D[B]
}else{var A=D[B];
var N=[];
for(var J=0;
J<A.length;
++J){N.push(A[J])
}F[B]=N
}}this._pending._modifiedItems[P]=F
}var C=false;
if(dojo.isArray(O)&&O.length===0){C=delete D[H];
O=undefined
}else{var Q=[];
if(dojo.isArray(O)){var E=O;
for(var I=0;
I<E.length;
++I){Q.push(E[I])
}}else{var G=O;
Q.push(G)
}D[H]=Q;
C=true
}if(K){this.onSet(D,H,L,O)
}return C
},_getValueOrValues:function(C,B){var D=undefined;
if(this.hasAttribute(C,B)){var A=this.getValues(C,B);
if(A.length==1){D=A[0]
}else{D=A
}}return D
},_flatten:function(C){if(this.isItem(C)){var B=C;
var E=this.getIdentity(B);
var A={_reference:E};
return A
}else{if(typeof C==="object"){for(type in this._datatypeMap){var D=this._datatypeMap[type];
if(dojo.isObject(D)&&!dojo.isFunction(D)){if(C instanceof D.type){if(!D.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:D.serialize(C)}
}}else{if(C instanceof D){return{_type:type,_value:C.toString()}
}}}}return C
}},_getNewFileContentString:function(){var F={};
var A=this._getIdentifierAttribute();
if(A!==Number){F.identifier=A
}if(this._labelAttr){F.label=this._labelAttr
}F.items=[];
for(var J=0;
J<this._arrayOfAllItems.length;
++J){var E=this._arrayOfAllItems[J];
if(E!==null){serializableItem={};
for(var D in E){if(D!==this._storeRefPropName&&D!==this._itemNumPropName){var G=D;
var C=this.getValues(E,G);
if(C.length==1){serializableItem[G]=this._flatten(C[0])
}else{var B=[];
for(var I=0;
I<C.length;
++I){B.push(this._flatten(C[I]));
serializableItem[G]=B
}}}}F.items.push(serializableItem)
}}var H=true;
return dojo.toJson(F,H)
},save:function(A){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var E=this;
var C=function(){E._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
E._saveInProgress=false;
if(A&&A.onComplete){var F=A.scope||dojo.global;
A.onComplete.call(F)
}};
var D=function(){E._saveInProgress=false;
if(A&&A.onError){var F=A.scope||dojo.global;
A.onError.call(F)
}};
if(this._saveEverything){var B=this._getNewFileContentString();
this._saveEverything(C,D,B)
}if(this._saveCustom){this._saveCustom(C,D)
}if(!this._saveEverything&&!this._saveCustom){C()
}},revert:function(){this._assert(!this._saveInProgress);
var G;
for(G in this._pending._newItems){var B=this._pending._newItems[G];
B[this._storeRefPropName]=null;
this._arrayOfAllItems[B[this._itemNumPropName]]=null;
if(B[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,B)
}if(this._itemsByIdentity){delete this._itemsByIdentity[G]
}}for(G in this._pending._modifiedItems){var D=this._pending._modifiedItems[G];
var C=null;
if(this._itemsByIdentity){C=this._itemsByIdentity[G]
}else{C=this._arrayOfAllItems[G]
}D[this._storeRefPropName]=this;
C[this._storeRefPropName]=null;
var F=C[this._itemNumPropName];
this._arrayOfAllItems[F]=D;
if(C[this._rootItemPropName]){F=C[this._itemNumPropName];
this._arrayOfTopLevelItems[F]=D
}if(this._itemsByIdentity){this._itemsByIdentity[G]=D
}}for(G in this._pending._deletedItems){var E=this._pending._deletedItems[G];
E[this._storeRefPropName]=this;
var A=E[this._itemNumPropName];
this._arrayOfAllItems[A]=E;
if(this._itemsByIdentity){this._itemsByIdentity[G]=E
}if(E[this._rootItemPropName]){this._arrayOfTopLevelItems.push(E)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(B){if(B){var C=this.getIdentity(B);
return new Boolean(this._pending._newItems[C]||this._pending._modifiedItems[C]||this._pending._deletedItems[C])
}else{var A;
for(A in this._pending._newItems){return true
}for(A in this._pending._modifiedItems){return true
}for(A in this._pending._deletedItems){return true
}return false
}},onSet:function(B,A,D,C){},onNew:function(A,B){},onDelete:function(A){}})
};