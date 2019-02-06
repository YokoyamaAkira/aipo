dojo._xdResourceLoaded({depends:[["provide","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojo.date.stamp"]){A._hasResource["dojo.date.stamp"]=true;
A.provide("dojo.date.stamp");
A.date.stamp.fromISOString=function(G,D){if(!A.date.stamp._isoRegExp){A.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var E=A.date.stamp._isoRegExp.exec(G);
var C=null;
if(E){E.shift();
E[1]&&E[1]--;
E[6]&&(E[6]*=1000);
if(D){D=new Date(D);
A.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(H){return D["get"+H]()
}).forEach(function(I,H){if(E[H]===undefined){E[H]=I
}})
}C=new Date(E[0]||1970,E[1]||0,E[2]||0,E[3]||0,E[4]||0,E[5]||0,E[6]||0);
var B=0;
var F=E[7]&&E[7].charAt(0);
if(F!="Z"){B=((E[8]||0)*60)+(Number(E[9])||0);
if(F!="-"){B*=-1
}}if(F){B-=C.getTimezoneOffset()
}if(B){C.setTime(C.getTime()+B*60000)
}}return C
};
A.date.stamp.toISOString=function(E,I){var H=function(L){return(L<10)?"0"+L:L
};
I=I||{};
var D=[];
var F=I.zulu?"getUTC":"get";
var B="";
if(I.selector!="time"){B=[E[F+"FullYear"](),H(E[F+"Month"]()+1),H(E[F+"Date"]())].join("-")
}D.push(B);
if(I.selector!="date"){var K=[H(E[F+"Hours"]()),H(E[F+"Minutes"]()),H(E[F+"Seconds"]())].join(":");
var J=E[F+"Milliseconds"]();
if(I.milliseconds){K+="."+(J<100?"0":"")+H(J)
}if(I.zulu){K+="Z"
}else{if(I.selector!="time"){var G=E.getTimezoneOffset();
var C=Math.abs(G);
K+=(G>0?"-":"+")+H(Math.floor(C/60))+":"+H(C%60)
}}D.push(K)
}return D.join("T")
}
}}});