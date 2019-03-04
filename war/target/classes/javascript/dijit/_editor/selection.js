if(!dojo._hasResource["dijit._editor.selection"]){dojo._hasResource["dijit._editor.selection"]=true;
dojo.provide("dijit._editor.selection");
dojo.mixin(dijit._editor.selection,{getType:function(){if(dojo.doc.selection){return dojo.doc.selection.type.toLowerCase()
}else{var B="text";
var A;
try{A=dojo.global.getSelection()
}catch(C){}if(A&&A.rangeCount==1){var D=A.getRangeAt(0);
if((D.startContainer==D.endContainer)&&((D.endOffset-D.startOffset)==1)&&(D.startContainer.nodeType!=3)){B="control"
}}return B
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var A=dojo.global.getSelection();
if(A){return A.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var A=dojo.global.getSelection();
if(A&&A.rangeCount){var C=A.getRangeAt(0).cloneContents();
var B=document.createElement("div");
B.appendChild(C);
return B.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var A=dojo.doc.selection.createRange();
if(A&&A.item){return dojo.doc.selection.createRange().item(0)
}}else{var B=dojo.global.getSelection();
return B.anchorNode.childNodes[B.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var C=this.getSelectedElement();
if(C){return C.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var A=dojo.global.getSelection();
if(A){var B=A.anchorNode;
while(B&&(B.nodeType!=1)){B=B.parentNode
}return B
}}}},hasAncestorElement:function(A){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(A){var B=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(B,arguments)
},isTag:function(D,A){if(D&&D.tagName){var E=D.tagName.toLowerCase();
for(var B=0;
B<A.length;
B++){var C=String(A[B]).toLowerCase();
if(E==C){return C
}}}return""
},getParentOfType:function(B,A){while(B){if(this.isTag(B,A).length){return B
}B=B.parentNode
}return null
},remove:function(){var A=dojo.doc.selection;
if(A){if(A.type.toLowerCase()!="none"){A.clear()
}return A
}else{A=dojo.global.getSelection();
A.deleteFromDocument();
return A
}},selectElementChildren:function(D,C){var F=dojo.global;
var A=dojo.doc;
D=dojo.byId(D);
if(A.selection&&dojo.body().createTextRange){var B=D.ownerDocument.body.createTextRange();
B.moveToElementText(D);
if(!C){B.select()
}}else{if(F.getSelection){var E=F.getSelection();
if(E.setBaseAndExtent){E.setBaseAndExtent(D,0,D,D.innerText.length-1)
}else{if(E.selectAllChildren){E.selectAllChildren(D)
}}}}},selectElement:function(D,C){var A=dojo.doc;
D=dojo.byId(D);
if(A.selection&&dojo.body().createTextRange){try{var B=dojo.body().createControlRange();
B.addElement(D);
if(!C){B.select()
}}catch(F){this.selectElementChildren(D,C)
}}else{if(dojo.global.getSelection){var E=dojo.global.getSelection();
if(E.removeAllRanges){var B=A.createRange();
B.selectNode(D);
E.removeAllRanges();
E.addRange(B)
}}}}})
};