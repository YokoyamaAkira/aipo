dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"]],defineResource:function(A){if(!A._hasResource["dijit._base.focus"]){A._hasResource["dijit._base.focus"]=true;
A.provide("dijit._base.focus");
A.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var B=A.global;
var C=A.doc;
if(C.selection){return !C.selection.createRange().text
}else{if(B.getSelection){var D=B.getSelection();
if(A.isString(D)){return !D
}else{return D.isCollapsed||!D.toString()
}}}},getBookmark:function(){var B,D=A.doc.selection;
if(D){var C=D.createRange();
if(D.type.toUpperCase()=="CONTROL"){B=C.length?A._toArray(C):null
}else{B=C.getBookmark()
}}else{if(A.global.getSelection){D=A.global.getSelection();
if(D){var C=D.getRangeAt(0);
B=C.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return B
},moveToBookmark:function(B){var C=A.doc;
if(C.selection){var D;
if(A.isArray(B)){D=C.body.createControlRange();
A.forEach(B,D.addElement)
}else{D=C.selection.createRange();
D.moveToBookmark(B)
}D.select()
}else{var E=A.global.getSelection&&A.global.getSelection();
if(E&&E.removeAllRanges){E.removeAllRanges();
E.addRange(B)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(B,C){return{node:B&&A.isDescendant(dijit._curFocus,B.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!A.withGlobal(C||A.global,dijit.isCollapsed)?A.withGlobal(C||A.global,dijit.getBookmark):null,openedForWindow:C}
},focus:function(F){if(!F){return 
}var E="node" in F?F.node:F,D=F.bookmark,C=F.openedForWindow;
if(E){var B=(E.tagName.toLowerCase()=="iframe")?E.contentWindow:E;
if(B&&B.focus){try{B.focus()
}catch(G){}}dijit._onFocusNode(E)
}if(D&&A.withGlobal(C||A.global,dijit.isCollapsed)){if(C){C.focus()
}try{A.withGlobal(C||A.global,moveToBookmark,null,[D])
}catch(G){}}},_activeStack:[],registerWin:function(B){if(!B){B=window
}A.connect(B.document,"onmousedown",null,function(D){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(D.target||D.srcElement)
});
var C=B.document.body||B.document.getElementsByTagName("body")[0];
if(C){if(A.isIE){C.attachEvent("onactivate",function(D){if(D.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(D.srcElement)
}});
C.attachEvent("ondeactivate",function(D){dijit._onBlurNode(D.srcElement)
})
}else{C.addEventListener("focus",function(D){dijit._onFocusNode(D.target)
},true);
C.addEventListener("blur",function(D){dijit._onBlurNode(D.target)
},true)
}}C=null
},_onBlurNode:function(B){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var C=dijit.getEnclosingWidget(B);
if(C&&C._setStateClass){C._focused=false;
C._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(D){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var C=[];
try{while(D){if(D.dijitPopupParent){D=dijit.byId(D.dijitPopupParent).domNode
}else{if(D.tagName&&D.tagName.toLowerCase()=="body"){if(D===A.body()){break
}D=A.query("iframe").filter(function(F){return F.contentDocument.body===D
})[0]
}else{var B=D.getAttribute&&D.getAttribute("widgetId");
if(B){C.unshift(B)
}D=D.parentNode
}}}}catch(E){}dijit._setStack(C)
},_onFocusNode:function(B){if(B&&B.tagName&&B.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(B);
if(B==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=B;
A.publish("focusNode",[B]);
var C=dijit.getEnclosingWidget(B);
if(C&&C._setStateClass){C._focused=true;
C._setStateClass()
}},_setStack:function(C){var B=dijit._activeStack;
dijit._activeStack=C;
for(var E=0;
E<Math.min(B.length,C.length);
E++){if(B[E]!=C[E]){break
}}for(var D=B.length-1;
D>=E;
D--){var F=dijit.byId(B[D]);
if(F){A.publish("widgetBlur",[F]);
if(F._onBlur){F._onBlur()
}}}for(var D=E;
D<C.length;
D++){var F=dijit.byId(C[D]);
if(F){A.publish("widgetFocus",[F]);
if(F._onFocus){F._onFocus()
}}}}});
A.addOnLoad(dijit.registerWin)
}}});