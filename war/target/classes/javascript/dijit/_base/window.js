if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(C){if(dojo.isSafari&&!C._parentWindow){var A=function(E){E.document._parentWindow=E;
for(var D=0;
D<E.frames.length;
D++){A(E.frames[D])
}};
A(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!C._parentWindow){C.parentWindow.execScript("document._parentWindow = window;","Javascript");
var B=C._parentWindow;
C._parentWindow=null;
return B
}return C._parentWindow||C.parentWindow||C.defaultView
}
};