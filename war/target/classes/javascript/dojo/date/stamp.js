if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(D,A){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var B=dojo.date.stamp._isoRegExp.exec(D);
var F=null;
if(B){B.shift();
B[1]&&B[1]--;
B[6]&&(B[6]*=1000);
if(A){A=new Date(A);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return A["get"+G]()
}).forEach(function(G,H){if(B[H]===undefined){B[H]=G
}})
}F=new Date(B[0]||1970,B[1]||0,B[2]||0,B[3]||0,B[4]||0,B[5]||0,B[6]||0);
var E=0;
var C=B[7]&&B[7].charAt(0);
if(C!="Z"){E=((B[8]||0)*60)+(Number(B[9])||0);
if(C!="-"){E*=-1
}}if(C){E-=F.getTimezoneOffset()
}if(E){F.setTime(F.getTime()+E*60000)
}}return F
};
dojo.date.stamp.toISOString=function(B,F){var E=function(K){return(K<10)?"0"+K:K
};
F=F||{};
var A=[];
var C=F.zulu?"getUTC":"get";
var I="";
if(F.selector!="time"){I=[B[C+"FullYear"](),E(B[C+"Month"]()+1),E(B[C+"Date"]())].join("-")
}A.push(I);
if(F.selector!="date"){var H=[E(B[C+"Hours"]()),E(B[C+"Minutes"]()),E(B[C+"Seconds"]())].join(":");
var G=B[C+"Milliseconds"]();
if(F.milliseconds){H+="."+(G<100?"0":"")+E(G)
}if(F.zulu){H+="Z"
}else{if(F.selector!="time"){var D=B.getTimezoneOffset();
var J=Math.abs(D);
H+=(D>0?"-":"+")+E(Math.floor(J/60))+":"+E(J%60)
}}A.push(H)
}return A.join("T")
}
};