if(!dojo._hasResource["dojox.wire.XmlWire"]){dojo._hasResource["dojox.wire.XmlWire"]=true;
dojo.provide("dojox.wire.XmlWire");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire.Wire");
dojo.declare("dojox.wire.XmlWire",dojox.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(A){},_getValue:function(A){if(!A||!this.path){return A
}var D=A;
var G=this.path;
if(G.charAt(0)=="/"){var B=G.indexOf("/",1);
G=G.substring(B+1)
}var F=G.split("/");
var C=F.length-1;
for(var B=0;
B<C;
B++){D=this._getChildNode(D,F[B]);
if(!D){return undefined
}}var E=this._getNodeValue(D,F[C]);
return E
},_setValue:function(D,H){if(!this.path){return D
}var C=D;
var G=this._getDocument(C);
var J=this.path;
if(J.charAt(0)=="/"){var E=J.indexOf("/",1);
if(!C){var A=J.substring(1,E);
C=G.createElement(A);
D=C
}J=J.substring(E+1)
}else{if(!C){return undefined
}}var F=J.split("/");
var I=F.length-1;
for(var E=0;
E<I;
E++){var B=this._getChildNode(C,F[E]);
if(!B){B=G.createElement(F[E]);
C.appendChild(B)
}C=B
}this._setNodeValue(C,F[I],H);
return D
},_getNodeValue:function(C,F){var D=undefined;
if(F.charAt(0)=="@"){var B=F.substring(1);
D=C.getAttribute(B)
}else{if(F=="text()"){var E=C.firstChild;
if(E){D=E.nodeValue
}}else{D=[];
for(var A=0;
A<C.childNodes.length;
A++){var G=C.childNodes[A];
if(G.nodeType===1&&G.nodeName==F){D.push(G)
}}}}return D
},_setNodeValue:function(B,E,C){if(E.charAt(0)=="@"){var A=E.substring(1);
if(C){B.setAttribute(A,C)
}else{B.removeAttribute(A)
}}else{if(E=="text()"){while(B.firstChild){B.removeChild(B.firstChild)
}if(C){var D=this._getDocument(B).createTextNode(C);
B.appendChild(D)
}}}},_getChildNode:function(G,B){var A=1;
var F=B.indexOf("[");
if(F>=0){var D=B.indexOf("]");
A=B.substring(F+1,D);
B=B.substring(0,F)
}var E=1;
for(var C=0;
C<G.childNodes.length;
C++){var H=G.childNodes[C];
if(H.nodeType===1&&H.nodeName==B){if(E==A){return H
}E++
}}return null
},_getDocument:function(A){if(A){return(A.nodeType==9?A:A.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
};