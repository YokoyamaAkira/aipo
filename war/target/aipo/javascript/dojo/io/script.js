if(!dojo._hasResource["dojo.io.script"]){dojo._hasResource["dojo.io.script"]=true;
dojo.provide("dojo.io.script");
dojo.io.script={get:function(C){var A=this._makeScriptDeferred(C);
var B=A.ioArgs;
dojo._ioAddQueryToUrl(B);
this.attach(B.id,B.url);
dojo._ioWatch(A,this._validCheck,this._ioCheck,this._resHandle);
return A
},attach:function(C,A){var B=dojo.doc.createElement("script");
B.type="text/javascript";
B.src=A;
B.id=C;
dojo.doc.getElementsByTagName("head")[0].appendChild(B)
},remove:function(A){dojo._destroyElement(dojo.byId(A));
if(this["jsonp_"+A]){delete this["jsonp_"+A]
}},_makeScriptDeferred:function(C){var A=dojo._ioSetArgs(C,this._deferredCancel,this._deferredOk,this._deferredError);
var B=A.ioArgs;
B.id="dojoIoScript"+(this._counter++);
B.canDelete=false;
if(C.callbackParamName){B.query=B.query||"";
if(B.query.length>0){B.query+="&"
}B.query+=C.callbackParamName+"=dojo.io.script.jsonp_"+B.id+"._jsonpCallback";
B.canDelete=true;
A._jsonpCallback=this._jsonpCallback;
this["jsonp_"+B.id]=A
}return A
},_deferredCancel:function(A){A.canceled=true;
if(A.ioArgs.canDelete){dojo.io.script._deadScripts.push(A.ioArgs.id)
}},_deferredOk:function(A){if(A.ioArgs.canDelete){dojo.io.script._deadScripts.push(A.ioArgs.id)
}if(A.ioArgs.json){return A.ioArgs.json
}else{return A.ioArgs
}},_deferredError:function(B,A){if(A.ioArgs.canDelete){if(B.dojoType=="timeout"){dojo.io.script.remove(A.ioArgs.id)
}else{dojo.io.script._deadScripts.push(A.ioArgs.id)
}}console.debug("dojo.io.script error",B);
return B
},_deadScripts:[],_counter:1,_validCheck:function(B){var A=dojo.io.script;
var C=A._deadScripts;
if(C&&C.length>0){for(var D=0;
D<C.length;
D++){A.remove(C[D])
}dojo.io.script._deadScripts=[]
}return true
},_ioCheck:function(dfd){if(dfd.ioArgs.json){return true
}var checkString=dfd.ioArgs.args.checkString;
if(checkString&&eval("typeof("+checkString+") != 'undefined'")){return true
}return false
},_resHandle:function(A){if(dojo.io.script._ioCheck(A)){A.callback(A)
}else{A.errback(new Error("inconceivable dojo.io.script._resHandle error"))
}},_jsonpCallback:function(A){this.ioArgs.json=A
}}
};