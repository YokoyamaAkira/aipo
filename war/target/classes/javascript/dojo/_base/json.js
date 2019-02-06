if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){try{return eval("("+json+")")
}catch(e){console.debug(e);
return json
}};
dojo._escapeString=function(A){return('"'+A.replace(/(["\\])/g,"\\$1")+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(B,M,F){F=F||"";
var E=(M?F+dojo.toJsonIndentStr:"");
var C=(M?"\n":"");
var G=typeof (B);
if(G=="undefined"){return"undefined"
}else{if((G=="number")||(G=="boolean")){return B+""
}else{if(B===null){return"null"
}}}if(dojo.isString(B)){return dojo._escapeString(B)
}if(B.nodeType&&B.cloneNode){return""
}var I=arguments.callee;
var N;
if(typeof B.__json__=="function"){N=B.__json__();
if(B!==N){return I(N,M,E)
}}if(typeof B.json=="function"){N=B.json();
if(B!==N){return I(N,M,E)
}}if(dojo.isArray(B)){var D=[];
for(var A=0;
A<B.length;
A++){var L=I(B[A],M,E);
if(typeof (L)!="string"){L="undefined"
}D.push(C+E+L)
}return"["+D.join(", ")+C+F+"]"
}if(G=="function"){return null
}var K=[];
for(var H in B){var J;
if(typeof (H)=="number"){J='"'+H+'"'
}else{if(typeof (H)=="string"){J=dojo._escapeString(H)
}else{continue
}}L=I(B[H],M,E);
if(typeof (L)!="string"){continue
}K.push(C+E+J+": "+L)
}return"{"+K.join(", ")+C+F+"}"
}
};