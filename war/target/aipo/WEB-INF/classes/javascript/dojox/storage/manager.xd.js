dojo._xdResourceLoaded({depends:[["provide","dojox.storage.manager"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.storage.manager"]){dojo._hasResource["dojox.storage.manager"]=true;
dojo.provide("dojox.storage.manager");
dojox.storage.manager=new function(){this.currentProvider=null;
this.available=false;
this._initialized=false;
this._providers=[];
this._onLoadListeners=[];
this.initialize=function(){this.autodetect()
};
this.register=function(name,instance){this._providers[this._providers.length]=instance;
this._providers[name]=instance
};
this.setProvider=function(storageClass){};
this.autodetect=function(){if(this._initialized){return 
}var forceProvider=djConfig.forceStorageProvider||false;
var providerToUse;
for(var i=0;
i<this._providers.length;
i++){providerToUse=this._providers[i];
if(forceProvider==providerToUse.declaredClass){providerToUse.isAvailable();
break
}else{if(providerToUse.isAvailable()){break
}}}if(!providerToUse){this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return 
}this.currentProvider=providerToUse;
dojo.mixin(dojox.storage,this.currentProvider);
dojox.storage.initialize();
this._initialized=true;
this.available=true
};
this.isAvailable=function(){return this.available
};
this.addOnLoad=function(func){this._onLoadListeners.push(func);
if(this.isInitialized()){this._fireLoaded()
}};
this.removeOnLoad=function(func){for(var i=0;
i<this._onLoadListeners.length;
i++){if(func==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);
break
}}};
this.isInitialized=function(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false
}else{return this._initialized
}};
this.supportsProvider=function(storageClass){try{var provider=eval("new "+storageClass+"()");
var results=provider.isAvailable();
if(!results){return false
}return results
}catch(e){return false
}};
this.getProvider=function(){return this.currentProvider
};
this.loaded=function(){this._fireLoaded()
};
this._fireLoaded=function(){dojo.forEach(this._onLoadListeners,function(i){try{i()
}catch(e){console.debug(e)
}})
};
this.getResourceList=function(){var results=[];
dojo.forEach(dojox.storage.manager._providers,function(currentProvider){results=results.concat(currentProvider.getResourceList())
});
return results
}
}
}}});