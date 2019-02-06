dojo._xdResourceLoaded({depends:[["provide","dojox.data.HtmlTableStore"],["require","dojox.data.dom"],["require","dojo.data.util.simpleFetch"],["require","dojo.data.util.filter"]],defineResource:function(A){if(!A._hasResource["dojox.data.HtmlTableStore"]){A._hasResource["dojox.data.HtmlTableStore"]=true;
A.provide("dojox.data.HtmlTableStore");
A.require("dojox.data.dom");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.data.util.filter");
A.declare("dojox.data.HtmlTableStore",null,{constructor:function(C){if(C.url){if(!C.tableId){throw new Error("dojo.data.HtmlTableStore: Cannot instantiate using url without an id!")
}this.url=C.url;
this.tableId=C.tableId
}else{if(C.tableId){this._rootNode=A.byId(C.tableId);
this.tableId=this._rootNode.id
}else{this._rootNode=A.byId(this.tableId)
}this._getHeadings();
for(var B=0;
B<this._rootNode.rows.length;
B++){this._rootNode.rows[B].store=this
}}},url:"",tableId:"",_getHeadings:function(){this._headings=[];
A.forEach(this._rootNode.tHead.rows[0].cells,A.hitch(this,function(B){this._headings.push(dojox.data.dom.textContent(B))
}))
},_getAllItems:function(){var C=[];
for(var B=1;
B<this._rootNode.rows.length;
B++){C.push(this._rootNode.rows[B])
}return C
},_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.HtmlTableStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.HtmlTableStore: a function was passed an attribute argument that was not an attribute name string");
return 
}return A.indexOf(this._headings,B)
},getValue:function(B,E,C){var D=this.getValues(B,E);
return(D.length>0)?D[0]:C
},getValues:function(B,D){this._assertIsItem(B);
var C=this._assertIsAttribute(D);
if(C>-1){return[dojox.data.dom.textContent(B.cells[C])]
}return[]
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var D=0;
D<this._headings.length;
D++){if(this.hasAttribute(B,this._headings[D])){C.push(this._headings[D])
}}return C
},hasAttribute:function(B,C){return this.getValues(B,C).length>0
},containsValue:function(D,C,B){var E=undefined;
if(typeof B==="string"){E=A.data.util.filter.patternToRegExp(B,false)
}return this._containsValue(D,C,B,E)
},_containsValue:function(E,D,C,F){var G=this.getValues(E,D);
for(var B=0;
B<G.length;
++B){var H=G[B];
if(typeof H==="string"&&F){return(H.match(F)!==null)
}else{if(C===H){return true
}}}return false
},isItem:function(B){if(B&&B.store&&B.store===this){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},_fetchItems:function(E,C,H){if(this._rootNode){this._finishFetchItems(E,C,H)
}else{if(!this.url){this._rootNode=A.byId(this.tableId);
this._getHeadings();
for(var B=0;
B<this._rootNode.rows.length;
B++){this._rootNode.rows[B].store=this
}}else{var F={url:this.url,handleAs:"text"};
var G=this;
var D=A.xhrGet(F);
D.addCallback(function(K){var J=function(M,O){if(M.id==O){return M
}if(M.childNodes){for(var P=0;
P<M.childNodes.length;
P++){var N=J(M.childNodes[P],O);
if(N){return N
}}}return null
};
var L=document.createElement("div");
L.innerHTML=K;
G._rootNode=J(L,G.tableId);
G._getHeadings.call(G);
for(var I=0;
I<G._rootNode.rows.length;
I++){G._rootNode.rows[I].store=G
}G._finishFetchItems(E,C,H)
});
D.addErrback(function(I){H(I,E)
})
}}},_finishFetchItems:function(C,M,E){var G=null;
var H=this._getAllItems();
if(C.query){var F=C.queryOptions?C.queryOptions.ignoreCase:false;
G=[];
var J={};
for(var K in C.query){var I=C.query[K]+"";
if(typeof I==="string"){J[K]=A.data.util.filter.patternToRegExp(I,F)
}}for(var B=0;
B<H.length;
++B){var D=true;
var L=H[B];
for(var K in C.query){var I=C.query[K]+"";
if(!this._containsValue(L,K,I,J[K])){D=false
}}if(D){G.push(L)
}}M(G,C)
}else{if(H.length>0){G=H.slice(0,H.length)
}M(G,C)
}},getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},close:function(B){},getLabel:function(B){if(this.isItem(B)){return"Table Row #"+this.getIdentity(B)
}return undefined
},getLabelAttributes:function(B){return null
},getIdentity:function(B){this._assertIsItem(B);
if(!A.isOpera){return B.sectionRowIndex
}else{return(A.indexOf(this._rootNode.rows,B)-1)
}},getIdentityAttributes:function(B){return null
},fetchItemByIdentity:function(H){var G=H.identity;
var F=this;
var E=null;
if(!this._rootNode){if(!this.url){this._rootNode=A.byId(this.tableId);
this._getHeadings();
for(var I=0;
I<this._rootNode.rows.length;
I++){this._rootNode.rows[I].store=this
}E=this._rootNode.rows[G+1];
if(H.onItem){var C=H.scope?H.scope:A.global;
H.onItem.call(C,E)
}}else{var B={url:this.url,handleAs:"text"};
var F=this;
var D=A.xhrGet(B);
D.addCallback(function(J){var N=function(P,R){if(P.id==R){return P
}if(P.childNodes){for(var Q=0;
Q<P.childNodes.length;
Q++){var O=N(P.childNodes[Q],R);
if(O){return O
}}}return null
};
var K=document.createElement("div");
K.innerHTML=J;
F._rootNode=N(K,F.tableId);
F._getHeadings.call(F);
for(var L=0;
L<F._rootNode.rows.length;
L++){F._rootNode.rows[L].store=F
}E=F._rootNode.rows[G+1];
if(H.onItem){var M=H.scope?H.scope:A.global;
H.onItem.call(M,E)
}});
D.addErrback(function(J){if(H.onError){var K=H.scope?H.scope:A.global;
H.onError.call(K,J)
}})
}}else{if(this._rootNode.rows[G+1]){E=this._rootNode.rows[G+1];
if(H.onItem){var C=H.scope?H.scope:A.global;
H.onItem.call(C,E)
}}}}});
A.extend(dojox.data.HtmlTableStore,A.data.util.simpleFetch)
}}});