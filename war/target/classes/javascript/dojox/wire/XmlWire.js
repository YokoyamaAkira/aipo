if(!dojo._hasResource["dojox.wire.XmlWire"]){dojo._hasResource["dojox.wire.XmlWire"]=true;
dojo.provide("dojox.wire.XmlWire");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.XmlWire",dojox.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(A){},_getValue:function(E){if(!E||!this.path){return E
}var A=E;
var D=this.path;
if(D.charAt(0)=="/"){var F=D.indexOf("/",1);
D=D.substring(F+1)
}var C=D.split("/");
var G=C.length-1;
for(var F=0;
F<G;
F++){A=this._getChildNode(A,C[F]);
if(!A){return undefined
}}var B=this._getNodeValue(A,C[G]);
return B
},_setValue:function(J,D){if(!this.path){return J
}var I=J;
var C=this._getDocument(I);
var F=this.path;
if(F.charAt(0)=="/"){var A=F.indexOf("/",1);
if(!I){var G=F.substring(1,A);
I=C.createElement(G);
J=I
}F=F.substring(A+1)
}else{if(!I){return undefined
}}var B=F.split("/");
var E=B.length-1;
for(var A=0;
A<E;
A++){var H=this._getChildNode(I,B[A]);
if(!H){H=C.createElement(B[A]);
I.appendChild(H)
}I=H
}this._setNodeValue(I,B[E],D);
return J
},_getNodeValue:function(G,C){var A=undefined;
if(C.charAt(0)=="@"){var F=C.substring(1);
A=G.getAttribute(F)
}else{if(C=="text()"){var B=G.firstChild;
if(B){A=B.nodeValue
}}else{A=[];
for(var E=0;
E<G.childNodes.length;
E++){var D=G.childNodes[E];
if(D.nodeType===1&&D.nodeName==C){A.push(D)
}}}}return A
},_setNodeValue:function(A,D,B){if(D.charAt(0)=="@"){var E=D.substring(1);
if(B){A.setAttribute(E,B)
}else{A.removeAttribute(E)
}}else{if(D=="text()"){while(A.firstChild){A.removeChild(A.firstChild)
}if(B){var C=this._getDocument(A).createTextNode(B);
A.appendChild(C)
}}}},_getChildNode:function(B,E){var D=1;
var A=E.indexOf("[");
if(A>=0){var G=E.indexOf("]");
D=E.substring(A+1,G);
E=E.substring(0,A)
}var H=1;
for(var F=0;
F<B.childNodes.length;
F++){var C=B.childNodes[F];
if(C.nodeType===1&&C.nodeName==E){if(H==D){return C
}H++
}}return null
},_getDocument:function(A){if(A){return(A.nodeType==9?A:A.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
};