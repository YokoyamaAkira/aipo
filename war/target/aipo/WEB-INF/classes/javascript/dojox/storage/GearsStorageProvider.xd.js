dojo._xdResourceLoaded({depends:[["provide","dojox.storage.GearsStorageProvider"],["require","dojox.storage.Provider"],["require","dojox.storage.manager"],["require","dojox.sql"]],defineResource:function(A){if(!A._hasResource["dojox.storage.GearsStorageProvider"]){A._hasResource["dojox.storage.GearsStorageProvider"]=true;
A.provide("dojox.storage.GearsStorageProvider");
A.require("dojox.storage.Provider");
A.require("dojox.storage.manager");
A.require("dojox.sql");
if(A.isGears){(function(){A.declare("dojox.storage.GearsStorageProvider",dojox.storage.Provider,{constructor:function(){},TABLE_NAME:"__DOJO_STORAGE",initialized:false,_available:null,initialize:function(){if(djConfig.disableGearsStorage==true){return 
}this.TABLE_NAME="__DOJO_STORAGE";
try{dojox.sql("CREATE TABLE IF NOT EXISTS "+this.TABLE_NAME+"(  namespace TEXT,  key TEXT,  value TEXT )");
dojox.sql("CREATE UNIQUE INDEX IF NOT EXISTS namespace_key_index ON "+this.TABLE_NAME+" (namespace, key)")
}catch(B){console.debug("dojox.storage.GearsStorageProvider.initialize:",B);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=A.isGears
},put:function(C,F,E,D){if(this.isValidKey(C)==false){throw new Error("Invalid key given: "+C)
}D=D||this.DEFAULT_NAMESPACE;
if(A.isString(F)){F="string:"+F
}else{F=A.toJson(F)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",D,C);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",D,C,F)
}catch(B){console.debug("dojox.storage.GearsStorageProvider.put:",B);
E(this.FAILED,C,B.toString());
return 
}if(E){E(dojox.storage.SUCCESS,C,null)
}},get:function(D,B){if(this.isValidKey(D)==false){throw new Error("Invalid key given: "+D)
}B=B||this.DEFAULT_NAMESPACE;
var C=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",B,D);
if(!C.length){return null
}else{C=C[0].value
}if(A.isString(C)&&(/^string:/.test(C))){C=C.substring("string:".length)
}else{C=A.fromJson(C)
}return C
},getNamespaces:function(){var B=[dojox.storage.DEFAULT_NAMESPACE];
var C=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var D=0;
D<C.length;
D++){if(C[D].namespace!=dojox.storage.DEFAULT_NAMESPACE){B.push(C[D].namespace)
}}return B
},getKeys:function(B){B=B||this.DEFAULT_NAMESPACE;
if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}var C=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",B);
var E=[];
for(var D=0;
D<C.length;
D++){E.push(C[D].key)
}return E
},clear:function(B){if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}B=B||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",B)
},remove:function(C,B){B=B||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",B,C)
},putMultiple:function(D,F,C,I){if(this.isValidKeyArray(D)===false||!F instanceof Array||D.length!=F.length){throw new Error("Invalid arguments: keys = ["+D+"], values = ["+F+"]")
}if(I==null||typeof I=="undefined"){I=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(I)==false){throw new Error("Invalid namespace given: "+I)
}this._statusHandler=C;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var H="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var G=0;
G<D.length;
G++){var E=F[G];
if(A.isString(E)){E="string:"+E
}else{E=A.toJson(E)
}dojox.sql.db.execute(H,[I,D[G],E])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(B){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",B);
if(C){C(this.FAILED,D,B.toString())
}return 
}if(C){C(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(C,G){if(this.isValidKeyArray(C)===false){throw new ("Invalid key array given: "+C)
}if(G==null||typeof G=="undefined"){G=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(G)==false){throw new Error("Invalid namespace given: "+G)
}var F="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var E=[];
for(var D=0;
D<C.length;
D++){var B=dojox.sql(F,G,C[D]);
if(!B.length){E[D]=null
}else{B=B[0].value;
if(A.isString(B)&&(/^string:/.test(B))){E[D]=B.substring("string:".length)
}else{E[D]=A.fromJson(B)
}}}return E
},removeMultiple:function(B,E){E=E||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var D="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var C=0;
C<B.length;
C++){dojox.sql.db.execute(D,[E,B[C]])
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
}}}});