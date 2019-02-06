if(!dojo._hasResource["dojo.io.script"]){dojo._hasResource["dojo.io.script"]=true;
dojo.provide("dojo.io.script");
dojo.io.script={get:function(B){var C=this._makeScriptDeferred(B);
var A=C.ioArgs;
dojo._ioAddQueryToUrl(A);
this.attach(A.id,A.url);
dojo._ioWatch(C,this._validCheck,this._ioCheck,this._resHandle);
return C
},attach:function(B,C){var A=dojo.doc.createElement("script");
A.type="text/javascript";
A.src=C;
A.id=B;
dojo.doc.getElementsByTagName("head")[0].appendChild(A)
},remove:function(A){dojo._destroyElement(dojo.byId(A));
if(this["jsonp_"+A]){delete this["jsonp_"+A]
}},_makeScriptDeferred:function(B){var C=dojo._ioSetArgs(B,this._deferredCancel,this._deferredOk,this._deferredError);
var A=C.ioArgs;
A.id="dojoIoScript"+(this._counter++);
A.canDelete=false;
if(B.callbackParamName){A.query=A.query||"";
if(A.query.length>0){A.query+="&"
}A.query+=B.callbackParamName+"=dojo.io.script.jsonp_"+A.id+"._jsonpCallback";
A.canDelete=true;
C._jsonpCallback=this._jsonpCallback;
this["jsonp_"+A.id]=C
}return C
},_deferredCancel:function(A){A.canceled=true;
if(A.ioArgs.canDelete){dojo.io.script._deadScripts.push(A.ioArgs.id)
}},_deferredOk:function(A){if(A.ioArgs.canDelete){dojo.io.script._deadScripts.push(A.ioArgs.id)
}if(A.ioArgs.json){return A.ioArgs.json
}else{return A.ioArgs
}},_deferredError:function(A,B){if(B.ioArgs.canDelete){if(A.dojoType=="timeout"){dojo.io.script.remove(B.ioArgs.id)
}else{dojo.io.script._deadScripts.push(B.ioArgs.id)
}}console.debug("dojo.io.script error",A);
return A
},_deadScripts:[],_counter:1,_validCheck:function(A){var D=dojo.io.script;
var B=D._deadScripts;
if(B&&B.length>0){for(var C=0;
C<B.length;
C++){D.remove(B[C])
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