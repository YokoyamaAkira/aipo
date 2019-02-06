if(!dojo._hasResource["dojox.data.QueryReadStore"]){dojo._hasResource["dojox.data.QueryReadStore"]=true;
dojo.provide("dojox.data.QueryReadStore");
dojo.provide("dojox.data.QueryReadStore.InvalidItemError");
dojo.provide("dojox.data.QueryReadStore.InvalidAttributeError");
dojo.require("dojo.string");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,lastRequestHash:null,doClientPaging:true,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},constructor:function(A){dojo.mixin(this,A)
},getValue:function(B,A,C){this._assertIsItem(B);
if(!dojo.isString(A)){throw new Error(this._className+".getValue(): Invalid attribute, string expected!")
}if(!this.hasAttribute(B,A)){if(C){return C
}console.log(this._className+".getValue(): Item does not have the attribute '"+A+"'.")
}return B.i[A]
},getValues:function(B,A){var C=[];
if(this.hasAttribute(B,A)){C.push(B.i[A])
}return C
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var A in B.i){C.push(A)
}return C
},hasAttribute:function(A,B){return this.isItem(A)&&typeof A.i[B]!="undefined"
},containsValue:function(D,C,E){var A=this.getValues(D,C);
var F=A.length;
for(var B=0;
B<F;
B++){if(A[B]==E){return true
}}return false
},isItem:function(A){if(A){return typeof A.r!="undefined"&&A.r==this
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){if(this.isItemLoaded(A.item)){return 
}},fetch:function(C){C=C||{};
if(!C.store){C.store=this
}var A=this;
var B=function(E,F){if(F.onError){var G=F.scope||dojo.global;
F.onError.call(G,E,F)
}};
var D=function(M,N){var G=N.abort||null;
var I=false;
var E=N.start?N.start:0;
if(A.doClientPaging==false){E=0
}var L=N.count?(E+N.count):M.length;
N.abort=function(){I=true;
if(G){G.call(N)
}};
var H=N.scope||dojo.global;
if(!N.store){N.store=A
}if(N.onBegin){N.onBegin.call(H,M.length,N)
}if(N.sort){M.sort(dojo.data.util.sorter.createSortFunction(N.sort,A))
}if(N.onItem){for(var K=E;
(K<M.length)&&(K<L);
++K){var F=M[K];
if(!I){N.onItem.call(H,F,N)
}}}if(N.onComplete&&!I){var J=null;
if(!N.onItem){J=M.slice(E,L)
}N.onComplete.call(H,J,N)
}};
this._fetchItems(C,D,B);
return C
},getFeatures:function(){return this._features
},close:function(A){},getLabel:function(A){return undefined
},getLabelAttributes:function(A){return null
},_fetchItems:function(C,E,B){var A=C.serverQuery||C.query||{};
if(!this.doClientPaging){A.start=C.start||0;
if(C.count){A.count=C.count
}}if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(A)==dojo.toJson(this._lastServerQuery)){E(this._items,C)
}else{var F=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var D=F({url:this.url,handleAs:"json-comment-optional",content:A});
D.addCallback(dojo.hitch(this,function(G){G=this._filterResponse(G);
this._items=[];
dojo.forEach(G.items,function(K){this._items.push({i:K,r:this})
},this);
var I=G.identifier;
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
}}E(this._items,C)
}));
D.addErrback(function(G){B(G,C)
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},A)
}},_filterResponse:function(A){return A
},_assertIsItem:function(A){if(!this.isItem(A)){throw new dojox.data.QueryReadStore.InvalidItemError(this._className+": a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new dojox.data.QueryReadStore.InvalidAttributeError(this._className+": '"+A+"' is not a valid attribute identifier.")
}},fetchItemByIdentity:function(A){if(this._itemsByIdentity){var E=this._itemsByIdentity[A.identity];
if(!(E===undefined)){if(A.onItem){var C=A.scope?A.scope:dojo.global;
A.onItem.call(C,{i:E,r:this})
}return 
}}var B=function(G,H){var I=A.scope?A.scope:dojo.global;
if(A.onError){A.onError.call(I,error)
}};
var F=function(I,H){var K=A.scope?A.scope:dojo.global;
try{var G=null;
if(I&&I.length==1){G=I[0]
}if(A.onItem){A.onItem.call(K,G)
}}catch(J){if(A.onError){A.onError.call(K,J)
}}};
var D={serverQuery:{id:A.identity}};
this._fetchItems(D,F,B)
},getIdentity:function(A){var B=null;
if(this._identifier===Number){B=A.n
}else{B=A.i[this._identifier]
}return B
},getIdentityAttributes:function(A){return[this._identifier]
}});
dojo.declare("dojox.data.QueryReadStore.InvalidItemError",Error,{});
dojo.declare("dojox.data.QueryReadStore.InvalidAttributeError",Error,{})
};