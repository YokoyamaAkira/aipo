if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){try{return eval("("+json+")")
}catch(e){console.debug(e);
return json
}};
dojo._escapeString=function(A){return('"'+A.replace(/(["\\])/g,"\\$1")+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(H,E,L){L=L||"";
var K=(E?L+dojo.toJsonIndentStr:"");
var I=(E?"\n":"");
var M=typeof (H);
if(M=="undefined"){return"undefined"
}else{if((M=="number")||(M=="boolean")){return H+""
}else{if(H===null){return"null"
}}}if(dojo.isString(H)){return dojo._escapeString(H)
}if(H.nodeType&&H.cloneNode){return""
}var A=arguments.callee;
var F;
if(typeof H.__json__=="function"){F=H.__json__();
if(H!==F){return A(F,E,K)
}}if(typeof H.json=="function"){F=H.json();
if(H!==F){return A(F,E,K)
}}if(dojo.isArray(H)){var J=[];
for(var G=0;
G<H.length;
G++){var D=A(H[G],E,K);
if(typeof (D)!="string"){D="undefined"
}J.push(I+K+D)
}return"["+J.join(", ")+I+L+"]"
}if(M=="function"){return null
}var C=[];
for(var N in H){var B;
if(typeof (N)=="number"){B='"'+N+'"'
}else{if(typeof (N)=="string"){B=dojo._escapeString(N)
}else{continue
}}D=A(H[N],E,K);
if(typeof (D)!="string"){continue
}C.push(I+K+B+": "+D)
}return"{"+C.join(", ")+I+L+"}"
}
};