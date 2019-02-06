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
}},getValue:function(D,C,B){this._assertIsItem(D);
this._assertIsAttribute(C);
var E=B;
if(this.hasAttribute(D,C)){var A=this._dataArray[this.getIdentity(D)];
E=A[this._attributeIndexes[C]]
}return E
},getValues:function(B,A){var C=this.getValue(B,A);
return(C?[C]:[])
},getAttributes:function(D){this._assertIsItem(D);
var B=[];
var A=this._dataArray[this.getIdentity(D)];
for(var C=0;
C<A.length;
C++){if(A[C]!=""){B.push(this._attributes[C])
}}return B
},hasAttribute:function(D,C){this._assertIsItem(D);
this._assertIsAttribute(C);
var B=this._attributeIndexes[C];
var A=this._dataArray[this.getIdentity(D)];
return(typeof B!="undefined"&&B<A.length&&A[B]!="")
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
},isItem:function(B){if(B&&B[this._storeProp]===this){var A=B[this._idProp];
if(A>=0&&A<this._dataArray.length){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getFeatures:function(){return this._features
},getLabel:function(A){if(this.label&&this.isItem(A)){return this.getValue(A,this.label)
}return undefined
},getLabelAttributes:function(A){if(this.label){return[this.label]
}return null
},_fetchItems:function(C,G,B){var A=this;
var D=function(K,N){var M=null;
if(K.query){M=[];
var L=K.queryOptions?K.queryOptions.ignoreCase:false;
var P={};
for(var Q in K.query){var O=K.query[Q];
if(typeof O==="string"){P[Q]=dojo.data.util.filter.patternToRegExp(O,L)
}}for(var I=0;
I<N.length;
++I){var J=true;
var H=N[I];
for(var Q in K.query){var O=K.query[Q];
if(!A._containsValue(H,Q,O,P[Q])){J=false
}}if(J){M.push(H)
}}}else{if(N.length>0){M=N.slice(0,N.length)
}}G(M,K)
};
if(this._loadFinished){D(C,this._arrayOfAllItems)
}else{if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:C,filter:D})
}else{this._loadInProgress=true;
var F={url:A.url,handleAs:"text"};
var E=dojo.xhrGet(F);
E.addCallback(function(H){A._processData(H);
D(C,A._arrayOfAllItems);
A._handleQueuedFetches()
});
E.addErrback(function(H){A._loadInProgress=false;
throw H
})
}}else{if(this._csvData){this._processData(this._csvData);
this._csvData=null;
D(C,this._arrayOfAllItems)
}else{throw new Error("dojox.data.CsvStore: No CSV source data was provided as either URL or String data input.")
}}}},close:function(A){},_getArrayOfArraysFromCsvFileContents:function(J){if(dojo.isString(J)){var P=new RegExp("\r\n|\n|\r");
var F=new RegExp("^\\s+","g");
var H=new RegExp("\\s+$","g");
var A=new RegExp('""',"g");
var O=[];
var L=J.split(P);
for(var R=0;
R<L.length;
++R){var C=L[R];
if(C.length>0){var N=C.split(",");
var Q=0;
while(Q<N.length){var M=N[Q];
var D=M.replace(F,"");
var B=D.replace(H,"");
var S=B.charAt(0);
var K=B.charAt(B.length-1);
var I=B.charAt(B.length-2);
var E=B.charAt(B.length-3);
if(B.length===2&&B=='""'){N[Q]=""
}else{if((S=='"')&&((K!='"')||((K=='"')&&(I=='"')&&(E!='"')))){if(Q+1===N.length){return null
}var G=N[Q+1];
N[Q]=D+","+G;
N.splice(Q+1,1)
}else{if((S=='"')&&(K=='"')){B=B.slice(1,(B.length-1));
B=B.replace(A,'"')
}N[Q]=B;
Q+=1
}}}O.push(N)
}}this._attributes=O.shift();
for(var R=0;
R<this._attributes.length;
R++){this._attributeIndexes[this._attributes[R]]=R
}this._dataArray=O
}},_processData:function(B){this._getArrayOfArraysFromCsvFileContents(B);
this._arrayOfAllItems=[];
for(var A=0;
A<this._dataArray.length;
A++){this._arrayOfAllItems.push(this._createItemFromIdentity(A))
}this._loadFinished=true;
this._loadInProgress=false
},_createItemFromIdentity:function(A){var B={};
B[this._storeProp]=this;
B[this._idProp]=A;
return B
},getIdentity:function(A){if(this.isItem(A)){return A[this._idProp]
}return null
},fetchItemByIdentity:function(B){if(!this._loadFinished){var A=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:B})
}else{this._loadInProgress=true;
var F={url:A.url,handleAs:"text"};
var E=dojo.xhrGet(F);
E.addCallback(function(J){var H=B.scope?B.scope:dojo.global;
try{A._processData(J);
var I=A._createItemFromIdentity(B.identity);
if(!A.isItem(I)){I=null
}if(B.onItem){B.onItem.call(H,I)
}A._handleQueuedFetches()
}catch(G){if(B.onError){B.onError.call(H,G)
}}});
E.addErrback(function(G){this._loadInProgress=false;
if(B.onError){var H=B.scope?B.scope:dojo.global;
B.onError.call(H,G)
}})
}}else{if(this._csvData){A._processData(A._csvData);
A._csvData=null;
var D=A._createItemFromIdentity(B.identity);
if(!A.isItem(D)){D=null
}if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}}}else{var D=this._createItemFromIdentity(B.identity);
if(!this.isItem(D)){D=null
}if(B.onItem){var C=B.scope?B.scope:dojo.global;
B.onItem.call(C,D)
}}},getIdentityAttributes:function(A){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var C=0;
C<this._queuedFetches.length;
C++){var A=this._queuedFetches[C];
var D=A.filter;
var B=A.args;
if(D){D(B,this._arrayOfAllItems)
}else{this.fetchItemByIdentity(A.args)
}}this._queuedFetches=[]
}}});
dojo.extend(dojox.data.CsvStore,dojo.data.util.simpleFetch)
};