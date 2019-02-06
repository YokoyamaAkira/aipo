dojo._xdResourceLoaded({depends:[["provide","dojox.data.CsvStore"],["require","dojo.data.util.filter"],["require","dojo.data.util.simpleFetch"]],defineResource:function(A){if(!A._hasResource["dojox.data.CsvStore"]){A._hasResource["dojox.data.CsvStore"]=true;
A.provide("dojox.data.CsvStore");
A.require("dojo.data.util.filter");
A.require("dojo.data.util.simpleFetch");
A.declare("dojox.data.CsvStore",null,{constructor:function(B){this._attributes=[];
this._attributeIndexes={};
this._dataArray=[];
this._arrayOfAllItems=[];
this._loadFinished=false;
if(B.url){this.url=B.url
}this._csvData=B.data;
if(B.label){this.label=B.label
}else{if(this.label===""){this.label=undefined
}}this._storeProp="_csvStore";
this._idProp="_csvId";
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",label:"",_assertIsItem:function(B){if(!this.isItem(B)){throw new Error("dojox.data.CsvStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(B){if(!A.isString(B)){throw new Error("dojox.data.CsvStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},getValue:function(F,E,D){this._assertIsItem(F);
this._assertIsAttribute(E);
var B=D;
if(this.hasAttribute(F,E)){var C=this._dataArray[this.getIdentity(F)];
B=C[this._attributeIndexes[E]]
}return B
},getValues:function(D,C){var B=this.getValue(D,C);
return(B?[B]:[])
},getAttributes:function(B){this._assertIsItem(B);
var D=[];
var C=this._dataArray[this.getIdentity(B)];
for(var E=0;
E<C.length;
E++){if(C[E]!=""){D.push(this._attributes[E])
}}return D
},hasAttribute:function(B,E){this._assertIsItem(B);
this._assertIsAttribute(E);
var D=this._attributeIndexes[E];
var C=this._dataArray[this.getIdentity(B)];
return(typeof D!="undefined"&&D<C.length&&C[D]!="")
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
},isItem:function(B){if(B&&B[this._storeProp]===this){var C=B[this._idProp];
if(C>=0&&C<this._dataArray.length){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getFeatures:function(){return this._features
},getLabel:function(B){if(this.label&&this.isItem(B)){return this.getValue(B,this.label)
}return undefined
},getLabelAttributes:function(B){if(this.label){return[this.label]
}return null
},_fetchItems:function(C,B,H){var G=this;
var D=function(N,Q){var P=null;
if(N.query){P=[];
var O=N.queryOptions?N.queryOptions.ignoreCase:false;
var I={};
for(var J in N.query){var R=N.query[J];
if(typeof R==="string"){I[J]=A.data.util.filter.patternToRegExp(R,O)
}}for(var L=0;
L<Q.length;
++L){var M=true;
var K=Q[L];
for(var J in N.query){var R=N.query[J];
if(!G._containsValue(K,J,R,I[J])){M=false
}}if(M){P.push(K)
}}}else{if(Q.length>0){P=Q.slice(0,Q.length)
}}B(P,N)
};
if(this._loadFinished){D(C,this._arrayOfAllItems)
}else{if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{this._loadInProgress=true;
var F={url:G.url,handleAs:"text"};
var E=A.xhrGet(F);
E.addCallback(function(I){G._processData(I);
D(C,G._arrayOfAllItems);
G._handleQueuedFetches()
});
E.addErrback(function(I){G._loadInProgress=false;
throw I
})
}}else{if(this._csvData){this._processData(this._csvData);
this._csvData=null;
D(C,this._arrayOfAllItems)
}else{throw new Error("dojox.data.CsvStore: No CSV source data was provided as either URL or String data input.")
}}}},close:function(B){},_getArrayOfArraysFromCsvFileContents:function(R){if(A.isString(R)){var E=new RegExp("\r\n|\n|\r");
var N=new RegExp("^\\s+","g");
var P=new RegExp("\\s+$","g");
var I=new RegExp('""',"g");
var D=[];
var T=R.split(E);
for(var G=0;
G<T.length;
++G){var K=T[G];
if(K.length>0){var C=K.split(",");
var F=0;
while(F<C.length){var B=C[F];
var L=B.replace(N,"");
var J=L.replace(P,"");
var H=J.charAt(0);
var S=J.charAt(J.length-1);
var Q=J.charAt(J.length-2);
var M=J.charAt(J.length-3);
if(J.length===2&&J=='""'){C[F]=""
}else{if((H=='"')&&((S!='"')||((S=='"')&&(Q=='"')&&(M!='"')))){if(F+1===C.length){return null
}var O=C[F+1];
C[F]=L+","+O;
C.splice(F+1,1)
}else{if((H=='"')&&(S=='"')){J=J.slice(1,(J.length-1));
J=J.replace(I,'"')
}C[F]=J;
F+=1
}}}D.push(C)
}}this._attributes=D.shift();
for(var G=0;
G<this._attributes.length;
G++){this._attributeIndexes[this._attributes[G]]=G
}this._dataArray=D
}},_processData:function(B){this._getArrayOfArraysFromCsvFileContents(B);
this._arrayOfAllItems=[];
for(var C=0;
C<this._dataArray.length;
C++){this._arrayOfAllItems.push(this._createItemFromIdentity(C))
}this._loadFinished=true;
this._loadInProgress=false
},_createItemFromIdentity:function(C){var B={};
B[this._storeProp]=this;
B[this._idProp]=C;
return B
},getIdentity:function(B){if(this.isItem(B)){return B[this._idProp]
}return null
},fetchItemByIdentity:function(D){if(!this._loadFinished){var C=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:D})
}else{this._loadInProgress=true;
var B={url:C.url,handleAs:"text"};
var G=A.xhrGet(B);
G.addCallback(function(K){var I=D.scope?D.scope:A.global;
try{C._processData(K);
var J=C._createItemFromIdentity(D.identity);
if(!C.isItem(J)){J=null
}if(D.onItem){D.onItem.call(I,J)
}C._handleQueuedFetches()
}catch(H){if(D.onError){D.onError.call(I,H)
}}});
G.addErrback(function(H){this._loadInProgress=false;
if(D.onError){var I=D.scope?D.scope:A.global;
D.onError.call(I,H)
}})
}}else{if(this._csvData){C._processData(C._csvData);
C._csvData=null;
var F=C._createItemFromIdentity(D.identity);
if(!C.isItem(F)){F=null
}if(D.onItem){var E=D.scope?D.scope:A.global;
D.onItem.call(E,F)
}}}}else{var F=this._createItemFromIdentity(D.identity);
if(!this.isItem(F)){F=null
}if(D.onItem){var E=D.scope?D.scope:A.global;
D.onItem.call(E,F)
}}},getIdentityAttributes:function(B){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var E=0;
E<this._queuedFetches.length;
E++){var C=this._queuedFetches[E];
var B=C.filter;
var D=C.args;
if(B){B(D,this._arrayOfAllItems)
}else{this.fetchItemByIdentity(C.args)
}}this._queuedFetches=[]
}}});
A.extend(dojox.data.CsvStore,A.data.util.simpleFetch)
}}});