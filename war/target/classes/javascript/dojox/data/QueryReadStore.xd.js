dojo._xdResourceLoaded({depends:[["provide","dojox.data.QueryReadStore"],["provide","dojox.data.QueryReadStore.InvalidItemError"],["provide","dojox.data.QueryReadStore.InvalidAttributeError"],["require","dojo.string"],["require","dojo.data.util.simpleFetch"]],defineResource:function(A){if(!A._hasResource["dojox.data.QueryReadStore"]){A._hasResource["dojox.data.QueryReadStore"]=true;
A.provide("dojox.data.QueryReadStore");
A.provide("dojox.data.QueryReadStore.InvalidItemError");
A.provide("dojox.data.QueryReadStore.InvalidAttributeError");
A.require("dojo.string");
A.require("dojo.data.util.simpleFetch");
A.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,lastRequestHash:null,doClientPaging:true,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},constructor:function(B){A.mixin(this,B)
},getValue:function(B,D,C){this._assertIsItem(B);
if(!A.isString(D)){throw new Error(this._className+".getValue(): Invalid attribute, string expected!")
}if(!this.hasAttribute(B,D)){if(C){return C
}console.log(this._className+".getValue(): Item does not have the attribute '"+D+"'.")
}return B.i[D]
},getValues:function(B,D){var C=[];
if(this.hasAttribute(B,D)){C.push(B.i[D])
}return C
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var D in B.i){C.push(D)
}return C
},hasAttribute:function(B,C){return this.isItem(B)&&typeof B.i[C]!="undefined"
},containsValue:function(G,F,C){var D=this.getValues(G,F);
var B=D.length;
for(var E=0;
E<B;
E++){if(D[E]==C){return true
}}return false
},isItem:function(B){if(B){return typeof B.r!="undefined"&&B.r==this
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){if(this.isItemLoaded(B.item)){return 
}},fetch:function(B){B=B||{};
if(!B.store){B.store=this
}var D=this;
var E=function(H,F){if(F.onError){var G=F.scope||A.global;
F.onError.call(G,H,F)
}};
var C=function(L,M){var F=M.abort||null;
var H=false;
var N=M.start?M.start:0;
if(D.doClientPaging==false){N=0
}var K=M.count?(N+M.count):L.length;
M.abort=function(){H=true;
if(F){F.call(M)
}};
var G=M.scope||A.global;
if(!M.store){M.store=D
}if(M.onBegin){M.onBegin.call(G,L.length,M)
}if(M.sort){L.sort(A.data.util.sorter.createSortFunction(M.sort,D))
}if(M.onItem){for(var J=N;
(J<L.length)&&(J<K);
++J){var O=L[J];
if(!H){M.onItem.call(G,O,M)
}}}if(M.onComplete&&!H){var I=null;
if(!M.onItem){I=L.slice(N,K)
}M.onComplete.call(G,I,M)
}};
this._fetchItems(B,C,E);
return B
},getFeatures:function(){return this._features
},close:function(B){},getLabel:function(B){return undefined
},getLabelAttributes:function(B){return null
},_fetchItems:function(F,C,E){var D=F.serverQuery||F.query||{};
if(!this.doClientPaging){D.start=F.start||0;
if(F.count){D.count=F.count
}}if(this.doClientPaging&&this._lastServerQuery!==null&&A.toJson(D)==A.toJson(this._lastServerQuery)){C(this._items,F)
}else{var B=this.requestMethod.toLowerCase()=="post"?A.xhrPost:A.xhrGet;
var G=B({url:this.url,handleAs:"json-comment-optional",content:D});
G.addCallback(A.hitch(this,function(K){K=this._filterResponse(K);
this._items=[];
A.forEach(K.items,function(L){this._items.push({i:L,r:this})
},this);
var I=K.identifier;
this._itemsByIdentity={};
if(I){this._identifier=I;
for(i=0;
i<this._items.length;
++i){var J=this._items[i].i;
var H=J[I];
if(!this._itemsByIdentity[H]){this._itemsByIdentity[H]=J
}else{throw new Error("dojo.data.QueryReadStore:  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+I+"].  Value collided: ["+H+"]")
}}}else{this._identifier=Number;
for(i=0;
i<this._items.length;
++i){this._items[i].n=i
}}C(this._items,F)
}));
G.addErrback(function(H){E(H,F)
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=A.mixin({},D)
}},_filterResponse:function(B){return B
},_assertIsItem:function(B){if(!this.isItem(B)){throw new dojox.data.QueryReadStore.InvalidItemError(this._className+": a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new dojox.data.QueryReadStore.InvalidAttributeError(this._className+": '"+B+"' is not a valid attribute identifier.")
}},fetchItemByIdentity:function(D){if(this._itemsByIdentity){var C=this._itemsByIdentity[D.identity];
if(!(C===undefined)){if(D.onItem){var F=D.scope?D.scope:A.global;
D.onItem.call(F,{i:C,r:this})
}return 
}}var E=function(J,H){var I=D.scope?D.scope:A.global;
if(D.onError){D.onError.call(I,error)
}};
var B=function(I,H){var K=D.scope?D.scope:A.global;
try{var L=null;
if(I&&I.length==1){L=I[0]
}if(D.onItem){D.onItem.call(K,L)
}}catch(J){if(D.onError){D.onError.call(K,J)
}}};
var G={serverQuery:{id:D.identity}};
this._fetchItems(G,B,E)
},getIdentity:function(B){var C=null;
if(this._identifier===Number){C=B.n
}else{C=B.i[this._identifier]
}return C
},getIdentityAttributes:function(B){return[this._identifier]
}});
A.declare("dojox.data.QueryReadStore.InvalidItemError",Error,{});
A.declare("dojox.data.QueryReadStore.InvalidAttributeError",Error,{})
}}});