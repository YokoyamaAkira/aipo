if(!dojo._hasResource["dojo._base._loader.loader_debug"]){dojo._hasResource["dojo._base._loader.loader_debug"]=true;
dojo.provide("dojo._base._loader.loader_debug");
dojo.nonDebugProvide=dojo.provide;
dojo.provide=function(B){var A=dojo._xdDebugQueue;
if(A&&A.length>0&&B==A.currentResourceName){window.setTimeout("dojo._xdDebugFileLoaded('"+B+"')",1)
}return dojo.nonDebugProvide.apply(dojo,arguments)
};
dojo._xdDebugFileLoaded=function(C){var A=this._xdDebugQueue;
if(C&&C==A.currentResourceName){A.shift()
}if(A.length==0){A.currentResourceName=null;
this._xdNotifyLoaded()
}else{A.currentResourceName=A[0].resourceName;
var B=document.createElement("script");
B.type="text/javascript";
B.src=A[0].resourcePath;
document.getElementsByTagName("head")[0].appendChild(B)
}}
};