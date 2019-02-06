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
},getValue:function(H,G,B){var E=H.element;
if(G==="tagName"){return E.nodeName
}else{if(G==="childNodes"){for(var D=0;
D<E.childNodes.length;
D++){var F=E.childNodes[D];
if(F.nodeType===1){return this._getItem(F)
}}return B
}else{if(G==="text()"){for(var D=0;
D<E.childNodes.length;
D++){var F=E.childNodes[D];
if(F.nodeType===3||F.nodeType===4){return F.nodeValue
}}return B
}else{G=this._getAttribute(E.nodeName,G);
if(G.charAt(0)==="@"){var C=G.substring(1);
var I=E.getAttribute(C);
return(I!==undefined)?I:B
}else{for(var D=0;
D<E.childNodes.length;
D++){var F=E.childNodes[D];
if(F.nodeType===1&&F.nodeName===G){return this._getItem(F)
}}return B
}}}}},getValues:function(H,G){var E=H.element;
if(G==="tagName"){return[E.nodeName]
}else{if(G==="childNodes"){var B=[];
for(var D=0;
D<E.childNodes.length;
D++){var F=E.childNodes[D];
if(F.nodeType===1){B.push(this._getItem(F))
}}return B
}else{if(G==="text()"){var B=[];
for(var D=0;
D<E.childNodes.length;
D++){var F=childNodes[D];
if(F.nodeType===3){B.push(F.nodeValue)
}}return B
}else{G=this._getAttribute(E.nodeName,G);
if(G.charAt(0)==="@"){var C=G.substring(1);
var I=E.getAttribute(C);
return(I!==undefined)?[I]:[]
}else{var B=[];
for(var D=0;
D<E.childNodes.length;
D++){var F=E.childNodes[D];
if(F.nodeType===1&&F.nodeName===G){B.push(this._getItem(F))
}}return B
}}}}},getAttributes:function(L){var F=L.element;
var E=[];
E.push("tagName");
if(F.childNodes.length>0){var H={};
var J=true;
var K=false;
for(var G=0;
G<F.childNodes.length;
G++){var D=F.childNodes[G];
if(D.nodeType===1){var B=D.nodeName;
if(!H[B]){E.push(B);
H[B]=B
}J=true
}else{if(D.nodeType===3){K=true
}}}if(J){E.push("childNodes")
}if(K){E.push("text()")
}}for(var G=0;
G<F.attributes.length;
G++){E.push("@"+F.attributes[G].nodeName)
}if(this._attributeMap){for(var I in this._attributeMap){var G=I.indexOf(".");
if(G>0){var C=I.substring(0,G);
if(C===F.nodeName){E.push(I.substring(G+1))
}}else{E.push(I)
}}}return E
},hasAttribute:function(C,B){return(this.getValue(C,B)!==undefined)
},containsValue:function(E,D,F){var B=this.getValues(E,D);
for(var C=0;
C<B.length;
C++){if((typeof F==="string")){if(B[C].toString&&B[C].toString()===F){return true
}}else{if(B[C]===F){return true
}}}return false
},isItem:function(B){if(B&&B.element&&B.store&&B.store===this){return true
}return false
},isItemLoaded:function(B){return this.isItem(B)
},loadItem:function(B){},getFeatures:function(){var B={"dojo.data.api.Read":true,"dojo.data.api.Write":true};
return B
},getLabel:function(C){if(this._labelAttr&&this.isItem(C)){var B=this.getValue(C,this._labelAttr);
if(B){return B.toString()
}}return undefined
},getLabelAttributes:function(B){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(F,I,C){var D=this._getFetchUrl(F);
console.log("XmlStore._fetchItems(): url="+D);
if(!D){C(new Error("No URL specified."));
return 
}var H=(!this._sendQuery?F:null);
var B=this;
var G={url:D,handleAs:"xml",preventCache:true};
var E=A.xhrGet(G);
E.addCallback(function(K){var J=B._getItems(K,H);
console.log("XmlStore._fetchItems(): length="+(J?J.length:0));
if(J&&J.length>0){I(J,F)
}else{I([],F)
}});
E.addErrback(function(J){C(J,F)
})
},_getFetchUrl:function(D){if(!this._sendQuery){return this._url
}var F=D.query;
if(!F){return this._url
}if(A.isString(F)){return this._url+F
}var G="";
for(var C in F){var E=F[C];
if(E){if(G){G+="&"
}G+=(C+"="+E)
}}if(!G){return this._url
}var B=this._url;
if(B.indexOf("?")<0){B+="?"
}else{B+="&"
}return B+G
},_getItems:function(K,F){var J=null;
if(F){J=F.query
}var I=[];
var B=null;
if(this._rootItem){B=K.getElementsByTagName(this._rootItem)
}else{B=K.documentElement.childNodes
}for(var G=0;
G<B.length;
G++){var D=B[G];
if(D.nodeType!=1){continue
}var P=this._getItem(D);
if(J){var Q=true;
var H=F.queryOptions?F.queryOptions.ignoreCase:false;
var N={};
for(var M in J){var L=J[M];
if(typeof L==="string"){N[M]=A.data.util.filter.patternToRegExp(L,H)
}}for(var C in J){var L=this.getValue(P,C);
if(L){var E=J[C];
if((typeof L)==="string"&&(N[C])){if((L.match(N[C]))!==null){continue
}}else{if((typeof L)==="object"){if(L.toString&&(N[C])){var O=L.toString();
if((O.match(N[C]))!==null){continue
}}else{if(E==="*"||E===L){continue
}}}}}Q=false;
break
}if(!Q){continue
}}I.push(P)
}A.forEach(I,function(R){R.element.parentNode.removeChild(R.element)
},this);
return I
},close:function(B){},newItem:function(J){console.log("XmlStore.newItem()");
J=(J||{});
var E=J.tagName;
if(!E){E=this._rootItem;
if(!E){return null
}}var G=this._getDocument();
var F=G.createElement(E);
for(var D in J){if(D==="tagName"){continue
}else{if(D==="text()"){var H=G.createTextNode(J[D]);
F.appendChild(H)
}else{D=this._getAttribute(E,D);
if(D.charAt(0)==="@"){var B=D.substring(1);
F.setAttribute(B,J[D])
}else{var C=G.createElement(D);
var H=G.createTextNode(J[D]);
C.appendChild(H);
F.appendChild(C)
}}}}var I=this._getItem(F);
this._newItems.push(I);
return I
},deleteItem:function(C){console.log("XmlStore.deleteItem()");
var B=C.element;
if(B.parentNode){this._backupItem(C);
B.parentNode.removeChild(B);
return true
}this._forgetItem(C);
this._deletedItems.push(C);
return true
},setValue:function(K,D,I){if(D==="tagName"){return false
}this._backupItem(K);
var F=K.element;
if(D==="childNodes"){var C=I.element;
F.appendChild(C)
}else{if(D==="text()"){while(F.firstChild){F.removeChild(F.firstChild)
}var J=this._getDocument(F).createTextNode(I);
F.appendChild(J)
}else{D=this._getAttribute(F.nodeName,D);
if(D.charAt(0)==="@"){var B=D.substring(1);
F.setAttribute(B,I)
}else{var C=null;
for(var G=0;
G<F.childNodes.length;
G++){var E=F.childNodes[G];
if(E.nodeType===1&&E.nodeName===D){C=E;
break
}}var H=this._getDocument(F);
if(C){while(C.firstChild){C.removeChild(C.firstChild)
}}else{C=H.createElement(D);
F.appendChild(C)
}var J=H.createTextNode(I);
C.appendChild(J)
}}}return true
},setValues:function(L,D,J){if(D==="tagName"){return false
}this._backupItem(L);
var F=L.element;
if(D==="childNodes"){while(F.firstChild){F.removeChild(F.firstChild)
}for(var G=0;
G<J.length;
G++){var C=J[G].element;
F.appendChild(C)
}}else{if(D==="text()"){while(F.firstChild){F.removeChild(F.firstChild)
}var I="";
for(var G=0;
G<J.length;
G++){I+=J[G]
}var K=this._getDocument(F).createTextNode(I);
F.appendChild(K)
}else{D=this._getAttribute(F.nodeName,D);
if(D.charAt(0)==="@"){var B=D.substring(1);
F.setAttribute(B,J[0])
}else{for(var G=F.childNodes.length-1;
G>=0;
G--){var E=F.childNodes[G];
if(E.nodeType===1&&E.nodeName===D){F.removeChild(E)
}}var H=this._getDocument(F);
for(var G=0;
G<J.length;
G++){var C=H.createElement(D);
var K=H.createTextNode(J[G]);
C.appendChild(K);
F.appendChild(C)
}}}}return true
},unsetAttribute:function(G,F){if(F==="tagName"){return false
}this._backupItem(G);
var D=G.element;
if(F==="childNodes"||F==="text()"){while(D.firstChild){D.removeChild(D.firstChild)
}}else{F=this._getAttribute(D.nodeName,F);
if(F.charAt(0)==="@"){var B=F.substring(1);
D.removeAttribute(B)
}else{for(var C=D.childNodes.length-1;
C>=0;
C--){var E=D.childNodes[C];
if(E.nodeType===1&&E.nodeName===F){D.removeChild(E)
}}}}return true
},save:function(B){if(!B){B={}
}for(var C=0;
C<this._modifiedItems.length;
C++){this._saveItem(this._modifiedItems[C],B,"PUT")
}for(var C=0;
C<this._newItems.length;
C++){var D=this._newItems[C];
if(D.element.parentNode){this._newItems.splice(C,1);
C--;
continue
}this._saveItem(this._newItems[C],B,"POST")
}for(var C=0;
C<this._deletedItems.length;
C++){this._saveItem(this._deletedItems[C],B,"DELETE")
}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);
console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);
console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);
this._newItems=[];
this._restoreItems(this._deletedItems);
this._deletedItems=[];
this._restoreItems(this._modifiedItems);
this._modifiedItems=[];
return true
},isDirty:function(C){if(C){var B=this._getRootElement(C.element);
return(this._getItemIndex(this._newItems,B)>=0||this._getItemIndex(this._deletedItems,B)>=0||this._getItemIndex(this._modifiedItems,B)>=0)
}else{return(this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0)
}},_saveItem:function(F,C,H){if(H==="PUT"){url=this._getPutUrl(F)
}else{if(H==="DELETE"){url=this._getDeleteUrl(F)
}else{url=this._getPostUrl(F)
}}if(!url){if(C.onError){C.onError.call(D,new Error("No URL for saving content: "+postContent))
}return 
}var G={url:url,method:(H||"POST"),contentType:"text/xml",handleAs:"xml"};
var E;
if(H==="PUT"){G.putData=this._getPutContent(F);
saveHandler=A.rawXhrPut(G)
}else{if(H==="DELETE"){saveHandler=A.xhrDelete(G)
}else{G.postData=this._getPostContent(F);
saveHandler=A.rawXhrPost(G)
}}var D=(C.scope||A.global);
var B=this;
saveHandler.addCallback(function(I){B._forgetItem(F);
if(C.onComplete){C.onComplete.call(D)
}});
saveHandler.addErrback(function(I){if(C.onError){C.onError.call(D,I)
}})
},_getPostUrl:function(B){return this._url
},_getPutUrl:function(B){return this._url
},_getDeleteUrl:function(C){if(!this._url){return this._url
}var B=this._url;
if(C&&this._keyAttribute){var D=this.getValue(C,this._keyAttribute);
if(D){B=B+"?"+this._keyAttribute+"="+D
}}return B
},_getPostContent:function(C){var B=C.element;
var D='<?xml version="1.0"?>';
return D+dojox.data.dom.innerXML(B)
},_getPutContent:function(C){var B=C.element;
var D='<?xml version="1.0"?>';
return D+dojox.data.dom.innerXML(B)
},_getAttribute:function(C,D){if(this._attributeMap){var B=C+"."+D;
var E=this._attributeMap[B];
if(E){D=E
}else{E=this._attributeMap[D];
if(E){D=E
}}}return D
},_getItem:function(B){return new dojox.data.XmlItem(B,this)
},_getItemIndex:function(B,D){for(var C=0;
C<B.length;
C++){if(B[C].element===D){return C
}}return -1
},_backupItem:function(C){var B=this._getRootElement(C.element);
if(this._getItemIndex(this._newItems,B)>=0||this._getItemIndex(this._modifiedItems,B)>=0){return 
}if(B!=C.element){C=this._getItem(B)
}C._backup=B.cloneNode(true);
this._modifiedItems.push(C)
},_restoreItems:function(B){A.forEach(B,function(C){if(C._backup){C.element=C._backup;
C._backup=null
}},this)
},_forgetItem:function(D){var C=D.element;
var B=this._getItemIndex(this._newItems,C);
if(B>=0){this._newItems.splice(B,1)
}B=this._getItemIndex(this._deletedItems,C);
if(B>=0){this._deletedItems.splice(B,1)
}B=this._getItemIndex(this._modifiedItems,C);
if(B>=0){this._modifiedItems.splice(B,1)
}},_getDocument:function(B){if(B){return B.ownerDocument
}else{if(!this._document){return dojox.data.dom.createDocument()
}}},_getRootElement:function(B){while(B.parentNode){B=B.parentNode
}return B
}});
A.declare("dojox.data.XmlItem",null,{constructor:function(C,B){this.element=C;
this.store=B
},toString:function(){var D="";
if(this.element){for(var B=0;
B<this.element.childNodes.length;
B++){var C=this.element.childNodes[B];
if(C.nodeType===3){D=C.nodeValue;
break
}}}return D
}});
A.extend(dojox.data.XmlStore,A.data.util.simpleFetch)
}}});