dojo._xdResourceLoaded({depends:[["provide","dojox.storage.Provider"],["provide","dojox.storage.manager"],["provide","dojox._sql._crypto"],["provide","dojox._sql.common"],["provide","dojox.sql"],["provide","dojox.storage.GearsStorageProvider"],["provide","dojox.storage._common"],["provide","dojox.storage"],["provide","dojox.off.files"],["provide","dojox.off.sync"],["provide","dojox.off._common"],["provide","dojox.off"],["provide","dojox.off.ui"],["provide","dojox.off.offline"]],defineResource:function(dojo){if(!dojo._hasResource["dojox.storage.Provider"]){dojo._hasResource["dojox.storage.Provider"]=true;
dojo.provide("dojox.storage.Provider");
dojo.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented")
},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented")
},put:function(key,value,resultsHandler,namespace){console.warn("dojox.storage.put not implemented")
},get:function(key,namespace){console.warn("dojox.storage.get not implemented")
},hasKey:function(key,namespace){return(this.get(key)!=null)
},getKeys:function(namespace){console.warn("dojox.storage.getKeys not implemented")
},clear:function(namespace){console.warn("dojox.storage.clear not implemented")
},remove:function(key,namespace){console.warn("dojox.storage.remove not implemented")
},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented")
},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented")
},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented")
},putMultiple:function(keys,values,resultsHandler,namespace){console.warn("dojox.storage.putMultiple not implemented")
},getMultiple:function(keys,namespace){console.warn("dojox.storage.getMultiple not implemented")
},removeMultiple:function(keys,namespace){console.warn("dojox.storage.remove not implemented")
},isValidKeyArray:function(keys){if(keys===null||typeof keys==="undefined"||!keys instanceof Array){return false
}for(var k=0;
k<keys.length;
k++){if(!this.isValidKey(keys[k])){return false
}}return true
},hasSettingsUI:function(){return false
},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented")
},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented")
},isValidKey:function(keyName){if((keyName==null)||(typeof keyName=="undefined")){return false
}return/^[0-9A-Za-z_]*$/.test(keyName)
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
dojo.mixin(dojox._sql._crypto,{_POOL_SIZE:100,encrypt:function(plaintext,password,callback){this._initWorkerPool();
var msg={plaintext:plaintext,password:password};
msg=dojo.toJson(msg);
msg="encr:"+String(msg);
this._assignWork(msg,callback)
},decrypt:function(ciphertext,password,callback){this._initWorkerPool();
var msg={ciphertext:ciphertext,password:password};
msg=dojo.toJson(msg);
msg="decr:"+String(msg);
this._assignWork(msg,callback)
},_initWorkerPool:function(){if(!this._manager){try{this._manager=google.gears.factory.create("beta.workerpool","1.0");
this._unemployed=[];
this._employed={};
this._handleMessage=[];
var self=this;
this._manager.onmessage=function(msg,sender){var callback=self._employed["_"+sender];
self._employed["_"+sender]=undefined;
self._unemployed.push("_"+sender);
if(self._handleMessage.length){var handleMe=self._handleMessage.shift();
self._assignWork(handleMe.msg,handleMe.callback)
}callback(msg)
};
var workerInit="function _workerInit(){gearsWorkerPool.onmessage = "+String(this._workerHandler)+";}";
var code=workerInit+" _workerInit();";
for(var i=0;
i<this._POOL_SIZE;
i++){this._unemployed.push("_"+this._manager.createWorker(code))
}}catch(exp){throw exp.message||exp
}}},_assignWork:function(msg,callback){if(!this._handleMessage.length&&this._unemployed.length){var workerID=this._unemployed.shift().substring(1);
this._employed["_"+workerID]=callback;
this._manager.sendMessage(msg,workerID)
}else{this._handleMessage={msg:msg,callback:callback}
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
dojo.mixin(dojox.sql,{dbName:null,debug:(dojo.exists("dojox.sql.debug")?dojox.sql.debug:false),open:function(dbName){if(this._dbOpen&&(!dbName||dbName==this.dbName)){return 
}if(!this.dbName){this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_")
}if(!dbName){dbName=this.dbName
}try{this._initDb();
this.db.open(dbName);
this._dbOpen=true
}catch(exp){throw exp.message||exp
}},close:function(dbName){if(dojo.isIE){return 
}if(!this._dbOpen&&(!dbName||dbName==this.dbName)){return 
}if(!dbName){dbName=this.dbName
}try{this.db.close(dbName);
this._dbOpen=false
}catch(exp){throw exp.message||exp
}},_exec:function(params){try{this._initDb();
if(!this._dbOpen){this.open();
this._autoClose=true
}var sql=null;
var callback=null;
var password=null;
var args=dojo._toArray(params);
sql=args.splice(0,1)[0];
if(this._needsEncrypt(sql)||this._needsDecrypt(sql)){callback=args.splice(args.length-1,1)[0];
password=args.splice(args.length-1,1)[0]
}if(this.debug){this._printDebugSQL(sql,args)
}if(this._needsEncrypt(sql)){var crypto=new dojox.sql._SQLCrypto("encrypt",sql,password,args,callback);
return 
}else{if(this._needsDecrypt(sql)){var crypto=new dojox.sql._SQLCrypto("decrypt",sql,password,args,callback);
return 
}}var rs=this.db.execute(sql,args);
rs=this._normalizeResults(rs);
if(this._autoClose){this.close()
}return rs
}catch(exp){exp=exp.message||exp;
console.debug("SQL Exception: "+exp);
if(this._autoClose){try{this.close()
}catch(e){console.debug("Error closing database: "+e.message||e)
}}throw exp
}},_initDb:function(){if(!this.db){try{this.db=google.gears.factory.create("beta.database","1.0")
}catch(exp){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}}},_printDebugSQL:function(sql,args){var msg='dojox.sql("'+sql+'"';
for(var i=0;
i<args.length;
i++){if(typeof args[i]=="string"){msg+=', "'+args[i]+'"'
}else{msg+=", "+args[i]
}}msg+=")";
console.debug(msg)
},_normalizeResults:function(rs){var results=[];
if(!rs){return[]
}while(rs.isValidRow()){var row={};
for(var i=0;
i<rs.fieldCount();
i++){var fieldName=rs.fieldName(i);
var fieldValue=rs.field(i);
row[fieldName]=fieldValue
}results.push(row);
rs.next()
}rs.close();
return results
},_needsEncrypt:function(sql){return/encrypt\([^\)]*\)/i.test(sql)
},_needsDecrypt:function(sql){return/decrypt\([^\)]*\)/i.test(sql)
}});
dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(action,sql,password,args,callback){if(action=="encrypt"){this._execEncryptSQL(sql,password,args,callback)
}else{this._execDecryptSQL(sql,password,args,callback)
}},_execEncryptSQL:function(sql,password,args,callback){var strippedSQL=this._stripCryptoSQL(sql);
var encryptColumns=this._flagEncryptedArgs(sql,args);
var self=this;
this._encrypt(strippedSQL,password,args,encryptColumns,function(finalArgs){var error=false;
var resultSet=[];
var exp=null;
try{resultSet=dojox.sql.db.execute(strippedSQL,finalArgs)
}catch(execError){error=true;
exp=execError.message||execError
}if(exp!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(e){}}callback(null,true,exp.toString());
return 
}resultSet=dojox.sql._normalizeResults(resultSet);
if(dojox.sql._autoClose){dojox.sql.close()
}if(dojox.sql._needsDecrypt(sql)){var needsDecrypt=self._determineDecryptedColumns(sql);
self._decrypt(resultSet,needsDecrypt,password,function(finalResultSet){callback(finalResultSet,false,null)
})
}else{callback(resultSet,false,null)
}})
},_execDecryptSQL:function(sql,password,args,callback){var strippedSQL=this._stripCryptoSQL(sql);
var needsDecrypt=this._determineDecryptedColumns(sql);
var error=false;
var resultSet=[];
var exp=null;
try{resultSet=dojox.sql.db.execute(strippedSQL,args)
}catch(execError){error=true;
exp=execError.message||execError
}if(exp!=null){if(dojox.sql._autoClose){try{dojox.sql.close()
}catch(e){}}callback(resultSet,true,exp.toString());
return 
}resultSet=dojox.sql._normalizeResults(resultSet);
if(dojox.sql._autoClose){dojox.sql.close()
}this._decrypt(resultSet,needsDecrypt,password,function(finalResultSet){callback(finalResultSet,false,null)
})
},_encrypt:function(sql,password,args,encryptColumns,callback){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalArgs=args;
for(var i=0;
i<args.length;
i++){if(encryptColumns[i]){var sqlParam=args[i];
var paramIndex=i;
this._totalCrypto++;
dojox._sql._crypto.encrypt(sqlParam,password,dojo.hitch(this,function(results){this._finalArgs[paramIndex]=results;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){callback(this._finalArgs)
}}))
}}this._finishedSpawningCrypto=true
},_decrypt:function(resultSet,needsDecrypt,password,callback){this._totalCrypto=0;
this._finishedCrypto=0;
this._finishedSpawningCrypto=false;
this._finalResultSet=resultSet;
for(var i=0;
i<resultSet.length;
i++){var row=resultSet[i];
for(var columnName in row){if(needsDecrypt=="*"||needsDecrypt[columnName]){this._totalCrypto++;
var columnValue=row[columnName];
this._decryptSingleColumn(columnName,columnValue,password,i,function(finalResultSet){callback(finalResultSet)
})
}}}this._finishedSpawningCrypto=true
},_stripCryptoSQL:function(sql){sql=sql.replace(/DECRYPT\(\*\)/ig,"*");
var matches=sql.match(/ENCRYPT\([^\)]*\)/ig);
if(matches!=null){for(var i=0;
i<matches.length;
i++){var encryptStatement=matches[i];
var encryptValue=encryptStatement.match(/ENCRYPT\(([^\)]*)\)/i)[1];
sql=sql.replace(encryptStatement,encryptValue)
}}matches=sql.match(/DECRYPT\([^\)]*\)/ig);
if(matches!=null){for(var i=0;
i<matches.length;
i++){var decryptStatement=matches[i];
var decryptValue=decryptStatement.match(/DECRYPT\(([^\)]*)\)/i)[1];
sql=sql.replace(decryptStatement,decryptValue)
}}return sql
},_flagEncryptedArgs:function(sql,args){var tester=new RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig);
var matches;
var currentParam=0;
var results=[];
while((matches=tester.exec(sql))!=null){var currentMatch=RegExp.lastMatch+"";
if(/^[\"\']/.test(currentMatch)){continue
}var needsEncrypt=false;
if(/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)){needsEncrypt=true
}results[currentParam]=needsEncrypt;
currentParam++
}return results
},_determineDecryptedColumns:function(sql){var results={};
if(/DECRYPT\(\*\)/i.test(sql)){results="*"
}else{var tester=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig;
var matches;
while(matches=tester.exec(sql)){var lastMatch=new String(RegExp.lastMatch);
var columnNames=lastMatch.replace(/DECRYPT\(/i,"");
columnNames=columnNames.replace(/\)/,"");
columnNames=columnNames.split(/\s*,\s*/);
dojo.forEach(columnNames,function(column){if(/\s*\w* AS (\w*)/i.test(column)){column=column.match(/\s*\w* AS (\w*)/i)[1]
}results[column]=true
})
}}return results
},_decryptSingleColumn:function(columnName,columnValue,password,currentRowIndex,callback){dojox._sql._crypto.decrypt(columnValue,password,dojo.hitch(this,function(results){this._finalResultSet[currentRowIndex][columnName]=results;
this._finishedCrypto++;
if(this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto){callback(this._finalResultSet)
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
}catch(e){console.debug("dojox.storage.GearsStorageProvider.initialize:",e);
this.initialized=false;
dojox.storage.manager.loaded();
return 
}this.initialized=true;
dojox.storage.manager.loaded()
},isAvailable:function(){return this._available=dojo.isGears
},put:function(key,value,resultsHandler,namespace){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key)
}namespace=namespace||this.DEFAULT_NAMESPACE;
if(dojo.isString(value)){value="string:"+value
}else{value=dojo.toJson(value)
}try{dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",namespace,key);
dojox.sql("INSERT INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)",namespace,key,value)
}catch(e){console.debug("dojox.storage.GearsStorageProvider.put:",e);
resultsHandler(this.FAILED,key,e.toString());
return 
}if(resultsHandler){resultsHandler(dojox.storage.SUCCESS,key,null)
}},get:function(key,namespace){if(this.isValidKey(key)==false){throw new Error("Invalid key given: "+key)
}namespace=namespace||this.DEFAULT_NAMESPACE;
var results=dojox.sql("SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?",namespace,key);
if(!results.length){return null
}else{results=results[0].value
}if(dojo.isString(results)&&(/^string:/.test(results))){results=results.substring("string:".length)
}else{results=dojo.fromJson(results)
}return results
},getNamespaces:function(){var results=[dojox.storage.DEFAULT_NAMESPACE];
var rs=dojox.sql("SELECT namespace FROM "+this.TABLE_NAME+" DESC GROUP BY namespace");
for(var i=0;
i<rs.length;
i++){if(rs[i].namespace!=dojox.storage.DEFAULT_NAMESPACE){results.push(rs[i].namespace)
}}return results
},getKeys:function(namespace){namespace=namespace||this.DEFAULT_NAMESPACE;
if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var rs=dojox.sql("SELECT key FROM "+this.TABLE_NAME+" WHERE namespace = ?",namespace);
var results=[];
for(var i=0;
i<rs.length;
i++){results.push(rs[i].key)
}return results
},clear:function(namespace){if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}namespace=namespace||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ?",namespace)
},remove:function(key,namespace){namespace=namespace||this.DEFAULT_NAMESPACE;
dojox.sql("DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?",namespace,key)
},putMultiple:function(keys,values,resultsHandler,namespace){if(this.isValidKeyArray(keys)===false||!values instanceof Array||keys.length!=values.length){throw new Error("Invalid arguments: keys = ["+keys+"], values = ["+values+"]")
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}this._statusHandler=resultsHandler;
try{dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var _stmt="REPLACE INTO "+this.TABLE_NAME+" VALUES (?, ?, ?)";
for(var i=0;
i<keys.length;
i++){var value=values[i];
if(dojo.isString(value)){value="string:"+value
}else{value=dojo.toJson(value)
}dojox.sql.db.execute(_stmt,[namespace,keys[i],value])
}dojox.sql.db.execute("COMMIT TRANSACTION");
dojox.sql.close()
}catch(e){console.debug("dojox.storage.GearsStorageProvider.putMultiple:",e);
if(resultsHandler){resultsHandler(this.FAILED,keys,e.toString())
}return 
}if(resultsHandler){resultsHandler(dojox.storage.SUCCESS,key,null)
}},getMultiple:function(keys,namespace){if(this.isValidKeyArray(keys)===false){throw new ("Invalid key array given: "+keys)
}if(namespace==null||typeof namespace=="undefined"){namespace=dojox.storage.DEFAULT_NAMESPACE
}if(this.isValidKey(namespace)==false){throw new Error("Invalid namespace given: "+namespace)
}var _stmt="SELECT * FROM "+this.TABLE_NAME+" WHERE namespace = ? AND  key = ?";
var results=[];
for(var i=0;
i<keys.length;
i++){var result=dojox.sql(_stmt,namespace,keys[i]);
if(!result.length){results[i]=null
}else{result=result[0].value;
if(dojo.isString(result)&&(/^string:/.test(result))){results[i]=result.substring("string:".length)
}else{results[i]=dojo.fromJson(result)
}}}return results
},removeMultiple:function(keys,namespace){namespace=namespace||this.DEFAULT_NAMESPACE;
dojox.sql.open();
dojox.sql.db.execute("BEGIN TRANSACTION");
var _stmt="DELETE FROM "+this.TABLE_NAME+" WHERE namespace = ? AND key = ?";
for(var i=0;
i<keys.length;
i++){dojox.sql.db.execute(_stmt,[namespace,keys[i]])
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
},cache:function(urlOrList){if(dojo.isString(urlOrList)){var url=this._trimAnchor(urlOrList+"");
if(!this.isAvailable(url)){this.listOfURLs.push(url)
}}else{if(urlOrList instanceof dojo._Url){var url=this._trimAnchor(urlOrList.uri);
if(!this.isAvailable(url)){this.listOfURLs.push(url)
}}else{dojo.forEach(urlOrList,function(url){url=this._trimAnchor(url);
if(!this.isAvailable(url)){this.listOfURLs.push(url)
}},this)
}}},printURLs:function(){console.debug("The following URLs are cached for offline use:");
dojo.forEach(this.listOfURLs,function(i){console.debug(i)
})
},remove:function(url){for(var i=0;
i<this.listOfURLs.length;
i++){if(this.listOfURLs[i]==url){this.listOfURLs=this.listOfURLs.splice(i,1);
break
}}},isAvailable:function(url){for(var i=0;
i<this.listOfURLs.length;
i++){if(this.listOfURLs[i]==url){return true
}}return false
},refresh:function(callback){try{if(djConfig.isDebug){this.printURLs()
}this.refreshing=true;
if(this.versionURL){this._getVersionInfo(function(oldVersion,newVersion,justDebugged){if(djConfig.isDebug||!newVersion||justDebugged||!oldVersion||oldVersion!=newVersion){console.warn("Refreshing offline file list");
this._doRefresh(callback,newVersion)
}else{console.warn("No need to refresh offline file list");
callback(false,[])
}})
}else{console.warn("Refreshing offline file list");
this._doRefresh(callback)
}}catch(e){this.refreshing=false;
dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}},abortRefresh:function(){if(!this.refreshing){return 
}this._store.abortCapture(this._cancelID);
this.refreshing=false
},_slurp:function(){if(!this._doSlurp){return 
}var handleUrl=dojo.hitch(this,function(url){if(this._sameLocation(url)){this.cache(url)
}});
handleUrl(window.location.href);
dojo.query("script").forEach(function(i){try{handleUrl(i.getAttribute("src"))
}catch(exp){}});
dojo.query("link").forEach(function(i){try{if(!i.getAttribute("rel")||i.getAttribute("rel").toLowerCase()!="stylesheet"){return 
}handleUrl(i.getAttribute("href"))
}catch(exp){}});
dojo.query("img").forEach(function(i){try{handleUrl(i.getAttribute("src"))
}catch(exp){}});
dojo.query("a").forEach(function(i){try{handleUrl(i.getAttribute("href"))
}catch(exp){}});
dojo.forEach(document.styleSheets,function(sheet){try{if(sheet.cssRules){dojo.forEach(sheet.cssRules,function(rule){var text=rule.cssText;
if(text){var matches=text.match(/url\(\s*([^\) ]*)\s*\)/i);
if(!matches){return 
}for(var i=1;
i<matches.length;
i++){handleUrl(matches[i])
}}})
}else{if(sheet.cssText){var matches;
var text=sheet.cssText.toString();
var lines=text.split(/\f|\r|\n/);
for(var i=0;
i<lines.length;
i++){matches=lines[i].match(/url\(\s*([^\) ]*)\s*\)/i);
if(matches&&matches.length){handleUrl(matches[1])
}}}}}catch(exp){}})
},_sameLocation:function(url){if(!url){return false
}if(url.length&&url.charAt(0)=="#"){return false
}url=new dojo._Url(url);
if(!url.scheme&&!url.port&&!url.host){return true
}if(!url.scheme&&url.host&&url.port&&window.location.hostname==url.host&&window.location.port==url.port){return true
}if(!url.scheme&&url.host&&!url.port&&window.location.hostname==url.host&&window.location.port==80){return true
}return window.location.protocol==(url.scheme+":")&&window.location.hostname==url.host&&(window.location.port==url.port||!window.location.port&&!url.port)
},_trimAnchor:function(url){return url.replace(/\#.*$/,"")
},_doRefresh:function(callback,newVersion){var localServer;
try{localServer=google.gears.factory.create("beta.localserver","1.0")
}catch(exp){dojo.setObject("google.gears.denied",true);
dojox.off.onFrameworkEvent("coreOperationFailed");
throw"Google Gears must be allowed to run"
}var storeName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_");
localServer.removeStore(storeName);
localServer.openStore(storeName);
var store=localServer.createStore(storeName);
this._store=store;
var self=this;
this._currentFileIndex=0;
this._cancelID=store.capture(this.listOfURLs,function(url,success,captureId){if(!success&&self.refreshing){self._cancelID=null;
self.refreshing=false;
var errorMsgs=[];
errorMsgs.push("Unable to capture: "+url);
callback(true,errorMsgs);
return 
}else{if(success){self._currentFileIndex++
}}if(success&&self._currentFileIndex>=self.listOfURLs.length){self._cancelID=null;
self.refreshing=false;
if(newVersion){dojox.storage.put("oldVersion",newVersion,null,dojox.off.STORAGE_NAMESPACE)
}dojox.storage.put("justDebugged",djConfig.isDebug,null,dojox.off.STORAGE_NAMESPACE);
callback(false,[])
}})
},_getVersionInfo:function(callback){var justDebugged=dojox.storage.get("justDebugged",dojox.off.STORAGE_NAMESPACE);
var oldVersion=dojox.storage.get("oldVersion",dojox.off.STORAGE_NAMESPACE);
var newVersion=null;
callback=dojo.hitch(this,callback);
dojo.xhrGet({url:this.versionURL+"?browserbust="+new Date().getTime(),timeout:5*1000,handleAs:"javascript",error:function(err){dojox.storage.remove("oldVersion",dojox.off.STORAGE_NAMESPACE);
dojox.storage.remove("justDebugged",dojox.off.STORAGE_NAMESPACE);
callback(oldVersion,newVersion,justDebugged)
},load:function(data){if(data){newVersion=data
}callback(oldVersion,newVersion,justDebugged)
}})
}}
}if(!dojo._hasResource["dojox.off.sync"]){dojo._hasResource["dojox.off.sync"]=true;
dojo.provide("dojox.off.sync");
dojo.mixin(dojox.off.sync,{isSyncing:false,cancelled:false,successful:true,details:[],error:false,actions:null,autoSync:true,onSync:function(type){},synchronize:function(){if(this.isSyncing||dojox.off.goingOnline||(!dojox.off.isOnline)){return 
}this.isSyncing=true;
this.successful=false;
this.details=[];
this.cancelled=false;
this.start()
},cancel:function(){if(!this.isSyncing){return 
}this.cancelled=true;
if(dojox.off.files.refreshing){dojox.off.files.abortRefresh()
}this.onSync("cancel")
},finishedDownloading:function(successful,errorMessage){if(typeof successful=="undefined"){successful=true
}if(!successful){this.successful=false;
this.details.push(errorMessage);
this.error=true
}this.finished()
},start:function(){if(this.cancelled){this.finished();
return 
}this.onSync("start");
this.refreshFiles()
},refreshFiles:function(){if(this.cancelled){this.finished();
return 
}this.onSync("refreshFiles");
dojox.off.files.refresh(dojo.hitch(this,function(error,errorMessages){if(error){this.error=true;
this.successful=false;
for(var i=0;
i<errorMessages.length;
i++){this.details.push(errorMessages[i])
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
},_save:function(callback){this.actions._save(function(){callback()
})
},_load:function(callback){this.actions._load(function(){callback()
})
}});
dojo.declare("dojox.off.sync.ActionLog",null,{entries:[],reasonHalted:null,isReplaying:false,autoSave:true,add:function(action){if(this.isReplaying){throw"Programming error: you can not call dojox.off.sync.actions.add() while we are replaying an action log"
}this.entries.push(action);
if(this.autoSave){this._save()
}},onReplay:function(action,actionLog){},length:function(){return this.entries.length
},haltReplay:function(reason){if(!this.isReplaying){return 
}if(reason){this.reasonHalted=reason.toString()
}if(this.autoSave){var self=this;
this._save(function(){self.isReplaying=false;
self.onReplayFinished()
})
}else{this.isReplaying=false;
this.onReplayFinished()
}},continueReplay:function(){if(!this.isReplaying){return 
}this.entries.shift();
if(!this.entries.length){if(this.autoSave){var self=this;
this._save(function(){self.isReplaying=false;
self.onReplayFinished()
});
return 
}else{this.isReplaying=false;
this.onReplayFinished();
return 
}}var nextAction=this.entries[0];
this.onReplay(nextAction,this)
},clear:function(){if(this.isReplaying){return 
}this.entries=[];
if(this.autoSave){this._save()
}},replay:function(){if(this.isReplaying){return 
}this.reasonHalted=null;
if(!this.entries.length){this.onReplayFinished();
return 
}this.isReplaying=true;
var nextAction=this.entries[0];
this.onReplay(nextAction,this)
},onReplayFinished:function(){},toString:function(){var results="";
results+="[";
for(var i=0;
i<this.entries.length;
i++){results+="{";
for(var j in this.entries[i]){results+=j+': "'+this.entries[i][j]+'"';
results+=", "
}results+="}, "
}results+="]";
return results
},_save:function(callback){if(!callback){callback=function(){}
}try{var self=this;
var resultsHandler=function(status,key,message){if(status==dojox.storage.FAILED){dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:key,value:message,namespace:dojox.off.STORAGE_NAMESPACE});
callback()
}else{if(status==dojox.storage.SUCCESS){callback()
}}};
dojox.storage.put("actionlog",this.entries,resultsHandler,dojox.off.STORAGE_NAMESPACE)
}catch(exp){console.debug("dojox.off.sync._save: "+exp.message||exp);
dojox.off.onFrameworkEvent("save",{status:dojox.storage.FAILED,isCoreSave:true,key:"actionlog",value:this.entries,namespace:dojox.off.STORAGE_NAMESPACE});
callback()
}},_load:function(callback){var entries=dojox.storage.get("actionlog",dojox.off.STORAGE_NAMESPACE);
if(!entries){entries=[]
}this.entries=entries;
callback()
}});
dojox.off.sync.actions=new dojox.off.sync.ActionLog()
}if(!dojo._hasResource["dojox.off._common"]){dojo._hasResource["dojox.off._common"]=true;
dojo.provide("dojox.off._common");
dojo.mixin(dojox.off,{isOnline:false,NET_CHECK:5,STORAGE_NAMESPACE:"_dot",enabled:true,availabilityURL:dojo.moduleUrl("dojox","off/network_check.txt"),goingOnline:false,coreOpFailed:false,doNetChecking:true,hasOfflineCache:null,browserRestart:false,_STORAGE_APP_NAME:window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),_initializeCalled:false,_storageLoaded:false,_pageLoaded:false,onLoad:function(){},onNetwork:function(type){},initialize:function(){this._initializeCalled=true;
if(this._storageLoaded&&this._pageLoaded){this._onLoad()
}},goOffline:function(){if((dojox.off.sync.isSyncing)||(this.goingOnline)){return 
}this.goingOnline=false;
this.isOnline=false
},goOnline:function(callback){if(dojox.off.sync.isSyncing||dojox.off.goingOnline){return 
}this.goingOnline=true;
this.isOnline=false;
this._isSiteAvailable(callback)
},onFrameworkEvent:function(type,saveData){if(type=="save"){if(saveData.isCoreSave&&(saveData.status==dojox.storage.FAILED)){dojox.off.coreOpFailed=true;
dojox.off.enabled=false;
dojox.off.onFrameworkEvent("coreOperationFailed")
}}else{if(type=="coreOperationFailed"){dojox.off.coreOpFailed=true;
dojox.off.enabled=false
}}},_checkOfflineCacheAvailable:function(callback){this.hasOfflineCache=dojo.isGears;
callback()
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
}},_isSiteAvailable:function(callback){dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(err){this.goingOnline=false;
this.isOnline=false;
if(callback){callback(false)
}}),load:dojo.hitch(this,function(data){this.goingOnline=false;
this.isOnline=true;
if(callback){callback(true)
}else{this.onNetwork("online")
}})})
},_startNetworkThread:function(){if(!this.doNetChecking){return 
}window.setInterval(dojo.hitch(this,function(){var d=dojo.xhrGet({url:this._getAvailabilityURL(),handleAs:"text",timeout:this.NET_CHECK*1000,error:dojo.hitch(this,function(err){if(this.isOnline){this.isOnline=false;
try{if(typeof d.ioArgs.xhr.abort=="function"){d.ioArgs.xhr.abort()
}}catch(e){}dojox.off.sync.isSyncing=false;
this.onNetwork("offline")
}}),load:dojo.hitch(this,function(data){if(!this.isOnline){this.isOnline=true;
this.onNetwork("online")
}})})
}),this.NET_CHECK*1000)
},_getAvailabilityURL:function(){var url=this.availabilityURL.toString();
if(url.indexOf("?")==-1){url+="?"
}else{url+="&"
}url+="browserbust="+new Date().getTime();
return url
},_onOfflineCacheInstalled:function(){this.onFrameworkEvent("offlineCacheInstalled")
},_cacheDojoResources:function(){var isOptimizedBuild=true;
dojo.forEach(dojo.query("script"),function(i){var src=i.getAttribute("src");
if(!src){return 
}if(src.indexOf("_base/_loader/bootstrap.js")!=-1){isOptimizedBuild=false
}});
if(!isOptimizedBuild){dojox.off.files.cache(dojo.moduleUrl("dojo","_base.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/loader.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/bootstrap.js").uri);
dojox.off.files.cache(dojo.moduleUrl("dojo","_base/_loader/hostenv_browser.js").uri)
}for(var i=0;
i<dojo._loadedUrls.length;
i++){dojox.off.files.cache(dojo._loadedUrls[i])
}},_save:function(){},_load:function(callback){dojox.off.sync._load(callback)
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
}},_doAutoEmbed:function(){dojo.xhrGet({url:this.htmlTemplatePath,handleAs:"text",error:function(err){dojox.off.enabled=false;
err=err.message||err;
alert("Error loading the Dojo Offline Widget from "+this.htmlTemplatePath+": "+err)
},load:dojo.hitch(this,this._templateLoaded)})
},_templateLoaded:function(data){var container=dojo.byId(this.autoEmbedID);
if(container){container.innerHTML=data
}this._initImages();
this._updateNetIndicator();
this._initLearnHow();
this._initialized=true;
if(!dojox.off.hasOfflineCache){this._showNeedsOfflineCache();
return 
}if(dojox.off.hasOfflineCache&&dojox.off.browserRestart){this._needsBrowserRestart();
return 
}else{var browserRestart=dojo.byId("dot-widget-browser-restart");
if(browserRestart){browserRestart.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._onNetwork(dojox.off.isOnline?"online":"offline");
this._testNet()
},_testNet:function(){dojox.off.goOnline(dojo.hitch(this,function(isOnline){this._onNetwork(isOnline?"online":"offline");
this.onLoad()
}))
},_updateNetIndicator:function(){var onlineImg=dojo.byId("dot-widget-network-indicator-online");
var offlineImg=dojo.byId("dot-widget-network-indicator-offline");
var titleText=dojo.byId("dot-widget-title-text");
if(onlineImg&&offlineImg){if(dojox.off.isOnline==true){onlineImg.style.display="inline";
offlineImg.style.display="none"
}else{onlineImg.style.display="none";
offlineImg.style.display="inline"
}}if(titleText){if(dojox.off.isOnline){titleText.innerHTML="Online"
}else{titleText.innerHTML="Offline"
}}},_initLearnHow:function(){var learnHow=dojo.byId("dot-widget-learn-how-link");
if(!learnHow){return 
}if(!this.customLearnHowPath){var dojoPath=djConfig.baseRelativePath;
this.learnHowPath+="?appName="+encodeURIComponent(this.appName)+"&hasOfflineCache="+dojox.off.hasOfflineCache+"&runLink="+encodeURIComponent(this.runLink)+"&runLinkText="+encodeURIComponent(this.runLinkText)+"&baseRelativePath="+encodeURIComponent(dojoPath);
dojox.off.files.cache(this.learnHowJSPath);
dojox.off.files.cache(this.learnHowPath)
}learnHow.setAttribute("href",this.learnHowPath);
var appName=dojo.byId("dot-widget-learn-how-app-name");
if(!appName){return 
}appName.innerHTML="";
appName.appendChild(document.createTextNode(this.appName))
},_validateAppName:function(appName){if(!appName){return false
}return(/^[a-z0-9 ]*$/i.test(appName))
},_updateSyncUI:function(){var roller=dojo.byId("dot-roller");
var checkmark=dojo.byId("dot-success-checkmark");
var syncMessages=dojo.byId("dot-sync-messages");
var details=dojo.byId("dot-sync-details");
var cancel=dojo.byId("dot-sync-cancel");
if(dojox.off.sync.isSyncing){this._clearSyncMessage();
if(roller){roller.style.display="inline"
}if(checkmark){checkmark.style.display="none"
}if(syncMessages){dojo.removeClass(syncMessages,"dot-sync-error")
}if(details){details.style.display="none"
}if(cancel){cancel.style.display="inline"
}}else{if(roller){roller.style.display="none"
}if(cancel){cancel.style.display="none"
}if(syncMessages){dojo.removeClass(syncMessages,"dot-sync-error")
}}},_setSyncMessage:function(message){var syncMessage=dojo.byId("dot-sync-messages");
if(syncMessage){while(syncMessage.firstChild){syncMessage.removeChild(syncMessage.firstChild)
}syncMessage.appendChild(document.createTextNode(message))
}},_clearSyncMessage:function(){this._setSyncMessage("")
},_initImages:function(){var onlineImg=dojo.byId("dot-widget-network-indicator-online");
if(onlineImg){onlineImg.setAttribute("src",this.onlineImagePath)
}var offlineImg=dojo.byId("dot-widget-network-indicator-offline");
if(offlineImg){offlineImg.setAttribute("src",this.offlineImagePath)
}var roller=dojo.byId("dot-roller");
if(roller){roller.setAttribute("src",this.rollerImagePath)
}var checkmark=dojo.byId("dot-success-checkmark");
if(checkmark){checkmark.setAttribute("src",this.checkmarkImagePath)
}},_showDetails:function(evt){evt.preventDefault();
evt.stopPropagation();
if(!dojox.off.sync.details.length){return 
}var html="";
html+="<html><head><title>Sync Details</title><head><body>";
html+="<h1>Sync Details</h1>\n";
html+="<ul>\n";
for(var i=0;
i<dojox.off.sync.details.length;
i++){html+="<li>";
html+=dojox.off.sync.details[i];
html+="</li>"
}html+="</ul>\n";
html+="<a href='javascript:window.close()' style='text-align: right; padding-right: 2em;'>Close Window</a>\n";
html+="</body></html>";
var windowParams="height=400,width=600,resizable=true,scrollbars=true,toolbar=no,menubar=no,location=no,directories=no,dependent=yes";
var popup=window.open("","SyncDetails",windowParams);
if(!popup){alert("Please allow popup windows for this domain; can't display sync details window");
return 
}popup.document.open();
popup.document.write(html);
popup.document.close();
if(popup.focus){popup.focus()
}},_cancel:function(evt){evt.preventDefault();
evt.stopPropagation();
dojox.off.sync.cancel()
},_needsBrowserRestart:function(){var browserRestart=dojo.byId("dot-widget-browser-restart");
if(browserRestart){dojo.addClass(browserRestart,"dot-needs-browser-restart")
}var appName=dojo.byId("dot-widget-browser-restart-app-name");
if(appName){appName.innerHTML="";
appName.appendChild(document.createTextNode(this.appName))
}var status=dojo.byId("dot-sync-status");
if(status){status.style.display="none"
}},_showNeedsOfflineCache:function(){var widgetContainer=dojo.byId("dot-widget-container");
if(widgetContainer){dojo.addClass(widgetContainer,"dot-needs-offline-cache")
}},_hideNeedsOfflineCache:function(){var widgetContainer=dojo.byId("dot-widget-container");
if(widgetContainer){dojo.removeClass(widgetContainer,"dot-needs-offline-cache")
}},_initMainEvtHandlers:function(){var detailsButton=dojo.byId("dot-sync-details-button");
if(detailsButton){dojo.connect(detailsButton,"onclick",this,this._showDetails)
}var cancelButton=dojo.byId("dot-sync-cancel-button");
if(cancelButton){dojo.connect(cancelButton,"onclick",this,this._cancel)
}},_setOfflineEnabled:function(enabled){var elems=[];
elems.push(dojo.byId("dot-sync-status"));
for(var i=0;
i<elems.length;
i++){if(elems[i]){elems[i].style.visibility=(enabled?"visible":"hidden")
}}},_syncFinished:function(){this._updateSyncUI();
var checkmark=dojo.byId("dot-success-checkmark");
var details=dojo.byId("dot-sync-details");
if(dojox.off.sync.successful==true){this._setSyncMessage("Sync Successful");
if(checkmark){checkmark.style.display="inline"
}}else{if(dojox.off.sync.cancelled==true){this._setSyncMessage("Sync Cancelled");
if(checkmark){checkmark.style.display="none"
}}else{this._setSyncMessage("Sync Error");
var messages=dojo.byId("dot-sync-messages");
if(messages){dojo.addClass(messages,"dot-sync-error")
}if(checkmark){checkmark.style.display="none"
}}}if(dojox.off.sync.details.length&&details){details.style.display="inline"
}},_onFrameworkEvent:function(type,saveData){if(type=="save"){if(saveData.status==dojox.storage.FAILED&&!saveData.isCoreSave){alert("Please increase the amount of local storage available to this application");
if(dojox.storage.hasSettingsUI()){dojox.storage.showSettingsUI()
}}}else{if(type=="coreOperationFailed"){console.log("Application does not have permission to use Dojo Offline");
if(!this._userInformed){alert("This application will not work if Google Gears is not allowed to run");
this._userInformed=true
}}else{if(type=="offlineCacheInstalled"){this._hideNeedsOfflineCache();
if(dojox.off.hasOfflineCache==true&&dojox.off.browserRestart==true){this._needsBrowserRestart();
return 
}else{var browserRestart=dojo.byId("dot-widget-browser-restart");
if(browserRestart){browserRestart.style.display="none"
}}this._updateSyncUI();
this._initMainEvtHandlers();
this._setOfflineEnabled(dojox.off.enabled);
this._testNet()
}}}},_onSync:function(type){switch(type){case"start":this._updateSyncUI();
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
default:dojo.warn("Programming error: Unknown sync type in dojox.off.ui: "+type);
break
}},_onNetwork:function(type){if(!this._initialized){return 
}this._updateNetIndicator();
if(type=="offline"){this._setSyncMessage("You are working offline");
var details=dojo.byId("dot-sync-details");
if(details){details.style.display="none"
}this._updateSyncUI()
}else{if(dojox.off.sync.autoSync){window.setTimeout("dojox.off.sync.synchronize()",1000)
}}}});
dojo.connect(dojox.off,"onFrameworkEvent",dojox.off.ui,"_onFrameworkEvent");
dojo.connect(dojox.off,"onLoad",dojox.off.ui,dojox.off.ui._initialize)
}if(!dojo._hasResource["dojox.off.offline"]){dojo._hasResource["dojox.off.offline"]=true;
dojo.provide("dojox.off.offline")
}}});