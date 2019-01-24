if(!dojo._hasResource["dojox.wire.ml.util"]){dojo._hasResource["dojox.wire.ml.util"]=true;
dojo.provide("dojox.wire.ml.util");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire.Wire");
dojox.wire.ml._getValue=function(E,B){if(!E){return undefined
}var D=undefined;
if(B&&E.length>=9&&E.substring(0,9)=="arguments"){D=E.substring(9);
return new dojox.wire.Wire({property:D}).getValue(B)
}var C=E.indexOf(".");
if(C>=0){D=E.substring(C+1);
E=E.substring(0,C)
}var A=(dijit.byId(E)||dojo.byId(E)||dojo.getObject(E));
if(!A){return undefined
}if(!D){return A
}else{return new dojox.wire.Wire({object:A,property:D}).getValue()
}};
dojox.wire.ml._setValue=function(E,D){if(!E){return 
}var B=E.indexOf(".");
if(B<0){return 
}var A=this._getValue(E.substring(0,B));
if(!A){return 
}var C=E.substring(B+1);
new dojox.wire.Wire({object:A,property:C}).setValue(D)
};
dojo.declare("dojox.wire.ml.XmlElement",null,{constructor:function(A){if(dojo.isString(A)){A=this._getDocument().createElement(A)
}this.element=A
},getPropertyValue:function(E){var D=undefined;
if(!this.element){return D
}if(!E){return D
}if(E.charAt(0)=="@"){var B=E.substring(1);
D=this.element.getAttribute(B)
}else{if(E=="text()"){var F=this.element.firstChild;
if(F){D=F.nodeValue
}}else{var C=[];
for(var A=0;
A<this.element.childNodes.length;
A++){var G=this.element.childNodes[A];
if(G.nodeType===1&&G.nodeName==E){C.push(new dojox.wire.ml.XmlElement(G))
}}if(C.length>0){if(C.length===1){D=C[0]
}else{D=C
}}}}return D
},setPropertyValue:function(E,D){if(!this.element){return 
}if(!E){return 
}if(E.charAt(0)=="@"){var B=E.substring(1);
if(D){this.element.setAttribute(B,D)
}else{this.element.removeAttribute(B)
}}else{if(E=="text()"){while(this.element.firstChild){this.element.removeChild(this.element.firstChild)
}if(D){var G=this._getDocument().createTextNode(D);
this.element.appendChild(G)
}}else{var C=null;
for(var A=this.element.childNodes.length-1;
A>=0;
A--){var H=this.element.childNodes[A];
if(H.nodeType===1&&H.nodeName==E){if(!C){C=H.nextSibling
}this.element.removeChild(H)
}}if(D){if(dojo.isArray(D)){for(var A in D){var F=D[A];
if(F.element){this.element.insertBefore(F.element,C)
}}}else{if(D instanceof dojox.wire.ml.XmlElement){if(D.element){this.element.insertBefore(D.element,C)
}}else{var H=this._getDocument().createElement(E);
var G=this._getDocument().createTextNode(D);
H.appendChild(G);
this.element.insertBefore(H,C)
}}}}}},toString:function(){var A="";
if(this.element){var B=this.element.firstChild;
if(B){A=B.nodeValue
}}return A
},toObject:function(){if(!this.element){return null
}var J="";
var G={};
var A=0;
for(var H=0;
H<this.element.childNodes.length;
H++){var D=this.element.childNodes[H];
if(D.nodeType===1){A++;
var E=new dojox.wire.ml.XmlElement(D).toObject();
var B=D.nodeName;
var C=G[B];
if(!C){G[B]=E
}else{if(dojo.isArray(C)){C.push(E)
}else{G[B]=[C,E]
}}}else{if(D.nodeType===3||D.nodeType===4){J+=D.nodeValue
}}}var F=0;
if(this.element.nodeType===1){F=this.element.attributes.length;
for(var H=0;
H<F;
H++){var I=this.element.attributes[H];
G["@"+I.nodeName]=I.nodeValue
}}if(A===0){if(F===0){return J
}G["text()"]=J
}return G
},_getDocument:function(){if(this.element){return(this.element.nodeType==9?this.element:this.element.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
};