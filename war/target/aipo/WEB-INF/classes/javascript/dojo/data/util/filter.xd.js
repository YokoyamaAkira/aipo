dojo._xdResourceLoaded({depends:[["provide","dojo.data.util.filter"]],defineResource:function(A){if(!A._hasResource["dojo.data.util.filter"]){A._hasResource["dojo.data.util.filter"]=true;
A.provide("dojo.data.util.filter");
A.data.util.filter.patternToRegExp=function(F,D){var C="^";
var B=null;
for(var E=0;
E<F.length;
E++){B=F.charAt(E);
switch(B){case"\\":C+=B;
E++;
C+=F.charAt(E);
break;
case"*":C+=".*";
break;
case"?":C+=".";
break;
case"$":case"^":case"/":case"+":case".":case"|":case"(":case")":case"{":case"}":case"[":case"]":C+="\\";
default:C+=B
}}C+="$";
if(D){return new RegExp(C,"i")
}else{return new RegExp(C)
}}
}}});