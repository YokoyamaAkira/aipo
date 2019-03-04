dojo._xdResourceLoaded({depends:[["provide","dojo.date.locale"],["require","dojo.date"],["require","dojo.cldr.supplemental"],["require","dojo.regexp"],["require","dojo.string"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","gregorian",null,"de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn","de,en,en-au,en-ca,en-gb,es,es-es,fr,ROOT,it,it-it,ja,ko,ko-kr,pt,pt-br,zh,zh-cn"]],defineResource:function(A){if(!A._hasResource["dojo.date.locale"]){A._hasResource["dojo.date.locale"]=true;
A.provide("dojo.date.locale");
A.require("dojo.date");
A.require("dojo.cldr.supplemental");
A.require("dojo.regexp");
A.require("dojo.string");
A.require("dojo.i18n");
(function(){function C(F,E,G){return G.replace(/([a-z])\1*/ig,function(T){var X;
var W=T.charAt(0);
var O=T.length;
var L;
var M=["abbr","wide","narrow"];
switch(W){case"G":X=E[(O<4)?"eraAbbr":"eraNames"][F.getFullYear()<0?0:1];
break;
case"y":X=F.getFullYear();
switch(O){case 1:break;
case 2:X=String(X);
X=X.substr(X.length-2);
break;
default:L=true
}break;
case"Q":case"q":X=Math.ceil((F.getMonth()+1)/3);
L=true;
break;
case"M":case"L":var N=F.getMonth();
var J;
switch(O){case 1:case 2:X=N+1;
L=true;
break;
case 3:case 4:case 5:J=M[O-3];
break
}if(J){var V=(W=="L")?"standalone":"format";
var I=["months",V,J].join("-");
X=E[I][N]
}break;
case"w":var H=0;
X=A.date.locale._getWeekOfYear(F,H);
L=true;
break;
case"d":X=F.getDate();
L=true;
break;
case"D":X=A.date.locale._getDayOfYear(F);
L=true;
break;
case"E":case"e":case"c":var U=F.getDay();
var J;
switch(O){case 1:case 2:if(W=="e"){var S=A.cldr.supplemental.getFirstDayOfWeek(options.locale);
U=(U-S+7)%7
}if(W!="c"){X=U+1;
L=true;
break
}case 3:case 4:case 5:J=M[O-3];
break
}if(J){var V=(W=="c")?"standalone":"format";
var I=["days",V,J].join("-");
X=E[I][U]
}break;
case"a":var K=(F.getHours()<12)?"am":"pm";
X=E[K];
break;
case"h":case"H":case"K":case"k":var R=F.getHours();
switch(W){case"h":X=(R%12)||12;
break;
case"H":X=R;
break;
case"K":X=(R%12);
break;
case"k":X=R||24;
break
}L=true;
break;
case"m":X=F.getMinutes();
L=true;
break;
case"s":X=F.getSeconds();
L=true;
break;
case"S":X=Math.round(F.getMilliseconds()*Math.pow(10,O-3));
break;
case"v":case"z":X=A.date.getTimezoneName(F);
if(X){break
}O=4;
case"Z":var Q=F.getTimezoneOffset();
var P=[(Q<=0?"+":"-"),A.string.pad(Math.floor(Math.abs(Q)/60),2),A.string.pad(Math.abs(Q)%60,2)];
if(O==4){P.splice(0,0,"GMT");
P.splice(3,0,":")
}X=P.join("");
break;
default:throw new Error("dojo.date.locale.format: invalid pattern char: "+G)
}if(L){X=A.string.pad(X,O)
}return X
})
}A.date.locale.format=function(G,M){M=M||{};
var J=A.i18n.normalizeLocale(M.locale);
var N=M.formatLength||"short";
var O=A.date.locale._getGregorianBundle(J);
var H=[];
var F=A.hitch(this,C,G,O);
if(M.selector=="year"){var I=G.getFullYear();
if(J.match(/^zh|^ja/)){I+="\u5E74"
}return I
}if(M.selector!="time"){var E=M.datePattern||O["dateFormat-"+N];
if(E){H.push(D(E,F))
}}if(M.selector!="date"){var L=M.timePattern||O["timeFormat-"+N];
if(L){H.push(D(L,F))
}}var K=H.join(" ");
return K
};
A.date.locale.regexp=function(E){return A.date.locale._parseInfo(E).regexp
};
A.date.locale._parseInfo=function(J){J=J||{};
var H=A.i18n.normalizeLocale(J.locale);
var L=A.date.locale._getGregorianBundle(H);
var K=J.formatLength||"short";
var E=J.datePattern||L["dateFormat-"+K];
var M=J.timePattern||L["timeFormat-"+K];
var F;
if(J.selector=="date"){F=E
}else{if(J.selector=="time"){F=M
}else{F=E+" "+M
}}var G=[];
var I=D(F,A.hitch(this,B,G,L,J));
return{regexp:I,tokens:G,bundle:L}
};
A.date.locale.parse=function(L,O){var E=A.date.locale._parseInfo(O);
var I=E.tokens,P=E.bundle;
var M=new RegExp("^"+E.regexp+"$");
var G=M.exec(L);
if(!G){return null
}var F=["abbr","wide","narrow"];
var N=new Date(1972,0);
var H={};
var K="";
A.forEach(G,function(c,W){if(!W){return 
}var T=I[W-1];
var U=T.length;
switch(T.charAt(0)){case"y":if(U!=2){N.setFullYear(c);
H.year=c
}else{if(c<100){c=Number(c);
var b=""+new Date().getFullYear();
var V=b.substring(0,2)*100;
var Y=Number(b.substring(2,4));
var R=Math.min(Y+20,99);
var X=(c<R)?V+c:V-100+c;
N.setFullYear(X);
H.year=X
}else{if(O.strict){return null
}N.setFullYear(c);
H.year=c
}}break;
case"M":if(U>2){var Q=P["months-format-"+F[U-3]].concat();
if(!O.strict){c=c.replace(".","").toLowerCase();
Q=A.map(Q,function(e){return e.replace(".","").toLowerCase()
})
}c=A.indexOf(Q,c);
if(c==-1){return null
}}else{c--
}N.setMonth(c);
H.month=c;
break;
case"E":case"e":var d=P["days-format-"+F[U-3]].concat();
if(!O.strict){c=c.toLowerCase();
d=A.map(d,"".toLowerCase)
}c=A.indexOf(d,c);
if(c==-1){return null
}break;
case"d":N.setDate(c);
H.date=c;
break;
case"D":N.setMonth(0);
N.setDate(c);
break;
case"a":var Z=O.am||P.am;
var S=O.pm||P.pm;
if(!O.strict){var a=/\./g;
c=c.replace(a,"").toLowerCase();
Z=Z.replace(a,"").toLowerCase();
S=S.replace(a,"").toLowerCase()
}if(O.strict&&c!=Z&&c!=S){return null
}K=(c==S)?"p":(c==Z)?"a":"";
break;
case"K":if(c==24){c=0
}case"h":case"H":case"k":if(c>23){return null
}N.setHours(c);
break;
case"m":N.setMinutes(c);
break;
case"s":N.setSeconds(c);
break;
case"S":N.setMilliseconds(c)
}});
var J=N.getHours();
if(K==="p"&&J<12){N.setHours(J+12)
}else{if(K==="a"&&J==12){N.setHours(0)
}}if(H.year&&N.getFullYear()!=H.year){return null
}if(H.month&&N.getMonth()!=H.month){return null
}if(H.date&&N.getDate()!=H.date){return null
}return N
};
function D(I,E,K,H){var F=function(L){return L
};
E=E||F;
K=K||F;
H=H||F;
var J=I.match(/(''|[^'])+/g);
var G=false;
A.forEach(J,function(L,M){if(!L){J[M]=""
}else{J[M]=(G?K:E)(L);
G=!G
}});
return H(J.join(""))
}function B(H,E,F,G){G=A.regexp.escapeString(G);
if(!F.strict){G=G.replace(" a"," ?a")
}return G.replace(/([a-z])\1*/ig,function(J){var L;
var P=J.charAt(0);
var I=J.length;
var O="",N="";
if(F.strict){if(I>1){O="0{"+(I-1)+"}"
}if(I>2){N="0{"+(I-2)+"}"
}}else{O="0?";
N="0{0,2}"
}switch(P){case"y":L="\\d{2,4}";
break;
case"M":L=(I>2)?"\\S+":O+"[1-9]|1[0-2]";
break;
case"D":L=O+"[1-9]|"+N+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case"d":L=O+"[1-9]|[12]\\d|3[01]";
break;
case"w":L=O+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case"E":L="\\S+";
break;
case"h":L=O+"[1-9]|1[0-2]";
break;
case"k":L=O+"\\d|1[01]";
break;
case"H":L=O+"\\d|1\\d|2[0-3]";
break;
case"K":L=O+"[1-9]|1\\d|2[0-4]";
break;
case"m":case"s":L="[0-5]\\d";
break;
case"S":L="\\d{"+I+"}";
break;
case"a":var M=F.am||E.am||"AM";
var K=F.pm||E.pm||"PM";
if(F.strict){L=M+"|"+K
}else{L=M+"|"+K;
if(M!=M.toLowerCase()){L+="|"+M.toLowerCase()
}if(K!=K.toLowerCase()){L+="|"+K.toLowerCase()
}}break;
default:L=".*"
}if(H){H.push(J)
}return"("+L+")"
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
A.date.locale.getNames=function(G,F,C,B){var D;
var H=A.date.locale._getGregorianBundle(B);
var E=[G,C,F];
if(C=="standAlone"){D=H[E.join("-")]
}E[1]="format";
return(D||H[E.join("-")]).concat()
};
A.date.locale.isWeekend=function(E,B){var D=A.cldr.supplemental.getWeekend(B);
var C=(E||new Date()).getDay();
if(D.end<D.start){D.end+=7;
if(C<D.start){C+=7
}}return C>=D.start&&C<=D.end
};
A.date.locale._getDayOfYear=function(B){return A.date.difference(new Date(B.getFullYear(),0,1),B)+1
};
A.date.locale._getWeekOfYear=function(F,C){if(arguments.length==1){C=0
}var D=new Date(F.getFullYear(),0,1).getDay();
var B=(D-C+7)%7;
var E=Math.floor((A.date.locale._getDayOfYear(F)+B-1)/7);
if(D==C){E++
}return E
}
}}});