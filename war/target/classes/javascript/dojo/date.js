if(!dojo._hasResource["dojo.date"]){dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(C){var A=C.getMonth();
var B=[31,28,31,30,31,30,31,31,30,31,30,31];
if(A==1&&dojo.date.isLeapYear(C)){return 29
}return B[A]
};
dojo.date.isLeapYear=function(A){var B=A.getFullYear();
return !(B%400)||(!(B%4)&&!!(B%100))
};
dojo.date.getTimezoneName=function(B){var C=B.toString();
var E="";
var A;
var D=C.indexOf("(");
if(D>-1){E=C.substring(++D,C.indexOf(")"))
}else{var F=/([A-Z\/]+) \d{4}$/;
if((A=C.match(F))){E=A[1]
}else{C=B.toLocaleString();
F=/ ([A-Z\/]+)$/;
if((A=C.match(F))){E=A[1]
}}}return(E=="AM"||E=="PM")?"":E
};
dojo.date.compare=function(B,A,C){B=new Date(Number(B));
A=new Date(Number(A||new Date()));
if(typeof C!=="undefined"){if(C=="date"){B.setHours(0,0,0,0);
A.setHours(0,0,0,0)
}else{if(C=="time"){B.setFullYear(0,0,0);
A.setFullYear(0,0,0)
}}}if(B>A){return 1
}if(B<A){return -1
}return 0
};
dojo.date.add=function(L,K,A){var C=new Date(Number(L));
var J=false;
var G="Date";
switch(K){case"day":break;
case"weekday":var H,I;
var E=0;
var F=A%5;
if(!F){H=(A>0)?5:-5;
I=(A>0)?((A-5)/5):((A+5)/5)
}else{H=F;
I=parseInt(A/5)
}var B=L.getDay();
if(B==6&&A>0){E=1
}else{if(B==0&&A<0){E=-1
}}var D=B+H;
if(D==0||D==6){E=(A>0)?2:-2
}A=7*I+H+E;
break;
case"year":G="FullYear";
J=true;
break;
case"week":A*=7;
break;
case"quarter":A*=3;
case"month":J=true;
G="Month";
break;
case"hour":case"minute":case"second":case"millisecond":G="UTC"+K.charAt(0).toUpperCase()+K.substring(1)+"s"
}if(G){C["set"+G](C["get"+G]()+A)
}if(J&&(C.getDate()<L.getDate())){C.setDate(0)
}return C
};
dojo.date.difference=function(D,B,I){B=B||new Date();
I=I||"day";
var H=B.getFullYear()-D.getFullYear();
var Q=1;
switch(I){case"quarter":var E=D.getMonth();
var C=B.getMonth();
var N=Math.floor(E/3)+1;
var M=Math.floor(C/3)+1;
M+=(H*4);
Q=M-N;
break;
case"weekday":var A=Math.round(dojo.date.difference(D,B,"day"));
var F=parseInt(dojo.date.difference(D,B,"week"));
var P=A%7;
if(P==0){A=F*5
}else{var O=0;
var L=D.getDay();
var J=B.getDay();
F=parseInt(A/7);
P=A%7;
var K=new Date(D);
K.setDate(K.getDate()+(F*7));
var G=K.getDay();
if(A>0){switch(true){case L==6:O=-1;
break;
case L==0:O=0;
break;
case J==6:O=-1;
break;
case J==0:O=-2;
break;
case (G+P)>5:O=-2
}}else{if(A<0){switch(true){case L==6:O=0;
break;
case L==0:O=1;
break;
case J==6:O=2;
break;
case J==0:O=1;
break;
case (G+P)<0:O=2
}}}A+=O;
A-=(F*2)
}Q=A;
break;
case"year":Q=H;
break;
case"month":Q=(B.getMonth()-D.getMonth())+(H*12);
break;
case"week":Q=parseInt(dojo.date.difference(D,B,"day")/7);
break;
case"day":Q/=24;
case"hour":Q/=60;
case"minute":Q/=60;
case"second":Q/=1000;
case"millisecond":Q*=B.getTime()-D.getTime()
}return Math.round(Q)
}
};