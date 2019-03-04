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
},put:function(B,E,D,C){if(this.isValidKey(B)==false){throw new Error("Invalid key given: "+B)
}C=C||this.DEFAULT_NAMESPACE;
if(A.isString(E)){E="string:"+E
}else{E=A.toJson(E)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",C,B);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",C,B,E)
}catch(F){console.debug("dojox.storage.GearsStorageProvider.put:",F);
D(this.FAILED,B,F.toString());
return 
}if(D){D(dojox.storage.SUCCESS,B,null)
}},get:function(C,D){if(this.isValidKey(C)==false){throw new Error("Invalid key given: "+C)
}D=D||this.DEFAULT_NAMESPACE;
var B=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",D,C);
if(!B.length){return null
}else{B=B[0].value
}if(A.isString(B)&&(/^string:/.test(B))){B=B.substring("string:".length)
}else{B=A.fromJson(B)
}return B
},getNamespaces:function(){var D=[dojox.storage.DEFAULT_NAMESPACE];
var B=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var C=0;
C<B.length;
C++){if(B[C].namespace!=dojox.storage.DEFAULT_NAMESPACE){D.push(B[C].namespace)
}}return D
},getKeys:function(E){E=E||this.DEFAULT_NAMESPACE;
if(this.isValidKey(E)==false){throw new Error("Invalid namespace given: "+E)
}var B=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",E);
var D=[];
for(var C=0;
C<B.length;
C++){D.push(B[C].key)
}return D
},clear:function(B){if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}B=B||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",B)
},remove:function(B,C){C=C||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",C,B)
},putMultiple:function(G,B,F,E){if(this.isValidKeyArray(G)===false||!B instanceof Array||G.length!=B.length){throw new Error("Invalid arguments: keys = ["+G+"], values = ["+B+"]")
}if(E==null||typeof E=="undefined"){E=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(E)==false){throw new Error("Invalid namespace given: "+E)
}this._statusHandler=F;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var D="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var C=0;
C<G.length;
C++){var H=B[C];
if(A.isString(H)){H="string:"+H
}else{H=A.toJson(H)
}dojox.sql.db.execute(D,[E,G[C],H])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(I){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",I);
if(F){F(this.FAILED,G,I.toString())
}return 
}if(F){F(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(G,F){if(this.isValidKeyArray(G)===false){throw new ("Invalid key array given: "+G)
}if(F==null||typeof F=="undefined"){F=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(F)==false){throw new Error("Invalid namespace given: "+F)
}var E="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var D=[];
for(var C=0;
C<G.length;
C++){var B=dojox.sql(E,F,G[C]);
if(!B.length){D[C]=null
}else{B=B[0].value;
if(A.isString(B)&&(/^string:/.test(B))){D[C]=B.substring("string:".length)
}else{D[C]=A.fromJson(B)
}}}return D
},removeMultiple:function(E,D){D=D||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var C="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var B=0;
B<E.length;
B++){dojox.sql.db.execute(C,[D,E[B]])
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