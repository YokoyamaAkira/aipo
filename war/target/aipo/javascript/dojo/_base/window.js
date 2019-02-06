if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo._gearsObject=function(){var A;
var B;
var D=dojo.getObject("google.gears");
if(D){return D
}if(typeof GearsFactory!="undefined"){A=new GearsFactory()
}else{if(dojo.isIE){try{A=new ActiveXObject("Gears.Factory")
}catch(C){}}else{if(navigator.mimeTypes["application/x-googlegears"]){A=document.createElement("object");
A.setAttribute("type","application/x-googlegears");
A.setAttribute("width",0);
A.setAttribute("height",0);
A.style.display="none";
document.documentElement.appendChild(A)
}}}if(!A){return null
}dojo.setObject("google.gears.factory",A);
return dojo.getObject("google.gears")
};
dojo.isGears=(!!dojo._gearsObject())||0;
dojo.doc=window.document||null;
dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0]
};
dojo.setContext=function(B,A){dojo.global=B;
dojo.doc=A
};
dojo._fireCallback=function(C,A,B){if(A&&dojo.isString(C)){C=A[C]
}return(A?C.apply(A,B||[]):C())
};
dojo.withGlobal=function(G,F,C,E){var D;
var A=dojo.global;
var B=dojo.doc;
try{dojo.setContext(G,G.document);
D=dojo._fireCallback(F,C,E)
}finally{dojo.setContext(A,B)
}return D
};
dojo.withDoc=function(A,F,C,E){var D;
var B=dojo.doc;
try{dojo.doc=A;
D=dojo._fireCallback(F,C,E)
}finally{dojo.doc=B
}return D
};
(function(){var A=djConfig.modulePaths;
if(A){for(var B in A){dojo.registerModulePath(B,A[B])
}}})()
};