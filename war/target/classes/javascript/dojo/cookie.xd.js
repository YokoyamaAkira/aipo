dojo._xdResourceLoaded({depends:[["provide","dojo.cookie"]],defineResource:function(A){if(!A._hasResource["dojo.cookie"]){A._hasResource["dojo.cookie"]=true;
A.provide("dojo.cookie");
A.cookie=function(H,C,I){var B=document.cookie;
if(arguments.length==1){var F=B.lastIndexOf(H+"=");
if(F==-1){return null
}var E=F+H.length+1;
var G=B.indexOf(";",F+H.length+1);
if(G==-1){G=B.length
}return decodeURIComponent(B.substring(E,G))
}else{I=I||{};
C=encodeURIComponent(C);
if(typeof (I.expires)=="number"){var D=new Date();
D.setTime(D.getTime()+(I.expires*24*60*60*1000));
I.expires=D
}document.cookie=H+"="+C+(I.expires?"; expires="+I.expires.toUTCString():"")+(I.path?"; path="+I.path:"")+(I.domain?"; domain="+I.domain:"")+(I.secure?"; secure":"");
return null
}}
}}});