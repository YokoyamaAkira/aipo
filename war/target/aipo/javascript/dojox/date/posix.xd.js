dojo._xdResourceLoaded({depends:[["provide","dojox.date.posix"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.string"]],defineResource:function(A){if(!A._hasResource["dojox.date.posix"]){A._hasResource["dojox.date.posix"]=true;
A.provide("dojox.date.posix");
A.require("dojo.date");
A.require("dojo.date.locale");
A.require("dojo.string");
dojox.date.posix.strftime=function(K,N,M){var C=null;
var P=function(R,S){return A.string.pad(R,S||2,C||"0")
};
var Q=A.date.locale._getGregorianBundle(M);
var G=function(S){switch(S){case"a":return A.date.locale.getNames("days","abbr","format",M)[K.getDay()];
case"A":return A.date.locale.getNames("days","wide","format",M)[K.getDay()];
case"b":case"h":return A.date.locale.getNames("months","abbr","format",M)[K.getMonth()];
case"B":return A.date.locale.getNames("months","wide","format",M)[K.getMonth()];
case"c":return A.date.locale.format(K,{formatLength:"full",locale:M});
case"C":return P(Math.floor(K.getFullYear()/100));
case"d":return P(K.getDate());
case"D":return G("m")+"/"+G("d")+"/"+G("y");
case"e":if(C==null){C=" "
}return P(K.getDate());
case"f":if(C==null){C=" "
}return P(K.getMonth()+1);
case"g":break;
case"G":A.unimplemented("unimplemented modifier 'G'");
break;
case"F":return G("Y")+"-"+G("m")+"-"+G("d");
case"H":return P(K.getHours());
case"I":return P(K.getHours()%12||12);
case"j":return P(A.date.locale._getDayOfYear(K),3);
case"k":if(C==null){C=" "
}return P(K.getHours());
case"l":if(C==null){C=" "
}return P(K.getHours()%12||12);
case"m":return P(K.getMonth()+1);
case"M":return P(K.getMinutes());
case"n":return"\n";
case"p":return Q[K.getHours()<12?"am":"pm"];
case"r":return G("I")+":"+G("M")+":"+G("S")+" "+G("p");
case"R":return G("H")+":"+G("M");
case"S":return P(K.getSeconds());
case"t":return"\t";
case"T":return G("H")+":"+G("M")+":"+G("S");
case"u":return String(K.getDay()||7);
case"U":return P(A.date.locale._getWeekOfYear(K));
case"V":return P(dojox.date.posix.getIsoWeekOfYear(K));
case"W":return P(A.date.locale._getWeekOfYear(K,1));
case"w":return String(K.getDay());
case"x":return A.date.locale.format(K,{selector:"date",formatLength:"full",locale:M});
case"X":return A.date.locale.format(K,{selector:"time",formatLength:"full",locale:M});
case"y":return P(K.getFullYear()%100);
case"Y":return String(K.getFullYear());
case"z":var R=K.getTimezoneOffset();
return(R>0?"-":"+")+P(Math.floor(Math.abs(R)/60))+":"+P(Math.abs(R)%60);
case"Z":return A.date.getTimezoneName(K);
case"%":return"%"
}};
var H="";
var F=0;
var J=0;
var D=null;
while((J=N.indexOf("%",F))!=-1){H+=N.substring(F,J++);
switch(N.charAt(J++)){case"_":C=" ";
break;
case"-":C="";
break;
case"0":C="0";
break;
case"^":D="upper";
break;
case"*":D="lower";
break;
case"#":D="swap";
break;
default:C=null;
J--;
break
}var O=G(N.charAt(J++));
switch(D){case"upper":O=O.toUpperCase();
break;
case"lower":O=O.toLowerCase();
break;
case"swap":var I=O.toLowerCase();
var L="";
var B="";
for(var E=0;
E<O.length;
E++){B=O.charAt(E);
L+=(B==I.charAt(E))?B.toUpperCase():B.toLowerCase()
}O=L;
break;
default:break
}D=null;
H+=O;
F=J
}H+=N.substring(F);
return H
};
dojox.date.posix.getStartOfWeek=function(D,B){if(isNaN(B)){B=A.cldr.supplemental.getFirstDayOfWeek?A.cldr.supplemental.getFirstDayOfWeek():0
}var E=B;
if(D.getDay()>=B){E-=D.getDay()
}else{E-=(7-D.getDay())
}var C=new Date(D);
C.setHours(0,0,0,0);
return A.date.add(C,"day",E)
};
dojox.date.posix.setIsoWeekOfYear=function(E,C){if(!C){return E
}var B=dojox.date.posix.getIsoWeekOfYear(E);
var F=C-B;
if(C<0){var D=dojox.date.posix.getIsoWeeksInYear(E);
F=(D+C+1)-B
}return A.date.add(E,"week",F)
};
dojox.date.posix.getIsoWeekOfYear=function(D){var B=dojox.date.posix.getStartOfWeek(D,1);
var C=new Date(D.getFullYear(),0,4);
C=dojox.date.posix.getStartOfWeek(C,1);
var E=B.getTime()-C.getTime();
if(E<0){return dojox.date.posix.getIsoWeeksInYear(B)
}return Math.ceil(E/604800000)+1
};
dojox.date.posix.getIsoWeeksInYear=function(B){function C(E){return E+Math.floor(E/4)-Math.floor(E/100)+Math.floor(E/400)
}var D=B.getFullYear();
return(C(D)%7==4||C(D-1)%7==3)?53:52
}
}}});