dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Contentpane"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Contentpane"]){A._hasResource["aimluck.widget.Contentpane"]=true;
A.provide("aimluck.widget.Contentpane");
A.require("dijit.layout.ContentPane");
A.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(B){this.href=B;
return this._prepareLoad(true)
},setParam:function(C,B){this.params[C]=B
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
var D=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(A.isObject(this.ioArgs)){A.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||A.xhrPost)(B);
C.addCallback(function(E){D.clearParams();
D.clearReloadIds();
try{D.onDownloadEnd.call(D);
D._isDownloaded=true;
D.setContent.call(D,E)
}catch(F){D._onError.call(D,"Content",F)
}delete D._xhrDfd;
return E
});
C.addErrback(function(E){if(!C.cancelled){D._onError.call(D,"Download",E)
}delete D._xhrDfd;
return E
})
}})
}}});