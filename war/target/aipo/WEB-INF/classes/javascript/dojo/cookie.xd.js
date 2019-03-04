dojo._xdResourceLoaded({depends:[["provide","dojo.cookie"]],defineResource:function(A){if(!A._hasResource["dojo.cookie"]){A._hasResource["dojo.cookie"]=true;
A.provide("dojo.cookie");
A.cookie=function(D,F,E){var I=document.cookie;
if(arguments.length==1){var B=I.lastIndexOf(D+"=");
if(B==-1){return null
}var H=B+D.length+1;
var C=I.indexOf(";",B+D.length+1);
if(C==-1){C=I.length
}return decodeURIComponent(I.substring(H,C))
}else{E=E||{};
F=encodeURIComponent(F);
if(typeof (E.expires)=="number"){var G=new Date();
G.setTime(G.getTime()+(E.expires*24*60*60*1000));
E.expires=G
}document.cookie=D+"="+F+(E.expires?"; expires="+E.expires.toUTCString():"")+(E.path?"; path="+E.path:"")+(E.domain?"; domain="+E.domain:"")+(E.secure?"; secure":"");
return null
}}
}}});