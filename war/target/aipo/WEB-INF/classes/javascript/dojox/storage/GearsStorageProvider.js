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
},put:function(A,D,C,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}B=B||this.DEFAULT_NAMESPACE;
if(dojo.isString(D)){D="string:"+D
}else{D=dojo.toJson(D)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",B,A);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",B,A,D)
}catch(E){console.debug("dojox.storage.GearsStorageProvider.put:",E);
C(this.FAILED,A,E.toString());
return 
}if(C){C(dojox.storage.SUCCESS,A,null)
}},get:function(B,C){if(this.isValidKey(B)==false){throw new Error("Invalid key given: "+B)
}C=C||this.DEFAULT_NAMESPACE;
var A=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",C,B);
if(!A.length){return null
}else{A=A[0].value
}if(dojo.isString(A)&&(/^string:/.test(A))){A=A.substring("string:".length)
}else{A=dojo.fromJson(A)
}return A
},getNamespaces:function(){var C=[dojox.storage.DEFAULT_NAMESPACE];
var A=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var B=0;
B<A.length;
B++){if(A[B].namespace!=dojox.storage.DEFAULT_NAMESPACE){C.push(A[B].namespace)
}}return C
},getKeys:function(D){D=D||this.DEFAULT_NAMESPACE;
if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}var A=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",D);
var C=[];
for(var B=0;
B<A.length;
B++){C.push(A[B].key)
}return C
},clear:function(A){if(this.isValidKey(A)==false){throw new Error("Invalid namespace given: "+A)
}A=A||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",A)
},remove:function(A,B){B=B||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",B,A)
},putMultiple:function(F,A,E,D){if(this.isValidKeyArray(F)===false||!A instanceof Array||F.length!=A.length){throw new Error("Invalid arguments: keys = ["+F+"], values = ["+A+"]")
}if(D==null||typeof D=="undefined"){D=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(D)==false){throw new Error("Invalid namespace given: "+D)
}this._statusHandler=E;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var C="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var B=0;
B<F.length;
B++){var G=A[B];
if(dojo.isString(G)){G="string:"+G
}else{G=dojo.toJson(G)
}dojox.sql.db.execute(C,[D,F[B],G])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(H){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",H);
if(E){E(this.FAILED,F,H.toString())
}return 
}if(E){E(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(F,E){if(this.isValidKeyArray(F)===false){throw new ("Invalid key array given: "+F)
}if(E==null||typeof E=="undefined"){E=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(E)==false){throw new Error("Invalid namespace given: "+E)
}var D="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var C=[];
for(var B=0;
B<F.length;
B++){var A=dojox.sql(D,E,F[B]);
if(!A.length){C[B]=null
}else{A=A[0].value;
if(dojo.isString(A)&&(/^string:/.test(A))){C[B]=A.substring("string:".length)
}else{C[B]=dojo.fromJson(A)
}}}return C
},removeMultiple:function(D,C){C=C||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var B="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var A=0;
A<D.length;
A++){dojox.sql.db.execute(B,[C,D[A]])
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