dojo._xdResourceLoaded({depends:[["provide","dojox.validate.check"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.check"]){A._hasResource["dojox.validate.check"]=true;
A.provide("dojox.validate.check");
A.require("dojox.validate._base");
dojox.validate.check=function(C,E){var H=[];
var M=[];
var I={isSuccessful:function(){return(!this.hasInvalid()&&!this.hasMissing())
},hasMissing:function(){return(H.length>0)
},getMissing:function(){return H
},isMissing:function(R){for(var Q=0;
Q<H.length;
Q++){if(R==H[Q]){return true
}}return false
},hasInvalid:function(){return(M.length>0)
},getInvalid:function(){return M
},isInvalid:function(R){for(var Q=0;
Q<M.length;
Q++){if(R==M[Q]){return true
}}return false
}};
var K=function(R,Q){return(typeof Q[R]=="undefined")
};
if(E.trim instanceof Array){for(var J=0;
J<E.trim.length;
J++){var D=C[E.trim[J]];
if(K("type",D)||D.type!="text"&&D.type!="textarea"&&D.type!="password"){continue
}D.value=D.value.replace(/(^\s*|\s*$)/g,"")
}}if(E.uppercase instanceof Array){for(var J=0;
J<E.uppercase.length;
J++){var D=C[E.uppercase[J]];
if(K("type",D)||D.type!="text"&&D.type!="textarea"&&D.type!="password"){continue
}D.value=D.value.toUpperCase()
}}if(E.lowercase instanceof Array){for(var J=0;
J<E.lowercase.length;
J++){var D=C[E.lowercase[J]];
if(K("type",D)||D.type!="text"&&D.type!="textarea"&&D.type!="password"){continue
}D.value=D.value.toLowerCase()
}}if(E.ucfirst instanceof Array){for(var J=0;
J<E.ucfirst.length;
J++){var D=C[E.ucfirst[J]];
if(K("type",D)||D.type!="text"&&D.type!="textarea"&&D.type!="password"){continue
}D.value=D.value.replace(/\b\w+\b/g,function(Q){return Q.substring(0,1).toUpperCase()+Q.substring(1).toLowerCase()
})
}}if(E.digit instanceof Array){for(var J=0;
J<E.digit.length;
J++){var D=C[E.digit[J]];
if(K("type",D)||D.type!="text"&&D.type!="textarea"&&D.type!="password"){continue
}D.value=D.value.replace(/\D/g,"")
}}if(E.required instanceof Array){for(var J=0;
J<E.required.length;
J++){if(!A.isString(E.required[J])){continue
}var D=C[E.required[J]];
if(!K("type",D)&&(D.type=="text"||D.type=="textarea"||D.type=="password"||D.type=="file")&&/^\s*$/.test(D.value)){H[H.length]=D.name
}else{if(!K("type",D)&&(D.type=="select-one"||D.type=="select-multiple")&&(D.selectedIndex==-1||/^\s*$/.test(D.options[D.selectedIndex].value))){H[H.length]=D.name
}else{if(D instanceof Array){var N=false;
for(var G=0;
G<D.length;
G++){if(D[G].checked){N=true
}}if(!N){H[H.length]=D[0].name
}}}}}}if(E.required instanceof Array){for(var J=0;
J<E.required.length;
J++){if(!A.isObject(E.required[J])){continue
}var D,P;
for(var B in E.required[J]){D=C[B];
P=E.required[J][B]
}if(D instanceof Array){var N=0;
for(var G=0;
G<D.length;
G++){if(D[G].checked){N++
}}if(N<P){H[H.length]=D[0].name
}}else{if(!K("type",D)&&D.type=="select-multiple"){var F=0;
for(var G=0;
G<D.options.length;
G++){if(D.options[G].selected&&!/^\s*$/.test(D.options[G].value)){F++
}}if(F<P){H[H.length]=D.name
}}}}}if(A.isObject(E.dependencies)){for(B in E.dependencies){var D=C[B];
if(K("type",D)){continue
}if(D.type!="text"&&D.type!="textarea"&&D.type!="password"){continue
}if(/\S+/.test(D.value)){continue
}if(I.isMissing(D.name)){continue
}var L=C[E.dependencies[B]];
if(L.type!="text"&&L.type!="textarea"&&L.type!="password"){continue
}if(/^\s*$/.test(L.value)){continue
}H[H.length]=D.name
}}if(A.isObject(E.constraints)){for(B in E.constraints){var D=C[B];
if(!D){continue
}if(!K("tagName",D)&&(D.tagName.toLowerCase().indexOf("input")>=0||D.tagName.toLowerCase().indexOf("textarea")>=0)&&/^\s*$/.test(D.value)){continue
}var O=true;
if(A.isFunction(E.constraints[B])){O=E.constraints[B](D.value)
}else{if(A.isArray(E.constraints[B])){if(A.isArray(E.constraints[B][0])){for(var J=0;
J<E.constraints[B].length;
J++){O=dojox.validate.evaluateConstraint(E,E.constraints[B][J],B,D);
if(!O){break
}}}else{O=dojox.validate.evaluateConstraint(E,E.constraints[B],B,D)
}}}if(!O){M[M.length]=D.name
}}}if(A.isObject(E.confirm)){for(B in E.confirm){var D=C[B];
var L=C[E.confirm[B]];
if(K("type",D)||K("type",L)||(D.type!="text"&&D.type!="textarea"&&D.type!="password")||(L.type!=D.type)||(L.value==D.value)||(I.isInvalid(D.name))||(/^\s*$/.test(L.value))){continue
}M[M.length]=D.name
}}return I
};
dojox.validate.evaluateConstraint=function(B,D,G,C){var F=D[0];
var E=D.slice(1);
E.unshift(C.value);
if(typeof F!="undefined"){return F.apply(null,E)
}return false
}
}}});