if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.require("dojo.date");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.regexp");
dojo.require("dojo.string");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","gregorian",null,"de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn");
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
};