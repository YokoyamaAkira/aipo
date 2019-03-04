if(!dojo._hasResource["dojo.foo"]){dojo._hasResource["dojo.foo"]=true;
(function(){var C=dojo;
dojo.mixin(dojo,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(D){var E=this._modulePrefixes;
return !!(E[D]&&E[D].value)
},_getModulePrefix:function(D){var E=this._modulePrefixes;
if(this._moduleHasPrefix(D)){return E[D].value
}return D
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(H,E,D){var F=(((H.charAt(0)=="/"||H.match(/^\w+:/)))?"":this.baseUrl)+H;
if(djConfig.cacheBust&&C.isBrowser){F+="?"+String(djConfig.cacheBust).replace(/\W+/g,"")
}try{return !E?this._loadUri(F,D):this._loadUriAndCheck(F,E,D)
}catch(G){console.debug(G);
return false
}};
dojo._loadUri=function(F,D){if(this._loadedUrls[F]){return true
}var E=this._getText(F,true);
if(!E){return false
}this._loadedUrls[F]=true;
this._loadedUrls.push(F);
if(D){E="("+E+")"
}var G=C["eval"](E+"\r\n//@ sourceURL="+F);
if(D){D(G)
}return true
};
dojo._loadUriAndCheck=function(G,E,D){var F=false;
try{F=this._loadUri(G,D)
}catch(H){console.debug("failed loading "+G+" with error: "+H)
}return Boolean(F&&this._loadedModules[E])
};
dojo.loaded=function(){this._loadNotifying=true;
this._postLoad=true;
var E=this._loaders;
this._loaders=[];
for(var D=0;
D<E.length;
D++){E[D]()
}this._loadNotifying=false;
if(C._postLoad&&C._inFlightCount==0&&this._loaders.length>0){C._callLoaded()
}};
dojo.unloaded=function(){var D=this._unloaders;
while(D.length){(D.pop())()
}};
dojo.addOnLoad=function(E,D){if(arguments.length==1){C._loaders.push(E)
}else{if(arguments.length>1){C._loaders.push(function(){E[D]()
})
}}if(C._postLoad&&C._inFlightCount==0&&!C._loadNotifying){C._callLoaded()
}};
dojo.addOnUnload=function(E,D){if(arguments.length==1){C._unloaders.push(E)
}else{if(arguments.length>1){C._unloaders.push(function(){E[D]()
})
}}};
dojo._modulesLoaded=function(){if(C._postLoad){return 
}if(C._inFlightCount>0){console.debug("files still in flight!");
return 
}C._callLoaded()
};
dojo._callLoaded=function(){if(typeof setTimeout=="object"||(djConfig.useXDomain&&C.isOpera)){setTimeout("dojo.loaded();",0)
}else{C.loaded()
}};
dojo._getModuleSymbols=function(E){var H=E.split(".");
for(var D=H.length;
D>0;
D--){var G=H.slice(0,D).join(".");
if((D==1)&&!this._moduleHasPrefix(G)){H[0]="../"+H[0]
}else{var F=this._getModulePrefix(G);
if(F!=G){H.splice(0,D,F);
break
}}}return H
};
dojo._global_omit_module_check=false;
dojo._loadModule=dojo.require=function(E,H){H=this._global_omit_module_check||H;
var G=this._loadedModules[E];
if(G){return G
}var I=this._getModuleSymbols(E).join("/")+".js";
var D=(!H)?E:null;
var F=this._loadPath(I,D);
if((!F)&&(!H)){throw new Error("Could not load '"+E+"'; last tried '"+I+"'")
}if((!H)&&(!this["_isXDomain"])){G=this._loadedModules[E];
if(!G){throw new Error("symbol '"+E+"' is not defined after loading '"+I+"'")
}}return G
};
dojo.provide=function(D){D=D+"";
return(C._loadedModules[D]=C.getObject(D,true))
};
dojo.platformRequire=function(H){var F=H.common||[];
var E=F.concat(H[C._name]||H["default"]||[]);
for(var D=0;
D<E.length;
D++){var G=E[D];
if(G.constructor==Array){C._loadModule.apply(C,G)
}else{C._loadModule(G)
}}};
dojo.requireIf=function(G,F){if(G===true){var D=[];
for(var E=1;
E<arguments.length;
E++){D.push(arguments[E])
}C.require.apply(C,D)
}};
dojo.requireAfterIf=C.requireIf;
dojo.registerModulePath=function(D,E){C._modulePrefixes[D]={name:D,value:E}
};
dojo.requireLocalization=function(E,F,D,G){C.require("dojo.i18n");
C.i18n._requireLocalization.apply(C.hostenv,arguments)
};
var A=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var B=new RegExp("^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$");
dojo._Url=function(){var F=null;
var K=arguments;
var G=K[0];
for(var I=1;
I<K.length;
I++){if(!K[I]){continue
}var J=new C._Url(K[I]+"");
var L=new C._Url(G+"");
if((J.path=="")&&(!J.scheme)&&(!J.authority)&&(!J.query)){if(J.fragment!=F){L.fragment=J.fragment
}J=L
}else{if(!J.scheme){J.scheme=L.scheme;
if(!J.authority){J.authority=L.authority;
if(J.path.charAt(0)!="/"){var M=L.path.substring(0,L.path.lastIndexOf("/")+1)+J.path;
var E=M.split("/");
for(var H=0;
H<E.length;
H++){if(E[H]=="."){if(H==E.length-1){E[H]=""
}else{E.splice(H,1);
H--
}}else{if(H>0&&!(H==1&&E[0]=="")&&E[H]==".."&&E[H-1]!=".."){if(H==(E.length-1)){E.splice(H,1);
E[H-1]=""
}else{E.splice(H-1,2);
H-=2
}}}}J.path=E.join("/")
}}}}G="";
if(J.scheme){G+=J.scheme+":"
}if(J.authority){G+="//"+J.authority
}G+=J.path;
if(J.query){G+="?"+J.query
}if(J.fragment){G+="#"+J.fragment
}}this.uri=G.toString();
var D=this.uri.match(A);
this.scheme=D[2]||(D[1]?"":F);
this.authority=D[4]||(D[3]?"":F);
this.path=D[5];
this.query=D[7]||(D[6]?"":F);
this.fragment=D[9]||(D[8]?"":F);
if(this.authority!=F){D=this.authority.match(B);
this.user=D[3]||F;
this.password=D[4]||F;
this.host=D[5];
this.port=D[7]||F
}};
dojo._Url.prototype.toString=function(){return this.uri
};
dojo.moduleUrl=function(F,E){var G=dojo._getModuleSymbols(F).join("/");
if(!G){return null
}if(G.lastIndexOf("/")!=G.length-1){G+="/"
}var D=G.indexOf(":");
if(G.charAt(0)!="/"&&(D==-1||D>G.indexOf("/"))){G=C.baseUrl+G
}return new C._Url(G,E)
}
})()
};