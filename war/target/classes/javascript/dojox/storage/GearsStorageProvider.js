if(!dojo._hasResource["dojox.storage.GearsStorageProvider"]){dojo._hasResource["dojox.storage.GearsStorageProvider"]=true;
dojo.provide("dojox.storage.GearsStorageProvider");
dojo.require("dojox.storage.Provider");
dojo.require("dojox.storage.manager");
dojo.require("dojox.sql");
if(dojo.isGears){(function(){dojo.declare("dojox.storage.GearsStorageProvider",dojox.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:false,_available:null,initialize:function(){if(djConfig.disableGearsStorage==true){return 
}this.TABLE_NAME="__DOJO_STORAGE";
try{dojox.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )");
dojox.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")
}catch(A){console.debug("dojox.storage.GearsStorageProvider.initialize:",A);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=dojo.isGears
},put:function(E,C,B,A){if(this.isValidKey(E)==false){throw new Error("Invalid key given: "+E)
}A=A||this.DEFAULT_NAMESPACE;
if(dojo.isString(C)){C="string:"+C
}else{C=dojo.toJson(C)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",A,E);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",A,E,C)
}catch(D){console.debug("dojox.storage.GearsStorageProvider.put:",D);
B(this.FAILED,E,D.toString());
return 
}if(B){B(dojox.storage.SUCCESS,E,null)
}},get:function(A,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}B=B||this.DEFAULT_NAMESPACE;
var C=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",B,A);
if(!C.length){return null
}else{C=C[0].value
}if(dojo.isString(C)&&(/^string:/.test(C))){C=C.substring("string:".length)
}else{C=dojo.fromJson(C)
}return C
},getNamespaces:function(){var B=[dojox.storage.DEFAULT_NAMESPACE];
var C=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var A=0;
A<C.length;
A++){if(C[A].namespace!=dojox.storage.DEFAULT_NAMESPACE){B.push(C[A].namespace)
}}return B
},getKeys:function(C){C=C||this.DEFAULT_NAMESPACE;
if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}var D=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",C);
var B=[];
for(var A=0;
A<D.length;
A++){B.push(D[A].key)
}return B
},clear:function(A){if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}A=A||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",A)
},remove:function(B,A){A=A||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",A,B)
},putMultiple:function(A,D,H,G){if(this.isValidKeyArray(A)===false||!D instanceof Array||A.length!=D.length){throw new Error("Invalid arguments: keys = ["+A+"], values = ["+D+"]")
}if(G==null||typeof G=="undefined"){G=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(G)==false){throw new Error("Invalid namespace given: "+G)
}this._statusHandler=H;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var F="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var E=0;
E<A.length;
E++){var B=D[E];
if(dojo.isString(B)){B="string:"+B
}else{B=dojo.toJson(B)
}dojox.sql.db.execute(F,[G,A[E],B])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(C){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",C);
if(H){H(this.FAILED,A,C.toString())
}return 
}if(H){H(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(E,D){if(this.isValidKeyArray(E)===false){throw new ("Invalid key array given: "+E)
}if(D==null||typeof D=="undefined"){D=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}var C="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var B=[];
for(var A=0;
A<E.length;
A++){var F=dojox.sql(C,D,E[A]);
if(!F.length){B[A]=null
}else{F=F[0].value;
if(dojo.isString(F)&&(/^string:/.test(F))){B[A]=F.substring("string:".length)
}else{B[A]=dojo.fromJson(F)
}}}return B
},removeMultiple:function(C,B){B=B||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var A="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var D=0;
D<C.length;
D++){dojox.sql.db.execute(A,[B,C[D]])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
},isPermanent:function(){return true
},getMaximumSize:function(){return this.SIZE_NO_LIMIT
},hasSettingsUI:function(){return false
},showSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
},hideSettingsUI:function(){throw new Error(this.declaredClass+" does not support a storage settings user-interface")
}});
dojox.storage.manager.register("dojox.storage.GearsStorageProvider",new dojox.storage.GearsStorageProvider());
dojox.storage.manager.initialize()
})()
}};