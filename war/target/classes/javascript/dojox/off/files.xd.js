dojo._xdResourceLoaded({depends:[["provide","dojox.off.files"]],defineResource:function(A){if(!A._hasResource["dojox.off.files"]){A._hasResource["dojox.off.files"]=true;
A.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(B){if(A.isString(B)){var C=this._trimAnchor(B+"");
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}}else{if(B instanceof A._Url){var C=this._trimAnchor(B.uri);
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}}else{A.forEach(B,function(D){D=this._trimAnchor(D);
if(!this.isAvailable(D)){this.listOfURLs.push(D)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
A.forEach(this.listOfURLs,function(B){console.debug(B)
})
},remove:function(B){for(var C=0;
C<this.listOfURLs.length;
C++){if(this.listOfURLs[C]==B){this.listOfURLs=this.listOfURLs.splice(C,1);
break
}}},isAvailable:function(B){for(var C=0;
C<this.listOfURLs.length;
C++){if(this.listOfURLs[C]==B){return true
}}return false
},refresh:function(C){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(D,E,F){if(djConfig.isDebug||!E||F||!D||D!=E){console.warn("Refreshing offline file list");
this._doRefresh(C,E)
}else{console.warn("No need to refresh offline file list");
C(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(C)
}}catch(B){this.refreshing=false;
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
A.forEach(document.styleSheets,function(E){try{if(E.cssRules){A.forEach(E.cssRules,function(K){var L=K.cssText;
if(L){var J=L.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!J){return 
}for(var I=1;
I<J.length;
I++){B(J[I])
}}})
}else{if(E.cssText){var F;
var H=E.cssText.toString();
var C=H.split(/\f|\r|\n/);
for(var D=0;
D<C.length;
D++){F=C[D].match(/url\(\s*([^\) ]*)\s*\)/i);
if(F&&F.length){B(F[1])
}}}}}catch(G){}})
},_sameLocation:function(B){if(!B){return false
}if(B.length&&B.charAt(0)=="#"){return false
}B=new A._Url(B);
if(!B.scheme&&!B.port&&!B.host){return true
}if(!B.scheme&&B.host&&B.port&&window.location.hostname==B.host&&window.location.port==B.port){return true
}if(!B.scheme&&B.host&&!B.port&&window.location.hostname==B.host&&window.location.port==80){return true
}return window.location.protocol==(B.scheme+":")&&window.location.hostname==B.host&&(window.location.port==B.port||!window.location.port&&!B.port)
},_trimAnchor:function(B){return B.replace(/\#.*$/,"")
},_doRefresh:function(H,E){var F;
try{F=google.gears.factory.create("beta.localserver","1.0")
}catch(G){A.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var D="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
F.removeStore(D);
F.openStore(D);
var C=F.createStore(D);
this._store=C;
var B=this;
this._currentFileIndex=0;
this._cancelID=C.capture(this.listOfURLs,function(J,L,I){if(!L&&B.refreshing){B._cancelID=null;
B.refreshing=false;
var K=[];
K.push("Unable to capture: "+J);
H(true,K);
return 
}else{if(L){B._currentFileIndex++
}}if(L&&B._currentFileIndex>=B.listOfURLs.length){B._cancelID=null;
B.refreshing=false;
if(E){dojox.storage.put("oldVersion",E,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
H(false,[])
}})
},_getVersionInfo:function(E){var D=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var B=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var C=null;
E=A.hitch(this,E);
A.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(F){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
E(B,C,D)
},load:function(F){if(F){C=F
}E(B,C,D)
}})
}}
}}});