if(!dojo._hasResource["dijit._editor.plugins.EnterKeyHandling"]){dojo._hasResource["dijit._editor.plugins.EnterKeyHandling"]=true;
dojo.provide("dijit._editor.plugins.EnterKeyHandling");
dojo.declare("dijit._editor.plugins.EnterKeyHandling",null,{blockNodeForEnter:"P",constructor:function(A){if(A){dojo.mixin(this,A)
}},setEditor:function(B){this.editor=B;
if(this.blockNodeForEnter=="BR"){if(dojo.isIE){B.contentDomPreFilters.push(dojo.hitch(this,"regularPsToSingleLinePs"));
B.contentDomPostFilters.push(dojo.hitch(this,"singleLinePsToRegularPs"));
B.onLoadDeferred.addCallback(dojo.hitch(this,"_fixNewLineBehaviorForIE"))
}else{B.onLoadDeferred.addCallback(dojo.hitch(this,function(D){try{this.editor.document.execCommand("insertBrOnReturn",false,true)
}catch(C){}return D
}))
}}else{if(this.blockNodeForEnter){dojo.require("dijit._editor.range");
var A=dojo.hitch(this,this.handleEnterKey);
B.addKeyHandler(13,0,A);
B.addKeyHandler(13,2,A);
this.connect(this.editor,"onKeyPressed","onKeyPressed")
}}},connect:function(C,A,B){if(!this._connects){this._connects=[]
}this._connects.push(dojo.connect(C,A,this,B))
},destroy:function(){dojo.forEach(this._connects,dojo.disconnect);
this._connects=[]
},onKeyPressed:function(B){if(this._checkListLater){if(dojo.withGlobal(this.editor.window,"isCollapsed",dijit._editor.selection)){if(!dojo.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["LI"])){dijit._editor.RichText.prototype.execCommand.apply(this.editor,["formatblock",this.blockNodeForEnter]);
var C=dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(C){C.innerHTML=this.bogusHtmlContent;
if(dojo.isIE){var A=this.editor.document.selection.createRange();
A.move("character",-1);
A.select()
}}else{alert("onKeyPressed: Can not find the new block node")
}}}this._checkListLater=false
}else{if(this._pressedEnterInBlock){this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
delete this._pressedEnterInBlock
}}},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(D){if(!this.blockNodeForEnter){return true
}if(D.shiftKey||this.blockNodeForEnter=="BR"){var E=dojo.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var B=dijit.range.getAncestor(E,this.editor.blockNodes);
if(B){if(B.tagName=="LI"){return true
}var F=dijit.range.getSelection(this.editor.window);
var C=F.getRangeAt(0);
if(!C.collapsed){C.deleteContents()
}if(dijit.range.atBeginningOfContainer(B,C.startContainer,C.startOffset)){dojo.place(this.editor.document.createElement("br"),B,"before")
}else{if(dijit.range.atEndOfContainer(B,C.startContainer,C.startOffset)){dojo.place(this.editor.document.createElement("br"),B,"after");
var I=dijit.range.create();
I.setStartAfter(B);
F.removeAllRanges();
F.addRange(I)
}else{return true
}}}else{dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>")
}return false
}var G=true;
var F=dijit.range.getSelection(this.editor.window);
var C=F.getRangeAt(0);
if(!C.collapsed){C.deleteContents()
}var A=dijit.range.getBlockAncestor(C.endContainer,null,this.editor.editNode);
if(A.blockNode&&A.blockNode.tagName=="LI"){this._checkListLater=true;
return true
}else{this._checkListLater=false
}if(!A.blockNode){this.editor.document.execCommand("formatblock",false,this.blockNodeForEnter);
A={blockNode:dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(A.blockNode){if((A.blockNode.textContent||A.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length==0){this.removeTrailingBr(A.blockNode);
return false
}}else{A.blockNode=this.editor.editNode
}F=dijit.range.getSelection(this.editor.window);
C=F.getRangeAt(0)
}var H=this.editor.document.createElement(this.blockNodeForEnter);
H.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(A.blockNode);
if(dijit.range.atEndOfContainer(A.blockNode,C.endContainer,C.endOffset)){if(A.blockNode===A.blockContainer){A.blockNode.appendChild(H)
}else{dojo.place(H,A.blockNode,"after")
}G=false;
var I=dijit.range.create();
I.setStart(H,0);
F.removeAllRanges();
F.addRange(I);
if(this.editor.height){H.scrollIntoView(false)
}}else{if(dijit.range.atBeginningOfContainer(A.blockNode,C.startContainer,C.startOffset)){if(A.blockNode===A.blockContainer){dojo.place(H,A.blockNode,"first")
}else{dojo.place(H,A.blockNode,"before")
}if(this.editor.height){H.scrollIntoView(false)
}G=false
}else{if(dojo.isMoz){this._pressedEnterInBlock=A.blockNode
}}}return G
},removeTrailingBr:function(B){if(/P|DIV|LI/i.test(B.tagName)){var A=B
}else{var A=dijit._editor.selection.getParentOfType(B,["P","DIV","LI"])
}if(!A){return 
}if(A.lastChild){if(A.childNodes.length>1&&A.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(A.lastChild.nodeValue)){dojo._destroyElement(A.lastChild)
}if(A.lastChild&&A.lastChild.tagName=="BR"){dojo._destroyElement(A.lastChild)
}}if(A.childNodes.length==0){A.innerHTML=this.bogusHtmlContent
}},_fixNewLineBehaviorForIE:function(B){if(typeof this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=="undefined"){var A="p{margin:0 !important;}";
var C=function(E,J,F){if(!E){return 
}if(!J){J=document
}var I=J.createElement("style");
I.setAttribute("type","text/css");
var G=J.getElementsByTagName("head")[0];
if(!G){console.debug("No head tag in document, aborting styles");
return 
}else{G.appendChild(I)
}if(I.styleSheet){var D=function(){try{I.styleSheet.cssText=E
}catch(K){dojo.debug(K)
}};
if(I.styleSheet.disabled){setTimeout(D,10)
}else{D()
}}else{var H=J.createTextNode(E);
I.appendChild(H)
}return I
};
C(A,this.editor.document);
this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=true;
return B
}},regularPsToSingleLinePs:function(B,A){function F(J){function H(M){var O=M[0].ownerDocument.createElement("p");
M[0].parentNode.insertBefore(O,M[0]);
for(var N=0;
N<M.length;
N++){O.appendChild(M[N])
}}var L=0;
var K=[];
var I;
while(L<J.childNodes.length){I=J.childNodes[L];
if((I.nodeName!="BR")&&(I.nodeType==1)&&(dojo.style(I,"display")!="block")){K.push(I)
}else{var G=I.nextSibling;
if(K.length){H(K);
L=(L+1)-K.length;
if(I.nodeName=="BR"){dojo._destroyElement(I)
}}K=[]
}L++
}if(K.length){H(K)
}}function E(J){var I=null;
var G=[];
var L=J.childNodes.length-1;
for(var H=L;
H>=0;
H--){I=J.childNodes[H];
if(I.nodeName=="BR"){var K=I.ownerDocument.createElement("p");
dojo.place(K,J,"after");
if(G.length==0&&H!=L){K.innerHTML="&nbsp;"
}dojo.forEach(G,function(M){K.appendChild(M)
});
dojo._destroyElement(I);
G=[]
}else{G.unshift(I)
}}}var C=[];
var D=B.getElementsByTagName("p");
dojo.forEach(D,function(G){C.push(G)
});
dojo.forEach(C,function(H){if((H.previousSibling)&&(H.previousSibling.nodeName=="P"||dojo.style(H.previousSibling,"display")!="block")){var G=H.parentNode.insertBefore(this.document.createElement("p"),H);
G.innerHTML=A?"":"&nbsp;"
}E(H)
},this.editor);
F(B);
return B
},singleLinePsToRegularPs:function(F){function B(N){var P=N.getElementsByTagName("p");
var L=[];
for(var M=0;
M<P.length;
M++){var O=P[M];
var K=false;
for(var J=0;
J<L.length;
J++){if(L[J]===O.parentNode){K=true;
break
}}if(!K){L.push(O.parentNode)
}}return L
}function E(J){if(J.nodeType!=1||J.tagName!="P"){return(dojo.style(J,"display")=="block")
}else{if(!J.childNodes.length||J.innerHTML=="&nbsp;"){return true
}}}var D=B(F);
for(var G=0;
G<D.length;
G++){var A=D[G];
var I=null;
var C=A.firstChild;
var H=null;
while(C){if(C.nodeType!="1"||C.tagName!="P"){I=null
}else{if(E(C)){H=C;
I=null
}else{if(I==null){I=C
}else{if((!I.lastChild||I.lastChild.nodeName!="BR")&&(C.firstChild)&&(C.firstChild.nodeName!="BR")){I.appendChild(this.editor.document.createElement("br"))
}while(C.firstChild){I.appendChild(C.firstChild)
}H=C
}}}C=C.nextSibling;
if(H){dojo._destroyElement(H);
H=null
}}}return F
}})
};