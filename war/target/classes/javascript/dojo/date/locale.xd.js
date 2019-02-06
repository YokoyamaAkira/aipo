dojo._xdResourceLoaded({depends:[["provide","dojo.date.locale"],["require","dojo.date"],["require","dojo.cldr.supplemental"],["require","dojo.regexp"],["require","dojo.string"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","gregorian",null,"de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn","de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn"]],defineResource:function(A){if(!A._hasResource["dojo.date.locale"]){A._hasResource["dojo.date.locale"]=true;
A.provide("dojo.date.locale");
A.require("dojo.date");
A.require("dojo.cldr.supplemental");
A.require("dojo.regexp");
A.require("dojo.string");
A.require("dojo.i18n");
(function(){function D(F,E,G){return G.replace(/([a-z])\1*/ig,function(V){var X;
var I=V.charAt(0);
var Q=V.length;
var N;
var O=["abbr","wide","narrow"];
switch(I){case"G":X=E[(Q<4)?"eraAbbr":"eraNames"][F.getFullYear()<0?0:1];
break;
case"y":X=F.getFullYear();
switch(Q){case 1:break;
case 2:X=String(X);
X=X.substr(X.length-2);
break;
default:N=true
}break;
case"Q":case"q":X=Math.ceil((F.getMonth()+1)/3);
N=true;
break;
case"M":case"L":var P=F.getMonth();
var L;
switch(Q){case 1:case 2:X=P+1;
N=true;
break;
case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var H=(I=="L")?"standalone":"format";
var K=["months",H,L].join("-");
X=E[K][P]
}break;
case"w":var J=0;
X=A.date.locale._getWeekOfYear(F,J);
N=true;
break;
case"d":X=F.getDate();
N=true;
break;
case"D":X=A.date.locale._getDayOfYear(F);
N=true;
break;
case"E":case"e":case"c":var W=F.getDay();
var L;
switch(Q){case 1:case 2:if(I=="e"){var U=A.cldr.supplemental.getFirstDayOfWeek(options.locale);
W=(W-U+7)%7
}if(I!="c"){X=W+1;
N=true;
break
}case 3:case 4:case 5:L=O[Q-3];
break
}if(L){var H=(I=="c")?"standalone":"format";
var K=["days",H,L].join("-");
X=E[K][W]
}break;
case"a":var M=(F.getHours()<12)?"am":"pm";
X=E[M];
break;
case"h":case"H":case"K":case"k":var T=F.getHours();
switch(I){case"h":X=(T%12)||12;
break;
case"H":X=T;
break;
case"K":X=(T%12);
break;
case"k":X=T||24;
break
}N=true;
break;
case"m":X=F.getMinutes();
N=true;
break;
case"s":X=F.getSeconds();
N=true;
break;
case"S":X=Math.round(F.getMilliseconds()*Math.pow(10,Q-3));
break;
case"v":case"z":X=A.date.getTimezoneName(F);
if(X){break
}Q=4;
case"Z":var S=F.getTimezoneOffset();
var R=[(S<=0?"+":"-"),A.string.pad(Math.floor(Math.abs(S)/60),2),A.string.pad(Math.abs(S)%60,2)];
if(Q==4){R.splice(0,0,"GMT");
R.splice(3,0,":")
}X=R.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+G)
}if(N){X=A.string.pad(X,Q)
}return X
})
}A.date.locale.format=function(I,O){O=O||{};
var L=A.i18n.normalizeLocale(O.locale);
var E=O.formatLength||"short";
var F=A.date.locale._getGregorianBundle(L);
var J=[];
var H=A.hitch(this,D,I,F);
if(O.selector=="year"){var K=I.getFullYear();
if(L.match(/^zh|^ja/)){K+="\u5E74"
}return K
}if(O.selector!="time"){var G=O.datePattern||F["dateFormat-"+E];
if(G){J.push(B(G,H))
}}if(O.selector!="date"){var N=O.timePattern||F["timeFormat-"+E];
if(N){J.push(B(N,H))
}}var M=J.join(" ");
return M
};
A.date.locale.regexp=function(E){return A.date.locale._parseInfo(E).regexp
};
A.date.locale._parseInfo=function(L){L=L||{};
var J=A.i18n.normalizeLocale(L.locale);
var E=A.date.locale._getGregorianBundle(J);
var M=L.formatLength||"short";
var G=L.datePattern||E["dateFormat-"+M];
var F=L.timePattern||E["timeFormat-"+M];
var H;
if(L.selector=="date"){H=G
}else{if(L.selector=="time"){H=F
}else{H=G+" "+F
}}var I=[];
var K=B(H,A.hitch(this,C,I,E,L));
return{regexp:K,tokens:I,bundle:E}
};
A.date.locale.parse=function(N,E){var G=A.date.locale._parseInfo(E);
var K=G.tokens,F=G.bundle;
var O=new RegExp("^"+G.regexp+"$");
var I=O.exec(N);
if(!I){return null
}var H=["abbr","wide","narrow"];
var P=new Date(1972,0);
var J={};
var M="";
A.forEach(I,function(U,a){if(!a){return 
}var X=K[a-1];
var Y=X.length;
switch(X.charAt(0)){case"y":if(Y!=2){P.setFullYear(U);
J.year=U
}else{if(U<100){U=Number(U);
var S=""+new Date().getFullYear();
var Z=S.substring(0,2)*100;
var c=Number(S.substring(2,4));
var T=Math.min(c+20,99);
var b=(U<T)?Z+U:Z-100+U;
P.setFullYear(b);
J.year=b
}else{if(E.strict){return null
}P.setFullYear(U);
J.year=U
}}break;
case"M":if(Y>2){var R=F["months-format-"+H[Y-3]].concat();
if(!E.strict){U=U.replace(".","").toLowerCase();
R=A.map(R,function(e){return e.replace(".","").toLowerCase()
})
}U=A.indexOf(R,U);
if(U==-1){return null
}}else{U--
}P.setMonth(U);
J.month=U;
break;
case"E":case"e":var W=F["days-format-"+H[Y-3]].concat();
if(!E.strict){U=U.toLowerCase();
W=A.map(W,"".toLowerCase)
}U=A.indexOf(W,U);
if(U==-1){return null
}break;
case"d":P.setDate(U);
J.date=U;
break;
case"D":P.setMonth(0);
P.setDate(U);
break;
case"a":var d=E.am||F.am;
var V=E.pm||F.pm;
if(!E.strict){var Q=/\./g;
U=U.replace(Q,"").toLowerCase();
d=d.replace(Q,"").toLowerCase();
V=V.replace(Q,"").toLowerCase()
}if(E.strict&&U!=d&&U!=V){return null
}M=(U==V)?"p":(U==d)?"a":"";
break;
case"K":if(U==24){U=0
}case"h":case"H":case"k":if(U>23){return null
}P.setHours(U);
break;
case"m":P.setMinutes(U);
break;
case"s":P.setSeconds(U);
break;
case"S":P.setMilliseconds(U)
}});
var L=P.getHours();
if(M==="p"&&L<12){P.setHours(L+12)
}else{if(M==="a"&&L==12){P.setHours(0)
}}if(J.year&&P.getFullYear()!=J.year){return null
}if(J.month&&P.getMonth()!=J.month){return null
}if(J.date&&P.getDate()!=J.date){return null
}return P
};
function B(E,F,J,K){var H=function(L){return L
};
F=F||H;
J=J||H;
K=K||H;
var G=E.match(/(''|[^'])+/g);
var I=false;
A.forEach(G,function(M,L){if(!M){G[L]=""
}else{G[L]=(I?J:F)(M);
I=!I
}});
return K(G.join(""))
}function C(H,E,F,G){G=A.regexp.escapeString(G);
if(!F.strict){G=G.replace(" a"," ?a")
}return G.replace(/([a-z])\1*/ig,function(P){var O;
var M=P.charAt(0);
var N=P.length;
var K="",J="";
if(F.strict){if(N>1){K="0{"+(N-1)+"}"
}if(N>2){J="0{"+(N-2)+"}"
}}else{K="0?";
J="0{0,2}"
}switch(M){case"y":O="\\d{2,4}";
break;
case"M":O=(N>2)?"\\S+":K+"[1-9]|1[0-2]";
break;
case"D":O=K+"[1-9]|"+J+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":O=K+"[1-9]|[12]\\d|3[01]";
break;
case"w":O=K+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":O="\\S+";
break;
case"h":O=K+"[1-9]|1[0-2]";
break;
case"k":O=K+"\\d|1[01]";
break;
case"H":O=K+"\\d|1\\d|2[0-3]";
break;
case"K":O=K+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":O="[0-5]\\d";
break;
case"S":O="\\d{"+N+"}";
break;
case"a":var I=F.am||E.am||"AM";
var L=F.pm||E.pm||"PM";
if(F.strict){O=I+"|"+L
}else{O=I+"|"+L;
if(I!=I.toLowerCase()){O+="|"+I.toLowerCase()
}if(L!=L.toLowerCase()){O+="|"+L.toLowerCase()
}}break;
default:O=".*"
}if(H){H.push(P)
}return"("+O+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var B=[];
A.date.locale.addCustomFormats=function(C,D){B.push({pkg:C,name:D})
};
A.date.locale._getGregorianBundle=function(C){var D={};
A.forEach(B,function(F){var E=A.i18n.getLocalization(F.pkg,F.name,C);
D=A.mixin(D,E)
},this);
return D
}
})();
A.date.locale.addCustomFormats("dojo.cldr","gregorian");
A.date.locale.getNames=function(F,E,H,G){var C;
var B=A.date.locale._getGregorianBundle(G);
var D=[F,H,E];
if(H=="standAlone"){C=B[D.join("-")]
}D[1]="format";
return(C||B[D.join("-")]).concat()
};
A.date.locale.isWeekend=function(B,C){var E=A.cldr.supplemental.getWeekend(C);
var D=(B||new Date()).getDay();
if(E.end<E.start){E.end+=7;
if(D<E.start){D+=7
}}return D>=E.start&&D<=E.end
};
A.date.locale._getDayOfYear=function(B){return A.date.difference(new Date(B.getFullYear(),0,1),B)+1
};
A.date.locale._getWeekOfYear=function(B,D){if(arguments.length==1){D=0
}var E=new Date(B.getFullYear(),0,1).getDay();
var C=(E-D+7)%7;
var F=Math.floor((A.date.locale._getDayOfYear(B)+C-1)/7);
if(E==D){F++
}return F
}
}}});