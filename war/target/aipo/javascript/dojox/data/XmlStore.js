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
},getValue:function(G,F,A){var D=G.element;
if(F==="tagName"){return D.nodeName
}else{if(F==="childNodes"){for(var C=0;
C<D.childNodes.length;
C++){var E=D.childNodes[C];
if(E.nodeType===1){return this._getItem(E)
}}return A
}else{if(F==="text()"){for(var C=0;
C<D.childNodes.length;
C++){var E=D.childNodes[C];
if(E.nodeType===3||E.nodeType===4){return E.nodeValue
}}return A
}else{F=this._getAttribute(D.nodeName,F);
if(F.charAt(0)==="@"){var B=F.substring(1);
var H=D.getAttribute(B);
return(H!==undefined)?H:A
}else{for(var C=0;
C<D.childNodes.length;
C++){var E=D.childNodes[C];
if(E.nodeType===1&&E.nodeName===F){return this._getItem(E)
}}return A
}}}}},getValues:function(G,F){var D=G.element;
if(F==="tagName"){return[D.nodeName]
}else{if(F==="childNodes"){var A=[];
for(var C=0;
C<D.childNodes.length;
C++){var E=D.childNodes[C];
if(E.nodeType===1){A.push(this._getItem(E))
}}return A
}else{if(F==="text()"){var A=[];
for(var C=0;
C<D.childNodes.length;
C++){var E=childNodes[C];
if(E.nodeType===3){A.push(E.nodeValue)
}}return A
}else{F=this._getAttribute(D.nodeName,F);
if(F.charAt(0)==="@"){var B=F.substring(1);
var H=D.getAttribute(B);
return(H!==undefined)?[H]:[]
}else{var A=[];
for(var C=0;
C<D.childNodes.length;
C++){var E=D.childNodes[C];
if(E.nodeType===1&&E.nodeName===F){A.push(this._getItem(E))
}}return A
}}}}},getAttributes:function(K){var E=K.element;
var D=[];
D.push("tagName");
if(E.childNodes.length>0){var G={};
var I=true;
var J=false;
for(var F=0;
F<E.childNodes.length;
F++){var C=E.childNodes[F];
if(C.nodeType===1){var A=C.nodeName;
if(!G[A]){D.push(A);
G[A]=A
}I=true
}else{if(C.nodeType===3){J=true
}}}if(I){D.push("childNodes")
}if(J){D.push("text()")
}}for(var F=0;
F<E.attributes.length;
F++){D.push("@"+E.attributes[F].nodeName)
}if(this._attributeMap){for(var H in this._attributeMap){var F=H.indexOf(".");
if(F>0){var B=H.substring(0,F);
if(B===E.nodeName){D.push(H.substring(F+1))
}}else{D.push(H)
}}}return D
},hasAttribute:function(B,A){return(this.getValue(B,A)!==undefined)
},containsValue:function(D,C,E){var A=this.getValues(D,C);
for(var B=0;
B<A.length;
B++){if((typeof E==="string")){if(A[B].toString&&A[B].toString()===E){return true
}}else{if(A[B]===E){return true
}}}return false
},isItem:function(A){if(A&&A.element&&A.store&&A.store===this){return true
}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){},getFeatures:function(){var A={"dojo.data.api.Read":true,"dojo.data.api.Write":true};
return A
},getLabel:function(B){if(this._labelAttr&&this.isItem(B)){var A=this.getValue(B,this._labelAttr);
if(A){return A.toString()
}}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(E,H,B){var C=this._getFetchUrl(E);
console.log("XmlStore._fetchItems(): url="+C);
if(!C){B(new Error("No URL specified."));
return 
}var G=(!this._sendQuery?E:null);
var A=this;
var F={url:C,handleAs:"xml",preventCache:true};
var D=dojo.xhrGet(F);
D.addCallback(function(J){var I=A._getItems(J,G);
console.log("XmlStore._fetchItems(): length="+(I?I.length:0));
if(I&&I.length>0){H(I,E)
}else{H([],E)
}});
D.addErrback(function(I){B(I,E)
})
},_getFetchUrl:function(C){if(!this._sendQuery){return this._url
}var E=C.query;
if(!E){return this._url
}if(dojo.isString(E)){return this._url+E
}var F="";
for(var B in E){var D=E[B];
if(D){if(F){F+="&"
}F+=(B+"="+D)
}}if(!F){return this._url
}var A=this._url;
if(A.indexOf("?")<0){A+="?"
}else{A+="&"
}return A+F
},_getItems:function(J,E){var I=null;
if(E){I=E.query
}var H=[];
var A=null;
if(this._rootItem){A=J.getElementsByTagName(this._rootItem)
}else{A=J.documentElement.childNodes
}for(var F=0;
F<A.length;
F++){var C=A[F];
if(C.nodeType!=1){continue
}var O=this._getItem(C);
if(I){var P=true;
var G=E.queryOptions?E.queryOptions.ignoreCase:false;
var M={};
for(var L in I){var K=I[L];
if(typeof K==="string"){M[L]=dojo.data.util.filter.patternToRegExp(K,G)
}}for(var B in I){var K=this.getValue(O,B);
if(K){var D=I[B];
if((typeof K)==="string"&&(M[B])){if((K.match(M[B]))!==null){continue
}}else{if((typeof K)==="object"){if(K.toString&&(M[B])){var N=K.toString();
if((N.match(M[B]))!==null){continue
}}else{if(D==="*"||D===K){continue
}}}}}P=false;
break
}if(!P){continue
}}H.push(O)
}dojo.forEach(H,function(Q){Q.element.parentNode.removeChild(Q.element)
},this);
return H
},close:function(A){},newItem:function(I){console.log("XmlStore.newItem()");
I=(I||{});
var D=I.tagName;
if(!D){D=this._rootItem;
if(!D){return null
}}var F=this._getDocument();
var E=F.createElement(D);
for(var C in I){if(C==="tagName"){continue
}else{if(C==="text()"){var G=F.createTextNode(I[C]);
E.appendChild(G)
}else{C=this._getAttribute(D,C);
if(C.charAt(0)==="@"){var A=C.substring(1);
E.setAttribute(A,I[C])
}else{var B=F.createElement(C);
var G=F.createTextNode(I[C]);
B.appendChild(G);
E.appendChild(B)
}}}}var H=this._getItem(E);
this._newItems.push(H);
return H
},deleteItem:function(B){console.log("XmlStore.deleteItem()");
var A=B.element;
if(A.parentNode){this._backupItem(B);
A.parentNode.removeChild(A);
return true
}this._forgetItem(B);
this._deletedItems.push(B);
return true
},setValue:function(J,C,H){if(C==="tagName"){return false
}this._backupItem(J);
var E=J.element;
if(C==="childNodes"){var B=H.element;
E.appendChild(B)
}else{if(C==="text()"){while(E.firstChild){E.removeChild(E.firstChild)
}var I=this._getDocument(E).createTextNode(H);
E.appendChild(I)
}else{C=this._getAttribute(E.nodeName,C);
if(C.charAt(0)==="@"){var A=C.substring(1);
E.setAttribute(A,H)
}else{var B=null;
for(var F=0;
F<E.childNodes.length;
F++){var D=E.childNodes[F];
if(D.nodeType===1&&D.nodeName===C){B=D;
break
}}var G=this._getDocument(E);
if(B){while(B.firstChild){B.removeChild(B.firstChild)
}}else{B=G.createElement(C);
E.appendChild(B)
}var I=G.createTextNode(H);
B.appendChild(I)
}}}return true
},setValues:function(K,C,I){if(C==="tagName"){return false
}this._backupItem(K);
var E=K.element;
if(C==="childNodes"){while(E.firstChild){E.removeChild(E.firstChild)
}for(var F=0;
F<I.length;
F++){var B=I[F].element;
E.appendChild(B)
}}else{if(C==="text()"){while(E.firstChild){E.removeChild(E.firstChild)
}var H="";
for(var F=0;
F<I.length;
F++){H+=I[F]
}var J=this._getDocument(E).createTextNode(H);
E.appendChild(J)
}else{C=this._getAttribute(E.nodeName,C);
if(C.charAt(0)==="@"){var A=C.substring(1);
E.setAttribute(A,I[0])
}else{for(var F=E.childNodes.length-1;
F>=0;
F--){var D=E.childNodes[F];
if(D.nodeType===1&&D.nodeName===C){E.removeChild(D)
}}var G=this._getDocument(E);
for(var F=0;
F<I.length;
F++){var B=G.createElement(C);
var J=G.createTextNode(I[F]);
B.appendChild(J);
E.appendChild(B)
}}}}return true
},unsetAttribute:function(F,E){if(E==="tagName"){return false
}this._backupItem(F);
var C=F.element;
if(E==="childNodes"||E==="text()"){while(C.firstChild){C.removeChild(C.firstChild)
}}else{E=this._getAttribute(C.nodeName,E);
if(E.charAt(0)==="@"){var A=E.substring(1);
C.removeAttribute(A)
}else{for(var B=C.childNodes.length-1;
B>=0;
B--){var D=C.childNodes[B];
if(D.nodeType===1&&D.nodeName===E){C.removeChild(D)
}}}}return true
},save:function(A){if(!A){A={}
}for(var B=0;
B<this._modifiedItems.length;
B++){this._saveItem(this._modifiedItems[B],A,"PUT")
}for(var B=0;
B<this._newItems.length;
B++){var C=this._newItems[B];
if(C.element.parentNode){this._newItems.splice(B,1);
B--;
continue
}this._saveItem(this._newItems[B],A,"POST")
}for(var B=0;
B<this._deletedItems.length;
B++){this._saveItem(this._deletedItems[B],A,"DELETE")
}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);
console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);
console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);
this._newItems=[];
this._restoreItems(this._deletedItems);
this._deletedItems=[];
this._restoreItems(this._modifiedItems);
this._modifiedItems=[];
return true
},isDirty:function(B){if(B){var A=this._getRootElement(B.element);
return(this._getItemIndex(this._newItems,A)>=0||this._getItemIndex(this._deletedItems,A)>=0||this._getItemIndex(this._modifiedItems,A)>=0)
}else{return(this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0)
}},_saveItem:function(E,B,G){if(G==="PUT"){url=this._getPutUrl(E)
}else{if(G==="DELETE"){url=this._getDeleteUrl(E)
}else{url=this._getPostUrl(E)
}}if(!url){if(B.onError){B.onError.call(C,new Error("No URL for saving content: "+postContent))
}return 
}var F={url:url,method:(G||"POST"),contentType:"text/xml",handleAs:"xml"};
var D;
if(G==="PUT"){F.putData=this._getPutContent(E);
saveHandler=dojo.rawXhrPut(F)
}else{if(G==="DELETE"){saveHandler=dojo.xhrDelete(F)
}else{F.postData=this._getPostContent(E);
saveHandler=dojo.rawXhrPost(F)
}}var C=(B.scope||dojo.global);
var A=this;
saveHandler.addCallback(function(H){A._forgetItem(E);
if(B.onComplete){B.onComplete.call(C)
}});
saveHandler.addErrback(function(H){if(B.onError){B.onError.call(C,H)
}})
},_getPostUrl:function(A){return this._url
},_getPutUrl:function(A){return this._url
},_getDeleteUrl:function(B){if(!this._url){return this._url
}var A=this._url;
if(B&&this._keyAttribute){var C=this.getValue(B,this._keyAttribute);
if(C){A=A+"?"+this._keyAttribute+"="+C
}}return A
},_getPostContent:function(B){var A=B.element;
var C='<?xml version="1.0"?>';
return C+dojox.data.dom.innerXML(A)
},_getPutContent:function(B){var A=B.element;
var C='<?xml version="1.0"?>';
return C+dojox.data.dom.innerXML(A)
},_getAttribute:function(B,C){if(this._attributeMap){var A=B+"."+C;
var D=this._attributeMap[A];
if(D){C=D
}else{D=this._attributeMap[C];
if(D){C=D
}}}return C
},_getItem:function(A){return new dojox.data.XmlItem(A,this)
},_getItemIndex:function(A,C){for(var B=0;
B<A.length;
B++){if(A[B].element===C){return B
}}return -1
},_backupItem:function(B){var A=this._getRootElement(B.element);
if(this._getItemIndex(this._newItems,A)>=0||this._getItemIndex(this._modifiedItems,A)>=0){return 
}if(A!=B.element){B=this._getItem(A)
}B._backup=A.cloneNode(true);
this._modifiedItems.push(B)
},_restoreItems:function(A){dojo.forEach(A,function(B){if(B._backup){B.element=B._backup;
B._backup=null
}},this)
},_forgetItem:function(C){var B=C.element;
var A=this._getItemIndex(this._newItems,B);
if(A>=0){this._newItems.splice(A,1)
}A=this._getItemIndex(this._deletedItems,B);
if(A>=0){this._deletedItems.splice(A,1)
}A=this._getItemIndex(this._modifiedItems,B);
if(A>=0){this._modifiedItems.splice(A,1)
}},_getDocument:function(A){if(A){return A.ownerDocument
}else{if(!this._document){return dojox.data.dom.createDocument()
}}},_getRootElement:function(A){while(A.parentNode){A=A.parentNode
}return A
}});
dojo.declare("dojox.data.XmlItem",null,{constructor:function(B,A){this.element=B;
this.store=A
},toString:function(){var C="";
if(this.element){for(var A=0;
A<this.element.childNodes.length;
A++){var B=this.element.childNodes[A];
if(B.nodeType===3){C=B.nodeValue;
break
}}}return C
}});
dojo.extend(dojox.data.XmlStore,dojo.data.util.simpleFetch)
};