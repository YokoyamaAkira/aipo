if(!dojo._hasResource["dojo.foo"]){dojo._hasResource["dojo.foo"]=true;
(function(){var B=dojo;
dojo.mixin(dojo,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(E){var D=this._modulePrefixes;
return !!(D[E]&&D[E].value)
},_getModulePrefix:function(E){var D=this._modulePrefixes;
if(this._moduleHasPrefix(E)){return D[E].value
}return E
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(D,F,E){var G=(((D.charAt(0)=="/"||D.match(/^\w+:/)))?"":this.baseUrl)+D;
if(djConfig.cacheBust&&B.isBrowser){G+="?"+String(djConfig.cacheBust).replace(/\W+/g,"")
}try{return !F?this._loadUri(G,E):this._loadUriAndCheck(G,F,E)
}catch(H){console.debug(H);
return false
}};
dojo._loadUri=function(G,E){if(this._loadedUrls[G]){return true
}var F=this._getText(G,true);
if(!F){return false
}this._loadedUrls[G]=true;
this._loadedUrls.push(G);
if(E){F="("+F+")"
}var D=B["eval"](F+"\r\n//@ sourceURL="+G);
if(E){E(D)
}return true
};
dojo._loadUriAndCheck=function(H,F,E){var G=false;
try{G=this._loadUri(H,E)
}catch(D){console.debug("failed loading "+H+" with error: "+D)
}return Boolean(G&&this._loadedModules[F])
};
dojo.loaded=function(){this._loadNotifying=true;
this._postLoad=true;
var D=this._loaders;
this._loaders=[];
for(var E=0;
E<D.length;
E++){D[E]()
}this._loadNotifying=false;
if(B._postLoad&&B._inFlightCount==0&&this._loaders.length>0){B._callLoaded()
}};
dojo.unloaded=function(){var D=this._unloaders;
while(D.length){(D.pop())()
}};
dojo.addOnLoad=function(D,E){if(arguments.length==1){B._loaders.push(D)
}else{if(arguments.length>1){B._loaders.push(function(){D[E]()
})
}}if(B._postLoad&&B._inFlightCount==0&&!B._loadNotifying){B._callLoaded()
}};
dojo.addOnUnload=function(D,E){if(arguments.length==1){B._unloaders.push(D)
}else{if(arguments.length>1){B._unloaders.push(function(){D[E]()
})
}}};
dojo._modulesLoaded=function(){if(B._postLoad){return 
}if(B._inFlightCount>0){console.debug("files still in flight!");
return 
}B._callLoaded()
};
dojo._callLoaded=function(){if(typeof setTimeout=="object"||(djConfig.useXDomain&&B.isOpera)){setTimeout("dojo.loaded();",0)
}else{B.loaded()
}};
dojo._getModuleSymbols=function(F){var D=F.split(".");
for(var E=D.length;
E>0;
E--){var H=D.slice(0,E).join(".");
if((E==1)&&!this._moduleHasPrefix(H)){D[0]="../"+D[0]
}else{var G=this._getModulePrefix(H);
if(G!=H){D.splice(0,E,G);
break
}}}return D
};
dojo._global_omit_module_check=false;
dojo._loadModule=dojo.require=function(F,I){I=this._global_omit_module_check||I;
var H=this._loadedModules[F];
if(H){return H
}var E=this._getModuleSymbols(F).join("/")+".js";
var D=(!I)?F:null;
var G=this._loadPath(E,D);
if((!G)&&(!I)){throw new Error("Could not load '"+F+"'; last tried '"+E+"'")
}if((!I)&&(!this["_isXDomain"])){H=this._loadedModules[F];
if(!H){throw new Error("symbol '"+F+"' is not defined after loading '"+E+"'")
}}return H
};
dojo.provide=function(D){D=D+"";
return(B._loadedModules[D]=B.getObject(D,true))
};
dojo.platformRequire=function(D){var G=D.common||[];
var F=G.concat(D[B._name]||D["default"]||[]);
for(var E=0;
E<F.length;
E++){var H=F[E];
if(H.constructor==Array){B._loadModule.apply(B,H)
}else{B._loadModule(H)
}}};
dojo.requireIf=function(D,G){if(D===true){var E=[];
for(var F=1;
F<arguments.length;
F++){E.push(arguments[F])
}B.require.apply(B,E)
}};
dojo.requireAfterIf=B.requireIf;
dojo.registerModulePath=function(E,D){B._modulePrefixes[E]={name:E,value:D}
};
dojo.requireLocalization=function(F,G,E,D){B.require("dojo.i18n");
B.i18n._requireLocalization.apply(B.hostenv,arguments)
};
var C=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var A=new RegExp("^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$");
dojo._Url=function(){var H=null;
var M=arguments;
var I=M[0];
for(var K=1;
K<M.length;
K++){if(!M[K]){continue
}var L=new B._Url(M[K]+"");
var D=new B._Url(I+"");
if((L.path=="")&&(!L.scheme)&&(!L.authority)&&(!L.query)){if(L.fragment!=H){D.fragment=L.fragment
}L=D
}else{if(!L.scheme){L.scheme=D.scheme;
if(!L.authority){L.authority=D.authority;
if(L.path.charAt(0)!="/"){var E=D.path.substring(0,D.path.lastIndexOf("/")+1)+L.path;
var G=E.split("/");
for(var J=0;
J<G.length;
J++){if(G[J]=="."){if(J==G.length-1){G[J]=""
}else{G.splice(J,1);
J--
}}else{if(J>0&&!(J==1&&G[0]=="")&&G[J]==".."&&G[J-1]!=".."){if(J==(G.length-1)){G.splice(J,1);
G[J-1]=""
}else{G.splice(J-1,2);
J-=2
}}}}L.path=G.join("/")
}}}}I="";
if(L.scheme){I+=L.scheme+":"
}if(L.authority){I+="//"+L.authority
}I+=L.path;
if(L.query){I+="?"+L.query
}if(L.fragment){I+="#"+L.fragment
}}this.uri=I.toString();
var F=this.uri.match(C);
this.scheme=F[2]||(F[1]?"":H);
this.authority=F[4]||(F[3]?"":H);
this.path=F[5];
this.query=F[7]||(F[6]?"":H);
this.fragment=F[9]||(F[8]?"":H);
if(this.authority!=H){F=this.authority.match(A);
this.user=F[3]||H;
this.password=F[4]||H;
this.host=F[5];
this.port=F[7]||H
}};
dojo._Url.prototype.toString=function(){return this.uri
};
dojo.moduleUrl=function(G,F){var D=dojo._getModuleSymbols(G).join("/");
if(!D){return null
}if(D.lastIndexOf("/")!=D.length-1){D+="/"
}var E=D.indexOf(":");
if(D.charAt(0)!="/"&&(E==-1||E>D.indexOf("/"))){D=B.baseUrl+D
}return new B._Url(D,F)
}
})()
};