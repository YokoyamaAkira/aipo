dojo._xdResourceLoaded({depends:[["provide","dojox.date.posix"],["require","dojo.date"],["require","dojo.date.locale"],["require","dojo.string"]],defineResource:function(A){if(!A._hasResource["dojox.date.posix"]){A._hasResource["dojox.date.posix"]=true;
A.provide("dojox.date.posix");
A.require("dojo.date");
A.require("dojo.date.locale");
A.require("dojo.string");
dojox.date.posix.strftime=function(B,F,E){var K=null;
var H=function(R,S){return A.string.pad(R,S||2,K||"0")
};
var I=A.date.locale._getGregorianBundle(E);
var N=function(S){switch(S){case"a":return A.date.locale.getNames("days","abbr","format",E)[B.getDay()];
case"A":return A.date.locale.getNames("days","wide","format",E)[B.getDay()];
case"b":case"h":return A.date.locale.getNames("months","abbr","format",E)[B.getMonth()];
case"B":return A.date.locale.getNames("months","wide","format",E)[B.getMonth()];
case"c":return A.date.locale.format(B,{formatLength:"full",locale:E});
case"C":return H(Math.floor(B.getFullYear()/100));
case"d":return H(B.getDate());
case"D":return N("m")+"/"+N("d")+"/"+N("y");
case"e":if(K==null){K=" "
}return H(B.getDate());
case"f":if(K==null){K=" "
}return H(B.getMonth()+1);
case"g":break;
case"G":A.unimplemented("unimplemented modifier 'G'");
break;
case"F":return N("Y")+"-"+N("m")+"-"+N("d");
case"H":return H(B.getHours());
case"I":return H(B.getHours()%12||12);
case"j":return H(A.date.locale._getDayOfYear(B),3);
case"k":if(K==null){K=" "
}return H(B.getHours());
case"l":if(K==null){K=" "
}return H(B.getHours()%12||12);
case"m":return H(B.getMonth()+1);
case"M":return H(B.getMinutes());
case"n":return"\n";
case"p":return I[B.getHours()<12?"am":"pm"];
case"r":return N("I")+":"+N("M")+":"+N("S")+" "+N("p");
case"R":return N("H")+":"+N("M");
case"S":return H(B.getSeconds());
case"t":return"\t";
case"T":return N("H")+":"+N("M")+":"+N("S");
case"u":return String(B.getDay()||7);
case"U":return H(A.date.locale._getWeekOfYear(B));
case"V":return H(dojox.date.posix.getIsoWeekOfYear(B));
case"W":return H(A.date.locale._getWeekOfYear(B,1));
case"w":return String(B.getDay());
case"x":return A.date.locale.format(B,{selector:"date",formatLength:"full",locale:E});
case"X":return A.date.locale.format(B,{selector:"time",formatLength:"full",locale:E});
case"y":return H(B.getFullYear()%100);
case"Y":return String(B.getFullYear());
case"z":var R=B.getTimezoneOffset();
return(R>0?"-":"+")+H(Math.floor(Math.abs(R)/60))+":"+H(Math.abs(R)%60);
case"Z":return A.date.getTimezoneName(B);
case"%":return"%"
}};
var O="";
var M=0;
var Q=0;
var D=null;
while((Q=F.indexOf("%",M))!=-1){O+=F.substring(M,Q++);
switch(F.charAt(Q++)){case"_":K=" ";
break;
case"-":K="";
break;
case"0":K="0";
break;
case"^":D="upper";
break;
case"*":D="lower";
break;
case"#":D="swap";
break;
default:K=null;
Q--;
break
}var G=N(F.charAt(Q++));
switch(D){case"upper":G=G.toUpperCase();
break;
case"lower":G=G.toLowerCase();
break;
case"swap":var P=G.toLowerCase();
var C="";
var J="";
for(var L=0;
L<G.length;
L++){J=G.charAt(L);
C+=(J==P.charAt(L))?J.toUpperCase():J.toLowerCase()
}G=C;
break;
default:break
}D=null;
O+=G;
M=Q
}O+=F.substring(M);
return O
};
dojox.date.posix.getStartOfWeek=function(E,C){if(isNaN(C)){C=A.cldr.supplemental.getFirstDayOfWeek?A.cldr.supplemental.getFirstDayOfWeek():0
}var B=C;
if(E.getDay()>=C){B-=E.getDay()
}else{B-=(7-E.getDay())
}var D=new Date(E);
D.setHours(0,0,0,0);
return A.date.add(D,"day",B)
};
dojox.date.posix.setIsoWeekOfYear=function(F,D){if(!D){return F
}var C=dojox.date.posix.getIsoWeekOfYear(F);
var B=D-C;
if(D<0){var E=dojox.date.posix.getIsoWeeksInYear(F);
B=(E+D+1)-C
}return A.date.add(F,"week",B)
};
dojox.date.posix.getIsoWeekOfYear=function(E){var C=dojox.date.posix.getStartOfWeek(E,1);
var D=new Date(E.getFullYear(),0,4);
D=dojox.date.posix.getStartOfWeek(D,1);
var B=C.getTime()-D.getTime();
if(B<0){return dojox.date.posix.getIsoWeeksInYear(C)
}return Math.ceil(B/604800000)+1
};
dojox.date.posix.getIsoWeeksInYear=function(C){function D(E){return E+Math.floor(E/4)-Math.floor(E/100)+Math.floor(E/400)
}var B=C.getFullYear();
return(D(B)%7==4||D(B-1)%7==3)?53:52
}
}}});