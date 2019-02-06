if(!dojo._hasResource["dijit._editor.selection"]){dojo._hasResource["dijit._editor.selection"]=true;
dojo.provide("dijit._editor.selection");
dojo.mixin(dijit._editor.selection,{getType:function(){if(dojo.doc.selection){return dojo.doc.selection.type.toLowerCase()
}else{var A="text";
var D;
try{D=dojo.global.getSelection()
}catch(B){}if(D&&D.rangeCount==1){var C=D.getRangeAt(0);
if((C.startContainer==C.endContainer)&&((C.endOffset-C.startOffset)==1)&&(C.startContainer.nodeType!=3)){A="control"
}}return A
}},getSelectedText:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().text
}else{var A=dojo.global.getSelection();
if(A){return A.toString()
}}},getSelectedHtml:function(){if(dojo.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return dojo.doc.selection.createRange().htmlText
}else{var C=dojo.global.getSelection();
if(C&&C.rangeCount){var B=C.getRangeAt(0).cloneContents();
var A=document.createElement("div");
A.appendChild(B);
return A.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(dojo.doc.selection){var B=dojo.doc.selection.createRange();
if(B&&B.item){return dojo.doc.selection.createRange().item(0)
}}else{var A=dojo.global.getSelection();
return A.anchorNode.childNodes[A.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var B=this.getSelectedElement();
if(B){return B.parentNode
}}else{if(dojo.doc.selection){return dojo.doc.selection.createRange().parentElement()
}else{var C=dojo.global.getSelection();
if(C){var A=C.anchorNode;
while(A&&(A.nodeType!=1)){A=A.parentNode
}return A
}}}},hasAncestorElement:function(A){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(B){var A=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(A,arguments)
},isTag:function(C,E){if(C&&C.tagName){var D=C.tagName.toLowerCase();
for(var A=0;
A<E.length;
A++){var B=String(E[A]).toLowerCase();
if(D==B){return B
}}}return""
},getParentOfType:function(A,B){while(A){if(this.isTag(A,B).length){return A
}A=A.parentNode
}return null
},remove:function(){var A=dojo.doc.selection;
if(A){if(A.type.toLowerCase()!="none"){A.clear()
}return A
}else{A=dojo.global.getSelection();
A.deleteFromDocument();
return A
}},selectElementChildren:function(C,B){var E=dojo.global;
var F=dojo.doc;
C=dojo.byId(C);
if(F.selection&&dojo.body().createTextRange){var A=C.ownerDocument.body.createTextRange();
A.moveToElementText(C);
if(!B){A.select()
}}else{if(E.getSelection){var D=E.getSelection();
if(D.setBaseAndExtent){D.setBaseAndExtent(C,0,C,C.innerText.length-1)
}else{if(D.selectAllChildren){D.selectAllChildren(C)
}}}}},selectElement:function(C,B){var F=dojo.doc;
C=dojo.byId(C);
if(F.selection&&dojo.body().createTextRange){try{var A=dojo.body().createControlRange();
A.addElement(C);
if(!B){A.select()
}}catch(E){this.selectElementChildren(C,B)
}}else{if(dojo.global.getSelection){var D=dojo.global.getSelection();
if(D.removeAllRanges){var A=F.createRange();
A.selectNode(C);
D.removeAllRanges();
D.addRange(A)
}}}}})
};