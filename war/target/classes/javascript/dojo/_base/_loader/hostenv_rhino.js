if(djConfig.baseUrl){dojo.baseUrl=djConfig.baseUrl
}else{dojo.baseUrl="./"
}dojo.locale=dojo.locale||String(java.util.Locale.getDefault().toString().replace("_","-").toLowerCase());
dojo._name="rhino";
dojo.isRhino=true;
if(typeof print=="function"){console.debug=print
}if(typeof dojo.byId=="undefined"){dojo.byId=function(B,A){if(B&&(typeof B=="string"||B instanceof String)){if(!A){A=document
}return A.getElementById(B)
}return B
}
}dojo._loadUri=function(uri,cb){try{var local=(new java.io.File(uri)).exists();
if(!local){try{var stream=(new java.net.URL(uri)).openStream();
stream.close()
}catch(e){return false
}}if(cb){var contents=(local?readText:readUri)(uri,"UTF-8");
cb(eval("("+contents+")"))
}else{load(uri)
}return true
}catch(e){console.debug("rhino load('"+uri+"') failed. Exception: "+e);
return false
}};
dojo.exit=function(A){quit(A)
};
dojo._rhinoCurrentScriptViaJava=function(G){var B=Packages.org.mozilla.javascript.Context.getCurrentContext().getOptimizationLevel();
var F=new java.io.CharArrayWriter();
var D=new java.io.PrintWriter(F);
var A=new java.lang.Exception();
var C=F.toString();
var E=C.match(/[^\(]*\.js\)/gi);
if(!E){throw Error("cannot parse printStackTrace output: "+C)
}var H=((typeof G!="undefined")&&(G))?E[G+1]:E[E.length-1];
var H=E[3];
if(!H){H=E[1]
}if(!H){throw Error("could not find js file in printStackTrace output: "+C)
}return H
};
function readText(C,B){B=B||"utf-8";
var D=new java.io.File(C);
var A=new java.io.FileInputStream(D);
return dj_readInputStream(A,B)
}function readUri(D,C){var B=(new java.net.URL(D)).openConnection();
C=C||B.getContentEncoding()||"utf-8";
var A=B.getInputStream();
return dj_readInputStream(A,C)
}function dj_readInputStream(D,C){var B=new java.io.BufferedReader(new java.io.InputStreamReader(D,C));
try{var E=new java.lang.StringBuffer();
var A="";
while((A=B.readLine())!==null){E.append(A);
E.append(java.lang.System.getProperty("line.separator"))
}return E.toString()
}finally{B.close()
}}if(!djConfig.libraryScriptUri.length){try{djConfig.libraryScriptUri=dojo._rhinoCurrentScriptViaJava(1)
}catch(e){if(djConfig.isDebug){print("\n");
print("we have no idea where Dojo is located.");
print("Please try loading rhino in a non-interpreted mode or set a");
print("\n\tdjConfig.libraryScriptUri\n");
print("Setting the dojo path to './'");
print("This is probably wrong!");
print("\n");
print("Dojo will try to load anyway")
}djConfig.libraryScriptUri="./"
}}dojo.doc=typeof (document)!="undefined"?document:null;
dojo.body=function(){return document.body
};
dojo._timeouts=[];
function clearTimeout(A){if(!dojo._timeouts[A]){return 
}dojo._timeouts[A].stop()
}function setTimeout(C,B){var E={sleepTime:B,hasSlept:false,run:function(){if(!this.hasSlept){this.hasSlept=true;
java.lang.Thread.currentThread().sleep(this.sleepTime)
}try{C()
}catch(F){console.debug("Error running setTimeout thread:"+F)
}}};
var D=new java.lang.Runnable(E);
var A=new java.lang.Thread(D);
A.start();
return dojo._timeouts.push(A)-1
}if(djConfig.modulePaths){for(var param in djConfig.modulePaths){dojo.registerModulePath(param,djConfig.modulePaths[param])
}};