if(!dojo._hasResource["dojox.off.ui"]){dojo._hasResource["dojox.off.ui"]=true;
dojo.provide("dojox.off.ui");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.require("dojox.storage.GearsStorageProvider");
dojo.mixin(dojox.off.ui,{appName:"setme",autoEmbed:true,autoEmbedID:"dot-widget",runLink:window.location.href,runLinkTitle:"Run Application",learnHowPath:dojo.moduleUrl("dojox","off/resources/learnhow.html"),customLearnHowPath:false,htmlTemplatePath:dojo.moduleUrl("dojox","off/resources/offline-widget.html").uri,cssTemplatePath:dojo.moduleUrl("dojox","off/resources/offline-widget.css").uri,onlineImagePath:dojo.moduleUrl("dojox","off/resources/greenball.png").uri,offlineImagePath:dojo.moduleUrl("dojox","off/resources/redball.png").uri,rollerImagePath:dojo.moduleUrl("dojox","off/resources/roller.gif").uri,checkmarkImagePath:dojo.moduleUrl("dojox","off/resources/checkmark.png").uri,learnHowJSPath:dojo.moduleUrl("dojox","off/resources/learnhow.js").uri,_initialized:false,onLoad:function(){},_initialize:function(){if(this._validateAppName(this.appName)==false){alert("You must set dojox.off.ui.appName; it can only contain letters, numbers, and spaces; right now it is incorrectly set to '"+dojox.off.ui.appName+"'");
dojox.off.enabled=false;
return 
}this.runLinkText="Run "+this.appName;
dojo.connect(dojox.off,"onNetwork",this,"_onNetwork");
dojo.connect(dojox.off.sync,"onSync",this,"_onSync");
dojox.off.files.cache([this.htmlTemplatePath,this.cssTemplatePath,this.onlineImagePath,this.offlineImagePath,this.rollerImagePath,this.checkmarkImagePath]);
if(this.autoEmbed){this._doAutoEmbed()
}},_doAutoEmbed:function(){dojo.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(A){dojox.off.enabled=false;
A=A.message||A;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+A)
},load:dojo.hitch(this,this._templateLoaded)})
},_templateLoaded:function(B){var C=dojo.byId(this.autoEmbedID);
if(C){C.innerHTML=B
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var A=dojo.byId("dot-widget-browser-restart");
if(A){A.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(A){this._onNetwork(A?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var B=dojo.byId("dot-widget-network-indicator-online");
var C=dojo.byId("dot-widget-network-indicator-offline");
var A=dojo.byId("dot-widget-title-text");
if(B&&C){if(dojox.off.isOnline==true){B.style.display="inline";
C.style.display="none"
}else{B.style.display="none";
C.style.display="inline"
}}if(A){if(dojox.off.isOnline){A.innerHTML="Online"
}else{A.innerHTML="Offline"
}}},_initLearnHow:function(){var B=dojo.byId("dot-widget-learn-how-link");
if(!B){return 
}if(!this.customLearnHowPath){var A=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(A);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}B.setAttribute("href",this.learnHowPath);
var C=dojo.byId("dot-widget-learn-how-app-name");
if(!C){return 
}C.innerHTML="";
C.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(A){if(!A){return false
}return(/^[a-z0-9 ]*$/i.test(A))
},_updateSyncUI:function(){var C=dojo.byId("dot-roller");
var D=dojo.byId("dot-success-checkmark");
var A=dojo.byId("dot-sync-messages");
var E=dojo.byId("dot-sync-details");
var B=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(C){C.style.display="inline"
}if(D){D.style.display="none"
}if(A){dojo.removeClass(A,"dot-sync-error")
}if(E){E.style.display="none"
}if(B){B.style.display="inline"
}}else{if(C){C.style.display="none"
}if(B){B.style.display="none"
}if(A){dojo.removeClass(A,"dot-sync-error")
}}},_setSyncMessage:function(B){var A=dojo.byId("dot-sync-messages");
if(A){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(B))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var C=dojo.byId("dot-widget-network-indicator-online");
if(C){C.setAttribute("src",this.onlineImagePath)
}var D=dojo.byId("dot-widget-network-indicator-offline");
if(D){D.setAttribute("src",this.offlineImagePath)
}var A=dojo.byId("dot-roller");
if(A){A.setAttribute("src",this.rollerImagePath)
}var B=dojo.byId("dot-success-checkmark");
if(B){B.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(A){A.preventDefault();
A.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var C="";
C+="<html><head><title>Sync Details</title><head><body>";
C+="<h1>Sync Details</h1>\n";
C+="<ul>\n";
for(var B=0;
B<dojox.off.sync.details.length;
B++){C+="<li>";
C+=dojox.off.sync.details[B];
C+="</li>"
}C+="</ul>\n";
C+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
C+="</body></html>";
var D="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var E=window.open("","SyncDetails",D);
if(!E){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}E.document.open();
E.document.write(C);
E.document.close();
if(E.focus){E.focus()
}},_cancel:function(A){A.preventDefault();
A.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var B=dojo.byId("dot-widget-browser-restart");
if(B){dojo.addClass(B,"dot-needs-browser-restart")
}var C=dojo.byId("dot-widget-browser-restart-app-name");
if(C){C.innerHTML="";
C.appendChild(document.createTextNode(this.appName))
}var A=dojo.byId("dot-sync-status");
if(A){A.style.display="none"
}},_showNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.addClass(A,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.removeClass(A,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var A=dojo.byId("dot-sync-details-button");
if(A){dojo.connect(A,"onclick",this,this._showDetails)
}var B=dojo.byId("dot-sync-cancel-button");
if(B){dojo.connect(B,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(A){var C=[];
C.push(dojo.byId("dot-sync-status"));
for(var B=0;
B<C.length;
B++){if(C[B]){C[B].style.visibility=(A?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var B=dojo.byId("dot-success-checkmark");
var C=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(B){B.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(B){B.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var A=dojo.byId("dot-sync-messages");
if(A){dojo.addClass(A,"dot-sync-error")
}if(B){B.style.display="none"
}}}if(dojox.off.sync.details.length&&C){C.style.display="inline"
}},_onFrameworkEvent:function(B,C){if(B=="save"){if(C.status==dojox.storage.FAILED&&!C.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(B=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(B=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var A=dojo.byId("dot-widget-browser-restart");
if(A){A.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(A){switch(A){case"start":this._updateSyncUI();
break;
case"refreshFiles":this._setSyncMessage("Downloading UI...");
break;
case"upload":this._setSyncMessage("Uploading new data...");
break;
case"download":this._setSyncMessage("Downloading new data...");
break;
case"finished":this._syncFinished();
break;
case"cancel":this._setSyncMessage("Canceling Sync...");
break;
default:dojo.warn("Programming error: Unknown sync type in dojox.off.ui: "+A);
break
}},_onNetwork:function(A){if(!this._initialized){return 
}this._updateNetIndicator();
if(A=="offline"){this._setSyncMessage("You are working offline");
var B=dojo.byId("dot-sync-details");
if(B){B.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
};