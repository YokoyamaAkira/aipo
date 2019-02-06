dojo._xdResourceLoaded({depends:[["provide","dijit._editor.selection"]],defineResource:function(A){if(!A._hasResource["dijit._editor.selection"]){A._hasResource["dijit._editor.selection"]=true;
A.provide("dijit._editor.selection");
A.mixin(dijit._editor.selection,{getType:function(){if(A.doc.selection){return A.doc.selection.type.toLowerCase()
}else{var C="text";
var B;
try{B=A.global.getSelection()
}catch(D){}if(B&&B.rangeCount==1){var E=B.getRangeAt(0);
if((E.startContainer==E.endContainer)&&((E.endOffset-E.startOffset)==1)&&(E.startContainer.nodeType!=3)){C="control"
}}return C
}},getSelectedText:function(){if(A.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return A.doc.selection.createRange().text
}else{var B=A.global.getSelection();
if(B){return B.toString()
}}},getSelectedHtml:function(){if(A.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return A.doc.selection.createRange().htmlText
}else{var B=A.global.getSelection();
if(B&&B.rangeCount){var D=B.getRangeAt(0).cloneContents();
var C=document.createElement("div");
C.appendChild(D);
return C.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(A.doc.selection){var B=A.doc.selection.createRange();
if(B&&B.item){return A.doc.selection.createRange().item(0)
}}else{var C=A.global.getSelection();
return C.anchorNode.childNodes[C.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var D=this.getSelectedElement();
if(D){return D.parentNode
}}else{if(A.doc.selection){return A.doc.selection.createRange().parentElement()
}else{var B=A.global.getSelection();
if(B){var C=B.anchorNode;
while(C&&(C.nodeType!=1)){C=C.parentNode
}return C
}}}},hasAncestorElement:function(B){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(B){var C=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(C,arguments)
},isTag:function(E,B){if(E&&E.tagName){var F=E.tagName.toLowerCase();
for(var C=0;
C<B.length;
C++){var D=String(B[C]).toLowerCase();
if(F==D){return D
}}}return""
},getParentOfType:function(C,B){while(C){if(this.isTag(C,B).length){return C
}C=C.parentNode
}return null
},remove:function(){var B=A.doc.selection;
if(B){if(B.type.toLowerCase()!="none"){B.clear()
}return B
}else{B=A.global.getSelection();
B.deleteFromDocument();
return B
}},selectElementChildren:function(E,D){var G=A.global;
var B=A.doc;
E=A.byId(E);
if(B.selection&&A.body().createTextRange){var C=E.ownerDocument.body.createTextRange();
C.moveToElementText(E);
if(!D){C.select()
}}else{if(G.getSelection){var F=G.getSelection();
if(F.setBaseAndExtent){F.setBaseAndExtent(E,0,E,E.innerText.length-1)
}else{if(F.selectAllChildren){F.selectAllChildren(E)
}}}}},selectElement:function(E,D){var B=A.doc;
E=A.byId(E);
if(B.selection&&A.body().createTextRange){try{var C=A.body().createControlRange();
C.addElement(E);
if(!D){C.select()
}}catch(G){this.selectElementChildren(E,D)
}}else{if(A.global.getSelection){var F=A.global.getSelection();
if(F.removeAllRanges){var C=B.createRange();
C.selectNode(E);
F.removeAllRanges();
F.addRange(C)
}}}}})
}}});