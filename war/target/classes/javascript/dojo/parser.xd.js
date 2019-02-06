dojo._xdResourceLoaded({depends:[["provide","dojo.parser"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojo.parser"]){A._hasResource["dojo.parser"]=true;
A.provide("dojo.parser");
A.require("dojo.date.stamp");
A.parser=new function(){var B=A;
function C(G){if(B.isString(G)){return"string"
}if(typeof G=="number"){return"number"
}if(typeof G=="boolean"){return"boolean"
}if(B.isFunction(G)){return"function"
}if(B.isArray(G)){return"array"
}if(G instanceof Date){return"date"
}if(G instanceof B._Url){return"url"
}return"object"
}function D(H,G){switch(G){case"string":return H;
case"number":return H.length?Number(H):NaN;
case"boolean":return typeof H=="boolean"?H:!(H.toLowerCase()=="false");
case"function":if(B.isFunction(H)){H=H.toString();
H=B.trim(H.substring(H.indexOf("{")+1,H.length-1))
}try{if(H.search(/[^\w\.]+/i)!=-1){H=B.parser._nameAnonFunc(new Function(H),this)
}return B.getObject(H,false)
}catch(I){return new Function()
}case"array":return H.split(/\s*,\s*/);
case"date":switch(H){case"":return new Date("");
case"now":return new Date();
default:return B.date.stamp.fromISOString(H)
}case"url":return B.baseUrl+H;
default:return B.fromJson(H)
}}var F={};
function E(G){if(!F[G]){var K=B.getObject(G);
if(!B.isFunction(K)){throw new Error("Could not load class '"+G+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var H=K.prototype;
var J={};
for(var L in H){if(L.charAt(0)=="_"){continue
}var I=H[L];
J[L]=C(I)
}F[G]={cls:K,params:J}
}return F[G]
}this._functionFromScript=function(H){var I="";
var K="";
var G=H.getAttribute("args");
if(G){B.forEach(G.split(/\s*,\s*/),function(M,L){I+="var "+M+" = arguments["+L+"]; "
})
}var J=H.getAttribute("with");
if(J&&J.length){B.forEach(J.split(/\s*,\s*/),function(L){I+="with("+L+"){";
K+="}"
})
}return new Function(I+H.innerHTML+K)
};
this.instantiate=function(G){var H=[];
B.forEach(G,function(M){if(!M){return 
}var U=M.getAttribute("dojoType");
if((!U)||(!U.length)){return 
}var R=E(U);
var S=R.cls;
var K=S._noScript||S.prototype._noScript;
var N={};
var P=M.attributes;
for(var L in R.params){var W=P.getNamedItem(L);
if(!W||(!W.specified&&(!A.isIE||L.toLowerCase()!="value"))){continue
}var I=W.value;
switch(L){case"class":I=M.className;
break;
case"style":I=M.style&&M.style.cssText
}var Q=R.params[L];
N[L]=D(I,Q)
}if(!K){var O=[],X=[];
B.query("> script[type^='dojo/']",M).orphan().forEach(function(a){var Y=a.getAttribute("event"),b=a.getAttribute("type"),Z=B.parser._functionFromScript(a);
if(Y){if(b=="dojo/connect"){O.push({event:Y,func:Z})
}else{N[Y]=Z
}}else{X.push(Z)
}})
}var V=S.markupFactory;
if(!V&&S.prototype){V=S.prototype.markupFactory
}var J=V?V(N,M,S):new S(N,M);
H.push(J);
var T=M.getAttribute("jsId");
if(T){B.setObject(T,J)
}if(!K){A.forEach(O,function(Y){A.connect(J,Y.event,null,Y.func)
});
A.forEach(X,function(Y){Y.call(J)
})
}});
B.forEach(H,function(I){if(I&&(I.startup)&&((!I.getParent)||(!I.getParent()))){I.startup()
}});
return H
};
this.parse=function(G){var H=B.query("[dojoType]",G);
var I=this.instantiate(H);
return I
}
}();
(function(){var B=function(){if(djConfig.parseOnLoad==true){A.parser.parse()
}};
if(A.exists("dijit.wai.onload")&&(dijit.wai.onload===A._loaders[0])){A._loaders.splice(1,0,B)
}else{A._loaders.unshift(B)
}})();
A.parser._anonCtr=0;
A.parser._anon={};
A.parser._nameAnonFunc=function(C,G){var F="$joinpoint";
var E=(G||A.parser._anon);
if(A.isIE){var B=C.__dojoNameCache;
if(B&&E[B]===C){return C.__dojoNameCache
}}var D="__"+A.parser._anonCtr++;
while(typeof E[D]!="undefined"){D="__"+A.parser._anonCtr++
}E[D]=C;
return D
}
}}});