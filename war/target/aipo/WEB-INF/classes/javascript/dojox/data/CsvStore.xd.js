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
}},getValue:function(E,D,C){this._assertIsItem(E);
this._assertIsAttribute(D);
var F=C;
if(this.hasAttribute(E,D)){var B=this._dataArray[this.getIdentity(E)];
F=B[this._attributeIndexes[D]]
}return F
},getValues:function(C,B){var D=this.getValue(C,B);
return(D?[D]:[])
},getAttributes:function(E){this._assertIsItem(E);
var C=[];
var B=this._dataArray[this.getIdentity(E)];
for(var D=0;
D<B.length;
D++){if(B[D]!=""){C.push(this._attributes[D])
}}return C
},hasAttribute:function(E,D){this._assertIsItem(E);
this._assertIsAttribute(D);
var C=this._attributeIndexes[D];
var B=this._dataArray[this.getIdentity(E)];
return(typeof C!="undefined"&&C<B.length&&B[C]!="")
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
},isItem:function(C){if(C&&C[this._storeProp]===this){var B=C[this._idProp];
if(B>=0&&B<this._dataArray.length){return true
}}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getFeatures:function(){return this._features
},getLabel:function(B){if(this.label&&this.isItem(B)){return this.getValue(B,this.label)
}return undefined
},getLabelAttributes:function(B){if(this.label){return[this.label]
}return null
},_fetchItems:function(D,H,C){var B=this;
var E=function(L,O){var N=null;
if(L.query){N=[];
var M=L.queryOptions?L.queryOptions.ignoreCase:false;
var Q={};
for(var R in L.query){var P=L.query[R];
if(typeof P==="string"){Q[R]=A.data.util.filter.patternToRegExp(P,M)
}}for(var J=0;
J<O.length;
++J){var K=true;
var I=O[J];
for(var R in L.query){var P=L.query[R];
if(!B._containsValue(I,R,P,Q[R])){K=false
}}if(K){N.push(I)
}}}else{if(O.length>0){N=O.slice(0,O.length)
}}H(N,L)
};
if(this._loadFinished){E(D,this._arrayOfAllItems)
}else{if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:D,filter:E})
}else{this._loadInProgress=true;
var G={url:B.url,handleAs:"text"};
var F=A.xhrGet(G);
F.addCallback(function(I){B._processData(I);
E(D,B._arrayOfAllItems);
B._handleQueuedFetches()
});
F.addErrback(function(I){B._loadInProgress=false;
throw I
})
}}else{if(this._csvData){this._processData(this._csvData);
this._csvData=null;
E(D,this._arrayOfAllItems)
}else{throw new Error("dojox.data.CsvStore: No CSV source data was provided as either URL or String data input.")
}}}},close:function(B){},_getArrayOfArraysFromCsvFileContents:function(K){if(A.isString(K)){var Q=new RegExp("\r\n|\n|\r");
var G=new RegExp("^\\s+","g");
var I=new RegExp("\\s+$","g");
var B=new RegExp('""',"g");
var P=[];
var M=K.split(Q);
for(var S=0;
S<M.length;
++S){var D=M[S];
if(D.length>0){var O=D.split(",");
var R=0;
while(R<O.length){var N=O[R];
var E=N.replace(G,"");
var C=E.replace(I,"");
var T=C.charAt(0);
var L=C.charAt(C.length-1);
var J=C.charAt(C.length-2);
var F=C.charAt(C.length-3);
if(C.length===2&&C=='""'){O[R]=""
}else{if((T=='"')&&((L!='"')||((L=='"')&&(J=='"')&&(F!='"')))){if(R+1===O.length){return null
}var H=O[R+1];
O[R]=E+","+H;
O.splice(R+1,1)
}else{if((T=='"')&&(L=='"')){C=C.slice(1,(C.length-1));
C=C.replace(B,'"')
}O[R]=C;
R+=1
}}}P.push(O)
}}this._attributes=P.shift();
for(var S=0;
S<this._attributes.length;
S++){this._attributeIndexes[this._attributes[S]]=S
}this._dataArray=P
}},_processData:function(C){this._getArrayOfArraysFromCsvFileContents(C);
this._arrayOfAllItems=[];
for(var B=0;
B<this._dataArray.length;
B++){this._arrayOfAllItems.push(this._createItemFromIdentity(B))
}this._loadFinished=true;
this._loadInProgress=false
},_createItemFromIdentity:function(B){var C={};
C[this._storeProp]=this;
C[this._idProp]=B;
return C
},getIdentity:function(B){if(this.isItem(B)){return B[this._idProp]
}return null
},fetchItemByIdentity:function(C){if(!this._loadFinished){var B=this;
if(this.url!==""){if(this._loadInProgress){this._queuedFetches.push({args:C})
}else{this._loadInProgress=true;
var G={url:B.url,handleAs:"text"};
var F=A.xhrGet(G);
F.addCallback(function(K){var I=C.scope?C.scope:A.global;
try{B._processData(K);
var J=B._createItemFromIdentity(C.identity);
if(!B.isItem(J)){J=null
}if(C.onItem){C.onItem.call(I,J)
}B._handleQueuedFetches()
}catch(H){if(C.onError){C.onError.call(I,H)
}}});
F.addErrback(function(H){this._loadInProgress=false;
if(C.onError){var I=C.scope?C.scope:A.global;
C.onError.call(I,H)
}})
}}else{if(this._csvData){B._processData(B._csvData);
B._csvData=null;
var E=B._createItemFromIdentity(C.identity);
if(!B.isItem(E)){E=null
}if(C.onItem){var D=C.scope?C.scope:A.global;
C.onItem.call(D,E)
}}}}else{var E=this._createItemFromIdentity(C.identity);
if(!this.isItem(E)){E=null
}if(C.onItem){var D=C.scope?C.scope:A.global;
C.onItem.call(D,E)
}}},getIdentityAttributes:function(B){return null
},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var D=0;
D<this._queuedFetches.length;
D++){var B=this._queuedFetches[D];
var E=B.filter;
var C=B.args;
if(E){E(C,this._arrayOfAllItems)
}else{this.fetchItemByIdentity(B.args)
}}this._queuedFetches=[]
}}});
A.extend(dojox.data.CsvStore,A.data.util.simpleFetch)
}}});