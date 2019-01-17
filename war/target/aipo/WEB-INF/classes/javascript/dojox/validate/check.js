if(!dojo._hasResource["dojox.validate.check"]){dojo._hasResource["dojox.validate.check"]=true;
dojo.provide("dojox.validate.check");
dojo.require("dojox.validate._base");
dojox.validate.check=function(B,D){var G=[];
var L=[];
var H={isSuccessful:function(){return(!this.hasInvalid()&&!this.hasMissing())
},hasMissing:function(){return(G.length>0)
},getMissing:function(){return G
},isMissing:function(Q){for(var P=0;
P<G.length;
P++){if(Q==G[P]){return true
}}return false
},hasInvalid:function(){return(L.length>0)
},getInvalid:function(){return L
},isInvalid:function(Q){for(var P=0;
P<L.length;
P++){if(Q==L[P]){return true
}}return false
}};
var J=function(Q,P){return(typeof P[Q]=="undefined")
};
if(D.trim instanceof Array){for(var I=0;
I<D.trim.length;
I++){var C=B[D.trim[I]];
if(J("type",C)||C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}C.value=C.value.replace(/(^\s*|\s*$)/g,"")
}}if(D.uppercase instanceof Array){for(var I=0;
I<D.uppercase.length;
I++){var C=B[D.uppercase[I]];
if(J("type",C)||C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}C.value=C.value.toUpperCase()
}}if(D.lowercase instanceof Array){for(var I=0;
I<D.lowercase.length;
I++){var C=B[D.lowercase[I]];
if(J("type",C)||C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}C.value=C.value.toLowerCase()
}}if(D.ucfirst instanceof Array){for(var I=0;
I<D.ucfirst.length;
I++){var C=B[D.ucfirst[I]];
if(J("type",C)||C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}C.value=C.value.replace(/\b\w+\b/g,function(P){return P.substring(0,1).toUpperCase()+P.substring(1).toLowerCase()
})
}}if(D.digit instanceof Array){for(var I=0;
I<D.digit.length;
I++){var C=B[D.digit[I]];
if(J("type",C)||C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}C.value=C.value.replace(/\D/g,"")
}}if(D.required instanceof Array){for(var I=0;
I<D.required.length;
I++){if(!dojo.isString(D.required[I])){continue
}var C=B[D.required[I]];
if(!J("type",C)&&(C.type=="text"||C.type=="textarea"||C.type=="password"||C.type=="file")&&/^\s*$/.test(C.value)){G[G.length]=C.name
}else{if(!J("type",C)&&(C.type=="select-one"||C.type=="select-multiple")&&(C.selectedIndex==-1||/^\s*$/.test(C.options[C.selectedIndex].value))){G[G.length]=C.name
}else{if(C instanceof Array){var M=false;
for(var F=0;
F<C.length;
F++){if(C[F].checked){M=true
}}if(!M){G[G.length]=C[0].name
}}}}}}if(D.required instanceof Array){for(var I=0;
I<D.required.length;
I++){if(!dojo.isObject(D.required[I])){continue
}var C,O;
for(var A in D.required[I]){C=B[A];
O=D.required[I][A]
}if(C instanceof Array){var M=0;
for(var F=0;
F<C.length;
F++){if(C[F].checked){M++
}}if(M<O){G[G.length]=C[0].name
}}else{if(!J("type",C)&&C.type=="select-multiple"){var E=0;
for(var F=0;
F<C.options.length;
F++){if(C.options[F].selected&&!/^\s*$/.test(C.options[F].value)){E++
}}if(E<O){G[G.length]=C.name
}}}}}if(dojo.isObject(D.dependencies)){for(A in D.dependencies){var C=B[A];
if(J("type",C)){continue
}if(C.type!="text"&&C.type!="textarea"&&C.type!="password"){continue
}if(/\S+/.test(C.value)){continue
}if(H.isMissing(C.name)){continue
}var K=B[D.dependencies[A]];
if(K.type!="text"&&K.type!="textarea"&&K.type!="password"){continue
}if(/^\s*$/.test(K.value)){continue
}G[G.length]=C.name
}}if(dojo.isObject(D.constraints)){for(A in D.constraints){var C=B[A];
if(!C){continue
}if(!J("tagName",C)&&(C.tagName.toLowerCase().indexOf("input")>=0||C.tagName.toLowerCase().indexOf("textarea")>=0)&&/^\s*$/.test(C.value)){continue
}var N=true;
if(dojo.isFunction(D.constraints[A])){N=D.constraints[A](C.value)
}else{if(dojo.isArray(D.constraints[A])){if(dojo.isArray(D.constraints[A][0])){for(var I=0;
I<D.constraints[A].length;
I++){N=dojox.validate.evaluateConstraint(D,D.constraints[A][I],A,C);
if(!N){break
}}}else{N=dojox.validate.evaluateConstraint(D,D.constraints[A],A,C)
}}}if(!N){L[L.length]=C.name
}}}if(dojo.isObject(D.confirm)){for(A in D.confirm){var C=B[A];
var K=B[D.confirm[A]];
if(J("type",C)||J("type",K)||(C.type!="text"&&C.type!="textarea"&&C.type!="password")||(K.type!=C.type)||(K.value==C.value)||(H.isInvalid(C.name))||(/^\s*$/.test(K.value))){continue
}L[L.length]=C.name
}}return H
};
dojox.validate.evaluateConstraint=function(A,C,F,B){var E=C[0];
var D=C.slice(1);
D.unshift(B.value);
if(typeof E!="undefined"){return E.apply(null,D)
}return false
}
};