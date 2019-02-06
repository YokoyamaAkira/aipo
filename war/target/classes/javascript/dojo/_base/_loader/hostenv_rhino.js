if(djConfig.baseUrl){dojo.baseUrl=djConfig.baseUrl
}else{dojo.baseUrl="./"
}dojo.locale=dojo.locale||String(java.util.Locale.getDefault().toString().replace("_","-").toLowerCase());
dojo._name="rhino";
dojo.isRhino=true;
if(typeof print=="function"){console.debug=print
}if(typeof dojo.byId=="undefined"){dojo.byId=function(A,B){if(A&&(typeof A=="string"||A instanceof String)){if(!B){B=document
}return B.getElementById(A)
}return A
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
dojo._rhinoCurrentScriptViaJava=function(B){var E=Packages.org.mozilla.javascript.Context.getCurrentContext().getOptimizationLevel();
var A=new java.io.CharArrayWriter();
var G=new java.io.PrintWriter(A);
var D=new java.lang.Exception();
var F=A.toString();
var H=F.match(/[^\(]*\.js\)/gi);
if(!H){throw Error("cannot parse printStackTrace output: "+F)
}var C=((typeof B!="undefined")&&(B))?H[B+1]:H[H.length-1];
var C=H[3];
if(!C){C=H[1]
}if(!C){throw Error("could not find js file in printStackTrace output: "+F)
}return C
};
function readText(B,A){A=A||"utf-8";
var C=new java.io.File(B);
var D=new java.io.FileInputStream(C);
return dj_readInputStream(D,A)
}function readUri(C,B){var A=(new java.net.URL(C)).openConnection();
B=B||A.getContentEncoding()||"utf-8";
var D=A.getInputStream();
return dj_readInputStream(D,B)
}function dj_readInputStream(C,B){var A=new java.io.BufferedReader(new java.io.InputStreamReader(C,B));
try{var D=new java.lang.StringBuffer();
var E="";
while((E=A.readLine())!==null){D.append(E);
D.append(java.lang.System.getProperty("line.separator"))
}return D.toString()
}finally{A.close()
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
}function setTimeout(B,A){var D={sleepTime:A,hasSlept:false,run:function(){if(!this.hasSlept){this.hasSlept=true;
java.lang.Thread.currentThread().sleep(this.sleepTime)
}try{B()
}catch(F){console.debug("Error running setTimeout thread:"+F)
}}};
var C=new java.lang.Runnable(D);
var E=new java.lang.Thread(C);
E.start();
return dojo._timeouts.push(E)-1
}if(djConfig.modulePaths){for(var param in djConfig.modulePaths){dojo.registerModulePath(param,djConfig.modulePaths[param])
}};