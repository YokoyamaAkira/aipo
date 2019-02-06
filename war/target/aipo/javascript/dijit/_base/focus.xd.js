dojo._xdResourceLoaded({depends:[["provide","dijit._base.focus"]],defineResource:function(A){if(!A._hasResource["dijit._base.focus"]){A._hasResource["dijit._base.focus"]=true;
A.provide("dijit._base.focus");
A.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){var D=A.global;
var B=A.doc;
if(B.selection){return !B.selection.createRange().text
}else{if(D.getSelection){var C=D.getSelection();
if(A.isString(C)){return !C
}else{return C.isCollapsed||!C.toString()
}}}},getBookmark:function(){var D,C=A.doc.selection;
if(C){var B=C.createRange();
if(C.type.toUpperCase()=="CONTROL"){D=B.length?A._toArray(B):null
}else{D=B.getBookmark()
}}else{if(A.global.getSelection){C=A.global.getSelection();
if(C){var B=C.getRangeAt(0);
D=B.cloneRange()
}}else{console.debug("No idea how to store the current selection for this browser!")
}}return D
},moveToBookmark:function(E){var B=A.doc;
if(B.selection){var C;
if(A.isArray(E)){C=B.body.createControlRange();
A.forEach(E,C.addElement)
}else{C=B.selection.createRange();
C.moveToBookmark(E)
}C.select()
}else{var D=A.global.getSelection&&A.global.getSelection();
if(D&&D.removeAllRanges){D.removeAllRanges();
D.addRange(E)
}else{console.debug("No idea how to restore selection for this browser!")
}}},getFocus:function(C,B){return{node:C&&A.isDescendant(dijit._curFocus,C.domNode)?dijit._prevFocus:dijit._curFocus,bookmark:!A.withGlobal(B||A.global,dijit.isCollapsed)?A.withGlobal(B||A.global,dijit.getBookmark):null,openedForWindow:B}
},focus:function(E){if(!E){return 
}var D="node" in E?E.node:E,C=E.bookmark,B=E.openedForWindow;
if(D){var G=(D.tagName.toLowerCase()=="iframe")?D.contentWindow:D;
if(G&&G.focus){try{G.focus()
}catch(F){}}dijit._onFocusNode(D)
}if(C&&A.withGlobal(B||A.global,dijit.isCollapsed)){if(B){B.focus()
}try{A.withGlobal(B||A.global,moveToBookmark,null,[C])
}catch(F){}}},_activeStack:[],registerWin:function(C){if(!C){C=window
}A.connect(C.document,"onmousedown",null,function(D){dijit._justMouseDowned=true;
setTimeout(function(){dijit._justMouseDowned=false
},0);
dijit._onTouchNode(D.target||D.srcElement)
});
var B=C.document.body||C.document.getElementsByTagName("body")[0];
if(B){if(A.isIE){B.attachEvent("onactivate",function(D){if(D.srcElement.tagName.toLowerCase()!="body"){dijit._onFocusNode(D.srcElement)
}});
B.attachEvent("ondeactivate",function(D){dijit._onBlurNode(D.srcElement)
})
}else{B.addEventListener("focus",function(D){dijit._onFocusNode(D.target)
},true);
B.addEventListener("blur",function(D){dijit._onBlurNode(D.target)
},true)
}}B=null
},_onBlurNode:function(C){dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
var B=dijit.getEnclosingWidget(C);
if(B&&B._setStateClass){B._focused=false;
B._setStateClass()
}if(dijit._justMouseDowned){return 
}if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer)
}dijit._clearActiveWidgetsTimer=setTimeout(function(){delete dijit._clearActiveWidgetsTimer;
dijit._setStack([])
},100)
},_onTouchNode:function(C){if(dijit._clearActiveWidgetsTimer){clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer
}var B=[];
try{while(C){if(C.dijitPopupParent){C=dijit.byId(C.dijitPopupParent).domNode
}else{if(C.tagName&&C.tagName.toLowerCase()=="body"){if(C===A.body()){break
}C=A.query("iframe").filter(function(F){return F.contentDocument.body===C
})[0]
}else{var E=C.getAttribute&&C.getAttribute("widgetId");
if(E){B.unshift(E)
}C=C.parentNode
}}}}catch(D){}dijit._setStack(B)
},_onFocusNode:function(C){if(C&&C.tagName&&C.tagName.toLowerCase()=="body"){return 
}dijit._onTouchNode(C);
if(C==dijit._curFocus){return 
}dijit._prevFocus=dijit._curFocus;
dijit._curFocus=C;
A.publish("focusNode",[C]);
var B=dijit.getEnclosingWidget(C);
if(B&&B._setStateClass){B._focused=true;
B._setStateClass()
}},_setStack:function(B){var F=dijit._activeStack;
dijit._activeStack=B;
for(var D=0;
D<Math.min(F.length,B.length);
D++){if(F[D]!=B[D]){break
}}for(var C=F.length-1;
C>=D;
C--){var E=dijit.byId(F[C]);
if(E){A.publish("widgetBlur",[E]);
if(E._onBlur){E._onBlur()
}}}for(var C=D;
C<B.length;
C++){var E=dijit.byId(B[C]);
if(E){A.publish("widgetFocus",[E]);
if(E._onFocus){E._onFocus()
}}}}});
A.addOnLoad(dijit.registerWin)
}}});