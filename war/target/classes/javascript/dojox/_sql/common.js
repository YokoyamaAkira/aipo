if(!dojo._hasResource["dojox._sql.common"]){dojo._hasResource["dojox._sql.common"]=true;
dojo.provide("dojox._sql.common");
dojo.require("dojox._sql._crypto");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
dojo.mixin(dojox.sql,{dbName:null,debug:(dojo.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(A){if(this._dbOpen&&(!A||A==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!A){A=this.dbName
}try{this._initDb();
this.db.open(A);
this._dbOpen=true
}catch(B){throw B.message||B
}},close:function(A){if(dojo.isIE){return 
}if(!this._dbOpen&&(!A||A==this.dbName)){return 
}if(!A){A=this.dbName
}try{this.db.close(A);
this._dbOpen=false
}catch(B){throw B.message||B
}},_exec:function(B){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var I=null;
var H=null;
var G=null;
var F=dojo._toArray(B);
I=F.splice(0,1)[0];
if(this._needsEncrypt(I)||this._needsDecrypt(I)){H=F.splice(F.length-1,1)[0];
G=F.splice(F.length-1,1)[0]
}if(this.debug){this._printDebugSQL(I,F)
}if(this._needsEncrypt(I)){var A=new dojox.sql._SQLCrypto("encrypt",I,G,F,H);
return 
}else{if(this._needsDecrypt(I)){var A=new dojox.sql._SQLCrypto("decrypt",I,G,F,H);
return 
}}var D=this.db.execute(I,F);
D=this._normalizeResults(D);
if(this._autoClose){this.close()
}return D
}catch(C){C=C.message||C;
console.debug("SQL Exception: "+C);
if(this._autoClose){try{this.close()
}catch(E){console.debug("Error closing database: "+E.message||E)
}}throw C
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(A){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(D,A){var C='dojox.sql("'+D+'"';
for(var B=0;
B<A.length;
B++){if(typeof A[B]=="string"){C+=', "'+A[B]+'"'
}else{C+=", "+A[B]
}}C+=")";
console.debug(C)
},_normalizeResults:function(A){var C=[];
if(!A){return[]
}while(A.isValidRow()){var E={};
for(var B=0;
B<A.fieldCount();
B++){var F=A.fieldName(B);
var D=A.field(B);
E[F]=D
}C.push(E);
A.next()
}A.close();
return C
},_needsEncrypt:function(A){return/encrypt\([^\)]*\)/i.test(A)
},_needsDecrypt:function(A){return/decrypt\([^\)]*\)/i.test(A)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(C,D,B,A,E){if(C=="encrypt"){this._execEncryptSQL(D,B,A,E)
}else{this._execDecryptSQL(D,B,A,E)
}},_execEncryptSQL:function(E,C,B,G){var F=this._stripCryptoSQL(E);
var D=this._flagEncryptedArgs(E,B);
var A=this;
this._encrypt(F,C,B,D,function(L){var I=false;
var J=[];
var N=null;
try{J=dojox.sql.db.execute(F,L)
}catch(K){I=true;
N=K.message||K
}if(N!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(M){}}G(null,true,N.toString());
return 
}J=dojox.sql._normalizeResults(J);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(E)){var H=A._determineDecryptedColumns(E);
A._decrypt(J,H,C,function(O){G(O,false,null)
})
}else{G(J,false,null)
}})
},_execDecryptSQL:function(K,G,C,I){var J=this._stripCryptoSQL(K);
var H=this._determineDecryptedColumns(K);
var D=false;
var F=[];
var A=null;
try{F=dojox.sql.db.execute(J,C)
}catch(E){D=true;
A=E.message||E
}if(A!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(B){}}I(F,true,A.toString());
return 
}F=dojox.sql._normalizeResults(F);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(F,H,G,function(L){I(L,false,null)
})
},_encrypt:function(G,B,A,E,H){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=A;
for(var C=0;
C<A.length;
C++){if(E[C]){var F=A[C];
var D=C;
this._totalCrypto++;
dojox._sql._crypto.encrypt(F,B,dojo.hitch(this,function(I){this._finalArgs[D]=I;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){H(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(E,B,C,H){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=E;
for(var D=0;
D<E.length;
D++){var G=E[D];
for(var A in G){if(B=="*"||B[A]){this._totalCrypto++;
var F=G[A];
this._decryptSingleColumn(A,F,C,D,function(I){H(I)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(F){F=F.replace(/DECRYPT\(\*\)/ig,"*");
var D=F.match(/ENCRYPT\([^\)]*\)/ig);
if(D!=null){for(var C=0;
C<D.length;
C++){var A=D[C];
var G=A.match(/ENCRYPT\(([^\)]*)\)/i)[1];
F=F.replace(A,G)
}}D=F.match(/DECRYPT\([^\)]*\)/ig);
if(D!=null){for(var C=0;
C<D.length;
C++){var B=D[C];
var E=B.match(/DECRYPT\(([^\)]*)\)/i)[1];
F=F.replace(B,E)
}}return F
},_flagEncryptedArgs:function(H,C){var B=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var F;
var E=0;
var D=[];
while((F=B.exec(H))!=null){var A=RegExp.lastMatch+"";
if(/^[\"\']/.test(A)){continue
}var G=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){G=true
}D[E]=G;
E++
}return D
},_determineDecryptedColumns:function(D){var B={};
if(/DECRYPT\(\*\)/i.test(D)){B="*"
}else{var A=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var C;
while(C=A.exec(D)){var F=new String(RegExp.lastMatch);
var E=F.replace(/DECRYPT\(/i,"");
E=E.replace(/\)/,"");
E=E.split(/\s*,\s*/);
dojo.forEach(E,function(G){if(/\s*\w* AS (\w*)/i.test(G)){G=G.match(/\s*\w* AS (\w*)/i)[1]
}B[G]=true
})
}}return B
},_decryptSingleColumn:function(A,D,B,C,E){dojox._sql._crypto.decrypt(D,B,dojo.hitch(this,function(F){this._finalResultSet[C][A]=F;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){E(this._finalResultSet)
}}))
}})
};