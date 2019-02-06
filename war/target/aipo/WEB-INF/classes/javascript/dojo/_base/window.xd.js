dojo._xdResourceLoaded({depends:[["provide","dojo._base.window"]],defineResource:function(A){if(!A._hasResource["dojo._base.window"]){A._hasResource["dojo._base.window"]=true;
A.provide("dojo._base.window");
A._gearsObject=function(){var C;
var D;
var B=A.getObject("google.gears");
if(B){return B
}if(typeof GearsFactory!="undefined"){C=new GearsFactory()
}else{if(A.isIE){try{C=new ActiveXObject("Gears.Factory")
}catch(E){}}else{if(navigator.mimeTypes["application/x-googlegears"]){C=document.createElement("object");
C.setAttribute("type","application/x-googlegears");
C.setAttribute("width",0);
C.setAttribute("height",0);
C.style.display="none";
document.documentElement.appendChild(C)
}}}if(!C){return null
}A.setObject("google.gears.factory",C);
return A.getObject("google.gears")
};
A.isGears=(!!A._gearsObject())||0;
A.doc=window.document||null;
A.body=function(){return A.doc.body||A.doc.getElementsByTagName("body")[0]
};
A.setContext=function(B,C){A.global=B;
A.doc=C
};
A._fireCallback=function(B,C,D){if(C&&A.isString(B)){B=C[B]
}return(C?B.apply(C,D||[]):B())
};
A.withGlobal=function(C,F,B,E){var D;
var G=A.global;
var H=A.doc;
try{A.setContext(C,C.document);
D=A._fireCallback(F,B,E)
}finally{A.setContext(G,H)
}return D
};
A.withDoc=function(C,B,E,G){var F;
var D=A.doc;
try{A.doc=C;
F=A._fireCallback(B,E,G)
}finally{A.doc=D
}return F
};
(function(){var C=djConfig.modulePaths;
if(C){for(var B in C){A.registerModulePath(B,C[B])
}}})()
}}});