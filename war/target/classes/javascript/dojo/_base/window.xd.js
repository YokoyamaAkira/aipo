dojo._xdResourceLoaded({depends:[["provide","dojo._base.window"]],defineResource:function(A){if(!A._hasResource["dojo._base.window"]){A._hasResource["dojo._base.window"]=true;
A.provide("dojo._base.window");
A._gearsObject=function(){var B;
var C;
var E=A.getObject("google.gears");
if(E){return E
}if(typeof GearsFactory!="undefined"){B=new GearsFactory()
}else{if(A.isIE){try{B=new ActiveXObject("Gears.Factory")
}catch(D){}}else{if(navigator.mimeTypes["application/x-googlegears"]){B=document.createElement("object");
B.setAttribute("type","application/x-googlegears");
B.setAttribute("width",0);
B.setAttribute("height",0);
B.style.display="none";
document.documentElement.appendChild(B)
}}}if(!B){return null
}A.setObject("google.gears.factory",B);
return A.getObject("google.gears")
};
A.isGears=(!!A._gearsObject())||0;
A.doc=window.document||null;
A.body=function(){return A.doc.body||A.doc.getElementsByTagName("body")[0]
};
A.setContext=function(C,B){A.global=C;
A.doc=B
};
A._fireCallback=function(D,B,C){if(B&&A.isString(D)){D=B[D]
}return(B?D.apply(B,C||[]):D())
};
A.withGlobal=function(H,G,D,F){var E;
var B=A.global;
var C=A.doc;
try{A.setContext(H,H.document);
E=A._fireCallback(G,D,F)
}finally{A.setContext(B,C)
}return E
};
A.withDoc=function(B,G,D,F){var E;
var C=A.doc;
try{A.doc=B;
E=A._fireCallback(G,D,F)
}finally{A.doc=C
}return E
};
(function(){var B=djConfig.modulePaths;
if(B){for(var C in B){A.registerModulePath(C,B[C])
}}})()
}}});