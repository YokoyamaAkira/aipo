if(!dojo._hasResource["dojox.data.HtmlTableStore"]){dojo._hasResource["dojox.data.HtmlTableStore"]=true;
dojo.provide("dojox.data.HtmlTableStore");
dojo.require("dojox.data.dom");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.filter");
dojo.declare("dojox.data.HtmlTableStore",null,{constructor:function(B){if(B.url){if(!B.tableId){throw new Error("dojo.data.HtmlTableStore: Cannot instantiate using url without an id!")
}this.url=B.url;
this.tableId=B.tableId
}else{if(B.tableId){this._rootNode=dojo.byId(B.tableId);
this.tableId=this._rootNode.id
}else{this._rootNode=dojo.byId(this.tableId)
}this._getHeadings();
for(var A=0;
A<this._rootNode.rows.length;
A++){this._rootNode.rows[A].store=this
}}},url:"",tableId:"",_getHeadings:function(){this._headings=[];
dojo.forEach(this._rootNode.tHead.rows[0].cells,dojo.hitch(this,function(A){this._headings.push(dojox.data.dom.textContent(A))
}))
},_getAllItems:function(){var B=[];
for(var A=1;
A<this._rootNode.rows.length;
A++){B.push(this._rootNode.rows[A])
}return B
},_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.HtmlTableStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.HtmlTableStore: a function was passed an attribute argument that was not an attribute name string");
return 
}return dojo.indexOf(this._headings,A)
},getValue:function(C,B,D){var A=this.getValues(C,B);
return(A.length>0)?A[0]:D
},getValues:function(B,A){this._assertIsItem(B);
var C=this._assertIsAttribute(A);
if(C>-1){return[dojox.data.dom.textContent(B.cells[C])]
}return[]
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var A=0;
A<this._headings.length;
A++){if(this.hasAttribute(B,this._headings[A])){C.push(this._headings[A])
}}return C
},hasAttribute:function(A,B){return this.getValues(A,B).length>0
},containsValue:function(A,D,C){var B=undefined;
if(typeof C==="string"){B=dojo.data.util.filter.patternToRegExp(C,false)
}return this._containsValue(A,D,C,B)
},_containsValue:function(B,A,D,C){var E=this.getValues(B,A);
for(var G=0;
G<E.length;
++G){var F=E[G];
if(typeof F==="string"&&C){return(F.match(C)!==null)
}else{if(D===F){return true
}}}return false
},isItem:function(A){if(A&&A.store&&A.store===this){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},_fetchItems:function(B,D,F){if(this._rootNode){this._finishFetchItems(B,D,F)
}else{if(!this.url){this._rootNode=dojo.byId(this.tableId);
this._getHeadings();
for(var G=0;
G<this._rootNode.rows.length;
G++){this._rootNode.rows[G].store=this
}}else{var C={url:this.url,handleAs:"text"};
var E=this;
var A=dojo.xhrGet(C);
A.addCallback(function(K){var J=function(L,M){if(L.id==M){return L
}if(L.childNodes){for(var O=0;
O<L.childNodes.length;
O++){var N=J(L.childNodes[O],M);
if(N){return N
}}}return null
};
var H=document.createElement("div");
H.innerHTML=K;
E._rootNode=J(H,E.tableId);
E._getHeadings.call(E);
for(var I=0;
I<E._rootNode.rows.length;
I++){E._rootNode.rows[I].store=E
}E._finishFetchItems(B,D,F)
});
A.addErrback(function(H){F(H,B)
})
}}},_finishFetchItems:function(K,J,B){var D=null;
var E=this._getAllItems();
if(K.query){var C=K.queryOptions?K.queryOptions.ignoreCase:false;
D=[];
var G={};
for(var H in K.query){var F=K.query[H]+"";
if(typeof F==="string"){G[H]=dojo.data.util.filter.patternToRegExp(F,C)
}}for(var L=0;
L<E.length;
++L){var A=true;
var I=E[L];
for(var H in K.query){var F=K.query[H]+"";
if(!this._containsValue(I,H,F,G[H])){A=false
}}if(A){D.push(I)
}}J(D,K)
}else{if(E.length>0){D=E.slice(0,E.length)
}J(D,K)
}},getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},close:function(A){},getLabel:function(A){if(this.isItem(A)){return"Table Row #"+this.getIdentity(A)
}return undefined
},getLabelAttributes:function(A){return null
},getIdentity:function(A){this._assertIsItem(A);
if(!dojo.isOpera){return A.sectionRowIndex
}else{return(dojo.indexOf(this._rootNode.rows,A)-1)
}},getIdentityAttributes:function(A){return null
},fetchItemByIdentity:function(F){var E=F.identity;
var D=this;
var B=null;
if(!this._rootNode){if(!this.url){this._rootNode=dojo.byId(this.tableId);
this._getHeadings();
for(var G=0;
G<this._rootNode.rows.length;
G++){this._rootNode.rows[G].store=this
}B=this._rootNode.rows[E+1];
if(F.onItem){var H=F.scope?F.scope:dojo.global;
F.onItem.call(H,B)
}}else{var C={url:this.url,handleAs:"text"};
var D=this;
var A=dojo.xhrGet(C);
A.addCallback(function(I){var M=function(P,Q){if(P.id==Q){return P
}if(P.childNodes){for(var N=0;
N<P.childNodes.length;
N++){var O=M(P.childNodes[N],Q);
if(O){return O
}}}return null
};
var J=document.createElement("div");
J.innerHTML=I;
D._rootNode=M(J,D.tableId);
D._getHeadings.call(D);
for(var K=0;
K<D._rootNode.rows.length;
K++){D._rootNode.rows[K].store=D
}B=D._rootNode.rows[E+1];
if(F.onItem){var L=F.scope?F.scope:dojo.global;
F.onItem.call(L,B)
}});
A.addErrback(function(J){if(F.onError){var I=F.scope?F.scope:dojo.global;
F.onError.call(I,J)
}})
}}else{if(this._rootNode.rows[E+1]){B=this._rootNode.rows[E+1];
if(F.onItem){var H=F.scope?F.scope:dojo.global;
F.onItem.call(H,B)
}}}}});
dojo.extend(dojox.data.HtmlTableStore,dojo.data.util.simpleFetch)
};