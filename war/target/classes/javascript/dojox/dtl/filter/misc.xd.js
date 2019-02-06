dojo._xdResourceLoaded({depends:[["provide","dojox.dtl.filter.misc"]],defineResource:function(A){if(!A._hasResource["dojox.dtl.filter.misc"]){A._hasResource["dojox.dtl.filter.misc"]=true;
A.provide("dojox.dtl.filter.misc");
A.mixin(dojox.dtl.filter.misc,{filesizeformat:function(B){B=parseFloat(B);
if(B<1024){return(B==1)?B+" byte":B+" bytes"
}else{if(B<1024*1024){return(B/1024).toFixed(1)+" KB"
}else{if(B<1024*1024*1024){return(B/1024/1024).toFixed(1)+" MB"
}}}return(B/1024/1024/1024).toFixed(1)+" GB"
},pluralize:function(F,C){C=C||"s";
if(C.indexOf(",")==-1){C=","+C
}var B=C.split(",");
if(B.length>2){return""
}var E=B[0];
var D=B[1];
if(parseInt(F)!=1){return D
}return E
},_phone2numeric:{a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(B){var D=dojox.dtl.filter.misc;
B=B+"";
var C="";
for(var E=0;
E<B.length;
E++){var F=B.charAt(E).toLowerCase();
(D._phone2numeric[F])?C+=D._phone2numeric[F]:C+=B.charAt(E)
}return C
},pprint:function(B){return A.toJson(B)
}})
}}});