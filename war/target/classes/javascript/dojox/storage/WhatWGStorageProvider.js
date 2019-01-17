if(!dojo._hasResource["dojox.storage.WhatWGStorageProvider"]){dojo._hasResource["dojox.storage.WhatWGStorageProvider"]=true;
dojo.provide("dojox.storage.WhatWGStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.declare("dojox.storage.WhatWGStorageProvider",[dojox.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){if(djConfig.disableWhatWGStorage==true){return 
}this._domain=(location.hostname=="localhost")?"localhost.localdomain":location.hostname;
this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){try{var B=globalStorage[((location.hostname=="localhost")?"localhost.localdomain":location.hostname)]
}catch(A){this._available=false;
return this._available
}this._available=true;
return this._available
},put:function(A,E,C,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}B=B||this.DEFAULT_NAMESPACE;
A=this.getFullKey(A,B);
this._statusHandler=C;
if(dojo.isString(E)){E="string:"+E
}else{E=dojo.toJson(E)
}var D=dojo.hitch(this,function(H){window.removeEventListener("storage",D,false);
if(C){C.call(null,this.SUCCESS,A)
}});
window.addEventListener("storage",D,false);
try{var G=globalStorage[this._domain];
G.setItem(A,E)
}catch(F){this._statusHandler.call(null,this.FAILED,A,F.toString())
}},get:function(B,C){if(this.isValidKey(B)==false){throw new Error("Invalid key given: "+B)
}C=C||this.DEFAULT_NAMESPACE;
B=this.getFullKey(B,C);
var D=globalStorage[this._domain];
var A=D.getItem(B);
if(A==null||A==""){return null
}A=A.value;
if(dojo.isString(A)&&(/^string:/.test(A))){A=A.substring("string:".length)
}else{A=dojo.fromJson(A)
}return A
},getNamespaces:function(){var C=[this.DEFAULT_NAMESPACE];
var E={};
var F=globalStorage[this._domain];
var A=/^__([^_]*)_/;
for(var B=0;
B<F.length;
B++){var G=F.key(B);
if(A.test(G)==true){var D=G.match(A)[1];
if(typeof E[D]=="undefined"){E[D]=true;
C.push(D)
}}}return C
},getKeys:function(C){C=C||this.DEFAULT_NAMESPACE;
if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}var F;
if(C==this.DEFAULT_NAMESPACE){F=new RegExp("^([^_]{2}.*)$")
}else{F=new RegExp("^__"+C+"_(.*)$")
}var D=globalStorage[this._domain];
var A=[];
for(var B=0;
B<D.length;
B++){var E=D.key(B);
if(F.test(E)==true){E=E.match(F)[1];
A.push(E)
}}return A
},clear:function(B){B=B||this.DEFAULT_NAMESPACE;
if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}var E;
if(B==this.DEFAULT_NAMESPACE){E=new RegExp("^[^_]{2}")
}else{E=new RegExp("^__"+B+"_")
}var D=globalStorage[this._domain];
var C=[];
for(var A=0;
A<D.length;
A++){if(E.test(D.key(A))==true){C[C.length]=D.key(A)
}}dojo.forEach(C,dojo.hitch(D,"removeItem"))
},remove:function(A,B){A=this.getFullKey(A,B);
var C=globalStorage[this._domain];
C.removeItem(A)
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},getFullKey:function(A,B){B=B||this.DEFAULT_NAMESPACE;
if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}if(B==this.DEFAULT_NAMESPACE){return A
}else{return"__"+B+"_"+A
}}});
dojox.storage.manager.register("dojox.storage.WhatWGStorageProvider",new dojox.storage.WhatWGStorageProvider())
};