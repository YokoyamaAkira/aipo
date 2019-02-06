dojo._xdResourceLoaded({depends:[["provide","dojox.storage.WhatWGStorageProvider"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"]],defineResource:function(A){if(!A._hasResource["dojox.storage.WhatWGStorageProvider"]){A._hasResource["dojox.storage.WhatWGStorageProvider"]=true;
A.provide("dojox.storage.WhatWGStorageProvider");
A.require("dojox.storage.Provider");
A.require("dojox.storage.manager");
A.declare("dojox.storage.WhatWGStorageProvider",[dojox.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){if(djConfig.disableWhatWGStorage==true){return 
}this._domain=(location.hostname=="localhost")?"localhost.localdomain":location.hostname;
this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){try{var B=globalStorage[((location.hostname=="localhost")?"localhost.localdomain":location.hostname)]
}catch(C){this._available=false;
return this._available
}this._available=true;
return this._available
},put:function(G,E,C,H){if(this.isValidKey(G)==false){throw new Error("Invalid key given: "+G)
}H=H||this.DEFAULT_NAMESPACE;
G=this.getFullKey(G,H);
this._statusHandler=C;
if(A.isString(E)){E="string:"+E
}else{E=A.toJson(E)
}var D=A.hitch(this,function(I){window.removeEventListener("storage",D,false);
if(C){C.call(null,this.SUCCESS,G)
}});
window.addEventListener("storage",D,false);
try{var B=globalStorage[this._domain];
B.setItem(G,E)
}catch(F){this._statusHandler.call(null,this.FAILED,G,F.toString())
}},get:function(D,E){if(this.isValidKey(D)==false){throw new Error("Invalid key given: "+D)
}E=E||this.DEFAULT_NAMESPACE;
D=this.getFullKey(D,E);
var B=globalStorage[this._domain];
var C=B.getItem(D);
if(C==null||C==""){return null
}C=C.value;
if(A.isString(C)&&(/^string:/.test(C))){C=C.substring("string:".length)
}else{C=A.fromJson(C)
}return C
},getNamespaces:function(){var C=[this.DEFAULT_NAMESPACE];
var E={};
var F=globalStorage[this._domain];
var G=/^__([^_]*)_/;
for(var H=0;
H<F.length;
H++){var B=F.key(H);
if(G.test(B)==true){var D=B.match(G)[1];
if(typeof E[D]=="undefined"){E[D]=true;
C.push(D)
}}}return C
},getKeys:function(E){E=E||this.DEFAULT_NAMESPACE;
if(this.isValidKey(E)==false){throw new Error("Invalid namespace given: "+E)
}var C;
if(E==this.DEFAULT_NAMESPACE){C=new RegExp("^([^_]{2}.*)$")
}else{C=new RegExp("^__"+E+"_(.*)$")
}var F=globalStorage[this._domain];
var B=[];
for(var D=0;
D<F.length;
D++){var G=F.key(D);
if(C.test(G)==true){G=G.match(C)[1];
B.push(G)
}}return B
},clear:function(D){D=D||this.DEFAULT_NAMESPACE;
if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}var B;
if(D==this.DEFAULT_NAMESPACE){B=new RegExp("^[^_]{2}")
}else{B=new RegExp("^__"+D+"_")
}var F=globalStorage[this._domain];
var E=[];
for(var C=0;
C<F.length;
C++){if(B.test(F.key(C))==true){E[E.length]=F.key(C)
}}A.forEach(E,A.hitch(F,"removeItem"))
},remove:function(C,D){C=this.getFullKey(C,D);
var B=globalStorage[this._domain];
B.removeItem(C)
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},getFullKey:function(C,B){B=B||this.DEFAULT_NAMESPACE;
if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}if(B==this.DEFAULT_NAMESPACE){return C
}else{return"__"+B+"_"+C
}}});
dojox.storage.manager.register("dojox.storage.WhatWGStorageProvider",new dojox.storage.WhatWGStorageProvider())
}}});