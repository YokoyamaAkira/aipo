if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.require("dojo.date.stamp");
dojo.parser=new function(){var D=dojo;
function E(F){if(D.isString(F)){return"string"
}if(typeof F=="number"){return"number"
}if(typeof F=="boolean"){return"boolean"
}if(D.isFunction(F)){return"function"
}if(D.isArray(F)){return"array"
}if(F instanceof Date){return"date"
}if(F instanceof D._Url){return"url"
}return"object"
}function A(H,G){switch(G){case"string":return H;
case"number":return H.length?Number(H):NaN;
case"boolean":return typeof H=="boolean"?H:!(H.toLowerCase()=="false");
case"function":if(D.isFunction(H)){H=H.toString();
H=D.trim(H.substring(H.indexOf("{")+1,H.length-1))
}try{if(H.search(/[^\w\.]+/i)!=-1){H=D.parser._nameAnonFunc(new Function(H),this)
}return D.getObject(H,false)
}catch(F){return new Function()
}case"array":return H.split(/\s*,\s*/);
case"date":switch(H){case"":return new Date("");
case"now":return new Date();
default:return D.date.stamp.fromISOString(H)
}case"url":return D.baseUrl+H;
default:return D.fromJson(H)
}}var C={};
function B(I){if(!C[I]){var G=D.getObject(I);
if(!D.isFunction(G)){throw new Error("Could not load class '"+I+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?")
}var J=G.prototype;
var F={};
for(var H in J){if(H.charAt(0)=="_"){continue
}var K=J[H];
F[H]=E(K)
}C[I]={cls:G,params:F}
}return C[I]
}this._functionFromScript=function(H){var I="";
var F="";
var G=H.getAttribute("args");
if(G){D.forEach(G.split(/\s*,\s*/),function(L,K){I+="var "+L+" = arguments["+K+"]; "
})
}var J=H.getAttribute("with");
if(J&&J.length){D.forEach(J.split(/\s*,\s*/),function(K){I+="with("+K+"){";
F+="}"
})
}return new Function(I+H.innerHTML+F)
};
this.instantiate=function(G){var F=[];
D.forEach(G,function(O){if(!O){return 
}var J=O.getAttribute("dojoType");
if((!J)||(!J.length)){return 
}var T=B(J);
var U=T.cls;
var M=U._noScript||U.prototype._noScript;
var P={};
var R=O.attributes;
for(var N in T.params){var H=R.getNamedItem(N);
if(!H||(!H.specified&&(!dojo.isIE||N.toLowerCase()!="value"))){continue
}var L=H.value;
switch(N){case"class":L=O.className;
break;
case"style":L=O.style&&O.style.cssText
}var S=T.params[N];
P[N]=A(L,S)
}if(!M){var Q=[],I=[];
D.query("> script[type^='dojo/']",O).orphan().forEach(function(Z){var X=Z.getAttribute("event"),a=Z.getAttribute("type"),Y=D.parser._functionFromScript(Z);
if(X){if(a=="dojo/connect"){Q.push({event:X,func:Y})
}else{P[X]=Y
}}else{I.push(Y)
}})
}var K=U.markupFactory;
if(!K&&U.prototype){K=U.prototype.markupFactory
}var W=K?K(P,O,U):new U(P,O);
F.push(W);
var V=O.getAttribute("jsId");
if(V){D.setObject(V,W)
}if(!M){dojo.forEach(Q,function(X){dojo.connect(W,X.event,null,X.func)
});
dojo.forEach(I,function(X){X.call(W)
})
}});
D.forEach(F,function(H){if(H&&(H.startup)&&((!H.getParent)||(!H.getParent()))){H.startup()
}});
return F
};
this.parse=function(G){var H=D.query("[dojoType]",G);
var F=this.instantiate(H);
return F
}
}();
(function(){var A=function(){if(djConfig.parseOnLoad==true){dojo.parser.parse()
}};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){dojo._loaders.splice(1,0,A)
}else{dojo._loaders.unshift(A)
}})();
dojo.parser._anonCtr=0;
dojo.parser._anon={};
dojo.parser._nameAnonFunc=function(F,D){var C="$joinpoint";
var B=(D||dojo.parser._anon);
if(dojo.isIE){var E=F.__dojoNameCache;
if(E&&B[E]===F){return F.__dojoNameCache
}}var A="__"+dojo.parser._anonCtr++;
while(typeof B[A]!="undefined"){A="__"+dojo.parser._anonCtr++
}B[A]=F;
return A
}
};