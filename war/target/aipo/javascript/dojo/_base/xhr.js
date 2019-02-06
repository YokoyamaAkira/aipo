if(!dojo._hasResource["dojo._base.xhr"]){dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
dojo.require("dojo._base.Deferred");
dojo.require("dojo._base.json");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.query");
(function(){var _d=dojo;
function setValue(obj,name,value){var val=obj[name];
if(_d.isString(val)){obj[name]=[val,value]
}else{if(_d.isArray(val)){val.push(value)
}else{obj[name]=value
}}}dojo.formToObject=function(formNode){var ret={};
var iq="input:not([type=file]):not([type=submit]):not([type=image]):not([type=reset]):not([type=button]), select, textarea";
_d.query(iq,formNode).filter(function(node){return(!node.disabled)
}).forEach(function(item){var _in=item.name;
var type=(item.type||"").toLowerCase();
if(type=="radio"||type=="checkbox"){if(item.checked){setValue(ret,_in,item.value)
}}else{if(item.multiple){ret[_in]=[];
_d.query("option",item).forEach(function(opt){if(opt.selected){setValue(ret,_in,opt.value)
}})
}else{setValue(ret,_in,item.value);
if(type=="image"){ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0
}}}});
return ret
};
dojo.objectToQuery=function(map){var ec=encodeURIComponent;
var ret="";
var backstop={};
for(var x in map){if(map[x]!=backstop[x]){if(_d.isArray(map[x])){for(var y=0;
y<map[x].length;
y++){ret+=ec(x)+"="+ec(map[x][y])+"&"
}}else{ret+=ec(x)+"="+ec(map[x])+"&"
}}}if(ret.length&&ret.charAt(ret.length-1)=="&"){ret=ret.substr(0,ret.length-1)
}return ret
};
dojo.formToQuery=function(formNode){return _d.objectToQuery(_d.formToObject(formNode))
};
dojo.formToJson=function(formNode,prettyPrint){return _d.toJson(_d.formToObject(formNode),prettyPrint)
};
dojo.queryToObject=function(str){var ret={};
var qp=str.split("&");
var dc=decodeURIComponent;
_d.forEach(qp,function(item){if(item.length){var parts=item.split("=");
var name=dc(parts.shift());
var val=dc(parts.join("="));
if(_d.isString(ret[name])){ret[name]=[ret[name]]
}if(_d.isArray(ret[name])){ret[name].push(val)
}else{ret[name]=val
}}});
return ret
};
dojo._blockAsync=false;
dojo._contentHandlers={text:function(xhr){return xhr.responseText
},json:function(xhr){if(!djConfig.usePlainJson){console.debug("Consider using mimetype:text/json-comment-filtered to avoid potential security issues with JSON endpoints (use djConfig.usePlainJson=true to turn off this message)")
}return _d.fromJson(xhr.responseText)
},"json-comment-filtered":function(xhr){var value=xhr.responseText;
var cStartIdx=value.indexOf("/*");
var cEndIdx=value.lastIndexOf("*/");
if(cStartIdx==-1||cEndIdx==-1){throw new Error("JSON was not comment filtered")
}return _d.fromJson(value.substring(cStartIdx+2,cEndIdx))
},javascript:function(xhr){return _d.eval(xhr.responseText)
},xml:function(xhr){if(_d.isIE&&!xhr.responseXML){_d.forEach(["MSXML2","Microsoft","MSXML","MSXML3"],function(i){try{var doc=new ActiveXObject(prefixes[i]+".XMLDOM");
doc.async=false;
doc.loadXML(xhr.responseText);
return doc
}catch(e){}})
}else{return xhr.responseXML
}}};
dojo._contentHandlers["json-comment-optional"]=function(xhr){var handlers=_d._contentHandlers;
try{return handlers["json-comment-filtered"](xhr)
}catch(e){return handlers.json(xhr)
}};
dojo._ioSetArgs=function(args,canceller,okHandler,errHandler){var ioArgs={args:args,url:args.url};
var formObject=null;
if(args.form){var form=_d.byId(args.form);
var actnNode=form.getAttributeNode("action");
ioArgs.url=ioArgs.url||(actnNode?actnNode.value:null);
formObject=_d.formToObject(form)
}var miArgs=[{}];
if(formObject){miArgs.push(formObject)
}if(args.content){miArgs.push(args.content)
}if(args.preventCache){miArgs.push({"dojo.preventCache":new Date().valueOf()})
}ioArgs.query=_d.objectToQuery(_d.mixin.apply(null,miArgs));
ioArgs.handleAs=args.handleAs||"text";
var d=new _d.Deferred(canceller);
d.addCallbacks(okHandler,function(error){return errHandler(error,d)
});
var ld=args.load;
if(ld&&_d.isFunction(ld)){d.addCallback(function(value){return ld.call(args,value,ioArgs)
})
}var err=args.error;
if(err&&_d.isFunction(err)){d.addErrback(function(value){return err.call(args,value,ioArgs)
})
}var handle=args.handle;
if(handle&&_d.isFunction(handle)){d.addBoth(function(value){return handle.call(args,value,ioArgs)
})
}d.ioArgs=ioArgs;
return d
};
var _deferredCancel=function(dfd){dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _at=(typeof xhr.abort);
if((_at=="function")||(_at=="unknown")){xhr.abort()
}var err=new Error("xhr cancelled");
err.dojoType="cancel";
return err
};
var _deferredOk=function(dfd){return _d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr)
};
var _deferError=function(error,dfd){console.debug(error);
return error
};
var _makeXhrDeferred=function(args){var dfd=_d._ioSetArgs(args,_deferredCancel,_deferredOk,_deferError);
dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);
return dfd
};
var _inFlightIntvl=null;
var _inFlight=[];
var _watchInFlight=function(){var now=(new Date()).getTime();
if(!_d._blockAsync){for(var i=0,tif;
(i<_inFlight.length)&&(tif=_inFlight[i]);
i++){var dfd=tif.dfd;
try{if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_inFlight.splice(i--,1)
}else{if(tif.ioCheck(dfd)){_inFlight.splice(i--,1);
tif.resHandle(dfd)
}else{if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_inFlight.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel()
}}}}}catch(e){console.debug(e);
dfd.errback(new Error("_watchInFlightError!"))
}}}if(!_inFlight.length){clearInterval(_inFlightIntvl);
_inFlightIntvl=null;
return 
}};
dojo._ioCancelAll=function(){try{_d.forEach(_inFlight,function(i){i.dfd.cancel()
})
}catch(e){}};
if(_d.isIE){_d.addOnUnload(_d._ioCancelAll)
}_d._ioWatch=function(dfd,validCheck,ioCheck,resHandle){if(dfd.ioArgs.args.timeout){dfd.startTime=(new Date()).getTime()
}_inFlight.push({dfd:dfd,validCheck:validCheck,ioCheck:ioCheck,resHandle:resHandle});
if(!_inFlightIntvl){_inFlightIntvl=setInterval(_watchInFlight,50)
}_watchInFlight()
};
var _defaultContentType="application/x-www-form-urlencoded";
var _validCheck=function(dfd){return dfd.ioArgs.xhr.readyState
};
var _ioCheck=function(dfd){return 4==dfd.ioArgs.xhr.readyState
};
var _resHandle=function(dfd){if(_d._isDocumentOk(dfd.ioArgs.xhr)){dfd.callback(dfd)
}else{dfd.errback(new Error("bad http response code:"+dfd.ioArgs.xhr.status))
}};
var _doIt=function(type,dfd){var ioArgs=dfd.ioArgs;
var args=ioArgs.args;
ioArgs.xhr.open(type,ioArgs.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr]
}else{ioArgs.xhr.setRequestHeader(hdr,args.headers[hdr])
}}}ioArgs.xhr.setRequestHeader("Content-Type",(args.contentType||_defaultContentType));
try{ioArgs.xhr.send(ioArgs.query)
}catch(e){dfd.cancel()
}_d._ioWatch(dfd,_validCheck,_ioCheck,_resHandle);
return dfd
};
dojo._ioAddQueryToUrl=function(ioArgs){if(ioArgs.query.length){ioArgs.url+=(ioArgs.url.indexOf("?")==-1?"?":"&")+ioArgs.query;
ioArgs.query=null
}};
dojo.xhrGet=function(args){var dfd=_makeXhrDeferred(args);
_d._ioAddQueryToUrl(dfd.ioArgs);
return _doIt("GET",dfd)
};
dojo.xhrPost=function(args){return _doIt("POST",_makeXhrDeferred(args))
};
dojo.rawXhrPost=function(args){var dfd=_makeXhrDeferred(args);
dfd.ioArgs.query=args.postData;
return _doIt("POST",dfd)
};
dojo.xhrPut=function(args){return _doIt("PUT",_makeXhrDeferred(args))
};
dojo.rawXhrPut=function(args){var dfd=_makeXhrDeferred(args);
var ioArgs=dfd.ioArgs;
if(args.putData){ioArgs.query=args.putData;
args.putData=null
}return _doIt("PUT",dfd)
};
dojo.xhrDelete=function(args){var dfd=_makeXhrDeferred(args);
_d._ioAddQueryToUrl(dfd.ioArgs);
return _doIt("DELETE",dfd)
}
})()
};