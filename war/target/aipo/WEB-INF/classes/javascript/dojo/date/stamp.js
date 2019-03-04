if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.date.stamp.fromISOString=function(E,B){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var C=dojo.date.stamp._isoRegExp.exec(E);
var A=null;
if(C){C.shift();
C[1]&&C[1]--;
C[6]&&(C[6]*=1000);
if(B){B=new Date(B);
dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(G){return B["get"+G]()
}).forEach(function(H,G){if(C[G]===undefined){C[G]=H
}})
}A=new Date(C[0]||1970,C[1]||0,C[2]||0,C[3]||0,C[4]||0,C[5]||0,C[6]||0);
var F=0;
var D=C[7]&&C[7].charAt(0);
if(D!="Z"){F=((C[8]||0)*60)+(Number(C[9])||0);
if(D!="-"){F*=-1
}}if(D){F-=A.getTimezoneOffset()
}if(F){A.setTime(A.getTime()+F*60000)
}}return A
};
dojo.date.stamp.toISOString=function(F,J){var I=function(K){return(K<10)?"0"+K:K
};
J=J||{};
var E=[];
var G=J.zulu?"getUTC":"get";
var C="";
if(J.selector!="time"){C=[F[G+"FullYear"](),I(F[G+"Month"]()+1),I(F[G+"Date"]())].join("-")
}E.push(C);
if(J.selector!="date"){var B=[I(F[G+"Hours"]()),I(F[G+"Minutes"]()),I(F[G+"Seconds"]())].join(":");
var A=F[G+"Milliseconds"]();
if(J.milliseconds){B+="."+(A<100?"0":"")+I(A)
}if(J.zulu){B+="Z"
}else{if(J.selector!="time"){var H=F.getTimezoneOffset();
var D=Math.abs(H);
B+=(H>0?"-":"+")+I(Math.floor(D/60))+":"+I(D%60)
}}E.push(B)
}return E.join("T")
}
};