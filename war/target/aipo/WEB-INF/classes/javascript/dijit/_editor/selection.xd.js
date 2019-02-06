dojo._xdResourceLoaded({depends:[["provide","dijit._editor.selection"]],defineResource:function(A){if(!A._hasResource["dijit._editor.selection"]){A._hasResource["dijit._editor.selection"]=true;
A.provide("dijit._editor.selection");
A.mixin(dijit._editor.selection,{getType:function(){if(A.doc.selection){return A.doc.selection.type.toLowerCase()
}else{var D="text";
var C;
try{C=A.global.getSelection()
}catch(E){}if(C&&C.rangeCount==1){var B=C.getRangeAt(0);
if((B.startContainer==B.endContainer)&&((B.endOffset-B.startOffset)==1)&&(B.startContainer.nodeType!=3)){D="control"
}}return D
}},getSelectedText:function(){if(A.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return A.doc.selection.createRange().text
}else{var B=A.global.getSelection();
if(B){return B.toString()
}}},getSelectedHtml:function(){if(A.doc.selection){if(dijit._editor.selection.getType()=="control"){return null
}return A.doc.selection.createRange().htmlText
}else{var C=A.global.getSelection();
if(C&&C.rangeCount){var B=C.getRangeAt(0).cloneContents();
var D=document.createElement("div");
D.appendChild(B);
return D.innerHTML
}return null
}},getSelectedElement:function(){if(this.getType()=="control"){if(A.doc.selection){var C=A.doc.selection.createRange();
if(C&&C.item){return A.doc.selection.createRange().item(0)
}}else{var B=A.global.getSelection();
return B.anchorNode.childNodes[B.anchorOffset]
}}},getParentElement:function(){if(this.getType()=="control"){var B=this.getSelectedElement();
if(B){return B.parentNode
}}else{if(A.doc.selection){return A.doc.selection.createRange().parentElement()
}else{var C=A.global.getSelection();
if(C){var D=C.anchorNode;
while(D&&(D.nodeType!=1)){D=D.parentNode
}return D
}}}},hasAncestorElement:function(B){return(this.getAncestorElement.apply(this,arguments)!=null)
},getAncestorElement:function(C){var B=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(B,arguments)
},isTag:function(F,C){if(F&&F.tagName){var B=F.tagName.toLowerCase();
for(var D=0;
D<C.length;
D++){var E=String(C[D]).toLowerCase();
if(B==E){return E
}}}return""
},getParentOfType:function(B,C){while(B){if(this.isTag(B,C).length){return B
}B=B.parentNode
}return null
},remove:function(){var B=A.doc.selection;
if(B){if(B.type.toLowerCase()!="none"){B.clear()
}return B
}else{B=A.global.getSelection();
B.deleteFromDocument();
return B
}},selectElementChildren:function(F,E){var C=A.global;
var B=A.doc;
F=A.byId(F);
if(B.selection&&A.body().createTextRange){var D=F.ownerDocument.body.createTextRange();
D.moveToElementText(F);
if(!E){D.select()
}}else{if(C.getSelection){var G=C.getSelection();
if(G.setBaseAndExtent){G.setBaseAndExtent(F,0,F,F.innerText.length-1)
}else{if(G.selectAllChildren){G.selectAllChildren(F)
}}}}},selectElement:function(F,E){var C=A.doc;
F=A.byId(F);
if(C.selection&&A.body().createTextRange){try{var D=A.body().createControlRange();
D.addElement(F);
if(!E){D.select()
}}catch(B){this.selectElementChildren(F,E)
}}else{if(A.global.getSelection){var G=A.global.getSelection();
if(G.removeAllRanges){var D=C.createRange();
D.selectNode(F);
G.removeAllRanges();
G.addRange(D)
}}}}})
}}});