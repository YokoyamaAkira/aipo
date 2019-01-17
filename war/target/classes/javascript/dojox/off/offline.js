if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(D,C,B,A){console.warn("dojox.storage.put not implemented")
},get:function(B,A){console.warn("dojox.storage.get not implemented")
},hasKey:function(B,A){return(this.get(B)!=null)
},getKeys:function(A){console.warn("dojox.storage.getKeys not implemented")
},clear:function(A){console.warn("dojox.storage.clear not implemented")
},remove:function(B,A){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(B,A,D,C){console.warn("dojox.storage.putMultiple not implemented")
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
this.register=function(_18,_19){this._providers[this._providers.length]=_19;
this._providers[_18]=_19
};
this.setProvider=function(_1a){};
this.autodetect=function(){if(this._initialized){return 
}var _1b=djConfig.forceStorageProvider||false;
var _1c;
for(var i=0;
i<this._providers.length;
i++){_1c=this._providers[i];
if(_1b==_1c.declaredClass){_1c.isAvailable();
break
}else{if(_1c.isAvailable()){break
}}}if(!_1c){this._initialized=true;
this.available=false;
this.currentProvider=null;
console.warn("No storage provider found for this platform");
this.loaded();
return 
}this.currentProvider=_1c;
dojo.mixin(dojox.storage,this.currentProvider);
dojox.storage.initialize();
this._initialized=true;
this.available=true
};
this.isAvailable=function(){return this.available
};
this.addOnLoad=function(_1e){this._onLoadListeners.push(_1e);
if(this.isInitialized()){this._fireLoaded()
}};
this.removeOnLoad=function(_1f){for(var i=0;
i<this._onLoadListeners.length;
i++){if(_1f==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);
break
}}};
this.isInitialized=function(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false
}else{return this._initialized
}};
this.supportsProvider=function(_21){try{var _22=eval("new "+_21+"()");
var _23=_22.isAvailable();
if(!_23){return false
}return _23
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
this.getResourceList=function(){var _25=[];
dojo.forEach(dojox.storage.manager._providers,function(_26){_25=_25.concat(_26.getResourceList())
});
return _25
}
}
}if(!dojo._hasResource["dojox._sql._crypto"]){dojo._hasResource["dojox._sql._crypto"]=true;
dojo.provide("dojox._sql._crypto");
dojo.mixin(dojox._sql._crypto,{_POOL_SIZE:100,encrypt:function(C,B,A){this._initWorkerPool();
var D={plaintext:C,password:B};
D=dojo.toJson(D);
D="encr:"+String(D);
this._assignWork(D,A)
},decrypt:function(C,B,A){this._initWorkerPool();
var D={ciphertext:C,password:B};
D=dojo.toJson(D);
D="decr:"+String(D);
this._assignWork(D,A)
},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");
this._unemployed=[];
this._employed={};
this._handleMessage=[];
var A=this;
this._manager.onmessage=function(I,H){var G=A._employed["_"+H];
A._employed["_"+H]=undefined;
A._unemployed.push("_"+H);
if(A._handleMessage.length){var F=A._handleMessage.shift();
A._assignWork(F.msg,F.callback)
}G(I)
};
var E="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var D=E+" _workerInit();";
for(var B=0;
B<this._POOL_SIZE;
B++){this._unemployed.push("_"+this._manager.createWorker(D))
}}catch(C){throw C.message||C
}}},_assignWork:function(C,B){if(!this._handleMessage.length&&this._unemployed.length){var A=this._unemployed.shift().substring(1);
this._employed["_"+A]=B;
this._manager.sendMessage(C,A)
}else{this._handleMessage={msg:C,callback:B}
}},_workerHandler:function(msg,_3b){var _3c=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var _3d=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];
function Cipher(_3e,w){var Nb=4;
var Nr=w.length/Nb-1;
var _42=[[],[],[],[]];
for(var i=0;
i<4*Nb;
i++){_42[i%4][Math.floor(i/4)]=_3e[i]
}_42=AddRoundKey(_42,w,0,Nb);
for(var _44=1;
_44<Nr;
_44++){_42=SubBytes(_42,Nb);
_42=ShiftRows(_42,Nb);
_42=MixColumns(_42,Nb);
_42=AddRoundKey(_42,w,_44,Nb)
}_42=SubBytes(_42,Nb);
_42=ShiftRows(_42,Nb);
_42=AddRoundKey(_42,w,Nr,Nb);
var _45=new Array(4*Nb);
for(var i=0;
i<4*Nb;
i++){_45[i]=_42[i%4][Math.floor(i/4)]
}return _45
}function SubBytes(s,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){s[r][c]=_3c[s[r][c]]
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
}function AddRoundKey(_55,w,rnd,Nb){for(var r=0;
r<4;
r++){for(var c=0;
c<Nb;
c++){_55[r][c]^=w[rnd*4+c][r]
}}return _55
}function KeyExpansion(key){var Nb=4;
var Nk=key.length/4;
var Nr=Nk+6;
var w=new Array(Nb*(Nr+1));
var _60=new Array(4);
for(var i=0;
i<Nk;
i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];
w[i]=r
}for(var i=Nk;
i<(Nb*(Nr+1));
i++){w[i]=new Array(4);
for(var t=0;
t<4;
t++){_60[t]=w[i-1][t]
}if(i%Nk==0){_60=SubWord(RotWord(_60));
for(var t=0;
t<4;
t++){_60[t]^=_3d[i/Nk][t]
}}else{if(Nk>6&&i%Nk==4){_60=SubWord(_60)
}}for(var t=0;
t<4;
t++){w[i][t]=w[i-Nk][t]^_60[t]
}}return w
}function SubWord(w){for(var i=0;
i<4;
i++){w[i]=_3c[w[i]]
}return w
}function RotWord(w){w[4]=w[0];
for(var i=0;
i<4;
i++){w[i]=w[i+1]
}return w
}function AESEncryptCtr(_68,_69,_6a){if(!(_6a==128||_6a==192||_6a==256)){return""
}var _6b=_6a/8;
var _6c=new Array(_6b);
for(var i=0;
i<_6b;
i++){_6c[i]=_69.charCodeAt(i)&255
}var key=Cipher(_6c,KeyExpansion(_6c));
key=key.concat(key.slice(0,_6b-16));
var _6f=16;
var _70=new Array(_6f);
var _71=(new Date()).getTime();
for(var i=0;
i<4;
i++){_70[i]=(_71>>>i*8)&255
}for(var i=0;
i<4;
i++){_70[i+4]=(_71/4294967296>>>i*8)&255
}var _72=KeyExpansion(key);
var _73=Math.ceil(_68.length/_6f);
var _74=new Array(_73);
for(var b=0;
b<_73;
b++){for(var c=0;
c<4;
c++){_70[15-c]=(b>>>c*8)&255
}for(var c=0;
c<4;
c++){_70[15-c-4]=(b/4294967296>>>c*8)
}var _77=Cipher(_70,_72);
var _78=b<_73-1?_6f:(_68.length-1)%_6f+1;
var ct="";
for(var i=0;
i<_78;
i++){var _7a=_68.charCodeAt(b*_6f+i);
var _7b=_7a^_77[i];
ct+=String.fromCharCode(_7b)
}_74[b]=escCtrlChars(ct)
}var _7c="";
for(var i=0;
i<8;
i++){_7c+=String.fromCharCode(_70[i])
}_7c=escCtrlChars(_7c);
return _7c+"-"+_74.join("-")
}function AESDecryptCtr(_7d,_7e,_7f){if(!(_7f==128||_7f==192||_7f==256)){return""
}var _80=_7f/8;
var _81=new Array(_80);
for(var i=0;
i<_80;
i++){_81[i]=_7e.charCodeAt(i)&255
}var _83=KeyExpansion(_81);
var key=Cipher(_81,_83);
key=key.concat(key.slice(0,_80-16));
var _85=KeyExpansion(key);
_7d=_7d.split("-");
var _86=16;
var _87=new Array(_86);
var _88=unescCtrlChars(_7d[0]);
for(var i=0;
i<8;
i++){_87[i]=_88.charCodeAt(i)
}var _89=new Array(_7d.length-1);
for(var b=1;
b<_7d.length;
b++){for(var c=0;
c<4;
c++){_87[15-c]=((b-1)>>>c*8)&255
}for(var c=0;
c<4;
c++){_87[15-c-4]=((b/4294967296-1)>>>c*8)&255
}var _8c=Cipher(_87,_85);
_7d[b]=unescCtrlChars(_7d[b]);
var pt="";
for(var i=0;
i<_7d[b].length;
i++){var _8e=_7d[b].charCodeAt(i);
var _8f=_8e^_8c[i];
pt+=String.fromCharCode(_8f)
}_89[b-1]=pt
}return _89.join("")
}function escCtrlChars(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return"!"+c.charCodeAt(0)+"!"
})
}function unescCtrlChars(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1))
})
}function encrypt(_94,_95){return AESEncryptCtr(_94,_95,256)
}function decrypt(_96,_97){return AESDecryptCtr(_96,_97,256)
}var cmd=msg.substr(0,4);
var arg=msg.substr(5);
if(cmd=="encr"){arg=eval("("+arg+")");
var _9a=arg.plaintext;
var _9b=arg.password;
var _9c=encrypt(_9a,_9b);
gearsWorkerPool.sendMessage(String(_9c),_3b)
}else{if(cmd=="decr"){arg=eval("("+arg+")");
var _9d=arg.ciphertext;
var _9b=arg.password;
var _9c=decrypt(_9d,_9b);
gearsWorkerPool.sendMessage(String(_9c),_3b)
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
}},_exec:function(H){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var I=null;
var G=null;
var F=null;
var E=dojo._toArray(H);
I=E.splice(0,1)[0];
if(this._needsEncrypt(I)||this._needsDecrypt(I)){G=E.splice(E.length-1,1)[0];
F=E.splice(E.length-1,1)[0]
}if(this.debug){this._printDebugSQL(I,E)
}if(this._needsEncrypt(I)){var D=new dojox.sql._SQLCrypto("encrypt",I,F,E,G);
return 
}else{if(this._needsDecrypt(I)){var D=new dojox.sql._SQLCrypto("decrypt",I,F,E,G);
return 
}}var B=this.db.execute(I,E);
B=this._normalizeResults(B);
if(this._autoClose){this.close()
}return B
}catch(A){A=A.message||A;
console.debug("SQL Exception: "+A);
if(this._autoClose){try{this.close()
}catch(C){console.debug("Error closing database: "+C.message||C)
}}throw A
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
},_normalizeResults:function(B){var A=[];
if(!B){return[]
}while(B.isValidRow()){var F={};
for(var C=0;
C<B.fieldCount();
C++){var D=B.fieldName(C);
var E=B.field(C);
F[D]=E
}A.push(F);
B.next()
}B.close();
return A
},_needsEncrypt:function(A){return/encrypt\([^\)]*\)/i.test(A)
},_needsDecrypt:function(A){return/decrypt\([^\)]*\)/i.test(A)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(D,E,C,B,A){if(D=="encrypt"){this._execEncryptSQL(E,C,B,A)
}else{this._execDecryptSQL(E,C,B,A)
}},_execEncryptSQL:function(G,B,F,E){var D=this._stripCryptoSQL(G);
var C=this._flagEncryptedArgs(G,F);
var A=this;
this._encrypt(D,B,F,C,function(N){var H=false;
var M=[];
var L=null;
try{M=dojox.sql.db.execute(D,N)
}catch(I){H=true;
L=I.message||I
}if(L!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(K){}}E(null,true,L.toString());
return 
}M=dojox.sql._normalizeResults(M);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(G)){var J=A._determineDecryptedColumns(G);
A._decrypt(M,J,B,function(O){E(O,false,null)
})
}else{E(M,false,null)
}})
},_execDecryptSQL:function(J,G,F,E){var C=this._stripCryptoSQL(J);
var K=this._determineDecryptedColumns(J);
var I=false;
var H=[];
var A=null;
try{H=dojox.sql.db.execute(C,F)
}catch(D){I=true;
A=D.message||D
}if(A!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(B){}}E(H,true,A.toString());
return 
}H=dojox.sql._normalizeResults(H);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(H,K,G,function(L){E(L,false,null)
})
},_encrypt:function(G,C,B,A,H){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=B;
for(var D=0;
D<B.length;
D++){if(A[D]){var F=B[D];
var E=D;
this._totalCrypto++;
dojox._sql._crypto.encrypt(F,C,dojo.hitch(this,function(I){this._finalArgs[E]=I;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){H(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(E,D,G,F){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=E;
for(var C=0;
C<E.length;
C++){var H=E[C];
for(var B in H){if(D=="*"||D[B]){this._totalCrypto++;
var A=H[B];
this._decryptSingleColumn(B,A,G,C,function(I){F(I)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(F){F=F.replace(/DECRYPT\(\*\)/ig,"*");
var B=F.match(/ENCRYPT\([^\)]*\)/ig);
if(B!=null){for(var C=0;
C<B.length;
C++){var A=B[C];
var G=A.match(/ENCRYPT\(([^\)]*)\)/i)[1];
F=F.replace(A,G)
}}B=F.match(/DECRYPT\([^\)]*\)/ig);
if(B!=null){for(var C=0;
C<B.length;
C++){var E=B[C];
var D=E.match(/DECRYPT\(([^\)]*)\)/i)[1];
F=F.replace(E,D)
}}return F
},_flagEncryptedArgs:function(G,C){var H=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var F;
var E=0;
var D=[];
while((F=H.exec(G))!=null){var B=RegExp.lastMatch+"";
if(/^[\"\']/.test(B)){continue
}var A=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){A=true
}D[E]=A;
E++
}return D
},_determineDecryptedColumns:function(F){var E={};
if(/DECRYPT\(\*\)/i.test(F)){E="*"
}else{var D=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var C;
while(C=D.exec(F)){var B=new String(RegExp.lastMatch);
var A=B.replace(/DECRYPT\(/i,"");
A=A.replace(/\)/,"");
A=A.split(/\s*,\s*/);
dojo.forEach(A,function(G){if(/\s*\w* AS (\w*)/i.test(G)){G=G.match(/\s*\w* AS (\w*)/i)[1]
}E[G]=true
})
}}return E
},_decryptSingleColumn:function(E,D,C,B,A){dojox._sql._crypto.decrypt(D,C,dojo.hitch(this,function(F){this._finalResultSet[B][E]=F;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){A(this._finalResultSet)
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
},put:function(A,E,C,B){if(this.isValidKey(A)==false){throw new Error("Invalid key given: "+A)
}B=B||this.DEFAULT_NAMESPACE;
if(dojo.isString(E)){E="string:"+E
}else{E=dojo.toJson(E)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",B,A);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",B,A,E)
}catch(D){console.debug("dojox.storage.GearsStorageProvider.put:",D);
C(this.FAILED,A,D.toString());
return 
}if(C){C(dojox.storage.SUCCESS,A,null)
}},get:function(C,B){if(this.isValidKey(C)==false){throw new Error("Invalid key given: "+C)
}B=B||this.DEFAULT_NAMESPACE;
var A=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",B,C);
if(!A.length){return null
}else{A=A[0].value
}if(dojo.isString(A)&&(/^string:/.test(A))){A=A.substring("string:".length)
}else{A=dojo.fromJson(A)
}return A
},getNamespaces:function(){var B=[dojox.storage.DEFAULT_NAMESPACE];
var A=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var C=0;
C<A.length;
C++){if(A[C].namespace!=dojox.storage.DEFAULT_NAMESPACE){B.push(A[C].namespace)
}}return B
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
},putMultiple:function(D,F,H,E){if(this.isValidKeyArray(D)===false||!F instanceof Array||D.length!=F.length){throw new Error("Invalid arguments: keys = ["+D+"], values = ["+F+"]")
}if(E==null||typeof E=="undefined"){E=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(E)==false){throw new Error("Invalid namespace given: "+E)
}this._statusHandler=H;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var C="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var B=0;
B<D.length;
B++){var A=F[B];
if(dojo.isString(A)){A="string:"+A
}else{A=dojo.toJson(A)
}dojox.sql.db.execute(C,[E,D[B],A])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(G){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",G);
if(H){H(this.FAILED,D,G.toString())
}return 
}if(H){H(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(F,C){if(this.isValidKeyArray(F)===false){throw new ("Invalid key array given: "+F)
}if(C==null||typeof C=="undefined"){C=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(C)==false){throw new Error("Invalid namespace given: "+C)
}var B="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var A=[];
for(var E=0;
E<F.length;
E++){var D=dojox.sql(B,C,F[E]);
if(!D.length){A[E]=null
}else{D=D[0].value;
if(dojo.isString(D)&&(/^string:/.test(D))){A[E]=D.substring("string:".length)
}else{A[E]=dojo.fromJson(D)
}}}return A
},removeMultiple:function(D,B){B=B||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var A="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var C=0;
C<D.length;
C++){dojox.sql.db.execute(A,[B,D[C]])
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
},cache:function(B){if(dojo.isString(B)){var A=this._trimAnchor(B+"");
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}}else{if(B instanceof dojo._Url){var A=this._trimAnchor(B.uri);
if(!this.isAvailable(A)){this.listOfURLs.push(A)
}}else{dojo.forEach(B,function(C){C=this._trimAnchor(C);
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
},refresh:function(A){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(D,C,E){if(djConfig.isDebug||!C||E||!D||D!=C){console.warn("Refreshing offline file list");
this._doRefresh(A,C)
}else{console.warn("No need to refresh offline file list");
A(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(A)
}}catch(B){this.refreshing=false;
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
dojo.forEach(document.styleSheets,function(B){try{if(B.cssRules){dojo.forEach(B.cssRules,function(J){var K=J.cssText;
if(K){var I=K.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!I){return 
}for(var H=1;
H<I.length;
H++){A(I[H])
}}})
}else{if(B.cssText){var E;
var G=B.cssText.toString();
var D=G.split(/\f|\r|\n/);
for(var C=0;
C<D.length;
C++){E=D[C].match(/url\(\s*([^\) ]*)\s*\)/i);
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
},_doRefresh:function(F,E){var D;
try{D=google.gears.factory.create("beta.localserver","1.0")
}catch(G){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var B="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
D.removeStore(B);
D.openStore(B);
var C=D.createStore(B);
this._store=C;
var A=this;
this._currentFileIndex=0;
this._cancelID=C.capture(this.listOfURLs,function(I,H,K){if(!H&&A.refreshing){A._cancelID=null;
A.refreshing=false;
var J=[];
J.push("Unable to capture: "+I);
F(true,J);
return 
}else{if(H){A._currentFileIndex++
}}if(H&&A._currentFileIndex>=A.listOfURLs.length){A._cancelID=null;
A.refreshing=false;
if(E){dojox.storage.put("oldVersion",E,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
F(false,[])
}})
},_getVersionInfo:function(D){var C=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var B=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var A=null;
D=dojo.hitch(this,D);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(E){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
D(B,A,C)
},load:function(E){if(E){A=E
}D(B,A,C)
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
dojox.off.files.refresh(dojo.hitch(this,function(B,C){if(B){this.error=true;
this.successful=false;
for(var A=0;
A<C.length;
A++){this.details.push(C[A])
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
},_save:function(C){if(!C){C=function(){}
}try{var A=this;
var B=function(G,F,E){if(G==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:F,value:E,namespace:dojox.off.STORAGE_NAMESPACE});
C()
}else{if(G==dojox.storage.SUCCESS){C()
}}};
dojox.storage.put("actionlog",this.entries,B,dojox.off.STORAGE_NAMESPACE)
}catch(D){console.debug("dojox.off.sync._save: "+D.message||D);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
C()
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
},_templateLoaded:function(C){var B=dojo.byId(this.autoEmbedID);
if(B){B.innerHTML=C
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var A=dojo.byId("dot-widget-browser-restart");
if(A){A.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(A){this._onNetwork(A?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var B=dojo.byId("dot-widget-network-indicator-online");
var A=dojo.byId("dot-widget-network-indicator-offline");
var C=dojo.byId("dot-widget-title-text");
if(B&&A){if(dojox.off.isOnline==true){B.style.display="inline";
A.style.display="none"
}else{B.style.display="none";
A.style.display="inline"
}}if(C){if(dojox.off.isOnline){C.innerHTML="Online"
}else{C.innerHTML="Offline"
}}},_initLearnHow:function(){var A=dojo.byId("dot-widget-learn-how-link");
if(!A){return 
}if(!this.customLearnHowPath){var C=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(C);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}A.setAttribute("href",this.learnHowPath);
var B=dojo.byId("dot-widget-learn-how-app-name");
if(!B){return 
}B.innerHTML="";
B.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(A){if(!A){return false
}return(/^[a-z0-9 ]*$/i.test(A))
},_updateSyncUI:function(){var E=dojo.byId("dot-roller");
var D=dojo.byId("dot-success-checkmark");
var C=dojo.byId("dot-sync-messages");
var B=dojo.byId("dot-sync-details");
var A=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(E){E.style.display="inline"
}if(D){D.style.display="none"
}if(C){dojo.removeClass(C,"dot-sync-error")
}if(B){B.style.display="none"
}if(A){A.style.display="inline"
}}else{if(E){E.style.display="none"
}if(A){A.style.display="none"
}if(C){dojo.removeClass(C,"dot-sync-error")
}}},_setSyncMessage:function(A){var B=dojo.byId("dot-sync-messages");
if(B){while(B.firstChild){B.removeChild(B.firstChild)
}B.appendChild(document.createTextNode(A))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var D=dojo.byId("dot-widget-network-indicator-online");
if(D){D.setAttribute("src",this.onlineImagePath)
}var C=dojo.byId("dot-widget-network-indicator-offline");
if(C){C.setAttribute("src",this.offlineImagePath)
}var B=dojo.byId("dot-roller");
if(B){B.setAttribute("src",this.rollerImagePath)
}var A=dojo.byId("dot-success-checkmark");
if(A){A.setAttribute("src",this.checkmarkImagePath)
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
var A="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var E=window.open("","SyncDetails",A);
if(!E){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}E.document.open();
E.document.write(D);
E.document.close();
if(E.focus){E.focus()
}},_cancel:function(A){A.preventDefault();
A.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var C=dojo.byId("dot-widget-browser-restart");
if(C){dojo.addClass(C,"dot-needs-browser-restart")
}var B=dojo.byId("dot-widget-browser-restart-app-name");
if(B){B.innerHTML="";
B.appendChild(document.createTextNode(this.appName))
}var A=dojo.byId("dot-sync-status");
if(A){A.style.display="none"
}},_showNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.addClass(A,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.removeClass(A,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var B=dojo.byId("dot-sync-details-button");
if(B){dojo.connect(B,"onclick",this,this._showDetails)
}var A=dojo.byId("dot-sync-cancel-button");
if(A){dojo.connect(A,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(C){var B=[];
B.push(dojo.byId("dot-sync-status"));
for(var A=0;
A<B.length;
A++){if(B[A]){B[A].style.visibility=(C?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var A=dojo.byId("dot-success-checkmark");
var C=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(A){A.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(A){A.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var B=dojo.byId("dot-sync-messages");
if(B){dojo.addClass(B,"dot-sync-error")
}if(A){A.style.display="none"
}}}if(dojox.off.sync.details.length&&C){C.style.display="inline"
}},_onFrameworkEvent:function(C,B){if(C=="save"){if(B.status==dojox.storage.FAILED&&!B.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(C=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(C=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var A=dojo.byId("dot-widget-browser-restart");
if(A){A.style.display="none"
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
}},_onNetwork:function(A){if(!this._initialized){return 
}this._updateNetIndicator();
if(A=="offline"){this._setSyncMessage("You are working offline");
var B=dojo.byId("dot-sync-details");
if(B){B.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}if(!dojo._hasResource["dojox.off.offline"]){dojo._hasResource["dojox.off.offline"]=true;
dojo.provide("dojox.off.offline")
};