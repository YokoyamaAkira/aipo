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
dojo._xdIsXDomainPath=function(D){var B=D.indexOf(":");
var C=D.indexOf("/");
if(B>0&&B<C){return true
}else{var A=this.baseUrl;
B=A.indexOf(":");
C=A.indexOf("/");
if(B>0&&B<C&&(!location.host||A.indexOf("http://"+location.host)!=0)){return true
}}return false
};
dojo._loadPath=function(H,C,A){var E=this._xdIsXDomainPath(H);
this._isXDomain|=E;
var D=this.baseUrl+H;
if(E){var B=H.indexOf(":");
var F=H.indexOf("/");
if(B>0&&B<F){D=H
}}if(djConfig.cacheBust&&dojo.isBrowser){D+="?"+String(djConfig.cacheBust).replace(/\W+/g,"")
}try{return((!C||this._isXDomain)?this._loadUri(D,A,E,C):this._loadUriAndCheck(D,C,A))
}catch(G){console.debug(G);
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
dojo._xdResourceLoaded=function(I){var M=I.depends;
var L=null;
var H=null;
var A=[];
if(M&&M.length>0){var K=null;
var G=0;
var B=false;
for(var C=0;
C<M.length;
C++){K=M[C];
if(K[0]=="provide"){A.push(K[1])
}else{if(!L){L=[]
}if(!H){H=[]
}var J=this._xdUnpackDependency(K);
if(J.requires){L=L.concat(J.requires)
}if(J.requiresAfter){H=H.concat(J.requiresAfter)
}}var F=K[0];
var E=F.split(".");
if(E.length==2){dojo[E[0]][E[1]].apply(dojo[E[0]],K.slice(1))
}else{dojo[F].apply(dojo,K.slice(1))
}}if(A.length==1&&A[0]=="dojo._base._loader.loader_debug"){I.defineResource(dojo)
}else{var D=this._xdContents.push({content:I.defineResource,resourceName:I.resourceName,resourcePath:I.resourcePath,isDefined:false})-1;
for(var C=0;
C<A.length;
C++){this._xdDepMap[A[C]]={requires:L,requiresAfter:H,contentIndex:D}
}}for(var C=0;
C<A.length;
C++){this._xdInFlight[A[C]]=false
}}};
dojo._xdLoadFlattenedBundle=function(A,B,I,F){I=I||"root";
var E=dojo.i18n.normalizeLocale(I).replace("-","_");
var H=[A,"nls",B].join(".");
var J=dojo.provide(H);
J[E]=F;
var G=[A,E,B].join(".");
var C=dojo._xdBundleMap[G];
if(C){for(var D in C){J[D]=F
}}};
dojo._xdInitExtraLocales=function(){var A=djConfig.extraLocale;
if(A){if(!A instanceof Array){A=[A]
}dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(D,C,B,E){dojo._xdReqLoc(D,C,B,E);
if(B){return 
}for(var F=0;
F<A.length;
F++){dojo._xdReqLoc(D,C,A[F],E)
}}
}};
dojo._xdBundleMap={};
dojo.xdRequireLocalization=function(A,B,L,H){if(dojo._xdInitExtraLocales){dojo._xdInitExtraLocales();
dojo._xdInitExtraLocales=null;
dojo.xdRequireLocalization.apply(dojo,arguments);
return 
}var D=H.split(",");
var F=dojo.i18n.normalizeLocale(L);
var E="";
for(var G=0;
G<D.length;
G++){if(F.indexOf(D[G])==0){if(D[G].length>E.length){E=D[G]
}}}var J=E.replace("-","_");
var K=dojo.getObject([A,"nls",B].join("."));
if(K&&K[J]){bundle[F.replace("-","_")]=K[J]
}else{var I=[A,(J||"root"),B].join(".");
var C=dojo._xdBundleMap[I];
if(!C){C=dojo._xdBundleMap[I]={}
}C[F.replace("-","_")]=true;
dojo.require(A+".nls"+(E?"."+E:"")+"."+B)
}};
dojo._xdRealRequireLocalization=dojo.requireLocalization;
dojo.requireLocalization=function(B,C,A,E){var D=this.moduleUrl(B).toString();
if(this._xdIsXDomainPath(D)){return dojo.xdRequireLocalization.apply(dojo,arguments)
}else{return dojo._xdRealRequireLocalization.apply(dojo,arguments)
}};
dojo._xdUnpackDependency=function(E){var D=null;
var C=null;
switch(E[0]){case"requireIf":case"requireAfterIf":if(E[1]===true){D=[{name:E[2],content:null}]
}break;
case"platformRequire":var F=E[1];
var B=F.common||[];
var D=(F[dojo.hostenv.name_])?B.concat(F[dojo.hostenv.name_]||[]):B.concat(F["default"]||[]);
if(D){for(var A=0;
A<D.length;
A++){if(D[A] instanceof Array){D[A]={name:D[A][0],content:null}
}else{D[A]={name:D[A],content:null}
}}}break;
case"require":D=[{name:E[1],content:null}];
break;
case"i18n._preloadLocalizations":dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,E.slice(1));
break
}if(E[0]=="requireAfterIf"||E[0]=="requireIf"){C=D;
D=null
}return{requires:D,requiresAfter:C}
};
dojo._xdWalkReqs=function(){var C=null;
var B;
for(var A=0;
A<this._xdOrderedReqs.length;
A++){B=this._xdOrderedReqs[A];
if(this._xdDepMap[B]){C=[B];
C[B]=true;
this._xdEvalReqs(C)
}}};
dojo._xdEvalReqs=function(H){while(H.length>0){var G=H[H.length-1];
var D=this._xdDepMap[G];
if(D){var B=D.requires;
if(B&&B.length>0){var A;
for(var C=0;
C<B.length;
C++){A=B[C].name;
if(A&&!H[A]){H.push(A);
H[A]=true;
this._xdEvalReqs(H)
}}}var F=this._xdContents[D.contentIndex];
if(!F.isDefined){var E=F.content;
E.resourceName=F.resourceName;
E.resourcePath=F.resourcePath;
this._xdDefList.push(E);
F.isDefined=true
}this._xdDepMap[G]=null;
var B=D.requiresAfter;
if(B&&B.length>0){var A;
for(var C=0;
C<B.length;
C++){A=B[C].name;
if(A&&!H[A]){H.push(A);
H[A]=true;
this._xdEvalReqs(H)
}}}}H.pop()
}};
dojo._xdClearInterval=function(){clearInterval(this._xdTimer);
this._xdTimer=0
};
dojo._xdWatchInFlight=function(){var H="";
var G=(djConfig.xdWaitSeconds||15)*1000;
var C=(this._xdStartTime+G)<(new Date()).getTime();
for(var F in this._xdInFlight){if(this._xdInFlight[F]===true){if(C){H+=F+" "
}else{return 
}}}this._xdClearInterval();
if(C){throw"Could not load cross-domain resources: "+H
}this._xdWalkReqs();
var A=this._xdDefList.length;
for(var B=0;
B<A;
B++){var D=dojo._xdDefList[B];
if(djConfig.debugAtAllCosts&&D.resourceName){if(!this["_xdDebugQueue"]){this._xdDebugQueue=[]
}this._xdDebugQueue.push({resourceName:D.resourceName,resourcePath:D.resourcePath})
}else{D(dojo)
}}for(var B=0;
B<this._xdContents.length;
B++){var E=this._xdContents[B];
if(E.content&&!E.isDefined){E.content(dojo)
}}this._xdReset();
if(this["_xdDebugQueue"]&&this._xdDebugQueue.length>0){this._xdDebugFileLoaded()
}else{this._xdNotifyLoaded()
}};
dojo._xdNotifyLoaded=function(){this._inFlightCount=0;
if(this._initFired&&!this._loadNotifying){this._callLoaded()
}}
};