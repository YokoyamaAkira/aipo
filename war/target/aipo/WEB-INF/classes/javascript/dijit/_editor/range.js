if(!dojo._hasResource["dijit._editor.range"]){dojo._hasResource["dijit._editor.range"]=true;
dojo.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(G,E){var B=[],H=[];
var D=E;
var C=G;
while(G!=D){var I=0;
var A=G.parentNode,F;
while(F=A.childNodes[I++]){if(F===G){--I;
break
}}if(I>=A.childNodes.length){dojo.debug("Error finding index of a node in dijit.range.getIndex")
}B.unshift(I);
H.unshift(I-A.childNodes.length);
G=A
}if(B.length>0&&C.nodeType==3){var F=C.previousSibling;
while(F&&F.nodeType==3){B[B.length-1]--;
F=F.previousSibling
}F=C.nextSibling;
while(F&&F.nodeType==3){H[H.length-1]++;
F=F.nextSibling
}}return{o:B,r:H}
};
dijit.range.getNode=function(C,A){if(!dojo.isArray(C)||C.length==0){return A
}var B=A;
dojo.every(C,function(D){if(D>=0&&D<B.childNodes.length){B=B.childNodes[D]
}else{B=null;
console.debug("Error: can not find node with index",C,"under parent node",A);
return false
}return true
});
return B
};
dijit.range.getCommonAncestor=function(D,B,E){var C=function(J,L){var K=[];
while(J){K.unshift(J);
if(J!=L&&J.tagName!="BODY"){J=J.parentNode
}else{break
}}return K
};
var G=C(D,E);
var A=C(B,E);
var H=Math.min(G.length,A.length);
var F=G[0];
for(var I=1;
I<H;
I++){if(G[I]===A[I]){F=G[I]
}else{break
}}return F
};
dijit.range.getAncestor=function(C,B,D){D=D||C.ownerDocument.body;
while(C&&C!==D){var A=C.nodeName.toUpperCase();
if(B.test(A)){return C
}C=C.parentNode
}return null
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(D,C,F){F=F||D.ownerDocument.body;
C=C||dijit.range.BlockTagNames;
var E=null,B;
while(D&&D!==F){var A=D.nodeName.toUpperCase();
if(!E&&C.test(A)){E=D
}if(!B&&(/^(?:BODY|TD|TH|CAPTION)$/).test(A)){B=D
}D=D.parentNode
}return{blockNode:E,blockContainer:B||D.ownerDocument.body}
};
dijit.range.atBeginningOfContainer=function(F,B,E){var D=false;
var C=(E==0);
if(!C&&B.nodeType==3){if(dojo.trim(B.nodeValue.substr(0,E))==0){C=true
}}if(C){var A=B;
D=true;
while(A&&A!==F){if(A.previousSibling){D=false;
break
}A=A.parentNode
}}return D
};
dijit.range.atEndOfContainer=function(B,D,E){var A=false;
var F=(E==(D.length||D.childNodes.length));
if(!F&&D.nodeType==3){if(dojo.trim(D.nodeValue.substr(E))==0){F=true
}}if(F){var C=D;
A=true;
while(C&&C!==B){if(C.nextSibling){A=false;
break
}C=C.parentNode
}}return A
};
dijit.range.adjacentNoneTextNode=function(C,A){var B=C;
var E=(0-C.length)||0;
var D=A?"nextSibling":"previousSibling";
while(B){if(B.nodeType!=3){break
}E+=B.length;
B=B[D]
}return[B,E]
};
dijit.range._w3c=Boolean(window.getSelection);
dijit.range.create=function(){if(dijit.range._w3c){return document.createRange()
}else{return new dijit.range.W3CRange
}};
dijit.range.getSelection=function(B,A){if(dijit.range._w3c){return B.getSelection()
}else{var C=B.__W3CRange;
if(!C||!dijit.range.ie.cachedSelection[C]){var D=new dijit.range.ie.selection(B);
C=(new Date).getTime();
while(C in dijit.range.ie.cachedSelection){C=C+1
}C=String(C);
dijit.range.ie.cachedSelection[C]=D
}else{var D=dijit.range.ie.cachedSelection[C]
}if(!A){D._getCurrentSelection()
}return D
}};
if(!dijit.range._w3c){dijit.range.ie={cachedSelection:{},selection:function(A){this._ranges=[];
this.addRange=function(C,D){this._ranges.push(C);
if(!D){C._select()
}this.rangeCount=this._ranges.length
};
this.removeAllRanges=function(){this._ranges=[];
this.rangeCount=0
};
var B=function(){var C=A.document.selection.createRange();
var D=A.document.selection.type.toUpperCase();
if(D=="CONTROL"){return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(C))
}else{return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(C))
}};
this.getRangeAt=function(C){return this._ranges[C]
};
this._getCurrentSelection=function(){this.removeAllRanges();
var C=B();
if(C){this.addRange(C,true)
}}
},decomposeControlRange:function(G){var F=G.item(0),D=G.item(G.length-1);
var B=F.parentNode,C=D.parentNode;
var E=dijit.range.getIndex(F,B).o;
var A=dijit.range.getIndex(D,C).o+1;
return[[B,E],[C,A]]
},getEndPoint:function(H,G){var F=H.duplicate();
F.collapse(!G);
var C="EndTo"+(G?"End":"Start");
var E=F.parentElement();
var B,D,A;
if(E.childNodes.length>0){dojo.every(E.childNodes,function(K,J){var M;
if(K.nodeType!=3){F.moveToElementText(K);
if(F.compareEndPoints(C,H)>0){B=K.previousSibling;
if(A&&A.nodeType==3){B=A;
M=true
}else{B=E;
D=J;
return false
}}else{if(J==E.childNodes.length-1){B=E;
D=E.childNodes.length;
return false
}}}else{if(J==E.childNodes.length-1){B=K;
M=true
}}if(M&&B){var I=dijit.range.adjacentNoneTextNode(B)[0];
if(I){B=I.nextSibling
}else{B=E.firstChild
}var N=dijit.range.adjacentNoneTextNode(B);
I=N[0];
var L=N[1];
if(I){F.moveToElementText(I);
F.collapse(false)
}else{F.moveToElementText(E)
}F.setEndPoint(C,H);
D=F.text.length-L;
return false
}A=K;
return true
})
}else{B=E;
D=0
}if(!G&&B.nodeType!=3&&D==B.childNodes.length){if(B.nextSibling&&B.nextSibling.nodeType==3){B=B.nextSibling;
D=0
}}return[B,D]
},setEndPoint:function(H,G,C){var E=H.duplicate();
if(G.nodeType!=3){E.moveToElementText(G);
E.collapse(true);
if(C==G.childNodes.length){if(C>0){var B=G.lastChild;
var D=0;
while(B&&B.nodeType==3){D+=B.length;
G=B;
B=B.previousSibling
}if(B){E.moveToElementText(B)
}E.collapse(false);
C=D
}else{E.moveToElementText(G);
E.collapse(true)
}}else{if(C>0){var B=G.childNodes[C-1];
if(B.nodeType==3){G=B;
C=B.length
}else{E.moveToElementText(B);
E.collapse(false)
}}}}if(G.nodeType==3){var F=dijit.range.adjacentNoneTextNode(G);
var A=F[0],D=F[1];
if(A){E.moveToElementText(A);
E.collapse(false);
if(A.contentEditable!="inherit"){D++
}}else{E.moveToElementText(G.parentNode);
E.collapse(true)
}C+=D;
if(C>0){if(E.moveEnd("character",C)!=C){alert("Error when moving!")
}E.collapse(false)
}}return E
},decomposeTextRange:function(A){var E=dijit.range.ie.getEndPoint(A);
var D=E[0],F=E[1];
var C=E[0],B=E[1];
if(A.htmlText.length){if(A.htmlText==A.text){B=F+A.text.length
}else{E=dijit.range.ie.getEndPoint(A,true);
C=E[0],B=E[1]
}}return[[D,F],[C,B],A.parentElement()]
},setRange:function(H,C,E,B,A,F){var G=dijit.range.ie.setEndPoint(H,C,E);
H.setEndPoint("StartToStart",G);
if(!this.collapsed){var D=dijit.range.ie.setEndPoint(H,B,A);
H.setEndPoint("EndToEnd",D)
}return H
}};
dojo.declare("dijit.range.W3CRange",null,{constructor:function(){if(arguments.length>0){this.setStart(arguments[0][0][0],arguments[0][0][1]);
this.setEnd(arguments[0][1][0],arguments[0][1][1],arguments[0][2])
}else{this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}},_simpleSetEndPoint:function(C,A,D){var B=(this._body||C.ownerDocument.body).createTextRange();
if(C.nodeType!=1){B.moveToElementText(C.parentNode)
}else{B.moveToElementText(C)
}B.collapse(true);
A.setEndPoint(D?"EndToEnd":"StartToStart",B)
},_updateInternal:function(A){if(this.startContainer!==this.endContainer){if(!A){var B=(this._body||this.startContainer.ownerDocument.body).createTextRange();
this._simpleSetEndPoint(this.startContainer,B);
this._simpleSetEndPoint(this.endContainer,B,true);
A=B.parentElement()
}this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer,A)
}else{this.commonAncestorContainer=this.startContainer
}this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset)
},setStart:function(C,B,A){if(this.startContainer===C&&this.startOffset==B){return 
}delete this._cachedBookmark;
this.startContainer=C;
this.startOffset=B;
if(!this.endContainer){this.setEnd(C,B,A)
}else{this._updateInternal(A)
}},setEnd:function(C,B,A){if(this.endContainer===C&&this.endOffset==B){return 
}delete this._cachedBookmark;
this.endContainer=C;
this.endOffset=B;
if(!this.startContainer){this.setStart(C,B,A)
}else{this._updateInternal(A)
}},setStartAfter:function(B,A){this._setPoint("setStart",B,A,1)
},setStartBefore:function(B,A){this._setPoint("setStart",B,A,0)
},setEndAfter:function(B,A){this._setPoint("setEnd",B,A,1)
},setEndBefore:function(B,A){this._setPoint("setEnd",B,A,0)
},_setPoint:function(C,B,D,A){var E=dijit.range.getIndex(B,B.parentNode).o;
this[C](B.parentNode,E.pop()+A)
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