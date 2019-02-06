if(!dojo._hasResource["dojox._sql.common"]){dojo._hasResource["dojox._sql.common"]=true;
dojo.provide("dojox._sql.common");
dojo.require("dojox._sql._crypto");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
dojo.mixin(dojox.sql,{dbName:null,debug:(dojo.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(B){if(this._dbOpen&&(!B||B==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!B){B=this.dbName
}try{this._initDb();
this.db.open(B);
this._dbOpen=true
}catch(A){throw A.message||A
}},close:function(B){if(dojo.isIE){return 
}if(!this._dbOpen&&(!B||B==this.dbName)){return 
}if(!B){B=this.dbName
}try{this.db.close(B);
this._dbOpen=false
}catch(A){throw A.message||A
}},_exec:function(G){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var E=null;
var D=null;
var C=null;
var B=dojo._toArray(G);
E=B.splice(0,1)[0];
if(this._needsEncrypt(E)||this._needsDecrypt(E)){D=B.splice(B.length-1,1)[0];
C=B.splice(B.length-1,1)[0]
}if(this.debug){this._printDebugSQL(E,B)
}if(this._needsEncrypt(E)){var F=new dojox.sql._SQLCrypto("encrypt",E,C,B,D);
return 
}else{if(this._needsDecrypt(E)){var F=new dojox.sql._SQLCrypto("decrypt",E,C,B,D);
return 
}}var I=this.db.execute(E,B);
I=this._normalizeResults(I);
if(this._autoClose){this.close()
}return I
}catch(H){H=H.message||H;
console.debug("SQL Exception: "+H);
if(this._autoClose){try{this.close()
}catch(A){console.debug("Error closing database: "+A.message||A)
}}throw H
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(A){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(C,D){var B='dojox.sql("'+C+'"';
for(var A=0;
A<D.length;
A++){if(typeof D[A]=="string"){B+=', "'+D[A]+'"'
}else{B+=", "+D[A]
}}B+=")";
console.debug(B)
},_normalizeResults:function(F){var B=[];
if(!F){return[]
}while(F.isValidRow()){var D={};
for(var A=0;
A<F.fieldCount();
A++){var E=F.fieldName(A);
var C=F.field(A);
D[E]=C
}B.push(D);
F.next()
}F.close();
return B
},_needsEncrypt:function(A){return/encrypt\([^\)]*\)/i.test(A)
},_needsDecrypt:function(A){return/decrypt\([^\)]*\)/i.test(A)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(B,C,A,E,D){if(B=="encrypt"){this._execEncryptSQL(C,A,E,D)
}else{this._execDecryptSQL(C,A,E,D)
}},_execEncryptSQL:function(B,G,F,D){var C=this._stripCryptoSQL(B);
var A=this._flagEncryptedArgs(B,F);
var E=this;
this._encrypt(C,G,F,A,function(H){var L=false;
var M=[];
var J=null;
try{M=dojox.sql.db.execute(C,H)
}catch(N){L=true;
J=N.message||N
}if(J!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(I){}}D(null,true,J.toString());
return 
}M=dojox.sql._normalizeResults(M);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(B)){var K=E._determineDecryptedColumns(B);
E._decrypt(M,K,G,function(O){D(O,false,null)
})
}else{D(M,false,null)
}})
},_execDecryptSQL:function(G,C,J,E){var F=this._stripCryptoSQL(G);
var D=this._determineDecryptedColumns(G);
var K=false;
var B=[];
var H=null;
try{B=dojox.sql.db.execute(F,J)
}catch(A){K=true;
H=A.message||A
}if(H!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(I){}}E(B,true,H.toString());
return 
}B=dojox.sql._normalizeResults(B);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(B,D,C,function(L){E(L,false,null)
})
},_encrypt:function(B,E,D,H,C){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=D;
for(var F=0;
F<D.length;
F++){if(H[F]){var A=D[F];
var G=F;
this._totalCrypto++;
dojox._sql._crypto.encrypt(A,E,dojo.hitch(this,function(I){this._finalArgs[G]=I;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){C(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(H,E,F,C){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=H;
for(var G=0;
G<H.length;
G++){var B=H[G];
for(var D in B){if(E=="*"||E[D]){this._totalCrypto++;
var A=B[D];
this._decryptSingleColumn(D,A,F,G,function(I){C(I)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(C){C=C.replace(/DECRYPT\(\*\)/ig,"*");
var A=C.match(/ENCRYPT\([^\)]*\)/ig);
if(A!=null){for(var G=0;
G<A.length;
G++){var E=A[G];
var D=E.match(/ENCRYPT\(([^\)]*)\)/i)[1];
C=C.replace(E,D)
}}A=C.match(/DECRYPT\([^\)]*\)/ig);
if(A!=null){for(var G=0;
G<A.length;
G++){var F=A[G];
var B=F.match(/DECRYPT\(([^\)]*)\)/i)[1];
C=C.replace(F,B)
}}return C
},_flagEncryptedArgs:function(C,F){var E=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var A;
var H=0;
var G=[];
while((A=E.exec(C))!=null){var D=RegExp.lastMatch+"";
if(/^[\"\']/.test(D)){continue
}var B=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){B=true
}G[H]=B;
H++
}return G
},_determineDecryptedColumns:function(C){var A={};
if(/DECRYPT\(\*\)/i.test(C)){A="*"
}else{var F=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var B;
while(B=F.exec(C)){var E=new String(RegExp.lastMatch);
var D=E.replace(/DECRYPT\(/i,"");
D=D.replace(/\)/,"");
D=D.split(/\s*,\s*/);
dojo.forEach(D,function(G){if(/\s*\w* AS (\w*)/i.test(G)){G=G.match(/\s*\w* AS (\w*)/i)[1]
}A[G]=true
})
}}return A
},_decryptSingleColumn:function(E,C,A,B,D){dojox._sql._crypto.decrypt(C,A,dojo.hitch(this,function(F){this._finalResultSet[B][E]=F;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){D(this._finalResultSet)
}}))
}})
};