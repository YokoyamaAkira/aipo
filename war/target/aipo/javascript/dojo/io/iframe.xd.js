dojo._xdResourceLoaded({depends:[["provide","dojo.io.iframe"]],defineResource:function(dojo){if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.io.iframe={create:function(fname,onloadstr,uri){if(window[fname]){return window[fname]
}if(window.frames[fname]){return window.frames[fname]
}var cframe=null;
var turi=uri;
if(!turi){if(djConfig.useXDomain&&!djConfig.dojoBlankHtmlUrl){console.debug("dojo.io.iframe.create: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html")
}turi=(djConfig.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html"))
}var ifrstr=dojo.isIE?'<iframe name="'+fname+'" src="'+turi+'" onload="'+onloadstr+'">':"iframe";
cframe=dojo.doc.createElement(ifrstr);
with(cframe){name=fname;
setAttribute("name",fname);
id=fname
}dojo.body().appendChild(cframe);
window[fname]=cframe;
with(cframe.style){if(dojo.isSafari<3){position="absolute"
}left=top="1px";
height=width="1px";
visibility="hidden"
}if(!dojo.isIE){this.setSrc(cframe,turi,true);
cframe.onload=new Function(onloadstr)
}return cframe
},setSrc:function(iframe,src,replace){try{if(!replace){if(dojo.isSafari){iframe.location=src
}else{frames[iframe.name].location=src
}}else{var idoc;
if(dojo.isIE||dojo.isSafari>2){idoc=iframe.contentWindow.document
}else{if(dojo.isSafari){idoc=iframe.document
}else{idoc=iframe.contentWindow
}}if(!idoc){iframe.location=src;
return 
}else{idoc.location.replace(src)
}}}catch(e){console.debug("dojo.io.iframe.setSrc: ",e)
}},doc:function(iframeNode){var doc=iframeNode.contentDocument||((iframeNode.contentWindow)&&(iframeNode.contentWindow.document))||((iframeNode.name)&&(document.frames[iframeNode.name])&&(document.frames[iframeNode.name].document))||null;
return doc
},send:function(args){if(!this["_frame"]){this._frame=this.create(this._iframeName,"dojo.io.iframe._iframeOnload();")
}var dfd=dojo._ioSetArgs(args,function(dfd){dfd.canceled=true;
dfd.ioArgs._callNext()
},function(dfd){var value=null;
try{var ioArgs=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var handleAs=ioArgs.handleAs;
value=ifd;
if(handleAs!="html"){value=ifd.getElementsByTagName("textarea")[0].value;
if(handleAs=="json"){value=dojo.fromJson(value)
}else{if(handleAs=="javascript"){value=dojo.eval(value)
}}}}catch(e){value=e
}finally{ioArgs._callNext()
}return value
},function(error,dfd){dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return error
});
dfd.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest()
}};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){return !dfd.ioArgs._hasError
},function(dfd){return(!!dfd.ioArgs._finished)
},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd)
}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"))
}});
return dfd
},_currentDfd:null,_dfdQueue:[],_iframeName:"dojoIoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return 
}var dfd=this._currentDfd=this._dfdQueue.shift();
var ioArgs=dfd.ioArgs;
var args=ioArgs.args;
ioArgs._contentToClean=[];
var fn=args.form;
var content=args.content||{};
if(fn){if(content){for(var x in content){if(!fn[x]){var tn;
if(dojo.isIE){tn=dojo.doc.createElement("<input type='hidden' name='"+x+"'>")
}else{tn=dojo.doc.createElement("input");
tn.type="hidden";
tn.name=x
}tn.value=content[x];
fn.appendChild(tn);
ioArgs._contentToClean.push(x)
}else{fn[x].value=content[x]
}}}var actnNode=fn.getAttributeNode("action");
var mthdNode=fn.getAttributeNode("method");
var trgtNode=fn.getAttributeNode("target");
if(args.url){ioArgs._originalAction=actnNode?actnNode.value:null;
if(actnNode){actnNode.value=args.url
}else{fn.setAttribute("action",args.url)
}}if(!mthdNode||!mthdNode.value){if(mthdNode){mthdNode.value=(args.method)?args.method:"post"
}else{fn.setAttribute("method",(args.method)?args.method:"post")
}}ioArgs._originalTarget=trgtNode?trgtNode.value:null;
if(trgtNode){trgtNode.value=this._iframeName
}else{fn.setAttribute("target",this._iframeName)
}fn.target=this._iframeName;
fn.submit()
}else{var tmpUrl=args.url+(args.url.indexOf("?")>-1?"&":"?")+ioArgs.query;
this.setSrc(this._frame,tmpUrl,true)
}}catch(e){dfd.errback(e)
}},_iframeOnload:function(){var dfd=this._currentDfd;
if(!dfd){this._fireNextRequest();
return 
}var ioArgs=dfd.ioArgs;
var args=ioArgs.args;
var fNode=args.form;
if(fNode){var toClean=ioArgs._contentToClean;
for(var i=0;
i<toClean.length;
i++){var key=toClean[i];
if(dojo.isSafari<3){for(var j=0;
j<fNode.childNodes.length;
j++){var chNode=fNode.childNodes[j];
if(chNode.name==key){dojo._destroyElement(chNode);
break
}}}else{dojo._destroyElement(fNode[key]);
fNode[key]=null
}}if(ioArgs._originalAction){fNode.setAttribute("action",ioArgs._originalAction)
}if(ioArgs._originalTarget){fNode.setAttribute("target",ioArgs._originalTarget);
fNode.target=ioArgs._originalTarget
}}ioArgs._finished=true
}}
}}});