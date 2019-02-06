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
},_templateLoaded:function(C){var A=dojo.byId(this.autoEmbedID);
if(A){A.innerHTML=C
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var B=dojo.byId("dot-widget-browser-restart");
if(B){B.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(A){this._onNetwork(A?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var C=dojo.byId("dot-widget-network-indicator-online");
var A=dojo.byId("dot-widget-network-indicator-offline");
var B=dojo.byId("dot-widget-title-text");
if(C&&A){if(dojox.off.isOnline==true){C.style.display="inline";
A.style.display="none"
}else{C.style.display="none";
A.style.display="inline"
}}if(B){if(dojox.off.isOnline){B.innerHTML="Online"
}else{B.innerHTML="Offline"
}}},_initLearnHow:function(){var C=dojo.byId("dot-widget-learn-how-link");
if(!C){return 
}if(!this.customLearnHowPath){var B=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(B);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}C.setAttribute("href",this.learnHowPath);
var A=dojo.byId("dot-widget-learn-how-app-name");
if(!A){return 
}A.innerHTML="";
A.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(A){if(!A){return false
}return(/^[a-z0-9 ]*$/i.test(A))
},_updateSyncUI:function(){var D=dojo.byId("dot-roller");
var E=dojo.byId("dot-success-checkmark");
var B=dojo.byId("dot-sync-messages");
var A=dojo.byId("dot-sync-details");
var C=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(D){D.style.display="inline"
}if(E){E.style.display="none"
}if(B){dojo.removeClass(B,"dot-sync-error")
}if(A){A.style.display="none"
}if(C){C.style.display="inline"
}}else{if(D){D.style.display="none"
}if(C){C.style.display="none"
}if(B){dojo.removeClass(B,"dot-sync-error")
}}},_setSyncMessage:function(A){var B=dojo.byId("dot-sync-messages");
if(B){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(A))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var D=dojo.byId("dot-widget-network-indicator-online");
if(D){D.setAttribute("src",this.onlineImagePath)
}var A=dojo.byId("dot-widget-network-indicator-offline");
if(A){A.setAttribute("src",this.offlineImagePath)
}var B=dojo.byId("dot-roller");
if(B){B.setAttribute("src",this.rollerImagePath)
}var C=dojo.byId("dot-success-checkmark");
if(C){C.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(B){B.preventDefault();
B.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var D="";
D+="<html><head><title>Sync Details</title><head><body>";
D+="<h1>Sync Details</h1>\n";
D+="<ul>\n";
for(var C=0;
C<dojox.off.sync.details.length;
C++){D+="<li>";
D+=dojox.off.sync.details[C];
D+="</li>"
}D+="</ul>\n";
D+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
D+="</body></html>";
var E="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var A=window.open("","SyncDetails",E);
if(!A){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}A.document.open();
A.document.write(D);
A.document.close();
if(A.focus){A.focus()
}},_cancel:function(A){A.preventDefault();
A.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var C=dojo.byId("dot-widget-browser-restart");
if(C){dojo.addClass(C,"dot-needs-browser-restart")
}var A=dojo.byId("dot-widget-browser-restart-app-name");
if(A){A.innerHTML="";
A.appendChild(document.createTextNode(this.appName))
}var B=dojo.byId("dot-sync-status");
if(B){B.style.display="none"
}},_showNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.addClass(A,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.removeClass(A,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var B=dojo.byId("dot-sync-details-button");
if(B){dojo.connect(B,"onclick",this,this._showDetails)
}var A=dojo.byId("dot-sync-cancel-button");
if(A){dojo.connect(A,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(B){var A=[];
A.push(dojo.byId("dot-sync-status"));
for(var C=0;
C<A.length;
C++){if(A[C]){A[C].style.visibility=(B?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var C=dojo.byId("dot-success-checkmark");
var A=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(C){C.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(C){C.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var B=dojo.byId("dot-sync-messages");
if(B){dojo.addClass(B,"dot-sync-error")
}if(C){C.style.display="none"
}}}if(dojox.off.sync.details.length&&A){A.style.display="inline"
}},_onFrameworkEvent:function(C,A){if(C=="save"){if(A.status==dojox.storage.FAILED&&!A.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(C=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(C=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var B=dojo.byId("dot-widget-browser-restart");
if(B){B.style.display="none"
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
}},_onNetwork:function(B){if(!this._initialized){return 
}this._updateNetIndicator();
if(B=="offline"){this._setSyncMessage("You are working offline");
var A=dojo.byId("dot-sync-details");
if(A){A.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
};