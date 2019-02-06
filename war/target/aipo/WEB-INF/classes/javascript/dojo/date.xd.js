dojo._xdResourceLoaded({depends:[["provide","dojo.date"]],defineResource:function(A){if(!A._hasResource["dojo.date"]){A._hasResource["dojo.date"]=true;
A.provide("dojo.date");
A.date.getDaysInMonth=function(C){var D=C.getMonth();
var B=[31,28,31,30,31,30,31,31,30,31,30,31];
if(D==1&&A.date.isLeapYear(C)){return 29
}return B[D]
};
A.date.isLeapYear=function(B){var C=B.getFullYear();
return !(C%400)||(!(C%4)&&!!(C%100))
};
A.date.getTimezoneName=function(E){var F=E.toString();
var C="";
var D;
var G=F.indexOf("(");
if(G>-1){C=F.substring(++G,F.indexOf(")"))
}else{var B=/([A-Z\/]+) \d{4}$/;
if((D=F.match(B))){C=D[1]
}else{F=E.toLocaleString();
B=/ ([A-Z\/]+)$/;
if((D=F.match(B))){C=D[1]
}}}return(C=="AM"||C=="PM")?"":C
};
A.date.compare=function(B,D,C){B=new Date(Number(B));
D=new Date(Number(D||new Date()));
if(typeof C!=="undefined"){if(C=="date"){B.setHours(0,0,0,0);
D.setHours(0,0,0,0)
}else{if(C=="time"){B.setFullYear(0,0,0);
D.setFullYear(0,0,0)
}}}if(B>D){return 1
}if(B<D){return -1
}return 0
};
A.date.add=function(B,C,D){var F=new Date(Number(B));
var M=false;
var J="Date";
switch(C){case"day":break;
case"weekday":var K,L;
var H=0;
var I=D%5;
if(!I){K=(D>0)?5:-5;
L=(D>0)?((D-5)/5):((D+5)/5)
}else{K=I;
L=parseInt(D/5)
}var E=B.getDay();
if(E==6&&D>0){H=1
}else{if(E==0&&D<0){H=-1
}}var G=E+K;
if(G==0||G==6){H=(D>0)?2:-2
}D=7*L+K+H;
break;
case"year":J="FullYear";
M=true;
break;
case"week":D*=7;
break;
case"quarter":D*=3;
case"month":M=true;
J="Month";
break;
case"hour":case"minute":case"second":case"millisecond":J="UTC"+C.charAt(0).toUpperCase()+C.substring(1)+"s"
}if(J){F["set"+J](F["get"+J]()+D)
}if(M&&(F.getDate()<B.getDate())){F.setDate(0)
}return F
};
A.date.difference=function(G,D,K){D=D||new Date();
K=K||"day";
var E=D.getFullYear()-G.getFullYear();
var B=1;
switch(K){case"quarter":var H=G.getMonth();
var F=D.getMonth();
var P=Math.floor(H/3)+1;
var O=Math.floor(F/3)+1;
O+=(E*4);
B=O-P;
break;
case"weekday":var C=Math.round(A.date.difference(G,D,"day"));
var I=parseInt(A.date.difference(G,D,"week"));
var R=C%7;
if(R==0){C=I*5
}else{var Q=0;
var N=G.getDay();
var L=D.getDay();
I=parseInt(C/7);
R=C%7;
var M=new Date(G);
M.setDate(M.getDate()+(I*7));
var J=M.getDay();
if(C>0){switch(true){case N==6:Q=-1;
break;
case N==0:Q=0;
break;
case L==6:Q=-1;
break;
case L==0:Q=-2;
break;
case (J+R)>5:Q=-2
}}else{if(C<0){switch(true){case N==6:Q=0;
break;
case N==0:Q=1;
break;
case L==6:Q=2;
break;
case L==0:Q=1;
break;
case (J+R)<0:Q=2
}}}C+=Q;
C-=(I*2)
}B=C;
break;
case"year":B=E;
break;
case"month":B=(D.getMonth()-G.getMonth())+(E*12);
break;
case"week":B=parseInt(A.date.difference(G,D,"day")/7);
break;
case"day":B/=24;
case"hour":B/=60;
case"minute":B/=60;
case"second":B/=1000;
case"millisecond":B*=D.getTime()-G.getTime()
}return Math.round(B)
}
}}});