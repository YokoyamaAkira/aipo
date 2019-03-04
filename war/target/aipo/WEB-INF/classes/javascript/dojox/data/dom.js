if(!dojo._hasResource["dojox.data.dom"]){dojo._hasResource["dojox.data.dom"]=true;
dojo.provide("dojox.data.dom");
dojo.experimental("dojox.data.dom");
dojox.data.dom.createDocument=function(F,G){var H=dojo.doc;
if(!G){G="text/xml"
}if(F&&(typeof dojo.global.DOMParser)!=="undefined"){var A=new DOMParser();
return A.parseFromString(F,G)
}else{if((typeof dojo.global.ActiveXObject)!=="undefined"){var C=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var D=0;
D<C.length;
D++){try{var I=new ActiveXObject(C[D]+".XMLDOM");
if(F){if(I){I.async=false;
I.loadXML(F);
return I
}else{console.log("loadXML didn't work?")
}}else{if(I){return I
}}}catch(E){}}}else{if((H.implementation)&&(H.implementation.createDocument)){if(F){if(H.createElement){var B=H.createElement("xml");
B.innerHTML=F;
var J=H.implementation.createDocument("foo","",null);
for(var D=0;
D<B.childNodes.length;
D++){J.importNode(B.childNodes.item(D),true)
}return J
}}else{return H.implementation.createDocument("","",null)
}}}}return null
};
dojox.data.dom.textContent=function(D,E){if(arguments.length>1){var A=D.ownerDocument||dojo.doc;
dojox.data.dom.replaceChildren(D,A.createTextNode(E));
return E
}else{if(D.textContent!==undefined){return D.textContent
}var C="";
if(D==null){return C
}for(var B=0;
B<D.childNodes.length;
B++){switch(D.childNodes[B].nodeType){case 1:case 5:C+=dojox.data.dom.textContent(D.childNodes[B]);
break;
case 3:case 2:case 4:C+=D.childNodes[B].nodeValue;
break;
default:break
}}return C
}};
dojox.data.dom.replaceChildren=function(C,D){var A=[];
if(dojo.isIE){for(var B=0;
B<C.childNodes.length;
B++){A.push(C.childNodes[B])
}}dojox.data.dom.removeChildren(C);
for(var B=0;
B<A.length;
B++){dojo._destroyElement(A[B])
}if(!dojo.isArray(D)){C.appendChild(D)
}else{for(var B=0;
B<D.length;
B++){C.appendChild(D[B])
}}};
dojox.data.dom.removeChildren=function(B){var A=B.childNodes.length;
while(B.hasChildNodes()){B.removeChild(B.firstChild)
}return A
};
dojox.data.dom.innerXML=function(A){if(A.innerXML){return A.innerXML
}else{if(A.xml){return A.xml
}else{if(typeof XMLSerializer!="undefined"){return(new XMLSerializer()).serializeToString(A)
}}}}
};