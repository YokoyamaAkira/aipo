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
},_templateLoaded:function(B){var C=A.byId(this.autoEmbedID);
if(C){C.innerHTML=B
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var D=A.byId("dot-widget-browser-restart");
if(D){D.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(A.hitch(this,function(B){this._onNetwork(B?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var B=A.byId("dot-widget-network-indicator-online");
var C=A.byId("dot-widget-network-indicator-offline");
var D=A.byId("dot-widget-title-text");
if(B&&C){if(dojox.off.isOnline==true){B.style.display="inline";
C.style.display="none"
}else{B.style.display="none";
C.style.display="inline"
}}if(D){if(dojox.off.isOnline){D.innerHTML="Online"
}else{D.innerHTML="Offline"
}}},_initLearnHow:function(){var B=A.byId("dot-widget-learn-how-link");
if(!B){return 
}if(!this.customLearnHowPath){var D=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(D);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}B.setAttribute("href",this.learnHowPath);
var C=A.byId("dot-widget-learn-how-app-name");
if(!C){return 
}C.innerHTML="";
C.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(B){if(!B){return false
}return(/^[a-z0-9 ]*$/i.test(B))
},_updateSyncUI:function(){var F=A.byId("dot-roller");
var B=A.byId("dot-success-checkmark");
var D=A.byId("dot-sync-messages");
var C=A.byId("dot-sync-details");
var E=A.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(F){F.style.display="inline"
}if(B){B.style.display="none"
}if(D){A.removeClass(D,"dot-sync-error")
}if(C){C.style.display="none"
}if(E){E.style.display="inline"
}}else{if(F){F.style.display="none"
}if(E){E.style.display="none"
}if(D){A.removeClass(D,"dot-sync-error")
}}},_setSyncMessage:function(C){var B=A.byId("dot-sync-messages");
if(B){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(C))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var B=A.byId("dot-widget-network-indicator-online");
if(B){B.setAttribute("src",this.onlineImagePath)
}var C=A.byId("dot-widget-network-indicator-offline");
if(C){C.setAttribute("src",this.offlineImagePath)
}var D=A.byId("dot-roller");
if(D){D.setAttribute("src",this.rollerImagePath)
}var E=A.byId("dot-success-checkmark");
if(E){E.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(D){D.preventDefault();
D.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var F="";
F+="<html><head><title>Sync Details</title><head><body>";
F+="<h1>Sync Details</h1>\n";
F+="<ul>\n";
for(var E=0;
E<dojox.off.sync.details.length;
E++){F+="<li>";
F+=dojox.off.sync.details[E];
F+="</li>"
}F+="</ul>\n";
F+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
F+="</body></html>";
var B="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var C=window.open("","SyncDetails",B);
if(!C){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}C.document.open();
C.document.write(F);
C.document.close();
if(C.focus){C.focus()
}},_cancel:function(B){B.preventDefault();
B.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var B=A.byId("dot-widget-browser-restart");
if(B){A.addClass(B,"dot-needs-browser-restart")
}var C=A.byId("dot-widget-browser-restart-app-name");
if(C){C.innerHTML="";
C.appendChild(document.createTextNode(this.appName))
}var D=A.byId("dot-sync-status");
if(D){D.style.display="none"
}},_showNeedsOfflineCache:function(){var B=A.byId("dot-widget-container");
if(B){A.addClass(B,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var B=A.byId("dot-widget-container");
if(B){A.removeClass(B,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var B=A.byId("dot-sync-details-button");
if(B){A.connect(B,"onclick",this,this._showDetails)
}var C=A.byId("dot-sync-cancel-button");
if(C){A.connect(C,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(D){var C=[];
C.push(A.byId("dot-sync-status"));
for(var B=0;
B<C.length;
B++){if(C[B]){C[B].style.visibility=(D?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var B=A.byId("dot-success-checkmark");
var C=A.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(B){B.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(B){B.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var D=A.byId("dot-sync-messages");
if(D){A.addClass(D,"dot-sync-error")
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
}else{var D=A.byId("dot-widget-browser-restart");
if(D){D.style.display="none"
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
}},_onNetwork:function(B){if(!this._initialized){return 
}this._updateNetIndicator();
if(B=="offline"){this._setSyncMessage("You are working offline");
var C=A.byId("dot-sync-details");
if(C){C.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
A.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
A.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}}});