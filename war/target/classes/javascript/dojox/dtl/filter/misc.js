if(!dojo._hasResource["dojox.dtl.filter.misc"]){dojo._hasResource["dojox.dtl.filter.misc"]=true;
dojo.provide("dojox.dtl.filter.misc");
dojo.mixin(dojox.dtl.filter.misc,{filesizeformat:function(A){A=parseFloat(A);
if(A<1024){return(A==1)?A+" byte":A+" bytes"
}else{if(A<1024*1024){return(A/1024).toFixed(1)+" KB"
}else{if(A<1024*1024*1024){return(A/1024/1024).toFixed(1)+" MB"
}}}return(A/1024/1024/1024).toFixed(1)+" GB"
},pluralize:function(D,A){A=A||"s";
if(A.indexOf(",")==-1){A=","+A
}var E=A.split(",");
if(E.length>2){return""
}var C=E[0];
var B=E[1];
if(parseInt(D)!=1){return B
}return C
},_phone2numeric:{a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(E){var B=dojox.dtl.filter.misc;
E=E+"";
var A="";
for(var C=0;
C<E.length;
C++){var D=E.charAt(C).toLowerCase();
(B._phone2numeric[D])?A+=B._phone2numeric[D]:A+=E.charAt(C)
}return A
},pprint:function(A){return dojo.toJson(A)
}})
};