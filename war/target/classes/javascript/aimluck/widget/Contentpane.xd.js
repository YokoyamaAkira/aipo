dojo._xdResourceLoaded({depends:[["provide","aimluck.widget.Contentpane"],["require","dijit.layout.ContentPane"]],defineResource:function(A){if(!A._hasResource["aimluck.widget.Contentpane"]){A._hasResource["aimluck.widget.Contentpane"]=true;
A.provide("aimluck.widget.Contentpane");
A.require("dijit.layout.ContentPane");
A.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(B){this.href=B;
return this._prepareLoad(true)
},setParam:function(B,C){this.params[B]=C
},setReloadIds:function(B){this.reloadIds=B
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
var C=this;
var D={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(A.isObject(this.ioArgs)){A.mixin(D,this.ioArgs)
}var B=this._xhrDfd=(this.ioMethod||A.xhrPost)(D);
B.addCallback(function(E){C.clearParams();
C.clearReloadIds();
try{C.onDownloadEnd.call(C);
C._isDownloaded=true;
C.setContent.call(C,E)
}catch(F){C._onError.call(C,"Content",F)
}delete C._xhrDfd;
return E
});
B.addErrback(function(E){if(!B.cancelled){C._onError.call(C,"Download",E)
}delete C._xhrDfd;
return E
})
}})
}}});