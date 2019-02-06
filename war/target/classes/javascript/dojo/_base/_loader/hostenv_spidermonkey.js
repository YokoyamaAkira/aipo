if(djConfig.baseUrl){dojo.baseUrl=djConfig.baseUrl
}else{dojo.baseUrl="./"
}dojo._name="spidermonkey";
dojo.isSpidermonkey=true;
dojo.exit=function(A){quit(A)
};
if(typeof print=="function"){console.debug=print
}if(typeof line2pc=="undefined"){throw new Error("attempt to use SpiderMonkey host environment when no 'line2pc' global")
}dojo._spidermonkeyCurrentFile=function(C){var E="";
try{throw Error("whatever")
}catch(B){E=B.stack
}var A=E.match(/[^@]*\.js/gi);
if(!A){throw Error("could not parse stack string: '"+E+"'")
}var D=(typeof C!="undefined"&&C)?A[C+1]:A[A.length-1];
if(!D){throw Error("could not find file name in stack string '"+E+"'")
}return D
};
dojo._loadUri=function(A){var B=load(A);
return 1
};
if(djConfig.modulePaths){for(var param in djConfig.modulePaths){dojo.registerModulePath(param,djConfig.modulePaths[param])
}};