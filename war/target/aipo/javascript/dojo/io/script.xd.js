dojo._xdResourceLoaded({depends:[["provide","dojo.io.script"]],defineResource:function(dojo){if(!dojo._hasResource["dojo.io.script"]){dojo._hasResource["dojo.io.script"]=true;
dojo.provide("dojo.io.script");
dojo.io.script={get:function(args){var dfd=this._makeScriptDeferred(args);
var ioArgs=dfd.ioArgs;
dojo._ioAddQueryToUrl(ioArgs);
this.attach(ioArgs.id,ioArgs.url);
dojo._ioWatch(dfd,this._validCheck,this._ioCheck,this._resHandle);
return dfd
},attach:function(id,url){var element=dojo.doc.createElement("script");
element.type="text/javascript";
element.src=url;
element.id=id;
dojo.doc.getElementsByTagName("head")[0].appendChild(element)
},remove:function(id){dojo._destroyElement(dojo.byId(id));
if(this["jsonp_"+id]){delete this["jsonp_"+id]
}},_makeScriptDeferred:function(args){var dfd=dojo._ioSetArgs(args,this._deferredCancel,this._deferredOk,this._deferredError);
var ioArgs=dfd.ioArgs;
ioArgs.id="dojoIoScript"+(this._counter++);
ioArgs.canDelete=false;
if(args.callbackParamName){ioArgs.query=ioArgs.query||"";
if(ioArgs.query.length>0){ioArgs.query+="&"
}ioArgs.query+=args.callbackParamName+"=dojo.io.script.jsonp_"+ioArgs.id+"._jsonpCallback";
ioArgs.canDelete=true;
dfd._jsonpCallback=this._jsonpCallback;
this["jsonp_"+ioArgs.id]=dfd
}return dfd
},_deferredCancel:function(dfd){dfd.canceled=true;
if(dfd.ioArgs.canDelete){dojo.io.script._deadScripts.push(dfd.ioArgs.id)
}},_deferredOk:function(dfd){if(dfd.ioArgs.canDelete){dojo.io.script._deadScripts.push(dfd.ioArgs.id)
}if(dfd.ioArgs.json){return dfd.ioArgs.json
}else{return dfd.ioArgs
}},_deferredError:function(error,dfd){if(dfd.ioArgs.canDelete){if(error.dojoType=="timeout"){dojo.io.script.remove(dfd.ioArgs.id)
}else{dojo.io.script._deadScripts.push(dfd.ioArgs.id)
}}console.debug("dojo.io.script error",error);
return error
},_deadScripts:[],_counter:1,_validCheck:function(dfd){var _self=dojo.io.script;
var deadScripts=_self._deadScripts;
if(deadScripts&&deadScripts.length>0){for(var i=0;
i<deadScripts.length;
i++){_self.remove(deadScripts[i])
}dojo.io.script._deadScripts=[]
}return true
},_ioCheck:function(dfd){if(dfd.ioArgs.json){return true
}var checkString=dfd.ioArgs.args.checkString;
if(checkString&&eval("typeof("+checkString+") != 'undefined'")){return true
}return false
},_resHandle:function(dfd){if(dojo.io.script._ioCheck(dfd)){dfd.callback(dfd)
}else{dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"))
}},_jsonpCallback:function(json){this.ioArgs.json=json
}}
}}});