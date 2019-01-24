dojo._xdResourceLoaded({depends:[["provide","dijit._base.bidi"]],defineResource:function(A){if(!A._hasResource["dijit._base.bidi"]){A._hasResource["dijit._base.bidi"]=true;
A.provide("dijit._base.bidi");
A.addOnLoad(function(){if(!A._isBodyLtr()){A.addClass(A.body(),"dijitRtl")
}})
}}});