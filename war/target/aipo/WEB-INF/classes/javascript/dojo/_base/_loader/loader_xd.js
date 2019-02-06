if(!dojo._hasResource["dojo._base._loader.loader_xd"]){dojo._hasResource["dojo._base._loader.loader_xd"]=true;
dojo.provide("dojo._base._loader.loader_xd");
dojo._xdReset=function(){this._isXDomain=djConfig.useXDomain||false;
this._xdTimer=0;
this._xdInFlight={};
this._xdOrderedReqs=[];
this._xdDepMap={};
this._xdContents=[];
this._xdDefList=[]
};
dojo._xdReset();
dojo._xdCreateResource=function(contents,resourceName,resourcePath){var depContents=contents.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"");
var deps=[];
var depRegExp=/dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\(([\w\W]*?)\)/mg;
var match;
while((match=depRegExp.exec(depContents))!=null){if(match[1]=="requireLocalization"){eval(match[0])
}else{deps.push('"'+match[1]+'", '+match[2])
}}var output=[];
output.push("dojo._xdResourceLoaded({\n");
if(deps.length>0){output.push("depends: [");
for(var i=0;
i<deps.length;
i++){if(i>0){output.push(",\n")
}output.push("["+deps[i]+"]")
}output.push("],")
}output.push("\ndefineResource: function(dojo){");
if(!djConfig.debugAtAllCosts||resourceName=="dojo._base._loader.loader_debug"){output.push(contents)
}output.push("\n}, resourceName: '"+resourceName+"', resourcePath: '"+resourcePath+"'});");
return output.join("")
};
dojo._xdIsXDomainPath=function(C){var A=C.indexOf(":");
var B=C.indexOf("/");
if(A>0&&A<B){return true
}else{var D=this.baseUrl;
A=D.indexOf(":");
B=D.indexOf("/");
if(A>0&&A<B&&(!location.host||D.indexOf("http://"+location.host)!=0)){return true
}}return false
};
dojo._loadPath=function(C,F,D){var H=this._xdIsXDomainPath(C);
this._isXDomain|=H;
var G=this.baseUrl+C;
if(H){var E=C.indexOf(":");
var A=C.indexOf("/");
if(E>0&&E<A){G=C
}}if(djConfig.cacheBust&&dojo.isBrowser){G+="?"+String(djConfig.cacheBust).replace(/\W+/g,"")
}try{return((!F||this._isXDomain)?this._loadUri(G,D,H,F):this._loadUriAndCheck(G,F,D))
}catch(B){console.debug(B);
return false
}};
dojo._loadUri=function(uri,cb,currentIsXDomain,module){if(this._loadedUrls[uri]){return 1
}if(this._isXDomain&&module&&module!="dojo.i18n"){this._xdOrderedReqs.push(module);
if(currentIsXDomain||uri.indexOf("/nls/")==-1){this._xdInFlight[module]=true;
this._inFlightCount++
}if(!this._xdTimer){this._xdTimer=setInterval("dojo._xdWatchInFlight();",100)
}this._xdStartTime=(new Date()).getTime()
}if(currentIsXDomain){var lastIndex=uri.lastIndexOf(".");
if(lastIndex<=0){lastIndex=uri.length-1
}var xdUri=uri.substring(0,lastIndex)+".xd";
if(lastIndex!=uri.length-1){xdUri+=uri.substring(lastIndex,uri.length)
}var element=document.createElement("script");
element.type="text/javascript";
element.src=xdUri;
if(!this.headElement){this._headElement=document.getElementsByTagName("head")[0];
if(!this._headElement){this._headElement=document.getElementsByTagName("html")[0]
}}this._headElement.appendChild(element)
}else{var contents=this._getText(uri,null,true);
if(contents==null){return 0
}if(this._isXDomain&&uri.indexOf("/nls/")==-1&&module!="dojo.i18n"){var res=this._xdCreateResource(contents,module,uri);
dojo.eval(res)
}else{if(cb){contents="("+contents+")"
}var value=dojo.eval(contents);
if(cb){cb(value)
}}}this._loadedUrls[uri]=true;
this._loadedUrls.push(uri);
return true
};
dojo._xdResourceLoaded=function(E){var I=E.depends;
var H=null;
var D=null;
var J=[];
if(I&&I.length>0){var G=null;
var C=0;
var K=false;
for(var L=0;
L<I.length;
L++){G=I[L];
if(G[0]=="provide"){J.push(G[1])
}else{if(!H){H=[]
}if(!D){D=[]
}var F=this._xdUnpackDependency(G);
if(F.requires){H=H.concat(F.requires)
}if(F.requiresAfter){D=D.concat(F.requiresAfter)
}}var B=G[0];
var A=B.split(".");
if(A.length==2){dojo[A[0]][A[1]].apply(dojo[A[0]],G.slice(1))
}else{dojo[B].apply(dojo,G.slice(1))
}}if(J.length==1&&J[0]=="dojo._base._loader.loader_debug"){E.defineResource(dojo)
}else{var M=this._xdContents.push({content:E.defineResource,resourceName:E.resourceName,resourcePath:E.resourcePath,isDefined:false})-1;
for(var L=0;
L<J.length;
L++){this._xdDepMap[J[L]]={requires:H,requiresAfter:D,contentIndex:M}
}}for(var L=0;
L<J.length;
L++){this._xdInFlight[J[L]]=false
}}};
dojo._xdLoadFlattenedBundle=function(G,H,E,B){E=E||"root";
var A=dojo.i18n.normalizeLocale(E).replace("-","_");
var D=[G,"nls",H].join(".");
var F=dojo.provide(D);
F[A]=B;
var C=[G,A,H].join(".");
var I=dojo._xdBundleMap[C];
if(I){for(var J in I){F[J]=B
}}};
dojo._xdInitExtraLocales=function(){var A=djConfig.extraLocale;
if(A){if(!A instanceof Array){A=[A]
}dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(E,D,C,F){dojo._xdReqLoc(E,D,C,F);
if(C){return 
}for(var B=0;
B<A.length;
B++){dojo._xdReqLoc(E,D,A[B],F)
}}
}};
dojo._xdBundleMap={};
dojo.xdRequireLocalization=function(I,J,H,D){if(dojo._xdInitExtraLocales){dojo._xdInitExtraLocales();
dojo._xdInitExtraLocales=null;
dojo.xdRequireLocalization.apply(dojo,arguments);
return 
}var L=D.split(",");
var B=dojo.i18n.normalizeLocale(H);
var A="";
for(var C=0;
C<L.length;
C++){if(B.indexOf(L[C])==0){if(L[C].length>A.length){A=L[C]
}}}var F=A.replace("-","_");
var G=dojo.getObject([I,"nls",J].join("."));
if(G&&G[F]){bundle[B.replace("-","_")]=G[F]
}else{var E=[I,(F||"root"),J].join(".");
var K=dojo._xdBundleMap[E];
if(!K){K=dojo._xdBundleMap[E]={}
}K[B.replace("-","_")]=true;
dojo.require(I+".nls"+(A?"."+A:"")+"."+J)
}};
dojo._xdRealRequireLocalization=dojo.requireLocalization;
dojo.requireLocalization=function(A,B,E,D){var C=this.moduleUrl(A).toString();
if(this._xdIsXDomainPath(C)){return dojo.xdRequireLocalization.apply(dojo,arguments)
}else{return dojo._xdRealRequireLocalization.apply(dojo,arguments)
}};
dojo._xdUnpackDependency=function(D){var C=null;
var B=null;
switch(D[0]){case"requireIf":case"requireAfterIf":if(D[1]===true){C=[{name:D[2],content:null}]
}break;
case"platformRequire":var E=D[1];
var A=E.common||[];
var C=(E[dojo.hostenv.name_])?A.concat(E[dojo.hostenv.name_]||[]):A.concat(E["default"]||[]);
if(C){for(var F=0;
F<C.length;
F++){if(C[F] instanceof Array){C[F]={name:C[F][0],content:null}
}else{C[F]={name:C[F],content:null}
}}}break;
case"require":C=[{name:D[1],content:null}];
break;
case"i18n._preloadLocalizations":dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,D.slice(1));
break
}if(D[0]=="requireAfterIf"||D[0]=="requireIf"){B=C;
C=null
}return{requires:C,requiresAfter:B}
};
dojo._xdWalkReqs=function(){var B=null;
var A;
for(var C=0;
C<this._xdOrderedReqs.length;
C++){A=this._xdOrderedReqs[C];
if(this._xdDepMap[A]){B=[A];
B[A]=true;
this._xdEvalReqs(B)
}}};
dojo._xdEvalReqs=function(C){while(C.length>0){var B=C[C.length-1];
var G=this._xdDepMap[B];
if(G){var E=G.requires;
if(E&&E.length>0){var D;
for(var F=0;
F<E.length;
F++){D=E[F].name;
if(D&&!C[D]){C.push(D);
C[D]=true;
this._xdEvalReqs(C)
}}}var A=this._xdContents[G.contentIndex];
if(!A.isDefined){var H=A.content;
H.resourceName=A.resourceName;
H.resourcePath=A.resourcePath;
this._xdDefList.push(H);
A.isDefined=true
}this._xdDepMap[B]=null;
var E=G.requiresAfter;
if(E&&E.length>0){var D;
for(var F=0;
F<E.length;
F++){D=E[F].name;
if(D&&!C[D]){C.push(D);
C[D]=true;
this._xdEvalReqs(C)
}}}}C.pop()
}};
dojo._xdClearInterval=function(){clearInterval(this._xdTimer);
this._xdTimer=0
};
dojo._xdWatchInFlight=function(){var C="";
var B=(djConfig.xdWaitSeconds||15)*1000;
var F=(this._xdStartTime+B)<(new Date()).getTime();
for(var A in this._xdInFlight){if(this._xdInFlight[A]===true){if(F){C+=A+" "
}else{return 
}}}this._xdClearInterval();
if(F){throw"Could not load cross-domain resources: "+C
}this._xdWalkReqs();
var D=this._xdDefList.length;
for(var E=0;
E<D;
E++){var G=dojo._xdDefList[E];
if(djConfig.debugAtAllCosts&&G.resourceName){if(!this["_xdDebugQueue"]){this._xdDebugQueue=[]
}this._xdDebugQueue.push({resourceName:G.resourceName,resourcePath:G.resourcePath})
}else{G(dojo)
}}for(var E=0;
E<this._xdContents.length;
E++){var H=this._xdContents[E];
if(H.content&&!H.isDefined){H.content(dojo)
}}this._xdReset();
if(this["_xdDebugQueue"]&&this._xdDebugQueue.length>0){this._xdDebugFileLoaded()
}else{this._xdNotifyLoaded()
}};
dojo._xdNotifyLoaded=function(){this._inFlightCount=0;
if(this._initFired&&!this._loadNotifying){this._callLoaded()
}}
};