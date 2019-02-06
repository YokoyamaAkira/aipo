dojo._xdResourceLoaded({depends:[["provide","dojox.data.dom"]],defineResource:function(A){if(!A._hasResource["dojox.data.dom"]){A._hasResource["dojox.data.dom"]=true;
A.provide("dojox.data.dom");
A.experimental("dojox.data.dom");
dojox.data.dom.createDocument=function(G,H){var I=A.doc;
if(!H){H="text/xml"
}if(G&&(typeof A.global.DOMParser)!=="undefined"){var B=new DOMParser();
return B.parseFromString(G,H)
}else{if((typeof A.global.ActiveXObject)!=="undefined"){var D=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var E=0;
E<D.length;
E++){try{var J=new ActiveXObject(D[E]+".XMLDOM");
if(G){if(J){J.async=false;
J.loadXML(G);
return J
}else{console.log("loadXML didn't work?")
}}else{if(J){return J
}}}catch(F){}}}else{if((I.implementation)&&(I.implementation.createDocument)){if(G){if(I.createElement){var C=I.createElement("xml");
C.innerHTML=G;
var K=I.implementation.createDocument("foo","",null);
for(var E=0;
E<C.childNodes.length;
E++){K.importNode(C.childNodes.item(E),true)
}return K
}}else{return I.implementation.createDocument("","",null)
}}}}return null
};
dojox.data.dom.textContent=function(E,F){if(arguments.length>1){var B=E.ownerDocument||A.doc;
dojox.data.dom.replaceChildren(E,B.createTextNode(F));
return F
}else{if(E.textContent!==undefined){return E.textContent
}var D="";
if(E==null){return D
}for(var C=0;
C<E.childNodes.length;
C++){switch(E.childNodes[C].nodeType){case 1:case 5:D+=dojox.data.dom.textContent(E.childNodes[C]);
break;
case 3:case 2:case 4:D+=E.childNodes[C].nodeValue;
break;
default:break
}}return D
}};
dojox.data.dom.replaceChildren=function(D,E){var B=[];
if(A.isIE){for(var C=0;
C<D.childNodes.length;
C++){B.push(D.childNodes[C])
}}dojox.data.dom.removeChildren(D);
for(var C=0;
C<B.length;
C++){A._destroyElement(B[C])
}if(!A.isArray(E)){D.appendChild(E)
}else{for(var C=0;
C<E.length;
C++){D.appendChild(E[C])
}}};
dojox.data.dom.removeChildren=function(C){var B=C.childNodes.length;
while(C.hasChildNodes()){C.removeChild(C.firstChild)
}return B
};
dojox.data.dom.innerXML=function(B){if(B.innerXML){return B.innerXML
}else{if(B.xml){return B.xml
}else{if(typeof XMLSerializer!="undefined"){return(new XMLSerializer()).serializeToString(B)
}}}}
}}});