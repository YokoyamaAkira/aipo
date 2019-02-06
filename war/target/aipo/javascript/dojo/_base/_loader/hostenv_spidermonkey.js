if(djConfig.baseUrl){dojo.baseUrl=djConfig.baseUrl
}else{dojo.baseUrl="./"
}dojo._name="spidermonkey";
dojo.isSpidermonkey=true;
dojo.exit=function(A){quit(A)
};
if(typeof print=="function"){console.debug=print
}if(typeof line2pc=="undefined"){throw new Error("attempt to use SpiderMonkey host environment when no 'line2pc' global")
}dojo._spidermonkeyCurrentFile=function(D){var A="";
try{throw Error("whatever")
}catch(C){A=C.stack
}var B=A.match(/[^@]*\.js/gi);
if(!B){throw Error("could not parse stack string: '"+A+"'")
}var E=(typeof D!="undefined"&&D)?B[D+1]:B[B.length-1];
if(!E){throw Error("could not find file name in stack string '"+A+"'")
}return E
};
dojo._loadUri=function(B){var A=load(B);
return 1
};
if(djConfig.modulePaths){for(var param in djConfig.modulePaths){dojo.registerModulePath(param,djConfig.modulePaths[param])
}};