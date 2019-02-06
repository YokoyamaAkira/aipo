if(!dojo._hasResource["dojo.date.locale"]){dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.require("dojo.date");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.regexp");
dojo.require("dojo.string");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","gregorian",null,"de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn");
(function(){function B(E,D,F){return F.replace(/([a-z])\1*/ig,function(S){var W;
var V=S.charAt(0);
var N=S.length;
var K;
var L=["abbr","wide","narrow"];
switch(V){case"G":W=D[(N<4)?"eraAbbr":"eraNames"][E.getFullYear()<0?0:1];
break;
case"y":W=E.getFullYear();
switch(N){case 1:break;
case 2:W=String(W);
W=W.substr(W.length-2);
break;
default:K=true
}break;
case"Q":case"q":W=Math.ceil((E.getMonth()+1)/3);
K=true;
break;
case"M":case"L":var M=E.getMonth();
var I;
switch(N){case 1:case 2:W=M+1;
K=true;
break;
case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="L")?"standalone":"format";
var H=["months",U,I].join("-");
W=D[H][M]
}break;
case"w":var G=0;
W=dojo.date.locale._getWeekOfYear(E,G);
K=true;
break;
case"d":W=E.getDate();
K=true;
break;
case"D":W=dojo.date.locale._getDayOfYear(E);
K=true;
break;
case"E":case"e":case"c":var T=E.getDay();
var I;
switch(N){case 1:case 2:if(V=="e"){var R=dojo.cldr.supplemental.getFirstDayOfWeek(options.locale);
T=(T-R+7)%7
}if(V!="c"){W=T+1;
K=true;
break
}case 3:case 4:case 5:I=L[N-3];
break
}if(I){var U=(V=="c")?"standalone":"format";
var H=["days",U,I].join("-");
W=D[H][T]
}break;
case"a":var J=(E.getHours()<12)?"am":"pm";
W=D[J];
break;
case"h":case"H":case"K":case"k":var Q=E.getHours();
switch(V){case"h":W=(Q%12)||12;
break;
case"H":W=Q;
break;
case"K":W=(Q%12);
break;
case"k":W=Q||24;
break
}K=true;
break;
case"m":W=E.getMinutes();
K=true;
break;
case"s":W=E.getSeconds();
K=true;
break;
case"S":W=Math.round(E.getMilliseconds()*Math.pow(10,N-3));
break;
case"v":case"z":W=dojo.date.getTimezoneName(E);
if(W){break
}N=4;
case"Z":var P=E.getTimezoneOffset();
var O=[(P<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(P)/60),2),dojo.string.pad(Math.abs(P)%60,2)];
if(N==4){O.splice(0,0,"GMT");
O.splice(3,0,":")
}W=O.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+F)
}if(K){W=dojo.string.pad(W,N)
}return W
})
}dojo.date.locale.format=function(F,L){L=L||{};
var I=dojo.i18n.normalizeLocale(L.locale);
var M=L.formatLength||"short";
var N=dojo.date.locale._getGregorianBundle(I);
var G=[];
var E=dojo.hitch(this,B,F,N);
if(L.selector=="year"){var H=F.getFullYear();
if(I.match(/^zh|^ja/)){H+="\u5E74"
}return H
}if(L.selector!="time"){var D=L.datePattern||N["dateFormat-"+M];
if(D){G.push(C(D,E))
}}if(L.selector!="date"){var K=L.timePattern||N["timeFormat-"+M];
if(K){G.push(C(K,E))
}}var J=G.join(" ");
return J
};
dojo.date.locale.regexp=function(D){return dojo.date.locale._parseInfo(D).regexp
};
dojo.date.locale._parseInfo=function(I){I=I||{};
var G=dojo.i18n.normalizeLocale(I.locale);
var K=dojo.date.locale._getGregorianBundle(G);
var J=I.formatLength||"short";
var D=I.datePattern||K["dateFormat-"+J];
var L=I.timePattern||K["timeFormat-"+J];
var E;
if(I.selector=="date"){E=D
}else{if(I.selector=="time"){E=L
}else{E=D+" "+L
}}var F=[];
var H=C(E,dojo.hitch(this,A,F,K,I));
return{regexp:H,tokens:F,bundle:K}
};
dojo.date.locale.parse=function(K,N){var D=dojo.date.locale._parseInfo(N);
var H=D.tokens,O=D.bundle;
var L=new RegExp("^"+D.regexp+"$");
var F=L.exec(K);
if(!F){return null
}var E=["abbr","wide","narrow"];
var M=new Date(1972,0);
var G={};
var J="";
dojo.forEach(F,function(b,V){if(!V){return 
}var S=H[V-1];
var T=S.length;
switch(S.charAt(0)){case"y":if(T!=2){M.setFullYear(b);
G.year=b
}else{if(b<100){b=Number(b);
var a=""+new Date().getFullYear();
var U=a.substring(0,2)*100;
var X=Number(a.substring(2,4));
var Q=Math.min(X+20,99);
var W=(b<Q)?U+b:U-100+b;
M.setFullYear(W);
G.year=W
}else{if(N.strict){return null
}M.setFullYear(b);
G.year=b
}}break;
case"M":if(T>2){var P=O["months-format-"+E[T-3]].concat();
if(!N.strict){b=b.replace(".","").toLowerCase();
P=dojo.map(P,function(d){return d.replace(".","").toLowerCase()
})
}b=dojo.indexOf(P,b);
if(b==-1){return null
}}else{b--
}M.setMonth(b);
G.month=b;
break;
case"E":case"e":var c=O["days-format-"+E[T-3]].concat();
if(!N.strict){b=b.toLowerCase();
c=dojo.map(c,"".toLowerCase)
}b=dojo.indexOf(c,b);
if(b==-1){return null
}break;
case"d":M.setDate(b);
G.date=b;
break;
case"D":M.setMonth(0);
M.setDate(b);
break;
case"a":var Y=N.am||O.am;
var R=N.pm||O.pm;
if(!N.strict){var Z=/\./g;
b=b.replace(Z,"").toLowerCase();
Y=Y.replace(Z,"").toLowerCase();
R=R.replace(Z,"").toLowerCase()
}if(N.strict&&b!=Y&&b!=R){return null
}J=(b==R)?"p":(b==Y)?"a":"";
break;
case"K":if(b==24){b=0
}case"h":case"H":case"k":if(b>23){return null
}M.setHours(b);
break;
case"m":M.setMinutes(b);
break;
case"s":M.setSeconds(b);
break;
case"S":M.setMilliseconds(b)
}});
var I=M.getHours();
if(J==="p"&&I<12){M.setHours(I+12)
}else{if(J==="a"&&I==12){M.setHours(0)
}}if(G.year&&M.getFullYear()!=G.year){return null
}if(G.month&&M.getMonth()!=G.month){return null
}if(G.date&&M.getDate()!=G.date){return null
}return M
};
function C(H,D,J,G){var E=function(K){return K
};
D=D||E;
J=J||E;
G=G||E;
var I=H.match(/(''|[^'])+/g);
var F=false;
dojo.forEach(I,function(K,L){if(!K){I[L]=""
}else{I[L]=(F?J:D)(K);
F=!F
}});
return G(I.join(""))
}function A(G,D,E,F){F=dojo.regexp.escapeString(F);
if(!E.strict){F=F.replace(" a"," ?a")
}return F.replace(/([a-z])\1*/ig,function(I){var K;
var O=I.charAt(0);
var H=I.length;
var N="",M="";
if(E.strict){if(H>1){N="0{"+(H-1)+"}"
}if(H>2){M="0{"+(H-2)+"}"
}}else{N="0?";
M="0{0,2}"
}switch(O){case"y":K="\\d{2,4}";
break;
case"M":K=(H>2)?"\\S+":N+"[1-9]|1[0-2]";
break;
case"D":K=N+"[1-9]|"+M+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":K=N+"[1-9]|[12]\\d|3[01]";
break;
case"w":K=N+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":K="\\S+";
break;
case"h":K=N+"[1-9]|1[0-2]";
break;
case"k":K=N+"\\d|1[01]";
break;
case"H":K=N+"\\d|1\\d|2[0-3]";
break;
case"K":K=N+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":K="[0-5]\\d";
break;
case"S":K="\\d{"+H+"}";
break;
case"a":var L=E.am||D.am||"AM";
var J=E.pm||D.pm||"PM";
if(E.strict){K=L+"|"+J
}else{K=L+"|"+J;
if(L!=L.toLowerCase()){K+="|"+L.toLowerCase()
}if(J!=J.toLowerCase()){K+="|"+J.toLowerCase()
}}break;
default:K=".*"
}if(G){G.push(I)
}return"("+K+")"
}).replace(/[\xa0 ]/g,"[\\s\\xa0]")
}})();
(function(){var A=[];
dojo.date.locale.addCustomFormats=function(B,C){A.push({pkg:B,name:C})
};
dojo.date.locale._getGregorianBundle=function(B){var C={};
dojo.forEach(A,function(E){var D=dojo.i18n.getLocalization(E.pkg,E.name,B);
C=dojo.mixin(C,D)
},this);
return C
}
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(F,E,B,A){var C;
var G=dojo.date.locale._getGregorianBundle(A);
var D=[F,B,E];
if(B=="standAlone"){C=G[D.join("-")]
}D[1]="format";
return(C||G[D.join("-")]).concat()
};
dojo.date.locale.isWeekend=function(D,A){var C=dojo.cldr.supplemental.getWeekend(A);
var B=(D||new Date()).getDay();
if(C.end<C.start){C.end+=7;
if(B<C.start){B+=7
}}return B>=C.start&&B<=C.end
};
dojo.date.locale._getDayOfYear=function(A){return dojo.date.difference(new Date(A.getFullYear(),0,1),A)+1
};
dojo.date.locale._getWeekOfYear=function(E,B){if(arguments.length==1){B=0
}var C=new Date(E.getFullYear(),0,1).getDay();
var A=(C-B+7)%7;
var D=Math.floor((dojo.date.locale._getDayOfYear(E)+A-1)/7);
if(C==B){D++
}return D
}
};