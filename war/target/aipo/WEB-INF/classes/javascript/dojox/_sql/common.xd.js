dojo._xdResourceLoaded({depends:[["provide","dojox._sql.common"],["require","dojox._sql._crypto"]],defineResource:function(A){if(!A._hasResource["dojox._sql.common"]){A._hasResource["dojox._sql.common"]=true;
A.provide("dojox._sql.common");
A.require("dojox._sql._crypto");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
A.mixin(dojox.sql,{dbName:null,debug:(A.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(B){if(this._dbOpen&&(!B||B==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!B){B=this.dbName
}try{this._initDb();
this.db.open(B);
this._dbOpen=true
}catch(C){throw C.message||C
}},close:function(B){if(A.isIE){return 
}if(!this._dbOpen&&(!B||B==this.dbName)){return 
}if(!B){B=this.dbName
}try{this.db.close(B);
this._dbOpen=false
}catch(C){throw C.message||C
}},_exec:function(C){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var J=null;
var I=null;
var H=null;
var G=A._toArray(C);
J=G.splice(0,1)[0];
if(this._needsEncrypt(J)||this._needsDecrypt(J)){I=G.splice(G.length-1,1)[0];
H=G.splice(G.length-1,1)[0]
}if(this.debug){this._printDebugSQL(J,G)
}if(this._needsEncrypt(J)){var B=new dojox.sql._SQLCrypto("encrypt",J,H,G,I);
return 
}else{if(this._needsDecrypt(J)){var B=new dojox.sql._SQLCrypto("decrypt",J,H,G,I);
return 
}}var E=this.db.execute(J,G);
E=this._normalizeResults(E);
if(this._autoClose){this.close()
}return E
}catch(D){D=D.message||D;
console.debug("SQL Exception: "+D);
if(this._autoClose){try{this.close()
}catch(F){console.debug("Error closing database: "+F.message||F)
}}throw D
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(B){A.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(E,B){var D='dojox.sql("'+E+'"';
for(var C=0;
C<B.length;
C++){if(typeof B[C]=="string"){D+=', "'+B[C]+'"'
}else{D+=", "+B[C]
}}D+=")";
console.debug(D)
},_normalizeResults:function(B){var D=[];
if(!B){return[]
}while(B.isValidRow()){var F={};
for(var C=0;
C<B.fieldCount();
C++){var G=B.fieldName(C);
var E=B.field(C);
F[G]=E
}D.push(F);
B.next()
}B.close();
return D
},_needsEncrypt:function(B){return/encrypt\([^\)]*\)/i.test(B)
},_needsDecrypt:function(B){return/decrypt\([^\)]*\)/i.test(B)
}});
A.declare("dojox.sql._SQLCrypto",null,{constructor:function(D,E,C,B,F){if(D=="encrypt"){this._execEncryptSQL(E,C,B,F)
}else{this._execDecryptSQL(E,C,B,F)
}},_execEncryptSQL:function(F,D,C,H){var G=this._stripCryptoSQL(F);
var E=this._flagEncryptedArgs(F,C);
var B=this;
this._encrypt(G,D,C,E,function(M){var J=false;
var K=[];
var O=null;
try{K=dojox.sql.db.execute(G,M)
}catch(L){J=true;
O=L.message||L
}if(O!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(N){}}H(null,true,O.toString());
return 
}K=dojox.sql._normalizeResults(K);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(F)){var I=B._determineDecryptedColumns(F);
B._decrypt(K,I,D,function(P){H(P,false,null)
})
}else{H(K,false,null)
}})
},_execDecryptSQL:function(L,H,D,J){var K=this._stripCryptoSQL(L);
var I=this._determineDecryptedColumns(L);
var E=false;
var G=[];
var B=null;
try{G=dojox.sql.db.execute(K,D)
}catch(F){E=true;
B=F.message||F
}if(B!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(C){}}J(G,true,B.toString());
return 
}G=dojox.sql._normalizeResults(G);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(G,I,H,function(M){J(M,false,null)
})
},_encrypt:function(H,C,B,F,I){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=B;
for(var D=0;
D<B.length;
D++){if(F[D]){var G=B[D];
var E=D;
this._totalCrypto++;
dojox._sql._crypto.encrypt(G,C,A.hitch(this,function(J){this._finalArgs[E]=J;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){I(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(F,C,D,I){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=F;
for(var E=0;
E<F.length;
E++){var H=F[E];
for(var B in H){if(C=="*"||C[B]){this._totalCrypto++;
var G=H[B];
this._decryptSingleColumn(B,G,D,E,function(J){I(J)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(G){G=G.replace(/DECRYPT\(\*\)/ig,"*");
var E=G.match(/ENCRYPT\([^\)]*\)/ig);
if(E!=null){for(var D=0;
D<E.length;
D++){var B=E[D];
var H=B.match(/ENCRYPT\(([^\)]*)\)/i)[1];
G=G.replace(B,H)
}}E=G.match(/DECRYPT\([^\)]*\)/ig);
if(E!=null){for(var D=0;
D<E.length;
D++){var C=E[D];
var F=C.match(/DECRYPT\(([^\)]*)\)/i)[1];
G=G.replace(C,F)
}}return G
},_flagEncryptedArgs:function(I,D){var C=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var G;
var F=0;
var E=[];
while((G=C.exec(I))!=null){var B=RegExp.lastMatch+"";
if(/^[\"\']/.test(B)){continue
}var H=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){H=true
}E[F]=H;
F++
}return E
},_determineDecryptedColumns:function(E){var C={};
if(/DECRYPT\(\*\)/i.test(E)){C="*"
}else{var B=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var D;
while(D=B.exec(E)){var G=new String(RegExp.lastMatch);
var F=G.replace(/DECRYPT\(/i,"");
F=F.replace(/\)/,"");
F=F.split(/\s*,\s*/);
A.forEach(F,function(H){if(/\s*\w* AS (\w*)/i.test(H)){H=H.match(/\s*\w* AS (\w*)/i)[1]
}C[H]=true
})
}}return C
},_decryptSingleColumn:function(B,E,C,D,F){dojox._sql._crypto.decrypt(E,C,A.hitch(this,function(G){this._finalResultSet[D][B]=G;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){F(this._finalResultSet)
}}))
}})
}}});