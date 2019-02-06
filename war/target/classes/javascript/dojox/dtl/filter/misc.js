if(!dojo._hasResource["dojox.dtl.filter.misc"]){dojo._hasResource["dojox.dtl.filter.misc"]=true;
dojo.provide("dojox.dtl.filter.misc");
dojo.mixin(dojox.dtl.filter.misc,{filesizeformat:function(A){A=parseFloat(A);
if(A<1024){return(A==1)?A+" byte":A+" bytes"
}else{if(A<1024*1024){return(A/1024).toFixed(1)+" KB"
}else{if(A<1024*1024*1024){return(A/1024/1024).toFixed(1)+" MB"
}}}return(A/1024/1024/1024).toFixed(1)+" GB"
},pluralize:function(C,E){E=E||"s";
if(E.indexOf(",")==-1){E=","+E
}var D=E.split(",");
if(D.length>2){return""
}var B=D[0];
var A=D[1];
if(parseInt(C)!=1){return A
}return B
},_phone2numeric:{a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9},phone2numeric:function(D){var A=dojox.dtl.filter.misc;
D=D+"";
var E="";
for(var B=0;
B<D.length;
B++){var C=D.charAt(B).toLowerCase();
(A._phone2numeric[C])?E+=A._phone2numeric[C]:E+=D.charAt(B)
}return E
},pprint:function(A){return dojo.toJson(A)
}})
};