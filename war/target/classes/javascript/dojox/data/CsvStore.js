if(!dojo._hasResource["dojox.data.CsvStore"]){dojo._hasResource["dojox.data.CsvStore"]=true;
dojo.provide("dojox.data.CsvStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.declare("dojox.data.CsvStore",null,{constructor:function(A){this._attributes=[];
this._attributeIndexes={};
this._dataArray=[];
this._arrayOfAllItems=[];
this._loadFinished=false;
if(A.url){this.url=A.url
}this._csvData=A.data;
if(A.label){this.label=A.label
}else{if(this.label===""){this.label=undefined
}}this._storeProp="_csvStore";
this._idProp="_csvId";
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",label:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojox.data.CsvStore: a function was passed an item argument that was not an item")
}},_assertIsAttribute:function(A){if(!dojo.isString(A)){throw new Error("dojox.data.CsvStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string")
}},getValue:function(C,B,A){this._assertIsItem(C);
this._assertIsAttribute(B);
var D=A;
if(this.hasAttribute(C,B)){var E=this._dataArray[this.getIdentity(C)];
D=E[this._attributeIndexes[B]]
}return D
},getValues:function(A,C){var B=this.getValue(A,C);
return(B?[B]:[])
},getAttributes:function(C){this._assertIsItem(C);
var A=[];
var D=this._dataArray[this.getIdentity(C)];
for(var B=0;
B<D.length;
B++){if(D[B]!=""){A.push(this._attributes[B])
}}return A
},hasAttribute:function(C,B){this._assertIsItem(C);
this._assertIsAttribute(B);
var A=this._attributeIndexes[B];
var D=this._dataArray[this.getIdentity(C)];
return(typeof A!="undefined"&&A<D.length&&D[A]!="")
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
},isItem:function(A){if(A&&A[this._storeProp]===this){var B=A[this._idProp];
if(B>=0&&B<this._dataArray.length){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getFeatures:function(){return this._features
},getLabel:function(A){if(this.label&&this.isItem(A)){return this.getValue(A,this.label)
}return undefined
},getLabelAttributes:function(A){if(this.label){return[this.label]
}return null
},_fetchItems:function(G,D,F){var E=this;
var A=function(O,H){var Q=null;
if(O.query){Q=[];
var P=O.queryOptions?O.queryOptions.ignoreCase:false;
var J={};
for(var K in O.query){var I=O.query[K];
if(typeof I==="string"){J[K]=dojo.data.util.filter.patternToRegExp(I,P)
}}for(var M=0;
M<H.length;
++M){var N=true;
var L=H[M];
for(var K in O.query){var I=O.query[K];
if(!E._containsValue(L,K,I,J[K])){N=false
}}if(N){Q.push(L)
}}}else{if(H.length>0){Q=H.slice(0,H.length)
}}D(Q,O)
};
if(this._loadFinished){A(G,this._arrayOfAllItems)
}else{if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:G,filter:A})
}else{this._loadInProgress=true;
var C={url:E.url,handleAs:"text"};
var B=dojo.xhrGet(C);
B.addCallback(function(H){E._processData(H);
A(G,E._arrayOfAllItems);
E._handleQueuedFetches()
});
B.addErrback(function(H){E._loadInProgress=false;
throw H
})
}}else{if(this._csvData){this._processData(this._csvData);
this._csvData=null;
A(G,this._arrayOfAllItems)
}else{throw new Error("dojox.data.CsvStore: No CSV source data was provided as either URL or String data input.")
}}}},close:function(A){},_getArrayOfArraysFromCsvFileContents:function(Q){if(dojo.isString(Q)){var D=new RegExp("\r\n|\n|\r");
var M=new RegExp("^\\s+","g");
var O=new RegExp("\\s+$","g");
var H=new RegExp('""',"g");
var C=[];
var S=Q.split(D);
for(var F=0;
F<S.length;
++F){var J=S[F];
if(J.length>0){var B=J.split(",");
var E=0;
while(E<B.length){var A=B[E];
var K=A.replace(M,"");
var I=K.replace(O,"");
var G=I.charAt(0);
var R=I.charAt(I.length-1);
var P=I.charAt(I.length-2);
var L=I.charAt(I.length-3);
if(I.length===2&&I=='""'){B[E]=""
}else{if((G=='"')&&((R!='"')||((R=='"')&&(P=='"')&&(L!='"')))){if(E+1===B.length){return null
}var N=B[E+1];
B[E]=K+","+N;
B.splice(E+1,1)
}else{if((G=='"')&&(R=='"')){I=I.slice(1,(I.length-1));
I=I.replace(H,'"')
}B[E]=I;
E+=1
}}}C.push(B)
}}this._attributes=C.shift();
for(var F=0;
F<this._attributes.length;
F++){this._attributeIndexes[this._attributes[F]]=F
}this._dataArray=C
}},_processData:function(A){this._getArrayOfArraysFromCsvFileContents(A);
this._arrayOfAllItems=[];
for(var B=0;
B<this._dataArray.length;
B++){this._arrayOfAllItems.push(this._createItemFromIdentity(B))
}this._loadFinished=true;
this._loadInProgress=false
},_createItemFromIdentity:function(B){var A={};
A[this._storeProp]=this;
A[this._idProp]=B;
return A
},getIdentity:function(A){if(this.isItem(A)){return A[this._idProp]
}return null
},fetchItemByIdentity:function(A){if(!this._loadFinished){var F=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:A})
}else{this._loadInProgress=true;
var E={url:F.url,handleAs:"text"};
var D=dojo.xhrGet(E);
D.addCallback(function(G){var I=A.scope?A.scope:dojo.global;
try{F._processData(G);
var J=F._createItemFromIdentity(A.identity);
if(!F.isItem(J)){J=null
}if(A.onItem){A.onItem.call(I,J)
}F._handleQueuedFetches()
}catch(H){if(A.onError){A.onError.call(I,H)
}}});
D.addErrback(function(H){this._loadInProgress=false;
if(A.onError){var G=A.scope?A.scope:dojo.global;
A.onError.call(G,H)
}})
}}else{if(this._csvData){F._processData(F._csvData);
F._csvData=null;
var C=F._createItemFromIdentity(A.identity);
if(!F.isItem(C)){C=null
}if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}}}else{var C=this._createItemFromIdentity(A.identity);
if(!this.isItem(C)){C=null
}if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}},getIdentityAttributes:function(A){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var B=0;
B<this._queuedFetches.length;
B++){var D=this._queuedFetches[B];
var C=D.filter;
var A=D.args;
if(C){C(A,this._arrayOfAllItems)
}else{this.fetchItemByIdentity(D.args)
}}this._queuedFetches=[]
}}});
dojo.extend(dojox.data.CsvStore,dojo.data.util.simpleFetch)
};