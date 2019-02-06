dojo._xdResourceLoaded({depends:[["provide","dojox.data.XmlStore"],["provide","dojox.data.XmlItem"],["require","dojo.data.util.simpleFetch"],["require","dojo.data.util.filter"],["require","dojox.data.dom"]],defineResource:function(A){if(!A._hasResource["dojox.data.XmlStore"]){A._hasResource["dojox.data.XmlStore"]=true;
A.provide("dojox.data.XmlStore");
A.provide("dojox.data.XmlItem");
A.require("dojo.data.util.simpleFetch");
A.require("dojo.data.util.filter");
A.require("dojox.data.dom");
A.declare("dojox.data.XmlStore",null,{constructor:function(B){console.log("XmlStore()");
if(B){this._url=B.url;
this._rootItem=(B.rootItem||B.rootitem);
this._keyAttribute=(B.keyAttribute||B.keyattribute);
this._attributeMap=(B.attributeMap||B.attributemap);
this._labelAttr=B.label;
this._sendQuery=(B.sendQuery||B.sendquery)
}this._newItems=[];
this._deletedItems=[];
this._modifiedItems=[]
},getValue:function(E,D,F){var I=E.element;
if(D==="tagName"){return I.nodeName
}else{if(D==="childNodes"){for(var H=0;
H<I.childNodes.length;
H++){var C=I.childNodes[H];
if(C.nodeType===1){return this._getItem(C)
}}return F
}else{if(D==="text()"){for(var H=0;
H<I.childNodes.length;
H++){var C=I.childNodes[H];
if(C.nodeType===3||C.nodeType===4){return C.nodeValue
}}return F
}else{D=this._getAttribute(I.nodeName,D);
if(D.charAt(0)==="@"){var G=D.substring(1);
var B=I.getAttribute(G);
return(B!==undefined)?B:F
}else{for(var H=0;
H<I.childNodes.length;
H++){var C=I.childNodes[H];
if(C.nodeType===1&&C.nodeName===D){return this._getItem(C)
}}return F
}}}}},getValues:function(E,D){var I=E.element;
if(D==="tagName"){return[I.nodeName]
}else{if(D==="childNodes"){var F=[];
for(var H=0;
H<I.childNodes.length;
H++){var C=I.childNodes[H];
if(C.nodeType===1){F.push(this._getItem(C))
}}return F
}else{if(D==="text()"){var F=[];
for(var H=0;
H<I.childNodes.length;
H++){var C=childNodes[H];
if(C.nodeType===3){F.push(C.nodeValue)
}}return F
}else{D=this._getAttribute(I.nodeName,D);
if(D.charAt(0)==="@"){var G=D.substring(1);
var B=I.getAttribute(G);
return(B!==undefined)?[B]:[]
}else{var F=[];
for(var H=0;
H<I.childNodes.length;
H++){var C=I.childNodes[H];
if(C.nodeType===1&&C.nodeName===D){F.push(this._getItem(C))
}}return F
}}}}},getAttributes:function(J){var D=J.element;
var C=[];
C.push("tagName");
if(D.childNodes.length>0){var F={};
var H=true;
var I=false;
for(var E=0;
E<D.childNodes.length;
E++){var B=D.childNodes[E];
if(B.nodeType===1){var K=B.nodeName;
if(!F[K]){C.push(K);
F[K]=K
}H=true
}else{if(B.nodeType===3){I=true
}}}if(H){C.push("childNodes")
}if(I){C.push("text()")
}}for(var E=0;
E<D.attributes.length;
E++){C.push("@"+D.attributes[E].nodeName)
}if(this._attributeMap){for(var G in this._attributeMap){var E=G.indexOf(".");
if(E>0){var L=G.substring(0,E);
if(L===D.nodeName){C.push(G.substring(E+1))
}}else{C.push(G)
}}}return C
},hasAttribute:function(B,C){return(this.getValue(B,C)!==undefined)
},containsValue:function(F,E,B){var C=this.getValues(F,E);
for(var D=0;
D<C.length;
D++){if((typeof B==="string")){if(C[D].toString&&C[D].toString()===B){return true
}}else{if(C[D]===B){return true
}}}return false
},isItem:function(B){if(B&&B.element&&B.store&&B.store===this){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getFeatures:function(){var B={"dojo.data.api.Read":true,"dojo.data.api.Write":true};
return B
},getLabel:function(B){if(this._labelAttr&&this.isItem(B)){var C=this.getValue(B,this._labelAttr);
if(C){return C.toString()
}}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(C,B,G){var H=this._getFetchUrl(C);
console.log("XmlStore._fetchItems(): url="+H);
if(!H){G(new Error("No URL specified."));
return 
}var E=(!this._sendQuery?C:null);
var F=this;
var D={url:H,handleAs:"xml",preventCache:true};
var I=A.xhrGet(D);
I.addCallback(function(K){var J=F._getItems(K,E);
console.log("XmlStore._fetchItems(): length="+(J?J.length:0));
if(J&&J.length>0){B(J,C)
}else{B([],C)
}});
I.addErrback(function(J){G(J,C)
})
},_getFetchUrl:function(E){if(!this._sendQuery){return this._url
}var G=E.query;
if(!G){return this._url
}if(A.isString(G)){return this._url+G
}var C="";
for(var D in G){var F=G[D];
if(F){if(C){C+="&"
}C+=(D+"="+F)
}}if(!C){return this._url
}var B=this._url;
if(B.indexOf("?")<0){B+="?"
}else{B+="&"
}return B+C
},_getItems:function(B,M){var Q=null;
if(M){Q=M.query
}var P=[];
var J=null;
if(this._rootItem){J=B.getElementsByTagName(this._rootItem)
}else{J=B.documentElement.childNodes
}for(var N=0;
N<J.length;
N++){var E=J[N];
if(E.nodeType!=1){continue
}var H=this._getItem(E);
if(Q){var I=true;
var O=M.queryOptions?M.queryOptions.ignoreCase:false;
var F={};
for(var D in Q){var C=Q[D];
if(typeof C==="string"){F[D]=A.data.util.filter.patternToRegExp(C,O)
}}for(var K in Q){var C=this.getValue(H,K);
if(C){var L=Q[K];
if((typeof C)==="string"&&(F[K])){if((C.match(F[K]))!==null){continue
}}else{if((typeof C)==="object"){if(C.toString&&(F[K])){var G=C.toString();
if((G.match(F[K]))!==null){continue
}}else{if(L==="*"||L===C){continue
}}}}}I=false;
break
}if(!I){continue
}}P.push(H)
}A.forEach(P,function(R){R.element.parentNode.removeChild(R.element)
},this);
return P
},close:function(B){},newItem:function(H){console.log("XmlStore.newItem()");
H=(H||{});
var C=H.tagName;
if(!C){C=this._rootItem;
if(!C){return null
}}var E=this._getDocument();
var D=E.createElement(C);
for(var B in H){if(B==="tagName"){continue
}else{if(B==="text()"){var F=E.createTextNode(H[B]);
D.appendChild(F)
}else{B=this._getAttribute(C,B);
if(B.charAt(0)==="@"){var I=B.substring(1);
D.setAttribute(I,H[B])
}else{var J=E.createElement(B);
var F=E.createTextNode(H[B]);
J.appendChild(F);
D.appendChild(J)
}}}}var G=this._getItem(D);
this._newItems.push(G);
return G
},deleteItem:function(B){console.log("XmlStore.deleteItem()");
var C=B.element;
if(C.parentNode){this._backupItem(B);
C.parentNode.removeChild(C);
return true
}this._forgetItem(B);
this._deletedItems.push(B);
return true
},setValue:function(I,B,G){if(B==="tagName"){return false
}this._backupItem(I);
var D=I.element;
if(B==="childNodes"){var K=G.element;
D.appendChild(K)
}else{if(B==="text()"){while(D.firstChild){D.removeChild(D.firstChild)
}var H=this._getDocument(D).createTextNode(G);
D.appendChild(H)
}else{B=this._getAttribute(D.nodeName,B);
if(B.charAt(0)==="@"){var J=B.substring(1);
D.setAttribute(J,G)
}else{var K=null;
for(var E=0;
E<D.childNodes.length;
E++){var C=D.childNodes[E];
if(C.nodeType===1&&C.nodeName===B){K=C;
break
}}var F=this._getDocument(D);
if(K){while(K.firstChild){K.removeChild(K.firstChild)
}}else{K=F.createElement(B);
D.appendChild(K)
}var H=F.createTextNode(G);
K.appendChild(H)
}}}return true
},setValues:function(J,B,H){if(B==="tagName"){return false
}this._backupItem(J);
var D=J.element;
if(B==="childNodes"){while(D.firstChild){D.removeChild(D.firstChild)
}for(var E=0;
E<H.length;
E++){var L=H[E].element;
D.appendChild(L)
}}else{if(B==="text()"){while(D.firstChild){D.removeChild(D.firstChild)
}var G="";
for(var E=0;
E<H.length;
E++){G+=H[E]
}var I=this._getDocument(D).createTextNode(G);
D.appendChild(I)
}else{B=this._getAttribute(D.nodeName,B);
if(B.charAt(0)==="@"){var K=B.substring(1);
D.setAttribute(K,H[0])
}else{for(var E=D.childNodes.length-1;
E>=0;
E--){var C=D.childNodes[E];
if(C.nodeType===1&&C.nodeName===B){D.removeChild(C)
}}var F=this._getDocument(D);
for(var E=0;
E<H.length;
E++){var L=F.createElement(B);
var I=F.createTextNode(H[E]);
L.appendChild(I);
D.appendChild(L)
}}}}return true
},unsetAttribute:function(C,G){if(G==="tagName"){return false
}this._backupItem(C);
var E=C.element;
if(G==="childNodes"||G==="text()"){while(E.firstChild){E.removeChild(E.firstChild)
}}else{G=this._getAttribute(E.nodeName,G);
if(G.charAt(0)==="@"){var B=G.substring(1);
E.removeAttribute(B)
}else{for(var D=E.childNodes.length-1;
D>=0;
D--){var F=E.childNodes[D];
if(F.nodeType===1&&F.nodeName===G){E.removeChild(F)
}}}}return true
},save:function(C){if(!C){C={}
}for(var D=0;
D<this._modifiedItems.length;
D++){this._saveItem(this._modifiedItems[D],C,"PUT")
}for(var D=0;
D<this._newItems.length;
D++){var B=this._newItems[D];
if(B.element.parentNode){this._newItems.splice(D,1);
D--;
continue
}this._saveItem(this._newItems[D],C,"POST")
}for(var D=0;
D<this._deletedItems.length;
D++){this._saveItem(this._deletedItems[D],C,"DELETE")
}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);
console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);
console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);
this._newItems=[];
this._restoreItems(this._deletedItems);
this._deletedItems=[];
this._restoreItems(this._modifiedItems);
this._modifiedItems=[];
return true
},isDirty:function(B){if(B){var C=this._getRootElement(B.element);
return(this._getItemIndex(this._newItems,C)>=0||this._getItemIndex(this._deletedItems,C)>=0||this._getItemIndex(this._modifiedItems,C)>=0)
}else{return(this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0)
}},_saveItem:function(E,H,C){if(C==="PUT"){url=this._getPutUrl(E)
}else{if(C==="DELETE"){url=this._getDeleteUrl(E)
}else{url=this._getPostUrl(E)
}}if(!url){if(H.onError){H.onError.call(B,new Error("No URL for saving content: "+postContent))
}return 
}var F={url:url,method:(C||"POST"),contentType:"text/xml",handleAs:"xml"};
var D;
if(C==="PUT"){F.putData=this._getPutContent(E);
saveHandler=A.rawXhrPut(F)
}else{if(C==="DELETE"){saveHandler=A.xhrDelete(F)
}else{F.postData=this._getPostContent(E);
saveHandler=A.rawXhrPost(F)
}}var B=(H.scope||A.global);
var G=this;
saveHandler.addCallback(function(I){G._forgetItem(E);
if(H.onComplete){H.onComplete.call(B)
}});
saveHandler.addErrback(function(I){if(H.onError){H.onError.call(B,I)
}})
},_getPostUrl:function(B){return this._url
},_getPutUrl:function(B){return this._url
},_getDeleteUrl:function(D){if(!this._url){return this._url
}var C=this._url;
if(D&&this._keyAttribute){var B=this.getValue(D,this._keyAttribute);
if(B){C=C+"?"+this._keyAttribute+"="+B
}}return C
},_getPostContent:function(D){var C=D.element;
var B='<?xml version="1.0"?>';
return B+dojox.data.dom.innerXML(C)
},_getPutContent:function(D){var C=D.element;
var B='<?xml version="1.0"?>';
return B+dojox.data.dom.innerXML(C)
},_getAttribute:function(D,E){if(this._attributeMap){var C=D+"."+E;
var B=this._attributeMap[C];
if(B){E=B
}else{B=this._attributeMap[E];
if(B){E=B
}}}return E
},_getItem:function(B){return new dojox.data.XmlItem(B,this)
},_getItemIndex:function(C,B){for(var D=0;
D<C.length;
D++){if(C[D].element===B){return D
}}return -1
},_backupItem:function(B){var C=this._getRootElement(B.element);
if(this._getItemIndex(this._newItems,C)>=0||this._getItemIndex(this._modifiedItems,C)>=0){return 
}if(C!=B.element){B=this._getItem(C)
}B._backup=C.cloneNode(true);
this._modifiedItems.push(B)
},_restoreItems:function(B){A.forEach(B,function(C){if(C._backup){C.element=C._backup;
C._backup=null
}},this)
},_forgetItem:function(B){var D=B.element;
var C=this._getItemIndex(this._newItems,D);
if(C>=0){this._newItems.splice(C,1)
}C=this._getItemIndex(this._deletedItems,D);
if(C>=0){this._deletedItems.splice(C,1)
}C=this._getItemIndex(this._modifiedItems,D);
if(C>=0){this._modifiedItems.splice(C,1)
}},_getDocument:function(B){if(B){return B.ownerDocument
}else{if(!this._document){return dojox.data.dom.createDocument()
}}},_getRootElement:function(B){while(B.parentNode){B=B.parentNode
}return B
}});
A.declare("dojox.data.XmlItem",null,{constructor:function(B,C){this.element=B;
this.store=C
},toString:function(){var B="";
if(this.element){for(var C=0;
C<this.element.childNodes.length;
C++){var D=this.element.childNodes[C];
if(D.nodeType===3){B=D.nodeValue;
break
}}}return B
}});
A.extend(dojox.data.XmlStore,A.data.util.simpleFetch)
}}});