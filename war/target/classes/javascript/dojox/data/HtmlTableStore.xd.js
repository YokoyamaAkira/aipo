dojo._xdResourceLoaded({depends:[["provide","dojox.data.HtmlTableStore"],["require","dojox.data.dom"],["require","dojo.data.util.simpleFetch"],["require","dojo.data.util.filter"]],defineResource:function(A){if(!A._hasResource["dojox.data.HtmlTableStore"]){A._hasResource["dojox.data.HtmlTableStore"]=true;
A.provide("dojox.data.HtmlTableStore");
A.require("dojox.data.dom");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.data.util.filter");
A.declare("dojox.data.HtmlTableStore",null,{constructor:function(B){if(B.url){if(!B.tableId){throw new Error("dojo.data.HtmlTableStore: Cannot instantiate using url without an id!")
}this.url=B.url;
this.tableId=B.tableId
}else{if(B.tableId){this._rootNode=A.byId(B.tableId);
this.tableId=this._rootNode.id
}else{this._rootNode=A.byId(this.tableId)
}this._getHeadings();
for(var C=0;
C<this._rootNode.rows.length;
C++){this._rootNode.rows[C].store=this
}}},url:"",tableId:"",_getHeadings:function(){this._headings=[];
A.forEach(this._rootNode.tHead.rows[0].cells,A.hitch(this,function(B){this._headings.push(dojox.data.dom.textContent(B))
}))
},_getAllItems:function(){var B=[];
for(var C=1;
C<this._rootNode.rows.length;
C++){B.push(this._rootNode.rows[C])
}return B
},_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojo.data.HtmlTableStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(typeof B!=="string"){throw new Error("dojo.data.HtmlTableStore: a function was passed an attribute argument that was not an attribute name string");
return 
}return A.indexOf(this._headings,B)
},getValue:function(E,D,B){var C=this.getValues(E,D);
return(C.length>0)?C[0]:B
},getValues:function(D,C){this._assertIsItem(D);
var B=this._assertIsAttribute(C);
if(B>-1){return[dojox.data.dom.textContent(D.cells[B])]
}return[]
},getAttributes:function(D){this._assertIsItem(D);
var B=[];
for(var C=0;
C<this._headings.length;
C++){if(this.hasAttribute(D,this._headings[C])){B.push(this._headings[C])
}}return B
},hasAttribute:function(C,B){return this.getValues(C,B).length>0
},containsValue:function(C,B,E){var D=undefined;
if(typeof E==="string"){D=A.data.util.filter.patternToRegExp(E,false)
}return this._containsValue(C,B,E,D)
},_containsValue:function(F,E,H,G){var B=this.getValues(F,E);
for(var D=0;
D<B.length;
++D){var C=B[D];
if(typeof C==="string"&&G){return(C.match(G)!==null)
}else{if(H===C){return true
}}}return false
},isItem:function(B){if(B&&B.store&&B.store===this){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){this._assertIsItem(B.item)
},_fetchItems:function(F,H,C){if(this._rootNode){this._finishFetchItems(F,H,C)
}else{if(!this.url){this._rootNode=A.byId(this.tableId);
this._getHeadings();
for(var D=0;
D<this._rootNode.rows.length;
D++){this._rootNode.rows[D].store=this
}}else{var G={url:this.url,handleAs:"text"};
var B=this;
var E=A.xhrGet(G);
E.addCallback(function(K){var J=function(O,P){if(O.id==P){return O
}if(O.childNodes){for(var N=0;
N<O.childNodes.length;
N++){var M=J(O.childNodes[N],P);
if(M){return M
}}}return null
};
var L=document.createElement("div");
L.innerHTML=K;
B._rootNode=J(L,B.tableId);
B._getHeadings.call(B);
for(var I=0;
I<B._rootNode.rows.length;
I++){B._rootNode.rows[I].store=B
}B._finishFetchItems(F,H,C)
});
E.addErrback(function(I){C(I,F)
})
}}},_finishFetchItems:function(D,C,G){var I=null;
var J=this._getAllItems();
if(D.query){var H=D.queryOptions?D.queryOptions.ignoreCase:false;
I=[];
var L={};
for(var M in D.query){var K=D.query[M]+"";
if(typeof K==="string"){L[M]=A.data.util.filter.patternToRegExp(K,H)
}}for(var E=0;
E<J.length;
++E){var F=true;
var B=J[E];
for(var M in D.query){var K=D.query[M]+"";
if(!this._containsValue(B,M,K,L[M])){F=false
}}if(F){I.push(B)
}}C(I,D)
}else{if(J.length>0){I=J.slice(0,J.length)
}C(I,D)
}},getFeatures:function(){return{"dojo.data.api.Read":true,"dojo.data.api.Identity":true}
},close:function(B){},getLabel:function(B){if(this.isItem(B)){return"Table Row #"+this.getIdentity(B)
}return undefined
},getLabelAttributes:function(B){return null
},getIdentity:function(B){this._assertIsItem(B);
if(!A.isOpera){return B.sectionRowIndex
}else{return(A.indexOf(this._rootNode.rows,B)-1)
}},getIdentityAttributes:function(B){return null
},fetchItemByIdentity:function(D){var C=D.identity;
var B=this;
var H=null;
if(!this._rootNode){if(!this.url){this._rootNode=A.byId(this.tableId);
this._getHeadings();
for(var E=0;
E<this._rootNode.rows.length;
E++){this._rootNode.rows[E].store=this
}H=this._rootNode.rows[C+1];
if(D.onItem){var F=D.scope?D.scope:A.global;
D.onItem.call(F,H)
}}else{var I={url:this.url,handleAs:"text"};
var B=this;
var G=A.xhrGet(I);
G.addCallback(function(M){var L=function(Q,R){if(Q.id==R){return Q
}if(Q.childNodes){for(var P=0;
P<Q.childNodes.length;
P++){var O=L(Q.childNodes[P],R);
if(O){return O
}}}return null
};
var N=document.createElement("div");
N.innerHTML=M;
B._rootNode=L(N,B.tableId);
B._getHeadings.call(B);
for(var J=0;
J<B._rootNode.rows.length;
J++){B._rootNode.rows[J].store=B
}H=B._rootNode.rows[C+1];
if(D.onItem){var K=D.scope?D.scope:A.global;
D.onItem.call(K,H)
}});
G.addErrback(function(J){if(D.onError){var K=D.scope?D.scope:A.global;
D.onError.call(K,J)
}})
}}else{if(this._rootNode.rows[C+1]){H=this._rootNode.rows[C+1];
if(D.onItem){var F=D.scope?D.scope:A.global;
D.onItem.call(F,H)
}}}}});
A.extend(dojox.data.HtmlTableStore,A.data.util.simpleFetch)
}}});