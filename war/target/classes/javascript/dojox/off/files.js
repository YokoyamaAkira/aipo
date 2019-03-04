if(!dojo._hasResource["dojox.off.files"]){dojo._hasResource["dojox.off.files"]=true;
dojo.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(A){if(dojo.isString(A)){var B=this._trimAnchor(A+"");
if(!this.isAvailable(B)){this.listOfURLs.push(B)
}}else{if(A instanceof dojo._Url){var B=this._trimAnchor(A.uri);
if(!this.isAvailable(B)){this.listOfURLs.push(B)
}}else{dojo.forEach(A,function(C){C=this._trimAnchor(C);
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
dojo.forEach(this.listOfURLs,function(A){console.debug(A)
})
},remove:function(A){for(var B=0;
B<this.listOfURLs.length;
B++){if(this.listOfURLs[B]==A){this.listOfURLs=this.listOfURLs.splice(B,1);
break
}}},isAvailable:function(A){for(var B=0;
B<this.listOfURLs.length;
B++){if(this.listOfURLs[B]==A){return true
}}return false
},refresh:function(B){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(C,D,E){if(djConfig.isDebug||!D||E||!C||C!=D){console.warn("Refreshing offline file list");
this._doRefresh(B,D)
}else{console.warn("No need to refresh offline file list");
B(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(B)
}}catch(A){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var A=dojo.hitch(this,function(B){if(this._sameLocation(B)){this.cache(B)
}});
A(window.location.href);
dojo.query("script").forEach(function(B){try{A(B.getAttribute("src"))
}catch(C){}});
dojo.query("link").forEach(function(B){try{if(!B.getAttribute("rel")||B.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}A(B.getAttribute("href"))
}catch(C){}});
dojo.query("img").forEach(function(B){try{A(B.getAttribute("src"))
}catch(C){}});
dojo.query("a").forEach(function(B){try{A(B.getAttribute("href"))
}catch(C){}});
dojo.forEach(document.styleSheets,function(D){try{if(D.cssRules){dojo.forEach(D.cssRules,function(J){var K=J.cssText;
if(K){var I=K.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!I){return 
}for(var H=1;
H<I.length;
H++){A(I[H])
}}})
}else{if(D.cssText){var E;
var G=D.cssText.toString();
var B=G.split(/\f|\r|\n/);
for(var C=0;
C<B.length;
C++){E=B[C].match(/url\(\s*([^\) ]*)\s*\)/i);
if(E&&E.length){A(E[1])
}}}}}catch(F){}})
},_sameLocation:function(A){if(!A){return false
}if(A.length&&A.charAt(0)=="#"){return false
}A=new dojo._Url(A);
if(!A.scheme&&!A.port&&!A.host){return true
}if(!A.scheme&&A.host&&A.port&&window.location.hostname==A.host&&window.location.port==A.port){return true
}if(!A.scheme&&A.host&&!A.port&&window.location.hostname==A.host&&window.location.port==80){return true
}return window.location.protocol==(A.scheme+":")&&window.location.hostname==A.host&&(window.location.port==A.port||!window.location.port&&!A.port)
},_trimAnchor:function(A){return A.replace(/\#.*$/,"")
},_doRefresh:function(G,D){var E;
try{E=google.gears.factory.create("beta.localserver","1.0")
}catch(F){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var C="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
E.removeStore(C);
E.openStore(C);
var B=E.createStore(C);
this._store=B;
var A=this;
this._currentFileIndex=0;
this._cancelID=B.capture(this.listOfURLs,function(I,K,H){if(!K&&A.refreshing){A._cancelID=null;
A.refreshing=false;
var J=[];
J.push("Unable to capture: "+I);
G(true,J);
return 
}else{if(K){A._currentFileIndex++
}}if(K&&A._currentFileIndex>=A.listOfURLs.length){A._cancelID=null;
A.refreshing=false;
if(D){dojox.storage.put("oldVersion",D,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
G(false,[])
}})
},_getVersionInfo:function(D){var C=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var A=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var B=null;
D=dojo.hitch(this,D);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(E){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
D(A,B,C)
},load:function(E){if(E){B=E
}D(A,B,C)
}})
}}
};