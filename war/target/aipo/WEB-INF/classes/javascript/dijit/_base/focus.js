if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var C=dojo.global;
var A=dojo.doc;
if(A.selection){return !A.selection.createRange().text
}else{if(C.getSelection){var B=C.getSelection();
if(dojo.isString(B)){return !B
}else{return B.isCollapsed||!B.toString()
}}}},getBookmark:function(){var C,B=dojo.doc.selection;
if(B){var A=B.createRange();
if(B.type.toUpperCase()=="CONTROL"){C=A.length?dojo._toArray(A):null
}else{C=A.getBookmark()
}}else{if(dojo.global.getSelection){B=dojo.global.getSelection();
if(B){var A=B.getRangeAt(0);
C=A.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return C
},moveToBookmark:function(D){var A=dojo.doc;
if(A.selection){var B;
if(dojo.isArray(D)){B=A.body.createControlRange();
dojo.forEach(D,B.addElement)
}else{B=A.selection.createRange();
B.moveToBookmark(D)
}B.select()
}else{var C=dojo.global.getSelection&&dojo.global.getSelection();
if(C&&C.removeAllRanges){C.removeAllRanges();
C.addRange(D)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,A){return{node:B&&dojo.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(A||dojo.global,dijit.isCollapsed)?dojo.withGlobal(A||dojo.global,dijit.getBookmark):null,openedForWindow:A}
},focus:function(D){if(!D){return 
}var C="node" in D?D.node:D,B=D.bookmark,A=D.openedForWindow;
if(C){var F=(C.tagName.toLowerCase()=="iframe")?C.contentWindow:C;
if(F&&F.focus){try{F.focus()
}catch(E){}}dijit._onFocusNode(C)
}if(B&&dojo.withGlobal(A||dojo.global,dijit.isCollapsed)){if(A){A.focus()
}try{dojo.withGlobal(A||dojo.global,moveToBookmark,null,[B])
}catch(E){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
}dojo.connect(B.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var A=B.document.body||B.document.getElementsByTagName("body")[0];
if(A){if(dojo.isIE){A.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
A.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{A.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
A.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}A=null
},_onBlurNode:function(B){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=false;
A._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(B){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var A=[];
try{while(B){if(B.dijitPopupParent){B=dijit.byId(B.dijitPopupParent).domNode
}else{if(B.tagName&&B.tagName.toLowerCase()=="body"){if(B===dojo.body()){break
}B=dojo.query("iframe").filter(function(E){return E.contentDocument.body===B
})[0]
}else{var D=B.getAttribute&&B.getAttribute("widgetId");
if(D){A.unshift(D)
}B=B.parentNode
}}}}catch(C){}dijit._setStack(A)
},_onFocusNode:function(B){if(B&&B.tagName&&B.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(B);
if(B==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=B;
dojo.publish("focusNode",[B]);
var A=dijit.getEnclosingWidget(B);
if(A&&A._setStateClass){A._focused=true;
A._setStateClass()
}},_setStack:function(A){var E=dijit._activeStack;
dijit._activeStack=A;
for(var C=0;
C<Math.min(E.length,A.length);
C++){if(E[C]!=A[C]){break
}}for(var B=E.length-1;
B>=C;
B--){var D=dijit.byId(E[B]);
if(D){dojo.publish("widgetBlur",[D]);
if(D._onBlur){D._onBlur()
}}}for(var B=C;
B<A.length;
B++){var D=dijit.byId(A[B]);
if(D){dojo.publish("widgetFocus",[D]);
if(D._onFocus){D._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
};