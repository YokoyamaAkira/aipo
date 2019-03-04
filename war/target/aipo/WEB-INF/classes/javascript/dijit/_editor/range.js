if(!dojo._hasResource["dijit._editor.range"]){dojo._hasResource["dijit._editor.range"]=true;
dojo.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(B,I){var F=[],C=[];
var H=I;
var G=B;
while(B!=H){var D=0;
var E=B.parentNode,A;
while(A=E.childNodes[D++]){if(A===B){--D;
break
}}if(D>=E.childNodes.length){dojo.debug("Error finding index of a node in dijit.range.getIndex")
}F.unshift(D);
C.unshift(D-E.childNodes.length);
B=E
}if(F.length>0&&G.nodeType==3){var A=G.previousSibling;
while(A&&A.nodeType==3){F[F.length-1]--;
A=A.previousSibling
}A=G.nextSibling;
while(A&&A.nodeType==3){C[C.length-1]++;
A=A.nextSibling
}}return{o:F,r:C}
};
dijit.range.getNode=function(A,B){if(!dojo.isArray(A)||A.length==0){return B
}var C=B;
dojo.every(A,function(D){if(D>=0&&D<C.childNodes.length){C=C.childNodes[D]
}else{C=null;
console.debug("Error: can not find node with index",A,"under parent node",B);
return false
}return true
});
return C
};
dijit.range.getCommonAncestor=function(H,F,I){var G=function(L,K){var J=[];
while(L){J.unshift(L);
if(L!=K&&L.tagName!="BODY"){L=L.parentNode
}else{break
}}return J
};
var B=G(H,I);
var E=G(F,I);
var C=Math.min(B.length,E.length);
var A=B[0];
for(var D=1;
D<C;
D++){if(B[D]===E[D]){A=B[D]
}else{break
}}return A
};
dijit.range.getAncestor=function(D,C,A){A=A||D.ownerDocument.body;
while(D&&D!==A){var B=D.nodeName.toUpperCase();
if(C.test(B)){return D
}D=D.parentNode
}return null
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(E,D,A){A=A||E.ownerDocument.body;
D=D||dijit.range.BlockTagNames;
var F=null,C;
while(E&&E!==A){var B=E.nodeName.toUpperCase();
if(!F&&D.test(B)){F=E
}if(!C&&(/^(?:BODY|TD|TH|CAPTION)$/).test(B)){C=E
}E=E.parentNode
}return{blockNode:F,blockContainer:C||E.ownerDocument.body}
};
dijit.range.atBeginningOfContainer=function(A,C,F){var E=false;
var D=(F==0);
if(!D&&C.nodeType==3){if(dojo.trim(C.nodeValue.substr(0,F))==0){D=true
}}if(D){var B=C;
E=true;
while(B&&B!==A){if(B.previousSibling){E=false;
break
}B=B.parentNode
}}return E
};
dijit.range.atEndOfContainer=function(C,E,F){var B=false;
var A=(F==(E.length||E.childNodes.length));
if(!A&&E.nodeType==3){if(dojo.trim(E.nodeValue.substr(F))==0){A=true
}}if(A){var D=E;
B=true;
while(D&&D!==C){if(D.nextSibling){B=false;
break
}D=D.parentNode
}}return B
};
dijit.range.adjacentNoneTextNode=function(D,B){var C=D;
var A=(0-D.length)||0;
var E=B?"nextSibling":"previousSibling";
while(C){if(C.nodeType!=3){break
}A+=C.length;
C=C[E]
}return[C,A]
};
dijit.range._w3c=Boolean(window.getSelection);
dijit.range.create=function(){if(dijit.range._w3c){return document.createRange()
}else{return new dijit.range.W3CRange
}};
dijit.range.getSelection=function(C,B){if(dijit.range._w3c){return C.getSelection()
}else{var D=C.__W3CRange;
if(!D||!dijit.range.ie.cachedSelection[D]){var A=new dijit.range.ie.selection(C);
D=(new Date).getTime();
while(D in dijit.range.ie.cachedSelection){D=D+1
}D=String(D);
dijit.range.ie.cachedSelection[D]=A
}else{var A=dijit.range.ie.cachedSelection[D]
}if(!B){A._getCurrentSelection()
}return A
}};
if(!dijit.range._w3c){dijit.range.ie={cachedSelection:{},selection:function(B){this._ranges=[];
this.addRange=function(D,C){this._ranges.push(D);
if(!C){D._select()
}this.rangeCount=this._ranges.length
};
this.removeAllRanges=function(){this._ranges=[];
this.rangeCount=0
};
var A=function(){var D=B.document.selection.createRange();
var C=B.document.selection.type.toUpperCase();
if(C=="CONTROL"){return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(D))
}else{return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(D))
}};
this.getRangeAt=function(C){return this._ranges[C]
};
this._getCurrentSelection=function(){this.removeAllRanges();
var C=A();
if(C){this.addRange(C,true)
}}
},decomposeControlRange:function(C){var B=C.item(0),G=C.item(C.length-1);
var E=B.parentNode,F=G.parentNode;
var A=dijit.range.getIndex(B,E).o;
var D=dijit.range.getIndex(G,F).o+1;
return[[E,A],[F,D]]
},getEndPoint:function(E,D){var C=E.duplicate();
C.collapse(!D);
var H="EndTo"+(D?"End":"Start");
var B=C.parentElement();
var G,A,F;
if(B.childNodes.length>0){dojo.every(B.childNodes,function(N,M){var J;
if(N.nodeType!=3){C.moveToElementText(N);
if(C.compareEndPoints(H,E)>0){G=N.previousSibling;
if(F&&F.nodeType==3){G=F;
J=true
}else{G=B;
A=M;
return false
}}else{if(M==B.childNodes.length-1){G=B;
A=B.childNodes.length;
return false
}}}else{if(M==B.childNodes.length-1){G=N;
J=true
}}if(J&&G){var L=dijit.range.adjacentNoneTextNode(G)[0];
if(L){G=L.nextSibling
}else{G=B.firstChild
}var K=dijit.range.adjacentNoneTextNode(G);
L=K[0];
var I=K[1];
if(L){C.moveToElementText(L);
C.collapse(false)
}else{C.moveToElementText(B)
}C.setEndPoint(H,E);
A=C.text.length-I;
return false
}F=N;
return true
})
}else{G=B;
A=0
}if(!D&&G.nodeType!=3&&A==G.childNodes.length){if(G.nextSibling&&G.nextSibling.nodeType==3){G=G.nextSibling;
A=0
}}return[G,A]
},setEndPoint:function(E,D,H){var B=E.duplicate();
if(D.nodeType!=3){B.moveToElementText(D);
B.collapse(true);
if(H==D.childNodes.length){if(H>0){var G=D.lastChild;
var A=0;
while(G&&G.nodeType==3){A+=G.length;
D=G;
G=G.previousSibling
}if(G){B.moveToElementText(G)
}B.collapse(false);
H=A
}else{B.moveToElementText(D);
B.collapse(true)
}}else{if(H>0){var G=D.childNodes[H-1];
if(G.nodeType==3){D=G;
H=G.length
}else{B.moveToElementText(G);
B.collapse(false)
}}}}if(D.nodeType==3){var C=dijit.range.adjacentNoneTextNode(D);
var F=C[0],A=C[1];
if(F){B.moveToElementText(F);
B.collapse(false);
if(F.contentEditable!="inherit"){A++
}}else{B.moveToElementText(D.parentNode);
B.collapse(true)
}H+=A;
if(H>0){if(B.moveEnd("character",H)!=H){alert("Error when moving!")
}B.collapse(false)
}}return B
},decomposeTextRange:function(B){var F=dijit.range.ie.getEndPoint(B);
var E=F[0],A=F[1];
var D=F[0],C=F[1];
if(B.htmlText.length){if(B.htmlText==B.text){C=A+B.text.length
}else{F=dijit.range.ie.getEndPoint(B,true);
D=F[0],C=F[1]
}}return[[E,A],[D,C],B.parentElement()]
},setRange:function(E,H,B,G,F,C){var D=dijit.range.ie.setEndPoint(E,H,B);
E.setEndPoint("StartToStart",D);
if(!this.collapsed){var A=dijit.range.ie.setEndPoint(E,G,F);
E.setEndPoint("EndToEnd",A)
}return E
}};
dojo.declare("dijit.range.W3CRange",null,{constructor:function(){if(arguments.length>0){this.setStart(arguments[0][0][0],arguments[0][0][1]);
this.setEnd(arguments[0][1][0],arguments[0][1][1],arguments[0][2])
}else{this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}},_simpleSetEndPoint:function(D,B,A){var C=(this._body||D.ownerDocument.body).createTextRange();
if(D.nodeType!=1){C.moveToElementText(D.parentNode)
}else{C.moveToElementText(D)
}C.collapse(true);
B.setEndPoint(A?"EndToEnd":"StartToStart",C)
},_updateInternal:function(B){if(this.startContainer!==this.endContainer){if(!B){var A=(this._body||this.startContainer.ownerDocument.body).createTextRange();
this._simpleSetEndPoint(this.startContainer,A);
this._simpleSetEndPoint(this.endContainer,A,true);
B=A.parentElement()
}this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer,B)
}else{this.commonAncestorContainer=this.startContainer
}this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset)
},setStart:function(A,C,B){if(this.startContainer===A&&this.startOffset==C){return 
}delete this._cachedBookmark;
this.startContainer=A;
this.startOffset=C;
if(!this.endContainer){this.setEnd(A,C,B)
}else{this._updateInternal(B)
}},setEnd:function(A,C,B){if(this.endContainer===A&&this.endOffset==C){return 
}delete this._cachedBookmark;
this.endContainer=A;
this.endOffset=C;
if(!this.startContainer){this.setStart(A,C,B)
}else{this._updateInternal(B)
}},setStartAfter:function(A,B){this._setPoint("setStart",A,B,1)
},setStartBefore:function(A,B){this._setPoint("setStart",A,B,0)
},setEndAfter:function(A,B){this._setPoint("setEnd",A,B,1)
},setEndBefore:function(A,B){this._setPoint("setEnd",A,B,0)
},_setPoint:function(D,C,E,B){var A=dijit.range.getIndex(C,C.parentNode).o;
this[D](C.parentNode,A.pop()+B)
},_getIERange:function(){var A=(this._body||this.endContainer.ownerDocument.body).createTextRange();
dijit.range.ie.setRange(A,this.startContainer,this.startOffset,this.endContainer,this.endOffset);
return A
},getBookmark:function(A){this._getIERange();
return this._cachedBookmark
},_select:function(){var A=this._getIERange();
A.select()
},deleteContents:function(){var A=this._getIERange();
A.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true
},cloneRange:function(){var A=new dijit.range.W3CRange([[this.startContainer,this.startOffset],[this.endContainer,this.endOffset]]);
A._body=this._body;
return A
},detach:function(){this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}})
}};