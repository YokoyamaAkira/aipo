if(typeof window!="undefined"){dojo.isBrowser=true;
dojo._name="browser";
(function(){var d=dojo;
if(document&&document.getElementsByTagName){var scripts=document.getElementsByTagName("script");
var rePkg=/dojo(\.xd)?\.js([\?\.]|$)/i;
for(var i=0;
i<scripts.length;
i++){var src=scripts[i].getAttribute("src");
if(!src){continue
}var m=src.match(rePkg);
if(m){if(!djConfig.baseUrl){djConfig.baseUrl=src.substring(0,m.index)
}var cfg=scripts[i].getAttribute("djConfig");
if(cfg){var cfgo=eval("({ "+cfg+" })");
for(var x in cfgo){djConfig[x]=cfgo[x]
}}break
}}}d.baseUrl=djConfig.baseUrl;
var n=navigator;
var dua=n.userAgent;
var dav=n.appVersion;
var tv=parseFloat(dav);
d.isOpera=(dua.indexOf("Opera")>=0)?tv:0;
d.isKhtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0)?tv:0;
if(dav.indexOf("Safari")>=0){d.isSafari=parseFloat(dav.split("Version/")[1])||2
}var geckoPos=dua.indexOf("Gecko");
d.isMozilla=d.isMoz=((geckoPos>=0)&&(!d.isKhtml))?tv:0;
d.isFF=0;
d.isIE=0;
try{if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1].split(" ")[0])
}if((document.all)&&(!d.isOpera)){d.isIE=parseFloat(dav.split("MSIE ")[1].split(";")[0])
}}catch(e){}if(dojo.isIE&&(window.location.protocol==="file:")){djConfig.ieForceActiveXXhr=true
}var cm=document.compatMode;
d.isQuirks=(cm=="BackCompat")||(cm=="QuirksMode")||(d.isIE<6);
d.locale=djConfig.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._println=console.debug;
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){var http=null;
var last_e=null;
if(!dojo.isIE||!djConfig.ieForceActiveXXhr){try{http=new XMLHttpRequest()
}catch(e){}}if(!http){for(var i=0;
i<3;
++i){var progid=dojo._XMLHTTP_PROGIDS[i];
try{http=new ActiveXObject(progid)
}catch(e){last_e=e
}if(http){dojo._XMLHTTP_PROGIDS=[progid];
break
}}}if(!http){throw new Error("XMLHTTP not available: "+last_e)
}return http
};
d._isDocumentOk=function(http){var stat=http.status||0;
return((stat>=200)&&(stat<300))||(stat==304)||(stat==1223)||(!stat&&(location.protocol=="file:"||location.protocol=="chrome:"))
};
var owloc=window.location+"";
var base=document.getElementsByTagName("base");
var hasBase=(base&&base.length>0);
d._getText=function(uri,fail_ok){var http=this._xhrObj();
if(!hasBase&&dojo._Url){uri=(new dojo._Url(owloc,uri)).toString()
}http.open("GET",uri,false);
try{http.send(null);
if(!d._isDocumentOk(http)){var err=Error("Unable to load "+uri+" status:"+http.status);
err.status=http.status;
err.responseText=http.responseText;
throw err
}}catch(e){if(fail_ok){return null
}throw e
}return http.responseText
}
})();
dojo._initFired=false;
dojo._loadInit=function(B){dojo._initFired=true;
var A=(B&&B.type)?B.type.toLowerCase():"load";
if(arguments.callee.initialized||(A!="domcontentloaded"&&A!="load")){return 
}arguments.callee.initialized=true;
if(typeof dojo._khtmlTimer!="undefined"){clearInterval(dojo._khtmlTimer);
delete dojo._khtmlTimer
}if(dojo._inFlightCount==0){dojo._modulesLoaded()
}};
if(document.addEventListener){if(dojo.isOpera||(dojo.isMoz&&(djConfig.enableMozDomContentLoaded===true))){document.addEventListener("DOMContentLoaded",dojo._loadInit,null)
}window.addEventListener("load",dojo._loadInit,null)
}if(/(WebKit|khtml)/i.test(navigator.userAgent)){dojo._khtmlTimer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){dojo._loadInit()
}},10)
}(function(){var B=window;
var A=function(G,E){var F=B[G]||function(){};
B[G]=function(){E.apply(B,arguments);
F.apply(B,arguments)
}
};
if(dojo.isIE){document.write('<script defer src="//:" onreadystatechange="if(this.readyState==\'complete\'){dojo._loadInit();}"><\/script>');
var D=true;
A("onbeforeunload",function(){B.setTimeout(function(){D=false
},0)
});
A("onunload",function(){if(D){dojo.unloaded()
}});
try{document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)")
}catch(C){}}else{A("onbeforeunload",function(){dojo.unloaded()
})
}})()
}if(djConfig.isDebug){dojo.require("dojo._firebug.firebug")
}if(djConfig.debugAtAllCosts){djConfig.useXDomain=true;
dojo.require("dojo._base._loader.loader_xd");
dojo.require("dojo._base._loader.loader_debug");
dojo.require("dojo.i18n")
};