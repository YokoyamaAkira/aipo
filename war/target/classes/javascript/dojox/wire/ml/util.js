if(!dojo._hasResource["dojox.wire.ml.util"]){dojo._hasResource["dojox.wire.ml.util"]=true;
dojo.provide("dojox.wire.ml.util");
dojo.require("dojox.data.dom");
dojo.require("dojox.wire.Wire");
dojox.wire.ml._getValue=function(D,A){if(!D){return undefined
}var C=undefined;
if(A&&D.length>=9&&D.substring(0,9)=="arguments"){C=D.substring(9);
return new dojox.wire.Wire({property:C}).getValue(A)
}var B=D.indexOf(".");
if(B>=0){C=D.substring(B+1);
D=D.substring(0,B)
}var E=(dijit.byId(D)||dojo.byId(D)||dojo.getObject(D));
if(!E){return undefined
}if(!C){return E
}else{return new dojox.wire.Wire({object:E,property:C}).getValue()
}};
dojox.wire.ml._setValue=function(D,C){if(!D){return 
}var A=D.indexOf(".");
if(A<0){return 
}var E=this._getValue(D.substring(0,A));
if(!E){return 
}var B=D.substring(A+1);
new dojox.wire.Wire({object:E,property:B}).setValue(C)
};
dojo.declare("dojox.wire.ml.XmlElement",null,{constructor:function(A){if(dojo.isString(A)){A=this._getDocument().createElement(A)
}this.element=A
},getPropertyValue:function(B){var A=undefined;
if(!this.element){return A
}if(!B){return A
}if(B.charAt(0)=="@"){var F=B.substring(1);
A=this.element.getAttribute(F)
}else{if(B=="text()"){var C=this.element.firstChild;
if(C){A=C.nodeValue
}}else{var G=[];
for(var E=0;
E<this.element.childNodes.length;
E++){var D=this.element.childNodes[E];
if(D.nodeType===1&&D.nodeName==B){G.push(new dojox.wire.ml.XmlElement(D))
}}if(G.length>0){if(G.length===1){A=G[0]
}else{A=G
}}}}return A
},setPropertyValue:function(H,G){if(!this.element){return 
}if(!H){return 
}if(H.charAt(0)=="@"){var E=H.substring(1);
if(G){this.element.setAttribute(E,G)
}else{this.element.removeAttribute(E)
}}else{if(H=="text()"){while(this.element.firstChild){this.element.removeChild(this.element.firstChild)
}if(G){var B=this._getDocument().createTextNode(G);
this.element.appendChild(B)
}}else{var F=null;
for(var D=this.element.childNodes.length-1;
D>=0;
D--){var C=this.element.childNodes[D];
if(C.nodeType===1&&C.nodeName==H){if(!F){F=C.nextSibling
}this.element.removeChild(C)
}}if(G){if(dojo.isArray(G)){for(var D in G){var A=G[D];
if(A.element){this.element.insertBefore(A.element,F)
}}}else{if(G instanceof dojox.wire.ml.XmlElement){if(G.element){this.element.insertBefore(G.element,F)
}}else{var C=this._getDocument().createElement(H);
var B=this._getDocument().createTextNode(G);
C.appendChild(B);
this.element.insertBefore(C,F)
}}}}}},toString:function(){var B="";
if(this.element){var A=this.element.firstChild;
if(A){B=A.nodeValue
}}return B
},toObject:function(){if(!this.element){return null
}var F="";
var C={};
var G=0;
for(var D=0;
D<this.element.childNodes.length;
D++){var J=this.element.childNodes[D];
if(J.nodeType===1){G++;
var A=new dojox.wire.ml.XmlElement(J).toObject();
var H=J.nodeName;
var I=C[H];
if(!I){C[H]=A
}else{if(dojo.isArray(I)){I.push(A)
}else{C[H]=[I,A]
}}}else{if(J.nodeType===3||J.nodeType===4){F+=J.nodeValue
}}}var B=0;
if(this.element.nodeType===1){B=this.element.attributes.length;
for(var D=0;
D<B;
D++){var E=this.element.attributes[D];
C["@"+E.nodeName]=E.nodeValue
}}if(G===0){if(B===0){return F
}C["text()"]=F
}return C
},_getDocument:function(){if(this.element){return(this.element.nodeType==9?this.element:this.element.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
};