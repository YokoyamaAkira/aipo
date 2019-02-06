dojo._xdResourceLoaded({depends:[["provide","dijit._base.window"]],defineResource:function(A){if(!A._hasResource["dijit._base.window"]){A._hasResource["dijit._base.window"]=true;
A.provide("dijit._base.window");
dijit.getDocumentWindow=function(B){if(A.isSafari&&!B._parentWindow){var C=function(F){F.document._parentWindow=F;
for(var E=0;
E<F.frames.length;
E++){C(F.frames[E])
}};
C(window.top)
}if(A.isIE&&window!==document.parentWindow&&!B._parentWindow){B.parentWindow.execScript("document._parentWindow = window;","Javascript");
var D=B._parentWindow;
B._parentWindow=null;
return D
}return B._parentWindow||B.parentWindow||B.defaultView
}
}}});