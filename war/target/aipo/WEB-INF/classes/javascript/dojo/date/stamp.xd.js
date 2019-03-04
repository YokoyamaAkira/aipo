dojo._xdResourceLoaded({depends:[["provide","dojo.date.stamp"]],defineResource:function(A){if(!A._hasResource["dojo.date.stamp"]){A._hasResource["dojo.date.stamp"]=true;
A.provide("dojo.date.stamp");
A.date.stamp.fromISOString=function(F,C){if(!A.date.stamp._isoRegExp){A.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/
}var D=A.date.stamp._isoRegExp.exec(F);
var B=null;
if(D){D.shift();
D[1]&&D[1]--;
D[6]&&(D[6]*=1000);
if(C){C=new Date(C);
A.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(H){return C["get"+H]()
}).forEach(function(I,H){if(D[H]===undefined){D[H]=I
}})
}B=new Date(D[0]||1970,D[1]||0,D[2]||0,D[3]||0,D[4]||0,D[5]||0,D[6]||0);
var G=0;
var E=D[7]&&D[7].charAt(0);
if(E!="Z"){G=((D[8]||0)*60)+(Number(D[9])||0);
if(E!="-"){G*=-1
}}if(E){G-=B.getTimezoneOffset()
}if(G){B.setTime(B.getTime()+G*60000)
}}return B
};
A.date.stamp.toISOString=function(G,K){var J=function(L){return(L<10)?"0"+L:L
};
K=K||{};
var F=[];
var H=K.zulu?"getUTC":"get";
var D="";
if(K.selector!="time"){D=[G[H+"FullYear"](),J(G[H+"Month"]()+1),J(G[H+"Date"]())].join("-")
}F.push(D);
if(K.selector!="date"){var C=[J(G[H+"Hours"]()),J(G[H+"Minutes"]()),J(G[H+"Seconds"]())].join(":");
var B=G[H+"Milliseconds"]();
if(K.milliseconds){C+="."+(B<100?"0":"")+J(B)
}if(K.zulu){C+="Z"
}else{if(K.selector!="time"){var I=G.getTimezoneOffset();
var E=Math.abs(I);
C+=(I>0?"-":"+")+J(Math.floor(E/60))+":"+J(E%60)
}}F.push(C)
}return F.join("T")
}
}}});