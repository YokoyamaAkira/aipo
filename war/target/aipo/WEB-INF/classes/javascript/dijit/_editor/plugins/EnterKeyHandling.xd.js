dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.EnterKeyHandling"]],defineResource:function(A){if(!A._hasResource["dijit._editor.plugins.EnterKeyHandling"]){A._hasResource["dijit._editor.plugins.EnterKeyHandling"]=true;
A.provide("dijit._editor.plugins.EnterKeyHandling");
A.declare("dijit._editor.plugins.EnterKeyHandling",null,{blockNodeForEnter:"P",constructor:function(B){if(B){A.mixin(this,B)
}},setEditor:function(C){this.editor=C;
if(this.blockNodeForEnter=="BR"){if(A.isIE){C.contentDomPreFilters.push(A.hitch(this,"regularPsToSingleLinePs"));
C.contentDomPostFilters.push(A.hitch(this,"singleLinePsToRegularPs"));
C.onLoadDeferred.addCallback(A.hitch(this,"_fixNewLineBehaviorForIE"))
}else{C.onLoadDeferred.addCallback(A.hitch(this,function(E){try{this.editor.document.execCommand("insertBrOnReturn",false,true)
}catch(D){}return E
}))
}}else{if(this.blockNodeForEnter){A.require("dijit._editor.range");
var B=A.hitch(this,this.handleEnterKey);
C.addKeyHandler(13,0,B);
C.addKeyHandler(13,2,B);
this.connect(this.editor,"onKeyPressed","onKeyPressed")
}}},connect:function(D,B,C){if(!this._connects){this._connects=[]
}this._connects.push(A.connect(D,B,this,C))
},destroy:function(){A.forEach(this._connects,A.disconnect);
this._connects=[]
},onKeyPressed:function(C){if(this._checkListLater){if(A.withGlobal(this.editor.window,"isCollapsed",dijit._editor.selection)){if(!A.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["LI"])){dijit._editor.RichText.prototype.execCommand.apply(this.editor,["formatblock",this.blockNodeForEnter]);
var D=A.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(D){D.innerHTML=this.bogusHtmlContent;
if(A.isIE){var B=this.editor.document.selection.createRange();
B.move("character",-1);
B.select()
}}else{alert("onKeyPressed: Can not find the new block node")
}}}this._checkListLater=false
}else{if(this._pressedEnterInBlock){this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
delete this._pressedEnterInBlock
}}},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(E){if(!this.blockNodeForEnter){return true
}if(E.shiftKey||this.blockNodeForEnter=="BR"){var F=A.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var C=dijit.range.getAncestor(F,this.editor.blockNodes);
if(C){if(C.tagName=="LI"){return true
}var G=dijit.range.getSelection(this.editor.window);
var D=G.getRangeAt(0);
if(!D.collapsed){D.deleteContents()
}if(dijit.range.atBeginningOfContainer(C,D.startContainer,D.startOffset)){A.place(this.editor.document.createElement("br"),C,"before")
}else{if(dijit.range.atEndOfContainer(C,D.startContainer,D.startOffset)){A.place(this.editor.document.createElement("br"),C,"after");
var J=dijit.range.create();
J.setStartAfter(C);
G.removeAllRanges();
G.addRange(J)
}else{return true
}}}else{dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>")
}return false
}var H=true;
var G=dijit.range.getSelection(this.editor.window);
var D=G.getRangeAt(0);
if(!D.collapsed){D.deleteContents()
}var B=dijit.range.getBlockAncestor(D.endContainer,null,this.editor.editNode);
if(B.blockNode&&B.blockNode.tagName=="LI"){this._checkListLater=true;
return true
}else{this._checkListLater=false
}if(!B.blockNode){this.editor.document.execCommand("formatblock",false,this.blockNodeForEnter);
B={blockNode:A.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(B.blockNode){if((B.blockNode.textContent||B.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length==0){this.removeTrailingBr(B.blockNode);
return false
}}else{B.blockNode=this.editor.editNode
}G=dijit.range.getSelection(this.editor.window);
D=G.getRangeAt(0)
}var I=this.editor.document.createElement(this.blockNodeForEnter);
I.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(B.blockNode);
if(dijit.range.atEndOfContainer(B.blockNode,D.endContainer,D.endOffset)){if(B.blockNode===B.blockContainer){B.blockNode.appendChild(I)
}else{A.place(I,B.blockNode,"after")
}H=false;
var J=dijit.range.create();
J.setStart(I,0);
G.removeAllRanges();
G.addRange(J);
if(this.editor.height){I.scrollIntoView(false)
}}else{if(dijit.range.atBeginningOfContainer(B.blockNode,D.startContainer,D.startOffset)){if(B.blockNode===B.blockContainer){A.place(I,B.blockNode,"first")
}else{A.place(I,B.blockNode,"before")
}if(this.editor.height){I.scrollIntoView(false)
}H=false
}else{if(A.isMoz){this._pressedEnterInBlock=B.blockNode
}}}return H
},removeTrailingBr:function(C){if(/P|DIV|LI/i.test(C.tagName)){var B=C
}else{var B=dijit._editor.selection.getParentOfType(C,["P","DIV","LI"])
}if(!B){return 
}if(B.lastChild){if(B.childNodes.length>1&&B.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(B.lastChild.nodeValue)){A._destroyElement(B.lastChild)
}if(B.lastChild&&B.lastChild.tagName=="BR"){A._destroyElement(B.lastChild)
}}if(B.childNodes.length==0){B.innerHTML=this.bogusHtmlContent
}},_fixNewLineBehaviorForIE:function(C){if(typeof this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=="undefined"){var B="p{margin:0 !important;}";
var D=function(F,K,G){if(!F){return 
}if(!K){K=document
}var J=K.createElement("style");
J.setAttribute("type","text/css");
var H=K.getElementsByTagName("head")[0];
if(!H){console.debug("No head tag in document, aborting styles");
return 
}else{H.appendChild(J)
}if(J.styleSheet){var E=function(){try{J.styleSheet.cssText=F
}catch(L){A.debug(L)
}};
if(J.styleSheet.disabled){setTimeout(E,10)
}else{E()
}}else{var I=K.createTextNode(F);
J.appendChild(I)
}return J
};
D(B,this.editor.document);
this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=true;
return C
}},regularPsToSingleLinePs:function(C,B){function G(K){function I(N){var P=N[0].ownerDocument.createElement("p");
N[0].parentNode.insertBefore(P,N[0]);
for(var O=0;
O<N.length;
O++){P.appendChild(N[O])
}}var M=0;
var L=[];
var J;
while(M<K.childNodes.length){J=K.childNodes[M];
if((J.nodeName!="BR")&&(J.nodeType==1)&&(A.style(J,"display")!="block")){L.push(J)
}else{var H=J.nextSibling;
if(L.length){I(L);
M=(M+1)-L.length;
if(J.nodeName=="BR"){A._destroyElement(J)
}}L=[]
}M++
}if(L.length){I(L)
}}function F(K){var J=null;
var H=[];
var M=K.childNodes.length-1;
for(var I=M;
I>=0;
I--){J=K.childNodes[I];
if(J.nodeName=="BR"){var L=J.ownerDocument.createElement("p");
A.place(L,K,"after");
if(H.length==0&&I!=M){L.innerHTML="&nbsp;"
}A.forEach(H,function(N){L.appendChild(N)
});
A._destroyElement(J);
H=[]
}else{H.unshift(J)
}}}var D=[];
var E=C.getElementsByTagName("p");
A.forEach(E,function(H){D.push(H)
});
A.forEach(D,function(I){if((I.previousSibling)&&(I.previousSibling.nodeName=="P"||A.style(I.previousSibling,"display")!="block")){var H=I.parentNode.insertBefore(this.document.createElement("p"),I);
H.innerHTML=B?"":"&nbsp;"
}F(I)
},this.editor);
G(C);
return C
},singleLinePsToRegularPs:function(G){function C(O){var Q=O.getElementsByTagName("p");
var M=[];
for(var N=0;
N<Q.length;
N++){var P=Q[N];
var L=false;
for(var K=0;
K<M.length;
K++){if(M[K]===P.parentNode){L=true;
break
}}if(!L){M.push(P.parentNode)
}}return M
}function F(K){if(K.nodeType!=1||K.tagName!="P"){return(A.style(K,"display")=="block")
}else{if(!K.childNodes.length||K.innerHTML=="&nbsp;"){return true
}}}var E=C(G);
for(var H=0;
H<E.length;
H++){var B=E[H];
var J=null;
var D=B.firstChild;
var I=null;
while(D){if(D.nodeType!="1"||D.tagName!="P"){J=null
}else{if(F(D)){I=D;
J=null
}else{if(J==null){J=D
}else{if((!J.lastChild||J.lastChild.nodeName!="BR")&&(D.firstChild)&&(D.firstChild.nodeName!="BR")){J.appendChild(this.editor.document.createElement("br"))
}while(D.firstChild){J.appendChild(D.firstChild)
}I=D
}}}D=D.nextSibling;
if(I){A._destroyElement(I);
I=null
}}}return G
}})
}}});