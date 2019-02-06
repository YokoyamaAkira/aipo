dojo._xdResourceLoaded({depends:[["provide","dojox.validate.check"],["require","dojox.validate._base"]],defineResource:function(A){if(!A._hasResource["dojox.validate.check"]){A._hasResource["dojox.validate.check"]=true;
A.provide("dojox.validate.check");
A.require("dojox.validate._base");
dojox.validate.check=function(L,M){var P=[];
var G=[];
var B={isSuccessful:function(){return(!this.hasInvalid()&&!this.hasMissing())
},hasMissing:function(){return(P.length>0)
},getMissing:function(){return P
},isMissing:function(R){for(var Q=0;
Q<P.length;
Q++){if(R==P[Q]){return true
}}return false
},hasInvalid:function(){return(G.length>0)
},getInvalid:function(){return G
},isInvalid:function(R){for(var Q=0;
Q<G.length;
Q++){if(R==G[Q]){return true
}}return false
}};
var D=function(R,Q){return(typeof Q[R]=="undefined")
};
if(M.trim instanceof Array){for(var C=0;
C<M.trim.length;
C++){var E=L[M.trim[C]];
if(D("type",E)||E.type!="text"&&E.type!="textarea"&&E.type!="password"){continue
}E.value=E.value.replace(/(^\s*|\s*$)/g,"")
}}if(M.uppercase instanceof Array){for(var C=0;
C<M.uppercase.length;
C++){var E=L[M.uppercase[C]];
if(D("type",E)||E.type!="text"&&E.type!="textarea"&&E.type!="password"){continue
}E.value=E.value.toUpperCase()
}}if(M.lowercase instanceof Array){for(var C=0;
C<M.lowercase.length;
C++){var E=L[M.lowercase[C]];
if(D("type",E)||E.type!="text"&&E.type!="textarea"&&E.type!="password"){continue
}E.value=E.value.toLowerCase()
}}if(M.ucfirst instanceof Array){for(var C=0;
C<M.ucfirst.length;
C++){var E=L[M.ucfirst[C]];
if(D("type",E)||E.type!="text"&&E.type!="textarea"&&E.type!="password"){continue
}E.value=E.value.replace(/\b\w+\b/g,function(Q){return Q.substring(0,1).toUpperCase()+Q.substring(1).toLowerCase()
})
}}if(M.digit instanceof Array){for(var C=0;
C<M.digit.length;
C++){var E=L[M.digit[C]];
if(D("type",E)||E.type!="text"&&E.type!="textarea"&&E.type!="password"){continue
}E.value=E.value.replace(/\D/g,"")
}}if(M.required instanceof Array){for(var C=0;
C<M.required.length;
C++){if(!A.isString(M.required[C])){continue
}var E=L[M.required[C]];
if(!D("type",E)&&(E.type=="text"||E.type=="textarea"||E.type=="password"||E.type=="file")&&/^\s*$/.test(E.value)){P[P.length]=E.name
}else{if(!D("type",E)&&(E.type=="select-one"||E.type=="select-multiple")&&(E.selectedIndex==-1||/^\s*$/.test(E.options[E.selectedIndex].value))){P[P.length]=E.name
}else{if(E instanceof Array){var H=false;
for(var O=0;
O<E.length;
O++){if(E[O].checked){H=true
}}if(!H){P[P.length]=E[0].name
}}}}}}if(M.required instanceof Array){for(var C=0;
C<M.required.length;
C++){if(!A.isObject(M.required[C])){continue
}var E,J;
for(var K in M.required[C]){E=L[K];
J=M.required[C][K]
}if(E instanceof Array){var H=0;
for(var O=0;
O<E.length;
O++){if(E[O].checked){H++
}}if(H<J){P[P.length]=E[0].name
}}else{if(!D("type",E)&&E.type=="select-multiple"){var N=0;
for(var O=0;
O<E.options.length;
O++){if(E.options[O].selected&&!/^\s*$/.test(E.options[O].value)){N++
}}if(N<J){P[P.length]=E.name
}}}}}if(A.isObject(M.dependencies)){for(K in M.dependencies){var E=L[K];
if(D("type",E)){continue
}if(E.type!="text"&&E.type!="textarea"&&E.type!="password"){continue
}if(/\S+/.test(E.value)){continue
}if(B.isMissing(E.name)){continue
}var F=L[M.dependencies[K]];
if(F.type!="text"&&F.type!="textarea"&&F.type!="password"){continue
}if(/^\s*$/.test(F.value)){continue
}P[P.length]=E.name
}}if(A.isObject(M.constraints)){for(K in M.constraints){var E=L[K];
if(!E){continue
}if(!D("tagName",E)&&(E.tagName.toLowerCase().indexOf("input")>=0||E.tagName.toLowerCase().indexOf("textarea")>=0)&&/^\s*$/.test(E.value)){continue
}var I=true;
if(A.isFunction(M.constraints[K])){I=M.constraints[K](E.value)
}else{if(A.isArray(M.constraints[K])){if(A.isArray(M.constraints[K][0])){for(var C=0;
C<M.constraints[K].length;
C++){I=dojox.validate.evaluateConstraint(M,M.constraints[K][C],K,E);
if(!I){break
}}}else{I=dojox.validate.evaluateConstraint(M,M.constraints[K],K,E)
}}}if(!I){G[G.length]=E.name
}}}if(A.isObject(M.confirm)){for(K in M.confirm){var E=L[K];
var F=L[M.confirm[K]];
if(D("type",E)||D("type",F)||(E.type!="text"&&E.type!="textarea"&&E.type!="password")||(F.type!=E.type)||(F.value==E.value)||(B.isInvalid(E.name))||(/^\s*$/.test(F.value))){continue
}G[G.length]=E.name
}}return B
};
dojox.validate.evaluateConstraint=function(C,E,B,D){var G=E[0];
var F=E.slice(1);
F.unshift(D.value);
if(typeof G!="undefined"){return G.apply(null,F)
}return false
}
}}});