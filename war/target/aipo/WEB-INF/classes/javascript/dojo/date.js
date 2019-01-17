if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(A){var B=A.getMonth();
var C=[31,28,31,30,31,30,31,31,30,31,30,31];
if(B==1&&dojo.date.isLeapYear(A)){return 29
}return C[B]
};
dojo.date.isLeapYear=function(B){var A=B.getFullYear();
return !(A%400)||(!(A%4)&&!!(A%100))
};
dojo.date.getTimezoneName=function(C){var D=C.toString();
var F="";
var B;
var E=D.indexOf("(");
if(E>-1){F=D.substring(++E,D.indexOf(")"))
}else{var A=/([A-Z\/]+) \d{4}$/;
if((B=D.match(A))){F=B[1]
}else{D=C.toLocaleString();
A=/ ([A-Z\/]+)$/;
if((B=D.match(A))){F=B[1]
}}}return(F=="AM"||F=="PM")?"":F
};
dojo.date.compare=function(C,B,A){C=new Date(Number(C));
B=new Date(Number(B||new Date()));
if(typeof A!=="undefined"){if(A=="date"){C.setHours(0,0,0,0);
B.setHours(0,0,0,0)
}else{if(A=="time"){C.setFullYear(0,0,0);
B.setFullYear(0,0,0)
}}}if(C>B){return 1
}if(C<B){return -1
}return 0
};
dojo.date.add=function(D,C,E){var G=new Date(Number(D));
var B=false;
var K="Date";
switch(C){case"day":break;
case"weekday":var L,A;
var I=0;
var J=E%5;
if(!J){L=(E>0)?5:-5;
A=(E>0)?((E-5)/5):((E+5)/5)
}else{L=J;
A=parseInt(E/5)
}var F=D.getDay();
if(F==6&&E>0){I=1
}else{if(F==0&&E<0){I=-1
}}var H=F+L;
if(H==0||H==6){I=(E>0)?2:-2
}E=7*A+L+I;
break;
case"year":K="FullYear";
B=true;
break;
case"week":E*=7;
break;
case"quarter":E*=3;
case"month":B=true;
K="Month";
break;
case"hour":case"minute":case"second":case"millisecond":K="UTC"+C.charAt(0).toUpperCase()+C.substring(1)+"s"
}if(K){G["set"+K](G["get"+K]()+E)
}if(B&&(G.getDate()<D.getDate())){G.setDate(0)
}return G
};
dojo.date.difference=function(P,N,D){N=N||new Date();
D=D||"day";
var C=N.getFullYear()-P.getFullYear();
var L=1;
switch(D){case"quarter":var Q=P.getMonth();
var O=N.getMonth();
var I=Math.floor(Q/3)+1;
var H=Math.floor(O/3)+1;
H+=(C*4);
L=H-I;
break;
case"weekday":var M=Math.round(dojo.date.difference(P,N,"day"));
var A=parseInt(dojo.date.difference(P,N,"week"));
var K=M%7;
if(K==0){M=A*5
}else{var J=0;
var G=P.getDay();
var E=N.getDay();
A=parseInt(M/7);
K=M%7;
var F=new Date(P);
F.setDate(F.getDate()+(A*7));
var B=F.getDay();
if(M>0){switch(true){case G==6:J=-1;
break;
case G==0:J=0;
break;
case E==6:J=-1;
break;
case E==0:J=-2;
break;
case (B+K)>5:J=-2
}}else{if(M<0){switch(true){case G==6:J=0;
break;
case G==0:J=1;
break;
case E==6:J=2;
break;
case E==0:J=1;
break;
case (B+K)<0:J=2
}}}M+=J;
M-=(A*2)
}L=M;
break;
case"year":L=C;
break;
case"month":L=(N.getMonth()-P.getMonth())+(C*12);
break;
case"week":L=parseInt(dojo.date.difference(P,N,"day")/7);
break;
case"day":L/=24;
case"hour":L/=60;
case"minute":L/=60;
case"second":L/=1000;
case"millisecond":L*=N.getTime()-P.getTime()
}return Math.round(L)
}
};