if(!dojo._hasResource["dojox.storage.WhatWGStorageProvider"]){dojo._hasResource["dojox.storage.WhatWGStorageProvider"]=true;
dojo.provide("dojox.storage.WhatWGStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.declare("dojox.storage.WhatWGStorageProvider",[dojox.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){if(djConfig.disableWhatWGStorage==true){return 
}this._domain=(location.hostname=="localhost")?"localhost.localdomain":location.hostname;
this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){try{var A=globalStorage[((location.hostname=="localhost")?"localhost.localdomain":location.hostname)]
}catch(B){this._available=false;
return this._available
}this._available=true;
return this._available
},put:function(E,B,G,F){if(this.isValidKey(E)==false){throw new Error("Invalid key given: "+E)
}F=F||this.DEFAULT_NAMESPACE;
E=this.getFullKey(E,F);
this._statusHandler=G;
if(dojo.isString(B)){B="string:"+B
}else{B=dojo.toJson(B)
}var A=dojo.hitch(this,function(H){window.removeEventListener("storage",A,false);
if(G){G.call(null,this.SUCCESS,E)
}});
window.addEventListener("storage",A,false);
try{var D=globalStorage[this._domain];
D.setItem(E,B)
}catch(C){this._statusHandler.call(null,this.FAILED,E,C.toString())
}},get:function(A,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}B=B||this.DEFAULT_NAMESPACE;
A=this.getFullKey(A,B);
var C=globalStorage[this._domain];
var D=C.getItem(A);
if(D==null||D==""){return null
}D=D.value;
if(dojo.isString(D)&&(/^string:/.test(D))){D=D.substring("string:".length)
}else{D=dojo.fromJson(D)
}return D
},getNamespaces:function(){var G=[this.DEFAULT_NAMESPACE];
var B={};
var C=globalStorage[this._domain];
var E=/^__([^_]*)_/;
for(var F=0;
F<C.length;
F++){var D=C.key(F);
if(E.test(D)==true){var A=D.match(E)[1];
if(typeof B[A]=="undefined"){B[A]=true;
G.push(A)
}}}return G
},getKeys:function(B){B=B||this.DEFAULT_NAMESPACE;
if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}var E;
if(B==this.DEFAULT_NAMESPACE){E=new RegExp("^([^_]{2}.*)$")
}else{E=new RegExp("^__"+B+"_(.*)$")
}var C=globalStorage[this._domain];
var F=[];
for(var A=0;
A<C.length;
A++){var D=C.key(A);
if(E.test(D)==true){D=D.match(E)[1];
F.push(D)
}}return F
},clear:function(A){A=A||this.DEFAULT_NAMESPACE;
if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}var D;
if(A==this.DEFAULT_NAMESPACE){D=new RegExp("^[^_]{2}")
}else{D=new RegExp("^__"+A+"_")
}var C=globalStorage[this._domain];
var B=[];
for(var E=0;
E<C.length;
E++){if(D.test(C.key(E))==true){B[B.length]=C.key(E)
}}dojo.forEach(B,dojo.hitch(C,"removeItem"))
},remove:function(C,A){C=this.getFullKey(C,A);
var B=globalStorage[this._domain];
B.removeItem(C)
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},getFullKey:function(B,A){A=A||this.DEFAULT_NAMESPACE;
if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}if(A==this.DEFAULT_NAMESPACE){return B
}else{return"__"+A+"_"+B
}}});
dojox.storage.manager.register("dojox.storage.WhatWGStorageProvider",new dojox.storage.WhatWGStorageProvider())
};