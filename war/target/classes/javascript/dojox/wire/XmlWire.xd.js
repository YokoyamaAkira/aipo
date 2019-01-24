dojo._xdResourceLoaded({depends:[["provide","dojox.wire.XmlWire"],["require","dojox.data.dom"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.XmlWire"]){A._hasResource["dojox.wire.XmlWire"]=true;
A.provide("dojox.wire.XmlWire");
A.require("dojox.data.dom");
A.require("dojox.wire.Wire");
A.declare("dojox.wire.XmlWire",dojox.wire.Wire,{_wireClass:"dojox.wire.XmlWire",constructor:function(B){},_getValue:function(B){if(!B||!this.path){return B
}var E=B;
var H=this.path;
if(H.charAt(0)=="/"){var C=H.indexOf("/",1);
H=H.substring(C+1)
}var G=H.split("/");
var D=G.length-1;
for(var C=0;
C<D;
C++){E=this._getChildNode(E,G[C]);
if(!E){return undefined
}}var F=this._getNodeValue(E,G[D]);
return F
},_setValue:function(E,I){if(!this.path){return E
}var D=E;
var H=this._getDocument(D);
var K=this.path;
if(K.charAt(0)=="/"){var F=K.indexOf("/",1);
if(!D){var B=K.substring(1,F);
D=H.createElement(B);
E=D
}K=K.substring(F+1)
}else{if(!D){return undefined
}}var G=K.split("/");
var J=G.length-1;
for(var F=0;
F<J;
F++){var C=this._getChildNode(D,G[F]);
if(!C){C=H.createElement(G[F]);
D.appendChild(C)
}D=C
}this._setNodeValue(D,G[J],I);
return E
},_getNodeValue:function(D,G){var E=undefined;
if(G.charAt(0)=="@"){var C=G.substring(1);
E=D.getAttribute(C)
}else{if(G=="text()"){var F=D.firstChild;
if(F){E=F.nodeValue
}}else{E=[];
for(var B=0;
B<D.childNodes.length;
B++){var H=D.childNodes[B];
if(H.nodeType===1&&H.nodeName==G){E.push(H)
}}}}return E
},_setNodeValue:function(C,F,D){if(F.charAt(0)=="@"){var B=F.substring(1);
if(D){C.setAttribute(B,D)
}else{C.removeAttribute(B)
}}else{if(F=="text()"){while(C.firstChild){C.removeChild(C.firstChild)
}if(D){var E=this._getDocument(C).createTextNode(D);
C.appendChild(E)
}}}},_getChildNode:function(H,C){var B=1;
var G=C.indexOf("[");
if(G>=0){var E=C.indexOf("]");
B=C.substring(G+1,E);
C=C.substring(0,G)
}var F=1;
for(var D=0;
D<H.childNodes.length;
D++){var I=H.childNodes[D];
if(I.nodeType===1&&I.nodeName==C){if(F==B){return I
}F++
}}return null
},_getDocument:function(B){if(B){return(B.nodeType==9?B:B.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
}}});