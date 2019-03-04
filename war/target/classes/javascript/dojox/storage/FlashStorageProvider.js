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
},put:function(A,D,C,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}this._statusHandler=C;
if(dojo.isString(D)){D="string:"+D
}else{D=dojo.toJson(D)
}dojox.flash.comm.put(A,D,B)
},putMultiple:function(I,H,F,B){if(this.isValidKeyArray(I)===false||!H instanceof Array||I.length!=H.length){throw new Error("Invalid arguments: keys = ["+I+"], values = ["+H+"]")
}if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}this._statusHandler=F;
var G=I.join(",");
var A=[];
for(var D=0;
D<H.length;
D++){if(dojo.isString(H[D])){H[D]="string:"+H[D]
}else{H[D]=dojo.toJson(H[D])
}A[D]=H[D].length
}var C=H.join("");
var E=A.join(",");
dojox.flash.comm.putMultiple(G,C,E,this.namespace)
},get:function(B,C){if(this.isValidKey(B)==false){throw new Error("Invalid key given: "+B)
}if(C==null||typeof C=="undefined"){C=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}var A=dojox.flash.comm.get(B,C);
if(A==""){return null
}return this._destringify(A)
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
},getKeys:function(B){if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}var A=dojox.flash.comm.getKeys(B);
if(A==""){return[]
}A=A.split(",");
return A
},getNamespaces:function(){var A=dojox.flash.comm.getNamespaces();
if(A==""){return[dojox.storage.DEFAULT_NAMESPACE]
}A=A.split(",");
return A
},clear:function(A){if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}dojox.flash.comm.clear(A)
},remove:function(A,B){if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}dojox.flash.comm.remove(A,B)
},removeMultiple:function(B,A){if(this.isValidKeyArray(B)===false){dojo.raise("Invalid key array given: "+B)
}if(A==null||typeof A=="undefined"){A=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}var C=B.join(",");
dojox.flash.comm.removeMultiple(C,this.namespace)
},isPermanent:function(){return true
},getMaximumSize:function(){return dojox.storage.SIZE_NO_LIMIT
},hasSettingsUI:function(){return true
},showSettingsUI:function(){dojox.flash.comm.showSettings();
dojox.flash.obj.setVisible(true);
dojox.flash.obj.center()
},hideSettingsUI:function(){dojox.flash.obj.setVisible(false);
if(dojo.isFunction(dojox.storage.onHideSettingsUI)){dojox.storage.onHideSettingsUI.call(null)
}},getResourceList:function(){var C=dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString();
var B=dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString();
var A=dojox.flash.info.getResourceList(C,B);
A.push(dojo.moduleUrl("dojox","storage/storage_dialog.swf").toString());
return A
},_flashLoaded:function(){this._allNamespaces=this.getNamespaces();
this._initialized=true;
dojox.storage.manager.loaded()
},_onStatus:function(C,B){var D=dojox.storage;
var A=dojox.flash.obj;
if(C==D.PENDING){A.center();
A.setVisible(true)
}else{A.setVisible(false)
}if(D._statusHandler){D._statusHandler.call(null,C,B)
}}});
dojox.storage.manager.register("dojox.storage.FlashStorageProvider",new dojox.storage.FlashStorageProvider());
dojox.storage.manager.initialize()
};