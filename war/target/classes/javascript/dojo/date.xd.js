dojo._xdResourceLoaded({depends:[["provide","dojo.date"]],defineResource:function(A){if(!A._hasResource["dojo.date"]){A._hasResource["dojo.date"]=true;
A.provide("dojo.date");
A.date.getDaysInMonth=function(B){var C=B.getMonth();
var D=[31,28,31,30,31,30,31,31,30,31,30,31];
if(C==1&&A.date.isLeapYear(B)){return 29
}return D[C]
};
A.date.isLeapYear=function(C){var B=C.getFullYear();
return !(B%400)||(!(B%4)&&!!(B%100))
};
A.date.getTimezoneName=function(D){var E=D.toString();
var G="";
var C;
var F=E.indexOf("(");
if(F>-1){G=E.substring(++F,E.indexOf(")"))
}else{var B=/([A-Z\/]+) \d{4}$/;
if((C=E.match(B))){G=C[1]
}else{E=D.toLocaleString();
B=/ ([A-Z\/]+)$/;
if((C=E.match(B))){G=C[1]
}}}return(G=="AM"||G=="PM")?"":G
};
A.date.compare=function(D,C,B){D=new Date(Number(D));
C=new Date(Number(C||new Date()));
if(typeof B!=="undefined"){if(B=="date"){D.setHours(0,0,0,0);
C.setHours(0,0,0,0)
}else{if(B=="time"){D.setFullYear(0,0,0);
C.setFullYear(0,0,0)
}}}if(D>C){return 1
}if(D<C){return -1
}return 0
};
A.date.add=function(E,D,F){var H=new Date(Number(E));
var C=false;
var L="Date";
switch(D){case"day":break;
case"weekday":var M,B;
var J=0;
var K=F%5;
if(!K){M=(F>0)?5:-5;
B=(F>0)?((F-5)/5):((F+5)/5)
}else{M=K;
B=parseInt(F/5)
}var G=E.getDay();
if(G==6&&F>0){J=1
}else{if(G==0&&F<0){J=-1
}}var I=G+M;
if(I==0||I==6){J=(F>0)?2:-2
}F=7*B+M+J;
break;
case"year":L="FullYear";
C=true;
break;
case"week":F*=7;
break;
case"quarter":F*=3;
case"month":C=true;
L="Month";
break;
case"hour":case"minute":case"second":case"millisecond":L="UTC"+D.charAt(0).toUpperCase()+D.substring(1)+"s"
}if(L){H["set"+L](H["get"+L]()+F)
}if(C&&(H.getDate()<E.getDate())){H.setDate(0)
}return H
};
A.date.difference=function(Q,O,E){O=O||new Date();
E=E||"day";
var D=O.getFullYear()-Q.getFullYear();
var M=1;
switch(E){case"quarter":var R=Q.getMonth();
var P=O.getMonth();
var J=Math.floor(R/3)+1;
var I=Math.floor(P/3)+1;
I+=(D*4);
M=I-J;
break;
case"weekday":var N=Math.round(A.date.difference(Q,O,"day"));
var B=parseInt(A.date.difference(Q,O,"week"));
var L=N%7;
if(L==0){N=B*5
}else{var K=0;
var H=Q.getDay();
var F=O.getDay();
B=parseInt(N/7);
L=N%7;
var G=new Date(Q);
G.setDate(G.getDate()+(B*7));
var C=G.getDay();
if(N>0){switch(true){case H==6:K=-1;
break;
case H==0:K=0;
break;
case F==6:K=-1;
break;
case F==0:K=-2;
break;
case (C+L)>5:K=-2
}}else{if(N<0){switch(true){case H==6:K=0;
break;
case H==0:K=1;
break;
case F==6:K=2;
break;
case F==0:K=1;
break;
case (C+L)<0:K=2
}}}N+=K;
N-=(B*2)
}M=N;
break;
case"year":M=D;
break;
case"month":M=(O.getMonth()-Q.getMonth())+(D*12);
break;
case"week":M=parseInt(A.date.difference(Q,O,"day")/7);
break;
case"day":M/=24;
case"hour":M/=60;
case"minute":M/=60;
case"second":M/=1000;
case"millisecond":M*=O.getTime()-Q.getTime()
}return Math.round(M)
}
}}});