if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(A){return A[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var A;
do{A="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(A));
return A
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(A){var B=A.target;
if(B.nodeType==3){B=B.parentNode
}return" button textarea input select option ".indexOf(" "+B.tagName.toLowerCase()+" ")>=0
}
};