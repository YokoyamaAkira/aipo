if(!dojo._hasResource["dojox.storage.FlashStorageProvider"]){dojo._hasResource["dojox.storage.FlashStorageProvider"]=true;
dojo.provide("dojox.storage.FlashStorageProvider");
dojo.require("dojox.flash");
dojo.require("dojox.storage.manager");
dojo.require("dojox.storage.Provider");
dojo.declare("dojox.storage.FlashStorageProvider",[dojox.storage.Provider],{initialized:false,_available:null,_statusHandler:null,initialize:function(){if(djConfig.disableFlashStorage==true){return 
}var A=function(){dojox.storage._flashLoaded()
};
dojox.flash.addLoadedListener(A);
dojox.flash.setSwf({flash6:dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString(),flash8:dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString(),visible:false})
},setFlushDelay:function(A){if(A===null||typeof A==="undefined"||isNaN(A)){throw new Error("Invalid argunment: "+A)
}dojox.flash.comm.setFlushDelay(String(A))
},getFlushDelay:function(){return Number(dojox.flash.comm.getFlushDelay())
},flush:function(A){if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}dojox.flash.comm.flush(A)
},isAvailable:function(){return(this._available=!djConfig.disableFlashStorage)
},put:function(D,C,B,A){if(this.isValidKey(D)==false){throw new Error("Invalid key given: "+D)
}if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}this._statusHandler=B;
if(dojo.isString(C)){C="string:"+C
}else{C=dojo.toJson(C)
}dojox.flash.comm.put(D,C,A)
},putMultiple:function(E,D,B,G){if(this.isValidKeyArray(E)===false||!D instanceof Array||E.length!=D.length){throw new Error("Invalid arguments: keys = ["+E+"], values = ["+D+"]")
}if(G==null||typeof G=="undefined"){G=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(G)==false){throw new Error("Invalid namespace given: "+G)
}this._statusHandler=B;
var C=E.join(",");
var F=[];
for(var I=0;
I<D.length;
I++){if(dojo.isString(D[I])){D[I]="string:"+D[I]
}else{D[I]=dojo.toJson(D[I])
}F[I]=D[I].length
}var H=D.join("");
var A=F.join(",");
dojox.flash.comm.putMultiple(C,H,A,this.namespace)
},get:function(A,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}var C=dojox.flash.comm.get(A,B);
if(C==""){return null
}return this._destringify(C)
},getMultiple:function(keys,namespace){if(this.isValidKeyArray(keys)===false){throw new ("Invalid key array given: "+keys)
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var metaKey=keys.join(",");
var metaResults=dojox.flash.comm.getMultiple(metaKey,this.namespace);
var results=eval("("+metaResults+")");
for(var i=0;
i<results.length;
i++){results[i]=(results[i]=="")?null:this._destringify(results[i])
}return results
},_destringify:function(A){if(dojo.isString(A)&&(/^string:/.test(A))){A=A.substring("string:".length)
}else{A=dojo.fromJson(A)
}return A
},getKeys:function(A){if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}var B=dojox.flash.comm.getKeys(A);
if(B==""){return[]
}B=B.split(",");
return B
},getNamespaces:function(){var A=dojox.flash.comm.getNamespaces();
if(A==""){return[dojox.storage.DEFAULT_NAMESPACE]
}A=A.split(",");
return A
},clear:function(A){if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}dojox.flash.comm.clear(A)
},remove:function(B,A){if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}dojox.flash.comm.remove(B,A)
},removeMultiple:function(A,C){if(this.isValidKeyArray(A)===false){dojo.raise("Invalid key array given: "+A)
}if(C==null||typeof C=="undefined"){C=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}var B=A.join(",");
dojox.flash.comm.removeMultiple(B,this.namespace)
},isPermanent:function(){return true
},getMaximumSize:function(){return dojox.storage.SIZE_NO_LIMIT
},hasSettingsUI:function(){return true
},showSettingsUI:function(){dojox.flash.comm.showSettings();
dojox.flash.obj.setVisible(true);
dojox.flash.obj.center()
},hideSettingsUI:function(){dojox.flash.obj.setVisible(false);
if(dojo.isFunction(dojox.storage.onHideSettingsUI)){dojox.storage.onHideSettingsUI.call(null)
}},getResourceList:function(){var B=dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString();
var A=dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString();
var C=dojox.flash.info.getResourceList(B,A);
C.push(dojo.moduleUrl("dojox","storage/storage_dialog.swf").toString());
return C
},_flashLoaded:function(){this._allNamespaces=this.getNamespaces();
this._initialized=true;
dojox.storage.manager.loaded()
},_onStatus:function(B,A){var C=dojox.storage;
var D=dojox.flash.obj;
if(B==C.PENDING){D.center();
D.setVisible(true)
}else{D.setVisible(false)
}if(C._statusHandler){C._statusHandler.call(null,B,A)
}}});
dojox.storage.manager.register("dojox.storage.FlashStorageProvider",new dojox.storage.FlashStorageProvider());
dojox.storage.manager.initialize()
};