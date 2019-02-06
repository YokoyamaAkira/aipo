dojo._xdResourceLoaded({depends:[["provide","dojox.wire.XmlWire"],["require","dojox.data.dom"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.XmlWire"]){A._hasResource["dojox.wire.XmlWire"]=true;
A.provide("dojox.wire.XmlWire");
A.require("dojox.data.dom");
A.require("dojox.wire.Wire");
A.declare("dojox.wire.XmlWire",dojox.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(B){},_getValue:function(G){if(!G||!this.path){return G
}var D=G;
var C=this.path;
if(C.charAt(0)=="/"){var H=C.indexOf("/",1);
C=C.substring(H+1)
}var F=C.split("/");
var B=F.length-1;
for(var H=0;
H<B;
H++){D=this._getChildNode(D,F[H]);
if(!D){return undefined
}}var E=this._getNodeValue(D,F[B]);
return E
},_setValue:function(C,G){if(!this.path){return C
}var B=C;
var F=this._getDocument(B);
var I=this.path;
if(I.charAt(0)=="/"){var D=I.indexOf("/",1);
if(!B){var J=I.substring(1,D);
B=F.createElement(J);
C=B
}I=I.substring(D+1)
}else{if(!B){return undefined
}}var E=I.split("/");
var H=E.length-1;
for(var D=0;
D<H;
D++){var K=this._getChildNode(B,E[D]);
if(!K){K=F.createElement(E[D]);
B.appendChild(K)
}B=K
}this._setNodeValue(B,E[H],G);
return C
},_getNodeValue:function(C,F){var D=undefined;
if(F.charAt(0)=="@"){var H=F.substring(1);
D=C.getAttribute(H)
}else{if(F=="text()"){var E=C.firstChild;
if(E){D=E.nodeValue
}}else{D=[];
for(var G=0;
G<C.childNodes.length;
G++){var B=C.childNodes[G];
if(B.nodeType===1&&B.nodeName==F){D.push(B)
}}}}return D
},_setNodeValue:function(D,B,E){if(B.charAt(0)=="@"){var C=B.substring(1);
if(E){D.setAttribute(C,E)
}else{D.removeAttribute(C)
}}else{if(B=="text()"){while(D.firstChild){D.removeChild(D.firstChild)
}if(E){var F=this._getDocument(D).createTextNode(E);
D.appendChild(F)
}}}},_getChildNode:function(E,G){var F=1;
var D=G.indexOf("[");
if(D>=0){var I=G.indexOf("]");
F=G.substring(D+1,I);
G=G.substring(0,D)
}var C=1;
for(var H=0;
H<E.childNodes.length;
H++){var B=E.childNodes[H];
if(B.nodeType===1&&B.nodeName==G){if(C==F){return B
}C++
}}return null
},_getDocument:function(B){if(B){return(B.nodeType==9?B:B.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
}}});