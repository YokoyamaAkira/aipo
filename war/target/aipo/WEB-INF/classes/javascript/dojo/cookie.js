if(!dojo._hasResource["dojo.cookie"]){dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(F,H,G){var C=document.cookie;
if(arguments.length==1){var D=C.lastIndexOf(F+"=");
if(D==-1){return null
}var B=D+F.length+1;
var E=C.indexOf(";",D+F.length+1);
if(E==-1){E=C.length
}return decodeURIComponent(C.substring(B,E))
}else{G=G||{};
H=encodeURIComponent(H);
if(typeof (G.expires)=="number"){var A=new Date();
A.setTime(A.getTime()+(G.expires*24*60*60*1000));
G.expires=A
}document.cookie=F+"="+H+(G.expires?"; expires="+G.expires.toUTCString():"")+(G.path?"; path="+G.path:"")+(G.domain?"; domain="+G.domain:"")+(G.secure?"; secure":"");
return null
}}
};