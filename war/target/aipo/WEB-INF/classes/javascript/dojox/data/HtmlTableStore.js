if(!dojo._hasResource["dojox.data.HtmlTableStore"]){dojo._hasResource["dojox.data.HtmlTableStore"]=true;
dojo.provide("dojox.data.HtmlTableStore");
dojo.require("dojox.data.dom");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.filter");
dojo.declare("dojox.data.HtmlTableStore",null,{constructor:function(A){if(A.url){if(!A.tableId){throw new Error("dojo.data.HtmlTableStore: Cannot instantiate using url without an id!")
}this.url=A.url;
this.tableId=A.tableId
}else{if(A.tableId){this._rootNode=dojo.byId(A.tableId);
this.tableId=this._rootNode.id
}else{this._rootNode=dojo.byId(this.tableId)
}this._getHeadings();
for(var B=0;
B<this._rootNode.rows.length;
B++){this._rootNode.rows[B].store=this
}}},url:"",tableId:"",_getHeadings:function(){this._headings=[];
dojo.forEach(this._rootNode.tHead.rows[0].cells,dojo.hitch(this,function(A){this._headings.push(dojox.data.dom.textContent(A))
}))
},_getAllItems:function(){var A=[];
for(var B=1;
B<this._rootNode.rows.length;
B++){A.push(this._rootNode.rows[B])
}return A
},_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.HtmlTableStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.HtmlTableStore: a function was passed an attribute argument that was not an attribute name string");
return 
}return dojo.indexOf(this._headings,A)
},getValue:function(D,C,A){var B=this.getValues(D,C);
return(B.length>0)?B[0]:A
},getValues:function(C,B){this._assertIsItem(C);
var A=this._assertIsAttribute(B);
if(A>-1){return[dojox.data.dom.textContent(C.cells[A])]
}return[]
},getAttributes:function(C){this._assertIsItem(C);
var A=[];
for(var B=0;
B<this._headings.length;
B++){if(this.hasAttribute(C,this._headings[B])){A.push(this._headings[B])
}}return A
},hasAttribute:function(B,A){return this.getValues(B,A).length>0
},containsValue:function(B,A,D){var C=undefined;
if(typeof D==="string"){C=dojo.data.util.filter.patternToRegExp(D,false)
}return this._containsValue(B,A,D,C)
},_containsValue:function(E,D,G,F){var A=this.getValues(E,D);
for(var C=0;
C<A.length;
++C){var B=A[C];
if(typeof B==="string"&&F){return(B.match(F)!==null)
}else{if(G===B){return true
}}}return false
},isItem:function(A){if(A&&A.store&&A.store===this){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},_fetchItems:function(E,G,B){if(this._rootNode){this._finishFetchItems(E,G,B)
}else{if(!this.url){this._rootNode=dojo.byId(this.tableId);
this._getHeadings();
for(var C=0;
C<this._rootNode.rows.length;
C++){this._rootNode.rows[C].store=this
}}else{var F={url:this.url,handleAs:"text"};
var A=this;
var D=dojo.xhrGet(F);
D.addCallback(function(J){var I=function(N,O){if(N.id==O){return N
}if(N.childNodes){for(var M=0;
M<N.childNodes.length;
M++){var L=I(N.childNodes[M],O);
if(L){return L
}}}return null
};
var K=document.createElement("div");
K.innerHTML=J;
A._rootNode=I(K,A.tableId);
A._getHeadings.call(A);
for(var H=0;
H<A._rootNode.rows.length;
H++){A._rootNode.rows[H].store=A
}A._finishFetchItems(E,G,B)
});
D.addErrback(function(H){B(H,E)
})
}}},_finishFetchItems:function(C,B,F){var H=null;
var I=this._getAllItems();
if(C.query){var G=C.queryOptions?C.queryOptions.ignoreCase:false;
H=[];
var K={};
for(var L in C.query){var J=C.query[L]+"";
if(typeof J==="string"){K[L]=dojo.data.util.filter.patternToRegExp(J,G)
}}for(var D=0;
D<I.length;
++D){var E=true;
var A=I[D];
for(var L in C.query){var J=C.query[L]+"";
if(!this._containsValue(A,L,J,K[L])){E=false
}}if(E){H.push(A)
}}B(H,C)
}else{if(I.length>0){H=I.slice(0,I.length)
}B(H,C)
}},getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},close:function(A){},getLabel:function(A){if(this.isItem(A)){return"Table Row #"+this.getIdentity(A)
}return undefined
},getLabelAttributes:function(A){return null
},getIdentity:function(A){this._assertIsItem(A);
if(!dojo.isOpera){return A.sectionRowIndex
}else{return(dojo.indexOf(this._rootNode.rows,A)-1)
}},getIdentityAttributes:function(A){return null
},fetchItemByIdentity:function(C){var B=C.identity;
var A=this;
var G=null;
if(!this._rootNode){if(!this.url){this._rootNode=dojo.byId(this.tableId);
this._getHeadings();
for(var D=0;
D<this._rootNode.rows.length;
D++){this._rootNode.rows[D].store=this
}G=this._rootNode.rows[B+1];
if(C.onItem){var E=C.scope?C.scope:dojo.global;
C.onItem.call(E,G)
}}else{var H={url:this.url,handleAs:"text"};
var A=this;
var F=dojo.xhrGet(H);
F.addCallback(function(L){var K=function(P,Q){if(P.id==Q){return P
}if(P.childNodes){for(var O=0;
O<P.childNodes.length;
O++){var N=K(P.childNodes[O],Q);
if(N){return N
}}}return null
};
var M=document.createElement("div");
M.innerHTML=L;
A._rootNode=K(M,A.tableId);
A._getHeadings.call(A);
for(var I=0;
I<A._rootNode.rows.length;
I++){A._rootNode.rows[I].store=A
}G=A._rootNode.rows[B+1];
if(C.onItem){var J=C.scope?C.scope:dojo.global;
C.onItem.call(J,G)
}});
F.addErrback(function(I){if(C.onError){var J=C.scope?C.scope:dojo.global;
C.onError.call(J,I)
}})
}}else{if(this._rootNode.rows[B+1]){G=this._rootNode.rows[B+1];
if(C.onItem){var E=C.scope?C.scope:dojo.global;
C.onItem.call(E,G)
}}}}});
dojo.extend(dojox.data.HtmlTableStore,dojo.data.util.simpleFetch)
};