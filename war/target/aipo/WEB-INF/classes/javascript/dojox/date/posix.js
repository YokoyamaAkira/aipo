if(!dojo._hasResource["dojox.date.posix"]){dojo._hasResource["dojox.date.posix"]=true;
dojo.provide("dojox.date.posix");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.string");
dojox.date.posix.strftime=function(P,C,B){var H=null;
var E=function(R,Q){return dojo.string.pad(R,Q||2,H||"0")
};
var F=dojo.date.locale._getGregorianBundle(B);
var L=function(Q){switch(Q){case"a":return dojo.date.locale.getNames("days","abbr","format",B)[P.getDay()];
case"A":return dojo.date.locale.getNames("days","wide","format",B)[P.getDay()];
case"b":case"h":return dojo.date.locale.getNames("months","abbr","format",B)[P.getMonth()];
case"B":return dojo.date.locale.getNames("months","wide","format",B)[P.getMonth()];
case"c":return dojo.date.locale.format(P,{formatLength:"full",locale:B});
case"C":return E(Math.floor(P.getFullYear()/100));
case"d":return E(P.getDate());
case"D":return L("m")+"/"+L("d")+"/"+L("y");
case"e":if(H==null){H=" "
}return E(P.getDate());
case"f":if(H==null){H=" "
}return E(P.getMonth()+1);
case"g":break;
case"G":dojo.unimplemented("unimplemented modifier 'G'");
break;
case"F":return L("Y")+"-"+L("m")+"-"+L("d");
case"H":return E(P.getHours());
case"I":return E(P.getHours()%12||12);
case"j":return E(dojo.date.locale._getDayOfYear(P),3);
case"k":if(H==null){H=" "
}return E(P.getHours());
case"l":if(H==null){H=" "
}return E(P.getHours()%12||12);
case"m":return E(P.getMonth()+1);
case"M":return E(P.getMinutes());
case"n":return"\n";
case"p":return F[P.getHours()<12?"am":"pm"];
case"r":return L("I")+":"+L("M")+":"+L("S")+" "+L("p");
case"R":return L("H")+":"+L("M");
case"S":return E(P.getSeconds());
case"t":return"\t";
case"T":return L("H")+":"+L("M")+":"+L("S");
case"u":return String(P.getDay()||7);
case"U":return E(dojo.date.locale._getWeekOfYear(P));
case"V":return E(dojox.date.posix.getIsoWeekOfYear(P));
case"W":return E(dojo.date.locale._getWeekOfYear(P,1));
case"w":return String(P.getDay());
case"x":return dojo.date.locale.format(P,{selector:"date",formatLength:"full",locale:B});
case"X":return dojo.date.locale.format(P,{selector:"time",formatLength:"full",locale:B});
case"y":return E(P.getFullYear()%100);
case"Y":return String(P.getFullYear());
case"z":var R=P.getTimezoneOffset();
return(R>0?"-":"+")+E(Math.floor(Math.abs(R)/60))+":"+E(Math.abs(R)%60);
case"Z":return dojo.date.getTimezoneName(P);
case"%":return"%"
}};
var M="";
var K=0;
var O=0;
var I=null;
while((O=C.indexOf("%",K))!=-1){M+=C.substring(K,O++);
switch(C.charAt(O++)){case"_":H=" ";
break;
case"-":H="";
break;
case"0":H="0";
break;
case"^":I="upper";
break;
case"*":I="lower";
break;
case"#":I="swap";
break;
default:H=null;
O--;
break
}var D=L(C.charAt(O++));
switch(I){case"upper":D=D.toUpperCase();
break;
case"lower":D=D.toLowerCase();
break;
case"swap":var N=D.toLowerCase();
var A="";
var G="";
for(var J=0;
J<D.length;
J++){G=D.charAt(J);
A+=(G==N.charAt(J))?G.toUpperCase():G.toLowerCase()
}D=A;
break;
default:break
}I=null;
M+=D;
K=O
}M+=C.substring(K);
return M
};
dojox.date.posix.getStartOfWeek=function(B,D){if(isNaN(D)){D=dojo.cldr.supplemental.getFirstDayOfWeek?dojo.cldr.supplemental.getFirstDayOfWeek():0
}var C=D;
if(B.getDay()>=D){C-=B.getDay()
}else{C-=(7-B.getDay())
}var A=new Date(B);
A.setHours(0,0,0,0);
return dojo.date.add(A,"day",C)
};
dojox.date.posix.setIsoWeekOfYear=function(C,A){if(!A){return C
}var E=dojox.date.posix.getIsoWeekOfYear(C);
var D=A-E;
if(A<0){var B=dojox.date.posix.getIsoWeeksInYear(C);
D=(B+A+1)-E
}return dojo.date.add(C,"week",D)
};
dojox.date.posix.getIsoWeekOfYear=function(B){var D=dojox.date.posix.getStartOfWeek(B,1);
var A=new Date(B.getFullYear(),0,4);
A=dojox.date.posix.getStartOfWeek(A,1);
var C=D.getTime()-A.getTime();
if(C<0){return dojox.date.posix.getIsoWeeksInYear(D)
}return Math.ceil(C/604800000)+1
};
dojox.date.posix.getIsoWeeksInYear=function(C){function A(D){return D+Math.floor(D/4)-Math.floor(D/100)+Math.floor(D/400)
}var B=C.getFullYear();
return(A(B)%7==4||A(B-1)%7==3)?53:52
}
};