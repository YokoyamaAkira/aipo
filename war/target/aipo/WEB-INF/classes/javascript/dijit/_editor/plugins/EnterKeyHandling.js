if(!dojo._hasResource["dijit._editor.plugins.EnterKeyHandling"]){dojo._hasResource["dijit._editor.plugins.EnterKeyHandling"]=true;
dojo.provide("dijit._editor.plugins.EnterKeyHandling");
dojo.declare("dijit._editor.plugins.EnterKeyHandling",null,{blockNodeForEnter:"P",constructor:function(A){if(A){dojo.mixin(this,A)
}},setEditor:function(A){this.editor=A;
if(this.blockNodeForEnter=="BR"){if(dojo.isIE){A.contentDomPreFilters.push(dojo.hitch(this,"regularPsToSingleLinePs"));
A.contentDomPostFilters.push(dojo.hitch(this,"singleLinePsToRegularPs"));
A.onLoadDeferred.addCallback(dojo.hitch(this,"_fixNewLineBehaviorForIE"))
}else{A.onLoadDeferred.addCallback(dojo.hitch(this,function(C){try{this.editor.document.execCommand("insertBrOnReturn",false,true)
}catch(D){}return C
}))
}}else{if(this.blockNodeForEnter){dojo.require("dijit._editor.range");
var B=dojo.hitch(this,this.handleEnterKey);
A.addKeyHandler(13,0,B);
A.addKeyHandler(13,2,B);
this.connect(this.editor,"onKeyPressed","onKeyPressed")
}}},connect:function(B,C,A){if(!this._connects){this._connects=[]
}this._connects.push(dojo.connect(B,C,this,A))
},destroy:function(){dojo.forEach(this._connects,dojo.disconnect);
this._connects=[]
},onKeyPressed:function(A){if(this._checkListLater){if(dojo.withGlobal(this.editor.window,"isCollapsed",dijit._editor.selection)){if(!dojo.withGlobal(this.editor.window,"hasAncestorElement",dijit._editor.selection,["LI"])){dijit._editor.RichText.prototype.execCommand.apply(this.editor,["formatblock",this.blockNodeForEnter]);
var B=dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]);
if(B){B.innerHTML=this.bogusHtmlContent;
if(dojo.isIE){var C=this.editor.document.selection.createRange();
C.move("character",-1);
C.select()
}}else{alert("onKeyPressed: Can not find the new block node")
}}}this._checkListLater=false
}else{if(this._pressedEnterInBlock){this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
delete this._pressedEnterInBlock
}}},bogusHtmlContent:"&nbsp;",blockNodes:/^(?:H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(I){if(!this.blockNodeForEnter){return true
}if(I.shiftKey||this.blockNodeForEnter=="BR"){var A=dojo.withGlobal(this.editor.window,"getParentElement",dijit._editor.selection);
var G=dijit.range.getAncestor(A,this.editor.blockNodes);
if(G){if(G.tagName=="LI"){return true
}var B=dijit.range.getSelection(this.editor.window);
var H=B.getRangeAt(0);
if(!H.collapsed){H.deleteContents()
}if(dijit.range.atBeginningOfContainer(G,H.startContainer,H.startOffset)){dojo.place(this.editor.document.createElement("br"),G,"before")
}else{if(dijit.range.atEndOfContainer(G,H.startContainer,H.startOffset)){dojo.place(this.editor.document.createElement("br"),G,"after");
var E=dijit.range.create();
E.setStartAfter(G);
B.removeAllRanges();
B.addRange(E)
}else{return true
}}}else{dijit._editor.RichText.prototype.execCommand.call(this.editor,"inserthtml","<br>")
}return false
}var C=true;
var B=dijit.range.getSelection(this.editor.window);
var H=B.getRangeAt(0);
if(!H.collapsed){H.deleteContents()
}var F=dijit.range.getBlockAncestor(H.endContainer,null,this.editor.editNode);
if(F.blockNode&&F.blockNode.tagName=="LI"){this._checkListLater=true;
return true
}else{this._checkListLater=false
}if(!F.blockNode){this.editor.document.execCommand("formatblock",false,this.blockNodeForEnter);
F={blockNode:dojo.withGlobal(this.editor.window,"getAncestorElement",dijit._editor.selection,[this.blockNodeForEnter]),blockContainer:this.editor.editNode};
if(F.blockNode){if((F.blockNode.textContent||F.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length==0){this.removeTrailingBr(F.blockNode);
return false
}}else{F.blockNode=this.editor.editNode
}B=dijit.range.getSelection(this.editor.window);
H=B.getRangeAt(0)
}var D=this.editor.document.createElement(this.blockNodeForEnter);
D.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(F.blockNode);
if(dijit.range.atEndOfContainer(F.blockNode,H.endContainer,H.endOffset)){if(F.blockNode===F.blockContainer){F.blockNode.appendChild(D)
}else{dojo.place(D,F.blockNode,"after")
}C=false;
var E=dijit.range.create();
E.setStart(D,0);
B.removeAllRanges();
B.addRange(E);
if(this.editor.height){D.scrollIntoView(false)
}}else{if(dijit.range.atBeginningOfContainer(F.blockNode,H.startContainer,H.startOffset)){if(F.blockNode===F.blockContainer){dojo.place(D,F.blockNode,"first")
}else{dojo.place(D,F.blockNode,"before")
}if(this.editor.height){D.scrollIntoView(false)
}C=false
}else{if(dojo.isMoz){this._pressedEnterInBlock=F.blockNode
}}}return C
},removeTrailingBr:function(A){if(/P|DIV|LI/i.test(A.tagName)){var B=A
}else{var B=dijit._editor.selection.getParentOfType(A,["P","DIV","LI"])
}if(!B){return 
}if(B.lastChild){if(B.childNodes.length>1&&B.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(B.lastChild.nodeValue)){dojo._destroyElement(B.lastChild)
}if(B.lastChild&&B.lastChild.tagName=="BR"){dojo._destroyElement(B.lastChild)
}}if(B.childNodes.length==0){B.innerHTML=this.bogusHtmlContent
}},_fixNewLineBehaviorForIE:function(A){if(typeof this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=="undefined"){var C="p{margin:0 !important;}";
var B=function(J,E,D){if(!J){return 
}if(!E){E=document
}var I=E.createElement("style");
I.setAttribute("type","text/css");
var F=E.getElementsByTagName("head")[0];
if(!F){console.debug("No head tag in document, aborting styles");
return 
}else{F.appendChild(I)
}if(I.styleSheet){var H=function(){try{I.styleSheet.cssText=J
}catch(K){dojo.debug(K)
}};
if(I.styleSheet.disabled){setTimeout(H,10)
}else{H()
}}else{var G=E.createTextNode(J);
I.appendChild(G)
}return I
};
B(C,this.editor.document);
this.editor.document.__INSERTED_EDITIOR_NEWLINE_CSS=true;
return A
}},regularPsToSingleLinePs:function(A,F){function E(K){function I(M){var O=M[0].ownerDocument.createElement("p");
M[0].parentNode.insertBefore(O,M[0]);
for(var N=0;
N<M.length;
N++){O.appendChild(M[N])
}}var G=0;
var L=[];
var J;
while(G<K.childNodes.length){J=K.childNodes[G];
if((J.nodeName!="BR")&&(J.nodeType==1)&&(dojo.style(J,"display")!="block")){L.push(J)
}else{var H=J.nextSibling;
if(L.length){I(L);
G=(G+1)-L.length;
if(J.nodeName=="BR"){dojo._destroyElement(J)
}}L=[]
}G++
}if(L.length){I(L)
}}function D(K){var J=null;
var H=[];
var G=K.childNodes.length-1;
for(var I=G;
I>=0;
I--){J=K.childNodes[I];
if(J.nodeName=="BR"){var L=J.ownerDocument.createElement("p");
dojo.place(L,K,"after");
if(H.length==0&&I!=G){L.innerHTML="&nbsp;"
}dojo.forEach(H,function(M){L.appendChild(M)
});
dojo._destroyElement(J);
H=[]
}else{H.unshift(J)
}}}var B=[];
var C=A.getElementsByTagName("p");
dojo.forEach(C,function(G){B.push(G)
});
dojo.forEach(B,function(G){if((G.previousSibling)&&(G.previousSibling.nodeName=="P"||dojo.style(G.previousSibling,"display")!="block")){var H=G.parentNode.insertBefore(this.document.createElement("p"),G);
H.innerHTML=F?"":"&nbsp;"
}D(G)
},this.editor);
E(A);
return A
},singleLinePsToRegularPs:function(B){function G(L){var N=L.getElementsByTagName("p");
var J=[];
for(var K=0;
K<N.length;
K++){var M=N[K];
var P=false;
for(var O=0;
O<J.length;
O++){if(J[O]===M.parentNode){P=true;
break
}}if(!P){J.push(M.parentNode)
}}return J
}function A(J){if(J.nodeType!=1||J.tagName!="P"){return(dojo.style(J,"display")=="block")
}else{if(!J.childNodes.length||J.innerHTML=="&nbsp;"){return true
}}}var I=G(B);
for(var C=0;
C<I.length;
C++){var F=I[C];
var E=null;
var H=F.firstChild;
var D=null;
while(H){if(H.nodeType!="1"||H.tagName!="P"){E=null
}else{if(A(H)){D=H;
E=null
}else{if(E==null){E=H
}else{if((!E.lastChild||E.lastChild.nodeName!="BR")&&(H.firstChild)&&(H.firstChild.nodeName!="BR")){E.appendChild(this.editor.document.createElement("br"))
}while(H.firstChild){E.appendChild(H.firstChild)
}D=H
}}}H=H.nextSibling;
if(D){dojo._destroyElement(D);
D=null
}}}return B
}})
};