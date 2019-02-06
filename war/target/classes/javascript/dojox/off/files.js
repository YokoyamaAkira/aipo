if(!dojo._hasResource["dojox.off.files"]){dojo._hasResource["dojox.off.files"]=true;
dojo.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(B){if(dojo.isString(B)){var A=this._trimAnchor(B+"");
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}}else{if(B instanceof dojo._Url){var A=this._trimAnchor(B.uri);
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}}else{dojo.forEach(B,function(C){C=this._trimAnchor(C);
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
dojo.forEach(this.listOfURLs,function(A){console.debug(A)
})
},remove:function(B){for(var A=0;
A<this.listOfURLs.length;
A++){if(this.listOfURLs[A]==B){this.listOfURLs=this.listOfURLs.splice(A,1);
break
}}},isAvailable:function(B){for(var A=0;
A<this.listOfURLs.length;
A++){if(this.listOfURLs[A]==B){return true
}}return false
},refresh:function(A){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(D,E,C){if(djConfig.isDebug||!E||C||!D||D!=E){console.warn("Refreshing offline file list");
this._doRefresh(A,E)
}else{console.warn("No need to refresh offline file list");
A(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(A)
}}catch(B){this.refreshing=false;
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
dojo.query("script").forEach(function(C){try{A(C.getAttribute("src"))
}catch(B){}});
dojo.query("link").forEach(function(C){try{if(!C.getAttribute("rel")||C.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}A(C.getAttribute("href"))
}catch(B){}});
dojo.query("img").forEach(function(C){try{A(C.getAttribute("src"))
}catch(B){}});
dojo.query("a").forEach(function(C){try{A(C.getAttribute("href"))
}catch(B){}});
dojo.forEach(document.styleSheets,function(E){try{if(E.cssRules){dojo.forEach(E.cssRules,function(J){var K=J.cssText;
if(K){var I=K.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!I){return 
}for(var H=1;
H<I.length;
H++){A(I[H])
}}})
}else{if(E.cssText){var F;
var C=E.cssText.toString();
var B=C.split(/\f|\r|\n/);
for(var D=0;
D<B.length;
D++){F=B[D].match(/url\(\s*([^\) ]*)\s*\)/i);
if(F&&F.length){A(F[1])
}}}}}catch(G){}})
},_sameLocation:function(A){if(!A){return false
}if(A.length&&A.charAt(0)=="#"){return false
}A=new dojo._Url(A);
if(!A.scheme&&!A.port&&!A.host){return true
}if(!A.scheme&&A.host&&A.port&&window.location.hostname==A.host&&window.location.port==A.port){return true
}if(!A.scheme&&A.host&&!A.port&&window.location.hostname==A.host&&window.location.port==80){return true
}return window.location.protocol==(A.scheme+":")&&window.location.hostname==A.host&&(window.location.port==A.port||!window.location.port&&!A.port)
},_trimAnchor:function(A){return A.replace(/\#.*$/,"")
},_doRefresh:function(D,A){var B;
try{B=google.gears.factory.create("beta.localserver","1.0")
}catch(C){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var G="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
B.removeStore(G);
B.openStore(G);
var F=B.createStore(G);
this._store=F;
var E=this;
this._currentFileIndex=0;
this._cancelID=F.capture(this.listOfURLs,function(J,H,I){if(!H&&E.refreshing){E._cancelID=null;
E.refreshing=false;
var K=[];
K.push("Unable to capture: "+J);
D(true,K);
return 
}else{if(H){E._currentFileIndex++
}}if(H&&E._currentFileIndex>=E.listOfURLs.length){E._cancelID=null;
E.refreshing=false;
if(A){dojox.storage.put("oldVersion",A,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
D(false,[])
}})
},_getVersionInfo:function(C){var B=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var D=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var A=null;
C=dojo.hitch(this,C);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(E){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
C(D,A,B)
},load:function(E){if(E){A=E
}C(D,A,B)
}})
}}
};