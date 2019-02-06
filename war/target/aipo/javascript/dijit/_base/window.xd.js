dojo._xdResourceLoaded({depends:[["provide","dijit._base.window"]],defineResource:function(A){if(!A._hasResource["dijit._base.window"]){A._hasResource["dijit._base.window"]=true;
A.provide("dijit._base.window");
dijit.getDocumentWindow=function(D){if(A.isSafari&&!D._parentWindow){var B=function(F){F.document._parentWindow=F;
for(var E=0;
E<F.frames.length;
E++){B(F.frames[E])
}};
B(window.top)
}if(A.isIE&&window!==document.parentWindow&&!D._parentWindow){D.parentWindow.execScript("document._parentWindow = window;","Javascript");
var C=D._parentWindow;
D._parentWindow=null;
return C
}return D._parentWindow||D.parentWindow||D.defaultView
}
}}});