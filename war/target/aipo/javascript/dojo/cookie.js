if(!dojo._hasResource["dojo.cookie"]){dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(C,E,D){var H=document.cookie;
if(arguments.length==1){var A=H.lastIndexOf(C+"=");
if(A==-1){return null
}var G=A+C.length+1;
var B=H.indexOf(";",A+C.length+1);
if(B==-1){B=H.length
}return decodeURIComponent(H.substring(G,B))
}else{D=D||{};
E=encodeURIComponent(E);
if(typeof (D.expires)=="number"){var F=new Date();
F.setTime(F.getTime()+(D.expires*24*60*60*1000));
D.expires=F
}document.cookie=C+"="+E+(D.expires?"; expires="+D.expires.toUTCString():"")+(D.path?"; path="+D.path:"")+(D.domain?"; domain="+D.domain:"")+(D.secure?"; secure":"");
return null
}}
};