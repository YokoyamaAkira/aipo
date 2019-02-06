dojo._xdResourceLoaded({depends:[["provide","dijit._editor.range"]],defineResource:function(A){if(!A._hasResource["dijit._editor.range"]){A._hasResource["dijit._editor.range"]=true;
A.provide("dijit._editor.range");
dijit.range={};
dijit.range.getIndex=function(J,H){var E=[],B=[];
var G=H;
var F=J;
while(J!=G){var C=0;
var D=J.parentNode,I;
while(I=D.childNodes[C++]){if(I===J){--C;
break
}}if(C>=D.childNodes.length){A.debug("Error finding index of a node in dijit.range.getIndex")
}E.unshift(C);
B.unshift(C-D.childNodes.length);
J=D
}if(E.length>0&&F.nodeType==3){var I=F.previousSibling;
while(I&&I.nodeType==3){E[E.length-1]--;
I=I.previousSibling
}I=F.nextSibling;
while(I&&I.nodeType==3){B[B.length-1]++;
I=I.nextSibling
}}return{o:E,r:B}
};
dijit.range.getNode=function(C,D){if(!A.isArray(C)||C.length==0){return D
}var B=D;
A.every(C,function(E){if(E>=0&&E<B.childNodes.length){B=B.childNodes[E]
}else{B=null;
console.debug("Error: can not find node with index",C,"under parent node",D);
return false
}return true
});
return B
};
dijit.range.getCommonAncestor=function(G,E,H){var F=function(K,M){var L=[];
while(K){L.unshift(K);
if(K!=M&&K.tagName!="BODY"){K=K.parentNode
}else{break
}}return L
};
var J=F(G,H);
var D=F(E,H);
var B=Math.min(J.length,D.length);
var I=J[0];
for(var C=1;
C<B;
C++){if(J[C]===D[C]){I=J[C]
}else{break
}}return I
};
dijit.range.getAncestor=function(B,E,C){C=C||B.ownerDocument.body;
while(B&&B!==C){var D=B.nodeName.toUpperCase();
if(E.test(D)){return B
}B=B.parentNode
}return null
};
dijit.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;
dijit.range.getBlockAncestor=function(G,F,C){C=C||G.ownerDocument.body;
F=F||dijit.range.BlockTagNames;
var B=null,E;
while(G&&G!==C){var D=G.nodeName.toUpperCase();
if(!B&&F.test(D)){B=G
}if(!E&&(/^(?:BODY|TD|TH|CAPTION)$/).test(D)){E=G
}G=G.parentNode
}return{blockNode:B,blockContainer:E||G.ownerDocument.body}
};
dijit.range.atBeginningOfContainer=function(C,E,B){var G=false;
var F=(B==0);
if(!F&&E.nodeType==3){if(A.trim(E.nodeValue.substr(0,B))==0){F=true
}}if(F){var D=E;
G=true;
while(D&&D!==C){if(D.previousSibling){G=false;
break
}D=D.parentNode
}}return G
};
dijit.range.atEndOfContainer=function(E,G,C){var D=false;
var B=(C==(G.length||G.childNodes.length));
if(!B&&G.nodeType==3){if(A.trim(G.nodeValue.substr(C))==0){B=true
}}if(B){var F=G;
D=true;
while(F&&F!==E){if(F.nextSibling){D=false;
break
}F=F.parentNode
}}return D
};
dijit.range.adjacentNoneTextNode=function(F,D){var E=F;
var C=(0-F.length)||0;
var B=D?"nextSibling":"previousSibling";
while(E){if(E.nodeType!=3){break
}C+=E.length;
E=E[B]
}return[E,C]
};
dijit.range._w3c=Boolean(window.getSelection);
dijit.range.create=function(){if(dijit.range._w3c){return document.createRange()
}else{return new dijit.range.W3CRange
}};
dijit.range.getSelection=function(E,D){if(dijit.range._w3c){return E.getSelection()
}else{var B=E.__W3CRange;
if(!B||!dijit.range.ie.cachedSelection[B]){var C=new dijit.range.ie.selection(E);
B=(new Date).getTime();
while(B in dijit.range.ie.cachedSelection){B=B+1
}B=String(B);
dijit.range.ie.cachedSelection[B]=C
}else{var C=dijit.range.ie.cachedSelection[B]
}if(!D){C._getCurrentSelection()
}return C
}};
if(!dijit.range._w3c){dijit.range.ie={cachedSelection:{},selection:function(B){this._ranges=[];
this.addRange=function(E,D){this._ranges.push(E);
if(!D){E._select()
}this.rangeCount=this._ranges.length
};
this.removeAllRanges=function(){this._ranges=[];
this.rangeCount=0
};
var C=function(){var E=B.document.selection.createRange();
var D=B.document.selection.type.toUpperCase();
if(D=="CONTROL"){return new dijit.range.W3CRange(dijit.range.ie.decomposeControlRange(E))
}else{return new dijit.range.W3CRange(dijit.range.ie.decomposeTextRange(E))
}};
this.getRangeAt=function(D){return this._ranges[D]
};
this._getCurrentSelection=function(){this.removeAllRanges();
var D=C();
if(D){this.addRange(D,true)
}}
},decomposeControlRange:function(C){var H=C.item(0),B=C.item(C.length-1);
var E=H.parentNode,F=B.parentNode;
var G=dijit.range.getIndex(H,E).o;
var D=dijit.range.getIndex(B,F).o+1;
return[[E,G],[F,D]]
},getEndPoint:function(C,I){var H=C.duplicate();
H.collapse(!I);
var B="EndTo"+(I?"End":"Start");
var G=H.parentElement();
var E,F,D;
if(G.childNodes.length>0){A.every(G.childNodes,function(L,K){var N;
if(L.nodeType!=3){H.moveToElementText(L);
if(H.compareEndPoints(B,C)>0){E=L.previousSibling;
if(D&&D.nodeType==3){E=D;
N=true
}else{E=G;
F=K;
return false
}}else{if(K==G.childNodes.length-1){E=G;
F=G.childNodes.length;
return false
}}}else{if(K==G.childNodes.length-1){E=L;
N=true
}}if(N&&E){var J=dijit.range.adjacentNoneTextNode(E)[0];
if(J){E=J.nextSibling
}else{E=G.firstChild
}var O=dijit.range.adjacentNoneTextNode(E);
J=O[0];
var M=O[1];
if(J){H.moveToElementText(J);
H.collapse(false)
}else{H.moveToElementText(G)
}H.setEndPoint(B,C);
F=H.text.length-M;
return false
}D=L;
return true
})
}else{E=G;
F=0
}if(!I&&E.nodeType!=3&&F==E.childNodes.length){if(E.nextSibling&&E.nextSibling.nodeType==3){E=E.nextSibling;
F=0
}}return[E,F]
},setEndPoint:function(C,I,B){var G=C.duplicate();
if(I.nodeType!=3){G.moveToElementText(I);
G.collapse(true);
if(B==I.childNodes.length){if(B>0){var E=I.lastChild;
var F=0;
while(E&&E.nodeType==3){F+=E.length;
I=E;
E=E.previousSibling
}if(E){G.moveToElementText(E)
}G.collapse(false);
B=F
}else{G.moveToElementText(I);
G.collapse(true)
}}else{if(B>0){var E=I.childNodes[B-1];
if(E.nodeType==3){I=E;
B=E.length
}else{G.moveToElementText(E);
G.collapse(false)
}}}}if(I.nodeType==3){var H=dijit.range.adjacentNoneTextNode(I);
var D=H[0],F=H[1];
if(D){G.moveToElementText(D);
G.collapse(false);
if(D.contentEditable!="inherit"){F++
}}else{G.moveToElementText(I.parentNode);
G.collapse(true)
}B+=F;
if(B>0){if(G.moveEnd("character",B)!=B){alert("Error when moving!")
}G.collapse(false)
}}return G
},decomposeTextRange:function(D){var C=dijit.range.ie.getEndPoint(D);
var G=C[0],B=C[1];
var F=C[0],E=C[1];
if(D.htmlText.length){if(D.htmlText==D.text){E=B+D.text.length
}else{C=dijit.range.ie.getEndPoint(D,true);
F=C[0],E=C[1]
}}return[[G,B],[F,E],D.parentElement()]
},setRange:function(C,B,G,E,D,H){var I=dijit.range.ie.setEndPoint(C,B,G);
C.setEndPoint("StartToStart",I);
if(!this.collapsed){var F=dijit.range.ie.setEndPoint(C,E,D);
C.setEndPoint("EndToEnd",F)
}return C
}};
A.declare("dijit.range.W3CRange",null,{constructor:function(){if(arguments.length>0){this.setStart(arguments[0][0][0],arguments[0][0][1]);
this.setEnd(arguments[0][1][0],arguments[0][1][1],arguments[0][2])
}else{this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true
}},_simpleSetEndPoint:function(B,D,C){var E=(this._body||B.ownerDocument.body).createTextRange();
if(B.nodeType!=1){E.moveToElementText(B.parentNode)
}else{E.moveToElementText(B)
}E.collapse(true);
D.setEndPoint(C?"EndToEnd":"StartToStart",E)
},_updateInternal:function(B){if(this.startContainer!==this.endContainer){if(!B){var C=(this._body||this.startContainer.ownerDocument.body).createTextRange();
this._simpleSetEndPoint(this.startContainer,C);
this._simpleSetEndPoint(this.endContainer,C,true);
B=C.parentElement()
}this.commonAncestorContainer=dijit.range.getCommonAncestor(this.startContainer,this.endContainer,B)
}else{this.commonAncestorContainer=this.startContainer
}this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset)
},setStart:function(C,B,D){if(this.startContainer===C&&this.startOffset==B){return 
}delete this._cachedBookmark;
this.startContainer=C;
this.startOffset=B;
if(!this.endContainer){this.setEnd(C,B,D)
}else{this._updateInternal(D)
}},setEnd:function(C,B,D){if(this.endContainer===C&&this.endOffset==B){return 
}delete this._cachedBookmark;
this.endContainer=C;
this.endOffset=B;
if(!this.startContainer){this.setStart(C,B,D)
}else{this._updateInternal(D)
}},setStartAfter:function(C,B){this._setPoint("setStart",C,B,1)
},setStartBefore:function(C,B){this._setPoint("setStart",C,B,0)
},setEndAfter:function(C,B){this._setPoint("setEnd",C,B,1)
},setEndBefore:function(C,B){this._setPoint("setEnd",C,B,0)
},_setPoint:function(F,E,B,D){var C=dijit.range.getIndex(E,E.parentNode).o;
this[F](E.parentNode,C.pop()+D)
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