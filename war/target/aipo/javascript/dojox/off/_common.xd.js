dojo._xdResourceLoaded({depends:[["provide","dojox.off._common"],["require","dojox.storage"],["require","dojox.sql"],["require","dojox.off.sync"]],defineResource:function(A){if(!A._hasResource["dojox.off._common"]){A._hasResource["dojox.off._common"]=true;
A.provide("dojox.off._common");
A.require("dojox.storage");
A.require("dojox.sql");
A.require("dojox.off.sync");
A.mixin(dojox.off,{isOnline:false,NET_CHECK:5,STORAGE_NAMESPACE:"_dot",enabled:true,availabilityURL:A.moduleUrl("dojox","off/network_check.txt"),goingOnline:false,coreOpFailed:false,doNetChecking:true,hasOfflineCache:null,browserRestart:false,_STORAGE_APP_NAME:window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),_initializeCalled:false,_storageLoaded:false,_pageLoaded:false,onLoad:function(){},onNetwork:function(B){},initialize:function(){this._initializeCalled=true;
if(this._storageLoaded&&this._pageLoaded){this._onLoad()
}},goOffline:function(){if((dojox.off.sync.isSyncing)||(this.goingOnline)){return 
}this.goingOnline=false;
this.isOnline=false
},goOnline:function(B){if(dojox.off.sync.isSyncing||dojox.off.goingOnline){return 
}this.goingOnline=true;
this.isOnline=false;
this._isSiteAvailable(B)
},onFrameworkEvent:function(C,B){if(C=="save"){if(B.isCoreSave&&(B.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(C=="coreOperationFailed"){dojox.off.coreOpFailed=true;
dojox.off.enabled=false
}}},_checkOfflineCacheAvailable:function(B){this.hasOfflineCache=A.isGears;
B()
},_onLoad:function(){dojox.off.files.cache(A.moduleUrl("dojo","dojo.js"));
this._cacheDojoResources();
dojox.off.files.cache(dojox.storage.manager.getResourceList());
dojox.off.files._slurp();
this._checkOfflineCacheAvailable(A.hitch(this,"_onOfflineCacheChecked"))
},_onOfflineCacheChecked:function(){if(this.hasOfflineCache&&this.enabled){this._load(A.hitch(this,"_finishStartingUp"))
}else{if(this.hasOfflineCache&&!this.enabled){this._finishStartingUp()
}else{this._keepCheckingUntilInstalled()
}}},_keepCheckingUntilInstalled:function(){this._finishStartingUp()
},_finishStartingUp:function(){if(!this.hasOfflineCache){this.onLoad()
}else{if(this.enabled){this._startNetworkThread();
this.goOnline(A.hitch(this,function(){dojox.off.onLoad()
}))
}else{if(this.coreOpFailed){this.onFrameworkEvent("coreOperationFailed")
}else{this.onLoad()
}}}},_onPageLoad:function(){this._pageLoaded=true;
if(this._storageLoaded&&this._initializeCalled){this._onLoad()
}},_onStorageLoad:function(){this._storageLoaded=true;
if(!dojox.storage.manager.isAvailable()&&dojox.storage.manager.isInitialized()){this.coreOpFailed=true;
this.enabled=false
}if(this._pageLoaded&&this._initializeCalled){this._onLoad()
}},_isSiteAvailable:function(B){A.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:A.hitch(this,function(C){this.goingOnline=false;
this.isOnline=false;
if(B){B(false)
}}),load:A.hitch(this,function(C){this.goingOnline=false;
this.isOnline=true;
if(B){B(true)
}else{this.onNetwork("online")
}})})
},_startNetworkThread:function(){if(!this.doNetChecking){return 
}window.setInterval(A.hitch(this,function(){var B=A.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:A.hitch(this,function(C){if(this.isOnline){this.isOnline=false;
try{if(typeof B.ioArgs.xhr.abort=="function"){B.ioArgs.xhr.abort()
}}catch(D){}dojox.off.sync.isSyncing=false;
this.onNetwork("offline")
}}),load:A.hitch(this,function(C){if(!this.isOnline){this.isOnline=true;
this.onNetwork("online")
}})})
}),this.NET_CHECK*1000)
},_getAvailabilityURL:function(){var B=this.availabilityURL.toString();
if(B.indexOf("?")==-1){B+="?"
}else{B+="&"
}B+="browserbust="+new Date().getTime();
return B
},_onOfflineCacheInstalled:function(){this.onFrameworkEvent("offlineCacheInstalled")
},_cacheDojoResources:function(){var C=true;
A.forEach(A.query("script"),function(D){var E=D.getAttribute("src");
if(!E){return 
}if(E.indexOf("_base/_loader/bootstrap.js")!=-1){C=false
}});
if(!C){dojox.off.files.cache(A.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(A.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(A.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(A.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var B=0;
B<A._loadedUrls.length;
B++){dojox.off.files.cache(A._loadedUrls[B])
}},_save:function(){},_load:function(B){dojox.off.sync._load(B)
}});
dojox.storage.manager.addOnLoad(A.hitch(dojox.off,"_onStorageLoad"));
A.addOnLoad(dojox.off,"_onPageLoad")
}}});