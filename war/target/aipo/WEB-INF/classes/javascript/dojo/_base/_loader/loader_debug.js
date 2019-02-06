if(!dojo._hasResource["dojo._base._loader.loader_debug"]){dojo._hasResource["dojo._base._loader.loader_debug"]=true;
dojo.provide("dojo._base._loader.loader_debug");
dojo.nonDebugProvide=dojo.provide;
dojo.provide=function(A){var B=dojo._xdDebugQueue;
if(B&&B.length>0&&A==B.currentResourceName){window.setTimeout("dojo._xdDebugFileLoaded('"+A+"')",1)
}return dojo.nonDebugProvide.apply(dojo,arguments)
};
dojo._xdDebugFileLoaded=function(B){var C=this._xdDebugQueue;
if(B&&B==C.currentResourceName){C.shift()
}if(C.length==0){C.currentResourceName=null;
this._xdNotifyLoaded()
}else{C.currentResourceName=C[0].resourceName;
var A=document.createElement("script");
A.type="text/javascript";
A.src=C[0].resourcePath;
document.getElementsByTagName("head")[0].appendChild(A)
}}
};