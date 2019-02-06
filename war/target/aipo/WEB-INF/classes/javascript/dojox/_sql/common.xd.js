dojo._xdResourceLoaded({depends:[["provide","dojox._sql.common"],["require","dojox._sql._crypto"]],defineResource:function(A){if(!A._hasResource["dojox._sql.common"]){A._hasResource["dojox._sql.common"]=true;
A.provide("dojox._sql.common");
A.require("dojox._sql._crypto");
dojox.sql=new Function("return dojox.sql._exec(arguments);");
A.mixin(dojox.sql,{dbName:null,debug:(A.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(C){if(this._dbOpen&&(!C||C==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!C){C=this.dbName
}try{this._initDb();
this.db.open(C);
this._dbOpen=true
}catch(B){throw B.message||B
}},close:function(C){if(A.isIE){return 
}if(!this._dbOpen&&(!C||C==this.dbName)){return 
}if(!C){C=this.dbName
}try{this.db.close(C);
this._dbOpen=false
}catch(B){throw B.message||B
}},_exec:function(J){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var H=null;
var G=null;
var F=null;
var E=A._toArray(J);
H=E.splice(0,1)[0];
if(this._needsEncrypt(H)||this._needsDecrypt(H)){G=E.splice(E.length-1,1)[0];
F=E.splice(E.length-1,1)[0]
}if(this.debug){this._printDebugSQL(H,E)
}if(this._needsEncrypt(H)){var I=new dojox.sql._SQLCrypto("encrypt",H,F,E,G);
return 
}else{if(this._needsDecrypt(H)){var I=new dojox.sql._SQLCrypto("decrypt",H,F,E,G);
return 
}}var C=this.db.execute(H,E);
C=this._normalizeResults(C);
if(this._autoClose){this.close()
}return C
}catch(B){B=B.message||B;
console.debug("SQL Exception: "+B);
if(this._autoClose){try{this.close()
}catch(D){console.debug("Error closing database: "+D.message||D)
}}throw B
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(B){A.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(B,C){var E='dojox.sql("'+B+'"';
for(var D=0;
D<C.length;
D++){if(typeof C[D]=="string"){E+=', "'+C[D]+'"'
}else{E+=", "+C[D]
}}E+=")";
console.debug(E)
},_normalizeResults:function(C){var E=[];
if(!C){return[]
}while(C.isValidRow()){var G={};
for(var D=0;
D<C.fieldCount();
D++){var B=C.fieldName(D);
var F=C.field(D);
G[B]=F
}E.push(G);
C.next()
}C.close();
return E
},_needsEncrypt:function(B){return/encrypt\([^\)]*\)/i.test(B)
},_needsDecrypt:function(B){return/decrypt\([^\)]*\)/i.test(B)
}});
A.declare("dojox.sql._SQLCrypto",null,{constructor:function(E,F,D,C,B){if(E=="encrypt"){this._execEncryptSQL(F,D,C,B)
}else{this._execDecryptSQL(F,D,C,B)
}},_execEncryptSQL:function(E,C,H,B){var F=this._stripCryptoSQL(E);
var D=this._flagEncryptedArgs(E,H);
var G=this;
this._encrypt(F,C,H,D,function(M){var L=false;
var N=[];
var J=null;
try{N=dojox.sql.db.execute(F,M)
}catch(O){L=true;
J=O.message||O
}if(J!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(I){}}B(null,true,J.toString());
return 
}N=dojox.sql._normalizeResults(N);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(E)){var K=G._determineDecryptedColumns(E);
G._decrypt(N,K,C,function(P){B(P,false,null)
})
}else{B(N,false,null)
}})
},_execDecryptSQL:function(J,F,B,H){var I=this._stripCryptoSQL(J);
var G=this._determineDecryptedColumns(J);
var C=false;
var E=[];
var K=null;
try{E=dojox.sql.db.execute(I,B)
}catch(D){C=true;
K=D.message||D
}if(K!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(L){}}H(E,true,K.toString());
return 
}E=dojox.sql._normalizeResults(E);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(E,G,F,function(M){H(M,false,null)
})
},_encrypt:function(E,G,F,C,B){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=F;
for(var H=0;
H<F.length;
H++){if(C[H]){var D=F[H];
var I=H;
this._totalCrypto++;
dojox._sql._crypto.encrypt(D,G,A.hitch(this,function(J){this._finalArgs[I]=J;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){B(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(C,G,H,B){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=C;
for(var I=0;
I<C.length;
I++){var E=C[I];
for(var F in E){if(G=="*"||G[F]){this._totalCrypto++;
var D=E[F];
this._decryptSingleColumn(F,D,H,I,function(J){B(J)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(F){F=F.replace(/DECRYPT\(\*\)/ig,"*");
var D=F.match(/ENCRYPT\([^\)]*\)/ig);
if(D!=null){for(var C=0;
C<D.length;
C++){var G=D[C];
var B=G.match(/ENCRYPT\(([^\)]*)\)/i)[1];
F=F.replace(G,B)
}}D=F.match(/DECRYPT\([^\)]*\)/ig);
if(D!=null){for(var C=0;
C<D.length;
C++){var H=D[C];
var E=H.match(/DECRYPT\(([^\)]*)\)/i)[1];
F=F.replace(H,E)
}}return F
},_flagEncryptedArgs:function(C,H){var G=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var D;
var B=0;
var I=[];
while((D=G.exec(C))!=null){var F=RegExp.lastMatch+"";
if(/^[\"\']/.test(F)){continue
}var E=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){E=true
}I[B]=E;
B++
}return I
},_determineDecryptedColumns:function(F){var D={};
if(/DECRYPT\(\*\)/i.test(F)){D="*"
}else{var C=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var E;
while(E=C.exec(F)){var B=new String(RegExp.lastMatch);
var G=B.replace(/DECRYPT\(/i,"");
G=G.replace(/\)/,"");
G=G.split(/\s*,\s*/);
A.forEach(G,function(H){if(/\s*\w* AS (\w*)/i.test(H)){H=H.match(/\s*\w* AS (\w*)/i)[1]
}D[H]=true
})
}}return D
},_decryptSingleColumn:function(C,F,D,E,B){dojox._sql._crypto.decrypt(F,D,A.hitch(this,function(G){this._finalResultSet[E][C]=G;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){B(this._finalResultSet)
}}))
}})
}}});