if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(A,D,C,B){console.warn("dojox.storage.put not implemented")
},get:function(A,B){console.warn("dojox.storage.get not implemented")
},hasKey:function(A,B){return(this.get(A)!=null)
},getKeys:function(A){console.warn("dojox.storage.getKeys not implemented")
},clear:function(A){console.warn("dojox.storage.clear not implemented")
},remove:function(A,B){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(D,A,C,B){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(B,A){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(B,A){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(B){if(B===null||typeof B==="undefined"||!B instanceof Array){return false
}for(var A=0;
A<B.length;
A++){if(!this.isValidKey(B[A])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(A){if((A==null)||(typeof A=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(A)
},getResourceList:function(){return[]
}})
}if(!dojo._hasResource["dojox.storage.manager"]){dojo._hasResource["dojox.storage.manager"]=true;
dojo.provide("dojox.storage.manager");
dojox.storage.manager=new function(){this.currentProvider=null;
this.available=false;
this._initialized=false;
this._providers=[];
this._onLoadListeners=[];
this.initialize=function(){this.autodetect()
};
this.register=function(name,instance){this._providers[this._providers.length]=instance;
this._providers[name]=instance
};
this.setProvider=function(storageClass){};
this.autodetect=function(){if(this._initialized){return 
}var forceProvider=djConfig.forceStorageProvider||false;
var providerToUse;
for(var i=0;
i<this._providers.length;
i++){providerToUse=this._providers[i];
if(forceProvider==providerToUse.declaredClass){providerToUse.isAvailable();
break
}else{if(providerToUse.isAvailable()){break
}}}if(!providerToUse){this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return 
}this.currentProvider=providerToUse;
dojo.mixin(dojox.storage,this.currentProvider);
dojox.storage.initialize();
this._initialized=true;
this.available=true
};
this.isAvailable=function(){return this.available
};
this.addOnLoad=function(func){this._onLoadListeners.push(func);
if(this.isInitialized()){this._fireLoaded()
}};
this.removeOnLoad=function(func){for(var i=0;
i<this._onLoadListeners.length;
i++){if(func==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);
break
}}};
this.isInitialized=function(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false
}else{return this._initialized
}};
this.supportsProvider=function(storageClass){try{var provider=eval("new "+storageClass+"()");
var results=provider.isAvailable();
if(!results){return false
}return results
}catch(e){return false
}};
this.getProvider=function(){return this.currentProvider
};
this.loaded=function(){this._fireLoaded()
};
this._fireLoaded=function(){dojo.forEach(this._onLoadListeners,function(i){try{i()
}catch(e){console.debug(e)
}})
};
this.getResourceList=function(){var results=[];
dojo.forEach(dojox.storage.manager._providers,function(currentProvider){results=results.concat(currentProvider.getResourceList())
});
return results
}
}
}if(!dojo._hasResource["dojox._sql._crypto"]){dojo._hasResource["dojox._sql._crypto"]=true;
dojo.provide("dojox._sql._crypto");
dojo.mixin(dojox._sql._crypto,{_POOL_SIZE:100,encrypt:function(B,A,D){this._initWorkerPool();
var C={plaintext:B,password:A};
C=dojo.toJson(C);
C="encr:"+String(C);
this._assignWork(C,D)
},decrypt:function(B,A,D){this._initWorkerPool();
var C={ciphertext:B,password:A};
C=dojo.toJson(C);
C="decr:"+String(C);
this._assignWork(C,D)
},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");
this._unemployed=[];
this._employed={};
this._handleMessage=[];
var B=this;
this._manager.onmessage=function(H,F){var I=B._employed["_"+F];
B._employed["_"+F]=undefined;
B._unemployed.push("_"+F);
if(B._handleMessage.length){var G=B._handleMessage.shift();
B._assignWork(G.msg,G.callback)
}I(H)
};
var A="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var D=A+" _workerInit();";
for(var C=0;
C<this._POOL_SIZE;
C++){this._unemployed.push("_"+this._manager.createWorker(D))
}}catch(E){throw E.message||E
}}},_assignWork:function(B,C){if(!this._handleMessage.length&&this._unemployed.length){var A=this._unemployed.shift().substring(1);
this._employed["_"+A]=C;
this._manager.sendMessage(B,A)
}else{this._handleMessage={msg:B,callback:C}
}},_workerHandler:function(msg,sender){var Sbox=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var Rcon=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
function Cipher(input,w){var Nb=4;
var Nr=w.length/Nb-1;
var state=[[],[],[],[]];
for(var i=0;
i<4*Nb;
i++){state[i%4][Math.floor(i/4)]=input[i]
}state=AddRoundKey(state,w,0,Nb);
for(var round=1;
round<Nr;
round++){state=SubBytes(state,Nb);
state=ShiftRows(state,Nb);
state=MixColumns(state,Nb);
state=AddRoundKey(state,w,round,Nb)
}state=SubBytes(state,Nb);
state=ShiftRows(state,Nb);
state=AddRoundKey(state,w,Nr,Nb);
var output=new Array(4*Nb);
for(var i=0;
i<4*Nb;
i++){output[i]=state[i%4][Math.floor(i/4)]
}return output
}function SubBytes(s,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){s[r][c]=Sbox[s[r][c]]
}}return s
}function ShiftRows(s,Nb){var t=new Array(4);
for(var r=1;
r<4;
r++){for(var c=0;
c<4;
c++){t[c]=s[r][(c+r)%Nb]
}for(var c=0;
c<4;
c++){s[r][c]=t[c]
}}return s
}function MixColumns(s,Nb){for(var c=0;
c<4;
c++){var a=new Array(4);
var b=new Array(4);
for(var i=0;
i<4;
i++){a[i]=s[i][c];
b[i]=s[i][c]&128?s[i][c]<<1^283:s[i][c]<<1
}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];
s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];
s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];
s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3]
}return s
}function AddRoundKey(state,w,rnd,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){state[r][c]^=w[rnd*4+c][r]
}}return state
}function KeyExpansion(key){var Nb=4;
var Nk=key.length/4;
var Nr=Nk+6;
var w=new Array(Nb*(Nr+1));
var temp=new Array(4);
for(var i=0;
i<Nk;
i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];
w[i]=r
}for(var i=Nk;
i<(Nb*(Nr+1));
i++){w[i]=new Array(4);
for(var t=0;
t<4;
t++){temp[t]=w[i-1][t]
}if(i%Nk==0){temp=SubWord(RotWord(temp));
for(var t=0;
t<4;
t++){temp[t]^=Rcon[i/Nk][t]
}}else{if(Nk>6&&i%Nk==4){temp=SubWord(temp)
}}for(var t=0;
t<4;
t++){w[i][t]=w[i-Nk][t]^temp[t]
}}return w
}function SubWord(w){for(var i=0;
i<4;
i++){w[i]=Sbox[w[i]]
}return w
}function RotWord(w){w[4]=w[0];
for(var i=0;
i<4;
i++){w[i]=w[i+1]
}return w
}function AESEncryptCtr(plaintext,password,nBits){if(!(nBits==128||nBits==192||nBits==256)){return""
}var nBytes=nBits/8;
var pwBytes=new Array(nBytes);
for(var i=0;
i<nBytes;
i++){pwBytes[i]=password.charCodeAt(i)&255
}var key=Cipher(pwBytes,KeyExpansion(pwBytes));
key=key.concat(key.slice(0,nBytes-16));
var blockSize=16;
var counterBlock=new Array(blockSize);
var nonce=(new Date()).getTime();
for(var i=0;
i<4;
i++){counterBlock[i]=(nonce>>>i*8)&255
}for(var i=0;
i<4;
i++){counterBlock[i+4]=(nonce/4294967296>>>i*8)&255
}var keySchedule=KeyExpansion(key);
var blockCount=Math.ceil(plaintext.length/blockSize);
var ciphertext=new Array(blockCount);
for(var b=0;
b<blockCount;
b++){for(var c=0;
c<4;
c++){counterBlock[15-c]=(b>>>c*8)&255
}for(var c=0;
c<4;
c++){counterBlock[15-c-4]=(b/4294967296>>>c*8)
}var cipherCntr=Cipher(counterBlock,keySchedule);
var blockLength=b<blockCount-1?blockSize:(plaintext.length-1)%blockSize+1;
var ct="";
for(var i=0;
i<blockLength;
i++){var plaintextByte=plaintext.charCodeAt(b*blockSize+i);
var cipherByte=plaintextByte^cipherCntr[i];
ct+=String.fromCharCode(cipherByte)
}ciphertext[b]=escCtrlChars(ct)
}var ctrTxt="";
for(var i=0;
i<8;
i++){ctrTxt+=String.fromCharCode(counterBlock[i])
}ctrTxt=escCtrlChars(ctrTxt);
return ctrTxt+"-"+ciphertext.join("-")
}function AESDecryptCtr(ciphertext,password,nBits){if(!(nBits==128||nBits==192||nBits==256)){return""
}var nBytes=nBits/8;
var pwBytes=new Array(nBytes);
for(var i=0;
i<nBytes;
i++){pwBytes[i]=password.charCodeAt(i)&255
}var pwKeySchedule=KeyExpansion(pwBytes);
var key=Cipher(pwBytes,pwKeySchedule);
key=key.concat(key.slice(0,nBytes-16));
var keySchedule=KeyExpansion(key);
ciphertext=ciphertext.split("-");
var blockSize=16;
var counterBlock=new Array(blockSize);
var ctrTxt=unescCtrlChars(ciphertext[0]);
for(var i=0;
i<8;
i++){counterBlock[i]=ctrTxt.charCodeAt(i)
}var plaintext=new Array(ciphertext.length-1);
for(var b=1;
b<ciphertext.length;
b++){for(var c=0;
c<4;
c++){counterBlock[15-c]=((b-1)>>>c*8)&255
}for(var c=0;
c<4;
c++){counterBlock[15-c-4]=((b/4294967296-1)>>>c*8)&255
}var cipherCntr=Cipher(counterBlock,keySchedule);
ciphertext[b]=unescCtrlChars(ciphertext[b]);
var pt="";
for(var i=0;
i<ciphertext[b].length;
i++){var ciphertextByte=ciphertext[b].charCodeAt(i);
var plaintextByte=ciphertextByte^cipherCntr[i];
pt+=String.fromCharCode(plaintextByte)
}plaintext[b-1]=pt
}return plaintext.join("")
}function escCtrlChars(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return"!"+c.charCodeAt(0)+"!"
})
}function unescCtrlChars(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1))
})
}function encrypt(plaintext,password){return AESEncryptCtr(plaintext,password,256)
}function decrypt(ciphertext,password){return AESDecryptCtr(ciphertext,password,256)
}var cmd=msg.substr(0,4);
var arg=msg.substr(5);
if(cmd=="encr"){arg=eval("("+arg+")");
var plaintext=arg.plaintext;
var password=arg.password;
var results=encrypt(plaintext,password);
gearsWorkerPool.sendMessage(String(results),sender)
}else{if(cmd=="decr"){arg=eval("("+arg+")");
var ciphertext=arg.ciphertext;
var password=arg.password;
var results=decrypt(ciphertext,password);
gearsWorkerPool.sendMessage(String(results),sender)
}}}})
}if(!dojo._hasResource["dojox._sql.common"]){dojo._hasResource["dojox._sql.common"]=true;
dojo.provide("dojox._sql.common");
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
}if(!dojo._hasResource["dojox.sql"]){dojo._hasResource["dojox.sql"]=true;
dojo.provide("dojox.sql")
}if(!dojo._hasResource["dojox.storage.GearsStorageProvider"]){dojo._hasResource["dojox.storage.GearsStorageProvider"]=true;
dojo.provide("dojox.storage.GearsStorageProvider");
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
}}if(!dojo._hasResource["dojox.storage._common"]){dojo._hasResource["dojox.storage._common"]=true;
dojo.provide("dojox.storage._common");
dojox.storage.manager.initialize()
}if(!dojo._hasResource["dojox.storage"]){dojo._hasResource["dojox.storage"]=true;
dojo.provide("dojox.storage")
}if(!dojo._hasResource["dojox.off.files"]){dojo._hasResource["dojox.off.files"]=true;
dojo.provide("dojox.off.files");
dojox.off.files={versionURL:"version.js",listOfURLs:[],refreshing:false,_cancelID:null,_error:false,_errorMessages:[],_currentFileIndex:0,_store:null,_doSlurp:false,slurp:function(){this._doSlurp=true
},cache:function(A){if(dojo.isString(A)){var B=this._trimAnchor(A+"");
if(!this.isAvailable(B)){this.listOfURLs.push(B)
}}else{if(A instanceof dojo._Url){var B=this._trimAnchor(A.uri);
if(!this.isAvailable(B)){this.listOfURLs.push(B)
}}else{dojo.forEach(A,function(C){C=this._trimAnchor(C);
if(!this.isAvailable(C)){this.listOfURLs.push(C)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
dojo.forEach(this.listOfURLs,function(A){console.debug(A)
})
},remove:function(A){for(var B=0;
B<this.listOfURLs.length;
B++){if(this.listOfURLs[B]==A){this.listOfURLs=this.listOfURLs.splice(B,1);
break
}}},isAvailable:function(A){for(var B=0;
B<this.listOfURLs.length;
B++){if(this.listOfURLs[B]==A){return true
}}return false
},refresh:function(B){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(C,D,E){if(djConfig.isDebug||!D||E||!C||C!=D){console.warn("Refreshing offline file list");
this._doRefresh(B,D)
}else{console.warn("No need to refresh offline file list");
B(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(B)
}}catch(A){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var A=dojo.hitch(this,function(B){if(this._sameLocation(B)){this.cache(B)
}});
A(window.location.href);
dojo.query("script").forEach(function(B){try{A(B.getAttribute("src"))
}catch(C){}});
dojo.query("link").forEach(function(B){try{if(!B.getAttribute("rel")||B.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}A(B.getAttribute("href"))
}catch(C){}});
dojo.query("img").forEach(function(B){try{A(B.getAttribute("src"))
}catch(C){}});
dojo.query("a").forEach(function(B){try{A(B.getAttribute("href"))
}catch(C){}});
dojo.forEach(document.styleSheets,function(D){try{if(D.cssRules){dojo.forEach(D.cssRules,function(J){var K=J.cssText;
if(K){var I=K.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!I){return 
}for(var H=1;
H<I.length;
H++){A(I[H])
}}})
}else{if(D.cssText){var E;
var G=D.cssText.toString();
var B=G.split(/\f|\r|\n/);
for(var C=0;
C<B.length;
C++){E=B[C].match(/url\(\s*([^\) ]*)\s*\)/i);
if(E&&E.length){A(E[1])
}}}}}catch(F){}})
},_sameLocation:function(A){if(!A){return false
}if(A.length&&A.charAt(0)=="#"){return false
}A=new dojo._Url(A);
if(!A.scheme&&!A.port&&!A.host){return true
}if(!A.scheme&&A.host&&A.port&&window.location.hostname==A.host&&window.location.port==A.port){return true
}if(!A.scheme&&A.host&&!A.port&&window.location.hostname==A.host&&window.location.port==80){return true
}return window.location.protocol==(A.scheme+":")&&window.location.hostname==A.host&&(window.location.port==A.port||!window.location.port&&!A.port)
},_trimAnchor:function(A){return A.replace(/\#.*$/,"")
},_doRefresh:function(G,D){var E;
try{E=google.gears.factory.create("beta.localserver","1.0")
}catch(F){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var C="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
E.removeStore(C);
E.openStore(C);
var B=E.createStore(C);
this._store=B;
var A=this;
this._currentFileIndex=0;
this._cancelID=B.capture(this.listOfURLs,function(I,K,H){if(!K&&A.refreshing){A._cancelID=null;
A.refreshing=false;
var J=[];
J.push("Unable to capture: "+I);
G(true,J);
return 
}else{if(K){A._currentFileIndex++
}}if(K&&A._currentFileIndex>=A.listOfURLs.length){A._cancelID=null;
A.refreshing=false;
if(D){dojox.storage.put("oldVersion",D,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
G(false,[])
}})
},_getVersionInfo:function(D){var C=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var A=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var B=null;
D=dojo.hitch(this,D);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(E){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
D(A,B,C)
},load:function(E){if(E){B=E
}D(A,B,C)
}})
}}
}if(!dojo._hasResource["dojox.off.sync"]){dojo._hasResource["dojox.off.sync"]=true;
dojo.provide("dojox.off.sync");
dojo.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(A){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(B,A){if(typeof B=="undefined"){B=true
}if(!B){this.successful=false;
this.details.push(A);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(dojo.hitch(this,function(A,C){if(A){this.error=true;
this.successful=false;
for(var B=0;
B<C.length;
B++){this.details.push(C[B])
}}this.upload()
}))
},upload:function(){if(this.cancelled){this.finished();
return 
}this.onSync("upload");
dojo.connect(this.actions,"onReplayFinished",this,this.download);
this.actions.replay()
},download:function(){if(this.cancelled){this.finished();
return 
}this.onSync("download")
},finished:function(){this.isSyncing=false;
this.successful=(!this.cancelled&&!this.error);
this.onSync("finished")
},_save:function(A){this.actions._save(function(){A()
})
},_load:function(A){this.actions._load(function(){A()
})
}});
dojo.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(A){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(A);
if(this.autoSave){this._save()
}},onReplay:function(A,B){},length:function(){return this.entries.length
},haltReplay:function(B){if(!this.isReplaying){return 
}if(B){this.reasonHalted=B.toString()
}if(this.autoSave){var A=this;
this._save(function(){A.isReplaying=false;
A.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var B=this;
this._save(function(){B.isReplaying=false;
B.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var A=this.entries[0];
this.onReplay(A,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var A=this.entries[0];
this.onReplay(A,this)
},onReplayFinished:function(){},toString:function(){var C="";
C+="[";
for(var B=0;
B<this.entries.length;
B++){C+="{";
for(var A in this.entries[B]){C+=A+': "'+this.entries[B][A]+'"';
C+=", "
}C+="}, "
}C+="]";
return C
},_save:function(D){if(!D){D=function(){}
}try{var A=this;
var B=function(E,F,G){if(E==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:F,value:G,namespace:dojox.off.STORAGE_NAMESPACE});
D()
}else{if(E==dojox.storage.SUCCESS){D()
}}};
dojox.storage.put("actionlog",this.entries,B,dojox.off.STORAGE_NAMESPACE)
}catch(C){console.debug("dojox.off.sync._save: "+C.message||C);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
D()
}},_load:function(B){var A=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!A){A=[]
}this.entries=A;
B()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
}if(!dojo._hasResource["dojox.off._common"]){dojo._hasResource["dojox.off._common"]=true;
dojo.provide("dojox.off._common");
dojo.mixin(dojox.off,{isOnline:false,NET_CHECK:5,STORAGE_NAMESPACE:"_dot",enabled:true,availabilityURL:dojo.moduleUrl("dojox","off/network_check.txt"),goingOnline:false,coreOpFailed:false,doNetChecking:true,hasOfflineCache:null,browserRestart:false,_STORAGE_APP_NAME:window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),_initializeCalled:false,_storageLoaded:false,_pageLoaded:false,onLoad:function(){},onNetwork:function(A){},initialize:function(){this._initializeCalled=true;
if(this._storageLoaded&&this._pageLoaded){this._onLoad()
}},goOffline:function(){if((dojox.off.sync.isSyncing)||(this.goingOnline)){return 
}this.goingOnline=false;
this.isOnline=false
},goOnline:function(A){if(dojox.off.sync.isSyncing||dojox.off.goingOnline){return 
}this.goingOnline=true;
this.isOnline=false;
this._isSiteAvailable(A)
},onFrameworkEvent:function(B,A){if(B=="save"){if(A.isCoreSave&&(A.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(B=="coreOperationFailed"){dojox.off.coreOpFailed=true;
dojox.off.enabled=false
}}},_checkOfflineCacheAvailable:function(A){this.hasOfflineCache=dojo.isGears;
A()
},_onLoad:function(){dojox.off.files.cache(dojo.moduleUrl("dojo","dojo.js"));
this._cacheDojoResources();
dojox.off.files.cache(dojox.storage.manager.getResourceList());
dojox.off.files._slurp();
this._checkOfflineCacheAvailable(dojo.hitch(this,"_onOfflineCacheChecked"))
},_onOfflineCacheChecked:function(){if(this.hasOfflineCache&&this.enabled){this._load(dojo.hitch(this,"_finishStartingUp"))
}else{if(this.hasOfflineCache&&!this.enabled){this._finishStartingUp()
}else{this._keepCheckingUntilInstalled()
}}},_keepCheckingUntilInstalled:function(){this._finishStartingUp()
},_finishStartingUp:function(){if(!this.hasOfflineCache){this.onLoad()
}else{if(this.enabled){this._startNetworkThread();
this.goOnline(dojo.hitch(this,function(){dojox.off.onLoad()
}))
}else{if(this.coreOpFailed){this.onFrameworkEvent("coreOperationFailed")
}else{this.onLoad()
}}}},_onPageLoad:function(){this._pageLoaded=true;
if(this._storageLoaded&&this._initializeCalled){this._onLoad()
}},_onStorageLoad:function(){this._storageLoaded=true;
if(!dojox.storage.manager.isAvailable()&&dojox.storage.manager.isInitialized()){this.coreOpFailed=true;
this.enabled=false
}if(this._pageLoaded&&this._initializeCalled){this._onLoad()
}},_isSiteAvailable:function(A){dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(B){this.goingOnline=false;
this.isOnline=false;
if(A){A(false)
}}),load:dojo.hitch(this,function(B){this.goingOnline=false;
this.isOnline=true;
if(A){A(true)
}else{this.onNetwork("online")
}})})
},_startNetworkThread:function(){if(!this.doNetChecking){return 
}window.setInterval(dojo.hitch(this,function(){var A=dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(B){if(this.isOnline){this.isOnline=false;
try{if(typeof A.ioArgs.xhr.abort=="function"){A.ioArgs.xhr.abort()
}}catch(C){}dojox.off.sync.isSyncing=false;
this.onNetwork("offline")
}}),load:dojo.hitch(this,function(B){if(!this.isOnline){this.isOnline=true;
this.onNetwork("online")
}})})
}),this.NET_CHECK*1000)
},_getAvailabilityURL:function(){var A=this.availabilityURL.toString();
if(A.indexOf("?")==-1){A+="?"
}else{A+="&"
}A+="browserbust="+new Date().getTime();
return A
},_onOfflineCacheInstalled:function(){this.onFrameworkEvent("offlineCacheInstalled")
},_cacheDojoResources:function(){var B=true;
dojo.forEach(dojo.query("script"),function(C){var D=C.getAttribute("src");
if(!D){return 
}if(D.indexOf("_base/_loader/bootstrap.js")!=-1){B=false
}});
if(!B){dojox.off.files.cache(dojo.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var A=0;
A<dojo._loadedUrls.length;
A++){dojox.off.files.cache(dojo._loadedUrls[A])
}},_save:function(){},_load:function(A){dojox.off.sync._load(A)
}});
dojox.storage.manager.addOnLoad(dojo.hitch(dojox.off,"_onStorageLoad"));
dojo.addOnLoad(dojox.off,"_onPageLoad")
}if(!dojo._hasResource["dojox.off"]){dojo._hasResource["dojox.off"]=true;
dojo.provide("dojox.off")
}if(!dojo._hasResource["dojox.off.ui"]){dojo._hasResource["dojox.off.ui"]=true;
dojo.provide("dojox.off.ui");
dojo.mixin(dojox.off.ui,{appName:"setme",autoEmbed:true,autoEmbedID:"dot-widget",runLink:window.location.href,runLinkTitle:"Run Application",learnHowPath:dojo.moduleUrl("dojox","off/resources/learnhow.html"),customLearnHowPath:false,htmlTemplatePath:dojo.moduleUrl("dojox","off/resources/offline-widget.html").uri,cssTemplatePath:dojo.moduleUrl("dojox","off/resources/offline-widget.css").uri,onlineImagePath:dojo.moduleUrl("dojox","off/resources/greenball.png").uri,offlineImagePath:dojo.moduleUrl("dojox","off/resources/redball.png").uri,rollerImagePath:dojo.moduleUrl("dojox","off/resources/roller.gif").uri,checkmarkImagePath:dojo.moduleUrl("dojox","off/resources/checkmark.png").uri,learnHowJSPath:dojo.moduleUrl("dojox","off/resources/learnhow.js").uri,_initialized:false,onLoad:function(){},_initialize:function(){if(this._validateAppName(this.appName)==false){alert("You must set dojox.off.ui.appName; it can only contain letters, numbers, and spaces; right now it is incorrectly set to '"+dojox.off.ui.appName+"'");
dojox.off.enabled=false;
return 
}this.runLinkText="Run "+this.appName;
dojo.connect(dojox.off,"onNetwork",this,"_onNetwork");
dojo.connect(dojox.off.sync,"onSync",this,"_onSync");
dojox.off.files.cache([this.htmlTemplatePath,this.cssTemplatePath,this.onlineImagePath,this.offlineImagePath,this.rollerImagePath,this.checkmarkImagePath]);
if(this.autoEmbed){this._doAutoEmbed()
}},_doAutoEmbed:function(){dojo.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(A){dojox.off.enabled=false;
A=A.message||A;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+A)
},load:dojo.hitch(this,this._templateLoaded)})
},_templateLoaded:function(C){var A=dojo.byId(this.autoEmbedID);
if(A){A.innerHTML=C
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var B=dojo.byId("dot-widget-browser-restart");
if(B){B.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(A){this._onNetwork(A?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var C=dojo.byId("dot-widget-network-indicator-online");
var A=dojo.byId("dot-widget-network-indicator-offline");
var B=dojo.byId("dot-widget-title-text");
if(C&&A){if(dojox.off.isOnline==true){C.style.display="inline";
A.style.display="none"
}else{C.style.display="none";
A.style.display="inline"
}}if(B){if(dojox.off.isOnline){B.innerHTML="Online"
}else{B.innerHTML="Offline"
}}},_initLearnHow:function(){var C=dojo.byId("dot-widget-learn-how-link");
if(!C){return 
}if(!this.customLearnHowPath){var B=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(B);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}C.setAttribute("href",this.learnHowPath);
var A=dojo.byId("dot-widget-learn-how-app-name");
if(!A){return 
}A.innerHTML="";
A.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(A){if(!A){return false
}return(/^[a-z0-9 ]*$/i.test(A))
},_updateSyncUI:function(){var D=dojo.byId("dot-roller");
var E=dojo.byId("dot-success-checkmark");
var B=dojo.byId("dot-sync-messages");
var A=dojo.byId("dot-sync-details");
var C=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(D){D.style.display="inline"
}if(E){E.style.display="none"
}if(B){dojo.removeClass(B,"dot-sync-error")
}if(A){A.style.display="none"
}if(C){C.style.display="inline"
}}else{if(D){D.style.display="none"
}if(C){C.style.display="none"
}if(B){dojo.removeClass(B,"dot-sync-error")
}}},_setSyncMessage:function(A){var B=dojo.byId("dot-sync-messages");
if(B){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(A))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var D=dojo.byId("dot-widget-network-indicator-online");
if(D){D.setAttribute("src",this.onlineImagePath)
}var A=dojo.byId("dot-widget-network-indicator-offline");
if(A){A.setAttribute("src",this.offlineImagePath)
}var B=dojo.byId("dot-roller");
if(B){B.setAttribute("src",this.rollerImagePath)
}var C=dojo.byId("dot-success-checkmark");
if(C){C.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(B){B.preventDefault();
B.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var D="";
D+="<html><head><title>Sync Details</title><head><body>";
D+="<h1>Sync Details</h1>\n";
D+="<ul>\n";
for(var C=0;
C<dojox.off.sync.details.length;
C++){D+="<li>";
D+=dojox.off.sync.details[C];
D+="</li>"
}D+="</ul>\n";
D+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
D+="</body></html>";
var E="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var A=window.open("","SyncDetails",E);
if(!A){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}A.document.open();
A.document.write(D);
A.document.close();
if(A.focus){A.focus()
}},_cancel:function(A){A.preventDefault();
A.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var C=dojo.byId("dot-widget-browser-restart");
if(C){dojo.addClass(C,"dot-needs-browser-restart")
}var A=dojo.byId("dot-widget-browser-restart-app-name");
if(A){A.innerHTML="";
A.appendChild(document.createTextNode(this.appName))
}var B=dojo.byId("dot-sync-status");
if(B){B.style.display="none"
}},_showNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.addClass(A,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.removeClass(A,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var B=dojo.byId("dot-sync-details-button");
if(B){dojo.connect(B,"onclick",this,this._showDetails)
}var A=dojo.byId("dot-sync-cancel-button");
if(A){dojo.connect(A,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(B){var A=[];
A.push(dojo.byId("dot-sync-status"));
for(var C=0;
C<A.length;
C++){if(A[C]){A[C].style.visibility=(B?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var C=dojo.byId("dot-success-checkmark");
var A=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(C){C.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(C){C.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var B=dojo.byId("dot-sync-messages");
if(B){dojo.addClass(B,"dot-sync-error")
}if(C){C.style.display="none"
}}}if(dojox.off.sync.details.length&&A){A.style.display="inline"
}},_onFrameworkEvent:function(C,A){if(C=="save"){if(A.status==dojox.storage.FAILED&&!A.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(C=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(C=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var B=dojo.byId("dot-widget-browser-restart");
if(B){B.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(A){switch(A){case"start":this._updateSyncUI();
break;
case"refreshFiles":this._setSyncMessage("Downloading UI...");
break;
case"upload":this._setSyncMessage("Uploading new data...");
break;
case"download":this._setSyncMessage("Downloading new data...");
break;
case"finished":this._syncFinished();
break;
case"cancel":this._setSyncMessage("Canceling Sync...");
break;
default:dojo.warn("Programming error: Unknown sync type in dojox.off.ui: "+A);
break
}},_onNetwork:function(B){if(!this._initialized){return 
}this._updateNetIndicator();
if(B=="offline"){this._setSyncMessage("You are working offline");
var A=dojo.byId("dot-sync-details");
if(A){A.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}if(!dojo._hasResource["dojox.off.offline"]){dojo._hasResource["dojox.off.offline"]=true;
dojo.provide("dojox.off.offline")
};