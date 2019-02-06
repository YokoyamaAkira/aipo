if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(D,C,B,A){console.warn("dojox.storage.put not implemented")
},get:function(B,A){console.warn("dojox.storage.get not implemented")
},hasKey:function(B,A){return(this.get(B)!=null)
},getKeys:function(A){console.warn("dojox.storage.getKeys not implemented")
},clear:function(A){console.warn("dojox.storage.clear not implemented")
},remove:function(B,A){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(C,D,B,A){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(A,B){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(A,B){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(A){if(A===null||typeof A==="undefined"||!A instanceof Array){return false
}for(var B=0;
B<A.length;
B++){if(!this.isValidKey(A[B])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(A){if((A==null)||(typeof A=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(A)
},getResourceList:function(){return[]
}})
};