if(!dojo._hasResource["dijit._base.window"]){dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(B){if(dojo.isSafari&&!B._parentWindow){var C=function(D){D.document._parentWindow=D;
for(var E=0;
E<D.frames.length;
E++){C(D.frames[E])
}};
C(window.top)
}if(dojo.isIE&&window!==document.parentWindow&&!B._parentWindow){B.parentWindow.execScript("document._parentWindow = window;","Javascript");
var A=B._parentWindow;
B._parentWindow=null;
return A
}return B._parentWindow||B.parentWindow||B.defaultView
}
};