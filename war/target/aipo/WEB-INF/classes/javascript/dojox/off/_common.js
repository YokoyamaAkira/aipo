if(!dojo._hasResource["dojox.off._common"]){dojo._hasResource["dojox.off._common"]=true;
dojo.provide("dojox.off._common");
dojo.require("dojox.storage");
dojo.require("dojox.sql");
dojo.require("dojox.off.sync");
dojo.mixin(dojox.off,{isOnline:false,NET_CHECK:5,STORAGE_NAMESPACE:"_dot",enabled:true,availabilityURL:dojo.moduleUrl("dojox","off/network_check.txt"),goingOnline:false,coreOpFailed:false,doNetChecking:true,hasOfflineCache:null,browserRestart:false,_STORAGE_APP_NAME:window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),_initializeCalled:false,_storageLoaded:false,_pageLoaded:false,onLoad:function(){},onNetwork:function(A){},initialize:function(){this._initializeCalled=true;
if(this._storageLoaded&&this._pageLoaded){this._onLoad()
}},goOffline:function(){if((dojox.off.sync.isSyncing)||(this.goingOnline)){return 
}this.goingOnline=false;
this.isOnline=false
},goOnline:function(A){if(dojox.off.sync.isSyncing||dojox.off.goingOnline){return 
}this.goingOnline=true;
this.isOnline=false;
this._isSiteAvailable(A)
},onFrameworkEvent:function(A,B){if(A=="save"){if(B.isCoreSave&&(B.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(A=="coreOperationFailed"){dojox.off.coreOpFailed=true;
dojox.off.enabled=false
}}},_checkOfflineCacheAvailable:function(A){this.hasOfflineCache=dojo.isGears;
A()
},_onLoad:function(){dojox.off.files.cache(dojo.moduleUrl("dojo","dojo.js"));
this._cacheDojoResources();
dojox.off.files.cache(dojox.storage.manager.getResourceList());
dojox.off.files._slurp();
this._checkOfflineCacheAvailable(dojo.hitch(this,"_onOfflineCacheChecked"))
},_onOfflineCacheChecked:function(){if(this.hasOfflineCache&&this.enabled){this._load(dojo.hitch(this,"_finishStartingUp"))
}else{if(this.hasOfflineCache&&!this.enabled){this._finishStartingUp()
}else{this._keepCheckingUntilInstalled()
}}},_keepCheckingUntilInstalled:function(){this._finishStartingUp()
},_finishStartingUp:function(){if(!this.hasOfflineCache){this.onLoad()
}else{if(this.enabled){this._startNetworkThread();
this.goOnline(dojo.hitch(this,function(){dojox.off.onLoad()
}))
}else{if(this.coreOpFailed){this.onFrameworkEvent("coreOperationFailed")
}else{this.onLoad()
}}}},_onPageLoad:function(){this._pageLoaded=true;
if(this._storageLoaded&&this._initializeCalled){this._onLoad()
}},_onStorageLoad:function(){this._storageLoaded=true;
if(!dojox.storage.manager.isAvailable()&&dojox.storage.manager.isInitialized()){this.coreOpFailed=true;
this.enabled=false
}if(this._pageLoaded&&this._initializeCalled){this._onLoad()
}},_isSiteAvailable:function(A){dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(B){this.goingOnline=false;
this.isOnline=false;
if(A){A(false)
}}),load:dojo.hitch(this,function(B){this.goingOnline=false;
this.isOnline=true;
if(A){A(true)
}else{this.onNetwork("online")
}})})
},_startNetworkThread:function(){if(!this.doNetChecking){return 
}window.setInterval(dojo.hitch(this,function(){var A=dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(C){if(this.isOnline){this.isOnline=false;
try{if(typeof A.ioArgs.xhr.abort=="function"){A.ioArgs.xhr.abort()
}}catch(B){}dojox.off.sync.isSyncing=false;
this.onNetwork("offline")
}}),load:dojo.hitch(this,function(B){if(!this.isOnline){this.isOnline=true;
this.onNetwork("online")
}})})
}),this.NET_CHECK*1000)
},_getAvailabilityURL:function(){var A=this.availabilityURL.toString();
if(A.indexOf("?")==-1){A+="?"
}else{A+="&"
}A+="browserbust="+new Date().getTime();
return A
},_onOfflineCacheInstalled:function(){this.onFrameworkEvent("offlineCacheInstalled")
},_cacheDojoResources:function(){var A=true;
dojo.forEach(dojo.query("script"),function(D){var C=D.getAttribute("src");
if(!C){return 
}if(C.indexOf("_base/_loader/bootstrap.js")!=-1){A=false
}});
if(!A){dojox.off.files.cache(dojo.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var B=0;
B<dojo._loadedUrls.length;
B++){dojox.off.files.cache(dojo._loadedUrls[B])
}},_save:function(){},_load:function(A){dojox.off.sync._load(A)
}});
dojox.storage.manager.addOnLoad(dojo.hitch(dojox.off,"_onStorageLoad"));
dojo.addOnLoad(dojox.off,"_onPageLoad")
};