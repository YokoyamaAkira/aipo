dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.util"],["require","dojox.data.dom"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.util"]){A._hasResource["dojox.wire.ml.util"]=true;
A.provide("dojox.wire.ml.util");
A.require("dojox.data.dom");
A.require("dojox.wire.Wire");
dojox.wire.ml._getValue=function(B,D){if(!B){return undefined
}var F=undefined;
if(D&&B.length>=9&&B.substring(0,9)=="arguments"){F=B.substring(9);
return new dojox.wire.Wire({property:F}).getValue(D)
}var E=B.indexOf(".");
if(E>=0){F=B.substring(E+1);
B=B.substring(0,E)
}var C=(dijit.byId(B)||A.byId(B)||A.getObject(B));
if(!C){return undefined
}if(!F){return C
}else{return new dojox.wire.Wire({object:C,property:F}).getValue()
}};
dojox.wire.ml._setValue=function(B,F){if(!B){return 
}var D=B.indexOf(".");
if(D<0){return 
}var C=this._getValue(B.substring(0,D));
if(!C){return 
}var E=B.substring(D+1);
new dojox.wire.Wire({object:C,property:E}).setValue(F)
};
A.declare("dojox.wire.ml.XmlElement",null,{constructor:function(B){if(A.isString(B)){B=this._getDocument().createElement(B)
}this.element=B
},getPropertyValue:function(E){var D=undefined;
if(!this.element){return D
}if(!E){return D
}if(E.charAt(0)=="@"){var H=E.substring(1);
D=this.element.getAttribute(H)
}else{if(E=="text()"){var F=this.element.firstChild;
if(F){D=F.nodeValue
}}else{var C=[];
for(var G=0;
G<this.element.childNodes.length;
G++){var B=this.element.childNodes[G];
if(B.nodeType===1&&B.nodeName==E){C.push(new dojox.wire.ml.XmlElement(B))
}}if(C.length>0){if(C.length===1){D=C[0]
}else{D=C
}}}}return D
},setPropertyValue:function(C,I){if(!this.element){return 
}if(!C){return 
}if(C.charAt(0)=="@"){var G=C.substring(1);
if(I){this.element.setAttribute(G,I)
}else{this.element.removeAttribute(G)
}}else{if(C=="text()"){while(this.element.firstChild){this.element.removeChild(this.element.firstChild)
}if(I){var E=this._getDocument().createTextNode(I);
this.element.appendChild(E)
}}else{var H=null;
for(var F=this.element.childNodes.length-1;
F>=0;
F--){var B=this.element.childNodes[F];
if(B.nodeType===1&&B.nodeName==C){if(!H){H=B.nextSibling
}this.element.removeChild(B)
}}if(I){if(A.isArray(I)){for(var F in I){var D=I[F];
if(D.element){this.element.insertBefore(D.element,H)
}}}else{if(I instanceof dojox.wire.ml.XmlElement){if(I.element){this.element.insertBefore(I.element,H)
}}else{var B=this._getDocument().createElement(C);
var E=this._getDocument().createTextNode(I);
B.appendChild(E);
this.element.insertBefore(B,H)
}}}}}},toString:function(){var C="";
if(this.element){var B=this.element.firstChild;
if(B){C=B.nodeValue
}}return C
},toObject:function(){if(!this.element){return null
}var I="";
var F={};
var J=0;
for(var G=0;
G<this.element.childNodes.length;
G++){var C=this.element.childNodes[G];
if(C.nodeType===1){J++;
var D=new dojox.wire.ml.XmlElement(C).toObject();
var K=C.nodeName;
var B=F[K];
if(!B){F[K]=D
}else{if(A.isArray(B)){B.push(D)
}else{F[K]=[B,D]
}}}else{if(C.nodeType===3||C.nodeType===4){I+=C.nodeValue
}}}var E=0;
if(this.element.nodeType===1){E=this.element.attributes.length;
for(var G=0;
G<E;
G++){var H=this.element.attributes[G];
F["@"+H.nodeName]=H.nodeValue
}}if(J===0){if(E===0){return I
}F["text()"]=I
}return F
},_getDocument:function(){if(this.element){return(this.element.nodeType==9?this.element:this.element.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
}}});