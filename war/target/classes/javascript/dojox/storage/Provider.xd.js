dojo._xdResourceLoaded({depends:[["provide","dojox.storage.Provider"]],defineResource:function(A){if(!A._hasResource["dojox.storage.Provider"]){A._hasResource["dojox.storage.Provider"]=true;
A.provide("dojox.storage.Provider");
A.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(C,B,E,D){console.warn("dojox.storage.put not implemented")
},get:function(C,B){console.warn("dojox.storage.get not implemented")
},hasKey:function(C,B){return(this.get(C)!=null)
},getKeys:function(B){console.warn("dojox.storage.getKeys not implemented")
},clear:function(B){console.warn("dojox.storage.clear not implemented")
},remove:function(C,B){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(B,C,E,D){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(B,C){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(B,C){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(B){if(B===null||typeof B==="undefined"||!B instanceof Array){return false
}for(var C=0;
C<B.length;
C++){if(!this.isValidKey(B[C])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(B){if((B==null)||(typeof B=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(B)
},getResourceList:function(){return[]
}})
}}});