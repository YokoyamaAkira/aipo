dojo._xdResourceLoaded({depends:[["provide","dojox.data.dom"]],defineResource:function(A){if(!A._hasResource["dojox.data.dom"]){A._hasResource["dojox.data.dom"]=true;
A.provide("dojox.data.dom");
A.experimental("dojox.data.dom");
dojox.data.dom.createDocument=function(E,F){var G=A.doc;
if(!F){F="text/xml"
}if(E&&(typeof A.global.DOMParser)!=="undefined"){var J=new DOMParser();
return J.parseFromString(E,F)
}else{if((typeof A.global.ActiveXObject)!=="undefined"){var B=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var C=0;
C<B.length;
C++){try{var H=new ActiveXObject(B[C]+".XMLDOM");
if(E){if(H){H.async=false;
H.loadXML(E);
return H
}else{console.log("loadXML didn't work?")
}}else{if(H){return H
}}}catch(D){}}}else{if((G.implementation)&&(G.implementation.createDocument)){if(E){if(G.createElement){var K=G.createElement("xml");
K.innerHTML=E;
var I=G.implementation.createDocument("foo","",null);
for(var C=0;
C<K.childNodes.length;
C++){I.importNode(K.childNodes.item(C),true)
}return I
}}else{return G.implementation.createDocument("","",null)
}}}}return null
};
dojox.data.dom.textContent=function(F,B){if(arguments.length>1){var C=F.ownerDocument||A.doc;
dojox.data.dom.replaceChildren(F,C.createTextNode(B));
return B
}else{if(F.textContent!==undefined){return F.textContent
}var E="";
if(F==null){return E
}for(var D=0;
D<F.childNodes.length;
D++){switch(F.childNodes[D].nodeType){case 1:case 5:E+=dojox.data.dom.textContent(F.childNodes[D]);
break;
case 3:case 2:case 4:E+=F.childNodes[D].nodeValue;
break;
default:break
}}return E
}};
dojox.data.dom.replaceChildren=function(E,B){var C=[];
if(A.isIE){for(var D=0;
D<E.childNodes.length;
D++){C.push(E.childNodes[D])
}}dojox.data.dom.removeChildren(E);
for(var D=0;
D<C.length;
D++){A._destroyElement(C[D])
}if(!A.isArray(B)){E.appendChild(B)
}else{for(var D=0;
D<B.length;
D++){E.appendChild(B[D])
}}};
dojox.data.dom.removeChildren=function(B){var C=B.childNodes.length;
while(B.hasChildNodes()){B.removeChild(B.firstChild)
}return C
};
dojox.data.dom.innerXML=function(B){if(B.innerXML){return B.innerXML
}else{if(B.xml){return B.xml
}else{if(typeof XMLSerializer!="undefined"){return(new XMLSerializer()).serializeToString(B)
}}}}
}}});