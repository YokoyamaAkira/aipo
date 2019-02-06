if(!dojo._hasResource["dojox.data.QueryReadStore"]){dojo._hasResource["dojox.data.QueryReadStore"]=true;
dojo.provide("dojox.data.QueryReadStore");
dojo.provide("dojox.data.QueryReadStore.InvalidItemError");
dojo.provide("dojox.data.QueryReadStore.InvalidAttributeError");
dojo.require("dojo.string");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.QueryReadStore",null,{url:"",requestMethod:"get",_className:"dojox.data.QueryReadStore",_items:[],_lastServerQuery:null,lastRequestHash:null,doClientPaging:true,_itemsByIdentity:null,_identifier:null,_features:{"dojo.data.api.Read":true,"dojo.data.api.Identity":true},constructor:function(A){dojo.mixin(this,A)
},getValue:function(C,B,A){this._assertIsItem(C);
if(!dojo.isString(B)){throw new Error(this._className+".getValue(): Invalid attribute, string expected!")
}if(!this.hasAttribute(C,B)){if(A){return A
}console.log(this._className+".getValue(): Item does not have the attribute '"+B+"'.")
}return C.i[B]
},getValues:function(C,B){var A=[];
if(this.hasAttribute(C,B)){A.push(C.i[B])
}return A
},getAttributes:function(C){this._assertIsItem(C);
var A=[];
for(var B in C.i){A.push(B)
}return A
},hasAttribute:function(B,A){return this.isItem(B)&&typeof B.i[A]!="undefined"
},containsValue:function(E,D,F){var B=this.getValues(E,D);
var A=B.length;
for(var C=0;
C<A;
C++){if(B[C]==F){return true
}}return false
},isItem:function(A){if(A){return typeof A.r!="undefined"&&A.r==this
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){if(this.isItemLoaded(A.item)){return 
}},fetch:function(D){D=D||{};
if(!D.store){D.store=this
}var B=this;
var C=function(G,E){if(E.onError){var F=E.scope||dojo.global;
E.onError.call(F,G,E)
}};
var A=function(I,J){var M=J.abort||null;
var E=false;
var K=J.start?J.start:0;
if(B.doClientPaging==false){K=0
}var H=J.count?(K+J.count):I.length;
J.abort=function(){E=true;
if(M){M.call(J)
}};
var N=J.scope||dojo.global;
if(!J.store){J.store=B
}if(J.onBegin){J.onBegin.call(N,I.length,J)
}if(J.sort){I.sort(dojo.data.util.sorter.createSortFunction(J.sort,B))
}if(J.onItem){for(var G=K;
(G<I.length)&&(G<H);
++G){var L=I[G];
if(!E){J.onItem.call(N,L,J)
}}}if(J.onComplete&&!E){var F=null;
if(!J.onItem){F=I.slice(K,H)
}J.onComplete.call(N,F,J)
}};
this._fetchItems(D,A,C);
return D
},getFeatures:function(){return this._features
},close:function(A){},getLabel:function(A){return undefined
},getLabelAttributes:function(A){return null
},_fetchItems:function(D,F,C){var B=D.serverQuery||D.query||{};
if(!this.doClientPaging){B.start=D.start||0;
if(D.count){B.count=D.count
}}if(this.doClientPaging&&this._lastServerQuery!==null&&dojo.toJson(B)==dojo.toJson(this._lastServerQuery)){F(this._items,D)
}else{var A=this.requestMethod.toLowerCase()=="post"?dojo.xhrPost:dojo.xhrGet;
var E=A({url:this.url,handleAs:"json-comment-optional",content:B});
E.addCallback(dojo.hitch(this,function(J){J=this._filterResponse(J);
this._items=[];
dojo.forEach(J.items,function(K){this._items.push({i:K,r:this})
},this);
var H=J.identifier;
this._itemsByIdentity={};
if(H){this._identifier=H;
for(i=0;
i<this._items.length;
++i){var I=this._items[i].i;
var G=I[H];
if(!this._itemsByIdentity[G]){this._itemsByIdentity[G]=I
}else{throw new Error("dojo.data.QueryReadStore:  The json data as specified by: ["+this.url+"] is malformed.  Items within the list have identifier: ["+H+"].  Value collided: ["+G+"]")
}}}else{this._identifier=Number;
for(i=0;
i<this._items.length;
++i){this._items[i].n=i
}}F(this._items,D)
}));
E.addErrback(function(G){C(G,D)
});
this.lastRequestHash=new Date().getTime()+"-"+String(Math.random()).substring(2);
this._lastServerQuery=dojo.mixin({},B)
}},_filterResponse:function(A){return A
},_assertIsItem:function(A){if(!this.isItem(A)){throw new dojox.data.QueryReadStore.InvalidItemError(this._className+": a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new dojox.data.QueryReadStore.InvalidAttributeError(this._className+": '"+A+"' is not a valid attribute identifier.")
}},fetchItemByIdentity:function(B){if(this._itemsByIdentity){var F=this._itemsByIdentity[B.identity];
if(!(F===undefined)){if(B.onItem){var D=B.scope?B.scope:dojo.global;
B.onItem.call(D,{i:F,r:this})
}return 
}}var C=function(I,G){var H=B.scope?B.scope:dojo.global;
if(B.onError){B.onError.call(H,error)
}};
var A=function(H,G){var J=B.scope?B.scope:dojo.global;
try{var K=null;
if(H&&H.length==1){K=H[0]
}if(B.onItem){B.onItem.call(J,K)
}}catch(I){if(B.onError){B.onError.call(J,I)
}}};
var E={serverQuery:{id:B.identity}};
this._fetchItems(E,A,C)
},getIdentity:function(B){var A=null;
if(this._identifier===Number){A=B.n
}else{A=B.i[this._identifier]
}return A
},getIdentityAttributes:function(A){return[this._identifier]
}});
dojo.declare("dojox.data.QueryReadStore.InvalidItemError",Error,{});
dojo.declare("dojox.data.QueryReadStore.InvalidAttributeError",Error,{})
};