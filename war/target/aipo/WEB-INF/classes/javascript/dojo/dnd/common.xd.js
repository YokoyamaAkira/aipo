dojo._xdResourceLoaded({depends:[["provide","dojo.dnd.common"]],defineResource:function(A){if(!A._hasResource["dojo.dnd.common"]){A._hasResource["dojo.dnd.common"]=true;
A.provide("dojo.dnd.common");
A.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
A.dnd.getCopyKeyState=function(B){return B[A.dnd._copyKey]
};
A.dnd._uniqueId=0;
A.dnd.getUniqueId=function(){var B;
do{B="dojoUnique"+(++A.dnd._uniqueId)
}while(A.byId(B));
return B
};
A.dnd._empty={};
A.dnd.isFormElement=function(B){var C=B.target;
if(C.nodeType==3){C=C.parentNode
}return" button textarea input select option ".indexOf(" "+C.tagName.toLowerCase()+" ")>=0
}
}}});