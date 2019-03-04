dojo._xdResourceLoaded({depends:[["provide","dojox.off.ui"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"],["require","dojox.storage.GearsStorageProvider"]],defineResource:function(A){if(!A._hasResource["dojox.off.ui"]){A._hasResource["dojox.off.ui"]=true;
A.provide("dojox.off.ui");
A.require("dojox.storage.Provider");
A.require("dojox.storage.manager");
A.require("dojox.storage.GearsStorageProvider");
A.mixin(dojox.off.ui,{appName:"setme",autoEmbed:true,autoEmbedID:"dot-widget",runLink:window.location.href,runLinkTitle:"Run Application",learnHowPath:A.moduleUrl("dojox","off/resources/learnhow.html"),customLearnHowPath:false,htmlTemplatePath:A.moduleUrl("dojox","off/resources/offline-widget.html").uri,cssTemplatePath:A.moduleUrl("dojox","off/resources/offline-widget.css").uri,onlineImagePath:A.moduleUrl("dojox","off/resources/greenball.png").uri,offlineImagePath:A.moduleUrl("dojox","off/resources/redball.png").uri,rollerImagePath:A.moduleUrl("dojox","off/resources/roller.gif").uri,checkmarkImagePath:A.moduleUrl("dojox","off/resources/checkmark.png").uri,learnHowJSPath:A.moduleUrl("dojox","off/resources/learnhow.js").uri,_initialized:false,onLoad:function(){},_initialize:function(){if(this._validateAppName(this.appName)==false){alert("You must set dojox.off.ui.appName; it can only contain letters, numbers, and spaces; right now it is incorrectly set to '"+dojox.off.ui.appName+"'");
dojox.off.enabled=false;
return 
}this.runLinkText="Run "+this.appName;
A.connect(dojox.off,"onNetwork",this,"_onNetwork");
A.connect(dojox.off.sync,"onSync",this,"_onSync");
dojox.off.files.cache([this.htmlTemplatePath,this.cssTemplatePath,this.onlineImagePath,this.offlineImagePath,this.rollerImagePath,this.checkmarkImagePath]);
if(this.autoEmbed){this._doAutoEmbed()
}},_doAutoEmbed:function(){A.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(B){dojox.off.enabled=false;
B=B.message||B;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+B)
},load:A.hitch(this,this._templateLoaded)})
},_templateLoaded:function(D){var B=A.byId(this.autoEmbedID);
if(B){B.innerHTML=D
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var C=A.byId("dot-widget-browser-restart");
if(C){C.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(A.hitch(this,function(B){this._onNetwork(B?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var D=A.byId("dot-widget-network-indicator-online");
var B=A.byId("dot-widget-network-indicator-offline");
var C=A.byId("dot-widget-title-text");
if(D&&B){if(dojox.off.isOnline==true){D.style.display="inline";
B.style.display="none"
}else{D.style.display="none";
B.style.display="inline"
}}if(C){if(dojox.off.isOnline){C.innerHTML="Online"
}else{C.innerHTML="Offline"
}}},_initLearnHow:function(){var D=A.byId("dot-widget-learn-how-link");
if(!D){return 
}if(!this.customLearnHowPath){var C=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(C);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}D.setAttribute("href",this.learnHowPath);
var B=A.byId("dot-widget-learn-how-app-name");
if(!B){return 
}B.innerHTML="";
B.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(B){if(!B){return false
}return(/^[a-z0-9 ]*$/i.test(B))
},_updateSyncUI:function(){var E=A.byId("dot-roller");
var F=A.byId("dot-success-checkmark");
var C=A.byId("dot-sync-messages");
var B=A.byId("dot-sync-details");
var D=A.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(E){E.style.display="inline"
}if(F){F.style.display="none"
}if(C){A.removeClass(C,"dot-sync-error")
}if(B){B.style.display="none"
}if(D){D.style.display="inline"
}}else{if(E){E.style.display="none"
}if(D){D.style.display="none"
}if(C){A.removeClass(C,"dot-sync-error")
}}},_setSyncMessage:function(B){var C=A.byId("dot-sync-messages");
if(C){while(C.firstChild){C.removeChild(C.firstChild)
}C.appendChild(document.createTextNode(B))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var E=A.byId("dot-widget-network-indicator-online");
if(E){E.setAttribute("src",this.onlineImagePath)
}var B=A.byId("dot-widget-network-indicator-offline");
if(B){B.setAttribute("src",this.offlineImagePath)
}var C=A.byId("dot-roller");
if(C){C.setAttribute("src",this.rollerImagePath)
}var D=A.byId("dot-success-checkmark");
if(D){D.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(C){C.preventDefault();
C.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var E="";
E+="<html><head><title>Sync Details</title><head><body>";
E+="<h1>Sync Details</h1>\n";
E+="<ul>\n";
for(var D=0;
D<dojox.off.sync.details.length;
D++){E+="<li>";
E+=dojox.off.sync.details[D];
E+="</li>"
}E+="</ul>\n";
E+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
E+="</body></html>";
var F="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var B=window.open("","SyncDetails",F);
if(!B){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}B.document.open();
B.document.write(E);
B.document.close();
if(B.focus){B.focus()
}},_cancel:function(B){B.preventDefault();
B.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var D=A.byId("dot-widget-browser-restart");
if(D){A.addClass(D,"dot-needs-browser-restart")
}var B=A.byId("dot-widget-browser-restart-app-name");
if(B){B.innerHTML="";
B.appendChild(document.createTextNode(this.appName))
}var C=A.byId("dot-sync-status");
if(C){C.style.display="none"
}},_showNeedsOfflineCache:function(){var B=A.byId("dot-widget-container");
if(B){A.addClass(B,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var B=A.byId("dot-widget-container");
if(B){A.removeClass(B,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var C=A.byId("dot-sync-details-button");
if(C){A.connect(C,"onclick",this,this._showDetails)
}var B=A.byId("dot-sync-cancel-button");
if(B){A.connect(B,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(C){var B=[];
B.push(A.byId("dot-sync-status"));
for(var D=0;
D<B.length;
D++){if(B[D]){B[D].style.visibility=(C?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var D=A.byId("dot-success-checkmark");
var B=A.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(D){D.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(D){D.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var C=A.byId("dot-sync-messages");
if(C){A.addClass(C,"dot-sync-error")
}if(D){D.style.display="none"
}}}if(dojox.off.sync.details.length&&B){B.style.display="inline"
}},_onFrameworkEvent:function(D,B){if(D=="save"){if(B.status==dojox.storage.FAILED&&!B.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(D=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(D=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var C=A.byId("dot-widget-browser-restart");
if(C){C.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(B){switch(B){case"start":this._updateSyncUI();
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
default:A.warn("Programming error: Unknown sync type in dojox.off.ui: "+B);
break
}},_onNetwork:function(C){if(!this._initialized){return 
}this._updateNetIndicator();
if(C=="offline"){this._setSyncMessage("You are working offline");
var B=A.byId("dot-sync-details");
if(B){B.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
A.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
A.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}}});