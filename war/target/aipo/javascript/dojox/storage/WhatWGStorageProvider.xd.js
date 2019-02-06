dojo._xdResourceLoaded({depends:[["provide","dojox.storage.WhatWGStorageProvider"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"]],defineResource:function(A){if(!A._hasResource["dojox.storage.WhatWGStorageProvider"]){A._hasResource["dojox.storage.WhatWGStorageProvider"]=true;
A.provide("dojox.storage.WhatWGStorageProvider");
A.require("dojox.storage.Provider");
A.require("dojox.storage.manager");
A.declare("dojox.storage.WhatWGStorageProvider",[dojox.storage.Provider],{initialized:false,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){if(djConfig.disableWhatWGStorage==true){return 
}this._domain=(location.hostname=="localhost")?"localhost.localdomain":location.hostname;
this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){try{var C=globalStorage[((location.hostname=="localhost")?"localhost.localdomain":location.hostname)]
}catch(B){this._available=false;
return this._available
}this._available=true;
return this._available
},put:function(B,F,D,C){if(this.isValidKey(B)==false){throw new Error("Invalid key given: "+B)
}C=C||this.DEFAULT_NAMESPACE;
B=this.getFullKey(B,C);
this._statusHandler=D;
if(A.isString(F)){F="string:"+F
}else{F=A.toJson(F)
}var E=A.hitch(this,function(I){window.removeEventListener("storage",E,false);
if(D){D.call(null,this.SUCCESS,B)
}});
window.addEventListener("storage",E,false);
try{var H=globalStorage[this._domain];
H.setItem(B,F)
}catch(G){this._statusHandler.call(null,this.FAILED,B,G.toString())
}},get:function(C,D){if(this.isValidKey(C)==false){throw new Error("Invalid key given: "+C)
}D=D||this.DEFAULT_NAMESPACE;
C=this.getFullKey(C,D);
var E=globalStorage[this._domain];
var B=E.getItem(C);
if(B==null||B==""){return null
}B=B.value;
if(A.isString(B)&&(/^string:/.test(B))){B=B.substring("string:".length)
}else{B=A.fromJson(B)
}return B
},getNamespaces:function(){var D=[this.DEFAULT_NAMESPACE];
var F={};
var G=globalStorage[this._domain];
var B=/^__([^_]*)_/;
for(var C=0;
C<G.length;
C++){var H=G.key(C);
if(B.test(H)==true){var E=H.match(B)[1];
if(typeof F[E]=="undefined"){F[E]=true;
D.push(E)
}}}return D
},getKeys:function(D){D=D||this.DEFAULT_NAMESPACE;
if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}var G;
if(D==this.DEFAULT_NAMESPACE){G=new RegExp("^([^_]{2}.*)$")
}else{G=new RegExp("^__"+D+"_(.*)$")
}var E=globalStorage[this._domain];
var B=[];
for(var C=0;
C<E.length;
C++){var F=E.key(C);
if(G.test(F)==true){F=F.match(G)[1];
B.push(F)
}}return B
},clear:function(C){C=C||this.DEFAULT_NAMESPACE;
if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}var F;
if(C==this.DEFAULT_NAMESPACE){F=new RegExp("^[^_]{2}")
}else{F=new RegExp("^__"+C+"_")
}var E=globalStorage[this._domain];
var D=[];
for(var B=0;
B<E.length;
B++){if(F.test(E.key(B))==true){D[D.length]=E.key(B)
}}A.forEach(D,A.hitch(E,"removeItem"))
},remove:function(B,C){B=this.getFullKey(B,C);
var D=globalStorage[this._domain];
D.removeItem(B)
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},getFullKey:function(B,C){C=C||this.DEFAULT_NAMESPACE;
if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}if(C==this.DEFAULT_NAMESPACE){return B
}else{return"__"+C+"_"+B
}}});
dojox.storage.manager.register("dojox.storage.WhatWGStorageProvider",new dojox.storage.WhatWGStorageProvider())
}}});