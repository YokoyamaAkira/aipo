if(!dojo._hasResource["dojox.validate.check"]){dojo._hasResource["dojox.validate.check"]=true;
dojo.provide("dojox.validate.check");
dojo.require("dojox.validate._base");
dojox.validate.check=function(I,K){var N=[];
var D=[];
var O={isSuccessful:function(){return(!this.hasInvalid()&&!this.hasMissing())
},hasMissing:function(){return(N.length>0)
},getMissing:function(){return N
},isMissing:function(P){for(var Q=0;
Q<N.length;
Q++){if(P==N[Q]){return true
}}return false
},hasInvalid:function(){return(D.length>0)
},getInvalid:function(){return D
},isInvalid:function(P){for(var Q=0;
Q<D.length;
Q++){if(P==D[Q]){return true
}}return false
}};
var B=function(P,Q){return(typeof Q[P]=="undefined")
};
if(K.trim instanceof Array){for(var A=0;
A<K.trim.length;
A++){var J=I[K.trim[A]];
if(B("type",J)||J.type!="text"&&J.type!="textarea"&&J.type!="password"){continue
}J.value=J.value.replace(/(^\s*|\s*$)/g,"")
}}if(K.uppercase instanceof Array){for(var A=0;
A<K.uppercase.length;
A++){var J=I[K.uppercase[A]];
if(B("type",J)||J.type!="text"&&J.type!="textarea"&&J.type!="password"){continue
}J.value=J.value.toUpperCase()
}}if(K.lowercase instanceof Array){for(var A=0;
A<K.lowercase.length;
A++){var J=I[K.lowercase[A]];
if(B("type",J)||J.type!="text"&&J.type!="textarea"&&J.type!="password"){continue
}J.value=J.value.toLowerCase()
}}if(K.ucfirst instanceof Array){for(var A=0;
A<K.ucfirst.length;
A++){var J=I[K.ucfirst[A]];
if(B("type",J)||J.type!="text"&&J.type!="textarea"&&J.type!="password"){continue
}J.value=J.value.replace(/\b\w+\b/g,function(P){return P.substring(0,1).toUpperCase()+P.substring(1).toLowerCase()
})
}}if(K.digit instanceof Array){for(var A=0;
A<K.digit.length;
A++){var J=I[K.digit[A]];
if(B("type",J)||J.type!="text"&&J.type!="textarea"&&J.type!="password"){continue
}J.value=J.value.replace(/\D/g,"")
}}if(K.required instanceof Array){for(var A=0;
A<K.required.length;
A++){if(!dojo.isString(K.required[A])){continue
}var J=I[K.required[A]];
if(!B("type",J)&&(J.type=="text"||J.type=="textarea"||J.type=="password"||J.type=="file")&&/^\s*$/.test(J.value)){N[N.length]=J.name
}else{if(!B("type",J)&&(J.type=="select-one"||J.type=="select-multiple")&&(J.selectedIndex==-1||/^\s*$/.test(J.options[J.selectedIndex].value))){N[N.length]=J.name
}else{if(J instanceof Array){var E=false;
for(var M=0;
M<J.length;
M++){if(J[M].checked){E=true
}}if(!E){N[N.length]=J[0].name
}}}}}}if(K.required instanceof Array){for(var A=0;
A<K.required.length;
A++){if(!dojo.isObject(K.required[A])){continue
}var J,G;
for(var H in K.required[A]){J=I[H];
G=K.required[A][H]
}if(J instanceof Array){var E=0;
for(var M=0;
M<J.length;
M++){if(J[M].checked){E++
}}if(E<G){N[N.length]=J[0].name
}}else{if(!B("type",J)&&J.type=="select-multiple"){var L=0;
for(var M=0;
M<J.options.length;
M++){if(J.options[M].selected&&!/^\s*$/.test(J.options[M].value)){L++
}}if(L<G){N[N.length]=J.name
}}}}}if(dojo.isObject(K.dependencies)){for(H in K.dependencies){var J=I[H];
if(B("type",J)){continue
}if(J.type!="text"&&J.type!="textarea"&&J.type!="password"){continue
}if(/\S+/.test(J.value)){continue
}if(O.isMissing(J.name)){continue
}var C=I[K.dependencies[H]];
if(C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}if(/^\s*$/.test(C.value)){continue
}N[N.length]=J.name
}}if(dojo.isObject(K.constraints)){for(H in K.constraints){var J=I[H];
if(!J){continue
}if(!B("tagName",J)&&(J.tagName.toLowerCase().indexOf("input")>=0||J.tagName.toLowerCase().indexOf("textarea")>=0)&&/^\s*$/.test(J.value)){continue
}var F=true;
if(dojo.isFunction(K.constraints[H])){F=K.constraints[H](J.value)
}else{if(dojo.isArray(K.constraints[H])){if(dojo.isArray(K.constraints[H][0])){for(var A=0;
A<K.constraints[H].length;
A++){F=dojox.validate.evaluateConstraint(K,K.constraints[H][A],H,J);
if(!F){break
}}}else{F=dojox.validate.evaluateConstraint(K,K.constraints[H],H,J)
}}}if(!F){D[D.length]=J.name
}}}if(dojo.isObject(K.confirm)){for(H in K.confirm){var J=I[H];
var C=I[K.confirm[H]];
if(B("type",J)||B("type",C)||(J.type!="text"&&J.type!="textarea"&&J.type!="password")||(C.type!=J.type)||(C.value==J.value)||(O.isInvalid(J.name))||(/^\s*$/.test(C.value))){continue
}D[D.length]=J.name
}}return O
};
dojox.validate.evaluateConstraint=function(F,B,E,A){var D=B[0];
var C=B.slice(1);
C.unshift(A.value);
if(typeof D!="undefined"){return D.apply(null,C)
}return false
}
};