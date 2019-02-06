if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.require("dojo.date.stamp");
dojo.parser=new function(){var E=dojo;
function A(F){if(E.isString(F)){return"string"
}if(typeof F=="number"){return"number"
}if(typeof F=="boolean"){return"boolean"
}if(E.isFunction(F)){return"function"
}if(E.isArray(F)){return"array"
}if(F instanceof Date){return"date"
}if(F instanceof E._Url){return"url"
}return"object"
}function B(G,F){switch(F){case"string":return G;
case"number":return G.length?Number(G):NaN;
case"boolean":return typeof G=="boolean"?G:!(G.toLowerCase()=="false");
case"function":if(E.isFunction(G)){G=G.toString();
G=E.trim(G.substring(G.indexOf("{")+1,G.length-1))
}try{if(G.search(/[^\w\.]+/i)!=-1){G=E.parser._nameAnonFunc(new Function(G),this)
}return E.getObject(G,false)
}catch(H){return new Function()
}case"array":return G.split(/\s*,\s*/);
case"date":switch(G){case"":return new Date("");
case"now":return new Date();
default:return E.date.stamp.fromISOString(G)
}case"url":return E.baseUrl+G;
default:return E.fromJson(G)
}}var D={};
function C(H){if(!D[H]){var F=E.getObject(H);
if(!E.isFunction(F)){throw new Error("Could not load class '"+H+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var I=F.prototype;
var K={};
for(var G in I){if(G.charAt(0)=="_"){continue
}var J=I[G];
K[G]=A(J)
}D[H]={cls:F,params:K}
}return D[H]
}this._functionFromScript=function(G){var H="";
var J="";
var F=G.getAttribute("args");
if(F){E.forEach(F.split(/\s*,\s*/),function(L,K){H+="var "+L+" = arguments["+K+"]; "
})
}var I=G.getAttribute("with");
if(I&&I.length){E.forEach(I.split(/\s*,\s*/),function(K){H+="with("+K+"){";
J+="}"
})
}return new Function(H+G.innerHTML+J)
};
this.instantiate=function(F){var G=[];
E.forEach(F,function(J){if(!J){return 
}var R=J.getAttribute("dojoType");
if((!R)||(!R.length)){return 
}var O=C(R);
var P=O.cls;
var H=P._noScript||P.prototype._noScript;
var K={};
var M=J.attributes;
for(var I in O.params){var V=M.getNamedItem(I);
if(!V||(!V.specified&&(!dojo.isIE||I.toLowerCase()!="value"))){continue
}var T=V.value;
switch(I){case"class":T=J.className;
break;
case"style":T=J.style&&J.style.cssText
}var N=O.params[I];
K[I]=B(T,N)
}if(!H){var L=[],W=[];
E.query("> script[type^='dojo/']",J).orphan().forEach(function(X){var Z=X.getAttribute("event"),Y=X.getAttribute("type"),a=E.parser._functionFromScript(X);
if(Z){if(Y=="dojo/connect"){L.push({event:Z,func:a})
}else{K[Z]=a
}}else{W.push(a)
}})
}var S=P.markupFactory;
if(!S&&P.prototype){S=P.prototype.markupFactory
}var U=S?S(K,J,P):new P(K,J);
G.push(U);
var Q=J.getAttribute("jsId");
if(Q){E.setObject(Q,U)
}if(!H){dojo.forEach(L,function(X){dojo.connect(U,X.event,null,X.func)
});
dojo.forEach(W,function(X){X.call(U)
})
}});
E.forEach(G,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return G
};
this.parse=function(F){var G=E.query("[dojoType]",F);
var H=this.instantiate(G);
return H
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(A,E){var D="$joinpoint";
var C=(E||dojo.parser._anon);
if(dojo.isIE){var F=A.__dojoNameCache;
if(F&&C[F]===A){return A.__dojoNameCache
}}var B="__"+dojo.parser._anonCtr++;
while(typeof C[B]!="undefined"){B="__"+dojo.parser._anonCtr++
}C[B]=A;
return B
}
};