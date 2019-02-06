if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;
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
},setSrc:function(B,D,A){try{if(!A){if(dojo.isSafari){B.location=D
}else{frames[B.name].location=D
}}else{var E;
if(dojo.isIE||dojo.isSafari>2){E=B.contentWindow.document
}else{if(dojo.isSafari){E=B.document
}else{E=B.contentWindow
}}if(!E){B.location=D;
return 
}else{E.location.replace(D)
}}}catch(C){console.debug("dojo.io.iframe.setSrc: ",C)
}},doc:function(B){var A=B.contentDocument||((B.contentWindow)&&(B.contentWindow.document))||((B.name)&&(document.frames[B.name])&&(document.frames[B.name].document))||null;
return A
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
}var F=this._currentDfd=this._dfdQueue.shift();
var K=F.ioArgs;
var B=K.args;
K._contentToClean=[];
var C=B.form;
var A=B.content||{};
if(C){if(A){for(var D in A){if(!C[D]){var E;
if(dojo.isIE){E=dojo.doc.createElement("<input type='hidden' name='"+D+"'>")
}else{E=dojo.doc.createElement("input");
E.type="hidden";
E.name=D
}E.value=A[D];
C.appendChild(E);
K._contentToClean.push(D)
}else{C[D].value=A[D]
}}}var H=C.getAttributeNode("action");
var J=C.getAttributeNode("method");
var I=C.getAttributeNode("target");
if(B.url){K._originalAction=H?H.value:null;
if(H){H.value=B.url
}else{C.setAttribute("action",B.url)
}}if(!J||!J.value){if(J){J.value=(B.method)?B.method:"post"
}else{C.setAttribute("method",(B.method)?B.method:"post")
}}K._originalTarget=I?I.value:null;
if(I){I.value=this._iframeName
}else{C.setAttribute("target",this._iframeName)
}C.target=this._iframeName;
C.submit()
}else{var G=B.url+(B.url.indexOf("?")>-1?"&":"?")+K.query;
this.setSrc(this._frame,G,true)
}}catch(L){F.errback(L)
}},_iframeOnload:function(){var D=this._currentDfd;
if(!D){this._fireNextRequest();
return 
}var I=D.ioArgs;
var A=I.args;
var B=A.form;
if(B){var G=I._contentToClean;
for(var H=0;
H<G.length;
H++){var C=G[H];
if(dojo.isSafari<3){for(var F=0;
F<B.childNodes.length;
F++){var E=B.childNodes[F];
if(E.name==C){dojo._destroyElement(E);
break
}}}else{dojo._destroyElement(B[C]);
B[C]=null
}}if(I._originalAction){B.setAttribute("action",I._originalAction)
}if(I._originalTarget){B.setAttribute("target",I._originalTarget);
B.target=I._originalTarget
}}I._finished=true
}}
};