dojo._xdResourceLoaded({depends:[["provide","dojox.data.QueryReadStore"],["provide","dojox.data.QueryReadStore.InvalidItemError"],["provide","dojox.data.QueryReadStore.InvalidAttributeError"],["require","dojo.string"],["require","dojo.data.util.simpleFetch"]],defineResource:function(A){if(!A._hasResource["dojox.data.QueryReadStore"]){A._hasResource["dojox.data.QueryReadStore"]=true;
A.provide("dojox.data.QueryReadStore");
A.provide("dojox.data.QueryReadStore.InvalidItemError");
A.provide("dojox.data.QueryReadStore.InvalidAttributeError");
A.require("dojo.string");
A.require("dojo.data.util.simpleFetch");
A.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,lastRequestHash:null,doClientPaging:true,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},constructor:function(B){A.mixin(this,B)
},getValue:function(D,C,B){this._assertIsItem(D);
if(!A.isString(C)){throw new Error(this._className+".getValue(): Invalid attribute, string expected!")
}if(!this.hasAttribute(D,C)){if(B){return B
}console.log(this._className+".getValue(): Item does not have the attribute '"+C+"'.")
}return D.i[C]
},getValues:function(D,C){var B=[];
if(this.hasAttribute(D,C)){B.push(D.i[C])
}return B
},getAttributes:function(D){this._assertIsItem(D);
var B=[];
for(var C in D.i){B.push(C)
}return B
},hasAttribute:function(C,B){return this.isItem(C)&&typeof C.i[B]!="undefined"
},containsValue:function(F,E,G){var C=this.getValues(F,E);
var B=C.length;
for(var D=0;
D<B;
D++){if(C[D]==G){return true
}}return false
},isItem:function(B){if(B){return typeof B.r!="undefined"&&B.r==this
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){if(this.isItemLoaded(B.item)){return 
}},fetch:function(E){E=E||{};
if(!E.store){E.store=this
}var C=this;
var D=function(H,F){if(F.onError){var G=F.scope||A.global;
F.onError.call(G,H,F)
}};
var B=function(J,K){var N=K.abort||null;
var F=false;
var L=K.start?K.start:0;
if(C.doClientPaging==false){L=0
}var I=K.count?(L+K.count):J.length;
K.abort=function(){F=true;
if(N){N.call(K)
}};
var O=K.scope||A.global;
if(!K.store){K.store=C
}if(K.onBegin){K.onBegin.call(O,J.length,K)
}if(K.sort){J.sort(A.data.util.sorter.createSortFunction(K.sort,C))
}if(K.onItem){for(var H=L;
(H<J.length)&&(H<I);
++H){var M=J[H];
if(!F){K.onItem.call(O,M,K)
}}}if(K.onComplete&&!F){var G=null;
if(!K.onItem){G=J.slice(L,I)
}K.onComplete.call(O,G,K)
}};
this._fetchItems(E,B,D);
return E
},getFeatures:function(){return this._features
},close:function(B){},getLabel:function(B){return undefined
},getLabelAttributes:function(B){return null
},_fetchItems:function(E,G,D){var C=E.serverQuery||E.query||{};
if(!this.doClientPaging){C.start=E.start||0;
if(E.count){C.count=E.count
}}if(this.doClientPaging&&this._lastServerQuery!==null&&A.toJson(C)==A.toJson(this._lastServerQuery)){G(this._items,E)
}else{var B=this.requestMethod.toLowerCase()=="post"?A.xhrPost:A.xhrGet;
var F=B({url:this.url,handleAs:"json-comment-optional",content:C});
F.addCallback(A.hitch(this,function(K){K=this._filterResponse(K);
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
}}G(this._items,E)
}));
F.addErrback(function(H){D(H,E)
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=A.mixin({},C)
}},_filterResponse:function(B){return B
},_assertIsItem:function(B){if(!this.isItem(B)){throw new dojox.data.QueryReadStore.InvalidItemError(this._className+": a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new dojox.data.QueryReadStore.InvalidAttributeError(this._className+": '"+B+"' is not a valid attribute identifier.")
}},fetchItemByIdentity:function(C){if(this._itemsByIdentity){var G=this._itemsByIdentity[C.identity];
if(!(G===undefined)){if(C.onItem){var E=C.scope?C.scope:A.global;
C.onItem.call(E,{i:G,r:this})
}return 
}}var D=function(J,H){var I=C.scope?C.scope:A.global;
if(C.onError){C.onError.call(I,error)
}};
var B=function(I,H){var K=C.scope?C.scope:A.global;
try{var L=null;
if(I&&I.length==1){L=I[0]
}if(C.onItem){C.onItem.call(K,L)
}}catch(J){if(C.onError){C.onError.call(K,J)
}}};
var F={serverQuery:{id:C.identity}};
this._fetchItems(F,B,D)
},getIdentity:function(C){var B=null;
if(this._identifier===Number){B=C.n
}else{B=C.i[this._identifier]
}return B
},getIdentityAttributes:function(B){return[this._identifier]
}});
A.declare("dojox.data.QueryReadStore.InvalidItemError",Error,{});
A.declare("dojox.data.QueryReadStore.InvalidAttributeError",Error,{})
}}});