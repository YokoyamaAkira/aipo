if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(C,B,A,D){console.warn("dojox.storage.put not implemented")
},get:function(A,B){console.warn("dojox.storage.get not implemented")
},hasKey:function(A,B){return(this.get(A)!=null)
},getKeys:function(A){console.warn("dojox.storage.getKeys not implemented")
},clear:function(A){console.warn("dojox.storage.clear not implemented")
},remove:function(A,B){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(A,D,C,B){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(A,B){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(A,B){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(A){if(A===null||typeof A==="undefined"||!A instanceof Array){return false
}for(var B=0;
B<A.length;
B++){if(!this.isValidKey(A[B])){return false
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
var E=this;
this._manager.onmessage=function(F,I){var H=E._employed["_"+I];
E._employed["_"+I]=undefined;
E._unemployed.push("_"+I);
if(E._handleMessage.length){var G=E._handleMessage.shift();
E._assignWork(G.msg,G.callback)
}H(F)
};
var D="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var C=D+" _workerInit();";
for(var A=0;
A<this._POOL_SIZE;
A++){this._unemployed.push("_"+this._manager.createWorker(C))
}}catch(B){throw B.message||B
}}},_assignWork:function(B,A){if(!this._handleMessage.length&&this._unemployed.length){var C=this._unemployed.shift().substring(1);
this._employed["_"+C]=A;
this._manager.sendMessage(B,C)
}else{this._handleMessage={msg:B,callback:A}
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
}},_exec:function(D){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var E=null;
var C=null;
var B=null;
var A=dojo._toArray(D);
E=A.splice(0,1)[0];
if(this._needsEncrypt(E)||this._needsDecrypt(E)){C=A.splice(A.length-1,1)[0];
B=A.splice(A.length-1,1)[0]
}if(this.debug){this._printDebugSQL(E,A)
}if(this._needsEncrypt(E)){var I=new dojox.sql._SQLCrypto("encrypt",E,B,A,C);
return 
}else{if(this._needsDecrypt(E)){var I=new dojox.sql._SQLCrypto("decrypt",E,B,A,C);
return 
}}var G=this.db.execute(E,A);
G=this._normalizeResults(G);
if(this._autoClose){this.close()
}return G
}catch(F){F=F.message||F;
console.debug("SQL Exception: "+F);
if(this._autoClose){try{this.close()
}catch(H){console.debug("Error closing database: "+H.message||H)
}}throw F
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(A){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(B,C){var A='dojox.sql("'+B+'"';
for(var D=0;
D<C.length;
D++){if(typeof C[D]=="string"){A+=', "'+C[D]+'"'
}else{A+=", "+C[D]
}}A+=")";
console.debug(A)
},_normalizeResults:function(A){var F=[];
if(!A){return[]
}while(A.isValidRow()){var E={};
for(var B=0;
B<A.fieldCount();
B++){var C=A.fieldName(B);
var D=A.field(B);
E[C]=D
}F.push(E);
A.next()
}A.close();
return F
},_needsEncrypt:function(A){return/encrypt\([^\)]*\)/i.test(A)
},_needsDecrypt:function(A){return/decrypt\([^\)]*\)/i.test(A)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(C,D,B,A,E){if(C=="encrypt"){this._execEncryptSQL(D,B,A,E)
}else{this._execDecryptSQL(D,B,A,E)
}},_execEncryptSQL:function(D,F,C,B){var A=this._stripCryptoSQL(D);
var G=this._flagEncryptedArgs(D,C);
var E=this;
this._encrypt(A,F,C,G,function(J){var K=false;
var I=[];
var H=null;
try{I=dojox.sql.db.execute(A,J)
}catch(L){K=true;
H=L.message||L
}if(H!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(N){}}B(null,true,H.toString());
return 
}I=dojox.sql._normalizeResults(I);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(D)){var M=E._determineDecryptedColumns(D);
E._decrypt(I,M,F,function(O){B(O,false,null)
})
}else{B(I,false,null)
}})
},_execDecryptSQL:function(F,C,B,A){var J=this._stripCryptoSQL(F);
var G=this._determineDecryptedColumns(F);
var E=false;
var D=[];
var H=null;
try{D=dojox.sql.db.execute(J,B)
}catch(K){E=true;
H=K.message||K
}if(H!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(I){}}A(D,true,H.toString());
return 
}D=dojox.sql._normalizeResults(D);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(D,G,C,function(L){A(L,false,null)
})
},_encrypt:function(B,F,E,D,C){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=E;
for(var G=0;
G<E.length;
G++){if(D[G]){var A=E[G];
var H=G;
this._totalCrypto++;
dojox._sql._crypto.encrypt(A,F,dojo.hitch(this,function(I){this._finalArgs[H]=I;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){C(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(H,G,B,A){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=H;
for(var F=0;
F<H.length;
F++){var C=H[F];
for(var E in C){if(G=="*"||G[E]){this._totalCrypto++;
var D=C[E];
this._decryptSingleColumn(E,D,B,F,function(I){A(I)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(C){C=C.replace(/DECRYPT\(\*\)/ig,"*");
var F=C.match(/ENCRYPT\([^\)]*\)/ig);
if(F!=null){for(var G=0;
G<F.length;
G++){var E=F[G];
var D=E.match(/ENCRYPT\(([^\)]*)\)/i)[1];
C=C.replace(E,D)
}}F=C.match(/DECRYPT\([^\)]*\)/ig);
if(F!=null){for(var G=0;
G<F.length;
G++){var B=F[G];
var A=B.match(/DECRYPT\(([^\)]*)\)/i)[1];
C=C.replace(B,A)
}}return C
},_flagEncryptedArgs:function(B,F){var C=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var A;
var H=0;
var G=[];
while((A=C.exec(B))!=null){var E=RegExp.lastMatch+"";
if(/^[\"\']/.test(E)){continue
}var D=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){D=true
}G[H]=D;
H++
}return G
},_determineDecryptedColumns:function(E){var D={};
if(/DECRYPT\(\*\)/i.test(E)){D="*"
}else{var C=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var B;
while(B=C.exec(E)){var A=new String(RegExp.lastMatch);
var F=A.replace(/DECRYPT\(/i,"");
F=F.replace(/\)/,"");
F=F.split(/\s*,\s*/);
dojo.forEach(F,function(G){if(/\s*\w* AS (\w*)/i.test(G)){G=G.match(/\s*\w* AS (\w*)/i)[1]
}D[G]=true
})
}}return D
},_decryptSingleColumn:function(D,C,B,A,E){dojox._sql._crypto.decrypt(C,B,dojo.hitch(this,function(F){this._finalResultSet[A][D]=F;
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
},put:function(E,D,B,A){if(this.isValidKey(E)==false){throw new Error("Invalid key given: "+E)
}A=A||this.DEFAULT_NAMESPACE;
if(dojo.isString(D)){D="string:"+D
}else{D=dojo.toJson(D)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",A,E);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",A,E,D)
}catch(C){console.debug("dojox.storage.GearsStorageProvider.put:",C);
B(this.FAILED,E,C.toString());
return 
}if(B){B(dojox.storage.SUCCESS,E,null)
}},get:function(B,A){if(this.isValidKey(B)==false){throw new Error("Invalid key given: "+B)
}A=A||this.DEFAULT_NAMESPACE;
var C=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",A,B);
if(!C.length){return null
}else{C=C[0].value
}if(dojo.isString(C)&&(/^string:/.test(C))){C=C.substring("string:".length)
}else{C=dojo.fromJson(C)
}return C
},getNamespaces:function(){var A=[dojox.storage.DEFAULT_NAMESPACE];
var C=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var B=0;
B<C.length;
B++){if(C[B].namespace!=dojox.storage.DEFAULT_NAMESPACE){A.push(C[B].namespace)
}}return A
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
},putMultiple:function(G,A,C,H){if(this.isValidKeyArray(G)===false||!A instanceof Array||G.length!=A.length){throw new Error("Invalid arguments: keys = ["+G+"], values = ["+A+"]")
}if(H==null||typeof H=="undefined"){H=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(H)==false){throw new Error("Invalid namespace given: "+H)
}this._statusHandler=C;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var F="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var E=0;
E<G.length;
E++){var D=A[E];
if(dojo.isString(D)){D="string:"+D
}else{D=dojo.toJson(D)
}dojox.sql.db.execute(F,[H,G[E],D])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(B){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",B);
if(C){C(this.FAILED,G,B.toString())
}return 
}if(C){C(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(E,B){if(this.isValidKeyArray(E)===false){throw new ("Invalid key array given: "+E)
}if(B==null||typeof B=="undefined"){B=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(B)==false){throw new Error("Invalid namespace given: "+B)
}var A="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var F=[];
for(var D=0;
D<E.length;
D++){var C=dojox.sql(A,B,E[D]);
if(!C.length){F[D]=null
}else{C=C[0].value;
if(dojo.isString(C)&&(/^string:/.test(C))){F[D]=C.substring("string:".length)
}else{F[D]=dojo.fromJson(C)
}}}return F
},removeMultiple:function(C,A){A=A||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var D="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var B=0;
B<C.length;
B++){dojox.sql.db.execute(D,[A,C[B]])
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
},remove:function(B){for(var A=0;
A<this.listOfURLs.length;
A++){if(this.listOfURLs[A]==B){this.listOfURLs=this.listOfURLs.splice(A,1);
break
}}},isAvailable:function(B){for(var A=0;
A<this.listOfURLs.length;
A++){if(this.listOfURLs[A]==B){return true
}}return false
},refresh:function(B){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(E,D,C){if(djConfig.isDebug||!D||C||!E||E!=D){console.warn("Refreshing offline file list");
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
dojo.query("script").forEach(function(C){try{A(C.getAttribute("src"))
}catch(B){}});
dojo.query("link").forEach(function(C){try{if(!C.getAttribute("rel")||C.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}A(C.getAttribute("href"))
}catch(B){}});
dojo.query("img").forEach(function(C){try{A(C.getAttribute("src"))
}catch(B){}});
dojo.query("a").forEach(function(C){try{A(C.getAttribute("href"))
}catch(B){}});
dojo.forEach(document.styleSheets,function(C){try{if(C.cssRules){dojo.forEach(C.cssRules,function(J){var K=J.cssText;
if(K){var I=K.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!I){return 
}for(var H=1;
H<I.length;
H++){A(I[H])
}}})
}else{if(C.cssText){var F;
var B=C.cssText.toString();
var E=B.split(/\f|\r|\n/);
for(var D=0;
D<E.length;
D++){F=E[D].match(/url\(\s*([^\) ]*)\s*\)/i);
if(F&&F.length){A(F[1])
}}}}}catch(G){}})
},_sameLocation:function(A){if(!A){return false
}if(A.length&&A.charAt(0)=="#"){return false
}A=new dojo._Url(A);
if(!A.scheme&&!A.port&&!A.host){return true
}if(!A.scheme&&A.host&&A.port&&window.location.hostname==A.host&&window.location.port==A.port){return true
}if(!A.scheme&&A.host&&!A.port&&window.location.hostname==A.host&&window.location.port==80){return true
}return window.location.protocol==(A.scheme+":")&&window.location.hostname==A.host&&(window.location.port==A.port||!window.location.port&&!A.port)
},_trimAnchor:function(A){return A.replace(/\#.*$/,"")
},_doRefresh:function(C,B){var A;
try{A=google.gears.factory.create("beta.localserver","1.0")
}catch(D){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var F="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
A.removeStore(F);
A.openStore(F);
var G=A.createStore(F);
this._store=G;
var E=this;
this._currentFileIndex=0;
this._cancelID=G.capture(this.listOfURLs,function(J,I,H){if(!I&&E.refreshing){E._cancelID=null;
E.refreshing=false;
var K=[];
K.push("Unable to capture: "+J);
C(true,K);
return 
}else{if(I){E._currentFileIndex++
}}if(I&&E._currentFileIndex>=E.listOfURLs.length){E._cancelID=null;
E.refreshing=false;
if(B){dojox.storage.put("oldVersion",B,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
C(false,[])
}})
},_getVersionInfo:function(C){var B=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var A=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var D=null;
C=dojo.hitch(this,C);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(E){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
C(A,D,B)
},load:function(E){if(E){D=E
}C(A,D,B)
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
},finishedDownloading:function(A,B){if(typeof A=="undefined"){A=true
}if(!A){this.successful=false;
this.details.push(B);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(dojo.hitch(this,function(A,B){if(A){this.error=true;
this.successful=false;
for(var C=0;
C<B.length;
C++){this.details.push(B[C])
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
}},onReplay:function(B,A){},length:function(){return this.entries.length
},haltReplay:function(A){if(!this.isReplaying){return 
}if(A){this.reasonHalted=A.toString()
}if(this.autoSave){var B=this;
this._save(function(){B.isReplaying=false;
B.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var A=this;
this._save(function(){A.isReplaying=false;
A.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var B=this.entries[0];
this.onReplay(B,this)
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
},onReplayFinished:function(){},toString:function(){var B="";
B+="[";
for(var A=0;
A<this.entries.length;
A++){B+="{";
for(var C in this.entries[A]){B+=C+': "'+this.entries[A][C]+'"';
B+=", "
}B+="}, "
}B+="]";
return B
},_save:function(B){if(!B){B=function(){}
}try{var D=this;
var A=function(E,G,F){if(E==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:G,value:F,namespace:dojox.off.STORAGE_NAMESPACE});
B()
}else{if(E==dojox.storage.SUCCESS){B()
}}};
dojox.storage.put("actionlog",this.entries,A,dojox.off.STORAGE_NAMESPACE)
}catch(C){console.debug("dojox.off.sync._save: "+C.message||C);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
B()
}},_load:function(A){var B=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!B){B=[]
}this.entries=B;
A()
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
},onFrameworkEvent:function(A,B){if(A=="save"){if(B.isCoreSave&&(B.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(A=="coreOperationFailed"){dojox.off.coreOpFailed=true;
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
}window.setInterval(dojo.hitch(this,function(){var A=dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(C){if(this.isOnline){this.isOnline=false;
try{if(typeof A.ioArgs.xhr.abort=="function"){A.ioArgs.xhr.abort()
}}catch(B){}dojox.off.sync.isSyncing=false;
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
},_cacheDojoResources:function(){var A=true;
dojo.forEach(dojo.query("script"),function(D){var C=D.getAttribute("src");
if(!C){return 
}if(C.indexOf("_base/_loader/bootstrap.js")!=-1){A=false
}});
if(!A){dojox.off.files.cache(dojo.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var B=0;
B<dojo._loadedUrls.length;
B++){dojox.off.files.cache(dojo._loadedUrls[B])
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
},_templateLoaded:function(B){var A=dojo.byId(this.autoEmbedID);
if(A){A.innerHTML=B
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var C=dojo.byId("dot-widget-browser-restart");
if(C){C.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(A){this._onNetwork(A?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var A=dojo.byId("dot-widget-network-indicator-online");
var C=dojo.byId("dot-widget-network-indicator-offline");
var B=dojo.byId("dot-widget-title-text");
if(A&&C){if(dojox.off.isOnline==true){A.style.display="inline";
C.style.display="none"
}else{A.style.display="none";
C.style.display="inline"
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
var C=dojo.byId("dot-success-checkmark");
var B=dojo.byId("dot-sync-messages");
var A=dojo.byId("dot-sync-details");
var E=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(D){D.style.display="inline"
}if(C){C.style.display="none"
}if(B){dojo.removeClass(B,"dot-sync-error")
}if(A){A.style.display="none"
}if(E){E.style.display="inline"
}}else{if(D){D.style.display="none"
}if(E){E.style.display="none"
}if(B){dojo.removeClass(B,"dot-sync-error")
}}},_setSyncMessage:function(B){var A=dojo.byId("dot-sync-messages");
if(A){while(A.firstChild){A.removeChild(A.firstChild)
}A.appendChild(document.createTextNode(B))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var C=dojo.byId("dot-widget-network-indicator-online");
if(C){C.setAttribute("src",this.onlineImagePath)
}var B=dojo.byId("dot-widget-network-indicator-offline");
if(B){B.setAttribute("src",this.offlineImagePath)
}var A=dojo.byId("dot-roller");
if(A){A.setAttribute("src",this.rollerImagePath)
}var D=dojo.byId("dot-success-checkmark");
if(D){D.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(A){A.preventDefault();
A.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var C="";
C+="<html><head><title>Sync Details</title><head><body>";
C+="<h1>Sync Details</h1>\n";
C+="<ul>\n";
for(var B=0;
B<dojox.off.sync.details.length;
B++){C+="<li>";
C+=dojox.off.sync.details[B];
C+="</li>"
}C+="</ul>\n";
C+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
C+="</body></html>";
var E="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var D=window.open("","SyncDetails",E);
if(!D){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}D.document.open();
D.document.write(C);
D.document.close();
if(D.focus){D.focus()
}},_cancel:function(A){A.preventDefault();
A.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var B=dojo.byId("dot-widget-browser-restart");
if(B){dojo.addClass(B,"dot-needs-browser-restart")
}var A=dojo.byId("dot-widget-browser-restart-app-name");
if(A){A.innerHTML="";
A.appendChild(document.createTextNode(this.appName))
}var C=dojo.byId("dot-sync-status");
if(C){C.style.display="none"
}},_showNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.addClass(A,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var A=dojo.byId("dot-widget-container");
if(A){dojo.removeClass(A,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var A=dojo.byId("dot-sync-details-button");
if(A){dojo.connect(A,"onclick",this,this._showDetails)
}var B=dojo.byId("dot-sync-cancel-button");
if(B){dojo.connect(B,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(B){var A=[];
A.push(dojo.byId("dot-sync-status"));
for(var C=0;
C<A.length;
C++){if(A[C]){A[C].style.visibility=(B?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var C=dojo.byId("dot-success-checkmark");
var B=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(C){C.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(C){C.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var A=dojo.byId("dot-sync-messages");
if(A){dojo.addClass(A,"dot-sync-error")
}if(C){C.style.display="none"
}}}if(dojox.off.sync.details.length&&B){B.style.display="inline"
}},_onFrameworkEvent:function(B,A){if(B=="save"){if(A.status==dojox.storage.FAILED&&!A.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(B=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(B=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var C=dojo.byId("dot-widget-browser-restart");
if(C){C.style.display="none"
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