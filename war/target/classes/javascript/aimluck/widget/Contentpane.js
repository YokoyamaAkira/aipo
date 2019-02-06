if(!dojo._hasResource["aimluck.widget.Contentpane"]){dojo._hasResource["aimluck.widget.Contentpane"]=true;
dojo.provide("aimluck.widget.Contentpane");
dojo.require("dijit.layout.ContentPane");
dojo.declare("aimluck.widget.Contentpane",[dijit.layout.ContentPane],{loadingMessage:"<div class='indicator'>\u8aad\u307f\u8fbc\u307f\u4e2d...</div>",errorMessage:"",extractContent:false,parseOnLoad:true,refreshOnShow:true,params:new Array(),reloadIds:new Array(),viewPage:function(A){this.href=A;
return this._prepareLoad(true)
},setParam:function(B,A){this.params[B]=A
},setReloadIds:function(A){this.reloadIds=A
},clearParams:function(){this.params=new Array()
},clearReloadIds:function(){this.reloadIds=new Array()
},_downloadExternalContent:function(){this._onUnloadHandler();
var A=this;
var B={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text",content:this.params,headers:{X_REQUESTED_WITH:"XMLHttpRequest"}};
if(dojo.isObject(this.ioArgs)){dojo.mixin(B,this.ioArgs)
}var C=this._xhrDfd=(this.ioMethod||dojo.xhrPost)(B);
C.addCallback(function(E){A.clearParams();
A.clearReloadIds();
try{A.onDownloadEnd.call(A);
A._isDownloaded=true;
A.setContent.call(A,E)
}catch(D){A._onError.call(A,"Content",D)
}delete A._xhrDfd;
return E
});
C.addErrback(function(D){if(!C.cancelled){A._onError.call(A,"Download",D)
}delete A._xhrDfd;
return D
})
}})
};