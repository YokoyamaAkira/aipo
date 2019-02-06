if(!dojo._hasResource["dojox.data.XmlStore"]){dojo._hasResource["dojox.data.XmlStore"]=true;
dojo.provide("dojox.data.XmlStore");
dojo.provide("dojox.data.XmlItem");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.filter");
dojo.require("dojox.data.dom");
dojo.declare("dojox.data.XmlStore",null,{constructor:function(A){console.log("XmlStore()");
if(A){this._url=A.url;
this._rootItem=(A.rootItem||A.rootitem);
this._keyAttribute=(A.keyAttribute||A.keyattribute);
this._attributeMap=(A.attributeMap||A.attributemap);
this._labelAttr=A.label;
this._sendQuery=(A.sendQuery||A.sendquery)
}this._newItems=[];
this._deletedItems=[];
this._modifiedItems=[]
},getValue:function(B,A,D){var G=B.element;
if(A==="tagName"){return G.nodeName
}else{if(A==="childNodes"){for(var F=0;
F<G.childNodes.length;
F++){var H=G.childNodes[F];
if(H.nodeType===1){return this._getItem(H)
}}return D
}else{if(A==="text()"){for(var F=0;
F<G.childNodes.length;
F++){var H=G.childNodes[F];
if(H.nodeType===3||H.nodeType===4){return H.nodeValue
}}return D
}else{A=this._getAttribute(G.nodeName,A);
if(A.charAt(0)==="@"){var E=A.substring(1);
var C=G.getAttribute(E);
return(C!==undefined)?C:D
}else{for(var F=0;
F<G.childNodes.length;
F++){var H=G.childNodes[F];
if(H.nodeType===1&&H.nodeName===A){return this._getItem(H)
}}return D
}}}}},getValues:function(B,A){var G=B.element;
if(A==="tagName"){return[G.nodeName]
}else{if(A==="childNodes"){var D=[];
for(var F=0;
F<G.childNodes.length;
F++){var H=G.childNodes[F];
if(H.nodeType===1){D.push(this._getItem(H))
}}return D
}else{if(A==="text()"){var D=[];
for(var F=0;
F<G.childNodes.length;
F++){var H=childNodes[F];
if(H.nodeType===3){D.push(H.nodeValue)
}}return D
}else{A=this._getAttribute(G.nodeName,A);
if(A.charAt(0)==="@"){var E=A.substring(1);
var C=G.getAttribute(E);
return(C!==undefined)?[C]:[]
}else{var D=[];
for(var F=0;
F<G.childNodes.length;
F++){var H=G.childNodes[F];
if(H.nodeType===1&&H.nodeName===A){D.push(this._getItem(H))
}}return D
}}}}},getAttributes:function(G){var A=G.element;
var K=[];
K.push("tagName");
if(A.childNodes.length>0){var C={};
var E=true;
var F=false;
for(var B=0;
B<A.childNodes.length;
B++){var J=A.childNodes[B];
if(J.nodeType===1){var H=J.nodeName;
if(!C[H]){K.push(H);
C[H]=H
}E=true
}else{if(J.nodeType===3){F=true
}}}if(E){K.push("childNodes")
}if(F){K.push("text()")
}}for(var B=0;
B<A.attributes.length;
B++){K.push("@"+A.attributes[B].nodeName)
}if(this._attributeMap){for(var D in this._attributeMap){var B=D.indexOf(".");
if(B>0){var I=D.substring(0,B);
if(I===A.nodeName){K.push(D.substring(B+1))
}}else{K.push(D)
}}}return K
},hasAttribute:function(A,B){return(this.getValue(A,B)!==undefined)
},containsValue:function(C,B,D){var E=this.getValues(C,B);
for(var A=0;
A<E.length;
A++){if((typeof D==="string")){if(E[A].toString&&E[A].toString()===D){return true
}}else{if(E[A]===D){return true
}}}return false
},isItem:function(A){if(A&&A.element&&A.store&&A.store===this){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getFeatures:function(){var A={"dojo.data.api.Read":true,"dojo.data.api.Write":true};
return A
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){var B=this.getValue(A,this._labelAttr);
if(B){return B.toString()
}}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(H,C,E){var F=this._getFetchUrl(H);
console.log("XmlStore._fetchItems(): url="+F);
if(!F){E(new Error("No URL specified."));
return 
}var B=(!this._sendQuery?H:null);
var D=this;
var A={url:F,handleAs:"xml",preventCache:true};
var G=dojo.xhrGet(A);
G.addCallback(function(I){var J=D._getItems(I,B);
console.log("XmlStore._fetchItems(): length="+(J?J.length:0));
if(J&&J.length>0){C(J,H)
}else{C([],H)
}});
G.addErrback(function(I){E(I,H)
})
},_getFetchUrl:function(B){if(!this._sendQuery){return this._url
}var D=B.query;
if(!D){return this._url
}if(dojo.isString(D)){return this._url+D
}var E="";
for(var A in D){var C=D[A];
if(C){if(E){E+="&"
}E+=(A+"="+C)
}}if(!E){return this._url
}var F=this._url;
if(F.indexOf("?")<0){F+="?"
}else{F+="&"
}return F+E
},_getItems:function(P,K){var O=null;
if(K){O=K.query
}var N=[];
var G=null;
if(this._rootItem){G=P.getElementsByTagName(this._rootItem)
}else{G=P.documentElement.childNodes
}for(var L=0;
L<G.length;
L++){var I=G[L];
if(I.nodeType!=1){continue
}var E=this._getItem(I);
if(O){var F=true;
var M=K.queryOptions?K.queryOptions.ignoreCase:false;
var C={};
for(var B in O){var A=O[B];
if(typeof A==="string"){C[B]=dojo.data.util.filter.patternToRegExp(A,M)
}}for(var H in O){var A=this.getValue(E,H);
if(A){var J=O[H];
if((typeof A)==="string"&&(C[H])){if((A.match(C[H]))!==null){continue
}}else{if((typeof A)==="object"){if(A.toString&&(C[H])){var D=A.toString();
if((D.match(C[H]))!==null){continue
}}else{if(J==="*"||J===A){continue
}}}}}F=false;
break
}if(!F){continue
}}N.push(E)
}dojo.forEach(N,function(Q){Q.element.parentNode.removeChild(Q.element)
},this);
return N
},close:function(A){},newItem:function(E){console.log("XmlStore.newItem()");
E=(E||{});
var I=E.tagName;
if(!I){I=this._rootItem;
if(!I){return null
}}var B=this._getDocument();
var A=B.createElement(I);
for(var H in E){if(H==="tagName"){continue
}else{if(H==="text()"){var C=B.createTextNode(E[H]);
A.appendChild(C)
}else{H=this._getAttribute(I,H);
if(H.charAt(0)==="@"){var F=H.substring(1);
A.setAttribute(F,E[H])
}else{var G=B.createElement(H);
var C=B.createTextNode(E[H]);
G.appendChild(C);
A.appendChild(G)
}}}}var D=this._getItem(A);
this._newItems.push(D);
return D
},deleteItem:function(A){console.log("XmlStore.deleteItem()");
var B=A.element;
if(B.parentNode){this._backupItem(A);
B.parentNode.removeChild(B);
return true
}this._forgetItem(A);
this._deletedItems.push(A);
return true
},setValue:function(F,I,D){if(I==="tagName"){return false
}this._backupItem(F);
var A=F.element;
if(I==="childNodes"){var H=D.element;
A.appendChild(H)
}else{if(I==="text()"){while(A.firstChild){A.removeChild(A.firstChild)
}var E=this._getDocument(A).createTextNode(D);
A.appendChild(E)
}else{I=this._getAttribute(A.nodeName,I);
if(I.charAt(0)==="@"){var G=I.substring(1);
A.setAttribute(G,D)
}else{var H=null;
for(var B=0;
B<A.childNodes.length;
B++){var J=A.childNodes[B];
if(J.nodeType===1&&J.nodeName===I){H=J;
break
}}var C=this._getDocument(A);
if(H){while(H.firstChild){H.removeChild(H.firstChild)
}}else{H=C.createElement(I);
A.appendChild(H)
}var E=C.createTextNode(D);
H.appendChild(E)
}}}return true
},setValues:function(G,J,E){if(J==="tagName"){return false
}this._backupItem(G);
var A=G.element;
if(J==="childNodes"){while(A.firstChild){A.removeChild(A.firstChild)
}for(var B=0;
B<E.length;
B++){var I=E[B].element;
A.appendChild(I)
}}else{if(J==="text()"){while(A.firstChild){A.removeChild(A.firstChild)
}var D="";
for(var B=0;
B<E.length;
B++){D+=E[B]
}var F=this._getDocument(A).createTextNode(D);
A.appendChild(F)
}else{J=this._getAttribute(A.nodeName,J);
if(J.charAt(0)==="@"){var H=J.substring(1);
A.setAttribute(H,E[0])
}else{for(var B=A.childNodes.length-1;
B>=0;
B--){var K=A.childNodes[B];
if(K.nodeType===1&&K.nodeName===J){A.removeChild(K)
}}var C=this._getDocument(A);
for(var B=0;
B<E.length;
B++){var I=C.createElement(J);
var F=C.createTextNode(E[B]);
I.appendChild(F);
A.appendChild(I)
}}}}return true
},unsetAttribute:function(E,D){if(D==="tagName"){return false
}this._backupItem(E);
var B=E.element;
if(D==="childNodes"||D==="text()"){while(B.firstChild){B.removeChild(B.firstChild)
}}else{D=this._getAttribute(B.nodeName,D);
if(D.charAt(0)==="@"){var F=D.substring(1);
B.removeAttribute(F)
}else{for(var A=B.childNodes.length-1;
A>=0;
A--){var C=B.childNodes[A];
if(C.nodeType===1&&C.nodeName===D){B.removeChild(C)
}}}}return true
},save:function(C){if(!C){C={}
}for(var A=0;
A<this._modifiedItems.length;
A++){this._saveItem(this._modifiedItems[A],C,"PUT")
}for(var A=0;
A<this._newItems.length;
A++){var B=this._newItems[A];
if(B.element.parentNode){this._newItems.splice(A,1);
A--;
continue
}this._saveItem(this._newItems[A],C,"POST")
}for(var A=0;
A<this._deletedItems.length;
A++){this._saveItem(this._deletedItems[A],C,"DELETE")
}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);
console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);
console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);
this._newItems=[];
this._restoreItems(this._deletedItems);
this._deletedItems=[];
this._restoreItems(this._modifiedItems);
this._modifiedItems=[];
return true
},isDirty:function(A){if(A){var B=this._getRootElement(A.element);
return(this._getItemIndex(this._newItems,B)>=0||this._getItemIndex(this._deletedItems,B)>=0||this._getItemIndex(this._modifiedItems,B)>=0)
}else{return(this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0)
}},_saveItem:function(B,F,D){if(D==="PUT"){url=this._getPutUrl(B)
}else{if(D==="DELETE"){url=this._getDeleteUrl(B)
}else{url=this._getPostUrl(B)
}}if(!url){if(F.onError){F.onError.call(G,new Error("No URL for saving content: "+postContent))
}return 
}var C={url:url,method:(D||"POST"),contentType:"text/xml",handleAs:"xml"};
var A;
if(D==="PUT"){C.putData=this._getPutContent(B);
saveHandler=dojo.rawXhrPut(C)
}else{if(D==="DELETE"){saveHandler=dojo.xhrDelete(C)
}else{C.postData=this._getPostContent(B);
saveHandler=dojo.rawXhrPost(C)
}}var G=(F.scope||dojo.global);
var E=this;
saveHandler.addCallback(function(H){E._forgetItem(B);
if(F.onComplete){F.onComplete.call(G)
}});
saveHandler.addErrback(function(H){if(F.onError){F.onError.call(G,H)
}})
},_getPostUrl:function(A){return this._url
},_getPutUrl:function(A){return this._url
},_getDeleteUrl:function(A){if(!this._url){return this._url
}var C=this._url;
if(A&&this._keyAttribute){var B=this.getValue(A,this._keyAttribute);
if(B){C=C+"?"+this._keyAttribute+"="+B
}}return C
},_getPostContent:function(A){var C=A.element;
var B='<?xml version="1.0"?>';
return B+dojox.data.dom.innerXML(C)
},_getPutContent:function(A){var C=A.element;
var B='<?xml version="1.0"?>';
return B+dojox.data.dom.innerXML(C)
},_getAttribute:function(A,B){if(this._attributeMap){var D=A+"."+B;
var C=this._attributeMap[D];
if(C){B=C
}else{C=this._attributeMap[B];
if(C){B=C
}}}return B
},_getItem:function(A){return new dojox.data.XmlItem(A,this)
},_getItemIndex:function(C,B){for(var A=0;
A<C.length;
A++){if(C[A].element===B){return A
}}return -1
},_backupItem:function(A){var B=this._getRootElement(A.element);
if(this._getItemIndex(this._newItems,B)>=0||this._getItemIndex(this._modifiedItems,B)>=0){return 
}if(B!=A.element){A=this._getItem(B)
}A._backup=B.cloneNode(true);
this._modifiedItems.push(A)
},_restoreItems:function(A){dojo.forEach(A,function(B){if(B._backup){B.element=B._backup;
B._backup=null
}},this)
},_forgetItem:function(B){var A=B.element;
var C=this._getItemIndex(this._newItems,A);
if(C>=0){this._newItems.splice(C,1)
}C=this._getItemIndex(this._deletedItems,A);
if(C>=0){this._deletedItems.splice(C,1)
}C=this._getItemIndex(this._modifiedItems,A);
if(C>=0){this._modifiedItems.splice(C,1)
}},_getDocument:function(A){if(A){return A.ownerDocument
}else{if(!this._document){return dojox.data.dom.createDocument()
}}},_getRootElement:function(A){while(A.parentNode){A=A.parentNode
}return A
}});
dojo.declare("dojox.data.XmlItem",null,{constructor:function(A,B){this.element=A;
this.store=B
},toString:function(){var B="";
if(this.element){for(var C=0;
C<this.element.childNodes.length;
C++){var A=this.element.childNodes[C];
if(A.nodeType===3){B=A.nodeValue;
break
}}}return B
}});
dojo.extend(dojox.data.XmlStore,dojo.data.util.simpleFetch)
};