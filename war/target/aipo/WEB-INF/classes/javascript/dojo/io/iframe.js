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
},setSrc:function(C,E,B){try{if(!B){if(dojo.isSafari){C.location=E
}else{frames[C.name].location=E
}}else{var A;
if(dojo.isIE||dojo.isSafari>2){A=C.contentWindow.document
}else{if(dojo.isSafari){A=C.document
}else{A=C.contentWindow
}}if(!A){C.location=E;
return 
}else{A.location.replace(E)
}}}catch(D){console.debug("dojo.io.iframe.setSrc: ",D)
}},doc:function(A){var B=A.contentDocument||((A.contentWindow)&&(A.contentWindow.document))||((A.name)&&(document.frames[A.name])&&(document.frames[A.name].document))||null;
return B
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
}var J=this._currentDfd=this._dfdQueue.shift();
var C=J.ioArgs;
var F=C.args;
C._contentToClean=[];
var G=F.form;
var E=F.content||{};
if(G){if(E){for(var H in E){if(!G[H]){var I;
if(dojo.isIE){I=dojo.doc.createElement("<input type='hidden' name='"+H+"'>")
}else{I=dojo.doc.createElement("input");
I.type="hidden";
I.name=H
}I.value=E[H];
G.appendChild(I);
C._contentToClean.push(H)
}else{G[H].value=E[H]
}}}var L=G.getAttributeNode("action");
var B=G.getAttributeNode("method");
var A=G.getAttributeNode("target");
if(F.url){C._originalAction=L?L.value:null;
if(L){L.value=F.url
}else{G.setAttribute("action",F.url)
}}if(!B||!B.value){if(B){B.value=(F.method)?F.method:"post"
}else{G.setAttribute("method",(F.method)?F.method:"post")
}}C._originalTarget=A?A.value:null;
if(A){A.value=this._iframeName
}else{G.setAttribute("target",this._iframeName)
}G.target=this._iframeName;
G.submit()
}else{var K=F.url+(F.url.indexOf("?")>-1?"&":"?")+C.query;
this.setSrc(this._frame,K,true)
}}catch(D){J.errback(D)
}},_iframeOnload:function(){var H=this._currentDfd;
if(!H){this._fireNextRequest();
return 
}var D=H.ioArgs;
var E=D.args;
var F=E.form;
if(F){var B=D._contentToClean;
for(var C=0;
C<B.length;
C++){var G=B[C];
if(dojo.isSafari<3){for(var A=0;
A<F.childNodes.length;
A++){var I=F.childNodes[A];
if(I.name==G){dojo._destroyElement(I);
break
}}}else{dojo._destroyElement(F[G]);
F[G]=null
}}if(D._originalAction){F.setAttribute("action",D._originalAction)
}if(D._originalTarget){F.setAttribute("target",D._originalTarget);
F.target=D._originalTarget
}}D._finished=true
}}
};