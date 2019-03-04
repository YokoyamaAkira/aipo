dojo._xdResourceLoaded({depends:[["provide","dojo.parser"],["require","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojo.parser"]){A._hasResource["dojo.parser"]=true;
A.provide("dojo.parser");
A.require("dojo.date.stamp");
A.parser=new function(){var F=A;
function B(G){if(F.isString(G)){return"string"
}if(typeof G=="number"){return"number"
}if(typeof G=="boolean"){return"boolean"
}if(F.isFunction(G)){return"function"
}if(F.isArray(G)){return"array"
}if(G instanceof Date){return"date"
}if(G instanceof F._Url){return"url"
}return"object"
}function C(H,G){switch(G){case"string":return H;
case"number":return H.length?Number(H):NaN;
case"boolean":return typeof H=="boolean"?H:!(H.toLowerCase()=="false");
case"function":if(F.isFunction(H)){H=H.toString();
H=F.trim(H.substring(H.indexOf("{")+1,H.length-1))
}try{if(H.search(/[^\w\.]+/i)!=-1){H=F.parser._nameAnonFunc(new Function(H),this)
}return F.getObject(H,false)
}catch(I){return new Function()
}case"array":return H.split(/\s*,\s*/);
case"date":switch(H){case"":return new Date("");
case"now":return new Date();
default:return F.date.stamp.fromISOString(H)
}case"url":return F.baseUrl+H;
default:return F.fromJson(H)
}}var E={};
function D(I){if(!E[I]){var G=F.getObject(I);
if(!F.isFunction(G)){throw new Error("Could not load class '"+I+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var J=G.prototype;
var L={};
for(var H in J){if(H.charAt(0)=="_"){continue
}var K=J[H];
L[H]=B(K)
}E[I]={cls:G,params:L}
}return E[I]
}this._functionFromScript=function(H){var I="";
var K="";
var G=H.getAttribute("args");
if(G){F.forEach(G.split(/\s*,\s*/),function(M,L){I+="var "+M+" = arguments["+L+"]; "
})
}var J=H.getAttribute("with");
if(J&&J.length){F.forEach(J.split(/\s*,\s*/),function(L){I+="with("+L+"){";
K+="}"
})
}return new Function(I+H.innerHTML+K)
};
this.instantiate=function(G){var H=[];
F.forEach(G,function(K){if(!K){return 
}var S=K.getAttribute("dojoType");
if((!S)||(!S.length)){return 
}var P=D(S);
var Q=P.cls;
var I=Q._noScript||Q.prototype._noScript;
var L={};
var N=K.attributes;
for(var J in P.params){var W=N.getNamedItem(J);
if(!W||(!W.specified&&(!A.isIE||J.toLowerCase()!="value"))){continue
}var U=W.value;
switch(J){case"class":U=K.className;
break;
case"style":U=K.style&&K.style.cssText
}var O=P.params[J];
L[J]=C(U,O)
}if(!I){var M=[],X=[];
F.query("> script[type^='dojo/']",K).orphan().forEach(function(Y){var a=Y.getAttribute("event"),Z=Y.getAttribute("type"),b=F.parser._functionFromScript(Y);
if(a){if(Z=="dojo/connect"){M.push({event:a,func:b})
}else{L[a]=b
}}else{X.push(b)
}})
}var T=Q.markupFactory;
if(!T&&Q.prototype){T=Q.prototype.markupFactory
}var V=T?T(L,K,Q):new Q(L,K);
H.push(V);
var R=K.getAttribute("jsId");
if(R){F.setObject(R,V)
}if(!I){A.forEach(M,function(Y){A.connect(V,Y.event,null,Y.func)
});
A.forEach(X,function(Y){Y.call(V)
})
}});
F.forEach(H,function(I){if(I&&(I.startup)&&((!I.getParent)||(!I.getParent()))){I.startup()
}});
return H
};
this.parse=function(G){var H=F.query("[dojoType]",G);
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
A.parser._nameAnonFunc=function(B,F){var E="$joinpoint";
var D=(F||A.parser._anon);
if(A.isIE){var G=B.__dojoNameCache;
if(G&&D[G]===B){return B.__dojoNameCache
}}var C="__"+A.parser._anonCtr++;
while(typeof D[C]!="undefined"){C="__"+A.parser._anonCtr++
}D[C]=B;
return C
}
}}});