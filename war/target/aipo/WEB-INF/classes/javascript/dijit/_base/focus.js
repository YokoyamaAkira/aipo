if(!dojo._hasResource["dijit._base.focus"]){dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var B=dojo.global;
var C=dojo.doc;
if(C.selection){return !C.selection.createRange().text
}else{if(B.getSelection){var A=B.getSelection();
if(dojo.isString(A)){return !A
}else{return A.isCollapsed||!A.toString()
}}}},getBookmark:function(){var B,A=dojo.doc.selection;
if(A){var C=A.createRange();
if(A.type.toUpperCase()=="CONTROL"){B=C.length?dojo._toArray(C):null
}else{B=C.getBookmark()
}}else{if(dojo.global.getSelection){A=dojo.global.getSelection();
if(A){var C=A.getRangeAt(0);
B=C.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return B
},moveToBookmark:function(C){var D=dojo.doc;
if(D.selection){var A;
if(dojo.isArray(C)){A=D.body.createControlRange();
dojo.forEach(C,A.addElement)
}else{A=D.selection.createRange();
A.moveToBookmark(C)
}A.select()
}else{var B=dojo.global.getSelection&&dojo.global.getSelection();
if(B&&B.removeAllRanges){B.removeAllRanges();
B.addRange(C)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(A,B){return{node:A&&dojo.isDescendant(dijit._curFocus,A.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!dojo.withGlobal(B||dojo.global,dijit.isCollapsed)?dojo.withGlobal(B||dojo.global,dijit.getBookmark):null,openedForWindow:B}
},focus:function(C){if(!C){return 
}var B="node" in C?C.node:C,A=C.bookmark,F=C.openedForWindow;
if(B){var E=(B.tagName.toLowerCase()=="iframe")?B.contentWindow:B;
if(E&&E.focus){try{E.focus()
}catch(D){}}dijit._onFocusNode(B)
}if(A&&dojo.withGlobal(F||dojo.global,dijit.isCollapsed)){if(F){F.focus()
}try{dojo.withGlobal(F||dojo.global,moveToBookmark,null,[A])
}catch(D){}}},_activeStack:[],registerWin:function(A){if(!A){A=window
}dojo.connect(A.document,"onmousedown",null,function(C){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(C.target||C.srcElement)
});
var B=A.document.body||A.document.getElementsByTagName("body")[0];
if(B){if(dojo.isIE){B.attachEvent("onactivate",function(C){if(C.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(C.srcElement)
}});
B.attachEvent("ondeactivate",function(C){dijit._onBlurNode(C.srcElement)
})
}else{B.addEventListener("focus",function(C){dijit._onFocusNode(C.target)
},true);
B.addEventListener("blur",function(C){dijit._onBlurNode(C.target)
},true)
}}B=null
},_onBlurNode:function(A){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var B=dijit.getEnclosingWidget(A);
if(B&&B._setStateClass){B._focused=false;
B._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(A){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var D=[];
try{while(A){if(A.dijitPopupParent){A=dijit.byId(A.dijitPopupParent).domNode
}else{if(A.tagName&&A.tagName.toLowerCase()=="body"){if(A===dojo.body()){break
}A=dojo.query("iframe").filter(function(E){return E.contentDocument.body===A
})[0]
}else{var C=A.getAttribute&&A.getAttribute("widgetId");
if(C){D.unshift(C)
}A=A.parentNode
}}}}catch(B){}dijit._setStack(D)
},_onFocusNode:function(A){if(A&&A.tagName&&A.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(A);
if(A==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=A;
dojo.publish("focusNode",[A]);
var B=dijit.getEnclosingWidget(A);
if(B&&B._setStateClass){B._focused=true;
B._setStateClass()
}},_setStack:function(E){var D=dijit._activeStack;
dijit._activeStack=E;
for(var B=0;
B<Math.min(D.length,E.length);
B++){if(D[B]!=E[B]){break
}}for(var A=D.length-1;
A>=B;
A--){var C=dijit.byId(D[A]);
if(C){dojo.publish("widgetBlur",[C]);
if(C._onBlur){C._onBlur()
}}}for(var A=B;
A<E.length;
A++){var C=dijit.byId(E[A]);
if(C){dojo.publish("widgetFocus",[C]);
if(C._onFocus){C._onFocus()
}}}}});
dojo.addOnLoad(dijit.registerWin)
};