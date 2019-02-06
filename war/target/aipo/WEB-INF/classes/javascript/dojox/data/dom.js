if(!dojo._hasResource["dojox.data.dom"]){dojo._hasResource["dojox.data.dom"]=true;
dojo.provide("dojox.data.dom");
dojo.experimental("dojox.data.dom");
dojox.data.dom.createDocument=function(B,C){var D=dojo.doc;
if(!C){C="text/xml"
}if(B&&(typeof dojo.global.DOMParser)!=="undefined"){var G=new DOMParser();
return G.parseFromString(B,C)
}else{if((typeof dojo.global.ActiveXObject)!=="undefined"){var I=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var J=0;
J<I.length;
J++){try{var E=new ActiveXObject(I[J]+".XMLDOM");
if(B){if(E){E.async=false;
E.loadXML(B);
return E
}else{console.log("loadXML didn't work?")
}}else{if(E){return E
}}}catch(A){}}}else{if((D.implementation)&&(D.implementation.createDocument)){if(B){if(D.createElement){var H=D.createElement("xml");
H.innerHTML=B;
var F=D.implementation.createDocument("foo","",null);
for(var J=0;
J<H.childNodes.length;
J++){F.importNode(H.childNodes.item(J),true)
}return F
}}else{return D.implementation.createDocument("","",null)
}}}}return null
};
dojox.data.dom.textContent=function(C,D){if(arguments.length>1){var E=C.ownerDocument||dojo.doc;
dojox.data.dom.replaceChildren(C,E.createTextNode(D));
return D
}else{if(C.textContent!==undefined){return C.textContent
}var B="";
if(C==null){return B
}for(var A=0;
A<C.childNodes.length;
A++){switch(C.childNodes[A].nodeType){case 1:case 5:B+=dojox.data.dom.textContent(C.childNodes[A]);
break;
case 3:case 2:case 4:B+=C.childNodes[A].nodeValue;
break;
default:break
}}return B
}};
dojox.data.dom.replaceChildren=function(B,C){var D=[];
if(dojo.isIE){for(var A=0;
A<B.childNodes.length;
A++){D.push(B.childNodes[A])
}}dojox.data.dom.removeChildren(B);
for(var A=0;
A<D.length;
A++){dojo._destroyElement(D[A])
}if(!dojo.isArray(C)){B.appendChild(C)
}else{for(var A=0;
A<C.length;
A++){B.appendChild(C[A])
}}};
dojox.data.dom.removeChildren=function(A){var B=A.childNodes.length;
while(A.hasChildNodes()){A.removeChild(A.firstChild)
}return B
};
dojox.data.dom.innerXML=function(A){if(A.innerXML){return A.innerXML
}else{if(A.xml){return A.xml
}else{if(typeof XMLSerializer!="undefined"){return(new XMLSerializer()).serializeToString(A)
}}}}
};