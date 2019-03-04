dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.misc"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.misc"]){A._hasResource["dojox.dtl.filter.misc"]=true;
A.provide("dojox.dtl.filter.misc");
A.mixin(dojox.dtl.filter.misc,{filesizeformat:function(B){B=parseFloat(B);
if(B<1024){return(B==1)?B+" byte":B+" bytes"
}else{if(B<1024*1024){return(B/1024).toFixed(1)+" KB"
}else{if(B<1024*1024*1024){return(B/1024/1024).toFixed(1)+" MB"
}}}return(B/1024/1024/1024).toFixed(1)+" GB"
},pluralize:function(E,B){B=B||"s";
if(B.indexOf(",")==-1){B=","+B
}var F=B.split(",");
if(F.length>2){return""
}var D=F[0];
var C=F[1];
if(parseInt(E)!=1){return C
}return D
},_phone2numeric:{a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(F){var C=dojox.dtl.filter.misc;
F=F+"";
var B="";
for(var D=0;
D<F.length;
D++){var E=F.charAt(D).toLowerCase();
(C._phone2numeric[E])?B+=C._phone2numeric[E]:B+=F.charAt(D)
}return B
},pprint:function(B){return A.toJson(B)
}})
}}});