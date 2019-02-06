if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo._gearsObject=function(){var D;
var A;
var C=dojo.getObject("google.gears");
if(C){return C
}if(typeof GearsFactory!="undefined"){D=new GearsFactory()
}else{if(dojo.isIE){try{D=new ActiveXObject("Gears.Factory")
}catch(B){}}else{if(navigator.mimeTypes["application/x-googlegears"]){D=document.createElement("object");
D.setAttribute("type","application/x-googlegears");
D.setAttribute("width",0);
D.setAttribute("height",0);
D.style.display="none";
document.documentElement.appendChild(D)
}}}if(!D){return null
}dojo.setObject("google.gears.factory",D);
return dojo.getObject("google.gears")
};
dojo.isGears=(!!dojo._gearsObject())||0;
dojo.doc=window.document||null;
dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0]
};
dojo.setContext=function(A,B){dojo.global=A;
dojo.doc=B
};
dojo._fireCallback=function(B,C,A){if(C&&dojo.isString(B)){B=C[B]
}return(C?B.apply(C,A||[]):B())
};
dojo.withGlobal=function(D,C,G,B){var A;
var E=dojo.global;
var F=dojo.doc;
try{dojo.setContext(D,D.document);
A=dojo._fireCallback(C,G,B)
}finally{dojo.setContext(E,F)
}return A
};
dojo.withDoc=function(F,E,B,D){var C;
var A=dojo.doc;
try{dojo.doc=F;
C=dojo._fireCallback(E,B,D)
}finally{dojo.doc=A
}return C
};
(function(){var B=djConfig.modulePaths;
if(B){for(var A in B){dojo.registerModulePath(A,B[A])
}}})()
};