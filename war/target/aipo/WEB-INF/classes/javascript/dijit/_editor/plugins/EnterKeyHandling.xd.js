dojo._xdResourceLoaded({depends:[["provide","dijit._editor.plugins.EnterKeyHandling"]],defineResource:function(A){if(!A._hasResource["dijit._editor.plugins.EnterKeyHandling"]){A._hasResource["dijit._editor.plugins.EnterKeyHandling"]=true;
A.provide("dijit._editor.plugins.EnterKeyHandling");
A.declare("dijit._editor.plugins.EnterKeyHandling",null,{blockNodeForEnter:"P",constructor:function(B){if(B){A.mixin(this,B)
}},setEditor:function(B){this.editor=B;
if(this.blockNodeForEnter=="BR"){if(A.isIE){B.contentDomPreFilters.push(A.hitch(this,"regularPsToSingleLinePs"));
B.contentDomPostFilters.push(A.hitch(this,"singleLinePsToRegularPs"));
B.onLoadDeferred.addCallback(A.hitch(this,"_fixNewLineBehaviorForIE"))
}else{B.onLoadDeferred.addCallback(A.hitch(this,function(E){try{this.editor.document.execCommand("insertBrOnReturn",false,true)
}catch(D){}return E
}))
}}else{if(this.blockNodeForEnter){A.require("dijit._editor.range");
var C=A.hitch(this,this.handleEnterKey);
B.addKeyHandler(13,0,C);
B.addKeyHandler(13,2,C);
this.connect(this.editor,"onKeyPressed","onKeyPressed")
}}},connect:function(B,C,D){if(!this._connects){this._connects=[]
}this._connects.push(A.connect(B,C,this,D))
},destroy:function(){A.forEach(this._connects,A.disconnect);
this._connects=[]
},onKeyPressed:function(D){if(this._checkListLater){if(A.withGlobal(this.editor.window,"isCollapsed",dijit._editor.selection)){if(!A.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["LI"])){dijit._editor.RichText.prototype.execCommand.apply(this.editor,["formatblock",this.blockNodeForEnter]);
var B=A.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(B){B.innerHTML=this.bogusHtmlContent;
if(A.isIE){var C=this.editor.document.selection.createRange();
C.move("character",-1);
C.select()
}}else{alert("onKeyPressed: Can not find the new block node")
}}}this._checkListLater=false
}else{if(this._pressedEnterInBlock){this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
delete this._pressedEnterInBlock
}}},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(C){if(!this.blockNodeForEnter){return true
}if(C.shiftKey||this.blockNodeForEnter=="BR"){var D=A.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var J=dijit.range.getAncestor(D,this.editor.blockNodes);
if(J){if(J.tagName=="LI"){return true
}var E=dijit.range.getSelection(this.editor.window);
var B=E.getRangeAt(0);
if(!B.collapsed){B.deleteContents()
}if(dijit.range.atBeginningOfContainer(J,B.startContainer,B.startOffset)){A.place(this.editor.document.createElement("br"),J,"before")
}else{if(dijit.range.atEndOfContainer(J,B.startContainer,B.startOffset)){A.place(this.editor.document.createElement("br"),J,"after");
var H=dijit.range.create();
H.setStartAfter(J);
E.removeAllRanges();
E.addRange(H)
}else{return true
}}}else{dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>")
}return false
}var F=true;
var E=dijit.range.getSelection(this.editor.window);
var B=E.getRangeAt(0);
if(!B.collapsed){B.deleteContents()
}var I=dijit.range.getBlockAncestor(B.endContainer,null,this.editor.editNode);
if(I.blockNode&&I.blockNode.tagName=="LI"){this._checkListLater=true;
return true
}else{this._checkListLater=false
}if(!I.blockNode){this.editor.document.execCommand("formatblock",false,this.blockNodeForEnter);
I={blockNode:A.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(I.blockNode){if((I.blockNode.textContent||I.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length==0){this.removeTrailingBr(I.blockNode);
return false
}}else{I.blockNode=this.editor.editNode
}E=dijit.range.getSelection(this.editor.window);
B=E.getRangeAt(0)
}var G=this.editor.document.createElement(this.blockNodeForEnter);
G.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(I.blockNode);
if(dijit.range.atEndOfContainer(I.blockNode,B.endContainer,B.endOffset)){if(I.blockNode===I.blockContainer){I.blockNode.appendChild(G)
}else{A.place(G,I.blockNode,"after")
}F=false;
var H=dijit.range.create();
H.setStart(G,0);
E.removeAllRanges();
E.addRange(H);
if(this.editor.height){G.scrollIntoView(false)
}}else{if(dijit.range.atBeginningOfContainer(I.blockNode,B.startContainer,B.startOffset)){if(I.blockNode===I.blockContainer){A.place(G,I.blockNode,"first")
}else{A.place(G,I.blockNode,"before")
}if(this.editor.height){G.scrollIntoView(false)
}F=false
}else{if(A.isMoz){this._pressedEnterInBlock=I.blockNode
}}}return F
},removeTrailingBr:function(B){if(/P|DIV|LI/i.test(B.tagName)){var C=B
}else{var C=dijit._editor.selection.getParentOfType(B,["P","DIV","LI"])
}if(!C){return 
}if(C.lastChild){if(C.childNodes.length>1&&C.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(C.lastChild.nodeValue)){A._destroyElement(C.lastChild)
}if(C.lastChild&&C.lastChild.tagName=="BR"){A._destroyElement(C.lastChild)
}}if(C.childNodes.length==0){C.innerHTML=this.bogusHtmlContent
}},_fixNewLineBehaviorForIE:function(D){if(typeof this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=="undefined"){var C="p{margin:0 !important;}";
var B=function(H,J,I){if(!H){return 
}if(!J){J=document
}var G=J.createElement("style");
G.setAttribute("type","text/css");
var K=J.getElementsByTagName("head")[0];
if(!K){console.debug("No head tag in document, aborting styles");
return 
}else{K.appendChild(G)
}if(G.styleSheet){var F=function(){try{G.styleSheet.cssText=H
}catch(L){A.debug(L)
}};
if(G.styleSheet.disabled){setTimeout(F,10)
}else{F()
}}else{var E=J.createTextNode(H);
G.appendChild(E)
}return G
};
B(C,this.editor.document);
this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=true;
return D
}},regularPsToSingleLinePs:function(D,C){function B(K){function I(N){var P=N[0].ownerDocument.createElement("p");
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
}}function G(K){var J=null;
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
}}}var E=[];
var F=D.getElementsByTagName("p");
A.forEach(F,function(H){E.push(H)
});
A.forEach(E,function(I){if((I.previousSibling)&&(I.previousSibling.nodeName=="P"||A.style(I.previousSibling,"display")!="block")){var H=I.parentNode.insertBefore(this.document.createElement("p"),I);
H.innerHTML=C?"":"&nbsp;"
}G(I)
},this.editor);
B(D);
return D
},singleLinePsToRegularPs:function(E){function J(M){var O=M.getElementsByTagName("p");
var K=[];
for(var L=0;
L<O.length;
L++){var N=O[L];
var Q=false;
for(var P=0;
P<K.length;
P++){if(K[P]===N.parentNode){Q=true;
break
}}if(!Q){K.push(N.parentNode)
}}return K
}function D(K){if(K.nodeType!=1||K.tagName!="P"){return(A.style(K,"display")=="block")
}else{if(!K.childNodes.length||K.innerHTML=="&nbsp;"){return true
}}}var C=J(E);
for(var F=0;
F<C.length;
F++){var I=C[F];
var H=null;
var B=I.firstChild;
var G=null;
while(B){if(B.nodeType!="1"||B.tagName!="P"){H=null
}else{if(D(B)){G=B;
H=null
}else{if(H==null){H=B
}else{if((!H.lastChild||H.lastChild.nodeName!="BR")&&(B.firstChild)&&(B.firstChild.nodeName!="BR")){H.appendChild(this.editor.document.createElement("br"))
}while(B.firstChild){H.appendChild(B.firstChild)
}G=B
}}}B=B.nextSibling;
if(G){A._destroyElement(G);
G=null
}}}return E
}})
}}});