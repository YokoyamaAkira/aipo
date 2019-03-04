dojo._xdResourceLoaded({depends:[["provide","dojox.wire.ml.util"],["require","dojox.data.dom"],["require","dojox.wire.Wire"]],defineResource:function(A){if(!A._hasResource["dojox.wire.ml.util"]){A._hasResource["dojox.wire.ml.util"]=true;
A.provide("dojox.wire.ml.util");
A.require("dojox.data.dom");
A.require("dojox.wire.Wire");
dojox.wire.ml._getValue=function(F,C){if(!F){return undefined
}var E=undefined;
if(C&&F.length>=9&&F.substring(0,9)=="arguments"){E=F.substring(9);
return new dojox.wire.Wire({property:E}).getValue(C)
}var D=F.indexOf(".");
if(D>=0){E=F.substring(D+1);
F=F.substring(0,D)
}var B=(dijit.byId(F)||A.byId(F)||A.getObject(F));
if(!B){return undefined
}if(!E){return B
}else{return new dojox.wire.Wire({object:B,property:E}).getValue()
}};
dojox.wire.ml._setValue=function(F,E){if(!F){return 
}var C=F.indexOf(".");
if(C<0){return 
}var B=this._getValue(F.substring(0,C));
if(!B){return 
}var D=F.substring(C+1);
new dojox.wire.Wire({object:B,property:D}).setValue(E)
};
A.declare("dojox.wire.ml.XmlElement",null,{constructor:function(B){if(A.isString(B)){B=this._getDocument().createElement(B)
}this.element=B
},getPropertyValue:function(F){var E=undefined;
if(!this.element){return E
}if(!F){return E
}if(F.charAt(0)=="@"){var C=F.substring(1);
E=this.element.getAttribute(C)
}else{if(F=="text()"){var G=this.element.firstChild;
if(G){E=G.nodeValue
}}else{var D=[];
for(var B=0;
B<this.element.childNodes.length;
B++){var H=this.element.childNodes[B];
if(H.nodeType===1&&H.nodeName==F){D.push(new dojox.wire.ml.XmlElement(H))
}}if(D.length>0){if(D.length===1){E=D[0]
}else{E=D
}}}}return E
},setPropertyValue:function(F,E){if(!this.element){return 
}if(!F){return 
}if(F.charAt(0)=="@"){var C=F.substring(1);
if(E){this.element.setAttribute(C,E)
}else{this.element.removeAttribute(C)
}}else{if(F=="text()"){while(this.element.firstChild){this.element.removeChild(this.element.firstChild)
}if(E){var H=this._getDocument().createTextNode(E);
this.element.appendChild(H)
}}else{var D=null;
for(var B=this.element.childNodes.length-1;
B>=0;
B--){var I=this.element.childNodes[B];
if(I.nodeType===1&&I.nodeName==F){if(!D){D=I.nextSibling
}this.element.removeChild(I)
}}if(E){if(A.isArray(E)){for(var B in E){var G=E[B];
if(G.element){this.element.insertBefore(G.element,D)
}}}else{if(E instanceof dojox.wire.ml.XmlElement){if(E.element){this.element.insertBefore(E.element,D)
}}else{var I=this._getDocument().createElement(F);
var H=this._getDocument().createTextNode(E);
I.appendChild(H);
this.element.insertBefore(I,D)
}}}}}},toString:function(){var B="";
if(this.element){var C=this.element.firstChild;
if(C){B=C.nodeValue
}}return B
},toObject:function(){if(!this.element){return null
}var K="";
var H={};
var B=0;
for(var I=0;
I<this.element.childNodes.length;
I++){var E=this.element.childNodes[I];
if(E.nodeType===1){B++;
var F=new dojox.wire.ml.XmlElement(E).toObject();
var C=E.nodeName;
var D=H[C];
if(!D){H[C]=F
}else{if(A.isArray(D)){D.push(F)
}else{H[C]=[D,F]
}}}else{if(E.nodeType===3||E.nodeType===4){K+=E.nodeValue
}}}var G=0;
if(this.element.nodeType===1){G=this.element.attributes.length;
for(var I=0;
I<G;
I++){var J=this.element.attributes[I];
H["@"+J.nodeName]=J.nodeValue
}}if(B===0){if(G===0){return K
}H["text()"]=K
}return H
},_getDocument:function(){if(this.element){return(this.element.nodeType==9?this.element:this.element.ownerDocument)
}else{return dojox.data.dom.createDocument()
}}})
}}});