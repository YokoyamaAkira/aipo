if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(C){var A=C.getMonth();
var B=[31,28,31,30,31,30,31,31,30,31,30,31];
if(A==1&&dojo.date.isLeapYear(C)){return 29
}return B[A]
};
dojo.date.isLeapYear=function(A){var B=A.getFullYear();
return !(B%400)||(!(B%4)&&!!(B%100))
};
dojo.date.getTimezoneName=function(B){var C=B.toString();
var E="";
var A;
var D=C.indexOf("(");
if(D>-1){E=C.substring(++D,C.indexOf(")"))
}else{var F=/([A-Z\/]+) \d{4}$/;
if((A=C.match(F))){E=A[1]
}else{C=B.toLocaleString();
F=/ ([A-Z\/]+)$/;
if((A=C.match(F))){E=A[1]
}}}return(E=="AM"||E=="PM")?"":E
};
dojo.date.compare=function(B,A,C){B=new Date(Number(B));
A=new Date(Number(A||new Date()));
if(typeof C!=="undefined"){if(C=="date"){B.setHours(0,0,0,0);
A.setHours(0,0,0,0)
}else{if(C=="time"){B.setFullYear(0,0,0);
A.setFullYear(0,0,0)
}}}if(B>A){return 1
}if(B<A){return -1
}return 0
};
dojo.date.add=function(L,K,A){var C=new Date(Number(L));
var J=false;
var G="Date";
switch(K){case"day":break;
case"weekday":var H,I;
var E=0;
var F=A%5;
if(!F){H=(A>0)?5:-5;
I=(A>0)?((A-5)/5):((A+5)/5)
}else{H=F;
I=parseInt(A/5)
}var B=L.getDay();
if(B==6&&A>0){E=1
}else{if(B==0&&A<0){E=-1
}}var D=B+H;
if(D==0||D==6){E=(A>0)?2:-2
}A=7*I+H+E;
break;
case"year":G="FullYear";
J=true;
break;
case"week":A*=7;
break;
case"quarter":A*=3;
case"month":J=true;
G="Month";
break;
case"hour":case"minute":case"second":case"millisecond":G="UTC"+K.charAt(0).toUpperCase()+K.substring(1)+"s"
}if(G){C["set"+G](C["get"+G]()+A)
}if(J&&(C.getDate()<L.getDate())){C.setDate(0)
}return C
};
dojo.date.difference=function(D,B,I){B=B||new Date();
I=I||"day";
var H=B.getFullYear()-D.getFullYear();
var Q=1;
switch(I){case"quarter":var E=D.getMonth();
var C=B.getMonth();
var N=Math.floor(E/3)+1;
var M=Math.floor(C/3)+1;
M+=(H*4);
Q=M-N;
break;
case"weekday":var A=Math.round(dojo.date.difference(D,B,"day"));
var F=parseInt(dojo.date.difference(D,B,"week"));
var P=A%7;
if(P==0){A=F*5
}else{var O=0;
var L=D.getDay();
var J=B.getDay();
F=parseInt(A/7);
P=A%7;
var K=new Date(D);
K.setDate(K.getDate()+(F*7));
var G=K.getDay();
if(A>0){switch(true){case L==6:O=-1;
break;
case L==0:O=0;
break;
case J==6:O=-1;
break;
case J==0:O=-2;
break;
case (G+P)>5:O=-2
}}else{if(A<0){switch(true){case L==6:O=0;
break;
case L==0:O=1;
break;
case J==6:O=2;
break;
case J==0:O=1;
break;
case (G+P)<0:O=2
}}}A+=O;
A-=(F*2)
}Q=A;
break;
case"year":Q=H;
break;
case"month":Q=(B.getMonth()-D.getMonth())+(H*12);
break;
case"week":Q=parseInt(dojo.date.difference(D,B,"day")/7);
break;
case"day":Q/=24;
case"hour":Q/=60;
case"minute":Q/=60;
case"second":Q/=1000;
case"millisecond":Q*=B.getTime()-D.getTime()
}return Math.round(Q)
}
}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
dojo.fx.chain=function(B){var A=B.shift();
var C=A;
dojo.forEach(B,function(D){dojo.connect(C,"onEnd",D,"play");
C=D
});
return A
};
dojo.fx.combine=function(A){var B=new dojo._Animation({curve:[0,1]});
if(!A.length){return B
}B.duration=A[0].duration;
dojo.forEach(A,function(C){dojo.forEach(["play","pause","stop"],function(D){if(C[D]){dojo.connect(B,D,C,D)
}})
});
return B
};
dojo.declare("dojo.fx.Toggler",null,{constructor:function(B){var A=this;
dojo.mixin(A,B);
A.node=B.node;
A._showArgs=dojo.mixin({},B);
A._showArgs.node=A.node;
A._showArgs.duration=A.showDuration;
A.showAnim=A.showFunc(A._showArgs);
A._hideArgs=dojo.mixin({},B);
A._hideArgs.node=A.node;
A._hideArgs.duration=A.hideDuration;
A.hideAnim=A.hideFunc(A._hideArgs);
dojo.connect(A.showAnim,"beforeBegin",dojo.hitch(A.hideAnim,"stop",true));
dojo.connect(A.hideAnim,"beforeBegin",dojo.hitch(A.showAnim,"stop",true))
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(A){return this.showAnim.play(A||0)
},hide:function(A){return this.hideAnim.play(A||0)
}});
dojo.fx.wipeIn=function(D){D.node=dojo.byId(D.node);
var B=D.node,A=B.style;
var C=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){A.overflow="hidden";
if(A.visibility=="hidden"||A.display=="none"){A.height="1px";
A.display="";
A.visibility="";
return 1
}else{var E=dojo.style(B,"height");
return Math.max(E,1)
}},end:function(){return B.scrollHeight
}}}},D));
dojo.connect(C,"onEnd",function(){A.height="auto"
});
return C
};
dojo.fx.wipeOut=function(D){var B=D.node=dojo.byId(D.node);
var A=B.style;
var C=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},D));
dojo.connect(C,"beforeBegin",function(){A.overflow="hidden";
A.display=""
});
dojo.connect(C,"onEnd",function(){A.height="auto";
A.display="none"
});
return C
};
dojo.fx.slideTo=function(F){var A=(F.node=dojo.byId(F.node));
var D=null;
var C=null;
var E=(function(G){return function(){var I=dojo.getComputedStyle(G);
var J=I.position;
D=(J=="absolute"?G.offsetTop:parseInt(I.top)||0);
C=(J=="absolute"?G.offsetLeft:parseInt(I.left)||0);
if(J!="absolute"&&J!="relative"){var H=dojo.coords(G,true);
D=H.y;
C=H.x;
G.style.position="absolute";
G.style.top=D+"px";
G.style.left=C+"px"
}}
})(A);
E();
var B=dojo.animateProperty(dojo.mixin({properties:{top:{end:F.top||0},left:{end:F.left||0}}},F));
dojo.connect(B,"beforeBegin",B,E);
return B
}
}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(H,I,D){D=dojo.i18n.normalizeLocale(D);
var G=D.split("-");
var J=[H,"nls",I].join(".");
var F=dojo._loadedModules[J];
if(F){var E;
for(var A=G.length;
A>0;
A--){var C=G.slice(0,A).join("_");
if(F[C]){E=F[C];
break
}}if(!E){E=F.ROOT
}if(E){var B=function(){};
B.prototype=E;
return new B()
}}throw new Error("Bundle not found: "+I+" in "+H+" , locale="+D)
};
dojo.i18n.normalizeLocale=function(A){var B=A?A.toLowerCase():dojo.locale;
if(B=="root"){B="ROOT"
}return B
};
dojo.i18n._requireLocalization=function(F,G,C,P){var M=dojo.i18n.normalizeLocale(C);
var J=[F,"nls",G].join(".");
var I="";
if(P){var B=P.split(",");
for(var N=0;
N<B.length;
N++){if(M.indexOf(B[N])==0){if(B[N].length>I.length){I=B[N]
}}}if(!I){I="ROOT"
}}var Q=P?I:M;
var E=dojo._loadedModules[J];
var H=null;
if(E){if(djConfig.localizationComplete&&E._built){return 
}var L=Q.replace(/-/g,"_");
var A=J+"."+L;
H=dojo._loadedModules[A]
}if(!H){E=dojo.provide(J);
var K=dojo._getModuleSymbols(F);
var O=K.concat("nls").join("/");
var D;
dojo.i18n._searchLocalePath(Q,P,function(W){var R=W.replace(/-/g,"_");
var V=J+"."+R;
var T=false;
if(!dojo._loadedModules[V]){dojo.provide(V);
var U=[O];
if(W!="ROOT"){U.push(W)
}U.push(G);
var S=U.join("/")+".js";
T=dojo._loadPath(S,null,function(Z){var Y=function(){};
Y.prototype=D;
E[R]=new Y();
for(var X in Z){E[R][X]=Z[X]
}})
}else{T=true
}if(T&&E[R]){D=E[R]
}else{E[R]=D
}if(P){return true
}})
}if(P&&M!=I){E[M.replace(/-/g,"_")]=E[I.replace(/-/g,"_")]
}};
(function(){var B=djConfig.extraLocale;
if(B){if(!B instanceof Array){B=[B]
}var A=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(F,E,D,C){A(F,E,D,C);
if(D){return 
}for(var G=0;
G<B.length;
G++){A(F,E,B[G],C)
}}
}})();
dojo.i18n._searchLocalePath=function(D,E,H){D=dojo.i18n.normalizeLocale(D);
var F=D.split("-");
var G=[];
for(var A=F.length;
A>0;
A--){G.push(F.slice(0,A).join("-"))
}G.push(false);
if(E){G.reverse()
}for(var I=G.length-1;
I>=0;
I--){var B=G[I]||"ROOT";
var C=H(B);
if(C){break
}}};
dojo.i18n._preloadLocalizations=function(D,A){function B(F){F=dojo.i18n.normalizeLocale(F);
dojo.i18n._searchLocalePath(F,true,function(H){for(var G=0;
G<A.length;
G++){if(A[G]==H){dojo.require(D+"_"+H);
return true
}}return false
})
}B();
var E=djConfig.extraLocale||[];
for(var C=0;
C<E.length;
C++){B(E[C])
}}
}if(!dojo._hasResource["dojo.cldr.supplemental"]){dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.cldr.supplemental.getFirstDayOfWeek=function(D){var A={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,lb:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,tn:6,ye:6,as:0,au:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,ie:0,il:0,is:0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,za:0,zw:0,et:0,mw:0,ng:0,tj:0,gb:0,sy:4};
var B=dojo.cldr.supplemental._region(D);
var C=A[B];
return(typeof C=="undefined")?1:C
};
dojo.cldr.supplemental._region=function(C){C=dojo.i18n.normalizeLocale(C);
var A=C.split("-");
var B=A[1];
if(!B){B={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[A[0]]
}else{if(B.length==4){B=A[2]
}}return B
};
dojo.cldr.supplemental.getWeekend=function(A){var C={eg:5,il:5,sy:5,"in":0,ae:4,bh:4,dz:4,iq:4,jo:4,kw:4,lb:4,ly:4,ma:4,om:4,qa:4,sa:4,sd:4,tn:4,ye:4};
var F={ae:5,bh:5,dz:5,iq:5,jo:5,kw:5,lb:5,ly:5,ma:5,om:5,qa:5,sa:5,sd:5,tn:5,ye:5,af:5,ir:5,eg:6,il:6,sy:6};
var D=dojo.cldr.supplemental._region(A);
var E=C[D];
var B=F[D];
if(typeof E=="undefined"){E=6
}if(typeof B=="undefined"){B=0
}return{start:E,end:B}
}
}if(!dojo._hasResource["dojo.regexp"]){dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.regexp.escapeString=function(A,B){return A.replace(/([\.$?*!=:|{}\(\)\[\]\\\/^])/g,function(C){if(B&&B.indexOf(C)!=-1){return C
}return"\\"+C
})
};
dojo.regexp.buildGroupRE=function(A,D,C){if(!(A instanceof Array)){return D(A)
}var E=[];
for(var B=0;
B<A.length;
B++){E.push(D(A[B]))
}return dojo.regexp.group(E.join("|"),C)
};
dojo.regexp.group=function(A,B){return"("+(B?"?:":"")+A+")"
}
}if(!dojo._hasResource["dojo.string"]){dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.pad=function(D,B,C,E){var A=String(D);
if(!C){C="0"
}while(A.length<B){if(E){A+=C
}else{A=C+A
}}return A
};
dojo.string.substitute=function(B,C,A,D){return B.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(F,G,E){var H=dojo.getObject(G,false,C);
if(E){H=dojo.getObject(E,false,D)(H)
}if(A){H=A(H,G)
}return H.toString()
})
};
dojo.string.trim=function(A){A=A.replace(/^\s+/,"");
for(var B=A.length-1;
B>0;
B--){if(/\S/.test(A.charAt(B))){A=A.substring(0,B+1);
break
}}return A
}
}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(D,A){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var B=dojo.date.stamp._isoRegExp.exec(D);
var F=null;
if(B){B.shift();
B[1]&&B[1]--;
B[6]&&(B[6]*=1000);
if(A){A=new Date(A);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return A["get"+G]()
}).forEach(function(G,H){if(B[H]===undefined){B[H]=G
}})
}F=new Date(B[0]||1970,B[1]||0,B[2]||0,B[3]||0,B[4]||0,B[5]||0,B[6]||0);
var E=0;
var C=B[7]&&B[7].charAt(0);
if(C!="Z"){E=((B[8]||0)*60)+(Number(B[9])||0);
if(C!="-"){E*=-1
}}if(C){E-=F.getTimezoneOffset()
}if(E){F.setTime(F.getTime()+E*60000)
}}return F
};
dojo.date.stamp.toISOString=function(B,F){var E=function(K){return(K<10)?"0"+K:K
};
F=F||{};
var A=[];
var C=F.zulu?"getUTC":"get";
var I="";
if(F.selector!="time"){I=[B[C+"FullYear"](),E(B[C+"Month"]()+1),E(B[C+"Date"]())].join("-")
}A.push(I);
if(F.selector!="date"){var H=[E(B[C+"Hours"]()),E(B[C+"Minutes"]()),E(B[C+"Seconds"]())].join(":");
var G=B[C+"Milliseconds"]();
if(F.milliseconds){H+="."+(G<100?"0":"")+E(G)
}if(F.zulu){H+="Z"
}else{if(F.selector!="time"){var D=B.getTimezoneOffset();
var J=Math.abs(D);
H+=(D>0?"-":"+")+E(Math.floor(J/60))+":"+E(J%60)
}}A.push(H)
}return A.join("T")
}
}if(!dojo._hasResource["dojo.parser"]){dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
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
}if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.requireLocalization("dojo.cldr","gregorian",null,"ko,zh-cn,zh,ja,en,it-it,en-ca,en-au,it,en-gb,es-es,fr,pt,ROOT,ko-kr,es,de,pt-br");
(function(){function A(F,E,D){return D.replace(/([a-z])\1*/ig,function(V){var I;
var H=V.charAt(0);
var Q=V.length;
var N;
var O=["abbr","wide","narrow"];
switch(H){case"G":I=E[(Q<4)?"eraAbbr":"eraNames"][F.getFullYear()<0?0:1];
break;
case"y":I=F.getFullYear();
switch(Q){case 1:break;
case 2:I=String(I);
I=I.substr(I.length-2);
break;
default:N=true
}break;
case"Q":case"q":I=Math.ceil((F.getMonth()+1)/3);
N=true;
break;
case"M":case"L":var P=F.getMonth();
var L;
switch(Q){case 1:case 2:I=P+1;
N=true;
break;
case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var G=(H=="L")?"standalone":"format";
var K=["months",G,L].join("-");
I=E[K][P]
}break;
case"w":var J=0;
I=dojo.date.locale._getWeekOfYear(F,J);
N=true;
break;
case"d":I=F.getDate();
N=true;
break;
case"D":I=dojo.date.locale._getDayOfYear(F);
N=true;
break;
case"E":case"e":case"c":var W=F.getDay();
var L;
switch(Q){case 1:case 2:if(H=="e"){var U=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
W=(W-U+7)%7
}if(H!="c"){I=W+1;
N=true;
break
}case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var G=(H=="c")?"standalone":"format";
var K=["days",G,L].join("-");
I=E[K][W]
}break;
case"a":var M=(F.getHours()<12)?"am":"pm";
I=E[M];
break;
case"h":case"H":case"K":case"k":var T=F.getHours();
switch(H){case"h":I=(T%12)||12;
break;
case"H":I=T;
break;
case"K":I=(T%12);
break;
case"k":I=T||24;
break
}N=true;
break;
case"m":I=F.getMinutes();
N=true;
break;
case"s":I=F.getSeconds();
N=true;
break;
case"S":I=Math.round(F.getMilliseconds()*Math.pow(10,Q-3));
break;
case"v":case"z":I=dojo.date.getTimezoneName(F);
if(I){break
}Q=4;
case"Z":var S=F.getTimezoneOffset();
var R=[(S<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(S)/60),2),dojo.string.pad(Math.abs(S)%60,2)];
if(Q==4){R.splice(0,0,"GMT");
R.splice(3,0,":")
}I=R.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+D)
}if(N){I=dojo.string.pad(I,Q)
}return I
})
}dojo.date.locale.format=function(H,N){N=N||{};
var K=dojo.i18n.normalizeLocale(N.locale);
var D=N.formatLength||"short";
var E=dojo.date.locale._getGregorianBundle(K);
var I=[];
var G=dojo.hitch(this,A,H,E);
if(N.selector=="year"){var J=H.getFullYear();
if(K.match(/^zh|^ja/)){J+="\u5E74"
}return J
}if(N.selector!="time"){var F=N.datePattern||E["dateFormat-"+D];
if(F){I.push(B(F,G))
}}if(N.selector!="date"){var M=N.timePattern||E["timeFormat-"+D];
if(M){I.push(B(M,G))
}}var L=I.join(" ");
return L
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(K){K=K||{};
var I=dojo.i18n.normalizeLocale(K.locale);
var D=dojo.date.locale._getGregorianBundle(I);
var L=K.formatLength||"short";
var F=K.datePattern||D["dateFormat-"+L];
var E=K.timePattern||D["timeFormat-"+L];
var G;
if(K.selector=="date"){G=F
}else{if(K.selector=="time"){G=E
}else{G=F+" "+E
}}var H=[];
var J=B(G,dojo.hitch(this,C,H,D,K));
return{regexp:J,tokens:H,bundle:D}
};
dojo.date.locale.parse=function(M,D){var G=dojo.date.locale._parseInfo(D);
var J=G.tokens,E=G.bundle;
var N=new RegExp("^"+G.regexp+"$");
var H=N.exec(M);
if(!H){return null
}var F=["abbr","wide","narrow"];
var O=new Date(1972,0);
var I={};
var L="";
dojo.forEach(H,function(Q,Y){if(!Y){return 
}var U=J[Y-1];
var V=U.length;
switch(U.charAt(0)){case"y":if(V!=2){O.setFullYear(Q);
I.year=Q
}else{if(Q<100){Q=Number(Q);
var P=""+new Date().getFullYear();
var X=P.substring(0,2)*100;
var a=Number(P.substring(2,4));
var W=Math.min(a+20,99);
var Z=(Q<W)?X+Q:X-100+Q;
O.setFullYear(Z);
I.year=Z
}else{if(D.strict){return null
}O.setFullYear(Q);
I.year=Q
}}break;
case"M":if(V>2){var T=E["months-format-"+F[V-3]].concat();
if(!D.strict){Q=Q.replace(".","").toLowerCase();
T=dojo.map(T,function(d){return d.replace(".","").toLowerCase()
})
}Q=dojo.indexOf(T,Q);
if(Q==-1){return null
}}else{Q--
}O.setMonth(Q);
I.month=Q;
break;
case"E":case"e":var S=E["days-format-"+F[V-3]].concat();
if(!D.strict){Q=Q.toLowerCase();
S=dojo.map(S,"".toLowerCase)
}Q=dojo.indexOf(S,Q);
if(Q==-1){return null
}break;
case"d":O.setDate(Q);
I.date=Q;
break;
case"D":O.setMonth(0);
O.setDate(Q);
break;
case"a":var b=D.am||E.am;
var R=D.pm||E.pm;
if(!D.strict){var c=/\./g;
Q=Q.replace(c,"").toLowerCase();
b=b.replace(c,"").toLowerCase();
R=R.replace(c,"").toLowerCase()
}if(D.strict&&Q!=b&&Q!=R){return null
}L=(Q==R)?"p":(Q==b)?"a":"";
break;
case"K":if(Q==24){Q=0
}case"h":case"H":case"k":if(Q>23){return null
}O.setHours(Q);
break;
case"m":O.setMinutes(Q);
break;
case"s":O.setSeconds(Q);
break;
case"S":O.setMilliseconds(Q)
}});
var K=O.getHours();
if(L==="p"&&K<12){O.setHours(K+12)
}else{if(L==="a"&&K==12){O.setHours(0)
}}if(I.year&&O.getFullYear()!=I.year){return null
}if(I.month&&O.getMonth()!=I.month){return null
}if(I.date&&O.getDate()!=I.date){return null
}return O
};
function B(H,G,E,F){var J=function(K){return K
};
G=G||J;
E=E||J;
F=F||J;
var I=H.match(/(''|[^'])+/g);
var D=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(D?E:G)(K);
D=!D
}});
return F(I.join(""))
}function C(D,E,F,G){G=dojo.regexp.escapeString(G);
if(!F.strict){G=G.replace(" a"," ?a")
}return G.replace(/([a-z])\1*/ig,function(M){var O;
var J=M.charAt(0);
var K=M.length;
var I="",H="";
if(F.strict){if(K>1){I="0{"+(K-1)+"}"
}if(K>2){H="0{"+(K-2)+"}"
}}else{I="0?";
H="0{0,2}"
}switch(J){case"y":O="\\d{2,4}";
break;
case"M":O=(K>2)?"\\S+":I+"[1-9]|1[0-2]";
break;
case"D":O=I+"[1-9]|"+H+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":O=I+"[1-9]|[12]\\d|3[01]";
break;
case"w":O=I+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":O="\\S+";
break;
case"h":O=I+"[1-9]|1[0-2]";
break;
case"k":O=I+"\\d|1[01]";
break;
case"H":O=I+"\\d|1\\d|2[0-3]";
break;
case"K":O=I+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":O="[0-5]\\d";
break;
case"S":O="\\d{"+K+"}";
break;
case"a":var L=F.am||E.am||"AM";
var N=F.pm||E.pm||"PM";
if(F.strict){O=L+"|"+N
}else{O=L+"|"+N;
if(L!=L.toLowerCase()){O+="|"+L.toLowerCase()
}if(N!=N.toLowerCase()){O+="|"+N.toLowerCase()
}}break;
default:O=".*"
}if(D){D.push(M)
}return"("+O+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(C,B){A.push({pkg:C,name:B})
};
dojo.date.locale._getGregorianBundle=function(C){var B={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,C);
B=dojo.mixin(B,D)
},this);
return B
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(C,B,F,E){var G;
var D=dojo.date.locale._getGregorianBundle(E);
var A=[C,F,B];
if(F=="standAlone"){G=D[A.join("-")]
}A[1]="format";
return(G||D[A.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(C,D){var B=dojo.cldr.supplemental.getWeekend(D);
var A=(C||new Date()).getDay();
if(B.end<B.start){B.end+=7;
if(A<B.start){A+=7
}}return A>=B.start&&A<=B.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(D,A){if(arguments.length==1){A=0
}var B=new Date(D.getFullYear(),0,1).getDay();
var E=(B-A+7)%7;
var C=Math.floor((dojo.date.locale._getDayOfYear(D)+E-1)/7);
if(B==A){C++
}return C
}
}if(!dojo._hasResource["dojo.dnd.autoscroll"]){dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.dnd.getViewport=function(){var C=dojo.doc,A=C.documentElement,B=window,D=dojo.body();
if(dojo.isMozilla){return{w:A.clientWidth,h:B.innerHeight}
}else{if(!dojo.isOpera&&B.innerWidth){return{w:B.innerWidth,h:B.innerHeight}
}else{if(!dojo.isOpera&&A&&A.clientWidth){return{w:A.clientWidth,h:A.clientHeight}
}else{if(D.clientWidth){return{w:D.clientWidth,h:D.clientHeight}
}}}}return null
};
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(C){var B=dojo.dnd.getViewport(),A=0,D=0;
if(C.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){A=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(C.clientX>B.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){A=dojo.dnd.H_AUTOSCROLL_VALUE
}}if(C.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){D=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(C.clientY>B.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){D=dojo.dnd.V_AUTOSCROLL_VALUE
}}window.scrollBy(A,D)
};
dojo.dnd._validNodes={div:1,p:1,td:1};
dojo.dnd._validOverflow={auto:1,scroll:1};
dojo.dnd.autoScrollNodes=function(A){for(var K=A.target;
K;
){if(K.nodeType==1&&(K.tagName.toLowerCase() in dojo.dnd._validNodes)){var H=dojo.getComputedStyle(K);
if(H.overflow.toLowerCase() in dojo.dnd._validOverflow){var B=dojo._getContentBox(K,H),F=dojo._abs(K,true);
B.l+=F.x+K.scrollLeft;
B.t+=F.y+K.scrollTop;
var D=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,B.w/2),N=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,B.h/2),J=A.pageX-B.l,I=A.pageY-B.t,G=0,E=0;
if(J>0&&J<B.w){if(J<D){G=-dojo.dnd.H_AUTOSCROLL_VALUE
}else{if(J>B.w-D){G=dojo.dnd.H_AUTOSCROLL_VALUE
}}}if(I>0&&I<B.h){if(I<N){E=-dojo.dnd.V_AUTOSCROLL_VALUE
}else{if(I>B.h-N){E=dojo.dnd.V_AUTOSCROLL_VALUE
}}}var L=K.scrollLeft,M=K.scrollTop;
K.scrollLeft=K.scrollLeft+G;
K.scrollTop=K.scrollTop+E;
if(L!=K.scrollLeft||M!=K.scrollTop){return 
}}}try{K=K.parentNode
}catch(C){K=null
}}dojo.dnd.autoScroll(A)
}
}if(!dojo._hasResource["dojo.dnd.common"]){dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.dnd._copyKey=navigator.appVersion.indexOf("Macintosh")<0?"ctrlKey":"metaKey";
dojo.dnd.getCopyKeyState=function(A){return A[dojo.dnd._copyKey]
};
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){var A;
do{A="dojoUnique"+(++dojo.dnd._uniqueId)
}while(dojo.byId(A));
return A
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(A){var B=A.target;
if(B.nodeType==3){B=B.parentNode
}return" button textarea input select option ".indexOf(" "+B.tagName.toLowerCase()+" ")>=0
}
}if(!dojo._hasResource["dojo.dnd.Container"]){dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(B,A){this.node=dojo.byId(B);
if(!A){A={}
}this.creator=A.creator||null;
this.skipForm=A.skipForm;
this.defaultCreator=dojo.dnd._defaultCreator(this.node);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(A&&A._skipStartup)){this.startup()
}this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")]
},creator:function(){},getItem:function(A){return this.map[A]
},setItem:function(B,A){this.map[B]=A
},delItem:function(A){delete this.map[A]
},forInItems:function(B,D){D=D||dojo.global;
var E=this.map,C=dojo.dnd._empty;
for(var A in this.map){if(A in C){continue
}B.call(D,E[A],A,E)
}},clearItems:function(){this.map={}
},getAllNodes:function(){return dojo.query("> .dojoDndItem",this.parent)
},insertNodes:function(D,C,E){if(!this.parent.firstChild){E=null
}else{if(C){if(!E){E=this.parent.firstChild
}}else{if(E){E=E.nextSibling
}}}if(E){for(var B=0;
B<D.length;
++B){var A=this._normalizedCreator(D[B]);
this.setItem(A.node.id,{data:A.data,type:A.type});
this.parent.insertBefore(A.node,E)
}}else{for(var B=0;
B<D.length;
++B){var A=this._normalizedCreator(D[B]);
this.setItem(A.node.id,{data:A.data,type:A.type});
this.parent.appendChild(A.node)
}}return this
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Container(B,A)
},startup:function(){this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){var A=this.parent.getElementsByTagName("tbody");
if(A&&A.length){this.parent=A[0]
}}dojo.query("> .dojoDndItem",this.parent).forEach(function(D){if(!D.id){D.id=dojo.dnd.getUniqueId()
}var C=D.getAttribute("dndType"),B=D.getAttribute("dndData");
this.setItem(D.id,{data:B?B:D.innerHTML,type:C?C.split(/\s*,\s*/):["text"]})
},this)
},onMouseOver:function(A){var B=A.relatedTarget;
while(B){if(B==this.node){break
}try{B=B.parentNode
}catch(C){B=null
}}if(!B){this._changeState("Container","Over");
this.onOverEvent()
}B=this._getChildByEvent(A);
if(this.current==B){return 
}if(this.current){this._removeItemClass(this.current,"Over")
}if(B){this._addItemClass(B,"Over")
}this.current=B
},onMouseOut:function(A){for(var B=A.relatedTarget;
B;
){if(B==this.node){return 
}try{B=B.parentNode
}catch(C){B=null
}}if(this.current){this._removeItemClass(this.current,"Over");
this.current=null
}this._changeState("Container","");
this.onOutEvent()
},onSelectStart:function(A){if(!this.skipForm||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(D,C){var B="dojoDnd"+D;
var A=D.toLowerCase()+"State";
dojo.removeClass(this.node,B+this[A]);
dojo.addClass(this.node,B+C);
this[A]=C
},_addItemClass:function(A,B){dojo.addClass(A,"dojoDndItem"+B)
},_removeItemClass:function(A,B){dojo.removeClass(A,"dojoDndItem"+B)
},_getChildByEvent:function(B){var A=B.target;
if(A){for(var C=A.parentNode;
C;
A=C,C=A.parentNode){if(C==this.parent&&dojo.hasClass(A,"dojoDndItem")){return A
}}}return null
},_normalizedCreator:function(A,B){var C=(this.creator?this.creator:this.defaultCreator)(A,B);
if(!dojo.isArray(C.type)){C.type=["text"]
}if(!C.node.id){C.node.id=dojo.dnd.getUniqueId()
}dojo.addClass(C.node,"dojoDndItem");
return C
}});
dojo.dnd._createNode=function(A){if(!A){return dojo.dnd._createSpan
}return function(C){var B=dojo.doc.createElement(A);
B.innerHTML=C;
return B
}
};
dojo.dnd._createTrTd=function(A){var C=dojo.doc.createElement("tr");
var B=dojo.doc.createElement("td");
B.innerHTML=A;
C.appendChild(B);
return C
};
dojo.dnd._createSpan=function(B){var A=dojo.doc.createElement("span");
A.innerHTML=B;
return A
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(A){var C=A.tagName.toLowerCase();
var B=C=="table"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[C]);
return function(F,J){var H=dojo.isObject(F)&&F;
var G=(H&&F.data)?F.data:F;
var E=(H&&F.type)?F.type:["text"];
var I=String(G),D=(J=="avatar"?dojo.dnd._createSpan:B)(I);
D.id=dojo.dnd.getUniqueId();
return{node:D,data:G,type:E}
}
}
}if(!dojo._hasResource["dojo.dnd.Selector"]){dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(B,A){if(!A){A={}
}this.singular=A.singular;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"))
},singular:false,getSelectedNodes:function(){var A=new dojo.NodeList();
var B=dojo.dnd._empty;
for(var C in this.selection){if(C in B){continue
}A.push(dojo.byId(C))
}return A
},selectNone:function(){return this._removeSelection()._removeAnchor()
},selectAll:function(){this.forInItems(function(B,A){this._addItemClass(dojo.byId(A),"Selected");
this.selection[A]=1
},this);
return this._removeAnchor()
},deleteSelectedNodes:function(){var A=dojo.dnd._empty;
for(var C in this.selection){if(C in A){continue
}var B=dojo.byId(C);
this.delItem(C);
dojo._destroyElement(B)
}this.anchor=null;
this.selection={};
return this
},insertNodes:function(E,D,C,A){var B=this._normalizedCreator;
this._normalizedCreator=function(H,F){var G=B.call(this,H,F);
if(E){if(!this.anchor){this.anchor=G.node;
this._removeItemClass(G.node,"Selected");
this._addItemClass(this.anchor,"Anchor")
}else{if(this.anchor!=G.node){this._removeItemClass(G.node,"Anchor");
this._addItemClass(G.node,"Selected")
}}this.selection[G.node.id]=1
}else{this._removeItemClass(G.node,"Selected");
this._removeItemClass(G.node,"Anchor")
}return G
};
dojo.dnd.Selector.superclass.insertNodes.call(this,D,C,A);
this._normalizedCreator=B;
return this
},destroy:function(){dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Selector(B,A)
},onMouseDown:function(B){if(!this.current){return 
}if(!this.singular&&!dojo.dnd.getCopyKeyState(B)&&!B.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;
dojo.stopEvent(B);
return 
}if(!this.singular&&B.shiftKey){if(!dojo.dnd.getCopyKeyState(B)){this._removeSelection()
}var C=dojo.query("> .dojoDndItem",this.parent);
if(C.length){if(!this.anchor){this.anchor=C[0];
this._addItemClass(this.anchor,"Anchor")
}this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){var D=0;
for(;
D<C.length;
++D){var A=C[D];
if(A==this.anchor||A==this.current){break
}}for(++D;
D<C.length;
++D){var A=C[D];
if(A==this.anchor||A==this.current){break
}this._addItemClass(A,"Selected");
this.selection[A.id]=1
}this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1
}}}else{if(this.singular){if(this.anchor==this.current){if(dojo.dnd.getCopyKeyState(B)){this.selectNone()
}}else{this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}}else{if(dojo.dnd.getCopyKeyState(B)){if(this.anchor==this.current){delete this.selection[this.anchor.id];
this._removeAnchor()
}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id]
}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected")
}this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}else{if(!(this.current.id in this.selection)){this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1
}}}}dojo.stopEvent(B)
},onMouseUp:function(A){if(!this.simpleSelection){return 
}this.simpleSelection=false;
this.selectNone();
if(this.current){this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1
}},onMouseMove:function(A){this.simpleSelection=false
},onOverEvent:function(){this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove")
},onOutEvent:function(){dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent
},_removeSelection:function(){var B=dojo.dnd._empty;
for(var C in this.selection){if(C in B){continue
}var A=dojo.byId(C);
if(A){this._removeItemClass(A,"Selected")
}}this.selection={};
return this
},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");
this.anchor=null
}return this
}})
}if(!dojo._hasResource["dojo.dnd.Avatar"]){dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.dnd.Avatar=function(A){this.manager=A;
this.construct()
};
dojo.extend(dojo.dnd.Avatar,{construct:function(){var E=dojo.doc.createElement("table");
E.className="dojoDndAvatar";
E.style.position="absolute";
E.style.zIndex=1999;
E.style.margin="0px";
var D=dojo.doc.createElement("tbody");
var B=dojo.doc.createElement("tr");
B.className="dojoDndAvatarHeader";
var C=dojo.doc.createElement("td");
C.innerHTML=this._generateText();
B.appendChild(C);
dojo.style(B,"opacity",0.9);
D.appendChild(B);
var F=Math.min(5,this.manager.nodes.length);
var A=this.manager.source;
for(var G=0;
G<F;
++G){B=dojo.doc.createElement("tr");
B.className="dojoDndAvatarItem";
C=dojo.doc.createElement("td");
var H=A.creator?H=A._normalizedCreator(A.getItem(this.manager.nodes[G].id).data,"avatar").node:H=this.manager.nodes[G].cloneNode(true);
H.id="";
H.style.width=(this.manager.nodes[G].clientWidth||this.manager.nodes[G].offsetWidth)+"px";
H.style.height=(this.manager.nodes[G].clientHeight||this.manager.nodes[G].offsetHeight)+"px";
C.appendChild(H);
B.appendChild(C);
dojo.style(B,"opacity",(9-G)/10);
D.appendChild(B)
}E.appendChild(D);
this.node=E
},destroy:function(){dojo._destroyElement(this.node);
this.node=false
},update:function(){dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
var A=this.node.getElementsByTagName("td");
for(var C=0;
C<A.length;
++C){var B=A[C];
if(dojo.hasClass(B.parentNode,"dojoDndAvatarHeader")){B.innerHTML=this._generateText();
break
}}},_generateText:function(){return this.manager.nodes.length.toString()
}})
}if(!dojo._hasResource["dojo.dnd.Manager"]){dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.dnd.Manager=function(){this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[]
};
dojo.extend(dojo.dnd.Manager,{OFFSET_X:16,OFFSET_Y:16,overSource:function(A){if(this.avatar){this.target=(A&&A.targetState!="Disabled")?A:null;
this.avatar.update()
}dojo.publish("/dnd/source/over",[A])
},outSource:function(A){if(this.avatar){if(this.target==A){this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null])
}}else{dojo.publish("/dnd/source/over",[null])
}},startDrag:function(A,D,C){this.source=A;
this.nodes=D;
this.copy=Boolean(C);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[A,D,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp")];
var B="dojoDnd"+(C?"Copy":"Move");
dojo.addClass(dojo.body(),B)
},canDrop:function(B){var A=this.target&&B;
if(this.canDropFlag!=A){this.canDropFlag=A;
this.avatar.update()
}},stopDrag:function(){dojo.removeClass(dojo.body(),"dojoDndCopy");
dojo.removeClass(dojo.body(),"dojoDndMove");
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=null;
this.nodes=[]
},makeAvatar:function(){return new dojo.dnd.Avatar(this)
},updateAvatar:function(){this.avatar.update()
},onMouseMove:function(A){var C=this.avatar;
if(C){dojo.dnd.autoScroll(A);
dojo.marginBox(C.node,{l:A.pageX+this.OFFSET_X,t:A.pageY+this.OFFSET_Y});
var B=Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(A)));
if(this.copy!=B){this._setCopyStatus(B)
}}},onMouseUp:function(B){if(this.avatar&&(!("mouseButton" in this.source)||this.source.mouseButton==B.button)){if(this.target&&this.canDropFlag){var A=[this.source,this.nodes,Boolean(this.source.copyState(dojo.dnd.getCopyKeyState(B))),this.target];
dojo.publish("/dnd/drop/before",A);
dojo.publish("/dnd/drop",A)
}else{dojo.publish("/dnd/cancel")
}this.stopDrag()
}},onKeyDown:function(B){if(this.avatar){switch(B.keyCode){case dojo.keys.CTRL:var A=Boolean(this.source.copyState(true));
if(this.copy!=A){this._setCopyStatus(A)
}break;
case dojo.keys.ESCAPE:dojo.publish("/dnd/cancel");
this.stopDrag();
break
}}},onKeyUp:function(B){if(this.avatar&&B.keyCode==dojo.keys.CTRL){var A=Boolean(this.source.copyState(false));
if(this.copy!=A){this._setCopyStatus(A)
}}},_setCopyStatus:function(A){this.copy=A;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.removeClass(dojo.body(),"dojoDnd"+(this.copy?"Move":"Copy"));
dojo.addClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"))
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){if(!dojo.dnd._manager){dojo.dnd._manager=new dojo.dnd.Manager()
}return dojo.dnd._manager
}
}if(!dojo._hasResource["dojo.dnd.Source"]){dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,skipForm:false,withHandles:false,accept:["text"],constructor:function(B,C){if(!C){C={}
}this.isSource=typeof C.isSource=="undefined"?true:C.isSource;
var A=C.accept instanceof Array?C.accept:["text"];
this.accept=null;
if(A.length){this.accept={};
for(var D=0;
D<A.length;
++D){this.accept[A[D]]=1
}}this.horizontal=C.horizontal;
this.copyOnly=C.copyOnly;
this.withHandles=C.withHandles;
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this.sourceState="";
if(this.isSource){dojo.addClass(this.node,"dojoDndSource")
}this.targetState="";
if(this.accept){dojo.addClass(this.node,"dojoDndTarget")
}if(this.horizontal){dojo.addClass(this.node,"dojoDndHorizontal")
}this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")]
},checkAcceptance:function(E,A){if(this==E){return true
}for(var C=0;
C<A.length;
++C){var D=E.getItem(A[C].id).type;
var F=false;
for(var B=0;
B<D.length;
++B){if(D[B] in this.accept){F=true;
break
}}if(!F){return false
}}return true
},copyState:function(A){return this.copyOnly||A
},destroy:function(){dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Source(B,A)
},onMouseMove:function(C){if(this.isDragging&&this.targetState=="Disabled"){return 
}dojo.dnd.Source.superclass.onMouseMove.call(this,C);
var D=dojo.dnd.manager();
if(this.isDragging){var B=false;
if(this.current){if(!this.targetBox||this.targetAnchor!=this.current){this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight}
}if(this.horizontal){B=(C.pageX-this.targetBox.xy.x)<(this.targetBox.w/2)
}else{B=(C.pageY-this.targetBox.xy.y)<(this.targetBox.h/2)
}}if(this.current!=this.targetAnchor||B!=this.before){this._markTargetAnchor(B);
D.canDrop(!this.current||D.source!=this||!(this.current.id in this.selection))
}}else{if(this.mouseDown&&this.isSource){var A=this.getSelectedNodes();
if(A.length){D.startDrag(this,A,this.copyState(dojo.dnd.getCopyKeyState(C)))
}}}},onMouseDown:function(A){if(this._legalMouseDown(A)&&(!this.skipForm||!dojo.dnd.isFormElement(A))){this.mouseDown=true;
this.mouseButton=A.button;
dojo.dnd.Source.superclass.onMouseDown.call(this,A)
}},onMouseUp:function(A){if(this.mouseDown){this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,A)
}},onDndSourceOver:function(A){if(this!=A){this.mouseDown=false;
if(this.targetAnchor){this._unmarkTargetAnchor()
}}else{if(this.isDragging){var B=dojo.dnd.manager();
B.canDrop(this.targetState!="Disabled"&&(!this.current||B.source!=this||!(this.current.id in this.selection)))
}}},onDndStart:function(A,D,C){if(this.isSource){this._changeState("Source",this==A?(C?"Copied":"Moved"):"")
}var B=this.accept&&this.checkAcceptance(A,D);
this._changeState("Target",B?"":"Disabled");
if(B&&this==A){dojo.dnd.manager().overSource(this)
}this.isDragging=true
},onDndDrop:function(B,D,C){do{if(this.containerState!="Over"){break
}var A=this._normalizedCreator;
if(this!=B){if(this.creator){this._normalizedCreator=function(F,E){return A.call(this,B.getItem(F.id).data,E)
}
}else{if(C){this._normalizedCreator=function(G,H){var F=B.getItem(G.id);
var E=G.cloneNode(true);
E.id=dojo.dnd.getUniqueId();
return{node:E,data:F.data,type:F.type}
}
}else{this._normalizedCreator=function(G,E){var F=B.getItem(G.id);
B.delItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}else{if(this.current&&this.current.id in this.selection){break
}if(this.creator){if(C){this._normalizedCreator=function(F,E){return A.call(this,B.getItem(F.id).data,E)
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,E){var F=B.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}else{if(C){this._normalizedCreator=function(G,H){var F=B.getItem(G.id);
var E=G.cloneNode(true);
E.id=dojo.dnd.getUniqueId();
return{node:E,data:F.data,type:F.type}
}
}else{if(!this.current){break
}this._normalizedCreator=function(G,E){var F=B.getItem(G.id);
return{node:G,data:F.data,type:F.type}
}
}}}this._removeSelection();
if(this!=B){this._removeAnchor()
}if(this!=B&&!C&&!this.creator){B.selectNone()
}this.insertNodes(true,D,this.before,this.current);
if(this!=B&&!C&&this.creator){B.deleteSelectedNodes()
}this._normalizedCreator=A
}while(false);
this.onDndCancel()
},onDndCancel:function(){if(this.targetAnchor){this._unmarkTargetAnchor();
this.targetAnchor=null
}this.before=true;
this.isDragging=false;
this.mouseDown=false;
delete this.mouseButton;
this._changeState("Source","");
this._changeState("Target","")
},onOverEvent:function(){dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this)
},onOutEvent:function(){dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this)
},_markTargetAnchor:function(A){if(this.current==this.targetAnchor&&this.before==A){return 
}if(this.targetAnchor){this._removeItemClass(this.targetAnchor,this.before?"Before":"After")
}this.targetAnchor=this.current;
this.targetBox=null;
this.before=A;
if(this.targetAnchor){this._addItemClass(this.targetAnchor,this.before?"Before":"After")
}},_unmarkTargetAnchor:function(){if(!this.targetAnchor){return 
}this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true
},_markDndStatus:function(A){this._changeState("Source",A?"Copied":"Moved")
},_legalMouseDown:function(C){if(!this.withHandles){return true
}for(var B=C.target;
B&&!dojo.hasClass(B,"dojoDndItem");
B=B.parentNode){if(dojo.hasClass(B,"dojoDndHandle")){var A=C;
if(!A){A=window.event
}var D={x:A.clientX,y:A.clientY};
var E=false;
dojo.query("a",B).forEach(function(F){if(!E){var G=F.getBoundingClientRect();
E=(G.left<=D.x&&D.x<=G.right&&G.top<=D.y&&D.y<=G.bottom)
}});
if(E){return false
}return true
}}return false
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(B,A){this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource")
},markupFactory:function(A,B){A._skipStartup=true;
return new dojo.dnd.Target(B,A)
}})
}if(!dojo._hasResource["dojo.dnd.Mover"]){dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(C,D,B){this.node=dojo.byId(C);
this.marginBox={l:D.pageX,t:D.pageY};
this.mouseButton=D.button;
var A=this.host=B,E=C.ownerDocument,F=dojo.connect(E,"onmousemove",this,"onFirstMove");
this.events=[dojo.connect(E,"onmousemove",this,"onMouseMove"),dojo.connect(E,"onmouseup",this,"onMouseUp"),dojo.connect(E,"ondragstart",dojo,"stopEvent"),dojo.connect(E,"onselectstart",dojo,"stopEvent"),F];
if(A&&A.onMoveStart){A.onMoveStart(this)
}},onMouseMove:function(A){dojo.dnd.autoScroll(A);
var B=this.marginBox;
this.host.onMove(this,{l:B.l+A.pageX,t:B.t+A.pageY})
},onMouseUp:function(A){if(this.mouseButton==A.button){this.destroy()
}},onFirstMove:function(){this.node.style.position="absolute";
var A=dojo.marginBox(this.node);
A.l-=this.marginBox.l;
A.t-=this.marginBox.t;
this.marginBox=A;
this.host.onFirstMove(this);
dojo.disconnect(this.events.pop())
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
var A=this.host;
if(A&&A.onMoveStop){A.onMoveStop(this)
}this.events=this.node=null
}})
}if(!dojo._hasResource["dojo.dnd.Moveable"]){dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(B,A){this.node=dojo.byId(B);
if(!A){A={}
}this.handle=A.handle?dojo.byId(A.handle):null;
if(!this.handle){this.handle=this.node
}this.delay=A.delay>0?A.delay:0;
this.skip=A.skip;
this.mover=A.mover?A.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")]
},markupFactory:function(A,B){return new dojo.dnd.Moveable(B,A)
},destroy:function(){dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null
},onMouseDown:function(A){if(this.skip&&dojo.dnd.isFormElement(A)){return 
}if(this.delay){this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"));
this.events.push(dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=A.pageX;
this._lastY=A.pageY
}else{new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseMove:function(A){if(Math.abs(A.pageX-this._lastX)>this.delay||Math.abs(A.pageY-this._lastY)>this.delay){this.onMouseUp(A);
new this.mover(this.node,A,this)
}dojo.stopEvent(A)
},onMouseUp:function(A){dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop())
},onSelectStart:function(A){if(!this.skip||!dojo.dnd.isFormElement(A)){dojo.stopEvent(A)
}},onMoveStart:function(A){dojo.publish("/dnd/move/start",[A]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem")
},onMoveStop:function(A){dojo.publish("/dnd/move/stop",[A]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem")
},onFirstMove:function(A){},onMove:function(A,B){this.onMoving(A,B);
dojo.marginBox(A.node,B);
this.onMoved(A,B)
},onMoving:function(A,B){},onMoved:function(A,B){}})
}if(!dojo._hasResource["dojo.dnd.move"]){dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){},within:false,markupFactory:function(A,B){return new dojo.dnd.move.constrainedMoveable(B,A)
},constructor:function(B,A){if(!A){A={}
}this.constraints=A.constraints;
this.within=A.within
},onFirstMove:function(A){var B=this.constraintBox=this.constraints.call(this,A),C=A.marginBox;
B.r=B.l+B.w-(this.within?C.w:0);
B.b=B.t+B.h-(this.within?C.h:0)
},onMove:function(A,C){var B=this.constraintBox;
C.l=C.l<B.l?B.l:B.r<C.l?B.r:C.l;
C.t=C.t<B.t?B.t:B.b<C.t?B.b:C.t;
dojo.marginBox(A.node,C)
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(A,B){return new dojo.dnd.move.boxConstrainedMoveable(B,A)
},constructor:function(A,B){var C=B&&B.box;
this.constraints=function(){return C
}
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(A,B){return new dojo.dnd.move.parentConstrainedMoveable(B,A)
},constructor:function(A,B){var C=B&&B.area;
this.constraints=function(){var D=this.node.parentNode,F=dojo.getComputedStyle(D),G=dojo._getMarginBox(D,F);
if(C=="margin"){return G
}var E=dojo._getMarginExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="border"){return G
}E=dojo._getBorderExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(C=="padding"){return G
}E=dojo._getPadExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
}
}});
dojo.dnd.move.constrainedMover=function(C,B){var A=function(F,D,E){dojo.dnd.Mover.call(this,F,D,E)
};
dojo.extend(A,dojo.dnd.Mover.prototype);
dojo.extend(A,{onMouseMove:function(H){dojo.dnd.autoScroll(H);
var E=this.marginBox,D=this.constraintBox,F=E.l+H.pageX,G=E.t+H.pageY;
F=F<D.l?D.l:D.r<F?D.r:F;
G=G<D.t?D.t:D.b<G?D.b:G;
this.host.onMove(this,{l:F,t:G})
},onFirstMove:function(){dojo.dnd.Mover.prototype.onFirstMove.call(this);
var D=this.constraintBox=C.call(this),E=this.marginBox;
D.r=D.l+D.w-(B?E.w:0);
D.b=D.t+D.h-(B?E.h:0)
}});
return A
};
dojo.dnd.move.boxConstrainedMover=function(A,B){return dojo.dnd.move.constrainedMover(function(){return A
},B)
};
dojo.dnd.move.parentConstrainedMover=function(B,A){var C=function(){var D=this.node.parentNode,F=dojo.getComputedStyle(D),G=dojo._getMarginBox(D,F);
if(B=="margin"){return G
}var E=dojo._getMarginExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="border"){return G
}E=dojo._getBorderExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
if(B=="padding"){return G
}E=dojo._getPadExtents(D,F);
G.l+=E.l,G.t+=E.t,G.w-=E.w,G.h-=E.h;
return G
};
return dojo.dnd.move.constrainedMover(C,A)
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover
}if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.io.iframe={create:function(fname,onloadstr,uri){if(window[fname]){return window[fname]
}if(window.frames[fname]){return window.frames[fname]
}var cframe=null;
var turi=uri;
if(!turi){if(djConfig.useXDomain&&!djConfig.dojoBlankHtmlUrl){console.debug("dojo.io.iframe.create: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html")
}turi=(djConfig.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html"))
}var ifrstr=dojo.isIE?'<iframe name="'+fname+'" src="'+turi+'" onload="'+onloadstr+'">':"iframe";
cframe=dojo.doc.createElement(ifrstr);
with(cframe){name=fname;
setAttribute("name",fname);
id=fname
}dojo.body().appendChild(cframe);
window[fname]=cframe;
with(cframe.style){if(dojo.isSafari<3){position="absolute"
}left=top="1px";
height=width="1px";
visibility="hidden"
}if(!dojo.isIE){this.setSrc(cframe,turi,true);
cframe.onload=new Function(onloadstr)
}return cframe
},setSrc:function(B,D,A){try{if(!A){if(dojo.isSafari){B.location=D
}else{frames[B.name].location=D
}}else{var E;
if(dojo.isIE||dojo.isSafari>2){E=B.contentWindow.document
}else{if(dojo.isSafari){E=B.document
}else{E=B.contentWindow
}}if(!E){B.location=D;
return 
}else{E.location.replace(D)
}}}catch(C){console.debug("dojo.io.iframe.setSrc: ",C)
}},doc:function(B){var A=B.contentDocument||((B.contentWindow)&&(B.contentWindow.document))||((B.name)&&(document.frames[B.name])&&(document.frames[B.name].document))||null;
return A
},send:function(args){if(!this["_frame"]){this._frame=this.create(this._iframeName,"dojo.io.iframe._iframeOnload();")
}var dfd=dojo._ioSetArgs(args,function(dfd){dfd.canceled=true;
dfd.ioArgs._callNext()
},function(dfd){var value=null;
try{var ioArgs=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var handleAs=ioArgs.handleAs;
value=ifd;
if(handleAs!="html"){value=ifd.getElementsByTagName("textarea")[0].value;
if(handleAs=="json"){value=dojo.fromJson(value)
}else{if(handleAs=="javascript"){value=dojo.eval(value)
}}}}catch(e){value=e
}finally{ioArgs._callNext()
}return value
},function(error,dfd){dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return error
});
dfd.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest()
}};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){return !dfd.ioArgs._hasError
},function(dfd){return(!!dfd.ioArgs._finished)
},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd)
}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"))
}});
return dfd
},_currentDfd:null,_dfdQueue:[],_iframeName:"dojoIoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return 
}var F=this._currentDfd=this._dfdQueue.shift();
var K=F.ioArgs;
var B=K.args;
K._contentToClean=[];
var C=B.form;
var A=B.content||{};
if(C){if(A){for(var D in A){if(!C[D]){var E;
if(dojo.isIE){E=dojo.doc.createElement("<input type='hidden' name='"+D+"'>")
}else{E=dojo.doc.createElement("input");
E.type="hidden";
E.name=D
}E.value=A[D];
C.appendChild(E);
K._contentToClean.push(D)
}else{C[D].value=A[D]
}}}var H=C.getAttributeNode("action");
var J=C.getAttributeNode("method");
var I=C.getAttributeNode("target");
if(B.url){K._originalAction=H?H.value:null;
if(H){H.value=B.url
}else{C.setAttribute("action",B.url)
}}if(!J||!J.value){if(J){J.value=(B.method)?B.method:"post"
}else{C.setAttribute("method",(B.method)?B.method:"post")
}}K._originalTarget=I?I.value:null;
if(I){I.value=this._iframeName
}else{C.setAttribute("target",this._iframeName)
}C.target=this._iframeName;
C.submit()
}else{var G=B.url+(B.url.indexOf("?")>-1?"&":"?")+K.query;
this.setSrc(this._frame,G,true)
}}catch(L){F.errback(L)
}},_iframeOnload:function(){var D=this._currentDfd;
if(!D){this._fireNextRequest();
return 
}var I=D.ioArgs;
var A=I.args;
var B=A.form;
if(B){var G=I._contentToClean;
for(var H=0;
H<G.length;
H++){var C=G[H];
if(dojo.isSafari<3){for(var F=0;
F<B.childNodes.length;
F++){var E=B.childNodes[F];
if(E.name==C){dojo._destroyElement(E);
break
}}}else{dojo._destroyElement(B[C]);
B[C]=null
}}if(I._originalAction){B.setAttribute("action",I._originalAction)
}if(I._originalTarget){B.setAttribute("target",I._originalTarget);
B.target=I._originalTarget
}}I._finished=true
}}
}if(!dojo._hasResource["dojo.data.util.filter"]){dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.data.util.filter.patternToRegExp=function(C,A){var E="^";
var D=null;
for(var B=0;
B<C.length;
B++){D=C.charAt(B);
switch(D){case"\\":E+=D;
B++;
E+=C.charAt(B);
break;
case"*":E+=".*";
break;
case"?":E+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":E+="\\";
default:E+=D
}}E+="$";
if(A){return new RegExp(E,"i")
}else{return new RegExp(E)
}}
}if(!dojo._hasResource["dojo.data.util.sorter"]){dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(A,C){var B=0;
if(A>C||typeof A==="undefined"||A===null){B=1
}else{if(A<C||typeof C==="undefined"||C===null){B=-1
}}return B
};
dojo.data.util.sorter.createSortFunction=function(C,A){var E=[];
function F(H,G){return function(M,L){var K=A.getValue(M,H);
var I=A.getValue(L,H);
var J=null;
if(A.comparatorMap){if(typeof H!=="string"){H=A.getIdentity(H)
}J=A.comparatorMap[H]||dojo.data.util.sorter.basicComparator
}J=J||dojo.data.util.sorter.basicComparator;
return G*J(K,I)
}
}for(var B=0;
B<C.length;
B++){sortAttribute=C[B];
if(sortAttribute.attribute){var D=(sortAttribute.descending)?-1:1;
E.push(F(sortAttribute.attribute,D))
}}return function(I,H){var G=0;
while(G<E.length){var J=E[G++](I,H);
if(J!==0){return J
}}return 0
}
}
}if(!dojo._hasResource["dojo.data.util.simpleFetch"]){dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.data.util.simpleFetch.fetch=function(C){C=C||{};
if(!C.store){C.store=this
}var A=this;
var B=function(E,F){if(F.onError){var G=F.scope||dojo.global;
F.onError.call(G,E,F)
}};
var D=function(M,N){var G=N.abort||null;
var I=false;
var E=N.start?N.start:0;
var L=N.count?(E+N.count):M.length;
N.abort=function(){I=true;
if(G){G.call(N)
}};
var H=N.scope||dojo.global;
if(!N.store){N.store=A
}if(N.onBegin){N.onBegin.call(H,M.length,N)
}if(N.sort){M.sort(dojo.data.util.sorter.createSortFunction(N.sort,A))
}if(N.onItem){for(var K=E;
(K<M.length)&&(K<L);
++K){var F=M[K];
if(!I){N.onItem.call(H,F,N)
}}}if(N.onComplete&&!I){var J=null;
if(!N.onItem){J=M.slice(E,L)
}N.onComplete.call(H,J,N)
}};
this._fetchItems(C,D,B);
return C
}
}if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(A){this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=A.url;
this._jsonData=A.data;
this._datatypeMap=A.typeMap||{};
if(!this._datatypeMap.Date){this._datatypeMap.Date={type:Date,deserialize:function(B){return dojo.date.stamp.fromISOString(B)
}}
}this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._loadInProgress=false;
this._queuedFetches=[]
},url:"",_assertIsItem:function(A){if(!this.isItem(A)){throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.")
}},_assertIsAttribute:function(A){if(typeof A!=="string"){throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.")
}},getValue:function(C,B,D){var A=this.getValues(C,B);
return(A.length>0)?A[0]:D
},getValues:function(A,B){this._assertIsItem(A);
this._assertIsAttribute(B);
return A[B]||[]
},getAttributes:function(B){this._assertIsItem(B);
var C=[];
for(var A in B){if((A!==this._storeRefPropName)&&(A!==this._itemNumPropName)&&(A!==this._rootItemPropName)){C.push(A)
}}return C
},hasAttribute:function(A,B){return this.getValues(A,B).length>0
},containsValue:function(A,D,C){var B=undefined;
if(typeof C==="string"){B=dojo.data.util.filter.patternToRegExp(C,false)
}return this._containsValue(A,D,C,B)
},_containsValue:function(A,D,C,B){return dojo.some(this.getValues(A,D),function(E){if(E!==null&&!dojo.isObject(E)&&B){if(E.toString().match(B)){return true
}}else{if(C===E){return true
}}})
},isItem:function(A){if(A&&A[this._storeRefPropName]===this){if(this._arrayOfAllItems[A[this._itemNumPropName]]===A){return true
}}return false
},isItemLoaded:function(A){return this.isItem(A)
},loadItem:function(A){this._assertIsItem(A.item)
},getFeatures:function(){return this._features
},getLabel:function(A){if(this._labelAttr&&this.isItem(A)){return this.getValue(A,this._labelAttr)
}return undefined
},getLabelAttributes:function(A){if(this._labelAttr){return[this._labelAttr]
}return null
},_fetchItems:function(F,C,E){var D=this;
var G=function(P,S){var R=[];
if(P.query){var Q=P.queryOptions?P.queryOptions.ignoreCase:false;
var J={};
for(var K in P.query){var I=P.query[K];
if(typeof I==="string"){J[K]=dojo.data.util.filter.patternToRegExp(I,Q)
}}for(var N=0;
N<S.length;
++N){var O=true;
var M=S[N];
if(M===null){O=false
}else{for(var K in P.query){var I=P.query[K];
if(!D._containsValue(M,K,I,J[K])){O=false
}}}if(O){R.push(M)
}}C(R,P)
}else{for(var N=0;
N<S.length;
++N){var L=S[N];
if(L!==null){R.push(L)
}}C(R,P)
}};
if(this._loadFinished){G(F,this._getItemsArray(F.queryOptions))
}else{if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:F,filter:G})
}else{this._loadInProgress=true;
var A={url:D._jsonFileUrl,handleAs:"json-comment-optional"};
var H=dojo.xhrGet(A);
H.addCallback(function(J){try{D._getItemsFromLoadedData(J);
D._loadFinished=true;
D._loadInProgress=false;
G(F,D._getItemsArray(F.queryOptions));
D._handleQueuedFetches()
}catch(I){D._loadFinished=true;
D._loadInProgress=false;
E(I,F)
}});
H.addErrback(function(I){D._loadInProgress=false;
E(I,F)
})
}}else{if(this._jsonData){try{this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
G(F,this._getItemsArray(F.queryOptions))
}catch(B){E(B,F)
}}else{E(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),F)
}}}},_handleQueuedFetches:function(){if(this._queuedFetches.length>0){for(var B=0;
B<this._queuedFetches.length;
B++){var D=this._queuedFetches[B];
var A=D.args;
var C=D.filter;
if(C){C(A,this._getItemsArray(A.queryOptions))
}else{this.fetchItemByIdentity(A)
}}this._queuedFetches=[]
}},_getItemsArray:function(A){if(A&&A.deep){return this._arrayOfAllItems
}return this._arrayOfTopLevelItems
},close:function(A){},_getItemsFromLoadedData:function(K){function H(V){var U=((V!=null)&&(typeof V=="object")&&(!dojo.isArray(V))&&(!dojo.isFunction(V))&&(V.constructor==Object)&&(typeof V._reference=="undefined")&&(typeof V._type=="undefined")&&(typeof V._value=="undefined"));
return U
}var P=this;
function D(X){P._arrayOfAllItems.push(X);
for(var W in X){var V=X[W];
if(V){if(dojo.isArray(V)){var U=V;
for(var Z=0;
Z<U.length;
++Z){var Y=U[Z];
if(H(Y)){D(Y)
}}}else{if(H(V)){D(V)
}}}}}this._labelAttr=K.label;
var A;
var C;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=K.items;
for(A=0;
A<this._arrayOfTopLevelItems.length;
++A){C=this._arrayOfTopLevelItems[A];
D(C);
C[this._rootItemPropName]=true
}var R={};
var E;
for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
for(E in C){if(E!==this._rootItemPropName){var Q=C[E];
if(Q!==null){if(!dojo.isArray(Q)){C[E]=[Q]
}}else{C[E]=[null]
}}R[E]=E
}}while(R[this._storeRefPropName]){this._storeRefPropName+="_"
}while(R[this._itemNumPropName]){this._itemNumPropName+="_"
}var N;
var J=K.identifier;
if(J){this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=J;
for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
N=C[J];
var F=N[0];
if(!this._itemsByIdentity[F]){this._itemsByIdentity[F]=C
}else{if(this._jsonFileUrl){throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+F+"]")
}else{if(this._jsonData){throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+J+"].  Value collided: ["+F+"]")
}}}}}else{this._features["dojo.data.api.Identity"]=Number
}for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
C[this._storeRefPropName]=this;
C[this._itemNumPropName]=A
}for(A=0;
A<this._arrayOfAllItems.length;
++A){C=this._arrayOfAllItems[A];
for(E in C){N=C[E];
for(var T=0;
T<N.length;
++T){Q=N[T];
if(Q!==null&&typeof Q=="object"){if(Q._type&&Q._value){var L=Q._type;
var M=this._datatypeMap[L];
if(!M){throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+L+"'")
}else{if(dojo.isFunction(M)){N[T]=new M(Q._value)
}else{if(dojo.isFunction(M.deserialize)){N[T]=M.deserialize(Q._value)
}else{throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function")
}}}}if(Q._reference){var G=Q._reference;
if(dojo.isString(G)){N[T]=this._itemsByIdentity[G]
}else{for(var S=0;
S<this._arrayOfAllItems.length;
++S){var I=this._arrayOfAllItems[S];
var O=true;
for(var B in G){if(I[B]!=G[B]){O=false
}}if(O){N[T]=I
}}}}}}}}},getIdentity:function(A){var C=this._features["dojo.data.api.Identity"];
if(C===Number){return A[this._itemNumPropName]
}else{var B=A[C];
if(B){return B[0]
}}return null
},fetchItemByIdentity:function(A){if(!this._loadFinished){var F=this;
if(this._jsonFileUrl){if(this._loadInProgress){this._queuedFetches.push({args:A})
}else{this._loadInProgress=true;
var E={url:F._jsonFileUrl,handleAs:"json-comment-optional"};
var D=dojo.xhrGet(E);
D.addCallback(function(G){var I=A.scope?A.scope:dojo.global;
try{F._getItemsFromLoadedData(G);
F._loadFinished=true;
F._loadInProgress=false;
var J=F._getItemByIdentity(A.identity);
if(A.onItem){A.onItem.call(I,J)
}F._handleQueuedFetches()
}catch(H){F._loadInProgress=false;
if(A.onError){A.onError.call(I,H)
}}});
D.addErrback(function(H){F._loadInProgress=false;
if(A.onError){var G=A.scope?A.scope:dojo.global;
A.onError.call(G,H)
}})
}}else{if(this._jsonData){F._getItemsFromLoadedData(F._jsonData);
F._jsonData=null;
F._loadFinished=true;
var C=F._getItemByIdentity(A.identity);
if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}}}else{var C=this._getItemByIdentity(A.identity);
if(A.onItem){var B=A.scope?A.scope:dojo.global;
A.onItem.call(B,C)
}}},_getItemByIdentity:function(B){var A=null;
if(this._itemsByIdentity){A=this._itemsByIdentity[B]
}else{A=this._arrayOfAllItems[B]
}if(A===undefined){A=null
}return A
},getIdentityAttributes:function(A){var B=this._features["dojo.data.api.Identity"];
if(B===Number){return null
}else{return[B]
}},_forceLoad:function(){var C=this;
if(this._jsonFileUrl){var B={url:C._jsonFileUrl,handleAs:"json-comment-optional",sync:true};
var A=dojo.xhrGet(B);
A.addCallback(function(E){try{if(C._loadInProgress!==true&&!C._loadFinished){C._getItemsFromLoadedData(E);
C._loadFinished=true
}}catch(D){console.log(D);
throw D
}});
A.addErrback(function(D){throw D
})
}else{if(this._jsonData){C._getItemsFromLoadedData(C._jsonData);
C._jsonData=null;
C._loadFinished=true
}}}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch)
}if(!dojo._hasResource["dojo.data.ItemFileWriteStore"]){dojo._hasResource["dojo.data.ItemFileWriteStore"]=true;
dojo.provide("dojo.data.ItemFileWriteStore");
dojo.declare("dojo.data.ItemFileWriteStore",dojo.data.ItemFileReadStore,{constructor:function(A){this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap.Date.serialize){this._datatypeMap.Date.serialize=function(B){return dojo.date.stamp.toISOString(B,{zulu:true})
}
}this._saveInProgress=false
},_assert:function(A){if(!A){throw new Error("assertion failed in ItemFileWriteStore")
}},_getIdentifierAttribute:function(){var A=this.getFeatures()["dojo.data.api.Identity"];
return A
},newItem:function(F,G){this._assert(!this._saveInProgress);
if(!this._loadFinished){this._forceLoad()
}if(typeof F!="object"&&typeof F!="undefined"){throw new Error("newItem() was passed something other than an object")
}var A=null;
var H=this._getIdentifierAttribute();
if(H===Number){A=this._arrayOfAllItems.length
}else{A=F[H];
if(typeof A==="undefined"){throw new Error("newItem() was not passed an identity for the new item")
}if(dojo.isArray(A)){throw new Error("newItem() was not passed an single-valued identity")
}}if(this._itemsByIdentity){this._assert(typeof this._itemsByIdentity[A]==="undefined")
}this._assert(typeof this._pending._newItems[A]==="undefined");
this._assert(typeof this._pending._deletedItems[A]==="undefined");
var I={};
I[this._storeRefPropName]=this;
I[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){this._itemsByIdentity[A]=I
}this._arrayOfAllItems.push(I);
var C=null;
if(G&&G.parent&&G.attribute){C={item:G.parent,attribute:G.attribute,oldValue:undefined};
var E=this.getValues(G.parent,G.attribute);
if(E&&E.length>0){var J=E.slice(0,E.length);
if(E.length===1){C.oldValue=E[0]
}else{C.oldValue=E.slice(0,E.length)
}J.push(I);
this._setValueOrValues(G.parent,G.attribute,J,false);
C.newValue=this.getValues(G.parent,G.attribute)
}else{this._setValueOrValues(G.parent,G.attribute,I,false);
C.newValue=I
}}else{I[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(I)
}this._pending._newItems[A]=I;
for(var D in F){if(D===this._storeRefPropName||D===this._itemNumPropName){throw new Error("encountered bug in ItemFileWriteStore.newItem")
}var B=F[D];
if(!dojo.isArray(B)){B=[B]
}I[D]=B
}this.onNew(I,C);
return I
},_removeArrayElement:function(B,A){var C=dojo.indexOf(B,A);
if(C!=-1){B.splice(C,1);
return true
}return false
},deleteItem:function(A){this._assert(!this._saveInProgress);
this._assertIsItem(A);
var B=A[this._itemNumPropName];
this._arrayOfAllItems[B]=null;
var C=this.getIdentity(A);
A[this._storeRefPropName]=null;
if(this._itemsByIdentity){delete this._itemsByIdentity[C]
}this._pending._deletedItems[C]=A;
if(A[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,A)
}this.onDelete(A);
return true
},setValue:function(A,C,B){return this._setValueOrValues(A,C,B,true)
},setValues:function(B,A,C){return this._setValueOrValues(B,A,C,true)
},unsetAttribute:function(A,B){return this._setValueOrValues(A,B,[],true)
},_setValueOrValues:function(D,H,O,K){this._assert(!this._saveInProgress);
this._assertIsItem(D);
this._assert(dojo.isString(H));
this._assert(typeof O!=="undefined");
var M=this._getIdentifierAttribute();
if(H==M){throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.")
}var L=this._getValueOrValues(D,H);
var P=this.getIdentity(D);
if(!this._pending._modifiedItems[P]){var F={};
for(var B in D){if((B===this._storeRefPropName)||(B===this._itemNumPropName)||(B===this._rootItemPropName)){F[B]=D[B]
}else{var A=D[B];
var N=[];
for(var J=0;
J<A.length;
++J){N.push(A[J])
}F[B]=N
}}this._pending._modifiedItems[P]=F
}var C=false;
if(dojo.isArray(O)&&O.length===0){C=delete D[H];
O=undefined
}else{var Q=[];
if(dojo.isArray(O)){var E=O;
for(var I=0;
I<E.length;
++I){Q.push(E[I])
}}else{var G=O;
Q.push(G)
}D[H]=Q;
C=true
}if(K){this.onSet(D,H,L,O)
}return C
},_getValueOrValues:function(C,B){var D=undefined;
if(this.hasAttribute(C,B)){var A=this.getValues(C,B);
if(A.length==1){D=A[0]
}else{D=A
}}return D
},_flatten:function(C){if(this.isItem(C)){var B=C;
var E=this.getIdentity(B);
var A={_reference:E};
return A
}else{if(typeof C==="object"){for(type in this._datatypeMap){var D=this._datatypeMap[type];
if(dojo.isObject(D)&&!dojo.isFunction(D)){if(C instanceof D.type){if(!D.serialize){throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]")
}return{_type:type,_value:D.serialize(C)}
}}else{if(C instanceof D){return{_type:type,_value:C.toString()}
}}}}return C
}},_getNewFileContentString:function(){var F={};
var A=this._getIdentifierAttribute();
if(A!==Number){F.identifier=A
}if(this._labelAttr){F.label=this._labelAttr
}F.items=[];
for(var J=0;
J<this._arrayOfAllItems.length;
++J){var E=this._arrayOfAllItems[J];
if(E!==null){serializableItem={};
for(var D in E){if(D!==this._storeRefPropName&&D!==this._itemNumPropName){var G=D;
var C=this.getValues(E,G);
if(C.length==1){serializableItem[G]=this._flatten(C[0])
}else{var B=[];
for(var I=0;
I<C.length;
++I){B.push(this._flatten(C[I]));
serializableItem[G]=B
}}}}F.items.push(serializableItem)
}}var H=true;
return dojo.toJson(F,H)
},save:function(A){this._assert(!this._saveInProgress);
this._saveInProgress=true;
var E=this;
var C=function(){E._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
E._saveInProgress=false;
if(A&&A.onComplete){var F=A.scope||dojo.global;
A.onComplete.call(F)
}};
var D=function(){E._saveInProgress=false;
if(A&&A.onError){var F=A.scope||dojo.global;
A.onError.call(F)
}};
if(this._saveEverything){var B=this._getNewFileContentString();
this._saveEverything(C,D,B)
}if(this._saveCustom){this._saveCustom(C,D)
}if(!this._saveEverything&&!this._saveCustom){C()
}},revert:function(){this._assert(!this._saveInProgress);
var G;
for(G in this._pending._newItems){var B=this._pending._newItems[G];
B[this._storeRefPropName]=null;
this._arrayOfAllItems[B[this._itemNumPropName]]=null;
if(B[this._rootItemPropName]){this._removeArrayElement(this._arrayOfTopLevelItems,B)
}if(this._itemsByIdentity){delete this._itemsByIdentity[G]
}}for(G in this._pending._modifiedItems){var D=this._pending._modifiedItems[G];
var C=null;
if(this._itemsByIdentity){C=this._itemsByIdentity[G]
}else{C=this._arrayOfAllItems[G]
}D[this._storeRefPropName]=this;
C[this._storeRefPropName]=null;
var F=C[this._itemNumPropName];
this._arrayOfAllItems[F]=D;
if(C[this._rootItemPropName]){F=C[this._itemNumPropName];
this._arrayOfTopLevelItems[F]=D
}if(this._itemsByIdentity){this._itemsByIdentity[G]=D
}}for(G in this._pending._deletedItems){var E=this._pending._deletedItems[G];
E[this._storeRefPropName]=this;
var A=E[this._itemNumPropName];
this._arrayOfAllItems[A]=E;
if(this._itemsByIdentity){this._itemsByIdentity[G]=E
}if(E[this._rootItemPropName]){this._arrayOfTopLevelItems.push(E)
}}this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true
},isDirty:function(B){if(B){var C=this.getIdentity(B);
return new Boolean(this._pending._newItems[C]||this._pending._modifiedItems[C]||this._pending._deletedItems[C])
}else{var A;
for(A in this._pending._newItems){return true
}for(A in this._pending._modifiedItems){return true
}for(A in this._pending._deletedItems){return true
}return false
}},onSet:function(B,A,D,C){},onNew:function(A,B){},onDelete:function(A){}})
};