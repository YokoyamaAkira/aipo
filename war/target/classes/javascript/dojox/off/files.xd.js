dojo._xdResourceLoaded({depends:[["provide","dojox.off.files"]],defineResource:function(A){if(!A._hasResource["dojox.off.files"]){A._hasResource["dojox.off.files"]=true;
A.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(C){if(A.isString(C)){var B=this._trimAnchor(C+"");
if(!this.isAvailable(B)){this.listOfURLs.push(B)
}}else{if(C instanceof A._Url){var B=this._trimAnchor(C.uri);
if(!this.isAvailable(B)){this.listOfURLs.push(B)
}}else{A.forEach(C,function(D){D=this._trimAnchor(D);
if(!this.isAvailable(D)){this.listOfURLs.push(D)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
A.forEach(this.listOfURLs,function(B){console.debug(B)
})
},remove:function(C){for(var B=0;
B<this.listOfURLs.length;
B++){if(this.listOfURLs[B]==C){this.listOfURLs=this.listOfURLs.splice(B,1);
break
}}},isAvailable:function(C){for(var B=0;
B<this.listOfURLs.length;
B++){if(this.listOfURLs[B]==C){return true
}}return false
},refresh:function(B){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(D,E,F){if(djConfig.isDebug||!E||F||!D||D!=E){console.warn("Refreshing offline file list");
this._doRefresh(B,E)
}else{console.warn("No need to refresh offline file list");
B(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(B)
}}catch(C){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var B=A.hitch(this,function(C){if(this._sameLocation(C)){this.cache(C)
}});
B(window.location.href);
A.query("script").forEach(function(C){try{B(C.getAttribute("src"))
}catch(D){}});
A.query("link").forEach(function(C){try{if(!C.getAttribute("rel")||C.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}B(C.getAttribute("href"))
}catch(D){}});
A.query("img").forEach(function(C){try{B(C.getAttribute("src"))
}catch(D){}});
A.query("a").forEach(function(C){try{B(C.getAttribute("href"))
}catch(D){}});
A.forEach(document.styleSheets,function(C){try{if(C.cssRules){A.forEach(C.cssRules,function(K){var L=K.cssText;
if(L){var J=L.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!J){return 
}for(var I=1;
I<J.length;
I++){B(J[I])
}}})
}else{if(C.cssText){var D;
var F=C.cssText.toString();
var G=F.split(/\f|\r|\n/);
for(var H=0;
H<G.length;
H++){D=G[H].match(/url\(\s*([^\) ]*)\s*\)/i);
if(D&&D.length){B(D[1])
}}}}}catch(E){}})
},_sameLocation:function(B){if(!B){return false
}if(B.length&&B.charAt(0)=="#"){return false
}B=new A._Url(B);
if(!B.scheme&&!B.port&&!B.host){return true
}if(!B.scheme&&B.host&&B.port&&window.location.hostname==B.host&&window.location.port==B.port){return true
}if(!B.scheme&&B.host&&!B.port&&window.location.hostname==B.host&&window.location.port==80){return true
}return window.location.protocol==(B.scheme+":")&&window.location.hostname==B.host&&(window.location.port==B.port||!window.location.port&&!B.port)
},_trimAnchor:function(B){return B.replace(/\#.*$/,"")
},_doRefresh:function(C,D){var E;
try{E=google.gears.factory.create("beta.localserver","1.0")
}catch(F){A.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var B="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
E.removeStore(B);
E.openStore(B);
var H=E.createStore(B);
this._store=H;
var G=this;
this._currentFileIndex=0;
this._cancelID=H.capture(this.listOfURLs,function(J,L,I){if(!L&&G.refreshing){G._cancelID=null;
G.refreshing=false;
var K=[];
K.push("Unable to capture: "+J);
C(true,K);
return 
}else{if(L){G._currentFileIndex++
}}if(L&&G._currentFileIndex>=G.listOfURLs.length){G._cancelID=null;
G.refreshing=false;
if(D){dojox.storage.put("oldVersion",D,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
C(false,[])
}})
},_getVersionInfo:function(B){var E=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var C=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var D=null;
B=A.hitch(this,B);
A.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(F){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
B(C,D,E)
},load:function(F){if(F){D=F
}B(C,D,E)
}})
}}
}}});