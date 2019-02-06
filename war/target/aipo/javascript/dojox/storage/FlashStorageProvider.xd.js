dojo._xdResourceLoaded({depends:[["provide","dojox.storage.FlashStorageProvider"],["require","dojox.flash"],["require","dojox.storage.manager"],["require","dojox.storage.Provider"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.storage.FlashStorageProvider"]){dojo._hasResource["dojox.storage.FlashStorageProvider"]=true;
dojo.provide("dojox.storage.FlashStorageProvider");
dojo.require("dojox.flash");
dojo.require("dojox.storage.manager");
dojo.require("dojox.storage.Provider");
dojo.declare("dojox.storage.FlashStorageProvider",[dojox.storage.Provider],{initialized:false,_available:null,_statusHandler:null,initialize:function(){if(djConfig.disableFlashStorage==true){return 
}var loadedListener=function(){dojox.storage._flashLoaded()
};
dojox.flash.addLoadedListener(loadedListener);
dojox.flash.setSwf({flash6:dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString(),flash8:dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString(),visible:false})
},setFlushDelay:function(newDelay){if(newDelay===null||typeof newDelay==="undefined"||isNaN(newDelay)){throw new Error("Invalid argunment: "+newDelay)
}dojox.flash.comm.setFlushDelay(String(newDelay))
},getFlushDelay:function(){return Number(dojox.flash.comm.getFlushDelay())
},flush:function(namespace){if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}dojox.flash.comm.flush(namespace)
},isAvailable:function(){return(this._available=!djConfig.disableFlashStorage)
},put:function(key,value,resultsHandler,namespace){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key)
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}this._statusHandler=resultsHandler;
if(dojo.isString(value)){value="string:"+value
}else{value=dojo.toJson(value)
}dojox.flash.comm.put(key,value,namespace)
},putMultiple:function(keys,values,resultsHandler,namespace){if(this.isValidKeyArray(keys)===false||!values instanceof Array||keys.length!=values.length){throw new Error("Invalid arguments: keys = ["+keys+"], values = ["+values+"]")
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}this._statusHandler=resultsHandler;
var metaKey=keys.join(",");
var lengths=[];
for(var i=0;
i<values.length;
i++){if(dojo.isString(values[i])){values[i]="string:"+values[i]
}else{values[i]=dojo.toJson(values[i])
}lengths[i]=values[i].length
}var metaValue=values.join("");
var metaLengths=lengths.join(",");
dojox.flash.comm.putMultiple(metaKey,metaValue,metaLengths,this.namespace)
},get:function(key,namespace){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key)
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var results=dojox.flash.comm.get(key,namespace);
if(results==""){return null
}return this._destringify(results)
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
},_destringify:function(results){if(dojo.isString(results)&&(/^string:/.test(results))){results=results.substring("string:".length)
}else{results=dojo.fromJson(results)
}return results
},getKeys:function(namespace){if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var results=dojox.flash.comm.getKeys(namespace);
if(results==""){return[]
}results=results.split(",");
return results
},getNamespaces:function(){var results=dojox.flash.comm.getNamespaces();
if(results==""){return[dojox.storage.DEFAULT_NAMESPACE]
}results=results.split(",");
return results
},clear:function(namespace){if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}dojox.flash.comm.clear(namespace)
},remove:function(key,namespace){if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}dojox.flash.comm.remove(key,namespace)
},removeMultiple:function(keys,namespace){if(this.isValidKeyArray(keys)===false){dojo.raise("Invalid key array given: "+keys)
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var metaKey=keys.join(",");
dojox.flash.comm.removeMultiple(metaKey,this.namespace)
},isPermanent:function(){return true
},getMaximumSize:function(){return dojox.storage.SIZE_NO_LIMIT
},hasSettingsUI:function(){return true
},showSettingsUI:function(){dojox.flash.comm.showSettings();
dojox.flash.obj.setVisible(true);
dojox.flash.obj.center()
},hideSettingsUI:function(){dojox.flash.obj.setVisible(false);
if(dojo.isFunction(dojox.storage.onHideSettingsUI)){dojox.storage.onHideSettingsUI.call(null)
}},getResourceList:function(){var swfloc6=dojo.moduleUrl("dojox","storage/Storage_version6.swf").toString();
var swfloc8=dojo.moduleUrl("dojox","storage/Storage_version8.swf").toString();
var results=dojox.flash.info.getResourceList(swfloc6,swfloc8);
results.push(dojo.moduleUrl("dojox","storage/storage_dialog.swf").toString());
return results
},_flashLoaded:function(){this._allNamespaces=this.getNamespaces();
this._initialized=true;
dojox.storage.manager.loaded()
},_onStatus:function(statusResult,key){var ds=dojox.storage;
var dfo=dojox.flash.obj;
if(statusResult==ds.PENDING){dfo.center();
dfo.setVisible(true)
}else{dfo.setVisible(false)
}if(ds._statusHandler){ds._statusHandler.call(null,statusResult,key)
}}});
dojox.storage.manager.register("dojox.storage.FlashStorageProvider",new dojox.storage.FlashStorageProvider());
dojox.storage.manager.initialize()
}}});