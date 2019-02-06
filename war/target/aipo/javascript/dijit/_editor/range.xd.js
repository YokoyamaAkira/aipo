dojo._xdResourceLoaded({depends:[["provide","dijit._editor.range"]],defineResource:function(A){if(!A._hasResource["dijit._editor.range"]){A._hasResource["dijit._editor.range"]=true;
A.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(C,J){var G=[],D=[];
var I=J;
var H=C;
while(C!=I){var E=0;
var F=C.parentNode,B;
while(B=F.childNodes[E++]){if(B===C){--E;
break
}}if(E>=F.childNodes.length){A.debug("Error finding index of a node in dijit.range.getIndex")
}G.unshift(E);
D.unshift(E-F.childNodes.length);
C=F
}if(G.length>0&&H.nodeType==3){var B=H.previousSibling;
while(B&&B.nodeType==3){G[G.length-1]--;
B=B.previousSibling
}B=H.nextSibling;
while(B&&B.nodeType==3){D[D.length-1]++;
B=B.nextSibling
}}return{o:G,r:D}
};
dijit.range.getNode=function(B,C){if(!A.isArray(B)||B.length==0){return C
}var D=C;
A.every(B,function(E){if(E>=0&&E<D.childNodes.length){D=D.childNodes[E]
}else{D=null;
console.debug("Error: can not find node with index",B,"under parent node",C);
return false
}return true
});
return D
};
dijit.range.getCommonAncestor=function(I,G,J){var H=function(M,L){var K=[];
while(M){K.unshift(M);
if(M!=L&&M.tagName!="BODY"){M=M.parentNode
}else{break
}}return K
};
var C=H(I,J);
var F=H(G,J);
var D=Math.min(C.length,F.length);
var B=C[0];
for(var E=1;
E<D;
E++){if(C[E]===F[E]){B=C[E]
}else{break
}}return B
};
dijit.range.getAncestor=function(E,D,B){B=B||E.ownerDocument.body;
while(E&&E!==B){var C=E.nodeName.toUpperCase();
if(D.test(C)){return E
}E=E.parentNode
}return null
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(F,E,B){B=B||F.ownerDocument.body;
E=E||dijit.range.BlockTagNames;
var G=null,D;
while(F&&F!==B){var C=F.nodeName.toUpperCase();
if(!G&&E.test(C)){G=F
}if(!D&&(/^(?:BODY|TD|TH|CAPTION)$/).test(C)){D=F
}F=F.parentNode
}return{blockNode:G,blockContainer:D||F.ownerDocument.body}
};
dijit.range.atBeginningOfContainer=function(B,D,G){var F=false;
var E=(G==0);
if(!E&&D.nodeType==3){if(A.trim(D.nodeValue.substr(0,G))==0){E=true
}}if(E){var C=D;
F=true;
while(C&&C!==B){if(C.previousSibling){F=false;
break
}C=C.parentNode
}}return F
};
dijit.range.atEndOfContainer=function(D,F,G){var C=false;
var B=(G==(F.length||F.childNodes.length));
if(!B&&F.nodeType==3){if(A.trim(F.nodeValue.substr(G))==0){B=true
}}if(B){var E=F;
C=true;
while(E&&E!==D){if(E.nextSibling){C=false;
break
}E=E.parentNode
}}return C
};
dijit.range.adjacentNoneTextNode=function(E,C){var D=E;
var B=(0-E.length)||0;
var F=C?"nextSibling":"previousSibling";
while(D){if(D.nodeType!=3){break
}B+=D.length;
D=D[F]
}return[D,B]
};
dijit.range._w3c=Boolean(window.getSelection);
dijit.range.create=function(){if(dijit.range._w3c){return document.createRange()
}else{return new dijit.range.W3CRange
}};
dijit.range.getSelection=function(D,C){if(dijit.range._w3c){return D.getSelection()
}else{var E=D.__W3CRange;
if(!E||!dijit.range.ie.cachedSelection[E]){var B=new dijit.range.ie.selection(D);
E=(new Date).getTime();
while(E in dijit.range.ie.cachedSelection){E=E+1
}E=String(E);
dijit.range.ie.cachedSelection[E]=B
}else{var B=dijit.range.ie.cachedSelection[E]
}if(!C){B._getCurrentSelection()
}return B
}};
if(!dijit.range._w3c){dijit.range.ie={cachedSelection:{},selection:function(C){this._ranges=[];
this.addRange=function(E,D){this._ranges.push(E);
if(!D){E._select()
}this.rangeCount=this._ranges.length
};
this.removeAllRanges=function(){this._ranges=[];
this.rangeCount=0
};
var B=function(){var E=C.document.selection.createRange();
var D=C.document.selection.type.toUpperCase();
if(D=="CONTROL"){return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(E))
}else{return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(E))
}};
this.getRangeAt=function(D){return this._ranges[D]
};
this._getCurrentSelection=function(){this.removeAllRanges();
var D=B();
if(D){this.addRange(D,true)
}}
},decomposeControlRange:function(D){var C=D.item(0),H=D.item(D.length-1);
var F=C.parentNode,G=H.parentNode;
var B=dijit.range.getIndex(C,F).o;
var E=dijit.range.getIndex(H,G).o+1;
return[[F,B],[G,E]]
},getEndPoint:function(F,E){var D=F.duplicate();
D.collapse(!E);
var I="EndTo"+(E?"End":"Start");
var C=D.parentElement();
var H,B,G;
if(C.childNodes.length>0){A.every(C.childNodes,function(O,N){var K;
if(O.nodeType!=3){D.moveToElementText(O);
if(D.compareEndPoints(I,F)>0){H=O.previousSibling;
if(G&&G.nodeType==3){H=G;
K=true
}else{H=C;
B=N;
return false
}}else{if(N==C.childNodes.length-1){H=C;
B=C.childNodes.length;
return false
}}}else{if(N==C.childNodes.length-1){H=O;
K=true
}}if(K&&H){var M=dijit.range.adjacentNoneTextNode(H)[0];
if(M){H=M.nextSibling
}else{H=C.firstChild
}var L=dijit.range.adjacentNoneTextNode(H);
M=L[0];
var J=L[1];
if(M){D.moveToElementText(M);
D.collapse(false)
}else{D.moveToElementText(C)
}D.setEndPoint(I,F);
B=D.text.length-J;
return false
}G=O;
return true
})
}else{H=C;
B=0
}if(!E&&H.nodeType!=3&&B==H.childNodes.length){if(H.nextSibling&&H.nextSibling.nodeType==3){H=H.nextSibling;
B=0
}}return[H,B]
},setEndPoint:function(F,E,I){var C=F.duplicate();
if(E.nodeType!=3){C.moveToElementText(E);
C.collapse(true);
if(I==E.childNodes.length){if(I>0){var H=E.lastChild;
var B=0;
while(H&&H.nodeType==3){B+=H.length;
E=H;
H=H.previousSibling
}if(H){C.moveToElementText(H)
}C.collapse(false);
I=B
}else{C.moveToElementText(E);
C.collapse(true)
}}else{if(I>0){var H=E.childNodes[I-1];
if(H.nodeType==3){E=H;
I=H.length
}else{C.moveToElementText(H);
C.collapse(false)
}}}}if(E.nodeType==3){var D=dijit.range.adjacentNoneTextNode(E);
var G=D[0],B=D[1];
if(G){C.moveToElementText(G);
C.collapse(false);
if(G.contentEditable!="inherit"){B++
}}else{C.moveToElementText(E.parentNode);
C.collapse(true)
}I+=B;
if(I>0){if(C.moveEnd("character",I)!=I){alert("Error when moving!")
}C.collapse(false)
}}return C
},decomposeTextRange:function(C){var G=dijit.range.ie.getEndPoint(C);
var F=G[0],B=G[1];
var E=G[0],D=G[1];
if(C.htmlText.length){if(C.htmlText==C.text){D=B+C.text.length
}else{G=dijit.range.ie.getEndPoint(C,true);
E=G[0],D=G[1]
}}return[[F,B],[E,D],C.parentElement()]
},setRange:function(F,I,C,H,G,D){var E=dijit.range.ie.setEndPoint(F,I,C);
F.setEndPoint("StartToStart",E);
if(!this.collapsed){var B=dijit.range.ie.setEndPoint(F,H,G);
F.setEndPoint("EndToEnd",B)
}return F
}};
A.declare("dijit.range.W3CRange",null,{constructor:function(){if(arguments.length>0){this.setStart(arguments[0][0][0],arguments[0][0][1]);
this.setEnd(arguments[0][1][0],arguments[0][1][1],arguments[0][2])
}else{this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}},_simpleSetEndPoint:function(E,C,B){var D=(this._body||E.ownerDocument.body).createTextRange();
if(E.nodeType!=1){D.moveToElementText(E.parentNode)
}else{D.moveToElementText(E)
}D.collapse(true);
C.setEndPoint(B?"EndToEnd":"StartToStart",D)
},_updateInternal:function(C){if(this.startContainer!==this.endContainer){if(!C){var B=(this._body||this.startContainer.ownerDocument.body).createTextRange();
this._simpleSetEndPoint(this.startContainer,B);
this._simpleSetEndPoint(this.endContainer,B,true);
C=B.parentElement()
}this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer,C)
}else{this.commonAncestorContainer=this.startContainer
}this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset)
},setStart:function(B,D,C){if(this.startContainer===B&&this.startOffset==D){return 
}delete this._cachedBookmark;
this.startContainer=B;
this.startOffset=D;
if(!this.endContainer){this.setEnd(B,D,C)
}else{this._updateInternal(C)
}},setEnd:function(B,D,C){if(this.endContainer===B&&this.endOffset==D){return 
}delete this._cachedBookmark;
this.endContainer=B;
this.endOffset=D;
if(!this.startContainer){this.setStart(B,D,C)
}else{this._updateInternal(C)
}},setStartAfter:function(B,C){this._setPoint("setStart",B,C,1)
},setStartBefore:function(B,C){this._setPoint("setStart",B,C,0)
},setEndAfter:function(B,C){this._setPoint("setEnd",B,C,1)
},setEndBefore:function(B,C){this._setPoint("setEnd",B,C,0)
},_setPoint:function(E,D,F,C){var B=dijit.range.getIndex(D,D.parentNode).o;
this[E](D.parentNode,B.pop()+C)
},_getIERange:function(){var B=(this._body||this.endContainer.ownerDocument.body).createTextRange();
dijit.range.ie.setRange(B,this.startContainer,this.startOffset,this.endContainer,this.endOffset);
return B
},getBookmark:function(B){this._getIERange();
return this._cachedBookmark
},_select:function(){var B=this._getIERange();
B.select()
},deleteContents:function(){var B=this._getIERange();
B.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true
},cloneRange:function(){var B=new dijit.range.W3CRange([[this.startContainer,this.startOffset],[this.endContainer,this.endOffset]]);
B._body=this._body;
return B
},detach:function(){this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}})
}}}});