if(!dojo._hasResource["dojox.date.posix"]){dojo._hasResource["dojox.date.posix"]=true;
dojo.provide("dojox.date.posix");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.string");
dojox.date.posix.strftime=function(J,M,L){var B=null;
var O=function(Q,R){return dojo.string.pad(Q,R||2,B||"0")
};
var P=dojo.date.locale._getGregorianBundle(L);
var F=function(R){switch(R){case"a":return dojo.date.locale.getNames("days","abbr","format",L)[J.getDay()];
case"A":return dojo.date.locale.getNames("days","wide","format",L)[J.getDay()];
case"b":case"h":return dojo.date.locale.getNames("months","abbr","format",L)[J.getMonth()];
case"B":return dojo.date.locale.getNames("months","wide","format",L)[J.getMonth()];
case"c":return dojo.date.locale.format(J,{formatLength:"full",locale:L});
case"C":return O(Math.floor(J.getFullYear()/100));
case"d":return O(J.getDate());
case"D":return F("m")+"/"+F("d")+"/"+F("y");
case"e":if(B==null){B=" "
}return O(J.getDate());
case"f":if(B==null){B=" "
}return O(J.getMonth()+1);
case"g":break;
case"G":dojo.unimplemented("unimplemented modifier 'G'");
break;
case"F":return F("Y")+"-"+F("m")+"-"+F("d");
case"H":return O(J.getHours());
case"I":return O(J.getHours()%12||12);
case"j":return O(dojo.date.locale._getDayOfYear(J),3);
case"k":if(B==null){B=" "
}return O(J.getHours());
case"l":if(B==null){B=" "
}return O(J.getHours()%12||12);
case"m":return O(J.getMonth()+1);
case"M":return O(J.getMinutes());
case"n":return"\n";
case"p":return P[J.getHours()<12?"am":"pm"];
case"r":return F("I")+":"+F("M")+":"+F("S")+" "+F("p");
case"R":return F("H")+":"+F("M");
case"S":return O(J.getSeconds());
case"t":return"\t";
case"T":return F("H")+":"+F("M")+":"+F("S");
case"u":return String(J.getDay()||7);
case"U":return O(dojo.date.locale._getWeekOfYear(J));
case"V":return O(dojox.date.posix.getIsoWeekOfYear(J));
case"W":return O(dojo.date.locale._getWeekOfYear(J,1));
case"w":return String(J.getDay());
case"x":return dojo.date.locale.format(J,{selector:"date",formatLength:"full",locale:L});
case"X":return dojo.date.locale.format(J,{selector:"time",formatLength:"full",locale:L});
case"y":return O(J.getFullYear()%100);
case"Y":return String(J.getFullYear());
case"z":var Q=J.getTimezoneOffset();
return(Q>0?"-":"+")+O(Math.floor(Math.abs(Q)/60))+":"+O(Math.abs(Q)%60);
case"Z":return dojo.date.getTimezoneName(J);
case"%":return"%"
}};
var G="";
var E=0;
var I=0;
var C=null;
while((I=M.indexOf("%",E))!=-1){G+=M.substring(E,I++);
switch(M.charAt(I++)){case"_":B=" ";
break;
case"-":B="";
break;
case"0":B="0";
break;
case"^":C="upper";
break;
case"*":C="lower";
break;
case"#":C="swap";
break;
default:B=null;
I--;
break
}var N=F(M.charAt(I++));
switch(C){case"upper":N=N.toUpperCase();
break;
case"lower":N=N.toLowerCase();
break;
case"swap":var H=N.toLowerCase();
var K="";
var A="";
for(var D=0;
D<N.length;
D++){A=N.charAt(D);
K+=(A==H.charAt(D))?A.toUpperCase():A.toLowerCase()
}N=K;
break;
default:break
}C=null;
G+=N;
E=I
}G+=M.substring(E);
return G
};
dojox.date.posix.getStartOfWeek=function(C,A){if(isNaN(A)){A=dojo.cldr.supplemental.getFirstDayOfWeek?dojo.cldr.supplemental.getFirstDayOfWeek():0
}var D=A;
if(C.getDay()>=A){D-=C.getDay()
}else{D-=(7-C.getDay())
}var B=new Date(C);
B.setHours(0,0,0,0);
return dojo.date.add(B,"day",D)
};
dojox.date.posix.setIsoWeekOfYear=function(D,B){if(!B){return D
}var A=dojox.date.posix.getIsoWeekOfYear(D);
var E=B-A;
if(B<0){var C=dojox.date.posix.getIsoWeeksInYear(D);
E=(C+B+1)-A
}return dojo.date.add(D,"week",E)
};
dojox.date.posix.getIsoWeekOfYear=function(C){var A=dojox.date.posix.getStartOfWeek(C,1);
var B=new Date(C.getFullYear(),0,4);
B=dojox.date.posix.getStartOfWeek(B,1);
var D=A.getTime()-B.getTime();
if(D<0){return dojox.date.posix.getIsoWeeksInYear(A)
}return Math.ceil(D/604800000)+1
};
dojox.date.posix.getIsoWeeksInYear=function(A){function B(D){return D+Math.floor(D/4)-Math.floor(D/100)+Math.floor(D/400)
}var C=A.getFullYear();
return(B(C)%7==4||B(C-1)%7==3)?53:52
}
};